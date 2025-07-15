import type { Profile } from '@/api/types';
import { formatTime } from '@/utils/formatTime';

// 메시지 객체 타입 정의 (필요시 확장)
type MessageItemProps = {
  profile?: Profile;
  content: string;
  created_at: string;
  unread?: number;
  id: string;
};

export default function MessageItem({ profile, content, created_at, unread }: MessageItemProps) {
  const defaultProfile = '/images/profile-default-female.svg';
  const profileSrc = profile?.photo_urls?.[0] || defaultProfile;
  const name = profile?.nickname || '알 수 없음';
  const time = formatTime(created_at);

  return (
    <div className="flex items-center gap-3 px-4 py-3 bg-[#F8F8F8] hover:bg-[#F2EAEA] transition-colors">
      {/* 프로필 이미지 */}
      <div className="w-12 h-12 rounded-full overflow-hidden border border-gray-200 flex-shrink-0">
        <img src={profileSrc} alt="프로필" className="w-full h-full object-cover" />
      </div>

      {/* 메인 콘텐츠 영역 */}
      <div className="flex-1 min-w-0">
        {/* 상단: 이름 + 시간 */}
        <div className="flex justify-between items-center mb-1">
          <span className="font-semibold text-gray-900 truncate">{name}</span>
          <span className="text-xs text-gray-400 ml-2 whitespace-nowrap flex-shrink-0">{time}</span>
        </div>

        {/* 하단: 메시지 내용 + unread 뱃지 */}
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-500 truncate flex-1">{content}</span>
          {unread !== undefined && unread > 0 && (
            <div className="ml-2 flex-shrink-0">
              <span className="inline-block min-w-[20px] px-1.5 py-0.5 text-xs text-white bg-[#EBA8A6] rounded-full text-center">
                {unread}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}