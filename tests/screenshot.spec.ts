import { test } from '@playwright/test';

test('screenshot', async ({ page, browserName }) => {
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' })
  await page.screenshot({ path: `./screenshots/${browserName}-${Date.now()}.png`, fullPage: true })
});