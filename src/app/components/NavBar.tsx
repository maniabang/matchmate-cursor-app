'use client';
import Link from 'next/link';
import Logo from './Logo';
import { useUserStore } from '@/store/userStore';
import { useEffect } from 'react';
import Image from 'next/image';
import { Profile } from '@/api/types';
import FilterModalContent from '../home/FilterModalContent';
import { useModalStore } from '@/store/modalStore';

interface NavBarProps {
  user: Profile;
  title?: string;
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
    <line x1="4" y1="21" x2="20" y2="21" />
    <line x1="8" y1="17" x2="16" y2="17" />
    <line x1="10" y1="13" x2="14" y2="13" />
    <line x1="12" y1="3" x2="12" y2="13" />
    <circle cx="12" cy="7" r="2.5" />
  </svg>
);

export default function NavBar({ user, title = '' }: NavBarProps) {
  const setUser = useUserStore((state) => state.setUser);
  const openModal = useModalStore((state) => state.openModal);
  useEffect(() => {
    if (user) setUser(user);
  }, [user, setUser]);

  const profileImg = user?.photo_urls?.[0] || '/images/profile-default-female.svg';

  const onFilterClick = () => {
    openModal(<FilterModalContent />, { title: '필터' });
  };
  return (
    <nav
      style={{
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
      }}
    >
      <div style={{ flex: 1, display: 'flex', alignItems: 'center' }}>
        <Logo />
      </div>
      <div style={{ flex: 2, textAlign: 'center', fontWeight: 600, fontSize: '1.1rem', color: '#333' }}>{title}</div>
      <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
        <button onClick={onFilterClick} style={{ background: 'none', border: 'none', padding: 0, marginRight: 8 }}>
          <FilterIcon />
        </button>
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
