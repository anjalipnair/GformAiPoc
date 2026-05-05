import { Page } from '@playwright/test';
import { BasePage } from './BasePage';
import { FileUploadHelper } from '../utils/FileUploadHelper';

/**
 * KicPage encapsulates all actions for Task 4: Knowledge-Intensive Companies.
 */
export class KicPage extends BasePage {
  private fileUploadHelper: FileUploadHelper;

  constructor(page: Page) {
    super(page);
    this.fileUploadHelper = new FileUploadHelper(page);
  }

  /**
   * Complete Task 4.
   * @param isKic - Whether the company qualifies as a Knowledge-Intensive Company.
   */
  async completeTask(isKic: boolean): Promise<void> {
    await this.selectRadio(isKic ? 'Yes' : 'No');
    await this.saveAndContinue();

    if (isKic) {
      // Handle additional KIC follow-up questions
      await this.handleKicFollowUpQuestions();
    }

    // Only click the check-answers "Save and continue" if we're still inside the KIC
    // form flow.  After an evidence file upload the helper navigates back to the task
    // list, so there is no "Save and continue" button to click.
    const onTaskList = await this.page
      .locator('h1:has-text("Submit an Enterprise")')
      .isVisible({ timeout: 3000 })
      .catch(() => false);

    if (!onTaskList) {
      // Check answers page – confirm and return to task list
      await this.saveAndContinue();
    }
  }

  /** 
   * Handle the KIC follow-up questions that appear when KIC=true 
   */
  async handleKicFollowUpQuestions(): Promise<void> {
    try {
      console.log('🔄 Starting comprehensive KIC follow-up questions handling...');
      
      let attempts = 0;
      const maxAttempts = 10; // Prevent infinite loops

      while (attempts < maxAttempts) {
        attempts++;
        console.log(`🔍 KIC Follow-up attempt ${attempts}...`);
        
        // Wait for any in-flight navigation to settle before probing the page
        await this.page.waitForLoadState('domcontentloaded');

        let questionHandled = false;

        // Try each question in sequence - only one will be visible at a time
        if (!questionHandled) {
          questionHandled = await this.handleInvestorAnnualAmountQuestion();
        }
        
        if (!questionHandled) {
          questionHandled = await this.handleHmrcApprovedFundQuestion();
        }
        
        if (!questionHandled) {
          questionHandled = await this.handleWhyKnowledgeIntensiveQuestion();
        }
        
        if (!questionHandled) {
          questionHandled = await this.handleKicEvidenceUpload();
        }

        // If no question was handled, check if we're done
        if (!questionHandled) {
          // Check if we're back to dashboard or main flow
          if (await this.page.locator('h1:has-text("Apply for"), h1:has-text("Submit an Enterprise")').isVisible({ timeout: 2000 })) {
            console.log('✅ Back to main dashboard/task list - KIC flow complete');
            break;
          }

          // Check if we're on a different page that indicates completion
          if (await this.page.locator('text="Your form has been saved"').isVisible({ timeout: 2000 })) {
            console.log('💾 Form saved, returning to task list...');
            // Click return to task list if available
            const returnBtn = this.page.locator('a:has-text("Return to task list"), button:has-text("Continue"), a:has-text("task list")');
            if (await returnBtn.isVisible({ timeout: 2000 })) {
              await returnBtn.click();
            }
            break;
          }

          console.log('✅ No more KIC questions detected, completing flow...');
          break;
        }

        // If a question was handled, continue the loop for next question
        console.log(`✅ KIC question handled, checking for next question...`);
      }

      console.log('✅ KIC follow-up questions handling completed');
    } catch (error) {
      console.log(`ℹ️ KIC follow-up questions handling completed: ${error}`);
    }
  }

  /** Handle investor annual amount question */
  private async handleInvestorAnnualAmountQuestion(): Promise<boolean> {
    try {
      const question = this.page.getByRole('heading', { name: /only a KIC in relation to the.*investor annual amount/ });
      if (await question.isVisible({ timeout: 3000 })) {
        console.log('ℹ️ Handling KIC investor annual amount question');
        await this.selectRadio('No'); // Select reasonable default
        await this.saveAndContinue();
        return true; // Question was handled
      }
    } catch (error) {
      // Question not present, continue
    }
    return false;
  }

  /** Handle HMRC approved fund question */
  private async handleHmrcApprovedFundQuestion(): Promise<boolean> {
    try {
      const question = this.page.getByRole('heading', { name: /only a KIC because.*HMRC.*approved fund/ });
      if (await question.isVisible({ timeout: 3000 })) {
        console.log('ℹ️ Handling KIC HMRC-approved fund question');
        await this.selectRadio('No'); // Select reasonable default
        await this.saveAndContinue();
        return true; // Question was handled
      }
    } catch (error) {
      // Question not present, continue
    }
    return false;
  }

  /** Handle why knowledge-intensive question */
  private async handleWhyKnowledgeIntensiveQuestion(): Promise<boolean> {
    try {
      const question = this.page.getByRole('heading', { name: /Why is the company knowledge-intensive/ });
      if (await question.isVisible({ timeout: 3000 })) {
        console.log('ℹ️ Handling why knowledge-intensive question');
        // Select first checkbox option - "Maximum amount raised annually"
        const firstCheckbox = this.page.locator('input[type="checkbox"]').first();
        await firstCheckbox.check();
        await this.saveAndContinue();
        return true; // Question was handled
      }
    } catch (error) {
      // Question not present, continue
    }
    return false;
  }

  /** Handle KIC evidence upload page */
  private async handleKicEvidenceUpload(): Promise<boolean> {
    try {
      const uploadHeading = this.page.getByRole('heading', { name: /Evidence of KIC status/ });
      if (await uploadHeading.isVisible({ timeout: 3000 })) {
        console.log('📁 KIC evidence upload page detected');
        await this.fileUploadHelper.handleUploadPageGracefully('pdf');
        return true; // Upload was handled
      }
    } catch (error) {
      // Upload page not present, continue
    }
    return false;
  }

  get kicQuestionText() {
    return this.text('Does the eligibility of the company or investment depend upon it being a KIC');
  }
}
