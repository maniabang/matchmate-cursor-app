import { NextRequest, NextResponse } from 'next/server';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export async function GET(req: NextRequest) {
  const supabase = createRouteHandlerClient({ cookies });
  const { searchParams } = req.nextUrl;
  const id = searchParams.get('id');
  if (!id) {
    return NextResponse.json({ error: 'id is required' }, { status: 400 });
  }
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', id)
    .single();

  if (error || !data) {
    return NextResponse.json({ error: error?.message || 'Not found' }, { status: 404 });
  }
  return NextResponse.json(data);
} 