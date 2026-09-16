# agent-lab

사내 직원 전용 **디자인 애셋 라이브러리** 프로토타입입니다. 외부 공개용이 아닌
로그인 기반의 폐쇄형(내부 전용) 사이트로, 이미지 중심 갤러리 형태로 작업물을
탐색·검색·다운로드할 수 있습니다. 모든 사용자/파일 정보는 **샘플 데이터**입니다.

## 주요 기능

- 로그인 게이트: 비로그인 사용자는 내부 화면에 접근할 수 없고 `/login` 으로 이동
- 권한 3단계: 보기 / 다운로드(보기+다운로드) / 관리자(보기+다운로드+편집)
- 이미지 중심 썸네일 갤러리(파일명·확장자·용량·날짜 표시)
- 카테고리 필터: ALL, DFAS, MCQ, GM, Homepage, 인쇄물, 콘텐츠, 기타
- 프로젝트명 / 파일명 검색
- 보기 방식(그리드·리스트) + 정렬(최신·파일명·용량, 오름/내림)
- 카테고리별 갯수 원형(도넛) 그래프 — 그 외 통계 그래프는 없음
- 라이트/다크 모드, 반응형 레이아웃
- 디자인 토큰 기반 스타일(`public/css/tokens.css`)

## 요구 사항

- Node.js 20+ (Cloud Agent 환경은 Node 22)
- npm 10+

## 실행 방법

```bash
npm install      # 의존성 설치
npm run dev      # 개발 서버 실행(자동 재시작), http://localhost:3000
```

`http://localhost:3000` 접속 시 로그인 페이지로 이동합니다.

### 프로토타입 샘플 계정

| 권한 | 아이디 | 비밀번호 | 가능한 동작 |
| --- | --- | --- | --- |
| 보기 | `viewer` | `viewer123` | 보기 |
| 다운로드 | `download` | `download123` | 보기 + 다운로드 |
| 관리자 | `admin` | `admin123` | 보기 + 다운로드 + 편집/삭제 |

> 위 계정은 프로토타입용 가짜 샘플이며 실제 비밀정보가 아닙니다.

## 프로젝트 구조

```
.
├── server.js              # Express: 로그인 게이트 + 애셋 API
├── lib/
│   ├── auth.js            # 샘플 사용자 · 권한 · 세션
│   └── assets.js          # 샘플 애셋 · 카테고리 · 검색/정렬
├── views/
│   ├── login.html         # 로그인 페이지(비보호)
│   └── index.html         # 갤러리(로그인 필요)
├── public/
│   ├── css/tokens.css     # 디자인 토큰(라이트/다크)
│   ├── css/app.css        # 레이아웃 · 컴포넌트
│   └── js/{login,gallery}.js
└── test/                  # auth · assets 유닛 테스트
```

## API

- `POST /api/login` — `{ username, password }`, 세션 쿠키 발급
- `POST /api/logout` — 세션 종료
- `GET /api/me` — 현재 사용자/권한 (로그인 필요)
- `GET /api/categories` — 카테고리 + 갯수 (로그인 필요)
- `GET /api/assets?search=&category=&sort=&order=` — 애셋 목록 (로그인 필요)
- `GET /api/assets/:id/download` — 다운로드 (다운로드/관리자 권한 필요)

## 테스트

```bash
npm test
```

## 디자인 시스템

이 앱의 스타일은 **UROCK Design System v1.4** 를 기준으로 합니다. 원본 번들은
저장소 루트의 `../claude-design-system-md v1.4/_claude-design-upload/` 에 있으며,
우선순위는 `design.md` → `styles/globals.css` → `components/**` → `modules/**` 입니다.

- `public/css/tokens.css` 는 위 `globals.css` 의 토큰 값을 그대로 미러링한 것입니다.
  (색상·그림자·라운드·타이포 토큰 + 앱 시맨틱 브리지)
- 테마 전환은 `<html>` 의 `.dark` 클래스로 처리합니다(디자인 시스템 컨벤션).
- 기본 폰트는 Pretendard이며, 브랜드 로고는 `public/img/UROCK_*.svg` 를 사용합니다.

향후 모든 UI 작업은 이 디자인 시스템과 토큰을 참조하여 제작합니다(자세한 규칙은
`AGENTS.md` 참고).

## Netlify 배포

이 프로토타입은 Netlify에서 실제로 동작하도록 구성되어 있습니다(저장소 루트의 `netlify.toml`).

- 프런트엔드(`public/`)는 정적 파일로 서빙됩니다.
- Express API는 서버리스 함수(`netlify/functions/api.js`, `serverless-http`)로 실행되며, `/api/*` 요청이 이 함수로 라우팅됩니다.
- 인증은 서버리스 환경에서도 동작하도록 **서명된 쿠키(stateless)** 방식을 사용합니다.

### 배포 설정

- Base directory: `asset-library`
- Publish directory: `asset-library/public`
- Functions directory: `asset-library/netlify/functions`
- (선택) 환경변수 `SESSION_SECRET` 를 설정하면 쿠키 서명 키를 교체할 수 있습니다. 미설정 시 프로토타입용 기본값을 사용합니다.

위 값은 `netlify.toml` 에 이미 정의되어 있어, Netlify에서 저장소를 연결하고 배포 브랜치를 지정하면 됩니다.

## Cloud Agent 환경

`.cursor/environment.json` 이 `npm install` 로 의존성을 설치하고, 영구 터미널
`dev-server` 에서 `npm run dev` 를 실행합니다.
