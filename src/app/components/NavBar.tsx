import Link from "next/link";
import Logo from './Logo';
import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { Profile } from "@/api/types";

interface NavBarProps {
  title: string;
}

export default async function NavBar({ title }: NavBarProps) {
  const supabase = createServerComponentClient({ cookies });
  const { data: { user } } = await supabase.auth.getUser();
  let profileImg = "/images/profile-default-female.svg";
  if (user) {
    const { data: profile } = await supabase
      .from("profiles")
      .select("photo_urls")
      .eq("id", user.id)
      .single();
    if (profile?.photo_urls?.[0]) {
      profileImg = profile.photo_urls[0];
    }
  }

  return (
    <nav style={{
      height: 56,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      borderBottom: '1px solid #eee',
      background: '#fff',
      padding: '0 16px',
      position: 'sticky',
      top: 0,
      zIndex: 20,
    }}>
      <div style={{ flex: 1, display: 'flex', alignItems: 'center' }}>
        <Logo />
      </div>
      <div style={{ flex: 2, textAlign: 'center', fontWeight: 600, fontSize: '1.1rem', color: '#333' }}>
        {title}
      </div>
      <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
        <Link href="/profile/my" style={{ display: 'flex', alignItems: 'center' }}>
          <div style={{
            width: 36,
            height: 36,
            borderRadius: '50%',
            overflow: 'hidden',
            border: '1.5px solid #A6C8EB',
            background: '#fff'
          }}>
            <img
              src={profileImg}
              alt="내 프로필"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
        </Link>
      </div>
    </nav>
  );
} 