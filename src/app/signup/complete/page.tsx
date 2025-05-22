"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";

// SSR에서 window 객체가 없으므로 dynamic import 사용
const Confetti = dynamic(() => import("react-confetti"), { ssr: false });

export default function SignupComplete() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/");
    }, 2500);
    return () => clearTimeout(timer);
  }, [router]);

  // 화면 크기 동적 계산 (간단히 window 사용)
  const width = typeof window !== "undefined" ? window.innerWidth : 360;
  const height = typeof window !== "undefined" ? window.innerHeight : 640;

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#FFF6F5',
      position: 'relative',
      overflow: 'hidden',
    }}>
      <Confetti width={width} height={height} numberOfPieces={180} recycle={false} />
      <div style={{
        zIndex: 10,
        background: 'rgba(255,255,255,0.85)',
        borderRadius: 24,
        boxShadow: '0 4px 24px rgba(235,168,166,0.10)',
        padding: '48px 32px',
        textAlign: 'center',
        maxWidth: 320,
      }}>
        <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#EBA8A6', marginBottom: 18 }}>
          🎉 회원가입을 축하드립니다! 🎉
        </div>
        <div style={{ color: '#888', fontSize: '1.05rem', marginBottom: 8 }}>
          이제 메인 화면으로 이동합니다.
        </div>
      </div>
    </div>
  );
} 