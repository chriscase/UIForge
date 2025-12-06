# UIForge

A rich user interface library for ReactJS developers written by a seasoned user interface developer who loves working with ReactJS.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18%2F19-61dafb)](https://reactjs.org/)

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
npm install @chriscase/uiforge
```

Or with yarn:

```bash
yarn add @chriscase/uiforge
```

Or with pnpm:

```bash
pnpm add @chriscase/uiforge
```

### Using UIForge in Your Project

After installation, you'll need to import both the components and the CSS styles in your application.

#### Method 1: Import in your main entry file (Recommended)

This is the most common approach - import the styles once in your application's entry point:

```tsx
// src/main.tsx or src/index.tsx
import '@chriscase/uiforge/styles.css'
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
import { Button, UIForgeGrid, UIForgeComboBox } from '@chriscase/uiforge'

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
import '@chriscase/uiforge/styles.css'
import { Button } from '@chriscase/uiforge'

export function MyComponent() {
  return <Button variant="primary">Click Me</Button>
}
```

#### Method 3: Import in your global CSS file

You can also import UIForge styles in your main CSS file:

```css
/* src/index.css or src/App.css */
@import '@chriscase/uiforge/styles.css';

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
import { Button } from '@chriscase/uiforge'
import '@chriscase/uiforge/styles.css'
```

#### Next.js (App Router)

For Next.js 13+ with the App Router, import styles in your root layout:

```tsx
// app/layout.tsx
import '@chriscase/uiforge/styles.css'
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
import { Button } from '@chriscase/uiforge'

export default function Home() {
  return <Button variant="primary">Click Me</Button>
}
```

#### Next.js (Pages Router)

For Next.js with the Pages Router, import styles in `_app.tsx`:

```tsx
// pages/_app.tsx
import '@chriscase/uiforge/styles.css'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
```

#### Create React App

Import styles in your `index.tsx` or `App.tsx`:

```tsx
// src/index.tsx
import '@chriscase/uiforge/styles.css'
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
   npm list @chriscase/uiforge
   ```

2. **Types are available** (TypeScript projects):
   ```tsx
   import type { ButtonProps } from '@chriscase/uiforge'
   // If this imports without errors, types are working
   ```

3. **Create a simple test component:**
   ```tsx
   import { Button } from '@chriscase/uiforge'
   import '@chriscase/uiforge/styles.css'

   export function Test() {
     return <Button variant="primary">Test</Button>
   }
   ```

### Troubleshooting

**Issue: "Cannot find module '@chriscase/uiforge'"**
- Run `npm install` to ensure dependencies are installed
- Check that `@chriscase/uiforge` is in your `package.json` dependencies
- Try deleting `node_modules` and `package-lock.json`, then run `npm install` again

**Issue: Styles not loading**
- Ensure you've imported the CSS: `import '@chriscase/uiforge/styles.css'`
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
cd node_modules/@chriscase/uiforge
npm install
npm run build
```

Or use a `postinstall` script in your project to automate this:

```json
{
  "scripts": {
    "postinstall": "cd node_modules/@chriscase/uiforge && npm install && npm run build"
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
import { Button } from '@chriscase/uiforge'
import '@chriscase/uiforge/styles.css' // Import styles

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
npm install @chriscase/uiforge react react-dom
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
} from '@chriscase/uiforge'
import '@chriscase/uiforge/styles.css'

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
    "@chriscase/uiforge": "^0.1.0",
    "react": "^18.0.0",
    "react-dom": "^18.0.0"
  }
}
```

### TypeScript Support

UIForge is written in TypeScript and includes full type definitions. TypeScript will automatically pick up the types when you import components:

```tsx
import { Button, ButtonProps, UIForgeComboBox, ComboBoxOption } from '@chriscase/uiforge'

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
import '@chriscase/uiforge/styles.css'
import App from './App'
```

**Option 2: Import in your component file**

```tsx
// src/App.tsx
import '@chriscase/uiforge/styles.css'
import { Button } from '@chriscase/uiforge'
```

**Option 3: Import in your global CSS file**

```css
/* src/index.css */
@import '@chriscase/uiforge/styles.css';
```

## Components

### Button

A customizable button component with multiple variants and sizes.

```tsx
import { Button } from '@chriscase/uiforge'

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
```

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
} from '@chriscase/uiforge'

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
import { UIForgeGrid, GridColumn } from '@chriscase/uiforge'

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
import { UIForgeGrid, GridColumn, GridActionButton } from '@chriscase/uiforge'

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
import { UIForgeComboBox, ComboBoxOption } from '@chriscase/uiforge'

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
import { UIForgeActivityStreamEnhanced, ActivityEvent } from '@chriscase/uiforge'

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
import { UIForgeVideo, UIForgeVideoPreview } from '@chriscase/uiforge'

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

## Publishing to NPM

This section provides comprehensive instructions for maintainers who want to publish UIForge to NPM. It covers the entire publishing workflow, from initial setup to post-release verification.

### Initial Setup (One-Time)

Before you can publish to NPM, you need to set up your NPM account and access:

#### 1. Create an NPM Account

If you don't have an NPM account:

1. Go to [npmjs.com](https://www.npmjs.com/)
2. Click "Sign Up"
3. Follow the registration process
4. Verify your email address

#### 2. Enable Two-Factor Authentication (Required)

NPM requires 2FA for publishing packages:

1. Log in to [npmjs.com](https://www.npmjs.com/)
2. Go to your account settings
3. Navigate to "Two-Factor Authentication"
4. Enable 2FA (choose "Authorization and Publishing" or "Authorization Only")
5. Save your backup codes in a secure location

#### 3. Log In to NPM from Command Line

```bash
npm login
```

You'll be prompted for:
- Username
- Password
- Email
- One-time password (if 2FA is enabled)

Verify you're logged in:

```bash
npm whoami
```

This should display your NPM username.

#### 4. Verify Package Name Availability

The package name `@chriscase/uiforge` is a scoped package under the `@chriscase` scope. Ensure:

1. You have access to publish under this scope
2. The package name is available (or you own it)

Check package info:

```bash
npm view @chriscase/uiforge
```

If the package doesn't exist yet, this will return an error (which is expected for first publication).

#### 5. Configure Package Access

For scoped packages, you need to set public access in `package.json`:

```json
{
  "publishConfig": {
    "access": "public"
  }
}
```

This is already configured in UIForge.

### Pre-Publishing Checklist

Before publishing a new version, verify the following:

#### 1. Code Quality

```bash
# Run linter
npm run lint

# Fix any auto-fixable issues
npm run lint:fix

# Check code formatting
npm run format:check

# Fix formatting issues
npm run format
```

#### 2. Tests Pass

```bash
# Run all tests
npm test -- --run

# Generate coverage report (optional)
npm run test:coverage
```

Ensure all tests pass with no failures.

#### 3. Build Successfully

```bash
# Clean previous build
rm -rf dist/

# Build the library
npm run build
```

Verify the `dist/` directory contains:
- `uiforge.js` (ESM bundle)
- `uiforge.cjs` (CommonJS bundle)
- `uiforge.css` (Styles)
- `index.d.ts` (TypeScript declarations)

#### 4. Update Documentation

1. **Update CHANGELOG.md**: Document all changes in this release
   ```markdown
   ## [0.2.0] - 2025-01-15
   
   ### Added
   - New UIForgeModal component
   - Support for custom themes
   
   ### Fixed
   - Button hover state in dark mode
   
   ### Changed
   - Updated peer dependencies
   ```

2. **Update README.md**: If you added new components or features, update the README with usage examples

3. **Review package.json**: Ensure all fields are up-to-date
   - `version`: Will be updated in next step
   - `description`: Should be current
   - `keywords`: Should reflect all major features
   - `repository`, `bugs`, `homepage`: Should be correct

### Version Numbering

UIForge follows [Semantic Versioning](https://semver.org/) (SemVer):

- **MAJOR** version (e.g., 1.0.0 → 2.0.0): Breaking changes
- **MINOR** version (e.g., 1.0.0 → 1.1.0): New features, backward compatible
- **PATCH** version (e.g., 1.0.0 → 1.0.1): Bug fixes, backward compatible

#### Choosing the Right Version

- **Patch Release** (0.1.0 → 0.1.1):
  - Bug fixes
  - Documentation updates
  - Performance improvements (no API changes)
  - Internal refactoring

- **Minor Release** (0.1.0 → 0.2.0):
  - New components
  - New features/props on existing components
  - New utility functions
  - Deprecations (but not removals)

- **Major Release** (0.1.0 → 1.0.0):
  - Removing deprecated features
  - Changing component APIs (props, behavior)
  - Updating peer dependencies with breaking changes
  - Significant architectural changes

### Publishing Steps

#### Step 1: Update Version

Use npm's built-in version command:

```bash
# For a patch release (bug fixes)
npm version patch

# For a minor release (new features, backward compatible)
npm version minor

# For a major release (breaking changes)
npm version major
```

This command will:
1. Update the version in `package.json`
2. Create a git commit with message "vX.Y.Z"
3. Create a git tag "vX.Y.Z"

If you need more control, you can specify the exact version:

```bash
npm version 0.2.0
```

Or update manually:
1. Edit `package.json` and change the `version` field
2. Commit the change: `git commit -am "Release v0.2.0"`
3. Create a tag: `git tag v0.2.0`

#### Step 2: Final Build and Test

```bash
# Clean and rebuild
rm -rf dist/
npm run build

# Run tests one more time
npm test -- --run
```

#### Step 3: Test the Package Locally (Optional but Recommended)

Before publishing to NPM, test the package in a local project:

```bash
# In UIForge directory, create a package tarball
npm pack
```

This creates a file like `chriscase-uiforge-0.2.0.tgz`.

Then in a test project:

```bash
# Install from the tarball
npm install /path/to/chriscase-uiforge-0.2.0.tgz

# Test that imports work
# Test that styles load
# Test that TypeScript types work
```

#### Step 4: Publish to NPM

```bash
# Dry run to see what would be published (optional)
npm publish --dry-run

# Actually publish
npm publish
```

If you have 2FA enabled (recommended), you'll be prompted for your one-time password.

The `prepublishOnly` script in `package.json` will automatically run `npm run build` before publishing, ensuring the latest build is included.

#### Step 5: Push Tags to GitHub

```bash
# Push the version commit
git push origin main

# Push the version tag
git push origin --tags

# Or push both at once
git push origin main --tags
```

#### Step 6: Create GitHub Release

1. Go to [github.com/chriscase/UIForge/releases](https://github.com/chriscase/UIForge/releases)
2. Click "Draft a new release"
3. Choose the tag you just created (e.g., v0.2.0)
4. Set the release title (e.g., "v0.2.0")
5. Copy the relevant section from CHANGELOG.md into the description
6. Click "Publish release"

Alternatively, use the GitHub CLI:

```bash
gh release create v0.2.0 --title "v0.2.0" --notes "$(cat CHANGELOG.md | sed -n '/## \[0.2.0\]/,/## \[/p' | sed '$ d')"
```

### Post-Publishing Verification

After publishing, verify everything worked correctly:

#### 1. Check NPM Package Page

Visit [npmjs.com/package/@chriscase/uiforge](https://www.npmjs.com/package/@chriscase/uiforge)

Verify:
- Version number is correct
- README displays properly
- Package size is reasonable
- All files are included

#### 2. Test Installation in a Fresh Project

```bash
# Create a test project
npx create-vite@latest test-uiforge --template react-ts
cd test-uiforge

# Install UIForge
npm install @chriscase/uiforge

# Add a quick test
# Edit src/App.tsx to import and use a component
npm run dev
```

#### 3. Check TypeScript Types

In your test project:

```tsx
import { Button, ButtonProps } from '@chriscase/uiforge'

// TypeScript should provide autocomplete and type checking
const props: ButtonProps = {
  variant: 'primary',
  children: 'Test'
}
```

#### 4. Verify on unpkg.com

Your package should be available on unpkg CDN:

- Main file: `https://unpkg.com/@chriscase/uiforge@latest/dist/uiforge.js`
- CSS: `https://unpkg.com/@chriscase/uiforge@latest/dist/uiforge.css`
- Types: `https://unpkg.com/@chriscase/uiforge@latest/dist/index.d.ts`

#### 5. Update Documentation Sites

If you have example projects or documentation sites:

1. Update their `package.json` to use the new version
2. Test that everything still works
3. Deploy updated documentation

#### 6. Add NPM Badge (After First Publication)

After the first successful publication to NPM, add the NPM version badge to the README:

```markdown
[![npm version](https://img.shields.io/npm/v/@chriscase/uiforge.svg)](https://www.npmjs.com/package/@chriscase/uiforge)
```

Add this badge at the top of the README alongside the other badges (License, TypeScript, React).

### Troubleshooting

#### Issue: "You do not have permission to publish"

**Solution:**
- Verify you're logged in: `npm whoami`
- Check you have access to the `@chriscase` scope
- For scoped packages, ensure `publishConfig.access` is set to `"public"` in package.json

#### Issue: "Version X.Y.Z already exists"

**Solution:**
- You cannot republish the same version
- Increment the version number: `npm version patch`
- Or if you made a mistake, unpublish (only works within 72 hours): `npm unpublish @chriscase/uiforge@X.Y.Z`

#### Issue: "Package size exceeds recommended limit"

**Solution:**
- Check what's being included: `npm publish --dry-run`
- Ensure `.npmignore` excludes unnecessary files
- Verify `files` field in `package.json` only includes `dist/`
- Check for large files in `dist/` (optimize if needed)

#### Issue: "prepublishOnly script failed"

**Solution:**
- Run `npm run build` manually to see the error
- Fix any build errors
- Ensure all dependencies are installed: `npm install`

### Rolling Back a Release

If you need to unpublish a version (use with caution):

```bash
# Unpublish a specific version (only within 72 hours)
npm unpublish @chriscase/uiforge@X.Y.Z

# To deprecate a version instead (preferred)
npm deprecate @chriscase/uiforge@X.Y.Z "This version has critical bugs, please upgrade"
```

**Note:** Unpublishing is discouraged as it can break projects depending on that version. Prefer publishing a patch version with fixes instead.

### Automation (Advanced)

For automated publishing, consider setting up:

#### GitHub Actions for Publishing

Create `.github/workflows/publish.yml`:

```yaml
name: Publish to NPM

on:
  release:
    types: [published]

jobs:
  publish:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
          registry-url: 'https://registry.npmjs.org'
      - run: npm ci
      - run: npm test -- --run
      - run: npm run build
      - run: npm publish
        env:
          NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}
```

To use this:
1. Create an NPM access token (with Automation type)
2. Add it to GitHub Secrets as `NPM_TOKEN`
3. Create a GitHub release to trigger publishing

### Best Practices

1. **Always test before publishing** - Run tests and build locally
2. **Use semantic versioning** - Follow SemVer strictly
3. **Keep CHANGELOG.md updated** - Document all changes
4. **Test in real projects** - Use `npm pack` and test locally first
5. **Announce releases** - Post about significant releases on social media, blogs, etc.
6. **Monitor issues** - Watch for bug reports after publishing
7. **Version carefully** - Once published, versions are permanent
8. **Use GitHub Releases** - Keep GitHub releases in sync with NPM versions
9. **Document breaking changes** - Make migration guides for major versions
10. **Keep dependencies updated** - Regularly update peer dependencies

### Publishing Schedule

Consider establishing a regular release schedule:

- **Patch releases**: As needed for critical bugs (within days)
- **Minor releases**: Monthly or quarterly for new features
- **Major releases**: Annually or when significant breaking changes accumulate

This helps users anticipate updates and plan migrations.

## Contributing

Contributions are welcome! Please see [CONTRIBUTING.md](./CONTRIBUTING.md) for detailed guidelines.

Quick start:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Author

**chriscase**

## Acknowledgments

- Built with [Vite](https://vitejs.dev/)
- Tested with [Vitest](https://vitest.dev/)
- Styled with CSS
