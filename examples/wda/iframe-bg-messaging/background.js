import { App } from 'https://unpkg.com/@wazo/euc-plugins-sdk@latest/lib/esm/app.js';

const app = new App();

app.onBackgroundMessage = msg => {
  console.log('onBackgroundMessage', msg);
  app.sendMessageToIframe({ value: 'pong', customerId: 1234 });
}

app.initialize();
