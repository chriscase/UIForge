#!/usr/bin/env bash
# Installs Node dependencies if needed. Intended to be run from the repo root.
# Based on many Codespaces/devcontainer startup scripts — install dependencies if needed
set -euo pipefail

cd "$(dirname "$0")/.."

echo "🔧 Checking for node dependencies..."

# Use npm ci if a lockfile exists for deterministic installs, otherwise fall back to npm install
DEPS_HASH_FILE=".devcontainer/.deps_hash"
LAST_HASH=""
if [ -f "$DEPS_HASH_FILE" ]; then
  LAST_HASH=$(cat "$DEPS_HASH_FILE" || true)
fi

NEW_HASH=""
if [ -f pnpm-lock.yaml ]; then
  PM="pnpm"
  LOCKFILE="pnpm-lock.yaml"
elif [ -f yarn.lock ]; then
  PM="yarn"
  LOCKFILE="yarn.lock"
elif [ -f package-lock.json ]; then
  PM="npm"
  LOCKFILE="package-lock.json"
else
  PM="npm"
  LOCKFILE="package.json"
fi

if [ -f "$LOCKFILE" ]; then
  NEW_HASH=$(sha1sum package-lock.json | awk '{print $1}')
else
  # fallback to package.json only
  NEW_HASH=$(sha1sum package.json | awk '{print $1}')
fi

if [ "$NEW_HASH" = "$LAST_HASH" ] && ([ -d node_modules ] || [ -d .pnpm ]); then
  echo "ℹ️ Dependencies appear up-to-date (no change in lockfile), skipping install."
  exit 0
fi

if [ "$PM" = "pnpm" ]; then
  echo "📦 Found pnpm lockfile — using pnpm install (immutable)"
  if command -v pnpm >/dev/null 2>&1; then
    pnpm install --frozen-lockfile --silent
  else
    echo "⚠️ pnpm is not installed — falling back to npm install (best-effort)"
    npm ci --silent || npm install --silent
  fi
elif [ "$PM" = "yarn" ]; then
  echo "📦 Found yarn.lock — using yarn install"
  if command -v yarn >/dev/null 2>&1; then
    yarn install --silent --prefer-offline
  else
    echo "⚠️ yarn is not installed — falling back to npm install (best-effort)"
    npm ci --silent || npm install --silent
  fi
elif [ "$PM" = "npm" ]; then
  if [ -f package-lock.json ]; then
    echo "📦 Found package-lock.json — using npm ci (faster / deterministic)"
  else
    echo "📦 No lockfile found — using npm install"
  fi
  if command -v npm >/dev/null 2>&1; then
    if [ -f package-lock.json ]; then
      npm ci --silent
    else
      npm install --silent
    fi
  else
    echo "⚠️ npm is not installed — skipping dependency installation"
    exit 0
  fi
else
  echo "Unexpected state: no package manager detected; using npm install"
  npm install --silent
fi

echo "✅ Dependencies are installed."

# Record new hash so we can skip work at next startup
mkdir -p ".devcontainer"
echo "$NEW_HASH" > "$DEPS_HASH_FILE"
