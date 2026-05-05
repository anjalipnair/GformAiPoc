import { Page } from '@playwright/test';
import { BasePage } from './BasePage';
import { URLS } from '../config/urls';
import { AUTH_DATA } from '../test-data/auth.data';

/**
 * AuthPage encapsulates the Government Gateway stub login screen.
 */
export class AuthPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  /** Navigate to the auth-login-stub and authenticate as an Organisation. */
  async login(): Promise<void> {
    await this.page.goto(URLS.AUTH_LOGIN);
    await this.fillTextbox('Redirect URL', AUTH_DATA.redirectUrl);
    await this.page.getByLabel('Affinity Group').selectOption([AUTH_DATA.affinityGroup]);
    await this.clickButton('Submit', 2);
  }
}
