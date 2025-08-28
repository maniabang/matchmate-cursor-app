'use client';
import { useEffect, useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { redirect } from 'next/navigation';
import NavBar from '../components/NavBar';
import BottomNav from '../components/BottomNav';
import SwipeCards from './SwipeCards';
import FilterModalContent, { FilterOptions } from './FilterModalContent';
import { useModalStore } from '@/store/modalStore';
import { useFilteredProfiles } from '../hooks/useFilteredProfiles';
import type { Profile } from '@/api/types';
import type { User } from '@supabase/auth-helpers-nextjs';

export default function Home() {
  const [user, setUser] = useState<User | null>(null);
  const [myProfile, setMyProfile] = useState<Profile | null>(null);
  const [initialLoading, setInitialLoading] = useState(true);
  const [filters, setFilters] = useState<FilterOptions>({
    minAge: 20,
    maxAge: 35,
    region: '',
    gender: 'female',
  });

  const supabase = createClientComponentClient();
  const { openModal, closeModal } = useModalStore();

  // 커스텀 훅 사용
  const { profiles, loading, error, loadFilteredProfiles, setError } = useFilteredProfiles();

  useEffect(() => {
    const getUser = async () => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (!user) {
          redirect('/');
          return;
        }

        setUser(user);

        // 내 프로필 조회
        const { data: myProfile } = await supabase.from('profiles').select('*').eq('id', user.id).single();

        setMyProfile(myProfile);

        // 초기 프로필 로드
        await loadFilteredProfiles(user.id, filters);
      } catch (err) {
        console.error('사용자 정보 로드 실패:', err);
        setError('사용자 정보를 불러올 수 없습니다.');
      } finally {
        setInitialLoading(false);
      }
    };

    getUser();
  }, []);

  const handleFilterChange = (newFilters: FilterOptions) => {
    setFilters(newFilters);
  };

  const handleApplyFilter = async (latestFilters: FilterOptions) => {
    if (user) {
      // 모달에서 전달받은 최신 필터 값을state에 설정하고 사용
      setFilters(latestFilters);
      await loadFilteredProfiles(user.id, latestFilters);
    }
    closeModal();
  };

  const openFilterModal = () => {
    openModal(<FilterModalContent initial={filters} onChange={handleFilterChange} onApply={handleApplyFilter} />, {
      title: '필터 설정',
      description: '',
    });
  };

  const handleRetry = () => {
    if (user) {
      loadFilteredProfiles(user.id, filters);
    }
  };

  if (initialLoading) {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          height: '100vh',
          background: '#fff',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            fontSize: '18px',
            color: '#666',
            fontWeight: '500',
          }}
        >
          프로필을 불러오는 중...
        </div>
        <div
          style={{
            marginTop: '16px',
            fontSize: '14px',
            color: '#999',
          }}
        >
          잠시만 기다려주세요
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  if (error && profiles.length === 0) {
    return (
      <div
        style={{ display: 'flex', flexDirection: 'column', height: '100vh', background: '#fff', overflow: 'hidden' }}
      >
        <NavBar title="" user={myProfile} onFilterClick={openFilterModal} />
        <section
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
          }}
        >
          <div
            style={{
              textAlign: 'center',
              color: '#666',
              fontSize: '16px',
              fontWeight: '500',
              marginBottom: '16px',
            }}
          >
            {error}
          </div>
          <button
            onClick={handleRetry}
            disabled={loading}
            style={{
              padding: '12px 24px',
              backgroundColor: loading ? '#ccc' : '#ff69b4',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: '600',
              cursor: loading ? 'not-allowed' : 'pointer',
            }}
          >
            {loading ? '로딩 중...' : '다시 시도'}
          </button>
        </section>
        <BottomNav activeTab="home" user={user} />
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', background: '#fff', overflow: 'hidden' }}>
      <NavBar title="" user={myProfile} onFilterClick={openFilterModal} />
      <section
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
        }}
      >
        <SwipeCards profiles={profiles} />
      </section>
      <BottomNav activeTab="home" user={user} />
    </div>
  );
}
