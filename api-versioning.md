# API versioning policy

The only application-style endpoint is the public page-view counter.

- Current route: `GET /api/v1/views?path=/public/path`
- Compatibility alias: `GET /api/views?path=/public/path`
- The alias is not deprecated and has no sunset date.
- If a future version needs to change or remove the alias, this page, `openapi.json`, and the developer resource page will be updated before the change.
- There are no write operations, account operations, asynchronous jobs, pagination requirements, or authenticated resources in this API.
