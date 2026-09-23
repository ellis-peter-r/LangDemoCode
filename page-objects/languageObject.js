import { expect } from '@playwright/test';

export class LanguageObject {
  constructor(page) {
    this.page = page;
    this.langListButton = page.locator('[data-testid="translate-button"]');
    this.langDropdown = page.locator('[data-testid="header-dropdown-translate"]');
    this.translatedLink = null;
  }

  async goto() { 
    await this.page.goto('https://uvahealth.com/');
  }
  
  async selectLanguage(languageLabel) {
    await this.langListButton.click({delay: 200}); // Open the language dropdown
    await expect(this.langDropdown).toBeVisible(); // Verify that the dropdown is visible
    const langOption = this.page.locator(`[data-testid="translate-link-${languageLabel}"]`);// Select the desired language option
    await langOption.click(); // Click the desired language option
  }

  async verifyVolunteerTranslation(expectedText) {
    this.translatedLink = this.page.locator('a', { hasText: expectedText }).first();
    await expect(this.translatedLink).toBeVisible();
  }
}