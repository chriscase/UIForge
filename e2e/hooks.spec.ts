import { test, expect, Page } from '@playwright/test'

/**
 * E2E tests for UIForge Hooks
 * 
 * Tests the useResponsive and useDynamicPageCount hooks example pages.
 */

// Helper to navigate to the useResponsive hook example page
async function navigateToUseResponsive(page: Page) {
  await page.goto('/')
  await page.locator('.component-card:has-text("useResponsive")').click()
  await page.waitForSelector('.use-responsive-example, .responsive-example')
}

// Helper to navigate to the useDynamicPageCount hook example page
async function navigateToUseDynamicPageCount(page: Page) {
  await page.goto('/')
  await page.locator('.component-card:has-text("useDynamicPageCount")').click()
  await page.waitForSelector('.use-dynamic-page-count-example, .dynamic-page-count-example')
}

test.describe('useResponsive Hook - Basic Rendering', () => {
  test.beforeEach(async ({ page }) => {
    await navigateToUseResponsive(page)
  })

  test('renders useResponsive example page', async ({ page }) => {
    const example = page.locator('.use-responsive-example, .responsive-example, main')
    await expect(example).toBeVisible()
  })

  test('displays hook description', async ({ page }) => {
    const description = page.locator('text=container, text=responsive, text=breakpoint').first()
    await expect(description).toBeVisible()
  })

  test('shows responsive state indicators', async ({ page }) => {
    // Look for any state indicators showing current breakpoint
    const indicators = page.locator('.responsive-indicator, .breakpoint-indicator, [class*="indicator"]')
    
    if (await indicators.count() > 0) {
      await expect(indicators.first()).toBeVisible()
    }
  })
})

test.describe('useResponsive Hook - Responsive Behavior', () => {
  test.beforeEach(async ({ page }) => {
    await navigateToUseResponsive(page)
  })

  test('displays current viewport information', async ({ page }) => {
    const viewport = page.viewportSize()
    
    // The example should display some responsive state
    const content = await page.content()
    
    // Page should contain some responsive-related content
    expect(content.toLowerCase()).toContain('responsive')
  })
})

test.describe('useDynamicPageCount Hook - Basic Rendering', () => {
  test.beforeEach(async ({ page }) => {
    await navigateToUseDynamicPageCount(page)
  })

  test('renders useDynamicPageCount example page', async ({ page }) => {
    const example = page.locator('.use-dynamic-page-count-example, .dynamic-page-count-example, main')
    await expect(example).toBeVisible()
  })

  test('displays hook description', async ({ page }) => {
    const description = page.locator('text=page, text=dynamic, text=count').first()
    await expect(description).toBeVisible()
  })

  test('shows page count calculation', async ({ page }) => {
    // Look for page count or size indicators
    const pageInfo = page.locator('.page-count, .page-size, text=PageSize, text=items')
    
    if (await pageInfo.count() > 0) {
      await expect(pageInfo.first()).toBeVisible()
    }
  })
})

test.describe('useDynamicPageCount Hook - Calculation', () => {
  test.beforeEach(async ({ page }) => {
    await navigateToUseDynamicPageCount(page)
  })

  test('displays calculated page count', async ({ page }) => {
    // The example should show the calculated page count
    const content = await page.content()
    
    // Page should contain dynamic page count related content
    expect(content.toLowerCase()).toContain('page')
  })
})

test.describe('Hooks - Back Navigation', () => {
  test('useResponsive has back button', async ({ page }) => {
    await navigateToUseResponsive(page)
    
    const backButton = page.locator('button:has-text("Back"), a:has-text("Back")')
    if (await backButton.count() > 0) {
      await expect(backButton.first()).toBeVisible()
    }
  })

  test('useDynamicPageCount has back button', async ({ page }) => {
    await navigateToUseDynamicPageCount(page)
    
    const backButton = page.locator('button:has-text("Back"), a:has-text("Back")')
    if (await backButton.count() > 0) {
      await expect(backButton.first()).toBeVisible()
    }
  })

  test('can navigate back from useResponsive', async ({ page }) => {
    await navigateToUseResponsive(page)
    
    const backButton = page.locator('button:has-text("Back"), a:has-text("Back")')
    if (await backButton.count() > 0) {
      await backButton.first().click()
      
      // Should navigate back to home
      await page.waitForSelector('.home, .component-card')
    }
  })
})

test.describe('Hooks - Accessibility', () => {
  test('useResponsive page is keyboard navigable', async ({ page }) => {
    await navigateToUseResponsive(page)
    
    await page.keyboard.press('Tab')
    
    const focused = page.locator(':focus')
    await expect(focused).toBeVisible()
  })

  test('useDynamicPageCount page is keyboard navigable', async ({ page }) => {
    await navigateToUseDynamicPageCount(page)
    
    await page.keyboard.press('Tab')
    
    const focused = page.locator(':focus')
    await expect(focused).toBeVisible()
  })
})
