// language.spec.js
import { test } from '@playwright/test';
import { LanguageObject } from '../page-objects/languageObject.js';

test.describe('Language Selection Tests', () => {
  let languageObject;

  test.beforeEach(async ({ page }) => {
    languageObject = new LanguageObject(page);
    await languageObject.goto();
  });

  test('Verify language translations for Volunteer link', async () => {
    const volunteerTranslation = [
      ['es', 'Voluntario'], //Spanish
      ['ko', '자원 봉사자'], //Korean
      ['ar', 'متطوع'], //Arabic
      ['fa-AF', 'داوطلب'], //Dari
      ['en', 'Volunteer'], //English
    ];

    for (const [languageLabel, expectedText] of volunteerTranslation) { 
      await languageObject.selectLanguage(languageLabel);
      await languageObject.verifyVolunteerTranslation(expectedText);
    }
    
  });
});