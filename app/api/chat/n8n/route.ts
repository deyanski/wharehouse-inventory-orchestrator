import { NextResponse } from 'next/server';
import { callN8nWebhook, getRequiredEnv } from '@/lib/server/n8n';

function asRecord(value: unknown): Record<string, unknown> | null {
  if (value && typeof value === 'object' && !Array.isArray(value)) {
    return value as Record<string, unknown>;
  }
  return null;
}

export async function POST(request: Request) {
  let payload: unknown;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'INVALID_JSON',
          message: 'Request body must be valid JSON.',
        },
      },
      { status: 400 }
    );
  }

  const body = asRecord(payload);
  const chatInput = body && typeof body.chatInput === 'string' ? body.chatInput.trim() : '';
  const sessionId =
    body && typeof body.sessionId === 'string' ? body.sessionId : `session_${crypto.randomUUID()}`;
  const meta = body ? body.meta : undefined;

  if (chatInput.length === 0) {
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'VALIDATION_ERROR',
          message: 'chatInput is required.',
        },
      },
      { status: 400 }
    );
  }

  let webhookUrl: string;
  try {
    webhookUrl = getRequiredEnv('N8N_CHAT_WEBHOOK_URL');
  } catch {
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'MISSING_CHAT_WEBHOOK',
          message: 'N8N_CHAT_WEBHOOK_URL is not configured.',
        },
      },
      { status: 500 }
    );
  }

  const webhookResult = await callN8nWebhook(
    'chat',
    {
      chatInput,
      sessionId,
      meta,
    },
    20000,
    {
      webhookUrl,
    }
  );

  return NextResponse.json(webhookResult.body, {
    status: webhookResult.status,
  });
}
