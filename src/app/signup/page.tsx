"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import SignupForm from "./SignupForm";
import { useSignupStore } from '@/store/useSignupStore';
import { supabase } from '@/lib/supabase';
import { useModalStore } from '@/store/modalStore';
import { profileBackButtonStyle } from '../components/styles/ProfileButton.styles';

export default function Signup() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const setUserId = useSignupStore(state => state.setUserId);
  const [error, setError] = useState<string | null>(null);
  const { openModal } = useModalStore();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (data?.user && Array.isArray(data.user.identities) && data.user.identities.length === 0) {
      openModal(null, {
        title: '이메일 중복',
        description: '이미 사용 중인 이메일입니다.',
        confirmText: '확인',
      });
      return;
    }
    if (error || !data.user) {
      if (error?.message?.includes('For security purposes')) {
        setError('보안 정책에 따라 같은 이메일로 1분 이내에 재가입할 수 없습니다. 잠시 후 다시 시도해 주세요.');
      } else {
        setError(error?.message || '회원가입에 실패했습니다.');
      }
      return;
    }
    setUserId(data.user.id);
    openModal(null, {
      title: '회원가입 완료',
      description: '이메일 인증을 완료해주세요.\n이메일로 전송된 인증 링크를 확인해 주세요.',
      confirmText: '확인',
      onConfirm: () => router.push('/signup/step1'),
    });
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
        새로운 인연을 위해<br />회원가입을 해주세요
      </div>
      {/* 회원가입 폼 */}
      <SignupForm
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        passwordCheck={passwordCheck}
        setPasswordCheck={setPasswordCheck}
        onSubmit={handleSignup}
      />
      {error && (
        <div style={{ color: '#FF6B6B', fontSize: '0.97rem', marginTop: 8 }}>{error}</div>
      )}
      {/* 로그인 이동 링크 */}
      <div style={{
        marginTop: 24,
        color: '#888',
        fontSize: '0.98rem',
      }}>
        이미 계정이 있으신가요?{' '}
        <span
          style={{ color: '#EBA8A6', cursor: 'pointer', fontWeight: 600 }}
          onClick={() => router.push('/login')}
        >
          로그인
        </span>
      </div>
    </div>
  );
} 