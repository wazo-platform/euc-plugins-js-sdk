---
displayed_sidebar: pluginsSidebar
---

# Plugins Deployment

Like said previously plugins must be hosted on your own infrastructure. This gives you the full control on the techonologies and when you want to update your plugin(s).

## Where to deploy

You can deploy your plugin / app anywhere. It required to make the plugin / app accessible from the web, to make the features available to your users and customers.

## CORS Enabled

The `manifest.json` of your application should be served using a CORS-enabled http server. Since everything this file is fetching from our application, this must be enabled on your infrastruction in order to allow us to fetch your `manifest.json` content and enable related features.

:::caution
If not well configured, it will not be impossible the install the plugin.
:::

## Distribute

### E-UC App Plugins

- Connect to [E-UC Portal](https://portal.wazo.io)
- Connect to any stack or location
- Go to `Settings > Applications > App Configuration`.
- If no application is configured, create a new configuration for your application.
- In the *Plugins* section, insert the URL to your `manifest.json`

![App configuration](/img/app-config-portal.png)

### E-UC Portal Plugins

- Connect to [E-UC Portal](https://portal.wazo.io)
- Go to `Plugins > Create`
- Insert the URL to your `manifest.json` and complete the form
- Enable for a customer or globally to make it visible
