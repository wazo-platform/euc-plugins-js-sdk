---
displayed_sidebar: pluginsSidebar
---

# Plugins Deployment

Like said previously plugins must be hosted on your own infrastructure. This gives you the full control on the techonologies and when you want to update your plugin(s).

## Where to deploy

You can deploy your plugin / app anywhere. But it's import to make the plugin accessible publicly from the web. Other feature won't be available for customers and users.

## CORS Enabled

The `manifest.json` of your application should be served using a CORS-enabled http server. Since everything this file is fetching from our application, this must be enabled on your infrastruction in order to allow us to fetch your `manifest.json` content and enable related features.

:::caution
If not well configured, it will not be impossible the install the plugin.
:::

## Distribute a Plugin

### For E-UC App

- Connect to [E-UC Portal](https://portal.wazo.io)
- Connect to a stack or location
- Go to `Settings > Applications > App Configuration`.
- If no application is configured, create a new configuration for your application.
- In the *Plugins* section, insert the URL to your `manifest.json`
- Enjoy!

![App configuration](/img/app-config-portal.png)

### For E-UC Portal

- You must be connected to [E-UC Portal](https://portal.wazo.io)
- Go to `Plugins` > `Create` and insert the URL to your `manifest.json`
- Enable the plugin for a customer or globally
  ![Portal Plugin Manifest](/img/plugin-portal-enable.png)
- Enjoy!
