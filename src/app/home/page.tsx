import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import NavBar from '../components/NavBar';
import BottomNav from '../components/BottomNav';
import SwipeCards from './SwipeCards';

export default async function Home() {
  const supabase = createServerComponentClient({ cookies });
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/'); // 또는 "/login"
  }

  const { data: myProfile } = await supabase.from('profiles').select('*').eq('id', user?.id).single();

  // 1. 내가 이미 상호작용한 유저 id 리스트 조회
  const { data: likedRows } = await supabase
    .from('likes')
    .select('receiver_id')
    .eq('sender_id', user.id)
    .in('type', ['like', 'super_like', 'messaged']);

  const excludedIds = likedRows?.map((row) => row.receiver_id) ?? [];

  // 2. 프로필 조회 시 제외
  let query = supabase.from('profiles').select('*').eq('gender', 'female');

  if (excludedIds.length > 0) {
    query = query.not('id', 'in', `(${excludedIds.join(',')})`);
  }

  const { data: profiles } = await query;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', background: '#fff', overflow: 'hidden' }}>
      <NavBar title="" user={myProfile} />
      <section
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
        }}
      >
        <SwipeCards profiles={profiles ?? []} />
      </section>
      <BottomNav activeTab="home" user={user} />
    </div>
  );
}
