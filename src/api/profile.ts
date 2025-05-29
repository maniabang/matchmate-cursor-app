import { useQuery } from '@tanstack/react-query';

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