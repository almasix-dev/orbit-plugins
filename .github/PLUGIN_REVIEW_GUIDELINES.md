# Plugin marketplace review guidelines

Maintainer-facing notes for reviewing submissions to this registry.
Authors should read [Get listed](https://orbit.almasix.com/plugins/get-listed/) and
[Listing guidelines](https://orbit.almasix.com/plugins/guidelines/) instead.

## Review order

1. CI is green — `npm run validate` and `npm test` catch schema errors, unknown
   categories, dangling author references, reserved slugs, and missing images.
2. The PR only touches `plugins/**`, `authors/**`, `categories.yaml`, and
   `public/plugins/**`.
3. Install the package yourself if it is free: `pip install <package>` on a supported
   Orbit version, then `panel.plugin(...)` in a scratch panel.
4. Read the listing in the preview build (`npm run build` → `dist/<slug>/`). Check both themes.
5. For paid plugins, complete the private source review below before approving.

After merge, `dispatch-docs.yml` rebuilds the public catalog. That needs
`ORBIT_DOCS_DEPLOY_HOOK` (Cloudflare Workers Builds deploy hook for
`almasix-orbit-docs`, branch `main`). `ORBIT_DOCS_DISPATCH_TOKEN` only starts
the GitHub docs workflow, which does not deploy. The catalog is
[orbit.almasix.com/plugins](https://orbit.almasix.com/plugins/).

## Standard replies

Copy, adjust, and post. Keep the tone friendly; most authors are first-time contributors.

### Purpose unclear

```md
Thanks for the submission! Right now it is hard to tell from the description what the
plugin does in practice. Could you expand it with the problem it solves, the one-liner
that wires it into a panel, and a screenshot or two? Ping us here once it is updated.
```

### Not an Orbit plugin

```md
Thanks for this! Looking at the code, it reads as a general Python package rather than
something specific to Orbit — nothing in it depends on panels, schemas, tables, or
actions. The marketplace is for Orbit-specific extensions, so we are going to pass on
the listing. Publishing it to PyPI and linking it from your Orbit plugin's docs is a
great option.
```

### Image does not meet the bar

```md
Your thumbnail needs to be 16:9 and at least 1280x720 (2560x1440 preferred). It also
works best cropped to the feature itself rather than a full panel screenshot — the
sidebar and topbar take up most of the frame at card size. Let us know once it is
swapped in.
```

### Missing or relative image paths

```md
Image paths must be site-absolute (`/plugins/your-slug/thumbnail.jpg`, committed under
`public/plugins/`) or absolute `https://` URLs. Relative paths will not resolve on
the marketplace.
```

### Unknown or wrong category

```md
`categories` must use keys from `categories.yaml`. Pick the closest existing ones; if
nothing fits, open an issue and we will discuss adding a category before merging this
listing.
```

### Naming and casing

```md
Small one: please capitalize "Orbit" and "Almasix" consistently in the listing and
README, and rename the distribution away from the `almasix-orbit-*` prefix — that
namespace is reserved for packages we maintain. `<vendor>-orbit-<feature>` works well.
```

### Namespace stomping

```md
The wheel ships an `almasix/__init__.py`, which overwrites the framework namespace and
breaks other Orbit packages in the same environment. Please remove it and publish a new
release before we list this.
```

### Paid plugin — private review

```md
Thanks! Since this is a paid plugin, one of us needs to review the private source before
it goes live. Please add @<maintainer> to the private repository (read access is enough)
or send a copy of the wheel. We check packaging hygiene, namespace safety, network
calls, and licensing enforcement — nothing is redistributed.
```

### Paid plugin — checkout problems

```md
The `checkout_url` needs to land on a page where a buyer can actually complete the
purchase and see the listed price. Right now it points at a marketing page, so people
would have to hunt for the product. Could you link the product page directly?
```

### Free listing that is really a trial

```md
This listing is marked free, but the package stops working without a paid license. List
it as paid with the real price, or ship a genuinely usable free edition and a separate
paid listing for the pro version.
```

### Design does not fit a panel

```md
The plugin looks quite different from the rest of a panel — it brings its own design
system rather than using Orbit's components and CSS tokens. That contrast tends to put
people off installing it. Reusing Orbit's components would help a lot here.
```

### Allow maintainer edits

```md
Could you re-open this PR with "Allow edits by maintainers" enabled? It lets us fix
small things like a category key or a typo directly instead of sending the PR back.
```

## Articles

Articles are full Markdown pages under `articles/<slug>.yaml` with images in
`public/articles/`. They are not plugins — reject `price`, `package`, `orbit_versions`,
and plugin `categories` if someone pastes a listing template by mistake.

Checklist for reviewers:

1. CI green (author exists, related plugins resolve and are published, images present).
2. `body` is substantive Markdown, not only a link out to another site (`canonical_url`
   is fine as an optional original, but the Orbit page must stand alone).
3. Thumbnail (if present) reads at card size; every `images[]` entry has real `alt` text.
4. Tags are lowercase kebab or single words; keep the set small.
5. `features.official` only when `author: almasix`.

### Article body too thin

```md
Thanks for the draft! The marketplace article page should carry the full write-up in
`body`, not just a teaser that points elsewhere. Could you expand it with the sections
a reader needs, then keep `canonical_url` only if there is also an external original?
```

### Article images missing or wrong path

```md
Article images live under `public/articles/<slug>/` and must be referenced as
`/articles/<slug>/…` (or an `https://` URL). Paths under `/plugins/` will not resolve
for articles.
```

## Unlisting

Unlist (delete the YAML, keep the git history) when:

- an unpatched security issue is reported and the author is unresponsive or unwilling;
- the plugin no longer installs on any supported Orbit version and the author is unreachable;
- a paid listing's price or checkout no longer matches the registry entry after a reminder;
- the package is removed from PyPI or the store.

Always open the unlisting PR with a short reason in the description, and try to contact
the author first through their listed channels.

## Setting `features.official` / `features.featured`

- `official: true` only for plugins Almasix maintains, and only when `author` is `almasix`.
  The validator rejects official flags on other authors.
- `featured: true` is a maintainer curation call. Keep the featured row small (four or
  fewer), refresh it occasionally, and do not sell placement.
- `status: archived` hides a retired listing without deleting git history. Prefer this
  over deleting YAML when people may still hold a copy of the package.
