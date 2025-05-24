# matchmate-cursor-app

# 💘 matchmate-cursor-app

소개팅 기반 매칭 플랫폼 사이드 프로젝트입니다.  
Next.js 기반의 PWA 앱으로, Supabase를 이용한 인증과 실시간 기능을 포함합니다.

> 이 프로젝트는 실사용 가능한 수준의 구조와 기술 선택을 지향합니다.

## 🎨 디자인
- [Figma 디자인 링크](https://www.figma.com/design/ywHlf170eMP1f15YoIKz5J/%EC%A0%9C%EB%AA%A9-%EC%97%86%EC%9D%8C?node-id=5-38&t=PYjXfcpGzsrKXlBT-1)

## 🚀 실행 방법
- 의존성 설치 후 `pnpm dev`로 개발 서버 실행
- 브라우저에서 http://localhost:3000 접속
- `.env.local`에 Supabase 프로젝트 정보 필요

## 🛠️ 사용 기술스택
- **Next.js** (React 기반 프레임워크)
- **Supabase** (DB, Auth, Storage)
- **React Query** (서버 상태 관리)
- **TypeScript**
- **Vercel** (배포)
- **Zustand** (전역 상태 관리)
- **PWA** (Progressive Web App)
- 기타: @supabase/supabase-js, @tanstack/react-query, react 등

## ⚡️ SSR(서버사이드 렌더링) 적용 안내

- Next.js 13+ app 디렉토리 구조에서 SSR(Server Side Rendering) 기반으로 동작합니다.

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

> 자세한 구현 내용 및 주요 기능은 추후 업데이트 예정입니다.
