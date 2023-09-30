import { test, expect } from '@playwright/test';

test('Importing library in browser does not throw any error', async ({ page }) => {
  page.on('console', msg => {
    if (msg.type() === 'error') {
      throw new Error(msg.text());
    }
  });

  await page.goto('http://localhost:3000/test/browser');

  await new Promise(resolve => setTimeout(resolve, 500));
});
