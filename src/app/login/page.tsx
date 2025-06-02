"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import LoginForm from "./LoginForm";
import { profileBackButtonStyle } from '../components/styles/ProfileButton.styles';

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
      {/* 상단 로고 */}
      <span style={{
        fontFamily: "'Pretendard', 'Noto Sans KR', Arial, sans-serif",
        fontWeight: 700,
        fontSize: '2rem',
        color: '#EBA8A6',
        letterSpacing: '-2px',
        marginBottom: 32,
        userSelect: 'none',
      }}>
        어게인
      </span>
      {/* 안내문구 */}
      <div style={{
        color: '#222',
        fontSize: '1.1rem',
        marginBottom: 32,
        textAlign: 'center',
        fontWeight: 500,
      }}>
        다시 만나는 인연, <br />어게인에서 시작하세요
      </div>
      {/* 로그인 폼 */}
      <LoginForm
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        onSubmit={e => { e.preventDefault(); router.push('/home'); }}
      />
      {/* 회원가입 링크 */}
      <div style={{
        marginTop: 24,
        color: '#888',
        fontSize: '0.98rem',
      }}>
        계정이 없으신가요?{' '}
        <span
          style={{ color: '#EBA8A6', cursor: 'pointer', fontWeight: 600 }}
          onClick={() => router.push('/signup')}
        >
          회원가입
        </span>
      </div>
    </div>
  );
} 