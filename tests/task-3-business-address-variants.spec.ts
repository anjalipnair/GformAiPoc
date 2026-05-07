// Task 3: Business Address - UK vs Non-UK Complete Submission Flows
// Covers UK postcode lookup, manual entry, and Non-UK dual address requirements

import { eisTest as test, expect } from '../fixtures/eis.fixtures';
import { COMPANY_DATA } from '../test-data/company.data';
import { ADDRESS_DATA } from '../test-data/address.data';
import { SHARE_ISSUE_DATA } from '../test-data/share.data';

test.describe('Task 3: Business Address - UK vs Non-UK Complete Flows', () => {
  // Full end-to-end submissions including file upload — need more than the 120s default.
  test.setTimeout(300_000);

  test('T3-UK-LOOKUP: UK Company + Postcode Lookup + Manual Entry + Full Submission', async ({
    authPage, dashboardPage, eligibilityPage, companyDetailsPage,
    businessAddressPage, kicPage, shareIssuePage,
  }) => {
    await authPage.login();
    await dashboardPage.goToEligibilityTask();
    await eligibilityPage.completeEisEligiblePath();

    await dashboardPage.goToCompanyDetailsTask();
    await companyDetailsPage.completeTask(COMPANY_DATA.addressTestVariant);

    await dashboardPage.goToBusinessAddressTask();
    await expect(businessAddressPage.ukIncorporationQuestion).toBeVisible();
    await businessAddressPage.selectUkIncorporation(true);
    await expect(businessAddressPage.registeredBusinessAddressHeading).toBeVisible();
    await businessAddressPage.performPostcodeLookup(ADDRESS_DATA.ukLookup);
    await expect(businessAddressPage.noAddressesFoundMessage).toBeVisible();
    await businessAddressPage.selectManualEntryAfterLookup();
    await expect(businessAddressPage.enterAddressHeading).toBeVisible();
    await businessAddressPage.fillUkAddress(ADDRESS_DATA.ukManual);
    await expect(businessAddressPage.reviewAndConfirmHeading).toBeVisible();
    await expect(businessAddressPage.text(ADDRESS_DATA.ukManual.addressLine1)).toBeVisible();
    await expect(businessAddressPage.text(ADDRESS_DATA.ukManual.postcode)).toBeVisible();
    await businessAddressPage.confirmAddress();
    await expect(businessAddressPage.checkAnswersHeading).toBeVisible();
    await businessAddressPage.confirmCheckAnswers();
    await expect(dashboardPage.completedTasksCount(3)).toBeVisible();

    await completeRemainingTasks({ dashboardPage, kicPage, shareIssuePage });
  });

  test('T3-UK-DIRECT-MANUAL: UK Company + Direct Manual Entry + Full Submission', async ({
    authPage, dashboardPage, eligibilityPage, companyDetailsPage,
    businessAddressPage, kicPage, shareIssuePage,
  }) => {
    await authPage.login();
    await dashboardPage.goToEligibilityTask();
    await eligibilityPage.completeEisEligiblePath();

    await dashboardPage.goToCompanyDetailsTask();
    await companyDetailsPage.completeTask(COMPANY_DATA.addressTestVariant);

    await dashboardPage.goToBusinessAddressTask();
    await businessAddressPage.completeTaskUkManual(ADDRESS_DATA.ukManualAlternative);
    await expect(dashboardPage.completedTasksCount(3)).toBeVisible();

    await completeRemainingTasks({ dashboardPage, kicPage, shareIssuePage });
  });

  test('T3-NONUK-IRELAND: Non-UK Company (Ireland) + Dual Addresses + Full Submission', async ({
    authPage, dashboardPage, eligibilityPage, companyDetailsPage,
    businessAddressPage, kicPage, shareIssuePage,
  }) => {
    await authPage.login();
    await dashboardPage.goToEligibilityTask();
    await eligibilityPage.completeEisEligiblePath();

    await dashboardPage.goToCompanyDetailsTask();
    await companyDetailsPage.completeTask(COMPANY_DATA.addressTestVariant);

    await dashboardPage.goToBusinessAddressTask();
    await expect(businessAddressPage.registeredBusinessAddressHeading).not.toBeVisible();
    await businessAddressPage.selectUkIncorporation(false);
    await expect(businessAddressPage.registeredBusinessAddressHeading).toBeVisible();
    await businessAddressPage.fillInternationalAddress(ADDRESS_DATA.internationalIreland);
    await businessAddressPage.fillPermanentEstablishment(ADDRESS_DATA.ukEstablishmentLondon);

    await completeRemainingTasks({ dashboardPage, kicPage, shareIssuePage });
  });

  test('T3-NONUK-GERMANY: Non-UK Company (Germany) + Dual Addresses + Full Submission', async ({
    authPage, dashboardPage, eligibilityPage, companyDetailsPage,
    businessAddressPage, kicPage, shareIssuePage,
  }) => {
    await authPage.login();
    await dashboardPage.goToEligibilityTask();
    await eligibilityPage.completeEisEligiblePath();

    await dashboardPage.goToCompanyDetailsTask();
    await companyDetailsPage.completeTask(COMPANY_DATA.addressTestVariant);

    await dashboardPage.goToBusinessAddressTask();
    await businessAddressPage.selectUkIncorporation(false);
    await businessAddressPage.fillInternationalAddress(ADDRESS_DATA.internationalGermany);
    await businessAddressPage.fillPermanentEstablishment(ADDRESS_DATA.ukEstablishmentEdinburgh);

    await completeRemainingTasks({ dashboardPage, kicPage, shareIssuePage });
  });

});

// ---------------------------------------------------------------------------
// Shared helper – completes Tasks 4-5.
// ---------------------------------------------------------------------------
async function completeRemainingTasks(pages: {
  dashboardPage: import('../pages').DashboardPage;
  kicPage: import('../pages').KicPage;
  shareIssuePage: import('../pages').ShareIssuePage;
}): Promise<void> {
  const { dashboardPage, kicPage, shareIssuePage } = pages;

  await dashboardPage.goToKicTask();
  await kicPage.completeTask(false);

  await dashboardPage.goToShareIssueTask();
  await shareIssuePage.completeTask(SHARE_ISSUE_DATA.standard);
  await expect(shareIssuePage.uploadInvestorDetailsHeading).toBeVisible();
  await expect(shareIssuePage.uploadInvestorDetailsSubtext).toBeVisible();
  
  // Handle the investor upload with file upload
  await shareIssuePage.handleInvestorUpload('pdf');
}


