---
sidebar_position: 4
sidebar_label: Mobile
---

# Customizing the Mobile application

⚠️ This part is still in development process, changes may happen frequently.

## Adding tabs in the main page

![App configuration](/img/mobile-tab1.png)

![App configuration](/img/mobile-tab2.png)

To create a new tab in the main screen, add a `staticTabs` in your manifest with a `generalTab` `context` :
```json
"staticTabs": [
  {
    "entityId": "my id",
    "mobileIcon": "chatbox-ellipses-outline",
    "context": [
      "generalTab"
    ],
    "name": "My label",
    "contentUrl": "https://my-websit/content.html"
  }
],
```

The `mobileIcon` should be one of the [Ionic icons](https://ionic.io/ionicons) values (Android only).

When the user clicks on the tab, the `contentUrl` will be loaded.

Please refer to the [SDK](/docs/sdk) documentation to know how to inject custom code in the application.
