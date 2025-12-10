import { test, expect } from '@playwright/test';

test.describe('Home Page', () => {
  test('should load the home page', async ({ page }) => {
    await page.goto('/');
    
    // Check title
    await expect(page).toHaveTitle(/Mon Joël/);
    
    // Check hero section
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    
    // Check CTA buttons
    await expect(page.getByRole('link', { name: /diagnostic/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /appeler/i })).toBeVisible();
  });

  test('should navigate to diagnostic page', async ({ page }) => {
    await page.goto('/');
    
    // Click on diagnostic CTA
    await page.getByRole('link', { name: /diagnostic/i }).first().click();
    
    // Should be on diagnostic page
    await expect(page).toHaveURL('/diagnostic-ia');
    await expect(page.getByRole('heading', { name: /diagnostic/i })).toBeVisible();
  });

  test('should have proper SEO meta tags', async ({ page }) => {
    await page.goto('/');
    
    // Check meta description
    const metaDescription = await page.getAttribute('meta[name="description"]', 'content');
    expect(metaDescription).toBeTruthy();
    expect(metaDescription?.length).toBeGreaterThan(50);
    
    // Check og:title
    const ogTitle = await page.getAttribute('meta[property="og:title"]', 'content');
    expect(ogTitle).toBeTruthy();
  });

  test('should display trust badges', async ({ page }) => {
    await page.goto('/');
    
    // Check for trust indicators
    await expect(page.getByText(/24h\/24/i).first()).toBeVisible();
    await expect(page.getByText(/artisans/i).first()).toBeVisible();
  });
});

