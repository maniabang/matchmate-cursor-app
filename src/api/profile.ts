import { useMutation, useQuery, UseMutationOptions, UseQueryOptions, MutationFunction } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { Profile } from './types';
import { camelToSnake } from '@/utils/caseConvert';

// 프로필 등록(회원가입 마지막 단계)
export async function createProfile(profile: Profile): Promise<Profile> {
  // camelCase -> snake_case 변환
  const snakeProfile = camelToSnake(profile);
  const { data, error } = await supabase.from('profiles').insert([snakeProfile]).select().single();
  if (error) throw error;
  return data as Profile;
}

export function useCreateProfile(options?: UseMutationOptions<Profile, Error, Profile, unknown>) {
  return useMutation<Profile, Error, Profile, unknown>({
    mutationFn: createProfile,
    ...options,
  });
}

// 프로필 조회
export async function getProfile(id: string): Promise<Profile | null> {
  const { data, error } = await supabase.from('profiles').select('*').eq('id', id).single();
  if (error) throw error;
  return data as Profile;
}

export function useProfile(id: string, options?: UseQueryOptions<Profile | null, Error>) {
  return useQuery<Profile | null, Error>({
    queryKey: ['profile', id],
    queryFn: () => getProfile(id),
    ...options,
  });
} 