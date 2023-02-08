import app from 'https://cdn.jsdelivr.net/npm/@wazo/euc-plugins-sdk@latest/lib/esm/app.js';

app.onUnLoaded = () => {
  app.openLeftPanel();
  app.resetNavBarColor();
};

(async () => {
  await app.initialize();
  app.closeLeftPanel();
  app.changeNavBarColor('#8e6a3a');
})();
