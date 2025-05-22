"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignupStep5() {
  const router = useRouter();
  const [intro, setIntro] = useState("");
  const max = 300;

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value.length <= max) setIntro(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (intro.trim().length > 0) {
      // 실제 회원가입 완료 처리 등
      router.push("/signup/complete");
    }
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
        5 / 5
      </div>
      <form
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 18,
          width: 320,
          background: '#fff',
          borderRadius: 20,
          boxShadow: '0 4px 24px rgba(235,168,166,0.10)',
          padding: '40px 28px',
          marginTop: 80,
        }}
        onSubmit={handleSubmit}
      >
        <div style={{ color: '#222', fontSize: '1.1rem', fontWeight: 600, marginBottom: 8 }}>
          자기소개를 입력해 주세요
        </div>
        <div style={{ color: '#888', fontSize: '0.98rem', marginBottom: 8, lineHeight: 1.5 }}>
          나를 한마디로 소개하거나, 취미/성격/이상형 등 자유롭게 적어주세요.<br />
          <span style={{ color: '#EBA8A6' }}>예시: "여행과 카페를 좋아하는 긍정적인 ENFP! 함께 다양한 경험을 나누고 싶어요."</span>
        </div>
        <textarea
          value={intro}
          onChange={handleChange}
          maxLength={max}
          rows={6}
          placeholder="자기소개를 입력하세요 (최대 300자)"
          style={{
            width: '100%',
            borderRadius: 12,
            border: '1.5px solid #EBA8A6',
            padding: '14px',
            fontSize: '1rem',
            resize: 'none',
            outline: 'none',
            marginBottom: 6,
            color: '#222',
            background: '#FFF6F5',
          }}
        />
        <div style={{ color: intro.length === max ? '#EBA8A6' : '#aaa', fontSize: '0.97rem', marginBottom: 4, textAlign: 'right' }}>
          {intro.length} / {max}자
        </div>
        <button
          type="submit"
          disabled={intro.trim().length === 0}
          style={{
            width: '100%',
            padding: '12px 0',
            borderRadius: 16,
            background: intro.trim().length > 0 ? '#EBA8A6' : '#E6E6E6',
            color: '#fff',
            fontWeight: 700,
            fontSize: '1.05rem',
            border: 'none',
            boxShadow: '0 2px 8px rgba(22, 12, 12, 0.10)',
            cursor: intro.trim().length > 0 ? 'pointer' : 'not-allowed',
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