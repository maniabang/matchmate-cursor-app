"use client";
import { useParams } from "next/navigation";
import MessageDetail from '../MessageDetail';
import { useMessages } from '@/api/message';
import { useProfile } from '@/api/profile';
import { useUserStore } from '@/store/userStore';

export default function MessageDetailPage() {
  const user = useUserStore((state) => state.user);
  const myId = user?.id;
  const params = useParams();
  const partnerId = typeof params.id === 'string' ? params.id : Array.isArray(params.id) ? params.id[0] : '';
  const { data: messages = [], isLoading: messagesLoading, error: messagesError } = useMessages(partnerId);
  const { data: partnerProfile, isLoading: profileLoading, error: profileError } = useProfile(partnerId as string);
  if (messagesLoading || profileLoading) return <div>로딩중...</div>;
  if (messagesError) return <div>메시지 불러오기 실패</div>;
  if (profileError || !partnerProfile) return <div>상대방 정보를 찾을 수 없습니다.</div>;

  return (
    <MessageDetail
      id={partnerProfile.id}
      name={partnerProfile.name}
      profile={partnerProfile}
      messages={messages}
      myId={myId}
    />
  );
}