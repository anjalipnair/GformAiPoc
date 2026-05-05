/**
 * Test data for Task 2: Company Details.
 * No hard-coded values should exist in test scripts – use these constants instead.
 */

export interface CompanyDetailsData {
  companyName: string;
  hasTradingName: boolean;
  tradingName?: string;
  utr: string;
  registrationNumber: string;
  hasPaye: boolean;
  payeReference?: string;
  incorporationDay: string;
  incorporationMonth: string;
  incorporationYear: string;
}

export const COMPANY_DATA = {
  fullVariant: {
    companyName: 'Test Innovation Holdings Ltd',
    hasTradingName: true,
    tradingName: 'Innovation Tech Solutions',
    utr: '1111111111',
    registrationNumber: '12345678',
    hasPaye: true,
    payeReference: '123/AB456',
    incorporationDay: '15',
    incorporationMonth: '6',
    incorporationYear: '2020',
  } satisfies CompanyDetailsData,

  tradingYesPayeNo: {
    companyName: 'Tech Solutions Limited',
    hasTradingName: true,
    tradingName: 'TechCorp Solutions',
    utr: '1111111111',
    registrationNumber: '12345679',
    hasPaye: false,
    incorporationDay: '20',
    incorporationMonth: '8',
    incorporationYear: '2019',
  } satisfies CompanyDetailsData,

  tradingNoPayeYes: {
    companyName: 'Digital Ventures Corp',
    hasTradingName: false,
    utr: '1111111111',
    registrationNumber: '87654321',
    hasPaye: true,
    payeReference: '456/CD789',
    incorporationDay: '12',
    incorporationMonth: '3',
    incorporationYear: '2021',
  } satisfies CompanyDetailsData,

  minimalVariant: {
    companyName: 'Simple Holdings Ltd',
    hasTradingName: false,
    utr: '1111111111',
    registrationNumber: '11223344',
    hasPaye: false,
    incorporationDay: '5',
    incorporationMonth: '11',
    incorporationYear: '2018',
  } satisfies CompanyDetailsData,

  validationTestVariant: {
    companyName: 'Validation Test Corp',
    hasTradingName: false,
    utr: '1111111111',
    registrationNumber: '12345678',
    hasPaye: false,
    incorporationDay: '10',
    incorporationMonth: '4',
    incorporationYear: '2020',
  } satisfies CompanyDetailsData,

  addressTestVariant: {
    companyName: 'Address Test Company Ltd',
    hasTradingName: false,
    utr: '1111111111',
    registrationNumber: '12345678',
    hasPaye: false,
    incorporationDay: '15',
    incorporationMonth: '6',
    incorporationYear: '2020',
  } satisfies CompanyDetailsData,

  integrationVariant1: {
    companyName: 'Integration Test Holdings Ltd',
    hasTradingName: true,
    tradingName: 'Integration Solutions',
    utr: '1111111111',
    registrationNumber: '12345678',
    hasPaye: true,
    payeReference: '123/AB456',
    incorporationDay: '15',
    incorporationMonth: '6',
    incorporationYear: '2020',
  } satisfies CompanyDetailsData,

  integrationVariant2: {
    companyName: 'Minimal Test Company Ltd',
    hasTradingName: false,
    utr: '1111111111',
    registrationNumber: '87654321',
    hasPaye: false,
    incorporationDay: '25',
    incorporationMonth: '12',
    incorporationYear: '2019',
  } satisfies CompanyDetailsData,

  completeTestVariant: {
    companyName: 'Complete Test Holdings Ltd',
    hasTradingName: true,
    tradingName: 'Complete Test Solutions',
    utr: '1111111111',
    registrationNumber: '12345678',
    hasPaye: true,
    payeReference: '123/AB456',
    incorporationDay: '15',
    incorporationMonth: '6',
    incorporationYear: '2020',
  } satisfies CompanyDetailsData,

  // Invalid data used for validation error testing
  invalid: {
    utrTooShort: '123456789',
    utrTooLong: '01234567890',
    registrationNumberTooShort: '123',
    incorporationDay: '32',
    incorporationMonth: '13',
    incorporationYear: '2030',
  },
} as const;
