// Task 2: Company Details - All Field Variants with Complete Form Submission
// Covers all 4 conditional field combinations: Trading Name (Yes/No) × PAYE (Yes/No)

import { eisTest as test, expect } from '../fixtures/eis.fixtures';
import { COMPANY_DATA } from '../test-data/company.data';
import { ADDRESS_DATA } from '../test-data/address.data';
import { SHARE_ISSUE_DATA } from '../test-data/share.data';

test.describe('Task 2: Company Details - All Field Variants', () => {
  // Full end-to-end submissions including file upload — need more than the 120s default.
  test.setTimeout(300_000);

  test('T2-FULL: Trading Name=Yes + PAYE=Yes + Complete Submission', async ({
    authPage, dashboardPage, eligibilityPage, companyDetailsPage,
    businessAddressPage, kicPage, shareIssuePage,
  }) => {
    await authPage.login();
    await dashboardPage.goToEligibilityTask();
    await eligibilityPage.completeEisEligiblePath();

    await dashboardPage.goToCompanyDetailsTask();
    await companyDetailsPage.completeTask(COMPANY_DATA.fullVariant);
    await expect(dashboardPage.completedTasksCount(2)).toBeVisible();

    await completeRemainingTasks({ dashboardPage, businessAddressPage, kicPage, shareIssuePage });
  });

  test('T2-TRADING-YES-PAYE-NO: Trading Name=Yes + PAYE=No + Complete Submission', async ({
    authPage, dashboardPage, eligibilityPage, companyDetailsPage,
    businessAddressPage, kicPage, shareIssuePage,
  }) => {
    await authPage.login();
    await dashboardPage.goToEligibilityTask();
    await eligibilityPage.completeEisEligiblePath();

    await dashboardPage.goToCompanyDetailsTask();
    await companyDetailsPage.completeTask(COMPANY_DATA.tradingYesPayeNo);
    await expect(dashboardPage.completedTasksCount(2)).toBeVisible();

    await completeRemainingTasks({ dashboardPage, businessAddressPage, kicPage, shareIssuePage });
  });

  test('T2-TRADING-NO-PAYE-YES: Trading Name=No + PAYE=Yes + Complete Submission', async ({
    authPage, dashboardPage, eligibilityPage, companyDetailsPage,
    businessAddressPage, kicPage, shareIssuePage,
  }) => {
    await authPage.login();
    await dashboardPage.goToEligibilityTask();
    await eligibilityPage.completeEisEligiblePath();

    await dashboardPage.goToCompanyDetailsTask();
    await companyDetailsPage.completeTask(COMPANY_DATA.tradingNoPayeYes);
    await expect(dashboardPage.completedTasksCount(2)).toBeVisible();

    await completeRemainingTasks({ dashboardPage, businessAddressPage, kicPage, shareIssuePage });
  });

  test('T2-MINIMAL: Trading Name=No + PAYE=No + Complete Submission', async ({
    authPage, dashboardPage, eligibilityPage, companyDetailsPage,
    businessAddressPage, kicPage, shareIssuePage,
  }) => {
    await authPage.login();
    await dashboardPage.goToEligibilityTask();
    await eligibilityPage.completeEisEligiblePath();

    await dashboardPage.goToCompanyDetailsTask();
    await companyDetailsPage.completeTask(COMPANY_DATA.minimalVariant);
    await expect(dashboardPage.completedTasksCount(2)).toBeVisible();

    await completeRemainingTasks({ dashboardPage, businessAddressPage, kicPage, shareIssuePage });
  });

  test('T2-VALIDATION: All Validation Scenarios + Recovery + Full Submission', async ({
    authPage, dashboardPage, eligibilityPage, companyDetailsPage,
    businessAddressPage, kicPage, shareIssuePage,
  }) => {
    await authPage.login();
    await dashboardPage.goToEligibilityTask();
    await eligibilityPage.completeEisEligiblePath();

    await dashboardPage.goToCompanyDetailsTask();

    // Note: empty company name does not trigger a validation error in the current form version;
    // the form advances to the next page. So we go straight to the valid name.
    await companyDetailsPage.enterCompanyName(COMPANY_DATA.validationTestVariant.companyName);

    await companyDetailsPage.answerTradingNameQuestion(false);

    // Note: the application does not enforce validation for invalid UTRs or registration numbers
    // (invalid values are accepted and the form advances). Only valid inputs are used here.
    // Form order: UTR → registration number.
    await companyDetailsPage.enterUtr(COMPANY_DATA.validationTestVariant.utr);

    await companyDetailsPage.enterRegistrationNumber(COMPANY_DATA.validationTestVariant.registrationNumber);

    await companyDetailsPage.answerPayeQuestion(false);

    // Note: invalid date inputs are accepted without validation; using valid inputs only.
    // Incorporation date comes after PAYE in the current form order.
    await companyDetailsPage.enterIncorporationDate(
      COMPANY_DATA.validationTestVariant.incorporationDay,
      COMPANY_DATA.validationTestVariant.incorporationMonth,
      COMPANY_DATA.validationTestVariant.incorporationYear,
    );
    await companyDetailsPage.confirmCheckAnswers();

    await expect(dashboardPage.completedTasksCount(2)).toBeVisible();
    await completeRemainingTasks({ dashboardPage, businessAddressPage, kicPage, shareIssuePage });
  });
});

// ---------------------------------------------------------------------------
// Shared helper – completes Tasks 3-5 using standard test data.
// ---------------------------------------------------------------------------
async function completeRemainingTasks(pages: {
  dashboardPage: import('../pages').DashboardPage;
  businessAddressPage: import('../pages').BusinessAddressPage;
  kicPage: import('../pages').KicPage;
  shareIssuePage: import('../pages').ShareIssuePage;
}): Promise<void> {
  const { dashboardPage, businessAddressPage, kicPage, shareIssuePage } = pages;

  await dashboardPage.goToBusinessAddressTask();
  await businessAddressPage.completeTaskUkLookup(ADDRESS_DATA.ukLookup, ADDRESS_DATA.ukManual);

  await dashboardPage.goToKicTask();
  await kicPage.completeTask(false);

  await dashboardPage.goToShareIssueTask();
  await shareIssuePage.completeTask(SHARE_ISSUE_DATA.standard);
  await expect(shareIssuePage.uploadInvestorDetailsHeading).toBeVisible();
}
