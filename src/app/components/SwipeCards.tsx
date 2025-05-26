"use client";
import React, { useState } from "react";
import { motion, useMotionValue, useTransform, AnimatePresence } from "framer-motion";
import Image from "next/image";
import type { Profile } from "@/api/types";
import Link from "next/link";

interface SwipeCardsProps {
  profiles: Profile[];
}

const SWIPE_THRESHOLD = 120;

const SwipeCards: React.FC<SwipeCardsProps> = ({ profiles }) => {
  const [currentIndex, setCurrentIndex] = useState(profiles.length - 1);

  const handleSwipe = (dir: "left" | "right") => {
    setCurrentIndex((prev) => prev - 1);
  };

  // 현재 보여지는 카드만 드래그 가능하게 렌더링
  const user = profiles[currentIndex];
  const profileSrc = user?.photo_urls?.[0] || "/images/profile-default-female.svg";
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-300, 0, 300], [-18, 0, 18]);
  const likeOpacity = useTransform(x, [40, 120], [0, 1]);
  const nopeOpacity = useTransform(x, [-120, -40], [1, 0]);

  // 카드가 모두 소진된 경우 예외처리
  if (currentIndex < 0) {
    return (
      <div style={{ width: 320, height: 420, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto', fontSize: 20, color: '#aaa', fontWeight: 600, textAlign: 'center' }}>
        더 이상 추천 카드가 없습니다.
      </div>
    );
  }

  return (
    <div style={{ width: 320, margin: "0 auto", height: 520, position: "relative" }}>
      <div style={{ position: "relative", width: 320, height: 420 }}>
        {/* 카드 스택: 이미 넘긴 카드는 static하게, 현재 카드만 motion.div로 드래그 */}
        {profiles.map((p, idx) => {
          if (idx < currentIndex) return null; // 넘긴 카드는 렌더링 X
          if (idx > currentIndex) return null; // 미래 카드는 렌더링 X
          if (idx === currentIndex && user) {
            return (
              <AnimatePresence key={user.id}>
                <motion.div
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
                    zIndex: 2,
                    x,
                    rotate,
                    touchAction: "pan-x"
                  }}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.18}
                  onDragEnd={(_e, info) => {
                    if (info.offset.x > SWIPE_THRESHOLD) {
                      handleSwipe("right");
                    } else if (info.offset.x < -SWIPE_THRESHOLD) {
                      handleSwipe("left");
                    }
                  }}
                  initial={{ scale: 1, opacity: 1 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                >
                  {/* LIKE 오버레이 */}
                  <motion.div
                    style={{
                      position: "absolute",
                      top: 40,
                      left: 30,
                      fontSize: 48,
                      fontWeight: 900,
                      color: "#4ED964",
                      background: "rgba(255,255,255,0.85)",
                      border: "4px solid #4ED964",
                      borderRadius: 16,
                      padding: "8px 32px",
                      boxShadow: "0 4px 24px rgba(0,0,0,0.12)",
                      transform: "rotate(-18deg)",
                      letterSpacing: 2,
                      zIndex: 10,
                      opacity: likeOpacity,
                      pointerEvents: "none"
                    }}
                  >LIKE</motion.div>
                  {/* NOPE 오버레이 */}
                  <motion.div
                    style={{
                      position: "absolute",
                      top: 40,
                      right: 30,
                      fontSize: 48,
                      fontWeight: 900,
                      color: "#FF6B6B",
                      background: "rgba(255,255,255,0.85)",
                      border: "4px solid #FF6B6B",
                      borderRadius: 16,
                      padding: "8px 32px",
                      boxShadow: "0 4px 24px rgba(0,0,0,0.12)",
                      transform: "rotate(18deg)",
                      letterSpacing: 2,
                      zIndex: 10,
                      opacity: nopeOpacity,
                      pointerEvents: "none"
                    }}
                  >NOPE</motion.div>
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
                </motion.div>
              </AnimatePresence>
            );
          }
          return null;
        })}
      </div>
      {/* 버튼 영역: 카드 아래에 고정 */}
      <div style={{ display: "flex", justifyContent: "center", gap: 32, marginTop: 24 }}>
        <button
          onClick={() => handleSwipe("left")}
          disabled={currentIndex < 0}
          style={{ width: 60, height: 60, borderRadius: "50%", background: "#eee", fontSize: 24, border: "none", cursor: "pointer" }}
        >👎</button>
        <button
          onClick={() => handleSwipe("right")}
          disabled={currentIndex < 0}
          style={{ width: 60, height: 60, borderRadius: "50%", background: "#EBA8A6", color: "#fff", fontSize: 24, border: "none", cursor: "pointer" }}
        >👍</button>
      </div>
    </div>
  );
};

export default SwipeCards; 