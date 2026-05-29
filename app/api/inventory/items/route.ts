import { NextResponse } from 'next/server';
import { z } from 'zod';
import { getSupabaseServerClient } from '@/lib/server/supabase-server';

const querySchema = z.object({
  q: z.string().trim().min(1).max(255),
});

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const parsed = querySchema.safeParse({
    q: searchParams.get('q') ?? '',
  });

  if (!parsed.success) {
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'VALIDATION_ERROR',
          message: 'Query parameter q is required',
          details: parsed.error.flatten(),
        },
      },
      { status: 400 }
    );
  }

  try {
    const supabase = getSupabaseServerClient();
    const { data, error } = await supabase
      .from('inventory')
      .select('id,item_name,category,price,supplier_email')
      .ilike('item_name', `%${parsed.data.q}%`)
      .order('item_name', { ascending: true })
      .limit(10);

    if (error) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'INVENTORY_LOOKUP_FAILED',
            message: 'Failed to query inventory items',
            details: { reason: error.message },
          },
        },
        { status: 500 }
      );
    }

    const items = (data ?? []).map((row) => ({
      id: row.id,
      itemName: row.item_name,
      category: row.category,
      price: Number(row.price),
      supplierEmail: row.supplier_email,
    }));

    return NextResponse.json(
      {
        success: true,
        items,
      },
      { status: 200 }
    );
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : 'Unexpected error during inventory lookup';

    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'INVENTORY_LOOKUP_INIT_FAILED',
          message,
        },
      },
      { status: 500 }
    );
  }
}
