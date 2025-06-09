// hooks/useHydratedStore.ts
import { useEffect, useState } from 'react';
import { useUserStore, useMyProfileStore } from '@/store/userStore';

// User Store 훅
export function useHydratedUserStore() {
  const [hydrated, setHydrated] = useState(false);
  const store = useUserStore();

  useEffect(() => {
    // 클라이언트에서만 rehydrate 실행
    useUserStore.persist.rehydrate();
    setHydrated(true);
  }, []);

  // SSR에서는 기본값 반환, 클라이언트에서는 저장된 값 반환
  return hydrated 
    ? store 
    : { user: null, setUser: () => {}, clearUser: () => {} };
}

// Profile Store 훅
export function useHydratedMyProfileStore() {
  const [hydrated, setHydrated] = useState(false);
  const store = useMyProfileStore();

  useEffect(() => {
    // 클라이언트에서만 rehydrate 실행
    useMyProfileStore.persist.rehydrate();
    setHydrated(true);
  }, []);

  // SSR에서는 기본값 반환, 클라이언트에서는 저장된 값 반환
  return hydrated 
    ? store 
    : { myProfile: null, setMyProfile: () => {}, clearMyProfile: () => {} };
}