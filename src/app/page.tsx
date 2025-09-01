'use client';
import MainButtonGroup from './components/MainButtonGroup';

export default function Welcome() {
  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh', overflow: 'hidden' }}>
      {/* 배경 이미지 대체 */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          background: 'linear-gradient(180deg, rgba(235,168,166,0.3), rgba(227,151,148,0.3))',
          zIndex: 0,
        }}
      />
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
        <MainButtonGroup />
      </div>
    </div>
  );
}
