import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * EligibilityPage encapsulates all actions for Task 1: Eligibility for EIS service.
 */
export class EligibilityPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  /**
   * Complete the EIS-eligible path (shares already issued, user confirms continuation).
   * This is the only path that allows the rest of the form to be completed.
   */
  async completeEisEligiblePath(): Promise<void> {
    await this.selectRadio('Yes');
    await this.saveAndContinue();
    await this.selectRadio('Yes, and I understand that if');
    await this.saveAndContinue();
    // Check answers page
    await this.saveAndContinue();
  }

  /**
   * Follow the SEIS redirect path (shares to be issued under SEIS).
   * This path blocks EIS form continuation.
   */
  async followSeisRedirectPath(): Promise<void> {
    await this.selectRadio('Yes');
    await this.saveAndContinue();
    await this.selectRadio('No, I intend for the shares to be treated as under the SEIS');
    await this.saveAndContinue();
  }

  /**
   * Follow the Advance Assurance path (shares not yet issued).
   * This path blocks EIS form continuation.
   */
  async followAdvanceAssurancePath(): Promise<void> {
    await this.selectRadio('No, I want to know if future investments would qualify for EIS');
    await this.saveAndContinue();
  }

  /** Returns the "shares already issued" question locator for assertions. */
  get sharesAlreadyIssuedQuestion() {
    return this.text('Have the shares already been issued to the investors who want EIS relief?');
  }

  /** Returns the EIS continuation confirmation question locator. */
  get confirmEisContinuationQuestion() {
    return this.text('Do you confirm you want to continue with this compliance statement for EIS?');
  }
}
