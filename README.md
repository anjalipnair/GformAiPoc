# EIS Form Playwright Test Suite

Automated end-to-end test suite for the **Enterprise Investment Scheme (EIS) Compliance Statement** form, built with [Playwright](https://playwright.dev/). The suite covers all 15 tasks in the EIS1 submission journey, including all conditional branching paths, field validation, and cross-browser compatibility.

---

## Project Structure

```
├── config/
│   └── urls.ts                  # Centralised URL/path config – never hard-code URLs in tests
├── fixtures/
│   └── eis.fixtures.ts          # Shared Playwright fixtures exposing all page objects
├── pages/
│   ├── AuthPage.ts              # Government Gateway authentication
│   ├── BasePage.ts              # Shared page helpers
│   ├── BusinessAddressPage.ts   # Task 3 – Business address variants
│   ├── CompanyDetailsPage.ts    # Task 2 – Company details
│   ├── DashboardPage.ts         # EIS task list / dashboard
│   ├── EligibilityPage.ts       # Task 1 – Eligibility decision paths
│   ├── KicPage.ts               # KIC-related task page
│   ├── ShareIssuePage.ts        # Share issuance task page
│   ├── Tasks6to15Page.ts        # Tasks 6–15 (complete submission matrix)
│   └── index.ts                 # Barrel export for page objects
├── specs/
│   └── eis-form-comprehensive-ui-validation-test-plan.md   # Full test plan document
├── test-data/
│   ├── address.data.ts          # Business address test data
│   ├── auth.data.ts             # Authentication test data
│   ├── company.data.ts          # Company details test data
│   └── share.data.ts            # Share issuance test data
├── tests/
│   ├── comprehensive-eis-form-test-suite.spec.ts
│   ├── task-1-eligibility-all-paths.spec.ts
│   ├── task-2-company-details-variants.spec.ts
│   ├── task-3-business-address-variants.spec.ts
│   └── tasks-4-15-complete-submission-matrix.spec.ts
├── playwright.config.ts
└── package.json
```

---

## Prerequisites

- [Node.js](https://nodejs.org/) v18+
- npm v9+

---

## Setup

```bash
npm install
npx playwright install
```

---

## Running Tests

| Command | Description |
|---|---|
| `npm test` | Run all tests (headless) |
| `npm run test:headed` | Run all tests in headed mode |
| `npx playwright test --project=chromium` | Run on Chromium only |
| `npx playwright test --project=firefox` | Run on Firefox only |
| `npx playwright test --project=webkit` | Run on WebKit (Safari) only |
| `npx playwright test tests/task-1-eligibility-all-paths.spec.ts` | Run a specific spec file |

---

## Viewing Reports

After a test run, open the HTML report:

```bash
npx playwright show-report
```

---

## Configuration

All URLs are centralised in [config/urls.ts](config/urls.ts). The base URL targets the HMRC test environment:

```
https://test-www.tax.service.gov.uk
```

Browser projects (Chromium, Firefox, WebKit) are configured in [playwright.config.ts](playwright.config.ts). Retries are enabled on CI (`CI=true`) and traces are collected on first retry.

---

## Page Object Model

Tests use the **Page Object Model (POM)** pattern. All page objects are instantiated via the shared fixture in [fixtures/eis.fixtures.ts](fixtures/eis.fixtures.ts). Import `eisTest` and `eisExpect` in spec files instead of the bare Playwright `test`/`expect`:

```typescript
import { eisTest as test, eisExpect as expect } from '../fixtures/eis.fixtures';

test('example', async ({ eligibilityPage, dashboardPage }) => {
  // ...
});
```

---

## Test Coverage

The suite covers all permutation paths across all 15 EIS tasks:

- **Task 1 – Eligibility:** EIS eligible → continue, SEIS redirect, advance assurance redirect
- **Task 2 – Company Details:** UK/non-UK company, trading name variants, UTR/PAYE variations
- **Task 3 – Business Address:** UK and non-UK address paths
- **Tasks 4–15:** Complete submission matrix including KIC status, share issuance, and all conditional branches

See [specs/eis-form-comprehensive-ui-validation-test-plan.md](specs/eis-form-comprehensive-ui-validation-test-plan.md) for the full test plan.

---

## MCP Server Setup

MCP (Model Context Protocol) servers extend GitHub Copilot with browser automation, test tooling, Atlassian, and GitHub capabilities. All servers are configured in [.vscode/mcp.json](.vscode/mcp.json).

### 1. Playwright MCP

Gives Copilot live browser control (navigate, click, snapshot, screenshot, etc.).

**Install:**
```bash
npm install -g @playwright/mcp
```

**Configuration** (`.vscode/mcp.json`):
```json
{
  "servers": {
    "playwright": {
      "type": "stdio",
      "command": "npx",
      "args": ["@playwright/mcp@latest"]
    }
  }
}
```

Once added, Copilot Chat can drive a real browser — useful for exploratory testing and live debugging sessions.

---

### 2. Playwright Test MCP

Exposes Playwright's built-in MCP test server, which powers the three AI agents in this project (planner, generator, healer). It provides tools for running, listing, and debugging spec files directly from Copilot.

**No additional installation required** — uses the `playwright` binary already installed as a dev dependency.

**Configuration** (`.vscode/mcp.json`):
```json
{
  "servers": {
    "playwright-test": {
      "type": "stdio",
      "command": "npx",
      "args": ["playwright", "run-test-mcp-server"]
    }
  }
}
```

**Available tools exposed:** `test_run`, `test_list`, `test_debug`, `generator_setup_page`, `generator_write_test`, `generator_read_log`, `planner_setup_page`, `planner_save_plan`, and all `browser_*` interaction tools.

---

### 3. Atlassian MCP

Connects Copilot to your Atlassian account (Jira, Confluence) for reading issues, creating tickets, and querying project data.

**Requirements:**
- An Atlassian account with API access
- Sign in via the Atlassian MCP OAuth flow when prompted by VS Code

**Configuration** (`.vscode/mcp.json`):
```json
{
  "servers": {
    "atlassian": {
      "type": "http",
      "url": "https://mcp.atlassian.com/v1/mcp"
    }
  }
}
```

On first use VS Code will prompt you to authenticate with your Atlassian account. Once authorised, Copilot can query Jira issues and Confluence pages directly from chat.

---

### 4. GitHub MCP

Connects Copilot to the GitHub API for repository management, pull requests, issues, and code search.

**Requirements:**
- A GitHub account with Copilot access (authentication is handled automatically by VS Code)

**Configuration** (`.vscode/mcp.json`):
```json
{
  "servers": {
    "github": {
      "type": "http",
      "url": "https://api.githubcopilot.com/mcp/"
    }
  }
}
```

No additional token setup is needed — VS Code uses your existing GitHub Copilot session.

---

### Full `.vscode/mcp.json`

```json
{
  "servers": {
    "playwright": {
      "type": "stdio",
      "command": "npx",
      "args": ["@playwright/mcp@latest"]
    },
    "playwright-test": {
      "type": "stdio",
      "command": "npx",
      "args": ["playwright", "run-test-mcp-server"]
    },
    "atlassian": {
      "type": "http",
      "url": "https://mcp.atlassian.com/v1/mcp"
    },
    "github": {
      "type": "http",
      "url": "https://api.githubcopilot.com/mcp/"
    }
  },
  "inputs": []
}
```

---

## Playwright AI Agents

Three GitHub Copilot agents are defined in [.github/agents/](.github/agents/) and use the `playwright-test` MCP server. Invoke them from Copilot Chat with `@` followed by the agent name.

### `@playwright-test-planner`

**File:** [.github/agents/playwright-test-planner.agent.md](.github/agents/playwright-test-planner.agent.md)

Navigates a live application and produces a comprehensive structured test plan. Use it when you want to create test coverage for a new page or flow.

**How to use:**
1. Open Copilot Chat
2. Type: `@playwright-test-planner Create a test plan for https://your-app-url`
3. The agent browses the page, maps all user interactions, and saves a markdown test plan

---

### `@playwright-test-generator`

**File:** [.github/agents/playwright-test-generator.agent.md](.github/agents/playwright-test-generator.agent.md)

Takes a test plan item and generates a ready-to-run Playwright spec file by executing each step live in the browser and observing the resulting selectors.

**How to use:**
1. Open Copilot Chat
2. Reference a test plan item and provide the spec details:
   ```
   @playwright-test-generator
   <test-suite>Task 1: Eligibility</test-suite>
   <test-name>EIS Eligible → Continue</test-name>
   <test-file>tests/eligibility/eis-eligible.spec.ts</test-file>
   <seed-file>tests/auth-setup.spec.ts</seed-file>
   <body>Steps from the test plan...</body>
   ```
3. The agent runs each step in a real browser, reads the interaction log, and writes the spec file

---

### `@playwright-test-healer`

**File:** [.github/agents/playwright-test-healer.agent.md](.github/agents/playwright-test-healer.agent.md)

Automatically debugs and fixes failing Playwright tests. It runs the test suite, pauses on failures, inspects page state, and edits the test code to resolve each issue.

**How to use:**
1. Open Copilot Chat
2. Type: `@playwright-test-healer Fix all failing tests`
3. The agent runs `test_run`, iterates through failures with `test_debug`, updates selectors and assertions, and verifies each fix
