"use client";

import MessageItem from './components/MessageItem';
import { useRouter } from 'next/navigation';
import { messages } from './mocks/messages';

export default function MessageList() {
  const router = useRouter();
  return (
    <div className="bg-white min-h-screen flex flex-col">
      {/* 상단바 */}
      <header className="flex items-center px-4 py-3 border-b border-gray-100">
        <button
          className="text-2xl text-[#EBA8A6] mr-2"
          onClick={() => router.back()}
          aria-label="뒤로가기"
        >
          ←
        </button>
        <span className="text-lg font-bold text-[#EBA8A6]">메시지</span>
      </header>

      {/* 메시지 리스트 */}
      <ul className="flex-1 divide-y divide-gray-100">
        {messages.map((msg) => (
          <li
            key={msg.id}
            className="hover:bg-gray-50 cursor-pointer"
            onClick={() => router.push(`/messages/${msg.id}`)}
          >
            <MessageItem {...msg} />
          </li>
        ))}
      </ul>
    </div>
  );
} 