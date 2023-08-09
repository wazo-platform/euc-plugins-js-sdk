---
displayed_sidebar: pluginsSidebar
---

# Customizing our Mobile App

## The Possibilities

Mobile plugins allow many great ways to extend the interface. He's a quick summary, scroll down for more information.

- Add tabs on the main page of the application

## Adding tabs in the main page

![App configuration (small)](/img/mobile-tab1.png)

![App configuration (small)](/img/mobile-tab2.png)

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

Please refer to the [SDK](./sdk) documentation to know how to inject custom code in the application.
