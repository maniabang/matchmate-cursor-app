import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import BottomNav from '@/app/components/BottomNav';
import NavBar from '@/app/home/NavBar';
import LikesSent from '../LikesSent';

export default async function LikesSentPage() {

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

  return (
    <div style={{ position: 'relative', minHeight: '100vh', background: '#fff' }}>
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', zIndex: 10 }}>
        <NavBar title="받은 좋아요" user={myProfile} />
      </div>
      <div style={{
        paddingTop: 56,
        paddingBottom: 60,
        height: '100vh',
        overflowY: 'auto',
      }}>
        <LikesSent />
      </div>
      <div style={{ position: 'fixed', bottom: 0, left: 0, width: '100vw', zIndex: 10 }}>
        <BottomNav activeTab="match" user={user} />
      </div>
    </div>
  );
} 