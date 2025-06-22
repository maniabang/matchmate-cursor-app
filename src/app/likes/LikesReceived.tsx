"use client";
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const likesReceived = [
  { id: '1', name: '이수진', age: 28, region: '서울', job: '디자이너', profile: '' },
  { id: '2', name: '김지민', age: 27, region: '부산', job: '마케터', profile: '' },
  { id: '5', name: '박하영', age: 25, region: '대구', job: '프론트엔드', profile: '' },
  { id: '6', name: '서예은', age: 30, region: '대전', job: '간호사', profile: '' },
  { id: '7', name: '장미리', age: 24, region: '광주', job: '학생', profile: '' },
  { id: '8', name: '윤채원', age: 29, region: '울산', job: '사업가', profile: '' },
  { id: '9', name: '오서현', age: 27, region: '수원', job: '엔지니어', profile: '' },
  { id: '10', name: '정은수', age: 28, region: '천안', job: '모델', profile: '' },
  { id: '11', name: '한지아', age: 26, region: '청주', job: '작가', profile: '' },
  { id: '12', name: '강혜원', age: 31, region: '전주', job: '변호사', profile: '' },
  { id: '13', name: '신아윤', age: 25, region: '춘천', job: '웹툰작가', profile: '' },
  { id: '14', name: '임나영', age: 27, region: '강릉', job: '요리사', profile: '' },
  { id: '15', name: '조유진', age: 28, region: '제주', job: '사진작가', profile: '' },
]; // 테스트를 위해 데이터를 추가했습니다.
const likesSent = [
  { id: '3', name: '박소연', age: 26, region: '대구', job: '개발자', profile: '' },
  { id: '4', name: '최유리', age: 29, region: '인천', job: '교사', profile: '' },
];

export default function LikesPage({ params }: { params: { type: string } }) {
  const router = useRouter();
  const type = params?.type || 'received';
  const isReceived = type === 'received';
  const list = isReceived ? likesReceived : likesSent;

  return (
    <div className="bg-[#F8F8F8] min-h-screen flex flex-col">
      {/* 상단 탭 */}
      <header className="flex items-center justify-center px-4 py-4 bg-white border-b border-gray-100">
        <div className="flex gap-2 bg-[#F2EAEA] rounded-full p-1 shadow-sm">
          <button
            className={`px-6 py-2 rounded-full text-base font-semibold transition-colors ${isReceived ? 'bg-white text-[#EBA8A6] shadow' : 'text-gray-400'}`}
            onClick={() => router.push('/likes/received')}
          >
            받은 좋아요
          </button>
          <button
            className={`px-6 py-2 rounded-full text-base font-semibold transition-colors ${!isReceived ? 'bg-white text-[#EBA8A6] shadow' : 'text-gray-400'}`}
            onClick={() => router.push('/likes/sent')}
          >
            보낸 좋아요
          </button>
        </div>
      </header>
      <div className="flex-1 flex flex-col gap-5 px-4 py-6">
        {list.map(user => (
          <div
            key={user.id}
            className="relative flex items-center bg-white rounded-2xl shadow-md px-5 py-4 hover:shadow-lg transition"
          >
            <div
              className="absolute right-5 top-1/2 -translate-y-1/2 flex gap-2"
              style={{ zIndex: 2 }}
            >
              {isReceived && (
                <>
                  <button className="w-10 h-10 flex items-center justify-center rounded-full bg-[#EBA8A6]/10 text-[#EBA8A6] text-xl hover:bg-[#EBA8A6]/20 transition">❤️</button>
                  <button className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 text-gray-400 text-xl hover:bg-gray-200 transition">✖️</button>
                </>
              )}
            </div>
            <div
              className="flex items-center gap-4 cursor-pointer"
              onClick={() => router.push(`/profile/${user.id}`)}
            >
              <div className="w-16 h-16 rounded-full overflow-hidden border border-gray-200 flex-shrink-0">
                <Image src={user.profile && user.profile.trim() !== '' ? user.profile : '/images/profile-default-female.svg'} alt="프로필" width={64} height={64} className="w-full h-full object-cover" />
              </div>
              <div className="flex flex-col min-w-0">
                <div className="font-semibold text-gray-900 text-lg truncate">{user.name}, {user.age}</div>
                <div className="text-sm text-[#EBA8A6] truncate">{user.region}, {user.job}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 