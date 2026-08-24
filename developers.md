---
title: Developer resources for nhanaz.io.vn
description: Markdown twin of the developer resource page, with static machine-readable entry points and site limits.
canonical: https://nhanaz.io.vn/developers/
last-updated: 2026-08-24
---

# Developer resources for nhanaz.io.vn

This is the Markdown twin of the [developer resource page](https://nhanaz.io.vn/developers/).

The [`/sandbox`](https://nhanaz.io.vn/sandbox) endpoint returns deterministic fixture data for testing and never touches production counter storage.

Use [llms.txt](https://nhanaz.io.vn/llms.txt), [llms-full.txt](https://nhanaz.io.vn/llms-full.txt), [entity.json](https://nhanaz.io.vn/entity.json), and the [sitemap](https://nhanaz.io.vn/sitemap.xml) to read the archive. The scoped [developers/llms.txt](https://nhanaz.io.vn/developers/llms.txt), [Agent Skills index](https://nhanaz.io.vn/.well-known/agent-skills/index.json), and [ARD catalog](https://nhanaz.io.vn/.well-known/ai-catalog.json) describe read-only documentation.

This personal website has no user account, OAuth flow, webhook, or endpoint that changes content. It now exposes public, read-only agent interfaces. [Documentation MCP](https://nhanaz.io.vn/mcp) provides tools and resources for finding and reading the archive, including the MCP Apps resource `ui://nhanaz/archive.html`. [Product MCP](https://nhanaz.io.vn/mcp/product) reads aggregate page-view totals without incrementing them. [A2A](https://nhanaz.io.vn/a2a) accepts read-only JSON-RPC messages and is described by the [Agent Card](https://nhanaz.io.vn/.well-known/agent-card.json). [A2UI](https://nhanaz.io.vn/a2ui) returns a declarative v1.0 archive surface. [NLWeb `/ask`](https://nhanaz.io.vn/ask) searches a curated public index and can return JSON or SSE, without calling an LLM. The [OpenAPI document](https://nhanaz.io.vn/openapi.json) describes these surfaces, static GET resources, and the small public page-view counter at [`/api/v1/views`](https://nhanaz.io.vn/api/v1/views). The public [authentication note](https://nhanaz.io.vn/auth.md), [pricing note](https://nhanaz.io.vn/pricing.md), [API versioning policy](https://nhanaz.io.vn/api-versioning.md), [API catalog](https://nhanaz.io.vn/.well-known/api-catalog), and [schema map](https://nhanaz.io.vn/schema-map.xml) make those limits machine-readable. For source and coding-agent rules, use the [GitHub repository](https://github.com/NhanAZ/nhanaz.io.vn) and its [AGENTS.md](https://github.com/NhanAZ/nhanaz.io.vn/blob/main/AGENTS.md).
