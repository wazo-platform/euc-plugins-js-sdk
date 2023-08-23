---
displayed_sidebar: pluginsSidebar
---

# Customizing E-UC Portal

:::info
`manifest.json` files should be served using a CORS-enabled http server.
:::

## The Possibilities

Portal plugins allow many great ways to extend the interface. He's a quick summary, scroll down for more information.

- Add new sections and links in the stack menu
- Add new sections in Global Settings
- Extend forms with new tabs
- Extend existing menus with new links
- Extend dashboards
- Run code logic inside a background script


## Adding tabs in the main page

![App configuration (small)](/img/portal-home-tab.png)

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

## Adding tabs in the main page of the PBX section

![App configuration (small](/img/portal-pbx-home-tab.png)

To create a new tab in the PBX main screen, add a `staticTabs` in your manifest with a `generalPbxTab` `context` :
```json
"staticTabs": [
  {
    "entityId": "my id",
    "context": [
      "generalPbxTab"
    ],
    "name": "My label",
    "contentUrl": "https://my-websit/content.html"
  }
],
```

When the user clicks on the tab, the `contentUrl` will be loaded.

## Adding tabs in a form

![App configuration](/img/portal-pbx-form.png)

To create a new tab in the PBX main screen, add a `staticTabs` in your manifest with a `pbx.*` `context` :
```json
"staticTabs": [
  {
    "entityId": "my id",
    "context": [
      "pbx.users"
    ],
    "name": "My label",
    "contentUrl": "https://my-websit/content.html"
  }
],
```

The `context` key can be one of `pbx.*` where `*` is : `users`, `lines`, `devices`, `ring-groups`, `voicemails`, ...


When the user clicks on the tab, the `contentUrl` will be loaded.

## Adding page in an existing menu of the PBX section

![App configuration (small](/img/portal-existing-menu.png)

To create a new page the PBX menu, add a `staticTabs` in your manifest with a `pbxMenu` `context` :
```json
"staticTabs": [
  {
    "entityId": "my id",
    "context": [
      "pbxMenu"
    ],
    "name": "My label",
    "parent": "common.layout.pbxMenu.userManagement",
    "contentUrl": "https://my-website.com/content.html"
  }
],
```

The `parent` key can be one of `common.layout.pbxMenu.*` where `*` is : `globalSettings`, `userManagement`, `callManagement`, `services`, `callCenter`,`reporting`, `soundsAndGreetings`, `settings`.

When the user clicks on the tab, the `contentUrl` will be loaded.

## Adding you own menu to display custom page

![App configuration (small](/img/portal-pbx-own-menu.png)

To create a new menu in the PBX section, add a `staticTabs` in your manifest with a `pbxMenu` `context` :
```json
"staticTabs": [
  {
    "entityId": "custom-child",
    "context": [
      "pbxMenu"
    ],
    "name": "New child",
    "parent": "New menu",
    "parentIcon": "AccountBalance",
    "contentUrl": "http://example.com/stats-stack.html"
  },
  {
    "entityId": "custom-child2",
    "context": [
      "pbxMenu"
    ],
    "name": "New child 2",
    "parent": "New menu",
    "parentIcon": "AccountBalance",
    "contentUrl": "http://example.com/stats-stack.html"
  },
],
```

When the user clicks on the tab, the `contentUrl` will be loaded.

## Adding you own section in the global settings page

![App configuration (small](/img/portal-pbx-global-settings.png)

To create a new menu in the PBX section, add a `staticTabs` in your manifest with a `globalSettings` `context` :
```json
"staticTabs": [
  {
    "entityId": "global-settings",
    "context": [
      "globalSettings"
    ],
    "name": "Custom global",
    "icon": "BrightnessHigh",
    "contentUrl": "http://localhost:3002/portal/global.html"
  }
],
```

The `icon` should be in the [Material UI icon](https://mui.com/material-ui/material-icons/) list.

When the user clicks on the tab, the `contentUrl` will be loaded.

## Adding a background script

You can add custom code when the user is not using a custom tab. It can be useful to handle custom events.

```json
  "backgroundScript": "https://my-website/background.js"
```

Please refer to the [SDK](./sdk) documentation to know how to inject custom code in the application.

The background script is always running, even when the user is logged out. Please make sure to remove all related background tasks when the `onLogout` listener event is fired.
