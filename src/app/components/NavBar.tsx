"use client"
import Link from "next/link";
import Logo from './Logo';
import { useUserStore } from '@/store/userStore';
import { useEffect } from 'react';
import Image from 'next/image';

interface NavBarProps {
  user: any;
  title?: string;
}

export default function NavBar({ user, title = "" }: NavBarProps) {
  const setUser = useUserStore((state) => state.setUser);
  useEffect(() => {
    if (user) setUser(user);
  }, [user, setUser]);

  const profileImg = user?.photo_urls?.[0] || "/images/profile-default-female.svg";

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
        <Link href={user?.id ? `/profile/${user?.id}` : "/login"}>
          <Image
            src={profileImg}
            alt="내 프로필"
            width={36}
            height={36}
            style={{ width: 36, height: 36, borderRadius: '50%', overflow: 'hidden' }}
          />
        </Link>
      </div>
    </nav>
  );
} 