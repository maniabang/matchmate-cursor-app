import { useQuery, useMutation, UseQueryOptions, UseMutationOptions, QueryKey } from '@tanstack/react-query';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import type { User, Session } from '@supabase/supabase-js';
import { useUserStore } from '@/store/userStore';

const supabase = createClientComponentClient();

// 타입 정의
export interface SignUpParams {
  email: string;
  password: string;
}
export interface SignInParams {
  email: string;
  password: string;
}
export interface UserProfile {
  id: string;
  email: string;
  // 추가 프로필 필드 필요시 여기에
}

// API 함수
export async function signUp(params: SignUpParams): Promise<{ user: User | null; session: Session | null;[key: string]: any }> {
  const { data, error } = await supabase.auth.signUp({
    email: params.email,
    password: params.password,
  });
  if (error) throw error;
  return data;
}

export async function signIn(params: SignInParams) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: params.email,
    password: params.password,
  });
  if (error) throw error;
  useUserStore.getState().setUser(data.user);

  return data;
}

export async function signOut(): Promise<boolean> {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
  return true;
}

export async function getUser(): Promise<UserProfile | null> {
  const { data, error } = await supabase.auth.getUser();
  if (error) throw error;
  return data.user as UserProfile | null;
}

// React Query 훅
export function useUser(options?: UseQueryOptions<UserProfile | null, Error>) {
  return useQuery<UserProfile | null, Error>({
    queryKey: ['user'] as QueryKey,
    queryFn: getUser,
    ...options,
  });
}