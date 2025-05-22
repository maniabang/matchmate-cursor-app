"use client";
import { useRouter } from "next/navigation";
import MainButtonGroup from "./components/MainButtonGroup";

export default function Welcome() {
  const router = useRouter();
  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh', overflow: 'hidden' }}>
      {/* 배경 영상 */}
      <video
        autoPlay
        loop
        muted
        playsInline
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          objectFit: 'cover',
          zIndex: 0,
        }}
      >
        <source src="/videos/welcome-bg.mp4" type="video/mp4" />
        브라우저가 비디오 태그를 지원하지 않습니다.
      </video>
      {/* 왼쪽 상단 로고 */}
      <span
        style={{
          position: 'absolute',
          top: 32,
          left: 32,
          fontFamily: "'Pretendard', 'Noto Sans KR', Arial, sans-serif",
          fontWeight: 700,
          fontSize: '2rem',
          color: '#EBA8A6',
          letterSpacing: '-2px',
          textShadow: '0 2px 16px #fff',
          userSelect: 'none',
          zIndex: 2,
        }}
      >
        어게인
      </span>
      {/* 중앙 안내문구 + 버튼 */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1,
          background: 'rgba(0,0,0,0.25)',
        }}
      >
        {/* 버튼 그룹 */}
        <MainButtonGroup router={router} />
      </div>
    </div>
  );
}
