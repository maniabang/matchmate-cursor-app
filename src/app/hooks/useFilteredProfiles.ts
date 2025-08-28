import { useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import type { Profile } from '@/api/types';
import type { FilterOptions } from '../home/FilterModalContent';

export const useFilteredProfiles = () => {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const supabase = createClientComponentClient();

  const loadFilteredProfiles = async (userId: string, filterOptions: FilterOptions) => {
    try {
      setLoading(true);
      setError(null);

      // 1차 시도: RPC 함수 직접 호출
      const { data: rpcData, error: rpcError } = await supabase.rpc('get_filtered_profiles', {
        user_id: userId,
        target_gender: filterOptions.gender,
        min_age: filterOptions.minAge,
        max_age: filterOptions.maxAge,
        target_region: filterOptions.region || null,
      });

      if (rpcError) {
        console.error('RPC 함수 호출 실패:', rpcError);
        // 2차 시도: 백업 RPC 함수 호출
        const { data: backupData, error: backupError } = await supabase.rpc('get_uninteracted_profiles', {
          user_id: userId,
          target_gender: filterOptions.gender,
        });

        if (backupError) {
          console.error('백업 RPC 함수 호출 실패:', backupError);
          // 3차 시도: 기본 쿼리
          await loadBasicProfiles(userId, filterOptions);
          return;
        }

        setProfiles(backupData || []);
        if ((backupData || []).length === 0) {
          setError('조건에 맞는 프로필이 없습니다. 필터를 조정해보세요.');
        }
        return;
      }

      setProfiles(rpcData || []);

      // 프로필이 없는 경우 메시지 설정
      if ((rpcData || []).length === 0) {
        setError('조건에 맞는 프로필이 없습니다. 필터를 조정해보세요.');
      }
    } catch (error) {
      console.error('프로필 로딩 실패:', error);
      setError('프로필을 불러오는 중 오류가 발생했습니다.');
      setProfiles([]);
    } finally {
      setLoading(false);
    }
  };

  // 최후 백업: 기본 쿼리 방식
  const loadBasicProfiles = async (userId: string, filterOptions: FilterOptions) => {
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
      let query = supabase.from('profiles').select('*').eq('gender', filterOptions.gender).neq('id', userId);

      if (excludedIds.size > 0) {
        query = query.not('id', 'in', `(${Array.from(excludedIds).join(',')})`);
      }

      const { data, error } = await query.order('created_at', { ascending: false });

      if (error) {
        console.error('기본 프로필 조회 실패:', error);
        setProfiles([]);
        setError('프로필을 불러올 수 없습니다.');
        return;
      }

      setProfiles(data || []);
      if ((data || []).length === 0) {
        setError('조건에 맞는 프로필이 없습니다.');
      }
    } catch (error) {
      console.error('기본 프로필 조회 중 예외 발생:', error);
      setProfiles([]);
      setError('프로필을 불러올 수 없습니다.');
    }
  };

  return {
    profiles,
    loading,
    error,
    loadFilteredProfiles,
    setProfiles, // 외부에서 직접 설정할 수 있도록
    setError, // 외부에서 에러 상태 초기화 가능
  };
};
