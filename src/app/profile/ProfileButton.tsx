import { useSendLike, LikeRequest } from '@/api/like';
import { useForceMatchAndSendMessage, MessageRequest } from '@/api/message';
import { useModalStore } from '@/store/modalStore';
import { useUserStore } from '@/store/userStore';
import React, { useState } from 'react';

interface ProfileButtonProps {
  isMyProfile: boolean;
  onEdit?: () => void;
  onLogout?: () => void;
  profileButtonStyle?: React.CSSProperties;
  targetId: string;
}

const ProfileButton: React.FC<ProfileButtonProps> = ({
  isMyProfile,
  onEdit,
  onLogout,
  profileButtonStyle,
  targetId
}) => {

  const openModal = useModalStore((state) => state.openModal);
  const [resultMsg, setResultMsg] = useState('');
  const user = useUserStore((state) => state.user);
  const myId = user?.id;
  const sendLike = useSendLike<any, Error, LikeRequest>({
    onSuccess: (data: any) => {
      setResultMsg(data.matched ? '매칭이 성사되었습니다! 이제 메시지를 보낼 수 있어요.' : '좋아요를 보냈습니다!');
    },
    onError: (err: Error) => {
      setResultMsg(err.message || '좋아요 전송 중 오류가 발생했습니다.');
    }
  });
  const forceMatchAndSendMessage = useForceMatchAndSendMessage<any, Error, MessageRequest>({
    onSuccess: () => {
      setResultMsg('메시지 전송 및 매칭 완료!');
    },
    onError: (err: Error) => {
      setResultMsg(err.message || '메시지 전송 중 오류가 발생했습니다.');
    }
  });

  const handleLike = () => {
    sendLike.mutate({ senderId: myId, receiverId: targetId });
  };

  // 메시지 입력 모달 오픈 함수
  const openMessageInputModal = () => {
    let messageContent = '';
    openModal((
      <textarea
        autoFocus
        rows={4}
        style={{ width: '100%' }}
        placeholder="메시지를 입력하세요"
        onChange={e => { messageContent = e.target.value; }}
      />
    ), {
      title: '메시지 입력',
      confirmText: '전송',
      onConfirm: () => {
        forceMatchAndSendMessage.mutate({
          senderId: myId,
          receiverId: targetId,
          content: messageContent,
        } as MessageRequest);
      },
    });
  };

  // 메시지 보내기 버튼 클릭 시
  const handleMessage = () => {
    openModal(null, {
      title: '메시지 보내기',
      description: '메시지를 보내려면 2코인이 소모됩니다.\n진행하시겠습니까?',
      confirmText: '확인',
      cancelText: '취소',
      onConfirm: () => {
        setTimeout(openMessageInputModal, 0); // 입력 모달 바로 오픈
      },
    });
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
            onClick={handleMessage}
          >
            메시지 보내기
          </button>
          {resultMsg && <div style={{ color: '#EBA8A6', marginTop: 8 }}>{resultMsg}</div>}
        </>
      )}
    </div>
  );
};

export default ProfileButton; 