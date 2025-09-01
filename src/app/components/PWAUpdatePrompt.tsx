'use client';

import { useEffect, useState } from 'react';

export default function PWAUpdatePrompt() {
  const [showUpdatePrompt, setShowUpdatePrompt] = useState(false);
  const [waitingWorker, setWaitingWorker] = useState<ServiceWorker | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator && window.workbox !== undefined) {
      const wb = window.workbox;
      console.log(wb);

      const promptNewVersionAvailable = () => {
        setShowUpdatePrompt(true);
        setWaitingWorker(wb.waiting);
      };

      wb.addEventListener('waiting', promptNewVersionAvailable);
      wb.addEventListener('externalwaiting', promptNewVersionAvailable);

      // 이미 대기 중인 워커가 있는지 확인
      if (wb.waiting) {
        promptNewVersionAvailable();
      }

      wb.register();
    }
  }, []);

  const updateServiceWorker = () => {
    if (waitingWorker) {
      waitingWorker.postMessage({ type: 'SKIP_WAITING' });
      setShowUpdatePrompt(false);
      window.location.reload();
    }
  };

  if (!showUpdatePrompt) {
    return null;
  }

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 md:left-auto md:right-4 md:w-96">
      <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-4 space-y-3">
        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                />
              </svg>
            </div>
          </div>
          <div className="flex-1">
            <h3 className="text-sm font-semibold text-gray-900">새 버전이 있습니다</h3>
            <p className="text-sm text-gray-600 mt-1">더 나은 경험을 위해 앱을 업데이트하세요.</p>
          </div>
        </div>

        <div className="flex space-x-2">
          <button
            onClick={() => setShowUpdatePrompt(false)}
            className="flex-1 px-3 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors duration-200"
          >
            나중에
          </button>
          <button
            onClick={updateServiceWorker}
            className="flex-1 px-3 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors duration-200"
          >
            업데이트
          </button>
        </div>
      </div>
    </div>
  );
}
