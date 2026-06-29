# nhanaz.io.vn

Personal blog, project archive, and living portfolio. Built with plain HTML, CSS, and a tiny bit of JavaScript; deployed as-is to GitHub Pages.

## Preview locally

From the repository root, run any static file server, for example:

```powershell
python -m http.server 4173
```

Then open `http://localhost:4173`.

## Add a post

1. Copy `posts/chao-internet/index.html` into `posts/<slug>/index.html`.
2. Update its title, description, canonical URL, date, category, and article body.
3. Add the post row to `blog/index.html` and the latest section in `index.html`.
4. Add the final URL to `sitemap.xml`.

## Update personal information

- Homepage copy: `index.html`
- Biography and contact: `about/index.html`
- Project case studies: `projects/index.html`
- Global styling: `assets/css/site.css`
- Space Grotesk files: `assets/fonts/`

## Deploy

Push to `main`. The workflow in `.github/workflows/static.yml` publishes the repository to GitHub Pages. The custom domain is preserved in `CNAME`.

The previous site is archived on the `archive/legacy-2026-06-29` branch.
