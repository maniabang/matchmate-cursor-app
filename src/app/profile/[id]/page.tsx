'use client';
import { useParams } from 'next/navigation';
import { getProfile } from '@/api/profile';
import ProfileView from '../ProfileView';
import { useEffect, useState } from 'react';
import { useHydratedUserStore } from '@/store/useHydratedUserStore';
import { useHydratedMyProfileStore } from '@/store/useHydratedUserStore';
import type { Profile } from '@/api/types';

export default function ProfileDetailPage() {
  const { id } = useParams();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // persist가 적용된 훅 사용
  const { user } = useHydratedUserStore();
  const { setMyProfile } = useHydratedMyProfileStore();

  useEffect(() => {
    if (!id) return;

    const loadProfile = async () => {
      try {
        setIsLoading(true);
        const profileData = await getProfile(id as string);
        setProfile(profileData);
      } catch {
        setError('프로필을 불러올 수 없습니다.');
      } finally {
        setIsLoading(false);
      }
    };

    loadProfile();
  }, [id]);

  useEffect(() => {
    if (user?.id === id && profile) {
      setMyProfile(profile);
    }
  }, [user?.id, id, profile, setMyProfile]);

  if (isLoading) return <div className="p-8 text-center text-gray-400">로딩 중...</div>;
  if (error || !profile) return <div className="p-8 text-center text-gray-400">프로필 정보를 찾을 수 없습니다.</div>;

  return (
    <>
      <ProfileView profile={profile} isMyProfile={user?.id === id} />
    </>
  );
}
