import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { Profile } from "@/api/types";

export default async function MyProfilePage() {
  const supabase = createServerComponentClient({ cookies });
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    // 로그인 안 된 경우 리다이렉트 등 처리
    return <div>로그인이 필요합니다.</div>;
  }
  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  if (!profile) return <div>프로필 정보가 없습니다.</div>;

  const profileImg = profile.photo_urls?.[0] || "/images/profile-default-female.svg";

  return (
    <div style={{ padding: 32, maxWidth: 400, margin: "0 auto" }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: 24 }}>
        <div style={{
          width: 112, height: 112, borderRadius: "50%", overflow: "hidden",
          border: "2px solid #A6C8EB", marginBottom: 12
        }}>
          <img src={profileImg} alt="내 프로필" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
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
    </div>
  );
} 