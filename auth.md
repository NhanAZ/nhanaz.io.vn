# Authentication

The public archive does not require authentication.

## Discover

The origin publishes RFC 9728
[`oauth-protected-resource`](https://nhanaz.io.vn/.well-known/oauth-protected-resource)
metadata with an empty `bearer_methods_supported` array. This explicitly tells
clients that the public resource accepts no bearer-token method. There is no
OAuth authorization server, so RFC 8414 `oauth-authorization-server` metadata
is not advertised.

## Pick a method

Use ordinary HTTPS requests. No `agent_auth` flow, bearer token, API key, or
identity assertion is needed.

## Register

Not applicable. There is no `register_uri`, client registration endpoint, or
credential issuer.

## Claim

Not applicable. The site does not issue an identity assertion, ID-JAG, or
other credential.

## Use the credential

There is no credential to send. Do not add an `Authorization` header or send
private data to this public archive.

## Errors

Requests that use an unsupported credential are handled as ordinary public
HTTP requests. The API documents machine-readable errors with RFC 9457-style
fields. It does not return `WWW-Authenticate` because it does not challenge
callers.

## Revocation

Not applicable. No account, token, webhook, or private session exists to
revoke.

- There is no user account, API key, login endpoint, or private API.
- Static resources are public GET requests.
- `GET /api/views?path=/public/path` is public and only increments an aggregate page-view counter. It cannot edit site content.
- Do not send credentials, private data, or secrets to any site URL.

The machine-readable route and response details are in [openapi.json](https://nhanaz.io.vn/openapi.json).
