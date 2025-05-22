import React from "react";
import AppleIcon from "../components/AppleIcon";
import GoogleIcon from "../components/GoogleIcon";

interface MainButtonGroupProps {
  router: any;
}

function MainButtonGroup({ router }: MainButtonGroupProps) {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: 12,
      width: 200,
      position: 'absolute',
      left: '50%',
      bottom: 60,
      transform: 'translateX(-50%)',
    }}>
      <button
        onClick={() => router.push('/login')}
        style={{
          width: '100%',
          padding: '9px 0',
          borderRadius: 24,
          background: '#EBA8A6',
          color: '#fff',
          fontWeight: 700,
          fontSize: '0.95rem',
          border: 'none',
          boxShadow: '0 2px 8px rgba(22, 12, 12, 0.13)',
          cursor: 'pointer',
          letterSpacing: '-1px',
          transition: 'background 0.2s',
        }}
      >
        로그인
      </button>
      <button
        onClick={() => router.push('/signup')}
        style={{
          width: '100%',
          padding: '9px 0',
          borderRadius: 24,
          background: '#fff',
          color: '#EBA8A6',
          fontWeight: 700,
          fontSize: '0.95rem',
          border: '2px solid #EBA8A6',
          boxShadow: '0 2px 8px rgba(235,168,166,0.08)',
          cursor: 'pointer',
          letterSpacing: '-1px',
          transition: 'background 0.2s',
        }}
      >
        회원가입
      </button>
      <button
        onClick={() => router.push('/api/auth/apple')}
        style={{
          width: '100%',
          padding: '8px 0',
          borderRadius: 24,
          background: '#fff',
          color: '#222',
          fontWeight: 600,
          fontSize: '0.9rem',
          border: '1.2px solid #eee',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 4,
          boxShadow: '0 1px 4px rgba(0,0,0,0.03)',
          cursor: 'pointer',
          transition: 'background 0.2s',
        }}
      >
        <AppleIcon /> Apple로 로그인
      </button>
      <button
        onClick={() => router.push('/api/auth/google')}
        style={{
          width: '100%',
          padding: '8px 0',
          borderRadius: 24,
          background: '#fff',
          color: '#222',
          fontWeight: 600,
          fontSize: '0.9rem',
          border: '1.2px solid #eee',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 4,
          boxShadow: '0 1px 4px rgba(0,0,0,0.03)',
          cursor: 'pointer',
          transition: 'background 0.2s',
        }}
      >
        <GoogleIcon /> Google로 로그인
      </button>
    </div>
  );
}

export default MainButtonGroup; 