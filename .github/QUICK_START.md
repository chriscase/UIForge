# UIForge Quick Start Guide

## For Developers

### Using GitHub Codespaces (Recommended)
1. Click "Code" → "Open with Codespaces" → "New codespace"
2. Wait for the environment to set up automatically
3. Start developing immediately!

### Local Development
```bash
# Clone the repository
git clone https://github.com/chriscase/UIForge.git
cd UIForge

# Install dependencies
npm install

# Start the development server
npm run dev
```

Visit http://localhost:5173 to see the component showcase.

## Common Commands

- `npm run dev` - Start development server
- `npm run build` - Build library for production
- `npm test` - Run tests in watch mode
- `npm run lint` - Check code quality
- `npm run format` - Format code with Prettier

## Adding a New Component

1. Create component file: `src/components/YourComponent.tsx`
2. Create styles: `src/components/YourComponent.css`
3. Create tests: `src/tests/YourComponent.test.tsx`
4. Export from: `src/index.ts`
5. Add example to: `examples/App.tsx`

## Publishing to NPM

1. Update version in `package.json`
2. Update `CHANGELOG.md`
3. Build the library: `npm run build`
4. Publish: `npm publish`

Or create a GitHub release and the CI/CD will publish automatically!

## Technology Stack

- **React 19** - UI library
- **TypeScript 5** - Type safety
- **Vite 7** - Build tool
- **Vitest 4** - Testing framework
- **ESLint + Prettier** - Code quality

## Resources

- [README.md](../README.md) - Full documentation
- [CONTRIBUTING.md](../CONTRIBUTING.md) - Contribution guidelines
- [CHANGELOG.md](../CHANGELOG.md) - Version history
