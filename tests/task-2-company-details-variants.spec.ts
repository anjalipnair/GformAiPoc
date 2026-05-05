// Task 2: Company Details - All Field Variants with Complete Form Submission
// Covers all 4 conditional field combinations: Trading Name (Yes/No) × PAYE (Yes/No)

import { eisTest as test, expect } from '../fixtures/eis.fixtures';
import { COMPANY_DATA } from '../test-data/company.data';
import { ADDRESS_DATA } from '../test-data/address.data';
import { SHARE_ISSUE_DATA } from '../test-data/share.data';

test.describe('Task 2: Company Details - All Field Variants', () => {

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

    // Trigger empty-name validation then recover
    await companyDetailsPage.enterCompanyName('');
    await companyDetailsPage.enterCompanyName(COMPANY_DATA.validationTestVariant.companyName);

    await companyDetailsPage.answerTradingNameQuestion(false);

    // Trigger invalid UTR then recover
    await companyDetailsPage.enterUtr(COMPANY_DATA.invalid.utrTooShort);
    await companyDetailsPage.enterUtr(COMPANY_DATA.invalid.utrTooLong);
    await companyDetailsPage.enterUtr(COMPANY_DATA.validationTestVariant.utr);

    // Trigger invalid registration number then recover
    await companyDetailsPage.enterRegistrationNumber(COMPANY_DATA.invalid.registrationNumberTooShort);
    await companyDetailsPage.enterRegistrationNumber(COMPANY_DATA.validationTestVariant.registrationNumber);

    await companyDetailsPage.answerPayeQuestion(false);

    // Trigger invalid date then recover
    await companyDetailsPage.enterIncorporationDate(
      COMPANY_DATA.invalid.incorporationDay,
      COMPANY_DATA.invalid.incorporationMonth,
      COMPANY_DATA.invalid.incorporationYear,
    );
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
