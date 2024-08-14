---
displayed_sidebar: pluginsSidebar
---

# Customizing our Web and Desktop App

:::info
`manifest.json` files should be served using a CORS-enabled http server.
:::

## The Possibilities

Apps plugins allow many great ways to extend the interface. Here's a quick summary, scroll down for more information.

- Add new pages/sections
- Extend existing pages with new tabs
- Extend Settings pannel
- Run code logic inside a background script

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
    "contentUrl": "./content.html"
  }
],
```

When the user clicks on the tab, the `contentUrl` will be loaded.

## Adding tabs in the sidebar

![App configuration (small)](/img/wda-sidebar.png)

To create a new tab in the main screen, add a `staticTabs` in your manifest with a `sidebarTab` `context` :
```json
"staticTabs": [
  {
    "entityId": "my id",
    "context": [
      "sidebarTab"
    ],
    "name": "My label",
    "contentUrl": "./content.html",
    "icon": "./assets/icon.svg"
  }
],
```

The `icon` should be a white `svg` file for better results.

When the user clicks on the tab, the `contentUrl` will be loaded.

## Adding tabs for a contact

![App configuration](/img/wda-contact.png)

To create a new tab in the main screen, add a `staticTabs` in your manifest with a `contactTab` `context` :
```json
"staticTabs": [
  {
    "entityId": "my id",
    "context": [
      "contactTab"
    ],
    "name": "My label",
    "contentUrl": "./content.html"
  }
],
```

When the user clicks on the tab, the `contentUrl` will be loaded.

## Adding tabs in the phonebook

![App configuration](/img/wda-phonebook.png)

To create a new tab in the main screen, add a `staticTabs` in your manifest with a `phonebookTab` `context` :
```json
"staticTabs": [
  {
    "entityId": "my id",
    "context": [
      "phonebookTab"
    ],
    "name": "My label",
    "contentUrl": "./content.html"
  }
],
```

When the user clicks on the tab, the `contentUrl` will be loaded.

## Adding tabs in the setting menu

![App configuration](/img/wda-settings-menu.png)

To create a new tab in the settings menu, add a `staticTabs` in your manifest with a `settingsTab` `context` :
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

## Adding a custom panel inside the setting menu

![App configuration](/img/wda-settings-inner.png)

To create a new tab in the settings menu, add a `staticTabs` in your manifest with a `innerSettingsTab` `context` :
```json
"staticTabs": [
  {
    "entityId": "settings-tab",
    "context": [
      "innerSettingsTab"
    ],
    "position": 101,
    "name": "My settings",
    "contentUrl": "./tab.html",
    "icon": "./tab.svg"
  }
]
```

Please refer to the documentation of `settingsTab` about the position attribute.

## Adding a background script

You can add custom code when the user is not using a custom tab. It can be useful to handle incoming calls, or other events.

```json
{
  // ...
  "backgroundScript": "./background.js"
}
```

Please refer to the [SDK](./sdk) documentation to know how to inject custom code in the application.**

The background script is always running, even when the user is logged out. Please make sure to remove all related background tasks when the `onLogout` listener event is fired.
