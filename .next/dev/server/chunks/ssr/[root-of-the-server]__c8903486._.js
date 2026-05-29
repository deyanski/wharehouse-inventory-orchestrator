module.exports = [
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[project]/components/inventory-dashboard.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "InventoryDashboard",
    ()=>InventoryDashboard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
'use client';
;
;
function uuid() {
    return crypto.randomUUID();
}
function asRecord(value) {
    if (value && typeof value === 'object' && !Array.isArray(value)) {
        return value;
    }
    return null;
}
function getErrorMessage(value) {
    const candidate = Array.isArray(value) ? value[0] : value;
    const record = asRecord(candidate);
    const errorRecord = record ? asRecord(record.error) : null;
    if (record && typeof record.message === 'string') {
        return record.message;
    }
    return errorRecord && typeof errorRecord.message === 'string' ? errorRecord.message : null;
}
function extractOperationSuccess(value) {
    const candidate = Array.isArray(value) ? value[0] : value;
    const record = asRecord(candidate);
    if (!record || record.success !== true) {
        return null;
    }
    return record;
}
function extractOperationError(value) {
    const candidate = Array.isArray(value) ? value[0] : value;
    const record = asRecord(candidate);
    if (!record || record.success !== false) {
        return null;
    }
    return record;
}
function getOperationAlertMessage(alerts) {
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
        const baseMessage = typeof alertRecord.message === 'string' ? alertRecord.message : null;
        const minimumRequired = typeof alertRecord.minimumRequired === 'number' ? alertRecord.minimumRequired : null;
        const currentQuantity = typeof alertRecord.currentQuantity === 'number' ? alertRecord.currentQuantity : null;
        if (minimumRequired !== null && currentQuantity !== null) {
            return `${baseMessage ?? 'Low stock detected.'} Required minimum: ${minimumRequired}.`;
        }
        return baseMessage;
    }
    if (typeof alerts === 'string') {
        return alerts;
    }
    const alertRecord = asRecord(alerts);
    return alertRecord && typeof alertRecord.message === 'string' ? alertRecord.message : null;
}
function InventoryDashboard() {
    const [operation, setOperation] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('inbound');
    const [inventoryId, setInventoryId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const [itemName, setItemName] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const [category, setCategory] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const [quantity, setQuantity] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(1);
    const [price, setPrice] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(0);
    const [supplierEmail, setSupplierEmail] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const [itemSuggestions, setItemSuggestions] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [lookupState, setLookupState] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('idle');
    const [lookupMessage, setLookupMessage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const [submitState, setSubmitState] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('idle');
    const [operationResult, setOperationResult] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const [healthState, setHealthState] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('idle');
    const [healthMessage, setHealthMessage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const [lowStockItems, setLowStockItems] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
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
    function applySelectedItem(item) {
        setInventoryId(item.id);
        setItemName(item.itemName);
        setCategory(item.category);
        setPrice(item.price);
        setSupplierEmail(item.supplierEmail);
    }
    function resolveSelectedItem(nextName, candidates) {
        const match = candidates.find((item)=>item.itemName.toLowerCase() === nextName.trim().toLowerCase());
        if (match) {
            applySelectedItem(match);
            return true;
        }
        return false;
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const query = itemName.trim();
        if (query.length < 2) {
            setItemSuggestions([]);
            setLookupMessage(query.length > 0 ? 'Type at least 2 characters to search inventory.' : '');
            setLookupState('idle');
            return;
        }
        const controller = new AbortController();
        const timeoutId = setTimeout(async ()=>{
            setLookupState('loading');
            setLookupMessage('');
            try {
                const response = await fetch(`/api/inventory/items?q=${encodeURIComponent(query)}`, {
                    signal: controller.signal
                });
                const data = await response.json();
                if (!response.ok) {
                    setItemSuggestions([]);
                    setLookupMessage(data.error?.message ?? 'Item lookup failed. Check server configuration.');
                    return;
                }
                const suggestions = data.success && data.items ? data.items : [];
                setItemSuggestions(suggestions);
                setLookupMessage(suggestions.length === 0 ? 'No matching items found in inventory.' : '');
            } catch  {
                setItemSuggestions([]);
                setLookupMessage('Unable to reach lookup endpoint.');
            } finally{
                setLookupState('idle');
            }
        }, 250);
        return ()=>{
            controller.abort();
            clearTimeout(timeoutId);
        };
    }, [
        itemName
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (itemName.trim().length === 0 || itemSuggestions.length === 0) {
            return;
        }
        resolveSelectedItem(itemName, itemSuggestions);
    }, [
        itemName,
        itemSuggestions
    ]);
    const canSubmit = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        return inventoryId.trim().length > 0 && itemName.trim().length > 0 && category.trim().length > 0 && quantity > 0 && price >= 0 && supplierEmail.trim().length > 0;
    }, [
        inventoryId,
        itemName,
        category,
        quantity,
        price,
        supplierEmail
    ]);
    async function handleSubmit() {
        if (!canSubmit || isFormDisabled) {
            return;
        }
        const requestId = uuid();
        const payload = {
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
                correlationId: `corr_${requestId}`
            }
        };
        setSubmitState('submitting');
        setOperationResult('');
        try {
            const response = await fetch(`/api/inventory/${operation}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });
            const data = await response.json();
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
                const operationLabel = typeof success.operation === 'string' ? success.operation.toUpperCase() : operation.toUpperCase();
                const resolvedItemName = typeof success.item_name === 'string' ? success.item_name : typeof success.itemName === 'string' ? success.itemName : payload.itemName;
                if (typeof success.previousStock === 'number' && typeof success.newStock === 'number' && typeof success.quantityProcessed === 'number') {
                    resetOperationForm();
                    const directionLabel = operationLabel === 'INBOUND' ? 'added' : 'removed';
                    setOperationResult(`Success: ${resolvedItemName} ${directionLabel} (${success.quantityProcessed}). New total stock: ${success.newStock} item(s).${warningSuffix}`);
                    return;
                }
                if (typeof success.message === 'string' && success.message.length > 0) {
                    resetOperationForm();
                    setOperationResult(`Success: ${success.message}${warningSuffix}`);
                    return;
                }
                resetOperationForm();
                setOperationResult(`Success: ${operationLabel} ${resolvedItemName} completed.${warningSuffix}`);
                return;
            }
            resetOperationForm();
            setOperationResult(`Success: ${operation.toUpperCase()} request completed.`);
        } catch  {
            setOperationResult('Error: Network failure while calling operation route.');
        } finally{
            setSubmitState('idle');
        }
    }
    async function runHealthCheck() {
        setOperationResult('');
        setHealthState('loading');
        setHealthMessage('');
        try {
            const response = await fetch('/api/inventory/low-stock?includeDetails=true', {
                method: 'GET'
            });
            const data = await response.json();
            if (!response.ok || !('success' in data) || !data.success) {
                const message = 'error' in data && data.error?.message ? data.error.message : `Health check failed with status ${response.status}`;
                setHealthMessage(`Error: ${message}`);
                setLowStockItems([]);
                return;
            }
            setLowStockItems(data.lowStockItems);
            setHealthMessage(data.lowStockCount > 0 ? `${data.lowStockCount} low-stock item(s) need attention.` : 'All items are above reorder point.');
        } catch  {
            setHealthMessage('Error: Network failure while running health check.');
            setLowStockItems([]);
        } finally{
            setHealthState('idle');
        }
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
        className: "shell",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
            className: "panel",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "eyebrow",
                    children: "GlobalLogistics Corp."
                }, void 0, false, {
                    fileName: "[project]/components/inventory-dashboard.tsx",
                    lineNumber: 428,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                    children: "Warehouse Operations"
                }, void 0, false, {
                    fileName: "[project]/components/inventory-dashboard.tsx",
                    lineNumber: 429,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "lede",
                    children: "Submit inbound or outbound requests, then run inventory health check to detect low-stock items."
                }, void 0, false, {
                    fileName: "[project]/components/inventory-dashboard.tsx",
                    lineNumber: 430,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "grid",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                            children: [
                                "Operation",
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                    value: operation,
                                    onChange: (event)=>{
                                        clearFormMessages();
                                        setOperation(event.target.value);
                                    },
                                    disabled: isFormDisabled,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                            value: "inbound",
                                            children: "Inbound"
                                        }, void 0, false, {
                                            fileName: "[project]/components/inventory-dashboard.tsx",
                                            lineNumber: 446,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                            value: "outbound",
                                            children: "Outbound"
                                        }, void 0, false, {
                                            fileName: "[project]/components/inventory-dashboard.tsx",
                                            lineNumber: 447,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/inventory-dashboard.tsx",
                                    lineNumber: 438,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/inventory-dashboard.tsx",
                            lineNumber: 436,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                            children: [
                                "Item Name",
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    list: "inventory-item-suggestions",
                                    value: itemName,
                                    onChange: (event)=>{
                                        clearFormMessages();
                                        const nextValue = event.target.value;
                                        setItemName(nextValue);
                                        setInventoryId('');
                                        if (!resolveSelectedItem(nextValue, itemSuggestions)) {
                                            setCategory('');
                                            setPrice(0);
                                            setSupplierEmail('');
                                        }
                                    },
                                    disabled: isFormDisabled,
                                    placeholder: "Widget A"
                                }, void 0, false, {
                                    fileName: "[project]/components/inventory-dashboard.tsx",
                                    lineNumber: 453,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("datalist", {
                                    id: "inventory-item-suggestions",
                                    children: itemSuggestions.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                            value: item.itemName
                                        }, item.id, false, {
                                            fileName: "[project]/components/inventory-dashboard.tsx",
                                            lineNumber: 473,
                                            columnNumber: 17
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/components/inventory-dashboard.tsx",
                                    lineNumber: 471,
                                    columnNumber: 13
                                }, this),
                                lookupState === 'loading' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("small", {
                                    className: "status",
                                    children: "Loading inventory matches..."
                                }, void 0, false, {
                                    fileName: "[project]/components/inventory-dashboard.tsx",
                                    lineNumber: 477,
                                    columnNumber: 15
                                }, this) : lookupMessage ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("small", {
                                    className: "status",
                                    children: lookupMessage
                                }, void 0, false, {
                                    fileName: "[project]/components/inventory-dashboard.tsx",
                                    lineNumber: 479,
                                    columnNumber: 15
                                }, this) : null
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/inventory-dashboard.tsx",
                            lineNumber: 451,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                            children: [
                                "Category",
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    value: category,
                                    onChange: (event)=>setCategory(event.target.value),
                                    disabled: isFormDisabled,
                                    placeholder: "Electronics"
                                }, void 0, false, {
                                    fileName: "[project]/components/inventory-dashboard.tsx",
                                    lineNumber: 485,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/inventory-dashboard.tsx",
                            lineNumber: 483,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                            children: [
                                "Quantity",
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    type: "number",
                                    min: 1,
                                    value: quantity,
                                    onChange: (event)=>setQuantity(Number(event.target.value)),
                                    disabled: isFormDisabled
                                }, void 0, false, {
                                    fileName: "[project]/components/inventory-dashboard.tsx",
                                    lineNumber: 495,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/inventory-dashboard.tsx",
                            lineNumber: 493,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                            children: [
                                "Price",
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    type: "number",
                                    min: 0,
                                    step: "0.01",
                                    value: price,
                                    onChange: (event)=>setPrice(Number(event.target.value)),
                                    disabled: isFormDisabled
                                }, void 0, false, {
                                    fileName: "[project]/components/inventory-dashboard.tsx",
                                    lineNumber: 506,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/inventory-dashboard.tsx",
                            lineNumber: 504,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                            children: [
                                "Supplier Email",
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    type: "email",
                                    value: supplierEmail,
                                    onChange: (event)=>setSupplierEmail(event.target.value),
                                    disabled: isFormDisabled,
                                    placeholder: "supplier@example.com"
                                }, void 0, false, {
                                    fileName: "[project]/components/inventory-dashboard.tsx",
                                    lineNumber: 518,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/inventory-dashboard.tsx",
                            lineNumber: 516,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/inventory-dashboard.tsx",
                    lineNumber: 435,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "actions",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: handleSubmit,
                            disabled: !canSubmit || isFormDisabled,
                            className: "primary",
                            children: submitState === 'submitting' ? 'Submitting...' : 'Submit Operation'
                        }, void 0, false, {
                            fileName: "[project]/components/inventory-dashboard.tsx",
                            lineNumber: 529,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: runHealthCheck,
                            disabled: healthState === 'loading',
                            className: "secondary",
                            children: healthState === 'loading' ? 'Checking...' : 'Run Health Check'
                        }, void 0, false, {
                            fileName: "[project]/components/inventory-dashboard.tsx",
                            lineNumber: 537,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/inventory-dashboard.tsx",
                    lineNumber: 528,
                    columnNumber: 9
                }, this),
                operationResult ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "status",
                    style: {
                        whiteSpace: 'pre-line'
                    },
                    children: operationResult
                }, void 0, false, {
                    fileName: "[project]/components/inventory-dashboard.tsx",
                    lineNumber: 547,
                    columnNumber: 11
                }, this) : null,
                healthMessage ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "status",
                    children: healthMessage
                }, void 0, false, {
                    fileName: "[project]/components/inventory-dashboard.tsx",
                    lineNumber: 551,
                    columnNumber: 26
                }, this) : null,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "low-stock-list",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            children: "Low-Stock Items"
                        }, void 0, false, {
                            fileName: "[project]/components/inventory-dashboard.tsx",
                            lineNumber: 554,
                            columnNumber: 11
                        }, this),
                        lowStockItems.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "empty",
                            children: "No low-stock items to display."
                        }, void 0, false, {
                            fileName: "[project]/components/inventory-dashboard.tsx",
                            lineNumber: 556,
                            columnNumber: 13
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                            children: lowStockItems.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                            children: item.itemName
                                        }, void 0, false, {
                                            fileName: "[project]/components/inventory-dashboard.tsx",
                                            lineNumber: 561,
                                            columnNumber: 19
                                        }, this),
                                        " (",
                                        item.category,
                                        ") - ",
                                        item.stockLevel,
                                        " /",
                                        ' ',
                                        item.reorderPoint
                                    ]
                                }, `${item.id ?? item.itemName}-${item.category}`, true, {
                                    fileName: "[project]/components/inventory-dashboard.tsx",
                                    lineNumber: 560,
                                    columnNumber: 17
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/components/inventory-dashboard.tsx",
                            lineNumber: 558,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/inventory-dashboard.tsx",
                    lineNumber: 553,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/inventory-dashboard.tsx",
            lineNumber: 427,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/inventory-dashboard.tsx",
        lineNumber: 426,
        columnNumber: 5
    }, this);
}
}),
"[project]/node_modules/next/dist/server/route-modules/app-page/module.compiled.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
;
else {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    else {
        if ("TURBOPACK compile-time truthy", 1) {
            if ("TURBOPACK compile-time truthy", 1) {
                module.exports = __turbopack_context__.r("[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)");
            } else //TURBOPACK unreachable
            ;
        } else //TURBOPACK unreachable
        ;
    }
} //# sourceMappingURL=module.compiled.js.map
}),
"[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

module.exports = __turbopack_context__.r("[project]/node_modules/next/dist/server/route-modules/app-page/module.compiled.js [app-ssr] (ecmascript)").vendored['react-ssr'].ReactJsxDevRuntime; //# sourceMappingURL=react-jsx-dev-runtime.js.map
}),
"[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

module.exports = __turbopack_context__.r("[project]/node_modules/next/dist/server/route-modules/app-page/module.compiled.js [app-ssr] (ecmascript)").vendored['react-ssr'].React; //# sourceMappingURL=react.js.map
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__c8903486._.js.map