import { NextResponse } from 'next/server';
import { z } from 'zod';
import { callN8nWebhook, getRequiredEnv } from '@/lib/server/n8n';

const n8nHealthResponseItemSchema = z.object({
  data: z.object({
    success: z.literal(true),
    lowStockItems: z
      .array(
        z.object({
          itemname: z.string(),
          category: z.string(),
          stocklevel: z.number(),
          reorderpoint: z.number(),
        })
      )
      .default([]),
  }),
});

const n8nHealthResponseSchema = z.union([
  z.array(n8nHealthResponseItemSchema).min(1),
  n8nHealthResponseItemSchema,
]);

const apiHealthItemSchema = z.object({
  id: z.string().optional(),
  itemName: z.string(),
  category: z.string(),
  stockLevel: z.number(),
  reorderPoint: z.number(),
  gap: z.number().optional(),
  supplierEmail: z.string().optional(),
});

const apiHealthResponseSchema = z.object({
  success: z.literal(true),
  requestId: z.string(),
  timestamp: z.string(),
  lowStockItems: z.array(apiHealthItemSchema),
  lowStockCount: z.number(),
});

function buildHealthPayload(includeDetails: boolean) {
  const requestId = crypto.randomUUID();
  return {
    requestId,
    timestamp: new Date().toISOString(),
    includeDetails,
    meta: {
      source: 'dashboard_low_stock',
      correlationId: `corr_${requestId}`,
    },
  };
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const includeDetails = searchParams.get('includeDetails') !== 'false';
  const payload = buildHealthPayload(includeDetails);

  const result = await callN8nWebhook('inventory/health-check', payload, 12000, {
    webhookUrl: getRequiredEnv('N8N_HEALTHCHECK_WEBHOOK_URL'),
  });

  if (!result.ok) {
    return NextResponse.json(result.body, { status: result.status });
  }

  const parsed = n8nHealthResponseSchema.safeParse(result.body);
  if (!parsed.success) {
    return NextResponse.json(
      {
        success: false,
        requestId: payload.requestId,
        timestamp: new Date().toISOString(),
        error: {
          code: 'WEBHOOK_RESPONSE_INVALID',
          message: 'Health webhook returned unexpected payload shape',
          details: parsed.error.flatten(),
        },
      },
      { status: 502 }
    );
  }

  const rawHealthResponse = Array.isArray(parsed.data) ? parsed.data[0] : parsed.data;
  const normalizedItems = rawHealthResponse.data.lowStockItems.map((item) => ({
    itemName: item.itemname,
    category: item.category,
    stockLevel: item.stocklevel,
    reorderPoint: item.reorderpoint,
  }));

  const apiResponse = {
    success: true,
    requestId: payload.requestId,
    timestamp: new Date().toISOString(),
    lowStockCount: normalizedItems.length,
    lowStockItems: normalizedItems,
  };

  const apiParsed = apiHealthResponseSchema.safeParse(apiResponse);
  if (!apiParsed.success) {
    return NextResponse.json(
      {
        success: false,
        requestId: payload.requestId,
        timestamp: new Date().toISOString(),
        error: {
          code: 'API_RESPONSE_INVALID',
          message: 'Normalized health response failed validation',
          details: apiParsed.error.flatten(),
        },
      },
      { status: 500 }
    );
  }

  return NextResponse.json(
    apiParsed.data,
    { status: 200 }
  );
}
