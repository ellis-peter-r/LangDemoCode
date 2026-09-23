// languages.spec.js
import { test, expect } from '@playwright/test';

test.describe('Language Selection Tests', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('https://uvahealth.com/');
  });

  test('Language Selection', async ({ page }) => {
    const langListButton = page.locator('[data-testid="translate-button"]');
    const langDropdown = page.locator('[data-testid="header-dropdown-translate"]');
    
    const volunteerTranslation = [
      ['es', 'Voluntario'], //Spanish
      ['ko', '자원 봉사자'], //Korean
      ['ar', 'متطوع'], //Arabic
      ['fa-AF', 'داوطلب'], //Dari
      ['en', 'Volunteer'], //English
    ];
    
    for (const [languageLabel, expectedText] of volunteerTranslation) {
      await langListButton.click({delay: 200}); // Open the language dropdown
      await expect(langDropdown).toBeVisible(); // Verify that the dropdown is visible

      // Click the desired language option
      const langOption = page.locator(`[data-testid="translate-link-${languageLabel}"]`);
      await langOption.click();

      // Assert that the translated "Volunteer" text appears 
      const translatedLink = page.locator('a', { hasText: expectedText }).first();
      await expect(translatedLink).toBeVisible();
      await page.waitForTimeout(1000); //for demo purposes
    }
  });
});
