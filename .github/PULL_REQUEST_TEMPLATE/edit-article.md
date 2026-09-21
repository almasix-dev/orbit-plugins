---
name: Edit marketplace article
about: Update an existing Orbit marketplace article
title: "Article update: "
labels: marketplace
---

## Article update

- **Title:**
- **Slug / registry file:** `articles/<slug>.yaml`
- **Public page:** https://orbit.almasix.com/articles/<slug>/

## What changed

<!-- Bullet body, tags, images, related plugins, status, … -->

-

## Why

<!-- Short note for reviewers. -->

## Checklist

- [ ] Diff is limited to this article (and its images under `public/articles/<slug>/` if needed)
- [ ] `npm run validate && npm test` passes locally
- [ ] Preview looks right (`npm run build` → `dist/articles/<slug>/`)
- [ ] New or replaced images have meaningful `alt` text
- [ ] If retiring: `status` is `archived` (or `draft` to pause) rather than a silent delete, unless removing deliberately
- [ ] "Allow edits by maintainers" is enabled

<!--
Reviewers: .github/PLUGIN_REVIEW_GUIDELINES.md
Authors: https://orbit.almasix.com/plugins/write-an-article/
-->
