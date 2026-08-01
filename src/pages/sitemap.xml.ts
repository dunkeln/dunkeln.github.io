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
	const urls = [
		{ path: '/', lastmod: undefined },
		{ path: '/work/', lastmod: undefined },
		{ path: '/writing/', lastmod: posts[0]?.data.date },
		...posts.map((post) => ({ path: `/writing/${post.id}/`, lastmod: post.data.date })),
	];
	const entries = urls.map(({ path, lastmod }) => [
		'  <url>',
		`    <loc>${escapeXml(new URL(path, origin).href)}</loc>`,
		lastmod ? `    <lastmod>${lastmod.toISOString()}</lastmod>` : '',
		'  </url>',
	].filter(Boolean).join('\n')).join('\n');

	return new Response(`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries}\n</urlset>\n`, {
		headers: { 'Content-Type': 'application/xml; charset=utf-8' },
	});
};
