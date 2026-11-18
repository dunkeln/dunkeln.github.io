import { writeFile } from 'node:fs/promises';

const token = process.env.GH_GRAPHQL_TOKEN;
const username = process.env.GH_USERNAME || 'dunkeln';

if (!token) throw new Error('Missing GH_GRAPHQL_TOKEN');

// The signed-out profile graph includes any private totals the user shares publicly.
const response = await fetch(`https://github.com/users/${encodeURIComponent(username)}/contributions`, {
	headers: { 'Accept-Language': 'en' },
});
if (!response.ok) throw new Error(`GitHub profile calendar request failed: ${response.status}`);

const levels = ['NONE', 'FIRST_QUARTILE', 'SECOND_QUARTILE', 'THIRD_QUARTILE', 'FOURTH_QUARTILE'];
const cells = new Map();
const labels = new Map();
let heading = '';
let labelId;

await new HTMLRewriter()
	.on('#js-contribution-activity-description', {
		text(chunk) { heading += chunk.text; },
	})
	.on('.ContributionCalendar-day[data-date][data-level][id]', {
		element(cell) {
			const date = cell.getAttribute('data-date');
			const level = levels[cell.getAttribute('data-level')];
			cells.set(cell.getAttribute('id'), { date, level });
		},
	})
	.on('.ContributionCalendar-grid tool-tip[for]', {
		element(tooltip) {
			labelId = tooltip.getAttribute('for');
			labels.set(labelId, '');
		},
		text(chunk) { labels.set(labelId, labels.get(labelId) + chunk.text); },
	})
	.transform(response)
	.arrayBuffer();

const days = Array.from(cells, ([id, { date, level }]) => {
	const countText = /^(No|[\d,]+) contributions? on /.exec(labels.get(id)?.trim() ?? '')?.[1];
	if (!countText || !level || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
		throw new Error(`Invalid GitHub profile calendar entry for ${date}`);
	}
	const count = countText === 'No' ? 0 : Number(countText.replaceAll(',', ''));
	return { date, count, level };
}).sort((a, b) => a.date.localeCompare(b.date));

const totalContributions = days.reduce((total, day) => total + day.count, 0);
const profileTotal = Number(/^\s*([\d,]+)\s+contributions?\b/.exec(heading)?.[1].replaceAll(',', ''));
const consecutive = days.every((day, index) =>
	index === 0 || Date.parse(day.date) - Date.parse(days[index - 1].date) === 86_400_000
);
if (days.length < 365 || days.length > 372 || !consecutive || totalContributions !== profileTotal) {
	throw new Error('GitHub profile calendar is incomplete or its total does not match');
}

const payload = { username, totalContributions, generatedAt: new Date().toISOString(), days };
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
