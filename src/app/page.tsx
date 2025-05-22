"use client";
import Image from "next/image";
import Link from "next/link";
import BottomNav from "./components/BottomNav";
import { useRouter } from "next/navigation";
import NavBar from "./components/NavBar";

// 메인 카드용 유저 목데이터
const mainUser = {
  id: '1',
  name: '이수진',
  age: 28,
  region: '서울',
  job: '디자이너',
  profile: '',
};

export default function Home() {
  const router = useRouter();
  const profileSrc = mainUser.profile && mainUser.profile.trim() !== '' ? mainUser.profile : "/images/profile-default-female.svg";
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: '#fff' }}>
      <NavBar title="" />
      {/* 카드 스와이프 영역 */}
      <section style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <div
          style={{ width: 320, height: 420, background: '#f5f5f5', borderRadius: 24, boxShadow: '0 4px 16px rgba(0,0,0,0.08)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end', overflow: 'hidden', position: 'relative', cursor: 'pointer' }}
          onClick={() => router.push(`/profile/${mainUser.id}`)}
        >
          <Image src={profileSrc} alt="유저 이미지" width={320} height={294} style={{ width: '100%', height: '70%', objectFit: 'cover' }} />
          <div style={{ width: '100%', padding: '20px 16px 24px 16px', background: 'rgba(255,255,255,0.95)', borderBottomLeftRadius: 24, borderBottomRightRadius: 24 }}>
            <span style={{ fontSize: '1.2rem', fontWeight: 600, color: '#EBA8A6' }}>{mainUser.name}, {mainUser.age}</span><br />
            <span style={{ fontSize: '1rem', color: '#EBA8A6' }}>{mainUser.region}, {mainUser.job}</span>
          </div>
        </div>
        {/* 추가 카드가 있다면 아래에 쌓이도록 배치 */}
      </section>
      {/* 하단 탭 네비게이션 바 */}
      <BottomNav activeTab="home"/>
    </div>
  );
}
