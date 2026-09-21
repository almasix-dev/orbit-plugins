---
name: New plugin listing
about: Add a new plugin to the Orbit marketplace
title: "Plugin: "
labels: marketplace
---

## New listing

- **Plugin name:**
- **Slug / registry file:** `plugins/<slug>.yaml`
- **Author profile:** `authors/<slug>.yaml` (link existing, or add in this PR)
- **Repository:**
- **Package (PyPI) or store URL:**
- **Price:** free / paid (amount + currency)
- **Orbit versions tested:**

## What it does

<!-- Two or three sentences: the problem it solves and how someone uses it. -->

## Checklist

- [ ] Copied from `plugins/example-plugin.yaml` (or scaffold draft YAML) and set `status: published`
- [ ] `npm run validate && npm test` passes locally
- [ ] Listing looks right in `npm run build` preview (`dist/<slug>/`)
- [ ] Thumbnail is 16:9, at least 1280×720, cropped to the feature (not a full panel)
- [ ] Every screenshot has meaningful `alt` text
- [ ] `orbit_versions` lists versions I have actually tested
- [ ] Categories come from `categories.yaml`
- [ ] Author slug already exists, or this PR also adds `authors/<slug>.yaml`
- [ ] The wheel does **not** contain `almasix/__init__.py`
- [ ] Package name does not use the reserved `almasix-orbit-*` prefix (unless Almasix maintains it)
- [ ] The plugin has a license file
- [ ] This PR only touches `plugins/**`, `authors/**`, and `public/plugins/**`
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
