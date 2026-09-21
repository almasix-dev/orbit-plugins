---
name: Plugin marketplace submission
about: Add or update a listing in the Orbit plugin marketplace
labels: marketplace
---

## Listing

- **Plugin name:**
- **Slug / registry file:** `plugins/<slug>.yaml`
- **Author profile:** `authors/<slug>.yaml`
- **Repository:**
- **Package (PyPI) or store URL:**
- **Price:** free / paid (amount + currency)

## What it does

<!-- Two or three sentences: the problem it solves and how someone uses it. -->

## Checklist

- [ ] `npm run validate && npm test` passes locally
- [ ] Listing looks right in `npm run build` preview (`dist/<slug>/`)
- [ ] Thumbnail is 16:9, at least 1280x720, and cropped to the feature
- [ ] Every screenshot has meaningful `alt` text
- [ ] `orbit_versions` lists versions I have actually tested
- [ ] Categories come from `categories.yaml`
- [ ] The wheel does **not** contain `almasix/__init__.py`
- [ ] Package name does not use the reserved `almasix-orbit-*` prefix (unless Almasix maintains it)
- [ ] The plugin has a license file
- [ ] This PR only touches `plugins/**`, `authors/**`, `categories.yaml`, and `public/plugins/**`
- [ ] "Allow edits by maintainers" is enabled

## Paid plugins only

- [ ] `checkout_url` lands on a page where a buyer can complete the purchase
- [ ] The listed price matches the store
- [ ] The license terms (projects, seats, updates, support window) are published
- [ ] I can give a maintainer read access to the private source, or send the wheel, for review

<!--
Reviewers: .github/PLUGIN_REVIEW_GUIDELINES.md
Authors: https://orbit.almasix.com/plugins/get-listed/
-->
