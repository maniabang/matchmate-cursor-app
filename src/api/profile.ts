import { supabase } from '@/lib/supabase';
import { useMutation } from '@tanstack/react-query';
import type { Profile, ProfileStep1, ProfileStep2, ProfileStep3, ProfileStep4, ProfileStep5 } from './types';

export async function getProfile(id: string): Promise<Profile | null> {
  const { data, error } = await supabase.from('profiles').select('*').eq('id', id).single();
  if (error) {
    console.error('프로필 조회 실패:', error);
    return null;
  }
  return data;
}

export async function getProfiles(): Promise<Profile[]> {
  const { data, error } = await supabase.from('profiles').select('*');
  if (error) {
    console.error('프로필 리스트 조회 실패:', error);
    return [];
  }
  return data ?? [];
}

// 필터 옵션 타입 정의
export interface ProfileFilter {
  minAge?: number;
  maxAge?: number;
  region?: string;
  gender?: string;
}

// 필터링된 프로필 조회 함수 (상호작용 로직 포함)
export async function getFilteredProfiles(userId: string, filters: ProfileFilter = {}): Promise<Profile[]> {
  const { minAge = 18, maxAge = 99, region = null, gender = 'female' } = filters;

  try {
    // 1차 시도: 필터링된 프로필 조회
    const { data, error } = await supabase.rpc('get_filtered_profiles', {
      user_id: userId,
      target_gender: gender,
      min_age: minAge,
      max_age: maxAge,
      target_region: region,
    });

    if (error) {
      console.error('RPC 함수 호출 실패:', error);
      // 2차 시도: 백업 로직 사용
      return await getUninteractedProfiles(userId, { gender });
    }

    return data ?? [];
  } catch (error) {
    console.error('필터링된 프로필 조회 중 예외 발생:', error);
    // 3차 시도: 기본 프로필 조회
    return await getBasicProfiles(userId, { gender });
  }
}

// 백업 함수: 상호작용하지 않은 프로필만 조회
export async function getUninteractedProfiles(
  userId: string,
  filters: Pick<ProfileFilter, 'gender'> = {}
): Promise<Profile[]> {
  const { gender = 'female' } = filters;

  try {
    const { data, error } = await supabase.rpc('get_uninteracted_profiles', {
      user_id: userId,
      target_gender: gender,
    });

    if (error) {
      console.error('백업 RPC 함수 호출 실패:', error);
      return await getBasicProfiles(userId, { gender });
    }

    return data ?? [];
  } catch (error) {
    console.error('백업 프로필 조회 실패:', error);
    return [];
  }
}

// 기본 함수: 단순 프로필 조회 (최후 백업)
export async function getBasicProfiles(
  userId: string,
  filters: Pick<ProfileFilter, 'gender'> = {}
): Promise<Profile[]> {
  const { gender = 'female' } = filters;

  try {
    // 1. 이미 상호작용한 사용자 ID 조회
    const { data: likedRows } = await supabase
      .from('likes')
      .select('receiver_id, sender_id')
      .or(`sender_id.eq.${userId},receiver_id.eq.${userId}`);

    const excludedIds = new Set<string>();
    likedRows?.forEach((row) => {
      if (row.sender_id === userId) {
        excludedIds.add(row.receiver_id);
      } else {
        excludedIds.add(row.sender_id);
      }
    });

    // 2. 프로필 조회 (상호작용한 사용자 제외)
    let query = supabase.from('profiles').select('*').eq('gender', gender).neq('id', userId);

    if (excludedIds.size > 0) {
      query = query.not('id', 'in', `(${Array.from(excludedIds).join(',')})`);
    }

    const { data, error } = await query.order('created_at', { ascending: false });

    if (error) {
      console.error('기본 프로필 조회 실패:', error);
      return [];
    }

    return data ?? [];
  } catch (error) {
    console.error('기본 프로필 조회 중 예외 발생:', error);
    return [];
  }
}

export async function createProfile(profile: Profile): Promise<boolean> {
  const { error } = await supabase.from('profiles').insert(profile);
  if (error) {
    console.error('프로필 생성 실패:', error);
    return false;
  }
  return true;
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
