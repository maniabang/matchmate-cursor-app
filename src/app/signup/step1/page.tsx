"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import NicknameInput from "./NicknameInput";
import { useSignupStore } from '@/store/useSignupStore';

export default function SignupStep1() {
  const router = useRouter();
  const [nickname, setNickname] = useState("");
  const setStep1 = useSignupStore(state => state.setStep1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep1({ nickname });
    router.push('/signup/step2');
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
        style={{
          position: 'absolute',
          top: 24,
          left: 20,
          background: 'none',
          border: 'none',
          fontSize: '1.5rem',
          color: '#EBA8A6',
          cursor: 'pointer',
          zIndex: 10,
          padding: 0,
        }}
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
        1 / 5
      </div>
      {/* 닉네임 입력 폼 */}
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
      }} onSubmit={handleSubmit}>
        <NicknameInput nickname={nickname} setNickname={setNickname} />
        {/* 닉네임 규칙 안내 */}
        <div style={{
          background: '#FAFAFA',
          borderRadius: 12,
          padding: '16px 18px',
          color: '#666',
          fontSize: '0.97rem',
          marginBottom: 8,
        }}>
          <div style={{ fontWeight: 600, color: '#333', marginBottom: 6 }}>닉네임 규칙</div>
          <div>
            - 2~10자 이내 한글, 영문, 숫자 사용 가능<br />
            - 특수문자, 공백 사용 불가<br />
            - 닉네임은 중복될 수 없습니다
          </div>
        </div>
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