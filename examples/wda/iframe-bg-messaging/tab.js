import { App } from 'https://cdn.jsdelivr.net/npm/@wazo/euc-plugins-sdk@latest/lib/esm/app.js';

const app = new App();

app.onIframeMessage = (msg) => {
  console.log('onIframeMessage', msg);
}

(async () => {
  await app.initialize();
  app.sendMessageToBackground({ value: 'ping', myData: 'abcd' });
})();
