'use client';

import { useEffect, useState } from 'react';

export function useNetworkStatus() {
  const [isOnline, setIsOnline] = useState(true);
  const [showOfflineOverlay, setShowOfflineOverlay] = useState(false);

  useEffect(() => {
    // 초기 상태 설정
    setIsOnline(navigator.onLine);

    const handleOnline = () => {
      setIsOnline(true);
      setShowOfflineOverlay(false);
    };

    const handleOffline = () => {
      setIsOnline(false);
      // 오프라인이 되어도 오버레이는 바로 표시하지 않음
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // 사용자 액션 시 오프라인 상태면 오버레이 표시
  const checkAndShowOffline = () => {
    if (!isOnline) {
      setShowOfflineOverlay(true);
    }
  };

  return {
    isOnline,
    showOfflineOverlay,
    checkAndShowOffline,
    hideOfflineOverlay: () => setShowOfflineOverlay(false),
  };
}
