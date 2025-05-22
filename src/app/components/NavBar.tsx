import Link from "next/link";
import LoveAgainLogo from "./LoveAgainLogo";

interface NavBarProps {
  title: string;
}

export default function NavBar({ title }: NavBarProps) {
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
        <LoveAgainLogo />
      </div>
      <div style={{ flex: 2, textAlign: 'center', fontWeight: 600, fontSize: '1.1rem', color: '#333' }}>
        {title}
      </div>
      <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
        <Link href="/profile/my" style={{ display: 'flex', alignItems: 'center' }}>
          <svg width="36" height="36" viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="128" height="128" rx="64" fill="#A6C8EB" />
            <circle cx="64" cy="54" r="26" fill="white" />
            <ellipse cx="64" cy="98" rx="30" ry="18" fill="white" />
          </svg>
        </Link>
      </div>
    </nav>
  );
} 