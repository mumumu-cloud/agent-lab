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

## 디자인 토큰 안내

`public/css/tokens.css` 는 색상·타이포·간격·라운드·그림자 등을 CSS 변수로 정의한
완성형 기본 토큰 세트입니다. 별도로 전달 주시는 **실제 토큰 파일**이 있으면 이
파일의 값만 교체하여 그대로 반영할 수 있도록 구성했습니다.

## Cloud Agent 환경

`.cursor/environment.json` 이 `npm install` 로 의존성을 설치하고, 영구 터미널
`dev-server` 에서 `npm run dev` 를 실행합니다.
