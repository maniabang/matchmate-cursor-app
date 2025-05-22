import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Modal from "./components/Modal";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MatchMate",
  description: "Find your perfect match",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={inter.className} style={{ fontFamily: "'Noto Sans KR', 'Inter', sans-serif" }}>
        <main className="min-h-screen bg-white">
          {children}
          <Modal />
        </main>
      </body>
    </html>
  );
}
