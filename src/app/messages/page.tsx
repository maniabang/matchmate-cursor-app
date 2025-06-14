import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from "next/headers";
import MessageList from './MessageList';
import NavBar from "../home/NavBar";
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
    .eq("id", user?.id)
    .single();

  return (
    <div style={{ position: 'relative', minHeight: '100vh', background: '#fff' }}>
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', zIndex: 10 }}>
        <NavBar title="메시지" user={myProfile} />
      </div>
      <div style={{
        paddingTop: 56, // NavBar 높이
        paddingBottom: 60, // BottomNav 높이
        height: '100vh',
        overflowY: 'auto',
      }}>
        <MessageList />
      </div>
      {/* 하단 고정 BottomNav */}
      <div style={{ position: 'fixed', bottom: 0, left: 0, width: '100vw', zIndex: 10 }}>
        <BottomNav activeTab="messages" />
      </div>
    </div>
  );
} 