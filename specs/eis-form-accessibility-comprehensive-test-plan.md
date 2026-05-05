# EIS Form Comprehensive Accessibility Test Plan

## Application Overview

Enterprise Investment Scheme (EIS1) compliance statement form - Complete accessibility testing coverage using automated tools (AXE, Wave, Lighthouse) and manual testing (Screen Readers, Keyboard Navigation, Visual Testing). This comprehensive plan ensures WCAG 2.1 AA compliance, Section 508 compliance, and full accessibility across all 15 tasks of the EIS form. Every accessibility test scenario validates that users with disabilities can complete the entire form submission process successfully.

## Test Scenarios

### 1. AXE Automated Accessibility Testing - All Tasks Coverage

**Seed:** `tests/seed-accessibility.spec.ts`

#### 1.1. AXE Tasks 1-5: Core Form Navigation Accessibility

**File:** `tests/accessibility-axe/task-1-5-axe-validation.spec.ts`

**Steps:**
  1. Run AXE accessibility scan on EIS task list dashboard
    - expect: AXE scan passes with zero violations on task list page
    - expect: All interactive elements have proper ARIA labels
    - expect: Heading hierarchy follows proper structure (h1 > h2 > h3)
    - expect: Form labels are properly associated with inputs
  2. Execute AXE scan on Task 1 eligibility form pages
    - expect: Task 1 eligibility questions pass AXE validation
    - expect: Radio button groups have proper fieldset/legend structure
    - expect: Error messages are accessible and properly announced
    - expect: Navigation breadcrumbs are screen reader accessible
  3. Run AXE scan on Task 2 company details with all field variants
    - expect: Task 2 company details form passes AXE validation
    - expect: Conditional field visibility changes are announced
    - expect: Input field validation messages are accessible
    - expect: Date input fields have proper accessibility markup
  4. Execute AXE scan on Task 3 address forms (UK and non-UK variants)
    - expect: Task 3 address forms pass AXE validation for both UK and international
    - expect: Postcode lookup interface is fully accessible
    - expect: Address selection dropdowns are screen reader compatible
    - expect: File upload interfaces meet accessibility standards
  5. Run AXE scan on Tasks 4-5 KIC and share issue forms
    - expect: Tasks 4-5 pass comprehensive AXE validation
    - expect: KIC classification interface is accessible
    - expect: Share issue form controls are properly labeled
    - expect: Complex form interactions maintain accessibility

#### 1.2. AXE Tasks 6-11: Business Conditions Accessibility Validation

**File:** `tests/accessibility-axe/task-6-11-axe-business-conditions.spec.ts`

**Steps:**
  1. Run AXE scan on Task 6 previous investments (both Yes and No paths)
    - expect: Previous investments form passes AXE validation
    - expect: Conditional logic changes are accessible
    - expect: Investment detail forms meet accessibility standards
    - expect: Date and currency inputs are properly accessible
  2. Execute AXE scan on Task 7 qualifying business activity forms
    - expect: Business activity classification passes AXE validation
    - expect: Textarea inputs have proper accessibility markup
    - expect: Character count indicators are accessible
    - expect: Business description fields meet standards
  3. Run comprehensive AXE scan on Tasks 8-11 compliance condition forms
    - expect: Tasks 8-11 compliance forms pass AXE validation
    - expect: Risk assessment interfaces are accessible
    - expect: Age verification forms meet accessibility standards
    - expect: Control and independence forms are screen reader compatible
    - expect: Asset and employee limit forms pass validation

#### 1.3. AXE Tasks 12-15: Final Submission Accessibility Validation

**File:** `tests/accessibility-axe/task-12-15-axe-final-submission.spec.ts`

**Steps:**
  1. Run AXE scan on Task 12 supporting documents upload interface
    - expect: File upload interface passes AXE validation
    - expect: Multiple file upload controls are accessible
    - expect: Upload progress indicators are screen reader compatible
    - expect: File type restrictions are clearly communicated
  2. Execute AXE scan on Task 13 personal details form
    - expect: Personal details form passes AXE validation
    - expect: Contact information inputs are properly labeled
    - expect: Email and phone validation messages are accessible
    - expect: Identity verification interfaces meet standards
  3. Run AXE scan on Task 14 declaration form
    - expect: Declaration form passes AXE validation
    - expect: Checkbox groups have proper accessibility markup
    - expect: Legal text is appropriately structured for screen readers
    - expect: Terms and conditions links are accessible
  4. Execute AXE scan on Task 15 final submission and confirmation pages
    - expect: Final submission page passes AXE validation
    - expect: Summary review sections are properly structured
    - expect: Change links maintain accessibility context
    - expect: Submit button and confirmation messages are accessible

### 2. WAVE Web Accessibility Evaluation - Complete Coverage

**Seed:** `tests/seed-accessibility.spec.ts`

#### 2.1. WAVE: Complete EIS Form Accessibility Evaluation

**File:** `tests/accessibility-wave/wave-comprehensive-evaluation.spec.ts`

**Steps:**
  1. Run WAVE evaluation on all EIS form pages systematically
    - expect: WAVE identifies zero accessibility errors across all form pages
    - expect: Contrast ratios meet WCAG AA standards (4.5:1 normal, 3:1 large text)
    - expect: All images have appropriate alternative text
    - expect: Page structure is logical and navigable
  2. Execute WAVE analysis on form validation and error scenarios
    - expect: Form labels and instructions are properly associated
    - expect: Error identification and descriptions are accessible
    - expect: Required field indicators are perceivable
    - expect: Success messages are properly announced
  3. Validate navigation accessibility with WAVE across all tasks
    - expect: Navigation elements are consistently accessible
    - expect: Skip links function properly throughout the form
    - expect: Breadcrumb navigation is accessible
    - expect: Task list progress indicators are perceivable
  4. Test interactive element accessibility with WAVE evaluation
    - expect: Interactive elements have sufficient click/tap targets (44px minimum)
    - expect: Focus indicators are visible and meet contrast requirements
    - expect: Hover states don't rely solely on color
    - expect: Timing-sensitive content has appropriate controls

### 3. Lighthouse Accessibility Audits - Performance Integration

**Seed:** `tests/seed-accessibility.spec.ts`

#### 3.1. Lighthouse: Accessibility + Performance Integration Testing

**File:** `tests/accessibility-lighthouse/lighthouse-accessibility-performance.spec.ts`

**Steps:**
  1. Run Lighthouse audits on all EIS form pages with accessibility focus
    - expect: Lighthouse accessibility score >= 95 for all pages
    - expect: Performance score >= 90 to ensure accessibility doesn't impact usability
    - expect: Best practices score >= 90 for accessibility compliance
    - expect: SEO score considerations for government service discoverability
  2. Execute Lighthouse performance analysis ensuring accessibility compatibility
    - expect: Form pages load within 2 seconds for users with slow connections
    - expect: Accessibility tree is properly constructed for all form elements
    - expect: Image optimization doesn't compromise alternative text quality
    - expect: JavaScript interactions maintain accessibility during loading
  3. Run Lighthouse mobile accessibility audits for responsive design validation
    - expect: Mobile accessibility scores match desktop performance
    - expect: Touch target sizes meet accessibility guidelines on mobile
    - expect: Mobile form navigation is accessible via screen readers
    - expect: Mobile keyboard navigation functions properly

### 4. Screen Reader Testing - Complete User Journey

**Seed:** `tests/seed-accessibility.spec.ts`

#### 4.1. NVDA Screen Reader: Complete EIS Form Submission

**File:** `tests/accessibility-screenreader/nvda-complete-form-journey.spec.ts`

**Steps:**
  1. Navigate entire EIS form using NVDA screen reader from start to finish
    - expect: NVDA announces page titles and main headings correctly
    - expect: Form instructions are read in logical order
    - expect: Navigation landmarks are properly identified
    - expect: Task list progress is clearly communicated
  2. Complete all form fields using NVDA with focus on form interaction
    - expect: All form labels are announced with their associated inputs
    - expect: Required field indicators are clearly communicated
    - expect: Error messages are announced immediately and clearly
    - expect: Validation feedback is provided in real-time
  3. Test dynamic form behavior and conditional logic with NVDA
    - expect: Conditional field appearance/disappearance is announced
    - expect: Dynamic content changes are communicated to screen reader
    - expect: File upload progress and status are accessible via NVDA
    - expect: Multi-step processes are clearly narrated
  4. Complete entire EIS form submission process using only NVDA screen reader
    - expect: Final submission process is fully accessible via NVDA
    - expect: Confirmation messages are clearly announced
    - expect: Reference numbers and success information are accessible
    - expect: **CRITICAL**: Complete EIS form submission achieved using only NVDA

#### 4.2. JAWS Screen Reader: Complete EIS Form Submission

**File:** `tests/accessibility-screenreader/jaws-complete-form-journey.spec.ts`

**Steps:**
  1. Navigate entire EIS form using JAWS screen reader with complete submission
    - expect: JAWS virtual cursor navigation works throughout form
    - expect: Form mode and browse mode transitions are seamless
    - expect: Table navigation (if any) is accessible via JAWS commands
    - expect: Quick navigation keys function properly
  2. Test complex form interactions using JAWS navigation commands
    - expect: JAWS announces form controls with proper context
    - expect: Grouped controls (radio buttons, checkboxes) are properly structured
    - expect: List navigation works for address selections and option lists
    - expect: Search functionality (postcode lookup) is accessible
  3. Achieve complete EIS form submission using only JAWS screen reader
    - expect: **FINAL SUCCESS**: Complete EIS form submitted successfully using only JAWS
    - expect: All 15 tasks completed with JAWS screen reader
    - expect: No accessibility barriers prevent form completion
    - expect: Reference number obtained via JAWS announcement

#### 4.3. VoiceOver Mobile: Complete iOS EIS Form Submission

**File:** `tests/accessibility-screenreader/voiceover-mobile-complete.spec.ts`

**Steps:**
  1. Complete entire EIS form on iOS using VoiceOver screen reader
    - expect: VoiceOver gestures work for all form navigation on iOS
    - expect: Mobile form controls are accessible via VoiceOver swipe navigation
    - expect: Touch and VoiceOver interaction modes work seamlessly
    - expect: Mobile keyboard integration with VoiceOver functions properly
  2. Test mobile-specific functionality with VoiceOver
    - expect: Mobile file upload is accessible via VoiceOver
    - expect: Camera integration for document capture works with VoiceOver
    - expect: Mobile-specific form behaviors are accessible
    - expect: Portrait/landscape orientation changes maintain accessibility
  3. Achieve complete EIS form submission on iOS using only VoiceOver
    - expect: **MOBILE SUCCESS**: Complete EIS form submitted on iOS with VoiceOver
    - expect: Mobile accessibility equals desktop accessibility
    - expect: No mobile-specific barriers prevent form completion

### 5. Keyboard Navigation Testing - No Mouse Required

**Seed:** `tests/seed-accessibility.spec.ts`

#### 5.1. Keyboard Only: Complete EIS Form Submission

**File:** `tests/accessibility-keyboard/complete-keyboard-navigation.spec.ts`

**Steps:**
  1. Navigate entire EIS form using only keyboard (Tab, Enter, Arrow keys, Space)
    - expect: Tab order is logical and follows visual flow
    - expect: All interactive elements are reachable via keyboard
    - expect: Focus indicators are clearly visible throughout
    - expect: Skip links allow efficient navigation
  2. Complete all form fields using only keyboard input
    - expect: Form completion works entirely via keyboard
    - expect: Date pickers are keyboard accessible
    - expect: Dropdown selections work with arrow keys
    - expect: File upload dialogs are keyboard accessible
  3. Test error scenarios and corrections using keyboard only
    - expect: Error correction is possible via keyboard only
    - expect: Change links in summary pages work with keyboard
    - expect: Modal dialogs (if any) are keyboard accessible
    - expect: Focus management works properly in dynamic content
  4. Achieve complete EIS form submission using only keyboard navigation
    - expect: **KEYBOARD SUCCESS**: Complete EIS form submitted using only keyboard
    - expect: No mouse interaction required at any point
    - expect: All 15 tasks completed with keyboard navigation
    - expect: Submission confirmation accessible via keyboard

### 6. Visual Accessibility Testing - Low Vision and Cognitive

**Seed:** `tests/seed-accessibility.spec.ts`

#### 6.1. High Contrast and Magnification Testing

**File:** `tests/accessibility-visual/high-contrast-magnification.spec.ts`

**Steps:**
  1. Test EIS form at 200% and 400% magnification levels
    - expect: Form remains functional at 200% zoom level
    - expect: No horizontal scrolling required at 200% zoom
    - expect: Text remains readable and form controls usable at high magnification
    - expect: Layout doesn't break at various zoom levels
  2. Complete EIS form using Windows High Contrast mode
    - expect: High contrast mode maintains all functionality
    - expect: Color-coded information has alternative indicators
    - expect: Focus indicators remain visible in high contrast
    - expect: Form validation works in high contrast mode
  3. Achieve complete form submission with visual accessibility accommodations
    - expect: **VISUAL SUCCESS**: Complete EIS form submitted with visual accommodations
    - expect: High magnification users can complete entire form
    - expect: High contrast users achieve full form submission

#### 6.2. Cognitive Accessibility and Plain Language Testing

**File:** `tests/accessibility-visual/cognitive-accessibility-testing.spec.ts`

**Steps:**
  1. Evaluate cognitive accessibility of form instructions and help text
    - expect: Instructions are written in plain language (Grade 8 reading level or lower)
    - expect: Complex processes are broken into clear steps
    - expect: Help text provides sufficient context without overwhelming users
    - expect: Error messages are clear and provide specific guidance for correction
  2. Test cognitive accessibility features for users with processing difficulties
    - expect: Form allows users to review and change answers before submission
    - expect: Session timeout warnings provide adequate notice and extension options
    - expect: Complex calculations or validations are explained clearly
    - expect: Users can complete the form at their own pace without time pressure
  3. Validate that cognitive accessibility supports complete form submission
    - expect: **COGNITIVE SUCCESS**: Users with cognitive disabilities can complete form
    - expect: Form provides appropriate support for memory and processing challenges
    - expect: Clear guidance enables successful form completion

### 7. Assistive Technology Integration Testing

**Seed:** `tests/seed-accessibility.spec.ts`

#### 7.1. Voice Control and Switch Navigation Testing

**File:** `tests/accessibility-assistive/voice-control-testing.spec.ts`

**Steps:**
  1. Complete EIS form using voice control software
    - expect: Voice control software (Dragon NaturallySpeaking) can navigate form
    - expect: Voice commands work for form completion
    - expect: Dictation works properly in text fields
    - expect: Voice-activated form submission is possible
  2. Test form accessibility with switch navigation devices
    - expect: Switch navigation allows access to all form elements
    - expect: Single-switch scanning works throughout the form
    - expect: Switch timing accommodates users with motor disabilities
    - expect: Alternative activation methods function properly
  3. Achieve complete EIS form submission using assistive technology
    - expect: **ASSISTIVE TECH SUCCESS**: Complete form submission via assistive technology
    - expect: Alternative input methods enable full form completion
    - expect: No barriers prevent assistive technology users from completing submission

### 8. WCAG 2.1 AA Compliance Validation

**Seed:** `tests/seed-accessibility.spec.ts`

#### 8.1. WCAG 2.1 AA Compliance: Complete Audit

**File:** `tests/accessibility-wcag/wcag-aa-comprehensive-audit.spec.ts`

**Steps:**
  1. Audit WCAG 2.1 Perceivable guidelines across all EIS form pages
    - expect: Perceivable: All content is perceivable by users with disabilities
    - expect: Text alternatives provided for all non-text content
    - expect: Captions and alternatives available for multimedia
    - expect: Content can be presented without loss of meaning at 200% zoom
  2. Audit WCAG 2.1 Operable guidelines for complete form interaction
    - expect: Operable: All functionality is operable via keyboard
    - expect: No content causes seizures or physical reactions
    - expect: Users have enough time to read and use content
    - expect: Content doesn't interfere with assistive technology
  3. Audit WCAG 2.1 Understandable guidelines for form comprehension
    - expect: Understandable: Information and UI operation is understandable
    - expect: Text is readable and understandable
    - expect: Content appears and operates predictably
    - expect: Users are helped to avoid and correct mistakes
  4. Audit WCAG 2.1 Robust guidelines and validate complete compliance
    - expect: Robust: Content is robust enough for various assistive technologies
    - expect: Markup is valid and properly structured
    - expect: Content is compatible with current and future assistive technologies
    - expect: **WCAG SUCCESS**: Complete WCAG 2.1 AA compliance achieved

### 9. Integration Testing - All Accessibility Tools Combined

**Seed:** `tests/seed-accessibility.spec.ts`

#### 9.1. Complete Accessibility Tool Integration Testing

**File:** `tests/accessibility-integration/comprehensive-tool-integration.spec.ts`

**Steps:**
  1. Cross-validate results from all accessibility testing tools
    - expect: AXE, WAVE, and Lighthouse results are consistent
    - expect: Automated tool findings align with manual testing results
    - expect: Screen reader testing validates automated scan results
    - expect: No conflicts between different accessibility testing approaches
  2. Integrate manual and automated accessibility testing results
    - expect: Manual testing confirms automated tool assessments
    - expect: Edge cases identified in manual testing are addressed
    - expect: Real user scenarios validate technical accessibility compliance
    - expect: Performance optimization doesn't compromise accessibility
  3. Validate comprehensive accessibility compliance through integrated testing
    - expect: **INTEGRATION SUCCESS**: All accessibility testing methods confirm compliance
    - expect: Complete EIS form is fully accessible via all tested methods
    - expect: Users with disabilities can successfully complete form submission
    - expect: Government accessibility standards are met or exceeded
