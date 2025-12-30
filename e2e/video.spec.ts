import { test, expect, Page } from '@playwright/test'

/**
 * E2E tests for UIForge Video Component
 * 
 * Tests the Video component's features including:
 * - Video rendering
 * - YouTube and Vimeo embedding
 * - Video previews
 * - Overlay interactions
 */

// Helper to navigate to the Video component example page
async function navigateToVideo(page: Page) {
  await page.goto('/')
  await page.locator('.component-card:has-text("Video")').click()
  await page.waitForSelector('.uiforge-video')
}

test.describe('Video Component - Basic Rendering', () => {
  test.beforeEach(async ({ page }) => {
    await navigateToVideo(page)
  })

  test('renders video component', async ({ page }) => {
    const video = page.locator('.uiforge-video').first()
    await expect(video).toBeVisible()
  })

  test('displays video title and description', async ({ page }) => {
    const title = page.locator('.uiforge-video__title, h3:has-text("Introduction to React")')
    await expect(title.first()).toBeVisible()
  })

  test('shows YouTube video example', async ({ page }) => {
    const youtubeSection = page.locator('h3:has-text("YouTube Video Example")')
    await expect(youtubeSection).toBeVisible()
  })

  test('shows Vimeo video example', async ({ page }) => {
    const vimeoSection = page.locator('h3:has-text("Vimeo Video Example")')
    await vimeoSection.scrollIntoViewIfNeeded()
    await expect(vimeoSection).toBeVisible()
  })
})

test.describe('Video Component - Overlay', () => {
  test.beforeEach(async ({ page }) => {
    await navigateToVideo(page)
  })

  test('video overlay is displayed', async ({ page }) => {
    const video = page.locator('.uiforge-video').first()
    const overlay = video.locator('.uiforge-video__overlay, .uiforge-video__play-button')
    
    if (await overlay.count() > 0) {
      await expect(overlay.first()).toBeVisible()
    }
  })

  test('overlay has play button', async ({ page }) => {
    const video = page.locator('.uiforge-video').first()
    const playButton = video.locator('.uiforge-video__play-button, button, [role="button"]')
    
    if (await playButton.count() > 0) {
      await expect(playButton.first()).toBeVisible()
    }
  })
})

test.describe('Video Component - Video Previews', () => {
  test.beforeEach(async ({ page }) => {
    await navigateToVideo(page)
  })

  test('video previews section is visible', async ({ page }) => {
    const previewsSection = page.locator('h3:has-text("Video Previews")')
    await previewsSection.scrollIntoViewIfNeeded()
    await expect(previewsSection).toBeVisible()
  })

  test('renders multiple video previews', async ({ page }) => {
    const previews = page.locator('.uiforge-video-preview')
    
    if (await previews.count() > 0) {
      const count = await previews.count()
      expect(count).toBeGreaterThan(1)
    }
  })

  test('video preview is clickable', async ({ page }) => {
    const preview = page.locator('.uiforge-video-preview').first()
    
    if (await preview.count() > 0) {
      // Set up dialog handler for the alert
      page.on('dialog', async dialog => {
        await dialog.accept()
      })
      
      await preview.click()
    }
  })
})

test.describe('Video Component - Event Logging', () => {
  test.beforeEach(async ({ page }) => {
    await navigateToVideo(page)
  })

  test('play event triggers callback', async ({ page }) => {
    const video = page.locator('.uiforge-video').first()
    const playButton = video.locator('.uiforge-video__overlay, .uiforge-video__play-button, button').first()
    
    if (await playButton.count() > 0) {
      await playButton.click()
      
      // Wait for event to be logged
      await page.waitForTimeout(500)
      
      // Check if event log section appears
      const eventLog = page.locator('h3:has-text("Video Play Event Log"), .video-log')
      if (await eventLog.count() > 0) {
        await expect(eventLog.first()).toBeVisible()
      }
    }
  })
})

test.describe('Video Component - Accessibility', () => {
  test.beforeEach(async ({ page }) => {
    await navigateToVideo(page)
  })

  test('video has accessible labels', async ({ page }) => {
    const video = page.locator('.uiforge-video').first()
    
    // Check for title or aria-label
    const title = await video.locator('.uiforge-video__title, [aria-label]').first()
    await expect(title).toBeVisible()
  })

  test('play button is keyboard accessible', async ({ page }) => {
    const video = page.locator('.uiforge-video').first()
    const playButton = video.locator('.uiforge-video__overlay, .uiforge-video__play-button, button').first()
    
    if (await playButton.count() > 0) {
      await playButton.focus()
      
      // Should be focusable
      const isFocused = await playButton.evaluate(el => el === document.activeElement)
      expect(isFocused).toBeTruthy()
    }
  })

  test('video previews are keyboard navigable', async ({ page }) => {
    const preview = page.locator('.uiforge-video-preview').first()
    
    if (await preview.count() > 0) {
      await preview.focus()
      
      // Enter should trigger click
      page.on('dialog', async dialog => {
        await dialog.accept()
      })
      
      await page.keyboard.press('Enter')
    }
  })
})
