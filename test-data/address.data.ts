/**
 * Test data for Task 3: Business Address.
 * Covers UK postcode-lookup, UK manual entry, and Non-UK dual-address flows.
 */

export interface UkAddressData {
  addressLine1: string;
  addressLine2?: string;
  townOrCity?: string;
  postcode: string;
}

export interface InternationalAddressData {
  addressLine1: string;
  addressLine2?: string;
  townOrCity: string;
  countyStateProvince?: string;
  postalCode?: string;
  country: string;
}

export interface UkPostcodeLookupData {
  postcode: string;
  propertyNameOrNumber: string;
}

export interface PermanentEstablishmentData {
  ukAddress: UkAddressData;
  details: string;
}

export const ADDRESS_DATA = {
  ukLookup: {
    postcode: 'M1 1AA',
    propertyNameOrNumber: '10',
  } satisfies UkPostcodeLookupData,

  ukManual: {
    addressLine1: '10 Innovation Street',
    addressLine2: 'Tech District',
    townOrCity: 'Manchester',
    postcode: 'M1 1AA',
  } satisfies UkAddressData,

  ukManualAlternative: {
    addressLine1: '25 Business Park Way',
    addressLine2: 'Innovation Quarter',
    townOrCity: 'Birmingham',
    postcode: 'B1 2XY',
  } satisfies UkAddressData,

  ukValidation: {
    addressLine1: '10 Validation Street',
    townOrCity: 'Manchester',
    postcode: 'M1 1AA',
  } satisfies UkAddressData,

  ukIntegration: {
    addressLine1: '10 Integration Street',
    addressLine2: 'Business Quarter',
    townOrCity: 'Manchester',
    postcode: 'M1 1AA',
  } satisfies UkAddressData,

  internationalIreland: {
    addressLine1: '456 International Boulevard',
    addressLine2: 'Dublin Tech Quarter',
    townOrCity: 'Dublin',
    countyStateProvince: 'Leinster',
    postalCode: 'D02 XY45',
    country: 'Ireland',
  } satisfies InternationalAddressData,

  internationalIrelandIntegration: {
    addressLine1: '456 Dublin Technology Park',
    addressLine2: 'Innovation Quarter',
    townOrCity: 'Dublin',
    countyStateProvince: 'Leinster',
    postalCode: 'D02 XY45',
    country: 'Ireland',
  } satisfies InternationalAddressData,

  internationalGermany: {
    addressLine1: '789 Technologie Strasse',
    addressLine2: 'Innovation Campus',
    townOrCity: 'Munich',
    countyStateProvince: 'Bavaria',
    postalCode: '80331',
    country: 'Germany',
  } satisfies InternationalAddressData,

  ukEstablishmentLondon: {
    ukAddress: {
      addressLine1: '100 UK Operations Centre',
      addressLine2: 'Financial District',
      townOrCity: 'London',
      postcode: 'SW1A 1AA',
    },
    details: 'UK operations office handling investment activities, compliance, and investor relations for Irish parent company.',
  } satisfies PermanentEstablishmentData,

  ukEstablishmentLondonIntegration: {
    ukAddress: {
      addressLine1: '100 London Bridge Street',
      addressLine2: 'Financial Quarter',
      townOrCity: 'London',
      postcode: 'SE1 9AA',
    },
    details: 'UK operations office coordinating investment activities and compliance for Irish technology company.',
  } satisfies PermanentEstablishmentData,

  ukEstablishmentEdinburgh: {
    ukAddress: {
      addressLine1: '500 City Business Centre',
      addressLine2: 'Corporate Plaza',
      townOrCity: 'Edinburgh',
      postcode: 'EH1 3YY',
    },
    details: 'UK subsidiary office managing investment operations and regulatory compliance for German parent corporation.',
  } satisfies PermanentEstablishmentData,

  // Invalid postcodes used for validation error testing
  invalid: {
    postcode: 'INVALID',
  },
} as const;
