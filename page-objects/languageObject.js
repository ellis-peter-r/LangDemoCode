import { expect } from '@playwright/test';

export class LanguageObject {
  constructor(page) {
    this.page = page;
    this.langListButton = page.locator('[data-testid="translate-button"]');
    this.translatedLink = null;
  }

  async goto() { 
    await this.page.goto('https://uvahealth.com/');
  }
  
  async selectLanguage(languageLabel) {
    await this.langListButton.click(); // Open the language dropdown
    const langOption = this.page.locator(`[data-testid="translate-link-${languageLabel}"]`);// Select the desired language option
    await langOption.click(); // Click the desired language option
  }

  async verifyVolunteerTranslation(expectedText) {
    this.translatedLink = this.page.locator('a', { hasText: expectedText }).first();
    await expect(this.translatedLink).toBeVisible();
  }
}