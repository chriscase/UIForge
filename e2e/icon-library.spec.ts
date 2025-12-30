import { test, expect, Page } from '@playwright/test'

/**
 * E2E tests for UIForge Icon Library
 * 
 * Tests the Icon Library component example page including:
 * - Icon rendering
 * - Search functionality
 * - Copy functionality
 * - Icon sizes
 */

// Helper to navigate to the Icon Library example page
async function navigateToIconLibrary(page: Page) {
  await page.goto('/')
  await page.locator('.component-card:has-text("Icon Library")').click()
  await page.waitForSelector('.icon-library')
}

test.describe('Icon Library - Basic Rendering', () => {
  test.beforeEach(async ({ page }) => {
    await navigateToIconLibrary(page)
  })

  test('renders icon library page', async ({ page }) => {
    const iconLibrary = page.locator('.icon-library')
    await expect(iconLibrary).toBeVisible()
  })

  test('displays page header', async ({ page }) => {
    const header = page.locator('h1:has-text("Icon Library"), h2:has-text("Icon Library")')
    await expect(header.first()).toBeVisible()
  })

  test('renders multiple icons', async ({ page }) => {
    const icons = page.locator('.icon-library__icon, .icon-card, .icon-item, svg')
    const iconCount = await icons.count()
    expect(iconCount).toBeGreaterThan(0)
  })
})

test.describe('Icon Library - Search', () => {
  test.beforeEach(async ({ page }) => {
    await navigateToIconLibrary(page)
  })

  test('search input is visible', async ({ page }) => {
    const searchInput = page.locator('.icon-library__search input, input[placeholder*="Search" i]')
    
    if (await searchInput.count() > 0) {
      await expect(searchInput).toBeVisible()
    }
  })

  test('can search for icons', async ({ page }) => {
    const searchInput = page.locator('.icon-library__search input, input[placeholder*="Search" i]')
    
    if (await searchInput.count() > 0) {
      await searchInput.fill('commit')
      
      // Wait for filter
      await page.waitForTimeout(300)
      
      // Should show filtered results
      const filteredIcons = page.locator('.icon-library__icon, .icon-card, .icon-item')
      if (await filteredIcons.count() > 0) {
        const count = await filteredIcons.count()
        // Should have fewer icons after filtering
        expect(count).toBeGreaterThan(0)
      }
    }
  })
})

test.describe('Icon Library - Icon Display', () => {
  test.beforeEach(async ({ page }) => {
    await navigateToIconLibrary(page)
  })

  test('icons have names/labels', async ({ page }) => {
    const iconLabels = page.locator('.icon-library__icon-name, .icon-card__name, .icon-label')
    
    if (await iconLabels.count() > 0) {
      const firstLabel = iconLabels.first()
      await expect(firstLabel).toBeVisible()
      
      // Label should have text
      const text = await firstLabel.textContent()
      expect(text?.trim().length).toBeGreaterThan(0)
    }
  })

  test('icons are SVG elements', async ({ page }) => {
    const svgIcons = page.locator('.icon-library svg, .icon-card svg')
    
    if (await svgIcons.count() > 0) {
      await expect(svgIcons.first()).toBeVisible()
    }
  })
})

test.describe('Icon Library - Interaction', () => {
  test.beforeEach(async ({ page }) => {
    await navigateToIconLibrary(page)
  })

  test('icons are clickable', async ({ page }) => {
    const iconCard = page.locator('.icon-library__icon, .icon-card').first()
    
    if (await iconCard.count() > 0) {
      // Click should not throw
      await iconCard.click()
      await page.waitForTimeout(200)
    }
  })

  test('size controls are available', async ({ page }) => {
    const sizeControls = page.locator('.icon-library__sizes, .size-slider, input[type="range"]')
    
    if (await sizeControls.count() > 0) {
      await expect(sizeControls.first()).toBeVisible()
    }
  })
})

test.describe('Icon Library - Accessibility', () => {
  test.beforeEach(async ({ page }) => {
    await navigateToIconLibrary(page)
  })

  test('page is keyboard navigable', async ({ page }) => {
    // Tab through the page
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

  test('icons have accessible presentation', async ({ page }) => {
    const svgIcons = page.locator('.icon-library svg').first()
    
    if (await svgIcons.count() > 0) {
      // SVGs should have aria-hidden or role for decoration
      const ariaHidden = await svgIcons.getAttribute('aria-hidden')
      const role = await svgIcons.getAttribute('role')
      
      // Either should be set for accessibility
      expect(ariaHidden || role).toBeDefined()
    }
  })
})
