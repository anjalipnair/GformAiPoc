import { Page, Locator } from '@playwright/test';

/**
 * BasePage provides common Playwright helpers shared across all page objects.
 * All POM classes extend this base class.
 */
export abstract class BasePage {
  protected readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  /** Expose the underlying Playwright Page for advanced operations (e.g. setting timeouts). */
  get underlyingPage(): Page {
    return this.page;
  }

  /** Click a button identified by visible text. */
  async clickButton(name: string, index = 0): Promise<void> {
    const buttons = this.page.getByRole('button', { name });
    if (index > 0) {
      await buttons.nth(index).click();
    } else {
      await buttons.first().click();
    }
  }

  /** Click a link identified by visible text. */
  async clickLink(name: string): Promise<void> {
    await this.page.getByRole('link', { name }).click();
  }

  /** Select a radio button identified by its label. */
  async selectRadio(name: string): Promise<void> {
    await this.page.getByRole('radio', { name }).click();
  }

  /** Fill a textbox identified by its accessible label. */
  async fillTextbox(label: string, value: string): Promise<void> {
    await this.page.getByRole('textbox', { name: label }).fill(value);
  }

  /** Click "Save and continue" button. */
  async saveAndContinue(): Promise<void> {
    await this.clickButton('Save and continue');
  }

  /** Click "Continue" button. */
  async continue(): Promise<void> {
    await this.clickButton('Continue');
  }

  /** Return a heading locator for assertions. */
  heading(name: string): Locator {
    return this.page.getByRole('heading', { name });
  }

  /** Return a text locator for assertions. */
  text(value: string): Locator {
    return this.page.getByText(value);
  }
}
