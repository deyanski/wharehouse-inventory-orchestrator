'use client';

import { useEffect, useMemo, useState } from 'react';

type Operation = 'inbound' | 'outbound';

type InventoryLookupItem = {
  id: string;
  itemName: string;
  category: string;
  price: number;
  supplierEmail: string;
};

type StockItem = {
  id?: string;
  itemName: string;
  category: string;
  stockLevel: number;
  reorderPoint: number;
  gap?: number;
  supplierEmail?: string;
};

type ApiError = {
  error?: {
    code?: string;
    message?: string;
  };
};

type OperationSuccessItem = {
  success?: boolean;
  operation?: string;
  item_name?: string;
  itemName?: string;
  previousStock?: number;
  quantityProcessed?: number;
  newStock?: number;
  message?: string;
  alerts?: unknown;
};

type OperationErrorItem = {
  success?: boolean;
  error?: {
    message?: string;
  };
  message?: string;
};

type OperationPayload = {
  requestId: string;
  timestamp: string;
  operation: Operation;
  inventoryId: string;
  itemName: string;
  category: string;
  quantity: number;
  price: number;
  supplierEmail: string;
  meta: {
    source: string;
    correlationId: string;
  };
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

function getErrorMessage(value: unknown): string | null {
  const candidate = Array.isArray(value) ? value[0] : value;
  const record = asRecord(candidate);
  const errorRecord = record ? asRecord(record.error) : null;
  if (record && typeof record.message === 'string') {
    return record.message;
  }
  return errorRecord && typeof errorRecord.message === 'string'
    ? errorRecord.message
    : null;
}

function extractOperationSuccess(value: unknown): OperationSuccessItem | null {
  const candidate = Array.isArray(value) ? value[0] : value;
  const record = asRecord(candidate);
  if (!record || record.success !== true) {
    return null;
  }

  return record as OperationSuccessItem;
}

function extractOperationError(value: unknown): OperationErrorItem | null {
  const candidate = Array.isArray(value) ? value[0] : value;
  const record = asRecord(candidate);
  if (!record || record.success !== false) {
    return null;
  }

  return record as OperationErrorItem;
}

function getOperationAlertMessage(alerts: unknown): string | null {
  if (Array.isArray(alerts)) {
    if (alerts.length === 0) {
      return null;
    }

    const firstAlert = alerts[0];
    if (typeof firstAlert === 'string') {
      return firstAlert;
    }

    const alertRecord = asRecord(firstAlert);
    if (!alertRecord) {
      return null;
    }

    const baseMessage =
      typeof alertRecord.message === 'string' ? alertRecord.message : null;
    const minimumRequired =
      typeof alertRecord.minimumRequired === 'number'
        ? alertRecord.minimumRequired
        : null;
    const currentQuantity =
      typeof alertRecord.currentQuantity === 'number'
        ? alertRecord.currentQuantity
        : null;

    if (minimumRequired !== null && currentQuantity !== null) {
      return `${baseMessage ?? 'Low stock detected.'} Required minimum: ${minimumRequired}.`;
    }

    return baseMessage;
  }

  if (typeof alerts === 'string') {
    return alerts;
  }

  const alertRecord = asRecord(alerts);
  return alertRecord && typeof alertRecord.message === 'string'
    ? alertRecord.message
    : null;
}

export function InventoryDashboard() {
  const [operation, setOperation] = useState<Operation>('inbound');
  const [inventoryId, setInventoryId] = useState('');
  const [itemName, setItemName] = useState('');
  const [category, setCategory] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState(0);
  const [supplierEmail, setSupplierEmail] = useState('');
  const [itemSuggestions, setItemSuggestions] = useState<InventoryLookupItem[]>([]);
  const [lookupState, setLookupState] = useState<'idle' | 'loading'>('idle');
  const [lookupMessage, setLookupMessage] = useState('');

  const [submitState, setSubmitState] = useState<'idle' | 'submitting'>('idle');
  const [operationResult, setOperationResult] = useState<string>('');

  const [healthState, setHealthState] = useState<'idle' | 'loading'>('idle');
  const [healthMessage, setHealthMessage] = useState('');
  const [lowStockItems, setLowStockItems] = useState<StockItem[]>([]);

  const isFormDisabled = submitState === 'submitting';

  function resetOperationForm() {
    setInventoryId('');
    setItemName('');
    setCategory('');
    setQuantity(1);
    setPrice(0);
    setSupplierEmail('');
    setItemSuggestions([]);
    setLookupMessage('');
  }

  function clearFormMessages() {
    setOperationResult('');
    setHealthMessage('');
    setLookupMessage('');
  }

  function applySelectedItem(item: InventoryLookupItem) {
    setInventoryId(item.id);
    setItemName(item.itemName);
    setCategory(item.category);
    setPrice(item.price);
    setSupplierEmail(item.supplierEmail);
  }

  function resolveSelectedItem(nextName: string, candidates: InventoryLookupItem[]) {
    const match = candidates.find(
      (item) => item.itemName.toLowerCase() === nextName.trim().toLowerCase()
    );

    if (match) {
      applySelectedItem(match);
      return true;
    }

    return false;
  }

  useEffect(() => {
    const query = itemName.trim();
    if (query.length < 2) {
      setItemSuggestions([]);
      setLookupMessage(
        query.length > 0 ? 'Type at least 2 characters to search inventory.' : ''
      );
      setLookupState('idle');
      return;
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(async () => {
      setLookupState('loading');
      setLookupMessage('');
      try {
        const response = await fetch(
          `/api/inventory/items?q=${encodeURIComponent(query)}`,
          { signal: controller.signal }
        );

        const data = (await response.json()) as {
          success?: boolean;
          items?: InventoryLookupItem[];
          error?: {
            message?: string;
          };
        };

        if (!response.ok) {
          setItemSuggestions([]);
          setLookupMessage(
            data.error?.message ?? 'Item lookup failed. Check server configuration.'
          );
          return;
        }

        const suggestions = data.success && data.items ? data.items : [];
        setItemSuggestions(suggestions);
        setLookupMessage(
          suggestions.length === 0 ? 'No matching items found in inventory.' : ''
        );
      } catch {
        setItemSuggestions([]);
        setLookupMessage('Unable to reach lookup endpoint.');
      } finally {
        setLookupState('idle');
      }
    }, 250);

    return () => {
      controller.abort();
      clearTimeout(timeoutId);
    };
  }, [itemName]);

  useEffect(() => {
    if (itemName.trim().length === 0 || itemSuggestions.length === 0) {
      return;
    }

    resolveSelectedItem(itemName, itemSuggestions);
  }, [itemName, itemSuggestions]);

  const canSubmit = useMemo(() => {
    return (
      inventoryId.trim().length > 0 &&
      itemName.trim().length > 0 &&
      category.trim().length > 0 &&
      quantity > 0 &&
      price >= 0 &&
      supplierEmail.trim().length > 0
    );
  }, [inventoryId, itemName, category, quantity, price, supplierEmail]);

  async function handleSubmit() {
    if (!canSubmit || isFormDisabled) {
      return;
    }

    const requestId = uuid();
    const payload: OperationPayload = {
      requestId,
      timestamp: new Date().toISOString(),
      operation,
      inventoryId: inventoryId.trim(),
      itemName: itemName.trim(),
      category: category.trim(),
      quantity,
      price,
      supplierEmail: supplierEmail.trim(),
      meta: {
        source: 'dashboard',
        correlationId: `corr_${requestId}`,
      },
    };

    setSubmitState('submitting');
    setOperationResult('');

    try {
      const response = await fetch(`/api/inventory/${operation}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = (await response.json()) as unknown;

      const operationError = extractOperationError(data);

      if (!response.ok || operationError) {
        const message = getErrorMessage(data) ?? `Operation failed with status ${response.status}`;
        setOperationResult(`Error: ${message}`);
        return;
      }

      const success = extractOperationSuccess(data);
      if (success) {
        const alertMessage = getOperationAlertMessage(success.alerts);
        const warningSuffix = alertMessage ? `\nWarning: ${alertMessage}` : '';
        const operationLabel =
          typeof success.operation === 'string'
            ? success.operation.toUpperCase()
            : operation.toUpperCase();
        const resolvedItemName =
          typeof success.item_name === 'string'
            ? success.item_name
            : typeof success.itemName === 'string'
              ? success.itemName
              : payload.itemName;

        if (
          typeof success.previousStock === 'number' &&
          typeof success.newStock === 'number' &&
          typeof success.quantityProcessed === 'number'
        ) {
          resetOperationForm();

          const directionLabel =
            operationLabel === 'INBOUND' ? 'added' : 'removed';
          setOperationResult(
            `Success: ${resolvedItemName} ${directionLabel} (${success.quantityProcessed}). New total stock: ${success.newStock} item(s).${warningSuffix}`
          );
          return;
        }

        if (typeof success.message === 'string' && success.message.length > 0) {
          resetOperationForm();
          setOperationResult(`Success: ${success.message}${warningSuffix}`);
          return;
        }

        resetOperationForm();
        setOperationResult(
          `Success: ${operationLabel} ${resolvedItemName} completed.${warningSuffix}`
        );
        return;
      }

      resetOperationForm();
      setOperationResult(`Success: ${operation.toUpperCase()} request completed.`);
    } catch {
      setOperationResult('Error: Network failure while calling operation route.');
    } finally {
      setSubmitState('idle');
    }
  }

  async function runHealthCheck() {
    setOperationResult('');
    setHealthState('loading');
    setHealthMessage('');

    try {
      const response = await fetch('/api/inventory/low-stock?includeDetails=true', {
        method: 'GET',
      });

      const data = (await response.json()) as
        | {
            success: true;
            lowStockCount: number;
            lowStockItems: StockItem[];
          }
        | ApiError;

      if (!response.ok || !('success' in data) || !data.success) {
        const message =
          'error' in data && data.error?.message
            ? data.error.message
            : `Health check failed with status ${response.status}`;
        setHealthMessage(`Error: ${message}`);
        setLowStockItems([]);
        return;
      }

      setLowStockItems(data.lowStockItems);
      setHealthMessage(
        data.lowStockCount > 0
          ? `${data.lowStockCount} low-stock item(s) need attention.`
          : 'All items are above reorder point.'
      );
    } catch {
      setHealthMessage('Error: Network failure while running health check.');
      setLowStockItems([]);
    } finally {
      setHealthState('idle');
    }
  }

  return (
    <main className="shell">
      <section className="panel">
        <p className="eyebrow">GlobalLogistics Corp.</p>
        <h1>Warehouse Operations</h1>
        <p className="lede">
          Submit inbound or outbound requests, then run inventory health check to
          detect low-stock items.
        </p>

        <div className="grid">
          <label>
            Operation
            <select
              value={operation}
              onChange={(event) => {
                clearFormMessages();
                setOperation(event.target.value as Operation);
              }}
              disabled={isFormDisabled}
            >
              <option value="inbound">Inbound</option>
              <option value="outbound">Outbound</option>
            </select>
          </label>

          <label>
            Item Name
            <input
              list="inventory-item-suggestions"
              value={itemName}
              onChange={(event) => {
                clearFormMessages();
                const nextValue = event.target.value;
                setItemName(nextValue);
                setInventoryId('');

                if (!resolveSelectedItem(nextValue, itemSuggestions)) {
                  setCategory('');
                  setPrice(0);
                  setSupplierEmail('');
                }
              }}
              disabled={isFormDisabled}
              placeholder="Widget A"
            />
            <datalist id="inventory-item-suggestions">
              {itemSuggestions.map((item) => (
                <option key={item.id} value={item.itemName} />
              ))}
            </datalist>
            {lookupState === 'loading' ? (
              <small className="status">Loading inventory matches...</small>
            ) : lookupMessage ? (
              <small className="status">{lookupMessage}</small>
            ) : null}
          </label>

          <label>
            Category
            <input
              value={category}
              onChange={(event) => setCategory(event.target.value)}
              disabled={isFormDisabled}
              placeholder="Electronics"
            />
          </label>

          <label>
            Quantity
            <input
              type="number"
              min={1}
              value={quantity}
              onChange={(event) => setQuantity(Number(event.target.value))}
              disabled={isFormDisabled}
            />
          </label>

          <label>
            Price
            <input
              type="number"
              min={0}
              step="0.01"
              value={price}
              onChange={(event) => setPrice(Number(event.target.value))}
              disabled={isFormDisabled}
            />
          </label>

          <label>
            Supplier Email
            <input
              type="email"
              value={supplierEmail}
              onChange={(event) => setSupplierEmail(event.target.value)}
              disabled={isFormDisabled}
              placeholder="supplier@example.com"
            />
          </label>
        </div>

        <div className="actions">
          <button
            onClick={handleSubmit}
            disabled={!canSubmit || isFormDisabled}
            className="primary"
          >
            {submitState === 'submitting' ? 'Submitting...' : 'Submit Operation'}
          </button>

          <button
            onClick={runHealthCheck}
            disabled={healthState === 'loading'}
            className="secondary"
          >
            {healthState === 'loading' ? 'Checking...' : 'Run Health Check'}
          </button>
        </div>

        {operationResult ? (
          <p className="status" style={{ whiteSpace: 'pre-line' }}>
            {operationResult}
          </p>
        ) : null}
        {healthMessage ? <p className="status">{healthMessage}</p> : null}

        <div className="low-stock-list">
          <h2>Low-Stock Items</h2>
          {lowStockItems.length === 0 ? (
            <p className="empty">No low-stock items to display.</p>
          ) : (
            <ul>
              {lowStockItems.map((item) => (
                <li key={`${item.id ?? item.itemName}-${item.category}`}>
                  <strong>{item.itemName}</strong> ({item.category}) - {item.stockLevel} /
                  {' '}
                  {item.reorderPoint}
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </main>
  );
}
