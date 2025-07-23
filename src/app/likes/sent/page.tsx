import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import BottomNav from '@/app/components/BottomNav';
import NavBar from '@/app/components/NavBar';
import LikesSent from '../LikesSent';

export default async function LikesSentPage() {
  const supabase = createServerComponentClient({ cookies });
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/'); // 또는 "/login"
  }
  const { data: myProfile } = await supabase.from('profiles').select('*').eq('id', user.id).single();

  // 1. 내가 보낸 'like'의 receiver_id 목록 조회
  const { data: likeRows = [] } = await supabase
    .from('likes')
    .select('receiver_id')
    .eq('sender_id', user.id)
    .eq('type', 'like');

  // 2. receiver_id만 추출
  const receiverIds = likeRows?.map((row) => row.receiver_id) || [];

  // 3. 해당 id의 프로필만 조회
  const { data: profiles = [] } = await supabase.from('profiles').select('*').in('id', receiverIds);

  return (
    <div style={{ position: 'relative', minHeight: '100vh', background: '#fff' }}>
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', zIndex: 10 }}>
        <NavBar title="받은 좋아요" user={myProfile} />
      </div>
      <div
        style={{
          paddingTop: 56,
          paddingBottom: 60,
          height: '100vh',
          overflowY: 'auto',
        }}
      >
        <LikesSent profiles={profiles || []} />
      </div>
      <div style={{ position: 'fixed', bottom: 0, left: 0, width: '100vw', zIndex: 10 }}>
        <BottomNav activeTab="match" user={user} />
      </div>
    </div>
  );
}
