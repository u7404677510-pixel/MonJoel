import { test, expect } from '@playwright/test';

test.describe('Urgence Page', () => {
  test('should load the urgence page', async ({ page }) => {
    await page.goto('/urgence-serrurerie');
    
    // Check title
    await expect(page).toHaveTitle(/urgence/i);
    
    // Check phone number is visible
    await expect(page.getByText('06 12 01 87 81').first()).toBeVisible();
    
    // Check form is present
    await expect(page.getByLabel(/nom/i).first()).toBeVisible();
    await expect(page.getByLabel(/téléphone/i).first()).toBeVisible();
  });

  test('should have prominent CTA', async ({ page }) => {
    await page.goto('/urgence-serrurerie');
    
    // Phone link should be visible and clickable
    const phoneLink = page.getByRole('link', { name: /06 12 01 87 81/i }).first();
    await expect(phoneLink).toBeVisible();
    
    // Check href
    const href = await phoneLink.getAttribute('href');
    expect(href).toContain('tel:');
  });

  test('should display urgency types in dropdown', async ({ page }) => {
    await page.goto('/urgence-serrurerie');
    
    // Click on select to open dropdown
    await page.getByRole('combobox').first().click();
    
    // Check options are visible
    await expect(page.getByText(/porte claquée/i)).toBeVisible();
    await expect(page.getByText(/clé cassée/i)).toBeVisible();
  });
});

