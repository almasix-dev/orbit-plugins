---
name: Edit author profile
about: Update an existing Orbit marketplace author profile
title: "Author update: "
labels: marketplace
---

## Author update

- **Display name:**
- **Slug / registry file:** `authors/<slug>.yaml`
- **Author page:** https://orbit.almasix.com/plugins/authors/<slug>/

## What changed

<!-- Bullet the field/image changes (name, bio, avatar, website, github, sponsor_url, …). -->

-

## Why

<!-- Short note for reviewers. -->

## Checklist

- [ ] Filename still matches `slug` (rename both if the slug changes; update listing `author:` fields in the same PR)
- [ ] `npm run validate && npm test` passes locally
- [ ] New avatar (if any) is 1:1, at least 400×400, under `public/plugins/authors/`
- [ ] This PR only touches `authors/**`, related listing YAML if the slug changed, and optionally `public/plugins/authors/**`
- [ ] "Allow edits by maintainers" is enabled

<!--
Reviewers: .github/PLUGIN_REVIEW_GUIDELINES.md
Authors: https://orbit.almasix.com/plugins/get-listed/
-->
