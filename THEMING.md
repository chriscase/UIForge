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

**Option 1: Download from GitHub (Recommended)**
```bash
# Download directly from the UIForge repository
curl -o src/styles/my-theme.css https://raw.githubusercontent.com/chriscase/UIForge/main/examples/themes/nexalive-theme.css
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

## Contributing

Have a great theme? Share it with the community! Submit your custom themes as examples in the `examples/themes/` directory.

## Resources

- [CSS Variables (MDN)](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties)
- [WCAG Contrast Guidelines](https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html)
- [prefers-color-scheme (MDN)](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme)
- [Safe Area Insets (MDN)](https://developer.mozilla.org/en-US/docs/Web/CSS/env)
