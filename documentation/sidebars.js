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
      type: 'category',
      collapsible: false,
      label: 'SDK APIs',
      items: [
        {
          type: 'ref',
          id: 'plugins/sdk',
          label: 'Plugins',
        },
        {
          type: 'ref',
          id: 'softphone/introduction',
          label: 'Softphone',
        },
      ]
    },
    {
      type: 'category',
      label: 'Guides',
      collapsible: false,
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
    {
      type: 'ref',
      id: 'plugins/introduction',
      label: 'Introduction',
    },
    {
      type: 'category',
      collapsible: false,
      label: 'Configuration',
      items: [
        {
          type: 'ref',
          id: 'plugins/configuration',
          label: 'Base Configuration',
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
        {
          type: 'ref',
          id: 'plugins/translation',
          label: 'Translation',
        },
      ]
    },
    {
      type: 'ref',
      id: 'plugins/sdk',
      label: 'SDK API',
    },
    {
      type: 'ref',
      id: 'plugins/deploy',
      label: 'Deployment',
    },
    {
      type: 'category',
      collapsible: false,
      label: 'Examples',
      items: [
        {
          type: 'ref',
          id: 'plugins/templates',
          label: 'Templates',
        },
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

  deeplinkSidebar: [
    {
      type: 'ref',
      id: 'deeplink/deeplink',
      label: 'Deep Linking'
    },
  ],
};

module.exports = sidebars;
