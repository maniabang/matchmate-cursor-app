"use client";
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useModalStore } from '@/store/modalStore';

const likesSent = [
  { id: '3', name: '박소연', age: 26, region: '대구', job: '개발자', profile: '' },
  { id: '4', name: '최유리', age: 29, region: '인천', job: '교사', profile: '' },
];

export default function LikesSent() {
  const router = useRouter();
  const list = likesSent

  const openModal = useModalStore(state => state.openModal);

  const handleProfileClick = (id: string) => {
    openModal(null, {
      title: undefined,
      description: '코인이 소모됩니다.\n그래도 열겠습니까?',
      confirmText: '확인',
      cancelText: '취소',
      onConfirm: () => router.push(`/profile/${id}`),
    });
  };

  return (
    <div className="bg-[#F8F8F8] min-h-screen flex flex-col">
      <header className="flex items-center justify-center px-4 py-4 bg-white border-b border-gray-100">
        <div className="flex gap-2 bg-[#F2EAEA] rounded-full p-1 shadow-sm">
          <button
            className={`px-6 py-2 rounded-full text-base font-semibold transition-colors text-gray-400`}
            onClick={() => router.push('/likes/received')}
          >
            받은 좋아요
          </button>
          <button
            className={`px-6 py-2 rounded-full text-base font-semibold transition-colors bg-white text-[#EBA8A6] shadow`}
            onClick={() => router.push('/likes/sent')}
          >
            보낸 좋아요
          </button>
        </div>
      </header>
      <div className="flex-1 flex flex-col gap-5 px-4 py-6">
        {list.map(user => (
          <div
            key={user.id}
            className="relative flex items-center bg-white rounded-2xl shadow-md px-5 py-4 hover:shadow-lg transition"
          >
            <div
              className="absolute right-5 top-1/2 -translate-y-1/2 flex gap-2"
              style={{ zIndex: 2 }}
            >
              <button className="w-10 h-10 flex items-center justify-center rounded-full bg-[#EBA8A6]/10 text-[#EBA8A6] text-xl hover:bg-[#EBA8A6]/20 transition">😍</button>
              <button className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 text-gray-400 text-xl hover:bg-gray-200 transition">✖️</button>
            </div>
            <div
              className="flex items-center gap-4 cursor-pointer"
              onClick={() => handleProfileClick(user.id)}
            >
              <div className="w-16 h-16 rounded-full overflow-hidden border border-gray-200 flex-shrink-0">
                <Image src={user.profile && user.profile.trim() !== '' ? user.profile : '/images/profile-default-female.svg'} alt="프로필" width={64} height={64} className="w-full h-full object-cover" />
              </div>
              <div className="flex flex-col min-w-0">
                <div className="font-semibold text-gray-900 text-lg truncate">{user.name}, {user.age}</div>
                <div className="text-sm text-[#EBA8A6] truncate">{user.region}, {user.job}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 