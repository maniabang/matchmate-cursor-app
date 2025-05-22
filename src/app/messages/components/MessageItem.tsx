type MessageItemProps = {
  profile: string;
  name: string;
  preview: string;
  time: string;
  unread: number;
  id: string;
};

export default function MessageItem({ profile, name, preview, time, unread, id }: MessageItemProps) {
  const defaultProfile = '/images/profile-default-female.svg';
  const profileSrc = profile && profile.trim() !== '' ? profile : defaultProfile;
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
        <div className="text-sm text-gray-500 truncate">{preview}</div>
      </div>
      {unread > 0 && (
      <div className="ml-3 flex-shrink-0">
          <span className="inline-block min-w-[24px] px-2 py-0.5 text-xs text-white bg-[#EBA8A6] rounded-full text-center shadow">
          {unread}
        </span>
      </div>
      )}
    </div>
  );
} 