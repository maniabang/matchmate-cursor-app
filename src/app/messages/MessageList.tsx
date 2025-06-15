"use client";
import MessageItem from './components/MessageItem';
import { useRouter } from 'next/navigation';

interface MessageListProps {
  messages: any[];
}

export default function MessageList({ messages }: MessageListProps) {
  const router = useRouter();
  return (
    <ul className="flex-1 divide-y divide-gray-100 overflow-y-auto">
      {messages.map((msg) => {
        return (
          <li
            key={msg.id}
            className="hover:bg-gray-50 cursor-pointer"
            onClick={() => router.push(`/messages/${msg.id}`)}
          >
            <MessageItem {...msg} id={msg.id} profile={msg.profile} />
          </li>
        );
      })}
    </ul>
  );
} 