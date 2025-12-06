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

### From NPM (Coming Soon)

```bash
npm install @chriscase/uiforge
```

or with yarn:

```bash
yarn add @chriscase/uiforge
```

or with pnpm:

```bash
pnpm add @chriscase/uiforge
```

### Direct from GitHub (Recommended for Development)

You can install UIForge directly from the GitHub repository. This is perfect for development workflows where you want the latest changes or are working across multiple related projects.

#### Install a specific branch, tag, or commit:

```bash
# Install from main branch
npm install chriscase/UIForge

# Install from a specific branch
npm install chriscase/UIForge#feature-branch

# Install from a specific tag
npm install chriscase/UIForge#v0.1.0

# Install from a specific commit
npm install chriscase/UIForge#commit-hash
```

#### Using in package.json:

Add this to your `package.json` dependencies:

```json
{
  "dependencies": {
    "@chriscase/uiforge": "github:chriscase/UIForge#main"
  }
}
```

Then run:

```bash
npm install
```

#### Important Notes for GitHub Installation:

1. **Build artifacts are included**: The `dist` folder with pre-built files is included in the repository, so you don't need to build the library after installation.

2. **Automatic updates**: To get the latest changes from the repository:
   ```bash
   npm update @chriscase/uiforge
   ```

3. **Working with local changes**: If you're developing UIForge locally and want to test it in another project:
   ```bash
   # In your UIForge directory
   npm run build
   npm link
   
   # In your other project
   npm link @chriscase/uiforge
   ```

4. **Private repositories**: If UIForge becomes private, you'll need to:
   - Set up SSH keys with GitHub
   - Use SSH URL format: `"@chriscase/uiforge": "git+ssh://git@github.com:chriscase/UIForge.git#main"`
   - Or use a personal access token: `"@chriscase/uiforge": "git+https://<token>@github.com/chriscase/UIForge.git#main"`

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
npm install github:chriscase/UIForge#main react react-dom
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
    "@chriscase/uiforge": "github:chriscase/UIForge#main",
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

## Publishing to NPM

To publish a new version:

1. Update the version in `package.json`
2. Build the library: `npm run build`
3. Publish: `npm publish`

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Development with GitHub Tools

This repository is optimized for development using:

- **GitHub Codespaces** - One-click development environment
- **GitHub Copilot** - AI-powered code completion
- **Copilot Cloud Agents** - Automated code assistance

Simply open this repository in GitHub Codespaces to get started immediately!

### Codespaces / Dev Container details

This repository contains a `.devcontainer` folder that configures a dev container with Node.js and TypeScript tooling preinstalled.

- When you open the repo in GitHub Codespaces (or via `Remote - Containers` / devcontainer in VS Code), the container will automatically install dependencies on first creation and each subsequent start/attach using `.devcontainer/install-deps.sh`.
- The installer script uses the lockfile to choose the appropriate package manager: it prefers `pnpm` (`pnpm-lock.yaml`) then `yarn` (`yarn.lock`) then `npm` (`package-lock.json`), and defaults to `npm` if no lockfile is present. The script will try to use `pnpm`/`yarn` when the lockfile exists and will fall back to `npm` when those tools are unavailable in the container.
- The installer uses `npm ci`, `pnpm install --frozen-lockfile` or `yarn install` (appropriate for the package manager), and caches a hash of the lockfile to skip re-running an install when dependencies haven't changed.
- To force a fresh install, remove `node_modules` and `.devcontainer/.deps_hash` and then restart the Dev Container/Codespace.

You can also manually verify installation from within the Codespace/dev container:

```bash
# Explicitly invoke the scripts using bash to avoid permission errors if the files are not executable
bash .devcontainer/verify-deps.sh
```

### Automated verification on PRs

This repository includes a GitHub workflow (`.github/workflows/verify-devcontainer-deps.yml`) that runs on pull requests. The workflow will:

- Checkout the code and set up Node.js
- Run the repository's devcontainer install script (`.devcontainer/install-deps.sh`) to make sure dependencies install correctly
- Verify dependencies are installed (`.devcontainer/verify-deps.sh`)
- Run the test suite (`npm test`) to ensure the project builds and tests pass after installation

### Codespaces Prebuilds

This repository enables Codespaces prebuilds (see `.github/codespaces.yml`) and the prebuild will run `.devcontainer/prebuild.sh` to prepare the environment before a developer opens the Codespace. The prebuild script installs dependencies, verifies they are present, and optionally runs a quick test.

Note: The prebuild script also ensures devcontainer scripts are executable (uses `chmod +x .devcontainer/*.sh`) so you don't need to manually change permissions.

### Making the scripts executable in Git (optional)

If you'd like the scripts to be executable in the repo (so they can run directly), there is a helper script to set the executable bit and commit the change for you: `scripts/set-exec-devcontainer-scripts.sh`.

You can run it directly:

```bash
# This will set the exec bits and commit the change if necessary
bash scripts/set-exec-devcontainer-scripts.sh
```

Or via npm:

```bash
npm run devcontainer:set-exec
```

This is optional — the devcontainer lifecycle commands and prebuild script should run the scripts using `bash` even if they are not executable.

This helps catch environment and installation issues early during PRs.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Author

**chriscase**

## Acknowledgments

- Built with [Vite](https://vitejs.dev/)
- Tested with [Vitest](https://vitest.dev/)
- Styled with CSS
