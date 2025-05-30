import { create } from 'zustand';

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