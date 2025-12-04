#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")/.."

NODE_MODULES_PRESENT=0
if [ -d node_modules ]; then
  NODE_MODULES_PRESENT=1
elif [ -d .pnpm ]; then
  NODE_MODULES_PRESENT=1
fi

if [ "$NODE_MODULES_PRESENT" -eq 1 ]; then
  echo "✅ node_modules exists. Dependencies look installed."
  exit 0
else
  echo "❌ node_modules not found. Run .devcontainer/install-deps.sh or run 'npm ci' locally." >&2
  exit 1
fi
