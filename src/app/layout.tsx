import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Modal from './components/Modal';
import PWAUpdatePrompt from './components/PWAUpdatePrompt';
import Providers from './providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'MatchMate',
  description: 'Find your perfect match',
  manifest: '/manifest.webmanifest',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'MatchMate',
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: 'website',
    siteName: 'MatchMate',
    title: 'MatchMate - 완벽한 매칭을 찾아보세요',
    description: '당신의 완벽한 매치를 찾아보세요. 매칭, 메시지, 만남까지 한번에!',
  },
  twitter: {
    card: 'summary',
    title: 'MatchMate - 완벽한 매칭을 찾아보세요',
    description: '당신의 완벽한 매치를 찾아보세요. 매칭, 메시지, 만남까지 한번에!',
  },
};

export const viewport: Viewport = {
  themeColor: '#6366f1',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <meta name="application-name" content="MatchMate" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="MatchMate" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-config" content="/icons/browserconfig.xml" />
        <meta name="msapplication-TileColor" content="#6366f1" />
        <meta name="msapplication-tap-highlight" content="no" />

        <link rel="apple-touch-icon" href="/icons/icon-192.png" />
        <link rel="apple-touch-icon" sizes="152x152" href="/icons/icon-152.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/icons/icon-192.png" />
        <link rel="apple-touch-icon" sizes="167x167" href="/icons/icon-192.png" />

        <link rel="icon" type="image/png" sizes="32x32" href="/icons/icon-32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/icons/icon-16.png" />
        <link rel="manifest" href="/manifest.webmanifest" />
        <link rel="shortcut icon" href="/favicon.ico" />

        <meta name="twitter:card" content="summary" />
        <meta name="twitter:url" content="https://matchmate.app" />
        <meta name="twitter:title" content="MatchMate" />
        <meta name="twitter:description" content="당신의 완벽한 매치를 찾아보세요" />
        <meta name="twitter:image" content="/icons/icon-192.png" />
        <meta name="twitter:creator" content="@matchmate" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="MatchMate" />
        <meta property="og:description" content="당신의 완벽한 매치를 찾아보세요" />
        <meta property="og:site_name" content="MatchMate" />
        <meta property="og:url" content="https://matchmate.app" />
        <meta property="og:image" content="/icons/icon-512.png" />

        <link rel="apple-touch-startup-image" href="/icons/apple-splash-2048-2732.png" sizes="2048x2732" />
        <link rel="apple-touch-startup-image" href="/icons/apple-splash-1668-2224.png" sizes="1668x2224" />
        <link rel="apple-touch-startup-image" href="/icons/apple-splash-1536-2048.png" sizes="1536x2048" />
        <link rel="apple-touch-startup-image" href="/icons/apple-splash-1125-2436.png" sizes="1125x2436" />
        <link rel="apple-touch-startup-image" href="/icons/apple-splash-1242-2208.png" sizes="1242x2208" />
        <link rel="apple-touch-startup-image" href="/icons/apple-splash-750-1334.png" sizes="750x1334" />
        <link rel="apple-touch-startup-image" href="/icons/apple-splash-640-1136.png" sizes="640x1136" />
      </head>
      <body className={inter.className} style={{ fontFamily: "'Noto Sans KR', 'Inter', sans-serif" }}>
        <Providers>
          <main className="min-h-screen bg-white">
            {children}
            <Modal />
            <PWAUpdatePrompt />
          </main>
        </Providers>
      </body>
    </html>
  );
}
