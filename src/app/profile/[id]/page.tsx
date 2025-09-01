'use client';
import { useParams, useRouter } from 'next/navigation';
import { getProfile } from '@/api/profile';
import ProfileView from '../ProfileView';
import { useEffect, useState } from 'react';
import { useHydratedUserStore } from '@/store/useHydratedUserStore';
import { useHydratedMyProfileStore } from '@/store/useHydratedUserStore';
import type { Profile } from '@/api/types';

export default function ProfileDetailPage() {
  const router = useRouter();
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

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 border-4 border-[#EBA8A6] border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-600 text-lg">프로필을 불러오는 중...</p>
        </div>
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-4">
        <div className="text-center max-w-md">
          <div className="w-20 h-20 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
            <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">프로필을 찾을 수 없습니다</h2>
          <p className="text-gray-600 mb-6">{error || '프로필 정보를 불러올 수 없습니다.'}</p>
          <div className="flex gap-3 justify-center">
            <button
              onClick={() => window.location.reload()}
              className="bg-[#EBA8A6] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#E39794] transition-colors"
            >
              다시 시도
            </button>
            <button
              onClick={() => router.back()}
              className="bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
            >
              돌아가기
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <ProfileView profile={profile} isMyProfile={user?.id === id} />
    </>
  );
}
