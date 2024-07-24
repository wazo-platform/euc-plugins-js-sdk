---
displayed_sidebar: pluginsSidebar
pagination_next: plugins/translation
---

# Plugins Configuration

:::caution
This part is still in the development process, changes may happen frequently to the schema.
:::

## Manifest File

This file describes how your plugin is integrated into a Wazo Product. Using one or multiple manifest files you can
customize all the Wazo E-UC Products (Web, Desktop, Portal and Mobile).

### Required Fields

:::info
`manifest.json` files should be served using a CORS-enabled HTTP server.
:::

Your manifest.json must provide at least all required fields to make it installable.

| Manifest Field      | Type                                              |
| ------------------- | ------------------------------------------------- |
| `manifestVersion`   | **Required** - String (`0.1`)                     |
| `version`           | **Required** - String (semver)                    |
| `id`                | **Required** - String                             |
| `packageName`       | **Required** - String                             |
| `productType`       | **Required** - String (`app`, `portal`, `mobile`) |
| `name.short`        | **Required** - String (max: 30)                   |
| `name.full`         | **Required** - String                             |
| `description.short` | **Required** - String (max: 80)                   |
| `description.full`  | **Required** - String (max: 4000)                 |
| `icons.color`       | **Required** - String                             |
| `developer.name`    | **Required** - String                             |

### Example of a Manifest File

Example of all fields that a manifest can contain. The manifest file must be in JSON format and will be hosted in your environment.
**Please note that comments are not valid in JSON files.**

```json
{
  // Version of the schema this manifest is using.
  //   Supported version: "0.1"
  "manifestVersion": "0.1",

  // Version of your plugin in semver (http://semver.org).
  //   Any Changes the manifest should cause a version bump
  "version": "1.0.0",

  // Unique identifier for this plugin.
  "id": "my-plugin-id",

  // Unique identifier for this plugin in reverse domain format.
  //   E.g: com.example.myplugin
  "packageName": "com.example.myplugin",

  // Specifies the target Wazo product for this plugin.
  //   E.g: portal | app | mobile
  "productType": "app",

  // Plugin name
  "name": {
    // Short display name. (max length: 30)
    "short": "Plugin Name",
    // Full display name.
    "full": "Full Plugin name"
  },

  // Plugin description
  "description": {
    // Short description of your plugin
    "short": "Short description of your plugin (<= 80 chars)",
    // Full description of your plugin
    "full": "Full description of your plugin (<= 4000 chars)"
  },

  // Plugin icons
  "icons": {
    // File URL or path to a full color PNG / SVG icon.
    "color": "./assets/colors.svg",
    // File URL or path to a transparent outlined icon in black.
    "outline": "./assets/outline.svg"
  },

  // Plugin requirements
  "requirements": {
    // Minimum stack version required to load the plugin (prevents incompatibility with newer APIs)
    //   Note: If not defined, the plugin will load on any stack version.
    "minStackVersion": "XX.YY"
  },

  // Developer / author information
  "developer": {
    // Name for the developer / author.
    "name": "My Name",
    // Url to the page that provides support information for the plugin.
    "websiteUrl": "https://website.com/",
    // Url to the page that provides privacy information for the plugin.
    "privacyUrl": "https://website.com/privacy"
  },

  // A set of tabs that may be 'pinned' by default, without the user adding them manually. Static tabs declared in personal scope are always pinned to the app's personal experience. Static tabs do not currently support the 'teams' scope
  "staticTabs": [
    {
      // Unique identifier for this tab.
      "entityId": "sms",
      // Context where the tab by accessible.
      "context": ["generalTab", "userTab", "phonebookTab"],
      // Tab display name
      "name": "SMS",
      // URL or path to show UI of this tab.
      "contentUrl": "./sms.html"
    }
  ],

  // Define a background script, that runs when user is not inside a plugin tabs.
  "backgroundScript": "./background.js",

  // Localization configuration
  "localizationInfo": {
    // Default language used by default and inside this manifest file.
    "defaultLanguageTag": "en",
    // Configure additional languages and respective file
    "additionalLanguages": [
      {
        "languageTag": "fr",
        "file": "fr.json"
      }
    ]
  }
}
```

## Enabling your Plugin

For development or production environment, the process is the same. See our deployment section on how to deploy each type of application.

After that you'll be ready to customize the [Web and Desktop application](./web-desktop-application), the [Mobile Application](./mobile) or [Portal](./portal)

## Translation Support

Using the `localizationInfo` you can add other `manifest.json` files containing translations for a specific language.

In your main `manifest.json` file:

```json
"localizationInfo": {
  "defaultLanguageTag": "en",
  "additionalLanguages": [
    {
      "languageTag": "fr",
      "file": "fr.json"
    }
  ]
}
```

The `file` path can be relative to the `manifest.json` path or absolute.

The `fr.json` file will look like this :

```json
{
  "$schema": "https://developer.microsoft.com/json-schemas/teams/v1.5/MicrosoftTeams.Localization.schema.json",
  "manifestVersion": "0.1",
  "staticTabs[0].name": "Texto"
}
```

You can create an entry with the JSON path to every `manifest.json` elements, here we change the `staticTabs[0].name` element.
So if we have in our `manifest.json` file :

```json
"staticTabs": [
  {
    "entityId": "sms",
    "context": ["generalTab"],
    "name": "SMS",
    "contentUrl": "./general.html"
  }
],
```

The value `SMS` will be translated to `Texto` when the user changes locale to `fr`.

Currently supported locales are : `en` and `fr`.
