import { test, expect, Page } from '@playwright/test'

/**
 * E2E tests for UIForge Home Page
 * 
 * Tests the home page and navigation to component examples.
 */

// Helper to navigate to home
async function navigateToHome(page: Page) {
  await page.goto('/')
}

test.describe('Home Page - Basic Rendering', () => {
  test.beforeEach(async ({ page }) => {
    await navigateToHome(page)
  })

  test('renders home page with header', async ({ page }) => {
    const header = page.locator('h1:has-text("UIForge Component Library")')
    await expect(header).toBeVisible()
  })

  test('displays all component cards', async ({ page }) => {
    const componentCards = page.locator('.component-card')
    const count = await componentCards.count()
    
    // Should have multiple component cards (at least some components)
    expect(count).toBeGreaterThan(5)
  })

  test('theme selector is visible', async ({ page }) => {
    const themeSelector = page.locator('#home-theme')
    await expect(themeSelector).toBeVisible()
  })
})

test.describe('Home Page - Component Cards', () => {
  test.beforeEach(async ({ page }) => {
    await navigateToHome(page)
  })

  test('Activity Stream card is visible', async ({ page }) => {
    const card = page.locator('.component-card:has-text("Activity Stream")')
    await expect(card).toBeVisible()
  })

  test('Grid card is visible', async ({ page }) => {
    const card = page.locator('.component-card:has-text("Grid")')
    await expect(card).toBeVisible()
  })

  test('ComboBox card is visible', async ({ page }) => {
    const card = page.locator('.component-card:has-text("ComboBox")')
    await expect(card).toBeVisible()
  })

  test('Button card is visible', async ({ page }) => {
    const card = page.locator('.component-card:has-text("Button")')
    await expect(card).toBeVisible()
  })

  test('Blocks Editor card is visible', async ({ page }) => {
    const card = page.locator('.component-card:has-text("Blocks Editor")')
    await expect(card).toBeVisible()
  })

  test('Video card is visible', async ({ page }) => {
    const card = page.locator('.component-card:has-text("Video")')
    await expect(card).toBeVisible()
  })

  test('Sidebar card is visible', async ({ page }) => {
    const card = page.locator('.component-card:has-text("Sidebar")')
    await expect(card).toBeVisible()
  })

  test('Icon Library card is visible', async ({ page }) => {
    const card = page.locator('.component-card:has-text("Icon Library")')
    await expect(card).toBeVisible()
  })

  test('Mobile Header card is visible', async ({ page }) => {
    // Use more specific selector to target the Mobile Header card (not CourseForge)
    const cards = page.locator('.component-card')
    let found = false
    const count = await cards.count()
    
    for (let i = 0; i < count; i++) {
      const card = cards.nth(i)
      const text = await card.textContent()
      if (text?.includes('Mobile Header') && !text?.includes('CourseForge')) {
        found = true
        await expect(card).toBeVisible()
        break
      }
    }
    
    expect(found).toBeTruthy()
  })

  test('MediaCard & SongCard card is visible', async ({ page }) => {
    const card = page.locator('.component-card:has-text("MediaCard & SongCard")')
    await expect(card).toBeVisible()
  })
})

test.describe('Home Page - Navigation', () => {
  test.beforeEach(async ({ page }) => {
    await navigateToHome(page)
  })

  test('can navigate to Activity Stream', async ({ page }) => {
    const card = page.locator('.component-card:has-text("Activity Stream")')
    await card.click()
    await page.waitForSelector('.uiforge-activity-stream, .activity-stream-example')
  })

  test('can navigate to Grid', async ({ page }) => {
    const card = page.locator('.component-card:has-text("Grid")')
    await card.click()
    await page.waitForSelector('.uiforge-grid')
  })

  test('can navigate to ComboBox', async ({ page }) => {
    const card = page.locator('.component-card:has-text("ComboBox")')
    await card.click()
    await page.waitForSelector('.uiforge-combobox')
  })

  test('can navigate to Button', async ({ page }) => {
    const card = page.locator('.component-card:has-text("Button")')
    await card.click()
    await page.waitForSelector('.uiforge-button')
  })

  test('can navigate to Sidebar', async ({ page }) => {
    const card = page.locator('.component-card:has-text("Sidebar")')
    await card.click()
    await page.waitForSelector('.sidebar-example')
  })
})

test.describe('Home Page - Theme', () => {
  test.beforeEach(async ({ page }) => {
    await navigateToHome(page)
  })

  test('can switch to light theme', async ({ page }) => {
    const themeSelector = page.locator('#home-theme')
    await themeSelector.selectOption('light')
    
    // Verify theme changed
    const home = page.locator('.home')
    const dataTheme = await home.getAttribute('data-theme')
    expect(dataTheme).toBe('light')
  })

  test('can switch to dark theme', async ({ page }) => {
    // First switch to light
    const themeSelector = page.locator('#home-theme')
    await themeSelector.selectOption('light')
    
    // Then switch back to dark
    await themeSelector.selectOption('dark')
    
    // Verify theme changed
    const home = page.locator('.home')
    const dataTheme = await home.getAttribute('data-theme')
    expect(dataTheme).toBe('dark')
  })
})

test.describe('Home Page - Accessibility', () => {
  test.beforeEach(async ({ page }) => {
    await navigateToHome(page)
  })

  test('page is keyboard navigable', async ({ page }) => {
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

  test('component cards are focusable', async ({ page }) => {
    const card = page.locator('.component-card').first()
    
    // Card should be clickable/focusable
    await card.focus()
  })

  test('theme selector has label', async ({ page }) => {
    const label = page.locator('label[for="home-theme"]')
    await expect(label).toBeVisible()
  })
})
