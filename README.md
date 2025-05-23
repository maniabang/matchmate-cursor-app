# matchmate-cursor-app

# 💘 matchmate-cursor-app

소개팅 기반 매칭 플랫폼 사이드 프로젝트입니다.  
Next.js 기반의 PWA 앱으로, Supabase를 이용한 인증과 실시간 기능을 포함합니다.

> 이 프로젝트는 실사용 가능한 수준의 구조와 기술 선택을 지향합니다.

## 🎨 디자인
- [Figma 디자인 링크](https://www.figma.com/design/ywHlf170eMP1f15YoIKz5J/%EC%A0%9C%EB%AA%A9-%EC%97%86%EC%9D%8C?node-id=5-38&t=PYjXfcpGzsrKXlBT-1)

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## 기술 스택
- Next.js (SSR)
- Supabase (DB, Auth, Storage, Realtime)
- React Query (서버 상태 관리)
- Vercel (CI/CD, 배포)

## 1. Supabase 연동 준비
1. [Supabase](https://app.supabase.com/)에서 새 프로젝트 생성
2. Project Settings > API에서 아래 정보 복사
   - Project URL
   - anon public key
3. `.env.local` 파일에 아래와 같이 입력
   ```env
   NEXT_PUBLIC_SUPABASE_URL=복사한_프로젝트_URL
   NEXT_PUBLIC_SUPABASE_ANON_KEY=복사한_anon_key
   ```

## 2. 회원가입/로그인 연동 (이메일)
- `src/lib/supabase.ts` : Supabase 클라이언트 생성
- `src/lib/supabaseAuth.ts` : 회원가입/로그인/로그아웃 함수

### 예시 코드
```ts
// src/lib/supabaseAuth.ts
import { supabase } from './supabase';

export async function signUp(email: string, password: string) {
  return await supabase.auth.signUp({ email, password });
}

export async function signIn(email: string, password: string) {
  return await supabase.auth.signInWithPassword({ email, password });
}

export async function signOut() {
  return await supabase.auth.signOut();
}
```

## 3. React Query로 인증 상태 관리
```ts
import { useQuery } from '@tanstack/react-query';
import { supabase } from '../lib/supabase';

export function useUser() {
  return useQuery(['user'], async () => {
    const { data } = await supabase.auth.getUser();
    return data.user;
  });
}
```

## 4. SSR(서버사이드 렌더링)에서 인증 체크 예시
```ts
// app/page.tsx (서버 컴포넌트)
import { cookies } from 'next/headers';
import { createServerClient } from '@supabase/ssr';

export default async function Home() {
  const supabase = createServerClient({ cookies });
  const { data: { user } } = await supabase.auth.getUser();
  // user가 없으면 로그인 페이지로 리다이렉트 등
}
```

## 5. 배포 (Vercel)
- GitHub에 코드 push
- [Vercel](https://vercel.com/)에서 새 프로젝트 Import
- 환경변수(위 .env.local 내용) 등록
- 자동 빌드/배포

## 추가 안내
- Supabase 공식 문서: https://supabase.com/docs
- Next.js + Supabase 예제: https://github.com/supabase/supabase/tree/master/examples/nextjs
- React Query 공식 문서: https://tanstack.com/query/latest

> 궁금한 점이나 추가 구현 요청은 언제든 말씀해 주세요!
