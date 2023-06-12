---
displayed_sidebar: pluginsSidebar
pagination_next: plugins/deploy
---

# Translation Support

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

The value `SMS` will be translated to `Texto` when the user changes their locale to `fr`.

## Supported Locales

We currently only support English and French, only the following values are allowed :
- `en`
- `fr`

