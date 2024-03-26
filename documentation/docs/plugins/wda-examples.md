---
displayed_sidebar: pluginsSidebar
---

import BrowserWindow from '@site/src/components/BrowserWindow';
import ButtonsTrySource from '@site/src/components/ButtonsTrySource';


# E-UC Apps Plugin Examples

## Changing the sidebar color when entering the module, and resetting the color when leaving it

```mdx-code-block
<BrowserWindow url="https://app.wazo.io">
```
![Change app color](/img/app-example-color.jpg)
```mdx-code-block
</BrowserWindow>
```

```js
// background.js
app.onAppUnLoaded(tabId => {
  if (tabId === 'sidebar-color') {
    app.openLeftPanel();
    app.resetNavBarColor();
  }
})

// tab.js
await app.initialize();
app.closeLeftPanel();
app.changeNavBarColor('#8e6a3a');
```

<ButtonsTrySource
    product="app"
    manifest="https://wazo-communication.github.io/euc-plugins-js-sdk/examples/wda/sidebar-color/manifest.json"
    source="https://github.com/wazo-communication/euc-plugins-js-sdk/tree/master/documentation/static/examples/wda/sidebar-color"
/>

## Displaying a modal for incoming calls

```mdx-code-block
<BrowserWindow url="https://app.wazo.io">
```
![Incoming modal](/img/app-example-modal.jpg)
```mdx-code-block
</BrowserWindow>
```

```js
// backgroundScript
app.onCallIncoming = async call => {
  app.displayModal({
    title: `Incoming call for ${call.displayName}`,
    text: `Client number: ${call.number}`,
    height: '50%',
    width: '70%',
  });
};

await app.initialize();
```

<ButtonsTrySource
    product="app"
    manifest="https://wazo-communication.github.io/euc-plugins-js-sdk/examples/wda/incoming-call-modal/manifest.json"
    source="https://github.com/wazo-communication/euc-plugins-js-sdk/tree/master/documentation/static/examples/wda/incoming-call-modal"
/>

## Displaying a banner

```mdx-code-block
<BrowserWindow url="https://app.wazo.io">
```
![Banner](/img/app-example-banner.png)
```mdx-code-block
</BrowserWindow>
```

```js
// backgroundScript
await app.initialize();
app.displayBanner({
  url: 'https://grim.ngrok.io/banner.html',
  height: '60px',
  hideCloseButton: true,
});

```

In the `banner.html` file:
```html
<html>
  <body>
      <a href="https://my-website.com" target="_blank">You trial has expired</a>
      <a href="#" id="close">x</a>

      <script type="module">
        app.initialize();

        document.getElementById('close').addEventListener('click', (e) => {
          e.preventDefault();
          app.removeBanner();
        });
      </script>
  </body>
</html>
```

## Send and receive messages between background script and tabs

```mdx-code-block
<BrowserWindow url="https://app.wazo.io">
```
![Incoming modal](/img/app-example-background.jpg)
```mdx-code-block
</BrowserWindow>
```

```js
// tab
app.onIframeMessage = (msg) => {
  console.log('onIframeMessage', msg);
}

(async () => {
  await app.initialize();
  app.sendMessageToBackground({ value: 'ping', myData: 'abcd' });
})();

// backgroundScript
app.onBackgroundMessage = msg => {
  console.log('onBackgroundMessage', msg);
  app.sendMessageToIframe({ value: 'pong', customerId: 1234 });
}

app.initialize();
```

<ButtonsTrySource
    product="app"
    manifest="https://wazo-communication.github.io/euc-plugins-js-sdk/examples/wda/iframe-bg-messaging/manifest.json"
    source="https://github.com/wazo-communication/euc-plugins-js-sdk/tree/master/documentation/static/examples/wda/iframe-bg-messaging"
/>

## Adding a settings menu

```mdx-code-block
<BrowserWindow url="https://app.wazo.io">
```
![Incoming modal](/img/app-example-setting.jpg)
```mdx-code-block
</BrowserWindow>
```


```json
"staticTabs": [
  {
    "entityId": "settings-tab",
    "context": [
      "settingsTab"
    ],
    "position": 1001,
    "name": "My settings",
    "contentUrl": "./tab.html",
    "icon": "./tab.svg"
  }
]
```

<ButtonsTrySource
    product="app"
    manifest="https://wazo-communication.github.io/euc-plugins-js-sdk/examples/wda/settings-menu/manifest.json"
    source="https://github.com/wazo-communication/euc-plugins-js-sdk/tree/master/documentation/static/examples/wda/settings-menu"
/>

## Displaying local and remote video as miniature

```js
const createVideoWithStream = stream => {
  const video = document.createElement('video');
  video.style.position = 'absolute';
  video.style.width = '100px';
  video.style.height = '60px';
  video.style.top = '20px';
  video.autoplay = true;

  video.srcObject = stream;
  video.muted = true;

  video.onloadedmetadata = () => {
    const tracks = stream.getVideoTracks();
    tracks.forEach(track => {
      track.enabled = true;
      track.loaded = true;
    });
  };

  document.body.appendChild(video);

  return video;
}

app.onCallAnswered = (call) => {
  if (app.hasLocalVideoStream(call)) {
    local = createVideoWithStream(app.getLocalCurrentVideoStream(call));
    local.style.right = '10px';
  }

  if (app.hasRemoveVideoStream(call)) {
    remote = createVideoWithStream(app.getRemoteVideoStream(call));
    remote.style.right = '150px';
  }
};
```

<ButtonsTrySource
    product="app"
    manifest="https://wazo-communication.github.io/euc-plugins-js-sdk/examples/wda/video-pip/manifest.json"
    source="https://github.com/wazo-communication/euc-plugins-js-sdk/tree/master/documentation/static/examples/wda/video-pip"
/>

## Configuring and playing sounds

```js
app.initialize();

app.configureSounds({
  message: 'https://audio-previews.elements.envatousercontent.com/files/156322809/preview.mp3'
});

setTimeout(() => {
  // You can now play this custom sound, or receive a message in WDA to hear this sound.
  // In a setTimeout to avoid chrome restriction about sound playing without user interaction: https://developer.chrome.com/blog/autoplay
  app.playNewMessageSound();
}, 2000);
```

<ButtonsTrySource
    product="app"
    manifest="https://wazo-communication.github.io/euc-plugins-js-sdk/examples/wda/configure-sounds/manifest.json"
    source="https://github.com/wazo-communication/euc-plugins-js-sdk/tree/master/documentation/static/examples/wda/configure-sounds"
/>
