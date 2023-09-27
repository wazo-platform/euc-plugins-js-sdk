---
displayed_sidebar: pluginsSidebar
---

# Deploying your Plugin

As previously mentioned, plugins must be hosted on your own infrastructure. This gives you full control over the technologies you use and when to update your plugin(s).

## Where to Deploy

You can deploy your plugin/app anywhere. But it's important to make the plugin accessible publicly from the web. Otherwise, the features of your plugin will not be visible to users.

## CORS Enabled

The `manifest.json` of your application should be served using a CORS-enabled HTTP server. This must be enabled on your infrastructure to allow Wazo Product to fetch the file's content and enable related features.

:::caution
If not well configured, it will be impossible to install the plugin.
:::

## Distributing your Plugin

### For E-UC App

- Connect to [E-UC Portal](https://portal.wazo.io)
- Connect to a stack or location
- Go to `Settings > Applications > App Configuration`.
- If no application is configured, create a new configuration for your application.
- In the *Plugins* section, insert the URL to your `manifest.json`
- Enjoy!

![App configuration](/img/app-config-portal.png)

#### Enable plugins for specific users

- Connect to a stack or location
- Go to `Settings > Debugging Tools > Auth. Users`.
- Choose your user and then click on `Application Configuration`
- If no application is configured, create a new configuration for your application.
- In the *Plugins* section, insert the URL to your `manifest.json`
- Enjoy!

![App configuration for a single user](/img/app-config-portal-user.jpg)

### For E-UC Portal

- You must be connected to [E-UC Portal](https://portal.wazo.io)
- Go to `Plugins` > `Create` and insert the URL to your `manifest.json`
- Enable the plugin for a customer or globally
  ![Portal Plugin Manifest](/img/plugin-portal-enable.png)
- Enjoy!
