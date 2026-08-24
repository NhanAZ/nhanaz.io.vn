# nhanaz.io.vn

Personal blog, project archive, and living portfolio. Built with plain HTML, CSS, and a tiny bit of JavaScript, then validated and deployed to GitHub Pages with GitHub Actions.

## Public machine-readable resources

- Live site: https://nhanaz.io.vn/
- Agent guidance: https://nhanaz.io.vn/agent.md
- Short and full context: https://nhanaz.io.vn/llms.txt and https://nhanaz.io.vn/llms-full.txt
- Read-only resource schema: https://nhanaz.io.vn/openapi.json
- Developer notes: https://nhanaz.io.vn/developers/
- Agent discovery: https://nhanaz.io.vn/.well-known/ai-catalog.json and https://nhanaz.io.vn/.well-known/agent-skills/index.json

The site has no application API, account, authentication flow, or write endpoint. The OpenAPI document describes static GET resources only.

## Preview locally

From the repository root, run any static file server, for example:

```powershell
python -m http.server 4173
```

Then open `http://localhost:4173`.

## Add a bilingual post

1. Create the Vietnamese page in `posts/<slug>/index.html` and its manually edited English pair in `en/posts/<english-slug>/index.html`.
2. Update the title, description, canonical URL, dates, category, article body, and reciprocal `hreflang` links on both pages.
3. Add the post to the relevant home and blog indexes, then update both search indexes in `assets/js/site.js`.
4. Update `sitemap.xml`, `llms.txt`, `llms-full.txt`, and `entity.json` when the new content changes those sources.
5. Run the validation commands below before deployment.

## Update personal information

- Homepage copy: `index.html`
- Biography and contact: `about/index.html`
- Project case studies: `projects/index.html`
- Global styling: `assets/css/site.css`
- Space Grotesk files: `assets/fonts/`

## Deploy

Push to `main`. The workflow in `.github/workflows/static.yml` publishes the repository to GitHub Pages. The custom domain is preserved in `CNAME`.

Before pushing, run:

```powershell
node --check assets/js/site.js
node --check assets/js/theme.js
node --check scripts/build-english.mjs
node --check scripts/check-seo.mjs
node scripts/build-english.mjs
node scripts/check-seo.mjs
git diff --check
```

Older versions of the site are preserved on the `archive/legacy-notebook` and `archive/legacy-sunflower` branches.

Security issues should be reported privately as described in [SECURITY.md](SECURITY.md).

## License

The site code is available under the [MIT License](LICENSE). The bundled Space Grotesk font files remain under the [SIL Open Font License 1.1](assets/fonts/OFL.txt). Personal writing and images are not relicensed by the MIT file unless a page says otherwise.
