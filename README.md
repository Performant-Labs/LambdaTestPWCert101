# LambdaTestPWCert101

## About the tests

Scenario 1: No changes

Scenario 2:
I created two tests for the slider, 2a uses a mouse and 2b uses the keyboard.

Locators:
const slider = page.locator('#slider3').getByRole('slider')

Scenario 3:
Locators:
await page.locator('//*[text() = "Please fill out this field."]')
const successMsg = await page.locator('p.success-msg')

## Setup
Gitpod environment was set up with:
1. Install Playwright and dependencies:
   npm update
2. Install browsers and dependencies:
   npx playwright install
   npx playwright install-deps
3. Playwright.config.js has been altered to run

## Run tests locally

1. Open a Terminal.
2. Run all tests:
   npx playwright test

Pull up the report (npx playwright show-report) and you should see 8 passed tests (4 on Chrome, 4 on Safari).

## Run tests on LambdaTest


