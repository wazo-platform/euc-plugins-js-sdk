---
sidebar_position: 3
sidebar_label: Web and Desktop
---

# Customizing the Web and Desktop application

:::info
This part is still in development, changes may occur frequently.
:::

:::caution
`manifest.json` files should be served using a CORS-enabled http server.
:::

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

![App configuration (small)](/img/wda-sidebar.png)

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
    "icon": "https://example.com/assets/icon.svg"
  }
],
```

The `icon` should be a white `svg` file for better results.

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

## Adding tabs in the setting menu

![App configuration](/img/wda-settings-menu.png)

To create a new tab in the settings menu, add a `settingsTab` in your manifest with a `generalTab` `context` :
```json
"staticTabs": [
  {
    "entityId": "settings-tab",
    "context": [
      "settingsTab"
    ],
    "position": 101,
    "name": "My settings",
    "contentUrl": "./tab.html",
    "icon": "./tab.svg"
  }
]
```

You can define the menu item's position using the `position` attributes. Existing positions in the application are :

| Position | Name            |
|----------|-----------------|
| 100      | Media Settings  |
| 200      | Notifications   |
| 300      | Call Forwarding |
| 400      | Integrations    |
| 500      | Connection      |
| 600      | Language        |
| 700      | Country         | 
| 800      | Shortcuts       |
| 900:     | Switchboard     |
| 1000     | Divider         |
| 1100     | Update App      |
| 1200     | About           |

Your menu will be ordered depending on the `position` value.

When the user clicks on the tab, the `contentUrl` will be loaded.

## Adding a background script

You can add custom code when the user is not using a custom tab. It can be useful to handle incoming calls, or other events.

```json
"backgroundScript": "https://my-website/background.js"
```

Please refer to the [SDK](/docs/sdk) documentation to know how to inject custom code in the application.**

The background script is always running, even when the user is logged out. Please make sure to remove all related background tasks when the `onLogout` listener event is fired.
