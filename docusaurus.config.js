// @ts-check

import { themes as prismThemes } from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
	title: 'Stardust',
	tagline: 'Trivial things like stardust 🌠',
	favicon: 'img/favicon.ico',

	url: 'https://nhanaz.io.vn',
	baseUrl: '/',

	organizationName: 'NhanAZ',
	projectName: 'Stardust',

	onBrokenLinks: 'throw',
	onBrokenMarkdownLinks: 'warn',

	i18n: {
		defaultLocale: 'en',
		locales: ['en']
	},

	presets: [
		[
			'classic',
			/** @type {import('@docusaurus/preset-classic').Options} */
			({
				docs: false,
				blog: {
					routeBasePath: '/',
					showReadingTime: true,
					editUrl: 'https://github.com/NhanAZ/Stardust/tree/main/',
					postsPerPage: 'ALL'
				},
				theme: {
					customCss: './src/custom.css',
				},
			}),
		],
	],

	themeConfig:
		/** @type {import('@docusaurus/preset-classic').ThemeConfig} */
		({
			navbar: {
				title: 'Stardust',
				logo: {
					alt: 'Stardust Logo',
					src: 'img/logo.svg',
				},
				items: [
				],
			},
			footer: {
			},
			prism: {
				theme: prismThemes.github,
				darkTheme: prismThemes.dracula,
			},
		}),
};

export default config;
