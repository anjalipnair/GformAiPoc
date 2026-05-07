import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';
import { URLS } from '../config/urls';

/**
 * DashboardPage represents the EIS task-list (checklist) screen that appears
 * after login and after each task is completed.
 */
export class DashboardPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  /** Returns the task-completion progress indicator. */
  completedTasksCount(completedCount: number, totalCount = 15): Locator {
    return this.text(`You have completed ${completedCount} of ${totalCount} tasks`);
  }

  /** Navigate directly to the EIS task list (dashboard). */
  async goToTaskList(): Promise<void> {
    // Click the service header link which navigates to the task list while preserving the current session
    await this.page.click('a:has-text("Submit an Enterprise Investment Scheme")');
    await this.page.waitForLoadState('domcontentloaded');
  }

  /** Navigate to the Eligibility task. */
  async goToEligibilityTask(): Promise<void> {
    await this.clickLink('Eligibility for EIS service');
  }

  /** Navigate to the Company Details task. */
  async goToCompanyDetailsTask(): Promise<void> {
    await this.clickLink('Company details');
  }

  /** Navigate to the Business Address task. */
  async goToBusinessAddressTask(): Promise<void> {
    await this.clickLink('Business address');
  }

  /** Navigate to the Knowledge-intensive companies task. */
  async goToKicTask(): Promise<void> {
    await this.clickLink('Knowledge-intensive companies');
  }

  /** Navigate to the Share Issue task. */
  async goToShareIssueTask(): Promise<void> {
    // Wait for page to be ready and try multiple selection strategies
    await this.page.waitForLoadState('domcontentloaded');
    
    try {
      // Strategy 1: Standard text match
      const shareLink = this.page.getByRole('link', { name: 'Share issue' });
      if (await shareLink.isVisible({ timeout: 3000 })) {
        await shareLink.click();
        return;
      }
    } catch (error) {
      console.log('ℹ️  Standard Share issue link not found, trying alternatives...');
    }
    
    try {
      // Strategy 2: Partial text match
      const shareLinkPartial = this.page.getByRole('link', { name: /[Ss]hare issue/ });
      if (await shareLinkPartial.isVisible({ timeout: 2000 })) {
        await shareLinkPartial.click();
        return;
      }
    } catch (error) {
      console.log('ℹ️  Partial Share issue link not found, trying href match...');
    }
    
    try {
      // Strategy 3: URL-based selection
      const shareHrefLink = this.page.locator('a[href*="share-issue"]');
      if (await shareHrefLink.isVisible({ timeout: 2000 })) {
        await shareHrefLink.click();
        return;
      }
    } catch (error) {
      console.log('⚠️  All Share issue link strategies failed, falling back to standard method');
    }
    
    // Fallback to original method
    await this.clickLink('Share issue'); 
  }

  /** Navigate to the Previous Investments task. */
  async goToPreviousInvestmentsTask(): Promise<void> {
    await this.clickLink('Previous investments');
  }

  /** Navigate to the Qualifying Business Activity task. */
  async goToQualifyingBusinessActivityTask(): Promise<void> {
    await this.clickLink('Qualifying business activity');
  }

  /** Navigate to the Risk to Capital task. */
  async goToRiskToCapitalTask(): Promise<void> {
    await this.clickLink('Risk to capital');
  }

  /** Navigate to the Maximum Permitted Age task. */
  async goToMaximumPermittedAgeTask(): Promise<void> {
    await this.clickLink('Maximum permitted age');
  }

  /** Navigate to the Control and Independence task. */
  async goToControlAndIndependenceTask(): Promise<void> {
    await this.clickLink('Control and independence');
  }

  /** Navigate to the Company Assets and Employee Limits task. */
  async goToCompanyAssetsTask(): Promise<void> {
    // Try exact link text first, then increasingly flexible patterns
    const strategies = [
      () => this.page.getByRole('link', { name: 'Company assets and employee limits' }),
      () => this.page.getByRole('link', { name: /company assets/i }),
      () => this.page.getByRole('link', { name: /employee limits/i }),
      () => this.page.locator('a[href*="company-assets"], a[href*="asset"], a[href*="employee"]').first(),
    ];
    for (const strategy of strategies) {
      const locator = strategy();
      if (await locator.isVisible({ timeout: 3000 }).catch(() => false)) {
        await locator.click();
        return;
      }
    }
    await this.clickLink('Company assets and employee limits');
  }

  /** Navigate to the Supporting Documents task. */
  async goToSupportingDocumentsTask(): Promise<void> {
    await this.clickLink('Your supporting documents');
  }

  /** Navigate to the About You task. */
  async goToAboutYouTask(): Promise<void> {
    await this.clickLink('About you');
  }

  /** Navigate to the Declaration task. */
  async goToDeclarationTask(): Promise<void> {
    const strategies = [
      () => this.page.getByRole('link', { name: 'Your declaration' }),
      () => this.page.getByRole('link', { name: /declaration/i }),
      () => this.page.locator('a[href*="declaration"]').first(),
    ];
    for (const strategy of strategies) {
      const locator = strategy();
      if (await locator.isVisible({ timeout: 3000 }).catch(() => false)) {
        await locator.click();
        return;
      }
    }
    await this.clickLink('Your declaration');
  }

  /** Navigate to the final submission task. */
  async goToFinalSubmissionTask(): Promise<void> {
    await this.clickLink('Check answers and submit compliance statement');
  }
}
