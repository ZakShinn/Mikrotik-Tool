#!/usr/bin/env python3
"""
SEO guard script (source-based, pre-deploy):
- Reads sitemap.xml + vercel.json rewrites
- Ensures each sitemap URL maps to an existing HTML source file
- Ensures each mapped HTML has matching canonical URL
"""

from __future__ import annotations

import re
import sys
import json
import xml.etree.ElementTree as ET
from html.parser import HTMLParser
from pathlib import Path


SITEMAP_PATH = Path(__file__).resolve().parent.parent / "sitemap.xml"
VERCEL_PATH = Path(__file__).resolve().parent.parent / "vercel.json"


class CanonicalParser(HTMLParser):
    def __init__(self) -> None:
        super().__init__()
        self.canonical: str | None = None

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        if tag.lower() != "link":
            return
        attr_map = {k.lower(): (v or "") for k, v in attrs}
        if attr_map.get("rel", "").lower() == "canonical":
            self.canonical = attr_map.get("href", "") or None


def normalize_url(url: str) -> str:
    return re.sub(r"/+$", "", url) if url != "https://mikrotik.hainghia.net/" else url


def read_sitemap_urls(path: Path) -> list[str]:
    root = ET.fromstring(path.read_text(encoding="utf-8"))
    ns = {"sm": "http://www.sitemaps.org/schemas/sitemap/0.9"}
    return [node.text.strip() for node in root.findall("sm:url/sm:loc", ns) if node.text]


def extract_canonical(html_text: str) -> str | None:
    parser = CanonicalParser()
    parser.feed(html_text)
    return parser.canonical


def main() -> int:
    if not SITEMAP_PATH.exists():
        print(f"ERROR: Cannot find sitemap at {SITEMAP_PATH}")
        return 2
    if not VERCEL_PATH.exists():
        print(f"ERROR: Cannot find vercel config at {VERCEL_PATH}")
        return 2

    urls = read_sitemap_urls(SITEMAP_PATH)
    if not urls:
        print("ERROR: No URLs found in sitemap.xml")
        return 2

    vercel = json.loads(VERCEL_PATH.read_text(encoding="utf-8"))
    rewrites = vercel.get("rewrites", [])
    rewrite_map: dict[str, str] = {}
    for item in rewrites:
        source = item.get("source")
        destination = item.get("destination")
        if not isinstance(source, str) or not isinstance(destination, str):
            continue
        rewrite_map[source] = destination

    failures: list[str] = []
    print(f"Checking {len(urls)} URLs from sitemap.xml against source files...")

    for url in urls:
        path = url.replace("https://mikrotik.hainghia.net", "")
        if not path:
            path = "/"

        if path == "/":
            html_path = SITEMAP_PATH.parent / "index.html"
        else:
            destination = rewrite_map.get(path)
            if not destination:
                failures.append(f"[MAP ] {url} -> missing rewrite mapping in vercel.json")
                continue
            html_path = SITEMAP_PATH.parent / destination.lstrip("/")

        if not html_path.exists():
            failures.append(f"[FILE] {url} -> source file not found: {html_path.as_posix()}")
            continue

        html_text = html_path.read_text(encoding="utf-8", errors="replace")
        canonical = extract_canonical(html_text)
        if not canonical:
            failures.append(f"[CANO] {url} -> missing canonical")
            continue

        if normalize_url(canonical) != normalize_url(url):
            failures.append(f"[CANO] {url} -> canonical {canonical}")

    if failures:
        print("\nSEO guard failed:")
        for item in failures:
            print(f" - {item}")
        return 1

    print("SEO guard passed: sitemap URLs map to sources and canonical tags are consistent.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
