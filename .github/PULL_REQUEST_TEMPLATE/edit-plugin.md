---
name: Edit plugin listing
about: Update an existing Orbit marketplace listing
title: "Plugin update: "
labels: marketplace
---

## Listing update

- **Plugin name:**
- **Slug / registry file:** `plugins/<slug>.yaml`
- **Public catalog page:** https://orbit.almasix.com/plugins/<slug>/

## What changed

<!-- Bullet the field/image changes (summary, description, screenshots, versions, price, status, …). -->

-

## Why

<!-- Short note for reviewers (new release, corrected copy, retire listing, …). -->

## Checklist

- [ ] Diff is limited to this listing (and its images under `public/plugins/<slug>/` if needed)
- [ ] `npm run validate && npm test` passes locally
- [ ] Preview looks right (`npm run build` → `dist/<slug>/`)
- [ ] New or replaced screenshots have meaningful `alt` text
- [ ] New thumbnail (if any) is 16:9, at least 1280×720, cropped to the feature
- [ ] `orbit_versions` still matches versions I have tested
- [ ] If retiring: `status` is `archived` (or `draft` to pause) rather than a silent delete, unless removing deliberately
- [ ] "Allow edits by maintainers" is enabled

## Paid plugins only (if price/checkout changed)

- [ ] `checkout_url` and listed price match the live store
- [ ] License / seat / update terms still match the listing

<!--
Reviewers: .github/PLUGIN_REVIEW_GUIDELINES.md
Authors: https://orbit.almasix.com/plugins/get-listed/
-->
