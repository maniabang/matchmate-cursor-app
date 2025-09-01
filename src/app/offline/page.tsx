'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function OfflinePage() {
  const [isOnline, setIsOnline] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      // 온라인이 되면 홈으로 리다이렉트
      setTimeout(() => {
        router.push('/');
      }, 1000);
    };

    const handleOffline = () => {
      setIsOnline(false);
    };

    setIsOnline(navigator.onLine);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [router]);

  const retryConnection = () => {
    if (navigator.onLine) {
      router.push('/');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center">
        <div className="bg-white rounded-2xl shadow-xl p-8 space-y-6">
          {/* 오프라인 아이콘 */}
          <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center">
            <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M18.364 5.636l-12.728 12.728m0-12.728l12.728 12.728M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"
              />
            </svg>
          </div>

          {/* 메시지 */}
          <div className="space-y-2">
            <h1 className="text-2xl font-bold text-gray-900">오프라인 상태입니다</h1>
            <p className="text-gray-600">인터넷 연결을 확인해 주세요. 연결이 복구되면 자동으로 돌아갑니다.</p>
          </div>

          {/* 상태 표시 */}
          <div className="flex items-center justify-center space-x-2">
            <div className={`w-3 h-3 rounded-full ${isOnline ? 'bg-green-500' : 'bg-red-500'}`}></div>
            <span className="text-sm text-gray-600">{isOnline ? '온라인으로 복구됨' : '오프라인'}</span>
          </div>

          {/* 재시도 버튼 */}
          <button
            onClick={retryConnection}
            className="w-full bg-indigo-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-indigo-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            다시 시도
          </button>

          {/* 오프라인에서 할 수 있는 것들 */}
          <div className="text-left space-y-3 pt-4 border-t border-gray-100">
            <p className="text-sm font-semibold text-gray-700">오프라인에서도 가능:</p>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• 이전에 본 프로필 확인</li>
              <li>• 저장된 메시지 읽기</li>
              <li>• 설정 변경</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
