---
displayed_sidebar: pluginsSidebar
---

import BrowserWindow from '@site/src/components/BrowserWindow';
import ButtonsTrySource from '@site/src/components/ButtonsTrySource';

# Portal Plugin Examples

## Adding a Tab in the PBX Dashboard Page

```mdx-code-block
<BrowserWindow url="https://portal.wazo.io">
```
![New PBX Dashboard Tab](/img/portal-custom-dashboard-tab.jpg)
```mdx-code-block
</BrowserWindow>
```

```js
await app.initialize();
const context = app.getContext();

document.getElementById('name').innerHTML = context.app.extra.record.auth.username;
```

<ButtonsTrySource
    product="portal"
    manifest="https://wazo-communication.github.io/euc-plugins-js-sdk/examples/portal/pbx-dashboard-tab/manifest.json"
    source="https://github.com/wazo-communication/euc-plugins-js-sdk/tree/master/documentation/static/examples/portal/pbx-dashboard-tab"
/>


## Adding a New Tab in the PBX User Edition Form

```mdx-code-block
<BrowserWindow url="https://portal.wazo.io">
```
![New PBX users tab](/img/portal-custom-pbx-user-tab.jpg)
```mdx-code-block
</BrowserWindow>
```

You may want to create your own page/form in a PBX form.
See [This section](./portal#adding-tabs-in-a-form) for more information.

```js
await app.initialize();
const context = app.getContext();

// You'll find information about the PBX user in `context.app.extra.record`;
document.getElementById('name').innerHTML = context.app.extra.record.auth.username;
```

<ButtonsTrySource
    product="portal"
    manifest="https://wazo-communication.github.io/euc-plugins-js-sdk/examples/portal/pbx-user-form-tab/manifest.json"
    source="https://github.com/wazo-communication/euc-plugins-js-sdk/tree/master/documentation/static/examples/portal/pbx-user-form-tab"
/>

