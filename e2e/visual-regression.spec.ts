import { test, expect, Page } from '@playwright/test'

/**
 * Visual Regression Tests for UIForge Components
 *
 * Uses Playwright's built-in toHaveScreenshot() for screenshot comparison.
 * Baselines are generated for Desktop (1024px) viewport.
 *
 * Run with --update-snapshots to regenerate baselines:
 *   npx playwright test e2e/visual-regression.spec.ts --project="Desktop (1024px)" --update-snapshots
 */

// Navigation helpers - mirrors patterns from existing E2E tests
async function navigateViaCard(page: Page, cardText: string, waitSelector: string) {
  await page.goto('/')
  await page.locator(`.component-card:has-text("${cardText}")`).click()
  await page.waitForSelector(waitSelector)
  await page.waitForLoadState('networkidle')
}

async function navigateToButton(page: Page) {
  await navigateViaCard(page, 'Button', '.demo-section')
}

async function navigateToGrid(page: Page) {
  await navigateViaCard(page, 'Grid', '.uiforge-grid')
}

async function navigateToComboBox(page: Page) {
  await navigateViaCard(page, 'ComboBox', '.uiforge-combobox')
}

async function navigateToActivityStream(page: Page) {
  await navigateViaCard(page, 'Activity Stream', '.activity-stream-example')
  // Wait for the stream component to render inside the example page
  await page.waitForSelector('.activity-stream-example__stream-container')
}

async function navigateToBlocksEditor(page: Page) {
  await navigateViaCard(page, 'Blocks Editor', '.demo-section')
}

async function navigateToVideo(page: Page) {
  await navigateViaCard(page, 'Video', '.video-example')
}

async function navigateToSidebar(page: Page) {
  await navigateViaCard(page, 'Sidebar', '.sidebar-example')
}

test.describe('Visual Regression', () => {
  test.describe('Button', () => {
    test('button variants', async ({ page }) => {
      await navigateToButton(page)

      const section = page.locator('h3:has-text("Variants")').locator('..')
      await expect(section).toBeVisible()

      await expect(section).toHaveScreenshot('button-variants.png', {
        maxDiffPixelRatio: 0.01,
      })
    })

    test('button sizes', async ({ page }) => {
      await navigateToButton(page)

      const section = page.locator('h3:has-text("Sizes")').locator('..')
      await expect(section).toBeVisible()

      await expect(section).toHaveScreenshot('button-sizes.png', {
        maxDiffPixelRatio: 0.01,
      })
    })

    test('button states', async ({ page }) => {
      await navigateToButton(page)

      const section = page.locator('h3:has-text("States")').locator('..')
      await expect(section).toBeVisible()

      await expect(section).toHaveScreenshot('button-states.png', {
        maxDiffPixelRatio: 0.01,
      })
    })
  })

  test.describe('Grid', () => {
    test('interactive grid', async ({ page }) => {
      await navigateToGrid(page)

      const section = page.locator('h3:has-text("Interactive Grid Demo")').locator('..')
      await expect(section).toBeVisible()

      await expect(section).toHaveScreenshot('grid-interactive.png', {
        maxDiffPixelRatio: 0.01,
      })
    })

    test('simple grid', async ({ page }) => {
      await navigateToGrid(page)

      const section = page.locator('h3:has-text("Simple Grid (No Features)")').locator('..')
      await expect(section).toBeVisible()

      await expect(section).toHaveScreenshot('grid-simple.png', {
        maxDiffPixelRatio: 0.01,
      })
    })

    test('empty state grid', async ({ page }) => {
      await navigateToGrid(page)

      // Scope to the Grid section to avoid matching ActivityStream empty state
      const gridSection = page.locator('section.demo-section:has(h2:has-text("UIForgeGrid Component"))')
      const emptyGroup = gridSection.locator('h3:has-text("Empty State")').locator('..')
      await emptyGroup.scrollIntoViewIfNeeded()
      await expect(emptyGroup).toBeVisible()

      await expect(emptyGroup).toHaveScreenshot('grid-empty.png', {
        maxDiffPixelRatio: 0.01,
      })
    })
  })

  test.describe('ComboBox', () => {
    test('simple select closed', async ({ page }) => {
      await navigateToComboBox(page)

      const section = page.locator('h3:has-text("Simple Select with Icons")').locator('..')
      await expect(section).toBeVisible()

      await expect(section).toHaveScreenshot('combobox-simple-closed.png', {
        maxDiffPixelRatio: 0.01,
      })
    })

    test('hierarchical options closed', async ({ page }) => {
      await navigateToComboBox(page)

      const section = page.locator('h3:has-text("Hierarchical Options")').locator('..')
      await section.scrollIntoViewIfNeeded()
      await expect(section).toBeVisible()

      await expect(section).toHaveScreenshot('combobox-hierarchical-closed.png', {
        maxDiffPixelRatio: 0.01,
      })
    })

    test('disabled state', async ({ page }) => {
      await navigateToComboBox(page)

      const section = page.locator('h3:has-text("Disabled State")').locator('..')
      await section.scrollIntoViewIfNeeded()
      await expect(section).toBeVisible()

      await expect(section).toHaveScreenshot('combobox-disabled.png', {
        maxDiffPixelRatio: 0.01,
      })
    })
  })

  test.describe('ActivityStream', () => {
    test('activity stream with events', async ({ page }) => {
      await navigateToActivityStream(page)

      const streamContainer = page.locator('.activity-stream-example__stream-container')
      await expect(streamContainer).toBeVisible()

      await expect(streamContainer).toHaveScreenshot('activity-stream-with-events.png', {
        maxDiffPixelRatio: 0.01,
      })
    })

    test('activity stream controls', async ({ page }) => {
      await navigateToActivityStream(page)

      const controls = page.locator('.activity-stream-example__controls')
      await expect(controls).toBeVisible()

      await expect(controls).toHaveScreenshot('activity-stream-controls.png', {
        maxDiffPixelRatio: 0.01,
      })
    })
  })

  test.describe('BlocksEditor', () => {
    test('read-only editor with content', async ({ page }) => {
      await navigateToBlocksEditor(page)

      // Target the read-only editor section which has pre-populated content
      const heading = page.locator('h3:has-text("Read-Only Mode")')
      await heading.scrollIntoViewIfNeeded()
      const section = heading.locator('..')
      await expect(section).toBeVisible()

      await expect(section).toHaveScreenshot('blocks-editor-readonly.png', {
        maxDiffPixelRatio: 0.01,
      })
    })

    test('interactive editor empty state', async ({ page }) => {
      await navigateToBlocksEditor(page)

      const heading = page.locator('h3:has-text("Interactive Editor")')
      const section = heading.locator('..')
      await expect(section).toBeVisible()

      await expect(section).toHaveScreenshot('blocks-editor-empty.png', {
        maxDiffPixelRatio: 0.01,
      })
    })
  })

  test.describe('Video', () => {
    test('video preview list', async ({ page }) => {
      await navigateToVideo(page)

      // The Video example page uses h2 headings inside sections
      const section = page.locator('.video-example__section').first()
      await expect(section).toBeVisible()

      await expect(section).toHaveScreenshot('video-preview-list.png', {
        maxDiffPixelRatio: 0.01,
      })
    })

    test('youtube video embed', async ({ page }) => {
      await navigateToVideo(page)

      // Target the "URL-Based: YouTube Video" section
      const section = page.locator('section.video-example__section:has(h2:has-text("URL-Based: YouTube Video"))')
      await section.scrollIntoViewIfNeeded()
      await expect(section).toBeVisible()

      await expect(section).toHaveScreenshot('video-youtube-embed.png', {
        maxDiffPixelRatio: 0.01,
      })
    })
  })

  test.describe('Sidebar', () => {
    test('static sidebar expanded', async ({ page }) => {
      await navigateToSidebar(page)

      // Use the demo container within the Static Variant section (not Collapsible)
      const staticDemo = page.locator('.sidebar-example__demo--static').first()
      await expect(staticDemo).toBeVisible()

      await expect(staticDemo).toHaveScreenshot('sidebar-static-expanded.png', {
        maxDiffPixelRatio: 0.01,
      })
    })

    test('drawer variant section', async ({ page }) => {
      await navigateToSidebar(page)

      // Target the Drawer Variant section specifically
      const section = page.locator('section.sidebar-example__section').filter({
        has: page.locator('h3:has-text("Drawer Variant")'),
      })
      await section.scrollIntoViewIfNeeded()
      await expect(section).toBeVisible()

      await expect(section).toHaveScreenshot('sidebar-drawer-section.png', {
        maxDiffPixelRatio: 0.01,
      })
    })
  })
})
