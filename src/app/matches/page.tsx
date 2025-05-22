"use client";
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { profiles } from '../messages/mocks/profiles';

// 매칭된 유저 예시: 내 id('my')를 제외한 일부 여성 유저만 매치로 가정
const matches = profiles.filter(p => p.id !== 'my').slice(0, 3);

export default function MatchesPage() {
  const router = useRouter();
  return (
    <div className="bg-white min-h-screen flex flex-col">
      {/* 상단바 */}
      <header className="flex items-center px-4 py-3 border-b border-gray-100 justify-center">
        <span className="text-lg font-bold text-[#EBA8A6]">매치</span>
      </header>
      <ul className="flex-1 divide-y divide-gray-100">
        {matches.map(user => (
          <li
            key={user.id}
            className="flex items-center gap-3 px-4 py-3 bg-[#F8F8F8] hover:bg-[#F2EAEA] transition-colors cursor-pointer"
            onClick={() => router.push(`/profile/${user.id}`)}
          >
            <div className="w-12 h-12 rounded-full overflow-hidden border border-gray-200 flex-shrink-0">
              <Image src={user.profile && user.profile.trim() !== '' ? user.profile : '/images/profile-default-female.svg'} alt="프로필" width={48} height={48} className="w-full h-full object-cover" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-semibold text-gray-900 truncate">{user.name}, {user.age}</div>
              <div className="text-sm text-[#EBA8A6] truncate">{user.region}, {user.job}</div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
} 