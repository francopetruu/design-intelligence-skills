#!/usr/bin/env node
/**
 * Extracts CSS variables and computed styles from a URL using Playwright.
 * Usage: node extract-tokens.js <url>
 * Output: JSON to stdout
 *
 * Requires: npx playwright install chromium (one-time)
 */

async function main() {
  const url = process.argv[2];
  if (!url) {
    console.error("Usage: node extract-tokens.js <url>");
    process.exit(1);
  }

  let chromium;
  try {
    ({ chromium } = await import("playwright"));
  } catch {
    console.error(
      "Playwright not found. Install with: npm install -D playwright && npx playwright install chromium"
    );
    process.exit(1);
  }

  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });

  try {
    await page.goto(url, { waitUntil: "networkidle", timeout: 60000 });
    await page.waitForTimeout(2000);

    const extracted = await page.evaluate(() => {
      const root = getComputedStyle(document.documentElement);
      const cssVariables = {};
      for (let i = 0; i < root.length; i++) {
        const prop = root[i];
        if (prop.startsWith("--")) {
          cssVariables[prop] = root.getPropertyValue(prop).trim();
        }
      }

      function sample(selector) {
        const el = document.querySelector(selector);
        if (!el) return null;
        const s = getComputedStyle(el);
        return {
          fontFamily: s.fontFamily,
          fontSize: s.fontSize,
          fontWeight: s.fontWeight,
          lineHeight: s.lineHeight,
          color: s.color,
          backgroundColor: s.backgroundColor,
        };
      }

      return {
        url: location.href,
        title: document.title,
        metaDescription:
          document.querySelector('meta[name="description"]')?.content || null,
        cssVariables,
        typography: {
          h1: sample("h1"),
          h2: sample("h2"),
          body: sample("body"),
          button: sample("button, a[role=button], .button"),
        },
        colors: {
          bodyBackground: sample("body")?.backgroundColor,
          bodyText: sample("body")?.color,
        },
      };
    });

    console.log(JSON.stringify(extracted, null, 2));
  } finally {
    await browser.close();
  }
}

main().catch((err) => {
  console.error(err.message);
  process.exit(1);
});
