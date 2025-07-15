import { NextRequest, NextResponse } from 'next/server';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export async function GET(req: NextRequest) {
  const supabase = createRouteHandlerClient({ cookies });
  const { searchParams } = new URL(req.url);
  const partnerId = searchParams.get('partnerId');
  const user = await supabase.auth.getUser();
  const myId = user?.data?.user?.id;

  if (!myId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  if (!partnerId) {
    return NextResponse.json({ error: 'partnerId is required' }, { status: 400 });
  }

  const { data: messages, error } = await supabase
    .from('messages')
    .select('*')
    .or(
      `and(sender_id.eq.${myId},receiver_id.eq.${partnerId}),and(sender_id.eq.${partnerId},receiver_id.eq.${myId})`
    )
    .order('created_at', { ascending: true });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json(messages);
}

export async function POST(req: NextRequest) {
  const supabase = createRouteHandlerClient({ cookies });
  const body = await req.json();
  const user = await supabase.auth.getUser();
  if (!user?.data?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const { senderId, receiverId, content } = body;
  if (!senderId || !receiverId || !content) {
    return NextResponse.json({ error: 'senderId, receiverId, content required' }, { status: 400 });
  }
  if (user.data.user.id !== senderId) {
    return NextResponse.json({ error: 'senderId mismatch' }, { status: 403 });
  }
  // Supabase RPC 호출
  const { data, error } = await supabase.rpc('force_match_and_send_message', {
    p_sender_id: senderId,
    p_receiver_id: receiverId,
    p_content: content,
  });
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
  return NextResponse.json(data);
} 