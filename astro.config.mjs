// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// Served by GitHub Pages at kish21.github.io/sessioncost-help
export default defineConfig({
	site: 'https://kish21.github.io',
	base: '/sessioncost-help',
	integrations: [
		starlight({
			title: 'SessionCost',
			description: 'See where every token of your AI coding chat went, and what to fix to send fewer.',
			favicon: '/favicon.svg',
			customCss: [
				'@fontsource/ibm-plex-sans/400.css',
				'@fontsource/ibm-plex-sans/500.css',
				'@fontsource/ibm-plex-sans/600.css',
				'@fontsource/ibm-plex-sans/700.css',
				'@fontsource/ibm-plex-mono/400.css',
				'@fontsource/ibm-plex-mono/600.css',
				'./src/styles/custom.css',
			],
			social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/kish21/sessioncost' }],
			sidebar: [
				{
					label: 'Start',
					items: [
						{ label: 'Welcome', link: '/' },
						{ label: 'Install SessionCost', slug: 'start/install' },
						{ label: 'Your first report', slug: 'start/first-report' },
					],
				},
				{
					label: 'Scenarios',
					items: [
						{ label: 'Tokens and cost', slug: 'scenarios/developers' },
						{ label: 'Security', slug: 'scenarios/security' },
					],
				},
				{
					label: 'Read your report',
					items: [
						{ label: 'Take the report tour', slug: 'report/tour', badge: { text: 'New', variant: 'tip' } },
						{ label: 'The report at a glance', slug: 'report/overview' },
						{ label: 'The turn panel', slug: 'report/turn-panel' },
						{ label: 'Step 0', slug: 'report/step-0' },
						{ label: 'Fixes and safety rules', slug: 'report/fixes' },
						{ label: 'Trace & risk map, agent flow', slug: 'report/risk-map' },
					],
				},
				{
					label: 'The guard',
					items: [
						{ label: 'Why you need the guard', slug: 'guard/what-it-does' },
						{ label: 'Try the guard', slug: 'guard/try-it' },
						{ label: 'What the guard checks', slug: 'guard/checks' },
						{ label: 'Guard settings', slug: 'guard/settings' },
					],
				},
				{
					label: 'Reference',
					items: [
						{ label: 'Commands', slug: 'reference/commands' },
						{ label: 'Which agents', slug: 'reference/agents' },
						{ label: 'Exports and integrations', slug: 'reference/exports' },
						{ label: 'How the money is counted', slug: 'reference/money' },
						{ label: 'Privacy and security', slug: 'reference/privacy' },
					],
				},
				{
					label: 'Help',
					items: [{ label: 'Fix a problem', slug: 'help/fix-a-problem' }],
				},
			],
		}),
	],
});
