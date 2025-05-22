"use client";
import Image from "next/image";
import Link from "next/link";
import BottomNav from "./components/BottomNav";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: '#fff' }}>
      {/* 상단바 */}
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 20px', borderBottom: '1px solid #eee' }}>
        <span style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#EBA8A6' }}>LoveAagain</span>
        <Link href="/profile">
          <div style={{ width: 36, height: 36, borderRadius: '50%', overflow: 'hidden', border: '2px solid #A6C8EB', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
            <Image src={"/images/profile-default-male.svg"} alt="내 프로필" width={36} height={36} style={{ objectFit: 'cover', width: 36, height: 36 }} />
          </div>
        </Link>
      </header>

      {/* 카드 스와이프 영역 */}
      <section style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <div
          style={{ width: 320, height: 420, background: '#f5f5f5', borderRadius: 24, boxShadow: '0 4px 16px rgba(0,0,0,0.08)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end', overflow: 'hidden', position: 'relative', cursor: 'pointer' }}
          onClick={() => router.push('/messages/1')}
        >
          <Image src="/images/profile-default-female.svg" alt="유저 이미지" width={320} height={294} style={{ width: '100%', height: '70%', objectFit: 'cover' }} />
          <div style={{ width: '100%', padding: '20px 16px 24px 16px', background: 'rgba(255,255,255,0.95)', borderBottomLeftRadius: 24, borderBottomRightRadius: 24 }}>
            <span style={{ fontSize: '1.2rem', fontWeight: 600, color: '#EBA8A6' }}>이광훈, 35</span><br />
            <span style={{ fontSize: '1rem', color: '#EBA8A6' }}>수원, 개발자</span>
          </div>
        </div>
        {/* 추가 카드가 있다면 아래에 쌓이도록 배치 */}
      </section>

      {/* 하단 탭 네비게이션 바 */}
      <BottomNav />
    </div>
  );
}
