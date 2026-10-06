# nhanaz.io.vn

Personal blog, project archive, and living portfolio. Built with plain HTML, CSS, and a tiny bit of JavaScript, validated with GitHub Actions, and deployed through Vercel's Git integration.

## Public machine-readable resources

- Live site: https://nhanaz.io.vn/
- Agent guidance: https://nhanaz.io.vn/agent.md
- Short and full context: https://nhanaz.io.vn/llms.txt and https://nhanaz.io.vn/llms-full.txt
- Resource schema and counter endpoint: https://nhanaz.io.vn/openapi.json
- Developer notes: https://nhanaz.io.vn/developers/
- Agent discovery: https://nhanaz.io.vn/.well-known/ai-catalog.json and https://nhanaz.io.vn/.well-known/agent-skills/index.json

The site has no account, authentication flow, or endpoint for changing content. It also exposes read-only MCP at `/mcp`, A2A at `/a2a`, A2UI at `/a2ui`, and NLWeb-compatible archive search at `/ask`. The OpenAPI document describes those surfaces, static GET resources, and the small public page-view counter at `/api/views`.

## Preview locally

From the repository root, run the static server with HTTP Range support for audio seeking:

```powershell
npm run serve
```

Then open `http://127.0.0.1:4174`.

## Add a bilingual post

1. Create the Vietnamese page in `posts/<slug>/index.html` and its manually edited English pair in `en/posts/<english-slug>/index.html`.
2. Update the title, description, canonical URL, dates, category, article body, and reciprocal `hreflang` links on both pages.
3. Add the post to the relevant home and blog indexes, then update both search indexes in `assets/js/site.js`.
4. Update `sitemap.xml`, `llms.txt`, `llms-full.txt`, and `entity.json` when the new content changes those sources.
5. Load `/assets/js/article-audio.js` with the current query version, then run `npm run audio` and `npm run audio:check` to generate both recordings. See [the audio guide](docs/article-audio.md) for the one-time Python setup.
6. Run the validation commands below before deployment.

## Update personal information

- Homepage copy: `index.html`
- Biography and contact: `about/index.html`
- Project case studies: `projects/index.html`
- Global styling: `assets/css/site.css`
- Space Grotesk files: `assets/fonts/`

## Deploy

Push to `main` when authorized. `.github/workflows/static.yml` validates the public pages and recordings. Vercel's existing Git integration builds the public artifact with `scripts/build-vercel.mjs`. `.github/workflows/article-audio.yml` generates missing or stale recordings and commits only audio assets. Use Git deployment for the full audio collection, since Vercel Hobby limits CLI source uploads to 100 MB.

Before pushing, run:

```powershell
node --check assets/js/site.js
node --check assets/js/theme.js
node --check assets/js/article-audio.js
node --check scripts/article-audio.mjs
node --check scripts/serve.mjs
node --check scripts/build-english.mjs
node --check scripts/check-seo.mjs
node --check scripts/build-vercel.mjs
node scripts/build-english.mjs
node scripts/check-seo.mjs
npm run audio:check
node --test scripts/article-audio.test.mjs
node scripts/build-vercel.mjs
git diff --check
```

Older versions of the site are preserved on the `archive/legacy-notebook` and `archive/legacy-sunflower` branches.

Security issues should be reported privately as described in [SECURITY.md](SECURITY.md).

## License

The site code is available under the [MIT License](LICENSE). The bundled Space Grotesk font files remain under the [SIL Open Font License 1.1](assets/fonts/OFL.txt). Personal writing and images are not relicensed by the MIT file unless a page says otherwise.
