"use client";

import MessageItem from './components/MessageItem';
import { useRouter } from 'next/navigation';
import { messages } from '../../mocks/messages';

export default function MessageList() {
  const router = useRouter();
  return (
    <ul className="flex-1 divide-y divide-gray-100 overflow-y-auto">
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
  );
} 