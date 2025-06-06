import { create } from 'zustand';
import type { Profile } from '@/api/types';

interface UserState {
  user: any; // supabase user 타입, 필요시 명확히 지정
  setUser: (user: any) => void;
  clearUser: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  clearUser: () => set({ user: null }),
}));

export const useMyProfileStore = create<{
  myProfile: Profile | null;
  setMyProfile: (profile: Profile) => void;
}>((set) => ({
  myProfile: null,
  setMyProfile: (profile) => set({ myProfile: profile }),
})); 