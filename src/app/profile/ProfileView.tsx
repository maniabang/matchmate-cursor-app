"use client";

import React from 'react';
import { UserProfile } from '../../mocks/profiles';
import { useRouter } from 'next/navigation';

export default function ProfileView({ profile }: { profile: UserProfile }) {
  const router = useRouter();
  const defaultProfile = '/images/profile-default-female.svg';
  const profileSrc = profile.profile && profile.profile.trim() !== '' ? profile.profile : defaultProfile;
  return (
    <div className="bg-white min-h-screen flex flex-col items-center">
      {/* 상단바 */}
      <header className="w-full relative flex items-center px-4 py-3 border-b border-gray-100 justify-center">
        <button className="absolute left-4 text-2xl text-[#EBA8A6] cursor-pointer" onClick={() => router.back()}>←</button>
        <span className="text-lg font-bold text-[#EBA8A6]">프로필</span>
      </header>
      <div className="flex flex-col items-center py-8 px-4 w-full max-w-md mx-auto">
        <div className="w-28 h-28 rounded-full overflow-hidden border border-gray-200 mb-4">
          <img src={profileSrc} alt="프로필" className="w-full h-full object-cover" />
        </div>
        <div className="text-xl font-semibold text-gray-900 mb-1">{profile.name}, {profile.age}</div>
        <div className="text-sm text-[#EBA8A6] mb-2">{profile.region}, {profile.job}</div>
        <div className="bg-[#F8F8F8] rounded-xl px-4 py-3 text-gray-700 text-center w-full">
          {profile.intro}
        </div>
      </div>
    </div>
  );
} 