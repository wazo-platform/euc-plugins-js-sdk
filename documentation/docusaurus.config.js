// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Wazo EUC plugins SDK',
  tagline: 'Create plugins for Wazo EUC apps',
  url: 'https://wazo.io',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'wazo-communication', // Usually your GitHub org/user name.
  projectName: 'euc-plugins-js-sdk', // Usually your repo name.

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: 'Wazo',
        logo: {
          alt: 'Wazo Logo',
          src: 'img/logo.png',
        },
        items: [
          {
            type: 'doc',
            docId: 'installation',
            position: 'left',
            label: 'Installation',
          },
          {
            type: 'doc',
            docId: 'configuration',
            position: 'left',
            label: 'Configuration',
          },
          {
            type: 'doc',
            docId: 'web-desktop-application',
            position: 'left',
            label: 'Web and Desktop',
          },
          {
            type: 'doc',
            docId: 'mobile',
            position: 'left',
            label: 'Mobile',
          },
          {
            type: 'doc',
            docId: 'portal',
            position: 'left',
            label: 'Portal',
          },
          {
            type: 'doc',
            docId: 'sdk',
            position: 'left',
            label: 'SDK',
          },
          {
            href: 'https://github.com/wazo-communication/euc-plugins-js-sdk',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [
              {
                label: 'Installation',
                to: '/docs/installation',
              },
            ],
          },
          {
            title: 'Community',
            items: [
              {
                label: 'Discord',
                href: 'https://wazo-platform.discourse.group/',
              },
              {
                label: 'Twitter',
                href: 'https://twitter.com/wazo',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'GitHub',
                href: 'https://github.com/wazo-communication/euc-plugins-js-sdk',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Wazo. Built with Docusaurus.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;
