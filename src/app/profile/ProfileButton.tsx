import { useModalStore } from '@/store/modalStore';
import React from 'react';

interface ProfileButtonProps {
  isMyProfile: boolean;
  onEdit?: () => void;
  onLogout?: () => void;
  profileButtonStyle?: React.CSSProperties;
}

const ProfileButton: React.FC<ProfileButtonProps> = ({
  isMyProfile,
  onEdit,
  onLogout,
  profileButtonStyle,
}) => {
  const openModal = useModalStore((state) => state.openModal);

  // 좋아요/메시지 핸들러 예시
  const handleLike = () => {
    alert('좋아요 전송!');
  };
  const handleMessage = () => {
    alert('메시지 보내기!');
  };
  return (
    <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: 12 }}>
      {isMyProfile ? (
        <>
          <button onClick={onEdit} style={profileButtonStyle}>
            프로필 편집
          </button>
          <button onClick={onLogout} style={profileButtonStyle}>
            로그아웃
          </button>
        </>
      ) : (
        <>
          <button
            className="px-4 py-2 rounded-full bg-[#EBA8A6]/10 text-[#EBA8A6] font-semibold hover:bg-[#EBA8A6]/20 transition"
            onClick={e => {
              e.stopPropagation();
              openModal(null, {
                title: '좋아요 보내기',
                description: '좋아요를 보내려면 1코인이 소모됩니다.\n진행하시겠습니까?',
                confirmText: '확인',
                cancelText: '취소',
                onConfirm: handleLike,
              });
            }}
          >
            좋아요
          </button>
          <button
            className="px-4 py-2 rounded-full bg-[#EBA8A6]/10 text-[#EBA8A6] font-semibold hover:bg-[#EBA8A6]/20 transition"
            onClick={e => {
              e.stopPropagation();
              openModal(null, {
                title: '메시지 보내기',
                description: '메시지를 보내려면 2코인이 소모됩니다.\n진행하시겠습니까?',
                confirmText: '확인',
                cancelText: '취소',
                onConfirm: handleMessage,
              });
            }}
          >
            메시지 보내기
          </button>
        </>
      )}
    </div>
  );
};

export default ProfileButton; 