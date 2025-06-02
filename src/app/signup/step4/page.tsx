"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import InterestTagSelector from './InterestTagSelector';
import IdealTypeSelector from './IdealTypeSelector';
import { useSignupStore } from '@/store/useSignupStore';
import { profileBackButtonStyle } from '@/app/components/styles/ProfileButton.styles';

const TAGS = [
  "운동", "여행", "음악감상", "영화", "독서", "맛집탐방", "요리", "반려동물", "게임", "사진", "드라이브", "쇼핑", "자연", "예술", "자기계발", "카페"
];

export default function SignupStep4() {
  const router = useRouter();
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedIdeals, setSelectedIdeals] = useState<string[]>([]);
  const max = 5;
  const setStep4 = useSignupStore(state => state.setStep4);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep4({ interests: selectedTags, ideals: selectedIdeals });
    router.push("/signup/step5");
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#FFF6F5',
      position: 'relative',
    }}>
      {/* 뒤로가기 버튼 */}
      <button
        onClick={() => router.back()}
        style={profileBackButtonStyle}
        aria-label="뒤로가기"
      >
        ←
      </button>
      {/* 진행바 */}
      <div style={{
        position: 'absolute',
        top: 32,
        left: '50%',
        transform: 'translateX(-50%)',
        fontSize: '1rem',
        color: '#EBA8A6',
        fontWeight: 600,
        letterSpacing: '-1px',
      }}>
        4 / 5
      </div>
      <form
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 28,
          width: 320,
          background: '#fff',
          borderRadius: 20,
          boxShadow: '0 4px 24px rgba(235,168,166,0.10)',
          padding: '40px 28px',
          marginTop: 80,
        }}
        onSubmit={handleSubmit}
      >
        <InterestTagSelector selected={selectedTags} setSelected={setSelectedTags} max={max} />
        <IdealTypeSelector selected={selectedIdeals} setSelected={setSelectedIdeals} max={max} />
        <button
          type="submit"
          style={{
            width: '100%',
            alignSelf: 'center',
            padding: '12px 0',
            borderRadius: 16,
            background: '#EBA8A6',
            color: '#fff',
            fontWeight: 700,
            fontSize: '1.05rem',
            border: 'none',
            boxShadow: '0 2px 8px rgba(22, 12, 12, 0.10)',
            cursor: 'pointer',
            letterSpacing: '-1px',
            marginTop: 8,
            transition: 'background 0.2s',
          }}
        >
          다음
        </button>
      </form>
    </div>
  );
} 