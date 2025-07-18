import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import BottomNav from '@/app/components/BottomNav';
import NavBar from '../../components/NavBar';
import LikesReceived from '../LikesReceived';

export default async function LikesReceivedPage() {
  const supabase = createServerComponentClient({ cookies });
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/'); // 또는 "/login"
  }
  const { data: myProfile } = await supabase.from('profiles').select('*').eq('id', user.id).single();

  // 1. 나에게 보낸 'like'의 sender_id 목록 조회
  const { data: likeRows = [] } = await supabase
    .from('likes')
    .select('sender_id')
    .eq('receiver_id', user.id)
    .eq('type', 'like')
    .eq('is_accepted', false); // 아직 수락하지 않은 좋아요만

  // 2. sender_id만 추출
  const senderIds = likeRows?.map((row) => row.sender_id) || [];

  // 3. 해당 id의 프로필만 조회
  const { data: profiles = [] } = await supabase.from('profiles').select('*').in('id', senderIds);

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
        <LikesReceived profiles={profiles || []} />
      </div>
      <div style={{ position: 'fixed', bottom: 0, left: 0, width: '100vw', zIndex: 10 }}>
        <BottomNav activeTab="match" user={user} />
      </div>
    </div>
  );
}
