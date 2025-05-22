import Link from "next/link";

const HomeIcon = ({ color }: { color: string }) => (
  <svg width="24" height="24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
    <path d="M3 12L12 3l9 9" />
    <path d="M9 21V9h6v12" />
  </svg>
);

const MessageIcon = ({ color }: { color: string }) => (
  <svg width="24" height="24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
);

const HeartIcon = ({ color }: { color: string }) => (
  <svg width="24" height="24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
    <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0l-.9 1-.9-1A5.5 5.5 0 0 0 3.4 12l9.6 9.4 9.6-9.4a5.5 5.5 0 0 0-1.8-7.4z" />
  </svg>
);

interface BottomNavProps {
  activeTab?: 'home' | 'messages' | 'match';
}

export default function BottomNav({ activeTab }: BottomNavProps) {
  return (
    <nav style={{ height: 60, display: 'flex', justifyContent: 'space-around', alignItems: 'center', borderTop: '1px solid #eee', background: '#fff' }}>
      <Link href="/" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1, textDecoration: 'none' }}>
        <HomeIcon color={activeTab === 'home' ? '#EBA8A6' : '#CCCCCC'} />
        <span style={{ fontSize: '0.85rem', marginTop: 2, color: activeTab === 'home' ? '#EBA8A6' : '#CCCCCC' }}>홈</span>
      </Link>
      <Link href="/messages" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1, textDecoration: 'none' }}>
        <MessageIcon color={activeTab === 'messages' ? '#EBA8A6' : '#CCCCCC'} />
        <span style={{ fontSize: '0.85rem', marginTop: 2, color: activeTab === 'messages' ? '#EBA8A6' : '#CCCCCC' }}>메시지</span>
      </Link>
      <Link href="/likes/received" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1, textDecoration: 'none' }}>
        <HeartIcon color={activeTab === 'match' ? '#EBA8A6' : '#CCCCCC'} />
        <span style={{ fontSize: '0.85rem', marginTop: 2, color: activeTab === 'match' ? '#EBA8A6' : '#CCCCCC' }}>매치</span>
      </Link>
    </nav>
  );
} 