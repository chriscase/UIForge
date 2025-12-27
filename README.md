# UIForge

A rich user interface library for ReactJS developers written by a seasoned user interface developer who loves working with ReactJS.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18%2F19-61dafb)](https://reactjs.org/)

> **📦 Package Name Change**: The package has been renamed from `@chriscase/uiforge` to `@appforgeapps/uiforge`. If you're upgrading from an older version, please see the [Migration Guide](./MIGRATION_GUIDE.md).

> **⚠️ Early Stage Project**: UIForge is a very new project under active development. The API is subject to rapid changes and breaking changes may occur frequently as we refine the components and their interfaces. We recommend pinning to specific versions in production and reviewing the CHANGELOG before upgrading.

## Features

- 🎨 **Beautiful Components** - Carefully crafted, customizable UI components
- 💪 **TypeScript First** - Full TypeScript support with type definitions
- ⚡ **Modern Stack** - Built with React, TypeScript, and Vite
- 🧪 **Well Tested** - Comprehensive test coverage with Vitest
- 📦 **Tree Shakeable** - Only import what you need
- 🎯 **Developer Friendly** - Easy to use and customize
- 🆓 **Free & Open Source** - MIT licensed

## Installation

### From NPM (Recommended)

Install UIForge from NPM:

```bash
npm install @appforgeapps/uiforge
```

Or with yarn:

```bash
yarn add @appforgeapps/uiforge
```

Or with pnpm:

```bash
pnpm add @appforgeapps/uiforge
```

### Using UIForge in Your Project

After installation, you'll need to import both the components and the CSS styles in your application.

#### Method 1: Import in your main entry file (Recommended)

This is the most common approach - import the styles once in your application's entry point:

```tsx
// src/main.tsx or src/index.tsx
import '@appforgeapps/uiforge/styles.css'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
```

Then import and use components in your app:

```tsx
// src/App.tsx
import { Button, UIForgeGrid, UIForgeComboBox } from '@appforgeapps/uiforge'

function App() {
  return (
    <div>
      <h1>My Application</h1>
      <Button variant="primary" onClick={() => alert('Hello!')}>
        Click Me
      </Button>
    </div>
  )
}

export default App
```

#### Method 2: Import styles in your component file

If you prefer, you can import the styles directly in the component file where you use UIForge components:

```tsx
// src/components/MyComponent.tsx
import '@appforgeapps/uiforge/styles.css'
import { Button } from '@appforgeapps/uiforge'

export function MyComponent() {
  return <Button variant="primary">Click Me</Button>
}
```

#### Method 3: Import in your global CSS file

You can also import UIForge styles in your main CSS file:

```css
/* src/index.css or src/App.css */
@import '@appforgeapps/uiforge/styles.css';

/* Your other styles */
body {
  margin: 0;
  font-family: sans-serif;
}
```

### TypeScript Configuration

UIForge is written in TypeScript and includes full type definitions. If you're using TypeScript, the types will be automatically picked up. Ensure your `tsconfig.json` includes:

```json
{
  "compilerOptions": {
    "moduleResolution": "bundler",  // or "node16" / "nodenext"
    "jsx": "react-jsx",
    "esModuleInterop": true
  }
}
```

### Bundler Configuration

UIForge works with all modern bundlers. Here are specific notes for common setups:

#### Vite

No additional configuration needed. Just import and use:

```tsx
import { Button } from '@appforgeapps/uiforge'
import '@appforgeapps/uiforge/styles.css'
```

#### Next.js (App Router)

For Next.js 13+ with the App Router, import styles in your root layout:

```tsx
// app/layout.tsx
import '@appforgeapps/uiforge/styles.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'My App',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
```

Then use components in your pages:

```tsx
// app/page.tsx
import { Button } from '@appforgeapps/uiforge'

export default function Home() {
  return <Button variant="primary">Click Me</Button>
}
```

#### Next.js (Pages Router)

For Next.js with the Pages Router, import styles in `_app.tsx`:

```tsx
// pages/_app.tsx
import '@appforgeapps/uiforge/styles.css'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
```

#### Create React App

Import styles in your `index.tsx` or `App.tsx`:

```tsx
// src/index.tsx
import '@appforgeapps/uiforge/styles.css'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

const root = ReactDOM.createRoot(document.getElementById('root')!)
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
```

#### Webpack

If using a custom Webpack setup, ensure you have CSS loaders configured:

```bash
npm install --save-dev style-loader css-loader
```

Then in your webpack.config.js:

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
}
```

### Verifying Installation

To verify UIForge is properly installed, you can check:

1. **Package is installed:**
   ```bash
   npm list @appforgeapps/uiforge
   ```

2. **Types are available** (TypeScript projects):
   ```tsx
   import type { ButtonProps } from '@appforgeapps/uiforge'
   // If this imports without errors, types are working
   ```

3. **Create a simple test component:**
   ```tsx
   import { Button } from '@appforgeapps/uiforge'
   import '@appforgeapps/uiforge/styles.css'

   export function Test() {
     return <Button variant="primary">Test</Button>
   }
   ```

### Troubleshooting

**Issue: "Cannot find module '@appforgeapps/uiforge'"**
- Run `npm install` to ensure dependencies are installed
- Check that `@appforgeapps/uiforge` is in your `package.json` dependencies
- Try deleting `node_modules` and `package-lock.json`, then run `npm install` again

**Issue: Styles not loading**
- Ensure you've imported the CSS: `import '@appforgeapps/uiforge/styles.css'`
- Check that your bundler supports CSS imports
- For Webpack, ensure css-loader and style-loader are configured

**Issue: TypeScript errors**
- Ensure TypeScript 4.7+ is installed
- Check that your `tsconfig.json` has proper module resolution settings
- Try running `npm install @types/react @types/react-dom` if not already installed

### Alternative: Install from GitHub

For development or to use the latest unreleased features, you can install directly from GitHub. Note that GitHub installations require building the project after installation.

```bash
npm install github:chriscase/UIForge
```

Or specify a specific branch, tag, or commit:

```bash
npm install github:chriscase/UIForge#main
npm install github:chriscase/UIForge#v0.1.0
```

**Important for GitHub installations:**

After installing from GitHub, you'll need to build the project:

```bash
cd node_modules/@appforgeapps/uiforge
npm install
npm run build
```

Or use a `postinstall` script in your project to automate this:

```json
{
  "scripts": {
    "postinstall": "cd node_modules/@appforgeapps/uiforge && npm install && npm run build"
  }
}
```

**Recommendation:** Use NPM installation for production projects. GitHub installation is primarily intended for:
- Contributing to UIForge development
- Testing unreleased features
- Debugging issues with the latest code

## Usage

### Basic Example

```tsx
import { Button } from '@appforgeapps/uiforge'
import '@appforgeapps/uiforge/styles.css' // Import styles

function App() {
  return (
    <Button variant="primary" onClick={() => console.log('Clicked!')}>
      Click me
    </Button>
  )
}
```

### Complete Setup Example

Here's a complete example of setting up UIForge in a React + TypeScript + Vite project:

**1. Install UIForge:**

```bash
npm install @appforgeapps/uiforge react react-dom
```

**2. Import components and styles in your app:**

```tsx
// src/App.tsx
import { useState } from 'react'
import { 
  Button, 
  UIForgeGrid, 
  UIForgeComboBox,
  UIForgeActivityStream 
} from '@appforgeapps/uiforge'
import '@appforgeapps/uiforge/styles.css'

function App() {
  const [selectedValue, setSelectedValue] = useState(null)

  const options = [
    { value: 1, label: 'Option 1', icon: '🏠' },
    { value: 2, label: 'Option 2', icon: '⭐' },
    { value: 3, label: 'Option 3', icon: '⚙️' },
  ]

  return (
    <div className="app">
      <h1>UIForge Demo</h1>
      
      <Button variant="primary" onClick={() => alert('Clicked!')}>
        Click Me
      </Button>

      <UIForgeComboBox
        options={options}
        value={selectedValue}
        onChange={(val) => setSelectedValue(val)}
        placeholder="Select an option..."
        clearable
      />
    </div>
  )
}

export default App
```

**3. Ensure peer dependencies are satisfied:**

UIForge requires React 18+ or React 19+ as peer dependencies:

```json
{
  "dependencies": {
    "@appforgeapps/uiforge": "^0.1.0",
    "react": "^18.0.0",
    "react-dom": "^18.0.0"
  }
}
```

### TypeScript Support

UIForge is written in TypeScript and includes full type definitions. TypeScript will automatically pick up the types when you import components:

```tsx
import { Button, ButtonProps, UIForgeComboBox, ComboBoxOption } from '@appforgeapps/uiforge'

// Type inference works automatically
const options: ComboBoxOption[] = [
  { value: 1, label: 'Item 1' },
  { value: 2, label: 'Item 2' },
]

// Component props are fully typed
const MyButton: React.FC<ButtonProps> = (props) => {
  return <Button {...props} />
}
```

### Importing Styles

UIForge components require CSS to be imported. You have several options:

**Option 1: Import in your main entry file (recommended)**

```tsx
// src/main.tsx or src/index.tsx
import '@appforgeapps/uiforge/styles.css'
import App from './App'
```

**Option 2: Import in your component file**

```tsx
// src/App.tsx
import '@appforgeapps/uiforge/styles.css'
import { Button } from '@appforgeapps/uiforge'
```

**Option 3: Import in your global CSS file**

```css
/* src/index.css */
@import '@appforgeapps/uiforge/styles.css';
```

## Components

### Button

A customizable button component with multiple variants, sizes, and accessibility-focused touch targets.

```tsx
import { Button } from '@appforgeapps/uiforge'

// Variants
<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="outline">Outline</Button>

// Sizes
<Button size="small">Small</Button>
<Button size="medium">Medium</Button>
<Button size="large">Large</Button>

// Disabled state
<Button disabled>Disabled</Button>

// Touch target density
// Default: 44×44px minimum for accessibility compliance
<Button>Accessible Touch Target</Button>

// Condensed: Smaller touch targets for dense UIs (not recommended for touch devices)
<Button density="condensed">Condensed</Button>
```

**Accessibility Features:**

- Default 44×44px minimum touch target for WCAG compliance
- Use `density="condensed"` only when space is critical and touch interaction is not primary
- Full keyboard support
- Focus visible styling

### HamburgerButton

An accessible hamburger menu button for controlling drawer/menu components.

```tsx
import { HamburgerButton, UIForgeSidebar } from '@appforgeapps/uiforge'

function Navigation() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <HamburgerButton
        isOpen={isOpen}
        controlsId="main-drawer"
        ariaLabel="Toggle navigation menu"
        onClick={() => setIsOpen(!isOpen)}
      />
      <UIForgeSidebar
        id="main-drawer"
        variant="drawer"
        open={isOpen}
        onOpenChange={setIsOpen}
      >
        <nav>Navigation content</nav>
      </UIForgeSidebar>
    </>
  )
}
```

**Props:**

| Prop         | Type                      | Default         | Description                              |
| ------------ | ------------------------- | --------------- | ---------------------------------------- |
| `isOpen`     | `boolean`                 | required        | Whether the controlled menu/drawer is open |
| `controlsId` | `string`                  | required        | ID of the element this button controls   |
| `ariaLabel`  | `string`                  | `"Toggle menu"` | Accessible label for the button          |
| `size`       | `'small' \| 'medium' \| 'large'` | `'medium'` | Size variant of the button           |

**Accessibility Features:**

- Proper `aria-expanded` attribute reflecting open state
- `aria-controls` attribute linking to the controlled element
- 44×44px minimum touch target by default
- Animated hamburger-to-X transformation for visual feedback
- Focus visible styling

### UIForgeSidebar

A reusable sidebar component with multiple variants: static, drawer, and bottom sheet.

```tsx
import { UIForgeSidebar } from '@appforgeapps/uiforge'

// Static sidebar (always visible)
<UIForgeSidebar variant="static" width="280px">
  <nav>Navigation</nav>
</UIForgeSidebar>

// Drawer sidebar (slide-in panel)
<UIForgeSidebar
  variant="drawer"
  open={isOpen}
  onOpenChange={setIsOpen}
  position="left"
>
  <nav>Mobile navigation</nav>
</UIForgeSidebar>

// Bottom sheet
<UIForgeSidebar
  variant="bottom"
  open={isOpen}
  onOpenChange={setIsOpen}
  height="300px"
>
  <div>Bottom sheet content</div>
</UIForgeSidebar>
```

**Props Reference:**

| Prop                   | Type                              | Default                  | Description                            |
| ---------------------- | --------------------------------- | ------------------------ | -------------------------------------- |
| `variant`              | `'static' \| 'drawer' \| 'bottom'` | `'static'`              | Sidebar variant                        |
| `open`                 | `boolean`                         | `true`                   | Whether sidebar is open (drawer/bottom) |
| `onOpenChange`         | `(open: boolean) => void`         | -                        | Callback when open state changes       |
| `position`             | `'left' \| 'right'`               | `'left'`                 | Position (static/drawer variants)      |
| `width`                | `string`                          | `'280px'`                | Width (static/drawer variants)         |
| `height`               | `string`                          | `'200px'`                | Height (bottom variant only)           |
| `showBackdrop`         | `boolean`                         | `true`                   | Show backdrop overlay (drawer/bottom)  |
| `closeOnBackdropClick` | `boolean`                         | `true`                   | Close on backdrop click                |
| `closeOnEscape`        | `boolean`                         | `true`                   | Close on ESC key press                 |
| `trapFocus`            | `boolean`                         | `true`                   | Trap focus within sidebar (drawer/bottom) |
| `ariaLabel`            | `string`                          | `'Sidebar navigation'`   | ARIA label for accessibility           |
| `className`            | `string`                          | -                        | Additional CSS class names             |

**Keyboard Interactions:**

- `Escape` - Close the drawer/bottom sheet
- `Tab` - Navigate through focusable elements (focus is trapped within the drawer when open)
- `Shift + Tab` - Navigate backwards through focusable elements

**Accessibility Features:**

- `role="dialog"` and `aria-modal="true"` for drawer/bottom variants
- Focus trapping prevents tab navigation outside the drawer when open
- Focus returns to the triggering element when drawer closes
- ESC key closes the drawer
- Backdrop click closes the drawer
- Body scroll is disabled when drawer is open

### UIForgeBlocksEditor

A rich, block-based content editor for flexible layouts and content creation.

**Features:**

- **Block-based editing** - Create, move, and delete content blocks (text, headings, images, quotes, code)
- **Rich formatting** - WYSIWYG controls for bold, italic, underline, inline code, and more
- **Drag-and-drop** - Intuitive reordering of content blocks
- **Multiple block types** - Paragraphs, headings, lists, quotes, code blocks, and images
- **Export capabilities** - Export content to JSON, HTML, or Markdown
- **No HTML/CSS knowledge required** - User-friendly interface for non-technical users
- **Reusable component** - Easy integration into any React application

```tsx
import {
  UIForgeBlocksEditor,
  blocksToHTML,
  blocksToMarkdown,
  ContentBlock,
} from '@appforgeapps/uiforge'

function MyEditor() {
  const [blocks, setBlocks] = useState<ContentBlock[]>([])

  const handleExport = () => {
    // Export to HTML
    const html = blocksToHTML(blocks)
    console.log(html)

    // Export to Markdown
    const markdown = blocksToMarkdown(blocks)
    console.log(markdown)
  }

  return (
    <>
      <UIForgeBlocksEditor
        initialBlocks={blocks}
        onChange={setBlocks}
        placeholder="Start typing..."
      />
      <button onClick={handleExport}>Export Content</button>
    </>
  )
}
```

**Props Reference:**

| Prop            | Type                               | Default             | Description                              |
| --------------- | ---------------------------------- | ------------------- | ---------------------------------------- |
| `initialBlocks` | `ContentBlock[]`                   | `[]`                | Initial blocks to display                |
| `onChange`      | `(blocks: ContentBlock[]) => void` | -                   | Callback when blocks change              |
| `placeholder`   | `string`                           | `"Start typing..."` | Placeholder text for empty editor        |
| `readOnly`      | `boolean`                          | `false`             | Whether the editor is read-only          |
| `className`     | `string`                           | -                   | Additional CSS classes                   |
| `maxHeight`     | `string`                           | -                   | Maximum height of the editor (CSS value) |

**Block Types:**

- `paragraph` - Standard text block
- `heading1`, `heading2`, `heading3` - Heading blocks
- `list` - List item
- `quote` - Blockquote
- `code` - Code block
- `image` - Image with URL and alt text

**Export Functions:**

- `blocksToHTML(blocks)` - Convert blocks to HTML string
- `blocksToMarkdown(blocks)` - Convert blocks to Markdown string
- `blocksToJSON(blocks)` - Convert blocks to JSON string

### UIForgeGrid

A feature-rich data grid component with selection, editing, search, pagination, and custom actions.

```tsx
import { UIForgeGrid, GridColumn } from '@appforgeapps/uiforge'

interface User {
  id: number
  name: string
  email: string
  role: string
}

const columns: GridColumn<User>[] = [
  { key: 'name', header: 'Name', field: 'name', editable: true },
  { key: 'email', header: 'Email', field: 'email' },
  { key: 'role', header: 'Role', field: 'role' },
]

const data: User[] = [
  { id: 1, name: 'Alice', email: 'alice@example.com', role: 'Developer' },
  { id: 2, name: 'Bob', email: 'bob@example.com', role: 'Designer' },
]

function MyGrid() {
  return (
    <UIForgeGrid
      columns={columns}
      data={data}
      selectable
      searchable
      pagination={{ currentPage: 0, pageSize: 10 }}
    />
  )
}
```

**Key Features:**

- **Row Selection**: Enable with `selectable` prop. Includes master checkbox for select all/none.
- **Editable Cells**: Set `editable: true` on column definitions for inline editing.
- **Custom Renderers**: Use `render` function in column definitions for custom cell content.
- **Search**: Enable with `searchable` prop. Supports custom filter functions.
- **Pagination**: Supports both client-side and server-side pagination.
- **Action Buttons**: Add custom action buttons with event handlers.
- **Accessibility**: Full keyboard navigation and ARIA labels.
- **Responsive**: Mobile-friendly design that adapts to different screen sizes.

**Advanced Example:**

```tsx
import { UIForgeGrid, GridColumn, GridActionButton } from '@appforgeapps/uiforge'

const columns: GridColumn<User>[] = [
  {
    key: 'name',
    header: 'Name',
    field: 'name',
    editable: true,
    width: '200px',
  },
  {
    key: 'email',
    header: 'Email',
    field: 'email',
    render: (value) => <a href={`mailto:${value}`}>{value}</a>,
  },
  {
    key: 'status',
    header: 'Status',
    field: 'status',
    render: (value) => <span className={`status-badge status-${value}`}>{value}</span>,
  },
]

const actionButtons: GridActionButton[] = [
  {
    label: 'Export',
    variant: 'primary',
    onClick: (selectedRows) => exportData(selectedRows),
    requiresSelection: true,
  },
  {
    label: 'Delete',
    variant: 'secondary',
    onClick: (selectedRows) => deleteRows(selectedRows),
    requiresSelection: true,
  },
]

function AdvancedGrid() {
  const [currentPage, setCurrentPage] = useState(0)
  const [pageSize, setPageSize] = useState(25)

  return (
    <UIForgeGrid
      columns={columns}
      data={data}
      selectable
      onSelectionChange={(keys, rows) => console.log('Selected:', rows)}
      getRowKey={(row) => row.id}
      onCellEdit={(rowKey, columnKey, newValue) => {
        // Handle cell edit
        console.log('Edit:', rowKey, columnKey, newValue)
      }}
      searchable
      searchPlaceholder="Search users..."
      customFilter={(row, searchTerm) => {
        // Custom search logic
        return row.name.toLowerCase().includes(searchTerm.toLowerCase())
      }}
      actionButtons={actionButtons}
      pagination={{ currentPage, pageSize }}
      onPageChange={setCurrentPage}
      onPageSizeChange={setPageSize}
      pageSizeOptions={[10, 25, 50, 100]}
    />
  )
}
```

**Props Reference:**

| Prop                | Type                                         | Default               | Description                  |
| ------------------- | -------------------------------------------- | --------------------- | ---------------------------- |
| `columns`           | `GridColumn<T>[]`                            | required              | Column definitions           |
| `data`              | `T[]`                                        | required              | Data to display              |
| `selectable`        | `boolean`                                    | `false`               | Enable row selection         |
| `selectedRows`      | `Set<string \| number>`                      | -                     | Controlled selection state   |
| `getRowKey`         | `(row, index) => string \| number`           | `(_, i) => i`         | Function to get unique key   |
| `onSelectionChange` | `(keys, rows) => void`                       | -                     | Selection change handler     |
| `onCellEdit`        | `(rowKey, columnKey, newValue, row) => void` | -                     | Cell edit handler            |
| `searchable`        | `boolean`                                    | `false`               | Enable search                |
| `searchPlaceholder` | `string`                                     | `"Search..."`         | Search input placeholder     |
| `onSearch`          | `(searchTerm) => void`                       | -                     | Search change handler        |
| `customFilter`      | `(row, searchTerm) => boolean`               | -                     | Custom filter function       |
| `pagination`        | `GridPaginationConfig`                       | -                     | Pagination configuration     |
| `onPageChange`      | `(page, pageSize) => void`                   | -                     | Page change handler          |
| `onPageSizeChange`  | `(pageSize) => void`                         | -                     | Page size change handler     |
| `pageSizeOptions`   | `number[]`                                   | `[10, 25, 50, 100]`   | Available page sizes         |
| `actionButtons`     | `GridActionButton[]`                         | `[]`                  | Action button configurations |
| `loading`           | `boolean`                                    | `false`               | Show loading state           |
| `emptyMessage`      | `string`                                     | `"No data available"` | Empty state message          |
| `className`         | `string`                                     | -                     | Additional CSS classes       |

### UIForgeComboBox

A rich, powerful select/combo box component for ReactJS supporting static lists, dynamic server-backed data sources, hierarchical options, and advanced UX features.

**Features:**

- **Dynamic Suggestions** - Filter options as you type with client-side or server-side search
- **Static Data Support** - Simple dropdown selection from a fixed set of items
- **Icons per Option** - Display icons alongside option labels for better visual context
- **Hierarchical/Tree View** - Support for nested, multi-level option structures
- **Non-selectable Headers** - Group options with disabled header rows or section dividers
- **Async Callback Support** - Integrate with APIs for query-as-you-type autocomplete
- **Highly Customizable** - Custom rendering, styling, and behavior
- **Keyboard Navigation** - Full keyboard support (arrows, Enter, Escape, Tab)
- **Accessibility** - ARIA attributes and screen reader support

```tsx
import { UIForgeComboBox, ComboBoxOption } from '@appforgeapps/uiforge'

// Static dropdown
const options: ComboBoxOption[] = [
  { value: 1, label: 'Option 1' },
  { value: 2, label: 'Option 2' },
  { value: 3, label: 'Option 3' },
]

function MyCombo() {
  const [value, setValue] = useState(null)

  return (
    <UIForgeComboBox
      options={options}
      value={value}
      onChange={(val, option) => setValue(val)}
      placeholder="Select an option..."
    />
  )
}
```

**With Icons:**

```tsx
const optionsWithIcons: ComboBoxOption[] = [
  { value: 'home', label: 'Home', icon: '🏠' },
  { value: 'star', label: 'Favorites', icon: '⭐' },
  { value: 'settings', label: 'Settings', icon: '⚙️' },
]

<UIForgeComboBox
  options={optionsWithIcons}
  value={value}
  onChange={(val) => setValue(val)}
  clearable
/>
```

**Hierarchical Options (Tree View):**

```tsx
const hierarchicalOptions: ComboBoxOption[] = [
  {
    value: 'fruits',
    label: 'Fruits',
    disabled: true, // Non-selectable header
    children: [
      { value: 'apple', label: 'Apple', icon: '🍎' },
      { value: 'banana', label: 'Banana', icon: '🍌' },
    ],
  },
  {
    value: 'vegetables',
    label: 'Vegetables',
    disabled: true,
    children: [
      { value: 'carrot', label: 'Carrot', icon: '🥕' },
      { value: 'broccoli', label: 'Broccoli', icon: '🥦' },
    ],
  },
]

<UIForgeComboBox
  options={hierarchicalOptions}
  value={value}
  onChange={(val) => setValue(val)}
/>
```

**Async/Dynamic Search:**

````tsx
const handleSearch = async (searchText: string, signal?: AbortSignal) => {
  // Call your API
  const response = await fetch(`/api/search?q=${searchText}`)
  const results = await response.json()
  return results.map(item => ({
    value: item.id,
    label: item.name,
    icon: item.iconUrl,
  }))
}

  <UIForgeComboBox
  onSearch={handleSearch}
  value={value}
  onChange={(val) => setValue(val)}
  searchable
  debounceMs={300}
  placeholder="Search..."
/>

  **Caching and TTL:**

  ```tsx
  const [clearCache, setClearCache] = useState<(() => void) | null>(null)
  const [forceRefresh, setForceRefresh] = useState<(() => void) | null>(null)

  <UIForgeComboBox
    onSearch={handleSearch}
    searchable
    enableCache // default: false
    cacheTTL={10000} // 10 seconds
    onClearCache={(fn) => setClearCache(() => fn)}
    onForceRefresh={(fn) => setForceRefresh(() => fn)}
   />

  // Clear or force-refresh from parent
  clearCache && clearCache()
  forceRefresh && forceRefresh()
````

````

**Custom Rendering:**

```tsx
const renderOption = (option: ComboBoxOption) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
    {option.icon && <span>{option.icon}</span>}
    <div>
      <div style={{ fontWeight: 'bold' }}>{option.label}</div>
      <div style={{ fontSize: '0.8em', color: '#666' }}>
        {option.data?.description}
      </div>
    </div>
  </div>
)

<UIForgeComboBox
  options={optionsWithDetails}
  renderOption={renderOption}
  value={value}
  onChange={(val) => setValue(val)}
/>
````

**Props Reference:**

| Prop               | Type                                        | Default                 | Description                                                                     |
| ------------------ | ------------------------------------------- | ----------------------- | ------------------------------------------------------------------------------- |
| `options`          | `ComboBoxOption[]`                          | `[]`                    | Static list of options                                                          |
| `value`            | `string \| number \| null`                  | -                       | Selected value                                                                  |
| `onChange`         | `(value, option) => void`                   | -                       | Callback when selection changes                                                 |
| `onSearch`         | `(searchText) => Promise<ComboBoxOption[]>` | -                       | Async callback for dynamic suggestions                                          |
| `placeholder`      | `string`                                    | `"Select an option..."` | Placeholder text                                                                |
| `disabled`         | `boolean`                                   | `false`                 | Whether the combo box is disabled                                               |
| `clearable`        | `boolean`                                   | `false`                 | Show clear button to deselect                                                   |
| `className`        | `string`                                    | -                       | Custom class name                                                               |
| `renderOption`     | `(option) => ReactNode`                     | -                       | Custom option renderer                                                          |
| `renderValue`      | `(option) => ReactNode`                     | -                       | Custom selected value renderer                                                  |
| `loading`          | `boolean`                                   | `false`                 | Show loading indicator                                                          |
| `maxHeight`        | `string`                                    | `"300px"`               | Maximum height for dropdown                                                     |
| `debounceMs`       | `number`                                    | `300`                   | Debounce delay for async search (ms)                                            |
| `searchable`       | `boolean`                                   | `true`                  | Enable search/filter input                                                      |
| `noOptionsMessage` | `string`                                    | `"No options found"`    | Message when no options match                                                   |
| `ariaLabel`        | `string`                                    | -                       | ARIA label for accessibility                                                    |
| `enableCache`      | `boolean`                                   | `false`                 | Enable in-memory caching of identical search queries                            |
| `cacheTTL`         | `number`                                    | -                       | Time-to-live for cache entries in milliseconds (no expiry if omitted)           |
| `refreshOnOpen`    | `boolean`                                   | `false`                 | Re-fetch results on dropdown open even if search text hasn't changed            |
| `onClearCache`     | `(clearFn) => void`                         | -                       | Receives a function to clear the internal cache from the parent component       |
| `onForceRefresh`   | `(forceFn) => void`                         | -                       | Receives a function to force refresh the current search results from the parent |

**ComboBoxOption Interface:**

| Field      | Type               | Description                                        |
| ---------- | ------------------ | -------------------------------------------------- |
| `value`    | `string \| number` | Unique value for the option                        |
| `label`    | `string`           | Display label                                      |
| `icon`     | `React.ReactNode`  | Optional icon (string/emoji or React component)    |
| `disabled` | `boolean`          | Whether the option is non-selectable (for headers) |
| `level`    | `number`           | Nesting level for hierarchical display             |
| `children` | `ComboBoxOption[]` | Child options for tree structures                  |
| `data`     | `unknown`          | Optional custom data                               |

**Keyboard Navigation:**

- `↓` / `↑` - Navigate through options
- `Enter` - Select highlighted option / Toggle dropdown
- `Escape` - Close dropdown
- `Tab` - Close dropdown and move focus

**Accessibility:**

- Full ARIA support (`role="combobox"`, `aria-expanded`, `aria-selected`, etc.)
- Keyboard navigation
- Screen reader friendly
- Focus management

### UIForgeActivityStream / UIForgeActivityStreamEnhanced

A GitHub-inspired activity stream component for displaying user activities, events, and notifications with intelligent grouping, timeline visualization, and theming support.

**Key Features:**

- **Smart Event Grouping** - Automatically combines consecutive events of the same type
- **Nested Hierarchical Grouping** - Sub-groups events by repository or context
- **Timeline Visualization** - Vertical line with markers showing event flow
- **Date Separators** - Month/year labels between time periods
- **Monochrome Icons** - Clean, GitHub-style SVG icons for each event type
- **Expandable Content** - Click grouped events to see individual items
- **Infinite Scroll** - "Show more" bar for progressive loading
- **Light/Dark Themes** - Seamless theme switching with CSS variables
- **Fully Accessible** - Keyboard navigation, ARIA attributes, screen reader support
- **Responsive Design** - Adapts to mobile and desktop viewports

```tsx
import { UIForgeActivityStreamEnhanced, ActivityEvent } from '@appforgeapps/uiforge'

const events: ActivityEvent[] = [
  {
    id: 1,
    type: 'pr',
    title: 'Added dark mode support',
    description: 'Implemented comprehensive dark mode theming',
    timestamp: new Date(),
    metadata: { repository: 'myapp/frontend' },
  },
  {
    id: 2,
    type: 'commit',
    title: 'Fixed authentication bug',
    timestamp: new Date(),
    metadata: { repository: 'myapp/backend' },
  },
  // ... more events
]

<UIForgeActivityStreamEnhanced
  events={events}
  theme="dark"
  enableGrouping={true}
  showTimeline={true}
  showDateSeparators={true}
  groupingThreshold={2}
  onLoadMore={() => loadMoreEvents()}
  pagination={{ currentPage: 0, pageSize: 20, hasMore: true }}
/>
```

**Smart Grouping Example:**

When you have consecutive events of the same type, they're automatically grouped:
- Individual: "Created pull request #123", "Created pull request #124", "Created pull request #125"
- Grouped: "Created 3 pull requests in myapp/frontend" (expandable to see individual PRs)

**Nested Grouping Example:**

When grouped events span multiple repositories:
- Top level: "Created 6 pull requests in 3 repositories"
  - Sub-group: "Created 2 pull requests in myapp/frontend"
  - Sub-group: "Created 1 pull request in myapp/docs"
  - Sub-group: "Created 3 pull requests in myapp/backend"

**Props Reference:**

| Prop                   | Type                        | Default | Description                                    |
| ---------------------- | --------------------------- | ------- | ---------------------------------------------- |
| `events`               | `ActivityEvent[]`           | -       | Array of activity events to display            |
| `theme`                | `'light' \| 'dark'`         | `light` | Theme variant                                  |
| `enableGrouping`       | `boolean`                   | `true`  | Enable smart event grouping                    |
| `groupingThreshold`    | `number`                    | `2`     | Minimum consecutive events to trigger grouping |
| `showTimeline`         | `boolean`                   | `true`  | Show vertical timeline line                    |
| `showDateSeparators`   | `boolean`                   | `true`  | Show month/year date separators                |
| `showLoadMore`         | `boolean`                   | `true`  | Show "Show more" bar                           |
| `loading`              | `boolean`                   | `false` | Display loading indicator                      |
| `onLoadMore`           | `() => void`                | -       | Callback when "Show more" is clicked           |
| `pagination`           | `ActivityStreamPagination`  | -       | Pagination configuration                       |
| `maxHeight`            | `string`                    | -       | Maximum height (CSS value)                     |
| `showMoreThreshold`    | `number`                    | `100`   | Distance from bottom to show "Show more" (px)  |
| `initiallyExpandedAll` | `boolean`                   | `false` | Expand all events initially                    |
| `emptyMessage`         | `string`                    | -       | Empty state message                            |
| `onToggleExpand`       | `(id, expanded) => void`    | -       | Callback when event is expanded/collapsed      |

**ActivityEvent Interface:**

| Field          | Type                        | Description                                |
| -------------- | --------------------------- | ------------------------------------------ |
| `id`           | `string \| number`          | Unique identifier                          |
| `type`         | `string`                    | Event type (e.g., 'commit', 'pr', 'issue') |
| `title`        | `string`                    | Event title/description                    |
| `description`  | `string`                    | Optional detailed description              |
| `timestamp`    | `Date \| string`            | Event timestamp                            |
| `icon`         | `React.ReactNode`           | Optional custom icon                       |
| `metadata`     | `Record<string, unknown>`   | Optional metadata (e.g., repository name)  |

**Supported Event Types (with default icons):**

- `commit` - Code commits
- `pr` - Pull requests
- `issue` - Issues
- `comment` - Comments
- `star` - Repository stars
- `fork` - Repository forks
- `merge` - Merged pull requests
- `release` - Version releases
- `deploy` - Deployments

See `examples/ActivityStreamExample.tsx` for a complete interactive demo.

### UIForgeVideo / UIForgeVideoPreview

Video components for embedding YouTube and Vimeo videos with interactive overlays and preview functionality.

**UIForgeVideo Features:**

- **Video Embedding** - Supports both YouTube and Vimeo video embeds
- **Lazy Loading** - Video player loads only when user clicks to play
- **Custom Thumbnails** - Use custom thumbnail images or provider defaults
- **Overlay Interaction** - Clickable overlay with customizable play icon
- **Event Emission** - Fires callback when video starts playing for analytics/tracking
- **Responsive Design** - Adjustable aspect ratios and mobile-friendly
- **Accessibility** - Proper ARIA labels and keyboard navigation

**UIForgeVideoPreview Features:**

- **Compact Display** - Small preview component with title and icon
- **Interactive** - Optional click handler for navigation
- **Customizable Icons** - Support for custom icons or emojis
- **Lightweight** - Perfect for video lists and catalogs

```tsx
import { UIForgeVideo, UIForgeVideoPreview } from '@appforgeapps/uiforge'

// YouTube video with event tracking
<UIForgeVideo
  title="Introduction to React"
  description="Learn React basics in this comprehensive tutorial"
  youtubeId="dQw4w9WgXcQ"
  onPlay={(videoId, provider) => {
    console.log(`Playing ${provider} video: ${videoId}`)
    trackAnalytics('video_play', { videoId, provider })
  }}
/>

// Vimeo video
<UIForgeVideo
  title="Beautiful Nature Footage"
  description="Stunning visuals from around the world"
  vimeoId="76979871"
  onPlay={(videoId, provider) => {
    console.log('Video started')
  }}
/>

// Custom thumbnail and aspect ratio
<UIForgeVideo
  title="Classic Format Video"
  youtubeId="abc123"
  thumbnailUrl="https://example.com/custom-thumb.jpg"
  aspectRatio="4/3"
  onPlay={handlePlay}
/>

// Custom overlay icon
<UIForgeVideo
  title="Video with Custom Play Button"
  youtubeId="xyz789"
  overlayIcon={<span style={{ fontSize: '64px' }}>▶️</span>}
  onPlay={handlePlay}
/>

// Video preview component
<UIForgeVideoPreview
  title="Tutorial: Getting Started"
  icon={<span>🎓</span>}
  onClick={() => navigateToVideo('tutorial-123')}
/>
```

**UIForgeVideo Props:**

| Prop           | Type                                        | Default    | Description                                   |
| -------------- | ------------------------------------------- | ---------- | --------------------------------------------- |
| `title`        | `string`                                    | required   | Video title                                   |
| `description`  | `string`                                    | -          | Optional video description                    |
| `youtubeId`    | `string`                                    | -          | YouTube video ID (required if no vimeoId)     |
| `vimeoId`      | `string`                                    | -          | Vimeo video ID (required if no youtubeId)     |
| `thumbnailUrl` | `string`                                    | -          | Custom thumbnail URL (optional)               |
| `onPlay`       | `(videoId, provider) => void`               | -          | Callback when video starts playing            |
| `className`    | `string`                                    | -          | Additional CSS classes                        |
| `overlayIcon`  | `React.ReactNode`                           | Play icon  | Custom overlay icon                           |
| `aspectRatio`  | `string`                                    | `"16/9"`   | Video aspect ratio (CSS value)                |

**UIForgeVideoPreview Props:**

| Prop        | Type              | Default  | Description                    |
| ----------- | ----------------- | -------- | ------------------------------ |
| `title`     | `string`          | required | Video title                    |
| `icon`      | `React.ReactNode` | -        | Optional custom icon           |
| `className` | `string`          | -        | Additional CSS classes         |
| `onClick`   | `() => void`      | -        | Click handler (makes it interactive) |

**Use Cases:**

- Video tutorials and educational content
- Product demos and walkthroughs
- Marketing videos and testimonials
- Video galleries and catalogs
- Course content and lessons
- Conference talks and presentations

See `examples/VideoExample.tsx` for a complete interactive demo with multiple examples.

## Mobile Responsiveness

UIForge components are designed with mobile-first responsive behavior built in. Components automatically adapt to different screen sizes using **container-based responsiveness** rather than viewport-based media queries. This allows components to respond to their container's width, making them work seamlessly in sidebars, modals, or any constrained layout.

### Responsive Hooks

UIForge provides two powerful hooks for building responsive layouts:

#### useResponsive

A container-width based responsive helper that determines whether a container is "compact" by measuring its width.

```tsx
import { useRef } from 'react'
import { useResponsive } from '@appforgeapps/uiforge'

function ResponsiveCard() {
  const cardRef = useRef<HTMLDivElement>(null)
  const isCompact = useResponsive(cardRef, 640) // default breakpoint is 640px

  return (
    <div ref={cardRef} className="card">
      {isCompact ? (
        <div>Mobile Layout - Stack vertically</div>
      ) : (
        <div>Desktop Layout - Side by side</div>
      )}
    </div>
  )
}
```

**Key Benefits:**
- Container-aware: responds to container width, not just window width
- Works in any context: sidebars, modals, grid cells, etc.
- Uses ResizeObserver for efficient updates
- SSR-safe with sensible defaults

#### useDynamicPageCount

Automatically calculates optimal page size for paginated lists based on container height and item measurements.

```tsx
import { useRef } from 'react'
import { useDynamicPageCount } from '@appforgeapps/uiforge'

function PaginatedList({ items }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const pageSize = useDynamicPageCount(containerRef, {
    sampleCount: 3,     // Measure first 3 items
    min: 5,             // Show at least 5 items
    max: 20,            // Show at most 20 items
    approxItemHeight: 100
  })

  return (
    <div ref={containerRef} style={{ height: '600px', overflow: 'auto' }}>
      {items.slice(0, pageSize).map(item => (
        <ListItem key={item.id} {...item} />
      ))}
    </div>
  )
}
```

See `examples/UseDynamicPageCountExample.tsx` for a complete demo.

### Responsive Components

Several UIForge components have built-in responsive behavior:

#### ActivityStream Responsive Features

The `UIForgeActivityStream` component automatically adapts to narrow containers:

```tsx
import { UIForgeActivityStream } from '@appforgeapps/uiforge'

function ActivityFeed() {
  return (
    <UIForgeActivityStream
      events={events}
      
      // Density modes
      density="comfortable"      // 'comfortable' | 'compact' | 'condensed'
      
      // Automatic responsive behavior (enabled by default)
      responsive={true}          // Auto-switch to compact on narrow containers
      compactBreakpointPx={640}  // Threshold for switching (default: 640px)
      
      // Control metadata visibility
      showMeta={true}            // Show/hide timestamps and descriptions
      
      // Virtualization for large lists
      virtualization={false}     // Enable for 100+ items
      virtualItemHeight={48}     // Item height when virtualized
    />
  )
}
```

**Density Modes:**
- `comfortable`: Default spacing with full metadata (desktop)
- `compact`: Reduced spacing, ideal for tablets and narrow screens
- `condensed`: Minimal spacing for maximum information density

**Responsive Behavior:**
When `responsive={true}` (default), the component automatically switches from `comfortable` to `compact` density when the container width falls below `compactBreakpointPx`.

**Example Use Cases:**
- Main content area: Use `comfortable` density with responsive switching
- Sidebar panel: Use `compact` density or enable responsive
- Dashboard widget: Use `condensed` for maximum information density
- Large datasets: Enable `virtualization` for 100+ items

```tsx
// Sidebar example - always compact
<UIForgeActivityStream 
  events={events} 
  density="compact"
  responsive={false}
/>

// Responsive main feed - adapts automatically
<UIForgeActivityStream 
  events={events} 
  density="comfortable"
  responsive={true}
  compactBreakpointPx={640}
/>

// Large list with virtualization
<UIForgeActivityStream 
  events={manyEvents} 
  virtualization={true}
  virtualItemHeight={48}
  maxHeight="600px"
  density="compact"
/>
```

See `examples/ActivityStreamExample.tsx` for an interactive demo with density controls.

#### Sidebar Responsive Variants

The `UIForgeSidebar` component provides three variants optimized for different screen sizes:

```tsx
import { useState } from 'react'
import { UIForgeSidebar, HamburgerButton } from '@appforgeapps/uiforge'

function ResponsiveLayout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <>
      {/* Desktop: Static sidebar */}
      <div className="desktop-only">
        <UIForgeSidebar variant="static" width="280px">
          <nav>Navigation items</nav>
        </UIForgeSidebar>
      </div>

      {/* Mobile: Drawer sidebar */}
      <div className="mobile-only">
        <HamburgerButton
          isOpen={mobileMenuOpen}
          controlsId="mobile-nav"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        />
        <UIForgeSidebar
          id="mobile-nav"
          variant="drawer"
          open={mobileMenuOpen}
          onOpenChange={setMobileMenuOpen}
          position="left"
        >
          <nav>Navigation items</nav>
        </UIForgeSidebar>
      </div>

      {/* Mobile: Bottom sheet variant */}
      <UIForgeSidebar
        variant="bottom"
        open={bottomSheetOpen}
        onOpenChange={setBottomSheetOpen}
        height="300px"
      >
        <div>Bottom sheet content</div>
      </UIForgeSidebar>
    </>
  )
}
```

**Sidebar Variants:**
- `static`: Always visible, takes up layout space (desktop)
- `drawer`: Slide-in overlay panel (mobile/tablet)
- `bottom`: Bottom sheet for mobile actions

See `examples/SidebarExample.tsx` for complete examples of all variants.

#### Video Player Responsive Behavior

The `UIForgeVideo` component automatically adjusts its aspect ratio and embed behavior for different screen sizes:

```tsx
import { UIForgeVideo } from '@appforgeapps/uiforge'

function VideoSection() {
  return (
    <UIForgeVideo
      url="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
      aspectRatio="16:9"  // Maintains aspect ratio on all devices
      controls={true}
      autoplay={false}
    />
  )
}
```

The video player automatically:
- Maintains aspect ratio on all screen sizes
- Uses responsive embed containers
- Adapts controls for touch devices
- Handles safe-area insets on mobile devices

### Best Practices for Responsive Design

1. **Use Container Queries**: Leverage `useResponsive` hook instead of viewport-based media queries for components that may appear in different contexts (sidebars, modals, grid cells).

2. **Choose Appropriate Density**: 
   - Desktop/wide layouts: `comfortable`
   - Tablet/medium layouts: `compact` 
   - Mobile/narrow layouts: `compact` or `condensed`
   - Enable `responsive={true}` to automatically switch

3. **Virtualize Large Lists**: Enable virtualization for ActivityStream with 100+ items to maintain smooth scrolling on mobile devices.

4. **Test in Constrained Contexts**: Components should work well in sidebars, modals, and grid cells, not just full-width layouts.

5. **Consider Touch Targets**: UIForge components follow WCAG guidelines with minimum 44×44px touch targets by default.

### Migration from Viewport-Based Responsive Design

If you're currently using viewport-based media queries, here's how to migrate to container-based responsiveness:

**Before (viewport-based):**
```tsx
function MyComponent() {
  const isMobile = window.innerWidth < 768
  
  return (
    <div>
      {isMobile ? <MobileView /> : <DesktopView />}
    </div>
  )
}
```

**After (container-based):**
```tsx
import { useRef } from 'react'
import { useResponsive } from '@appforgeapps/uiforge'

function MyComponent() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isCompact = useResponsive(containerRef, 768)
  
  return (
    <div ref={containerRef}>
      {isCompact ? <MobileView /> : <DesktopView />}
    </div>
  )
}
```

This approach ensures your component adapts to its container, making it reusable in different contexts like sidebars, modals, or grid layouts.

## Hooks

### useResponsive

A container-width based responsive helper hook that determines whether a container element is "compact" by measuring its width with a `ResizeObserver`. This allows components to adapt to the width of their container rather than the global `window.innerWidth`.

```tsx
import { useRef } from 'react'
import { useResponsive } from '@appforgeapps/uiforge'

function ResponsiveComponent() {
  const containerRef = useRef<HTMLDivElement>(null)
  
  // Returns true when container width < 640px
  const isCompact = useResponsive(containerRef, 640)

  return (
    <div ref={containerRef}>
      {isCompact ? (
        <MobileLayout />
      ) : (
        <DesktopLayout />
      )}
    </div>
  )
}
```

**Features:**

- **Container-based** - Responds to container width, not viewport width
- **ResizeObserver** - Efficient observation of element size changes
- **SSR Safe** - Returns `false` by default when ref is null
- **Customizable** - Specify any breakpoint in pixels

**API Reference:**

| Parameter      | Type                                     | Default | Description                                |
| -------------- | ---------------------------------------- | ------- | ------------------------------------------ |
| `containerRef` | `RefObject<HTMLElement \| null> \| null` | -       | Ref to the container element to observe    |
| `breakpointPx` | `number`                                 | `640`   | Width threshold in pixels                  |

**Returns:** `boolean` - `true` when `containerRef.current.clientWidth < breakpointPx`, `false` otherwise.

See `examples/UseResponsiveExample.tsx` for a complete interactive demo.

### useDynamicPageCount

A hook that dynamically calculates the optimal page size for paginated lists based on the container's available height and measured item heights. This ensures you always show the right number of items to fill the viewport without excessive scrolling.

```tsx
import { useRef } from 'react'
import { useDynamicPageCount } from '@appforgeapps/uiforge'

function DynamicPaginatedList({ items }) {
  const containerRef = useRef<HTMLDivElement>(null)
  
  const pageSize = useDynamicPageCount(containerRef, {
    sampleCount: 3,        // Number of items to measure for height
    min: 3,                // Minimum page size
    max: 15,               // Maximum page size
    approxItemHeight: 120  // Fallback height when items aren't rendered
  })

  return (
    <div ref={containerRef} style={{ height: '600px', overflow: 'auto' }}>
      {items.slice(0, pageSize).map(item => (
        <ListItem key={item.id} {...item} />
      ))}
      {items.length > pageSize && (
        <button onClick={loadMore}>Load More</button>
      )}
    </div>
  )
}
```

**Features:**

- **Dynamic Calculation** - Automatically recalculates when container resizes
- **Smart Sampling** - Measures actual rendered items for accurate height estimation
- **Responsive** - Adapts to different screen sizes and orientations
- **Performant** - Uses ResizeObserver and MutationObserver efficiently
- **Configurable Bounds** - Set min/max limits to control page sizes

**API Reference:**

| Parameter            | Type                                     | Default | Description                                      |
| -------------------- | ---------------------------------------- | ------- | ------------------------------------------------ |
| `containerRef`       | `RefObject<HTMLElement \| null> \| null` | -       | Ref to the scrollable container element          |
| `options.sampleCount`| `number`                                 | `3`     | Number of items to measure for average height    |
| `options.min`        | `number`                                 | `3`     | Minimum page size to return                      |
| `options.max`        | `number`                                 | `15`    | Maximum page size to return                      |
| `options.approxItemHeight` | `number`                           | `120`   | Approximate item height for fallback calculations|

**Returns:** `number` - The calculated page size, clamped to `[min, max]` range.

**Use Cases:**
- Activity feeds with variable-height items
- Product listings with images
- Search results with descriptions
- Any paginated content where you want to fill the viewport optimally

See `examples/UseDynamicPageCountExample.tsx` for a complete interactive demo.

## Theming

UIForge components support comprehensive theming through CSS variables. See [THEMING.md](./THEMING.md) for a complete guide on:

- Light and dark theme support
- Custom theme creation
- CSS variable reference
- System preference detection
- Advanced customization techniques

Quick example:

```tsx
import { useState } from 'react'

function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light')

  return (
    <div>
      <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
        Toggle Theme
      </button>
      <UIForgeActivityStreamEnhanced events={events} theme={theme} />
    </div>
  )
}
```

## Mobile Header Best Practices

For building mobile headers with `MobileHeaderLayout`, `IconButton`, `SafeAreaContainer`, and `OverflowMenu`, see [MOBILE_HEADER_BEST_PRACTICES.md](./MOBILE_HEADER_BEST_PRACTICES.md) for:

- Touch target guidelines (44×44px minimum)
- ARIA label requirements for accessibility
- Recommended header height (56px)
- Safe area usage for notched devices
- When to use overflow menus vs primary actions
- Layout vs behavior separation rationale

See `examples/CourseForgeMobileHeaderExample.tsx` for a complete composition example demonstrating these patterns.

## Development

### Prerequisites

- Node.js 18+ and npm

### Getting Started

1. Clone the repository:

```bash
git clone https://github.com/chriscase/UIForge.git
cd UIForge
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

This will start a local development server where you can see and interact with the components.

### Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the library for production
- `npm run preview` - Preview the production build
- `npm test` - Run tests in watch mode
- `npm run test:ui` - Run tests with UI
- `npm run test:coverage` - Generate test coverage report
- `npm run lint` - Lint the codebase
- `npm run lint:fix` - Fix linting issues
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting

### Testing

Tests are written using Vitest and React Testing Library:

```bash
npm test
```

### Building

Build the library for production:

```bash
npm run build
```

The built files will be in the `dist` directory.

### Development with GitHub Tools

This repository is optimized for development using:

- **GitHub Codespaces** - One-click cloud development environment
- **GitHub Copilot** - AI-powered code completion

Simply open this repository in GitHub Codespaces to get started immediately with all dependencies pre-installed!

## Contributing

Contributions are welcome! Please see [CONTRIBUTING.md](./CONTRIBUTING.md) for detailed guidelines.

Quick start:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## For Maintainers

If you're a maintainer looking to publish releases or manage the project, please see [MAINTAINER_INSTRUCTIONS.md](./MAINTAINER_INSTRUCTIONS.md) for comprehensive publishing and maintenance workflows.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Author

**chriscase**

## Acknowledgments

- Built with [Vite](https://vitejs.dev/)
- Tested with [Vitest](https://vitest.dev/)
- Styled with CSS
