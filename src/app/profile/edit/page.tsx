"use client";
import { useHydratedMyProfileStore } from '@/store/useHydratedUserStore';
import ProfileEdit from '../ProfileEdit';

export default function ProfileEditPage() {
  const { myProfile } = useHydratedMyProfileStore();

  // myProfile이 없을 때 처리(로딩 등)
  if (!myProfile) {
    return <div className="p-8 text-center text-gray-400">로딩 중...</div>;
  }

  return <ProfileEdit profile={myProfile} />;
}