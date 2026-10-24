// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// One sidebar group per grammar topic. Each folder in src/content/docs/topics/
// holds that topic's Class 11 page, Class 12 page and practice page.
const topics = [
	['Tenses', 't01-tenses'],
	['Modal auxiliaries', 't02-modal-auxiliaries'],
	['Articles and determiners', 't03-articles-determiners'],
	['Prepositions', 't04-prepositions'],
	['Subject–verb agreement', 't05-subject-verb-agreement'],
	['Connectives / linkers', 't06-connectives'],
	['Non-finite verbs', 't07-non-finite-verbs'],
	['Degrees of comparison', 't08-degrees-of-comparison'],
	['Kinds of sentences and clauses', 't09-kinds-of-sentences'],
	['Questions and question tags', 't10-questions'],
	['Active and passive voice', 't11-active-passive'],
	['Reported speech', 't12-reported-speech'],
	['Conditional clauses', 't13-conditionals'],
];

export default defineConfig({
	integrations: [
		starlight({
			title: 'English Grammar',
			description:
				'Grammar for TN State Board Class 11 and 12 English, explained in simple English with examples and practice.',
			favicon: '/favicon.svg',
			customCss: ['./src/styles/custom.css'],
			components: {
				PageTitle: './src/components/PageTitle.astro',
				MarkdownContent: './src/components/MarkdownContent.astro',
			},
			head: [
				{ tag: 'link', attrs: { rel: 'manifest', href: '/manifest.webmanifest' } },
				{ tag: 'meta', attrs: { name: 'theme-color', content: '#1f4e79' } },
				{ tag: 'link', attrs: { rel: 'apple-touch-icon', href: '/icons/icon-192.png' } },
				{
					tag: 'script',
					content:
						"if ('serviceWorker' in navigator) { window.addEventListener('load', () => navigator.serviceWorker.register('/sw.js')); }",
				},
			],
			sidebar: [
				{ label: 'Start here', link: '/start-here/' },
				{ label: 'Foundation refresher', items: [{ autogenerate: { directory: 'foundation' } }] },
				{
					label: 'Grammar topics',
					items: topics.map(([label, dir]) => ({
						label,
						collapsed: true,
						items: [{ autogenerate: { directory: `topics/${dir}` } }],
					})),
				},
				{ label: 'Quick reference', items: [{ autogenerate: { directory: 'reference' } }] },
			],
		}),
	],
});
