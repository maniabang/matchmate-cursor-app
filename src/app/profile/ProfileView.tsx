"use client";

import React from 'react';
import { useRouter } from 'next/navigation';

// UserProfile 타입 명시
export type UserProfile = {
  id: string;
  name: string;
  age: number;
  gender: '남성' | '여성';
  region: string;
  job: string;
  mbti: string;
  intro: string;
  interests: string[];
  profile: string;
};

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
        <div className="text-xl font-semibold text-gray-900 mb-1">{profile.name}, {profile.age} <span className="text-base text-[#A6C8EB]">{profile.gender}</span></div>
        <div className="flex items-center gap-2 text-sm text-[#EBA8A6] mb-2">
          <span>{profile.region}</span>
          <span>·</span>
          <span>{profile.job}</span>
          <span>·</span>
          <span>{profile.mbti}</span>
        </div>
        <div className="bg-[#F8F8F8] rounded-xl px-4 py-3 text-gray-700 text-center w-full mb-2">
          {profile.intro}
        </div>
        <div className="flex flex-wrap gap-2 justify-center w-full">
          {profile.interests.map((interest: string, i: number) => (
            <span key={i} className="px-3 py-1 bg-[#EBA8A6]/10 text-[#EBA8A6] rounded-full text-xs font-medium border border-[#EBA8A6]/30">
              #{interest}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
} 