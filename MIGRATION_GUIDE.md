# Migration Guide: @chriscase/uiforge → @appforgeapps/uiforge

This guide helps you migrate from the old package name `@chriscase/uiforge` to the new `@appforgeapps/uiforge`.

## Why the Change?

Due to lost access to the npm account that owns the `@chriscase` scope, the package has been moved to the `@appforgeapps` scope. This ensures we can continue publishing updates and maintaining the library.

## What You Need to Do

### 1. Update Your Package Dependency

**Before:**
```json
{
  "dependencies": {
    "@chriscase/uiforge": "^0.1.0"
  }
}
```

**After:**
```json
{
  "dependencies": {
    "@appforgeapps/uiforge": "^0.1.0"
  }
}
```

### 2. Uninstall Old Package and Install New One

```bash
# Uninstall the old package
npm uninstall @chriscase/uiforge

# Install the new package
npm install @appforgeapps/uiforge
```

Or with yarn:
```bash
yarn remove @chriscase/uiforge
yarn add @appforgeapps/uiforge
```

Or with pnpm:
```bash
pnpm remove @chriscase/uiforge
pnpm add @appforgeapps/uiforge
```

### 3. Update Import Statements

Update all import statements in your code:

**Before:**
```tsx
import { Button, UIForgeGrid, UIForgeComboBox } from '@chriscase/uiforge'
import '@chriscase/uiforge/styles.css'
```

**After:**
```tsx
import { Button, UIForgeGrid, UIForgeComboBox } from '@appforgeapps/uiforge'
import '@appforgeapps/uiforge/styles.css'
```

### 4. Find and Replace All Occurrences

Use your IDE's find-and-replace feature to update all occurrences:

1. **Find:** `@chriscase/uiforge`
2. **Replace with:** `@appforgeapps/uiforge`
3. **Replace in:** Your entire project (excluding `node_modules`)

#### VS Code
- Press `Ctrl+Shift+H` (Windows/Linux) or `Cmd+Shift+H` (Mac)
- Enter `@chriscase/uiforge` in the search box
- Enter `@appforgeapps/uiforge` in the replace box
- Click "Replace All"

#### Command Line (Unix/Linux/Mac)
```bash
# Dry run to see what would be changed
grep -r "@chriscase/uiforge" src/

# Replace in all TypeScript/JavaScript files
find src/ -type f \( -name "*.ts" -o -name "*.tsx" -o -name "*.js" -o -name "*.jsx" \) -exec sed -i 's/@chriscase\/uiforge/@appforgeapps\/uiforge/g' {} +
```

### 5. Update CSS Imports

If you're importing styles in CSS files:

**Before:**
```css
@import '@chriscase/uiforge/styles.css';
```

**After:**
```css
@import '@appforgeapps/uiforge/styles.css';
```

### 6. Verify Your Changes

After making the updates:

1. **Delete node_modules and reinstall:**
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

2. **Run your build:**
   ```bash
   npm run build
   ```

3. **Run your tests:**
   ```bash
   npm test
   ```

4. **Start your dev server:**
   ```bash
   npm run dev
   ```

## What Stays the Same

Good news! The API and functionality remain completely unchanged:

- ✅ All component names are the same
- ✅ All props and interfaces are the same
- ✅ All features work identically
- ✅ CSS classes and styling are unchanged
- ✅ TypeScript types are unchanged

**Only the package name has changed.**

## Example Migration

Here's a complete before/after example:

### Before

**package.json:**
```json
{
  "dependencies": {
    "@chriscase/uiforge": "^0.1.0",
    "react": "^18.0.0",
    "react-dom": "^18.0.0"
  }
}
```

**App.tsx:**
```tsx
import { UIForgeGrid, UIForgeComboBox } from '@chriscase/uiforge'
import '@chriscase/uiforge/styles.css'

function App() {
  return <UIForgeGrid columns={columns} data={data} />
}
```

### After

**package.json:**
```json
{
  "dependencies": {
    "@appforgeapps/uiforge": "^0.1.0",
    "react": "^18.0.0",
    "react-dom": "^18.0.0"
  }
}
```

**App.tsx:**
```tsx
import { UIForgeGrid, UIForgeComboBox } from '@appforgeapps/uiforge'
import '@appforgeapps/uiforge/styles.css'

function App() {
  return <UIForgeGrid columns={columns} data={data} />
}
```

## Troubleshooting

### Error: "Cannot find module '@appforgeapps/uiforge'"

**Solution:**
1. Make sure you've installed the new package: `npm install @appforgeapps/uiforge`
2. Delete `node_modules` and reinstall: `rm -rf node_modules && npm install`
3. Verify the package is in `package.json` dependencies

### Error: "Module not found: Error: Can't resolve '@chriscase/uiforge'"

**Solution:**
You still have old import statements. Search your codebase for `@chriscase/uiforge` and replace all occurrences with `@appforgeapps/uiforge`.

### Styles not loading

**Solution:**
Update your CSS imports from `@chriscase/uiforge/styles.css` to `@appforgeapps/uiforge/styles.css`.

## Need Help?

If you encounter issues during migration:

1. Check the [README.md](./README.md) for updated examples
2. Open an issue on [GitHub](https://github.com/chriscase/UIForge/issues)
3. Review the [Troubleshooting section in README.md](./README.md#troubleshooting)

## Summary Checklist

Use this checklist to ensure you've completed the migration:

- [ ] Updated package name in `package.json`
- [ ] Uninstalled old package: `npm uninstall @chriscase/uiforge`
- [ ] Installed new package: `npm install @appforgeapps/uiforge`
- [ ] Updated all TypeScript/JavaScript import statements
- [ ] Updated all CSS import statements
- [ ] Deleted `node_modules` and `package-lock.json`
- [ ] Reinstalled dependencies: `npm install`
- [ ] Verified build works: `npm run build`
- [ ] Verified tests pass: `npm test`
- [ ] Verified app runs: `npm run dev`

---

**Migration complete! Your application is now using `@appforgeapps/uiforge`.**
