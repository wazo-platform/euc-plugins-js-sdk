---
sidebar_position: 2
sidebar_label: Configuration
---

# Configuration your plugins with the Wazo Portal

⚠️ This part is still in development process, changes may happen frequently.

## Manifest file

Using one or multiple manifest file you can customize all the Wazo EUC application.

### Example of a Manifest file

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

### Configuring the manifest URL in Portal

When connected to your stack in portal go to **Settings > Applications > App Configuration**.

If no application is configured, create a new configuration for your application.

In the *Advanced* section, add a new key with the name `manifest_urls`  and value the value of your manifest file(s) URL(s), like:

![App configuration](/img/app-config-portal.png)

Now you're all set you can choose to customize the [Web and Desktop application](/docs/web-desktop-application), the [Mobile Application](/docs/mobile) or [Portal](/docs/portal)

### Translating manifest elements

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
