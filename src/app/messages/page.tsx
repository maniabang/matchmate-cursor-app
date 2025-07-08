import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from "next/headers";
import MessageList from './MessageList';
import NavBar from "../components/NavBar";
import BottomNav from "../components/BottomNav";
import { redirect } from 'next/navigation';

export default async function MessagesPage() {
  const supabase = createServerComponentClient({ cookies });
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/"); // 또는 "/login"
  }

  const { data: myProfile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  // 1. 대화방별 마지막 메시지
  const { data: lastMessages = [] } = await supabase
    .rpc('get_last_messages_by_conversation', { user_id: user.id });

  // 2. 대화방별 unread 개수 (RPC 함수 사용)
  const { data: unreadCounts = [] } = await supabase
    .rpc('get_unread_counts_by_partner', { user_id: user.id });
  // 3. 상대방 id 추출
  const partnerIds = lastMessages.map((m: any) =>
    m.sender_id === user.id ? m.receiver_id : m.sender_id
  );

  // 4. 상대방 프로필 패칭
  const { data: profiles = [] } = await supabase
    .from('profiles')
    .select('*')
    .in('id', partnerIds);

  // 5. 메시지+프로필+unread 매핑
  const messageList = lastMessages.map((msg: any) => {
    const partnerId = msg.sender_id === user.id ? msg.receiver_id : msg.sender_id;
    const profile = profiles?.find((p: any) => p.id === partnerId);
    const unreadData = unreadCounts.find((u: any) => u.partner_id === partnerId);
    const unread = unreadData?.unread_count || 0;
    return {
      ...msg,
      profile,
      unread,
    };
  });


  return (
    <div style={{ position: 'relative', minHeight: '100vh', background: '#fff' }}>
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', zIndex: 10 }}>
        <NavBar title="메시지" user={myProfile} />
      </div>
      <div style={{
        paddingTop: 56,
        paddingBottom: 60,
        height: '100vh',
        overflowY: 'auto',
      }}>
        <MessageList messages={messageList} />
      </div>
      <div style={{ position: 'fixed', bottom: 0, left: 0, width: '100vw', zIndex: 10 }}>
        <BottomNav activeTab="messages" user={user} />
      </div>
    </div>
  );
} 