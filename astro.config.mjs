// @ts-check
import tailwindcss from '@tailwindcss/vite';
import { rehypeHeadingIds, unified } from '@astrojs/markdown-remark';
import { defineConfig } from 'astro/config';
import rehypeKatex from 'rehype-katex';
import rehypeMermaid from 'rehype-mermaid';
import remarkMath from 'remark-math';

export default defineConfig({
	site: 'https://dunkeln.github.io',
	markdown: {
		syntaxHighlight: {
			type: 'shiki',
			excludeLangs: ['math', 'mermaid']
		},
		processor: unified({
			remarkPlugins: [remarkMath],
			remarkRehype: {
				footnoteLabel: 'References'
			},
			rehypePlugins: [rehypeHeadingIds, rehypeKatex, [rehypeMermaid, {
				colorScheme: 'dark',
				strategy: 'inline-svg',
				mermaidConfig: {
					theme: 'base',
					fontFamily: 'ui-sans-serif, system-ui, sans-serif',
					themeVariables: {
						background: '#171717',
						primaryColor: '#242321',
						primaryTextColor: '#f0eee8',
						primaryBorderColor: '#56524a',
						lineColor: '#8c867b',
						secondaryColor: '#1e1d1b',
						tertiaryColor: '#2b2925',
						noteBkgColor: '#2b2925',
						noteTextColor: '#f0eee8',
						noteBorderColor: '#56524a'
					}
				}
			}]]
		}),
		shikiConfig: {
			theme: 'vesper'
		}
	},
	vite: {
		plugins: [tailwindcss()]
	}
});
