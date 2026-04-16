#!/usr/bin/env bash
# Re-download touch_pad.html from vibe-belt and keep a source comment at the top.
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
TMP="$ROOT/.tmp-touch-pad.html"
curl -fsSL "https://raw.githubusercontent.com/Jerry6063/vibe-belt/master/touch_pad.html" -o "$TMP"
{
  printf '%s\n' '<!-- Synced from https://github.com/Jerry6063/vibe-belt/blob/master/touch_pad.html -->'
  cat "$TMP"
} > "$ROOT/public/hardware/touch-pad.html"
rm "$TMP"
echo "OK: $ROOT/public/hardware/touch-pad.html"
