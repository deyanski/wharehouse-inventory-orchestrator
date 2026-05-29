# Webhook Contracts (V1)

This folder contains canonical JSON examples used for V1 integration between Next.js API routes and n8n workflows.

## Files

- `inventory-operation.request.json`
- `inventory-operation.response.success.json`
- `inventory-operation.response.error.json`
- `inventory-health.request.json`
- `inventory-health.request.schema.json`
- `inventory-health.response.success.json`
- `inventory-health.response.schema.json`

## Notes

- Request payloads include `requestId` and `timestamp` for tracing.
- Inventory operation requests include `inventoryId` (UUID from `inventory.id`) to uniquely identify the target row.
- Inventory operation success responses from n8n may omit `requestId`, `timestamp`, and `operationId`.
- Inventory operation success responses from n8n currently come as an array with `item_name` (snake_case).
- Error responses use a normalized `error` object with `code`, `message`, and optional `details`.
- Health-check n8n responses use a nested `data` envelope with lowercase item fields; the Next.js route normalizes them for the UI-facing API.
- AI/MCP/chat payloads are deferred and intentionally excluded from V1 contracts.
