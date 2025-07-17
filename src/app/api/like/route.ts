import { NextRequest, NextResponse } from 'next/server';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export async function POST(req: NextRequest) {
  const supabase = createRouteHandlerClient({ cookies });
  const body = await req.json();
  const user = await supabase.auth.getUser();
  if (!user?.data?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const { senderId, receiverId, type } = body;
  if (!senderId || !receiverId) {
    return NextResponse.json({ error: 'senderId, receiverId required' }, { status: 400 });
  }
  // 본인 인증: senderId는 로그인된 유저여야 함
  if (user.data.user.id !== senderId) {
    return NextResponse.json({ error: 'senderId mismatch' }, { status: 403 });
  }
  // Supabase RPC 호출
  const { data, error } = await supabase.rpc('send_like', {
    p_sender_id: senderId,
    p_receiver_id: receiverId,
    p_type: type,
  });
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
  return NextResponse.json(data);
}
