"use client"
import Link from "next/link";
import Logo from './Logo';

interface NavBarProps {
  user: any;
  title?: string;
}

export default function NavBar({ user, title = "" }: NavBarProps) {
  const profileImg = user?.[0]?.photo_urls?.[0] || "/images/profile-default-female.svg";
  return (
    <nav style={{
      height: 56,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      borderBottom: '1px solid #eee',
      background: '#fff',
      padding: '0 16px',
      position: 'sticky',
      top: 0,
      zIndex: 20,
    }}>
      <div style={{ flex: 1, display: 'flex', alignItems: 'center' }}>
        <Logo />
      </div>
      <div style={{ flex: 2, textAlign: 'center', fontWeight: 600, fontSize: '1.1rem', color: '#333' }}>
        {title}
      </div>
      <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
        <Link href={user?.[0]?.id ? "/profile/my" : "/login"}>
          <img
            src={profileImg}
            alt="내 프로필"
            style={{ width: 36, height: 36, borderRadius: '50%', overflow: 'hidden', border: '1.5px solid #A6C8EB', background: '#fff' }}
          />
        </Link>
      </div>
    </nav>
  );
} 