/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */

// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  installSidebar: [
    'installation',
    {
      type: 'ref',
      id: 'sdk',
      label: 'SDK API',
    },
    {
      type: 'category',
      label: 'Guides',
      items: [
        {
          type: 'ref',
          id: 'plugins/introduction',
          label: 'Plugins Introduction'
        },
        {
          type: 'ref',
          id: 'softphone/introduction',
          label: 'Softphone Introduction'
        },
      ]
    }
  ],

  pluginsSidebar: [
    'plugins/introduction',
    {
      type: 'category',
      collapsed: false,
      label: 'Configuration',
      items: [
        {
          type: 'ref',
          id: 'plugins/configuration',
          label: 'Configure your plugin',
        },
        {
          type: 'ref',
          id: 'plugins/web-desktop-application',
          label: 'E-UC Apps - Web & Desktop',
        },
        {
          type: 'ref',
          id: 'plugins/mobile',
          label: 'E-UC Apps - Mobile',
        },
        {
          type: 'ref',
          id: 'plugins/portal',
          label: 'E-UC Portal',
        },
      ]
    },
    {
      type: 'category',
      collapsed: false,
      label: 'Examples',
      items: [
        {
          type: 'ref',
          id: 'plugins/wda-examples',
          label: 'E-UC Apps - Web & Desktop',
        },
        {
          type: 'ref',
          id: 'plugins/portal-examples',
          label: 'E-UC Portal',
        },
      ],
    },
  ],

  softphoneSidebar: [
    {
      type: 'ref',
      id: 'softphone/introduction',
      label: 'Introduction'
    },
    {
      type: 'ref',
      id: 'softphone/examples',
      label: 'Examples',
    },
  ],
};

module.exports = sidebars;
