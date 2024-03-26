---
displayed_sidebar: pluginsSidebar
---

# Plugins SDK API

:::caution
This part is still in the development process, changes may happen frequently.
:::

After installing the SDK, you can now require it with:

```js
import { App } from '@wazo/euc-plugins-sdk';
const app = new App();
```

## Lifecycle

Plugins can be loaded and unloaded depending on some actions inside our product (ex: login/logout, tenant change, etc). Here's the lifecycle of a plugin with related listeners. That will help you build a robust system based on user actions.

### Initializing

It's **required** to call `app.initialize()` function to registerer and acknowledge your plugin inside our E-UC Application. Please note this method is asynchronous.

```js
await app.initialize();
```

### Getting the Context

When the application is initialized, you can retrieve the context surrounding your plugin. A context will give you access to the app information that your plugin will base its logic on it.

```ts
import { Context } from '@wazo/euc-plugins-sdk/types';
const context: Context = app.getContext();
```

Information that the context will give you access to:
- `app: AppInfo`: Information about the EUC application
  - `locale: string`: The locale code of the application on 2 characters, like `en` or `it`.
  - `theme: Object`: Colors used by the EUC app.
    It uses the [Material UI theme](https://mui.com/material-ui/customization/palette/) palette structure, so you can use it directly with `createTheme()` or just pick the color you want in your plugin.
  - `host: AppHostInfo`: Contains a `clientType` value that can be `web` / `desktop` / `ios` or `android`
  - `extra: Object`: Contains extra information about the app context, like the `contact` when you use the `contactTab` manifest context.
    Among extra parameters, you'll always receive:
    - `extra.baseUrl`: The base url of your `manifest.json` file
    - `extra.pluginId`: The `entityId` of the current plugin.

- `user: UserInfo`: Information about the connected user in the EUC app:
  - `token: string`: The token that can be used for API calls
  - `refreshToken: string`: A refresh token that should be used if the `token` expires
  - `uuid: string`: The user uuid
  - `host`: In the web or desktop application: representing the stack hostname where the user is connected.
  See the [`WDASession`](https://github.com/wazo-communication/euc-plugins-js-sdk/blob/master/src/types.ts#L83) and the [`PortalSession`](https://github.com/wazo-communication/euc-plugins-js-sdk/blob/master/src/types.ts#L79) types for more information.

### Running

It's at this moment the magic happens, add your own logic inside our products. Depending on which product you're developing, there are many listeners or action creators that you can use with the SDK.

### Unloading

When a plugin is unloaded because of a user action (ex: logout), this listener `app.onPluginUnLoaded()` will be called. Other listeners will be disabled when unloaded. To prevent side effects, it's important to remove any watcher added in the initializing phase.

When the user logs in again, the `backgroundScript` will be reloaded, please make sure to release everything in `onPluginUnLoaded`.

:::info
If you're using a **background script**, it's important to close any WebSocket or listeners at this cycle of the plugin.
:::


## Global Events

### Plugin's Interface Unloaded

#### UI Listener

```js
app.onUnLoaded = () => {};
```

It's a sugar of `window.onunload`, useful when you want to store information before page/tab exit. **Important:** You can't do an action here like API call because the app (iframe) can be closed before the action will be finished.

#### Background Script Listener

```js
app.onAppUnLoaded = (tabId) => {};
```

Should be used in a `backgroundScript` to know when a custom tab is unloaded. As `app.onUnLoaded` is only triggered for tabs (iframes), and this event doesn't allow sophisticated actions (like sending messages to a background script, API calls, ...) we should use `onAppUnLoaded` to perform an action when a tab is unloaded.

### User Logs Out

```js
app.onLogout = () => {};
```

### User Session Refreshed

The token of the authenticated user has an expiration date; when the token expires, a session is created with a new token.
```js
app.onNewSession = (session:  WDASession | PortalSession) => {}
```


## E-UC Apps (Web and Desktop) {#wda}

### Methods

#### Opening and closing the left panel

```js
app.closeLeftPanel();
app.openLeftPanel();
```

Example:
```js
await app.initialize();
// Closing the web/desktop left panel when the page is loaded
app.closeLeftPanel();

app.onUnLoaded = () => {
  // Re-opening the panel when the page is unloaded
  app.openLeftPanel();
};
```

#### Starting a call

```js
app.startCall({ targets , requestedModalities = ['audio'] });
```

Example:

```js
app.startCall({ targets: ['8008'], requestedModalities: ['video'] });
```

#### Opening a link in the application

```js
app.openLink(url: string);
```

Example:

```js
// Opening the internal phonebook
app.openLink('/phonebook/internal');
```

#### Creating a meeting

```js
app.createMeeting(name: string, requireAuthorization = false, persistent = false);
```

Example:

```js
app.createMeeting('My meeting from my custom app', true, true);

// Wait for the meeting to be available
app.onMeetingCreated = newMeeting => {};
```

#### Opening a meeting lobby

```js
app.openMeetingLobby(extension: string);
```

Example:

```js
// Open the lobby when a meeting is created
app.onMeetingCreated = newMeeting => {
  app.openMeetingLobby(newMeeting.exten);
};
```

# Ignoring an incoming call

```js
app.onCallIncoming = call => {
  app.ignoreCall(call);
};
```

#### Playing a sound

```js
app.playNewMessageSound(); // Play the sound when we receive a text message
app.playIncomingCallSound(); // Play the incoming call sound (loop)
app.playProgressSound(); // Play the ringback sound when we make a call (loop)
app.playDoubleCallSound(); // Play the sound when another call is incoming
app.playHangupSound(); // Play the hangup sound
```

#### Stopping a sound

Sounds marked "loop" must be stopped using:

```js
app.stopCurrentSound();
```

#### Configuring sounds

You can use your own sound files in the application, with:

```js
app.configureSounds({
  progress: 'http://example/com/progress.mpg', // Played when making an outgoing call (ringback)
  ring: 'http://example/com/ring.wav', // Played for the first incoming call
  message: 'http://example/com/message.ogg', // Played when the user receives a chat message
  hangup: 'http://example/com/hangup.ogg',// Played when the call is hung up
  inboundCall: 'http://example/com/inbound.vaw', // Played when we are in call and another call is incoming. Also played in Switchboard.
})
```

You can omit a value, the default sound will be used.

#### Resetting sounds

You can reset all application sounds with:

```js
app.resetSounds();
```

#### Displaying a notification

Wazo will display browser or desktop notification depending on the environment where WDA is running.

```js
app.displayNotification(title: string, text: string);
```

#### Changing the navigation bar color

We can change the navigation bar color with a valid CSS color:

```js
app.changeNavBarColor(color: string);
```

Example:

```js
app.changeNavBarColor('#8e6a3a');
app.changeNavBarColor('white');
```

#### Resetting the navigation bar color

We can reset to the default navigation bar color with:

```js
app.resetNavBarColor();
```

#### Displaying a modal

We can display a modal in the `backgroundScript` with:

```js
app.displayModal({ url, title, text, htmlText, height, width, hideCloseButton });
```

If `url` is present, the modal will display an iframe with the content of the url.
If `htmlText` is present, the modal will display this text in a html contact, otherwise the `text` attribute will be used.
The `height` and `width` accept valid CSS values, like `500px` or `80%`.
`hideCloseButton` (default to false) determines if the close button should be displayed, or if the user should handle closing of the modal in the html content (through `app.removeModal()` method).

:::note
On mobile, links with a `target="_blank"` attribute will be opened in the user's default browser.
:::

Example:

Displaying client data when receiving a call

```js
app.onCallIncoming = async call => {
  console.log('background onCallIncoming', call);
  const clientData = await fetchClientData(call.number); // Where `fetchClientData` is a method that return client information from an extension

  app.displayModal({
    title: `Incoming call for ${call.displayName}`,
    text: `Last call was: ${clientData.lastCall} for : ${clientData.lastCallSubject}`,
    height: '50%',
    width: '70%',
  });
};
```

#### Displaying a banner (mobile only)

We can display a banner in the `backgroundScript` with:

```js
app.displayBanner({ url, height, width, hideCloseButton });
```

If `url` is present, the modal will display an iframe with the content of the url.
The `height` accepts valid CSS values, like `500px` or `80%`.
The `width` accepts valid CSS values, like `500px` or `80%`, used on WDA (min: `300px`).
`hideCloseButton` (default to false) determines if the close button should be displayed, or if the user should handle closing of the modal in the html content (through `app.removeModal()` method).

We can then call `app.removeBanner()` in the `backgroundScript` or the loaded content.

:::note
On mobile, links with a `target="_blank"` attribute will be opened in the user's default browser.
:::

:::note
On WDA, the banner will be integrated with other banners like incoming calls. Other banners will be displayed below.
:::

#### Checking if a call has a local video stream

```js
app.hasLocalVideoStream(call: Call);
```

Example:

```js
app.onCallAnswered = (call) => {
  const hasLocalVideo = app.hasLocalVideoStream(call);
}
```

#### Retrieving the local video stream of a call

```js
app.getLocalCurrentVideoStream(call: Call);
```

Example:

```js
app.onCallAnswered = (call) => {
  const stream = app.getLocalCurrentVideoStream(call);
}
```

#### Checking if a call has a remote video stream

```js
app.hasRemoteVideoStream(call: Call);
```

Example:

```js
app.onCallAnswered = (call) => {
  const hasRemoteVideo = app.hasRemoteVideoStream(call);
}
```

#### Retrieving the remote video stream of a call

```js
app.getRemoteCurrentVideoStream(call: Call);
```

Example:

```js
app.onCallAnswered = (call) => {
  const stream = app.getRemoteCurrentVideoStream(call);
}
```

#### Sending and receiving message between iframe and background script

Inside an iframe

```js
// Sending message to background
app.sendMessageToBackground({ value: 'ping' });

// Receiving a message from the background script
app.onIframeMessage = (msg) => {
  console.log('onIframeMessage', msg);
}
```

In the background script

```js
// Sending a message to the iframe
app.sendMessageToIframe({ value: 'pong' });

// Receiving a message from the iframe
app.onBackgroundMessage = msg => {
  console.log('onBackgroundMessage', msg);
}
```

#### Display a notification next to the navigation bar icon button
Uses MUI's [Badge](https://mui.com/material-ui/react-badge/) component to display a notification, generally an integer. When used in `background.js`, it requires `entityId` as set in a tab in the `staticTabs` section of `manifest.json`, and that tab must include "sidebarTab" in its context (`entityId` should automatically be set when called from the iframe).
```js
app.updateBadge({ badgeContent: number, color?: string = 'error', variant?: string, max?: number, overlap?: string, anchorOrigin?: Object, showZero?: boolean });
```

⚠️ On Wazo Mobile, only the field `badgeContent: number` is used to display the badge.

### Events

#### A call for the current user is incoming

```js
app.onCallIncoming = (call: Call) =>  {
  // Useful to react in a `backgroundScript`.
};
```

#### A call is made by the user (eg: outgoing call)

```js
app.onCallMade = (call: Call) =>  {
  // Useful to react in a `backgroundScript`.
};
```

#### An incoming call is answered by the current user

```js
app.onCallAnswered = (call: Call) =>  {
  // Useful to react in a `backgroundScript`.
};
```

#### A call is answered (by one or the other side)

```js
app.onCallAccepted = (call: Call) =>  {
  // Useful to react in a `backgroundScript`.
};
```

#### A call is hung up

```js
app.onCallHungUp = (call: Call) =>  {
  // Useful to react in a `backgroundScript`.
};
```

#### Listening to Wazo Websocket message

```js
app.onWebsocketMessage = (message: MessageEvent) =>  {
  // Useful to react in a `backgroundScript`.
};
```

#### Listening to meeting creation

```js
app.onMeetingCreated = (meeting: Meeting) =>  { };
```

#### Listening navigation change in the app

```js
app.onRouteChanged = (location: Object, action: string) =>  { };
```

#### Listening when a user enters a Room

```js
app.onUserJoinRoom = (room) => {};
```

#### Listening when a user leavers a Room

```js
app.onUserLeaveRoom = (room) => {};
```

#### Listening when a participant enters a Room

```js
app.onParticipantJoinRoom = (room, participant) => {};
```

#### Listening when a participant leavers a Room

```js
app.onParticipantLeaveRoom = (room, participant) => {};
```

## E-UC Portal {#portal}

### Methods

#### Changing the display of the toolbar in a custom form

```js
app.changeToolbarDisplay(displayed: boolean);
```

### Events

#### Check when the user is connected to a stack

```js
app.onConnectedToStack = (stackSession: Object) => {};
```

#### Check when the user is connected or switch to a tenant

```js
app.onSwitchTenant = (uuid: string, name: string) => {};
```

## E-UC Mobile {#mobile}

### Methods

#### Change the header

`title`: Changes the label displayed in the header. Set this value to `null` to set it back to the default value.

`callback`: Handles the back button click. If a callback is registered, the app will forgo its normal behavior and run it. Setting the value to `null` reinstates the original behavior.

```js
app.setMobileHeader({ title?: string | null, callback?: Function | null });
```
#### Show / hide bottom navigation

Define whether you want to show or hide the bottom navigation

```js
app.setMobileShowBottomNav(show: boolean);
```
