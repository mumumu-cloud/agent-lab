# UROCK Design System — v1.4

> **목적**: Claude Design이 디자인 토큰·규칙뿐 아니라 **실제 컴포넌트 구현 소스**까지 인식하고 사용할 수 있도록 구성한 업로드 번들입니다.

---

## 업로드 방법

```text
_claude-design-upload/ 폴더 전체를 Claude Design에 업로드하십시오.
```

### 포함 (Included)

```text
- design.md
- styles/globals.css
- components/**
- modules/**
```

### 업로드 금지 (Do NOT upload)

```text
- _archive/**
- _original-preserved/**
```

`_archive/`의 파일은 중간 산출물·과거 작업 자료이며 `design.md`와 중복·충돌할 수 있습니다.

---

## Source of Truth 규칙

```text
design.md always wins.

If not defined:   NOT FOUND
If not verified:  NOT VERIFIED
```

우선순위:

```text
1. _claude-design-upload/design.md
2. _claude-design-upload/styles/globals.css
3. _claude-design-upload/components/**
4. _claude-design-upload/modules/**
```

---

## v1.3 주요 구조

### Button v3

```text
variant:  filled | outlined | text      (VERIFIED: components/button.tsx:6)
color:    primary | secondary | danger  (VERIFIED: components/button.tsx:7)
size:     L | M | S                     (VERIFIED: components/button.tsx:8)
iconType: none | leading | trailing | only  (VERIFIED: components/button.tsx:9)
props:    iconType, leftIcon, rightIcon, loading, disabled, asChild
```

iconType 렌더링 규칙:

```text
none     → children만 렌더링 (아이콘 없음)
leading  → leftIcon + children
trailing → children + rightIcon
only     → leftIcon ?? rightIcon (텍스트 없음)
```

state 처리 방식:

```text
prop  → loading (boolean), disabled (boolean)
CSS   → hover, active (pseudo-class 자동 처리)
```

variant × color 조합:

| variant  | color     | 구 명칭       |
| -------- | --------- | ------------- |
| filled   | primary   | filled        |
| filled   | danger    | filledRed     |
| outlined | primary   | outlinedBlue  |
| outlined | secondary | outlinedBlack |
| outlined | danger    | outlinedRed   |
| text     | primary   | text          |
| text     | secondary | textBlack     |

### Button Semantic Priority

Claude Design은 버튼 외형을 CRUD 액션 이름이 아닌 **시맨틱 우선순위**를 기준으로 선택합니다.

| 우선순위 | 외형                              | 의미                                  | 대표 예시                 |
| -------- | --------------------------------- | ------------------------------------- | ------------------------- |
| 1        | `filled` + `primary`              | 최우선 사용자 결정                    | 저장, 제출, 확인          |
| 2        | `outlined` + `primary`            | 중요한 보조 액션                      | 검색, 미리보기, 다음 단계 |
| 3        | `outlined` + `secondary`          | 표준 보조 액션                        | 편집, 이전, 취소          |
| 4        | `filled` + `secondary`            | 독립적 저우선 액션                    | 임시 저장, 복제, 추가     |
| —        | `filled` or `outlined` + `danger` | 파괴적 액션 — 주변 버튼 스타일에 맞춤 | 강제 삭제, 시스템 초기화  |
| —        | `text`                            | 최저 시각 우선순위                    | 더 보기, 건너뛰기, 도움말 |

`disabled`는 모든 variant · color 조합에 적용 가능한 **버튼 상태(state)**입니다. `disabled`는 파괴적 액션이 아닙니다. `Disable` 또는 `Disabled` 액션을 `danger`로 해석하지 마십시오.

### Input v3

구현된 컴포넌트:

| 컴포넌트          | 배럴 export         | import 경로                                   |
| ----------------- | ------------------- | --------------------------------------------- |
| `InputText`       | ✅                  | `@workspace/ui/components/input`              |
| `InputPassword`   | ✅                  | `@workspace/ui/components/input`              |
| `InputSearch`     | ✅                  | `@workspace/ui/components/input`              |
| `InputSearchGray` | ✅                  | `@workspace/ui/components/input`              |
| `InputDate`       | ✅                  | `@workspace/ui/components/input`              |
| `InputMemo`       | ✅                  | `@workspace/ui/components/input`              |
| `InputModify`     | ❌ 직접 import 필요 | `@workspace/ui/components/input/input-modify` |

`InputText` / `InputPassword` — `state` prop (명시적으로 전달):

```text
state: default | error | success
```

CSS pseudo-class로 자동 처리 (prop 아님):

```text
hover / focus / disabled
```

적용 예시:

```tsx
<InputText state="error" ... />
<InputText state="success" ... />
```

`_variants.ts` 내부 구조 (`variants` prop):

```text
variants: text | number
```

> `_variants.ts`는 내부 전용입니다. 배럴에서 export되지 않습니다.
> `number` variant는 `_variants.ts`에 정의되어 있으나, 독립 컴포넌트(`InputNumber`)는 `modules/input-number`에 위치합니다.

`InputSearch` — 독립 2-section 구조 (Figma 검증):

```text
inputSize: "default" | "compact"   — default: 312×56px, compact: 312×40px
onSearchClick?: () => void          — 검색 버튼 클릭 핸들러
placeholder?: string                — 기본값: "검색어를 입력해주세요"
```

- `_variants.ts` 미사용 — 좌우 분리 DOM 구조
- `state` prop 없음 (Figma search 타입에 error/success 상태 없음 — NOT VERIFIED)
- hover/focus: 좌측 input 영역에만 적용

InputNumber: `modules/input-number/` — `state`, `inputSize` prop 추가, `disabled:bg-01` 수정 완료. error/success 상태 아이콘: Material Symbols Outlined `error` / `check_circle` — Material Symbols 런타임 미검증으로 현재 border 색상만 구현됨.

---

## v1.4 신규 컴포넌트 (42)

Claude Design 프로젝트(`UROCK Design System_v1.4`)에서 이식된 컴포넌트입니다. 원본은 claude.ai/design 프로젝트의 JSX(`.jsx`+`.d.ts`+`.prompt.md`) 스펙이며, 본 번들의 `.tsx` 컨벤션(`cva`, `React.forwardRef`, 시맨틱 토큰 클래스)으로 변환되었습니다. 상세 props/variants/토큰 매핑은 `design.md` §5.10~§5.22, 전체 소스는 §13 참조.

| 카테고리 | 컴포넌트 |
| --- | --- |
| Form 추가 | `radio.tsx`, `search-dropdown.tsx`, `language-selector.tsx` |
| Overlay 추가 | `context-menu.tsx`, `img-modal.tsx`, `modal-deduplication-m.tsx` |
| Navigation 추가 | `tree-view.tsx`, `side-nav.tsx`, `nav-bar.tsx` |
| Layout 추가 | `tit-group.tsx`, `scroll-area.tsx`, `frame.tsx` |
| Data | `badge.tsx` |
| Card | `card.tsx`, `card-case-analysis.tsx`, `card-case-profile.tsx`, `card-evidence.tsx`, `card-media.tsx` |
| Chips | `chip.tsx` |
| Display | `avatar.tsx`, `status-dot.tsx`, `symbol.tsx`, `device-frame.tsx`, `terms.tsx`, `media-control.tsx`, `eye.tsx`(Eye/IconEye), `img-phone.tsx`(DeviceFrame alias), `profile.tsx`·`profile-list-states.tsx`(Avatar alias), `playback.tsx`(`재생`=MediaControl alias), `icons.tsx`(IconDevice/IconMapping/IconSorting/IconWastebasket/IconBackup/IconLoadingMotion/IconEye) |
| Assets | `assets/logos/UROCK_navy.svg`, `assets/logos/UROCK_white.svg` |
| Controls | `segmented-control.tsx`, `fab.tsx`, `view-toggle.tsx` |
| Status | `banner.tsx`, `stepper.tsx` |
| Table (Primitive) | `table.tsx` — `modules/table`(react-table 기반)와 별개인 프레젠테이셔널 프리미티브 |
| Actions | `icon-button.tsx`, `download-button.tsx` |
| List | `list.tsx`, `case-progress-list.tsx`, `side-list-case.tsx`, `side-list-chat.tsx`, `side-list-speaker.tsx`, `main-list-chat-talk.tsx`, `main-list-chat-file.tsx`, `main-list-filter.tsx` |

제외된 항목:

```text
순수 별칭(alias) — Btn, BtnsBtn, Tag, Chips(복수형), SideTag, SegmentText, SegmentbtnMainOption2/3,
IconBtn, Dot, Tit, ScrollBar, StepLine, Tab, TabMenu, Gnb, Snb, TreeItem, TreeDepth 등
(별칭 중 Profile / ProfileListStates / ImgPhone / 재생 은 로컬에 thin re-export 파일로 이식됨)
이미 로컬에 다른 이름으로 존재 — Pagination(pagination.tsx), NumberDisplay(number.tsx),
Toast(sonner.tsx), Dropdown(select.tsx)
```

---

## 제거된 컴포넌트 (v1.3 기준)

Claude Design 인식 복잡도 초과 또는 v3 범위 외 이유로 제거되었습니다.

```text
modules/org-tree/          — 제거됨
modules/upload-file/       — 제거됨
modules/date-range-picker/ — 제거됨
components/slider.tsx      — 제거됨
```

이번 감사에서 코드 파일 및 README 전체를 대상으로 참조 검색을 수행한 결과 0건 확인되었습니다. design.md는 이번 감사에서 직접 열람하지 않았습니다.

---

## 폴더 구조

```text
claude-design-system-md v1.4/
├── .claude/
│   └── settings.local.json
├── .cursor/
│   ├── mcp.json
│   └── rules/
│       └── figma-mcp.mdc
├── .gitignore
├── README.md
├── _claude-design-upload/                       ← ✅ Claude Design 업로드 대상
│   ├── design.md
│   ├── styles/
│   │   └── globals.css
│   ├── components/
│   │   ├── index.ts
│   │   ├── alert-dialog.tsx
│   │   ├── avatar.tsx                           ← v1.4 신규
│   │   ├── badge.tsx                            ← v1.4 신규
│   │   ├── banner.tsx                           ← v1.4 신규
│   │   ├── breadcrumb.tsx
│   │   ├── button.tsx
│   │   ├── card.tsx                             ← v1.4 신규
│   │   ├── card-case-analysis.tsx               ← v1.4 신규
│   │   ├── card-case-profile.tsx                ← v1.4 신규
│   │   ├── card-evidence.tsx                    ← v1.4 신규
│   │   ├── card-media.tsx                       ← v1.4 신규
│   │   ├── case-progress-list.tsx               ← v1.4 신규
│   │   ├── checkbox.tsx
│   │   ├── chip.tsx                             ← v1.4 신규
│   │   ├── collapsible.tsx
│   │   ├── context-menu.tsx                     ← v1.4 신규
│   │   ├── device-frame.tsx                     ← v1.4 신규
│   │   ├── download-button.tsx                  ← v1.4 신규
│   │   ├── dropdown-menu.tsx
│   │   ├── fab.tsx                              ← v1.4 신규
│   │   ├── frame.tsx                            ← v1.4 신규
│   │   ├── icon-button.tsx                      ← v1.4 신규
│   │   ├── icons.tsx                            ← v1.4 신규 (Device/Mapping/Sorting/Wastebasket/Backup/LoadingMotion)
│   │   ├── img-modal.tsx                        ← v1.4 신규
│   │   ├── language-selector.tsx                ← v1.4 신규
│   │   ├── list.tsx                             ← v1.4 신규
│   │   ├── main-list-chat-file.tsx              ← v1.4 신규
│   │   ├── main-list-chat-talk.tsx              ← v1.4 신규
│   │   ├── main-list-filter.tsx                 ← v1.4 신규
│   │   ├── media-control.tsx                    ← v1.4 신규
│   │   ├── modal-deduplication-m.tsx            ← v1.4 신규
│   │   ├── nav-bar.tsx                          ← v1.4 신규
│   │   ├── number.tsx
│   │   ├── pagination.tsx
│   │   ├── popover.tsx
│   │   ├── radio.tsx                            ← v1.4 신규
│   │   ├── scroll-area.tsx                      ← v1.4 신규
│   │   ├── search-dropdown.tsx                  ← v1.4 신규
│   │   ├── segmented-control.tsx                ← v1.4 신규
│   │   ├── select.tsx
│   │   ├── separator.tsx
│   │   ├── sheet.tsx
│   │   ├── side-list-case.tsx                   ← v1.4 신규
│   │   ├── side-list-chat.tsx                   ← v1.4 신규
│   │   ├── side-list-speaker.tsx                ← v1.4 신규
│   │   ├── side-nav.tsx                         ← v1.4 신규
│   │   ├── sidebar.tsx
│   │   ├── skeleton.tsx
│   │   ├── sonner.tsx
│   │   ├── status-dot.tsx                       ← v1.4 신규
│   │   ├── stepper.tsx                          ← v1.4 신규
│   │   ├── switch.tsx
│   │   ├── symbol.tsx                           ← v1.4 신규
│   │   ├── table.tsx                            ← v1.4 신규 (프레젠테이셔널 프리미티브)
│   │   ├── tabs.tsx
│   │   ├── terms.tsx                            ← v1.4 신규
│   │   ├── text.tsx
│   │   ├── textarea.tsx
│   │   ├── tit-group.tsx                        ← v1.4 신규
│   │   ├── tooltip.tsx
│   │   ├── tree-view.tsx                        ← v1.4 신규
│   │   ├── view-toggle.tsx                      ← v1.4 신규
│   │   └── input/
│   │       ├── index.ts                         ← InputText, InputPassword, InputSearch, InputSearchGray, InputDate, InputMemo export
│   │       ├── input-text.tsx
│   │       ├── input-password.tsx
│   │       ├── input-search.tsx
│   │       ├── input-search-gray.tsx
│   │       ├── input-date.tsx
│   │       ├── input-memo.tsx
│   │       ├── input-modify.tsx                 ← 직접 import 전용
│   │       ├── _check-icon.tsx                  ← 내부 서브컴포넌트
│   │       ├── _text-delete.tsx                 ← 내부 서브컴포넌트
│   │       └── _variants.ts                     ← 내부 CVA 정의
│   └── modules/
│       ├── index.ts
│       ├── calendar/
│       │   ├── index.ts
│       │   ├── calendar-module.css
│       │   └── calendar-module.tsx
│       ├── date-picker/
│       │   ├── index.ts
│       │   └── date-picker-module.tsx
│       ├── dnd/
│       │   ├── index.ts
│       │   ├── types.ts
│       │   └── dnd-boundary.tsx
│       ├── input-number/
│       │   ├── index.ts
│       │   └── input-number-module.tsx
│       ├── modal/
│       │   ├── index.ts
│       │   ├── modal-module.tsx
│       │   ├── default-modal.tsx
│       │   ├── img-alert-question.tsx
│       │   └── state-modal.tsx
│       ├── pagination/
│       │   ├── index.ts
│       │   └── pagination-module.tsx
│       ├── search-input/
│       │   ├── index.ts
│       │   └── search-input-module.tsx
│       └── table/
│           ├── index.ts
│           ├── column-meta.ts
│           ├── create-table-module.tsx
│           ├── types.ts
│           ├── utils.ts
│           ├── components/
│           │   ├── cells/
│           │   │   ├── index.ts
│           │   │   ├── checkbox-component.tsx
│           │   │   ├── date-cell.tsx
│           │   │   ├── date-expire.tsx
│           │   │   ├── header-cell.tsx
│           │   │   ├── page-count-select.tsx
│           │   │   ├── table-body-renderer.tsx
│           │   │   ├── table-cell-wrapper.tsx
│           │   │   ├── table-header-renderer.tsx
│           │   │   ├── table.tsx
│           │   │   ├── type.ts
│           │   │   ├── columns/
│           │   │   │   ├── index.ts
│           │   │   │   ├── account-state.tsx
│           │   │   │   ├── column.tsx
│           │   │   │   ├── country.tsx
│           │   │   │   ├── custom.tsx
│           │   │   │   ├── download.tsx
│           │   │   │   ├── dragable-column.tsx
│           │   │   │   ├── link.tsx
│           │   │   │   ├── select.tsx
│           │   │   │   └── state.tsx
│           │   │   └── pagination/
│           │   │       ├── pagination.tsx
│           │   │       └── table-pagination-wrapper.tsx
│           │   └── compound/
│           │       ├── body.tsx
│           │       ├── filter-search.tsx
│           │       ├── pagination.tsx
│           │       ├── search.tsx
│           │       └── toolbar.tsx
│           ├── constants/
│           │   ├── index.ts
│           │   └── country.ts
│           ├── hooks/
│           │   ├── index.ts
│           │   ├── use-column-sort.tsx
│           │   ├── use-horizontal-scroll-hint.ts
│           │   ├── use-query-string.ts
│           │   ├── use-row-selection-sync.ts
│           │   ├── use-sort-query-bridge.ts
│           │   ├── use-table-data.ts
│           │   ├── use-table-module.ts
│           │   ├── use-table-query.ts
│           │   └── use-table-search-handler.ts
│           ├── module/
│           │   ├── create-contexts.tsx
│           │   ├── table-data.tsx
│           │   ├── table-module.tsx
│           │   └── table-query.tsx
│           ├── search/
│           │   ├── index.ts
│           │   ├── filter-search.tsx
│           │   ├── search-filter.tsx
│           │   ├── search-input.tsx
│           │   ├── search-result.tsx
│           │   ├── search.tsx
│           │   └── table-search-filter-wrapper.tsx
│           └── utils/
│               ├── compute-hidden-headers.ts
│               └── filter-stale-selection.ts
├── _archive/                                    ← 🚫 업로드 금지
└── _original-preserved/                         ← 🚫 업로드 금지
```

---

## 주의 사항

1. 업로드 대상은 **오직** `_claude-design-upload/` 폴더입니다.
2. 충돌 시 항상 `design.md`가 우선합니다.
3. 정의되지 않은 토큰·클래스·컴포넌트를 임의로 만들지 마십시오.
4. 코드·토큰 값을 이 번들에서 직접 수정하지 마십시오 (읽기 전용 추출본).

---

## 아이콘 정책

```text
Icons are NOT part of this Claude Design learning target.
components/icons 폴더는 이 번들에 포함되지 않습니다. 업로드하지 마십시오.
SVG path를 임의로 생성하지 마십시오.
누락된 UROCK 커스텀 아이콘 소스를 재구성하지 마십시오.
Claude Design 학습 대상에 커스텀 아이콘 소스를 요청하거나 포함시키지 마십시오.
외부 아이콘 참조: Google Material Symbols Outlined (https://fonts.google.com/icons)
Google Material Symbols 이름이 시맨틱 Source of Truth입니다. lucide-react 및 inline SVG 구현은 구현 예시일 뿐입니다.
lucide-react는 이 코드베이스의 서드파티 아이콘 라이브러리입니다. 미사용 import가 아닌 경우 제거하지 마십시오.
기존 lucide-react 아이콘은 유효한 구현 예시입니다. 자동으로 대체하지 마십시오.
컴포넌트 내부 inline SVG는 동작에 필수적인 경우(BEHAVIOR CRITICAL) 유지합니다.
```

> **v1.4 비고**: `components/icons.tsx`는 위에서 금지하는 `components/icons/` 폴더(제품 커스텀 아이콘 소스)와 다릅니다. Claude Design 프로젝트가 이미 생성해 둔 6개 아이콘(IconDevice/IconMapping/IconSorting/IconWastebasket/IconBackup/IconLoadingMotion)의 SVG path를 그대로 이식한 것으로, 새로 창작하거나 재구성한 path가 아닙니다.
