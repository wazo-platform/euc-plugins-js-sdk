// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion
const path = require('path');

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

const isDev = process.env.NODE_ENV === 'development';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Wazo E-UC Plugins SDK',
  tagline: 'Extend every functionality in Wazo Products or integrate Wazo softphone into any existing tool.',

  url: 'https://wazo.io',
  baseUrl: isDev ? '/' : 'euc-plugins-js-sdk/',
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

  plugins: [
    path.resolve(__dirname, 'plugins', 'softphone-plugin')
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        hideOnScroll: true,
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
            label: 'Javascript SDK',
          },
          {
            type: 'doc',
            docId: 'plugins/introduction',
            position: 'left',
            label: 'Plugins',
            activeBaseRegex: '/plugins/'
          },
          {
            type: 'doc',
            docId: 'softphone/introduction',
            position: 'left',
            label: 'Softphone',
            activeBaseRegex: '/softphone/'
          },
          {
            type: 'doc',
            docId: 'deeplink/deeplink',
            position: 'left',
            label: 'Deep Linking',
            activeBaseRegex: '/deeplink/'
          },

          // Right
          {
            href: 'https://github.com/wazo-communication/euc-plugins-js-sdk',
            className: 'header-github-link',
            position: 'right',
            title: 'GitHub Repository',
            'aria-label': 'GitHub Repository',
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
                label: 'Wazo Developers Center',
                href: 'https://developers.wazo.io/',
              },
              {
                label: 'Discourse',
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
  clientModules: [
    require.resolve('./src/softphone-module.js'),
  ],
};

module.exports = config;
