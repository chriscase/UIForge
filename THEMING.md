# UIForge Theming Guide

This guide explains how to theme and customize UIForge components to match your application's design system.

## Overview

UIForge components use CSS variables (custom properties) for theming, making it easy to customize colors, spacing, and other visual properties while maintaining consistency across all components.

## Global Theme Support

### Dark Mode Implementation

All UIForge components support light and dark themes out of the box. The theme is controlled through component props or CSS classes.

#### Component-Level Theming

Most UIForge components accept a `theme` prop:

```tsx
import { UIForgeActivityStreamEnhanced } from '@appforgeapps/uiforge'

// Light theme (default)
<UIForgeActivityStreamEnhanced
  events={events}
  theme="light"
/>

// Dark theme
<UIForgeActivityStreamEnhanced
  events={events}
  theme="dark"
/>
```

#### CSS Class-Based Theming

You can also apply dark mode globally using CSS classes:

```css
/* Apply dark theme to entire app */
.dark-theme {
  background-color: #0d1117;
  color: #e6edf3;
}
```

## CSS Variable Reference

### ActivityStream Component Variables

The ActivityStream component uses the following CSS variables:

#### Light Theme (Default)

```css
.activity-stream,
.activity-stream-enhanced {
  --activity-stream-bg: #ffffff;
  --activity-stream-text: #24292f;
  --activity-stream-text-secondary: #57606a;
  --activity-stream-border: #d0d7de;
  --activity-stream-hover-bg: #f6f8fa;
  --activity-stream-icon-bg: #f6f8fa;
  --activity-stream-icon-color: #57606a;
  --activity-stream-timeline-color: #d0d7de;
  --activity-stream-link-color: #0969da;
  --activity-stream-shadow: rgba(0, 0, 0, 0.1);
  --activity-stream-load-more-bg: #0969da;
  --activity-stream-load-more-text: #ffffff;
  --activity-stream-load-more-hover: #0550ae;
}
```

#### Dark Theme

```css
.activity-stream--dark,
.activity-stream-enhanced--dark {
  --activity-stream-bg: #0d1117;
  --activity-stream-text: #e6edf3;
  --activity-stream-text-secondary: #8b949e;
  --activity-stream-border: #30363d;
  --activity-stream-hover-bg: #161b22;
  --activity-stream-icon-bg: #161b22;
  --activity-stream-icon-color: #8b949e;
  --activity-stream-timeline-color: #30363d;
  --activity-stream-link-color: #2f81f7;
  --activity-stream-shadow: rgba(0, 0, 0, 0.3);
  --activity-stream-load-more-bg: #2f81f7;
  --activity-stream-load-more-text: #ffffff;
  --activity-stream-load-more-hover: #1f6feb;
}
```

## Spacing & Density Scale

The ActivityStream component supports a density scale that allows you to quickly make the stream more compact or more spacious by changing a single variable.

Key variables:

- `--activity-stream-scale` (number) — multiplies spacing and icon sizes across the component. Defaults to `1`.
- `.activity-stream--compact` — utility class that sets `--activity-stream-scale: 0.8`.
- `.activity-stream--spacious` — utility class with larger base spacings.

You can set the scale using a CSS class, inline style, or via a wrapping element. This will hot-reload in typical dev servers that support CSS hot module replacement.

Examples:

Make the stream more compact using the compact utility class:

```html
<div class="activity-stream activity-stream--compact">
  <UIForgeActivityStreamEnhanced events="{events}" />
</div>
```

Or control it via CSS custom property directly (inline or a stylesheet):

```html
<div style="--activity-stream-scale: 0.75">
  <UIForgeActivityStreamEnhanced events="{events}" />
</div>
```

You can also set `scale` directly on the React component (convenience prop added):

```tsx
<UIForgeActivityStreamEnhanced events={events} scale={0.85} />
```

If your dev workspace supports hot reload (Vite / CRA / Next.js), updating the CSS variable should reflect the density change immediately without restarting the server.

Tips:

- Use `--activity-stream-scale` values in the range `0.6` to `1.25` for sensible density changes (subjective; tune for your app).
- If you need a different default density, set `--activity-stream-scale` at a higher level (e.g., `:root` or a theme class) so all ActivityStream instances inherit it.

## Custom Theming

### Creating a Custom Theme

You can create your own theme by overriding CSS variables:

```css
/* Custom brand theme */
.activity-stream-enhanced--custom {
  --activity-stream-bg: #f0f4f8;
  --activity-stream-text: #1a202c;
  --activity-stream-border: #cbd5e0;
  --activity-stream-link-color: #3182ce;
  --activity-stream-load-more-bg: #3182ce;
  --activity-stream-icon-color: #4a5568;
}
```

```tsx
<div className="activity-stream-enhanced--custom">
  <UIForgeActivityStreamEnhanced events={events} className="activity-stream-enhanced--custom" />
</div>
```

### Inline Style Overrides

For quick customizations, you can override variables inline:

```tsx
<div
  style={
    {
      '--activity-stream-link-color': '#ff6b6b',
      '--activity-stream-load-more-bg': '#ff6b6b',
    } as React.CSSProperties
  }
>
  <UIForgeActivityStreamEnhanced events={events} />
</div>
```

## Component-Specific Theming

### Button Component

```css
/* Custom button theme */
.uiforge-button--primary {
  background-color: #your-brand-color;
}

.uiforge-button--primary:hover:not(:disabled) {
  background-color: #your-brand-color-dark;
}
```

### Grid Component

The Grid component follows similar patterns. Check the source CSS files for available variables.

### ComboBox Component

ComboBox styling can be customized through CSS classes targeting `.uiforge-combobox` elements.

## Best Practices

### 1. Use CSS Variables for Consistency

Always use CSS variables for theming rather than hard-coded colors:

```css
/* Good */
.my-component {
  color: var(--activity-stream-text);
  border-color: var(--activity-stream-border);
}

/* Avoid */
.my-component {
  color: #24292f;
  border-color: #d0d7de;
}
```

### 2. Maintain Contrast Ratios

Ensure your custom themes meet WCAG accessibility guidelines:

- Normal text: 4.5:1 contrast ratio
- Large text: 3:1 contrast ratio
- UI components: 3:1 contrast ratio

### 3. Test Both Themes

Always test your custom themes in both light and dark modes to ensure good visibility and user experience.

### 4. Provide Theme Toggle

Give users control over theme preference:

```tsx
import { useState } from 'react'

function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light')

  return (
    <div className={theme === 'dark' ? 'dark-theme' : ''}>
      <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>Toggle Theme</button>
      <UIForgeActivityStreamEnhanced events={events} theme={theme} />
    </div>
  )
}
```

### 5. Persist User Preference

Store theme preference in localStorage:

```tsx
const [theme, setTheme] = useState<'light' | 'dark'>(() => {
  const saved = localStorage.getItem('theme')
  return (saved as 'light' | 'dark') || 'light'
})

useEffect(() => {
  localStorage.setItem('theme', theme)
}, [theme])
```

## System Preference Detection

Detect and respect user's system theme preference:

```tsx
import { useEffect, useState } from 'react'

function useSystemTheme() {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark'
    }
    return 'light'
  })

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const handleChange = (e: MediaQueryListEvent) => {
      setTheme(e.matches ? 'dark' : 'light')
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  return theme
}

// Usage
function App() {
  const systemTheme = useSystemTheme()
  const [theme, setTheme] = useState(systemTheme)

  return <UIForgeActivityStreamEnhanced events={events} theme={theme} />
}
```

## Advanced Customization

### Custom Icon Sets

Replace default icons with your own:

```tsx
const customIcons = {
  commit: <YourCustomCommitIcon />,
  pr: <YourCustomPRIcon />,
  issue: <YourCustomIssueIcon />,
}

<UIForgeActivityStreamEnhanced
  events={events.map(e => ({
    ...e,
    icon: customIcons[e.type] || e.icon
  }))}
/>
```

### Custom Event Rendering

For complete control over event appearance:

```tsx
<UIForgeActivityStream
  events={events}
  renderEvent={(event) => (
    <div className="my-custom-event">
      <MyCustomIcon type={event.type} />
      <h3>{event.title}</h3>
      <p>{event.description}</p>
    </div>
  )}
/>
```

## Future Theming Features

We're working on:

- Theme builder/generator tool
- More pre-built themes
- Component-specific theme exports
- Better TypeScript support for CSS variables

## Global CSS Tokens

UIForge provides a set of CSS custom properties (tokens) that allow you to customize spacing, sizing, and typography across all components. These tokens are defined in `:root` and can be overridden in your own stylesheets.

### Available Tokens

#### Spacing Tokens

```css
:root {
  --uiforge-gap: 8px;         /* Default gap */
  --uiforge-gap-xs: 4px;      /* Extra small gap */
  --uiforge-gap-sm: 6px;      /* Small gap */
  --uiforge-gap-md: 8px;      /* Medium gap (same as default) */
  --uiforge-gap-lg: 12px;     /* Large gap */
  --uiforge-gap-xl: 16px;     /* Extra large gap */
}
```

#### Size Tokens

```css
:root {
  /* Item heights */
  --uiforge-item-height: 40px;
  --uiforge-item-height-sm: 32px;
  --uiforge-item-height-lg: 48px;

  /* Avatar sizes */
  --uiforge-avatar-size: 32px;
  --uiforge-avatar-size-sm: 24px;
  --uiforge-avatar-size-lg: 40px;
  --uiforge-avatar-size-xl: 48px;

  /* Icon sizes */
  --uiforge-icon-size: 20px;
  --uiforge-icon-size-sm: 16px;
  --uiforge-icon-size-lg: 24px;
}
```

#### Typography Tokens

```css
:root {
  /* Font sizes */
  --uiforge-font-size: 14px;
  --uiforge-font-size-xs: 11px;
  --uiforge-font-size-sm: 12px;
  --uiforge-font-size-md: 14px;
  --uiforge-font-size-lg: 16px;
  --uiforge-font-size-xl: 18px;

  /* Line heights */
  --uiforge-line-height: 1.5;
  --uiforge-line-height-tight: 1.25;
  --uiforge-line-height-relaxed: 1.75;
}
```

#### Border Radius Tokens

```css
:root {
  --uiforge-border-radius: 6px;
  --uiforge-border-radius-sm: 4px;
  --uiforge-border-radius-lg: 8px;
  --uiforge-border-radius-full: 9999px;
}
```

#### Z-Index Tokens

```css
:root {
  --uiforge-z-index-dropdown: 1000;
  --uiforge-z-index-sticky: 1020;
  --uiforge-z-index-fixed: 1030;
  --uiforge-z-index-modal-backdrop: 1040;
  --uiforge-z-index-modal: 1050;
  --uiforge-z-index-tooltip: 1060;
}
```

### Customizing Tokens

Override tokens in your CSS to customize the entire UIForge design system:

```css
:root {
  /* Make all gaps larger */
  --uiforge-gap: 12px;
  --uiforge-gap-lg: 16px;
  --uiforge-gap-xl: 24px;

  /* Use larger fonts */
  --uiforge-font-size: 16px;

  /* More rounded corners */
  --uiforge-border-radius: 8px;
}
```

## Safe-Area Utility Classes

UIForge provides utility classes that leverage `env(safe-area-inset-*)` to ensure fixed or sticky elements respect iOS notch areas and other device safe areas.

### Available Classes

| Class | Description |
| --- | --- |
| `.uiforge-fixed-bottom` | Adds `padding-bottom` for the home indicator/bottom safe area |
| `.uiforge-fixed-top` | Adds `padding-top` for the notch/top safe area |
| `.uiforge-fixed-left` | Adds `padding-left` for left safe area |
| `.uiforge-fixed-right` | Adds `padding-right` for right safe area |
| `.uiforge-fixed-all` | Adds padding for all safe areas |
| `.uiforge-fixed-bottom-margin` | Margin variant for bottom safe area |
| `.uiforge-fixed-top-margin` | Margin variant for top safe area |
| `.uiforge-fixed-left-margin` | Margin variant for left safe area |
| `.uiforge-fixed-right-margin` | Margin variant for right safe area |

### Usage Example

Apply safe-area classes to fixed elements:

```tsx
// Fixed bottom navigation bar
<nav className="my-bottom-nav uiforge-fixed-bottom">
  <button>Home</button>
  <button>Search</button>
  <button>Profile</button>
</nav>

// Fixed header
<header className="my-header uiforge-fixed-top">
  <h1>My App</h1>
</header>

// Full-screen fixed overlay
<div className="my-overlay uiforge-fixed-all">
  <div className="content">...</div>
</div>
```

### CSS Implementation

The classes use the CSS `env()` function with fallbacks for non-supporting browsers:

```css
.uiforge-fixed-bottom {
  padding-bottom: env(safe-area-inset-bottom, 0px);
}

.uiforge-fixed-top {
  padding-top: env(safe-area-inset-top, 0px);
}
```

### Important: viewport-fit Meta Tag

For safe-area insets to work, you must set `viewport-fit=cover` in your HTML:

```html
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
```

Without this meta tag, `env(safe-area-inset-*)` values will always be `0`.

## Mobile Header Utilities

UIForge provides CSS variables and utility classes specifically for mobile header layouts, making it easy to build responsive headers that adapt to different screen sizes.

### Mobile Header CSS Variables

The `MobileHeaderLayout` component uses these CSS variables for customization:

```css
:root {
  --uiforge-mobile-header-height: 56px;
  --uiforge-mobile-header-padding: 0 8px;
  --uiforge-mobile-header-bg: transparent;
  --uiforge-mobile-header-border-color: transparent;
}
```

Override these in your own CSS to customize the header:

```css
:root {
  /* Taller header */
  --uiforge-mobile-header-height: 64px;
  
  /* More horizontal padding */
  --uiforge-mobile-header-padding: 0 16px;
  
  /* Custom background */
  --uiforge-mobile-header-bg: #1a1a2e;
  
  /* Visible border */
  --uiforge-mobile-header-border-color: #30363d;
}
```

### Mobile-Only Utility Class

The `.uiforge-mobile-only` utility class hides elements at desktop breakpoints (≥1024px by default):

```tsx
// This element will only be visible on mobile screens
<div className="uiforge-mobile-only">
  <MobileHeaderLayout
    left={<BackButton />}
    title="Mobile View"
    right={<MenuButton />}
  />
</div>
```

The utility is defined as:

```css
.uiforge-mobile-only {
  display: block;
}

@media (min-width: 1024px) {
  .uiforge-mobile-only {
    display: none;
  }
}
```

### Overriding the Breakpoint Threshold

CSS media queries don't support CSS variables, so the breakpoint (1024px) is hardcoded. To use a different breakpoint, override the class in your own CSS:

```css
/* Override to use 768px as the breakpoint instead of 1024px */
@media (min-width: 768px) {
  .uiforge-mobile-only {
    display: none;
  }
}

/* Make sure to also override the hide-on-desktop modifier if using MobileHeaderLayout */
@media (min-width: 768px) {
  .uiforge-mobile-header-layout--hide-on-desktop {
    display: none;
  }
}
```

### Using with MobileHeaderLayout

The `MobileHeaderLayout` component provides built-in support for hiding at desktop sizes via the `hideOnDesktop` prop:

```tsx
import { MobileHeaderLayout } from '@appforgeapps/uiforge'

// This header will automatically hide at ≥1024px
<MobileHeaderLayout
  left={<BackButton />}
  title="Page Title"
  right={<MenuButton />}
  hideOnDesktop
/>
```

### Complete Mobile Layout Example

Here's a typical mobile-first layout pattern:

```tsx
import { MobileHeaderLayout, IconButton } from '@appforgeapps/uiforge'

function MobileLayout({ children }) {
  return (
    <div className="app-layout">
      {/* Mobile header - hidden on desktop */}
      <MobileHeaderLayout
        left={<IconButton icon={<MenuIcon />} ariaLabel="Menu" />}
        title="My App"
        right={<IconButton icon={<SearchIcon />} ariaLabel="Search" />}
        hideOnDesktop
      />
      
      {/* Main content */}
      <main className="app-content">
        {children}
      </main>
      
      {/* Mobile-only bottom navigation */}
      <nav className="uiforge-mobile-only bottom-nav">
        <button>Home</button>
        <button>Search</button>
        <button>Profile</button>
      </nav>
    </div>
  )
}
```

```css
.app-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.app-content {
  flex: 1;
  /* Account for header height on mobile */
  padding-top: var(--uiforge-mobile-header-height);
}

@media (min-width: 1024px) {
  .app-content {
    /* No header padding on desktop */
    padding-top: 0;
  }
}

.bottom-nav {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  padding-bottom: env(safe-area-inset-bottom, 0px);
}
```

## Example App Themes

UIForge provides example themes in the `examples/themes/` directory to demonstrate how to create custom themes for real-world applications. These themes are **demonstration only** and should not be used directly in production.

### Available Example Themes

#### NexaLive Theme (`examples/themes/nexalive-theme.css`)

A concrete example theme based on the [chriscase/nexalive](https://github.com/chriscase/nexalive) music streaming application. This theme shows how to:

- Define brand-specific color tokens
- Map brand colors to UIForge CSS variables
- Create a cohesive visual identity across all components
- Override spacing and typography for a custom look

**Key Features:**
- Purple and pink accent colors for a modern music app aesthetic
- Dark mode optimized with deep backgrounds
- Custom button, grid, and component theming
- Demonstrates mapping for all UIForge components

### How to Adopt Example Themes

Example themes are meant to be **copied and customized** for your own projects. Here's how to adopt them:

#### Step 1: Copy the Theme File

There are several ways to get the example theme into your project:

**Option 1: Download from GitHub (Recommended for exploration)**
```bash
# Download directly from the UIForge repository
curl -o src/styles/my-theme.css https://raw.githubusercontent.com/chriscase/UIForge/main/examples/themes/nexalive-theme.css

# For production use, verify the file contents before using
# Or clone the UIForge repo and copy locally:
# git clone https://github.com/chriscase/UIForge.git /tmp/uiforge
# cp /tmp/uiforge/examples/themes/nexalive-theme.css src/styles/my-theme.css
```

**Option 2: View and copy manually**

View the theme in the [UIForge repository](https://github.com/chriscase/UIForge/tree/main/examples/themes) and create your own file based on it.

**Option 3: Copy from node_modules (not recommended for production)**
```bash
# Only use this during development/exploration
cp node_modules/@appforgeapps/uiforge/examples/themes/nexalive-theme.css src/styles/my-theme.css
```

Note: The `examples/` directory is not guaranteed to be present in all package distributions, so downloading directly from GitHub or copying the content manually is more reliable.

#### Step 2: Customize Brand Colors

Edit the copied file to match your brand:

```css
/* my-theme.css */
:root {
  /* Replace with your brand colors */
  --my-brand-primary: #your-color;
  --my-brand-secondary: #your-color;
  --my-brand-accent: #your-color;
  
  /* Map to UIForge variables */
  --button-primary-bg: var(--my-brand-primary);
  --button-primary-hover: var(--my-brand-primary-dark);
  /* ... more mappings */
}
```

#### Step 3: Import After UIForge Styles

**Important:** Always import your custom theme **after** UIForge's core styles:

```tsx
// ✅ Correct import order
import '@appforgeapps/uiforge/styles.css'  // UIForge core styles FIRST
import './styles/my-theme.css'              // Your custom theme SECOND

// Your app code...
```

```css
/* Or in CSS */
@import '@appforgeapps/uiforge/styles.css';  /* UIForge core FIRST */
@import './my-theme.css';                    /* Your theme SECOND */
```

**Why this order matters:** UIForge core styles define default values for CSS variables. Your theme overrides these defaults. If you import your theme first, UIForge will override your customizations.

#### Step 4: Apply Theme Class (Optional)

You can optionally add a theme class to your root element:

```tsx
function App() {
  return (
    <div className="my-brand-theme">
      {/* Your app content */}
    </div>
  )
}
```

Or add it to the body:

```tsx
// In your main entry file
document.body.classList.add('my-brand-theme')
```

### Example: Using NexaLive Theme in Your App

```tsx
// src/main.tsx
import '@appforgeapps/uiforge/styles.css'
import './styles/nexalive-theme.css'  // Your customized copy
import App from './App'

function main() {
  document.body.classList.add('nexalive-theme')
  // ... render your app
}
```

### Best Practices for App Themes

1. **Copy, Don't Import Directly**: Always copy example themes into your project and customize them. Don't import directly from `node_modules/examples/`.

2. **Version Control**: Keep your theme file in your repository so it's versioned with your application code.

3. **Maintain Brand Tokens**: Define your brand colors as CSS variables first, then map them to UIForge variables. This makes it easier to update your brand colors globally.

4. **Test All Components**: When creating a theme, test it with all UIForge components you're using to ensure consistency.

5. **Document Your Colors**: Add comments in your theme file explaining which colors are used where and why.

6. **Consider Accessibility**: Ensure your custom colors meet WCAG contrast requirements (4.5:1 for normal text, 3:1 for large text).

### Viewing Example Themes

To see example themes in action:

1. Clone the UIForge repository:
   ```bash
   git clone https://github.com/chriscase/UIForge.git
   cd UIForge
   npm install
   npm run dev
   ```

2. Navigate to the SongCard example and toggle the "Use NexaLive Theme" checkbox to see the theme applied.

### Creating Your Own Theme

Use the NexaLive theme as a template:

1. Start with the structure from `examples/themes/nexalive-theme.css`
2. Replace the brand color variables with your colors
3. Customize typography and spacing if needed
4. Test thoroughly with your components
5. Consider sharing your theme as an example contribution!

**Remember**: App themes should live in **your application**, not in UIForge core. The `examples/themes/` directory is for demonstration purposes only.

## Core Tokens vs App Theme Mappings

Understanding the distinction between **core tokens** and **app theme mappings** is crucial for keeping UIForge generic while supporting app-specific customization.

### Core Tokens (UIForge Generic)

Core tokens are the CSS variables defined and used by UIForge components internally. These tokens are **generic** and **semantically named** to work across different applications and design systems.

Examples of core tokens:
```css
/* UIForge core tokens - defined in the library */
--activity-stream-bg
--activity-stream-text
--activity-stream-link-color
--button-primary-bg
--button-primary-hover
--grid-bg
--grid-border
--media-card-bg
```

**Key characteristics:**
- **Generic naming**: Describes the purpose (e.g., `--button-primary-bg`), not specific brand values
- **Component-scoped**: Often prefixed with component name (e.g., `--activity-stream-*`)
- **Semantic**: Names describe what they control, not what they look like (e.g., `--text` not `--gray-700`)
- **Defined in UIForge**: Have default values set by the library
- **Stable API**: Won't change frequently; safe to override

### App Theme Mappings (Your Application)

App theme mappings are **your brand-specific design tokens** that you map to UIForge's core tokens. This approach keeps your brand values centralized and makes it easy to update your brand colors globally.

Example mapping pattern:
```css
/* Your app's theme file (e.g., my-app-theme.css) */
:root {
  /* Step 1: Define YOUR brand tokens */
  --myapp-brand-primary: #ff6b35;
  --myapp-brand-primary-dark: #e65525;
  --myapp-brand-secondary: #004e89;
  --myapp-brand-bg: #f7f7f7;
  --myapp-brand-text: #1a1a1a;
  --myapp-brand-border: #d4d4d4;
  
  /* Step 2: Map YOUR brand tokens to UIForge core tokens */
  --button-primary-bg: var(--myapp-brand-primary);
  --button-primary-hover: var(--myapp-brand-primary-dark);
  --activity-stream-link-color: var(--myapp-brand-secondary);
  --activity-stream-bg: var(--myapp-brand-bg);
  --activity-stream-text: var(--myapp-brand-text);
  --grid-border: var(--myapp-brand-border);
}
```

**Benefits of this two-tier approach:**

1. **Centralized brand values**: All your brand colors are defined in one place
2. **Easy global updates**: Change `--myapp-brand-primary` once, all mapped components update
3. **Clear separation**: UIForge stays generic; your app stays branded
4. **Flexibility**: You can map different brand tokens to different components as needed
5. **Maintainability**: When UIForge adds new components, you map your existing brand tokens

### Complete Mapping Example

Here's how the NexaLive theme demonstrates this pattern:

```css
/* examples/themes/nexalive-theme.css */
:root {
  /* Brand layer: Define all NexaLive-specific colors */
  --nexalive-purple-primary: #8b5cf6;
  --nexalive-purple-dark: #7c3aed;
  --nexalive-bg-dark: #0f0a1e;
  --nexalive-text-primary: #f5f3ff;
  /* ... more brand tokens */
  
  /* Mapping layer: Connect brand to UIForge components */
  --button-primary-bg: var(--nexalive-purple-primary);
  --button-primary-hover: var(--nexalive-purple-dark);
  --activity-stream-bg: var(--nexalive-bg-dark);
  --activity-stream-text: var(--nexalive-text-primary);
  /* ... map all components you use */
}
```

This approach keeps UIForge core free of app-specific concerns while giving you complete control over branding.

## Semantic Tokens vs Brand Tokens

When creating your app theme, it's important to understand the difference between **semantic tokens** and **brand tokens**, and follow consistent naming conventions.

### Brand Tokens (Raw Design Values)

Brand tokens represent the **raw design values** from your design system or brand guidelines. These are often specific colors, sizes, or measurements.

**Naming convention:** Use your brand/app prefix + descriptive color/size name

```css
:root {
  /* Colors from brand palette */
  --myapp-blue-500: #3b82f6;
  --myapp-blue-600: #2563eb;
  --myapp-blue-700: #1d4ed8;
  --myapp-red-500: #ef4444;
  --myapp-gray-50: #f9fafb;
  --myapp-gray-900: #111827;
  
  /* Spacing from design system */
  --myapp-space-1: 4px;
  --myapp-space-2: 8px;
  --myapp-space-4: 16px;
  
  /* Typography */
  --myapp-font-primary: 'Inter', sans-serif;
  --myapp-font-size-base: 14px;
}
```

### Semantic Tokens (Purpose-Based)

Semantic tokens describe **what they're used for**, not what they look like. They reference brand tokens and create meaningful names for specific use cases.

**Naming convention:** Use your app prefix + semantic purpose

```css
:root {
  /* Semantic color tokens */
  --myapp-color-primary: var(--myapp-blue-600);
  --myapp-color-primary-hover: var(--myapp-blue-700);
  --myapp-color-danger: var(--myapp-red-500);
  --myapp-color-bg: var(--myapp-gray-50);
  --myapp-color-text: var(--myapp-gray-900);
  
  /* Semantic spacing tokens */
  --myapp-gap-default: var(--myapp-space-2);
  --myapp-gap-large: var(--myapp-space-4);
  
  /* Then map semantic tokens to UIForge */
  --button-primary-bg: var(--myapp-color-primary);
  --button-primary-hover: var(--myapp-color-primary-hover);
  --activity-stream-bg: var(--myapp-color-bg);
  --activity-stream-text: var(--myapp-color-text);
}
```

### Three-Tier Token Architecture (Recommended)

For larger applications, consider a three-tier approach:

```css
:root {
  /* Tier 1: Brand Tokens (raw palette) */
  --myapp-blue-600: #2563eb;
  --myapp-gray-50: #f9fafb;
  
  /* Tier 2: Semantic Tokens (purpose-based) */
  --myapp-color-primary: var(--myapp-blue-600);
  --myapp-color-surface: var(--myapp-gray-50);
  
  /* Tier 3: Component Mappings (UIForge integration) */
  --button-primary-bg: var(--myapp-color-primary);
  --grid-bg: var(--myapp-color-surface);
}
```

**Benefits:**
- **Brand layer**: Easy to update raw colors without breaking semantics
- **Semantic layer**: Clear intent; easier to maintain consistent meanings
- **Component layer**: Clean integration with UIForge without coupling to brand specifics

### Naming Convention Best Practices

1. **Always prefix your tokens** with your app/brand name to avoid conflicts:
   ```css
   /* ✅ Good */
   --myapp-primary: #3b82f6;
   --nexalive-purple: #8b5cf6;
   
   /* ❌ Avoid - too generic, might conflict */
   --primary: #3b82f6;
   --purple: #8b5cf6;
   ```

2. **Use semantic names for UIForge mappings**, not direct color names:
   ```css
   /* ✅ Good - semantic */
   --button-primary-bg: var(--myapp-color-primary);
   --button-danger-bg: var(--myapp-color-danger);
   
   /* ❌ Avoid - too specific to color */
   --button-blue-bg: var(--myapp-blue-500);
   --button-red-bg: var(--myapp-red-500);
   ```

3. **Be consistent with scale naming** for colors and sizes:
   ```css
   /* For colors: 50 (lightest) to 900 (darkest) */
   --myapp-blue-50: #eff6ff;
   --myapp-blue-500: #3b82f6;
   --myapp-blue-900: #1e3a8a;
   
   /* For sizes: xs, sm, md, lg, xl */
   --myapp-space-xs: 4px;
   --myapp-space-sm: 8px;
   --myapp-space-md: 16px;
   --myapp-space-lg: 24px;
   --myapp-space-xl: 32px;
   ```

4. **Group related tokens together** in your CSS file with comments:
   ```css
   /* Brand Colors - Primary */
   --myapp-blue-500: #3b82f6;
   --myapp-blue-600: #2563eb;
   
   /* Brand Colors - Neutral */
   --myapp-gray-50: #f9fafb;
   --myapp-gray-900: #111827;
   
   /* Semantic - Actions */
   --myapp-color-primary: var(--myapp-blue-600);
   --myapp-color-primary-hover: var(--myapp-blue-700);
   ```

## Best Practices: Where to Place App Themes

### ✅ Recommended: App Themes in Your Repository

**App-specific themes should ALWAYS live in your application repository**, not in UIForge core. This keeps UIForge generic and reusable while giving you full control over your branding.

```
your-app/
├── src/
│   ├── styles/
│   │   ├── theme.css              # Your app theme
│   │   ├── brand-tokens.css       # Your brand palette (optional)
│   │   └── components/            # Component-specific overrides
│   ├── components/
│   │   ├── SongCard/              # Your domain-specific wrappers
│   │   └── ...
│   └── main.tsx                   # Import theme after UIForge styles
├── package.json
└── ...
```

**Import order in your app:**
```tsx
// src/main.tsx
import '@appforgeapps/uiforge/styles.css'  // UIForge core styles FIRST
import './styles/theme.css'                 // Your theme SECOND

// Now render your app
```

### ✅ Alternative: Examples Directory (For Demonstration)

The `examples/themes/` directory in UIForge is for **demonstration and reference only**. Use it to:
- See how other apps have themed UIForge
- Get inspiration for your own theme
- Contribute example themes to help the community

**Do NOT import directly from `examples/` in production:**
```tsx
// ❌ BAD - Don't do this
import '@appforgeapps/uiforge/examples/themes/nexalive-theme.css'

// ✅ GOOD - Copy it to your project first
// 1. Copy examples/themes/nexalive-theme.css to src/styles/my-theme.css
// 2. Customize the brand colors
// 3. Import from your project
import './styles/my-theme.css'
```

**Why not import directly?**
- The `examples/` directory may not be included in published npm packages
- Example themes may change or be removed in future UIForge versions
- You can't customize example themes without modifying node_modules (bad practice)
- Your app should own its theme for version control and maintenance

### ❌ Anti-Pattern: App Themes in UIForge Core

**Never add app-specific themes to UIForge core library:**

```css
/* ❌ BAD - Don't add this to UIForge source code */
/* src/styles/spotify-theme.css in UIForge repo */
:root {
  --spotify-green: #1db954;
  --button-primary-bg: var(--spotify-green);
}
```

**Why this is bad:**
- Makes UIForge less generic and reusable
- Creates maintenance burden for app-specific code in the library
- Other users don't need your app's theme
- Violates separation of concerns
- Makes UIForge harder to update

### Sharing Themes with the Community

If you've created a great theme you want to share:

1. **As an example**: Submit a PR adding your theme to `examples/themes/` with clear documentation
2. **As a separate package**: Publish your theme as a standalone npm package:
   ```
   @yourorg/uiforge-theme-yourapp
   ```
3. **In your blog/docs**: Write about your theming approach and share the CSS

## Migration Checklist: Adopting UIForge in Your App

Follow this checklist to integrate UIForge with custom theming into your application.

### Step 1: Install UIForge

```bash
npm install @appforgeapps/uiforge
# or
yarn add @appforgeapps/uiforge
```

### Step 2: Set Up Basic UIForge Integration

1. Import UIForge styles in your main entry file:
   ```tsx
   // src/main.tsx or src/index.tsx
   import '@appforgeapps/uiforge/styles.css'
   ```

2. Test a basic component:
   ```tsx
   import { Button } from '@appforgeapps/uiforge'
   
   function App() {
     return <Button variant="primary">Test Button</Button>
   }
   ```

3. Verify it works with default UIForge styling.

### Step 3: Create Your App Theme

1. Create a theme file in your project:
   ```bash
   mkdir -p src/styles
   touch src/styles/theme.css
   ```

2. Start with an example theme as a template (optional):
   ```bash
   # Download the NexaLive example theme from GitHub
   curl -o src/styles/theme.css https://raw.githubusercontent.com/chriscase/UIForge/main/examples/themes/nexalive-theme.css
   ```
   
   Or copy the structure manually and customize.

3. Define your brand tokens:
   ```css
   /* src/styles/theme.css */
   :root {
     /* Define your brand colors */
     --myapp-primary: #your-brand-color;
     --myapp-primary-dark: #your-darker-color;
     --myapp-bg: #your-bg-color;
     --myapp-text: #your-text-color;
     --myapp-border: #your-border-color;
   }
   ```

4. Map your brand tokens to UIForge tokens:
   ```css
   :root {
     /* ... brand tokens above ... */
     
     /* Map to UIForge components */
     --button-primary-bg: var(--myapp-primary);
     --button-primary-hover: var(--myapp-primary-dark);
     --activity-stream-bg: var(--myapp-bg);
     --activity-stream-text: var(--myapp-text);
     --grid-border: var(--myapp-border);
     /* Map all components you plan to use */
   }
   ```

### Step 4: Import Your Theme

Import your theme **after** UIForge core styles:

```tsx
// src/main.tsx
import '@appforgeapps/uiforge/styles.css'  // Core styles FIRST
import './styles/theme.css'                 // Your theme SECOND

import App from './App'
// ... rest of your app initialization
```

### Step 5: Create Domain-Specific Component Wrappers

Create wrappers around UIForge components for your specific domain. This is where **your app's business logic** meets UIForge's generic components.

Example: Creating a `SongCard` wrapper for a music app:

1. Create the wrapper component:
   ```tsx
   // src/components/SongCard/SongCard.tsx
   import React from 'react'
   import { MediaCard, Button } from '@appforgeapps/uiforge'
   
   // Note: This is a simplified example for demonstration.
   // The complete example in examples/SongCard/ includes additional props
   // like genre, versionCount, variant, theme, and more actions.
   interface SongCardProps {
     title: string
     artist: string
     album?: string
     albumArtUrl: string
     year?: number
     duration?: string
     onPlay?: () => void
     onAddToPlaylist?: () => void
   }
   
   export const SongCard: React.FC<SongCardProps> = ({
     title,
     artist,
     album,
     albumArtUrl,
     year,
     duration,
     onPlay,
     onAddToPlaylist,
   }) => {
     // Build metadata from domain-specific props
     const meta: Record<string, string> = {}
     if (album) meta.album = album
     if (year) meta.year = String(year)
     if (duration) meta.duration = duration
   
     // Create domain-specific actions
     // Note: Simplified for brevity. Full implementation includes
     // event.stopPropagation(), proper aria-labels, and more buttons.
     const actions = (
       <div>
         {onPlay && (
           <Button variant="primary" size="small" onClick={onPlay}>
             ▶ Play
           </Button>
         )}
         {onAddToPlaylist && (
           <Button variant="outline" size="small" onClick={onAddToPlaylist}>
             + Playlist
           </Button>
         )}
       </div>
     )
   
     // Map to generic MediaCard
     return (
       <MediaCard
         title={title}
         subtitle={artist}
         mediaUrl={albumArtUrl}
         mediaAlt={`Album artwork for ${album || title}`}
         meta={meta}
         actions={actions}
         ariaLabel={`${title} by ${artist}`}
       />
     )
   }
   ```

2. Use your domain-specific wrapper in your app:
   ```tsx
   // src/pages/MusicLibrary.tsx
   import { SongCard } from '../components/SongCard/SongCard'
   
   function MusicLibrary() {
     return (
       <div>
         <SongCard
           title="Bohemian Rhapsody"
           artist="Queen"
           album="A Night at the Opera"
           albumArtUrl="/album-art.jpg"
           year={1975}
           duration="5:55"
           onPlay={() => console.log('Playing...')}
         />
       </div>
     )
   }
   ```

**Benefits of this approach:**
- **Type safety**: Your wrapper has strongly-typed, domain-specific props
- **Encapsulation**: Business logic stays in your app, not UIForge
- **Reusability**: Use `<SongCard>` throughout your app instead of repeating MediaCard setup
- **Maintainability**: UIForge updates don't affect your domain logic
- **Separation of concerns**: UIForge stays generic; your app stays domain-specific

### Step 6: Test Your Theme

1. **Visual testing**: Check all components you're using with your theme applied
2. **Contrast testing**: Verify WCAG color contrast requirements
   - Normal text: 4.5:1 minimum
   - Large text: 3:1 minimum
   - Use contrast checking tools like [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/), browser DevTools, or similar alternatives
3. **Dark mode**: If supporting dark mode, test theme with both light and dark variants
4. **Responsive**: Test on mobile and desktop to ensure proper scaling

### Step 7: Maintain Your Theme

1. **Version control**: Keep your theme file in git
2. **Document colors**: Add comments explaining brand color choices
3. **Update as needed**: When adding new UIForge components, map your brand tokens to them
4. **Stay updated**: When UIForge adds new tokens, review if they need mapping

### Complete Example: NexaLive Theme Adoption

Here's how the NexaLive music streaming app integrates UIForge:

**File structure:**
```
nexalive-app/
├── src/
│   ├── styles/
│   │   └── nexalive-theme.css     # Brand theme (copied from examples)
│   ├── components/
│   │   ├── SongCard/
│   │   │   ├── SongCard.tsx       # Wraps MediaCard for music domain
│   │   │   └── SongCard.css       # SongCard-specific styles
│   │   ├── PlaylistCard/          # Another domain wrapper
│   │   └── ArtistCard/            # Another domain wrapper
│   └── main.tsx
└── package.json
```

**Import order (src/main.tsx):**
```tsx
// Core library styles FIRST
import '@appforgeapps/uiforge/styles.css'

// App theme SECOND (overrides defaults)
import './styles/nexalive-theme.css'

// App initialization
import App from './App'
ReactDOM.createRoot(document.getElementById('root')!).render(<App />)
```

**Using domain wrapper (src/pages/Library.tsx):**
```tsx
import { SongCard } from '../components/SongCard/SongCard'

export function Library() {
  return (
    <div className="library">
      {songs.map(song => (
        <SongCard
          key={song.id}
          title={song.title}
          artist={song.artist}
          albumArtUrl={song.artwork}
          onPlay={() => playSong(song.id)}
        />
      ))}
    </div>
  )
}
```

This pattern keeps UIForge generic while giving the NexaLive app full control over branding and domain-specific functionality.

## Contributing

Have a great theme? Share it with the community! Submit your custom themes as examples in the `examples/themes/` directory.

## Resources

- [CSS Variables (MDN)](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties)
- [WCAG Contrast Guidelines](https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html)
- [prefers-color-scheme (MDN)](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme)
- [Safe Area Insets (MDN)](https://developer.mozilla.org/en-US/docs/Web/CSS/env)
