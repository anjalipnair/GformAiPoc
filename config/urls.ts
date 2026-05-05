/**
 * Centralised URL and path configuration.
 * All hard-coded URLs must be sourced from this file only – never in test scripts.
 */

export const BASE_URL = 'https://test-www.tax.service.gov.uk';

export const PATHS = {
  AUTH_LOGIN: '/auth-login-stub/gg-sign-in',
  EIS_FORM: '/submissions/new-form/submit-enterprise-investment-scheme-compliance-statement-eis1-to-hmrc',
  EIS_TASK_LIST: '/submissions/tasklist/tasks/submit-enterprise-investment-scheme-compliance-statement-eis1-to-hmrc/-',
} as const;

export const URLS = {
  AUTH_LOGIN: `${BASE_URL}${PATHS.AUTH_LOGIN}`,
  EIS_FORM: `${BASE_URL}${PATHS.EIS_FORM}`,
  EIS_TASK_LIST: `${BASE_URL}${PATHS.EIS_TASK_LIST}`,
} as const;
