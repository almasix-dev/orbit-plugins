# Orbit plugins registry

YAML listings and images for the [Orbit plugin marketplace](https://orbit.almasix.com/plugins/).

Authors open pull requests **here**. After merge, the Orbit docs site fetches this registry and rebuilds [`orbit.almasix.com/plugins`](https://orbit.almasix.com/plugins/).

## Layout

```text
categories.yaml          # maintainer-owned category list
authors/<slug>.yaml      # one file per author
plugins/<slug>.yaml      # one file per listing
public/plugins/          # thumbnails, screenshots, avatars
```

## Submit a listing

1. Scaffold draft YAML with `smith make:orbit-plugin …` (or copy `plugins/example-plugin.yaml`).
2. Add images under `public/plugins/<your-slug>/`.
3. Set `status: published`.
4. Open a PR against this repository.

Guides: [Get listed](https://orbit.almasix.com/plugins/get-listed/) · [Listing guidelines](https://orbit.almasix.com/plugins/guidelines/).

## Local checks

```bash
npm ci
npm run validate
npm test
npm run build   # minimal preview → dist/
```

## Preview site

`npm run build` writes a static browse/detail preview under `dist/` for reviewers. The public catalog stays on orbit.almasix.com.
