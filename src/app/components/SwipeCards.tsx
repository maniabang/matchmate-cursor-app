"use client";
import React, { useState } from "react";
import TinderCard from "react-tinder-card";
import Image from "next/image";
import type { Profile } from "@/api/types";
import Link from "next/link";

interface SwipeCardsProps {
  profiles: Profile[];
}

const SwipeCards: React.FC<SwipeCardsProps> = ({ profiles }) => {
  const [currentIndex, setCurrentIndex] = useState(profiles.length - 1);
  const [swipeDir, setSwipeDir] = useState<string | null>(null); // 드래그 방향 상태
  const [swipingIdx, setSwipingIdx] = useState<number | null>(null); // 현재 드래그 중인 카드 인덱스

  const swiped = (direction: string, _id: string) => {
    setSwipeDir(null);
    setSwipingIdx(null);
    setCurrentIndex((prev) => prev - 1);
  };

  // 좋아요 버튼 클릭 시
  const handleLike = () => {
    if (currentIndex >= 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  // 싫어요 버튼 클릭 시
  const handleDislike = () => {
    if (currentIndex >= 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  // 드래그 중 방향 감지
  const onCardSwipe = (dir: string, idx: number) => {
    setSwipeDir(dir);
    setSwipingIdx(idx);
  };

  // 드래그 끝나면 초기화
  const onCardSwipeEnd = () => {
    setSwipeDir(null);
    setSwipingIdx(null);
  };

  return (
    <div style={{ width: 320, margin: "0 auto", height: 520, position: "relative" }}>
      {/* 카드 영역 */}
      <div style={{ position: "relative", width: 320, height: 420 }}>
        {profiles.map((user, idx) => {
          const profileSrc = user.photo_urls?.[0] || "/images/profile-default-female.svg";
          const isActive = idx === currentIndex;
          return (
            <TinderCard
              key={user.id}
              onSwipe={(dir) => swiped(dir, user.id)}
              onCardLeftScreen={onCardSwipeEnd}
              onSwipeRequirementFulfilled={(dir) => onCardSwipe(dir, idx)}
              onSwipeRequirementUnfulfilled={onCardSwipeEnd}
              preventSwipe={["up", "down"]}
            >
              <div
                style={{
                  position: "absolute",
                  width: 320,
                  height: 420,
                  background: "#f5f5f5",
                  borderRadius: 24,
                  boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "flex-end",
                  overflow: "hidden",
                  left: 0,
                  top: 0,
                  zIndex: isActive ? 2 : 1,
                }}
              >
                {/* 좋아요/싫어요 오버레이 */}
                {isActive && swipeDir === "right" && swipingIdx === idx && (
                  <div style={{
                    position: "absolute",
                    top: 32,
                    left: 32,
                    background: "rgba(255,255,255,0.8)",
                    borderRadius: 16,
                    padding: "8px 20px",
                    fontSize: 32,
                    fontWeight: 700,
                    color: "#EBA8A6",
                    zIndex: 10,
                  }}>👍</div>
                )}
                {isActive && swipeDir === "left" && swipingIdx === idx && (
                  <div style={{
                    position: "absolute",
                    top: 32,
                    right: 32,
                    background: "rgba(255,255,255,0.8)",
                    borderRadius: 16,
                    padding: "8px 20px",
                    fontSize: 32,
                    fontWeight: 700,
                    color: "#aaa",
                    zIndex: 10,
                  }}>👎</div>
                )}
                <Image src={profileSrc} alt="유저 이미지" width={320} height={294} style={{ width: "100%", height: "70%", objectFit: "cover" }} />
                <Link href={`/profile/${user.id}`} style={{ textDecoration: "none" }}>
                  <div
                    style={{
                      width: "100%",
                      padding: "20px 16px 24px 16px",
                      background: "rgba(255,255,255,0.95)",
                      borderBottomLeftRadius: 24,
                      borderBottomRightRadius: 24,
                      cursor: "pointer"
                    }}
                  >
                    <span style={{ fontSize: "1.2rem", fontWeight: 600, color: "#EBA8A6" }}>{user.nickname}, {user.birth && (new Date().getFullYear() - new Date(user.birth).getFullYear())}</span><br />
                    <span style={{ fontSize: "1rem", color: "#EBA8A6" }}>{user.region}, {user.job}</span>
                  </div>
                </Link>
              </div>
            </TinderCard>
          );
        }).reverse()}
      </div>
      {/* 버튼 영역: 카드 아래에 고정, absolute/zIndex 제거 */}
      <div style={{ display: "flex", justifyContent: "center", gap: 32, marginTop: 24 }}>
        <button
          onClick={handleDislike}
          disabled={currentIndex < 0}
          style={{ width: 60, height: 60, borderRadius: "50%", background: "#eee", fontSize: 24, border: "none", cursor: "pointer" }}
        >👎</button>
        <button
          onClick={handleLike}
          disabled={currentIndex < 0}
          style={{ width: 60, height: 60, borderRadius: "50%", background: "#EBA8A6", color: "#fff", fontSize: 24, border: "none", cursor: "pointer" }}
        >👍</button>
      </div>
    </div>
  );
};

export default SwipeCards; 