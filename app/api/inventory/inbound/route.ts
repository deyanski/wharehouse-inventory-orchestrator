import { NextResponse } from 'next/server';
import { inventoryOperationRequestSchema } from '@/lib/contracts/inventory';
import { callN8nWebhook, getOptionalEnv } from '@/lib/server/n8n';

export async function POST(request: Request) {
  const payload = await request.json();

  const parsed = inventoryOperationRequestSchema.safeParse({
    ...payload,
    operation: 'inbound',
  });

  if (!parsed.success) {
    return NextResponse.json(
      {
        success: false,
        timestamp: new Date().toISOString(),
        error: {
          code: 'VALIDATION_ERROR',
          message: 'Inbound payload validation failed',
          details: parsed.error.flatten(),
        },
      },
      { status: 400 }
    );
  }

  const webhookResult = await callN8nWebhook('inventory/inbound', parsed.data, 12000, {
    webhookUrl: getOptionalEnv('N8N_INBOUND_WEBHOOK_URL'),
  });

  return NextResponse.json(webhookResult.body, {
    status: webhookResult.status,
  });
}
