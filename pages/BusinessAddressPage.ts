import { Page } from '@playwright/test';
import { BasePage } from './BasePage';
import {
  UkAddressData,
  UkPostcodeLookupData,
  InternationalAddressData,
  PermanentEstablishmentData,
} from '../test-data/address.data';
import { FileUploadHelper } from '../utils/FileUploadHelper';

/**
 * BusinessAddressPage encapsulates all actions for Task 3: Business Address.
 * Supports three flows: UK postcode lookup, UK direct manual entry, and Non-UK dual-address.
 */
export class BusinessAddressPage extends BasePage {
  private fileUploadHelper: FileUploadHelper;

  constructor(page: Page) {
    super(page);
    this.fileUploadHelper = new FileUploadHelper(page);
  }

  /** Select whether the company was incorporated in the UK. */
  async selectUkIncorporation(isUk: boolean): Promise<void> {
    await this.selectRadio(isUk ? 'Yes' : 'No');
    await this.saveAndContinue();
  }

  /** Fill in the postcode lookup form and trigger the search. */
  async performPostcodeLookup(lookupData: UkPostcodeLookupData): Promise<void> {
    await this.fillTextbox('Postcode', lookupData.postcode);
    await this.fillTextbox('Property name or number (', lookupData.propertyNameOrNumber);
    await this.clickButton('Find address');
  }

  /** Select "Enter the address manually" option after a failed postcode lookup. */
  async selectManualEntryAfterLookup(): Promise<void> {
    await this.selectRadio('Enter the address manually');
    await this.saveAndContinue();
  }

  /** Click the "Enter the address manually" link to skip postcode lookup directly. */
  async clickManualEntryLink(): Promise<void> {
    await this.clickLink('Enter the address manually');
  }

  /** Fill in the 4-field UK address form (used for both UK-lookup fallback and direct manual entry). */
  async fillUkAddress(address: UkAddressData): Promise<void> {
    await this.fillTextbox('Address line 1', address.addressLine1);
    if (address.addressLine2) {
      await this.fillTextbox('Address line 2 (optional)', address.addressLine2);
    }
    if (address.townOrCity) {
      await this.fillTextbox('Town or city (optional)', address.townOrCity);
    }
    await this.fillTextbox('Postcode', address.postcode);
    await this.continue();
  }

  /** Confirm the formatted address on the "Review and confirm" screen. */
  async confirmAddress(): Promise<void> {
    await this.clickButton('Confirm address');
  }

  /** Accept the check-answers page to complete Task 3 (UK flow). */
  async confirmCheckAnswers(): Promise<void> {
    await this.saveAndContinue();
  }

  /** Fill in the international address fields for a Non-UK company. */
  async fillInternationalAddress(address: InternationalAddressData): Promise<void> {
    await this.fillTextbox('Address line 1', address.addressLine1);
    if (address.addressLine2) {
      await this.fillTextbox('Address line 2 (optional)', address.addressLine2);
    }
    await this.fillTextbox('Town or city', address.townOrCity);
    // Note: County/state/province field is not present in this form version
    if (address.postalCode) {
      await this.fillTextbox('Postcode (optional)', address.postalCode);
    }
    const countryDropdown = this.page.getByRole('combobox', { name: 'Country' });
    await countryDropdown.click();
    await countryDropdown.fill(address.country);
    await this.page.getByRole('option', { name: address.country }).click();
    await this.saveAndContinue();
  }

  /** Fill in the UK permanent establishment address and details (Non-UK flow). */
  async fillPermanentEstablishment(establishment: PermanentEstablishmentData): Promise<void> {
    // Click manual entry link to go to the address form
    await this.clickManualEntryLink();
    await this.fillUkAddress(establishment.ukAddress);
    await this.confirmAddress();
    await this.fillTextbox('Enter details of how the company meets the permanent establishment requirement', establishment.details);
    await this.saveAndContinue();
    
    // Handle the file upload page that follows with actual file upload
    await this.handlePermanentEstablishmentUpload();
  }

  /** Handle the permanent establishment evidence upload page. */
  async handlePermanentEstablishmentUpload(fileType: 'pdf' | 'docx' | 'xlsx' = 'pdf'): Promise<void> {
    try {
      // Wait for page to load and check for upload page
      await this.page.waitForLoadState('networkidle');
      
      const uploadPageHeading = this.page.getByRole('heading', { name: /Evidence of permanent establishment/ });
      
      if (await uploadPageHeading.isVisible({ timeout: 10000 })) {
        console.log('📁 Permanent establishment evidence upload page detected');
        await this.fileUploadHelper.handleUploadPageGracefully(fileType);
      } else {
        console.log('ℹ️  No permanent establishment upload page detected');
      }
    } catch (error) {
      console.log(`⚠️  Permanent establishment upload handling failed: ${error}`);
      // Fallback: try to navigate back to dashboard
      await this.page.getByRole('link', { name: /task list/i }).click();
    }
  }

  /**
   * Complete the UK address task using postcode lookup → manual fallback flow.
   */
  async completeTaskUkLookup(
    lookupData: UkPostcodeLookupData,
    address: UkAddressData,
  ): Promise<void> {
    await this.selectUkIncorporation(true);
    await this.performPostcodeLookup(lookupData);
    await this.selectManualEntryAfterLookup();
    await this.fillUkAddress(address);
    await this.confirmAddress();
    await this.confirmCheckAnswers();
  }

  /**
   * Complete the UK address task using the direct manual-entry link (skipping lookup).
   */
  async completeTaskUkManual(address: UkAddressData): Promise<void> {
    await this.selectUkIncorporation(true);
    await this.clickManualEntryLink();
    await this.fillUkAddress(address);
    await this.confirmAddress();
    await this.confirmCheckAnswers();
  }

  /**
   * Complete the Non-UK address task (international address + UK permanent establishment).
   * Note: the file-upload step that may follow is outside the scope of this page object.
   */
  async completeTaskNonUk(
    internationalAddress: InternationalAddressData,
    establishment: PermanentEstablishmentData,
  ): Promise<void> {
    await this.selectUkIncorporation(false);
    await this.fillInternationalAddress(internationalAddress);
    await this.fillPermanentEstablishment(establishment);
  }

  // --- Locators for assertions ---

  get ukIncorporationQuestion() {
    // Use partial text match as the heading includes dynamic company name
    return this.page.getByText(/incorporated in the UK\?/);
  }

  get registeredBusinessAddressHeading() {
    // Use flexible regex: matches "What is the registered..." or "What is the non-UK registered..." 
    return this.page.getByRole('heading', { name: /What is the (?:.*?)?registered business address\?/ });
  }

  get enterAddressHeading() {
    return this.heading('Enter address');
  }

  get reviewAndConfirmHeading() {
    return this.heading('Review and confirm');
  }

  get ukPermanentEstablishmentAddressHeading() {
    // Use partial text match as the actual heading is "What is the permanent business establishment in the UK?"
    return this.page.getByRole('heading', { name: /permanent business establishment in the UK/ });
  }

  get ukPermanentEstablishmentDetailsHeading() {
    return this.heading('UK permanent establishment details');
  }

  get uploadEvidenceHeading() {
    // The actual heading is "Evidence of permanent establishment", not "Upload evidence documents" 
    return this.page.getByRole('heading', { name: /Evidence of permanent establishment/ });
  }

  get checkAnswersHeading() {
    return this.heading('Check your answers for business address');
  }

  get noAddressesFoundMessage() {
    return this.text('We cannot find any addresses for this postcode');
  }
}
