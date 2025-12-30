import { test, expect, Page } from '@playwright/test'

/**
 * E2E Visual Regression Tests for SongCard Example
 * 
 * Tests the SongCard example page demonstrating how MediaCard can be composed
 * into domain-specific components. Includes visual snapshots for:
 * - Different card variants (default, compact, featured)
 * - Light and dark themes
 * - With and without NexaLive theme
 * - Loading states (MediaListSkeleton)
 * - Responsive layouts
 */

// Helper to navigate to SongCard example page
async function navigateToSongCard(page: Page) {
  await page.goto('/')
  // Navigate using the component card
  await page.locator('.component-card:has-text("MediaCard & SongCard")').click()
  await page.waitForSelector('.song-card-example')
}

test.describe('SongCard Example - Page Structure', () => {
  test.beforeEach(async ({ page }) => {
    await navigateToSongCard(page)
  })

  test('renders example page with all sections', async ({ page }) => {
    // Verify main sections are present
    await expect(page.locator('.song-card-example')).toBeVisible()
    await expect(page.locator('h1:has-text("SongCard Example")')).toBeVisible()
    
    // Verify section headings
    await expect(page.locator('h2:has-text("MediaListSkeleton - Loading State")')).toBeVisible()
    await expect(page.locator('h2:has-text("Default Variant")')).toBeVisible()
    await expect(page.locator('h2:has-text("Compact Variant")')).toBeVisible()
    await expect(page.locator('h2:has-text("Featured Variant")')).toBeVisible()
    await expect(page.locator('h2:has-text("Implementation Details")')).toBeVisible()
    await expect(page.locator('h2:has-text("MediaCard Features")')).toBeVisible()
    await expect(page.locator('h2:has-text("MediaListSkeleton Features")')).toBeVisible()
  })

  test('has back button navigation', async ({ page }) => {
    const backButton = page.locator('button:has-text("Back to Home")')
    await expect(backButton).toBeVisible()
    await expect(backButton).toBeEnabled()
  })

  test('has NexaLive theme toggle', async ({ page }) => {
    const checkbox = page.locator('input[type="checkbox"]').first()
    await expect(checkbox).toBeVisible()
    
    // Verify it's not checked by default
    await expect(checkbox).not.toBeChecked()
  })
})

test.describe('SongCard Example - Visual Regression', () => {
  test.beforeEach(async ({ page }) => {
    await navigateToSongCard(page)
    // Wait for images to load
    await page.waitForLoadState('networkidle')
  })

  test('default variant section - light theme', async ({ page }) => {
    // Ensure light theme is active (check theme context)
    const themeSelect = page.locator('#home-theme, select').first()
    if (await themeSelect.count() > 0) {
      await themeSelect.selectOption('light')
      await page.waitForTimeout(300) // Wait for theme transition
    }

    const section = page.locator('h2:has-text("Default Variant")').locator('..')
    await expect(section).toBeVisible()
    
    // Take screenshot of the section
    await expect(section).toHaveScreenshot('song-card-default-variant-light.png', {
      maxDiffPixels: 100,
    })
  })

  test('default variant section - dark theme', async ({ page }) => {
    // Check if we're in dark theme (default)
    const section = page.locator('h2:has-text("Default Variant")').locator('..')
    await expect(section).toBeVisible()
    
    // Take screenshot of the section
    await expect(section).toHaveScreenshot('song-card-default-variant-dark.png', {
      maxDiffPixels: 100,
    })
  })

  test('compact variant section', async ({ page }) => {
    const section = page.locator('h2:has-text("Compact Variant")').locator('..')
    await expect(section).toBeVisible()
    
    await expect(section).toHaveScreenshot('song-card-compact-variant.png', {
      maxDiffPixels: 100,
    })
  })

  test('featured variant section', async ({ page }) => {
    const section = page.locator('h2:has-text("Featured Variant")').locator('..')
    await expect(section).toBeVisible()
    
    await expect(section).toHaveScreenshot('song-card-featured-variant.png', {
      maxDiffPixels: 100,
    })
  })

  test('loading state with MediaListSkeleton', async ({ page }) => {
    // Click button to show loading state
    const showLoadingButton = page.locator('button:has-text("Show Loading State")')
    await showLoadingButton.click()
    
    // Wait for skeleton to appear
    await page.waitForSelector('.uiforge-media-list-skeleton')
    
    const section = page.locator('h2:has-text("MediaListSkeleton - Loading State")').locator('..')
    await expect(section).toBeVisible()
    
    await expect(section).toHaveScreenshot('song-card-loading-state.png', {
      maxDiffPixels: 100,
    })
  })

  test('with NexaLive theme enabled', async ({ page }) => {
    // Enable NexaLive theme
    const checkbox = page.locator('input[type="checkbox"]').first()
    await checkbox.check()
    
    // Wait for theme to load
    await page.waitForTimeout(500)
    
    // Take screenshot of default variant with NexaLive theme
    const section = page.locator('h2:has-text("Default Variant")').locator('..')
    await expect(section).toBeVisible()
    
    await expect(section).toHaveScreenshot('song-card-nexalive-theme.png', {
      maxDiffPixels: 100,
    })
  })

  test('full page - dark theme', async ({ page }) => {
    // Scroll to top
    await page.evaluate(() => window.scrollTo(0, 0))
    
    // Take full page screenshot
    await expect(page).toHaveScreenshot('song-card-example-full-page-dark.png', {
      fullPage: true,
      maxDiffPixels: 500,
    })
  })
})

test.describe('SongCard Example - Interactivity', () => {
  test.beforeEach(async ({ page }) => {
    await navigateToSongCard(page)
  })

  test('Play button triggers notification', async ({ page }) => {
    // Find and click a Play button
    const playButton = page.locator('button:has-text("Play")').first()
    await playButton.click()
    
    // Verify notification appears
    await expect(page.locator('.notification')).toBeVisible()
    await expect(page.locator('.notification')).toContainText('Playing:')
    
    // Verify playing indicator appears
    await expect(page.locator('.playing-indicator')).toBeVisible()
    await expect(page.locator('.playing-indicator')).toContainText('Now playing:')
  })

  test('Add to Playlist button triggers notification', async ({ page }) => {
    // Find and click an Add to Playlist button
    const playlistButton = page.locator('button:has-text("Playlist")').first()
    await playlistButton.click()
    
    // Verify notification appears
    await expect(page.locator('.notification')).toBeVisible()
    await expect(page.locator('.notification')).toContainText('Added to playlist:')
  })

  test('Info button triggers notification', async ({ page }) => {
    // Find and click an Info button
    const infoButton = page.locator('button:has-text("Info")').first()
    await infoButton.click()
    
    // Verify notification appears
    await expect(page.locator('.notification')).toBeVisible()
    await expect(page.locator('.notification')).toContainText('Showing info for:')
  })

  test('NexaLive theme toggle applies theme', async ({ page }) => {
    const checkbox = page.locator('input[type="checkbox"]').first()
    
    // Check that nexalive theme class is not present initially
    const bodyClass = await page.evaluate(() => document.body.className)
    expect(bodyClass).not.toContain('nexalive-theme')
    
    // Enable theme
    await checkbox.check()
    await page.waitForTimeout(300)
    
    // Verify theme class is applied
    const bodyClassAfter = await page.evaluate(() => document.body.className)
    expect(bodyClassAfter).toContain('nexalive-theme')
    
    // Disable theme
    await checkbox.uncheck()
    await page.waitForTimeout(300)
    
    // Verify theme class is removed
    const bodyClassFinal = await page.evaluate(() => document.body.className)
    expect(bodyClassFinal).not.toContain('nexalive-theme')
  })

  test('MediaListSkeleton toggle works', async ({ page }) => {
    // Use more specific selector
    const toggleButton = page.locator('section').filter({ hasText: 'MediaListSkeleton - Loading State' }).locator('button').first()
    
    // Initially should not show skeleton in that section
    const skeletonSection = page.locator('section').filter({ hasText: 'MediaListSkeleton - Loading State' })
    await expect(skeletonSection.locator('.uiforge-media-list-skeleton')).not.toBeVisible()
    
    // Click to show skeleton
    await toggleButton.click()
    await expect(skeletonSection.locator('.uiforge-media-list-skeleton')).toBeVisible()
    
    // Button text should change
    await expect(toggleButton).toHaveText(/Hide Loading State/)
    
    // Click to hide skeleton
    await toggleButton.click()
    await expect(skeletonSection.locator('.uiforge-media-list-skeleton')).not.toBeVisible()
    await expect(toggleButton).toHaveText(/Show Loading State/)
  })
})

test.describe('SongCard Example - Accessibility', () => {
  test.beforeEach(async ({ page }) => {
    await navigateToSongCard(page)
  })

  test('all buttons have accessible labels', async ({ page }) => {
    const buttons = page.locator('button')
    const count = await buttons.count()
    
    expect(count).toBeGreaterThan(0)
    
    for (let i = 0; i < count; i++) {
      const button = buttons.nth(i)
      const ariaLabel = await button.getAttribute('aria-label')
      const text = await button.textContent()
      
      // Button should have either aria-label or visible text
      expect(ariaLabel || text?.trim()).toBeTruthy()
    }
  })

  test('song cards have proper ARIA labels', async ({ page }) => {
    // MediaCard components should have aria-label
    const cards = page.locator('.uiforge-media-card')
    const count = await cards.count()
    
    expect(count).toBeGreaterThan(0)
    
    // Check first few cards
    for (let i = 0; i < Math.min(count, 3); i++) {
      const card = cards.nth(i)
      const ariaLabel = await card.getAttribute('aria-label')
      expect(ariaLabel).toBeTruthy()
      expect(ariaLabel).toContain('by')
    }
  })

  test('keyboard navigation works', async ({ page }) => {
    // Tab through interactive elements
    await page.keyboard.press('Tab')
    
    let focusedCount = 0
    for (let i = 0; i < 20; i++) {
      const focused = page.locator(':focus')
      const tagName = await focused.evaluate(el => el.tagName.toLowerCase()).catch(() => '')
      if (['button', 'input', 'a'].includes(tagName)) {
        focusedCount++
      }
      await page.keyboard.press('Tab')
    }
    
    expect(focusedCount).toBeGreaterThan(0)
  })
})

test.describe('SongCard Example - Responsive Layout', () => {
  test('renders properly on mobile viewport', async ({ page }) => {
    await navigateToSongCard(page)
    
    const viewport = page.viewportSize()
    if (!viewport || viewport.width >= 768) {
      test.skip()
      return
    }
    
    // Verify cards stack vertically on mobile
    const grid = page.locator('.song-card-grid').first()
    await expect(grid).toBeVisible()
    
    // Take screenshot for mobile
    await expect(page).toHaveScreenshot('song-card-example-mobile.png', {
      fullPage: true,
      maxDiffPixels: 500,
    })
  })

  test('renders properly on tablet viewport', async ({ page }) => {
    await navigateToSongCard(page)
    
    const viewport = page.viewportSize()
    if (!viewport || viewport.width < 768 || viewport.width >= 1024) {
      test.skip()
      return
    }
    
    // Take screenshot for tablet
    await expect(page).toHaveScreenshot('song-card-example-tablet.png', {
      fullPage: true,
      maxDiffPixels: 500,
    })
  })

  test('renders properly on desktop viewport', async ({ page }) => {
    await navigateToSongCard(page)
    
    const viewport = page.viewportSize()
    if (!viewport || viewport.width < 1024) {
      test.skip()
      return
    }
    
    // Take screenshot for desktop
    await expect(page).toHaveScreenshot('song-card-example-desktop.png', {
      fullPage: true,
      maxDiffPixels: 500,
    })
  })
})

test.describe('SongCard Example - MediaCard Composition', () => {
  test.beforeEach(async ({ page }) => {
    await navigateToSongCard(page)
  })

  test('displays music-specific metadata', async ({ page }) => {
    // Check that music metadata is displayed (album, year, duration, genre)
    const firstCard = page.locator('.song-card').first()
    await expect(firstCard).toBeVisible()
    
    // Check for metadata presence (using text content)
    const cardText = await firstCard.textContent()
    expect(cardText).toBeTruthy()
    
    // Should contain artist name in subtitle
    await expect(firstCard.locator('.uiforge-media-card__subtitle')).toBeVisible()
  })

  test('shows action buttons for each card', async ({ page }) => {
    const firstCard = page.locator('.song-card').first()
    await expect(firstCard).toBeVisible()
    
    // Check for action buttons
    const actions = firstCard.locator('.song-card-actions')
    await expect(actions).toBeVisible()
    
    // Should have Play button at minimum (use first() to handle multiple matches)
    await expect(actions.locator('button').filter({ hasText: 'Play' }).first()).toBeVisible()
  })

  test('displays album artwork images', async ({ page }) => {
    const firstCard = page.locator('.song-card').first()
    await expect(firstCard).toBeVisible()
    
    // Check for media image
    const img = firstCard.locator('.uiforge-media-card__media img')
    await expect(img).toBeVisible()
    
    // Image should have loaded
    const src = await img.getAttribute('src')
    expect(src).toBeTruthy()
  })
})
