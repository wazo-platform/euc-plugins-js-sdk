---
sidebar_position: 8
sidebar_label: Plugins Examples
draft: true
---

# Web and Desktop application examples

### Changing the sidebar color when entering the module, and resetting the color when leaving it

```js
app.onUnLoaded = () => {
  app.openLeftPanel();
  app.resetNavBarColor();
};

app.changeNavBarColor('#8e6a3a');
app.initialize();
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
