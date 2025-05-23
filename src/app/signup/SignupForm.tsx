import React from "react";

interface SignupFormProps {
  email: string;
  setEmail: (v: string) => void;
  password: string;
  setPassword: (v: string) => void;
  passwordCheck: string;
  setPasswordCheck: (v: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export default function SignupForm({ email, setEmail, password, setPassword, passwordCheck, setPasswordCheck, onSubmit }: SignupFormProps) {
  const isPasswordMatch = password === passwordCheck && password.length > 0;
  const isPasswordError = passwordCheck.length > 0 && !isPasswordMatch;

  return (
    <form style={{
      display: 'flex',
      flexDirection: 'column',
      gap: 18,
      width: 320,
      background: '#fff',
      borderRadius: 20,
      boxShadow: '0 4px 24px rgba(235,168,166,0.10)',
      padding: '32px 28px',
    }} onSubmit={onSubmit}>
      <input
        type="email"
        placeholder="이메일"
        value={email}
        onChange={e => setEmail(e.target.value)}
        style={{
          padding: '12px 16px',
          borderRadius: 12,
          border: '1.5px solid #EBA8A6',
          fontSize: '1rem',
          outline: 'none',
          marginBottom: 8,
        }}
      />
      <input
        type="password"
        placeholder="비밀번호"
        value={password}
        onChange={e => setPassword(e.target.value)}
        style={{
          padding: '12px 16px',
          borderRadius: 12,
          border: '1.5px solid #EBA8A6',
          fontSize: '1rem',
          outline: 'none',
          marginBottom: 8,
        }}
      />
      <input
        type="password"
        placeholder="비밀번호 확인"
        value={passwordCheck}
        onChange={e => setPasswordCheck(e.target.value)}
        style={{
          padding: '12px 16px',
          borderRadius: 12,
          border: '1.5px solid #EBA8A6',
          fontSize: '1rem',
          outline: 'none',
          marginBottom: 8,
        }}
      />
      {isPasswordError && (
        <div style={{ color: '#FF6B6B', fontSize: '0.97rem', marginBottom: 4 }}>
          비밀번호가 일치하지 않습니다
        </div>
      )}
      <button
        type="submit"
        disabled={!isPasswordMatch}
        style={{
          width: '100%',
          padding: '12px 0',
          borderRadius: 16,
          background: isPasswordMatch ? '#EBA8A6' : '#E6E6E6',
          color: '#fff',
          fontWeight: 700,
          fontSize: '1.05rem',
          border: 'none',
          boxShadow: '0 2px 8px rgba(22, 12, 12, 0.10)',
          cursor: isPasswordMatch ? 'pointer' : 'not-allowed',
          letterSpacing: '-1px',
          marginTop: 8,
          transition: 'background 0.2s',
        }}
      >
        회원가입
      </button>
    </form>
  );
} 