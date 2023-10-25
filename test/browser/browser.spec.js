import http from 'http';

import { test } from '@playwright/test';
import handler from 'serve-handler';

const server = http.createServer((request, response) => {
  return handler(request, response);
});

test('Importing library in browser does not throw any error', async ({ page }) => {
  server.listen(3000);

  page.on('console', msg => {
    if (msg.type() === 'error') {
      throw new Error(msg.text());
    }
  });

  await page.goto('http://localhost:3000/test/browser');

  await new Promise(resolve => setTimeout(resolve, 500));
  server.close();
});
