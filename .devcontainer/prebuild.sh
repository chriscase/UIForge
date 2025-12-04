#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")/.."

echo "📦 Codespaces prebuild: installing dependencies"
bash -lc 'chmod +x .devcontainer/*.sh || true'
bash .devcontainer/install-deps.sh

echo "🔎 Codespaces prebuild: verifying dependencies"
bash .devcontainer/verify-deps.sh

# Optionally run tests as part of the prebuild; skip if running in a resource-constrained environment
if command -v npm >/dev/null 2>&1; then
  echo "🧪 Running a quick test: npm test --silent"
  npm test --silent || echo "⚠️ Tests failed during prebuild — prebuild will proceed but please verify the PR checks."
fi

echo "✅ Codespaces prebuild script completed."
