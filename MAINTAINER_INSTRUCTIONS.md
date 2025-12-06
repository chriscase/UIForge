# UIForge Maintainer Instructions

This document provides comprehensive instructions for maintainers of the UIForge project, including publishing workflows, maintenance tasks, and best practices.

## Table of Contents

- [Publishing to NPM](#publishing-to-npm)
  - [Automated Publishing (Recommended)](#automated-publishing-recommended)
  - [Manual Publishing](#manual-publishing)
- [Development Workflow](#development-workflow)
- [Best Practices](#best-practices)
- [Troubleshooting](#troubleshooting)

---

## Publishing to NPM

UIForge uses both automated and manual publishing workflows. The automated workflow is recommended for consistent, reliable releases.

### Automated Publishing (Recommended)

The repository includes a GitHub Actions workflow (`.github/workflows/publish.yml`) that automatically publishes to NPM when you create a GitHub release.

#### Prerequisites

1. **NPM Token**: Set up an NPM access token in GitHub Secrets
   - Go to [npmjs.com](https://www.npmjs.com/) and log in
   - Navigate to Access Tokens in your account settings
   - Create a new token with "Automation" type
   - Add it to GitHub repository secrets as `NPM_TOKEN`:
     - Go to repository Settings → Secrets and variables → Actions
     - Click "New repository secret"
     - Name: `NPM_TOKEN`
     - Value: Your NPM token

2. **NPM Account Access**: Ensure you have publish access to `@appforgeapps/uiforge`
   - Verify with: `npm view @appforgeapps/uiforge`
   - If not published yet, ensure you have access to the `@appforgeapps` scope

#### Publishing Steps

1. **Update Version and CHANGELOG**

   Update the version in `package.json` following [Semantic Versioning](https://semver.org/):
   
   ```bash
   # For a patch release (bug fixes)
   npm version patch -m "Release v%s"
   
   # For a minor release (new features, backward compatible)
   npm version minor -m "Release v%s"
   
   # For a major release (breaking changes)
   npm version major -m "Release v%s"
   ```
   
   Update `CHANGELOG.md` with the changes in this release:
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

2. **Push Version Tag**

   ```bash
   git push origin main --tags
   ```

3. **Create GitHub Release**

   Go to [github.com/chriscase/UIForge/releases](https://github.com/chriscase/UIForge/releases) and:
   - Click "Draft a new release"
   - Choose the tag you just created (e.g., `v0.2.0`)
   - Set the release title (e.g., "v0.2.0")
   - Copy the relevant section from CHANGELOG.md into the description
   - Check "Set as the latest release"
   - Click "Publish release"
   
   Or use the GitHub CLI:
   ```bash
   gh release create v0.2.0 --title "v0.2.0" --notes-file RELEASE_NOTES.md
   ```

4. **Automated Workflow Triggers**

   Once you publish the GitHub release, the workflow will automatically:
   - ✅ Check out the code
   - ✅ Set up Node.js 20
   - ✅ Install dependencies
   - ✅ Run all tests
   - ✅ Build the library
   - ✅ Publish to NPM with provenance

5. **Verify Publication**

   After the workflow completes (usually 2-5 minutes):
   - Check the [NPM package page](https://www.npmjs.com/package/@appforgeapps/uiforge)
   - Test installation: `npm install @appforgeapps/uiforge@latest`
   - Verify the version number matches your release

6. **Add NPM Badge (After First Publication)**

   After the first successful publication, add the NPM version badge to README.md:
   ```markdown
   [![npm version](https://img.shields.io/npm/v/@appforgeapps/uiforge.svg)](https://www.npmjs.com/package/@appforgeapps/uiforge)
   ```

### Manual Publishing

If you need to publish manually (not recommended for regular releases):

#### Initial Setup (One-Time)

1. **Create an NPM Account** (if you don't have one):
   - Go to [npmjs.com](https://www.npmjs.com/)
   - Click "Sign Up" and follow the registration process
   - Verify your email address

2. **Enable Two-Factor Authentication** (required):
   - Log in to [npmjs.com](https://www.npmjs.com/)
   - Go to account settings → Two-Factor Authentication
   - Enable 2FA (choose "Authorization and Publishing" or "Authorization Only")
   - Save your backup codes securely

3. **Log In from Command Line**:
   ```bash
   npm login
   ```
   
   You'll be prompted for:
   - Username
   - Password
   - Email
   - One-time password (if 2FA is enabled)
   
   Verify: `npm whoami`

#### Manual Publishing Steps

1. **Pre-Publishing Checklist**

   ```bash
   # Run linter
   npm run lint
   
   # Fix any auto-fixable issues
   npm run lint:fix
   
   # Check code formatting
   npm run format:check
   
   # Run all tests
   npm test -- --run
   
   # Clean and build
   rm -rf dist/
   npm run build
   ```

2. **Update Version**

   ```bash
   npm version patch  # or minor, or major
   ```

3. **Test Package Locally** (recommended)

   ```bash
   # Create a tarball
   npm pack
   
   # Test in another project
   npm install /path/to/appforgeapps-uiforge-X.Y.Z.tgz
   ```

4. **Publish**

   ```bash
   # Dry run to see what will be published
   npm publish --dry-run
   
   # Actually publish
   npm publish
   ```

5. **Push and Tag**

   ```bash
   git push origin main --tags
   ```

6. **Create GitHub Release** (see automated steps above)

---

## Development Workflow

### Setting Up Development Environment

1. **Clone and Install**
   ```bash
   git clone https://github.com/chriscase/UIForge.git
   cd UIForge
   npm install
   ```

2. **Start Development Server**
   ```bash
   npm run dev
   ```
   Visit `http://localhost:5173` to see the component showcase.

### Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build the library for production
- `npm run preview` - Preview production build
- `npm test` - Run tests in watch mode
- `npm run test:ui` - Run tests with Vitest UI
- `npm run test:coverage` - Generate test coverage report
- `npm run lint` - Lint codebase with ESLint
- `npm run lint:fix` - Auto-fix linting issues
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting

### Making Changes

1. **Create a Feature Branch**
   ```bash
   git checkout -b feature/component-name
   ```

2. **Write Tests**
   - Add tests in `src/tests/`
   - Follow existing test patterns
   - Ensure comprehensive coverage

3. **Implement Feature**
   - Write TypeScript code with proper types
   - Add JSDoc comments for public APIs
   - Follow existing code style

4. **Test Your Changes**
   ```bash
   npm test
   npm run lint
   npm run build
   ```

5. **Update Documentation**
   - Update README.md with usage examples
   - Update CHANGELOG.md with your changes
   - Add JSDoc comments for new APIs

6. **Commit and Push**
   ```bash
   git add .
   git commit -m "feat: add new component"
   git push origin feature/component-name
   ```

7. **Create Pull Request**
   - Go to GitHub and create a PR
   - Describe your changes clearly
   - Link to any related issues
   - Wait for CI to pass

### Version Numbering (Semantic Versioning)

UIForge follows [SemVer](https://semver.org/):

- **MAJOR** (X.0.0): Breaking changes
  - Removing deprecated features
  - Changing component APIs (props, behavior)
  - Updating peer dependencies with breaking changes
  
- **MINOR** (0.X.0): New features, backward compatible
  - New components
  - New features/props on existing components
  - New utility functions
  - Deprecations (but not removals)
  
- **PATCH** (0.0.X): Bug fixes, backward compatible
  - Bug fixes
  - Documentation updates
  - Performance improvements (no API changes)
  - Internal refactoring

---

## Best Practices

### Before Every Release

1. ✅ **Run full test suite**: `npm test -- --run`
2. ✅ **Check linting**: `npm run lint`
3. ✅ **Verify build**: `npm run build`
4. ✅ **Update CHANGELOG.md**: Document all changes
5. ✅ **Test locally**: Use `npm pack` and test in a real project
6. ✅ **Review package contents**: `npm publish --dry-run`

### Code Quality

- Write TypeScript with strict type checking
- Maintain test coverage above 80%
- Follow existing code patterns and conventions
- Add JSDoc comments for exported APIs
- Use meaningful commit messages (conventional commits)

### Documentation

- Keep README.md user-focused
- Update component examples when APIs change
- Document breaking changes clearly
- Maintain up-to-date CHANGELOG.md

### Release Strategy

- **Patch releases**: As needed for critical bugs (within days)
- **Minor releases**: Monthly or quarterly for new features
- **Major releases**: Annually or when significant breaking changes accumulate

### Monitoring

- Watch for issues after releases
- Monitor NPM download stats
- Track GitHub issues and discussions
- Respond to bug reports promptly

---

## Troubleshooting

### Publishing Issues

#### "You do not have permission to publish"

**Solutions:**
- Verify you're logged in: `npm whoami`
- Ensure `publishConfig.access` is set to `"public"` in package.json

#### "Version X.Y.Z already exists"

**Solutions:**
- You cannot republish the same version
- Increment the version: `npm version patch`
- If made a mistake within 72 hours: `npm unpublish @appforgeapps/uiforge@X.Y.Z` (use cautiously!)

#### "Package size exceeds recommended limit"

**Solutions:**
- Check what's included: `npm publish --dry-run`
- Verify `.npmignore` excludes dev files
- Ensure `files` field in `package.json` only includes `dist/`

#### "prepublishOnly script failed"

**Solutions:**
- Run `npm run build` manually to see the error
- Ensure all dependencies are installed: `npm install`
- Check for TypeScript errors

### Build Issues

#### TypeScript Errors

- Ensure TypeScript version matches `package.json`
- Run `npm install` to update dependencies
- Check `tsconfig.json` for configuration issues

#### Test Failures

- Run tests locally: `npm test`
- Check test logs for specific failures
- Ensure test environment is properly set up

### GitHub Actions Issues

#### Workflow Fails on NPM Publish

- Verify `NPM_TOKEN` secret is set correctly
- Check token hasn't expired
- Ensure token has correct permissions (Automation type)
- Review workflow logs for specific error

#### Workflow Doesn't Trigger

- Ensure you published a GitHub release (not just created a tag)
- Check workflow file is on the main branch
- Verify workflow syntax is correct

---

## Additional Resources

- [NPM Documentation](https://docs.npmjs.com/)
- [Semantic Versioning](https://semver.org/)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Vite Library Mode](https://vitejs.dev/guide/build.html#library-mode)
- [React Component Library Best Practices](https://blog.logrocket.com/the-complete-guide-to-publishing-a-react-package-to-npm/)

---

## Questions or Issues?

If you encounter issues not covered in this guide:

1. Check the [GitHub Issues](https://github.com/chriscase/UIForge/issues)
2. Review recent workflow runs in GitHub Actions
3. Consult NPM and GitHub Actions documentation
4. Reach out to the project maintainer

---

**Last Updated**: December 2025
