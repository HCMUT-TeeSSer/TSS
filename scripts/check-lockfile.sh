#!/usr/bin/env bash

set -e

invalid_locks=$(git diff --cached --name-only | grep -E '^(package-lock\.json|yarn\.lock|yarn\.classic\.lock|shrinkwrap\.yaml|bun\.lock)$' || true)

if [ -n "$invalid_locks" ]; then
  echo "❌ Lockfile not allowed detected:"
  echo "$invalid_locks"
  echo
  echo "👉 Please remove these files before committing."
  exit 1
fi

