import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import NavBar from './NavBar';
import BottomNav from '../components/BottomNav';
import SwipeCards from './SwipeCards';

export default async function Home() {
  // SSR 환경에서 Supabase 클라이언트 생성
  const supabase = createServerComponentClient({ cookies });
  const { data: { user } } = await supabase.auth.getUser();
  const { data: myProfile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user?.id)
    .single();

  const { data: profiles } = await supabase
    .from("profiles")
    .select("*")
    .eq("gender", "female")

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: '#fff' }}>
      <NavBar title="" user={myProfile} />
      <section style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <SwipeCards profiles={profiles ?? []} />
      </section>
      <BottomNav activeTab="home" />
    </div>
  );
}