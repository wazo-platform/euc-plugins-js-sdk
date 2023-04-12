import app from 'https://cdn.jsdelivr.net/npm/@wazo/euc-plugins-sdk@latest/lib/esm/app.js';

(async () => {
  await app.initialize();
  app.closeLeftPanel();
  app.changeNavBarColor('#8e6a3a');
})();
