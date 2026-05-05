/**
 * Shared Playwright fixture that instantiates all page objects.
 * Test files use `eisTest` / `eisExpect` instead of the bare `test` / `expect`
 * so every fixture is automatically available via destructuring.
 *
 * Usage in a spec file:
 *   import { eisTest as test, eisExpect as expect } from '../fixtures/eis.fixtures';
 */

import { test as base, expect } from '@playwright/test';
import {
  AuthPage,
  DashboardPage,
  EligibilityPage,
  CompanyDetailsPage,
  BusinessAddressPage,
  KicPage,
  ShareIssuePage,
  Tasks6to15Page,
} from '../pages';

type EisFixtures = {
  authPage: AuthPage;
  dashboardPage: DashboardPage;
  eligibilityPage: EligibilityPage;
  companyDetailsPage: CompanyDetailsPage;
  businessAddressPage: BusinessAddressPage;
  kicPage: KicPage;
  shareIssuePage: ShareIssuePage;
  tasks6to15Page: Tasks6to15Page;
};

export const eisTest = base.extend<EisFixtures>({
  authPage: async ({ page }, use) => use(new AuthPage(page)),
  dashboardPage: async ({ page }, use) => use(new DashboardPage(page)),
  eligibilityPage: async ({ page }, use) => use(new EligibilityPage(page)),
  companyDetailsPage: async ({ page }, use) => use(new CompanyDetailsPage(page)),
  businessAddressPage: async ({ page }, use) => use(new BusinessAddressPage(page)),
  kicPage: async ({ page }, use) => use(new KicPage(page)),
  shareIssuePage: async ({ page }, use) => use(new ShareIssuePage(page)),
  tasks6to15Page: async ({ page }, use) => use(new Tasks6to15Page(page)),
});

export { expect };
