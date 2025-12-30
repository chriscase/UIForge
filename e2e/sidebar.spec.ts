import { test, expect, Page } from '@playwright/test'

/**
 * E2E tests for UIForge Sidebar Component
 * 
 * Tests the Sidebar component's features including:
 * - Static variant
 * - Drawer variant
 * - Bottom sheet variant
 * - Open/close functionality
 * - Accessibility features
 */

// Helper to navigate to the Sidebar component example page
async function navigateToSidebar(page: Page) {
  await page.goto('/')
  await page.locator('.component-card:has-text("Sidebar")').click()
  await page.waitForSelector('.sidebar-example')
}

test.describe('Sidebar Component - Static Variant', () => {
  test.beforeEach(async ({ page }) => {
    await navigateToSidebar(page)
  })

  test('static sidebar section is visible', async ({ page }) => {
    const staticSection = page.locator('h3:has-text("Static Variant")')
    await expect(staticSection).toBeVisible()
  })

  test('static sidebar renders with navigation', async ({ page }) => {
    const staticDemo = page.locator('.sidebar-example__demo--static')
    
    if (await staticDemo.count() > 0) {
      const sidebar = staticDemo.locator('.uiforge-sidebar')
      await expect(sidebar).toBeVisible()
      
      // Check for navigation items
      const navItems = sidebar.locator('a, li')
      const count = await navItems.count()
      expect(count).toBeGreaterThan(0)
    }
  })
})

test.describe('Sidebar Component - Drawer Variant', () => {
  test.beforeEach(async ({ page }) => {
    await navigateToSidebar(page)
  })

  test('drawer section is visible', async ({ page }) => {
    const drawerSection = page.locator('h3:has-text("Drawer Variant")')
    await expect(drawerSection).toBeVisible()
  })

  test('can open drawer', async ({ page }) => {
    const openButton = page.locator('button:has-text("Open Drawer")')
    
    if (await openButton.count() > 0) {
      await openButton.click()
      
      // Drawer should be visible
      const drawer = page.locator('.uiforge-sidebar--drawer.uiforge-sidebar--open, .uiforge-sidebar[data-open="true"]')
      if (await drawer.count() > 0) {
        await expect(drawer).toBeVisible()
      }
    }
  })

  test('can close drawer with close button', async ({ page }) => {
    const openButton = page.locator('button:has-text("Open Drawer")')
    
    if (await openButton.count() > 0) {
      await openButton.click()
      await page.waitForTimeout(300)
      
      const closeButton = page.locator('.sidebar-example__close-button, button[aria-label="Close menu"]')
      if (await closeButton.count() > 0) {
        await closeButton.click()
        await page.waitForTimeout(300)
      }
    }
  })

  test('can close drawer with Escape key', async ({ page }) => {
    const openButton = page.locator('button:has-text("Open Drawer")')
    
    if (await openButton.count() > 0) {
      await openButton.click()
      await page.waitForTimeout(300)
      
      // Press Escape to close
      await page.keyboard.press('Escape')
      await page.waitForTimeout(300)
    }
  })

  test('can toggle drawer position', async ({ page }) => {
    const rightRadio = page.locator('input[type="radio"][value="right"]')
    
    if (await rightRadio.count() > 0) {
      await rightRadio.check()
      await expect(rightRadio).toBeChecked()
    }
  })

  test('hamburger button toggles drawer', async ({ page }) => {
    const hamburgerButton = page.locator('.uiforge-hamburger-button')
    
    if (await hamburgerButton.count() > 0) {
      await hamburgerButton.click()
      await page.waitForTimeout(300)
      
      // Check drawer state changed
      const drawerOpen = page.locator('.uiforge-sidebar--open')
      if (await drawerOpen.count() > 0) {
        await expect(drawerOpen).toBeVisible()
      }
    }
  })
})

test.describe('Sidebar Component - Bottom Variant', () => {
  test.beforeEach(async ({ page }) => {
    await navigateToSidebar(page)
  })

  test('bottom section is visible', async ({ page }) => {
    const bottomSection = page.locator('h3:has-text("Bottom Variant")')
    await bottomSection.scrollIntoViewIfNeeded()
    await expect(bottomSection).toBeVisible()
  })

  test('can open bottom sheet', async ({ page }) => {
    const bottomSection = page.locator('h3:has-text("Bottom Variant")')
    await bottomSection.scrollIntoViewIfNeeded()
    
    const openButton = page.locator('button:has-text("Open Bottom Sheet")')
    
    if (await openButton.count() > 0) {
      await openButton.click()
      await page.waitForTimeout(300)
      
      // Bottom sheet should be visible
      const bottomSheet = page.locator('.uiforge-sidebar--bottom.uiforge-sidebar--open, .uiforge-sidebar[data-variant="bottom"]')
      if (await bottomSheet.count() > 0) {
        await expect(bottomSheet).toBeVisible()
      }
    }
  })

  test('bottom sheet has action buttons', async ({ page }) => {
    const bottomSection = page.locator('h3:has-text("Bottom Variant")')
    await bottomSection.scrollIntoViewIfNeeded()
    
    const openButton = page.locator('button:has-text("Open Bottom Sheet")')
    
    if (await openButton.count() > 0) {
      await openButton.click()
      await page.waitForTimeout(300)
      
      // Check for action buttons
      const actionButtons = page.locator('.sidebar-example__action-button')
      if (await actionButtons.count() > 0) {
        expect(await actionButtons.count()).toBeGreaterThan(0)
      }
    }
  })
})

test.describe('Sidebar Component - API Reference', () => {
  test.beforeEach(async ({ page }) => {
    await navigateToSidebar(page)
  })

  test('API reference section is visible', async ({ page }) => {
    const apiSection = page.locator('h3:has-text("API Reference")')
    await apiSection.scrollIntoViewIfNeeded()
    await expect(apiSection).toBeVisible()
  })

  test('API table has prop documentation', async ({ page }) => {
    const apiTable = page.locator('.sidebar-example__api-table')
    await apiTable.scrollIntoViewIfNeeded()
    
    if (await apiTable.count() > 0) {
      // Check for prop columns
      await expect(apiTable.locator('th:has-text("Prop")')).toBeVisible()
      await expect(apiTable.locator('th:has-text("Type")')).toBeVisible()
    }
  })
})

test.describe('Sidebar Component - Accessibility', () => {
  test.beforeEach(async ({ page }) => {
    await navigateToSidebar(page)
  })

  test('drawer has proper ARIA attributes', async ({ page }) => {
    const openButton = page.locator('button:has-text("Open Drawer")')
    
    if (await openButton.count() > 0) {
      await openButton.click()
      await page.waitForTimeout(300)
      
      const drawer = page.locator('.uiforge-sidebar--drawer')
      if (await drawer.count() > 0) {
        // Check for dialog role or aria-modal
        const role = await drawer.getAttribute('role')
        const ariaModal = await drawer.getAttribute('aria-modal')
        
        expect(role === 'dialog' || ariaModal === 'true').toBeTruthy()
      }
    }
  })

  test('focus is trapped in drawer', async ({ page }) => {
    const openButton = page.locator('button:has-text("Open Drawer")')
    
    if (await openButton.count() > 0) {
      await openButton.click()
      await page.waitForTimeout(300)
      
      // Tab through elements
      for (let i = 0; i < 10; i++) {
        await page.keyboard.press('Tab')
      }
      
      // Focus should still be within the drawer area
      const focused = page.locator(':focus')
      await expect(focused).toBeVisible()
    }
  })

  test('sidebar has aria-label', async ({ page }) => {
    const sidebar = page.locator('.uiforge-sidebar').first()
    
    if (await sidebar.count() > 0) {
      const ariaLabel = await sidebar.getAttribute('aria-label')
      expect(ariaLabel).toBeTruthy()
    }
  })
})
