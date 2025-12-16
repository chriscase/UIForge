# Semantic Release Setup Guide

This project uses [semantic-release](https://semantic-release.gitbook.io/) to automatically version and publish to NPM.

## How It Works

1. **Commit Messages**: Use [Conventional Commits](https://www.conventionalcommits.org/) format:
   - `feat: add new feature` → minor version bump
   - `fix: fix a bug` → patch version bump
   - `feat!: breaking change` or `BREAKING CHANGE: ...` → major version bump

2. **Automatic Process**:
   - When you push to `main`, the Release workflow runs
   - semantic-release analyzes commits since last release
   - If changes are found, it:
     - Bumps version in `package.json`
     - Generates CHANGELOG.md
     - Creates a GitHub Release
     - Publishes to NPM
     - Pushes changes back to `main`

## Required Setup

Make sure you have:

- `NPM_TOKEN` secret configured in GitHub (Settings → Secrets → New repository secret)
- `GITHUB_TOKEN` is automatically provided by GitHub Actions

## Example Commits

```bash
# Bug fix (patch: 0.2.0 → 0.2.1)
git commit -m "fix: resolve ComboBox focus issue"

# New feature (minor: 0.2.0 → 0.3.0)
git commit -m "feat: add dark mode support"

# Breaking change (major: 0.2.0 → 1.0.0)
git commit -m "feat!: redesign component API"
# or
git commit -m "feat: redesign API

BREAKING CHANGE: props structure changed"
```

## Workflow

The Release workflow (`.github/workflows/release.yml`) runs on every push to `main` and:

1. Runs linting and tests
2. Builds the library
3. Uses semantic-release to determine if a release is needed
4. Automatically publishes to NPM if version changed

You can safely push without worrying about version bumps - they're handled automatically!
