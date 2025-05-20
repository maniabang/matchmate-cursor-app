# matchmate-cursor-app

# 💘 matchmate-cursor-app

소개팅 기반 매칭 플랫폼 사이드 프로젝트입니다.  
Next.js 기반의 PWA 앱으로, Supabase를 이용한 인증과 실시간 기능을 포함합니다.

> 이 프로젝트는 이직용 포트폴리오로 제작되었으며, 실사용 가능한 수준의 구조와 기술 선택을 지향합니다.

---

## 🧱 기술 스택 개요

### 🖥️ 프론트엔드
| 기술 | 설명 |
|------|------|
| **Next.js (App Router)** | React 기반 풀스택 프레임워크, PWA와 SSR에 최적화 |
| **TypeScript** | 타입 안정성과 개발 생산성을 위한 선택 |
| **Tailwind CSS** | 빠르고 일관된 UI 구현을 위한 유틸리티 퍼스트 CSS 프레임워크 |
| **shadcn/ui** | 아름답고 접근성 높은 컴포넌트 기반 UI 라이브러리 |
| **Framer Motion** | 매끄러운 UI 애니메이션 구현용 |
| **React Query** (또는 TanStack Query) | 서버 상태를 효율적으로 관리하기 위한 데이터 fetching 툴 |
| **PWA (next-pwa)** | 앱처럼 설치 가능한 웹 앱 형태로 제공 (오프라인 지원 포함) |

---

### 🧩 백엔드 / 서비스
| 기술 | 설명 |
|------|------|
| **Supabase** | PostgreSQL 기반 오픈소스 백엔드 플랫폼 - 인증, DB, 스토리지, 실시간 기능 제공 |
| - Auth | 이메일/비밀번호 및 소셜 로그인(OAuth) 지원 |
| - Realtime | 채팅, 매칭 등 실시간 동기화 기능에 활용 |
| - Storage | 유저 프로필 사진 등 파일 저장용 |

---

### 🚀 배포 / 개발환경
| 항목 | 설명 |
|------|------|
| **Vercel** | Next.js에 최적화된 무료 배포 플랫폼 |
| **Cursor IDE** | AI 기반의 생산성 높은 개발 환경 |
| **GitHub** | 버전 관리 및 오픈소스 협업 플랫폼 |

---

## 📂 폴더 구조 (예정)

```bash
matchmate-cursor-app/
├── app/              # Next.js App Router 기반 페이지
├── components/       # UI 컴포넌트
├── lib/              # Supabase, 유틸 등 공통 로직
├── styles/           # 글로벌 스타일 정의
├── public/           # 정적 자산
├── types/            # 타입 정의
├── supabase/         # Supabase 클라이언트 설정
└── ...
