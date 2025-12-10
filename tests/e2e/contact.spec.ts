import { test, expect } from '@playwright/test';

test.describe('Contact Page', () => {
  test('should load the contact page', async ({ page }) => {
    await page.goto('/contact');
    
    // Check title
    await expect(page).toHaveTitle(/contact/i);
    
    // Check form fields are present
    await expect(page.getByLabel(/nom/i)).toBeVisible();
    await expect(page.getByLabel(/email/i).first()).toBeVisible();
    await expect(page.getByLabel(/message/i)).toBeVisible();
  });

  test('should display contact information', async ({ page }) => {
    await page.goto('/contact');
    
    // Check contact methods are displayed
    await expect(page.getByText('06 12 01 87 81')).toBeVisible();
    await expect(page.getByText('contact@monjoel.com')).toBeVisible();
  });

  test('should allow form filling', async ({ page }) => {
    await page.goto('/contact');
    
    // Fill out the form
    await page.getByLabel(/nom/i).fill('Test User');
    await page.getByLabel(/email/i).first().fill('test@example.com');
    await page.getByLabel(/message/i).fill('Ceci est un message de test.');
    
    // Check values are filled
    await expect(page.getByLabel(/nom/i)).toHaveValue('Test User');
    await expect(page.getByLabel(/email/i).first()).toHaveValue('test@example.com');
  });

  test('should have submit button', async ({ page }) => {
    await page.goto('/contact');
    
    const submitButton = page.getByRole('button', { name: /envoyer/i });
    await expect(submitButton).toBeVisible();
  });
});

