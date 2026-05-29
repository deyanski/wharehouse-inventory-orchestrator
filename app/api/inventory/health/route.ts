import { NextResponse } from 'next/server';
import { healthCheckRequestSchema } from '@/lib/contracts/inventory';
import { callN8nWebhook } from '@/lib/server/n8n';

function buildHealthCheckRequest(
  includeDetails: boolean,
  source: string
): {
  requestId: string;
  timestamp: string;
  includeDetails: boolean;
  meta: { source: string; correlationId: string };
} {
  const requestId = crypto.randomUUID();
  return {
    requestId,
    timestamp: new Date().toISOString(),
    includeDetails,
    meta: {
      source,
      correlationId: `corr_${requestId}`,
    },
  };
}

async function executeHealthCheck(payload: unknown): Promise<NextResponse> {
  const parsed = healthCheckRequestSchema.safeParse(payload);

  if (!parsed.success) {
    return NextResponse.json(
      {
        success: false,
        timestamp: new Date().toISOString(),
        error: {
          code: 'VALIDATION_ERROR',
          message: 'Health-check payload validation failed',
          details: parsed.error.flatten(),
        },
      },
      { status: 400 }
    );
  }

  const webhookResult = await callN8nWebhook(
    'inventory/health-check',
    parsed.data
  );

  return NextResponse.json(webhookResult.body, {
    status: webhookResult.status,
  });
}

export async function POST(request: Request) {
  const payload = await request.json();
  return executeHealthCheck(payload);
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const includeDetails = searchParams.get('includeDetails') !== 'false';
  const payload = buildHealthCheckRequest(includeDetails, 'dashboard_manual');
  return executeHealthCheck(payload);
}
