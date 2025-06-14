import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Profile } from '@/api/types';

interface UserState {
  user: any; // supabase user 타입, 필요시 명확히 지정
  setUser: (user: any) => void;
  clearUser: () => void;
}

// User Store with persist
export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
      clearUser: () => set({ user: null }),
    }),
    {
      name: 'user-storage', // localStorage 키 이름
      // 민감한 정보가 있다면 partialize로 필터링
      partialize: (state) => ({
        user: state.user ? {
          id: state.user.id,
          email: state.user.email,
          // 필요한 필드만 저장 (토큰 등 민감한 정보 제외)
        } : null
      })
    }
  )
);

// Profile Store with persist
export const useMyProfileStore = create<{
  myProfile: Profile | null;
  setMyProfile: (profile: Profile) => void;
  clearMyProfile: () => void;
}>()(
  persist(
    (set) => ({
      myProfile: null,
      setMyProfile: (profile) => set({ myProfile: profile }),
      clearMyProfile: () => set({ myProfile: null }),
    }),
    {
      name: 'my-profile-storage', // localStorage 키 이름
      skipHydration: true, // SSR 환경에서 hydration 문제 방지
    }
  )
);