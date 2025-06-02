"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import ProfileImageUploader from "./ProfileImageUploader";
import { useSignupStore } from '@/store/useSignupStore';
import { profileBackButtonStyle } from '@/app/components/styles/ProfileButton.styles';

export default function SignupStep2() {
  const router = useRouter();
  const [images, setImages] = useState<{ url: string | null, path: string | null }[]>(
    Array(6).fill({ url: null, path: null })
  );
  const setStep2 = useSignupStore(state => state.setStep2);
  const userId = typeof window !== 'undefined' ? localStorage.getItem('userId') || '' : '';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const photo_urls = images.filter(img => img.url).map(img => img.url!) as string[];
    setStep2({ photo_urls });
    router.push('/signup/step3');
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
        2 / 5
      </div>
      {/* 사진 업로드 폼 */}
      <form style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 18,
        width: 320,
        background: '#fff',
        borderRadius: 20,
        boxShadow: '0 4px 24px rgba(235,168,166,0.10)',
        padding: '40px 28px',
        marginTop: 80,
        alignItems: 'center',
      }} onSubmit={handleSubmit}>
        <label style={{
          fontWeight: 600,
          color: '#EBA8A6',
          fontSize: '1.08rem',
          marginBottom: 8,
        }}>
          프로필 사진을 업로드해 주세요
        </label>
        <ProfileImageUploader images={images} setImages={setImages} userId={userId} />
        <button
          type="submit"
          style={{
            width: '100%',
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