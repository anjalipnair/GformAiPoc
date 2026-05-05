// Keyboard Navigation Testing - Complete Form Submission Without Mouse
// Comprehensive keyboard-only accessibility testing for EIS form

import { test, expect } from '@playwright/test';

test.describe('Keyboard Navigation Testing - No Mouse Required', () => {
  test('Keyboard Only: Complete EIS Form Navigation and Interaction', async ({ page }) => {
    // Navigate to EIS form 
    await page.goto('https://test-www.tax.service.gov.uk/auth-login-stub/gg-sign-in');

    // Test keyboard navigation through authentication form
    // Tab to redirect URL field
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    
    // Type redirect URL using keyboard
    await page.keyboard.type('/submissions/new-form/submit-enterprise-investment-scheme-compliance-statement-eis1-to-hmrc');
    
    // Tab to Affinity Group dropdown and select Organisation
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('ArrowDown'); // Navigate to Organisation option
    
    // Tab to submit button and press Enter
    let tabCount = 0;
    while (tabCount < 20) { // Search for submit button
      await page.keyboard.press('Tab');
      const focusedElement = await page.evaluate(() => document.activeElement?.tagName);
      if (focusedElement === 'BUTTON') {
        const buttonText = await page.evaluate(() => document.activeElement?.textContent);
        if (buttonText?.includes('Submit')) {
          break;
        }
      }
      tabCount++;
    }
    await page.keyboard.press('Enter');

    // Wait for navigation to EIS task list
    await page.waitForURL('**/tasklist/tasks/**');

    // Test skip link functionality with keyboard
    await page.keyboard.press('Tab'); // Focus on skip link
    const skipLinkFocused = await page.evaluate(() => {
      const activeElement = document.activeElement;
      return activeElement?.classList.contains('govuk-skip-link') || 
             activeElement?.textContent?.includes('Skip to main content');
    });
    expect(skipLinkFocused).toBeTruthy();

    // Test keyboard navigation to Task 1
    // Navigate through page elements to find Task 1 link
    let taskLinkFound = false;
    tabCount = 0;
    while (!taskLinkFound && tabCount < 30) {
      await page.keyboard.press('Tab');
      const linkText = await page.evaluate(() => {
        const activeElement = document.activeElement;
        return activeElement?.textContent?.trim();
      });
      
      if (linkText?.includes('Eligibility for EIS service')) {
        taskLinkFound = true;
        await page.keyboard.press('Enter');
        break;
      }
      tabCount++;
    }

    expect(taskLinkFound).toBeTruthy();
    await page.waitForURL('**/check-you-can-apply-for-eis**');

    // Test keyboard navigation in radio button form
    // Tab through form elements and select radio button
    let radioButtonFound = false;
    tabCount = 0;
    while (!radioButtonFound && tabCount < 15) {
      await page.keyboard.press('Tab');
      const elementType = await page.evaluate(() => {
        const activeElement = document.activeElement as HTMLInputElement;
        return {
          type: activeElement?.type,
          tagName: activeElement?.tagName,
          name: activeElement?.name
        };
      });
      
      if (elementType.type === 'radio') {
        radioButtonFound = true;
        await page.keyboard.press('Space'); // Select first radio button (Yes)
        break;
      }
      tabCount++;
    }

    expect(radioButtonFound).toBeTruthy();

    // Navigate to and activate Save and Continue button using keyboard
    let continueButtonFound = false;
    tabCount = 0;
    while (!continueButtonFound && tabCount < 10) {
      await page.keyboard.press('Tab');
      const buttonInfo = await page.evaluate(() => {
        const activeElement = document.activeElement as HTMLButtonElement;
        return {
          tagName: activeElement?.tagName,
          text: activeElement?.textContent?.trim(),
          type: activeElement?.type
        };
      });
      
      if (buttonInfo.tagName === 'BUTTON' && buttonInfo.text?.includes('Save and continue')) {
        continueButtonFound = true;
        await page.keyboard.press('Enter');
        break;
      }
      tabCount++;
    }

    expect(continueButtonFound).toBeTruthy();
    await page.waitForURL('**/confirm-you-need-eis**');

    // Test keyboard navigation on confirmation page
    // Find and select the EIS confirmation radio button
    let confirmRadioFound = false;
    tabCount = 0;
    while (!confirmRadioFound && tabCount < 15) {
      await page.keyboard.press('Tab');
      const elementInfo = await page.evaluate(() => {
        const activeElement = document.activeElement as HTMLInputElement;
        const label = activeElement?.id ? 
          document.querySelector(`label[for="${activeElement.id}"]`)?.textContent : '';
        return {
          type: activeElement?.type,
          labelText: label
        };
      });
      
      if (elementInfo.type === 'radio' && 
          elementInfo.labelText?.includes('Yes, and I understand')) {
        confirmRadioFound = true;
        await page.keyboard.press('Space');
        break;
      }
      tabCount++;
    }

    expect(confirmRadioFound).toBeTruthy();

    // Navigate to continue button and proceed
    continueButtonFound = false;
    tabCount = 0;
    while (!continueButtonFound && tabCount < 10) {
      await page.keyboard.press('Tab');
      const buttonText = await page.evaluate(() => {
        const activeElement = document.activeElement;
        return activeElement?.textContent?.trim();
      });
      
      if (buttonText?.includes('Save and continue')) {
        continueButtonFound = true;
        await page.keyboard.press('Enter');
        break;
      }
      tabCount++;
    }

    expect(continueButtonFound).toBeTruthy();
    await page.waitForURL('**/summary/**');

    // Test keyboard navigation on summary page
    // Navigate through change links and summary content
    let changeLinksAccessible = 0;
    tabCount = 0;
    while (tabCount < 20) {
      await page.keyboard.press('Tab');
      const linkInfo = await page.evaluate(() => {
        const activeElement = document.activeElement as HTMLAnchorElement;
        return {
          tagName: activeElement?.tagName,
          text: activeElement?.textContent?.trim(),
          href: activeElement?.href
        };
      });
      
      if (linkInfo.tagName === 'A' && linkInfo.text?.includes('Change')) {
        changeLinksAccessible++;
      }
      
      if (linkInfo.tagName === 'BUTTON' && linkInfo.text?.includes('Save and continue')) {
        await page.keyboard.press('Enter');
        break;
      }
      tabCount++;
    }

    expect(changeLinksAccessible).toBeGreaterThanOrEqual(2); // Should have change links for both questions
    await page.waitForURL('**/tasklist/tasks/**');

    // Validate focus management and visual indicators
    const focusIndicatorValidation = await page.evaluate(() => {
      // Test focus visibility by programmatically focusing elements
      const focusableElements = document.querySelectorAll(
        'a, button, input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      
      let visibleFocusCount = 0;
      let totalFocusableElements = 0;
      
      focusableElements.forEach(element => {
        if ((element as HTMLElement).offsetParent !== null) { // Element is visible
          totalFocusableElements++;
          (element as HTMLElement).focus();
          const computedStyle = window.getComputedStyle(element, ':focus');
          
          // Check for focus indicators
          if (computedStyle.outline !== 'none' || 
              computedStyle.boxShadow !== 'none' || 
              computedStyle.border !== computedStyle.getPropertyValue('border')) {
            visibleFocusCount++;
          }
        }
      });
      
      return {
        totalFocusable: totalFocusableElements,
        visibleFocus: visibleFocusCount,
        focusIndicatorRatio: totalFocusableElements > 0 ? visibleFocusCount / totalFocusableElements : 0
      };
    });

    // Validate keyboard accessibility requirements
    expect(focusIndicatorValidation.totalFocusable).toBeGreaterThan(0);
    expect(focusIndicatorValidation.focusIndicatorRatio).toBeGreaterThan(0.8); // 80% of elements should have focus indicators
    
    // Test Tab order is logical
    const tabOrderTest = await page.evaluate(() => {
      const focusableElements = Array.from(document.querySelectorAll(
        'a, button, input, select, textarea, [tabindex]:not([tabindex="-1"])'
      )).filter(el => (el as HTMLElement).offsetParent !== null);
      
      let logicalOrder = true;
      let previousTop = -1;
      let previousLeft = -1;
      
      focusableElements.forEach(element => {
        const rect = element.getBoundingClientRect();
        // Basic check: elements should generally flow top-to-bottom, left-to-right
        if (rect.top < previousTop - 50) { // Allow some flexibility for complex layouts
          if (rect.left < previousLeft) {
            logicalOrder = false;
          }
        }
        previousTop = rect.top;
        previousLeft = rect.left;
      });
      
      return {
        totalElements: focusableElements.length,
        logicalOrder: logicalOrder,
        firstElementType: focusableElements[0]?.tagName,
        lastElementType: focusableElements[focusableElements.length - 1]?.tagName
      };
    });

    expect(tabOrderTest.totalElements).toBeGreaterThan(5);
    expect(tabOrderTest.logicalOrder).toBeTruthy();

    console.log('=== KEYBOARD NAVIGATION TEST RESULTS ===');
    console.log('Total Focusable Elements:', focusIndicatorValidation.totalFocusable);
    console.log('Elements with Focus Indicators:', focusIndicatorValidation.visibleFocus);
    console.log('Focus Indicator Ratio:', focusIndicatorValidation.focusIndicatorRatio);
    console.log('Tab Order Logical:', tabOrderTest.logicalOrder);
    console.log('Change Links Accessible via Keyboard:', changeLinksAccessible);
    console.log('=== KEYBOARD ACCESSIBILITY VALIDATED ===');
  });

  test('Keyboard Navigation: Error Recovery and Form Validation', async ({ page }) => {
    // Test keyboard navigation in error scenarios
    await page.goto('https://test-www.tax.service.gov.uk/auth-login-stub/gg-sign-in');
    
    // Navigate to EIS form without filling required fields to trigger errors
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab'); 
    await page.keyboard.press('Tab');
    // Skip redirect URL to potentially trigger validation

    // Tab to submit and test error handling
    let submitButtonFound = false;
    let tabCount = 0;
    while (!submitButtonFound && tabCount < 25) {
      await page.keyboard.press('Tab');
      const buttonText = await page.evaluate(() => document.activeElement?.textContent?.trim());
      if (buttonText?.includes('Submit')) {
        submitButtonFound = true;
        await page.keyboard.press('Enter');
        break;
      }
      tabCount++;
    }

    // Test that errors are accessible via keyboard navigation
    const errorAccessibility = await page.evaluate(() => {
      const errorElements = document.querySelectorAll('.error, .govuk-error-message, [role="alert"]');
      let keyboardAccessibleErrors = 0;
      
      errorElements.forEach(error => {
        // Check if error is focusable or associated with focusable element
        const forAttribute = error.getAttribute('for');
        const associatedInput = forAttribute ? 
          document.getElementById(forAttribute) : 
          error.parentElement?.querySelector('input, select, textarea');
          
        if ((error as HTMLElement).tabIndex >= 0 || associatedInput) {
          keyboardAccessibleErrors++;
        }
      });
      
      return {
        totalErrors: errorElements.length,
        accessibleErrors: keyboardAccessibleErrors,
        hasErrorSummary: !!document.querySelector('.govuk-error-summary, .error-summary')
      };
    });

    // Validate error accessibility
    if (errorAccessibility.totalErrors > 0) {
      expect(errorAccessibility.accessibleErrors).toBeGreaterThan(0);
    }

    console.log('=== ERROR ACCESSIBILITY TEST RESULTS ===');
    console.log('Total Error Elements:', errorAccessibility.totalErrors);  
    console.log('Keyboard Accessible Errors:', errorAccessibility.accessibleErrors);
    console.log('Has Error Summary:', errorAccessibility.hasErrorSummary);
    console.log('=== ERROR RECOVERY KEYBOARD TEST COMPLETE ===');
  });
});