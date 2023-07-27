/**
 * lambda_test.spec.js
 *
 * Certification tests.
 */

// Set up Playwright.
const { test, expect, chromium } = require('@playwright/test')

test.describe('Lambda tests.', () => {
  test('Scenario 1', async ({ page, context }) => {
    await page.goto('https://www.lambdatest.com/selenium-playground')
    await page.click('text="Simple Form Demo"')

    const url = page.url();
    const path = new URL(url).pathname;

    expect(path).toMatch(/simple-form-demo/i);

    const welcomeMsg = 'Welcome to LambdaTest'

    await page.getByPlaceholder('Please enter your Message').fill(welcomeMsg)
    await page.getByRole('button', { name: 'Get Checked Value' }).click()

    const elementContent = await page.$eval('#message', el => el.textContent);
    expect(elementContent).toMatch(welcomeMsg);
  })

  // This method drags the thumb with the mouse.
  test('Scenario 2a', async ({ page, context }) => {
    const targetValue = '95'
    const sliderIncrement = 5 // In viewport pixels.

    await page.goto('https://www.lambdatest.com/selenium-playground')
    await page.click('text="Drag & Drop Sliders"')

    const slider = page.locator('#slider3').getByRole('slider')
    const sliderBoundingBox = await slider.boundingBox()

    // Ensure focus.
    await slider.click()

    // Obtain current value.
    let elementContent = await page.$eval('#slider3 #rangeSuccess', el => el.textContent);

    // Position mouse on slider.
    let thumbXPos = sliderBoundingBox.x + 100
    await page.mouse.move(thumbXPos, sliderBoundingBox.y);
    await page.mouse.down();

    // Move slider by slidedIncrement until the value reaches targetValue.
    while (elementContent != targetValue) {
      // Move the slider.
      thumbXPos += sliderIncrement
      await page.mouse.move(thumbXPos, sliderBoundingBox.y);

      // Obtain current value.
      elementContent = await page.$eval('#slider3 #rangeSuccess', el => el.textContent)
    }
    await page.mouse.up();
  })

  // This method moves the thumb with the right arrow.
  test('Scenario 2b', async ({ page, context }) => {
    const targetValue = '95'

    await page.goto('https://www.lambdatest.com/selenium-playground')
    await page.click('text="Drag & Drop Sliders"')

    // Obtain current value.
    let elementContent = await page.$eval('#slider3 #rangeSuccess', el => el.textContent);

    // Move slider via cursor right until the value reaches targetValue.
    while (elementContent != targetValue) {
      // Move the slider.
      await page.locator('#slider3').getByRole('slider').press('ArrowRight');

      // Obtain current value.
      elementContent = await page.$eval('#slider3 #rangeSuccess', el => el.textContent)
    }
  })

  test('Scenario 3', async ({ page, context }) => {
    await page.goto('https://www.lambdatest.com/selenium-playground')
    await page.click('text="Input Form Submit"')
    await page.getByRole('button', { name: 'Submit' }).click()

    // XPath was the only way to validate the tooltip because it disappears (wasn't able to debug, use
    // DOM Breakpoint, etc.).
    await page.locator('//*[text() = "Please fill out this field."]')

    // Fill in the form.
    await page.type('#name', 'Q. Cumber')
    await page.type('#inputEmail4', 'bob@null.com')
    await page.type('#inputPassword4', 'password')
    await page.type('#company', 'A Company')
    await page.type('#websitename', 'https://facebook.com')
    await page.click('select[name="country"]')
    await page.keyboard.type('United States')
    await page.type('#inputCity', 'A City')
    await page.type('#inputAddress1', 'Line 1')
    await page.type('#inputAddress2', 'Line 2')
    await page.type('#inputState', 'Texas')
    await page.type('#inputZip', '99999')

    await page.getByRole('button', { name: 'Submit' }).click()

    // Validate error message.
    const successMsg = await page.locator('p.success-msg')
    await expect(successMsg).toBeVisible()

    const successString = await successMsg.textContent()
    await expect(successString).toBe("Thanks for contacting us, we will get back to you shortly.")
  })
})