---
displayed_sidebar: pluginsSidebar
---

# Customizing our Mobile App

## The Possibilities

Mobile plugins allow many great ways to extend the interface. Here's a quick summary, scroll down for more information.

- Add tabs on the main page of the application

## Adding tabs in the main page

![App configuration (small)](/img/mobile-tab1.png)

![App configuration (small)](/img/mobile-tab2.png)

To create a new tab in the main screen, add a `staticTabs` in your manifest with a `mobileTab` context :
```json
"staticTabs": [
  {
    "entityId": "my id",
    "mobileIcon": "chatbox-ellipses-outline",
    "context": [
      "mobileTab"
    ],
    "name": "My label",
    "contentUrl": "https://my-websit/content.html"
  }
],
```

The `mobileIcon` should be one of the [Ionic icons](https://ionic.io/ionicons) values (Android only).

When the user clicks on the tab, the `contentUrl` will be loaded.

Please refer to the [SDK](./sdk) documentation to know how to inject custom code in the application.

## Sending a push notification that opens the application directly on the plugin screen

You can send a push through Wazo API like :

```sh
curl -X POST --header 'Content-Type: application/json' --header 'Accept: application/json' --header 'Wazo-Tenant: xxx' --header 'X-Auth-Token: xxx' -d '{ \
   "title": "Title of my push", \
   "body": "Body of my push", \
   "extra": { \
     "plugin": { \
        "id": "my-plugin-id", \
        "entityId": "entity-id-of-plugin-to-open", \
        "action": "open", \
        "payload": { \
          "some-data": "to send to you app" \
        } \
      } \
   }, \
   "notification_type": "somePush", \
   "user_uuid": "xxxx" \
 }' 'https://my-stack.io/api/webhookd/1.0/mobile/notifications'
```

When the user's Wazo Mobile application is not open, they will receive a notification.

By tapping on this notification, the Wazo Mobile application will open, and the user will be redirected to your plugin's tab.

## Receiving payload from the push

When sending a push notification, you have the option to include additional data in the `extra.plugin` field.

This data can be accessed in your plugin with:

```js
await app.initialize();
const context = app.getContext();

const payloadFromMyPush = context.app.extra.payload;
```
