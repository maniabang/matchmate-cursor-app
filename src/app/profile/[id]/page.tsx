import { profiles } from '../../messages/mocks/profiles';
import ProfileView from '../ProfileView';
import NavBar from "../../components/NavBar";

export default function ProfileDetailPage({ params }: { params: { id: string } }) {
  const profile = profiles.find(p => p.id === params.id);
  if (!profile) return <div className="p-8 text-center text-gray-400">프로필 정보를 찾을 수 없습니다.</div>;
  return (
    <>
      <ProfileView profile={profile} />
    </>
  );
} 