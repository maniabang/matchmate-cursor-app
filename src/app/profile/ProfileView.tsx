"use client";
import { useRouter } from "next/navigation";
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { profileBackButtonStyle } from '../components/styles/ProfileButton.styles';
import { useHydratedUserStore, useHydratedMyProfileStore } from '@/store/useHydratedUserStore';
import ProfileButton from './ProfileButton';

export default function ProfileView({ profile, isMyProfile }: { profile: any, isMyProfile: boolean }) {
  const router = useRouter();
  const supabase = createClientComponentClient();
  const { clearUser } = useHydratedUserStore();
  const { clearMyProfile } = useHydratedMyProfileStore();

  if (!profile) return <div>프로필 정보가 없습니다.</div>;

  const profileImg = profile.photo_urls?.[0] || "/images/profile-default-female.svg";

  // 로그아웃 핸들러
  const handleLogout = async () => {
    // supabase 로그아웃
    await supabase.auth.signOut();
    // zustand user 초기화
    clearUser();
    clearMyProfile();
    // 세션스토리지/로컬스토리지 모두 초기화
    if (typeof window !== 'undefined') {
      sessionStorage.clear();
      localStorage.clear();
      // 쿠키도 삭제 (document.cookie는 직접 삭제 필요)
      document.cookie.split(';').forEach(function (c) {
        document.cookie = c.replace(/^ +/, '').replace(/=.*/, '=;expires=' + new Date(0).toUTCString() + ';path=/');
      });
    }
    router.replace("/login");
  };

  // 프로필 편집 핸들러 (임시)
  const handleEdit = () => {
    router.push(`/profile/edit`);
  };

  const profileButtonStyle = {
    background: "#EBA8A6",
    color: "#fff",
    border: "none",
    padding: "12px 24px",
    borderRadius: 12,
    fontSize: "1rem",
    fontWeight: 600,
    cursor: "pointer",
    marginBottom: 12
  };

  return (
    <div style={{ padding: 32, maxWidth: 400, margin: "0 auto", position: "relative", minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <button
        onClick={() => router.back()}
        style={profileBackButtonStyle}
        aria-label="뒤로가기"
      >
        ←
      </button>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: 24 }}>
        <div style={{
          width: 112, height: 112, borderRadius: "50%", overflow: "hidden",
          border: "2px solid #FFF6F5", marginBottom: 12
        }}>
          <img src={profileImg} alt="프로필" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        </div>
        <div style={{ fontSize: "1.3rem", fontWeight: 700, color: "#EBA8A6", marginBottom: 4 }}>
          {profile.nickname || profile.name}, {profile.age}
        </div>
        <div style={{ color: "#EBA8A6", fontWeight: 500, marginBottom: 8 }}>
          {profile.region} · {profile.job} · {profile.mbti}
        </div>
      </div>
      <div style={{
        background: "#F8F8F8", borderRadius: 16, padding: 20, marginBottom: 16, color: "#333", textAlign: "center"
      }}>
        {profile.intro}
      </div>
      <div style={{ marginBottom: 12 }}>
        <div style={{ fontWeight: 600, color: "#EBA8A6", marginBottom: 6 }}>관심사</div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {profile.interests && profile.interests.length > 0
            ? profile.interests.map((v: string, i: number) => (
              <span key={i} style={{
                background: "#EBA8A6", color: "#fff", borderRadius: 12, padding: "4px 12px", fontSize: 13
              }}>#{v}</span>
            ))
            : <span style={{ color: "#aaa" }}>관심사가 없습니다.</span>
          }
        </div>
      </div>
      {/* 이상형 등 추가 정보도 비슷하게 렌더링 */}
      {profile.ideals && (
        <div style={{ marginBottom: 12 }}>
          <div style={{ fontWeight: 600, color: "#EBA8A6", marginBottom: 6 }}>이상형</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {profile.ideals.length > 0
              ? profile.ideals.map((v: string, i: number) => (
                <span key={i} style={{
                  background: "#EBA8A6", color: "#fff", borderRadius: 12, padding: "4px 12px", fontSize: 13
                }}>#{v}</span>
              ))
              : <span style={{ color: "#aaa" }}>이상형 정보가 없습니다.</span>
            }
          </div>
        </div>
      )}
      <ProfileButton
        isMyProfile={isMyProfile}
        onEdit={handleEdit}
        onLogout={handleLogout}
        profileButtonStyle={profileButtonStyle}
      />
    </div>
  );
} 