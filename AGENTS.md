# AGENTS.md

이 저장소에서 작업하는 에이전트가 따라야 할 운영 지침입니다.

## 비밀정보(Secrets) 취급 원칙 (필수)

- API 키, 토큰, 비밀번호, 인증서 등 **비밀정보를 임의로 수집·요청하지 않는다.**
- 작업상 부득이하게 반드시 필요한 경우에만, **먼저 이유를 설명하고 사용자의 확인·승인을 받은 뒤** 진행한다.
- 승인된 경우에도 비밀값을 소스 코드, 로그, 커밋, 채팅에 직접 남기지 않는다.
  Cloud Agent의 Secrets(환경 변수) 메커니즘으로만 다룬다.
- `.env`, `.env.*` 파일은 커밋하지 않는다(`.gitignore`로 이미 제외됨).

## 프로젝트 개요

`agent-lab`은 사내 전용 디자인 애셋 라이브러리 프로토타입이다.
Node.js + Express 백엔드와 HTML/CSS/JS 프런트엔드로 구성되며, 외부 API 키 없이 동작한다.

## 디자인 시스템 (필수 · 항상 참조)

이 저장소의 모든 UI 제작·수정은 **UROCK Design System v1.4** 를 기준으로 한다.
번들 위치: `claude-design-system-md v1.4/_claude-design-upload/`

- **Source of Truth 우선순위** (충돌 시 위가 우선):
  1. `_claude-design-upload/design.md`
  2. `_claude-design-upload/styles/globals.css` (토큰 원본 값)
  3. `_claude-design-upload/components/**`
  4. `_claude-design-upload/modules/**`
  - `design.md`에 없으면 `NOT FOUND`, 검증 안 됨이면 `NOT VERIFIED`로 취급하고 임의로 지어내지 않는다.
- **토큰 참조**: 앱의 `public/css/tokens.css` 는 위 `globals.css` 의 토큰 값을 그대로 미러링한 것이다.
  색상·그림자·라운드·타이포는 반드시 이 토큰(`--color-*`, `--shadow-*`, `--border-radius-*`, `--text-*`)을 사용하고, 임의의 하드코딩 색상값을 새로 만들지 않는다.
- **테마**: 라이트는 `:root`, 다크는 `<html>` 의 `.dark` 클래스로 전환한다(디자인 시스템 컨벤션, next-themes 방식).
- **폰트**: 기본 폰트는 Pretendard(`--font-pretendard`).
- **컴포넌트 규칙(참고)**: 버튼은 `filled|outlined|text` × `primary|secondary|danger`, 기본 `primary-01`(파랑). 카드는 `bg-00` 표면 + `line-01` 테두리 + `shadow-black-02`, 라운드 12px.
- 디자인 시스템 번들 폴더(`claude-design-system-md v1.4/`)는 참조용 원본이므로 임의로 수정하지 않는다.

## 주요 명령어

```bash
npm install      # 의존성 설치
npm run dev      # 개발 서버 실행(자동 재시작), http://localhost:3000
npm start        # 개발 서버 실행(감시 없음)
npm test         # 유닛 테스트 실행
```

## 코드 규칙

- CSS에서 `!important`를 사용하지 않는다. 선택자 우선순위, 구조, 클래스 분리로 스타일 충돌을 해결한다.
- 질문의 원인을 파악할 때는 관련 HTML/CSS/JS 파일을 먼저 검토하고, 요청과 무관한 코드의 동작은 보존한다.
