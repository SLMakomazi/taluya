# Ta Luya browser telemetry

Browser tracing is **opt-in** and disabled by default. The code is in `src/telemetry/otel.js` and initialized before the React root in `src/main.jsx`.

## Prerequisites

1. MadlangaAI (or another approved operator) must deploy an OTLP/HTTP gateway that accepts browser traffic at an HTTPS `/v1/traces` URL. MadlangaAI does **not** yet provide this endpoint.
2. Configure explicit allowed origins, payload limits, rate limits, retention, privacy filters and abuse prevention at the gateway. A browser cannot keep private ingestion credentials secret.
3. Ensure browser CSP `connect-src` and collector CORS allow the exact Ta Luya production origin.
4. Review telemetry data for privacy before enabling. This starter intentionally instruments document loading only, not form contents or fetch URLs.
5. Run `npm install` to install the new OpenTelemetry dependencies and refresh `package-lock.json`, then commit the lockfile. Verify with `npm ci && npm run build`.

## Vercel configuration

In Vercel → Ta Luya project → Settings → Environment Variables:

- `VITE_OTEL_ENABLED`: `true` (only after the gateway is approved and reachable).
- `VITE_OTEL_TRACES_URL`: `https://YOUR_APPROVED_GATEWAY/v1/traces` (full HTTPS URL).

Choose **Production** (and Preview only if its origin is separately approved). Redeploy after changing these values.

To leave telemetry off, omit both variables or set `VITE_OTEL_ENABLED=false`. Do not add API keys or private secrets to `VITE_*` variables: they are embedded in the browser bundle.

## What it does

It records supported browser document-load spans. It does **not** provide backend/database visibility, install an agent, create a collector or activate MadlangaAI monitoring. Verify receipt in the collector/tracing backend before claiming telemetry is connected.

## Operational notes

The gateway must prevent public ingestion abuse; CORS is not authentication. The example intentionally does not capture fetch/XHR traffic or user interaction until a separate privacy review. Browser OpenTelemetry instrumentation is experimental.
