---
sidebar_position: 7
sidebar_label: EUC Plugins SDK
---

# Using the EUC plugins SDK

⚠️ This part is still in development process, changes may happen frequently.

After installing the SDK, you can now require it with:

```js
import { App } from '@wazo/euc-plugins-sdk';
const app = new App();
```

## Initializing your application

```js
await app.initialize();
```

This method is asynchronous so the EUC application can know that your app is registered and your app will acknowledge it. 

## Retrieving the EUC app context

After initializing your application, you can call :

```js
import { Context } from '@wazo/euc-plugins-sdk/types';
const context: Context = app.getContext();
```

The context will give you access to the app information like :
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


## Interacting with the Web and Desktop application

### Opening and closing the left panel

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

### Starting a call

```js
app.startCall({ targets , requestedModalities = ['audio'] });
```

Example:

```js
app.startCall({ targets: ['8008'], requestedModalities: ['video'] });
```

### Opening a link in the application

```js
app.openLink(url: string);
```

Example:

```js
// Opening the internal phonebook
app.openLink('/phonebook/internal');
```

### Creating a meeting

```js
app.createMeeting(name: string, requireAuthorization = false, persistent = false);
```

Example:

```js
app.createMeeting('My meeting from my custom app', true, true);

// Wait for the meeting to be available
app.onMeetingCreated = newMeeting => {
};
```

### Opening a meeting lobby

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

### Playing a sound

```js
app.playNewMessageSound(); // Play the sound when we receive a text message
app.playIncomingCallSound(); // Play the incoming call sound (loop)
app.playProgressSound(); // Play the ringback sound when we make a call (loop)
app.playDoubleCallSound(); // Play the sound when another call is incoming
app.playHangupSound(); // Play the hangup sound
```

### Stopping a sound

Sounds marked "loop" must be stopped using:

```js
app.stopCurrentSound();
```

### Configuring sounds

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

### Resetting sounds

You can reset all application sounds with:

```js
app.resetSounds();
```

### Displaying a notification

Wazo will display browser or desktop notification depending on the environment where WDA is running.

```js
app.displayNotification(title: string, text: string);
```

### Changing the navigation bar color

We can change the navigation bar color with a valid CSS color:

```js
app.changeNavBarColor(color: string);
```

Example:

```js
app.changeNavBarColor('#8e6a3a');
app.changeNavBarColor('white');
```

### Resetting the navigation bar color

We can reset to the default navigation bar color with:

```js
app.resetNavBarColor();
```

### Displaying a modal

We can display a modal in the `backgroundScript` with:

```js
app.displayModal({ url, title, text, htmlText, height, width });
```

If `url` is present, the modal will display an iframe with the content of the url.
If `htmlText` is present, the modal will display this text in a html contact, otherwise the `text` attribute will be used.
The `height` and `width` accept valid CSS values, like `500px` or `80%`.

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

### Checking if a call has a local video stream

```js
app.hasLocalVideoStream(call: Call);
```

Example:

```js
app.onCallAnswered = (call) => {
  const hasLocalVideo = app.hasLocalVideoStream(call);
}
```

### Retrieving the local video stream of a call

```js
app.getLocalCurrentVideoStream(call: Call);
```

Example:

```js
app.onCallAnswered = (call) => {
  const stream = app.getLocalCurrentVideoStream(call);
}
```

### Checking if a call has a remote video stream

```js
app.hasRemoteVideoStream(call: Call);
```

Example:

```js
app.onCallAnswered = (call) => {
  const hasRemoteVideo = app.hasRemoteVideoStream(call);
}
```

### Retrieving the remote video stream of a call

```js
app.getRemoteCurrentVideoStream(call: Call);
```

Example:

```js
app.onCallAnswered = (call) => {
  const stream = app.getRemoteCurrentVideoStream(call);
}
```

### Sending and receiving message between iframe and background script

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

### Events

#### Application is unloaded (in backgroundScript)

Should be used in a `backgroundScript` to know when a custom tab is unloaded.

⚠️ As `app.onUnLoaded` is only triggered for tabs (iframes), and this event doesn't allow sophisticated actions (like sending messages to backgroundScript, API calls, ...)
we should use `onAppUnLoaded` to perform action when a tab is unloaded.

```js
app.onAppUnLoaded = (tabId) => {};
```

#### Application is unloaded (in application)

This action is fired in the application (not in the `backgroundScript`).
It's a sugar for `window.onunload`, so you can't do action here like API call because the app (iframe) can be closed before the action finished.

```js
app.onUnLoaded = () => {};
```

#### User logs out

```js
app.onLogout = () => {};
```

#### User session refreshed

The token of the authenticated user has an expiration date; when the token expires, a session is created with a new token.
```js
app.onNewSession = (session:  WDASession | PortalSession) => {}
```

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

#### A call is answered by the user

```js
app.onCallAnswered = (call: Call) =>  {
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
app.onMeetingCreated = (meeting: Meeting) =>  {
};
```

#### Listening navigation change in the app

```js
app.onRouteChanged = (location: Object, action: string) =>  {
};
```

#### Listening when a user enters a Room

```js
app.onUserJoinRoom = (room) => {
};
```

#### Listening when a user leavers a Room

```js
app.onUserLeaveRoom = (room) => {
};
```

#### Listening when a participant enters a Room

```js
app.onParticipantJoinRoom = (room, participant) => {
};
```

#### Listening when a participant leavers a Room

```js
app.onParticipantLeaveRoom = (room, participant) => {
};
```

## Interacting with the Portal application

### Methods

#### Changing the display of the toolbar in a custom form

```js
app.changeToolbarDisplay(displayed: boolean);
```

### Events

#### Check when the user is connected to a stack

```js
app.onConnectedToStack = (stackSession: Object) => {
  
};
```

#### Check when the user is connected or switch to a tenant

```js
app.onSwitchTenant = (uuid: string, name: string) => {
  
};
```

#### Display a notification next to the navigation bar icon button
Uses MUI's [Badge](https://mui.com/material-ui/react-badge/) component to display a notification, generally an integer. When used in `background.js`, it requires `entityId` as set in a tab in the `staticTabs` section of `manifest.json`, and that tab must include "sidebarTab" in its context (`entityId` should automatically be set when called from the iframe).
```js
app.updateBadge = ({ entityId: string, badgeContent: number, color?: string = 'error', variant?: string, max?: number, overlap?: string, anchorOrigin?: Object, showZero?: boolean });
```
