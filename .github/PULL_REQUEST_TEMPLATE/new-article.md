---
name: New marketplace article
about: Add a new article to the Orbit marketplace
title: "Article: "
labels: marketplace
---

## New article

- **Title:**
- **Slug / registry file:** `articles/<slug>.yaml`
- **Author profile:** `authors/<slug>.yaml` (link existing, or add in this PR)
- **Tags:**
- **Related plugins (optional):**

## What it covers

<!-- Two or three sentences: who it is for and what they learn. -->

## Checklist

- [ ] Copied from `articles/example-article.yaml` and set `status: published`
- [ ] `body` is full Markdown (not a stub linking only to an external post)
- [ ] `npm run validate && npm test` passes locally
- [ ] Listing looks right in `npm run build` preview (`dist/articles/<slug>/`)
- [ ] Thumbnail is 16:9 when present, under `public/articles/<slug>/`
- [ ] Every `images[]` entry has meaningful `alt` text
- [ ] `related_plugins` (if any) are published marketplace slugs
- [ ] No plugin fields (`price`, `package`, `orbit_versions`, `categories`)
- [ ] This PR only touches `articles/**`, `authors/**` (if needed), and `public/articles/**`
- [ ] "Allow edits by maintainers" is enabled

<!--
Reviewers: .github/PLUGIN_REVIEW_GUIDELINES.md
Authors: https://orbit.almasix.com/plugins/write-an-article/
-->
