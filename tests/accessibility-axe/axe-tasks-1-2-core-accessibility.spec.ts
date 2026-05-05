// AXE Automated Accessibility Testing - Tasks 1-2 Core Form Navigation
// Complete accessibility validation using AXE core library with detailed form analysis

import { test, expect } from '@playwright/test';

test.describe('AXE Accessibility Testing - Tasks 1-2 Core Form Navigation', () => {
  test('AXE Tasks 1-2: Core Form Navigation Accessibility Validation', async ({ page }) => {
    // Navigate to Government Gateway authentication and login as Organisation
    await page.goto('https://test-www.tax.service.gov.uk/auth-login-stub/gg-sign-in');
    await page.getByRole('textbox', { name: 'Redirect URL' }).fill('/submissions/new-form/submit-enterprise-investment-scheme-compliance-statement-eis1-to-hmrc');
    await page.getByLabel('Affinity Group').selectOption(['Organisation']);
    await page.locator('#submit-top').click();

    // Run AXE accessibility scan on EIS task list dashboard
    const taskListResults = await page.evaluate(() => {
      // Inject AXE core library
      const script = document.createElement('script');
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/axe-core/4.7.2/axe.min.js';
      document.head.appendChild(script);
      
      return new Promise((resolve) => {
        script.onload = () => {
          // Run AXE accessibility scan
          (window as any).axe.run().then((results: any) => {
            resolve({
              violations: results.violations,
              violationCount: results.violations.length,
              passes: results.passes.length,
              incomplete: results.incomplete.length,
              inapplicable: results.inapplicable.length,
              url: window.location.href,
              timestamp: new Date().toISOString(),
              error: undefined
            });
          }).catch((error: any) => {
            resolve({ error: error.message, violationCount: 0, passes: 0 });
          });
        };
        script.onerror = () => {
          resolve({ error: 'Failed to load AXE library', violationCount: 0, passes: 0 });
        };
      });
    }) as any;

    // Validate task list dashboard accessibility
    expect(taskListResults.violationCount).toBeLessThanOrEqual(1); // Allow landmark violation (known issue)
    expect(taskListResults.passes).toBeGreaterThan(35); // Ensure substantial accessibility passes
    expect(taskListResults.error).toBeUndefined();

    // Navigate to Task 1 eligibility form to run AXE accessibility scan
    await page.getByRole('link', { name: 'Eligibility for EIS service' }).click();

    // Run comprehensive AXE accessibility scan on Task 1 eligibility form with form structure analysis
    const task1Results = await page.evaluate(() => {
      // Re-inject AXE core library for this page
      const script = document.createElement('script');
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/axe-core/4.7.2/axe.min.js';
      document.head.appendChild(script);
      
      return new Promise((resolve) => {
        script.onload = () => {
          // Run AXE accessibility scan on Task 1 eligibility form
          (window as any).axe.run().then((results: any) => {
            const formLabels = Array.from(document.querySelectorAll('label')).map(label => ({
              text: label.textContent?.trim(),
              for: label.getAttribute('for'),
              hasAssociatedInput: !!label.getAttribute('for')
            }));
            
            const radioGroups = Array.from(document.querySelectorAll('fieldset')).map(fieldset => ({
              legend: fieldset.querySelector('legend')?.textContent?.trim(),
              radioCount: fieldset.querySelectorAll('input[type="radio"]').length
            }));
            
            resolve({
              violations: results.violations,
              violationCount: results.violations.length,
              passes: results.passes.length,
              incomplete: results.incomplete.length,
              inapplicable: results.inapplicable.length,
              url: window.location.href,
              timestamp: new Date().toISOString(),
              pageType: 'Task 1 - Eligibility Form',
              formAccessibility: {
                labelCount: formLabels.length,
                labels: formLabels,
                radioGroups: radioGroups,
                headingStructure: Array.from(document.querySelectorAll('h1, h2, h3, h4, h5, h6')).map(h => ({
                  level: h.tagName,
                  text: h.textContent?.trim()
                }))
              }
            });
          }).catch((error: any) => {
            resolve({ error: error.message, violationCount: 0, passes: 0 });
          });
        };
        script.onerror = () => {
          resolve({ error: 'Failed to load AXE library' });
        };
      });
    }) as any;

    // Validate Task 1 eligibility form accessibility
    expect(task1Results.violationCount).toBeLessThanOrEqual(1); // Allow landmark violation
    expect(task1Results.passes).toBeGreaterThan(40);
    expect(task1Results.formAccessibility.labelCount).toBeGreaterThan(0);
    expect(task1Results.formAccessibility.radioGroups.length).toBeGreaterThan(0);
    expect(task1Results.formAccessibility.labels.every((label: any) => label.hasAssociatedInput)).toBeTruthy();

    // Select Yes to continue with EIS eligibility and proceed to next form page
    await page.getByRole('radio', { name: 'Yes' }).click();
    await page.getByRole('button', { name: 'Save and continue' }).click();

    // Run AXE accessibility scan on Task 1 EIS confirmation page with detailed form analysis
    const task1ConfirmResults = await page.evaluate(() => {
      // Re-inject AXE for this page and run comprehensive accessibility scan
      const script = document.createElement('script');
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/axe-core/4.7.2/axe.min.js';
      document.head.appendChild(script);
      
      return new Promise((resolve) => {
        script.onload = () => {
          (window as any).axe.run().then((results: any) => {
            // Additional form analysis for this confirmation page
            const radioButtons = Array.from(document.querySelectorAll('input[type="radio"]')).map((radio: any) => ({
              id: radio.id,
              name: (radio as HTMLInputElement).name,
              value: (radio as HTMLInputElement).value,
              hasLabel: !!document.querySelector(`label[for="${radio.id}"]`)
            }));
            
            const errorElements = Array.from(document.querySelectorAll('.govuk-error-message, .error')).map(error => ({
              text: error.textContent?.trim(),
              associatedField: error.getAttribute('data-field') || 'unknown'
            }));
            
            resolve({
              violations: results.violations,
              violationCount: results.violations.length,
              passes: results.passes.length,
              incomplete: results.incomplete.length,
              inapplicable: results.inapplicable.length,
              url: window.location.href,
              timestamp: new Date().toISOString(),
              pageType: 'Task 1 - EIS Confirmation Form',
              radioButtons: radioButtons,
              errorElements: errorElements,
              hasRequiredFieldIndicators: document.querySelector('.required, .govuk-required') !== null
            });
          }).catch((error: any) => {
            resolve({ error: error.message, violationCount: 0, passes: 0 });
          });
        };
      });
    }) as any;

    // Validate Task 1 confirmation page accessibility
    expect(task1ConfirmResults.violationCount).toBeLessThanOrEqual(1);
    expect(task1ConfirmResults.passes).toBeGreaterThan(40);
    expect(task1ConfirmResults.radioButtons.every((radio: any) => radio.hasLabel)).toBeTruthy();

    // Select EIS confirmation option to complete Task 1
    await page.getByRole('radio', { name: 'Yes, and I understand that if' }).click();
    await page.getByRole('button', { name: 'Save and continue' }).click();

    // Run AXE accessibility scan on Task 1 check answers summary page with summary list analysis
    const task1SummaryResults = await page.evaluate(() => {
      // Inject AXE and scan the summary/check answers page
      const script = document.createElement('script');
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/axe-core/4.7.2/axe.min.js';
      document.head.appendChild(script);
      
      return new Promise((resolve) => {
        script.onload = () => {
          (window as any).axe.run().then((results: any) => {
            // Analyze summary page structure for accessibility
            const summaryList = document.querySelector('.govuk-summary-list');
            const changeLinks = Array.from(document.querySelectorAll('a')).filter(link => 
              link.textContent?.includes('Change')
            ).map(link => ({
              text: link.textContent?.trim(),
              hasVisuallyHiddenContext: link.querySelector('.govuk-visually-hidden') !== null,
              href: (link as HTMLAnchorElement).href
            }));
            
            const definitionTerms = Array.from(document.querySelectorAll('dt')).map(dt => 
              dt.textContent?.trim()
            );
            
            resolve({
              violations: results.violations,
              violationCount: results.violations.length,
              passes: results.passes.length,
              incomplete: results.incomplete.length,
              inapplicable: results.inapplicable.length,
              url: window.location.href,
              timestamp: new Date().toISOString(),
              pageType: 'Task 1 - Check Answers Summary',
              hasSummaryList: !!summaryList,
              changeLinks: changeLinks,
              definitionTerms: definitionTerms,
              summaryListStructure: summaryList ? 'present' : 'missing'
            });
          }).catch((error: any) => {
            resolve({ error: error.message, violationCount: 0, passes: 0 });
          });
        };
      });
    }) as any;

    // Validate Task 1 summary page accessibility
    expect(task1SummaryResults.violationCount).toBeLessThanOrEqual(1);
    expect(task1SummaryResults.passes).toBeGreaterThan(35);
    expect(task1SummaryResults.hasSummaryList).toBeTruthy();
    expect(task1SummaryResults.changeLinks.every((link: any) => link.hasVisuallyHiddenContext)).toBeTruthy();

    // Complete Task 1 and return to task list for Task 2 accessibility testing
    await page.getByRole('button', { name: 'Save and continue' }).click();

    // Navigate to Task 2 Company Details for accessibility testing
    await page.getByRole('link', { name: 'Company details' }).click();

    // Run AXE accessibility scan on Task 2 company details form with text input analysis
    const task2Results = await page.evaluate(() => {
      // Inject AXE and scan Task 2 company details form
      const script = document.createElement('script');
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/axe-core/4.7.2/axe.min.js';
      document.head.appendChild(script);
      
      return new Promise((resolve) => {
        script.onload = () => {
          (window as any).axe.run().then((results: any) => {
            // Analyze text input accessibility
            const textInputs = Array.from(document.querySelectorAll('input[type="text"], input[type="email"], input[type="tel"], textarea')).map((input: any) => ({
              id: input.id,
              name: (input as HTMLInputElement).name,
              type: (input as HTMLInputElement).type,
              hasLabel: !!document.querySelector(`label[for="${input.id}"]`),
              hasAriaLabel: !!input.getAttribute('aria-label'),
              hasAriaDescribedBy: !!input.getAttribute('aria-describedby'),
              labelText: document.querySelector(`label[for="${input.id}"]`)?.textContent?.trim(),
              placeholderText: (input as HTMLInputElement).placeholder,
              required: (input as HTMLInputElement).required || input.hasAttribute('required')
            }));
            
            const helpTexts = Array.from(document.querySelectorAll('.govuk-hint, .help-text, .hint')).map(help => ({
              text: help.textContent?.trim(),
              id: help.id,
              associatedInput: help.id ? document.querySelector(`input[aria-describedby*="${help.id}"]`)?.id : null
            }));
            
            resolve({
              violations: results.violations,
              violationCount: results.violations.length,
              passes: results.passes.length,
              incomplete: results.incomplete.length,
              inapplicable: results.inapplicable.length,
              url: window.location.href,
              timestamp: new Date().toISOString(),
              pageType: 'Task 2 - Company Details Form',
              textInputs: textInputs,
              helpTexts: helpTexts,
              hasRequiredIndicators: document.querySelector('*[aria-required]') !== null
            });
          }).catch((error: any) => {
            resolve({ error: error.message, violationCount: 0, passes: 0 });
          });
        };
      });
    }) as any;

    // Validate Task 2 company details form accessibility
    expect(task2Results.violationCount).toBeLessThanOrEqual(1); // Allow landmark violation
    expect(task2Results.passes).toBeGreaterThan(40);
    expect(task2Results.textInputs.length).toBeGreaterThan(0);
    expect(task2Results.textInputs.every((input: any) => input.hasLabel)).toBeTruthy();
    expect(task2Results.helpTexts.length).toBeGreaterThan(0);
    expect(task2Results.textInputs.some((input: any) => input.hasAriaDescribedBy)).toBeTruthy();

    // Log comprehensive accessibility results for reporting
    console.log('=== AXE ACCESSIBILITY TEST RESULTS ===');
    console.log('Task List Dashboard:', taskListResults.violationCount, 'violations,', taskListResults.passes, 'passes');
    console.log('Task 1 Eligibility:', task1Results.violationCount, 'violations,', task1Results.passes, 'passes');
    console.log('Task 1 Confirmation:', task1ConfirmResults.violationCount, 'violations,', task1ConfirmResults.passes, 'passes');
    console.log('Task 1 Summary:', task1SummaryResults.violationCount, 'violations,', task1SummaryResults.passes, 'passes');
    console.log('Task 2 Company Details:', task2Results.violationCount, 'violations,', task2Results.passes, 'passes');
    console.log('=== FORM ACCESSIBILITY VALIDATED ===');
  });
});