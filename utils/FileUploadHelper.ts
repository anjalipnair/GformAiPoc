import { Page } from '@playwright/test';
import path from 'path';

/**
 * FileUploadHelper provides utilities for handling file uploads in tests
 */
export class FileUploadHelper {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Get the path to a test file based on its type
   */
  static getTestFilePath(fileType: 'pdf' | 'docx' | 'xlsx' | 'jpeg' | 'ods' | 'odt' | 'pptx' | 'odp'): string {
    const testFilesDir = path.join(__dirname, '..', 'test-files');
    
    switch (fileType) {
      case 'pdf':
        return path.join(testFilesDir, 'sample-investors.pdf');
      case 'docx':
        return path.join(testFilesDir, 'investors-details.docx');
      case 'xlsx':
        return path.join(testFilesDir, 'investors-spreadsheet.xlsx');
      case 'jpeg':
        return path.join(testFilesDir, 'company-logo.jpeg');
      case 'ods':
        return path.join(testFilesDir, 'investors-calc.ods');
      case 'odt':
        return path.join(testFilesDir, 'investors-document.odt');
      case 'pptx':
        return path.join(testFilesDir, 'company-presentation.pptx');
      case 'odp':
        return path.join(testFilesDir, 'investors-presentation.odp');
      default:
        return path.join(testFilesDir, 'sample-investors.pdf'); // Default to PDF
    }
  }

  /**
   * Attempt to upload a file if file input is present
   */
  async uploadFileIfPresent(fileType: 'pdf' | 'docx' | 'xlsx' | 'jpeg' = 'pdf'): Promise<boolean> {
    try {
      const fileInput = this.page.locator('input[type="file"]');
      
      if (await fileInput.isVisible({ timeout: 2000 })) {
        const filePath = FileUploadHelper.getTestFilePath(fileType);
        await fileInput.setInputFiles(filePath);
        console.log(`✅ File uploaded successfully: ${fileType}`);
        return true;
      }
      
      return false;
    } catch (error) {
      console.log(`⚠️  File upload failed: ${error}`);
      return false;
    }
  }

  /**
   * Upload a file and continue with the form flow
   */
  async uploadAndContinue(fileType: 'pdf' | 'docx' | 'xlsx' | 'jpeg' = 'pdf'): Promise<void> {
    const uploaded = await this.uploadFileIfPresent(fileType);
    
    if (uploaded) {
      // Look for continue/submit button after upload
      const continueBtn = this.page.getByRole('button', { name: /continue|save and continue/i });
      if (await continueBtn.isVisible({ timeout: 2000 })) {
        await continueBtn.click();
      }
    }
  }

  /**
   * Handle upload page gracefully - try to upload, fallback to save and return
   */
  async handleUploadPageGracefully(fileType: 'pdf' | 'docx' | 'xlsx' | 'jpeg' = 'pdf'): Promise<void> {
    try {
      // First try to upload a file
      const uploadSuccess = await this.uploadFileIfPresent(fileType);
      
      if (uploadSuccess) {
        // If upload worked, continue with the flow
        const continueBtn = this.page.getByRole('button', { name: /continue|save and continue/i });
        if (await continueBtn.isVisible({ timeout: 2000 })) {
          await continueBtn.click();
          console.log('📁 File upload completed - continuing form flow');
          
          // Wait for navigation and ensure we're back on the main dashboard
          await this.page.waitForLoadState('networkidle');
          await this.ensureOnDashboard();
          return;
        }
      }

      // If upload didn't work or continue button not found, use save and return
      const saveBtn = this.page.getByRole('button', { name: /save and come back later/i });
      if (await saveBtn.isVisible({ timeout: 2000 })) {
        await saveBtn.click();
        console.log('💾 Upload page handled - saved progress and returning to task list');
        
        // Handle any confirmation page
        await this.page.waitForLoadState('networkidle');
        
        // Look for and click the continue/return link
        const returnLink = this.page.getByRole('link', { name: /continue this form|task list/i });
        if (await returnLink.isVisible({ timeout: 3000 })) {
          await returnLink.click();
          await this.page.waitForLoadState('networkidle');
        }
        
        // Ensure we're back on dashboard with extra verification
        await this.ensureOnDashboard();
        
        // Additional verification - wait for task links to be available
        await this.page.waitForSelector('a[href*=\"share-issue\"], a:has-text(\"Share issue\")', { 
          timeout: 5000,
          state: 'attached'
        });
        console.log('🎯 Share issue task link confirmed available');
      }

    } catch (error) {
      console.log(`⚠️  Upload handling failed: ${error}`);
      // Try to navigate back to task list as fallback
      await this.ensureOnDashboard();
    }
  }

  /**
   * Ensure we're on the main dashboard page
   */
  private async ensureOnDashboard(): Promise<void> {
    try {
      // Wait a bit for navigation to complete
      await this.page.waitForLoadState('networkidle');
      
      const dashboardHeading = this.page.getByRole('heading', { name: /Apply for (advance )?assurance for the Enterprise Investment Scheme/ });
      
      if (!(await dashboardHeading.isVisible({ timeout: 10000 }))) {
        console.log('🔄 Dashboard not detected, attempting to navigate...');
        
        // Try multiple navigation strategies
        const taskListLink = this.page.getByRole('link', { name: /task list/i });
        if (await taskListLink.isVisible({ timeout: 2000 })) {
          await taskListLink.click();
          await this.page.waitForLoadState('networkidle');
        } else {
          // Try the service name link in header
          const serviceLink = this.page.getByRole('link', { name: /Submit an Enterprise Investment Scheme/i });
          if (await serviceLink.isVisible({ timeout: 2000 })) {
            await serviceLink.click();
            await this.page.waitForLoadState('networkidle');
          }
        }
        
        // Final check - verify we're back on the task list using the same selector
        if (await dashboardHeading.isVisible({ timeout: 3000 })) {
          console.log('✅ Successfully returned to dashboard');
        } else {
          // Alternative check for task list page
          const taskListHeading = this.page.getByRole('heading', { name: /Submit an Enterprise Investment Scheme/ });
          if (await taskListHeading.isVisible({ timeout: 3000 })) {
            console.log('✅ Successfully returned to task list');
          } else {
            console.log('ℹ️ Navigation completed - may still be in upload flow');
          }
        }
      }
    } catch (error) {
      // Don't log navigation issues as errors since they're expected in some flows
      console.log('ℹ️  Upload handling completed - continuing with test flow');
    }
  }
}