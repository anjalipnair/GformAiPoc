/**
 * Test data for Task 5: Share Issue, and Tasks 6-15 miscellaneous data.
 */

export interface ShareIssueData {
  sharesDescription: string;
  issueDay: string;
  issueMonth: string;
  issueYear: string;
  currencySearch: string;
  currencyOption: string;
  nominalValueAmount: string;
  numberOfInvestors: string;
  totalAmountPaid: string;
}

export const SHARE_ISSUE_DATA = {
  standard: {
    sharesDescription: 'Ordinary',
    issueDay: '10',
    issueMonth: '07',
    issueYear: '2024',
    currencySearch: 'British',
    currencyOption: 'British Pound - GBP',
    nominalValueAmount: '1.00',
    numberOfInvestors: '10',
    totalAmountPaid: '1000000',
  } satisfies ShareIssueData,

  preference: {
    sharesDescription: 'Preference A',
    issueDay: '20',
    issueMonth: '03',
    issueYear: '2024',
    currencySearch: 'British',
    currencyOption: 'British Pound - GBP',
    nominalValueAmount: '0.50',
    numberOfInvestors: '3',
    totalAmountPaid: '150000',
  } satisfies ShareIssueData,

  matrixVariant: {
    sharesDescription: 'Ordinary A Class',
    issueDay: '15',
    issueMonth: '07',
    issueYear: '2024',
    currencySearch: 'British',
    currencyOption: 'British Pound - GBP',
    nominalValueAmount: '0.10',
    numberOfInvestors: '8',
    totalAmountPaid: '500000',
  } satisfies ShareIssueData,

  task1Helper: {
    sharesDescription: 'Ordinary',
    issueDay: '10',
    issueMonth: '07',
    issueYear: '2024',
    currencySearch: 'British',
    currencyOption: 'British Pound - GBP',
    nominalValueAmount: '1.00',
    numberOfInvestors: '5',
    totalAmountPaid: '250000',
  } satisfies ShareIssueData,
} as const;

export const TASKS_6_TO_15_DATA = {
  businessActivityDescription: 'Technology software development and innovation services',
  employeeCount: '25',
  assetValue: '2000000',
  personalDetails: {
    firstName: 'John',
    lastName: 'Smith',
    jobTitle: 'Chief Executive Officer',
  },
} as const;
