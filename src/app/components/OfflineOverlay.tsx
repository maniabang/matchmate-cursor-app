'use client';

interface OfflineOverlayProps {
  isVisible: boolean;
  onClose: () => void;
}

export default function OfflineOverlay({ isVisible, onClose }: OfflineOverlayProps) {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-white bg-opacity-95 backdrop-blur-sm z-50 flex flex-col items-center justify-center">
      <div className="w-full max-w-md mx-auto p-6 text-center">
        {/* 오프라인 아이콘 */}
        <div className="mx-auto w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center mb-6 animate-pulse">
          <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M18.364 5.636l-12.728 12.728m0-12.728l12.728 12.728"
            />
          </svg>
        </div>

        {/* 메시지 */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-3">오프라인 상태</h2>
          <p className="text-gray-600 mb-2">인터넷 연결이 끊어져 있습니다.</p>
          <p className="text-sm text-gray-500">네트워크 연결을 확인해 주세요.</p>
        </div>

        {/* 스켈레톤 UI */}
        <div className="space-y-3 mb-8">
          <div className="bg-gray-200 rounded-lg h-16 animate-pulse"></div>
          <div className="bg-gray-200 rounded-lg h-16 animate-pulse"></div>
          <div className="bg-gray-200 rounded-lg h-16 animate-pulse"></div>
        </div>

        {/* 확인 버튼 */}
        <button
          onClick={onClose}
          className="w-full bg-gray-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-gray-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
        >
          확인
        </button>

        {/* 로딩 점들 */}
        <div className="flex justify-center mt-6 space-x-2">
          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
        </div>
      </div>
    </div>
  );
}
