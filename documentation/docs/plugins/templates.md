---
displayed_sidebar: pluginsSidebar
---

import BrowserWindow from '@site/src/components/BrowserWindow';
import ButtonsTrySource from '@site/src/components/ButtonsTrySource';

# Templates

## All-In-One Template

Our react template is designed to streamline your development process, allowing you to focus on the core functionality of your plugin without the hassle of starting from scratch. You'll find all the necessary components and configurations pre-set, so you can simply plug in your ideas and get coding right away.

```mdx-code-block
<BrowserWindow url="https://app.wazo.io">
```
![New PBX Dashboard Tab](/img/all-in-one-template-app.jpg)
```mdx-code-block
</BrowserWindow>
```

```mdx-code-block
<BrowserWindow url="https://portal.wazo.io">
```
![New PBX Dashboard Tab](/img/all-in-one-template-portal.jpg)
```mdx-code-block
</BrowserWindow>
```

<ButtonsTrySource source="https://github.com/wazo-communication/euc-plugins-boilerplate" />

## Portal Templates

The following templates are adapted for [E-UC Portal](https://github.com/wazo-communication/euc-plugins-boilerplate) and include whitelabel support.

### HTML/JS/Materialize

This template uses vanilla Javascript, HTML and [Materialize](https://materializeweb.com/). Materialize is a modern responsive CSS framework based on Material Design by Google.

```mdx-code-block
<BrowserWindow url="https://portal.wazo.io">
```
![New PBX Dashboard Tab](/img/portal-template-materialize.jpg)
```mdx-code-block
</BrowserWindow>
```

<ButtonsTrySource
    product="portal"
    manifest="https://wazo-communication.github.io/euc-plugins-js-sdk/examples/portal/css/manifest.json"
    source="https://github.com/wazo-communication/euc-plugins-js-sdk/tree/master/documentation/static/examples/portal/css/materializecss.html"
/>

### HTML/JS/MUICSS

This template uses vanilla Javascript, HTML and [MUI (css)](https://www.muicss.com/). MUI is a lightweight CSS framework that follows Google's Material Design guidelines. MUI is designed from the ground up to be fast, small and developer-friendly.

```mdx-code-block
<BrowserWindow url="https://portal.wazo.io">
```
![New PBX Dashboard Tab](/img/portal-template-mui.jpg)
```mdx-code-block
</BrowserWindow>
```

<ButtonsTrySource
    product="portal"
    manifest="https://wazo-communication.github.io/euc-plugins-js-sdk/examples/portal/css/manifest.json"
    source="https://github.com/wazo-communication/euc-plugins-js-sdk/tree/master/documentation/static/examples/portal/css/muicss.html"
/>

