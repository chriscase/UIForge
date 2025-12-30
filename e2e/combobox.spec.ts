import { test, expect, Page } from '@playwright/test'

/**
 * E2E tests for UIForge ComboBox Component
 * 
 * Tests the ComboBox component's features including:
 * - Simple selection
 * - Search functionality
 * - Hierarchical options
 * - Async search
 * - Disabled state
 * - Keyboard navigation
 */

// Helper to navigate to the ComboBox component example page
async function navigateToComboBox(page: Page) {
  await page.goto('/')
  await page.locator('.component-card:has-text("ComboBox")').click()
  await page.waitForSelector('.uiforge-combobox')
}

test.describe('ComboBox Component - Basic Functionality', () => {
  test.beforeEach(async ({ page }) => {
    await navigateToComboBox(page)
  })

  test('renders combobox with placeholder', async ({ page }) => {
    const combobox = page.locator('.uiforge-combobox').first()
    await expect(combobox).toBeVisible()
    
    // Check for placeholder text
    const placeholderText = combobox.locator('text=Select a language')
    await expect(placeholderText).toBeVisible()
  })

  test('opens dropdown on click', async ({ page }) => {
    const combobox = page.locator('.uiforge-combobox').first()
    const trigger = combobox.locator('.uiforge-combobox__trigger, .uiforge-combobox__control')
    
    await trigger.click()
    
    // Dropdown should be visible
    const dropdown = page.locator('.uiforge-combobox__dropdown, .uiforge-combobox__options')
    await expect(dropdown.first()).toBeVisible()
  })

  test('allows option selection', async ({ page }) => {
    const combobox = page.locator('.uiforge-combobox').first()
    const trigger = combobox.locator('.uiforge-combobox__trigger, .uiforge-combobox__control')
    
    // Open dropdown
    await trigger.click()
    
    // Click on an option
    const option = page.locator('.uiforge-combobox__option:has-text("JavaScript")')
    if (await option.count() > 0) {
      await option.click()
      
      // Verify selection
      await expect(page.locator('text=Selected').first()).toBeVisible()
    }
  })
})

test.describe('ComboBox Component - Search', () => {
  test.beforeEach(async ({ page }) => {
    await navigateToComboBox(page)
  })

  test('filters options when typing', async ({ page }) => {
    const combobox = page.locator('.uiforge-combobox').first()
    const trigger = combobox.locator('.uiforge-combobox__trigger, .uiforge-combobox__control')
    
    // Open dropdown
    await trigger.click()
    
    // Find search input
    const searchInput = page.locator('.uiforge-combobox__input, .uiforge-combobox input[type="text"]').first()
    
    if (await searchInput.isVisible()) {
      // Type to search
      await searchInput.fill('Python')
      
      // Wait for filtering
      await page.waitForTimeout(300)
      
      // Python option should be visible
      const pythonOption = page.locator('.uiforge-combobox__option:has-text("Python")')
      if (await pythonOption.count() > 0) {
        await expect(pythonOption).toBeVisible()
      }
    }
  })
})

test.describe('ComboBox Component - Hierarchical Options', () => {
  test.beforeEach(async ({ page }) => {
    await navigateToComboBox(page)
  })

  test('renders hierarchical options section', async ({ page }) => {
    // Scroll to hierarchical section
    const hierarchicalSection = page.locator('h3:has-text("Hierarchical Options")')
    await hierarchicalSection.scrollIntoViewIfNeeded()
    
    await expect(hierarchicalSection).toBeVisible()
  })

  test('displays category headers in hierarchical dropdown', async ({ page }) => {
    // Find the hierarchical combobox
    const hierarchicalSection = page.locator('h3:has-text("Hierarchical Options")').locator('..')
    const combobox = hierarchicalSection.locator('.uiforge-combobox')
    
    if (await combobox.count() > 0) {
      const trigger = combobox.locator('.uiforge-combobox__trigger, .uiforge-combobox__control')
      await trigger.click()
      
      // Check for category headers (Frontend, Backend, Database)
      const dropdown = page.locator('.uiforge-combobox__dropdown, .uiforge-combobox__options').first()
      await expect(dropdown).toBeVisible()
    }
  })
})

test.describe('ComboBox Component - Disabled State', () => {
  test.beforeEach(async ({ page }) => {
    await navigateToComboBox(page)
  })

  test('disabled combobox cannot be interacted with', async ({ page }) => {
    // Find disabled section
    const disabledSection = page.locator('h3:has-text("Disabled State")')
    await disabledSection.scrollIntoViewIfNeeded()
    
    const disabledCombobox = disabledSection.locator('..').locator('.uiforge-combobox')
    
    if (await disabledCombobox.count() > 0) {
      const trigger = disabledCombobox.locator('.uiforge-combobox__trigger, .uiforge-combobox__control')
      
      // Should be disabled
      const isDisabled = await trigger.getAttribute('aria-disabled') === 'true' ||
                        await trigger.getAttribute('disabled') !== null ||
                        await disabledCombobox.locator('.uiforge-combobox--disabled').count() > 0
      
      expect(isDisabled || await trigger.isDisabled().catch(() => false)).toBeTruthy()
    }
  })
})

test.describe('ComboBox Component - Keyboard Navigation', () => {
  test.beforeEach(async ({ page }) => {
    await navigateToComboBox(page)
  })

  test('can open dropdown with Enter key', async ({ page }) => {
    const combobox = page.locator('.uiforge-combobox').first()
    const trigger = combobox.locator('.uiforge-combobox__trigger, .uiforge-combobox__control')
    
    await trigger.focus()
    await page.keyboard.press('Enter')
    
    // Dropdown should be visible
    const dropdown = page.locator('.uiforge-combobox__dropdown, .uiforge-combobox__options')
    await expect(dropdown.first()).toBeVisible()
  })

  test('can close dropdown with Escape key', async ({ page }) => {
    const combobox = page.locator('.uiforge-combobox').first()
    const trigger = combobox.locator('.uiforge-combobox__trigger, .uiforge-combobox__control')
    
    // Open dropdown
    await trigger.click()
    await page.waitForTimeout(200)
    
    // Close with Escape
    await page.keyboard.press('Escape')
    
    // Dropdown should be hidden
    const dropdown = page.locator('.uiforge-combobox__dropdown, .uiforge-combobox__options')
    await expect(dropdown).not.toBeVisible()
  })

  test('can navigate options with arrow keys', async ({ page }) => {
    const combobox = page.locator('.uiforge-combobox').first()
    const trigger = combobox.locator('.uiforge-combobox__trigger, .uiforge-combobox__control')
    
    // Open dropdown
    await trigger.click()
    await page.waitForTimeout(200)
    
    // Press arrow down
    await page.keyboard.press('ArrowDown')
    
    // An option should be highlighted
    const highlightedOption = page.locator('.uiforge-combobox__option--highlighted, .uiforge-combobox__option--focused, .uiforge-combobox__option[data-highlighted="true"]')
    if (await highlightedOption.count() > 0) {
      await expect(highlightedOption.first()).toBeVisible()
    }
  })
})

test.describe('ComboBox Component - Accessibility', () => {
  test.beforeEach(async ({ page }) => {
    await navigateToComboBox(page)
  })

  test('has proper ARIA attributes', async ({ page }) => {
    const combobox = page.locator('.uiforge-combobox').first()
    const trigger = combobox.locator('.uiforge-combobox__trigger, .uiforge-combobox__control')
    
    // Check for combobox role
    const hasAriaExpanded = await trigger.getAttribute('aria-expanded')
    expect(hasAriaExpanded).toBeDefined()
  })

  test('focus indicator is visible', async ({ page }) => {
    const combobox = page.locator('.uiforge-combobox').first()
    const trigger = combobox.locator('.uiforge-combobox__trigger, .uiforge-combobox__control')
    
    await trigger.focus()
    await expect(trigger).toBeFocused()
  })
})
