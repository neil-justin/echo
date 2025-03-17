import test, { expect } from '@playwright/test';

test.skip('User registered successfully', async ({ page }) => {
  await page.goto('/auth/register');

  await page
    .getByRole('textbox', { name: 'Email' })
    .fill(process.env.TEST_EMAIL!);
  await page
    .getByRole('textbox', { name: 'Password' })
    .fill(process.env.TEST_PASSWORD!);
  await page.getByRole('button', { name: 'Register' }).click();

  await expect(page.getByTestId('auth-form')).not.toBeVisible();
});
