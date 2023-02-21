import app from 'https://cdn.jsdelivr.net/npm/@wazo/euc-plugins-sdk@latest/lib/esm/app.js';

app.onIframeMessage = (msg) => {
  console.log('onIframeMessage', msg);
}

(async () => {
  await app.initialize();
  app.sendMessageToBackground({ value: 'ping', myData: 'abcd' });
})();
