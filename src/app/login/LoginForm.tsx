import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from '@/api/auth';

interface LoginFormProps {
  email: string;
  setEmail: (v: string) => void;
  password: string;
  setPassword: (v: string) => void;
}

export default function LoginForm({ email, setEmail, password, setPassword }: LoginFormProps) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await signIn({ email, password });
      router.replace("/");
    } catch (err: any) {
      setError(err.message || '로그인에 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

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
    }} onSubmit={handleSubmit}>
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
      {error && <div style={{ color: '#EBA8A6', fontSize: '0.97rem' }}>{error}</div>}
      <button
        type="submit"
        disabled={loading}
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
        {loading ? '로그인 중...' : '로그인'}
      </button>
    </form>
  );
} 