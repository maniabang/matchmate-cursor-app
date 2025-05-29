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

export function useUploadProfile(id: string, options?: UseQueryOptions<Profile | null, Error>) {
  return useQuery<Profile | null, Error>({
    queryKey: ['profile', id],
    queryFn: () => getProfile(id),
    ...options,
  });
}

export async function uploadProfileImage(file: File, userId: string): Promise<{ url: string, path: string } | null> {
  const fileExt = file.name.split('.').pop();
  const filePath = `${userId}/${Date.now()}.${fileExt}`;
  const { error } = await supabase.storage.from('profile-images').upload(filePath, file);
  if (error) {
    console.error('이미지 업로드 실패:', error.message);
    return null;
  }
  const { data: urlData } = supabase.storage.from('profile-images').getPublicUrl(filePath);
  return urlData?.publicUrl ? { url: urlData.publicUrl, path: filePath } : null;
}

export async function removeProfileImage(filePath: string) {
  const { error } = await supabase.storage.from('profile-images').remove([filePath]);
  if (error) {
    console.error('이미지 삭제 실패:', error.message);
  }
} 