import { z } from 'zod';

export const inventoryOperationRequestSchema = z.object({
  requestId: z.string().uuid(),
  timestamp: z.string().datetime(),
  operation: z.enum(['inbound', 'outbound']),
  inventoryId: z.string().uuid(),
  itemName: z.string().min(1).max(255),
  category: z.string().min(1).max(100),
  quantity: z.number().int().positive(),
  price: z.number().nonnegative(),
  supplierEmail: z.string().email(),
  meta: z.object({
    source: z.string().min(1),
    correlationId: z.string().min(1),
  }),
});

export const healthCheckRequestSchema = z.object({
  requestId: z.string().uuid(),
  timestamp: z.string().datetime(),
  includeDetails: z.boolean(),
  meta: z.object({
    source: z.string().min(1),
    correlationId: z.string().min(1),
  }),
});

export const errorEnvelopeSchema = z.object({
  success: z.literal(false),
  requestId: z.string().uuid(),
  timestamp: z.string().datetime(),
  error: z.object({
    code: z.string().min(1),
    message: z.string().min(1),
    details: z.record(z.unknown()).optional(),
  }),
});

export type InventoryOperationRequest = z.infer<
  typeof inventoryOperationRequestSchema
>;

export type HealthCheckRequest = z.infer<typeof healthCheckRequestSchema>;
