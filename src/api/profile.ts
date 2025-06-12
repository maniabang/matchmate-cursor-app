import { useQuery } from '@tanstack/react-query';
import { useMutation } from '@tanstack/react-query';
import type { Profile } from './types';
import { camelToSnake } from '@/utils/caseConvert';

export function useProfile(id: string) {
  return useQuery({
    queryKey: ['profile', id],
    queryFn: async () => {
      const res = await fetch(`/api/profile?id=${id}`);
      if (!res.ok) throw new Error('프로필을 불러올 수 없습니다');
      return res.json();
    },
    enabled: !!id,
  });
}

// 프로필 생성 (회원가입)
export async function createProfile(profile: Profile): Promise<Profile> {
  const snakeProfile = camelToSnake(profile);
  const res = await fetch('/api/profile', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(snakeProfile),
  });
  if (!res.ok) throw new Error('프로필 생성 실패');
  return res.json();
}

export function useCreateProfile(options?: any) {
  return useMutation<Profile, Error, Profile, unknown>({
    mutationFn: createProfile,
    ...options,
  });
}

export function useUpdateProfile() {
  return useMutation<Profile, Error, Partial<Profile>, unknown>({
    mutationFn: async (profileData) => {
      const res = await fetch('/api/profile', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profileData),
      });
      if (!res.ok) throw new Error('프로필 수정 실패');
      return res.json();
    },
  });
}

