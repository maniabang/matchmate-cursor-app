"use client";
import React, { useState } from 'react';
import type { Profile } from '@/api/types';
import ProfileImageUploader from '@/app/signup/step2/ProfileImageUploader';
import BasicInfoForm from '@/app/signup/step3/BasicInfoForm';
import InterestTagSelector from '@/app/signup/step4/InterestTagSelector';
import IdealTypeSelector from '@/app/signup/step4/IdealTypeSelector';
import { useRouter } from 'next/navigation';
import { updateProfile, useProfile } from '@/api/profile';
import { useUserStore, useMyProfileStore } from '@/store/userStore';
import { useModalStore } from '@/store/modalStore';
import { supabase } from '@/lib/supabase';

interface ProfileEditProps {
  profile: Profile;
}

export default function ProfileEdit({ profile }: ProfileEditProps) {
  const router = useRouter();
  const user = useUserStore(state => state.user);
  const openModal = useModalStore(state => state.openModal);
  const setMyProfile = useMyProfileStore(state => state.setMyProfile);
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
  const handleSave = async () => {
    if (!user?.id) {
      openModal(null, {
        title: '오류',
        description: '로그인 정보가 없습니다.',
        confirmText: '확인',
      });
      return;
    }
    try {
      const { data, error } = await supabase
        .from('profiles')
        .update({
          photo_urls: images.map(img => img.url).filter(Boolean) as string[],
          birth,
          job,
          region,
          mbti,
          gender,
          interests,
          ideals,
          intro,
        })
        .eq('id', user.id)
        .select();

      if (error) {
        openModal(null, {
          title: '저장 실패',
          description: error.message || '프로필 저장에 실패했습니다.',
          confirmText: '확인',
        });
      } else {
        setMyProfile(data?.[0]);
        openModal(null, {
          title: '저장 완료',
          description: '프로필이 성공적으로 저장되었습니다.',
          confirmText: '확인',
          onConfirm: () => router.push(`/profile/${user.id}`),
        });
      }
    } catch (err: any) {
      openModal(null, {
        title: '저장 실패',
        description: err?.message || '프로필 저장에 실패했습니다.',
        confirmText: '확인',
      });
    }
  };

  return (
    <>
      {/* 상단바 */}
      < header
        className="top-bar"
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 20,
          background: '#fff',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          height: 56,
          padding: '0 16px',
          borderBottom: '1px solid #eee',
        }
        }
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
      </header >

      <div className="profile-edit-container" style={{ maxWidth: 400, margin: '0 auto', padding: 16 }}>
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
    </>
  );
} 