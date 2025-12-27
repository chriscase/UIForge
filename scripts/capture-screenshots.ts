/**
 * Screenshot capture script for UIForge component documentation
 *
 * This script uses Playwright to capture screenshots of all UIForge
 * component examples at desktop viewport (1024px) and saves them
 * to docs/screenshots/ for README documentation.
 *
 * Usage:
 *   npx tsx scripts/capture-screenshots.ts
 *
 * Note: Requires the dev server to be running on http://localhost:5173
 */

import { chromium, Browser, Page } from '@playwright/test'
import * as path from 'path'
import * as fs from 'fs'
import { fileURLToPath } from 'url'

// Get __dirname equivalent for ES modules
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Configuration
const BASE_URL = 'http://localhost:5173'
const VIEWPORT = { width: 1024, height: 768 }
const SCREENSHOT_DIR = path.join(__dirname, '..', 'docs', 'screenshots')

// Components to capture with their card names on the Home page and expected selectors
// The cardName is used to click on the component card to navigate
// scrollToText is used to scroll to a specific section on the App demo page
const COMPONENTS: {
  name: string
  cardName: string
  waitForSelector: string
  scrollToText?: string
}[] = [
  { name: 'activity-stream', cardName: 'Activity Stream', waitForSelector: '.activity-stream-example' },
  { name: 'grid', cardName: 'Grid', waitForSelector: '.app', scrollToText: 'UIForgeGrid Component' },
  { name: 'blocks-editor', cardName: 'Blocks Editor', waitForSelector: '.app', scrollToText: 'UIForgeBlocksEditor Component' },
  { name: 'combobox', cardName: 'ComboBox', waitForSelector: '.app', scrollToText: 'UIForgeComboBox Component' },
  { name: 'button', cardName: 'Button', waitForSelector: '.app', scrollToText: 'Button Component' },
  { name: 'icon-library', cardName: 'Icon Library', waitForSelector: '.icon-library' },
  { name: 'video', cardName: 'Video', waitForSelector: '.video-example' },
  { name: 'sidebar', cardName: 'Sidebar', waitForSelector: '.sidebar-example' },
  { name: 'mobile-header', cardName: 'Mobile Header', waitForSelector: '.mobile-header-example' },
]

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

    // First, capture the home page
    console.log(`\n📷 Capturing: home`)
    console.log(`   URL: ${BASE_URL}`)
    
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

    // Now capture each component by navigating via the home page cards
    for (const component of COMPONENTS) {
      const outputPath = path.join(SCREENSHOT_DIR, `${component.name}.png`)
      console.log(`\n📷 Capturing: ${component.name}`)

      try {
        // Navigate back to home first
        await page.goto(BASE_URL, { waitUntil: 'networkidle' })
        await page.waitForSelector('.home', { timeout: 10000 })
        await page.waitForTimeout(300)

        // Find and click the component card
        const cardSelector = `.component-card:has(h3:text("${component.cardName}"))`
        await page.click(cardSelector, { timeout: 5000 })

        // Wait for navigation and content to load
        await page.waitForSelector(component.waitForSelector, { timeout: 10000 })
        await page.waitForTimeout(500)

        // If we need to scroll to a specific section (for App demo page)
        if (component.scrollToText) {
          const sectionHeading = page.getByRole('heading', { name: component.scrollToText })
          await sectionHeading.scrollIntoViewIfNeeded()
          await page.waitForTimeout(300)
        }

        // Take the screenshot
        await page.screenshot({
          path: outputPath,
          fullPage: false,
        })

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
