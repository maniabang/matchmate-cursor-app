"use client";
import { useParams } from "next/navigation";
import { useProfile } from '@/api/profile';
import ProfileView from '../ProfileView';
import { useEffect } from 'react';
import { useHydratedUserStore } from '@/store/useHydratedUserStore';
import { useHydratedMyProfileStore } from '@/store/useHydratedUserStore';

export default function ProfileDetailPage() {
  const { id } = useParams();
  const { data: profile, isLoading, error } = useProfile(id as string);
  
  // persist가 적용된 훅 사용
  const { user } = useHydratedUserStore();
  const { setMyProfile } = useHydratedMyProfileStore();

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