#!/usr/bin/env python3
"""Apply English UI after syncing upstream touch_pad.html (upstream uses Chinese)."""
import pathlib
import sys

# Replacement keys use \\u escapes so this file stays ASCII-only.
def main() -> None:
    path = pathlib.Path(sys.argv[1])
    text = path.read_text(encoding="utf-8")
    pairs: list[tuple[str, str]] = [
        ('lang="zh"', 'lang="en"'),
        ("\u8fde\u63a5\u4e32\u53e3", "Connect serial"),
        (
            "\u672a\u8fde\u63a5 \u2014 \u9700\u8981 Chrome / Edge",
            "Not connected",
        ),
        ("Not connected — use Chrome or Edge", "Not connected"),
        ("\u5df2\u65ad\u5f00", "Disconnected"),
        (
            "\u6d4f\u89c8\u5668\u4e0d\u652f\u6301 Web Serial\uff0c\u8bf7\u7528\u7535\u8111\u7248 Chrome / Edge",
            "Web Serial is not supported. Use Chrome or Edge on desktop.",
        ),
        (
            "$('btnConnect').textContent = '\u65ad\u5f00'",
            "$('btnConnect').textContent = 'Disconnect'",
        ),
        ("\u5df2\u8fde\u63a5", "Connected"),
        ("\u8fde\u63a5\u5931\u8d25: ", "Connect failed: "),
    ]
    for old, new in pairs:
        text = text.replace(old, new)
    path.write_text(text, encoding="utf-8")


if __name__ == "__main__":
    main()
