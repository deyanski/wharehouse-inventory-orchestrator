type WebhookCallResult = {
  ok: boolean;
  status: number;
  body: unknown;
};

function asObject(value: unknown): Record<string, unknown> {
  if (value && typeof value === 'object' && !Array.isArray(value)) {
    return value as Record<string, unknown>;
  }
  return {};
}

export function getRequiredEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

export function getOptionalEnv(name: string): string | undefined {
  const value = process.env[name];
  return value ? value : undefined;
}

export async function callN8nWebhook(
  path: string,
  payload: unknown,
  timeoutMs = 12000,
  options?: {
    webhookUrl?: string;
  }
): Promise<WebhookCallResult> {
  const url = options?.webhookUrl
    ? options.webhookUrl
    : `${getRequiredEnv('N8N_INVENTORY_WEBHOOK_BASE_URL').replace(/\/$/, '')}/${path.replace(/^\//, '')}`;

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
      signal: controller.signal,
      cache: 'no-store',
    });

    let body: unknown;
    const contentType = response.headers.get('content-type') ?? '';
    if (contentType.includes('application/json')) {
      body = await response.json();
    } else {
      body = { message: await response.text() };
    }

    return {
      ok: response.ok,
      status: response.status,
      body,
    };
  } catch (error) {
    if (error instanceof Error && error.name === 'AbortError') {
      return {
        ok: false,
        status: 504,
        body: {
          success: false,
          timestamp: new Date().toISOString(),
          error: {
            code: 'WEBHOOK_TIMEOUT',
            message: 'n8n webhook request timed out',
          },
        },
      };
    }

    return {
      ok: false,
      status: 502,
      body: {
        success: false,
        timestamp: new Date().toISOString(),
        error: {
          code: 'WEBHOOK_UPSTREAM_ERROR',
          message: 'Failed to reach n8n webhook',
        },
      },
    };
  } finally {
    clearTimeout(timeoutId);
  }
}
