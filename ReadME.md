Sauce_Demo_Framework

This is a Playwright-based test framework is a Hybrid framework based on Page Object Model(POM) model and it is designed to facilitate end-to-end testing of Sauce Demo web applications. The framework follows best practices mentioned below

## Best Practices

### 1. Modularity

### 2. Configuration Management

### 3. Error Handling

### 4. Documentation

### 5. Scalability

### 6. Security

## Getting Started

### Step 1: Create a New Workspace
```sh
mkdir Sauce_Demo_Framework
cd Sauce_Demo_Framework
Step 2: Initialize Playwright
npm init playwright@latest
Step 3: Enable Gitflow Actions
Initialize Git in your project and follow the Gitflow branching model for version control.
Step 4: Organize the Project Structure
Organize your project as follows:

Sauce_Demo_Framework
│
├── .github
├── node_modules 
├── pages
│   ├── LoginPage.ts
│   ├── ProductPage.ts
│   └── CartPage.ts
├── tests
│   └── LoginPageTest.spec.ts
├── config
│   └── qaEnv.ts
├── customFixtures
│   └── fixture.ts
├── package.json
├── package-lock.json
├── playwright.config.ts
└── ReadME.md
Step 5: Initialize TypeScript
tsc --init

Framework Components
1. Pages
Create page classes to encapsulate page-specific actions.

Example: LoginPage.ts

import { Page } from 'playwright';

export class LoginPage {
    constructor(page: Page) {}

    async enterUsername(username: string) {
        await this.page.fill('#username', username);
    }

    async enterPassword(password: string) {
        await this.page.fill('#password', password);
    }

    async clickLoginbutton() {
        await this.page.click('#login');
    }
}
2. Tests
Create test files to test specific modules.

Example: LoginPageTest.spec.ts

import { test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test('Verifying Login Functionality', async ({ page }) => {
    const login = new LoginPage(page);
    await login.enterUsername('testuser');
    await login.enterPassword('password');
    await login.clickLogin();
});

3. Constants and App Data
Move constants and application data to separate folders for better organization.

4. Custom Fixtures
Create custom fixtures to set up and tear down test environments.

Example: salesforceFixture.ts

5. Retry Logic
Add retry logic to handle flaky tests, ensuring tests can be retried on failure.

6. Playwright Report
Add default Playwright report HTML traced to generate detailed test reports.

7. Data Parameterization
Use .env, .csv and .json files for data parameterization to drive tests with various data sets.

npm install csv-parse 
npm install jsonfile 
npm install dotenv

Running Tests
To run the tests, use the following command:

npx playwright test LoginPageTest.spec.ts

This `README.md` file is comprehensive and explains each component and step in your Playwright framework. Adjust and expand the content as necessary to fit the specifics of your project.