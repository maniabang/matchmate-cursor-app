import { useQuery, useMutation, UseQueryOptions, UseMutationOptions, QueryKey } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';

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
export async function signUp(params: SignUpParams) {
  const { data, error } = await supabase.auth.signUp({
    email: params.email,
    password: params.password,
  });
  if (error) throw error;
  return data.user;
}

export async function signIn(params: SignInParams) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: params.email,
    password: params.password,
  });
  if (error) throw error;
  return data.user;
}

export async function signOut() {
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

export function useSignUp(options?: UseMutationOptions<any, Error, SignUpParams>) {
  return useMutation<any, Error, SignUpParams>(signUp, options);
}

export function useSignIn(options?: UseMutationOptions<any, Error, SignInParams>) {
  return useMutation<any, Error, SignInParams>(signIn, options);
}

export function useSignOut(options?: UseMutationOptions<any, Error, void>) {
  return useMutation<any, Error, void>(signOut, options);
} 