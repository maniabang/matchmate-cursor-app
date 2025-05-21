import Image from "next/image";

export default function Home() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: '#fff' }}>
      {/* 상단바 */}
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 20px', borderBottom: '1px solid #eee' }}>
        <span style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#EBA8A6' }}>LoveAagain</span>
        <button style={{ background: 'none', border: 'none', fontSize: '1.2rem', cursor: 'pointer', color: '#EBA8A6' }}>👤</button>
      </header>

      {/* 카드 스와이프 영역 */}
      <section style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ width: 320, height: 420, background: '#f5f5f5', borderRadius: 24, boxShadow: '0 4px 16px rgba(0,0,0,0.08)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end', overflow: 'hidden', position: 'relative' }}>
          <Image src="/images/IMG_503.JPG" alt="유저 이미지" width={320} height={294} style={{ width: '100%', height: '70%', objectFit: 'cover' }} />
          <div style={{ width: '100%', padding: '20px 16px 24px 16px', background: 'rgba(255,255,255,0.95)', borderBottomLeftRadius: 24, borderBottomRightRadius: 24 }}>
            <span style={{ fontSize: '1.2rem', fontWeight: 600, color: '#EBA8A6' }}>이광훈, 35</span><br />
            <span style={{ fontSize: '1rem', color: '#EBA8A6' }}>수원, 개발자</span>
          </div>
        </div>
        {/* 추가 카드가 있다면 아래에 쌓이도록 배치 */}
      </section>

      {/* 하단 탭 네비게이션 바 */}
      <nav style={{ height: 60, display: 'flex', justifyContent: 'space-around', alignItems: 'center', borderTop: '1px solid #eee', background: '#fff' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1 }}>
          <span style={{ fontSize: '1.5rem', color: '#EBA8A6' }}>🏠</span>
          <span style={{ fontSize: '0.85rem', marginTop: 2, color: '#EBA8A6' }}>홈</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1 }}>
          <span style={{ fontSize: '1.5rem', color: '#CCCCCC' }}>💬</span>
          <span style={{ fontSize: '0.85rem', marginTop: 2, color: '#CCCCCC' }}>메시지</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1 }}>
          <span style={{ fontSize: '1.5rem', color: '#CCCCCC' }}>❤️</span>
          <span style={{ fontSize: '0.85rem', marginTop: 2, color: '#CCCCCC' }}>매치</span>
        </div>
      </nav>
    </div>
  );
}
