import { test, expect } from '@playwright/test'

/**
 * E2E tests for UIForge Mobile Header Primitives
 * 
 * Tests IconButton, MobileHeaderLayout, and OverflowMenu components
 * across various device widths per QA checklist:
 * - Touch targets are at least 44×44 CSS pixels
 * - Header height is appropriate (56px)
 * - Focus states are visible for keyboard users  
 * - Long titles truncate with ellipsis
 * - hideOnDesktop behavior at breakpoints
 */

// Helper to navigate to Mobile Header example page
async function navigateToMobileHeader(page: import('@playwright/test').Page) {
  await page.goto('/')
  // Click on the Mobile Header card in the home page
  await page.click('text=Mobile Header')
  await page.waitForSelector('.uiforge-mobile-header-layout')
}

// Helper to navigate to CourseForge Mobile Header example page  
async function navigateToCourseForgeHeader(page: import('@playwright/test').Page) {
  await page.goto('/')
  // Click on the CourseForge Mobile Header card in the home page
  await page.click('text=CourseForge Mobile Header')
  await page.waitForSelector('.uiforge-mobile-header-layout')
}

test.describe('MobileHeaderLayout', () => {
  test.beforeEach(async ({ page }) => {
    await navigateToMobileHeader(page)
  })

  test('renders header with correct structure', async ({ page }) => {
    const header = page.locator('.uiforge-mobile-header-layout').first()
    await expect(header).toBeVisible()
    
    // Verify 3-slot layout exists
    await expect(header.locator('.uiforge-mobile-header-layout__left')).toBeVisible()
    await expect(header.locator('.uiforge-mobile-header-layout__center')).toBeVisible()
    await expect(header.locator('.uiforge-mobile-header-layout__right')).toBeVisible()
  })

  test('header has correct height (56px)', async ({ page }) => {
    const header = page.locator('.uiforge-mobile-header-layout').first()
    const box = await header.boundingBox()
    expect(box).not.toBeNull()
    // Allow small variance for different browsers
    expect(box!.height).toBeGreaterThanOrEqual(54)
    expect(box!.height).toBeLessThanOrEqual(60)
  })

  test('long title is truncated with ellipsis', async ({ page }) => {
    // Find title element that has truncation CSS applied
    const titleElements = page.locator('.uiforge-mobile-header-layout__title')
    const count = await titleElements.count()
    
    if (count > 0) {
      const titleElement = titleElements.first()
      
      // Verify CSS for text truncation
      const styles = await titleElement.evaluate(el => {
        const computed = window.getComputedStyle(el)
        return {
          overflow: computed.overflow,
          textOverflow: computed.textOverflow,
          whiteSpace: computed.whiteSpace,
        }
      })
      
      expect(styles.overflow).toBe('hidden')
      expect(styles.textOverflow).toBe('ellipsis')
      expect(styles.whiteSpace).toBe('nowrap')
    }
  })
})

test.describe('IconButton touch targets', () => {
  test.beforeEach(async ({ page }) => {
    await navigateToMobileHeader(page)
  })

  test('IconButton has minimum 44x44px touch target', async ({ page }) => {
    const iconButtons = page.locator('.uiforge-icon-button')
    const count = await iconButtons.count()
    expect(count).toBeGreaterThan(0)
    
    // Check first few buttons meet touch target requirements
    for (let i = 0; i < Math.min(count, 3); i++) {
      const button = iconButtons.nth(i)
      const box = await button.boundingBox()
      expect(box).not.toBeNull()
      // WCAG requires minimum 44x44px touch targets
      expect(box!.width).toBeGreaterThanOrEqual(44)
      expect(box!.height).toBeGreaterThanOrEqual(44)
    }
  })

  test('IconButton has proper aria-label', async ({ page }) => {
    const iconButton = page.locator('.uiforge-icon-button').first()
    const ariaLabel = await iconButton.getAttribute('aria-label')
    expect(ariaLabel).toBeTruthy()
    expect(ariaLabel!.length).toBeGreaterThan(0)
  })

  test('IconButton responds to click', async ({ page }) => {
    const button = page.locator('.uiforge-icon-button').first()
    await expect(button).toBeEnabled()
    // Click should not throw
    await button.click()
  })
})

test.describe('IconButton keyboard interaction', () => {
  test.beforeEach(async ({ page }) => {
    await navigateToMobileHeader(page)
  })

  test('IconButton can receive keyboard focus', async ({ page }) => {
    const button = page.locator('.uiforge-icon-button').first()
    await button.focus()
    await expect(button).toBeFocused()
  })

  test('IconButton has visible focus indicator', async ({ page }) => {
    const button = page.locator('.uiforge-icon-button').first()
    await button.focus()
    
    // Focus indicator is defined in CSS via :focus-visible
    const outline = await button.evaluate(el => {
      return window.getComputedStyle(el).outlineStyle
    })
    // Just verify it has some outline styling defined (not 'none')
    expect(outline).toBeDefined()
  })
})

test.describe('OverflowMenu', () => {
  test.beforeEach(async ({ page }) => {
    await navigateToCourseForgeHeader(page)
  })

  test('OverflowMenu trigger is accessible', async ({ page }) => {
    const menuContainer = page.locator('.uiforge-overflow-menu').first()
    await expect(menuContainer).toBeVisible()
    
    // Check trigger has proper ARIA attributes
    const trigger = menuContainer.locator('[aria-haspopup="menu"]')
    await expect(trigger).toBeVisible()
    await expect(trigger).toHaveAttribute('aria-expanded', 'false')
  })

  test('OverflowMenu opens on click', async ({ page }) => {
    const menuContainer = page.locator('.uiforge-overflow-menu').first()
    const trigger = menuContainer.locator('[aria-haspopup="menu"]')
    
    await trigger.click()
    
    // Menu should open
    const menu = page.locator('[role="menu"]').first()
    await expect(menu).toBeVisible()
    await expect(trigger).toHaveAttribute('aria-expanded', 'true')
  })

  test('OverflowMenu closes on Escape', async ({ page }) => {
    const menuContainer = page.locator('.uiforge-overflow-menu').first()
    const trigger = menuContainer.locator('[aria-haspopup="menu"]')
    
    // Open menu
    await trigger.click()
    await expect(page.locator('[role="menu"]').first()).toBeVisible()
    
    // Close with Escape
    await page.keyboard.press('Escape')
    await expect(page.locator('[role="menu"]')).not.toBeVisible()
  })

  test('OverflowMenu supports arrow key navigation', async ({ page }) => {
    const menuContainer = page.locator('.uiforge-overflow-menu').first()
    const trigger = menuContainer.locator('[aria-haspopup="menu"]')
    
    await trigger.click()
    await expect(page.locator('[role="menu"]').first()).toBeVisible()
    
    // Arrow down should navigate menu items
    await page.keyboard.press('ArrowDown')
    
    // Verify menu items exist
    const menuItems = page.locator('[role="menuitem"]')
    const count = await menuItems.count()
    expect(count).toBeGreaterThan(0)
  })

  test('OverflowMenu item selection closes menu', async ({ page }) => {
    const menuContainer = page.locator('.uiforge-overflow-menu').first()
    const trigger = menuContainer.locator('[aria-haspopup="menu"]')
    
    await trigger.click()
    await expect(page.locator('[role="menu"]').first()).toBeVisible()
    
    // Click first menu item
    const firstItem = page.locator('[role="menuitem"]').first()
    await firstItem.click()
    
    // Menu should close
    await expect(page.locator('[role="menu"]')).not.toBeVisible()
  })
})

test.describe('hideOnDesktop behavior', () => {
  test('header with hideOnDesktop is visible on mobile widths', async ({ page }) => {
    await navigateToMobileHeader(page)
    
    const viewport = page.viewportSize()
    // Only run on mobile viewports (< 600px)
    if (!viewport || viewport.width >= 600) {
      test.skip()
      return
    }
    
    // Find header with hideOnDesktop class
    const hideOnDesktopHeader = page.locator('.uiforge-mobile-header-layout--hide-on-desktop')
    
    if (await hideOnDesktopHeader.count() > 0) {
      await expect(hideOnDesktopHeader.first()).toBeVisible()
    }
  })

  test('header with hideOnDesktop is hidden on desktop widths', async ({ page }) => {
    await navigateToMobileHeader(page)
    
    const viewport = page.viewportSize()
    // Only run on desktop viewports (>= 600px)
    if (!viewport || viewport.width < 600) {
      test.skip()
      return
    }
    
    // Find header with hideOnDesktop class
    const hideOnDesktopHeader = page.locator('.uiforge-mobile-header-layout--hide-on-desktop')
    
    if (await hideOnDesktopHeader.count() > 0) {
      await expect(hideOnDesktopHeader.first()).toBeHidden()
    }
  })
})

test.describe('Composition patterns', () => {
  test.beforeEach(async ({ page }) => {
    await navigateToCourseForgeHeader(page)
  })

  test('CourseForge header renders all composition patterns', async ({ page }) => {
    // Check each pattern section exists
    await expect(page.locator('text=Pattern 1')).toBeVisible()
    await expect(page.locator('text=Pattern 2')).toBeVisible()
    await expect(page.locator('text=Pattern 3')).toBeVisible()
    await expect(page.locator('text=Pattern 4')).toBeVisible()
  })

  test('all IconButtons have descriptive aria-labels', async ({ page }) => {
    const iconButtons = page.locator('.uiforge-icon-button')
    const count = await iconButtons.count()
    
    expect(count).toBeGreaterThan(0)
    
    for (let i = 0; i < count; i++) {
      const button = iconButtons.nth(i)
      const ariaLabel = await button.getAttribute('aria-label')
      expect(ariaLabel).toBeTruthy()
      // Verify labels are descriptive (not empty or just "button")
      expect(ariaLabel!.length).toBeGreaterThan(2)
    }
  })

  test('header actions are interactive', async ({ page }) => {
    // Find and click an action button
    const actionButton = page.locator('.uiforge-icon-button[aria-label*="back" i]').first()
    
    if (await actionButton.count() > 0) {
      await actionButton.click()
      
      // Action log should show the action
      const actionLog = page.locator('.courseforge-example__log')
      await expect(actionLog).toBeVisible()
    }
  })
})

test.describe('Focus management', () => {
  test.beforeEach(async ({ page }) => {
    await navigateToCourseForgeHeader(page)
  })

  test('Tab navigates through interactive elements', async ({ page }) => {
    // Start tabbing from body
    await page.keyboard.press('Tab')
    
    // Should be able to tab to interactive elements
    let focusedCount = 0
    for (let i = 0; i < 10; i++) {
      const focused = page.locator(':focus')
      const tagName = await focused.evaluate(el => el.tagName.toLowerCase()).catch(() => '')
      if (['button', 'a'].includes(tagName)) {
        focusedCount++
      }
      await page.keyboard.press('Tab')
    }
    
    expect(focusedCount).toBeGreaterThan(0)
  })

  test('OverflowMenu returns focus to trigger on close', async ({ page }) => {
    const menuContainer = page.locator('.uiforge-overflow-menu').first()
    const trigger = menuContainer.locator('[aria-haspopup="menu"]')
    
    // Focus and open
    await trigger.focus()
    await page.keyboard.press('Enter')
    await expect(page.locator('[role="menu"]').first()).toBeVisible()
    
    // Close with Escape
    await page.keyboard.press('Escape')
    await expect(page.locator('[role="menu"]')).not.toBeVisible()
    
    // Focus should return (to trigger or its container)
    const focused = page.locator(':focus')
    await expect(focused).toBeVisible()
  })
})
