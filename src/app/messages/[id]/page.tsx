'use client';
import { useParams, useRouter } from 'next/navigation';
import MessageDetail from '../MessageDetail';
import { useMessages } from '@/api/message';
import { useProfile } from '@/api/profile';
import { useUserStore } from '@/store/userStore';

export default function MessageDetailPage() {
  const router = useRouter();
  const user = useUserStore((state) => state.user);
  const myId = user?.id;
  const params = useParams();
  const partnerId = typeof params.id === 'string' ? params.id : Array.isArray(params.id) ? params.id[0] : '';
  const { data: messages = [], isLoading: messagesLoading, error: messagesError } = useMessages(partnerId);
  const { data: partnerProfile, isLoading: profileLoading, error: profileError } = useProfile(partnerId as string);
  if (messagesLoading || profileLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 border-4 border-[#EBA8A6] border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-600 text-lg">메시지를 불러오는 중...</p>
        </div>
      </div>
    );
  }

  if (messagesError) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-4">
        <div className="text-center max-w-md">
          <div className="w-20 h-20 mx-auto mb-6 bg-red-100 rounded-full flex items-center justify-center">
            <svg className="w-10 h-10 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">메시지 불러오기 실패</h2>
          <p className="text-gray-600 mb-6">네트워크 연결을 확인하고 다시 시도해주세요.</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-[#EBA8A6] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#E39794] transition-colors"
          >
            다시 시도
          </button>
        </div>
      </div>
    );
  }

  if (profileError || !partnerProfile) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-4">
        <div className="text-center max-w-md">
          <div className="w-20 h-20 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
            <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">사용자를 찾을 수 없습니다</h2>
          <p className="text-gray-600 mb-6">상대방 정보를 불러올 수 없습니다.</p>
          <button
            onClick={() => router.back()}
            className="bg-[#EBA8A6] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#E39794] transition-colors"
          >
            돌아가기
          </button>
        </div>
      </div>
    );
  }

  return (
    <MessageDetail
      id={partnerProfile.id}
      name={partnerProfile.name}
      profile={partnerProfile}
      messages={messages}
      myId={myId}
      onBack={() => router.back()}
    />
  );
}
