# Authentication

The public archive does not require authentication.

- There is no user account, API key, bearer token, login endpoint, or private API.
- Static resources are public GET requests.
- `GET /api/views?path=/public/path` is public and only increments an aggregate page-view counter. It cannot edit site content.
- Do not send credentials, private data, or secrets to any site URL.

The machine-readable route and response details are in [openapi.json](https://nhanaz.io.vn/openapi.json).
