/**
 * Ta Luya browser tracing. Opt-in: no collector URL means no SDK initialization.
 * Never put private credentials in VITE_* environment variables.
 * Browser tracing is experimental. This intentionally limits collection to
 * document loading; network tracing can be added after a privacy review.
 */
import { WebTracerProvider } from '@opentelemetry/sdk-trace-web';
import { BatchSpanProcessor } from '@opentelemetry/sdk-trace-base';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';
import { defaultResource, resourceFromAttributes } from '@opentelemetry/resources';
import { ATTR_SERVICE_NAME } from '@opentelemetry/semantic-conventions';
import { registerInstrumentations } from '@opentelemetry/instrumentation';
import { DocumentLoadInstrumentation } from '@opentelemetry/instrumentation-document-load';

let initialized = false;

export function initializeTelemetry() {
  if (initialized || typeof window === 'undefined') return false;

  const rawEndpoint = import.meta.env.VITE_OTEL_TRACES_URL?.trim();
  const enabled = import.meta.env.VITE_OTEL_ENABLED === 'true';
  if (!enabled || !rawEndpoint) return false;

  let endpoint;
  try {
    endpoint = new URL(rawEndpoint);
  } catch {
    console.warn('[telemetry] Invalid collector URL; tracing disabled.');
    return false;
  }

  if (endpoint.protocol !== 'https:' || endpoint.username || endpoint.password ||
      endpoint.search || endpoint.hash || endpoint.pathname !== '/v1/traces') {
    console.warn('[telemetry] Collector must be a clean HTTPS /v1/traces URL; tracing disabled.');
    return false;
  }

  const resource = defaultResource().merge(resourceFromAttributes({
    [ATTR_SERVICE_NAME]: 'ta-luya-web',
    'deployment.environment.name': import.meta.env.MODE === 'production' ? 'production' : 'development',
    'application.id': 'ta-luya',
  }));

  const provider = new WebTracerProvider({
    resource,
    spanProcessors: [
      new BatchSpanProcessor(new OTLPTraceExporter({ url: endpoint.toString() })),
    ],
  });

  provider.register();
  registerInstrumentations({
    tracerProvider: provider,
    instrumentations: [new DocumentLoadInstrumentation()],
  });
  initialized = true;
  return true;
}
