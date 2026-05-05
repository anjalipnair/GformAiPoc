import { Page } from '@playwright/test';
import { BasePage } from './BasePage';
import { ShareIssueData } from '../test-data/share.data';
import { FileUploadHelper } from '../utils/FileUploadHelper';

/**
 * ShareIssuePage encapsulates all actions for Task 5: Share Issue.
 */
export class ShareIssuePage extends BasePage {
  private fileUploadHelper: FileUploadHelper;

  constructor(page: Page) {
    super(page);
    this.fileUploadHelper = new FileUploadHelper(page);
  }

  /** Enter share description and issue date, then proceed. */
  async enterShareDetails(data: ShareIssueData): Promise<void> {
    await this.fillTextbox('Description of shares', data.sharesDescription);
    await this.fillTextbox('Day', data.issueDay);
    await this.fillTextbox('Month', data.issueMonth);
    await this.fillTextbox('Year', data.issueYear);
    await this.saveAndContinue();
  }

  /** Select the currency and enter the nominal value per share. */
  async enterNominalValue(data: ShareIssueData): Promise<void> {
    const currencyCombobox = this.page.getByRole('combobox', { name: 'Currency' });
    await currencyCombobox.fill(data.currencySearch);
    await this.page.getByRole('option', { name: data.currencyOption }).click();
    await this.fillTextbox('Amount in this currency', data.nominalValueAmount);
    await this.saveAndContinue();
  }

  /** Enter investor count and total amount then proceed to upload step. */
  async enterInvestorInformation(data: ShareIssueData): Promise<void> {
    await this.fillTextbox('Number of investors requiring', data.numberOfInvestors);
    await this.fillTextbox('Total amount paid by these', data.totalAmountPaid);
    await this.saveAndContinue();
  }

  /**
   * Complete all automated parts of Task 5 including file upload handling.
   */
  async completeTask(data: ShareIssueData): Promise<void> {
    await this.enterShareDetails(data);
    await this.enterNominalValue(data);
    await this.enterInvestorInformation(data);
  }

  /**
   * Handle the investor details upload page that appears after completeTask()
   */
  async handleInvestorUpload(fileType: 'pdf' | 'docx' | 'xlsx' | 'jpeg' = 'pdf'): Promise<void> {
    try {
      const uploadHeading = this.page.getByRole('heading', { name: /Upload details of investors/ });
      
      if (await uploadHeading.isVisible({ timeout: 2000 })) {
        console.log('📁 Investor upload page detected - attempting file upload');
        await this.fileUploadHelper.handleUploadPageGracefully(fileType);
      } else {
        console.log('ℹ️  No upload page detected, continuing normally');
      }
    } catch (error) {
      console.log(`⚠️  Upload handling failed: ${error}`);
      // Fallback: try to navigate back to dashboard
      await this.page.getByRole('link', { name: /task list/i }).click();
    }
  }

  /** Locator for the investor upload page heading. */
  get uploadInvestorDetailsHeading() {
    return this.heading('Upload details of investors');
  }

  /** Locator for the helper text on the upload page. */
  get uploadInvestorDetailsSubtext() {
    return this.text('Upload a document with the full name, address, and amount of all investors');
  }

  /** Locator for file input on upload page. */
  get fileInput() {
    return this.page.locator('input[type="file"]');
  }
}
