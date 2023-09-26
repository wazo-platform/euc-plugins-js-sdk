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

### Example of a Manifest File

:::info
`manifest.json` files should be served using a CORS-enabled HTTP server.
:::

You must provide the following information in a manifest file (JSON format) that will be hosted in your environment.
**Please note that comments are not valid in JSON files**

```json
{
  // (Required) Version of the schema this manifest is using.
  //            Supported version: "0.1"
  "manifestVersion": "0.1",

  // (Required) Version of your plugin in semver (http://semver.org).
  //            Any Changes the manifest should cause a version bump
  "version": "1.0.0",

  // (Required) Unique identifier for this plugin.
  "id": "my-plugin-id",

  // (Required) Unique identifier for this plugin in reverse domain format.
  //            E.g: com.example.myplugin
  "packageName": "com.example.myplugin",

  // (Required) Specifies the target Wazo product for this plugin.
  //            E.g: portal | app | mobile
  "productType": "app",

  // (Required) Plugin name
  "name": {
    // (Required) Short display name. (max length: 30)
    "short": "Plugin Name",
    // (Required) Full display name.
    "full": "Full Plugin name"
  },

  // (Required) Plugin description
  "description": {
    // (Required) Short description of your plugin
    "short": "Short description of your plugin (<= 80 chars)",
    // (Required) Full description of your plugin
    "full": "Full description of your plugin (<= 4000 chars)"
  },

  // (Required) Plugin icons
  "icons": {
    // (Required) File URL or path to a full color PNG / SVG icon.
    "color": "https://fr.m.wikipedia.org/wiki/Fichier:Cat_%28113020%29_-_The_Noun_Project.svg",
    // (Optional) File URL or path to a transparent outlined icon in black.
    "outline": "https://fr.m.wikipedia.org/wiki/Fichier:Cat_%28113020%29_-_The_Noun_Project.svg",
  },

  // (Required) Developer / author information
  "developer": {
    // (Required) Name for the developer / author.
    "name": "My Name",
    // (Optional) Url to the page that provides support information for the plugin.
    "websiteUrl": "https://website.com/",
    // (Optional) Url to the page that provides privacy information for the plugin.
    "privacyUrl": "https://website.com/privacy",
  },

  // (Required) A set of tabs that may be 'pinned' by default, without the user adding them manually. Static tabs declared in personal scope are always pinned to the app's personal experience. Static tabs do not currently support the 'teams' scope
  "staticTabs": [
    {
      // (Required) Unique identifier for this tab.
      "entityId": "sms",
      // (Required) Context where the tab by accessible.
      "context": [
        "generalTab",
        "userTab",
        "phonebookTab"
      ],
      // (Required) Tab display name
      "name": "SMS",
      // (Required) URL or path to show UI of this tab.
      "contentUrl": "https://example.com/sms.html"
    }
  ],

  // (Optional) Define a background script, that runs when user is not inside a plugin tabs.
  "backgroundScript": "https://example.com/background.js",

  // (Optional) Localization configuration
  "localizationInfo": {
    // (Optional) Default language used by default and inside this manifest file.
    "defaultLanguageTag": "en",
    // (Optionnal) Configure additional languages and respective file
    "additionalLanguages": [
      {
        "languageTag": "fr",
        "file": "fr.json"
      },
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

