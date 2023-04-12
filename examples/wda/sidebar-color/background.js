import app from 'https://cdn.jsdelivr.net/npm/@wazo/euc-plugins-sdk@latest/lib/esm/app.js';

app.onAppUnLoaded(tabId => {
  if (tabId === 'sidebar-color') {
    app.openLeftPanel();
    app.resetNavBarColor();
  }
})
