import { getCollection } from 'astro:content';
import type { APIRoute } from 'astro';

export const prerender = true;

const escapeXml = (value: string) => value.replace(/[<>&'"]/g, (character) => ({
	'<': '&lt;',
	'>': '&gt;',
	'&': '&amp;',
	"'": '&apos;',
	'"': '&quot;',
})[character]!);

export const GET: APIRoute = async ({ site }) => {
	const origin = site ?? new URL('https://dunkeln.github.io');
	const posts = (await getCollection('writing')).sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
	const feedUrl = new URL('/rss.xml', origin).href;
	const items = posts.map((post) => {
		const url = new URL(`/writing/${post.id}/`, origin).href;
		return [
			'    <item>',
			`      <title>${escapeXml(post.data.title)}</title>`,
			`      <description>${escapeXml(post.data.description)}</description>`,
			`      <link>${escapeXml(url)}</link>`,
			`      <guid isPermaLink="true">${escapeXml(url)}</guid>`,
			`      <pubDate>${post.data.date.toUTCString()}</pubDate>`,
			'    </item>',
		].join('\n');
	}).join('\n');

	return new Response(`<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Prateek Pravanjan — Writing</title>
    <description>Technical writing on model training, agents, observability, and agent architecture.</description>
    <link>${origin.href}</link>
    <atom:link href="${feedUrl}" rel="self" type="application/rss+xml" />
    <language>en-us</language>
${items}
  </channel>
</rss>
`, { headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' } });
};
