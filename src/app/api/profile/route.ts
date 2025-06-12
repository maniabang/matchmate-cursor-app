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

export async function POST(req: NextRequest) {
  const supabase = createRouteHandlerClient({ cookies });
  const body = await req.json();
  const user = await supabase.auth.getUser();
  if (!user?.data?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  // 이미 프로필이 있는지 확인
  const { data: exist } = await supabase
    .from('profiles')
    .select('id')
    .eq('id', user.data.user.id)
    .single();
  if (exist) {
    return NextResponse.json({ error: '이미 프로필이 존재합니다.' }, { status: 409 });
  }
  // 프로필 생성
  const { data, error } = await supabase
    .from('profiles')
    .insert([{ ...body, id: user.data.user.id }])
    .select()
    .single();
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
  return NextResponse.json(data);
} 

export async function PATCH(req: NextRequest) {
  const supabase = createRouteHandlerClient({ cookies });
  const body = await req.json();
  const user = await supabase.auth.getUser();
  if (!user?.data?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const { data, error } = await supabase
    .from('profiles')
    .update(body)
    .eq('id', user.data.user.id)
    .select();
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
  return NextResponse.json(data?.[0]);
}