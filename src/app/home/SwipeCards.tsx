'use client';
import React, { useState, useRef } from 'react';
import { motion, useMotionValue, useTransform, AnimatePresence, animate } from 'framer-motion';
import Image from 'next/image';
import type { Profile } from '@/api/types';
import { useModalStore } from '@/store/modalStore';
import { useRouter } from 'next/navigation';
import { useUserStore } from '@/store/userStore';
import { useSendLike } from '@/api/like';
import {
  cardStyle,
  backCardStyle,
  buttonStyle,
  likeOverlayStyle,
  nopeOverlayStyle,
  infoStyle,
  buttonWrapperStyle,
} from '../components/styles/SwipeCards.styles';

interface SwipeCardsProps {
  profiles: Profile[];
}

const SWIPE_THRESHOLD = 120;

const SwipeCards: React.FC<SwipeCardsProps> = ({ profiles }) => {
  const [currentIndex, setCurrentIndex] = useState(profiles.length - 1);
  const openModal = useModalStore((state) => state.openModal);
  const router = useRouter();
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-300, 0, 300], [-18, 0, 18]);
  const likeOpacity = useTransform(x, [40, 120], [0, 1]);
  const nopeOpacity = useTransform(x, [-120, -40], [1, 0]);
  const animating = useRef(false);
  const [swipeDirection, setSwipeDirection] = useState<'left' | 'right' | null>(null);

  const user = useUserStore((state) => state.user);
  const sendLike = useSendLike();
  const profile = profiles[currentIndex];
  const profileSrc = profile?.photo_urls?.[0] || '/images/profile-default-female.svg';

  const handleSwipe = (dir: 'left' | 'right') => {
    setCurrentIndex((prev) => prev - 1);
    x.set(0);
    animating.current = false;
    setSwipeDirection(null);
  };

  const handleButtonSwipe = (dir: 'left' | 'right') => {
    if (animating.current) return;
    animating.current = true;
    setSwipeDirection(dir);
    const to = dir === 'right' ? 400 : -400;
    x.stop();
    x.set(0);
    if (dir === 'right' && user && user.id && profile) {
      sendLike.mutate({ senderId: user.id, receiverId: profile.id, type: 'like' });
    }
    animate(x, to, {
      type: 'spring',
      stiffness: 300,
      damping: 30,
      onComplete: () => {
        handleSwipe(dir);
      },
    });
  };

  const handleCardClick = (profile: Profile) => {
    openModal(null, {
      title: '프로필 열람',
      description: '프로필을 보려면 코인 1개가 소모됩니다. 계속하시겠습니까?',
      confirmText: '확인',
      cancelText: '취소',
      onConfirm: () => {
        router.push(`/profile/${profile.id}`);
      },
    });
  };

  if (currentIndex < 0) {
    return (
      <div
        style={{
          width: 320,
          height: 420,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto',
          fontSize: 20,
          color: '#aaa',
          fontWeight: 600,
          textAlign: 'center',
        }}
      >
        더 이상 추천 카드가 없습니다.
      </div>
    );
  }

  return (
    <div style={{ width: 320, margin: '0 auto', height: 520, position: 'relative' }}>
      <div style={{ position: 'relative', width: 320, height: 500 }}>
        {profiles[currentIndex - 1] && (
          <motion.div
            style={backCardStyle}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 30 }}
          >
            <Image
              src={profiles[currentIndex - 1].photo_urls?.[0] || '/images/profile-default-female.svg'}
              alt="뒤 카드"
              fill
              style={{
                objectFit: 'cover',
                width: '100%',
                height: '100%',
              }}
              sizes="320px"
              priority
            />
          </motion.div>
        )}

        <AnimatePresence key={profile.id}>
          <motion.div
            style={{ ...cardStyle, x, rotate, touchAction: 'pan-x' }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.18}
            onDrag={(_e, info) => {
              if (info.offset.x > 40) setSwipeDirection('right');
              else if (info.offset.x < -40) setSwipeDirection('left');
              else setSwipeDirection(null);
            }}
            onDragEnd={(_e, info) => {
              setSwipeDirection(null);
              if (info.offset.x > SWIPE_THRESHOLD) {
                handleSwipe('right');
              } else if (info.offset.x < -SWIPE_THRESHOLD) {
                handleSwipe('left');
              }
            }}
            initial={{ scale: 1, opacity: 1 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            onClick={() => handleCardClick(profile)}
          >
            <Image
              src={profileSrc}
              alt="유저 이미지"
              fill
              style={{
                objectFit: 'cover',
                zIndex: 1,
                position: 'absolute',
                left: 0,
                top: 0,
                width: '100%',
                height: '100%',
              }}
              sizes="320px"
              priority
            />
            <motion.div style={{ ...likeOverlayStyle, opacity: likeOpacity }}>LIKE</motion.div>
            <motion.div style={{ ...nopeOverlayStyle, opacity: nopeOpacity }}>NOPE</motion.div>
            <div style={infoStyle}>
              <span style={{ fontSize: '1.2rem', fontWeight: 600, color: '#fff' }}>
                {profile.nickname}, {profile.birth && new Date().getFullYear() - new Date(profile.birth).getFullYear()}
              </span>
              <span style={{ fontSize: '1rem', color: '#EBA8A6' }}>
                {profile.region}, {profile.job}
              </span>
            </div>
            <div style={buttonWrapperStyle}>
              {swipeDirection === 'right' ? (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleButtonSwipe('right');
                  }}
                  style={buttonStyle('#4ED964')}
                >
                  👍
                </button>
              ) : swipeDirection === 'left' ? (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleButtonSwipe('left');
                  }}
                  style={buttonStyle('#FF6B6B')}
                >
                  👎
                </button>
              ) : (
                <>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleButtonSwipe('left');
                    }}
                    style={buttonStyle('#FF6B6B')}
                  >
                    👎
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleButtonSwipe('right');
                    }}
                    style={buttonStyle('#4ED964')}
                  >
                    👍
                  </button>
                </>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default SwipeCards;
