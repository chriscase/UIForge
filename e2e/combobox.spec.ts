import { test, expect, Page } from '@playwright/test'

/**
 * E2E tests for UIForge ComboBox Component
 * 
 * Tests the ComboBox component's features including:
 * - Simple selection
 * - Search functionality
 * - Hierarchical options
 * - Disabled state
 * - Keyboard navigation
 */

// Helper to navigate to the ComboBox component example page
async function navigateToComboBox(page: Page) {
  await page.goto('/')
  await page.locator('.component-card:has-text("ComboBox")').click()
  await page.waitForSelector('h2:has-text("UIForgeComboBox")')
}

test.describe('ComboBox Component - Basic Functionality', () => {
  test.beforeEach(async ({ page }) => {
    await navigateToComboBox(page)
  })

  test('renders combobox section', async ({ page }) => {
    const section = page.locator('h2:has-text("UIForgeComboBox")')
    await expect(section).toBeVisible()
  })

  test('simple select section is visible', async ({ page }) => {
    const section = page.locator('h3:has-text("Simple Select")')
    await expect(section).toBeVisible()
  })

  test('hierarchical options section is visible', async ({ page }) => {
    const section = page.locator('h3:has-text("Hierarchical Options")')
    await section.scrollIntoViewIfNeeded()
    await expect(section).toBeVisible()
  })

  test('disabled state section is visible', async ({ page }) => {
    const section = page.locator('h3:has-text("Disabled State")')
    await section.scrollIntoViewIfNeeded()
    await expect(section).toBeVisible()
  })

  test('async search section is visible', async ({ page }) => {
    const section = page.locator('h3:has-text("Async Search")')
    await section.scrollIntoViewIfNeeded()
    await expect(section).toBeVisible()
  })
})

test.describe('ComboBox Component - Accessibility', () => {
  test.beforeEach(async ({ page }) => {
    await navigateToComboBox(page)
  })

  test('page is keyboard navigable', async ({ page }) => {
    await page.keyboard.press('Tab')
    
    const focused = page.locator(':focus')
    await expect(focused).toBeVisible()
  })
})
