"use client";

import MessageDetail from '../MessageDetail';
import { conversations } from '../mocks/conversations';
import { messages } from '../mocks/messages';
import { useRouter } from 'next/navigation';

export default function MessageDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const conversation = conversations.find(c => c.userId === params.id);
  const user = messages.find(m => m.id === params.id);
  if (!conversation || !user) return <div className="p-8 text-center text-gray-400">대화 내역이 없습니다.</div>;
  return (
    <MessageDetail
      name={user.name}
      messages={conversation.messages}
      onBack={() => router.back()}
    />
  );
} 