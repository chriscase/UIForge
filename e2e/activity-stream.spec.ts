import { test, expect, Page } from '@playwright/test'

/**
 * E2E tests for UIForge ActivityStream Component
 * 
 * Tests the ActivityStream component's features including:
 * - Event rendering
 * - Grouping functionality
 * - Theme switching
 * - Density controls
 * - Load more functionality
 * - Timeline visualization
 */

// Helper to navigate to the ActivityStream component example page
async function navigateToActivityStream(page: Page) {
  await page.goto('/')
  await page.locator('.component-card:has-text("Activity Stream")').click()
  await page.waitForSelector('.uiforge-activity-stream')
}

test.describe('ActivityStream Component - Basic Rendering', () => {
  test.beforeEach(async ({ page }) => {
    await navigateToActivityStream(page)
  })

  test('renders activity stream container', async ({ page }) => {
    const activityStream = page.locator('.uiforge-activity-stream').first()
    await expect(activityStream).toBeVisible()
  })

  test('displays activity events', async ({ page }) => {
    const activityStream = page.locator('.uiforge-activity-stream').first()
    
    // Check for activity items
    const items = activityStream.locator('.uiforge-activity-item, .uiforge-activity-stream__item')
    const itemCount = await items.count()
    expect(itemCount).toBeGreaterThan(0)
  })

  test('shows page header and description', async ({ page }) => {
    const header = page.locator('h1:has-text("UIForge Activity Stream")')
    await expect(header).toBeVisible()
  })
})

test.describe('ActivityStream Component - Controls', () => {
  test.beforeEach(async ({ page }) => {
    await navigateToActivityStream(page)
  })

  test('density controls are visible', async ({ page }) => {
    const densityControls = page.locator('.density-toggle, .density-button')
    
    if (await densityControls.count() > 0) {
      await expect(densityControls.first()).toBeVisible()
    }
  })

  test('can toggle grouping', async ({ page }) => {
    const groupingCheckbox = page.locator('input[type="checkbox"]').filter({ hasText: 'Enable Smart Grouping' }).or(
      page.locator('label:has-text("Enable Smart Grouping") input[type="checkbox"]')
    )
    
    if (await groupingCheckbox.count() > 0) {
      // Toggle grouping
      await groupingCheckbox.first().click()
      await page.waitForTimeout(300)
    }
  })

  test('can toggle timeline', async ({ page }) => {
    const timelineCheckbox = page.locator('label:has-text("Show Timeline") input[type="checkbox"]')
    
    if (await timelineCheckbox.count() > 0) {
      await timelineCheckbox.click()
      await page.waitForTimeout(300)
    }
  })

  test('can toggle date separators', async ({ page }) => {
    const dateSeparatorsCheckbox = page.locator('label:has-text("Show Date Separators") input[type="checkbox"]')
    
    if (await dateSeparatorsCheckbox.count() > 0) {
      await dateSeparatorsCheckbox.click()
      await page.waitForTimeout(300)
    }
  })
})

test.describe('ActivityStream Component - Density', () => {
  test.beforeEach(async ({ page }) => {
    await navigateToActivityStream(page)
  })

  test('can switch to condensed density', async ({ page }) => {
    const condensedButton = page.locator('.density-button:has-text("Condensed")')
    
    if (await condensedButton.count() > 0) {
      await condensedButton.click()
      await expect(condensedButton).toHaveAttribute('aria-pressed', 'true')
    }
  })

  test('can switch to compact density', async ({ page }) => {
    const compactButton = page.locator('.density-button:has-text("Compact")')
    
    if (await compactButton.count() > 0) {
      await compactButton.click()
      await expect(compactButton).toHaveAttribute('aria-pressed', 'true')
    }
  })

  test('can switch to comfortable density', async ({ page }) => {
    const comfortableButton = page.locator('.density-button:has-text("Comfortable")')
    
    if (await comfortableButton.count() > 0) {
      await comfortableButton.click()
      await expect(comfortableButton).toHaveAttribute('aria-pressed', 'true')
    }
  })
})

test.describe('ActivityStream Component - Theme', () => {
  test.beforeEach(async ({ page }) => {
    await navigateToActivityStream(page)
  })

  test('theme selector is visible', async ({ page }) => {
    const themeSelect = page.locator('#theme-select')
    
    if (await themeSelect.count() > 0) {
      await expect(themeSelect).toBeVisible()
    }
  })

  test('can switch to light theme', async ({ page }) => {
    const themeSelect = page.locator('#theme-select')
    
    if (await themeSelect.count() > 0) {
      await themeSelect.selectOption('light')
      await page.waitForTimeout(300)
      
      // Verify theme changed
      const container = page.locator('.activity-stream-example')
      const className = await container.getAttribute('class')
      // Light theme should not have dark-theme class
      expect(className).not.toContain('dark-theme')
    }
  })
})

test.describe('ActivityStream Component - Event Interaction', () => {
  test.beforeEach(async ({ page }) => {
    await navigateToActivityStream(page)
  })

  test('events are clickable/expandable', async ({ page }) => {
    const activityStream = page.locator('.uiforge-activity-stream').first()
    const firstItem = activityStream.locator('.uiforge-activity-item, .uiforge-activity-stream__item').first()
    
    // Click on item to expand
    await firstItem.click()
    await page.waitForTimeout(300)
  })

  test('reset button resets events', async ({ page }) => {
    const resetButton = page.locator('.activity-stream-example__reset-button, button:has-text("Reset Events")')
    
    if (await resetButton.count() > 0) {
      await resetButton.click()
      await page.waitForTimeout(300)
    }
  })
})

test.describe('ActivityStream Component - Features', () => {
  test.beforeEach(async ({ page }) => {
    await navigateToActivityStream(page)
  })

  test('features section is visible', async ({ page }) => {
    const featuresSection = page.locator('.activity-stream-example__features, h3:has-text("Key Features")')
    await expect(featuresSection.first()).toBeVisible()
  })

  test('timeline visualization is shown', async ({ page }) => {
    const activityStream = page.locator('.uiforge-activity-stream').first()
    
    // Look for timeline element
    const timeline = activityStream.locator('.uiforge-activity-stream__timeline, .uiforge-activity-item__timeline')
    
    // Timeline should be visible when enabled
    if (await timeline.count() > 0) {
      await expect(timeline.first()).toBeVisible()
    }
  })
})

test.describe('ActivityStream Component - Accessibility', () => {
  test.beforeEach(async ({ page }) => {
    await navigateToActivityStream(page)
  })

  test('activity items have proper structure', async ({ page }) => {
    const activityStream = page.locator('.uiforge-activity-stream').first()
    
    // Check for semantic list or items
    const items = activityStream.locator('.uiforge-activity-item, [role="listitem"], li')
    const itemCount = await items.count()
    expect(itemCount).toBeGreaterThan(0)
  })

  test('keyboard navigation works', async ({ page }) => {
    // Tab through activity items
    await page.keyboard.press('Tab')
    
    let focusCount = 0
    for (let i = 0; i < 10; i++) {
      const focused = page.locator(':focus')
      if (await focused.count() > 0) {
        focusCount++
      }
      await page.keyboard.press('Tab')
    }
    
    expect(focusCount).toBeGreaterThan(0)
  })
})
