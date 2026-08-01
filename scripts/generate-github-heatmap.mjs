import { writeFile } from 'node:fs/promises';

const token = process.env.GH_GRAPHQL_TOKEN;
const username = process.env.GH_USERNAME || 'dunkeln';

if (!token) throw new Error('Missing GH_GRAPHQL_TOKEN');

const response = await fetch('https://api.github.com/graphql', {
	method: 'POST',
	headers: {
		Authorization: `bearer ${token}`,
		'Content-Type': 'application/json',
		'User-Agent': 'dunkeln.github.io-heatmap-generator',
	},
	body: JSON.stringify({
		query: `query($login: String!) {
			user(login: $login) {
				contributionsCollection {
					contributionCalendar {
						totalContributions
						weeks { contributionDays { date contributionCount contributionLevel } }
					}
				}
			}
		}`,
		variables: { login: username },
	}),
});

if (!response.ok) throw new Error(`GitHub GraphQL request failed: ${response.status}`);

const json = await response.json();
if (json.errors?.length) throw new Error(`GitHub GraphQL errors: ${JSON.stringify(json.errors)}`);

const calendar = json?.data?.user?.contributionsCollection?.contributionCalendar;
if (!calendar) throw new Error('No contribution calendar data returned');

const payload = {
	username,
	totalContributions: calendar.totalContributions,
	generatedAt: new Date().toISOString(),
	days: calendar.weeks.flatMap((week) =>
		week.contributionDays.map((day) => ({
			date: day.date,
			count: day.contributionCount,
			level: day.contributionLevel,
		})),
	),
};

await writeFile('src/data/github-contributions.json', `${JSON.stringify(payload, null, 2)}\n`);

const eventsResponse = await fetch(`https://api.github.com/users/${username}/events/public?per_page=60`, {
	headers: {
		Accept: 'application/vnd.github+json',
		Authorization: `Bearer ${token}`,
		'User-Agent': 'dunkeln.github.io-activity-generator',
	},
});

if (!eventsResponse.ok) throw new Error(`GitHub events request failed: ${eventsResponse.status}`);

const reposResponse = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`, {
	headers: {
		Accept: 'application/vnd.github+json',
		Authorization: `Bearer ${token}`,
		'User-Agent': 'dunkeln.github.io-activity-generator',
	},
});
const descriptions = new Map(
	reposResponse.ok
		? (await reposResponse.json()).map((repository) => [repository.full_name, repository.description])
		: [],
);

const recentByRepo = new Map();
for (const event of await eventsResponse.json()) {
	if (!event.repo?.name || recentByRepo.has(event.repo.name)) continue;
	recentByRepo.set(event.repo.name, {
		name: event.repo.name,
		description: descriptions.get(event.repo.name) || null,
		createdAt: event.created_at,
	});
	if (recentByRepo.size === 5) break;
}

await writeFile(
	'src/data/github-activity.json',
	`${JSON.stringify({ username, generatedAt: new Date().toISOString(), repositories: [...recentByRepo.values()] }, null, 2)}\n`,
);
