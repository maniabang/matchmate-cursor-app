import React from 'react';
import Link from 'next/link';

export type ChatMessage = {
  id: string;
  sender: 'me' | 'other';
  text: string;
  time: string;
  unread?: boolean;
};

export default function MessageDetail({ id, name, profile, messages, onBack }: {
  id: string;
  name: string;
  profile?: string;
  messages: ChatMessage[];
  onBack?: () => void;
}) {
  const defaultProfile = '/images/profile-default-female.svg';
  const profileSrc = profile && profile.trim() !== '' ? profile : defaultProfile;
  return (
    <div className="bg-white min-h-screen flex flex-col">
      {/* 상단바 */}
      <header className="flex items-center px-4 py-3 border-b border-gray-100 justify-between">
        <button className="text-2xl text-[#EBA8A6] mr-2 cursor-pointer" onClick={onBack}>←</button>
        <div className="flex-1" />
        <Link href={`/profile/${id}`} className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-full overflow-hidden border border-gray-200">
            <img src={profileSrc} alt="프로필" className="w-full h-full object-cover" />
          </div>
          <span className="text-lg font-bold text-[#EBA8A6]">{name}</span>
        </Link>
      </header>

      {/* 메시지 대화 영역 */}
      <div className="flex-1 flex flex-col gap-2 px-4 py-4 overflow-y-auto bg-[#F8F8F8]">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[70%] rounded-2xl px-4 py-2 text-sm shadow-sm
              ${msg.sender === 'me' ? 'bg-[#EBA8A6] text-white rounded-br-md' : 'bg-white text-gray-900 rounded-bl-md border border-gray-100'}`}
            >
              {msg.text}
              <div className="text-xs text-gray-400 mt-1 text-right">{msg.time}</div>
            </div>
          </div>
        ))}
      </div>

      {/* 입력창 */}
      <div className="flex items-center px-4 py-2 border-t border-gray-100 bg-white">
        <input type="text" className="flex-1 rounded-full border border-gray-200 px-4 py-2 mr-2 outline-none" placeholder="메시지 입력..." />
        <button className="bg-[#EBA8A6] text-white rounded-full px-4 py-2 font-semibold">전송</button>
      </div>
    </div>
  );
} 