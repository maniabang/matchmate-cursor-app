'use client';
import Link from 'next/link';
import Logo from './Logo';
import { useUserStore } from '@/store/userStore';
import { useEffect } from 'react';
import Image from 'next/image';
import { Profile } from '@/api/types';

interface NavBarProps {
  user: Profile | null;
  title?: string;
  onFilterClick?: () => void;
}

const FilterIcon = ({ color = '#EBA8A6' }: { color?: string }) => (
  <svg
    width="24"
    height="24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    viewBox="0 0 24 24"
  >
    <path d="M22 3H2l8 9.46V19l4 2v-8.54L22 3z" />
  </svg>
);

export default function NavBar({ user, title = '', onFilterClick }: NavBarProps) {
  const setUser = useUserStore((state) => state.setUser);

  useEffect(() => {
    if (user) setUser(user);
  }, [user, setUser]);

  const profileImg = user?.photo_urls?.[0] || '/images/profile-default-female.svg';

  return (
    <nav
      style={{
        height: 56,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottom: '1px solid #eee',
        background: '#fff',
        padding: '0 16px',
        position: 'sticky',
        top: 0,
        zIndex: 20,
      }}
    >
      <div style={{ flex: 1, display: 'flex', alignItems: 'center' }}>
        <Logo />
      </div>
      <div style={{ flex: 2, textAlign: 'center', fontWeight: 600, fontSize: '1.1rem', color: '#333' }}>{title}</div>
      <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
        {onFilterClick && (
          <button
            onClick={onFilterClick}
            style={{
              background: 'none',
              border: 'none',
              padding: '8px',
              marginRight: '8px',
              cursor: 'pointer',
              borderRadius: '4px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <FilterIcon />
          </button>
        )}
        <Link href={user?.id ? `/profile/${user?.id}` : '/login'}>
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
