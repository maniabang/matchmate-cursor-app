// "use client" 삭제!
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import NavBar from '../components/NavBar';
import BottomNav from '../components/BottomNav';
import SwipeCards from '../components/SwipeCards';

export default async function Home() {
  // SSR 환경에서 Supabase 클라이언트 생성
  const supabase = createServerComponentClient({ cookies });
  // 예시: 여성 프로필 10개 패칭
  const { data: profiles } = await supabase
    .from("profiles")
    .select("*")
    .eq("gender", "female")
    .limit(10);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: '#fff' }}>
      <NavBar title="" />
      <section style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <SwipeCards profiles={profiles ?? []} />
      </section>
      <BottomNav activeTab="home" />
    </div>
  );
}