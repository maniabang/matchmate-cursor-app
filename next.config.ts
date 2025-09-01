import type { NextConfig } from 'next';
import withPWA from 'next-pwa';

const nextConfig: NextConfig = {
  typescript: {
    // 빌드 시 타입 에러 무시 (PWA 테스트용)
    ignoreBuildErrors: true,
  },
  eslint: {
    // 빌드 시 ESLint 에러 무시 (PWA 테스트용)
    ignoreDuringBuilds: true,
  },
  images: {
    domains: [
      'soslqrbwlhlngkncyozl.supabase.co',
      // 필요하다면 다른 도메인도 추가
    ],
  },
  /* config options here */
};

export default withPWA({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: false,
  runtimeCaching: [
    {
      urlPattern: /^https?.*/,
      handler: 'NetworkFirst',
      options: {
        cacheName: 'offlineCache',
        expiration: {
          maxEntries: 200,
        },
      },
    },
  ],
})(nextConfig);
