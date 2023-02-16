---
sidebar_position: 8
sidebar_label: Plugins Examples
---

# Web and Desktop application examples

### Changing the sidebar color when entering the module, and resetting the color when leaving it

```js
app.onUnLoaded = () => {
  app.openLeftPanel();
  app.resetNavBarColor();
};

(async () => {
  await app.initialize();
  app.closeLeftPanel();
  app.changeNavBarColor('#8e6a3a');
})();

```

<a class="try-it button button--secondary button--lg" href="https://app.wazo.io/?manifestUrl=https://wazo-communication.github.io/euc-plugins-js-sdk/examples/wda/sidebar-color/manifest.json" target="_blank">
    🎨 Try changing the sidebar !
</a>

### Displaying a modal for incoming calls

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

<a class="try-it button button--secondary button--lg" href="https://app.wazo.io/?manifestUrl=https://wazo-communication.github.io/euc-plugins-js-sdk/examples/wda/incoming-call-modal/manifest.json" target="_blank">
    ☎️ Try the incoming call modal !
</a>

### Send and receive message between backgroundScript and tabs

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

<a class="try-it button button--secondary button--lg" href="https://app.wazo.io/?manifestUrl=https://wazo-communication.github.io/euc-plugins-js-sdk/examples/wda/incoming-call-modal/manifest.json" target="_blank">
    📣 Try sending messages between background and tab
</a>

### Adding a settings menu

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

<a class="try-it button button--secondary button--lg" href="https://app.wazo.io/?manifestUrl=https://wazo-communication.github.io/euc-plugins-js-sdk/examples/wda/settings-menu/manifest.json" target="_blank">
    📣 Try adding a new settings menu
</a>

# Portal

### Adding a tab in the PBX dashboard page

```js
(async () => {
  await app.initialize();
  const context = app.getContext();
  
  document.getElementById('name').innerHTML = context.app.extra.record.auth.username;
})();
```

<a class="try-it button button--secondary button--lg" href="https://portal.wazo.io/?manifestUrl=https://wazo-communication.github.io/euc-plugins-js-sdk/examples/portal/pbx-dashboard-tab/manifest.json" target="_blank">
    📊 Add a tab in the PBX dashboard
</a>

### Adding a new tab in the PBX user edition form

![New pbx user tab (small)](/img/portal-custom-pbx-user-tab.png)

You may want to create you own page / form in a PBX form.
See [This section](./portal#adding-tabs-in-a-form) for more information.

```js
app.onUnLoaded = () => {
  // Displaying the toolbar again when we leave the tab
  app.changeToolbarDisplay(true);
}

// Removing the toolbar
app.changeToolbarDisplay(false);

(async () => {
  await app.initialize();
  const context = app.getContext();

  // You'll find information about the PBX user in `context.app.extra.record`;
  document.getElementById('name').innerHTML = context.app.extra.record.auth.username;
})();
```

<a class="try-it button button--secondary button--lg" href="https://portal.wazo.io/?manifestUrl=https://wazo-communication.github.io/euc-plugins-js-sdk/examples/portal/pbx-user-form-tab/manifest.json" target="_blank">
    👨‍🦰 Add a tab in the PBX user form !
</a>
