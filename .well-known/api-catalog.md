# nhanaz.io.vn API catalog

This is the Markdown twin of the [RFC 9727 API catalog](https://nhanaz.io.vn/.well-known/api-catalog).

The site exposes public, read-only agent surfaces:

- [OpenAPI document](https://nhanaz.io.vn/openapi.json) for static resources, the page-view counter, NLWeb `/ask`, MCP `/mcp`, and A2A `/a2a`.
- [Developer resources](https://nhanaz.io.vn/developers/) explaining the archive's scope and limits.
- [Agent card](https://nhanaz.io.vn/.well-known/agent-card.json) describing the read-only A2A interface.

The MCP server does not require credentials. It can find canonical archive pages, read allowlisted machine-readable resources, and open a read-only MCP Apps view.
