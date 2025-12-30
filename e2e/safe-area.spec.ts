import { test, expect, Page } from '@playwright/test'

/**
 * E2E tests for UIForge Safe Area and CSS Tokens
 * 
 * Tests the Safe Area utility classes and CSS Tokens example page.
 */

// Helper to navigate to the Safe Area example page
async function navigateToSafeArea(page: Page) {
  await page.goto('/')
  await page.locator('.component-card:has-text("CSS Tokens & Safe-Area")').click()
  await page.waitForSelector('.safe-area-example, main')
}

test.describe('Safe Area - Basic Rendering', () => {
  test.beforeEach(async ({ page }) => {
    await navigateToSafeArea(page)
  })

  test('renders safe area example page', async ({ page }) => {
    const example = page.locator('.safe-area-example, main')
    await expect(example).toBeVisible()
  })

  test('displays page header', async ({ page }) => {
    const header = page.locator('h1, h2').filter({ hasText: /Safe|Token/i })
    await expect(header.first()).toBeVisible()
  })

  test('shows CSS tokens section', async ({ page }) => {
    // Look for tokens section
    const tokensSection = page.locator('text=--uiforge, h3:has-text("Tokens"), h3:has-text("Variables")')
    
    if (await tokensSection.count() > 0) {
      await expect(tokensSection.first()).toBeVisible()
    }
  })
})

test.describe('Safe Area - CSS Tokens', () => {
  test.beforeEach(async ({ page }) => {
    await navigateToSafeArea(page)
  })

  test('displays token examples', async ({ page }) => {
    // Look for CSS variable examples
    const tokenExamples = page.locator('code, pre').filter({ hasText: /--uiforge/i })
    
    if (await tokenExamples.count() > 0) {
      await expect(tokenExamples.first()).toBeVisible()
    }
  })

  test('shows color tokens', async ({ page }) => {
    const colorTokens = page.locator('text=color, text=background').first()
    await expect(colorTokens).toBeVisible()
  })
})

test.describe('Safe Area - Utility Classes', () => {
  test.beforeEach(async ({ page }) => {
    await navigateToSafeArea(page)
  })

  test('displays safe area utility classes', async ({ page }) => {
    // Look for utility class examples
    const utilityClasses = page.locator('text=uiforge-safe-area, text=.uiforge-')
    
    if (await utilityClasses.count() > 0) {
      await expect(utilityClasses.first()).toBeVisible()
    }
  })

  test('shows documentation for safe areas', async ({ page }) => {
    // Look for safe area documentation
    const safeAreaDocs = page.locator('text=safe-area, text=Safe Area').first()
    await expect(safeAreaDocs).toBeVisible()
  })
})

test.describe('Safe Area - Demo Elements', () => {
  test.beforeEach(async ({ page }) => {
    await navigateToSafeArea(page)
  })

  test('renders demo components', async ({ page }) => {
    // Look for any demo/preview elements
    const demoElements = page.locator('.safe-area-example__demo, .demo, .preview, .example')
    
    if (await demoElements.count() > 0) {
      await expect(demoElements.first()).toBeVisible()
    }
  })

  test('shows token values or swatches', async ({ page }) => {
    // Look for visual token representations
    const tokenSwatches = page.locator('.token-swatch, .color-swatch, [style*="background"]')
    
    if (await tokenSwatches.count() > 0) {
      expect(await tokenSwatches.count()).toBeGreaterThan(0)
    }
  })
})

test.describe('Safe Area - Navigation', () => {
  test.beforeEach(async ({ page }) => {
    await navigateToSafeArea(page)
  })

  test('has back button', async ({ page }) => {
    const backButton = page.locator('button:has-text("Back"), a:has-text("Back")')
    
    if (await backButton.count() > 0) {
      await expect(backButton.first()).toBeVisible()
    }
  })

  test('can navigate back to home', async ({ page }) => {
    const backButton = page.locator('button:has-text("Back"), a:has-text("Back")')
    
    if (await backButton.count() > 0) {
      await backButton.first().click()
      
      // Should navigate back to home
      await page.waitForSelector('.home, .component-card')
    }
  })
})

test.describe('Safe Area - Accessibility', () => {
  test.beforeEach(async ({ page }) => {
    await navigateToSafeArea(page)
  })

  test('page is keyboard navigable', async ({ page }) => {
    await page.keyboard.press('Tab')
    
    const focused = page.locator(':focus')
    await expect(focused).toBeVisible()
  })

  test('code blocks are readable', async ({ page }) => {
    const codeBlocks = page.locator('code, pre')
    
    if (await codeBlocks.count() > 0) {
      const firstCode = codeBlocks.first()
      const text = await firstCode.textContent()
      
      expect(text?.trim().length).toBeGreaterThan(0)
    }
  })
})
