# agent-lab

이 저장소는 사내 전용 디자인 애셋 라이브러리 프로토타입과 그 기준이 되는 디자인
시스템으로 구성됩니다.

## 구조

- [`asset-library/`](asset-library/) — 애플리케이션(사내 전용 디자인 애셋 라이브러리 프로토타입).
  실행·개발·테스트는 이 폴더에서 진행합니다. 자세한 내용은 `asset-library/README.md` 참고.
- `claude-design-system-md v1.4/` — UROCK Design System v1.4 참조 번들(원본, 수정하지 않음).

## 빠른 시작

```bash
cd asset-library
npm install
npm run dev      # http://localhost:3000
```

## 참고

- 저장소 전반의 작업 지침은 루트의 `AGENTS.md` 를 참고하세요(비밀정보 취급 원칙, 디자인 시스템 참조 규칙 등).
- 모든 UI 작업은 `claude-design-system-md v1.4` 디자인 시스템과 토큰을 기준으로 제작합니다.
