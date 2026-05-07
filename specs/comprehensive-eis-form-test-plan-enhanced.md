# Enhanced EIS Form Comprehensive Test Plan

## Application Overview

Enterprise Investment Scheme (EIS1) compliance statement form - A comprehensive test plan addressing automation limitations, file upload challenges, and government security measures encountered in tasks 6-15. This plan provides strategies for both automated testing where possible and manual verification procedures for complex scenarios involving file uploads, security checkpoints, and HMRC validation processes.

## Test Scenarios

### 1. Core Form Navigation and Basic Tasks (1-5)

**Seed:** `tests/seed-enhanced-setup.spec.ts`

#### 1.1. Task 1 - EIS Eligibility Verification - All Path Coverage

**File:** `tests/core-navigation/task-1-eligibility-comprehensive.spec.ts`

**Steps:**
  1. Navigate to Government Gateway authentication and login as Organisation
    - expect: Successfully authenticate and redirect to EIS task list
    - expect: Page shows '0 of 15 tasks completed'
    - expect: Only Task 1 (Eligibility) is available to start
  2. Click on 'Eligibility for EIS service' to start Task 1
    - expect: Navigate to eligibility question page
    - expect: Page displays 'Check you can apply for EIS' heading
    - expect: Question visible: 'Have the shares already been issued to the investors who want EIS relief?'
  3. Select 'Yes' for shares already issued and continue
    - expect: Progress to EIS vs SEIS confirmation page
    - expect: Second question displays: 'Do you confirm you want to continue with this compliance statement for EIS?'
    - expect: SEIS warning text is visible about mutual exclusivity
  4. Select 'Yes, and I understand that if I submit this form the shares are treated as being issued under the EIS'
    - expect: Progress to check answers page for eligibility section
    - expect: Both responses are correctly displayed in summary format
    - expect: Change links are available for both questions
  5. Complete eligibility section and return to task list
    - expect: Return to main task list
    - expect: Progress counter shows '1 of 15 tasks completed'
    - expect: Task 1 shows 'Completed' status
    - expect: Tasks 2 and 4 become available ('Not yet started')

#### 1.2. Task 2 - Company Details - Complete Form Validation

**File:** `tests/core-navigation/task-2-company-details-validation.spec.ts`

**Steps:**
  1. Start Task 2 Company Details from task list
    - expect: Navigate to company name question
    - expect: Text field is available for company name input
    - expect: Help text explains this should match Companies House registration
  2. Enter company name and proceed to trading name question
    - expect: Trading name question appears
    - expect: Radio options dynamically update to include entered company name
    - expect: Both 'Yes' and 'No, company trades under [entered name]' options visible
  3. Complete trading name selection and continue through all company detail questions
    - expect: Progress through company number, UTR, PAYE, and other required fields
    - expect: Validation occurs on company number format (8 digits)
    - expect: UTR validation for 10-digit format
    - expect: Conditional logic works for PAYE scheme questions
  4. Navigate through check answers page and complete Task 2
    - expect: All entered data is correctly displayed in summary format
    - expect: Change links work for all fields
    - expect: Task completion returns to main task list with updated progress

#### 1.3. Task 3 - Business Address - UK vs International Handling

**File:** `tests/core-navigation/task-3-business-address-variants.spec.ts`

**Steps:**
  1. Start Task 3 Business Address after completing Tasks 1-2
    - expect: Address entry options are available
    - expect: UK postcode lookup functionality is present
    - expect: Manual address entry option is available
  2. Test UK postcode lookup functionality with valid postcode
    - expect: Postcode lookup returns address options
    - expect: Address selection works correctly
    - expect: Selected address populates all required fields
  3. Test manual address entry for UK addresses
    - expect: All address fields are accessible and functional
    - expect: Postcode format validation occurs
  4. Test non-UK address entry process
    - expect: International address fields are appropriate
    - expect: Country selection works correctly
    - expect: Validation rules adjust for non-UK addresses

#### 1.4. Task 4 - Knowledge Intensive Companies (KIC) - File Upload Challenge

**File:** `tests/core-navigation/task-4-kic-upload-handling.spec.ts`

**Steps:**
  1. Start Task 4 KIC after completing prerequisite tasks
    - expect: KIC eligibility question is displayed
    - expect: Clear explanation of knowledge-intensive criteria
    - expect: Both 'Yes' and 'No' options are available
  2. Select 'No' for standard (non-KIC) company path
    - expect: Task completes without additional requirements
    - expect: Returns to task list with KIC marked as completed
    - expect: No file upload requirements for 'No' selection
  3. Test 'Yes' path for KIC designation - AUTOMATION CHALLENGE
    - expect: Additional questions about KIC qualifying conditions
    - expect: Evidence upload requirements are presented
    - expect: File upload interface appears (may require manual intervention)
    - expect: **NOTE: Automation may fail here due to file upload complexity**
  4. Document file upload requirements and limitations
    - expect: Identify specific file types accepted
    - expect: Note file size limitations
    - expect: Document any security scanning requirements
    - expect: **MANUAL TESTING REQUIRED** for file upload scenarios

#### 1.5. Task 5 - Share Issue Details - Investor Data Handling

**File:** `tests/core-navigation/task-5-share-issue-validation.spec.ts`

**Steps:**
  1. Start Task 5 Share Issue after completing Tasks 1-4
    - expect: Share issue questions are accessible
    - expect: Date fields for share issue timing
    - expect: Amount and pricing information fields available
  2. Enter share issue date and validate date logic
    - expect: Date picker or manual entry works correctly
    - expect: Date validation prevents future dates where inappropriate
    - expect: Date format validation occurs
  3. Complete share pricing and quantity information
    - expect: Numeric validation on share quantities
    - expect: Currency formatting for share prices
    - expect: Calculated totals display correctly
  4. Handle investor information requirements
    - expect: Investor data entry fields are functional
    - expect: Multiple investor handling capability
    - expect: Data validation for investor details
    - expect: **NOTE: May involve file upload for investor lists**

### 2. Complex Tasks with File Uploads and Security (6-12)

**Seed:** `tests/seed-enhanced-setup.spec.ts`

#### 2.1. Task 6 - Previous Investments - Data Verification Challenge

**File:** `tests/complex-tasks/task-6-previous-investments-handling.spec.ts`

**Steps:**
  1. Navigate to Task 6 Previous Investments after completing Tasks 1-5
    - expect: Previous investment question is displayed
    - expect: Options for 'Yes' and 'No' for previous investments
    - expect: Clear guidance on what constitutes previous investments
  2. Test 'No' path for no previous investments
    - expect: Simple completion path with confirmation
    - expect: Task marks as completed without additional requirements
    - expect: Progress continues to next task
  3. Test 'Yes' path for previous investments - COMPLEXITY INCREASE
    - expect: Additional questions about investment details
    - expect: Date and amount fields for previous investments
    - expect: Possible evidence/documentation requirements
    - expect: **AUTOMATION RISK: May require supporting documents**
  4. Document any file upload or verification requirements
    - expect: Identify if investment records need to be uploaded
    - expect: Note any HMRC cross-reference requirements
    - expect: Document manual verification needs
    - expect: **FALLBACK: Manual testing strategy required**

#### 2.2. Task 7 - Qualifying Business Activity - Description Validation

**File:** `tests/complex-tasks/task-7-business-activity-detailed.spec.ts`

**Steps:**
  1. Start Task 7 Qualifying Business Activity
    - expect: Business activity classification question appears
    - expect: Multiple choice options: Qualifying trade, R&D for new trade, R&D for existing trade
    - expect: Clear guidance links to HMRC definitions
  2. Select each business activity type and validate conditional logic
    - expect: Different follow-up questions based on selection
    - expect: Business activity description text area appears
    - expect: Character limits and validation on descriptions
  3. Complete detailed business activity description
    - expect: Text validation accepts comprehensive descriptions
    - expect: No HTML or special character restrictions affect business descriptions
    - expect: Description saves and persists correctly
  4. Validate business activity against EIS qualifying criteria
    - expect: Form validates activity type against EIS rules
    - expect: Warning messages for non-qualifying activities
    - expect: **POTENTIAL AUTOMATION ISSUE: Complex validation logic**

#### 2.3. Task 8-11 - EIS Compliance Conditions - Multi-step Validation

**File:** `tests/complex-tasks/task-8-11-conditions-comprehensive.spec.ts`

**Steps:**
  1. Complete Task 8 Risk to Capital confirmation
    - expect: Risk confirmation question displays correctly
    - expect: Explanation of genuine risk requirement
    - expect: Simple Yes/No selection with appropriate validation
  2. Complete Task 9 Maximum Permitted Age verification
    - expect: Age limit compliance question appears
    - expect: Guidance on 7-year and 10-year age limits for different scenarios
    - expect: Conditional logic based on company type and KIC status
  3. Complete Task 10 Control and Independence requirements
    - expect: Independence criteria questions display
    - expect: Multiple sub-questions about control arrangements
    - expect: Validation of independence compliance
  4. Complete Task 11 Company Assets and Employee Limits
    - expect: Employee count input field with validation
    - expect: Asset value input with currency formatting
    - expect: Validation against EIS limits (£15m assets, employee thresholds)
  5. Validate that all conditions integrate properly
    - expect: Cross-validation between tasks works correctly
    - expect: Conflicting answers are flagged appropriately
    - expect: **AUTOMATION CHALLENGE: Complex business rule validation**

#### 2.4. Task 12 - Supporting Documents - FILE UPLOAD CRITICAL ISSUE

**File:** `tests/complex-tasks/task-12-file-upload-comprehensive.spec.ts`

**Steps:**
  1. Navigate to Task 12 Supporting Documents - HIGHEST RISK AREA
    - expect: File upload interface is present
    - expect: Clear guidance on required document types
    - expect: File size and format restrictions are displayed
    - expect: **CRITICAL: This is where automation typically fails**
  2. Identify file upload requirements and restrictions - MANUAL ANALYSIS
    - expect: Document specific file types accepted (PDF, DOC, etc.)
    - expect: Maximum file sizes per document
    - expect: Security scanning indicators
    - expect: Multiple file upload capability
  3. Test file upload functionality - LIMITED AUTOMATION
    - expect: **AUTOMATION LIMIT: File selection may require manual intervention**
    - expect: Upload progress indicators function correctly
    - expect: File validation occurs (type, size, content scanning)
    - expect: **GOVERNMENT SECURITY: May trigger additional verification**
  4. Document manual testing requirements for file uploads
    - expect: Create test file repository with valid documents
    - expect: Test various file types and sizes
    - expect: Document security scanning delays
    - expect: **MANUAL PROCESS: File upload testing strategy required**
    - expect: **ALTERNATIVE: Mock file upload scenarios for automation**
  5. Handle upload completion and continuation - GOVERNMENT CHECKPOINT
    - expect: Successful uploads show confirmation
    - expect: Further processing may occur server-side
    - expect: **SECURITY MEASURE: Additional verification steps may appear**
    - expect: **CONTINUATION RISK: Government security measures may prevent automation**

### 3. Final Submission Tasks with Government Security (13-15)

**Seed:** `tests/seed-enhanced-setup.spec.ts`

#### 3.1. Task 13 - About You Personal Details - Identity Verification

**File:** `tests/final-submission/task-13-personal-details-security.spec.ts`

**Steps:**
  1. Navigate to Task 13 About You after completing Tasks 1-12
    - expect: Personal details form is accessible
    - expect: Fields for name, job title, contact information
    - expect: Required field validation is active
  2. Complete personal information fields
    - expect: First name and last name validation works correctly
    - expect: Job title accepts various professional descriptions
    - expect: Email and phone number validation functions properly
  3. Submit personal details and handle any identity verification - SECURITY RISK
    - expect: Information saves successfully
    - expect: **GOVERNMENT SECURITY: Identity verification may be triggered**
    - expect: **AUTOMATION RISK: Additional verification steps may appear**
    - expect: Progress continues if no additional verification required

#### 3.2. Task 14 - Declaration - Legal Compliance Checkpoint

**File:** `tests/final-submission/task-14-declaration-validation.spec.ts`

**Steps:**
  1. Access Task 14 Declaration section
    - expect: Declaration text and checkboxes are displayed
    - expect: Legal terms and conditions are clearly presented
    - expect: Multiple confirmation checkboxes require explicit consent
  2. Read and accept declaration terms
    - expect: All required checkboxes can be selected
    - expect: Declaration text is comprehensive and legally binding
    - expect: Unable to proceed without all required confirmations
  3. Complete declaration with full understanding - LEGAL CHECKPOINT
    - expect: All confirmations are recorded
    - expect: **LEGAL RESPONSIBILITY: Declarations have real compliance implications**
    - expect: Progress to final submission is enabled
    - expect: **AUTOMATION CONCERN: Legal liability in automated declarations**

#### 3.3. Task 15 - Final Submission - GOVERNMENT SECURITY ENDPOINT

**File:** `tests/final-submission/task-15-final-submission-security.spec.ts`

**Steps:**
  1. Navigate to final submission page after completing all 14 tasks
    - expect: Final review page shows all completed sections
    - expect: Summary of all entered information is displayed
    - expect: Final submission button is available and enabled
  2. Review all information for accuracy before submission
    - expect: All task data is correctly summarized
    - expect: Change links allow modification of previous sections
    - expect: No validation errors prevent submission
  3. Attempt final submission - HIGHEST SECURITY RISK
    - expect: **CRITICAL AUTOMATION LIMIT: Final submission triggers government security measures**
    - expect: **HMRC VERIFICATION: Additional security checks may be required**
    - expect: **MANUAL INTERVENTION: Human verification may be mandatory**
    - expect: **RATE LIMITING: Government systems may have submission restrictions**
  4. Handle submission outcome and confirmation - VARIABLE RESULTS
    - expect: **SUCCESS SCENARIO: Submission accepted and reference number provided**
    - expect: **PENDING SCENARIO: Submission queued for manual review**
    - expect: **SECURITY SCENARIO: Additional verification required**
    - expect: **FAILURE SCENARIO: Technical or security restrictions prevent submission**
    - expect: **AUTOMATION ENDPOINT: This is typically where automated testing must stop**

#### 3.4. End-to-End Integration - Complete Form Journey

**File:** `tests/final-submission/complete-form-integration-test.spec.ts`

**Steps:**
  1. Execute complete form journey from Task 1 to Task 15 with realistic data
    - expect: All 15 tasks can be completed in sequence
    - expect: Data persistence works across all tasks
    - expect: No integration issues between task sections
  2. Test form state management and session handling
    - expect: 'Save and come back later' functionality works correctly
    - expect: Session timeout handling is graceful
    - expect: Form data is not lost during interruptions
  3. Validate complete form submission process
    - expect: **FULL AUTOMATION: May be impossible due to government security**
    - expect: **PARTIAL SUCCESS: Form completion up to final submission checkpoint**
    - expect: **MANUAL HANDOFF: Final submission requires human intervention**
    - expect: **DOCUMENTATION: Complete test results and handoff procedures**

### 4. Error Handling and Edge Cases

**Seed:** `tests/seed-enhanced-setup.spec.ts`

#### 4.1. Form Validation and Error Recovery

**File:** `tests/error-handling/form-validation-comprehensive.spec.ts`

**Steps:**
  1. Test all field validation rules across all tasks
    - expect: Required field validation prevents progression
    - expect: Format validation (dates, numbers, postcodes) works correctly
    - expect: Error messages are clear and actionable
  2. Test error recovery and correction workflows
    - expect: Users can return to any task to correct errors
    - expect: Change links from summary pages work correctly
    - expect: Corrections don't affect other completed tasks

#### 4.2. Session Management and Data Persistence

**File:** `tests/error-handling/session-management-testing.spec.ts`

**Steps:**
  1. Test session timeout scenarios
    - expect: Appropriate warnings before session expiry
    - expect: Graceful handling of session timeouts
    - expect: Data recovery options after timeout
  2. Test 'Save and come back later' functionality
    - expect: Data is saved at any point in the process
    - expect: Users can resume exactly where they left off
    - expect: No data loss occurs during save operations

#### 4.3. Cross-Browser and Accessibility Testing

**File:** `tests/error-handling/cross-browser-accessibility.spec.ts`

**Steps:**
  1. Test form functionality across different browsers
    - expect: Chrome, Firefox, Safari, and Edge all function correctly
    - expect: Mobile browser compatibility is maintained
    - expect: File upload works consistently across browsers
  2. Validate accessibility compliance
    - expect: Screen reader compatibility maintained
    - expect: Keyboard navigation works throughout
    - expect: Color contrast and font sizes meet standards
