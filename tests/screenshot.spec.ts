import { test } from '@playwright/test';

test('screenshot', async ({ page, browserName }) => {
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' })
  await page.screenshot({ path: `./screenshots/${browserName}-${Date.now()}.png`, fullPage: true })
})

test('screenshot-settings', async ({ page, browserName }) => {
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' })
  await page.getByRole('button', { name: 'Settings' }).click()
  await page.screenshot({ path: `./screenshots/${browserName}-settings-${Date.now()}.png`, fullPage: true })
})