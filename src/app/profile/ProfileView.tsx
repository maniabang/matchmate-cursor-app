"use client";
import { useRouter } from "next/navigation";

export default function ProfileView({ profile, isMyProfile }: { profile: any, isMyProfile: boolean }) {
  const router = useRouter();
  if (!profile) return <div>프로필 정보가 없습니다.</div>;

  const profileImg = profile.photo_urls?.[0] || "/images/profile-default-female.svg";

  // 로그아웃 핸들러 (임시)
  const handleLogout = () => {
    // 실제로는 supabase.auth.signOut() 등 호출 필요
    alert("로그아웃 기능은 추후 구현 예정입니다.");
    router.replace("/login");
  };

  // 프로필 편집 핸들러 (임시)
  const handleEdit = () => {
    router.push(`/profile/${profile.id}/edit`);
  };

  return (
    <div style={{ padding: 32, maxWidth: 400, margin: "0 auto", position: "relative", minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <button
        onClick={() => router.back()}
        style={{
          position: 'absolute',
          top: 8,
          left: 8,
          background: 'none',
          border: 'none',
          fontSize: '1.5rem',
          color: '#EBA8A6',
          cursor: 'pointer',
          zIndex: 10,
          padding: 0,
        }}
        aria-label="뒤로가기"
      >
        ←
      </button>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: 24 }}>
        <div style={{
          width: 112, height: 112, borderRadius: "50%", overflow: "hidden",
          border: "2px solid #A6C8EB", marginBottom: 12
        }}>
          <img src={profileImg} alt="프로필" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        </div>
        <div style={{ fontSize: "1.3rem", fontWeight: 700, color: "#EBA8A6", marginBottom: 4 }}>
          {profile.nickname || profile.name}, {profile.age}
        </div>
        <div style={{ color: "#A6C8EB", fontWeight: 500, marginBottom: 8 }}>
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
                  background: "#A6C8EB", color: "#fff", borderRadius: 12, padding: "4px 12px", fontSize: 13
                }}>#{v}</span>
              ))
              : <span style={{ color: "#aaa" }}>이상형 정보가 없습니다.</span>
            }
          </div>
        </div>
      )}
      {/* 하단 버튼: 내 프로필일 때만 노출 */}
      {isMyProfile && (
        <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: 12 }}>
          <button
            onClick={handleEdit}
            style={{
              width: '100%',
              padding: '12px 0',
              background: '#A6C8EB',
              color: '#fff',
              border: 'none',
              borderRadius: 8,
              fontWeight: 600,
              fontSize: 16,
              marginBottom: 8,
              cursor: 'pointer',
            }}
          >
            프로필 편집
          </button>
          <button
            onClick={handleLogout}
            style={{
              width: '100%',
              padding: '12px 0',
              background: '#EBA8A6',
              color: '#fff',
              border: 'none',
              borderRadius: 8,
              fontWeight: 600,
              fontSize: 16,
              cursor: 'pointer',
            }}
          >
            로그아웃
          </button>
        </div>
      )}
    </div>
  );
} 