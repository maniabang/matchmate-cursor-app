"use client";
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Profile } from '@/api/types';

interface ProfileListProps {
  profiles: Profile[];
}

// 나이 계산 함수
function getAge(birth: string) {
  const today = new Date();
  const birthDate = new Date(birth);
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
}

export default function LikesReceived({ profiles }: ProfileListProps) {
  const router = useRouter();
  const defaultProfile = '/images/profile-default-female.svg';

  return (
    <div className="bg-[#F8F8F8] min-h-screen flex flex-col">
      {/* 상단 탭 */}
      <header className="flex items-center justify-center px-4 py-4 bg-white border-b border-gray-100">
        <div className="flex gap-2 bg-[#F2EAEA] rounded-full p-1 shadow-sm">
          <button
            className={`px-6 py-2 rounded-full text-base font-semibold transition-colors bg-white text-[#EBA8A6] shadow`}
            onClick={() => router.push('/likes/received')}
          >
            받은 좋아요
          </button>
          <button
            className={`px-6 py-2 rounded-full text-base font-semibold transition-colors text-gray-400`}
            onClick={() => router.push('/likes/sent')}
          >
            보낸 좋아요
          </button>
        </div>
      </header>
      <div className="flex-1 flex flex-col gap-5 px-4 py-6">
        {profiles.map(user => {
          // 프로필 이미지 처리
          let profileImg = '/images/profile-default-female.svg';
          if (user.photo_urls && user.photo_urls.length > 0 && user.photo_urls[0]) {
            profileImg = user.photo_urls[0];
          } else if (user.gender === 'male') {
            profileImg = defaultProfile;
          }
          return (
            <div
              key={user.id}
              className="relative flex items-center bg-white rounded-2xl shadow-md px-5 py-4 hover:shadow-lg transition"
            >
              <div
                className="absolute right-5 top-1/2 -translate-y-1/2 flex gap-2"
                style={{ zIndex: 2 }}
              >
                <button className="w-10 h-10 flex items-center justify-center rounded-full bg-[#EBA8A6]/10 text-[#EBA8A6] text-xl hover:bg-[#EBA8A6]/20 transition">❤️</button>
                <button className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 text-gray-400 text-xl hover:bg-gray-200 transition">✖️</button>
              </div>
              <div
                className="flex items-center gap-4 cursor-pointer"
                onClick={() => router.push(`/profile/${user.id}`)}
              >
                <div className="w-16 h-16 rounded-full overflow-hidden border border-gray-200 flex-shrink-0">
                  <Image src={profileImg} alt="프로필" width={64} height={64} className="w-full h-full object-cover" />
                </div>
                <div className="flex flex-col min-w-0">
                  <div className="font-semibold text-gray-900 text-lg truncate">{user.nickname}, {user.birth ? getAge(user.birth) : ''}</div>
                  <div className="text-sm text-[#EBA8A6] truncate">{user.region}, {user.job}</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
} 