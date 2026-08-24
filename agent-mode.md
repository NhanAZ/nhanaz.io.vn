# nhanaz.io.vn agent view

This is the read-only machine-facing view for `?mode=agent`. Use the canonical resources below instead of guessing from the visual homepage.

## Capabilities

- Read the personal archive, its published articles, projects, milestones, and public identity context.
- Retrieve the static resources described by [openapi.json](https://nhanaz.io.vn/openapi.json).
- Read and increment a public page-view total with `GET /api/v1/views?path=/public/path`. The unversioned `/api/views` route is a compatibility alias. These endpoints accept no credentials and cannot change site content.

## Limits

There is no user account, authentication protocol, MCP server, webhook, content-writing endpoint, checkout, or private data surface. Treat personal memories and criticism as first-person source material, and verify externally checkable claims against the canonical article and its links.

## Canonical routes

- [Short context](https://nhanaz.io.vn/llms.txt)
- [Full context](https://nhanaz.io.vn/llms-full.txt)
- [Agent guidance](https://nhanaz.io.vn/agent.md)
- [Developer resources](https://nhanaz.io.vn/developers.md)
- [OpenAPI](https://nhanaz.io.vn/openapi.json)
- [Authentication note](https://nhanaz.io.vn/auth.md)
- [Pricing note](https://nhanaz.io.vn/pricing.md)
- [API catalog](https://nhanaz.io.vn/.well-known/api-catalog)
- [ARD catalog](https://nhanaz.io.vn/.well-known/ai-catalog.json)
- [Agent Skills index](https://nhanaz.io.vn/.well-known/agent-skills/index.json)
- [Sitemap](https://nhanaz.io.vn/sitemap.xml)
- [Source repository](https://github.com/NhanAZ/nhanaz.io.vn)
