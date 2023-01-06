---
sidebar_position: 3
sidebar_label: Web and Desktop
---

# Customizing the Web and Desktop application

⚠️ This part is still in development process, changes may happen frequently.

## Adding tabs in the main page

![App configuration](/img/wda-tab-example.png)

To create a new tab in the main screen, add a `staticTabs` in your manifest with a `generalTab` `context` :
```json
"staticTabs": [
    {
      "entityId": "my id",
      "context": [
        "generalTab"
      ],
      "name": "My label",
      "contentUrl": "https://my-websit/content.html"
    }
  ],
```

When the user clicks on the tab, the `contentUrl` will be loaded.

## Adding tabs in the sidebar

![App configuration](/img/wda-sidebar.png)

To create a new tab in the main screen, add a `sidebarTab` in your manifest with a `generalTab` `context` :
```json
"staticTabs": [
  {
    "entityId": "my id",
    "context": [
      "sidebarTab"
    ],
    "name": "My label",
    "contentUrl": "https://my-websit/content.html",
    "icon": "https://example.com/assets/icon.png"
  }
],
```

When the user clicks on the tab, the `contentUrl` will be loaded.

## Adding tabs for a contact

![App configuration](/img/wda-contact.png)

To create a new tab in the main screen, add a `contactTab` in your manifest with a `generalTab` `context` :
```json
"staticTabs": [
  {
    "entityId": "my id",
    "context": [
      "contactTab"
    ],
    "name": "My label",
    "contentUrl": "https://my-websit/content.html"
  }
],
```

When the user clicks on the tab, the `contentUrl` will be loaded.

## Adding tabs in the phonebook

![App configuration](/img/wda-phonebook.png)

To create a new tab in the main screen, add a `phonebookTab` in your manifest with a `generalTab` `context` :
```json
"staticTabs": [
  {
    "entityId": "my id",
    "context": [
      "phonebookTab"
    ],
    "name": "My label",
    "contentUrl": "https://my-websit/content.html"
  }
],
```

When the user clicks on the tab, the `contentUrl` will be loaded.

## Adding a background script

You can add custom code when the user is not using a custom tab. It can be useful to handle incoming calls, or other events.

```json
"backgroundScript": "https://my-website/background.js"
```

Please refer to the [SDK](/docs/sdk) documentation to know how to inject custom code in the application.**
