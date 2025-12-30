# Contributing to UIForge

Thank you for your interest in contributing to UIForge! We welcome contributions from everyone.

## Getting Started

1. **Fork the repository** on GitHub
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/YOUR_USERNAME/UIForge.git
   cd UIForge
   ```
3. **Install dependencies**:
   ```bash
   npm install
   ```
4. **Create a branch** for your changes:
   ```bash
   git checkout -b feature/my-new-feature
   ```

## Development Workflow

### Running the Development Server

Start the development server to see your changes in real-time:

```bash
npm run dev
```

Visit `http://localhost:5173` to see the component showcase.

### Writing Code

- Follow the existing code style
- Write TypeScript code with proper type definitions
- Add JSDoc comments for public APIs
- Keep components simple and reusable

### Testing

Write tests for any new features or bug fixes:

```bash
npm test
```

Run tests with coverage:

```bash
npm run test:coverage
```

### Linting and Formatting

Before committing, ensure your code passes linting:

```bash
npm run lint
npm run format
```

## Submitting Changes

1. **Commit your changes** with a descriptive message:
   ```bash
   git commit -m "Add new Button variant"
   ```

2. **Push to your fork**:
   ```bash
   git push origin feature/my-new-feature
   ```

3. **Open a Pull Request** on GitHub with:
   - A clear title and description
   - Reference to any related issues
   - Screenshots for UI changes (if applicable)

## Code Review Process

- Maintainers will review your PR
- Address any feedback or requested changes
- Once approved, your PR will be merged

### Component Review Checklist

When reviewing component PRs, verify the following to ensure components remain generic and reusable:

#### Naming & API
- [ ] Component name is generic and domain-agnostic (e.g., `MediaCard` not `SongCard`)
- [ ] Prop names describe structure/behavior, not specific use cases
- [ ] CSS class names are generic (no brand/app references)
- [ ] No domain-specific terminology in public APIs

#### Assets & Content
- [ ] No hardcoded images, logos, or brand assets
- [ ] No hardcoded text (all text configurable via props or children)
- [ ] No app-specific icons (use generic icon slots)
- [ ] Media assets handled through props or render props

#### Styling & Theming
- [ ] CSS uses semantic variables (e.g., `--button-primary-bg` not `--spotify-green`)
- [ ] CSS variables have sensible fallback values
- [ ] No app-specific class names or tokens
- [ ] Both light and dark theme support included

#### Composition & Extensibility
- [ ] Component accepts `children` or render props where appropriate
- [ ] Complex behaviors can be customized by consumers
- [ ] No business logic hardcoded in component
- [ ] Extensible through props, slots, and composition

#### Documentation & Examples
- [ ] Examples show generic use cases first
- [ ] Domain-specific examples clearly labeled as such
- [ ] Props documented with generic descriptions
- [ ] README usage examples are domain-agnostic

For a comprehensive checklist and detailed guidelines, see [Component Design Guidelines](./COMPONENT_GUIDELINES.md).

## Component Guidelines

**Important:** UIForge is a library-first project focused on generic, reusable components. Before contributing a component, please review our comprehensive [Component Design Guidelines](./COMPONENT_GUIDELINES.md) to ensure your component stays generic and composable.

### Key Principles

1. ✅ **Use generic names** - `MediaCard` not `SongCard`, `Button` not `PlayButton`
2. ✅ **No app-specific assets** - No logos, brand colors, or domain-specific content
3. ✅ **Expose slots/render props** - Allow consumers to customize behavior
4. ✅ **Semantic tokens only** - Use `--button-primary-bg` not `--spotify-green`
5. ✅ **Product examples in `examples/`** - Keep core components generic

### Adding a New Component

When adding a new component:

1. **Read** [Component Design Guidelines](./COMPONENT_GUIDELINES.md) first
2. Create a new file in `src/components/`
3. Add corresponding CSS in the same directory
4. Write comprehensive tests in `src/tests/`
5. Export the component from `src/index.ts`
6. Add generic examples in the showcase
7. Update the README with usage examples
8. Ensure your component passes the [Component Review Checklist](#component-review-checklist)

## Questions?

Feel free to open an issue for any questions or concerns.

## Code of Conduct

Be respectful and inclusive. We're all here to learn and build great things together.
