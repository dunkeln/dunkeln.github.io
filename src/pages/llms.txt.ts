import { getCollection } from 'astro:content';
import type { APIRoute } from 'astro';
import { projects, skills } from '../data/work';

export const prerender = true;

export const GET: APIRoute = async ({ site }) => {
	const origin = site ?? new URL('https://dunkeln.github.io');
	const posts = (await getCollection('writing')).sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
	const projectLines = projects.map((project) => `- ${project.name}: ${project.scope}. ${project.live ?? project.repo}`).join('\n');
	const skillLines = skills.map((skill) => `- ${skill.name}: ${skill.summary} Install: \`${skill.install}\``).join('\n');
	const postLines = posts.map((post) => `- [${post.data.title}](${new URL(`/writing/${post.id}/`, origin).href}): ${post.data.description}`).join('\n');

	const body = `# Prateek Pravanjan

> Bay Area AI engineer building production-facing agent runtimes, evaluation systems, model tooling, and physical AI workflows.

## Canonical pages

- Homepage: ${origin.href}
- Work: ${new URL('/work/', origin).href}
- Writing: ${new URL('/writing/', origin).href}
- RSS: ${new URL('/rss.xml', origin).href}
- GitHub: https://github.com/dunkeln
- LinkedIn: https://www.linkedin.com/in/prateek-pravanjan

## Profile

Prateek Pravanjan works across agent runtimes, MCP and tool interfaces, LLM evaluation, model observability, verifier-driven training, context engineering, voice models, and physical AI. He is based in the San Francisco Bay Area and is open to full-time roles.

## Selected work

${projectLines}

## Agent skills

${skillLines}

## Writing

${postLines}

## Contact

- Email: mailto:prateekpravanjan@gmail.com
- X: https://x.com/_dunkeln
`;

	return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
