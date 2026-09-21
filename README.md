# Orbit plugins registry

YAML listings, articles, and images for the [Orbit plugin marketplace](https://orbit.almasix.com/plugins/) and [articles](https://orbit.almasix.com/articles/).

Authors open pull requests **here**. After merge, the Orbit docs site fetches this registry and rebuilds the public catalog.

## Layout

```text
categories.yaml          # maintainer-owned plugin category list
authors/<slug>.yaml      # one file per author
plugins/<slug>.yaml      # one file per plugin listing
articles/<slug>.yaml     # one file per marketplace article
public/plugins/          # plugin thumbnails, screenshots, avatars
public/articles/         # article heroes and figures
```

## Submit or update

Ship changes via **pull request** (YAML + images). Open an **issue** first only if you want feedback or need a maintainer to apply the change.

| Intent | Issue | Pull request |
|--------|-------|----------------|
| New plugin | [New plugin](https://github.com/almasix-dev/orbit-plugins/issues/new?template=new-plugin.yml) | [PR template](https://github.com/almasix-dev/orbit-plugins/compare?template=new-plugin.md) |
| Edit plugin | [Edit plugin](https://github.com/almasix-dev/orbit-plugins/issues/new?template=edit-plugin.yml) | [PR template](https://github.com/almasix-dev/orbit-plugins/compare?template=edit-plugin.md) |
| New article | [New article](https://github.com/almasix-dev/orbit-plugins/issues/new?template=new-article.yml) | [PR template](https://github.com/almasix-dev/orbit-plugins/compare?template=new-article.md) |
| Edit article | [Edit article](https://github.com/almasix-dev/orbit-plugins/issues/new?template=edit-article.yml) | [PR template](https://github.com/almasix-dev/orbit-plugins/compare?template=edit-article.md) |
| New author | [New author](https://github.com/almasix-dev/orbit-plugins/issues/new?template=new-author.yml) | [PR template](https://github.com/almasix-dev/orbit-plugins/compare?template=new-author.md) |
| Edit author | [Edit author](https://github.com/almasix-dev/orbit-plugins/issues/new?template=edit-author.yml) | [PR template](https://github.com/almasix-dev/orbit-plugins/compare?template=edit-author.md) |
| New category | [Category issue](https://github.com/almasix-dev/orbit-plugins/issues/new?template=marketplace-category.yml) | Maintainer PR |

Typical plugin listing flow:

1. Scaffold draft YAML with `smith make:orbit-plugin …` (or copy `plugins/example-plugin.yaml` / `authors/example-author.yaml`).
2. Add images under `public/plugins/<your-slug>/`.
3. Set `status: published`.
4. Open a PR with the matching template above.

Articles: copy `articles/example-article.yaml`, write the Markdown `body`, add images under `public/articles/<slug>/`, then open a PR with the article template.

Guides: [Get listed](https://orbit.almasix.com/plugins/get-listed/) · [Write an article](https://orbit.almasix.com/plugins/write-an-article/) · [Listing guidelines](https://orbit.almasix.com/plugins/guidelines/).

## Local checks

```bash
npm ci
npm run validate
npm test
npm run build   # minimal preview → dist/
```

## Preview site

`npm run build` writes a static browse/detail preview under `dist/` (plugins + `/articles/`) for reviewers. The public catalog stays on orbit.almasix.com.
