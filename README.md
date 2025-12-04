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

## Usage

```tsx
import { Button } from '@chriscase/uiforge'

function App() {
  return (
    <Button variant="primary" onClick={() => console.log('Clicked!')}>
      Click me
    </Button>
  )
}
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
