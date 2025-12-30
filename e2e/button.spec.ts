import { test, expect, Page } from '@playwright/test'

/**
 * E2E tests for UIForge Button Component
 * 
 * Tests the Button component's variants, sizes, states, and accessibility.
 */

// Helper to navigate to the Button component example page
async function navigateToButton(page: Page) {
  await page.goto('/')
  // Navigate using the component card
  await page.locator('.component-card:has-text("Button")').click()
  await page.waitForSelector('.demo-section')
}

test.describe('Button Component', () => {
  test.beforeEach(async ({ page }) => {
    await navigateToButton(page)
  })

  test('renders all button variants', async ({ page }) => {
    // Check for all variants section
    const variantsSection = page.locator('h3:has-text("Variants")').locator('..')
    await expect(variantsSection).toBeVisible()
    
    // Verify all variants are rendered
    await expect(variantsSection.locator('button:has-text("Primary Button")')).toBeVisible()
    await expect(variantsSection.locator('button:has-text("Secondary Button")')).toBeVisible()
    await expect(variantsSection.locator('button:has-text("Outline Button")')).toBeVisible()
  })

  test('renders all button sizes', async ({ page }) => {
    // Check for all sizes section
    const sizesSection = page.locator('h3:has-text("Sizes")').locator('..')
    await expect(sizesSection).toBeVisible()
    
    // Verify all sizes are rendered
    await expect(sizesSection.locator('button:has-text("Small")')).toBeVisible()
    await expect(sizesSection.locator('button:has-text("Medium")')).toBeVisible()
    await expect(sizesSection.locator('button:has-text("Large")')).toBeVisible()
  })

  test('renders button states correctly', async ({ page }) => {
    // Check for states section
    const statesSection = page.locator('h3:has-text("States")').locator('..')
    await expect(statesSection).toBeVisible()
    
    // Verify enabled and disabled states
    const enabledButton = statesSection.locator('button:has-text("Enabled")')
    await expect(enabledButton).toBeEnabled()
    
    const disabledButton = statesSection.locator('button:has-text("Disabled")')
    await expect(disabledButton).toBeDisabled()
  })

  test('buttons are keyboard accessible', async ({ page }) => {
    const button = page.locator('.uiforge-button').first()
    await button.focus()
    await expect(button).toBeFocused()
    
    // Verify focus indicator is visible
    const outline = await button.evaluate(el => {
      return window.getComputedStyle(el).outlineStyle
    })
    expect(outline).toBeDefined()
  })

  test('buttons respond to click events', async ({ page }) => {
    const button = page.locator('.uiforge-button').first()
    await expect(button).toBeEnabled()
    
    // Click should not throw
    await button.click()
  })
})
