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

You must provide the following information in a manifest file (json format) that will be hosted in your environment.

```json
{
  "manifestVersion": "0.1",
  "version": "1.0.0",
  "id": "my-application-id",
  "packageName": "com.acme.myapp",
  "developer": {
    "name": "My Name",
    "websiteUrl": "https://website.com/",
    "privacyUrl": "https://website.com/privacy",
  },
  "localizationInfo": {
    "defaultLanguageTag": "en",
    "additionalLanguages": [
      {
        "languageTag": "fr",
        "file": "fr.json"
      }
    ]
  },
  "name": {
    "short": "App Name",
    "full": "Full app name"
  },
  "description": {
    "short": "Short description of your app (<= 80 chars)",
    "full": "Full description of your app (<= 4000 chars)"
  },
  "icons": {
    "outline": "https://fr.m.wikipedia.org/wiki/Fichier:Cat_%28113020%29_-_The_Noun_Project.svg",
    "color": "https://fr.m.wikipedia.org/wiki/Fichier:Cat_%28113020%29_-_The_Noun_Project.svg"
  },
  "staticTabs": [
    {
      "entityId": "sms",
      "context": [
        "generalTab",
        "userTab",
        "phonebookTab"
      ],
      "name": "SMS",
      "contentUrl": "https://my-websit/sms.html"
    }
  ],
  "backgroundScript": "https://my-website/background.js"
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

