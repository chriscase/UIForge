/**
 * Screenshot capture script for UIForge component documentation
 *
 * This script uses Playwright to capture isolated, focused screenshots of
 * UIForge components for README documentation. Each screenshot shows a
 * specific component in isolation without surrounding UI elements.
 *
 * Usage:
 *   npx tsx scripts/capture-screenshots.ts
 *
 * Note: Requires the dev server to be running on http://localhost:5173
 */

import { chromium, Browser, Page, Locator } from '@playwright/test'
import * as path from 'path'
import * as fs from 'fs'
import { fileURLToPath } from 'url'

// Get __dirname equivalent for ES modules
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Configuration
const BASE_URL = 'http://localhost:5173'
const VIEWPORT = { width: 1024, height: 800 }
const SCREENSHOT_DIR = path.join(__dirname, '..', 'docs', 'screenshots')

// Component screenshot configurations
// Each config specifies how to navigate and what element to capture
interface ComponentConfig {
  name: string
  cardName: string
  waitForSelector: string
  // Element selector to screenshot (if not provided, takes viewport screenshot)
  elementSelector?: string
  // For App demo page components that need scrolling
  scrollToHeading?: string
  // Capture the section element containing this heading
  captureSection?: boolean
}

const COMPONENTS: ComponentConfig[] = [
  // Dedicated example pages - capture main content area
  {
    name: 'activity-stream',
    cardName: 'Activity Stream',
    waitForSelector: '.activity-stream-example',
    elementSelector: '.activity-stream-example__demo',
  },
  {
    name: 'icon-library',
    cardName: 'Icon Library',
    waitForSelector: '.icon-library',
    elementSelector: '.icon-library-main',
  },
  {
    name: 'video',
    cardName: 'Video',
    waitForSelector: '.video-example',
    elementSelector: '.video-example__section:first-of-type',
  },
  {
    name: 'sidebar',
    cardName: 'Sidebar',
    waitForSelector: '.sidebar-example',
    elementSelector: '.sidebar-example__section:first-of-type',
  },
  // App demo page components - capture specific sections
  {
    name: 'grid',
    cardName: 'Grid',
    waitForSelector: '.app',
    scrollToHeading: 'UIForgeGrid Component',
    captureSection: true,
  },
  {
    name: 'blocks-editor',
    cardName: 'Blocks Editor',
    waitForSelector: '.app',
    scrollToHeading: 'UIForgeBlocksEditor Component',
    captureSection: true,
  },
  {
    name: 'combobox',
    cardName: 'ComboBox',
    waitForSelector: '.app',
    scrollToHeading: 'UIForgeComboBox Component',
    captureSection: true,
  },
  {
    name: 'button',
    cardName: 'Button',
    waitForSelector: '.app',
    scrollToHeading: 'Button Component',
    captureSection: true,
  },
]

async function captureElementScreenshot(
  element: Locator,
  outputPath: string
): Promise<void> {
  // Ensure element is in view
  await element.scrollIntoViewIfNeeded()
  // Wait for any animations to complete
  await new Promise((resolve) => setTimeout(resolve, 300))

  // Take screenshot of the element
  await element.screenshot({
    path: outputPath,
  })
}

async function captureScreenshots(): Promise<void> {
  console.log('📸 Starting screenshot capture...')
  console.log(`📂 Output directory: ${SCREENSHOT_DIR}`)

  // Ensure output directory exists
  if (!fs.existsSync(SCREENSHOT_DIR)) {
    fs.mkdirSync(SCREENSHOT_DIR, { recursive: true })
    console.log('Created screenshot directory')
  }

  let browser: Browser | null = null

  try {
    // Launch browser
    browser = await chromium.launch({
      headless: true,
    })

    const context = await browser.newContext({
      viewport: VIEWPORT,
      deviceScaleFactor: 1,
    })

    const page: Page = await context.newPage()

    // Set dark theme preference for consistent screenshots
    await page.addInitScript(() => {
      localStorage.setItem('uiforge-theme', 'dark')
    })

    let successCount = 0
    let failCount = 0

    // Capture the component library home page (full viewport)
    console.log(`\n📷 Capturing: home (Component Library Overview)`)
    try {
      await page.goto(BASE_URL, { waitUntil: 'networkidle' })
      await page.waitForSelector('.home', { timeout: 10000 })
      await page.waitForTimeout(500)

      const homeOutputPath = path.join(SCREENSHOT_DIR, 'home.png')
      await page.screenshot({ path: homeOutputPath, fullPage: false })
      console.log(`   ✅ Saved: ${homeOutputPath}`)
      successCount++
    } catch (error) {
      console.error(`   ❌ Failed: ${error instanceof Error ? error.message : error}`)
      failCount++
    }

    // Capture each component in isolation
    for (const component of COMPONENTS) {
      const outputPath = path.join(SCREENSHOT_DIR, `${component.name}.png`)
      console.log(`\n📷 Capturing: ${component.name}`)

      try {
        // Navigate to home first
        await page.goto(BASE_URL, { waitUntil: 'networkidle' })
        await page.waitForSelector('.home', { timeout: 10000 })
        await page.waitForTimeout(300)

        // Click the component card to navigate
        const cardSelector = `.component-card:has(h3:text("${component.cardName}"))`
        await page.click(cardSelector, { timeout: 5000 })

        // Wait for page to load
        await page.waitForSelector(component.waitForSelector, { timeout: 10000 })
        await page.waitForTimeout(500)

        // Handle App demo page components that need section capture
        if (component.scrollToHeading && component.captureSection) {
          // Find the section containing the heading
          const heading = page.getByRole('heading', { name: component.scrollToHeading, exact: false })
          await heading.scrollIntoViewIfNeeded()
          await page.waitForTimeout(300)

          // Get the parent section element
          const section = page.locator('.demo-section', { has: heading })
          await captureElementScreenshot(section, outputPath)
        } else if (component.elementSelector) {
          // Capture specific element
          const element = page.locator(component.elementSelector).first()
          await captureElementScreenshot(element, outputPath)
        } else {
          // Fallback to viewport screenshot
          await page.screenshot({ path: outputPath, fullPage: false })
        }

        console.log(`   ✅ Saved: ${outputPath}`)
        successCount++
      } catch (error) {
        console.error(`   ❌ Failed: ${error instanceof Error ? error.message : error}`)
        failCount++
      }
    }

    console.log('\n' + '='.repeat(50))
    console.log(`📊 Results: ${successCount} succeeded, ${failCount} failed`)
    console.log('='.repeat(50))

    if (failCount > 0) {
      process.exit(1)
    }
  } catch (error) {
    console.error('Fatal error:', error)
    process.exit(1)
  } finally {
    if (browser) {
      await browser.close()
    }
  }
}

// Run the script
captureScreenshots()
