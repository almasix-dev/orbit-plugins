/**
 * Minimal static preview of published plugins and articles — for authors and reviewers.
 * The public catalog remains at orbit.almasix.com/plugins and /articles.
 */
import { cpSync, existsSync, mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { parse } from 'yaml';

const root = path.resolve(fileURLToPath(import.meta.url), '../..');
const dist = path.join(root, 'dist');

function loadYaml(file) {
	return parse(readFileSync(file, 'utf8'));
}

function escapeHtml(text) {
	return String(text ?? '')
		.replaceAll('&', '&amp;')
		.replaceAll('<', '&lt;')
		.replaceAll('>', '&gt;')
		.replaceAll('"', '&quot;');
}

function priceLabel(price) {
	if (price === 'free') return 'Free';
	if (price && typeof price === 'object') {
		return new Intl.NumberFormat('en-US', {
			style: 'currency',
			currency: price.currency,
			minimumFractionDigits: Number.isInteger(price.amount) ? 0 : 2,
		}).format(price.amount);
	}
	return '—';
}

function layout({ title, body }) {
	return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${escapeHtml(title)}</title>
  <style>
    :root { color-scheme: light dark; --fg: #1a1a1a; --muted: #5c5c5c; --border: #d4d4d4; --card: #f7f7f7; --accent: #0d6e6e; }
    @media (prefers-color-scheme: dark) {
      :root { --fg: #f0f0f0; --muted: #a3a3a3; --border: #333; --card: #1c1c1c; --accent: #5ec8c8; }
    }
    * { box-sizing: border-box; }
    body { margin: 0; font: 16px/1.5 system-ui, sans-serif; color: var(--fg); background: #fff; }
    @media (prefers-color-scheme: dark) { body { background: #111; } }
    header { padding: 1.25rem 1.5rem; border-bottom: 1px solid var(--border); display: flex; gap: 1rem; flex-wrap: wrap; align-items: center; }
    header a { color: var(--accent); text-decoration: none; font-weight: 600; }
    main { max-width: 56rem; margin: 0 auto; padding: 1.5rem; }
    .note { color: var(--muted); font-size: 0.9rem; margin-bottom: 1.5rem; }
    .grid { display: grid; gap: 1rem; grid-template-columns: repeat(auto-fill, minmax(16rem, 1fr)); }
    .card { border: 1px solid var(--border); border-radius: 0.75rem; padding: 1rem; background: var(--card); }
    .card a { color: inherit; text-decoration: none; }
    .card h2 { margin: 0 0 0.35rem; font-size: 1.1rem; }
    .meta { color: var(--muted); font-size: 0.85rem; }
    .thumb { width: 100%; aspect-ratio: 16/9; object-fit: cover; border-radius: 0.5rem; margin-bottom: 0.75rem; background: var(--border); }
    .badge { display: inline-block; padding: 0.1rem 0.45rem; border-radius: 999px; border: 1px solid var(--border); font-size: 0.75rem; margin-right: 0.35rem; }
    pre { overflow: auto; padding: 0.75rem; border-radius: 0.5rem; background: var(--card); border: 1px solid var(--border); }
    .shots { display: grid; gap: 0.75rem; }
    .shots img { max-width: 100%; border-radius: 0.5rem; border: 1px solid var(--border); }
    .prose { white-space: pre-wrap; }
  </style>
</head>
<body>
  <header>
    <a href="/">Plugins</a>
    <a href="/articles/">Articles</a>
  </header>
  <main>${body}</main>
</body>
</html>`;
}

function loadAuthors() {
	const authors = new Map();
	for (const name of readdirSync(path.join(root, 'authors')).filter((n) => n.endsWith('.yaml'))) {
		const data = loadYaml(path.join(root, 'authors', name));
		authors.set(data.slug, data);
	}
	return authors;
}

function loadPublishedPlugins(authors) {
	const plugins = [];
	for (const name of readdirSync(path.join(root, 'plugins')).filter((n) => n.endsWith('.yaml'))) {
		const data = loadYaml(path.join(root, 'plugins', name));
		if ((data.status ?? 'published') !== 'published') continue;
		plugins.push({ ...data, authorProfile: authors.get(data.author) });
	}
	plugins.sort((a, b) => String(b.published_at).localeCompare(String(a.published_at)));
	return plugins;
}

function loadPublishedArticles(authors) {
	const articlesDir = path.join(root, 'articles');
	if (!existsSync(articlesDir)) return [];
	const articles = [];
	for (const name of readdirSync(articlesDir).filter((n) => n.endsWith('.yaml'))) {
		const data = loadYaml(path.join(articlesDir, name));
		if ((data.status ?? 'published') !== 'published') continue;
		articles.push({ ...data, authorProfile: authors.get(data.author) });
	}
	articles.sort((a, b) => String(b.published_at).localeCompare(String(a.published_at)));
	return articles;
}

function writeIndex(plugins) {
	const cards = plugins
		.map((plugin) => {
			const thumb = plugin.thumbnail
				? `<img class="thumb" src="${escapeHtml(plugin.thumbnail)}" alt="" />`
				: '';
			const badges = [
				`<span class="badge">${escapeHtml(priceLabel(plugin.price))}</span>`,
				...(plugin.features?.official ? ['<span class="badge">Official</span>'] : []),
			].join('');
			return `<article class="card">
  <a href="/${escapeHtml(plugin.slug)}/">
    ${thumb}
    <h2>${escapeHtml(plugin.name)}</h2>
    <p class="meta">${escapeHtml(plugin.summary)}</p>
    <p>${badges}</p>
  </a>
</article>`;
		})
		.join('\n');

	writeFileSync(
		path.join(dist, 'index.html'),
		layout({
			title: 'Orbit plugins registry',
			body: `<p class="note">Preview of published listings. The live catalog is
  <a href="https://orbit.almasix.com/plugins/">orbit.almasix.com/plugins</a>.</p>
  <div class="grid">${cards || '<p class="meta">No published plugins yet.</p>'}</div>`,
		}),
	);
}

function writeListing(plugin) {
	const dir = path.join(dist, plugin.slug);
	mkdirSync(dir, { recursive: true });
	const install = plugin.package
		? `<pre><code>pip install ${escapeHtml(plugin.package)}</code></pre>`
		: '';
	const shots = (plugin.screenshots ?? [])
		.map(
			(shot) =>
				`<figure><img src="${escapeHtml(shot.src)}" alt="${escapeHtml(shot.alt)}" /><figcaption class="meta">${escapeHtml(shot.alt)}</figcaption></figure>`,
		)
		.join('\n');
	const thumb = plugin.thumbnail
		? `<img class="thumb" src="${escapeHtml(plugin.thumbnail)}" alt="" />`
		: '';

	writeFileSync(
		path.join(dir, 'index.html'),
		layout({
			title: `${plugin.name} · Orbit plugins`,
			body: `<p class="meta"><a href="/">← All plugins</a></p>
  <h1>${escapeHtml(plugin.name)}</h1>
  <p>${escapeHtml(plugin.summary)}</p>
  <p class="meta">${escapeHtml(priceLabel(plugin.price))} · ${escapeHtml(plugin.authorProfile?.name ?? plugin.author)} · Orbit ${escapeHtml((plugin.orbit_versions ?? []).join(', '))}</p>
  ${thumb}
  ${install}
  <div class="shots">${shots}</div>
  <p class="note">Public listing: <a href="https://orbit.almasix.com/plugins/${escapeHtml(plugin.slug)}/">orbit.almasix.com/plugins/${escapeHtml(plugin.slug)}/</a></p>`,
		}),
	);
}

function writeArticlesIndex(articles) {
	const dir = path.join(dist, 'articles');
	mkdirSync(dir, { recursive: true });
	const cards = articles
		.map((article) => {
			const thumb = article.thumbnail
				? `<img class="thumb" src="${escapeHtml(article.thumbnail)}" alt="" />`
				: '';
			const badges = [
				...(article.features?.official ? ['<span class="badge">Official</span>'] : []),
				...(article.features?.featured ? ['<span class="badge">Featured</span>'] : []),
				...(article.tags ?? []).map((tag) => `<span class="badge">${escapeHtml(tag)}</span>`),
			].join('');
			return `<article class="card">
  <a href="/articles/${escapeHtml(article.slug)}/">
    ${thumb}
    <h2>${escapeHtml(article.name)}</h2>
    <p class="meta">${escapeHtml(article.summary)}</p>
    <p>${badges}</p>
  </a>
</article>`;
		})
		.join('\n');

	writeFileSync(
		path.join(dir, 'index.html'),
		layout({
			title: 'Orbit marketplace articles',
			body: `<p class="note">Preview of published articles. The live catalog is
  <a href="https://orbit.almasix.com/articles/">orbit.almasix.com/articles</a>.</p>
  <div class="grid">${cards || '<p class="meta">No published articles yet.</p>'}</div>`,
		}),
	);
}

function writeArticle(article) {
	const dir = path.join(dist, 'articles', article.slug);
	mkdirSync(dir, { recursive: true });
	const thumb = article.thumbnail
		? `<img class="thumb" src="${escapeHtml(article.thumbnail)}" alt="" />`
		: '';
	const shots = (article.images ?? [])
		.map(
			(image) =>
				`<figure><img src="${escapeHtml(image.src)}" alt="${escapeHtml(image.alt)}" /><figcaption class="meta">${escapeHtml(image.alt)}</figcaption></figure>`,
		)
		.join('\n');
	const related = (article.related_plugins ?? [])
		.map((slug) => `<li><a href="/${escapeHtml(slug)}/">${escapeHtml(slug)}</a></li>`)
		.join('');

	writeFileSync(
		path.join(dir, 'index.html'),
		layout({
			title: `${article.name} · Orbit articles`,
			body: `<p class="meta"><a href="/articles/">← All articles</a></p>
  <h1>${escapeHtml(article.name)}</h1>
  <p>${escapeHtml(article.summary)}</p>
  <p class="meta">${escapeHtml(article.authorProfile?.name ?? article.author)} · ${escapeHtml(String(article.published_at))}</p>
  ${thumb}
  <div class="prose">${escapeHtml(article.body)}</div>
  <div class="shots">${shots}</div>
  ${related ? `<h2>Related plugins</h2><ul>${related}</ul>` : ''}
  <p class="note">Public article: <a href="https://orbit.almasix.com/articles/${escapeHtml(article.slug)}/">orbit.almasix.com/articles/${escapeHtml(article.slug)}/</a></p>`,
		}),
	);
}

rmSync(dist, { recursive: true, force: true });
mkdirSync(dist, { recursive: true });
const authors = loadAuthors();
const plugins = loadPublishedPlugins(authors);
const articles = loadPublishedArticles(authors);
writeIndex(plugins);
for (const plugin of plugins) writeListing(plugin);
writeArticlesIndex(articles);
for (const article of articles) writeArticle(article);
if (existsSync(path.join(root, 'public', 'plugins'))) {
	cpSync(path.join(root, 'public', 'plugins'), path.join(dist, 'plugins'), { recursive: true });
}
if (existsSync(path.join(root, 'public', 'articles'))) {
	cpSync(path.join(root, 'public', 'articles'), path.join(dist, 'articles'), {
		recursive: true,
	});
}
console.log(
	`Built ${plugins.length} plugin(s) and ${articles.length} article(s) → dist/`,
);
