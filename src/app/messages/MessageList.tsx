'use client';
import MessageItem from './components/MessageItem';
import { useRouter } from 'next/navigation';

interface MessageListProps {
  messages: any[];
  myId: string;
}

export default function MessageList({ messages, myId }: MessageListProps) {
  const router = useRouter();

  return (
    <ul className="flex-1 divide-y divide-gray-100 overflow-y-auto">
      {messages.map((msg) => {
        const partnerId = msg.sender_id === myId ? msg.receiver_id : msg.sender_id;

        return (
          <li
            key={msg.id}
            className="hover:bg-gray-50 cursor-pointer"
            onClick={() => router.push(`/messages/${partnerId}`)}
          >
            <MessageItem {...msg} id={msg.id} profile={msg.profile} />
          </li>
        );
      })}
    </ul>
  );
}
