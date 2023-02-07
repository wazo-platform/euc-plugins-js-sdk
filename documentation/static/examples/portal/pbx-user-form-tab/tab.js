import app from 'https://unpkg.com/@wazo/euc-plugins-sdk@latest/lib/esm/app.js';

(async () => {
  await app.initialize();
  const context = app.getContext();

  document.getElementById('name').innerHTML = context.app.extra.record.auth.username;
})();
