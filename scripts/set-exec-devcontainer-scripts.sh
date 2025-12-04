#!/usr/bin/env bash
set -euo pipefail

# Sets the executable bit on .devcontainer scripts and creates a commit if changes are necessary.
# Intended to be run locally or in a Codespace branch where you have write access.

if ! command -v git >/dev/null 2>&1; then
  echo "⚠️ git not found — aborting"
  exit 1
fi

FILES=(.devcontainer/install-deps.sh .devcontainer/verify-deps.sh .devcontainer/prebuild.sh)

echo "🔧 Ensuring the ${FILES[*]} are executable in the git index"

CHANGED=0
for f in "${FILES[@]}"; do
  if [ -f "$f" ]; then
    # Check if the executable bit is already set in git index
    MODE=$(git ls-files -s "$f" | awk '{print $1}') || true
    if [ "$MODE" != "100755" ]; then
      echo "✳️  Setting executable bit for $f"
      git update-index --chmod=+x "$f"
      CHANGED=1
    else
      echo "✅ $f is already executable"
    fi
  else
    echo "⚠️ $f not found — skipping"
  fi
done

if [ "$CHANGED" -eq 1 ]; then
  git add .devcontainer/*.sh || true
  git commit -m "chore(devcontainer): set executable bit on devcontainer scripts" || true
  echo "✅ Committed permission changes. Push to your branch to persist the change."
else
  echo "ℹ️ No changes needed. Nothing to commit."
fi
