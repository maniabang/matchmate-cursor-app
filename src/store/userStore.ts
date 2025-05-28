import { create } from 'zustand';

interface UserState {
  user: any; // supabase user 타입, 필요시 명확히 지정
  token: string | null;
  setUser: (user: any) => void;
  setToken: (token: string | null) => void;
  clearUser: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  token: null,
  setUser: (user) => {
    set({ user });
    if (user) {
      sessionStorage.setItem('user', JSON.stringify(user));
    }
  },
  setToken: (token) => {
    set({ token });
    if (token) {
      sessionStorage.setItem('token', token);
    } else {
      sessionStorage.removeItem('token');
    }
  },
  clearUser: () => {
    set({ user: null, token: null });
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('token');
  },
})); 