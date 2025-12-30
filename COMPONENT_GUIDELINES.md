# Component Design Guidelines

This document provides essential guidelines for designing and contributing components to UIForge. Following these principles ensures that UIForge remains a **generic, reusable, and composable** UI library that can be adopted by any project without bringing in app-specific concerns.

## Core Principles

UIForge is a **library-first** component collection. All components should be:

1. **Generic** - Applicable to many use cases, not tied to specific applications
2. **Composable** - Can be combined and customized by consumers
3. **Reusable** - Work across different projects and domains
4. **Extensible** - Allow customization through props, slots, and theming
5. **Decoupled** - Free from app-specific logic, assets, or branding

## Naming Conventions

### ✅ DO: Use Generic, Domain-Agnostic Names

Component names should describe **what** the component is, not **how** it might be used in a specific application.

**Good Examples:**
- `MediaCard` - Generic card for any media type (music, video, podcast, article)
- `Button` - Generic button component
- `UIForgeGrid` - Generic data grid
- `UIForgeComboBox` - Generic select/combo box
- `ActivityStream` - Generic activity/timeline feed
- `MediaPlaceholder` - Generic placeholder for any media type

**Why these work:** They describe the component's structure and purpose without assuming a specific domain or use case.

### ❌ DON'T: Use Application-Specific Names

**Bad Examples:**
- `SongCard` - Assumes music streaming app
- `ProductCard` - Assumes e-commerce app
- `CourseCard` - Assumes education app
- `RecipeCard` - Assumes cooking app
- `PlaylistButton` - Assumes music app
- `CheckoutButton` - Assumes e-commerce app

**Why these fail:** These names lock the component into a specific domain and discourage reuse in other contexts.

### Refactoring Specific Names to Generic

If you find yourself creating a domain-specific component, ask: "What is the generic pattern here?"

| Specific Name | Generic Alternative | Reasoning |
|---------------|-------------------|-----------|
| `SongCard` | `MediaCard` | Works for songs, videos, podcasts, articles |
| `ProductCard` | `Card` with props | Generic card that accepts any content |
| `PlayButton` | `IconButton` with play icon | Generic button with customizable icon |
| `PodcastEpisodeList` | `MediaList` | Generic list for any media items |
| `ShoppingCart` | `ItemList` + `Summary` | Compose from generic list and summary components |

## Avoiding App-Specific Concerns

### Assets and Media

**❌ DON'T include:**
- Company logos
- Brand-specific icons
- Product photos
- Marketing images
- App-specific illustrations

**✅ DO provide:**
- Generic placeholder images (via `MediaPlaceholder` component)
- Icon components that consumers can populate with their own SVGs
- Example usage showing how to pass in custom media

**Example:**

```tsx
// ❌ BAD: Hardcoded app-specific image
function MediaCard() {
  return (
    <div className="media-card">
      <img src="/assets/spotify-logo.png" alt="Spotify" />
    </div>
  )
}

// ✅ GOOD: Accept image as prop
function MediaCard({ imageUrl, imageAlt, title }: MediaCardProps) {
  return (
    <div className="media-card">
      <img src={imageUrl} alt={imageAlt} />
      <h3>{title}</h3>
    </div>
  )
}
```

### CSS Classes and Tokens

**❌ DON'T use:**
- App-specific class names (`.nexalive-card`, `.shopify-button`)
- Brand-specific color names (`.spotify-green`, `.netflix-red`)
- Product-specific tokens (`--checkout-button-bg`)

**✅ DO use:**
- Generic, semantic class names (`.media-card`, `.button--primary`)
- Semantic color tokens (`--button-primary-bg`, `--card-border-color`)
- Component-scoped variables (`--media-card-bg`, `--grid-header-color`)

**Example:**

```css
/* ❌ BAD: App-specific classes and tokens */
.nexalive-song-card {
  background: var(--nexalive-purple);
  border: 1px solid var(--nexalive-pink);
}

/* ✅ GOOD: Generic, semantic classes and tokens */
.media-card {
  background: var(--card-bg, #ffffff);
  border: 1px solid var(--card-border, #e0e0e0);
}
```

### Hardcoded Text and Copy

**❌ DON'T hardcode:**
- Button labels ("Add to Cart", "Buy Now", "Enroll")
- Status messages ("Song playing", "Course completed")
- Error messages specific to one domain
- Marketing copy or taglines

**✅ DO provide:**
- Configurable text via props
- Default placeholders that are generic
- Support for internationalization (i18n) where needed

**Example:**

```tsx
// ❌ BAD: Hardcoded app-specific text
function ActionButton() {
  return <button>Add to Playlist</button>
}

// ✅ GOOD: Configurable text
function Button({ children }: ButtonProps) {
  return <button>{children}</button>
}

// Usage in app:
<Button>Add to Playlist</Button>
<Button>Add to Cart</Button>
<Button>Enroll Now</Button>
```

## Composition Over Configuration

### Expose Slots and Render Props

Allow consumers to inject their own content and behavior rather than trying to handle every use case through props.

**✅ Good Patterns:**

1. **Children Props** - Let consumers provide content

```tsx
// Component
export function Card({ children }: CardProps) {
  return <div className="card">{children}</div>
}

// Usage
<Card>
  <h2>My Custom Title</h2>
  <p>Any content I want</p>
</Card>
```

2. **Render Props** - Let consumers customize rendering

```tsx
// Component
export function MediaCard({ 
  title, 
  renderActions 
}: MediaCardProps) {
  return (
    <div className="media-card">
      <h3>{title}</h3>
      {renderActions && renderActions()}
    </div>
  )
}

// Usage in music app
<MediaCard 
  title="Song Title"
  renderActions={() => <PlayButton />}
/>

// Usage in video app
<MediaCard 
  title="Video Title"
  renderActions={() => <WatchButton />}
/>
```

3. **Slot Props** - Named slots for specific areas

```tsx
// Component
export function Grid({ 
  header, 
  footer, 
  children 
}: GridProps) {
  return (
    <div className="grid">
      {header && <div className="grid-header">{header}</div>}
      <div className="grid-body">{children}</div>
      {footer && <div className="grid-footer">{footer}</div>}
    </div>
  )
}

// Usage
<Grid
  header={<CustomToolbar />}
  footer={<Pagination />}
>
  <GridContent />
</Grid>
```

## Theming Pattern

UIForge follows a **semantic token approach** to theming:

### Core Library: Define Semantic Tokens

In the core library (`src/components/`), define **semantic** CSS variables that describe purpose, not specific colors:

```css
/* ✅ GOOD: Semantic tokens in core */
.button {
  background: var(--button-primary-bg, #007bff);
  color: var(--button-primary-text, #ffffff);
  border: 1px solid var(--button-primary-border, #0056b3);
}

.card {
  background: var(--card-bg, #ffffff);
  border: 1px solid var(--card-border, #e0e0e0);
  color: var(--card-text, #333333);
}
```

**Key characteristics:**
- Variable names describe **purpose** (`--button-primary-bg`)
- Fallback values are sensible defaults
- No brand-specific names or values

### Example Apps: Map Brand Tokens

In example applications (`examples/themes/`), map brand colors to semantic tokens:

```css
/* examples/themes/my-app-theme.css */
:root {
  /* Brand colors */
  --brand-primary: #8b5cf6;
  --brand-secondary: #ec4899;
  --brand-text: #1f2937;
  
  /* Map brand to semantic tokens */
  --button-primary-bg: var(--brand-primary);
  --button-primary-border: var(--brand-primary);
  --card-border: var(--brand-secondary);
  --link-color: var(--brand-primary);
}
```

### Important Guidelines

**✅ DO in core library:**
- Define semantic tokens with sensible defaults
- Use generic color names in fallbacks (e.g., `#007bff`, not `--spotify-green`)
- Provide both light and dark theme token sets
- Document all available theme tokens

**❌ DON'T in core library:**
- Use brand-specific color values
- Hardcode colors without CSS variables
- Assume a specific visual style
- Include theme files for specific products/brands

**✅ DO in examples:**
- Create theme files showing how to map brand colors
- Include comments explaining the theming approach
- Show multiple theme examples (light/dark, different brands)
- Document theme customization clearly

**❌ DON'T in examples:**
- Treat example themes as production-ready
- Include proprietary brand assets
- Hardcode theme choices into components

## Product Examples and Documentation

### Where to Put Product-Specific Examples

**Core Library (`src/components/`):**
- Generic component implementation
- Basic props interface
- Semantic styling with CSS variables
- TypeScript types

**Example App (`examples/`):**
- Composed components showing real-world usage
- Integration examples
- Theme customizations
- Complex interaction patterns

**Consumer Repos (External Projects):**
- Production implementations
- Brand-specific variations
- Business logic integration
- Domain-specific features

### Documentation Best Practices

When documenting components, show progressive examples:

1. **Basic Usage** - Minimal, generic example
2. **Common Patterns** - Generic use cases (no domain assumptions)
3. **Composition** - How to combine with other components
4. **Theming** - How to customize appearance
5. **Advanced** - Complex scenarios (still generic)

**Example Documentation Structure:**

```markdown
## MediaCard

A generic card component for displaying media items (songs, videos, articles, etc.)

### Basic Usage
\`\`\`tsx
<MediaCard 
  title="Item Title"
  imageUrl="/image.jpg"
/>
\`\`\`

### With Custom Actions
\`\`\`tsx
<MediaCard 
  title="Item Title"
  imageUrl="/image.jpg"
  renderActions={() => (
    <>
      <Button>Action 1</Button>
      <Button>Action 2</Button>
    </>
  )}
/>
\`\`\`

### Music App Example
See `examples/MusicAppExample.tsx` for a complete music streaming implementation.

### E-commerce Example
See external repo: [example-store](https://github.com/example/store)
```

## Component Review Checklist

Use this checklist when reviewing component PRs to ensure genericness:

### Naming
- [ ] Component name is generic and domain-agnostic
- [ ] Prop names describe structure/behavior, not specific use cases
- [ ] CSS class names are generic (no brand/app references)
- [ ] No domain-specific terminology in public APIs

### Assets and Content
- [ ] No hardcoded images, logos, or brand assets
- [ ] No hardcoded text (all text via props or children)
- [ ] No app-specific icons (use generic icon slots)
- [ ] Media handled through props or render props

### Styling
- [ ] CSS uses semantic variables (not brand colors)
- [ ] Variables have sensible fallback values
- [ ] No app-specific class names in CSS
- [ ] Theme tokens follow semantic naming pattern

### Composition
- [ ] Component accepts `children` or render props where appropriate
- [ ] Complex behaviors can be customized by consumers
- [ ] No business logic hardcoded in component
- [ ] Extensibility through props and slots

### Documentation
- [ ] Examples show generic use cases first
- [ ] Domain-specific examples clearly labeled as such
- [ ] Props documented with generic descriptions
- [ ] README shows basic usage without domain assumptions

### Theming
- [ ] Core component uses semantic CSS variables
- [ ] Example themes show brand mapping approach
- [ ] Light and dark theme support included
- [ ] Theme documentation is clear and generic

### Testing
- [ ] Tests use generic data (not app-specific)
- [ ] Test descriptions are domain-agnostic
- [ ] Accessibility tests included
- [ ] Responsive behavior tested

## Examples of Good Component Design

### ✅ MediaCard Component

The `MediaCard` component is a good example of generic design:

**Why it works:**
- Generic name (not `SongCard`, `VideoCard`, etc.)
- Accepts any media via props
- Provides slots for custom actions
- Uses semantic CSS variables
- Works for music, video, articles, products, courses, etc.

**Usage Flexibility:**

```tsx
// Music streaming app
<MediaCard 
  title="Song Name"
  subtitle="Artist Name"
  imageUrl={albumArt}
  renderActions={() => <PlayButton />}
/>

// Video platform
<MediaCard 
  title="Video Title"
  subtitle="Channel Name"
  imageUrl={thumbnail}
  renderActions={() => <WatchButton />}
/>

// E-commerce
<MediaCard 
  title="Product Name"
  subtitle="$99.99"
  imageUrl={productImage}
  renderActions={() => <AddToCartButton />}
/>
```

### ✅ UIForgeGrid Component

The `UIForgeGrid` component demonstrates excellent generic design:

**Why it works:**
- Generic data grid (not `ProductGrid`, `UserGrid`)
- Column definitions via props
- Custom cell renderers
- Action buttons configurable by consumer
- No assumptions about data structure

### ✅ Button Component

The `Button` component is simple but perfectly generic:

**Why it works:**
- Generic name and purpose
- Variants (primary, secondary, outline) are semantic
- Content via `children`
- Icons via props or children
- Fully themeable with CSS variables

## Anti-Patterns to Avoid

### ❌ Hardcoding Domain Logic

```tsx
// BAD: Hardcoded music app logic
function MediaCard({ item }) {
  const handlePlay = () => {
    playTrack(item.trackId) // Domain-specific function
  }
  
  return (
    <div>
      <h3>{item.songName}</h3>
      <button onClick={handlePlay}>Play Song</button>
    </div>
  )
}

// GOOD: Generic with callback
function MediaCard({ title, onActionClick, actionLabel }) {
  return (
    <div>
      <h3>{title}</h3>
      <button onClick={onActionClick}>{actionLabel}</button>
    </div>
  )
}
```

### ❌ Assuming Specific Data Structures

```tsx
// BAD: Assumes music-specific data structure
function MediaList({ songs }: { songs: Song[] }) {
  return (
    <ul>
      {songs.map(song => (
        <li key={song.trackId}>
          {song.artistName} - {song.trackName}
        </li>
      ))}
    </ul>
  )
}

// GOOD: Generic with render prop
function ItemList<T>({ 
  items, 
  renderItem,
  getKey 
}: ItemListProps<T>) {
  return (
    <ul>
      {items.map((item, index) => (
        <li key={getKey ? getKey(item, index) : index}>
          {renderItem(item, index)}
        </li>
      ))}
    </ul>
  )
}
```

### ❌ Mixing UI and Business Logic

```tsx
// BAD: Component knows about music streaming business rules
function MediaCard({ song }) {
  const canPlay = user.isPremium || song.isFree
  const handleClick = () => {
    if (!canPlay) {
      showUpgradeModal()
    } else {
      playSong(song)
    }
  }
  
  return <div onClick={handleClick}>...</div>
}

// GOOD: Component just renders, consumer handles business logic
function MediaCard({ 
  title, 
  onClick, 
  disabled 
}: MediaCardProps) {
  return (
    <div 
      onClick={disabled ? undefined : onClick}
      className={disabled ? 'disabled' : ''}
    >
      <h3>{title}</h3>
    </div>
  )
}

// Consumer handles business logic
<MediaCard
  title={song.title}
  onClick={() => handlePlay(song)}
  disabled={!canUserPlay(user, song)}
/>
```

## When to Create a New Component

Ask yourself these questions before creating a new component:

1. **Is this pattern truly generic?** Can it be used in multiple domains?
2. **Does a generic version already exist?** Could you use/extend an existing component?
3. **Is it reusable?** Will other projects benefit from this component?
4. **Is it composable?** Can it be broken down into smaller, reusable pieces?
5. **Is the name generic?** Does it describe structure/behavior rather than domain use?

**If the answer to most is YES** → Create the component in UIForge core

**If the answer to most is NO** → Create it in your application or as a composition of UIForge components

## Summary

To keep UIForge generic and library-first:

1. ✅ Use **generic, domain-agnostic names**
2. ✅ Avoid **app-specific assets, tokens, and class names**
3. ✅ Expose **slots and render props** for customization
4. ✅ Put **product examples** in `examples/` or consumer repos
5. ✅ Use **semantic tokens** in core, map to brands in examples
6. ✅ Design for **composition** over configuration
7. ✅ Document **generic use cases** first, specific ones separately
8. ✅ Review PRs against the **component review checklist**

By following these guidelines, we ensure UIForge remains a versatile, reusable library that can be adopted by any project without bringing in unnecessary coupling or assumptions.

## Questions?

If you're unsure whether a component design is generic enough, ask in the PR or open a discussion issue. The maintainers are happy to help guide you toward a more generic design.
