import { Page } from '@playwright/test';
import { BasePage } from './BasePage';
import { CompanyDetailsData } from '../test-data/company.data';

/**
 * CompanyDetailsPage encapsulates all actions for Task 2: Company Details.
 */
export class CompanyDetailsPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  /** Fill in the company name and proceed. */
  async enterCompanyName(name: string): Promise<void> {
    await this.fillTextbox('What is the name of the', name);
    await this.saveAndContinue();
  }

  /** Answer the trading-name question. When yes, also fills the trading name field. */
  async answerTradingNameQuestion(hasTradingName: boolean, tradingName?: string): Promise<void> {
    if (hasTradingName) {
      await this.selectRadio('Yes');
    } else {
      await this.selectRadio('No');
    }
    if (hasTradingName && tradingName) {
      await this.fillTextbox('Enter the trading name of the', tradingName);
    }
    await this.saveAndContinue();
  }

  /** Enter the UTR (Unique Taxpayer Reference) and proceed. */
  async enterUtr(utr: string): Promise<void> {
    await this.fillTextbox('What is the Corporation Tax', utr);
    await this.saveAndContinue();
  }

  /** Enter the Companies House registration number and proceed. */
  async enterRegistrationNumber(number: string): Promise<void> {
    await this.fillTextbox('What is the company', number);
    await this.saveAndContinue();
  }

  /** Answer whether the company has a PAYE reference. When yes, provide the reference. */
  async answerPayeQuestion(hasPaye: boolean, payeReference?: string): Promise<void> {
    if (hasPaye) {
      await this.selectRadio('Yes');
      await this.saveAndContinue();
      await this.fillTextbox('What is the employer PAYE', payeReference!);
    } else {
      await this.selectRadio('No');
    }
    await this.saveAndContinue();
  }

  /** Enter the incorporation date and proceed. */
  async enterIncorporationDate(day: string, month: string, year: string): Promise<void> {
    await this.fillTextbox('Day', day);
    await this.fillTextbox('Month', month);
    await this.fillTextbox('Year', year);
    await this.saveAndContinue();
  }

  /** Accept the check-answers page to complete Task 2. */
  async confirmCheckAnswers(): Promise<void> {
    await this.saveAndContinue();
  }

  /**
   * Complete the full Task 2 flow using a single data object.
   * Covers all conditional branches (trading name and PAYE).
   */
  async completeTask(data: CompanyDetailsData): Promise<void> {
    await this.enterCompanyName(data.companyName);
    await this.answerTradingNameQuestion(data.hasTradingName, data.tradingName);
    await this.enterUtr(data.utr);
    await this.enterRegistrationNumber(data.registrationNumber);
    await this.answerPayeQuestion(data.hasPaye, data.payeReference);
    await this.enterIncorporationDate(data.incorporationDay, data.incorporationMonth, data.incorporationYear);
    await this.confirmCheckAnswers();
  }
}
