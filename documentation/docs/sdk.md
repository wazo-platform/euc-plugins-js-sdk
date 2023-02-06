---
sidebar_position: 7
sidebar_label: EUC Plugins SDK
---

# Using the EUC plugins SDK

⚠️ This part is still in development process, changes may happen frequently.

After installing the SDK, you can now require it with:

```js
import { app } from '@wazo/euc-plugins-sdk';
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
  - `locale: string`: The locale code of the application.
  - `theme: Object`: Colors used by the EUC app.
  - `host: AppHostInfo`: Contains a `clientType` value that can be `web` / `desktop` / `ios` or `android`
  - `extra: Object`: Contains extra information about the app context, like the `contact` when you use the `contactTab` manifest context.

- `user: UserInfo`: Information about the connected user in the EUC app:
  - `token: string`: The token that can be used for API calls
  - `refreshToken: string`: A refresh token that should be used if the `token` expires
  - `uuid: string`: The user uuid
  See the `WDASession` and the `PortalSession` types for more information.


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
app.startCall({ targets: '8008' , requestedModalities: ['video'] });
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

### Events

#### User logs out

```js
app.onLogout = () => {};
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

#### A call is hanged up

```js
app.onCallHangedUp = (call: Call) =>  {
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

## Interacting with the Portal application

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
