import { App } from 'https://unpkg.com/@wazo/euc-plugins-sdk@latest/lib/esm/app.js';

const app = new App();

app.onAppUnLoaded(tabId => {
  if (tabId === 'sidebar-color') {
    app.openLeftPanel();
    app.resetNavBarColor();
  }
})
