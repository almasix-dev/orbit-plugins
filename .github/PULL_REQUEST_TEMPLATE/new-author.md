---
name: New author profile
about: Add a new author profile to the Orbit marketplace
title: "Author: "
labels: marketplace
---

## New author

- **Display name:**
- **Slug / registry file:** `authors/<slug>.yaml`
- **GitHub handle (if any):**
- **Website (if any):**

## Bio (as it will appear)

<!-- Paste the bio text from the YAML so reviewers can skim it without opening the file. -->

## Checklist

- [ ] Copied from `authors/example-author.yaml`
- [ ] Filename matches `slug`
- [ ] `name`, `slug`, and `bio` are filled in
- [ ] Avatar (if any) is 1:1, at least 400×400, under `public/plugins/authors/`
- [ ] `npm run validate && npm test` passes locally
- [ ] This PR only touches `authors/**` and optionally `public/plugins/authors/**`
- [ ] "Allow edits by maintainers" is enabled

Note: an author page on the catalog appears once at least one of their listings is **published**.

<!--
Reviewers: .github/PLUGIN_REVIEW_GUIDELINES.md
Authors: https://orbit.almasix.com/plugins/get-listed/
-->
