// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// Served by GitHub Pages at kish21.github.io/sessioncost-help
export default defineConfig({
	site: 'https://kish21.github.io',
	base: '/sessioncost-help',
	// Pages that moved in the 2026-11 rewrite: old links (the released README, videos) keep working.
	redirects: {
		'/start/first-report': '/sessioncost-help/start/first-5-minutes/',
		'/scenarios/developers': '/sessioncost-help/use/save-tokens/',
		'/guard/what-it-does': '/sessioncost-help/use/stay-safe/',
		'/guard/try-it': '/sessioncost-help/use/stay-safe/',
		'/guard/settings': '/sessioncost-help/how/files-and-settings/',
		'/guard/how-we-test': '/sessioncost-help/how/security/',
		'/reference/agents': '/sessioncost-help/reference/money/',
		'/reference/privacy': '/sessioncost-help/how/security/',
	},
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
			components: { PageTitle: './src/components/PageTitle.astro' },
			// no "On this page" column on the right: it took a quarter of the screen for 4-6 headings (owner, 2026-11-09)
			tableOfContents: false,
			sidebar: [
				{
					label: 'Start',
					items: [
						{ label: 'Welcome', link: '/' },
						{ label: 'Install SessionCost', slug: 'start/install' },
						{
							label: 'Other ways to install',
							items: [
								{ label: 'Node (npm)', slug: 'start/install/npm' },
								{ label: 'Python (PyPI)', slug: 'start/install/python' },
								{ label: 'Claude Code', slug: 'start/install/claude-code' },
								{ label: 'Codex', slug: 'start/install/codex' },
								{ label: 'Cursor', slug: 'start/install/cursor' },
								{ label: 'Antigravity', slug: 'start/install/antigravity' },
								{ label: 'GitHub Copilot', slug: 'start/install/copilot' },
							],
						},
						{ label: 'Your first 5 minutes', slug: 'start/first-5-minutes' },
						{ label: 'Watch and try', slug: 'watch' },
					],
				},
				{
					label: 'Use it',
					items: [
						{ label: 'When to use what', slug: 'use/when-to-use-what' },
						{ label: 'Save tokens', slug: 'use/save-tokens' },
						{ label: 'Stay safe', slug: 'use/stay-safe' },
						{ label: 'Long chats and handover', slug: 'use/long-chats' },
						{
							label: 'Read your report',
							items: [
								{ label: 'Take the report tour', slug: 'report/tour' },
								{ label: 'The report at a glance', slug: 'report/overview' },
								{ label: 'The turn panel', slug: 'report/turn-panel' },
								{ label: 'Step 0', slug: 'report/step-0' },
								{ label: 'Fixes and safety rules', slug: 'report/fixes' },
								{ label: 'Trace & risk map, agent flow', slug: 'report/risk-map' },
							],
						},
					],
				},
				{
					label: 'Under the hood',
					items: [
						{ label: 'How it works', slug: 'how/how-it-works' },
						{ label: "The guard's decision flow", slug: 'how/guard-decisions' },
						{ label: 'What the guard checks', slug: 'guard/checks' },
						{ label: 'Files and settings', slug: 'how/files-and-settings' },
						{ label: 'Commands and options', slug: 'reference/commands' },
						{ label: 'Exports (JSON, SARIF)', slug: 'reference/exports' },
						{ label: 'Security model and how we test', slug: 'how/security' },
						{ label: 'For security teams', slug: 'scenarios/security' },
						{ label: 'How the money is counted', slug: 'reference/money' },
					],
				},
				{
					label: 'Help',
					items: [
						{ label: 'Fix a problem', slug: 'help/fix-a-problem' },
						{ label: 'Questions and answers', slug: 'help/questions' },
					],
				},
			],
		}),
	],
});
