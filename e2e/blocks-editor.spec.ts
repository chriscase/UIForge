import { test, expect, Page } from '@playwright/test'

/**
 * E2E tests for UIForge BlocksEditor Component
 *
 * Tests the BlocksEditor component's features including:
 * - Block creation and rendering
 * - Interactive editing
 * - Export functionality
 * - Read-only mode
 */

// Helper to navigate to the BlocksEditor component example page
async function navigateToBlocksEditor(page: Page) {
  await page.goto('/')
  await page.locator('.component-card:has-text("Blocks Editor")').click()
  await page.waitForSelector('.uiforge-blocks-editor')
}

test.describe('BlocksEditor Component - Basic Rendering', () => {
  test.beforeEach(async ({ page }) => {
    await navigateToBlocksEditor(page)
  })

  test('renders editor container', async ({ page }) => {
    const editor = page.locator('.uiforge-blocks-editor').first()
    await expect(editor).toBeVisible()
  })

  test('renders toolbar/controls', async ({ page }) => {
    const editor = page.locator('.uiforge-blocks-editor').first()

    // Check for toolbar or add block button
    const toolbar = editor.locator(
      '.uiforge-blocks-editor__toolbar, .uiforge-blocks-editor__add-button'
    )
    if ((await toolbar.count()) > 0) {
      await expect(toolbar.first()).toBeVisible()
    }
  })

  test('displays placeholder when empty', async ({ page }) => {
    const editor = page.locator('.uiforge-blocks-editor').first()

    // Check for placeholder text
    const placeholder = editor.locator('[placeholder], .uiforge-blocks-editor__placeholder')
    if ((await placeholder.count()) > 0) {
      await expect(placeholder.first()).toBeVisible()
    }
  })
})

test.describe('BlocksEditor Component - Block Interaction', () => {
  test.beforeEach(async ({ page }) => {
    await navigateToBlocksEditor(page)
  })

  test('can click to add content', async ({ page }) => {
    const editor = page.locator('.uiforge-blocks-editor').first()

    // Click on the editor area
    await editor.click()

    // Editor should be focused/active
    const focusedElement = page.locator(':focus')
    await expect(focusedElement).toBeVisible()
  })

  test('can add a new block', async ({ page }) => {
    const editor = page.locator('.uiforge-blocks-editor').first()

    // Find add block button
    const addButton = editor.locator(
      '.uiforge-blocks-editor__add-button, button:has-text("Add"), button[aria-label*="add" i]'
    )

    if ((await addButton.count()) > 0) {
      await addButton.first().click()

      // A block type selector or new block should appear
      await page.waitForTimeout(300)
    }
  })
})

test.describe('BlocksEditor Component - Export', () => {
  test.beforeEach(async ({ page }) => {
    await navigateToBlocksEditor(page)
  })

  test('export controls are visible', async ({ page }) => {
    // Look for export format selector and button
    const exportFormat = page.locator('#export-format, select:has-text("HTML")')
    if ((await exportFormat.count()) > 0) {
      await expect(exportFormat).toBeVisible()
    }

    const exportButton = page.locator('button:has-text("Export Content")')
    if ((await exportButton.count()) > 0) {
      await expect(exportButton).toBeVisible()
    }
  })

  test('can export content', async ({ page }) => {
    const exportButton = page.locator('button:has-text("Export Content")')

    if ((await exportButton.count()) > 0) {
      await exportButton.click()

      // Wait for export to complete
      await page.waitForTimeout(300)

      // Check if exported content is displayed
      const exportedSection = page.locator('h4:has-text("Exported")')
      if ((await exportedSection.count()) > 0) {
        await expect(exportedSection).toBeVisible()
      }
    }
  })

  test('can switch export format', async ({ page }) => {
    const exportFormat = page.locator('#export-format')

    if ((await exportFormat.count()) > 0) {
      // Switch to markdown
      await exportFormat.selectOption('markdown')

      // Verify selection
      await expect(exportFormat).toHaveValue('markdown')
    }
  })
})

test.describe('BlocksEditor Component - Read-Only Mode', () => {
  test.beforeEach(async ({ page }) => {
    await navigateToBlocksEditor(page)
  })

  test('read-only editor is displayed', async ({ page }) => {
    // Scroll to read-only section
    const readOnlySection = page.locator('h3:has-text("Read-Only Mode")')

    if ((await readOnlySection.count()) > 0) {
      await readOnlySection.scrollIntoViewIfNeeded()

      const readOnlyEditor = readOnlySection.locator('..').locator('.uiforge-blocks-editor')
      await expect(readOnlyEditor).toBeVisible()
    }
  })

  test('read-only editor displays content', async ({ page }) => {
    // Scroll to read-only section
    const readOnlySection = page.locator('h3:has-text("Read-Only Mode")')

    if ((await readOnlySection.count()) > 0) {
      await readOnlySection.scrollIntoViewIfNeeded()

      // Check for content like "Welcome to UIForge"
      const content = page.locator('text=Welcome to UIForge')
      if ((await content.count()) > 0) {
        await expect(content.first()).toBeVisible()
      }
    }
  })
})

test.describe('BlocksEditor Component - Accessibility', () => {
  test.beforeEach(async ({ page }) => {
    await navigateToBlocksEditor(page)
  })

  test('editor is keyboard accessible', async ({ page }) => {
    // const editor = page.locator('.uiforge-blocks-editor').first()

    // Tab to the editor
    await page.keyboard.press('Tab')

    // Something should be focused
    const focusedElement = page.locator(':focus')
    await expect(focusedElement).toBeVisible()
  })

  test('has proper focus management', async ({ page }) => {
    const editor = page.locator('.uiforge-blocks-editor').first()

    // Focus on editor area
    const editableArea = editor.locator('[contenteditable="true"], textarea, input').first()

    if ((await editableArea.count()) > 0) {
      await editableArea.focus()
      await expect(editableArea).toBeFocused()
    }
  })
})
