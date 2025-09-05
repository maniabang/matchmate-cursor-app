import type { NextConfig } from 'next';
import withPWA from 'next-pwa';

const nextConfig: NextConfig = {
  compiler: { styledComponents: true },
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
      // 네비게이션 요청 (페이지 이동)에 대한 캐싱 전략
      urlPattern: /^https?.*\/$/,
      handler: 'NetworkFirst',
      options: {
        cacheName: 'pages-cache',
        expiration: {
          maxEntries: 50,
          maxAgeSeconds: 24 * 60 * 60, // 24시간
        },
      },
    },
    {
      // API 요청에 대한 캐싱 전략
      urlPattern: /^https?.*\/api\/.*/,
      handler: 'NetworkFirst',
      options: {
        cacheName: 'api-cache',
        expiration: {
          maxEntries: 100,
          maxAgeSeconds: 5 * 60, // 5분
        },
      },
    },
    {
      // 정적 리소스 (JS, CSS, 폰트 등)에 대한 캐싱 전략
      urlPattern: /\.(?:js|css|woff|woff2|ttf|eot)$/,
      handler: 'StaleWhileRevalidate',
      options: {
        cacheName: 'static-resources',
        expiration: {
          maxEntries: 100,
          maxAgeSeconds: 30 * 24 * 60 * 60, // 30일
        },
      },
    },
    {
      // 이미지에 대한 캐싱 전략
      urlPattern: /\.(?:png|jpg|jpeg|svg|gif|webp)$/,
      handler: 'CacheFirst',
      options: {
        cacheName: 'images-cache',
        expiration: {
          maxEntries: 200,
          maxAgeSeconds: 30 * 24 * 60 * 60, // 30일
        },
      },
    },
    {
      // 기타 모든 요청에 대한 기본 캐싱 전략
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
