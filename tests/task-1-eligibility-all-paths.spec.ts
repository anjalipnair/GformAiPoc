// Task 1: All Eligibility Decision Paths
// Path 1: EIS Eligible → Continue → Complete Full Form Submission

import { eisTest as test, expect } from '../fixtures/eis.fixtures';
import { COMPANY_DATA } from '../test-data/company.data';
import { ADDRESS_DATA } from '../test-data/address.data';
import { SHARE_ISSUE_DATA } from '../test-data/share.data';

test.describe('Task 1: EIS Eligibility - All Decision Paths', () => {
  test('T1-PATH1: EIS Eligible → Continue → Complete Full Form Submission', async ({
    authPage, dashboardPage, eligibilityPage, companyDetailsPage,
    businessAddressPage, kicPage, shareIssuePage,
  }) => {
    await authPage.login();

    // Task 1
    await dashboardPage.goToEligibilityTask();
    await expect(eligibilityPage.sharesAlreadyIssuedQuestion).toBeVisible();
    await eligibilityPage.completeEisEligiblePath();
    await expect(eligibilityPage.confirmEisContinuationQuestion).not.toBeVisible(); // past Q2
    await expect(dashboardPage.completedTasksCount(1)).toBeVisible();

    // Tasks 2-5 via shared helper
    await completeTasksTwoToFive({ companyDetailsPage, dashboardPage, businessAddressPage, kicPage, shareIssuePage });
  });

  test('T1-PATH2: EIS Eligible → SEIS Redirect → Stop (Cannot Complete)', async ({
    authPage, eligibilityPage, dashboardPage,
  }) => {
    await authPage.login();
    await dashboardPage.goToEligibilityTask();
    await eligibilityPage.followSeisRedirectPath();
    await expect(eligibilityPage.text('SEIS')).toBeVisible();
  });

  test('T1-PATH3: Not EIS Eligible → Advance Assurance Redirect → Stop', async ({
    authPage, eligibilityPage, dashboardPage,
  }) => {
    await authPage.login();
    await dashboardPage.goToEligibilityTask();
    await eligibilityPage.followAdvanceAssurancePath();
    await expect(eligibilityPage.text('advance')).toBeVisible();
  });
});

// ---------------------------------------------------------------------------
// Shared helper – completes Tasks 2-5 using standard test data.
// ---------------------------------------------------------------------------
async function completeTasksTwoToFive(pages: {
  companyDetailsPage: import('../pages').CompanyDetailsPage;
  dashboardPage: import('../pages').DashboardPage;
  businessAddressPage: import('../pages').BusinessAddressPage;
  kicPage: import('../pages').KicPage;
  shareIssuePage: import('../pages').ShareIssuePage;
}): Promise<void> {
  const { companyDetailsPage, dashboardPage, businessAddressPage, kicPage, shareIssuePage } = pages;

  // Task 2
  await dashboardPage.goToCompanyDetailsTask();
  await companyDetailsPage.completeTask(COMPANY_DATA.fullVariant);

  // Task 3
  await dashboardPage.goToBusinessAddressTask();
  await businessAddressPage.completeTaskUkLookup(ADDRESS_DATA.ukLookup, ADDRESS_DATA.ukManual);

  // Task 4
  await dashboardPage.goToKicTask();
  await kicPage.completeTask(false);

  // Task 5
  await dashboardPage.goToShareIssueTask();
  await shareIssuePage.completeTask(SHARE_ISSUE_DATA.task1Helper);
  await expect(shareIssuePage.uploadInvestorDetailsHeading).toBeVisible();
}
