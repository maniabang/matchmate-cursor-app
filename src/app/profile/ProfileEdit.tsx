"use client";
import React, { useState } from 'react';
import type { Profile } from '@/api/types';
import ProfileImageUploader from '@/app/signup/step2/ProfileImageUploader';
import BasicInfoForm from '@/app/signup/step3/BasicInfoForm';
import InterestTagSelector from '@/app/signup/step4/InterestTagSelector';
import IdealTypeSelector from '@/app/signup/step4/IdealTypeSelector';
import { useRouter } from 'next/navigation';

interface ProfileEditProps {
  profile: Profile;
}

export default function ProfileEdit({ profile }: ProfileEditProps) {
  const router = useRouter();
  const [images, setImages] = useState<{ url: string | null, path: string | null }[]>(
    (profile.photo_urls || []).map((url: string) => ({ url, path: null })).concat(Array(6).fill({ url: null, path: null })).slice(0, 6)
  );
  // 기본 정보
  const [birth, setBirth] = useState(profile.birth || '');
  const [job, setJob] = useState(profile.job || '');
  const [region, setRegion] = useState(profile.region || '');
  const [mbti, setMbti] = useState(profile.mbti || '');
  const [gender, setGender] = useState(profile.gender || '');
  // 관심사/이상형
  const [interests, setInterests] = useState<string[]>(profile.interests || []);
  const [ideals, setIdeals] = useState<string[]>(profile.ideals || []);
  // 자기소개
  const [intro, setIntro] = useState(profile.intro || '');

  // 저장 버튼 클릭 시 (임시)
  const handleSave = () => {
    console.log({
      images,
      birth,
      job,
      region,
      mbti,
      gender,
      interests,
      ideals,
      intro,
    });
  };

  return (
    <div className="profile-edit-container" style={{ maxWidth: 400, margin: '0 auto', padding: 16 }}>
      {/* 상단바 */}
      <header
        className="top-bar"
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 16,
        }}
      >
        <button
          onClick={() => router.back()}
          style={{
            background: 'none',
            border: 'none',
            fontSize: '1.5rem',
            color: '#EBA8A6',
            cursor: 'pointer',
            padding: 0,
          }}
          aria-label="뒤로가기"
        >
          ←
        </button>
        <button
          className="save-btn"
          onClick={handleSave}
          style={{
            color: '#EBA8A6',
            fontWeight: 700,
            fontSize: '1rem',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          저장
        </button>
      </header>

      {/* 프로필 이미지 업로더 */}
      <ProfileImageUploader images={images} setImages={setImages} userId={profile.id} />

      {/* 기본 정보 입력 폼 (닉네임, 생년월일, 성별, 직업, 지역, MBTI 등) */}
      <div style={{ margin: '24px 0' }}>
        <BasicInfoForm
          birth={birth} setBirth={setBirth}
          gender={gender} setGender={setGender}
          job={job} setJob={setJob}
          region={region} setRegion={setRegion}
          mbti={mbti} setMbti={setMbti}
          onSubmit={e => e.preventDefault()}
          isEdit={true}
        />
      </div>

      {/* 관심사 태그 선택 */}
      <InterestTagSelector selected={interests} setSelected={setInterests} max={5} />
      {/* 이상형 태그 선택 */}
      <IdealTypeSelector selected={ideals} setSelected={setIdeals} max={5} />

      {/* 자기소개 */}
      <div style={{ margin: '24px 0' }}>
        <label style={{ color: '#EBA8A6', fontWeight: 600, fontSize: '1rem', marginBottom: 2 }}>자기소개</label>
        <textarea
          className="input"
          value={intro}
          onChange={e => setIntro(e.target.value)}
          maxLength={300}
          rows={6}
          placeholder="자기소개를 입력하세요 (최대 300자)"
          style={{ width: '100%', borderRadius: 12, border: '1.5px solid #EBA8A6', padding: '14px', fontSize: '1rem', resize: 'none', outline: 'none', marginBottom: 6, color: '#222', background: '#FFF6F5' }}
        />
        <div style={{ color: intro.length === 300 ? '#EBA8A6' : '#aaa', fontSize: '0.97rem', marginBottom: 4, textAlign: 'right' }}>
          {intro.length} / 300자
        </div>
      </div>
    </div>
  );
} 