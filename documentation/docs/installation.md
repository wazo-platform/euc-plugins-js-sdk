---
sidebar_position: 1
---

# Installation

Let's install the **EUC plugins SDK in less than 5 minutes**.

## Using a package manager

You may install the Wazo JavaScript Software Development Kit to your project one of the following ways:

```bash
npm install @wazo/euc-plugins-sdk
```

### Or with yarn

```bash
yarn add @wazo/euc-plugins-sdk
```

Then

```js
import { app } from '@wazo/euc-plugins-sdk';
```

## Using a Content Delivery Networks (CDN)

Alternatively, you may load the Wazo SDK from a CDN. Use one of the following Content Delivery Networks:

### UNPKG

```js
import app from 'https://unpkg.com/@wazo/euc-plugins-sdk@latest/lib/esm/app.js';
import softphone from 'https://unpkg.com/@wazo/euc-plugins-sdk@latest/lib/esm/softphone.js';
```

### jsDelivr

```js
import app from 'https://cdn.jsdelivr.net/npm/@wazo/euc-plugins-sdk@latest/lib/esm/app.js';
import softphone from 'https://cdn.jsdelivr.net/npm/@wazo/euc-plugins-sdk@latest/lib/esm/softphone.js';
```

