# StockMentor Frontend

> AI 기반 주식 투자 가이드 서비스 — 프론트엔드
> 주식 입문자를 위한 LLM 기반 종목 분석 및 투자 전략 안내 플랫폼

[![React](https://img.shields.io/badge/React-18-61DAFB?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6-646CFF?logo=vite)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-4-06B6D4?logo=tailwindcss)](https://tailwindcss.com/)

## 관련 레포지토리
- 백엔드: [stock-mentor](https://github.com/sksqlrlek/stock-mentor)

---

## 📖 프로젝트 소개

MZ세대의 주식 투자 관심 증가에도 불구하고, 기존 증권사 앱은 전문 투자자 중심으로 설계되어 입문자가 활용하기 어렵습니다.

StockMentor는 Claude AI를 활용해 복잡한 주식 데이터를 쉬운 언어로 설명하고, 사용자의 투자 성향에 맞는 맞춤 분석을 제공합니다.

> ⚠️ 이 서비스는 투자 정보 제공을 목적으로 하며, 실제 투자 결정은 본인의 판단과 책임 하에 이루어져야 합니다.

---

## ✨ 주요 기능

- **종목 검색** — 종목명 또는 코드로 실시간 검색, 자동완성 드롭다운
- **종목 상세** — 현재가, 캔들스틱 차트, 기술적 지표(MA, RSI, MACD, 볼린저 밴드)
- **AI 분석** — Claude AI 기반 기업 요약, 매매 전략, 리스크 관리 가이드
- **뉴스 감성 분석** — 관련 뉴스 긍정/중립/부정 분류
- **관심 종목** — 종목 저장 및 실시간 등락률 확인
- **회원 시스템** — JWT 인증, 카카오/네이버/구글 소셜 로그인
- **투자 성향 설정** — 공격형/중립형/안정형에 따른 맞춤 분석

---

## 🛠 기술 스택

| 구분 | 기술 | 선택 이유 |
|------|------|----------|
| Framework | React 18 | 컴포넌트 기반 SPA, 국내 채용 수요 높음 |
| Language | TypeScript 5 | 타입 안정성, 실무 표준 |
| Build Tool | Vite 6 | 빠른 개발 서버, CRA 대체 |
| Styling | Tailwind CSS v4 | 유틸리티 클래스 기반, 빠른 UI 개발 |
| Routing | React Router DOM v6 | SPA 페이지 전환 |
| HTTP | Axios | 인터셉터 기반 JWT 자동 주입 |
| Chart | Recharts | 반응형 주가 차트 및 지표 시각화 |
| Icon | Material Symbols | Google 아이콘 폰트 |

---

## 🏗 디자인 패턴

### 싱글톤 패턴 — `src/api/axiosInstance.ts`
Axios 인스턴스를 하나만 생성해 앱 전체에서 공유합니다. JWT 토큰 자동 주입, 401 에러 자동 처리 등 공통 로직을 한 곳에서 관리합니다.

```typescript
const axiosInstance = axios.create({ baseURL: 'http://localhost:8080' })
// 요청마다 JWT 자동 주입
axiosInstance.interceptors.request.use(config => {
  const token = localStorage.getItem('accessToken')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})
```

### 팩토리 메서드 패턴 — `src/api/`
도메인별 API 파일이 각각 요청 함수를 생성하는 팩토리 역할을 합니다. 백엔드의 Service 레이어 분리와 같은 개념입니다.

### 브리지 패턴 — `components/` + `hooks/`
API 호출 로직(`hooks/`)과 UI(`components/`)를 완전히 분리합니다. API 구조가 바뀌어도 컴포넌트 수정이 불필요하고, UI가 바뀌어도 훅을 건드리지 않아도 됩니다.

### 템플릿 메서드 패턴 — `src/components/layout/Layout.tsx`
Header/main/Footer 골격을 고정하고 각 페이지는 main 영역만 채우는 구조입니다.

```tsx
function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />                    {/* 고정 */}
      <main>{children}</main>       {/* 페이지마다 다름 */}
      <Footer />                    {/* 고정 */}
    </div>
  )
}
```

---

## 📁 프로젝트 구조

```
src/
├── api/
│   └── axiosInstance.ts       # Axios 싱글톤 인스턴스
├── components/
│   ├── auth/                  # 로그인, 회원가입 관련 컴포넌트
│   │   ├── LoginForm.tsx
│   │   ├── SignupForm.tsx
│   │   └── SocialLoginButtons.tsx
│   ├── common/                # 공통 재사용 컴포넌트
│   │   ├── RiskTypeSelector.tsx
│   │   └── RiskTypeModal.tsx
│   ├── layout/                # 레이아웃 컴포넌트
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   └── Layout.tsx
│   ├── mypage/                # 마이페이지 전용 컴포넌트
│   │   ├── ProfileCard.tsx
│   │   └── ProfileEditForm.tsx
│   ├── stock/                 # 종목 관련 컴포넌트
│   │   ├── SearchBar.tsx
│   │   ├── StockCard.tsx
│   │   ├── StockHeader.tsx
│   │   ├── StockInfoGrid.tsx
│   │   ├── StockChart.tsx
│   │   ├── IndicatorChart.tsx
│   │   ├── CompanySummaryCard.tsx
│   │   ├── AiAnalysisCard.tsx
│   │   └── NewsCard.tsx
│   └── watchlist/             # 관심종목 전용 컴포넌트
│       └── WatchlistItem.tsx
├── constants/
│   └── routes.ts              # 라우트 경로 상수
├── context/
│   └── AuthContext.tsx        # 전역 로그인 상태 관리
└── pages/                     # 라우트별 페이지 컴포넌트
    ├── HomePage.tsx
    ├── LoginPage.tsx
    ├── SignupPage.tsx
    ├── StockDetailPage.tsx
    ├── WatchlistPage.tsx
    └── MyPage.tsx
```

---

## 🚀 시작하기

### 요구 사항

- Node.js 18 이상
- npm 9 이상
- 백엔드 서버 실행 필요 ([stock-mentor](https://github.com/sksqlrlek/stock-mentor))

### 설치 및 실행

```bash
# 레포지토리 클론
git clone https://github.com/sksqlrlek/stock-mentor-front.git
cd stock-mentor-front

# 패키지 설치
npm install

# 개발 서버 실행
npm run dev
```

브라우저에서 `http://localhost:5173` 접속

### 환경 변수

프로젝트 루트에 `.env` 파일을 생성하세요.

```env
VITE_API_BASE_URL=http://localhost:8080
```

---

## 📱 페이지 구성

| 페이지 | 경로 | 로그인 필요 | 설명 |
|--------|------|------------|------|
| 홈 | `/` | ❌ | 종목 검색, 인기 종목 카드 |
| 종목 상세 | `/stock/:stockCode` | ❌ | 차트, 지표, AI 분석, 뉴스 |
| 관심 종목 | `/watchlist` | ✅ | 관심 종목 목록 관리 |
| 마이페이지 | `/mypage` | ✅ | 프로필, 투자 성향 설정 |
| 로그인 | `/login` | ❌ | 이메일, 소셜 로그인 |
| 회원가입 | `/signup` | ❌ | 이메일, 소셜 회원가입 |

---

## 🔐 인증 흐름

```
일반 로그인/회원가입   →  JWT 토큰 발급  →  localStorage 저장
소셜 로그인           →  OAuth2 처리   →  JWT 토큰 발급
투자 성향 미설정 유저  →  자동으로 투자 성향 설정 모달 표시
로그인 필요 페이지     →  미로그인 시 로그인 페이지로 자동 이동
401 에러 발생        →  토큰 삭제 후 로그인 페이지로 자동 이동
```

---

## 📊 브랜치 전략

```
main            ← 최종 배포 브랜치
└── develop     ← 개발 통합 브랜치
    ├── feature/init-setup          # 프로젝트 초기 세팅
    ├── feature/ts-migration        # TypeScript 전환
    ├── feature/ui-setup            # 디자인 시스템, Layout
    ├── feature/auth-pages          # 로그인, 회원가입
    ├── feature/stock-pages         # 홈, 검색
    ├── feature/stock-detail        # 종목 상세
    ├── feature/mypage-watchlist    # 마이페이지, 관심종목
    └── feature/header-improvement  # 헤더 개선
```

---

## 🖥 화면 구성

### 홈 페이지
- 히어로 검색창으로 종목 실시간 검색
- 인기 종목 카드 그리드

### 종목 상세 페이지
- 2컬럼 레이아웃 (차트 영역 + 정보 사이드바)
- 캔들스틱 차트 (1개월/3개월/6개월/1년/3년)
- 기술적 지표 탭 (이동평균선/RSI/MACD/볼린저 밴드)
- Claude AI 기업 요약, 매매 전략, 리스크 관리
- 뉴스 감성 분석 (긍정/중립/부정)

### 관심 종목 페이지
- 저장된 종목 목록 (현재가, 등락률)
- 종목 클릭 시 상세 페이지 이동
- 관심 종목 삭제

### 마이페이지
- 프로필 카드 (닉네임, 이메일, 투자 성향)
- 닉네임, 관심 섹터, 투자 성향 수정