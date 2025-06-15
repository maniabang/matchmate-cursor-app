import type { Profile } from '@/api/types';

// 메시지 객체 타입 정의 (필요시 확장)
type MessageItemProps = {
  profile?: Profile;
  content: string;
  created_at: string;
  unread?: number;
  id: string;
};

function formatTime(isoString?: string) {
  if (!isoString) return '';
  const date = new Date(isoString);
  // 예시: '오후 2:30' 또는 '2024-06-13'
  const now = new Date();
  if (
    date.getFullYear() === now.getFullYear() &&
    date.getMonth() === now.getMonth() &&
    date.getDate() === now.getDate()
  ) {
    // 오늘이면 시:분만
    return date.toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' });
  }
  // 오늘이 아니면 날짜
  return date.toLocaleDateString('ko-KR');
}

export default function MessageItem({ profile, content, created_at, unread }: MessageItemProps) {
  const defaultProfile = '/images/profile-default-female.svg';
  const profileSrc = profile?.photo_urls?.[0] || defaultProfile;
  const name = profile?.nickname || '알 수 없음';
  const time = formatTime(created_at);

  console.log(unread);
  return (
    <div className="flex items-center gap-3 px-4 py-3 bg-[#F8F8F8] hover:bg-[#F2EAEA] transition-colors">
      <div className="w-12 h-12 rounded-full overflow-hidden border border-gray-200 flex-shrink-0">
        <img src={profileSrc} alt="프로필" className="w-full h-full object-cover" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-center mb-1">
          <span className="font-semibold text-gray-900 truncate">{name}</span>
          <span className="text-xs text-gray-400 ml-2 whitespace-nowrap">{time}</span>
        </div>
        <div className="text-sm text-gray-500 truncate">{content}</div>
      </div>

      {unread !== undefined && unread > 0 && (
        <div className="ml-3 flex-shrink-0">
          <span className="inline-block min-w-[24px] px-2 py-0.5 text-xs text-white bg-[#EBA8A6] rounded-full text-center shadow">
            {unread}
          </span>
        </div>
      )}

    </div>
  );
} 