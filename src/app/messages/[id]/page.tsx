"use client";

import React from 'react';
import MessageDetail from '../MessageDetail';
import { conversations } from '../../../mocks/conversations';
import { messages } from '../../../mocks/messages';
import { useRouter } from 'next/navigation';

export default function MessageDetailPage({ params }: { params: any }) {
  const router = useRouter();
  const { id } = React.use(params) as { id: string };
  const conversation = conversations.find(c => c.userId === id);
  const user = messages.find(m => m.id === id);
  if (!conversation || !user) return <div className="p-8 text-center text-gray-400">대화 내역이 없습니다.</div>;
  return (
    <MessageDetail
      id={user.id}
      name={user.name}
      profile={user.profile}
      messages={conversation.messages}
      onBack={() => router.back()}
    />
  );
} 