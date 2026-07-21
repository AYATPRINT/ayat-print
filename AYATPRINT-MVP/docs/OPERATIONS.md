# Operations & Observability

## Logging
The backend utilizes `pino` for structured, high-performance JSON logging.
In production, logs should be aggregated using a service like Datadog, ElasticSearch, or AWS CloudWatch.

### Log Levels
- `info`: Standard operational events (e.g., order received, server started).
- `warn`: Recoverable errors or rate limits hit.
- `error`: System faults, AI API failures, database connection loss.

## Health Checks
- `/api/health`: Provides immediate readiness and liveness status of the node application and critical dependencies (like Gemini AI). Used by load balancers to route traffic safely.

## Security Controls
- **Helmet:** Automatically sets secure HTTP headers (HSTS, NoSniff, XSS protection).
- **CORS:** Configured to strictly limit API access to authorized frontend origins.
- **Validation:** All environment configurations are strictly typed and validated at startup using `Zod`. Failure to provide required secrets will crash the app defensively.
