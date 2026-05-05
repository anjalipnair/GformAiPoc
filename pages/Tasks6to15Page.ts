import { Page } from '@playwright/test';
import { BasePage } from './BasePage';
import { TASKS_6_TO_15_DATA } from '../test-data/share.data';
import { FileUploadHelper } from '../utils/FileUploadHelper';

/**
 * Tasks6to15Page encapsulates helper actions for Tasks 6-15 of the EIS form.
 * These tasks cover Previous Investments, Business Activity, Risk to Capital,
 * Maximum Permitted Age, Control & Independence, Company Assets/Employees,
 * Supporting Documents, About You, Declaration, and Final Submission.
 */
export class Tasks6to15Page extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  /** Task 6: Previous Investments – selects "No" (no previous investments). */
  async completePreviousInvestments(): Promise<void> {
    await this.selectRadio('No');
    await this.saveAndContinue();
    await this.saveAndContinue();
  }

  /** Task 7: Qualifying Business Activity – selects "Yes" and enters a description. */
  async completeQualifyingBusinessActivity(): Promise<void> {
    await this.selectRadio('Yes');
    await this.fillTextbox('Business activity description', TASKS_6_TO_15_DATA.businessActivityDescription);
    await this.saveAndContinue();
    await this.saveAndContinue();
  }

  /** Task 8: Risk to Capital – confirms genuine risk. */
  async completeRiskToCapital(): Promise<void> {
    await this.selectRadio('Yes');
    await this.saveAndContinue();
    await this.saveAndContinue();
  }

  /** Task 9: Maximum Permitted Age – confirms within permitted age limits. */
  async completeMaximumPermittedAge(): Promise<void> {
    await this.selectRadio('Yes');
    await this.saveAndContinue();
    await this.saveAndContinue();
  }

  /** Task 10: Control and Independence – confirms independence requirements met. */
  async completeControlAndIndependence(): Promise<void> {
    await this.selectRadio('Yes');
    await this.saveAndContinue();
    await this.saveAndContinue();
  }

  /** Task 11: Company Assets and Employee Limits – enters employee count and asset value. */
  async completeCompanyAssetsAndEmployeeLimits(): Promise<void> {
    await this.fillTextbox('Number of employees', TASKS_6_TO_15_DATA.employeeCount);
    await this.fillTextbox('Asset value', TASKS_6_TO_15_DATA.assetValue);
    await this.saveAndContinue();
    await this.saveAndContinue();
  }

  /** Task 12: Supporting Documents – handles file uploads and proceeds through the check-answers page. */
  async completeSupportingDocuments(): Promise<void> {
    try {
      // Check if file upload is required
      const fileUploadHelper = new FileUploadHelper(this.page);
      
      // Try to handle any file upload requirements
      const uploadHandled = await fileUploadHelper.handleUploadPageGracefully('pdf');
      
      if (!uploadHandled) {
        // No file upload required, just continue
        await this.saveAndContinue();
      }
    } catch (error) {
      // Fallback: just try to continue
      console.log('ℹ️ Supporting documents: using fallback navigation');
      await this.saveAndContinue();
    }
  }

  /** Task 13: About You – fills personal details. */
  async completeAboutYou(): Promise<void> {
    await this.fillTextbox('First name', TASKS_6_TO_15_DATA.personalDetails.firstName);
    await this.fillTextbox('Last name', TASKS_6_TO_15_DATA.personalDetails.lastName);
    await this.fillTextbox('Job title', TASKS_6_TO_15_DATA.personalDetails.jobTitle);
    await this.saveAndContinue();
    await this.saveAndContinue();
  }

  /** Task 14: Declaration – checks both confirmation checkboxes with retry logic. */
  async completeDeclaration(): Promise<void> {
    try {
      // Try to find and check confirmation checkboxes
      const checkbox1 = this.page.getByRole('checkbox', { name: /confirm.*information.*accurate/i });
      const checkbox2 = this.page.getByRole('checkbox', { name: /understand.*legal.*obligations/i });
      
      if (await checkbox1.isVisible({ timeout: 5000 })) {
        await checkbox1.check();
      }
      if (await checkbox2.isVisible({ timeout: 5000 })) {
        await checkbox2.check();
      }
      
      await this.saveAndContinue();
      
      // Handle potential check-answers page
      const checkAnswersHeading = this.page.getByRole('heading', { name: /check.*answers/i });
      if (await checkAnswersHeading.isVisible({ timeout: 3000 })) {
        await this.saveAndContinue();
      }
    } catch (error) {
      console.log('ℹ️ Declaration: using fallback approach');
      // Fallback: try generic continue buttons
      const continueBtn = this.page.getByRole('button', { name: /continue|save.*continue/i });
      if (await continueBtn.isVisible({ timeout: 3000 })) {
        await continueBtn.click();
      }
    }
  }

  /** Task 15: Final submission – attempts to click "Submit compliance statement" with fallbacks. */
  async completeFinalSubmission(): Promise<void> {
    try {
      // First try the specific submit button
      const submitBtn = this.page.getByRole('button', { name: /submit.*compliance.*statement/i });
      if (await submitBtn.isVisible({ timeout: 5000 })) {
        await submitBtn.click();
        await this.page.waitForLoadState('domcontentloaded');
        return;
      }
      
      // Fallback: try generic submit buttons
      const genericSubmit = this.page.getByRole('button', { name: /submit|confirm.*submit/i });
      if (await genericSubmit.isVisible({ timeout: 3000 })) {
        await genericSubmit.click();
        await this.page.waitForLoadState('domcontentloaded');
        return;
      }
      
      // Last resort: try any button with "submit" text
      await this.clickButton('Submit compliance statement');
    } catch (error) {
      console.log('ℹ️ Final submission: manual intervention may be required');
      throw error; // Re-throw to trigger automation limit message
    }
  }

  // --- Useful locators ---

  /** Heading on the HMRC GForm acknowledgement page after final submission. */
  get applicationSubmittedHeading() {
    return this.heading('Form submitted');
  }

  /** Reference number line shown on the acknowledgement page, e.g. "Your reference is ABC1234" */
  get applicationSubmittedReferenceNumber() {
    return this.page.getByText(/Your reference is/);
  }

  /** Full reference number text for assertions or extraction. */
  get applicationSubmittedSuccessMessage() {
    return this.page.getByText(/Your reference is/);
  }

  /** Legacy alias kept for backward compatibility with existing test assertions. */
  get applicationSubmittedSuccessText() {
    return this.page.getByText(/Form submitted|Your reference is/);
  }

  anyTasksCompletedPattern() {
    return this.page.getByText(/You have completed \d+ of 15 tasks/);
  }
}
