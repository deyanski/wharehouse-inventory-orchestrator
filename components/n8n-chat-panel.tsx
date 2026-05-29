'use client';

import { FormEvent, useEffect, useMemo, useState } from 'react';

type ChatRole = 'assistant' | 'user' | 'system';

type ChatMessage = {
  id: string;
  role: ChatRole;
  content: string;
};

function uuid(): string {
  return crypto.randomUUID();
}

function asRecord(value: unknown): Record<string, unknown> | null {
  if (value && typeof value === 'object' && !Array.isArray(value)) {
    return value as Record<string, unknown>;
  }
  return null;
}

function extractErrorMessage(value: unknown): string | null {
  const candidate = Array.isArray(value) ? value[0] : value;
  const record = asRecord(candidate);
  if (!record) {
    return null;
  }

  if (typeof record.message === 'string' && record.message.trim().length > 0) {
    return record.message;
  }

  const errorRecord = asRecord(record.error);
  if (errorRecord && typeof errorRecord.message === 'string') {
    return errorRecord.message;
  }

  return null;
}

function extractReply(value: unknown): string | null {
  const candidate = Array.isArray(value) ? value[0] : value;
  const record = asRecord(candidate);

  if (!record) {
    return null;
  }

  const possibleKeys = ['reply', 'output', 'response', 'message', 'text', 'answer'];
  for (const key of possibleKeys) {
    const field = record[key];
    if (typeof field === 'string' && field.trim().length > 0) {
      return field;
    }
  }

  const dataRecord = asRecord(record.data);
  if (dataRecord) {
    for (const key of possibleKeys) {
      const field = dataRecord[key];
      if (typeof field === 'string' && field.trim().length > 0) {
        return field;
      }
    }
  }

  return null;
}

function getStoredSessionId(): string {
  const storageKey = 'warehouse-n8n-chat-session-id';
  const existing = window.localStorage.getItem(storageKey);
  if (existing && existing.trim().length > 0) {
    return existing;
  }

  const next = `session_${uuid()}`;
  window.localStorage.setItem(storageKey, next);
  return next;
}

export function N8nChatPanel() {
  const [sessionId, setSessionId] = useState<string>('');
  const [input, setInput] = useState('');
  const [submitState, setSubmitState] = useState<'idle' | 'sending'>('idle');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: uuid(),
      role: 'assistant',
      content:
        'Warehouse AI is ready. Ask about inventory, order logs, or product manuals.',
    },
  ]);

  useEffect(() => {
    setSessionId(getStoredSessionId());
  }, []);

  const isSubmitDisabled = useMemo(() => {
    return submitState === 'sending' || input.trim().length === 0;
  }, [submitState, input]);

  async function sendMessage(event: FormEvent) {
    event.preventDefault();

    const trimmed = input.trim();
    if (trimmed.length === 0 || submitState === 'sending') {
      return;
    }

    const userMessage: ChatMessage = {
      id: uuid(),
      role: 'user',
      content: trimmed,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setSubmitState('sending');

    try {
      const response = await fetch('/api/chat/n8n', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chatInput: trimmed,
          sessionId,
          meta: {
            source: 'warehouse-dashboard',
          },
        }),
      });

      const data = (await response.json()) as unknown;

      if (!response.ok) {
        const errorMessage =
          extractErrorMessage(data) ?? `Chat request failed with status ${response.status}.`;

        setMessages((prev) => [
          ...prev,
          {
            id: uuid(),
            role: 'system',
            content: `Error: ${errorMessage}`,
          },
        ]);
        return;
      }

      const reply = extractReply(data);
      setMessages((prev) => [
        ...prev,
        {
          id: uuid(),
          role: 'assistant',
          content:
            reply ??
            'The assistant responded, but no message text was returned in the payload.',
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: uuid(),
          role: 'system',
          content: 'Error: Unable to reach chat service.',
        },
      ]);
    } finally {
      setSubmitState('idle');
    }
  }

  return (
    <aside className="chat-panel" aria-label="Warehouse AI chat">
      <div className="chat-header">
        <p className="eyebrow">AI Assistant</p>
        <h2>Warehouse Operations Specialist</h2>
      </div>

      <div className="chat-messages" role="log" aria-live="polite">
        {messages.map((message) => (
          <p key={message.id} className={`chat-message ${message.role}`}>
            {message.content}
          </p>
        ))}
      </div>

      <form className="chat-form" onSubmit={sendMessage}>
        <label>
          Ask the assistant
          <textarea
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placeholder="e.g. What was the last outbound operation for Widget B?"
            rows={3}
          />
        </label>
        <button type="submit" className="primary" disabled={isSubmitDisabled}>
          {submitState === 'sending' ? 'Sending...' : 'Send'}
        </button>
      </form>
    </aside>
  );
}
