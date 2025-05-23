"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/hooks/useUser";

export default function MyProfilePage() {
  const router = useRouter();
  const { data: user, isLoading } = useUser();

  useEffect(() => {
    if (!isLoading && !user) {
      router.replace("/login");
    }
  }, [user, isLoading, router]);

  if (isLoading) return <div>로딩 중...</div>;
  if (!user) return null; // 로그인 안 된 경우

  return (
    <div style={{ padding: 32 }}>
      <h2 style={{ fontSize: '1.3rem', fontWeight: 700, color: '#EBA8A6', marginBottom: 16 }}>내 프로필</h2>
      <div style={{ fontSize: '1.05rem', color: '#333', marginBottom: 8 }}>이메일: {user.email}</div>
      {/* 추가 프로필 정보/수정 UI 등 */}
    </div>
  );
} 