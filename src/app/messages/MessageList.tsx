"use client";

import MessageItem from './components/MessageItem';
import { useRouter } from 'next/navigation';
import { messages } from '../../mocks/messages';
import BottomNav from '@/app/components/BottomNav';

export default function MessageList() {
  const router = useRouter();
  return (
    <div className="bg-white min-h-screen flex flex-col">
      {/* 메시지 리스트 */}
      <ul className="flex-1 divide-y divide-gray-100">
        {messages.map((msg) => (
          <li
            key={msg.id}
            className="hover:bg-gray-50 cursor-pointer"
            onClick={() => router.push(`/messages/${msg.id}`)}
          >
            <MessageItem {...msg} id={msg.id} />
          </li>
        ))}
      </ul>
      <BottomNav activeTab="messages" />
    </div>
  );
} 