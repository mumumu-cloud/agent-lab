---
spec: "urock-design-system"
version: "canonical-v1"
source: "UROCK-Design-system-md"
status: "static-source-integrated"
runtime_verified: false
---

# UROCK Canonical Design System — Integrated `design.md`

> 단일 통합 canonical 문서. 토큰·클래스·컴포넌트·런타임 매핑·금지 규칙 + **전체 원본 소스 부록(§12)**을 한 파일에 포함한다.
> 다른 AI가 별도의 `.tsx`/`.ts`/`.css`/인벤토리 파일을 열지 않고도 이 디자인 시스템을 이해할 수 있도록 작성됨.
> 추측 금지 · 환각 금지. 미존재 = `NOT FOUND`, 미검증 = `NOT VERIFIED`.

---

## 1. Source of Truth

우선순위(높을수록 우선):

```text
1.  실제 소스 파일 (actual source files)
2.  styles/globals.css
3.  components/**
4.  modules/**
5.  TOKEN_INVENTORY.md
6.  COMPONENT_INVENTORY.md
7.  RUNTIME_MAPPING.md
8.  CANONICAL_USAGE_GUIDE.md
9.  docs/design.md
10. ai-readable-bundle/**
```

충돌 시: **실제 소스 파일이 우선(actual source files win).**
값/존재/이름은 §12 Raw Source Appendix의 원문이 최종 근거이다.

---

## 2. Global Design Tokens

> 추출 원천: `styles/globals.css` (`:root` light / `:root.dark, .dark` dark / `@theme` / `@theme inline`), `modules/calendar/calendar-module.css`.
> 색상 값 형식: 대부분 `R, G, B` 채널 → 소비처 `rgb(var(--token))`. 일부 `rgb()/rgba()` 완성형. 전체 원문은 §12 참조.
> Light/Dark 헥사 표기는 `docs/design.md §3` 표(소스 교차검증)와 일치. 이 문서 자체가 canonical source of truth이므로 토큰 표에는 `Status`(=CANONICAL) 대신 **`Usage`(사용 가이드)** 열을 제공한다. 토큰별 상세 사용 의도는 §2.18 참조.

### 2.1 Color — Primary · Source: `styles/globals.css`

| Token      | CSS 변수             | Light                | Dark                  | Usage                        |
| ---------- | -------------------- | -------------------- | --------------------- | ---------------------------- |
| primary-01 | `--color-primary-01` | #628CF5 (98,140,245) | #7EA2FF (126,162,255) | 브랜드 대표 기본 색상        |
| primary-02 | `--color-primary-02` | #201D30 (32,29,48)   | #151320 (21,19,32)    | 브랜드 계열 어두운 기본 색상 |

### 2.2 Color — Secondary · Source: `styles/globals.css`

| Token        | CSS 변수               | Light   | Dark    | Usage                                                  |
| ------------ | ---------------------- | ------- | ------- | ------------------------------------------------------ |
| secondary-01 | `--color-secondary-01` | #93B0F8 | #A8BEFF | primary-01 보조 색상                                   |
| secondary-02 | `--color-secondary-02` | #6DE7EF | #7BEFF5 | 주변 색상들과 조화를 위한 보조 색상 (제한적 사용 권장) |
| secondary-03 | `--color-secondary-03` | #11BCC7 | #26D6E0 | 주변 색상들과 조화를 위한 보조 색상 (제한적 사용 권장) |
| secondary-04 | `--color-secondary-04` | #D9DFEE | #3A4358 | 주변 색상들과 조화를 위한 보조 색상 (제한적 사용 권장) |

### 2.3 Color — Gray · Source: `styles/globals.css`

> Light: gray-00 최명 → gray-10 최암. Dark: 반전.

| Token             | CSS 변수                    | Light   | Dark    | Usage                                           | 비고      |
| ----------------- | --------------------------- | ------- | ------- | ----------------------------------------------- | --------- |
| gray-00           | `--color-gray-00`           | #FFFFFF | #171B29 | 다양한 명도 단계로 확장 가능한 중성 색상 팔레트 |           |
| gray-01           | `--color-gray-01`           | #DDDDDD | #1B2030 | 다양한 명도 단계로 확장 가능한 중성 색상 팔레트 | icon_dark |
| gray-02           | `--color-gray-02`           | #B7B9BA | #262B3B | 다양한 명도 단계로 확장 가능한 중성 색상 팔레트 |           |
| gray-03-icon-row  | `--color-gray-03-icon-row`  | #959799 | #2F3445 | 다양한 명도 단계로 확장 가능한 중성 색상 팔레트 | icon_row  |
| gray-04           | `--color-gray-04`           | #64686B | #3E4457 | 다양한 명도 단계로 확장 가능한 중성 색상 팔레트 |           |
| gray-05-icon-high | `--color-gray-05-icon-high` | #464A4E | #555B70 | 다양한 명도 단계로 확장 가능한 중성 색상 팔레트 | icon_high |
| gray-06           | `--color-gray-06`           | #181D22 | #6E7489 | 다양한 명도 단계로 확장 가능한 중성 색상 팔레트 |           |
| gray-07           | `--color-gray-07`           | #161A1F | #9095A8 | 다양한 명도 단계로 확장 가능한 중성 색상 팔레트 |           |
| gray-08           | `--color-gray-08`           | #111518 | #B6BAC8 | 다양한 명도 단계로 확장 가능한 중성 색상 팔레트 |           |
| gray-09           | `--color-gray-09`           | #0D1013 | #D8DBE5 | 다양한 명도 단계로 확장 가능한 중성 색상 팔레트 |           |
| gray-10           | `--color-gray-10`           | #0A0C0E | #F3F4F8 | 다양한 명도 단계로 확장 가능한 중성 색상 팔레트 |           |
| gray-white        | `--color-gray-white`        | #FFFFFF | #FAFAFA | 다양한 명도 단계로 확장 가능한 중성 색상 팔레트 |           |

### 2.4 Color — Blue · Source: `styles/globals.css`

> `blue-07` 슬롯 = `primary-01` 대응. **`--color-blue-07` `NOT FOUND`** (06→08 점프).

| Token            | CSS 변수                   | Light   | Dark    | Usage                                             |
| ---------------- | -------------------------- | ------- | ------- | ------------------------------------------------- |
| blue-01          | `--color-blue-01`          | #F9FBFF | #1C2846 | 다양한 톤으로 확장 가능한 브랜드 계열 색상 팔레트 |
| blue-02          | `--color-blue-02`          | #EFF4FE | #293B67 | 다양한 톤으로 확장 가능한 브랜드 계열 색상 팔레트 |
| blue-03          | `--color-blue-03`          | #CEDBFC | #364D87 | 다양한 톤으로 확장 가능한 브랜드 계열 색상 팔레트 |
| blue-04          | `--color-blue-04`          | #B7CAFA | #4663AE | 다양한 톤으로 확장 가능한 브랜드 계열 색상 팔레트 |
| blue-05-icon-sub | `--color-blue-05-icon-sub` | #96B2F8 | #597FDF | 다양한 톤으로 확장 가능한 브랜드 계열 색상 팔레트 |
| blue-06          | `--color-blue-06`          | #81A3F7 | #81A3F7 | 다양한 톤으로 확장 가능한 브랜드 계열 색상 팔레트 |
| blue-08          | `--color-blue-08`          | #597FDF | #96B2F8 | 다양한 톤으로 확장 가능한 브랜드 계열 색상 팔레트 |
| blue-09          | `--color-blue-09`          | #4663AE | #B7CAFA | 다양한 톤으로 확장 가능한 브랜드 계열 색상 팔레트 |
| blue-10          | `--color-blue-10`          | #364D87 | #CEDBFC | 다양한 톤으로 확장 가능한 브랜드 계열 색상 팔레트 |
| blue-11          | `--color-blue-11`          | #293B67 | #EFF4FE | 다양한 톤으로 확장 가능한 브랜드 계열 색상 팔레트 |
| blue-12          | `--color-blue-12`          | #1C2846 | #F9FBFF | 다양한 톤으로 확장 가능한 브랜드 계열 색상 팔레트 |

### 2.5 Color — Soft · Source: `styles/globals.css`

| Token             | CSS 변수                    | Light                 | Dark               | Usage                                                                                                                    |
| ----------------- | --------------------------- | --------------------- | ------------------ | ------------------------------------------------------------------------------------------------------------------------ |
| soft-red          | `--color-soft-red`          | #FFEAEA               | #402629            | 부드러운 톤으로 확장 가능한 파스텔 계열 색상 팔레트. 항목 구분을 위한 파스텔 계열 색상 팔레트 (주로 Chip, Tag 등에 사용) |
| soft-red-light    | `--color-soft-red-light`    | rgba(255,234,234,0.4) | rgba(64,38,41,0.4) | 부드러운 톤으로 확장 가능한 파스텔 계열 색상 팔레트. 항목 구분을 위한 파스텔 계열 색상 팔레트 (주로 Chip, Tag 등에 사용) |
| soft-yellow       | `--color-soft-yellow`       | #FFF4CE               | #40361A            | 부드러운 톤으로 확장 가능한 파스텔 계열 색상 팔레트. 항목 구분을 위한 파스텔 계열 색상 팔레트 (주로 Chip, Tag 등에 사용) |
| soft-yellow-light | `--color-soft-yellow-light` | rgba(255,244,206,0.4) | rgba(64,54,26,0.4) | 부드러운 톤으로 확장 가능한 파스텔 계열 색상 팔레트. 항목 구분을 위한 파스텔 계열 색상 팔레트 (주로 Chip, Tag 등에 사용) |
| soft-green        | `--color-soft-green`        | #DFFAFB               | #18373A            | 부드러운 톤으로 확장 가능한 파스텔 계열 색상 팔레트. 항목 구분을 위한 파스텔 계열 색상 팔레트 (주로 Chip, Tag 등에 사용) |
| soft-green-light  | `--color-soft-green-light`  | rgba(223,250,251,0.4) | rgba(24,55,58,0.4) | 부드러운 톤으로 확장 가능한 파스텔 계열 색상 팔레트. 항목 구분을 위한 파스텔 계열 색상 팔레트 (주로 Chip, Tag 등에 사용) |
| soft-blue         | `--color-soft-blue`         | #E6EDFF               | #1F2E52            | 부드러운 톤으로 확장 가능한 파스텔 계열 색상 팔레트. 항목 구분을 위한 파스텔 계열 색상 팔레트 (주로 Chip, Tag 등에 사용) |
| soft-purple       | `--color-soft-purple`       | #E9E3FA               | #393054            | 부드러운 톤으로 확장 가능한 파스텔 계열 색상 팔레트. 항목 구분을 위한 파스텔 계열 색상 팔레트 (주로 Chip, Tag 등에 사용) |
| soft-gray-pale    | `--color-soft-gray-pale`    | #F3F4F6               | #1B1F24            | 부드러운 톤으로 확장 가능한 파스텔 계열 색상 팔레트. 항목 구분을 위한 파스텔 계열 색상 팔레트 (주로 Chip, Tag 등에 사용) |
| soft-gray-light   | `--color-soft-gray-light`   | #E6E6E6               | #2B3035            | 부드러운 톤으로 확장 가능한 파스텔 계열 색상 팔레트. 항목 구분을 위한 파스텔 계열 색상 팔레트 (주로 Chip, Tag 등에 사용) |
| soft-gray-dark    | `--color-soft-gray-dark`    | #C9C9C9               | #4B5057            | 부드러운 톤으로 확장 가능한 파스텔 계열 색상 팔레트. 항목 구분을 위한 파스텔 계열 색상 팔레트 (주로 Chip, Tag 등에 사용) |

### 2.6 State Tokens · Source: `styles/globals.css`

| Token         | CSS 변수                | Light   | Dark    | Usage                 |
| ------------- | ----------------------- | ------- | ------- | --------------------- |
| state-success | `--color-state-success` | #32D8E3 | #4DE3EA | 성공 상태 피드백 색상 |
| state-error   | `--color-state-error`   | #FF8484 | #FF8F8F | 오류 상태 피드백 색상 |
| state-warning | `--color-state-warning` | #FFC60A | #FFD24A | 주의 상태 피드백 색상 |

### 2.7 Background Tokens (Surface) · Source: `styles/globals.css`

| Token        | CSS 변수             | Light           | Dark            | Usage                                                  | 비고                        |
| ------------ | -------------------- | --------------- | --------------- | ------------------------------------------------------ | --------------------------- |
| bg-00        | `--color-bg-00`      | #FFFFFF         | #201D30         | 기본 배경 색상                                         |                             |
| bg-01        | `--color-bg-01`      | #F9F9F9         | #262338         | 주변 색상들과 조화를 위한 배경 색상 (제한적 사용 권장) | 캔버스 배경                 |
| bg-02        | `--color-bg-02`      | #E6E6E6         | #2C2940         | 주변 색상들과 조화를 위한 배경 색상 (제한적 사용 권장) |                             |
| bg-03        | `--color-bg-03`      | #F7F9FE         | #32304A         | 주변 색상들과 조화를 위한 배경 색상 (제한적 사용 권장) |                             |
| bg-04        | `--color-bg-04`      | #E6EDFF         | #3B3A58         | 주변 색상들과 조화를 위한 배경 색상 (제한적 사용 권장) |                             |
| bg-05-des    | `--color-bg-05-des`  | #F9FAFB         | #24212F         | 설명 및 보조 정보 영역 배경 색상                       | `@theme inline` 브리지 없음 |
| bg-success   | `--color-bg-success` | #AEF2F6         | #18373A         | 성공 상태 배경 색상                                    |                             |
| bg-error     | `--color-bg-error`   | #FFB9B9         | #402629         | 오류 상태 배경 색상                                    |                             |
| bg-06-dimmed | `--color-06-dimmed`  | rgba(0,0,0,0.8) | rgba(0,0,0,0.8) | 모달 및 오버레이 영역 배경 색상                        | 오버레이 dimmed             |

> `bg-05-card` (`--color-bg-05-card`): **`NOT FOUND`** — 제거됨 → `bg-00`.

### 2.8 Line Tokens (Border color) · Source: `styles/globals.css`

| Token         | CSS 변수                | Light   | Dark                   | Usage                                                    |
| ------------- | ----------------------- | ------- | ---------------------- | -------------------------------------------------------- |
| line-00       | `--color-line-00`       | #F5F5F5 | rgba(237,237,237,0.08) | 보조 테두리 색상                                         |
| line-01       | `--color-line-01`       | #EDEDED | rgba(237,237,237,0.2)  | 기본 테두리 색상                                         |
| line-02       | `--color-line-02`       | #E9EBF8 | rgba(58,70,112,1)      | 주변 색상들과 조화를 위한 테두리 색상 (제한적 사용 권장) |
| line-03       | `--color-line-03`       | #93B0F8 | rgba(126,162,255,1)    | 주변 색상들과 조화를 위한 테두리 색상 (제한적 사용 권장) |
| line-04-dark  | `--color-line-04-dark`  | #494B4D | rgba(140,145,152,0.8)  | 주변 색상들과 조화를 위한 테두리 색상 (제한적 사용 권장) |
| line-05-focus | `--color-line-05-focus` | #050506 | rgba(255,255,255,0.7)  | 주변 색상들과 조화를 위한 테두리 색상 (제한적 사용 권장) |

### 2.9 Text Tokens · Source: `styles/globals.css`

| Token             | CSS 변수                    | Light   | Dark    | Usage                                                  |
| ----------------- | --------------------------- | ------- | ------- | ------------------------------------------------------ |
| text-00           | `--color-text-00`           | #FFFFFF | #F5F7FA | primary 배경색이나 어두운 배경에 사용되는 글자 색상    |
| text-01           | `--color-text-01`           | #A7A7A7 | #8B929A | 비활성화 글자 색상                                     |
| text-02-row       | `--color-text-02-row`       | #767676 | #A7ADB5 | 보조 글자 색상                                         |
| text-03-high      | `--color-text-03-high`      | #1A1A1A | #FAFAFA | 기본 글자 색상                                         |
| text-04-brand     | `--color-text-04-brand`     | #4978EB | #7DA4FF | 브랜드 메인 글자 색상                                  |
| text-05-dark      | `--color-text-05-dark`      | #91B1FF | #B7CCFF | 주변 색상들과 조화를 위한 글자 색상 (제한적 사용 권장) |
| text-06-secondary | `--color-text-06-secondary` | #342F9B | #7B74F2 | 주변 색상들과 조화를 위한 글자 색상 (제한적 사용 권장) |
| text-07-tertiary  | `--color-text-07-tertiary`  | #8246AF | #C08FFF | 보라색 계열과 조화를 위한 글자 색상                    |
| text-success      | `--color-text-success`      | #04939B | #5BE7EE | 성공 상태 글자 색상                                    |
| text-error        | `--color-text-error`        | #EE4C54 | #FF9B9F | 오류 상태 글자 색상                                    |
| text-warning      | `--color-text-warning`      | #B16D00 | #FFD35A | 주의 상태 글자 색상                                    |

### 2.9.1 TEXT COLOR POLICY (Source of Truth)

> Official, permanent Text Color Policy for the UROCK Design System. This is the default rule for all future screens, layouts, components, UI patterns, and UI generation. It supersedes the color-usage guidance in **§2.18 Color Usage Rules → Text** (and VISUAL FOUNDATIONS → Color) wherever they conflict. It does **not** modify any token value, name, or theme mapping.

**Token-name policy (canonical):**
- **`text-02-low` is removed from all policy wording — the canonical secondary token is `text-02-row`** (`--color-text-02-row`, Light `#767676` / Dark `#A7ADB5`). Every occurrence of `text-02-low` anywhere in this policy is to be read and written as `text-02-row`. Do not use, reintroduce, or treat `text-02-low` as valid.
- **`text-05-dark`** (`--color-text-05-dark`, Light `#91B1FF` / Dark `#B7CCFF`) is a defined limited brand variant token. Do not use it as a hover token unless a component spec or the canonical token source explicitly defines that behavior (otherwise report NOT VERIFIED). The name `text-05-brand-hover` is not a token in this system and has been removed from policy wording.

#### Rule Priority Order
When selecting, applying, or validating a text color, always follow this order (higher overrides lower):
1. **Component Specification**
2. **Official Text Color Policy** (this section)
3. **Existing Design Documentation**

A page-level text color policy must never override a component-level specification. If a component already defines text colors for its states/variants/types/interactions, follow the component spec.

#### Text Priority Policy
1. **Default text → `text-03-high`.** Primary color for readable content; highest priority among general readable tokens. Do not replace it with a lower-priority token for visual variation.
2. **Secondary text → `text-02-row`** (canonical name; `text-02-low` is not used). Only for lower-priority content: descriptions, helper text, captions, secondary/supporting info, metadata. Never for primary readable content. Do not mix `text-02-row` and `text-03-high` for content of the same semantic meaning and hierarchy level.
3. **Disabled text → `text-01`.** Only for disabled text or disabled-state text. Never for normal, secondary, supporting, decorative, or merely-low-priority content. Low priority ≠ disabled.
4. **High-contrast text → `text-00`.** Only when high-contrast is intentionally required and contrast is clearly secured (approved combos only: filled buttons, Toast, Tooltip, etc.). Not a general default; never applied merely because a background is dark. **`text-00` token value: Light Mode `#FFFFFF` / Dark Mode `#F5F7FA`** (per `design.md §2.9`; `globals.css` `:root` = `#FFFFFF`, `.dark` = `#F5F7FA`) — do not force pure white in dark mode for general use. **Filled-button exception (buttons only):** inside a filled button, **only when the text color is `#FFFFFF`** does it stay fixed to `#FFFFFF` in BOTH Light and Dark mode (never `#F5F7FA`). Filled buttons whose text is any other color follow their normal per-mode Light/Dark values. This exception applies only to filled buttons — not to Toast, Tooltip, or other high-contrast surfaces, which follow the standard token value above.
5. **Primary brand emphasis → `text-04-brand`.** Highest-priority brand emphasis only. Do not overuse; when several highlighted elements coexist, only the highest-priority one uses it. Never for normal body text.
6. **Secondary brand color → `text-06-secondary`.** Never selected automatically. Only when explicitly required by the user, an approved design spec, an existing component spec, or a higher-priority rule. Not a substitute for `text-04-brand`, `text-success`, or general readable tokens.
7. **Tertiary color → `text-07-tertiary`.** Only on purple-toned backgrounds. Never on neutral, white, black, gray, blue, green, red, or other non-purple backgrounds; never as a general accent/decoration/emphasis.
8. **Semantic status colors.** `text-success` = Success, `text-error` = Error, `text-warning` = Warning — used per the content's/component's semantic meaning. Do not use `text-error`/`text-warning` as decorative/brand/emphasis colors; do not use `text-success` as generic green text.
   - **`text-success` secondary-emphasis exception:** allowed only when ALL hold — multiple highlighted elements already exist in the same context; green is intentionally approved as secondary emphasis; `text-04-brand` is already used for the highest-priority emphasis; it won't be confused with a real Success state; and it is intentionally lower in hierarchy. It never replaces `text-04-brand` as primary emphasis.

#### General Text Priority (supporting hierarchy — NOT an override of semantic eligibility)
After all component, semantic, state, background, and contrast rules are evaluated, use this visual priority only as support:
1. `text-04-brand` · 2. `text-success` (only under the secondary-emphasis exception) · 3. `text-03-high` · 4. `text-02-row` · 5. `text-01` (disabled only) · 6. `text-00` (high-contrast only)

This list does not grant permission to use a token outside its defined meaning. Component specs and semantic meaning always take precedence.

#### Component Protection Rule
Never modify, replace, override, or reinterpret text-color tokens already defined inside components — including Button, Input, Select, Checkbox, Radio, Switch, Toast, Tooltip, Dialog, Modal, Dropdown, Tabs, form controls, and other reusable components. Component-level tokens are part of the Source of Truth and remain unchanged. Page-level policy never overrides component-level definitions; do not redesign a component's text color based on surrounding-page appearance.

#### Interactive State Tokens
Interactive/state text tokens (hover, active, pressed, focused, selected, visited, etc.) are used **only** for the exact interaction state they were defined for. Note: `text-05-dark` is a limited brand variant token, **not** a designated hover token — do not use it for hover unless a component spec defines that. Never as general accent, brand, decorative, static-emphasis, or normal text colors. Never for static page content.

#### Component State Priority
If a component defines its own text colors for states/variants/types (default, hover, active, pressed, focus, disabled, error, success, warning, readonly, selected, checked, unchecked, filled, outlined, text, primary, danger, …), always follow the component spec. Do not replace with page-level tokens, infer new state colors, or apply general status-token rules inside a component that already has an approved status implementation. Component specs take precedence over this policy, the General Text Priority, page-level hierarchy, and visual preference.

#### Semantic Consistency
Text tokens represent semantic meaning, not appearance. Choose in order: 1. Component Specification · 2. Semantic Meaning · 3. Information Hierarchy · 4. State · 5. Background & Contrast. One semantic meaning maps to exactly one token; the same meaning + hierarchy uses the same token throughout. Don't mix tokens for identical roles for variety, and don't change token meaning between screens/sections/themes/components. When uncertain, choose the more semantically correct token, not the more visually similar one.

#### Preservation & Non-Optimization
Never optimize, rebalance, restyle, or improve text-color choices by swapping tokens unless explicitly requested. Do not create, rename, or redefine tokens; do not change token values or theme mappings; do not replace semantic tokens with raw values or modify component-level token behavior. The `text-00` value is **Light `#FFFFFF` / Dark `#F5F7FA`** (not pure white in dark mode) — this is the confirmed Source-of-Truth value and must not be changed.

#### Text Token Selection Flow
1. **Is the text inside an existing component?** Yes → follow the component spec, do not apply page-level rules, do not continue (unless the spec explicitly requires an external semantic token). No → continue.
2. Determine **semantic meaning** (primary content / secondary info / disabled / brand emphasis / success / error / warning / approved secondary emphasis).
3. Determine **information hierarchy** (highest emphasis / primary readable / secondary-supporting / disabled).
4. Determine **state** (static, default, disabled, success, error, warning, hover, active, focus, selected). Do not infer a component state that isn't defined.
5. Determine **background & contrast** (background family, purple-toned?, high-contrast intentionally required?, sufficient contrast?, component-controlled?).
6. **Select the approved token** whose defined meaning and eligibility match the above. Never by visual similarity; never skip/reorder steps; never bypass a component spec to apply a page-level rule.

#### Implementation & Final Principle
Apply this as the default text-color strategy for all future UI generation; always run the Selection Flow first. If a token can't be determined from the Design System, **do not guess — report NOT VERIFIED / NOT FOUND** and preserve the existing implementation. When multiple rules apply, choose the highest-priority rule: component specs override page-level policy, semantic correctness overrides visual similarity, approved token meaning overrides aesthetic preference. When no rule can be verified, do not guess.

### 2.10 Typography Tokens · Source: `styles/globals.css` (`@theme`, `@font-face`)

**Font family**: `--font-pretendard` = `"Pretendard", sans-serif` · `--font-spoqa` = `"SpoqaHanSans", sans-serif`.
**@font-face 등록 파일**: `Pretendard-Regular.woff2/.woff`, `SpoqaHanSansNeo-Regular.woff`.

**Usage (Level 1)**:

| Role   | Font                             | Usage                                  |
| ------ | -------------------------------- | -------------------------------------- |
| Text   | Pretendard (`--font-pretendard`) | 한글, 다국어, 특수문자, 일반 UI 텍스트 |
| Number | Spoqa Han Sans (`--font-spoqa`)  | 숫자                                   |

**Font size** (`--text-*`): 12, 13, 14, 16, 18, 20, 24, 28, 32, 36, 40, 48, 72, 120 (px).
**Font weight** (`--font-weight-*`): regular 400 · medium 500 · semibold 600 · bold 700.
**Letter-spacing** (`--tracking-tight-*`): 03(-0.3px), 05(-0.5px), 1(-1px), 13(-1.3px), 15(-1.5px), 2(-2px), 3(-3px), 4(-4px).

> 시맨틱 typography 토큰(`text-heading-*`): **`NOT FOUND`** (숫자 스케일만 존재).
> Light/Dark 구분 없음(크기·굵기·자간은 모드 무관).

### 2.11 Radius Tokens · Source: `styles/globals.css`

유틸 보유 (`--border-radius-*`): button-large(12px), button-medium(10px), button-small(8px), input(12px), modal(=frame-20=20px), frame-4(4px), frame-8(8px), frame-10(10px), frame-12(12px), frame-16(16px), frame-20(20px), frame-24(24px), frame-48(48px), frame-60(60px).
변수만(유틸 없음): default(0.625rem), xl(1rem), lg(0.75rem), md(0.625rem), sm(0.5rem).
Tailwind alias (`@theme inline --radius-*`): 위 `--border-radius-*` 별칭 14종.

### 2.12 Border Width Tokens · Source: `styles/globals.css`

`--border-width-1`(1px), `-2`(2px), `-4`(4px), `-8`(8px), `-default`(1px).
`--border-width-0`: **`NOT VERIFIED`** (단순 너비 스칼라 아님 — `docs/design.md §6.2`).

### 2.13 Shadow Tokens · Source: `styles/globals.css`

CSS 변수 패밀리(light `:root` / dark `.dark`, 실제 box-shadow 문자열은 §12 globals.css 참조). Usage는 패밀리(prefix) 단위로 적용:

| Family (prefix)   | 토큰                                      | Usage                                                        |
| ----------------- | ----------------------------------------- | ------------------------------------------------------------ |
| `shadow-black-*`  | `--shadow-black-01~05, -08, -09, -10` (8) | 기본 그림자 색상                                             |
| `shadow-blue-*`   | `--shadow-blue-01~05` (5)                 | 브랜드 그림자 색상                                           |
| `shadow-green-*`  | `--shadow-green-01~05` (5)                | green 계열 색상에 사용하는 그림자 색상                       |
| `shadow-red-*`    | `--shadow-red-01~05` (5)                  | red 계열 색상에 사용하는 그림자 색상                         |
| `shadow-yellow-*` | `--shadow-yellow-01~05` (5)               | 주의 상태 또는 yellow 계열 색상에 사용하는 그림자 색상       |
| `shadow-navy-*`   | `NOT FOUND`                               | navy 계열 그림자 토큰 미존재 (navy는 색조 참조값으로만 등장) |

> `shadow-navy`: **NOT FOUND** — 실제 토큰 패밀리로 존재하지 않음. navy(#161421)는 아래 색조 참조에서만 사용됨.

색조 참조: black #0F0F0F · navy #161421 · blue #B1C5F8 · green #01D7DB · red #F8B1B1.

### 2.14 Backdrop Tokens · Source: `styles/globals.css`

`--backdrop-filter-none` (none) · `--backdrop-filter-20` (blur(1.25rem)) · `--backdrop-filter-40` (blur(2.5rem)).

### 2.15 Base / Layout Tokens (shadcn) · Source: `styles/globals.css`

HSL `H S% L%` 공백 구분.

| 토큰                           | Light             | Dark               |
| ------------------------------ | ----------------- | ------------------ |
| `--background`                 | 0 0% 100%         | 249.5 24.7% 15.1%  |
| `--foreground`                 | 240 10% 3.9%      | 0 0% 100%          |
| `--border`                     | 220 20% 30%       | (라이트 전용 정의) |
| `--sidebar-background`         | 0 0% 98%          | 240 5.9% 10%       |
| `--sidebar-foreground`         | 240 5.3% 26.1%    | 240 4.8% 95.9%     |
| `--sidebar-primary`            | 240 5.9% 10%      | 224.3 76.3% 48%    |
| `--sidebar-primary-foreground` | 0 0% 98%          | 0 0% 100%          |
| `--sidebar-accent`             | 240 4.8% 95.9%    | 240 3.7% 15.9%     |
| `--sidebar-accent-foreground`  | 240 5.9% 10%      | 240 4.8% 95.9%     |
| `--sidebar-border`             | 220 13% 91%       | 240 3.7% 15.9%     |
| `--sidebar-ring`               | 217.2 91.2% 59.8% | 217.2 91.2% 59.8%  |

### 2.16 Calendar Tokens (`--rdp-*`) · Source: `modules/calendar/calendar-module.css`

`react-day-picker` 전용, `.rdp-root` 스코프 39종 (전역 디자인 토큰 아님). 전역 연계: `.rdp-day_button:hover → rgb(var(--color-bg-04))` 1건만. 그 외 hex 하드코딩(`#1C2846`, `#628cf5`, `#E6EDFF` 등). 전체 값은 §12 calendar-module.css 참조.

주요: `--rdp-accent-color`(#1C2846), `--rdp-selected-color`(#628cf5), `--rdp-day-height/width`(44px), `--rdp-day_button-height/width`(42px), `--rdp-range_middle-background-color`(#E6EDFF), `--rdp-animation_duration`(0.3s), `--rdp-animation_timing`(cubic-bezier(0.4,0,0.2,1)) 등.

### Token 요약

| Category              | Count     | Source              |
| --------------------- | --------- | ------------------- |
| Color (`--color-*`)   | 69        | globals.css         |
| Typography            | 28        | globals.css         |
| Radius (base / alias) | 19 / 14   | globals.css         |
| Border width          | 6         | globals.css         |
| Shadow                | 28        | globals.css         |
| Backdrop              | 3         | globals.css         |
| Base/Layout           | 11        | globals.css         |
| Calendar `--rdp-*`    | 39        | calendar-module.css |
| Spacing (`--space-*`) | NOT FOUND | —                   |

---

### 2.17 Typography Usage Rules (Design Intent)

> 토큰 **값·이름 변경 없음**. 아래는 폰트 토큰의 사용 의도(Level 1)만 설명한다.
> 폰트 토큰 정의·표: §2.10 (`--font-pretendard`, `--font-spoqa`).

- **Text — Pretendard**: 한글, 다국어, 특수문자, 일반 UI 텍스트
- **Number — Spoqa Han Sans**: 숫자

---

### 2.18 Color Usage Rules (Design Intent)

> 아래는 각 토큰의 **사용 의도(Level 1)** 요약이며, §2.1–2.13 토큰 표의 `Usage` 열과 동일한 정의이다.
> 토큰 값·이름은 표의 정의를 그대로 따르며 변경하지 않는다(소스 `styles/globals.css`의 canonical 이름 기준).

#### Primary

- `primary-01` — 브랜드 대표 기본 색상
- `primary-02` — 브랜드 계열 어두운 기본 색상

#### Secondary

- `secondary-01` — primary-01 보조 색상
- `secondary-02` · `secondary-03` · `secondary-04` — 주변 색상들과 조화를 위한 보조 색상 (제한적 사용 권장)

#### Shadow (패밀리 단위)

- `shadow-black-*` — 기본 그림자 색상
- `shadow-blue-*` — 브랜드 그림자 색상
- `shadow-green-*` — green 계열 색상에 사용하는 그림자 색상
- `shadow-red-*` — red 계열 색상에 사용하는 그림자 색상
- `shadow-yellow-*` — 주의 상태 또는 yellow 계열 색상에 사용하는 그림자 색상
- `shadow-navy` — **NOT FOUND** (실제 토큰 미존재)

#### State

- `state-success` — 성공 상태 피드백 색상
- `state-error` — 오류 상태 피드백 색상
- `state-warning` — 주의 상태 피드백 색상

#### Background

- `bg-00` — 기본 배경 색상
- `bg-01` · `bg-02` · `bg-03` · `bg-04` — 주변 색상들과 조화를 위한 배경 색상 (제한적 사용 권장)
- `bg-05-des` — 설명 및 보조 정보 영역 배경 색상
- `bg-06-dimmed` — 모달 및 오버레이 영역 배경 색상
- `bg-success` — 성공 상태 배경 색상
- `bg-error` — 오류 상태 배경 색상

#### Border (Line)

- `line-00` — 보조 테두리 색상
- `line-01` — 기본 테두리 색상
- `line-02` · `line-03` · `line-04-dark` · `line-05-focus` — 주변 색상들과 조화를 위한 테두리 색상 (제한적 사용 권장)

#### Text

> **사용 규칙의**: 토큰 값·이름은 위 §2.9 표를 따르며, 선택·적용·검증 규칙은 **§2.9.1 TEXT COLOR POLICY (Source of Truth)** 가 우선한다. 아래는 Level 1 요약이다.

- `text-00` — primary 배경색이나 어두운 배경에 사용되는 글자 색상 (Light `#FFFFFF` / Dark `#F5F7FA`; filled button `#FFFFFF` 예외는 §2.9.1)
- `text-01` — 비활성화 글자 색상
- `text-02-row` — 보조 글자 색상 (`text-02-low` 는 사용하지 않음)
- `text-03-high` — 기본 글자 색상
- `text-04-brand` — 브랜드 메인 글자 색상
- `text-05-dark` — 제한적 브랜드 변형 토큰 (hover 전용이 아님; §2.9.1)
- `text-06-secondary` — 주변 색상들과 조화를 위한 글자 색상 (자동 선택 금지; 제한적 사용)
- `text-07-tertiary` — 보라색 계열과 조화를 위한 글자 색상 (보라 톤 배경만)
- `text-success` — 성공 상태 글자 색상
- `text-error` — 오류 상태 글자 색상
- `text-warning` — 주의 상태 글자 색상

#### Gray Palette

Tokens: `gray-white` · `gray-00` · `gray-01` · `gray-02` · `gray-03-icon-row` · `gray-04` · `gray-05-icon-high` · `gray-06` · `gray-07` · `gray-08` · `gray-09` · `gray-10`.

다양한 명도 단계로 확장 가능한 중성 색상 팔레트

#### Blue Palette

Tokens: `blue-01` · `blue-02` · `blue-03` · `blue-04` · `blue-05-icon-sub` · `blue-06` · `blue-08` · `blue-09` · `blue-10` · `blue-11` · `blue-12`.

다양한 톤으로 확장 가능한 브랜드 계열 색상 팔레트 (`blue-07` = `NOT FOUND` — §2.4 참조.)

#### Soft Palette

Tokens: `soft-red` · `soft-red-light` · `soft-yellow` · `soft-yellow-light` · `soft-green` · `soft-green-light` · `soft-blue` · `soft-purple` · `soft-gray-pale` · `soft-gray-light` · `soft-gray-dark`.

부드러운 톤으로 확장 가능한 파스텔 계열 색상 팔레트. 항목 구분을 위한 파스텔 계열 색상 팔레트 (주로 Chip, Tag 등에 사용)

---

## 3. Canonical Utility Classes

> 정의 원천: `styles/globals.css` `@layer utilities` / `@layer components` (직접 클래스) + `@theme inline` (Tailwind JIT 유틸 생성). 전체 원문 §12.
> JSX 색상 규칙: `bg-`/`text-`/`border-`/`caret-` + 토큰 이름 형태만. 모든 항목 Status = `CANONICAL`.

### 3.1 도메인 시맨틱 유틸 (직접 클래스)

| Class                                                                                                                                                                       | Mapped Token             | Allowed usage (CSS 속성)                              | Source      |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------ | ----------------------------------------------------- | ----------- |
| `primary-01` / `primary-02`                                                                                                                                                 | `--color-primary-01/02`  | background-color                                      | globals.css |
| `secondary-01`…`secondary-04`                                                                                                                                               | `--color-secondary-0N`   | color                                                 | globals.css |
| `state-success` / `state-error` / `state-warning`                                                                                                                           | `--color-state-*`        | background-color                                      | globals.css |
| `bg-00`…`bg-04`, `bg-05-des`, `bg-success`, `bg-error`                                                                                                                      | `--color-bg-*`           | background-color                                      | globals.css |
| `bg-error-70`                                                                                                                                                               | `--color-bg-error` / 0.7 | background-color (70% opacity)                        | globals.css |
| `soft-red-light` / `soft-yellow-light` / `soft-green-light`                                                                                                                 | `--color-soft-*-light`   | background-color                                      | globals.css |
| `soft-red`/`soft-yellow`/`soft-green`/`soft-blue`/`soft-purple`/`soft-gray-pale`/`soft-gray-light`/`soft-gray-dark`                                                         | `--color-soft-*`         | background-color                                      | globals.css |
| `line-00`…`line-03`, `line-04-dark`, `line-05-focus`                                                                                                                        | `--color-line-*`         | color + background-color + border-color + caret-color | globals.css |
| `text-00`, `text-01`, `text-02-row`, `text-03-high`, `text-04-brand`, `text-05-dark`, `text-06-secondary`, `text-07-tertiary`, `text-warning`, `text-success`, `text-error` | `--color-text-*`         | color                                                 | globals.css |

### 3.2 Radius / Shadow / Backdrop / Font 유틸

| Class                                                                                                             | Mapped Token                         | 속성             | Source      |
| ----------------------------------------------------------------------------------------------------------------- | ------------------------------------ | ---------------- | ----------- |
| `rounded-button-large/medium/small`, `rounded-input`, `rounded-modal`, `rounded-frame-{4,8,10,12,16,20,24,48,60}` | `--border-radius-*`                  | border-radius    | globals.css |
| `shadow-black-{01..05,08}`, `shadow-blue-{01..05}`, `shadow-green-05`, `shadow-red-03`, `shadow-red-05`           | `--shadow-*`                         | box-shadow       | globals.css |
| `shadow-none`                                                                                                     | —                                    | box-shadow: none | globals.css |
| `backdrop-none`, `backdrop-20`, `backdrop-40`                                                                     | `--backdrop-filter-*`                | backdrop-filter  | globals.css |
| `font-pretendard`, `font-spoqa`                                                                                   | `--font-pretendard` / `--font-spoqa` | font-family      | globals.css |

> 유틸 클래스 없이 변수만 존재(직접 `var()` 사용): `shadow-green-01~04`, `shadow-red-01/02/04`, `shadow-yellow-01~05`, `shadow-black-09/10`.

### 3.3 Component-layer 헬퍼 & 애니메이션

| Class                                                                | 정의                             | Source                          |
| -------------------------------------------------------------------- | -------------------------------- | ------------------------------- |
| `primary-underline`                                                  | underline + color: text-04-brand | globals.css `@layer components` |
| `custom-underline`                                                   | 점선 underline                   | globals.css `@layer components` |
| `animate-spin` / `animate-ping` / `animate-pulse` / `animate-bounce` | keyframes 유틸                   | globals.css `@layer utilities`  |

### 3.4 `@theme inline` 생성 border/theme 유틸 (명시 정의됨)

`@theme inline`에 `--color-*` / `--shadow-*` / `--radius-*` 가 등록되어 Tailwind가 `bg-{token}` / `text-{token}` / `border-{token}` / `caret-{token}` 유틸을 동적 생성.
소스에서 실제 사용 확인된 border 유틸(canonical): `border-primary-01`, `border-state-error`, `border-state-success` (각각 `--color-primary-01`, `--color-state-error`, `--color-state-success` 매핑). Status = `CANONICAL`.

---

## 4. Deprecated and Forbidden Classes

### 4.1 Deprecated (소스/문서 검증)

> ⚠️ 본 통합 작업의 직전 단계에서 `styles/globals.css`의 deprecated compat `@layer utilities` 블록은 **제거됨**(번들 사용 0건 확인 후, EXECUTION MODE 승인 하에 삭제). 아래는 canonical 대체 매핑 기록이며, 해당 클래스는 더 이상 globals.css에 정의되어 있지 않다.

| Deprecated class                      | Canonical replacement                         | Reason                    | Source                                         | Status              |
| ------------------------------------- | --------------------------------------------- | ------------------------- | ---------------------------------------------- | ------------------- |
| `bg-primary-01` / `bg-primary-02`     | `primary-01` / `primary-02`                   | 속성접두+도메인 결합 무효 | globals.css(삭제됨) / CANONICAL_USAGE_GUIDE.md | DEPRECATED(removed) |
| `text-primary-01` / `text-primary-02` | `primary-01` / `primary-02`                   | 동일                      | 〃                                             | DEPRECATED(removed) |
| `bg-secondary-01`…`04`                | `secondary-01`…`04`                           | canonical 도메인 통합     | 〃                                             | DEPRECATED(removed) |
| `text-secondary-01`…`04`              | `secondary-01`…`04`                           | canonical 도메인 통합     | 〃                                             | DEPRECATED(removed) |
| `border-secondary-04`                 | `secondary-04`                                | canonical 도메인 통합     | 〃                                             | DEPRECATED(removed) |
| `bg-state-success/error/warning`      | `state-success/error/warning`                 | canonical 도메인 통합     | 〃                                             | DEPRECATED(removed) |
| `text-state-success/error/warning`    | `state-*` (또는 `@theme inline text-state-*`) | canonical 도메인 통합     | 〃                                             | DEPRECATED(removed) |

### 4.2 Forbidden 패턴 (검증됨)

| Forbidden                                         | Canonical        | Reason                                          | Status                |
| ------------------------------------------------- | ---------------- | ----------------------------------------------- | --------------------- |
| `text-text-*`                                     | `text-*`         | 이중 접두 shim 삭제 완료 (docs/design.md §13.6) | FORBIDDEN / NOT FOUND |
| `bg-bg-*`                                         | `bg-*`           | 이중 접두 shim 삭제 완료                        | FORBIDDEN / NOT FOUND |
| `bg-05-card`                                      | `bg-00`          | CSS 제거됨 (docs/design.md §3.7)                | FORBIDDEN / NOT FOUND |
| `blue-07`                                         | `primary-01`     | 토큰 미존재 (docs/design.md §3.4)               | FORBIDDEN / NOT FOUND |
| `--space-*`                                       | —                | spacing CSS 토큰 미존재                         | FORBIDDEN / NOT FOUND |
| `text-heading-*`                                  | —                | heading 토큰 패밀리 미존재                      | FORBIDDEN / NOT FOUND |
| `!important` (`!text-*`,`!bg-*`,`!p-*`,`!size-*`) | specificity 계층 | docs/design.md §10/§11.1b                       | FORBIDDEN             |

---

## 5. Component System

> 추출 원천: `components/**`, `modules/**` 의 실제 `export` 문 (COMPONENT_INVENTORY.md). props/variants는 명시 정의된 것만 기재; 미명시 = `NOT VERIFIED`. 전체 컴포넌트 원문은 §12.

### 5.1 Base UI

| Component   | Source                       | Export                                                | Props/Variants | Related tokens/classes |
| ----------- | ---------------------------- | ----------------------------------------------------- | -------------- | ---------------------- |
| Separator   | `components/separator.tsx`   | `Separator`                                           | NOT VERIFIED   | globals 전역           |
| Skeleton    | `components/skeleton.tsx`    | `Skeleton`                                            | NOT VERIFIED   | `soft-*` 계열          |
| Collapsible | `components/collapsible.tsx` | `Collapsible, CollapsibleTrigger, CollapsibleContent` | NOT VERIFIED   | globals 전역           |

### 5.2 Form

| Component       | Source                                | Export                                                                                                                                                   | Props/Variants                                                                                                                                                                           | Related tokens/classes                                                                                                                                                                 |
| --------------- | ------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Button          | `components/button.tsx`               | `Button`, `buttonVariants` (interface `ButtonProps`)                                                                                                     | variant: filled/outlined/text; color: primary/secondary/danger; size: L/M/S; iconType: none/leading/trailing/only; loading, disabled, leftIcon, rightIcon, asChild (docs/design.md §7.1) | `primary-01`, `bg-03`, `text-04-brand`, `line-03`, `state-error`, `bg-error`, `bg-error-70`, `border-state-error`, `soft-red-light`, `shadow-blue-03`, `shadow-red-03`, `text-03-high` |
| InputText       | `components/input/input-text.tsx`     | `default InputText`, `InputTextProps`                                                                                                                    | value, onChange(required), isDeleteIconVisible(false), onTextDeleteClick (docs/design.md §7.2.2)                                                                                         | `bg-00`, `bg-03`, `line-01/02/03`, `text-02-row`                                                                                                                                       |
| InputPassword   | `components/input/input-password.tsx` | `default InputPassword`                                                                                                                                  | value, onChange(required), isDeleteIconVisible(true), onTextDeleteClick (docs/design.md §7.2.3)                                                                                          | `gray-05-icon-high`, `bg-00`, `line-*`                                                                                                                                                 |
| InputModify     | `components/input/input-modify.tsx`   | `default InputModify` (배럴 미포함)                                                                                                                      | onConfirm, onCancel; 내부 state (docs/design.md §7.2.4)                                                                                                                                  | `bg-00`, `line-*`                                                                                                                                                                      |
| Input variants  | `components/input/_variants.ts`       | `inputVariants`(cva), `InputProps`                                                                                                                       | variants: text(pl-4 pr-4) / number(pr-4 pl-[40px]) (docs/design.md §7.2.1, §7.2.5)                                                                                                       | `bg-00`, `bg-03`, `line-01/02/03`, `text-02-row`                                                                                                                                       |
| Textarea        | `components/textarea.tsx`             | `Textarea`                                                                                                                                               | NOT VERIFIED                                                                                                                                                                             | `bg-00`, `line-01/03`, `text-03-high`, `text-02-row`, `shadow-black-03`                                                                                                                |
| Checkbox        | `components/checkbox.tsx`             | `Checkbox`                                                                                                                                               | NOT VERIFIED                                                                                                                                                                             | `line-04-dark`, `bg-00/03`, `border-primary-01`, `primary-01`, `shadow-blue-03`                                                                                                        |
| Switch          | `components/switch.tsx`               | `Switch`                                                                                                                                                 | NOT VERIFIED                                                                                                                                                                             | `line-03`, `primary-01`, `gray-01`, `bg-00`, `shadow-black-03`                                                                                                                         |
| Select (+parts) | `components/select.tsx`               | `Select, SelectGroup, SelectValue, SelectTrigger, SelectContent, SelectLabel, SelectItem, SelectSeparator, SelectScrollUpButton, SelectScrollDownButton` | NOT VERIFIED (parts)                                                                                                                                                                     | `line-01`, `bg-00`, `text-03-high`, `text-02-row`, `line-03`, `shadow-black-01`, `shadow-black-04` (docs/design.md §7.3)                                                               |
| Number          | `components/number.tsx`               | `default Number`, `numberVariants`(cva), `NumberProps`                                                                                                   | NOT VERIFIED                                                                                                                                                                             | `font-spoqa`                                                                                                                                                                           |
| Text            | `components/text.tsx`                 | `Text`, `typographyVariants`(cva), `TypographyProps`                                                                                                     | NOT VERIFIED                                                                                                                                                                             | `font-pretendard`                                                                                                                                                                      |

### 5.3 Overlay

| Component        | Source                                 | Export                                                                                                                                                           | Related tokens/classes                                                 |
| ---------------- | -------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------- |
| AlertDialog      | `components/alert-dialog.tsx`          | `AlertDialog` (Object.assign: `.Portal .Overlay .Trigger .Content .Header .Footer .Title .Description .Action .Cancel`)                                          | `line-01`, `bg-00`, `shadow-black-04`, `rounded-modal`, `text-03-high` |
| Sheet            | `components/sheet.tsx`                 | `Sheet, SheetPortal, SheetOverlay, SheetTrigger, SheetClose, SheetContent, SheetHeader, SheetFooter, SheetTitle, SheetDescription`                               | `line-03`, `bg-00/bg-02`, `text-*`, `shadow-*`                         |
| Popover          | `components/popover.tsx`               | `Popover, PopoverTrigger, PopoverContent, PopoverAnchor`                                                                                                         | `line-01`, `bg-00`, `text-03-high`, `shadow-*`                         |
| Tooltip          | `components/tooltip.tsx`               | `Tooltip, TooltipTrigger, TooltipContent, TooltipProvider`                                                                                                       | `line-*`, `text-*`, `shadow-*`                                         |
| DropdownMenu     | `components/dropdown-menu.tsx`         | `DropdownMenu` + 14 parts (`DropdownMenuTrigger/Content/Item/CheckboxItem/RadioItem/Label/Separator/Shortcut/Group/Portal/Sub/SubContent/SubTrigger/RadioGroup`) | `line-*`, `bg-00`, `text-*`, `shadow-*`                                |
| ModalModule      | `modules/modal/modal-module.tsx`       | `ModalModule`                                                                                                                                                    | globals 전역                                                           |
| DefaultModal     | `modules/modal/default-modal.tsx`      | `DefaultModal`                                                                                                                                                   | globals 전역                                                           |
| StateModal       | `modules/modal/state-modal.tsx`        | `StateModal`                                                                                                                                                     | `text-*`, `shadow-none`                                                |
| ImgAlertQuestion | `modules/modal/img-alert-question.tsx` | `default ImgAlertQuestion`                                                                                                                                       | globals 전역                                                           |

### 5.4 Navigation

| Component  | Source                      | Export                                                                                                                  | Related tokens/classes                        |
| ---------- | --------------------------- | ----------------------------------------------------------------------------------------------------------------------- | --------------------------------------------- |
| Tabs       | `components/tabs.tsx`       | `Tabs, TabsList, TabsTrigger, TabsContent`                                                                              | `line-03`, `text-04-brand`, ring              |
| Breadcrumb | `components/breadcrumb.tsx` | `Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator, BreadcrumbEllipsis`   | `text-*`                                      |
| Pagination | `components/pagination.tsx` | `Pagination, PaginationContent, PaginationLink, PaginationItem, PaginationPrevious, PaginationNext, PaginationEllipsis` | `rounded-*`                                   |
| Sidebar    | `components/sidebar.tsx`    | `Sidebar` + 22 parts, `useSidebar`                                                                                      | `--sidebar-*`, `shadow-none`, `bg-background` |

### 5.5 Data Display — Table

| Component                   | Source                                  | Export                                                      |
| --------------------------- | --------------------------------------- | ----------------------------------------------------------- |
| createTableModule (factory) | `modules/table/create-table-module.tsx` | `createTableModule` (+types, re-export `CheckboxComponent`) |

### 5.6 Feedback

| Component      | Source                  | Export           | Related tokens/classes                                               |
| -------------- | ----------------------- | ---------------- | -------------------------------------------------------------------- |
| Toast (Sonner) | `components/sonner.tsx` | `toast, Toaster` | `line-03`, `text-00`, `shadow-black-03`, `bg-[rgba(...)]`(arbitrary) |

### 5.7 Layout / Compound Modules

| Module            | Source                                         | Export              | Style   |
| ----------------- | ---------------------------------------------- | ------------------- | ------- |
| DatePickerModule  | `modules/date-picker/date-picker-module.tsx`   | `DatePickerModule`  | globals |
| InputNumber       | `modules/input-number/input-number-module.tsx` | `InputNumber`       | globals |
| SearchInputModule | `modules/search-input/search-input-module.tsx` | `SearchInputModule` | globals |
| PaginationModule  | `modules/pagination/pagination-module.tsx`     | `PaginationModule`  | globals |
| DndBoundary       | `modules/dnd/dnd-boundary.tsx`                 | `DndBoundary`       | globals |

### 5.8 Table Builders (35)

- module(4): `createTableModuleRoot`, `createTableData`, `createTableQuery`, `createTableContexts`
- compound(5): `TableToolbar`, `createTableBody`, `createTablePagination`, `createTableSearch`, `createTableFilterSearch`
- cells(11): `CheckboxComponent`, `DateCell`, `HeaderCell`, `PageCountSelect`, `Table`, `TableBodyRenderer`, `TableHeaderRenderer`, `TableCellWrapper`, `createDateExpireFn`, `Pagination`, `TablePaginationWrapper`
- columns(9): `createAccountStateCellFn`, `createColumnFn`, `createCountryColumnFn`, `createCustomFn`, `createDownloadCellFn`, `createDragableColumnFn`, `createLinkCellFn`, `createSelectFn`, `createStateCellFn`
- search(6): `SearchInput`, `SearchFilterInput`, `SearchResult`, `FilterSearch`, `SearchFilterProps`, `TableSearchFilterWrapper`

### 5.9 Calendar

| Module         | Source                                 | Export           | Style                                              |
| -------------- | -------------------------------------- | ---------------- | -------------------------------------------------- |
| CalendarModule | `modules/calendar/calendar-module.tsx` | `CalendarModule` | `modules/calendar/calendar-module.css` (`--rdp-*`) |

### 5.10 Form (v1.4 추가)

| Component        | Source                             | Export                                                                   | Props/Variants                                                           | Related tokens/classes                                                                                                                 |
| ---------------- | ---------------------------------- | ------------------------------------------------------------------------ | ------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------- |
| Radio            | `components/radio.tsx`             | `Radio` (interface `RadioProps`, `RadioOption`)                          | options[], value/defaultValue, onChange, disabled, direction: column/row | `bg-00`, `line-01`, `border-primary-01`, `bg-03`, `shadow-blue-03`, `primary-01`, `text-03-high`                                       |
| SearchDropdown   | `components/search-dropdown.tsx`   | `SearchDropdown` (interface `SearchDropdownProps`)                       | options[], value/defaultValue, onChange, placeholder, emptyText          | `bg-00`, `line-01`, `line-03`, `shadow-blue-03`, `text-03-high`, `text-01`, `bg-03`, `text-04-brand`, `shadow-black-04`, `text-02-row` |
| LanguageSelector | `components/language-selector.tsx` | `LanguageSelector` (interface `LanguageSelectorProps`, `LanguageOption`) | options[] (default ko/en), value/defaultValue, onChange                  | `bg-01`, `line-01`, `bg-00`, `text-03-high`, `text-02-row`, `shadow-black-01`                                                          |

### 5.11 Overlay (v1.4 추가)

| Component           | Source                                 | Export                                                          | Props/Variants                                                                               | Related tokens/classes                                                                                                     |
| ------------------- | -------------------------------------- | --------------------------------------------------------------- | -------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| ContextMenu         | `components/context-menu.tsx`          | `ContextMenu` (interface `ContextMenuProps`, `ContextMenuItem`) | trigger, items[] (type: item/separator, danger, disabled, shortcut, icon), align: left/right | `bg-00`, `line-01`, `shadow-black-04`, `text-03-high`, `bg-03`, `text-error`, `soft-red-light`, `line-00`, `text-02-row`   |
| ImgModal            | `components/img-modal.tsx`             | `ImgModal` (interface `ImgModalProps`)                          | src, alt, open, onClose                                                                      | overlay `bg-black/85`, `rounded-frame-12`(arbitrary `rounded-[12px]`)                                                      |
| ModalDeduplicationM | `components/modal-deduplication-m.tsx` | `ModalDeduplicationM` (interface `ModalDeduplicationMProps`)    | open, onClose, onConfirm, duplicateCount                                                     | overlay `bg-black/70`, `bg-00`, `shadow-black-05`, `text-03-high`, `text-02-row`, `text-04-brand`, `primary-01`, `text-00` |

### 5.12 Navigation (v1.4 추가)

| Component | Source                     | Export                                                                | Props/Variants                                                       | Related tokens/classes                                                                               |
| --------- | -------------------------- | --------------------------------------------------------------------- | -------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| TreeView  | `components/tree-view.tsx` | `TreeView` (interface `TreeViewProps`, `TreeNode`)                    | items[] (재귀 children), activeId, onSelect                          | `bg-03`, `bg-04`, `text-03-high`, `text-04-brand`, `text-02-row`(gray icon: `text-gray-03-icon-row`) |
| SideNav   | `components/side-nav.tsx`  | `SideNav` (interface `SideNavProps`, `SideNavItem`, `SideNavSection`) | logo, sections[] (label, items[]), activeId, onSelect, footer, width | `bg-00`, `line-01`, `text-02-row`, `bg-01`, `text-03-high`, `bg-04`, `text-04-brand`, `line-00`      |
| NavBar    | `components/nav-bar.tsx`   | `NavBar` (interface `NavBarProps`, `NavBarItem`)                      | logo, items[], activeId, onSelect, actions                           | `bg-00`, `line-01`, `text-02-row`, `bg-01`, `text-03-high`, `text-04-brand`                          |

### 5.13 Layout (v1.4 추가)

| Component  | Source                       | Export                                                   | Props/Variants                                               | Related tokens/classes                                        |
| ---------- | ---------------------------- | -------------------------------------------------------- | ------------------------------------------------------------ | ------------------------------------------------------------- |
| TitGroup   | `components/tit-group.tsx`   | `TitGroup, titGroupVariants` (interface `TitGroupProps`) | title, subtitle, size: L/S/XS, align: left/center            | `text-03-high`                                                |
| ScrollArea | `components/scroll-area.tsx` | `ScrollArea` (interface `ScrollAreaProps`)               | (children, className만)                                      | 커스텀 webkit 스크롤바 (arbitrary `black/15`, `black/25`)     |
| Frame      | `components/frame.tsx`       | `Frame` (interface `FrameProps`)                         | padding, radius: sm/md/lg/xl/full/string, background, border | `--border-radius-frame-*` CSS var 직접 참조 (동적 style prop) |

### 5.14 Data (v1.4 추가)

| Component | Source                 | Export                                          | Props/Variants                                                      | Related tokens/classes                                                                                                                                                                                                          |
| --------- | ---------------------- | ----------------------------------------------- | ------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Badge     | `components/badge.tsx` | `Badge, badgeVariants` (interface `BadgeProps`) | color: gray/navy/blue/red/success/warning/purple/primary, size: S/L | `soft-gray-pale`, `primary-02`, `soft-blue`, `soft-red`, `soft-green`, `soft-yellow`, `soft-purple`, `primary-01`, `text-00`, `text-03-high`, `text-04-brand`, `text-error`, `text-success`, `text-warning`, `text-07-tertiary` |

### 5.15 Card (v1.4 추가)

| Component        | Source                              | Export                                       | Props/Variants                                                                                           | Related tokens/classes                                                                                           |
| ---------------- | ----------------------------------- | -------------------------------------------- | -------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| Card             | `components/card.tsx`               | `Card, cardVariants` (interface `CardProps`) | title, subtitle, headerAction, footer, shadow: none/sm/md/lg/blue, radius: sm/md/lg/xl, padding, onClick | `bg-00`, `line-01`, `shadow-black-02/03/04`, `shadow-blue-02`, `text-03-high`, `text-02-row`, `bg-01`, `line-00` |
| CardCaseAnalysis | `components/card-case-analysis.tsx` | `CardCaseAnalysis` (Card 합성)               | caseId, analyst, status, findings                                                                        | `text-success`, `text-02-row` (Card 토큰 상속)                                                                   |
| CardCaseProfile  | `components/card-case-profile.tsx`  | `CardCaseProfile` (Card 합성)                | caseId, type, assignee, priority                                                                         | `text-error`(priority=High), `text-03-high`, `text-02-row`                                                       |
| CardEvidence     | `components/card-evidence.tsx`      | `CardEvidence` (Card 합성)                   | title, fileCount, size, hash                                                                             | `text-02-row`, `font-spoqa`(hash)                                                                                |
| CardMedia        | `components/card-media.tsx`         | `CardMedia` (Card 합성)                      | title, mediaType, duration, thumbnail                                                                    | `bg-01`, `text-02-row`                                                                                           |

### 5.16 Chips (v1.4 추가)

| Component | Source                | Export                                       | Props/Variants                                                                                           | Related tokens/classes                                                                                                                                                                                                                          |
| --------- | --------------------- | -------------------------------------------- | -------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Chip      | `components/chip.tsx` | `Chip, chipVariants` (interface `ChipProps`) | color: gray/blue/red/green/yellow/purple/navy/outlined, size: M/S, active, removable, onRemove, disabled | `soft-gray-pale`, `soft-blue`, `soft-red`, `soft-green`, `soft-yellow`, `soft-purple`, `primary-02`, `line-01`, `text-03-high`, `text-04-brand`, `text-error`, `text-success`, `text-warning`, `text-07-tertiary`, `border-primary-01`, `bg-03` |

### 5.17 Display (v1.4 추가)

| Component    | Source                         | Export                                                                                 | Props/Variants                                                           | Related tokens/classes                                                                                      |
| ------------ | ------------------------------ | -------------------------------------------------------------------------------------- | ------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------- |
| Avatar       | `components/avatar.tsx`        | `Avatar, avatarVariants` (interface `AvatarProps`)                                     | src, name(이니셜 폴백), size: XL/L/M/S, status: online/offline/busy/away | `line-02`, `bg-03`, `text-04-brand`, `state-success`, `state-error`, `state-warning`, `bg-gray-02`, `bg-00` |
| StatusDot    | `components/status-dot.tsx`    | `StatusDot, dotVariants` (interface `StatusDotProps`)                                  | status: success/error/warning/primary/gray, size: S/M/L, label           | `state-success`, `state-error`, `state-warning`, `primary-01`, `bg-gray-02`, `text-03-high`                 |
| Symbol       | `components/symbol.tsx`        | `Symbol` (interface `SymbolProps`)                                                     | size(number), color                                                      | 동적 inline style (`currentColor` 기본)                                                                     |
| DeviceFrame  | `components/device-frame.tsx`  | `DeviceFrame` (interface `DeviceFrameProps`)                                           | width                                                                    | `border-gray-06`, `bg-black`, `shadow-black-08`                                                             |
| Terms        | `components/terms.tsx`         | `Terms` (interface `TermsProps`)                                                       | title, maxHeight                                                         | `line-01`, `line-00`, `text-03-high`, `text-02-row`                                                         |
| MediaControl | `components/media-control.tsx` | `MediaControl` (interface `MediaControlProps`)                                         | playing, onToggle, size                                                  | `primary-01`, `text-00`, `shadow-blue-03`                                                                   |
| Eye / IconEye | `components/eye.tsx` (re-export from `icons.tsx`) | `Eye, IconEye` (interface `EyeProps`) | visible, size, color, onClick — SVG paths from Claude Design `Eye.jsx` (path 임의 생성 없음) | `currentColor` 기본; `visible=false` → eye-off |
| ImgPhone | `components/img-phone.tsx` | `ImgPhone` (= `DeviceFrame` alias) | width, children | DeviceFrame 토큰과 동일 |
| Profile | `components/profile.tsx` | `Profile` (= `Avatar` alias) | src, name, size, status | Avatar 토큰과 동일 |
| ProfileListStates | `components/profile-list-states.tsx` | `ProfileListStates` (= `Avatar` alias) | src, name, size, status | Avatar 토큰과 동일 |
| 재생 | `components/playback.tsx` | `재생` (= `MediaControl` alias) | playing, onToggle, size | MediaControl 토큰과 동일 |
| Icon Set (7) | `components/icons.tsx`         | `IconDevice, IconMapping, IconSorting, IconWastebasket, IconBackup, IconLoadingMotion, IconEye(+Eye)` | size, color (SVG 원문 그대로 이식, path 임의 생성 없음)                  | `currentColor` 기본, `IconLoadingMotion`은 `primary-01` 기본 stroke + `animate-spin`                        |
| Logos | `assets/logos/UROCK_navy.svg`, `assets/logos/UROCK_white.svg` | — | UROCK 워드마크 SVG (Claude Design 원문 이식) | navy `#201D30` / white |

### 5.18 Controls (v1.4 추가)

| Component        | Source                             | Export                                                                           | Props/Variants                                         | Related tokens/classes                                                                                                                          |
| ---------------- | ---------------------------------- | -------------------------------------------------------------------------------- | ------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| SegmentedControl | `components/segmented-control.tsx` | `SegmentedControl` (interface `SegmentedControlProps`, `SegmentedControlOption`) | options[], value/defaultValue, onChange, size: M/S     | `bg-01`, `line-01`, `text-02-row`, `bg-00`, `text-03-high`, `shadow-black-02`                                                                   |
| Fab              | `components/fab.tsx`               | `Fab, fabVariants` (interface `FabProps`)                                        | size: L/M/S, color: primary/secondary                  | `primary-01`, `text-00`, `shadow-blue-04/05`, `bg-secondary-01`, `bg-blue-09`, `line-03`, `text-04-brand`, `shadow-blue-03`, `bg-02`, `text-01` |
| ViewToggle       | `components/view-toggle.tsx`       | `ViewToggle` (interface `ViewToggleProps`)                                       | options: list/grid/table, value/defaultValue, onChange | `bg-01`, `line-01`, `text-gray-03-icon-row`, `text-03-high`, `bg-00`, `text-04-brand`, `shadow-black-01`                                        |

### 5.19 Status (v1.4 추가)

| Component | Source                   | Export                                              | Props/Variants                                                               | Related tokens/classes                                                                                                                                                                      |
| --------- | ------------------------ | --------------------------------------------------- | ---------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Banner    | `components/banner.tsx`  | `Banner` (interface `BannerProps`)                  | type: info/success/warning/error, title, description, dismissible, onDismiss | `bg-03`, `line-03`, `bg-success`, `state-success`, `soft-yellow`, `state-warning`, `bg-error`, `state-error`, `text-04-brand`, `text-success`, `text-warning`, `text-error`, `text-03-high` |
| Stepper   | `components/stepper.tsx` | `Stepper` (interface `StepperProps`, `StepperStep`) | steps[], currentStep, direction: horizontal/vertical                         | `state-success`, `bg-success`, `text-success`, `primary-01`, `text-00`, `shadow-blue-03`, `bg-00`, `line-01`, `text-02-row`, `text-04-brand`                                                |

### 5.20 Table — Presentational Primitive (v1.4 추가)

| Component | Source                 | Export                                          | Props/Variants                                                                                                              | Related tokens/classes                                                         |
| --------- | ---------------------- | ----------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------ |
| Table     | `components/table.tsx` | `Table` (interface `TableProps`, `TableColumn`) | columns[] (sortable, width, align, render), data[], striped, selectedRows[], onRowClick, onSort, sortKey/sortDir, emptyText | `line-01`, `bg-01`, `text-02-row`, `text-03-high`, `line-00`, `bg-03`, `bg-04` |

> §5.5 `modules/table` (createTableModule)와는 독립적인 컴포넌트입니다. `modules/table`은 react-table 기반 비즈니스 로직 포함 데이터 그리드, 본 `Table`은 columns/data 선언만으로 렌더되는 순수 프레젠테이셔널 프리미티브입니다.

### 5.21 Actions (v1.4 추가)

| Component      | Source                           | Export                                                         | Props/Variants                                     | Related tokens/classes                                                       |
| -------------- | -------------------------------- | -------------------------------------------------------------- | -------------------------------------------------- | ---------------------------------------------------------------------------- |
| IconButton     | `components/icon-button.tsx`     | `IconButton, iconButtonVariants` (interface `IconButtonProps`) | size: L/M/S, color: default/primary                | `text-gray-03-icon-row`, `bg-01`, `text-03-high`, `bg-03`, `text-primary-01` |
| DownloadButton | `components/download-button.tsx` | `DownloadButton` (interface `DownloadButtonProps`)             | children, onClick (async 지원, 내부 loading state) | `bg-00`, `line-01`, `text-03-high`, `bg-03`, `line-03`, `text-04-brand`      |

### 5.22 List (v1.4 추가)

| Component        | Source                               | Export                                                                     | Props/Variants                                                  | Related tokens/classes                                                                                             |
| ---------------- | ------------------------------------ | -------------------------------------------------------------------------- | --------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| List             | `components/list.tsx`                | `List` (interface `ListProps`, `ListItemData`)                             | items[] (lead/trail slot), activeId, onSelect                   | `line-00`, `bg-03`, `bg-04`, `text-03-high`, `text-02-row`                                                         |
| CaseProgressList | `components/case-progress-list.tsx`  | `CaseProgressList` (interface `CaseProgressListProps`, `CaseProgressItem`) | items[] (label, time, done)                                     | `line-00`, `state-success`, `bg-gray-02`, `text-03-high`, `text-02-row`                                            |
| SideListCase     | `components/side-list-case.tsx`      | `SideListCase` (interface `SideListCaseProps`)                             | title, subtitle, status: Active/Critical/Pending/Closed, active | `state-success/error/warning`, `bg-gray-02`, `bg-04`, `text-04-brand`, `text-03-high`, `text-02-row`               |
| SideListChat     | `components/side-list-chat.tsx`      | `SideListChat` (interface `SideListChatProps`)                             | title, preview, time, unread, active                            | `bg-04`, `text-03-high`, `text-02-row`, `primary-01`                                                               |
| SideListSpeaker  | `components/side-list-speaker.tsx`   | `SideListSpeaker` (interface `SideListSpeakerProps`)                       | name, role, status: online/offline/busy, active                 | `bg-03`, `text-04-brand`, `state-success/error`, `bg-gray-02`, `border-00`, `bg-04`, `text-03-high`, `text-02-row` |
| MainListChatTalk | `components/main-list-chat-talk.tsx` | `MainListChatTalk` (interface `MainListChatTalkProps`)                     | sender, message, time, isSelf                                   | `primary-01`, `text-00`, `bg-01`, `text-03-high`, `text-02-row`                                                    |
| MainListChatFile | `components/main-list-chat-file.tsx` | `MainListChatFile` (interface `MainListChatFileProps`)                     | filename, filesize, fileType, onDownload                        | `bg-01`, `line-01`, `bg-04`, `text-04-brand`, `text-03-high`, `text-02-row`                                        |
| MainListFilter   | `components/main-list-filter.tsx`    | `MainListFilter` (interface `MainListFilterProps`)                         | label, count, active                                            | `bg-04`, `text-04-brand`, `text-03-high`, `bg-02`, `text-02-row`                                                   |

### 5.23 미존재 컴포넌트

```text
Dialog (standalone) NOT FOUND  (AlertDialog 존재)
Drawer (standalone) NOT FOUND  (sheet.tsx로 대체)
```

> v1.4 갱신: Radio / Badge / Tag·Chip은 더 이상 NOT FOUND가 아닙니다 — 각각 `components/radio.tsx`, `components/badge.tsx`, `components/chip.tsx`로 구현되었습니다 (§5.10, §5.14, §5.16 참조). 전체 신규 컴포넌트 원문은 §13.

---

## 6. Runtime Mapping

> 근거: `RUNTIME_MAPPING.md` (grep) + 소스. Used-in 파일은 본 번들 한정. 외부 `apps/**` 미포함 → dead 판정 `NOT VERIFIED`.

| Class                       | Token                  | Used in (대표)                                                               | Component relation     | Status                      |
| --------------------------- | ---------------------- | ---------------------------------------------------------------------------- | ---------------------- | --------------------------- |
| `text-03-high`              | `--color-text-03-high` | 20개 파일 (button, select, textarea, table…)                                 | 본문 텍스트 표준       | CANONICAL · 다용            |
| `line-03`                   | `--color-line-03`      | sheet, tabs, select, switch, button, input-number, pagination, table-header… | focus/ring 표준        | CANONICAL · 다용            |
| `text-*` 가족               | `--color-text-*`       | ~33개 파일 (button.tsx 최다)                                                 | 텍스트 색              | CANONICAL                   |
| `line-*` 가족               | `--color-line-*`       | ~35개 파일                                                                   | 테두리/구분선/캐럿     | CANONICAL                   |
| `bg-00` / `bg-03` / `bg-04` | `--color-bg-*`         | 다수                                                                         | surface                | CANONICAL                   |
| `bg-05-des`                 | `--color-bg-05-des`    | table.tsx, columns/select.tsx, table-cell-wrapper.tsx                        | 선택행 배경            | CANONICAL                   |
| `bg-error` / `bg-error-70`  | `--color-bg-error`     | button.tsx                                                                   | filled + danger        | CANONICAL                   |
| `primary-01`                | `--color-primary-01`   | button, checkbox, switch                                                     | 아이콘 fill            | CANONICAL                   |
| `border-state-error`        | `--color-state-error`  | button.tsx                                                                   | filled + danger 테두리 | CANONICAL (`@theme inline`) |
| `border-primary-01`         | `--color-primary-01`   | checkbox, checkbox-component                                                 | checked 테두리         | CANONICAL (`@theme inline`) |
| `shadow-black-03`           | `--shadow-black-03`    | textarea, switch, sonner                                                     | 그림자 표준            | CANONICAL                   |

### Dead 후보 (번들 0건) — `NOT VERIFIED as dead` (외부 apps 미포함)

```text
text-06-secondary, text-07-tertiary, line-05-focus,
secondary-02, secondary-03, secondary-04,
rounded-input, rounded-button-*, 대부분 rounded-frame-*,
backdrop-none/20/40, primary-underline, custom-underline
```

---

## 7. Component Documentation

> 컴포넌트 props / variants / 상태 규칙 명세. 전체 원본 소스는 §12 참조.

### 7.1 Button

**파일:** `components/button.tsx`  
**라이브러리:** CVA (class-variance-authority), @radix-ui/react-slot

#### 7.1.1 Props

| Prop      | 타입           | 기본값      | 설명                                                    |
| --------- | -------------- | ----------- | ------------------------------------------------------- |
| variant   | ButtonVariant  | `"filled"`  | 버튼 스타일 변형                                        |
| color     | ButtonColor    | `"primary"` | 버튼 색상 스키마                                        |
| size      | ButtonSize     | `"M"`       | 버튼 크기                                               |
| iconType  | ButtonIconType | `"none"`    | 아이콘 모드 (`none/leading/trailing/only`)              |
| loading   | boolean        | `false`     | 로딩 중 상태 (CircularProgress 표시)                    |
| disabled  | boolean        | —           | 비활성화                                                |
| leftIcon  | ReactNode      | —           | leading 아이콘 (iconType `leading` / `only`)            |
| rightIcon | ReactNode      | —           | trailing 아이콘 (iconType `trailing` / `only` fallback) |
| asChild   | boolean        | `false`     | Slot으로 렌더링                                         |

#### 7.1.2 Variant × Color 조합

| variant  | color     | 설명               | 구 명칭       |
| -------- | --------- | ------------------ | ------------- |
| filled   | primary   | 브랜드 파란색 채움 | filled        |
| filled   | danger    | 위험 빨간색 채움   | filledRed     |
| outlined | primary   | 파란 테두리        | outlinedBlue  |
| outlined | secondary | 회색 테두리        | outlinedBlack |
| outlined | danger    | 빨간 테두리        | outlinedRed   |
| text     | primary   | 파란 텍스트        | text          |
| text     | secondary | 회색 텍스트        | textBlack     |

#### 7.1.3 Size

| size 값 | 패딩            | 폰트 크기 | 아이콘 크기 | border-radius         |
| ------- | --------------- | --------- | ----------- | --------------------- |
| `L`     | px-28px py-16px | 18px      | 24×24px     | rounded-lg (0.75rem)  |
| `M`     | px-12px py-8px  | 16px      | 20×20px     | rounded-md (0.625rem) |
| `S`     | px-8px py-4px   | 14px      | 16×16px     | rounded-sm (0.5rem)   |

> 모든 size 공통 base: `inline-flex h-[48px] items-center justify-center gap-[2px] whitespace-nowrap transition-all duration-200`  
> font-weight는 모든 size에서 `font-medium` (500).

#### 7.1.4 IconType

아이콘 버튼 모드는 `iconType` prop으로 제어합니다 (구 `size="icon"` 제거됨).

| iconType 값  | 렌더링 내용               | 사용 props                                    |
| ------------ | ------------------------- | --------------------------------------------- |
| `"none"`     | `{children}`              | 아이콘 없음                                   |
| `"leading"`  | `{leftIcon}{children}`    | `leftIcon`                                    |
| `"trailing"` | `{children}{rightIcon}`   | `rightIcon`                                   |
| `"only"`     | `{leftIcon ?? rightIcon}` | `leftIcon` (우선) 또는 `rightIcon` (fallback) |

`iconType="only"` 추가 스타일: `aspect-square px-0 py-0 rounded-full [&_svg]:w-full [&_svg]:h-full`

#### 7.1.5 Button Semantic Decision Policy

버튼 외형 선택을 위한 의미론적 결정 규칙입니다. 이 정책은 기존 Button API 내에서의 선택을 안내하며, 추가 variant · color · prop · 동작을 도입하지 않습니다.

##### RULE 0 — HIGH CONFIDENCE DEFAULT MAPPINGS

일부 액션은 고정된 의미론적 매핑과 강하게 연결됩니다. 이 매핑은 일반적으로 유지되어야 합니다.

| 액션           | 기본 외형                       |
| -------------- | ------------------------------- |
| 저장 (Save)    | Primary Filled                  |
| 제출 (Submit)  | Primary Filled                  |
| 확인 (Confirm) | Primary Filled                  |
| 삭제 (Delete)  | Danger Filled / Danger Outlined |
| 제거 (Remove)  | Danger Filled / Danger Outlined |

Delete와 Remove는 기본적으로 파괴적 액션입니다. 이들의 외형은 파괴적 액션 규칙(RULE 11)을 따릅니다.

HIGH CONFIDENCE DEFAULT MAPPINGS 범위 외의 모든 액션은 시맨틱 우선순위와 상호작용 컨텍스트에서 외형을 결정해야 합니다.

##### RULE 1 — EXAMPLES LIMITATION

예시는 일반적인 사용 방식을 설명할 뿐입니다. 예시는 절대 규칙이 아닙니다. HIGH CONFIDENCE DEFAULT MAPPINGS 범위 외의 액션은 예시로부터 기계적으로 해석해서는 안 됩니다.

##### RULE 2 — DEFAULT DECISION MODEL

시맨틱 우선순위 계층은 기본 결정 모델입니다. 프로젝트별 UX 가이드라인은 타당한 이유가 있을 때 이 권고를 의도적으로 재정의할 수 있습니다. 이 계층을 절대 규칙으로 취급하지 마십시오.

##### RULE 3 — SEMANTIC PRIORITY RULE

버튼 외형은 다음 기준으로 결정됩니다:

- 사용자 의도 (user intent)
- 의미론적 의미 (semantic meaning)
- 시각 우선순위 계층 (visual priority hierarchy)

버튼 외형은 CRUD 액션 레이블로 결정하지 않습니다.

##### RULE 4 — SINGLE PRIMARY ACTION RULE

단일 인터페이스 섹션에는 일반적으로 최우선 Primary 액션이 하나만 있어야 합니다. 동일한 액션 그룹 내에 Primary Filled 버튼을 여러 개 배치하지 마십시오 (명시적으로 필요한 경우 제외). 하나의 액션 그룹 내에서 가장 중요한 액션만 시각적으로 지배해야 합니다.

예외: 독립적인 워크플로우가 명시적으로 동등한 우선순위를 요구할 때만 복수의 Primary Filled 버튼을 허용합니다.

##### RULE 5 — CONTEXT-BASED SELECTION RULE

동일한 액션 레이블도 다음에 따라 다른 버튼 외형이 필요할 수 있습니다:

- 사용자 의도
- 워크플로우 단계
- 주변 액션

버튼 텍스트 레이블만으로 버튼 스타일을 선택하지 마십시오.

##### RULE 6 — VISUAL HIERARCHY RULE

하나의 액션 그룹 내에서 가장 중요한 액션만 시각적으로 지배해야 합니다. 우선순위가 낮은 액션은 덜 시각적으로 두드러지는 스타일을 사용합니다. 의미론적 중요도가 다른 버튼들에 동일한 시각적 강조를 부여하지 마십시오.

##### RULE 7 — LEVEL 1: Primary Filled

| 항목      | 내용                                                          |
| --------- | ------------------------------------------------------------- |
| 외형      | `variant="filled" color="primary"`                            |
| 의미      | 최우선 사용자 결정                                            |
| 대표 예시 | 계속 (Continue), 적용 (Apply), 최종 확인 (Final Confirmation) |

##### RULE 8 — LEVEL 2: Primary Outlined

| 항목      | 내용                                                                               |
| --------- | ---------------------------------------------------------------------------------- |
| 외형      | `variant="outlined" color="primary"`                                               |
| 의미      | 중요한 보조 액션                                                                   |
| 대표 예시 | 검색 (Search), 미리보기 (Preview), 다음 단계 (Next Step), 상세 보기 (View Details) |

##### RULE 9 — LEVEL 3: Secondary Outlined

| 항목      | 내용                                                  |
| --------- | ----------------------------------------------------- |
| 외형      | `variant="outlined" color="secondary"`                |
| 의미      | 표준 보조 액션                                        |
| 대표 예시 | 편집 (Edit), 이전 (Back), 취소 (Cancel), 닫기 (Close) |

##### RULE 10 — LEVEL 4: Secondary Filled

| 항목      | 내용                                                                                                |
| --------- | --------------------------------------------------------------------------------------------------- |
| 외형      | `variant="filled" color="secondary"`                                                                |
| 의미      | 독립적 저우선 액션                                                                                  |
| 대표 예시 | 임시 저장 (Temporary Save), 초안 저장 (Draft Save), 복제 (Duplicate), 추가 액션 (Additional Action) |

##### RULE 11 — DESTRUCTIVE ACTION RULE

`danger` variant는 되돌릴 수 없거나 고위험 액션에만 사용합니다. 액션이 부정적이라는 이유만으로 `danger`를 사용하지 마십시오. 결과를 쉽게 되돌릴 수 없는 파괴적 액션은 일반적으로 사용자 확인이 필요합니다.

| 외형                                | 조건                                       |
| ----------------------------------- | ------------------------------------------ |
| `variant="filled" color="danger"`   | 주변 버튼이 `filled` variant를 사용할 때   |
| `variant="outlined" color="danger"` | 주변 버튼이 `outlined` variant를 사용할 때 |

허용 예시: 강제 삭제 (Force Delete), 시스템 초기화 (Reset System), 영구 제거 (Permanent Remove)

`danger`를 사용하지 않을 액션: 취소 (Cancel), 이전 (Back), 닫기 (Close), 건너뛰기 (Skip), 무시 (Dismiss)

##### RULE 12 — LOWEST PRIORITY: Text Variant

| 항목      | 내용                                                                          |
| --------- | ----------------------------------------------------------------------------- |
| 외형      | `variant="text"`                                                              |
| 의미      | 최저 시각 우선순위. 정보 제공 또는 최소 시각 강조의 탐색 액션에 주로 사용.    |
| 대표 예시 | 더 보기 (Learn More), 건너뛰기 (Skip), 도움말 (Help), 정책 보기 (View Policy) |

##### RULE 13 — DISABLED RULE

`disabled`는 범용 버튼 상태입니다. `disabled`는 의미론적 의미가 아닙니다. `disabled`는 파괴적 액션이 아닙니다. `disabled`는 모든 variant · color 조합에 존재할 수 있습니다. `Disable` 또는 `Disabled` 액션을 `danger`로 해석하지 마십시오.

##### RULE 14 — CRUD PROHIBITION

CRUD 레이블만으로 버튼 외형을 기계적으로 결정하지 마십시오. CRUD 레이블은 불충분한 결정 기준입니다. 버튼 외형은 시맨틱 우선순위에서 선택해야 합니다.

##### RULE 15 — API RELATIONSHIP

이 정책은 기존 Button API 내에서의 선택을 안내합니다. 이 정책은 추가 variant · color · prop · 동작을 도입하지 않습니다.

##### RULE 16 — USER INTENT FIRST

버튼은 항상 다음으로 선택해야 합니다:

- 사용자 의도 (user intent)
- 의미론적 의미 (semantic meaning)
- 시각 우선순위 계층 (visual priority hierarchy)

버튼은 다음으로 선택해서는 안 됩니다:

- 액션 이름만
- CRUD 레이블
- 버튼 텍스트 레이블만

### 7.2 Input

**파일:** `components/input/`  
**공개 API:** `InputText`, `InputPassword`, `InputSearch`, `InputSearchGray`, `InputDate`, `InputMemo` (배럴 export — `components/input/index.ts`)  
**내부용:** `InputModify` (배럴 미포함, `components/input/input-modify.tsx` 직접 경로 import)

#### 7.2.1 Variants (`_variants.ts`)

| variants 값 | 좌우 패딩      | 용도                         |
| ----------- | -------------- | ---------------------------- |
| `"text"`    | pl-4 pr-4      | 텍스트 입력                  |
| `"number"`  | pr-4 pl-[40px] | 숫자 입력 (왼쪽 아이콘 공간) |

`state` 값: `"default"` (기본) / `"error"` / `"success"` — error/success는 border 색상 오버라이드.

#### 7.2.2 InputText Props

| Prop                | 타입                                   | 기본값      | 설명                                  |
| ------------------- | -------------------------------------- | ----------- | ------------------------------------- |
| value               | `string \| undefined`                  | —           | 입력값 (required)                     |
| onChange            | `ChangeEventHandler<HTMLInputElement>` | —           | 변경 핸들러 (required)                |
| isDeleteIconVisible | `boolean`                              | `false`     | 삭제 아이콘 표시 여부                 |
| onTextDeleteClick   | `() => void`                           | —           | 삭제 아이콘 클릭 핸들러               |
| state               | `"default" \| "error" \| "success"`    | `"default"` | 입력 상태 (error/success 스타일 적용) |

기본 크기: `h-[48px] w-[200px]`  
삭제 아이콘 위치: 포커스 시 표시, `right-[18px]`  
삭제 아이콘 활성 시 우측 패딩: `pr-[44px]`

#### 7.2.3 InputPassword Props

| Prop                | 타입                                   | 기본값      | 설명                                  |
| ------------------- | -------------------------------------- | ----------- | ------------------------------------- |
| value               | `string \| undefined`                  | —           | 입력값 (required)                     |
| onChange            | `ChangeEventHandler<HTMLInputElement>` | —           | 변경 핸들러 (required)                |
| isDeleteIconVisible | `boolean`                              | `true`      | 삭제 아이콘 표시 여부                 |
| onTextDeleteClick   | `() => void`                           | —           | 삭제 아이콘 클릭 핸들러               |
| state               | `"default" \| "error" \| "success"`    | `"default"` | 입력 상태 (error/success 스타일 적용) |

기본 크기: `h-[48px] w-full`  
우측 패딩: `pr-[44px]`  
토글 Eye 아이콘: `right-4` 버튼 래퍼에 **`text-gray-05-icon-high`**, SVG path는 **`currentColor`** (§3 gray-05 / icon_high 계열 유지·다크 호환)  
삭제 아이콘: CircleX (lucide-react), `right-14` 위치  
의존성: lucide-react

#### 7.2.4 InputModify (내부용)

| 항목        | 값 / 설명                                                          |
| ----------- | ------------------------------------------------------------------ |
| 용도        | 인라인 편집 (확인/취소 버튼 포함)                                  |
| 레이아웃    | `flex relative w-fit`                                              |
| 포커스 시   | CheckIcon (`right-[40px]`), TextDelete (`right-[15px]`) 표시       |
| 상태 관리   | 내부 state (value, isFocus)                                        |
| 콜백        | `onConfirm`, `onCancel`                                            |
| 배럴 미포함 | 내부용 — `@workspace/ui/components/input/input-modify` 직접 import |

#### 7.2.5 Input 상태 규칙 (`_variants.ts` 기준)

| 상태     | bg    | border                        | text        | cursor      |
| -------- | ----- | ----------------------------- | ----------- | ----------- |
| default  | bg-00 | border-2 line-01              | —           | —           |
| hover    | bg-03 | border-2 line-02              | —           | —           |
| focus    | bg-00 | border-2 line-03              | —           | line-03     |
| typing   | bg-00 | border-2 line-03 (= focus)    | —           | line-03     |
| filled   | bg-00 | border-2 line-01 (= default)  | —           | —           |
| disabled | bg-01 | —                             | text-02-row | not-allowed |
| error    | bg-00 | border-2 border-state-error   | —           | —           |
| success  | bg-00 | border-2 border-state-success | —           | —           |

> `typing` = 포커스 상태에서 입력 중. `focus`와 동일한 시각 스타일.  
> `filled` = 값이 있는 상태. `default`와 동일한 시각 스타일.  
> `error` / `success` = `state` prop으로 전달 (`_variants.ts`의 `state` variant).

#### 7.2.6 InputSearch Props

**파일:** `components/input/input-search.tsx`  
**구조:** 2-section DOM (좌측 input 영역 + 우측 검색 버튼 영역) — `_variants.ts` 미사용  
**Figma 검증:** `10001:3287` (default), `10001:3299` (compact)

| Prop          | 타입                                   | 기본값                    | 설명                                |
| ------------- | -------------------------------------- | ------------------------- | ----------------------------------- |
| inputSize     | `"default" \| "compact"`               | `"default"`               | 크기 (default: 56px, compact: 40px) |
| onSearchClick | `() => void`                           | —                         | 검색 버튼 클릭 핸들러               |
| placeholder   | `string`                               | `"검색어를 입력해주세요"` | 입력 placeholder                    |
| disabled      | `boolean`                              | `false`                   | 비활성화 (버튼 + 입력 동시)         |
| value         | `string`                               | —                         | 네이티브 input prop                 |
| onChange      | `ChangeEventHandler<HTMLInputElement>` | —                         | 네이티브 input prop                 |

크기 규격 (Figma 검증):

| inputSize   | width | height | border-radius (container) | icon |
| ----------- | ----- | ------ | ------------------------- | ---- |
| `"default"` | 312px | 56px   | 12px                      | 24px |
| `"compact"` | 312px | 40px   | 8px                       | 20px |

토큰 사용:

| 요소             | UROCK 클래스                                 |
| ---------------- | -------------------------------------------- |
| 배경             | `bg-00`                                      |
| 테두리 (default) | `border-t-2 border-b-2 border-l/r-2 line-01` |
| 테두리 (hover)   | `line-02 bg-03`                              |
| 테두리 (focus)   | `line-03 bg-00` (focus-within)               |
| 구분선           | `line-01` (background-color)                 |
| placeholder 색상 | `placeholder:text-01` (#a7a7a7)              |
| 검색 아이콘 색상 | `text-gray-05-icon-high`                     |
| disabled 배경    | `bg-01` (NOT VERIFIED from Figma)            |

> `state` prop 없음 — Figma search 타입에 error/success 상태 미정의 (NOT VERIFIED).  
> 의존성: `lucide-react` (Search 아이콘)

#### 7.2.7 InputSearchGray Props

**파일:** `components/input/input-search-gray.tsx`  
**구조:** 2-section DOM — InputSearch와 동일한 레이아웃  
**차이점:** default 상태 좌측 영역 배경 `bg-02` (#E6E6E6, light gray). hover/focus/typing/disabled 상태는 InputSearch와 동일.

| Prop          | 타입                     | 기본값                    | 설명                                |
| ------------- | ------------------------ | ------------------------- | ----------------------------------- |
| inputSize     | `"default" \| "compact"` | `"default"`               | 크기 (default: 56px, compact: 40px) |
| onSearchClick | `() => void`             | —                         | 검색 버튼 클릭 핸들러               |
| placeholder   | `string`                 | `"검색어를 입력해주세요"` | 입력 placeholder                    |
| disabled      | `boolean`                | `false`                   | 비활성화                            |

토큰 차이 (InputSearch 대비):

| 요소              | InputSearch | InputSearchGray |
| ----------------- | ----------- | --------------- |
| 좌측 default 배경 | `bg-00`     | `bg-02`         |
| 좌측 hover 배경   | `bg-03`     | `bg-03` (동일)  |
| 좌측 focus 배경   | `bg-00`     | `bg-00` (동일)  |

> 의존성: `lucide-react` (Search 아이콘)

#### 7.2.8 InputDate Props

**파일:** `components/input/input-date.tsx`  
**구조:** 2-section DOM (좌측 날짜 범위 표시 + 우측 캘린더 버튼) — InputSearch 우측 섹션 구조 공유  
**용도:** 날짜 범위 선택 트리거 (외부 date picker 연동). 날짜 직접 입력 불가 — 표시용 + 버튼 클릭으로 picker 열기.

| Prop            | 타입                     | 기본값      | 설명                                  |
| --------------- | ------------------------ | ----------- | ------------------------------------- |
| inputSize       | `"default" \| "compact"` | `"default"` | 크기 (default: 56px, compact: 40px)   |
| startDate       | `string`                 | —           | 시작 날짜 표시 ("YYYY/MM/DD")         |
| startTime       | `string`                 | —           | 시작 시간 표시 ("HH:MM")              |
| endDate         | `string`                 | —           | 종료 날짜 표시 ("YYYY/MM/DD")         |
| endTime         | `string`                 | —           | 종료 시간 표시 ("HH:MM")              |
| onCalendarClick | `() => void`             | —           | 캘린더 버튼 클릭 핸들러 (picker 열기) |
| disabled        | `boolean`                | `false`     | 비활성화                              |

값 없을 때 placeholder: `startDate`/`endDate` → `"YYYY/MM/DD"`, `startTime`/`endTime` → `"00:00"` (text-01 색상)  
우측 버튼 아이콘: `Calendar` (lucide-react)  
너비: 고정 너비 없음 — 날짜 텍스트 길이에 따라 가변. 소비처에서 `className` prop으로 너비 제어 가능.

> 의존성: `lucide-react` (Calendar 아이콘)

#### 7.2.9 InputMemo Props

**파일:** `components/input/input-memo.tsx`  
**구조:** 단일 섹션 input + Pencil 아이콘(우측) + 글자 수 카운터(하단)  
**레이아웃:** `flex flex-col gap-[4px]` 외부 래퍼 → 내부 `w-[200px]` input 컨테이너 + 하단 카운터

| Prop        | 타입                     | 기본값      | 설명                                                     |
| ----------- | ------------------------ | ----------- | -------------------------------------------------------- |
| inputSize   | `"default" \| "compact"` | `"default"` | 크기 (default: 48px, compact: 40px)                      |
| value       | `string`                 | —           | 입력값                                                   |
| maxLength   | `number`                 | —           | 최대 글자 수. 정의 시 하단 카운터 표시                   |
| onEditClick | `() => void`             | —           | 편집 아이콘 버튼 클릭 핸들러. 정의 시 Pencil 아이콘 표시 |
| disabled    | `boolean`                | `false`     | 비활성화                                                 |

기본 크기: `w-[200px]`, default `h-[48px]` / compact `h-[40px]`  
좌측 패딩: `pl-4`, 우측 패딩: `pr-2`  
글자 수 카운터: `{charCount} / {maxLength}` — `text-02-row text-[12px]`  
편집 아이콘: `Pencil` (lucide-react) — Material Symbols Outlined: `edit`  
focus-empty 상태 좌측 아이콘 (Figma export 확인, **NOT IMPLEMENTED**): 포커스 + 빈 상태에서 좌측에 아이콘 표시. Material Symbols Outlined: `edit`. Material Symbols 런타임 미검증으로 미구현.

> 의존성: `lucide-react` (Pencil 아이콘)

### 7.3 Select

**파일:** `components/select.tsx`  
**라이브러리:** @radix-ui/react-select, lucide-react (Check, ChevronDown, ChevronUp)

> `select.tsx`는 UROCK 시맨틱 토큰(`line-01`, `bg-00`, `text-*`, `shadow-black-04` 등)으로 작성됨. Radix 선택 UI 애니메이션 클래스(`animate-in`, `fade-in-*` 등)는 유지된다.

| 컴포넌트명               | 설명                                                                                                    |
| ------------------------ | ------------------------------------------------------------------------------------------------------- |
| `Select`                 | Root (SelectPrimitive.Root)                                                                             |
| `SelectGroup`            | SelectPrimitive.Group                                                                                   |
| `SelectValue`            | SelectPrimitive.Value                                                                                   |
| `SelectTrigger`          | h-9, border line-01, rounded-lg, bg-00, px-3 py-2, text-sm text-03-high, shadow-black-01, focus:line-03 |
| `SelectContent`          | z-50, rounded-lg, border line-01, bg-00, text-03-high, shadow-black-04, animate-in/out                  |
| `SelectScrollUpButton`   | ChevronUp 아이콘                                                                                        |
| `SelectScrollDownButton` | ChevronDown 아이콘                                                                                      |

---

## 8. Missing Definitions (검증됨)

```text
Spacing tokens (--space-*)            NOT FOUND  (docs/design.md §5 GAP는 Figma 참조값, CSS 토큰 아님)
blue-07 (--color-blue-07)             NOT FOUND  (→ primary-01)
bg-05-card (--color-bg-05-card)       NOT FOUND  (→ bg-00)
text-heading-* token family          NOT FOUND
Radio                                 NOT FOUND
Badge                                 NOT FOUND
Tag                                   NOT FOUND
Chip                                  NOT FOUND
Dialog (standalone)                   NOT FOUND  (AlertDialog 존재)
Drawer (standalone)                   NOT FOUND  (sheet.tsx로 대체)
--border-width-0 값 형식               NOT VERIFIED
```

---

## 9. AI Generation Rules

```text
Use canonical classes only.
Use canonical tokens only (§2 / TOKEN_INVENTORY.md 존재 항목).
Do not generate missing token families (spacing, text-heading-*).
Do not use deprecated classes (§4.1).
Do not use forbidden patterns (§4.2).
Do not infer spacing tokens.
Do not create blue-07 (→ primary-01).
Do not rename token names.
Do not rename class names.
Do not change component logic, props, or exports.
Dark mode = token value swap only (:root.dark, .dark).
Stateful styles: hover → [&:not(:disabled):hover:not(:active)]: , active → enabled:active: , loading → disabled:data-[loading=true]:*.
No HEX direct use; no !important.
If unsure, use NOT VERIFIED.
```

---

## AI Enforcement Rules

> 이 섹션은 **필수(mandatory)** 이며 **하드 제약(hard constraint)** 으로 취급한다.
> Claude Design · Claude Code · Cursor · GPT 등 모든 AI 시스템은 토큰·클래스·컴포넌트·매핑·런타임 동작·디자인 규칙을 **임의로 생성(invent)** 해서는 안 된다.

### Rule 1. Source of Truth Priority

다음 우선순위가 필수이다:

```text
1. design.md
2. Source code appendix
3. Runtime mapping
4. Component inventory
5. Token inventory
6. Canonical usage guide
```

정보가 충돌할 경우:

```text
design.md always wins.
```

AI는 충돌하는 정의를 절대 병합(merge)해서는 안 된다.

### Rule 2. No Token Creation

AI는 다음을 절대 생성해서는 안 된다:

```text
new token names
new color tokens
new typography tokens
new spacing tokens
new radius tokens
new shadow tokens
```

design.md에 명시적으로 정의된 토큰만 사용할 수 있다.
요청된 토큰이 존재하지 않으면 다음을 반환해야 한다:

```text
NOT FOUND
```

### Rule 3. No Class Creation

AI는 다음을 절대 생성해서는 안 된다:

```text
new utility classes
new semantic classes
new Tailwind mappings
new runtime aliases
```

문서화된 클래스만 사용할 수 있다.
클래스가 문서화되어 있지 않으면 다음을 반환해야 한다:

```text
NOT FOUND
```

### Rule 4. No Component Creation

AI는 컴포넌트의 존재를 절대 가정해서는 안 된다.
다음에 명시적으로 나열된 컴포넌트만 참조할 수 있다:

```text
Component System
Raw Source Appendix
```

컴포넌트가 없으면 다음을 반환해야 한다:

```text
NOT FOUND
```

### Rule 5. No Runtime Assumptions

AI는 명시적 근거 없이 다음을 절대 가정해서는 안 된다:

```text
build success
runtime behavior
storybook behavior
dark mode behavior
application usage
external app usage
```

검증이 불가능하면 다음을 반환해야 한다:

```text
NOT VERIFIED
```

### Rule 6. No Design Interpretation

AI는 명시적으로 문서화되지 않은 한 다음을 추론해서는 안 된다:

```text
importance
priority
business intent
design intent
visual hierarchy
```

문서화의 부재가 추론의 허가를 의미하지 않는다.

### Rule 7. No Auto-Correction

AI는 명시적 지시 없이 다음을 해서는 안 된다:

```text
rename tokens
rename classes
rename components
rewrite mappings
normalize values
```

### Rule 8. Missing Data Handling

정보가 없을 때:

```text
NOT FOUND
```

정보를 검증할 수 없을 때:

```text
NOT VERIFIED
```

이 상태들을 절대 가정으로 대체하지 않는다.

### Rule 9. Code Generation Restrictions

코드를 생성할 때 AI는 다음만 사용해야 한다:

```text
documented tokens
documented classes
documented components
documented runtime mappings
```

필요한 데이터가 없으면 중단하고 누락 항목을 보고한다.
대체물을 임의로 만들지 않는다.

### Rule 10. Hallucination Prevention

이 디자인 시스템을 설명할 때 다음 표현은 금지된다:

```text
"I assume"
"likely"
"probably"
"typically"
"commonly"
"should exist"
```

문서화된 사실만 사용할 수 있다.

### Verification Rule

AI는 출력을 생성하기 전에 다음을 검증해야 한다:

```text
Token exists
Class exists
Component exists
Runtime mapping exists
```

검증에 실패하면 다음을 반환해야 한다:

```text
NOT FOUND
or
NOT VERIFIED
```

생성을 중단해야 한다.

---

## 10. Implementation Rules

```text
Do not edit ai-readable-bundle/** as runtime source.
Do not treat .tsx.md / .ts.md / .css.md as executable source.
Original .tsx / .ts / .css files are the runtime source.
design.md (this file) is the AI reference source of truth.
Do not delete original source files.
Do not rename .tsx / .ts / .css files.
Do not modify docs/design.md.
```

---

## Icon Policy

```text
Icons are NOT part of this Claude Design learning target.
Custom UROCK icon source (components/icons) is not included in this bundle.
Do not upload components/icons.
Do not invent SVG paths or reconstruct missing UROCK icon source.
Do not request missing UROCK icon source files for Claude Design ingestion.
External icon reference: Google Material Symbols Outlined (https://fonts.google.com/icons).
Preferred icon documentation style: Material Symbols Outlined.
lucide-react is an existing third-party icon library. Do not remove lucide-react imports unless unused.
Existing third-party icons are valid implementations. Do not replace them automatically.
BEHAVIOR CRITICAL icons must not be removed or replaced. They control component interaction.
When icon name differs from Material Symbols naming, use the visual semantic mapping table below.
The Google Material Symbols name is the semantic Source of Truth.
Existing lucide-react or inline SVG implementations are implementation examples only.
When generating new components, prefer the Google Material Symbols semantic name rather than reproducing the original SVG implementation.
```

### Third-Party Icon → Material Symbols Mapping

| Current icon (lucide-react) | Component(s)                         | Semantic purpose                 | Material Symbols Outlined | Match type   |
| --------------------------- | ------------------------------------ | -------------------------------- | ------------------------- | ------------ |
| `Search`                    | InputSearch                          | 검색 버튼 트리거                 | `search`                  | EXACT MATCH  |
| `Check`                     | Checkbox, DropdownMenu, Select       | 선택/체크 상태 표시              | `check`                   | EXACT MATCH  |
| `Circle`                    | DropdownMenu RadioItem               | 라디오 선택 표시                 | `circle`                  | EXACT MATCH  |
| `ChevronRight`              | Breadcrumb, DropdownMenu, Pagination | 오른쪽 방향 / 다음 / 서브메뉴    | `chevron_right`           | EXACT MATCH  |
| `ChevronLeft`               | Pagination                           | 왼쪽 방향 / 이전 페이지          | `chevron_left`            | EXACT MATCH  |
| `MoreHorizontal`            | Breadcrumb, Pagination               | 수평 점 3개 (ellipsis)           | `more_horiz`              | EXACT MATCH  |
| `DownloadIcon`              | Table download column                | 다운로드 액션                    | `download`                | EXACT MATCH  |
| `CircleCheck`               | Input `_check-icon`                  | 원 + 체크마크 (성공/확인 상태)   | `check_circle`            | VISUAL MATCH |
| `CircleX`                   | Input `_text-delete`, InputPassword  | 원 + X (입력값 삭제 / 오류)      | `cancel`                  | VISUAL MATCH |
| `ChevronDown`               | Select trigger, Select scroll        | 아래 방향 (드롭다운 열기/스크롤) | `keyboard_arrow_down`     | VISUAL MATCH |
| `ChevronUp`                 | Select scroll                        | 위 방향 (드롭다운 스크롤 업)     | `keyboard_arrow_up`       | VISUAL MATCH |
| `X`                         | Sheet close, CalendarModule close    | 닫기 / dismiss                   | `close`                   | VISUAL MATCH |
| `PanelLeft`                 | Sidebar toggle                       | 왼쪽 패널 열기/닫기              | `left_panel_open`         | NOT VERIFIED |

### Inline SVG Icons (Component-Local)

컴포넌트 내부에 직접 정의된 시맨틱 UI 아이콘입니다. 외부 아이콘 라이브러리가 아니며, Google Material Symbols를 의미적 참조로 사용합니다. BEHAVIOR CRITICAL 아이콘은 제거하거나 대체할 수 없습니다.

| SVG 컴포넌트명           | 파일                                                               | Material Symbols 참조 | 역할                        | BEHAVIOR CRITICAL |
| ------------------------ | ------------------------------------------------------------------ | --------------------- | --------------------------- | ----------------- |
| `EyeIcon` (state: "on")  | `components/input/input-password.tsx:74-86`                        | `visibility`          | 비밀번호 표시 상태          | YES               |
| `EyeIcon` (state: "off") | `components/input/input-password.tsx:88-97`                        | `visibility_off`      | 비밀번호 숨김 상태          | YES               |
| search SVG (unnamed)     | `modules/search-input/search-input-module.tsx:59-69`               | `search`              | SearchInputModule 검색 버튼 | YES               |
| `CalendarIcon`           | `modules/date-picker/date-picker-module.tsx:8-22`                  | `calendar_month`      | DatePicker 열기 트리거      | YES               |
| prev arrow SVG           | `modules/calendar/calendar-module.tsx:103-122`                     | `chevron_left`        | 이전 달 이동                | YES               |
| next arrow SVG           | `modules/calendar/calendar-module.tsx:132-150`                     | `chevron_right`       | 다음 달 이동                | YES               |
| `SortIcon`               | `modules/table/components/cells/table-header-renderer.tsx:12-40`   | `sort`                | 테이블 정렬 상태 표시       | YES               |
| `CheckIcon`              | `modules/table/components/cells/checkbox-component.tsx:8-19`       | `check`               | 테이블 체크박스 체크마크    | YES               |
| drag handle SVG          | `modules/table/components/cells/columns/dragable-column.tsx:68-81` | `drag_indicator`      | 드래그 핸들                 | YES               |
| scroll hint arrow SVG    | `modules/table/components/compound/body.tsx:66-75`                 | `arrow_left`          | 수평 스크롤 방향 힌트       | YES               |

### Decorative SVG Assets

시맨틱 의미가 없는 장식용 SVG 자산입니다. 재사용 가능한 아이콘이 아니며, Claude Design 아이콘 생성 참조 대상이 아닙니다. 제거하거나 대체하지 마십시오.

| 자산명                     | 파일                                         | 설명                                                                    |
| -------------------------- | -------------------------------------------- | ----------------------------------------------------------------------- |
| question mark illustration | `modules/modal/img-alert-question.tsx:11-17` | 복합 장식 일러스트 SVG. 다중 path + 고정 fill 색상 포함. 아이콘이 아님. |

---

## 11. Verification Status

```text
Static source integration:   complete
styles/globals.css:           899 lines (DEPRECATED SEMANTIC COMPAT 블록 제거 후 상태; 구 935 lines)
Deprecated shim block:        REMOVED (grep "DEPRECATED SEMANTIC COMPAT" = 0 matches; 더 이상 active 아님)
Runtime build verification:   NOT VERIFIED   (no package.json/build tooling in bundle; NPM_TOKEN / external repo required)
External apps usage:          NOT INCLUDED   (globals.css @source ../../../../apps/** 미포함)
Dead token deletion:          NOT VERIFIED   (외부 apps 소비 가능)
Deprecated layer:             REMOVED from styles/globals.css (번들 사용 0건, EXECUTION MODE 승인)
```

---

## 12. Raw Source Appendix

> 아래는 원본 소스 파일 전문(요약 없음). 각 파일은 `## Source File: <path>` 헤더 + 펜스 코드블록으로 포함된다.
> 포함 범위: `styles/**/*.css`, `components/**/*.{tsx,ts}`, `modules/**/*.{tsx,ts}` (modules 하위 `utils/hooks/types` 포함). 생성/참조 문서(`ai-readable-bundle/**`, `*_INVENTORY.md`, `CANONICAL_USAGE_GUIDE.md`, `docs/**`)는 runtime 소스가 아니므로 부록에서 제외.

<!-- RAW_SOURCE_APPENDIX_BELOW -->

## Source File: styles/globals.css

```css
@import "tailwindcss";

@source "../../src/**/*.{ts,tsx}";
/* 앱 패키지는 이 CSS를 진입점으로 불러오며, 테마 유틸이 소스 탐색에만 잡히도록 경로 포함 */
@source "../../../../apps/**/*.{ts,tsx}";

@source "../../../../node_modules/@urock-inc/design-system-tailwind/dist/**/*.{js,ts,d.ts}";

@font-face {
  font-family: "Pretendard";
  src:
    url("../public/font/Pretendard-Regular.woff2") format("woff2"),
    url("../public/font/Pretendard-Regular.woff") format("woff");
  font-weight: normal;
  font-style: normal;
}

@font-face {
  font-family: "SpoqaHanSans";
  src: url("../public/font/SpoqaHanSansNeo-Regular.woff") format("woff");
  font-weight: normal;
  font-style: normal;
}

@layer base {
  :root {
    --font-pretendard: "Pretendard", sans-serif;
    --font-spoqa: "SpoqaHanSans", sans-serif;

    --border: 220 20% 30%;
    --background: 0 0% 100%;
    --foreground: 240 10% 3.9%;

    --color-primary-01: 98, 140, 245;
    --color-primary-02: 32, 29, 48;

    --color-secondary-01: 147, 176, 248;
    --color-secondary-02: 109, 231, 239;
    --color-secondary-03: 17, 188, 199;
    --color-secondary-04: 217, 223, 238;

    --color-blue-01: 249, 251, 255;
    --color-blue-02: 239, 244, 254;
    --color-blue-03: 206, 219, 252;
    --color-blue-04: 183, 202, 250;
    --color-blue-05-icon-sub: 150, 178, 248;
    --color-blue-06: 129, 163, 247;
    --color-blue-08: 89, 127, 223;
    --color-blue-09: 70, 99, 174;
    --color-blue-10: 54, 77, 135;
    --color-blue-11: 41, 59, 103;
    --color-blue-12: 28, 40, 70;

    --color-gray-white: 255, 255, 255;
    --color-gray-00: 255, 255, 255;
    --color-gray-01: 221, 221, 221;
    --color-gray-02: 183, 185, 186;
    --color-gray-03-icon-row: 149, 151, 153;
    --color-gray-04: 100, 104, 107;
    --color-gray-05-icon-high: 70, 74, 78;
    --color-gray-06: 24, 29, 34;
    --color-gray-07: 22, 26, 31;
    --color-gray-08: 17, 21, 24;
    --color-gray-09: 13, 16, 19;
    --color-gray-10: 10, 12, 14;

    --color-state-success: 50, 216, 227;
    --color-state-error: 255, 132, 132;
    --color-state-warning: 255, 198, 10;

    /* §8 Button `filledRed` hover/active는 `--color-bg-error`(70%) + `--color-state-error` 테두리; outlinedRed hover는 `--color-soft-red-light` */

    --color-bg-00: 255, 255, 255;
    --color-bg-01: 249, 249, 249;
    --color-bg-02: 230, 230, 230;
    --color-bg-03: 247, 249, 254;
    --color-bg-04: 230, 237, 255;
    --color-bg-05-des: 249, 250, 251;
    --color-bg-success: 174, 242, 246;
    --color-bg-error: 255, 185, 185;

    /* 시맨틱 텍스트 스케일: §3.9 행 이름 text-03-high 등 → 변수 --color-text-03-high → JSX 클래스 text-03-high (@layer utilities). enabled:active:text-03-high 가 올바른 형태 (map.md §4.1). */
    --color-text-00: 255, 255, 255;
    --color-text-01: 167, 167, 167;
    --color-text-02-row: 118, 118, 118;
    --color-text-03-high: 26, 26, 26;
    --color-text-04-brand: 73, 120, 235;
    --color-text-05-dark: 145, 177, 255;
    --color-text-06-secondary: 52, 47, 155;
    --color-text-07-tertiary: 130, 70, 175;
    --color-text-warning: 177, 109, 0;
    --color-text-success: 4, 147, 155;
    --color-text-error: 238, 76, 84;

    --color-line-00: rgb(245, 245, 245);
    --color-line-01: rgb(237, 237, 237);
    --color-line-02: rgb(233, 235, 248);
    --color-line-03: rgb(147, 176, 248);
    --color-line-04-dark: rgb(73, 75, 77);
    --color-line-05-focus: rgb(5, 5, 6);

    --color-soft-red: 255, 234, 234;
    --color-soft-yellow: 255, 244, 206;
    --color-soft-green: 223, 250, 251;
    --color-soft-blue: 230, 237, 255;
    --color-soft-purple: 233, 227, 250;
    --color-soft-gray-pale: 243, 244, 246;
    --color-soft-gray-light: 230, 230, 230;
    --color-soft-gray-dark: 201, 201, 201;

    /* soft-*-light: approved 40% opacity token values. */
    --color-soft-red-light: rgba(255, 234, 234, 0.4);
    --color-soft-yellow-light: rgba(255, 244, 206, 0.4);
    --color-soft-green-light: rgba(223, 250, 251, 0.4);

    --color-06-dimmed: rgba(0, 0, 0, 0.8);

    --shadow-black-01: 0 1px 1px 0 rgba(0, 0, 0, 0.031);
    --shadow-black-02:
      0 0 1px 0 rgba(0, 0, 0, 0.02), 0 2px 2px 0 rgba(0, 0, 0, 0.012),
      0 4px 3px 0 rgba(0, 0, 0, 0.012);
    --shadow-black-03:
      0 1px 2px 0 rgba(0, 0, 0, 0.02), 0 4px 4px 0 rgba(0, 0, 0, 0.02),
      0 10px 6px 0 rgba(0, 0, 0, 0.012);
    --shadow-black-04:
      0 2px 2px 0 rgba(15, 15, 15, 0.012), 0 3px 5px 0 rgba(15, 15, 15, 0.012),
      0 7px 10px 0 rgba(15, 15, 15, 0.02), 0 24px 32px 0 rgba(15, 15, 15, 0.031);
    --shadow-black-05:
      0 2px 2px 0 rgba(15, 15, 15, 0.012), 0 3px 5px 0 rgba(15, 15, 15, 0.012),
      0 7px 10px 0 rgba(15, 15, 15, 0.02),
      0 12px 16px 0 rgba(15, 15, 15, 0.031),
      0 24px 32px 0 rgba(15, 15, 15, 0.031),
      0 60px 80px 0 rgba(15, 15, 15, 0.039);
    --shadow-black-08:
      0 2px 5px 0 rgba(22, 20, 33, 0.251), 0 9px 10px 0 rgba(22, 20, 33, 0.149),
      0 20px 12px 0 rgba(22, 20, 33, 0.102),
      0 36px 14px 0 rgba(22, 20, 33, 0.059),
      0 60px 16px 0 rgba(22, 20, 33, 0.012);
    --shadow-black-09: 0 24px 40px 0 rgba(22, 20, 33, 0.502);
    --shadow-black-10:
      -24px 24px 60px -24px rgba(10, 10, 34, 0.4),
      -24px 72px 100px 0 rgba(10, 10, 34, 0.302);
    --shadow-blue-01:
      0 1px 2px 0 rgba(98, 140, 245, 0.02),
      0 4px 4px 0 rgba(98, 140, 245, 0.02),
      0 10px 10px 0 rgba(98, 140, 245, 0.012);
    --shadow-blue-02:
      -1px 4px 10px 0 rgba(98, 140, 245, 0.059),
      -1px 2px 2px 0 rgba(98, 140, 245, 0.031);
    --shadow-blue-03: -1px 5px 14px 0 rgba(98, 140, 245, 0.161);
    --shadow-blue-04:
      0 2px 2px 0 rgba(98, 140, 245, 0.02),
      0 3px 5px 0 rgba(98, 140, 245, 0.051),
      0 7px 10px 0 rgba(98, 140, 245, 0.102),
      0 24px 32px 0 rgba(98, 140, 245, 0.122);
    --shadow-blue-05:
      0 1px 3px 0 rgba(177, 197, 248, 0.6),
      0 4px 6px 0 rgba(177, 197, 248, 0.439),
      0 6px 12px 0 rgba(177, 197, 248, 0.361),
      0 12px 20px 0 rgba(177, 197, 248, 0.302),
      0 20px 40px 0 rgba(177, 197, 248, 0.259);
    --shadow-green-01:
      0 1px 2px 0 rgba(1, 215, 219, 0.02), 0 4px 4px 0 rgba(1, 215, 219, 0.02),
      0 10px 6px 0 rgba(1, 215, 219, 0.012);
    --shadow-green-02:
      -1px 4px 10px 0 rgba(1, 215, 219, 0.059),
      -1px 2px 2px 0 rgba(1, 215, 219, 0.031);
    --shadow-green-03: -1px 5px 14px 0 rgba(1, 215, 219, 0.161);
    --shadow-green-04:
      0 2px 2px 0 rgba(1, 215, 219, 0.02), 0 3px 5px 0 rgba(1, 215, 219, 0.051),
      0 7px 10px 0 rgba(1, 215, 219, 0.102),
      0 24px 32px 0 rgba(1, 215, 219, 0.122);
    --shadow-green-05:
      0 1px 3px 0 rgba(1, 215, 219, 0.6), 0 4px 6px 0 rgba(1, 215, 219, 0.078),
      0 6px 12px 0 rgba(1, 215, 219, 0.149),
      0 12px 20px 0 rgba(1, 215, 219, 0.149);
    --shadow-red-01:
      0 1px 2px 0 rgba(248, 177, 177, 0.02),
      0 4px 4px 0 rgba(248, 177, 177, 0.02),
      0 10px 6px 0 rgba(248, 177, 177, 0.012);
    --shadow-red-02:
      -1px 4px 10px 0 rgba(248, 177, 177, 0.059),
      -1px 2px 2px 0 rgba(248, 177, 177, 0.031);
    --shadow-red-03: -1px 5px 14px 0 rgba(248, 177, 177, 0.161);
    --shadow-red-04:
      0 2px 2px 0 rgba(248, 177, 177, 0.02),
      0 3px 5px 0 rgba(248, 177, 177, 0.051),
      0 7px 10px 0 rgba(248, 177, 177, 0.102),
      0 24px 32px 0 rgba(248, 177, 177, 0.122);
    --shadow-red-05:
      0 1px 3px 0 rgba(248, 177, 177, 0.149),
      0 6px 12px 0 rgba(248, 177, 177, 0.322),
      0 12px 16px 0 rgba(248, 177, 177, 0.2),
      0 20px 32px 0 rgba(248, 177, 177, 0.2);
    --shadow-yellow-01:
      0 1px 2px 0 rgba(255, 198, 10, 0.02),
      0 4px 4px 0 rgba(255, 198, 10, 0.02),
      0 10px 6px 0 rgba(255, 198, 10, 0.012);
    --shadow-yellow-02:
      -1px 4px 10px 0 rgba(255, 198, 10, 0.059),
      -1px 2px 2px 0 rgba(255, 198, 10, 0.02);
    --shadow-yellow-03: -1px 5px 14px 0 rgba(255, 198, 10, 0.149);
    --shadow-yellow-04:
      0 2px 2px 0 rgba(255, 198, 10, 0.02),
      0 3px 5px 0 rgba(255, 198, 10, 0.051),
      0 7px 10px 0 rgba(255, 198, 10, 0.078),
      0 24px 32px 0 rgba(255, 198, 10, 0.102);
    --shadow-yellow-05:
      0 1px 3px 0 rgba(255, 198, 10, 0.102),
      0 6px 12px 0 rgba(255, 198, 10, 0.149),
      0 12px 16px 0 rgba(255, 198, 10, 0.149),
      0 20px 32px 0 rgba(255, 198, 10, 0.149);

    --backdrop-filter-none: none;
    --backdrop-filter-20: blur(1.25rem);
    --backdrop-filter-40: blur(2.5rem);

    --border-radius-default: 0.625rem;
    --border-radius-xl: 1rem;
    --border-radius-lg: 0.75rem;
    --border-radius-md: 0.625rem;
    --border-radius-sm: 0.5rem;
    --border-radius-button-large: 0.75rem;
    --border-radius-button-medium: 0.625rem;
    --border-radius-button-small: 0.5rem;
    --border-radius-input: 0.75rem;
    --border-radius-modal: var(--border-radius-frame-20);
    --border-radius-frame-60: 3.75rem;
    --border-radius-frame-48: 3rem;
    --border-radius-frame-24: 1.5rem;
    --border-radius-frame-20: 1.25rem;
    --border-radius-frame-16: 1rem;
    --border-radius-frame-10: 0.625rem;
    --border-radius-frame-12: 0.75rem;
    --border-radius-frame-8: 0.5rem;
    --border-radius-frame-4: 0.25rem;

    --border-width-0: 0 0.0625rem 0 0.0625rem rgba(0, 0, 0, 0.03);
    --border-width-1: 0.0625rem;
    --border-width-2: 0.125rem;
    --border-width-4: 0.25rem;
    --border-width-8: 0.5rem;
    --border-width-default: 0.0625rem;

    --sidebar-background: 0 0% 98%;
    --sidebar-foreground: 240 5.3% 26.1%;
    --sidebar-primary: 240 5.9% 10%;
    --sidebar-primary-foreground: 0 0% 98%;
    --sidebar-accent: 240 4.8% 95.9%;
    --sidebar-accent-foreground: 240 5.9% 10%;
    --sidebar-border: 220 13% 91%;
    --sidebar-ring: 217.2 91.2% 59.8%;
  }

  /*
   * Dark theme: §3 tokens + sidebar (design.md). Light lives in `:root` only.
   * Use `:root.dark, .dark` so `html.dark` (next-themes) and subtree `.dark` both swap variables.
   */
  :root.dark,
  .dark {
    --background: 249.5 24.7% 15.1%;
    --foreground: 0 0% 100%;

    --sidebar-background: 240 5.9% 10%;
    --sidebar-foreground: 240 4.8% 95.9%;
    --sidebar-primary: 224.3 76.3% 48%;
    --sidebar-primary-foreground: 0 0% 100%;
    --sidebar-accent: 240 3.7% 15.9%;
    --sidebar-accent-foreground: 240 4.8% 95.9%;
    --sidebar-border: 240 3.7% 15.9%;
    --sidebar-ring: 217.2 91.2% 59.8%;

    --color-primary-01: 126, 162, 255;
    --color-primary-02: 21, 19, 32;

    --color-secondary-01: 168, 190, 255;
    --color-secondary-02: 123, 239, 245;
    --color-secondary-03: 38, 214, 224;
    --color-secondary-04: 58, 67, 88;

    --color-blue-01: 28, 40, 70;
    --color-blue-02: 41, 59, 103;
    --color-blue-03: 54, 77, 135;
    --color-blue-04: 70, 99, 174;
    --color-blue-05-icon-sub: 89, 127, 223;
    --color-blue-06: 129, 163, 247;
    --color-blue-08: 150, 178, 248;
    --color-blue-09: 183, 202, 250;
    --color-blue-10: 206, 219, 252;
    --color-blue-11: 239, 244, 254;
    --color-blue-12: 249, 251, 255;

    --color-gray-00: 23, 27, 41;
    --color-gray-01: 27, 32, 48;
    --color-gray-02: 38, 43, 59;
    --color-gray-03-icon-row: 47, 52, 69;
    --color-gray-04: 62, 68, 87;
    --color-gray-05-icon-high: 85, 91, 112;
    --color-gray-06: 110, 116, 137;
    --color-gray-07: 144, 149, 168;
    --color-gray-08: 182, 186, 200;
    --color-gray-09: 216, 219, 229;
    --color-gray-10: 243, 244, 248;
    --color-gray-white: 250, 250, 250;

    --color-state-success: 77, 227, 234;
    --color-state-error: 255, 143, 143;
    --color-state-warning: 255, 210, 74;

    --color-bg-00: 32, 29, 48;
    --color-bg-01: 38, 35, 56;
    --color-bg-02: 44, 41, 64;
    --color-bg-03: 50, 48, 74;
    --color-bg-04: 59, 58, 88;
    --color-bg-05-des: 36, 33, 47;
    --color-bg-success: 24, 55, 58;
    --color-bg-error: 64, 38, 41;

    --color-text-00: 245, 247, 250;
    --color-text-01: 139, 146, 154;
    --color-text-02-row: 167, 173, 181;
    --color-text-03-high: 250, 250, 250;
    --color-text-04-brand: 125, 164, 255;
    --color-text-05-dark: 183, 204, 255;
    --color-text-06-secondary: 123, 116, 242;
    --color-text-07-tertiary: 192, 143, 255;
    --color-text-warning: 255, 211, 90;
    --color-text-success: 91, 231, 238;
    --color-text-error: 255, 155, 159;

    --color-line-00: rgba(237, 237, 237, 0.08);
    --color-line-01: rgba(237, 237, 237, 0.2);
    --color-line-02: rgba(58, 70, 112, 1);
    --color-line-03: rgba(126, 162, 255, 1);
    --color-line-04-dark: rgba(140, 145, 152, 0.8);
    --color-line-05-focus: rgba(255, 255, 255, 0.7);

    --color-soft-red: 64, 38, 41;
    --color-soft-yellow: 64, 54, 26;
    --color-soft-green: 24, 55, 58;
    --color-soft-blue: 31, 46, 82;
    --color-soft-purple: 57, 48, 84;
    --color-soft-gray-pale: 27, 31, 36;
    --color-soft-gray-light: 43, 48, 53;
    --color-soft-gray-dark: 75, 80, 87;

    --color-soft-red-light: rgba(64, 38, 41, 0.4);
    --color-soft-yellow-light: rgba(64, 54, 26, 0.4);
    --color-soft-green-light: rgba(24, 55, 58, 0.4);

    --color-06-dimmed: rgba(0, 0, 0, 0.8);

    /* §3 Shadow (tint refs) — dark stacks; see design.md §3 Shadow + §7 */
    --shadow-black-01: 0 1px 1px 0 rgba(0, 0, 0, 0.1);
    --shadow-black-02:
      0 0 1px 0 rgba(0, 0, 0, 0.08), 0 2px 2px 0 rgba(0, 0, 0, 0.06),
      0 4px 3px 0 rgba(0, 0, 0, 0.06);
    --shadow-black-03:
      0 1px 2px 0 rgba(0, 0, 0, 0.09), 0 4px 4px 0 rgba(0, 0, 0, 0.08),
      0 10px 6px 0 rgba(0, 0, 0, 0.06);
    --shadow-black-04:
      0 2px 2px 0 rgba(0, 0, 0, 0.1), 0 3px 5px 0 rgba(0, 0, 0, 0.12),
      0 7px 10px 0 rgba(0, 0, 0, 0.16), 0 24px 32px 0 rgba(0, 0, 0, 0.2);
    --shadow-black-05:
      0 2px 2px 0 rgba(0, 0, 0, 0.12), 0 3px 5px 0 rgba(0, 0, 0, 0.14),
      0 7px 10px 0 rgba(0, 0, 0, 0.18), 0 12px 16px 0 rgba(0, 0, 0, 0.22),
      0 24px 32px 0 rgba(0, 0, 0, 0.24), 0 60px 80px 0 rgba(0, 0, 0, 0.28);
    --shadow-black-08:
      0 2px 5px 0 rgba(22, 20, 33, 0.42), 0 9px 10px 0 rgba(22, 20, 33, 0.35),
      0 20px 12px 0 rgba(22, 20, 33, 0.28), 0 36px 14px 0 rgba(22, 20, 33, 0.2),
      0 60px 16px 0 rgba(22, 20, 33, 0.12);
    --shadow-black-09: 0 24px 40px 0 rgba(22, 20, 33, 0.55);
    --shadow-black-10:
      -24px 24px 60px -24px rgba(10, 10, 34, 0.55),
      -24px 72px 100px 0 rgba(10, 10, 34, 0.4);
    --shadow-blue-01:
      0 1px 2px 0 rgba(98, 140, 245, 0.06),
      0 4px 4px 0 rgba(98, 140, 245, 0.06),
      0 10px 10px 0 rgba(98, 140, 245, 0.04);
    --shadow-blue-02:
      -1px 4px 10px 0 rgba(98, 140, 245, 0.12),
      -1px 2px 2px 0 rgba(98, 140, 245, 0.08);
    --shadow-blue-03: -1px 5px 14px 0 rgba(98, 140, 245, 0.22);
    --shadow-blue-04:
      0 2px 2px 0 rgba(98, 140, 245, 0.06), 0 3px 5px 0 rgba(98, 140, 245, 0.1),
      0 7px 10px 0 rgba(98, 140, 245, 0.18),
      0 24px 32px 0 rgba(98, 140, 245, 0.2);
    --shadow-blue-05:
      0 1px 3px 0 rgba(98, 140, 245, 0.35),
      0 4px 6px 0 rgba(98, 140, 245, 0.28),
      0 6px 12px 0 rgba(98, 140, 245, 0.25),
      0 12px 20px 0 rgba(98, 140, 245, 0.2),
      0 20px 40px 0 rgba(98, 140, 245, 0.18);
    --shadow-green-01:
      0 1px 2px 0 rgba(1, 215, 219, 0.06), 0 4px 4px 0 rgba(1, 215, 219, 0.06),
      0 10px 6px 0 rgba(1, 215, 219, 0.04);
    --shadow-green-02:
      -1px 4px 10px 0 rgba(1, 215, 219, 0.12),
      -1px 2px 2px 0 rgba(1, 215, 219, 0.08);
    --shadow-green-03: -1px 5px 14px 0 rgba(1, 215, 219, 0.22);
    --shadow-green-04:
      0 2px 2px 0 rgba(1, 215, 219, 0.06), 0 3px 5px 0 rgba(1, 215, 219, 0.1),
      0 7px 10px 0 rgba(1, 215, 219, 0.15),
      0 24px 32px 0 rgba(1, 215, 219, 0.18);
    --shadow-green-05:
      0 1px 3px 0 rgba(1, 215, 219, 0.25), 0 4px 6px 0 rgba(1, 215, 219, 0.15),
      0 6px 12px 0 rgba(1, 215, 219, 0.18),
      0 12px 20px 0 rgba(1, 215, 219, 0.16);
    --shadow-red-01:
      0 1px 2px 0 rgba(248, 177, 177, 0.06),
      0 4px 4px 0 rgba(248, 177, 177, 0.06),
      0 10px 6px 0 rgba(248, 177, 177, 0.04);
    --shadow-red-02:
      -1px 4px 10px 0 rgba(248, 177, 177, 0.12),
      -1px 2px 2px 0 rgba(248, 177, 177, 0.08);
    --shadow-red-03: -1px 5px 14px 0 rgba(248, 177, 177, 0.22);
    --shadow-red-04:
      0 2px 2px 0 rgba(248, 177, 177, 0.06),
      0 3px 5px 0 rgba(248, 177, 177, 0.1),
      0 7px 10px 0 rgba(248, 177, 177, 0.15),
      0 24px 32px 0 rgba(248, 177, 177, 0.18);
    --shadow-red-05:
      0 1px 3px 0 rgba(248, 177, 177, 0.2),
      0 6px 12px 0 rgba(248, 177, 177, 0.25),
      0 12px 16px 0 rgba(248, 177, 177, 0.18),
      0 20px 32px 0 rgba(248, 177, 177, 0.18);
    --shadow-yellow-01:
      0 1px 2px 0 rgba(255, 198, 10, 0.06),
      0 4px 4px 0 rgba(255, 198, 10, 0.06),
      0 10px 6px 0 rgba(255, 198, 10, 0.04);
    --shadow-yellow-02:
      -1px 4px 10px 0 rgba(255, 198, 10, 0.12),
      -1px 2px 2px 0 rgba(255, 198, 10, 0.08);
    --shadow-yellow-03: -1px 5px 14px 0 rgba(255, 198, 10, 0.18);
    --shadow-yellow-04:
      0 2px 2px 0 rgba(255, 198, 10, 0.06), 0 3px 5px 0 rgba(255, 198, 10, 0.1),
      0 7px 10px 0 rgba(255, 198, 10, 0.12),
      0 24px 32px 0 rgba(255, 198, 10, 0.14);
    --shadow-yellow-05:
      0 1px 3px 0 rgba(255, 198, 10, 0.15),
      0 6px 12px 0 rgba(255, 198, 10, 0.18),
      0 12px 16px 0 rgba(255, 198, 10, 0.16),
      0 20px 32px 0 rgba(255, 198, 10, 0.16);
  }
}

/* Additional Reset CSS */

/* Remove arrows from input type='number' */
/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type="number"] {
  -moz-appearance: textfield;
}

input:focus {
  outline: none;
}

/* Scrollbar Styling */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
  background: transparent;
}

::-webkit-scrollbar-track {
  background: transparent;
  border: none;
}

::-webkit-scrollbar-thumb {
  background-color: #ccc;
  border: none;
  border-radius: 6px;
}

@layer components {
  .primary-underline {
    @apply cursor-pointer underline underline-offset-4;
    color: rgb(var(--color-text-04-brand));
  }

  .custom-underline {
    @apply underline decoration-dotted underline-offset-4;
  }
}

/* Tailwind CSS Animate - Built-in utilities in v4 */
@layer utilities {
  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }

  @keyframes ping {
    75%,
    100% {
      transform: scale(2);
      opacity: 0;
    }
  }

  @keyframes pulse {
    50% {
      opacity: 0.5;
    }
  }

  @keyframes bounce {
    0%,
    100% {
      transform: translateY(-25%);
      animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
    }
    50% {
      transform: none;
      animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
    }
  }

  .animate-spin {
    animation: spin 1s linear infinite;
  }

  .animate-ping {
    animation: ping 1s cubic-bezier(0, 0, 0.2, 1) infinite;
  }

  .animate-pulse {
    animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  }

  .animate-bounce {
    animation: bounce 1s infinite;
  }
}

/* Utility classes for custom fonts */
@layer utilities {
  .font-pretendard {
    font-family: var(--font-pretendard);
  }

  .font-spoqa {
    font-family: var(--font-spoqa);
  }
}

/* =============================================================================
 * CANONICAL SEMANTIC UTILITY CLASSES — Figma Domain-First Architecture
 * Token class name = Figma semantic domain name (no property prefix added).
 * CSS property is derived from domain intent, not from a Tailwind prefix.
 * DO NOT add utility prefixes (bg-*, text-*, border-*) to semantic domains.
 * See: docs/semantic-architecture/semantic-naming-rules.md
 * ============================================================================= */
@layer utilities {
  /* primary domain → fill/background intent */
  .primary-01 {
    background-color: rgb(var(--color-primary-01));
  }
  .primary-02 {
    background-color: rgb(var(--color-primary-02));
  }

  /* secondary domain → brand accent/foreground intent */
  .secondary-01 {
    color: rgb(var(--color-secondary-01));
  }
  .secondary-02 {
    color: rgb(var(--color-secondary-02));
  }
  .secondary-03 {
    color: rgb(var(--color-secondary-03));
  }
  .secondary-04 {
    color: rgb(var(--color-secondary-04));
  }

  /* state domain → indicator background intent */
  .state-success {
    background-color: rgb(var(--color-state-success));
  }
  .state-error {
    background-color: rgb(var(--color-state-error));
  }
  .state-warning {
    background-color: rgb(var(--color-state-warning));
  }

  /* bg domain → surface background intent (domain prefix encodes property) */
  .bg-00 {
    background-color: rgb(var(--color-bg-00));
  }
  .bg-01 {
    background-color: rgb(var(--color-bg-01));
  }
  .bg-02 {
    background-color: rgb(var(--color-bg-02));
  }
  .bg-03 {
    background-color: rgb(var(--color-bg-03));
  }
  .bg-04 {
    background-color: rgb(var(--color-bg-04));
  }
  .bg-05-des {
    background-color: rgb(var(--color-bg-05-des));
  }
  .bg-success {
    background-color: rgb(var(--color-bg-success));
  }
  .bg-error {
    background-color: rgb(var(--color-bg-error));
  }
  /* special — opacity modifier: cannot be expressed via @theme inline */
  .bg-error-70 {
    background-color: rgb(var(--color-bg-error) / 0.7);
  }
  /* special — color-mix value: cannot be expressed via @theme inline */
  .soft-red-light {
    background-color: var(--color-soft-red-light);
  }
  .soft-yellow-light {
    background-color: var(--color-soft-yellow-light);
  }
  .soft-green-light {
    background-color: var(--color-soft-green-light);
  }

  /* soft domain → surface background intent (single-prefix canonical) */
  .soft-red {
    background-color: rgb(var(--color-soft-red));
  }
  .soft-yellow {
    background-color: rgb(var(--color-soft-yellow));
  }
  .soft-green {
    background-color: rgb(var(--color-soft-green));
  }
  .soft-blue {
    background-color: rgb(var(--color-soft-blue));
  }
  .soft-purple {
    background-color: rgb(var(--color-soft-purple));
  }
  .soft-gray-pale {
    background-color: rgb(var(--color-soft-gray-pale));
  }
  .soft-gray-light {
    background-color: rgb(var(--color-soft-gray-light));
  }
  .soft-gray-dark {
    background-color: rgb(var(--color-soft-gray-dark));
  }

  /* line domain → unified semantic token across line-related CSS color slots */
  .line-00 {
    color: var(--color-line-00);
    background-color: var(--color-line-00);
    border-color: var(--color-line-00);
    caret-color: var(--color-line-00);
  }
  .line-01 {
    color: var(--color-line-01);
    background-color: var(--color-line-01);
    border-color: var(--color-line-01);
    caret-color: var(--color-line-01);
  }
  .line-02 {
    color: var(--color-line-02);
    background-color: var(--color-line-02);
    border-color: var(--color-line-02);
    caret-color: var(--color-line-02);
  }
  .line-03 {
    color: var(--color-line-03);
    background-color: var(--color-line-03);
    border-color: var(--color-line-03);
    caret-color: var(--color-line-03);
  }
  .line-04-dark {
    color: var(--color-line-04-dark);
    background-color: var(--color-line-04-dark);
    border-color: var(--color-line-04-dark);
    caret-color: var(--color-line-04-dark);
  }
  .line-05-focus {
    color: var(--color-line-05-focus);
    background-color: var(--color-line-05-focus);
    border-color: var(--color-line-05-focus);
    caret-color: var(--color-line-05-focus);
  }

  /* text domain → color intent (domain prefix encodes property) */
  .text-00 {
    color: rgb(var(--color-text-00));
  }
  .text-01 {
    color: rgb(var(--color-text-01));
  }
  .text-02-row {
    color: rgb(var(--color-text-02-row));
  }
  .text-03-high {
    color: rgb(var(--color-text-03-high));
  }
  .text-04-brand {
    color: rgb(var(--color-text-04-brand));
  }
  .text-05-dark {
    color: rgb(var(--color-text-05-dark));
  }
  .text-06-secondary {
    color: rgb(var(--color-text-06-secondary));
  }
  .text-07-tertiary {
    color: rgb(var(--color-text-07-tertiary));
  }
  .text-warning {
    color: rgb(var(--color-text-warning));
  }
  .text-success {
    color: rgb(var(--color-text-success));
  }
  .text-error {
    color: rgb(var(--color-text-error));
  }

  .rounded-button-large {
    border-radius: var(--border-radius-button-large);
  }
  .rounded-button-medium {
    border-radius: var(--border-radius-button-medium);
  }
  .rounded-button-small {
    border-radius: var(--border-radius-button-small);
  }
  .rounded-input {
    border-radius: var(--border-radius-input);
  }
  .rounded-modal {
    border-radius: var(--border-radius-modal);
  }
  .rounded-frame-60 {
    border-radius: var(--border-radius-frame-60);
  }
  .rounded-frame-48 {
    border-radius: var(--border-radius-frame-48);
  }
  .rounded-frame-24 {
    border-radius: var(--border-radius-frame-24);
  }
  .rounded-frame-20 {
    border-radius: var(--border-radius-frame-20);
  }
  .rounded-frame-16 {
    border-radius: var(--border-radius-frame-16);
  }
  .rounded-frame-10 {
    border-radius: var(--border-radius-frame-10);
  }
  .rounded-frame-12 {
    border-radius: var(--border-radius-frame-12);
  }
  .rounded-frame-8 {
    border-radius: var(--border-radius-frame-8);
  }
  .rounded-frame-4 {
    border-radius: var(--border-radius-frame-4);
  }

  .shadow-black-01 {
    box-shadow: var(--shadow-black-01);
  }
  .shadow-black-02 {
    box-shadow: var(--shadow-black-02);
  }
  .shadow-black-03 {
    box-shadow: var(--shadow-black-03);
  }
  .shadow-black-04 {
    box-shadow: var(--shadow-black-04);
  }
  .shadow-black-05 {
    box-shadow: var(--shadow-black-05);
  }
  .shadow-black-08 {
    box-shadow: var(--shadow-black-08);
  }
  .shadow-blue-01 {
    box-shadow: var(--shadow-blue-01);
  }
  .shadow-blue-02 {
    box-shadow: var(--shadow-blue-02);
  }
  .shadow-blue-03 {
    box-shadow: var(--shadow-blue-03);
  }
  .shadow-blue-04 {
    box-shadow: var(--shadow-blue-04);
  }
  .shadow-blue-05 {
    box-shadow: var(--shadow-blue-05);
  }
  .shadow-green-05 {
    box-shadow: var(--shadow-green-05);
  }
  .shadow-red-03 {
    box-shadow: var(--shadow-red-03);
  }
  .shadow-red-05 {
    box-shadow: var(--shadow-red-05);
  }
  .shadow-none {
    box-shadow: none;
  }

  .backdrop-none {
    backdrop-filter: var(--backdrop-filter-none);
  }
  .backdrop-20 {
    backdrop-filter: var(--backdrop-filter-20);
  }
  .backdrop-40 {
    backdrop-filter: var(--backdrop-filter-40);
  }
}

@theme {
  --text-12: 12px;
  --text-13: 13px;
  --text-14: 14px;
  --text-16: 16px;
  --text-18: 18px;
  --text-20: 20px;
  --text-24: 24px;
  --text-28: 28px;
  --text-32: 32px;
  --text-36: 36px;
  --text-40: 40px;
  --text-48: 48px;
  --text-72: 72px;
  --text-120: 120px;

  --font-weight-regular: 400;
  --font-weight-medium: 500;
  --font-weight-semibold: 600;
  --font-weight-bold: 700;

  --tracking-tight-03: -0.3px;
  --tracking-tight-05: -0.5px;
  --tracking-tight-1: -1px;
  --tracking-tight-13: -1.3px;
  --tracking-tight-15: -1.5px;
  --tracking-tight-2: -2px;
  --tracking-tight-3: -3px;
  --tracking-tight-4: -4px;
}

@theme inline {
  --color-primary-01: rgb(var(--color-primary-01));
  --color-primary-02: rgb(var(--color-primary-02));

  --color-secondary-01: rgb(var(--color-secondary-01));
  --color-secondary-02: rgb(var(--color-secondary-02));
  --color-secondary-03: rgb(var(--color-secondary-03));
  --color-secondary-04: rgb(var(--color-secondary-04));

  --color-blue-01: rgb(var(--color-blue-01));
  --color-blue-02: rgb(var(--color-blue-02));
  --color-blue-03: rgb(var(--color-blue-03));
  --color-blue-04: rgb(var(--color-blue-04));
  --color-blue-05-icon-sub: rgb(var(--color-blue-05-icon-sub));
  --color-blue-06: rgb(var(--color-blue-06));
  --color-blue-08: rgb(var(--color-blue-08));
  --color-blue-09: rgb(var(--color-blue-09));
  --color-blue-10: rgb(var(--color-blue-10));
  --color-blue-11: rgb(var(--color-blue-11));
  --color-blue-12: rgb(var(--color-blue-12));

  --color-gray-white: rgb(var(--color-gray-white));
  --color-gray-00: rgb(var(--color-gray-00));
  --color-gray-01: rgb(var(--color-gray-01));
  --color-gray-02: rgb(var(--color-gray-02));
  --color-gray-03-icon-row: rgb(var(--color-gray-03-icon-row));
  --color-gray-04: rgb(var(--color-gray-04));
  --color-gray-05-icon-high: rgb(var(--color-gray-05-icon-high));
  --color-gray-06: rgb(var(--color-gray-06));
  --color-gray-07: rgb(var(--color-gray-07));
  --color-gray-08: rgb(var(--color-gray-08));
  --color-gray-09: rgb(var(--color-gray-09));
  --color-gray-10: rgb(var(--color-gray-10));

  --color-state-success: rgb(var(--color-state-success));
  --color-state-error: rgb(var(--color-state-error));
  --color-state-warning: rgb(var(--color-state-warning));

  --color-bg-00: rgb(var(--color-bg-00));
  --color-bg-01: rgb(var(--color-bg-01));
  --color-bg-02: rgb(var(--color-bg-02));
  --color-bg-03: rgb(var(--color-bg-03));
  --color-bg-04: rgb(var(--color-bg-04));
  /* bg-05-des: `@layer utilities` 의 `.bg-05-des` 전용 (`bg-bg-05-des` 같은 테마 유틸은 생성하지 않음) */
  --color-bg-success: rgb(var(--color-bg-success));
  --color-bg-error: rgb(var(--color-bg-error));

  /* 시맨틱 text-* 스케일: rgb 브리지 → `text-*` 클래스 (design §3.9 · map §4.1). */
  --color-text-00: rgb(var(--color-text-00));
  --color-text-01: rgb(var(--color-text-01));
  --color-text-02-row: rgb(var(--color-text-02-row));
  --color-text-03-high: rgb(var(--color-text-03-high));
  --color-text-04-brand: rgb(var(--color-text-04-brand));
  --color-text-05-dark: rgb(var(--color-text-05-dark));
  --color-text-06-secondary: rgb(var(--color-text-06-secondary));
  --color-text-07-tertiary: rgb(var(--color-text-07-tertiary));
  --color-text-warning: rgb(var(--color-text-warning));
  --color-text-success: rgb(var(--color-text-success));
  --color-text-error: rgb(var(--color-text-error));

  --color-line-00: var(--color-line-00);
  --color-line-01: var(--color-line-01);
  --color-line-02: var(--color-line-02);
  --color-line-03: var(--color-line-03);
  --color-line-04-dark: var(--color-line-04-dark);
  --color-line-05-focus: var(--color-line-05-focus);

  --color-soft-red: rgb(var(--color-soft-red));
  --color-soft-yellow: rgb(var(--color-soft-yellow));
  --color-soft-green: rgb(var(--color-soft-green));
  --color-soft-blue: rgb(var(--color-soft-blue));
  --color-soft-purple: rgb(var(--color-soft-purple));
  --color-soft-gray-pale: rgb(var(--color-soft-gray-pale));
  --color-soft-gray-light: rgb(var(--color-soft-gray-light));
  --color-soft-gray-dark: rgb(var(--color-soft-gray-dark));

  /* soft-*-light: 실값은 `:root`/다크의 `--color-soft-*-light`; 여기서는 Tailwind 테마 브리지만 수행 */
  --color-soft-red-light: var(--color-soft-red-light);
  --color-soft-yellow-light: var(--color-soft-yellow-light);
  --color-soft-green-light: var(--color-soft-green-light);

  --color-06-dimmed: var(--color-06-dimmed);

  --shadow-black-01: var(--shadow-black-01);
  --shadow-black-02: var(--shadow-black-02);
  --shadow-black-03: var(--shadow-black-03);
  --shadow-black-04: var(--shadow-black-04);
  --shadow-black-05: var(--shadow-black-05);
  --shadow-black-08: var(--shadow-black-08);
  --shadow-black-09: var(--shadow-black-09);
  --shadow-black-10: var(--shadow-black-10);
  --shadow-blue-01: var(--shadow-blue-01);
  --shadow-blue-02: var(--shadow-blue-02);
  --shadow-blue-03: var(--shadow-blue-03);
  --shadow-blue-04: var(--shadow-blue-04);
  --shadow-blue-05: var(--shadow-blue-05);
  --shadow-green-01: var(--shadow-green-01);
  --shadow-green-02: var(--shadow-green-02);
  --shadow-green-03: var(--shadow-green-03);
  --shadow-green-04: var(--shadow-green-04);
  --shadow-green-05: var(--shadow-green-05);
  --shadow-red-01: var(--shadow-red-01);
  --shadow-red-02: var(--shadow-red-02);
  --shadow-red-03: var(--shadow-red-03);
  --shadow-red-04: var(--shadow-red-04);
  --shadow-red-05: var(--shadow-red-05);
  --shadow-yellow-01: var(--shadow-yellow-01);
  --shadow-yellow-02: var(--shadow-yellow-02);
  --shadow-yellow-03: var(--shadow-yellow-03);
  --shadow-yellow-04: var(--shadow-yellow-04);
  --shadow-yellow-05: var(--shadow-yellow-05);

  --radius-button-large: var(--border-radius-button-large);
  --radius-button-medium: var(--border-radius-button-medium);
  --radius-button-small: var(--border-radius-button-small);
  --radius-input: var(--border-radius-input);
  --radius-modal: var(--border-radius-modal);
  --radius-frame-4: var(--border-radius-frame-4);
  --radius-frame-8: var(--border-radius-frame-8);
  --radius-frame-10: var(--border-radius-frame-10);
  --radius-frame-12: var(--border-radius-frame-12);
  --radius-frame-16: var(--border-radius-frame-16);
  --radius-frame-20: var(--border-radius-frame-20);
  --radius-frame-24: var(--border-radius-frame-24);
  --radius-frame-48: var(--border-radius-frame-48);
  --radius-frame-60: var(--border-radius-frame-60);
}
```

## Source File: components/alert-dialog.tsx

```tsx
"use client";

import * as React from "react";
import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog";

import { cn } from "@workspace/ui/utils";
import { buttonVariants } from "@workspace/ui/components/button";

const AlertDialogRoot = AlertDialogPrimitive.Root;

const AlertDialogTrigger = AlertDialogPrimitive.Trigger;

const AlertDialogPortal = AlertDialogPrimitive.Portal;

const AlertDialogOverlay = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Overlay
    className={cn(
      "fixed inset-0 z-50 bg-06-dimmed data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className,
    )}
    {...props}
    ref={ref}
  />
));
AlertDialogOverlay.displayName = AlertDialogPrimitive.Overlay.displayName;

const AlertDialogContent = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Content>
>(({ className, ...props }, ref) => (
  <AlertDialogPortal>
    <AlertDialogOverlay />
    <AlertDialogPrimitive.Content
      ref={ref}
      className={cn(
        "fixed left-[50%] top-[50%] z-50 grid w-full translate-x-[-50%] translate-y-[-50%] border line-01 bg-00 p-6 shadow-black-04 duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-modal",
        className,
      )}
      {...props}
    />
  </AlertDialogPortal>
));
AlertDialogContent.displayName = AlertDialogPrimitive.Content.displayName;

const AlertDialogHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col space-y-2 text-center sm:text-left",
      className,
    )}
    {...props}
  />
);
AlertDialogHeader.displayName = "AlertDialogHeader";

const AlertDialogFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
      className,
    )}
    {...props}
  />
);
AlertDialogFooter.displayName = "AlertDialogFooter";

const AlertDialogTitle = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Title
    ref={ref}
    className={cn("text-lg font-semibold text-03-high", className)}
    {...props}
  />
));
AlertDialogTitle.displayName = AlertDialogPrimitive.Title.displayName;

const AlertDialogDescription = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Description
    ref={ref}
    className={cn("text-02-row text-sm", className)}
    {...props}
  />
));
AlertDialogDescription.displayName =
  AlertDialogPrimitive.Description.displayName;

const AlertDialogAction = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Action>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Action>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Action
    ref={ref}
    className={cn(buttonVariants(), className)}
    {...props}
  />
));
AlertDialogAction.displayName = AlertDialogPrimitive.Action.displayName;

const AlertDialogCancel = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Cancel>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Cancel>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Cancel
    ref={ref}
    className={cn(
      buttonVariants({ variant: "text" }),
      "mt-2 sm:mt-0",
      className,
    )}
    {...props}
  />
));
AlertDialogCancel.displayName = AlertDialogPrimitive.Cancel.displayName;

export const AlertDialog = Object.assign(AlertDialogRoot, {
  Portal: AlertDialogPortal,
  Overlay: AlertDialogOverlay,
  Trigger: AlertDialogTrigger,
  Content: AlertDialogContent,
  Header: AlertDialogHeader,
  Footer: AlertDialogFooter,
  Title: AlertDialogTitle,
  Description: AlertDialogDescription,
  Action: AlertDialogAction,
  Cancel: AlertDialogCancel,
});
```

## Source File: components/breadcrumb.tsx

```tsx
import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { ChevronRight, MoreHorizontal } from "lucide-react";
import { cn } from "../utils";

const Breadcrumb = React.forwardRef<
  HTMLElement,
  React.ComponentPropsWithoutRef<"nav"> & {
    separator?: React.ReactNode;
  }
>(({ ...props }, ref) => <nav ref={ref} aria-label="breadcrumb" {...props} />);
Breadcrumb.displayName = "Breadcrumb";

const BreadcrumbList = React.forwardRef<
  HTMLOListElement,
  React.ComponentPropsWithoutRef<"ol">
>(({ className, ...props }, ref) => (
  <ol
    ref={ref}
    className={cn(
      "text-02-row flex flex-wrap items-center gap-1.5 break-words text-sm sm:gap-2.5",
      className,
    )}
    {...props}
  />
));
BreadcrumbList.displayName = "BreadcrumbList";

const BreadcrumbItem = React.forwardRef<
  HTMLLIElement,
  React.ComponentPropsWithoutRef<"li">
>(({ className, ...props }, ref) => (
  <li
    ref={ref}
    className={cn("inline-flex items-center gap-1.5", className)}
    {...props}
  />
));
BreadcrumbItem.displayName = "BreadcrumbItem";

const BreadcrumbLink = React.forwardRef<
  HTMLAnchorElement,
  React.ComponentPropsWithoutRef<"a"> & {
    asChild?: boolean;
  }
>(({ asChild, className, ...props }, ref) => {
  const Comp = asChild ? Slot : "a";

  return (
    <Comp
      ref={ref}
      className={cn("transition-colors hover:text-04-brand", className)}
      {...props}
    />
  );
});
BreadcrumbLink.displayName = "BreadcrumbLink";

const BreadcrumbPage = React.forwardRef<
  HTMLSpanElement,
  React.ComponentPropsWithoutRef<"span">
>(({ className, ...props }, ref) => (
  <span
    ref={ref}
    role="link"
    aria-disabled="true"
    aria-current="page"
    className={cn("font-normal text-03-high", className)}
    {...props}
  />
));
BreadcrumbPage.displayName = "BreadcrumbPage";

const BreadcrumbSeparator = ({
  children,
  className,
  ...props
}: React.ComponentProps<"li">) => (
  <li
    role="presentation"
    aria-hidden="true"
    className={cn("[&>svg]:h-3.5 [&>svg]:w-3.5", className)}
    {...props}
  >
    {children ?? <ChevronRight />}
  </li>
);
BreadcrumbSeparator.displayName = "BreadcrumbSeparator";

const BreadcrumbEllipsis = ({
  className,
  ...props
}: React.ComponentProps<"span">) => (
  <span
    role="presentation"
    aria-hidden="true"
    className={cn("flex h-9 w-9 items-center justify-center", className)}
    {...props}
  >
    <MoreHorizontal className="h-4 w-4" />
    <span className="sr-only">More</span>
  </span>
);
BreadcrumbEllipsis.displayName = "BreadcrumbElipssis";

export {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
};
```

## Source File: components/button.tsx

```tsx
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@workspace/ui/utils";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

type ButtonVariant = "filled" | "outlined" | "text";
type ButtonColor = "primary" | "secondary" | "danger";
type ButtonSize = "L" | "M" | "S";
type ButtonIconType = "none" | "leading" | "trailing" | "only";

const BUTTON_SIZES = {
  L: "rounded-lg px-[28px] py-[16px] text-[18px] font-medium [&_svg]:w-[24px] [&_svg]:h-[24px]",
  M: "rounded-md px-[12px] py-[8px] text-[16px] font-medium [&_svg]:w-[20px] [&_svg]:h-[20px]",
  S: "rounded-sm px-[8px] py-[4px] text-[14px] font-medium [&_svg]:w-[16px] [&_svg]:h-[16px]",
} as const;

const buttonVariants = cva(
  "inline-flex h-[48px] items-center justify-center gap-[2px] whitespace-nowrap transition-all duration-200 [&_svg]:pointer-events-none [&_svg]:shrink-0 disabled:bg-02 disabled:text-03-high disabled:[&_svg]:text-gray-03-icon-row disabled:cursor-not-allowed data-[loading=true]:cursor-not-allowed",
  {
    variants: {
      variant: {
        filled: "",
        outlined: "",
        text: "",
      },
      color: {
        primary: "",
        secondary: "",
        danger: "",
      },
      iconType: {
        none: "",
        leading: "",
        trailing: "",
        only: "aspect-square px-0 py-0 rounded-full [&_svg]:w-full [&_svg]:h-full",
      },
      loading: {
        true: "cursor-not-allowed",
        false: "",
      },
      size: BUTTON_SIZES,
    },
    compoundVariants: [
      // filled + primary (구: filled)
      {
        variant: "filled",
        color: "primary",
        className:
          "primary-01 text-00 [&_svg]:text-00 [&:not(:disabled):hover:not(:active)]:secondary-01 enabled:active:bg-blue-09 enabled:active:scale-95 shadow-blue-03",
      },
      // filled + danger (구: filledRed)
      {
        variant: "filled",
        color: "danger",
        className:
          "border-2 border-transparent state-error text-00 [&_svg]:text-00 [&:not(:disabled):hover:not(:active)]:border-state-error [&:not(:disabled):hover:not(:active)]:bg-error-70 enabled:active:border-state-error enabled:active:bg-error enabled:active:scale-95 shadow-red-03",
      },
      // outlined + primary (구: outlinedBlue)
      {
        variant: "outlined",
        color: "primary",
        className:
          "border-2 line-03 bg-03 text-04-brand [&_svg]:primary-01 [&:not(:disabled):hover:not(:active)]:bg-blue-03 enabled:active:bg-blue-05-icon-sub enabled:active:scale-95 shadow-blue-03",
      },
      // outlined + secondary (구: outlinedBlack)
      {
        variant: "outlined",
        color: "secondary",
        className:
          "border-2 line-01 bg-00 text-03-high [&_svg]:text-gray-05-icon-high [&:not(:disabled):hover:not(:active)]:bg-03 enabled:active:bg-04 enabled:active:scale-95",
      },
      // outlined + danger (구: outlinedRed)
      {
        variant: "outlined",
        color: "danger",
        className:
          "border-2 border-state-error bg-00 text-error [&_svg]:primary-01 [&:not(:disabled):hover:not(:active)]:soft-red-light enabled:active:bg-error enabled:active:scale-95 shadow-red-03",
      },
      // text + primary (구: text)
      {
        variant: "text",
        color: "primary",
        className:
          "border-none text-04-brand [&_svg]:primary-01 [&:not(:disabled):hover:not(:active)]:text-05-dark enabled:active:text-03-high [&:enabled:active_svg]:primary-02 enabled:active:scale-95",
      },
      // text + secondary (구: textBlack)
      {
        variant: "text",
        color: "secondary",
        className:
          "border-none text-03-high [&_svg]:text-gray-05-icon-high [&:not(:disabled):hover:not(:active)]:text-02-row [&:not(:disabled):hover:not(:active)_svg]:text-gray-03-icon-row enabled:active:text-03-high [&:enabled:active_svg]:text-gray-05-icon-high enabled:active:scale-95",
      },
      // loading states
      {
        variant: "filled",
        color: "primary",
        loading: true,
        className:
          "line-03 disabled:data-[loading=true]:bg-00 disabled:data-[loading=true]:text-04-brand",
      },
      {
        variant: "filled",
        color: "danger",
        loading: true,
        className: "disabled:data-[loading=true]:text-00",
      },
      {
        variant: "outlined",
        color: "primary",
        loading: true,
        className:
          "line-01 disabled:data-[loading=true]:bg-00 disabled:data-[loading=true]:text-04-brand",
      },
      {
        variant: "outlined",
        color: "secondary",
        loading: true,
        className:
          "line-01 disabled:data-[loading=true]:bg-00 disabled:data-[loading=true]:text-03-high",
      },
      {
        variant: "outlined",
        color: "danger",
        loading: true,
        className: "disabled:data-[loading=true]:text-03-high",
      },
      {
        variant: "text",
        color: "primary",
        loading: true,
        className: "disabled:data-[loading=true]:text-03-high",
      },
      {
        variant: "text",
        color: "secondary",
        loading: true,
        className: "disabled:data-[loading=true]:text-03-high",
      },
    ],
    defaultVariants: {
      variant: "filled",
      color: "primary",
      iconType: "none",
      size: "M",
      loading: false,
    },
  },
);

export interface ButtonProps
  extends
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  disabled?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  loading?: boolean;
  size?: ButtonSize;
  variant?: ButtonVariant;
  color?: ButtonColor;
  iconType?: ButtonIconType;
}

const CircularProgress = () => (
  <div className="inline-block h-20 w-20 animate-spin rounded-full border-2 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" />
);

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      color,
      size,
      iconType = "none",
      asChild = false,
      disabled,
      leftIcon,
      rightIcon,
      children,
      loading = false,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : "button";

    const content = loading ? (
      <CircularProgress />
    ) : iconType === "only" ? (
      (leftIcon ?? rightIcon)
    ) : iconType === "leading" ? (
      <>
        {leftIcon}
        {children}
      </>
    ) : iconType === "trailing" ? (
      <>
        {children}
        {rightIcon}
      </>
    ) : (
      children
    );

    return (
      <Comp
        className={cn(
          buttonVariants({
            variant,
            color,
            size,
            iconType,
            loading,
            className,
          }),
        )}
        ref={ref}
        disabled={disabled || loading}
        data-loading={loading}
        {...props}
      >
        {content}
      </Comp>
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
```

## Source File: components/checkbox.tsx

```tsx
"use client";

import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { Check } from "lucide-react";
import * as React from "react";

import { cn } from "@workspace/ui/utils";

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(
      "h-6 w-6 cursor-pointer rounded-md border-2 line-04-dark bg-00 ease-out data-[state=checked]:border-primary-01 data-[state=checked]:bg-03 data-[state=checked]:primary-01 data-[state=checked]:shadow-blue-03",
      className,
    )}
    {...props}
  >
    <CheckboxPrimitive.Indicator
      className={cn("flex items-center justify-center text-current")}
    >
      <Check className="h-4 w-4" strokeWidth={4.5} />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
));
Checkbox.displayName = CheckboxPrimitive.Root.displayName;

export { Checkbox };
```

## Source File: components/collapsible.tsx

```tsx
"use client";

import * as CollapsiblePrimitive from "@radix-ui/react-collapsible";

const Collapsible = CollapsiblePrimitive.Root;

const CollapsibleTrigger = CollapsiblePrimitive.CollapsibleTrigger;

const CollapsibleContent = CollapsiblePrimitive.CollapsibleContent;

export { Collapsible, CollapsibleTrigger, CollapsibleContent };
```

## Source File: components/dropdown-menu.tsx

```tsx
"use client";

import * as React from "react";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { Check, ChevronRight, Circle } from "lucide-react";

import { cn } from "@workspace/ui/utils";

const DropdownMenu = DropdownMenuPrimitive.Root;

const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;

const DropdownMenuGroup = DropdownMenuPrimitive.Group;

const DropdownMenuPortal = DropdownMenuPrimitive.Portal;

const DropdownMenuSub = DropdownMenuPrimitive.Sub;

const DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup;

const DropdownMenuSubTrigger = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.SubTrigger>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubTrigger> & {
    inset?: boolean;
  }
>(({ className, inset, children, ...props }, ref) => (
  <DropdownMenuPrimitive.SubTrigger
    ref={ref}
    className={cn(
      "flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm text-03-high outline-none focus:bg-03 data-[state=open]:bg-03 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
      inset && "pl-8",
      className,
    )}
    {...props}
  >
    {children}
    <ChevronRight className="ml-auto" />
  </DropdownMenuPrimitive.SubTrigger>
));
DropdownMenuSubTrigger.displayName =
  DropdownMenuPrimitive.SubTrigger.displayName;

const DropdownMenuSubContent = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.SubContent>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubContent>
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.SubContent
    ref={ref}
    className={cn(
      "z-50 min-w-[8rem] overflow-hidden rounded-lg border line-01 bg-00 p-1 text-03-high shadow-black-04 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className,
    )}
    {...props}
  />
));
DropdownMenuSubContent.displayName =
  DropdownMenuPrimitive.SubContent.displayName;

const DropdownMenuContent = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <DropdownMenuPrimitive.Portal>
    <DropdownMenuPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      className={cn(
        "z-50 max-h-[var(--radix-dropdown-menu-content-available-height)] min-w-[8rem] overflow-y-auto overflow-x-hidden rounded-lg border line-01 bg-00 p-1 text-03-high shadow-black-04",
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        className,
      )}
      {...props}
    />
  </DropdownMenuPrimitive.Portal>
));
DropdownMenuContent.displayName = DropdownMenuPrimitive.Content.displayName;

const DropdownMenuItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Item> & {
    inset?: boolean;
  }
>(({ className, inset, ...props }, ref) => (
  <DropdownMenuPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm text-03-high outline-none transition-colors focus:bg-03 focus:text-03-high data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&>svg]:size-4 [&>svg]:shrink-0",
      inset && "pl-8",
      className,
    )}
    {...props}
  />
));
DropdownMenuItem.displayName = DropdownMenuPrimitive.Item.displayName;

const DropdownMenuCheckboxItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.CheckboxItem>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.CheckboxItem>
>(({ className, children, checked, ...props }, ref) => (
  <DropdownMenuPrimitive.CheckboxItem
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pr-2 pl-8 text-sm text-03-high outline-none transition-colors focus:bg-03 focus:text-03-high data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className,
    )}
    checked={checked}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <DropdownMenuPrimitive.ItemIndicator>
        <Check className="h-4 w-4" />
      </DropdownMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </DropdownMenuPrimitive.CheckboxItem>
));
DropdownMenuCheckboxItem.displayName =
  DropdownMenuPrimitive.CheckboxItem.displayName;

const DropdownMenuRadioItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.RadioItem>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.RadioItem>
>(({ className, children, ...props }, ref) => (
  <DropdownMenuPrimitive.RadioItem
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pr-2 pl-8 text-sm text-03-high outline-none transition-colors focus:bg-03 focus:text-03-high data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className,
    )}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <DropdownMenuPrimitive.ItemIndicator>
        <Circle className="h-2 w-2 fill-current" />
      </DropdownMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </DropdownMenuPrimitive.RadioItem>
));
DropdownMenuRadioItem.displayName = DropdownMenuPrimitive.RadioItem.displayName;

const DropdownMenuLabel = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Label> & {
    inset?: boolean;
  }
>(({ className, inset, ...props }, ref) => (
  <DropdownMenuPrimitive.Label
    ref={ref}
    className={cn(
      "px-2 py-1.5 text-sm font-semibold text-03-high",
      inset && "pl-8",
      className,
    )}
    {...props}
  />
));
DropdownMenuLabel.displayName = DropdownMenuPrimitive.Label.displayName;

const DropdownMenuSeparator = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.Separator
    ref={ref}
    className={cn("-mx-1 my-1 h-px line-01", className)}
    {...props}
  />
));
DropdownMenuSeparator.displayName = DropdownMenuPrimitive.Separator.displayName;

const DropdownMenuShortcut = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span
      className={cn("ml-auto text-xs tracking-widest opacity-60", className)}
      {...props}
    />
  );
};
DropdownMenuShortcut.displayName = "DropdownMenuShortcut";

export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuGroup,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuRadioGroup,
};
```

## Source File: components/index.ts

```ts
export * from "./button";
export * from "./input";
export * from "./alert-dialog";
export * from "./dropdown-menu";
export * from "./text";
```

## Source File: components/input/\_check-icon.tsx

```tsx
"use client";
import * as React from "react";
import { CircleCheck } from "lucide-react";

interface Props extends React.HTMLAttributes<HTMLSpanElement> {}

function CheckIcon(props: Props) {
  return (
    <span {...props}>
      <CircleCheck className="absolute w-[24px] h-[24px] top-1/2 -translate-y-1/2 cursor-pointer" />
    </span>
  );
}

export default CheckIcon;
```

## Source File: components/input/\_text-delete.tsx

```tsx
"use client";
import * as React from "react";
import { CircleX } from "lucide-react";

interface Props extends React.HTMLAttributes<HTMLSpanElement> {}

function TextDelete(props: Props) {
  const { className, ..._props } = props;

  return (
    <span className={className} {..._props}>
      <CircleX className="absolute top-1/2 h-[24px] w-[24px] -translate-y-1/2 cursor-pointer" />
    </span>
  );
}

export default TextDelete;
```

## Source File: components/input/\_variants.ts

```ts
import { cva, type VariantProps } from "class-variance-authority";
import React from "react";

export const inputVariants = cva(
  `flex p-1 items-center rounded-lg border-2 line-01 bg-00
  hover:line-02 hover:bg-03 hover:rounded-lg hover:border-2
  focus:outline-none focus:line-03 focus:bg-00 focus:rounded-lg focus:border-2 focus:line-03
  disabled:bg-01 disabled:text-02-row disabled:cursor-not-allowed
  `,
  {
    variants: {
      variants: {
        text: "pl-4 pr-4",
        number: "pr-4 pl-[40px]",
      },
      state: {
        default: "",
        error:
          "border-state-error hover:border-state-error focus:border-state-error",
        success:
          "border-state-success hover:border-state-success focus:border-state-success",
      },
    },
    defaultVariants: {
      state: "default",
    },
  },
);

export interface InputProps
  extends
    React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {}
```

## Source File: components/input/index.ts

```ts
import InputText from "./input-text";
import InputPassword from "./input-password";
import InputSearch from "./input-search";
import InputSearchGray from "./input-search-gray";
import InputDate from "./input-date";
import InputMemo from "./input-memo";

export {
  InputText,
  InputPassword,
  InputSearch,
  InputSearchGray,
  InputDate,
  InputMemo,
};
export type { InputSearchProps } from "./input-search";
export type { InputSearchGrayProps } from "./input-search-gray";
export type { InputDateProps } from "./input-date";
export type { InputMemoProps } from "./input-memo";
```

## Source File: components/input/input-modify.tsx

```tsx
"use client";
import * as React from "react";
import { useState } from "react";
import { cn } from "@workspace/ui/utils";
import { InputProps, inputVariants } from "./_variants";
import TextDelete from "@workspace/ui/components/input/_text-delete";
import CheckIcon from "@workspace/ui/components/input/_check-icon";

interface Props extends InputProps {
  onCancel?: () => void;
  onConfirm?: () => void;
}

const InputModify = React.forwardRef<HTMLInputElement, Props>(
  (
    {
      className,
      defaultValue = "",
      onConfirm,
      onCancel,
      variants,
      state,
      ...props
    },
    ref,
  ) => {
    const [isFocus, setIsFocus] = useState(false);
    const [value, setValue] = useState(defaultValue);

    return (
      <div className="flex relative w-fit">
        {isFocus && (
          <div className={"flex items-center"}>
            <CheckIcon
              className={"right-[40px]"}
              onMouseDown={(e) => {
                setIsFocus(false);
                onConfirm?.();
              }}
            />
            <TextDelete
              className={"right-[15px]"}
              onMouseDown={(e) => {
                setIsFocus(false);
                onCancel?.();
              }}
            />
          </div>
        )}

        <input
          type={"text"}
          className={cn(inputVariants({ variants: "text", state, className }))}
          value={value}
          {...props}
          onChange={(e) => {
            setValue(e.target.value);
            props.onChange?.(e);
          }}
          ref={ref}
          onFocus={(e) => {
            setIsFocus(true);
            props.onFocus?.(e);
          }}
          onBlur={(e) => {
            setIsFocus(false);
            props.onBlur?.(e);
          }}
        />
      </div>
    );
  },
);

export default InputModify;
```

## Source File: components/input/input-password.tsx

```tsx
"use client";
import { cn } from "@workspace/ui/utils";
import * as React from "react";
import { useState } from "react";

import { CircleX } from "lucide-react";
import { InputProps, inputVariants } from "./_variants";

interface Props extends InputProps {
  value: string | undefined;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  isDeleteIconVisible?: boolean;
  onTextDeleteClick?: () => void;
}

const InputPassword = React.forwardRef<HTMLInputElement, Props>(
  (
    {
      className,
      isDeleteIconVisible = true,
      onTextDeleteClick,
      variants,
      state,
      ...props
    },
    ref,
  ) => {
    const [show, setShow] = useState(false);

    return (
      <div className="relative">
        <div className="relative flex items-center w-full">
          <input
            type={show ? "text" : "password"}
            className={cn(
              "h-[48px] w-full pr-[44px]",
              inputVariants({ variants: variants ?? "text", state, className }),
            )}
            ref={ref}
            {...props}
          />
          {isDeleteIconVisible && (
            <button
              type={"button"}
              className="absolute inset-y-0 right-14 flex items-center"
              onMouseDown={(e) => {
                onTextDeleteClick?.();
              }}
            >
              <CircleX className={cn("cursor-pointer")} />
            </button>
          )}
          <button
            type="button"
            onClick={() => setShow((s) => !s)}
            className="absolute inset-y-0 right-4 flex items-center text-gray-05-icon-high"
            aria-label={show ? "Hide password" : "Show password"}
          >
            <EyeIcon state={show ? "on" : "off"} />
          </button>
        </div>
      </div>
    );
  },
);

InputPassword.displayName = "InputPassword";

export default InputPassword;

function EyeIcon(props: { state: "on" | "off" }) {
  const { state } = props;
  return state === "on" ? (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2.52539 11.0693C2.85951 10.4488 3.36517 9.87402 4.01079 9.36283C4.81266 8.72728 5.8299 8.19083 6.99921 7.79055C8.46709 7.28807 10.1746 7.00016 11.9966 7.00016C13.2294 7.00016 14.4098 7.13198 15.499 7.37291C16.0195 7.48804 16.5191 7.62808 16.9937 7.79055C18.163 8.19083 19.1803 8.72728 19.9824 9.36283C20.628 9.87402 21.1337 10.4488 21.4678 11.0693"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16Z"
        fill="currentColor"
      />
    </svg>
  ) : (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2.52539 10C2.85951 10.6205 3.36517 11.1953 4.01079 11.7065C4.81266 12.3421 5.8299 12.8785 6.99921 13.2788M11.9966 14.0692V18.5M11.9966 14.0692C10.1746 14.0692 8.46709 13.7813 6.99921 13.2788M11.9966 14.0692C13.8185 14.0692 15.5259 13.7813 16.9937 13.2788M21.4678 10C21.1337 10.6205 20.628 11.1953 19.9824 11.7065C19.1803 12.3421 18.163 12.8785 16.9937 13.2788M6.99921 13.2788L3.99921 17M16.9937 13.2788L19.999 17"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
```

## Source File: components/input/input-search.tsx

```tsx
"use client";
import * as React from "react";
import { Search } from "lucide-react";
import { cn } from "@workspace/ui/utils";

interface InputSearchProps extends React.InputHTMLAttributes<HTMLInputElement> {
  inputSize?: "default" | "compact";
  onSearchClick?: () => void;
}

const InputSearch = React.forwardRef<HTMLInputElement, InputSearchProps>(
  (
    {
      className,
      inputSize = "default",
      onSearchClick,
      placeholder = "검색어를 입력해주세요",
      disabled,
      ...props
    },
    ref,
  ) => {
    const isCompact = inputSize === "compact";

    return (
      <div
        className={cn(
          "flex items-center w-[312px]",
          isCompact ? "rounded-[8px]" : "rounded-[12px]",
          className,
        )}
      >
        {/* Left: input section */}
        <div
          className={cn(
            "flex-[1_0_0] flex items-center min-w-0",
            "bg-00 border-t-2 border-b-2 border-l-2 line-01",
            "hover:line-02 hover:bg-03",
            "focus-within:line-03 focus-within:bg-00",
            isCompact
              ? "h-[40px] pl-[16px] rounded-bl-[10px] rounded-tl-[10px]"
              : "h-[56px] pl-[16px] py-[16px] rounded-bl-[12px] rounded-tl-[12px]",
            disabled && "bg-01 cursor-not-allowed pointer-events-none",
          )}
        >
          <input
            ref={ref}
            type="text"
            placeholder={placeholder}
            disabled={disabled}
            className={cn(
              "flex-1 min-w-0 bg-transparent outline-none",
              "font-semibold tracking-[-0.5px]",
              "text-03-high placeholder:text-01",
              isCompact
                ? "text-[14px] leading-[1.4]"
                : "text-[16px] leading-[1.48]",
              disabled && "cursor-not-allowed text-02-row",
            )}
            {...props}
          />
        </div>
        {/* Right: search button section */}
        <div
          className={cn(
            "flex items-center shrink-0 gap-[8px]",
            "bg-00 border-t-2 border-b-2 border-r-2 line-01",
            isCompact
              ? "h-[40px] pl-[8px] pr-[12px] rounded-br-[10px] rounded-tr-[10px]"
              : "h-[56px] pl-[8px] pr-[16px] py-[16px] rounded-br-[12px] rounded-tr-[12px]",
            disabled && "bg-01",
          )}
        >
          <div
            className={cn(
              "w-[2px] shrink-0 line-01",
              isCompact ? "h-[20px]" : "h-[24px]",
            )}
          />
          <button
            type="button"
            onClick={onSearchClick}
            disabled={disabled}
            aria-label="검색"
            className={cn(
              "flex items-center justify-center",
              disabled && "cursor-not-allowed",
            )}
          >
            <Search
              className={cn(
                "text-gray-05-icon-high",
                isCompact ? "w-[20px] h-[20px]" : "w-[24px] h-[24px]",
              )}
            />
          </button>
        </div>
      </div>
    );
  },
);

InputSearch.displayName = "InputSearch";

export default InputSearch;
export type { InputSearchProps };
```

## Source File: components/input/input-search-gray.tsx

```tsx
"use client";
import * as React from "react";
import { Search } from "lucide-react";
import { cn } from "@workspace/ui/utils";

export interface InputSearchGrayProps extends React.InputHTMLAttributes<HTMLInputElement> {
  inputSize?: "default" | "compact";
  onSearchClick?: () => void;
}

const InputSearchGray = React.forwardRef<
  HTMLInputElement,
  InputSearchGrayProps
>(
  (
    {
      className,
      inputSize = "default",
      onSearchClick,
      placeholder = "검색어를 입력해주세요",
      disabled,
      ...props
    },
    ref,
  ) => {
    const isCompact = inputSize === "compact";

    return (
      <div
        className={cn(
          "flex items-center w-[312px]",
          isCompact ? "rounded-[8px]" : "rounded-[12px]",
          className,
        )}
      >
        {/* Left: input section — bg-02 (gray) in default state; hover/focus identical to InputSearch */}
        <div
          className={cn(
            "flex-[1_0_0] flex items-center min-w-0",
            "bg-02 border-t-2 border-b-2 border-l-2 line-01",
            "hover:line-02 hover:bg-03",
            "focus-within:line-03 focus-within:bg-00",
            isCompact
              ? "h-[40px] pl-[16px] rounded-bl-[10px] rounded-tl-[10px]"
              : "h-[56px] pl-[16px] py-[16px] rounded-bl-[12px] rounded-tl-[12px]",
            disabled && "bg-01 cursor-not-allowed pointer-events-none",
          )}
        >
          <input
            ref={ref}
            type="text"
            placeholder={placeholder}
            disabled={disabled}
            className={cn(
              "flex-1 min-w-0 bg-transparent outline-none",
              "font-semibold tracking-[-0.5px]",
              "text-03-high placeholder:text-01",
              isCompact
                ? "text-[14px] leading-[1.4]"
                : "text-[16px] leading-[1.48]",
              disabled && "cursor-not-allowed text-02-row",
            )}
            {...props}
          />
        </div>
        {/* Right: search button section */}
        <div
          className={cn(
            "flex items-center shrink-0 gap-[8px]",
            "bg-00 border-t-2 border-b-2 border-r-2 line-01",
            isCompact
              ? "h-[40px] pl-[8px] pr-[12px] rounded-br-[10px] rounded-tr-[10px]"
              : "h-[56px] pl-[8px] pr-[16px] py-[16px] rounded-br-[12px] rounded-tr-[12px]",
            disabled && "bg-01",
          )}
        >
          <div
            className={cn(
              "w-[2px] shrink-0 line-01",
              isCompact ? "h-[20px]" : "h-[24px]",
            )}
          />
          <button
            type="button"
            onClick={onSearchClick}
            disabled={disabled}
            aria-label="검색"
            className={cn(
              "flex items-center justify-center",
              disabled && "cursor-not-allowed",
            )}
          >
            <Search
              className={cn(
                "text-gray-05-icon-high",
                isCompact ? "w-[20px] h-[20px]" : "w-[24px] h-[24px]",
              )}
            />
          </button>
        </div>
      </div>
    );
  },
);

InputSearchGray.displayName = "InputSearchGray";

export default InputSearchGray;
```

## Source File: components/input/input-date.tsx

```tsx
"use client";
import * as React from "react";
import { Calendar } from "lucide-react";
import { cn } from "@workspace/ui/utils";

export interface InputDateProps {
  inputSize?: "default" | "compact";
  startDate?: string;
  startTime?: string;
  endDate?: string;
  endTime?: string;
  onCalendarClick?: () => void;
  disabled?: boolean;
  className?: string;
}

const DATE_PLACEHOLDER = "YYYY/MM/DD";
const TIME_PLACEHOLDER = "00:00";

const InputDate = React.forwardRef<HTMLDivElement, InputDateProps>(
  (
    {
      className,
      inputSize = "default",
      startDate,
      startTime,
      endDate,
      endTime,
      onCalendarClick,
      disabled,
    },
    ref,
  ) => {
    const isCompact = inputSize === "compact";

    const dateTextClass = cn(
      "font-semibold tracking-[-0.5px] text-03-high",
      isCompact ? "text-[12px]" : "text-[14px]",
    );

    return (
      <div
        ref={ref}
        className={cn(
          "flex items-center",
          isCompact ? "rounded-[8px]" : "rounded-[12px]",
          className,
        )}
      >
        {/* Left: date range display section */}
        <div
          className={cn(
            "flex items-center min-w-0",
            "bg-00 border-t-2 border-b-2 border-l-2 line-01",
            "hover:line-02 hover:bg-03",
            isCompact
              ? "h-[40px] px-[12px] gap-[6px] rounded-bl-[10px] rounded-tl-[10px]"
              : "h-[56px] px-[16px] gap-[8px] rounded-bl-[12px] rounded-tl-[12px]",
            disabled && "bg-01 cursor-not-allowed pointer-events-none",
          )}
        >
          {/* Start date / time */}
          <div
            className={cn(
              "flex items-center gap-[4px] shrink-0",
              dateTextClass,
            )}
          >
            <span className={cn(!startDate && "text-01")}>
              {startDate ?? DATE_PLACEHOLDER}
            </span>
            <span className={cn(!startTime && "text-01")}>
              {startTime ?? TIME_PLACEHOLDER}
            </span>
          </div>
          {/* Range separator */}
          <div
            className={cn(
              "shrink-0 line-01",
              isCompact ? "w-[8px] h-[1px]" : "w-[12px] h-[1px]",
            )}
          />
          {/* End date / time */}
          <div
            className={cn(
              "flex items-center gap-[4px] shrink-0",
              dateTextClass,
            )}
          >
            <span className={cn(!endDate && "text-01")}>
              {endDate ?? DATE_PLACEHOLDER}
            </span>
            <span className={cn(!endTime && "text-01")}>
              {endTime ?? TIME_PLACEHOLDER}
            </span>
          </div>
        </div>
        {/* Right: calendar button section */}
        <div
          className={cn(
            "flex items-center shrink-0 gap-[8px]",
            "bg-00 border-t-2 border-b-2 border-r-2 line-01",
            isCompact
              ? "h-[40px] pl-[8px] pr-[12px] rounded-br-[10px] rounded-tr-[10px]"
              : "h-[56px] pl-[8px] pr-[16px] py-[16px] rounded-br-[12px] rounded-tr-[12px]",
            disabled && "bg-01",
          )}
        >
          <div
            className={cn(
              "w-[2px] shrink-0 line-01",
              isCompact ? "h-[20px]" : "h-[24px]",
            )}
          />
          <button
            type="button"
            onClick={onCalendarClick}
            disabled={disabled}
            aria-label="날짜 선택"
            className={cn(
              "flex items-center justify-center",
              disabled && "cursor-not-allowed",
            )}
          >
            <Calendar
              className={cn(
                "text-gray-05-icon-high",
                isCompact ? "w-[20px] h-[20px]" : "w-[24px] h-[24px]",
              )}
            />
          </button>
        </div>
      </div>
    );
  },
);

InputDate.displayName = "InputDate";

export default InputDate;
export type { InputDateProps };
```

## Source File: components/input/input-memo.tsx

```tsx
"use client";
import * as React from "react";
import { Pencil } from "lucide-react";
import { cn } from "@workspace/ui/utils";

export interface InputMemoProps extends React.InputHTMLAttributes<HTMLInputElement> {
  inputSize?: "default" | "compact";
  maxLength?: number;
  value?: string;
  onEditClick?: () => void;
}

const InputMemo = React.forwardRef<HTMLInputElement, InputMemoProps>(
  (
    {
      className,
      inputSize = "default",
      maxLength,
      value,
      onEditClick,
      disabled,
      ...props
    },
    ref,
  ) => {
    const isCompact = inputSize === "compact";
    const charCount = typeof value === "string" ? value.length : 0;

    return (
      <div className={cn("flex flex-col gap-[4px] w-fit", className)}>
        {/* Input wrapper — border/bg/hover/focus applied to container to include edit icon */}
        <div
          className={cn(
            "flex items-center rounded-lg border-2 line-01 bg-00",
            "hover:line-02 hover:bg-03",
            "focus-within:line-03 focus-within:bg-00",
            "w-[200px] pl-4 pr-2",
            isCompact ? "h-[40px]" : "h-[48px]",
            disabled && "bg-01 cursor-not-allowed pointer-events-none",
          )}
        >
          <input
            ref={ref}
            type="text"
            value={value}
            maxLength={maxLength}
            disabled={disabled}
            className={cn(
              "flex-1 min-w-0 bg-transparent outline-none",
              "font-semibold tracking-[-0.5px] text-03-high placeholder:text-01",
              isCompact
                ? "text-[14px] leading-[1.4]"
                : "text-[16px] leading-[1.48]",
              disabled && "cursor-not-allowed text-02-row",
            )}
            {...props}
          />
          {onEditClick !== undefined && (
            <button
              type="button"
              onClick={onEditClick}
              disabled={disabled}
              aria-label="편집"
              className="flex items-center justify-center shrink-0 ml-[4px]"
            >
              {/* edit: Material Symbols Outlined "edit" */}
              <Pencil
                className={cn(
                  "text-gray-05-icon-high",
                  isCompact ? "w-[16px] h-[16px]" : "w-[18px] h-[18px]",
                )}
              />
            </button>
          )}
        </div>
        {/* Character limit counter */}
        {maxLength !== undefined && (
          <div className="flex items-center gap-[2px] text-02-row text-[12px]">
            <span>{charCount}</span>
            <span>/</span>
            <span>{maxLength}</span>
          </div>
        )}
      </div>
    );
  },
);

InputMemo.displayName = "InputMemo";

export default InputMemo;
export type { InputMemoProps };
```

## Source File: components/input/input-text.tsx

```tsx
"use client";
import TextDelete from "@workspace/ui/components/input/_text-delete";
import { cn } from "@workspace/ui/utils";
import * as React from "react";
import { useState } from "react";
import { InputProps, inputVariants } from "./_variants";

interface Props extends InputProps {
  value: string | undefined;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  isDeleteIconVisible?: boolean;
  onTextDeleteClick?: () => void;
}

const InputText = React.forwardRef<HTMLInputElement, Props>(
  (
    {
      className,
      isDeleteIconVisible = false,
      value = "",
      onTextDeleteClick,
      onChange,
      variants,
      state,
      ...props
    },
    ref,
  ) => {
    const [isFocus, setIsFocus] = useState(false);

    return (
      <div className="relative">
        {isFocus && isDeleteIconVisible && (
          <TextDelete
            className={"right-[18px]"}
            onMouseDown={(e) => {
              onTextDeleteClick?.();
            }}
          />
        )}
        <input
          type={"text"}
          className={cn(
            "h-[48px] w-[200px]",
            inputVariants({ variants: variants ?? "text", state, className }),
            isDeleteIconVisible && "pr-[44px]",
          )}
          value={value}
          onChange={onChange}
          ref={ref}
          onFocus={(e) => {
            setIsFocus(true);
            props.onFocus?.(e);
          }}
          onBlur={(e) => {
            setIsFocus(false);
            props.onBlur?.(e);
          }}
          {...props}
        />
      </div>
    );
  },
);

export default InputText;
export type { Props as InputTextProps };
```

## Source File: components/number.tsx

```tsx
"use client";
import { cn } from "@workspace/ui/utils";
import { cva, type VariantProps } from "class-variance-authority";
import React from "react";

export const numberVariants = cva("font-spoqa", {
  variants: {
    variant: {
      h1: "",
      h2: "",
      h3: "",
      h4: "",
      p: "",
      span: "",
    },
    size: {
      14: "text-[0.875rem] leading-[1.225rem]",
      16: "text-[1rem] leading-[1.48rem]",
      18: "text-[1.125rem] leading-[1.53rem] tracking-[-0.03125rem]",
      20: "text-[1.25rem] leading-[1.5rem] tracking-[-0.01875rem]",
      24: "text-[1.5rem] leading-[1.8rem] tracking-[-0.01875rem]",
      28: "text-[1.75rem] leading-[2.1rem] tracking-[-0.01875rem]",
      32: "text-[2rem] leading-[2.4rem] tracking-[-0.01875rem]",
      36: "text-[2.25rem] leading-[2.7rem] tracking-[-0.01875rem]",
      40: "text-[2.5rem] leading-[3rem] tracking-[-0.01875rem]",
      48: "text-[3rem] leading-[3.6rem] tracking-[-0.015rem]",
      72: "text-[4.5rem] leading-[5.4rem] tracking-[-0.0625rem]",
      120: "text-[7.5rem] leading-[8.25rem] tracking-[-0.125rem]",
    },
    weight: {
      bold: "font-bold",
      medium: "font-medium",
    },
  },
});

export interface NumberProps
  extends
    React.HTMLAttributes<HTMLHeadingElement>,
    VariantProps<typeof numberVariants> {}

const Number = React.forwardRef<HTMLHeadingElement, NumberProps>(
  ({ className, variant, size = 16, weight = "medium", ...props }, ref) => {
    const Comp = variant || "span";

    return (
      <Comp
        className={cn(numberVariants({ variant, size, weight, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Number.displayName = "Number";

export default Number;
```

## Source File: components/pagination.tsx

```tsx
import * as React from "react";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";

import { cn } from "@workspace/ui/utils";
import { ButtonProps, buttonVariants } from "@workspace/ui/components/button";

const Pagination = ({ className, ...props }: React.ComponentProps<"nav">) => (
  <nav
    role="navigation"
    aria-label="pagination"
    className={cn("mx-auto flex w-full justify-center", className)}
    {...props}
  />
);
Pagination.displayName = "Pagination";

const PaginationContent = React.forwardRef<
  HTMLUListElement,
  React.ComponentProps<"ul">
>(({ className, ...props }, ref) => (
  <ul
    ref={ref}
    className={cn("flex flex-row items-center gap-1", className)}
    {...props}
  />
));
PaginationContent.displayName = "PaginationContent";

const PaginationItem = React.forwardRef<
  HTMLLIElement,
  React.ComponentProps<"li">
>(({ className, ...props }, ref) => (
  <li ref={ref} className={cn("", className)} {...props} />
));
PaginationItem.displayName = "PaginationItem";

type PaginationLinkProps = {
  isActive?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
} & Pick<ButtonProps, "size" | "iconType"> &
  React.ComponentProps<"a">;

const PaginationLink = ({
  className,
  isActive,
  size = "M",
  iconType = "none",
  leftIcon,
  rightIcon,
  children,
  ...props
}: PaginationLinkProps) => {
  const inner =
    iconType === "only" ? (
      (leftIcon ?? rightIcon)
    ) : iconType === "leading" ? (
      <>
        {leftIcon}
        {children}
      </>
    ) : iconType === "trailing" ? (
      <>
        {children}
        {rightIcon}
      </>
    ) : (
      children
    );

  return (
    <a
      aria-current={isActive ? "page" : undefined}
      className={cn(
        buttonVariants({
          variant: isActive ? "outlined" : "text",
          color: "secondary",
          size,
          iconType,
        }),
        className,
      )}
      {...props}
    >
      {inner}
    </a>
  );
};
PaginationLink.displayName = "PaginationLink";

const PaginationPrevious = ({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) => (
  <PaginationLink
    aria-label="Go to previous page"
    size="M"
    iconType="only"
    leftIcon={<ChevronLeft className="h-4 w-4" />}
    className={className}
    {...props}
  />
);
PaginationPrevious.displayName = "PaginationPrevious";

const PaginationNext = ({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) => (
  <PaginationLink
    aria-label="Go to next page"
    size="M"
    iconType="only"
    leftIcon={<ChevronRight className="h-4 w-4" />}
    className={className}
    {...props}
  />
);
PaginationNext.displayName = "PaginationNext";

const PaginationEllipsis = ({
  className,
  ...props
}: React.ComponentProps<"span">) => (
  <span
    aria-hidden
    className={cn("flex h-9 w-9 items-center justify-center", className)}
    {...props}
  >
    <MoreHorizontal className="h-4 w-4" />
    <span className="sr-only">More pages</span>
  </span>
);
PaginationEllipsis.displayName = "PaginationEllipsis";

export {
  Pagination,
  PaginationContent,
  PaginationLink,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
};
```

## Source File: components/popover.tsx

```tsx
"use client";

import * as React from "react";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import { cn } from "@workspace/ui/utils";

const Popover = PopoverPrimitive.Root;

const PopoverTrigger = PopoverPrimitive.Trigger;

const PopoverAnchor = PopoverPrimitive.Anchor;

const PopoverContent = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>
>(({ className, align = "center", sideOffset = 4, ...props }, ref) => (
  <PopoverPrimitive.Portal>
    <PopoverPrimitive.Content
      ref={ref}
      align={align}
      sideOffset={sideOffset}
      className={cn(
        "outline-none border line-01 bg-00 text-03-high z-50 w-72 origin-[--radix-popover-content-transform-origin] rounded-lg shadow-black-04 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        className,
      )}
      {...props}
    />
  </PopoverPrimitive.Portal>
));
PopoverContent.displayName = PopoverPrimitive.Content.displayName;

export { Popover, PopoverTrigger, PopoverContent, PopoverAnchor };
```

## Source File: components/select.tsx

```tsx
"use client";

import * as React from "react";
import * as SelectPrimitive from "@radix-ui/react-select";
import { Check, ChevronDown, ChevronUp } from "lucide-react";

import { cn } from "@workspace/ui/utils";

const Select = SelectPrimitive.Root;

const SelectGroup = SelectPrimitive.Group;

const SelectValue = SelectPrimitive.Value;

const SelectTrigger = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Trigger
    ref={ref}
    className={cn(
      "flex h-9 w-full items-center justify-between whitespace-nowrap rounded-lg border line-01 bg-00 px-3 py-2 text-sm text-03-high shadow-black-01 data-[placeholder]:text-02-row focus:line-03 focus:outline-none focus:ring-0 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1",
      className,
    )}
    {...props}
  >
    {children}
    <SelectPrimitive.Icon asChild>
      <ChevronDown className="size-4 text-gray-05-icon-high opacity-50" />
    </SelectPrimitive.Icon>
  </SelectPrimitive.Trigger>
));
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName;

const SelectScrollUpButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollUpButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollUpButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollUpButton
    ref={ref}
    className={cn(
      "flex cursor-default items-center justify-center py-1",
      className,
    )}
    {...props}
  >
    <ChevronUp className="h-4 w-4" />
  </SelectPrimitive.ScrollUpButton>
));
SelectScrollUpButton.displayName = SelectPrimitive.ScrollUpButton.displayName;

const SelectScrollDownButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollDownButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollDownButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollDownButton
    ref={ref}
    className={cn(
      "flex cursor-default items-center justify-center py-1",
      className,
    )}
    {...props}
  >
    <ChevronDown className="h-4 w-4" />
  </SelectPrimitive.ScrollDownButton>
));
SelectScrollDownButton.displayName =
  SelectPrimitive.ScrollDownButton.displayName;

const SelectContent = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>(({ className, children, position = "popper", ...props }, ref) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content
      ref={ref}
      className={cn(
        "relative z-50 max-h-[--radix-select-content-available-height] min-w-[8rem] overflow-y-auto overflow-x-hidden rounded-lg border line-01 bg-00 text-03-high shadow-black-04 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        position === "popper" &&
          "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
        className,
      )}
      position={position}
      {...props}
    >
      <SelectScrollUpButton />
      <SelectPrimitive.Viewport
        className={cn(
          "p-1",
          position === "popper" &&
            "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]",
        )}
      >
        {children}
      </SelectPrimitive.Viewport>
      <SelectScrollDownButton />
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
));
SelectContent.displayName = SelectPrimitive.Content.displayName;

const SelectLabel = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Label
    ref={ref}
    className={cn("px-2 py-1.5 text-sm font-semibold text-03-high", className)}
    {...props}
  />
));
SelectLabel.displayName = SelectPrimitive.Label.displayName;

const SelectItem = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex w-full cursor-pointer select-none items-center rounded-sm py-[20px] pl-2 pr-8 text-sm text-03-high outline-none focus:bg-03 focus:text-03-high data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className,
    )}
    {...props}
  >
    <span className="absolute right-2 flex h-3.5 w-3.5 items-center justify-center">
      <SelectPrimitive.ItemIndicator>
        <Check className="h-4 w-4" />
      </SelectPrimitive.ItemIndicator>
    </span>
    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
));
SelectItem.displayName = SelectPrimitive.Item.displayName;

const SelectSeparator = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Separator
    ref={ref}
    className={cn("line-01 -mx-1 my-1 h-px", className)}
    {...props}
  />
));
SelectSeparator.displayName = SelectPrimitive.Separator.displayName;

export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
  SelectScrollUpButton,
  SelectScrollDownButton,
};
```

## Source File: components/separator.tsx

```tsx
"use client";

import * as React from "react";
import * as SeparatorPrimitive from "@radix-ui/react-separator";
import { cn } from "@workspace/ui/utils";

const Separator = React.forwardRef<
  React.ElementRef<typeof SeparatorPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root>
>(
  (
    { className, orientation = "horizontal", decorative = true, ...props },
    ref,
  ) => (
    <SeparatorPrimitive.Root
      ref={ref}
      decorative={decorative}
      orientation={orientation}
      className={cn(
        "shrink-0 bg-border",
        orientation === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]",
        className,
      )}
      {...props}
    />
  ),
);
Separator.displayName = SeparatorPrimitive.Root.displayName;

export { Separator };
```

## Source File: components/sheet.tsx

```tsx
"use client";

import * as React from "react";
import * as SheetPrimitive from "@radix-ui/react-dialog";
import { cva, type VariantProps } from "class-variance-authority";
import { X } from "lucide-react";
import { cn } from "@workspace/ui/utils";

const Sheet = SheetPrimitive.Root;

const SheetTrigger = SheetPrimitive.Trigger;

const SheetClose = SheetPrimitive.Close;

const SheetPortal = SheetPrimitive.Portal;

const SheetOverlay = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <SheetPrimitive.Overlay
    className={cn(
      "fixed inset-0 z-50 bg-06-dimmed data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className,
    )}
    {...props}
    ref={ref}
  />
));
SheetOverlay.displayName = SheetPrimitive.Overlay.displayName;

const sheetVariants = cva(
  "fixed z-50 gap-4 border line-01 bg-00 p-6 shadow-black-04 transition ease-in-out data-[state=closed]:duration-300 data-[state=open]:duration-500 data-[state=open]:animate-in data-[state=closed]:animate-out",
  {
    variants: {
      side: {
        top: "inset-x-0 top-0 border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top",
        bottom:
          "inset-x-0 bottom-0 border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom",
        left: "inset-y-0 left-0 h-full w-3/4 border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm",
        right:
          "inset-y-0 right-0 h-full w-3/4 border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm",
      },
    },
    defaultVariants: {
      side: "right",
    },
  },
);

interface SheetContentProps
  extends
    React.ComponentPropsWithoutRef<typeof SheetPrimitive.Content>,
    VariantProps<typeof sheetVariants> {}

const SheetContent = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Content>,
  SheetContentProps
>(({ side = "right", className, children, ...props }, ref) => (
  <SheetPortal>
    <SheetOverlay />
    <SheetPrimitive.Content
      ref={ref}
      className={cn(sheetVariants({ side }), className)}
      {...props}
    >
      <SheetPrimitive.Close className="absolute top-4 right-4 rounded-sm opacity-70 transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-line-03 focus:ring-offset-2 focus:ring-offset-bg-00 disabled:pointer-events-none data-[state=open]:bg-02">
        <X className="h-4 w-4" />
        <span className="sr-only">Close</span>
      </SheetPrimitive.Close>
      {children}
    </SheetPrimitive.Content>
  </SheetPortal>
));
SheetContent.displayName = SheetPrimitive.Content.displayName;

const SheetHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col space-y-2 text-center sm:text-left",
      className,
    )}
    {...props}
  />
);
SheetHeader.displayName = "SheetHeader";

const SheetFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
      className,
    )}
    {...props}
  />
);
SheetFooter.displayName = "SheetFooter";

const SheetTitle = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Title>
>(({ className, ...props }, ref) => (
  <SheetPrimitive.Title
    ref={ref}
    className={cn("text-lg font-semibold text-03-high", className)}
    {...props}
  />
));
SheetTitle.displayName = SheetPrimitive.Title.displayName;

const SheetDescription = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Description>
>(({ className, ...props }, ref) => (
  <SheetPrimitive.Description
    ref={ref}
    className={cn("text-sm text-02-row", className)}
    {...props}
  />
));
SheetDescription.displayName = SheetPrimitive.Description.displayName;

export {
  Sheet,
  SheetPortal,
  SheetOverlay,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
};
```

## Source File: components/sidebar.tsx

```tsx
"use client";

import { Slot } from "@radix-ui/react-slot";
import { VariantProps, cva } from "class-variance-authority";
import { PanelLeft } from "lucide-react";
import * as React from "react";

import { Button } from "@workspace/ui/components/button";
import { Separator } from "@workspace/ui/components/separator";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@workspace/ui/components/sheet";
import { Skeleton } from "@workspace/ui/components/skeleton";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@workspace/ui/components/tooltip";
import { useIsMobile } from "@workspace/ui/hooks/use-mobile";

import { cn } from "../utils";
import { InputText } from "./input";

const SIDEBAR_COOKIE_NAME = "sidebar_state";
const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7;
const SIDEBAR_WIDTH = "17.5rem";
const SIDEBAR_WIDTH_MOBILE = "18rem";
const SIDEBAR_WIDTH_ICON = "6rem";
const SIDEBAR_KEYBOARD_SHORTCUT = "b";

type SidebarContextProps = {
  state: "expanded" | "collapsed";
  open: boolean;
  setOpen: (open: boolean) => void;
  openMobile: boolean;
  setOpenMobile: (open: boolean) => void;
  isMobile: boolean;
  toggleSidebar: () => void;
};

const SidebarContext = React.createContext<SidebarContextProps | null>(null);

function useSidebar() {
  const context = React.useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider.");
  }

  return context;
}

const SidebarProvider = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> & {
    defaultOpen?: boolean;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
  }
>(
  (
    {
      defaultOpen = true,
      open: openProp,
      onOpenChange: setOpenProp,
      className,
      style,
      children,
      ...props
    },
    ref,
  ) => {
    const isMobile = useIsMobile();
    const [openMobile, setOpenMobile] = React.useState(false);

    // This is the internal state of the sidebar.
    // We use openProp and setOpenProp for control from outside the component.
    const [_open, _setOpen] = React.useState(defaultOpen);
    const open = openProp ?? _open;
    const setOpen = React.useCallback(
      (value: boolean | ((value: boolean) => boolean)) => {
        const openState = typeof value === "function" ? value(open) : value;
        if (setOpenProp) {
          setOpenProp(openState);
        } else {
          _setOpen(openState);
        }

        // This sets the cookie to keep the sidebar state.
        document.cookie = `${SIDEBAR_COOKIE_NAME}=${openState}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}`;
      },
      [setOpenProp, open],
    );

    // Helper to toggle the sidebar.
    const toggleSidebar = React.useCallback(() => {
      return isMobile
        ? setOpenMobile((open) => !open)
        : setOpen((open) => !open);
    }, [isMobile, setOpen, setOpenMobile]);

    // Adds a keyboard shortcut to toggle the sidebar.
    React.useEffect(() => {
      const handleKeyDown = (event: KeyboardEvent) => {
        if (
          event.key === SIDEBAR_KEYBOARD_SHORTCUT &&
          (event.metaKey || event.ctrlKey)
        ) {
          event.preventDefault();
          toggleSidebar();
        }
      };

      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    }, [toggleSidebar]);

    // We add a state so that we can do data-state="expanded" or "collapsed".
    // This makes it easier to style the sidebar with Tailwind classes.
    const state = open ? "expanded" : "collapsed";

    const contextValue = React.useMemo<SidebarContextProps>(
      () => ({
        state,
        open,
        setOpen,
        isMobile,
        openMobile,
        setOpenMobile,
        toggleSidebar,
      }),
      [
        state,
        open,
        setOpen,
        isMobile,
        openMobile,
        setOpenMobile,
        toggleSidebar,
      ],
    );

    return (
      <SidebarContext.Provider value={contextValue}>
        <TooltipProvider delayDuration={0}>
          <div
            style={
              {
                "--sidebar-width": SIDEBAR_WIDTH,
                "--sidebar-width-icon": SIDEBAR_WIDTH_ICON,
                ...style,
              } as React.CSSProperties
            }
            className={cn(
              "group/sidebar-wrapper flex min-h-svh w-full has-[[data-variant=inset]]:bg-sidebar",
              className,
            )}
            ref={ref}
            {...props}
          >
            {children}
          </div>
        </TooltipProvider>
      </SidebarContext.Provider>
    );
  },
);
SidebarProvider.displayName = "SidebarProvider";

const Sidebar = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> & {
    side?: "left" | "right";
    variant?: "sidebar" | "floating" | "inset";
    collapsible?: "offcanvas" | "icon" | "none";
  }
>(
  (
    {
      side = "left",
      variant = "sidebar",
      collapsible = "offcanvas",
      className,
      children,
      ...props
    },
    ref,
  ) => {
    const { isMobile, state, openMobile, setOpenMobile } = useSidebar();

    if (collapsible === "none") {
      return (
        <div
          className={cn(
            "flex h-full w-[--sidebar-width] flex-col text-sidebar-foreground",
            className,
          )}
          ref={ref}
          {...props}
        >
          {children}
        </div>
      );
    }

    if (isMobile) {
      return (
        <Sheet open={openMobile} onOpenChange={setOpenMobile} {...props}>
          <SheetContent
            data-sidebar="sidebar"
            data-mobile="true"
            className="w-[--sidebar-width] bg-sidebar p-0 text-sidebar-foreground [&>button]:hidden"
            style={
              {
                "--sidebar-width": SIDEBAR_WIDTH_MOBILE,
              } as React.CSSProperties
            }
            side={side}
          >
            <SheetHeader className="sr-only">
              <SheetTitle>Sidebar</SheetTitle>
              <SheetDescription>Displays the mobile sidebar.</SheetDescription>
            </SheetHeader>
            <div className="flex h-full w-full flex-col">{children}</div>
          </SheetContent>
        </Sheet>
      );
    }

    return (
      <div
        ref={ref}
        className="group peer hidden text-sidebar-foreground md:block"
        data-state={state}
        data-collapsible={state === "collapsed" ? collapsible : ""}
        data-variant={variant}
        data-side={side}
      >
        {/* This is what handles the sidebar gap on desktop */}
        <div
          className={cn(
            "relative w-[--sidebar-width] bg-transparent transition-[width] duration-200 ease-linear",
            "group-data-[collapsible=offcanvas]:w-0",
            "group-data-[side=right]:rotate-180",
            variant === "floating" || variant === "inset"
              ? "group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)_+_theme(spacing.4))]"
              : "group-data-[collapsible=icon]:w-[--sidebar-width-icon]",
          )}
        />
        <div
          className={cn(
            "fixed inset-y-0 z-10 hidden h-svh w-[--sidebar-width] md:flex",
            side === "left"
              ? "left-0 group-data-[collapsible=offcanvas]:left-[calc(var(--sidebar-width)*-1)]"
              : "right-0 group-data-[collapsible=offcanvas]:right-[calc(var(--sidebar-width)*-1)]",
            // Adjust the padding for floating and inset variants.
            variant === "floating" || variant === "inset"
              ? "p-2 group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)_+_theme(spacing.4)_+2px)]"
              : "group-data-[collapsible=icon]:w-[--sidebar-width-icon] group-data-[side=left]:border-r group-data-[side=right]:border-l",
            className,
          )}
          {...props}
        >
          <div
            data-sidebar="sidebar"
            className="flex h-full w-full flex-col group-data-[variant=floating]:rounded-lg group-data-[variant=floating]:border group-data-[variant=floating]:border-sidebar-border group-data-[variant=floating]:shadow"
          >
            {children}
          </div>
        </div>
      </div>
    );
  },
);
Sidebar.displayName = "Sidebar";

const SidebarTrigger = React.forwardRef<
  React.ElementRef<typeof Button>,
  React.ComponentProps<typeof Button>
>(({ className, onClick, ...props }, ref) => {
  const { toggleSidebar } = useSidebar();

  return (
    <Button
      ref={ref}
      data-sidebar="trigger"
      variant="text"
      color="secondary"
      iconType="only"
      size="M"
      leftIcon={<PanelLeft />}
      aria-label="Toggle Sidebar"
      className={cn("h-7 w-7", className)}
      onClick={(event) => {
        onClick?.(event);
        toggleSidebar();
      }}
      {...props}
    />
  );
});
SidebarTrigger.displayName = "SidebarTrigger";

const SidebarRail = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<"button">
>(({ className, ...props }, ref) => {
  const { toggleSidebar } = useSidebar();

  return (
    <button
      ref={ref}
      data-sidebar="rail"
      aria-label="Toggle Sidebar"
      tabIndex={-1}
      onClick={toggleSidebar}
      title="Toggle Sidebar"
      className={cn(
        "absolute inset-y-0 z-20 hidden w-4 -translate-x-1/2 transition-all ease-linear after:absolute after:inset-y-0 after:left-1/2 after:w-[2px] hover:after:bg-sidebar-border group-data-[side=left]:-right-4 group-data-[side=right]:left-0 sm:flex",
        "[[data-side=left]_&]:cursor-w-resize [[data-side=right]_&]:cursor-e-resize",
        "[[data-side=left][data-state=collapsed]_&]:cursor-e-resize [[data-side=right][data-state=collapsed]_&]:cursor-w-resize",
        "group-data-[collapsible=offcanvas]:translate-x-0 group-data-[collapsible=offcanvas]:after:left-full group-data-[collapsible=offcanvas]:hover:bg-sidebar",
        "[[data-side=left][data-collapsible=offcanvas]_&]:-right-2",
        "[[data-side=right][data-collapsible=offcanvas]_&]:-left-2",
        className,
      )}
      {...props}
    />
  );
});
SidebarRail.displayName = "SidebarRail";

const SidebarInset = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"main">
>(({ className, ...props }, ref) => {
  return (
    <main
      ref={ref}
      className={cn(
        "relative flex w-full flex-1 flex-col bg-background",
        "md:peer-data-[variant=inset]:m-2 md:peer-data-[state=collapsed]:peer-data-[variant=inset]:ml-2 md:peer-data-[variant=inset]:ml-0 md:peer-data-[variant=inset]:rounded-xl md:peer-data-[variant=inset]:shadow",
        className,
      )}
      {...props}
    />
  );
});
SidebarInset.displayName = "SidebarInset";

const SidebarInput = React.forwardRef<
  React.ElementRef<typeof InputText>,
  React.ComponentProps<typeof InputText>
>(({ className, ...props }, ref) => {
  return (
    <InputText
      ref={ref}
      data-sidebar="input"
      className={cn(
        "h-8 w-full bg-background shadow-none focus-visible:ring-2 focus-visible:ring-sidebar-ring",
        className,
      )}
      {...props}
    />
  );
});
SidebarInput.displayName = "SidebarInput";

const SidebarHeader = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      data-sidebar="header"
      className={cn("flex flex-col gap-2 p-2", className)}
      {...props}
    />
  );
});
SidebarHeader.displayName = "SidebarHeader";

const SidebarFooter = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      data-sidebar="footer"
      className={cn("flex flex-col gap-2 p-2", className)}
      {...props}
    />
  );
});
SidebarFooter.displayName = "SidebarFooter";

const SidebarSeparator = React.forwardRef<
  React.ElementRef<typeof Separator>,
  React.ComponentProps<typeof Separator>
>(({ className, ...props }, ref) => {
  return (
    <Separator
      ref={ref}
      data-sidebar="separator"
      className={cn("mx-2 w-auto bg-sidebar-border", className)}
      {...props}
    />
  );
});
SidebarSeparator.displayName = "SidebarSeparator";

const SidebarContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      data-sidebar="content"
      className={cn(
        "flex min-h-0 flex-1 flex-col gap-2 overflow-auto group-data-[collapsible=icon]:overflow-hidden",
        className,
      )}
      {...props}
    />
  );
});
SidebarContent.displayName = "SidebarContent";

const SidebarGroup = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      data-sidebar="group"
      className={cn("relative flex w-full min-w-0 flex-col", className)}
      {...props}
    />
  );
});
SidebarGroup.displayName = "SidebarGroup";

const SidebarGroupLabel = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> & { asChild?: boolean }
>(({ className, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "div";

  return (
    <Comp
      ref={ref}
      data-sidebar="group-label"
      className={cn(
        "flex h-8 shrink-0 items-center rounded-md px-2 text-xs font-medium text-sidebar-foreground/70 outline-none ring-sidebar-ring transition-[margin,opacity] duration-200 ease-linear focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0",
        "group-data-[collapsible=icon]:-mt-8 group-data-[collapsible=icon]:opacity-0",
        className,
      )}
      {...props}
    />
  );
});
SidebarGroupLabel.displayName = "SidebarGroupLabel";

const SidebarGroupAction = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<"button"> & { asChild?: boolean }
>(({ className, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      ref={ref}
      data-sidebar="group-action"
      className={cn(
        "absolute right-3 top-3.5 flex aspect-square w-5 items-center justify-center rounded-md p-0 text-sidebar-foreground outline-none ring-sidebar-ring transition-transform hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0",
        // Increases the hit area of the button on mobile.
        "after:absolute after:-inset-2 after:md:hidden",
        "group-data-[collapsible=icon]:hidden",
        className,
      )}
      {...props}
    />
  );
});
SidebarGroupAction.displayName = "SidebarGroupAction";

const SidebarGroupContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    data-sidebar="group-content"
    className={cn("w-full text-sm", className)}
    {...props}
  />
));
SidebarGroupContent.displayName = "SidebarGroupContent";

const SidebarMenu = React.forwardRef<
  HTMLUListElement,
  React.ComponentProps<"ul">
>(({ className, ...props }, ref) => (
  <ul
    ref={ref}
    data-sidebar="menu"
    className={cn("flex w-full min-w-0 flex-col gap-1", className)}
    {...props}
  />
));
SidebarMenu.displayName = "SidebarMenu";

const SidebarMenuItem = React.forwardRef<
  HTMLLIElement,
  React.ComponentProps<"li">
>(({ className, ...props }, ref) => (
  <li
    ref={ref}
    data-sidebar="menu-item"
    className={cn("group/navigation-menu-items relative", className)}
    {...props}
  />
));
SidebarMenuItem.displayName = "SidebarMenuItem";

const sidebarMenuButtonVariants = cva(
  "peer/menu-button flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left text-sm outline-none ring-sidebar-ring transition-[width,height,padding] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 group-has-[[data-sidebar=menu-action]]/navigation-menu-items:pr-8 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-[active=true]:bg-sidebar-accent data-[active=true]:font-medium data-[active=true]:text-sidebar-accent-foreground data-[state=open]:hover:bg-sidebar-accent data-[state=open]:hover:text-sidebar-accent-foreground group-data-[collapsible=icon]:size-8 [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
        outline:
          "bg-background shadow-[0_0_0_1px_hsl(var(--sidebar-border))] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground hover:shadow-[0_0_0_1px_hsl(var(--sidebar-accent))]",
      },
      size: {
        default: "h-8 text-sm",
        sm: "h-7 text-xs",
        lg: "h-12 text-sm group-data-[collapsible=icon]:p-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

const SidebarMenuButton = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<"button"> & {
    asChild?: boolean;
    isActive?: boolean;
    tooltip?: string | React.ComponentProps<typeof TooltipContent>;
  } & VariantProps<typeof sidebarMenuButtonVariants>
>(
  (
    {
      asChild = false,
      isActive = false,
      variant = "default",
      size = "default",
      tooltip,
      className,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : "button";
    const { isMobile, state } = useSidebar();

    const button = (
      <Comp
        ref={ref}
        data-sidebar="menu-button"
        data-size={size}
        data-active={isActive}
        className={cn(sidebarMenuButtonVariants({ variant, size }), className)}
        {...props}
      />
    );

    if (!tooltip) {
      return button;
    }

    if (typeof tooltip === "string") {
      tooltip = {
        children: tooltip,
      };
    }

    return (
      <Tooltip>
        <TooltipTrigger asChild>{button}</TooltipTrigger>
        <TooltipContent
          side="right"
          align="center"
          hidden={state !== "collapsed" || isMobile}
          {...tooltip}
        />
      </Tooltip>
    );
  },
);
SidebarMenuButton.displayName = "SidebarMenuButton";

const SidebarMenuAction = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<"button"> & {
    asChild?: boolean;
    showOnHover?: boolean;
  }
>(({ className, asChild = false, showOnHover = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      ref={ref}
      data-sidebar="menu-action"
      className={cn(
        "absolute right-1 top-1.5 flex aspect-square w-5 items-center justify-center rounded-md p-0 text-sidebar-foreground outline-none ring-sidebar-ring transition-transform hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 peer-hover/menu-button:text-sidebar-accent-foreground [&>svg]:size-4 [&>svg]:shrink-0",
        // Increases the hit area of the button on mobile.
        "after:absolute after:-inset-2 after:md:hidden",
        "peer-data-[size=sm]/menu-button:top-1",
        "peer-data-[size=default]/menu-button:top-1.5",
        "peer-data-[size=lg]/menu-button:top-2.5",
        "group-data-[collapsible=icon]:hidden",
        showOnHover &&
          "group-focus-within/navigation-menu-items:opacity-100 group-hover/navigation-menu-items:opacity-100 data-[state=open]:opacity-100 peer-data-[active=true]/menu-button:text-sidebar-accent-foreground md:opacity-0",
        className,
      )}
      {...props}
    />
  );
});
SidebarMenuAction.displayName = "SidebarMenuAction";

const SidebarMenuBadge = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    data-sidebar="menu-badge"
    className={cn(
      "pointer-events-none absolute right-1 flex h-5 min-w-5 select-none items-center justify-center rounded-md px-1 text-xs font-medium tabular-nums text-sidebar-foreground",
      "peer-hover/menu-button:text-sidebar-accent-foreground peer-data-[active=true]/menu-button:text-sidebar-accent-foreground",
      "peer-data-[size=sm]/menu-button:top-1",
      "peer-data-[size=default]/menu-button:top-1.5",
      "peer-data-[size=lg]/menu-button:top-2.5",
      "group-data-[collapsible=icon]:hidden",
      className,
    )}
    {...props}
  />
));
SidebarMenuBadge.displayName = "SidebarMenuBadge";

const SidebarMenuSkeleton = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> & {
    showIcon?: boolean;
  }
>(({ className, showIcon = false, ...props }, ref) => {
  // Random width between 50 to 90%.
  const width = React.useMemo(() => {
    return `${Math.floor(Math.random() * 40) + 50}%`;
  }, []);

  return (
    <div
      ref={ref}
      data-sidebar="menu-skeleton"
      className={cn("flex h-8 items-center gap-2 rounded-md px-2", className)}
      {...props}
    >
      {showIcon && (
        <Skeleton
          className="size-4 rounded-md"
          data-sidebar="menu-skeleton-icon"
        />
      )}
      <Skeleton
        className="h-4 max-w-[--skeleton-width] flex-1"
        data-sidebar="menu-skeleton-text"
        style={
          {
            "--skeleton-width": width,
          } as React.CSSProperties
        }
      />
    </div>
  );
});
SidebarMenuSkeleton.displayName = "SidebarMenuSkeleton";

const SidebarMenuSub = React.forwardRef<
  HTMLUListElement,
  React.ComponentProps<"ul">
>(({ className, ...props }, ref) => (
  <ul
    ref={ref}
    data-sidebar="menu-sub"
    className={cn(
      "mx-3.5 flex min-w-0 translate-x-px flex-col gap-1 px-2.5 py-0.5",
      "group-data-[collapsible=icon]:hidden",
      className,
    )}
    {...props}
  />
));
SidebarMenuSub.displayName = "SidebarMenuSub";

const SidebarMenuSubItem = React.forwardRef<
  HTMLLIElement,
  React.ComponentProps<"li">
>(({ ...props }, ref) => <li ref={ref} {...props} />);
SidebarMenuSubItem.displayName = "SidebarMenuSubItem";

const SidebarMenuSubButton = React.forwardRef<
  HTMLAnchorElement,
  React.ComponentProps<"a"> & {
    asChild?: boolean;
    size?: "sm" | "md";
    isActive?: boolean;
  }
>(({ asChild = false, size = "md", isActive, className, ...props }, ref) => {
  const Comp = asChild ? Slot : "a";

  return (
    <Comp
      ref={ref}
      data-sidebar="menu-sub-button"
      data-size={size}
      data-active={isActive}
      className={cn(
        "flex h-7 min-w-0 -translate-x-px items-center gap-2 overflow-hidden rounded-md px-2 text-sidebar-foreground outline-none ring-sidebar-ring hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0 [&>svg]:text-sidebar-accent-foreground",
        "data-[active=true]:bg-sidebar-accent data-[active=true]:text-sidebar-accent-foreground",
        size === "sm" && "text-xs",
        size === "md" && "text-sm",
        "group-data-[collapsible=icon]:hidden",
        className,
      )}
      {...props}
    />
  );
});
SidebarMenuSubButton.displayName = "SidebarMenuSubButton";

export {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInput,
  SidebarInset,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSkeleton,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarRail,
  SidebarSeparator,
  SidebarTrigger,
  useSidebar,
};
```

## Source File: components/skeleton.tsx

```tsx
import { cn } from "@workspace/ui/utils";

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-md soft-gray-light", className)}
      {...props}
    />
  );
}

export { Skeleton };
```

## Source File: components/sonner.tsx

```tsx
"use client";

import { useTheme } from "next-themes";
import { Toaster as Sonner, toast } from "sonner";

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "dark" } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-[rgba(24,29,34,0.72)] group-[.toaster]:border group-[.toaster]:line-03 group-[.toaster]:text-00 group-[.toaster]:shadow-black-03 group-[.toaster]:rounded-[40px]",
          description: "group-[.toast]:text-02-row",
          actionButton: "group-[.toast]:primary-01 group-[.toast]:text-00",
          cancelButton:
            "group-[.toast]:border group-[.toast]:line-03 group-[.toast]:bg-transparent group-[.toast]:text-00 group-[.toast]:backdrop-blur-sm",
        },
      }}
      {...props}
    />
  );
};

export { toast, Toaster };
```

## Source File: components/switch.tsx

```tsx
"use client";

import * as SwitchPrimitives from "@radix-ui/react-switch";
import { cn } from "@workspace/ui/utils";
import * as React from "react";

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>
>(({ className, ...props }, ref) => (
  <SwitchPrimitives.Root
    className={cn(
      "peer inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent shadow-black-03 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-line-03 focus-visible:ring-offset-2 focus-visible:ring-offset-bg-00 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:primary-01 data-[state=unchecked]:bg-gray-01",
      className,
    )}
    {...props}
    ref={ref}
  >
    <SwitchPrimitives.Thumb
      className={cn(
        "pointer-events-none block h-4 w-4 rounded-full bg-00 shadow-black-03 ring-0 transition-transform data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0",
      )}
    />
  </SwitchPrimitives.Root>
));
Switch.displayName = SwitchPrimitives.Root.displayName;

export { Switch };
```

## Source File: components/tabs.tsx

```tsx
"use client";

import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import { cn } from "@workspace/ui/utils";

const Tabs = TabsPrimitive.Root;

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      "bg-02 text-02-row inline-flex h-9 items-center justify-center rounded-lg p-1",
      className,
    )}
    {...props}
  />
));
TabsList.displayName = TabsPrimitive.List.displayName;

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      "inline-flex items-center justify-center whitespace-nowrap py-2 text-sm text-03-high disabled:pointer-events-none disabled:opacity-50",
      "data-[state=active]:border-b-[3px] data-[state=active]:line-03 data-[state=active]:text-04-brand",
      className,
    )}
    {...props}
  />
));
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      "focus-visible:ring-line-03 mt-2 ring-offset-bg-00 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
      className,
    )}
    {...props}
  />
));
TabsContent.displayName = TabsPrimitive.Content.displayName;

export { Tabs, TabsList, TabsTrigger, TabsContent };
```

## Source File: components/text.tsx

```tsx
"use client";

import { cn } from "@workspace/ui/utils";
import { cva, type VariantProps } from "class-variance-authority";
import React from "react";

export const typographyVariants = cva("font-pretendard", {
  variants: {
    variant: {
      h1: "",
      h2: "",
      h3: "",
      h4: "",
      p: "",
      span: "",
    },
    size: {
      12: "text-[0.75rem] leading-[1.02rem] tracking-[-0.03125rem]",
      14: "text-[14px] leading-[19.6px] tracking-[-0.03125rem]",
      16: "text-[1rem] leading-[1.48rem] tracking-[-0.03125rem]",
      18: "text-[1.125rem] leading-[1.53rem] tracking-[-0.03125rem]",
      20: "text-[1.25rem] leading-[1.5rem] tracking-[-0.0625rem]",
      24: "text-[1.5rem] leading-[2.1rem] tracking-[-0.08125rem]",
      28: "text-[1.75rem] leading-[2.38rem] tracking-[-0.08125rem]",
      32: "text-[2rem] leading-[2.4rem] tracking-[-0.06rem]",
      36: "text-[2.25rem] leading-[2.88rem] tracking-[-0.0675rem]",
      40: "text-[2.5rem] leading-[3rem] tracking-[-0.075rem]",
      48: "text-[3rem] leading-[3.6rem] tracking-[-0.09rem]",
      72: "text-[4.5rem] leading-[5.4rem] tracking-[-0.25rem]",
    },
    weight: {
      semibold: "font-semibold",
      bold: "font-bold",
      medium: "font-medium",
    },
  },
});
export interface TypographyProps
  extends
    React.HTMLAttributes<HTMLHeadingElement>,
    VariantProps<typeof typographyVariants> {}

const Text = React.forwardRef<HTMLHeadingElement, TypographyProps>(
  ({ className, variant, size = 16, weight = "medium", ...props }, ref) => {
    const Comp = variant || "p";

    return (
      <Comp
        className={cn(typographyVariants({ variant, size, className, weight }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Text.displayName = "Text";

export { Text };
```

## Source File: components/textarea.tsx

```tsx
import * as React from "react";

import { cn } from "@workspace/ui/utils";

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.ComponentProps<"textarea">
>(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        "flex min-h-[60px] w-full rounded-lg border line-01 bg-00 px-3 py-2 text-base text-03-high shadow-black-03 placeholder:text-02-row focus-visible:outline-none focus-visible:border-2 focus-visible:line-03 disabled:cursor-not-allowed disabled:bg-02 disabled:opacity-50 md:text-sm",
        className,
      )}
      ref={ref}
      {...props}
    />
  );
});
Textarea.displayName = "Textarea";

export { Textarea };
```

## Source File: components/tooltip.tsx

```tsx
"use client";

import * as React from "react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { cn } from "@workspace/ui/utils";

const TooltipProvider = TooltipPrimitive.Provider;

const Tooltip = TooltipPrimitive.Root;

const TooltipTrigger = TooltipPrimitive.Trigger;

const TooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <TooltipPrimitive.Portal>
    <TooltipPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      className={cn(
        "rounded-md px-3 py-1.5 text-xs animate-in fade-in-0 zoom-in-95 bg-gray-06 text-00 shadow-black-04 z-50 origin-[--radix-tooltip-content-transform-origin] data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        className,
      )}
      {...props}
    />
  </TooltipPrimitive.Portal>
));
TooltipContent.displayName = TooltipPrimitive.Content.displayName;

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider };
```

## Source File: modules/calendar/calendar-module.css

```css
/* Variables declaration */
/* prettier-ignore */
.rdp-root {
    --rdp-accent-color: #1C2846; /* The accent color used for selected days and UI elements. */
    --rdp-accent-background-color: #f0f0ff; /* The accent background color used for selected days and UI elements. */
    --rdp-selected-color: #628cf5;

    --rdp-day-height: 44px; /* The height of the day cells. */
    --rdp-day-width: 44px; /* The width of the day cells. */

    --rdp-day_button-border-radius: 20%; /* The border radius of the day cells. */
    --rdp-day_button-border: 2px solid transparent; /* The border of the day cells. */
    --rdp-day_button-height: 42px; /* The height of the day cells. */
    --rdp-day_button-width: 42px; /* The width of the day cells. */

    --rdp-selected-border: 2px solid var(--rdp-accent-color); /* The border of the selected days. */
    --rdp-disabled-opacity: 0.5; /* The opacity of the disabled days. */
    --rdp-outside-opacity: 0.75; /* The opacity of the days outside the current month. */
    --rdp-today-color: var(--rdp-accent-color); /* The color of the today's date. */

    --rdp-dropdown-gap: 0.5rem;/* The gap between the dropdowns used in the month captons. */

    --rdp-months-gap: 2rem; /* The gap between the months in the multi-month view. */

    --rdp-nav_button-disabled-opacity: 0.5; /* The opacity of the disabled navigation buttons. */
    --rdp-nav_button-height: 2.25rem; /* The height of the navigation buttons. */
    --rdp-nav_button-width: 2.25rem; /* The width of the navigation buttons. */
    --rdp-nav-height: 2.75rem; /* The height of the navigation bar. */

    --rdp-range_middle-background-color: #E6EDFF; /* The color of the background for days in the middle of a range. */
    --rdp-range_middle-color: inherit;/* The color of the range text. */

    --rdp-range_start-color: white; /* The color of the range text. */
    --rdp-range_start-background: linear-gradient(var(--rdp-gradient-direction), transparent 50%, var(--rdp-range_middle-background-color) 50%); /* Used for the background of the start of the selected range. */
    --rdp-range_start-date-background-color: var(--rdp-accent-color); /* The background color of the date when at the start of the selected range. */

    --rdp-range_end-background: linear-gradient(var(--rdp-gradient-direction), var(--rdp-range_middle-background-color) 50%, transparent 50%); /* Used for the background of the end of the selected range. */
    --rdp-range_end-color: white;/* The color of the range text. */
    --rdp-range_end-date-background-color: var(--rdp-accent-color); /* The background color of the date when at the end of the selected range. */

    --rdp-week_number-border-radius: 100%; /* The border radius of the week number. */
    --rdp-week_number-border: 2px solid transparent; /* The border of the week number. */

    --rdp-week_number-height: var(--rdp-day-height); /* The height of the week number cells. */
    --rdp-week_number-opacity: 0.75; /* The opacity of the week number. */
    --rdp-week_number-width: var(--rdp-day-width); /* The width of the week number cells. */
    --rdp-weeknumber-text-align: center; /* The text alignment of the weekday cells. */

    --rdp-weekday-opacity: 0.75; /* The opacity of the weekday. */
    --rdp-weekday-padding: 0.5rem 0rem; /* The padding of the weekday. */
    --rdp-weekday-text-align: center; /* The text alignment of the weekday cells. */

    --rdp-gradient-direction: 90deg;

    --rdp-animation_duration: 0.3s;
    --rdp-animation_timing: cubic-bezier(0.4, 0, 0.2, 1);
}

.rdp-root[dir="rtl"] {
  --rdp-gradient-direction: -90deg;
}

.rdp-root[data-broadcast-calendar="true"] {
  --rdp-outside-opacity: unset;
}

/* Root of the component. */
.rdp-root {
  position: relative; /* Required to position the navigation toolbar. */
  box-sizing: border-box;
}

.rdp-root * {
  box-sizing: border-box;
}

.rdp-day {
  width: var(--rdp-day-width);
  height: var(--rdp-day-height);
  text-align: center;
}

.rdp-day_button {
  background: none;
  padding: 0;
  margin: 0;
  cursor: pointer;
  font: inherit;
  color: inherit;
  justify-content: center;
  align-items: center;
  display: flex;
  font-size: 14px;

  width: var(--rdp-day_button-width);
  height: var(--rdp-day_button-height);
  border: var(--rdp-day_button-border);
  border-radius: var(--rdp-day_button-border-radius);
}
.rdp-day_button:hover {
  background-color: rgb(var(--color-bg-04));
}

.rdp-day_button:disabled {
  cursor: revert;
}

.rdp-caption_label {
  z-index: 1;

  position: relative;
  display: inline-flex;
  align-items: center;

  white-space: nowrap;
  border: 0;
}

.rdp-dropdown:focus-visible ~ .rdp-caption_label {
  outline: 5px auto Highlight;
  outline: 5px auto -webkit-focus-ring-color;
}

.rdp-button_next,
.rdp-button_previous {
  border: none;
  background: none;
  padding: 0;
  margin: 0;
  cursor: pointer;
  font: inherit;
  color: inherit;
  -moz-appearance: none;
  -webkit-appearance: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  position: relative;
  appearance: none;

  width: var(--rdp-nav_button-width);
  height: var(--rdp-nav_button-height);
}

.rdp-button_next:disabled,
.rdp-button_next[aria-disabled="true"],
.rdp-button_previous:disabled,
.rdp-button_previous[aria-disabled="true"] {
  cursor: revert;

  opacity: var(--rdp-nav_button-disabled-opacity);
}

.rdp-chevron {
  display: inline-block;
  fill: var(--rdp-accent-color);
}

.rdp-root[dir="rtl"] .rdp-nav .rdp-chevron {
  transform: rotate(180deg);
  transform-origin: 50%;
}

.rdp-dropdowns {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: var(--rdp-dropdown-gap);
}
.rdp-dropdown {
  z-index: 2;

  /* Reset */
  opacity: 0;
  appearance: none;
  position: absolute;
  inset-block-start: 0;
  inset-block-end: 0;
  inset-inline-start: 0;
  width: 100%;
  margin: 0;
  padding: 0;
  cursor: inherit;
  border: none;
  line-height: inherit;
}

.rdp-dropdown_root {
  position: relative;
  display: inline-flex;
  align-items: center;
}

.rdp-dropdown_root[data-disabled="true"] .rdp-chevron {
  opacity: var(--rdp-disabled-opacity);
}

.rdp-month_caption {
  display: flex;
  align-content: center;
  height: var(--rdp-nav-height);
  font-weight: bold;
  font-size: large;
}

.rdp-months {
  position: relative;
  display: flex;
  flex-wrap: wrap;
  gap: var(--rdp-months-gap);
  max-width: fit-content;
}

.rdp-month_grid {
  height: 300px;
  border-collapse: collapse;
}

.rdp-nav {
  position: absolute;
  inset-block-start: 0;
  inset-inline-end: 0;

  display: flex;
  align-items: center;

  height: var(--rdp-nav-height);
}

.rdp-weekday {
  opacity: var(--rdp-weekday-opacity);
  padding: var(--rdp-weekday-padding);
  font-weight: 500;
  font-size: smaller;
  text-align: var(--rdp-weekday-text-align);
  /*text-transform: var(--rdp-weekday-text-transform);*/
}

.rdp-week_number {
  opacity: var(--rdp-week_number-opacity);
  font-weight: 400;
  font-size: small;
  height: var(--rdp-week_number-height);
  width: var(--rdp-week_number-width);
  border: var(--rdp-week_number-border);
  border-radius: var(--rdp-week_number-border-radius);
  text-align: var(--rdp-weeknumber-text-align);
}

/* DAY MODIFIERS */
.rdp-today:not(.rdp-outside) {
  color: var(--rdp-today-color);
}

.rdp-selected {
  font-weight: bold;
  font-size: large;
}

.rdp-selected .rdp-day_button {
  /*border: var(--rdp-selected-border);*/
  background: var(--rdp-selected-color);
  color: white;
}

.rdp-outside {
  opacity: var(--rdp-outside-opacity);
}

.rdp-disabled {
  opacity: var(--rdp-disabled-opacity);
}

.rdp-hidden {
  visibility: hidden;
  color: var(--rdp-range_start-color);
}

.rdp-range_start {
  background: var(--rdp-range_start-background);
}

.rdp-range_start .rdp-day_button {
  background-color: var(--rdp-range_start-date-background-color);
  color: var(--rdp-range_start-color);
}

.rdp-range_middle {
  background-color: var(--rdp-range_middle-background-color);
}

.rdp-range_middle .rdp-day_button {
  border-color: transparent;
  border: unset;
  border-radius: unset;
  color: var(--rdp-range_middle-color);
}

.rdp-range_end {
  background: var(--rdp-range_end-background);
  color: var(--rdp-range_end-color);
}

.rdp-range_end .rdp-day_button {
  color: var(--rdp-range_start-color);
  background-color: var(--rdp-range_end-date-background-color);
}

.rdp-range_start.rdp-range_end {
  background: revert;
}

.rdp-focusable {
  cursor: pointer;
}

@keyframes rdp-slide_in_left {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(0);
  }
}

@keyframes rdp-slide_in_right {
  0% {
    transform: translateX(100%);
  }
  100% {
    transform: translateX(0);
  }
}

@keyframes rdp-slide_out_left {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-100%);
  }
}

@keyframes rdp-slide_out_right {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(100%);
  }
}

.rdp-weeks_before_enter {
  animation: rdp-slide_in_left var(--rdp-animation_duration)
    var(--rdp-animation_timing) forwards;
}

.rdp-weeks_before_exit {
  animation: rdp-slide_out_left var(--rdp-animation_duration)
    var(--rdp-animation_timing) forwards;
}

.rdp-weeks_after_enter {
  animation: rdp-slide_in_right var(--rdp-animation_duration)
    var(--rdp-animation_timing) forwards;
}

.rdp-weeks_after_exit {
  animation: rdp-slide_out_right var(--rdp-animation_duration)
    var(--rdp-animation_timing) forwards;
}

.rdp-root[dir="rtl"] .rdp-weeks_after_enter {
  animation: rdp-slide_in_left var(--rdp-animation_duration)
    var(--rdp-animation_timing) forwards;
}

.rdp-root[dir="rtl"] .rdp-weeks_before_exit {
  animation: rdp-slide_out_right var(--rdp-animation_duration)
    var(--rdp-animation_timing) forwards;
}

.rdp-root[dir="rtl"] .rdp-weeks_before_enter {
  animation: rdp-slide_in_right var(--rdp-animation_duration)
    var(--rdp-animation_timing) forwards;
}

.rdp-root[dir="rtl"] .rdp-weeks_after_exit {
  animation: rdp-slide_out_left var(--rdp-animation_duration)
    var(--rdp-animation_timing) forwards;
}

@keyframes rdp-fade_in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes rdp-fade_out {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}

.rdp-caption_after_enter {
  animation: rdp-fade_in var(--rdp-animation_duration)
    var(--rdp-animation_timing) forwards;
}

.rdp-caption_after_exit {
  animation: rdp-fade_out var(--rdp-animation_duration)
    var(--rdp-animation_timing) forwards;
}

.rdp-caption_before_enter {
  animation: rdp-fade_in var(--rdp-animation_duration)
    var(--rdp-animation_timing) forwards;
}

.rdp-caption_before_exit {
  animation: rdp-fade_out var(--rdp-animation_duration)
    var(--rdp-animation_timing) forwards;
}

.rdp-focused {
  outline: 5px auto Highlight;
  outline: 5px auto -webkit-focus-ring-color;
}
```

## Source File: modules/calendar/calendar-module.tsx

```tsx
"use client";

import { Text } from "@workspace/ui/components";
import { cn } from "@workspace/ui/utils";
import { X } from "lucide-react";
import React, { useRef } from "react";
import { DayPicker, useNavigation } from "react-day-picker";
import "./calendar-module.css";

interface Props {
  dateValue: Date;

  onChangeDate: (date: Date) => void;
  /**
   * root div를 제어하기 위한 className
   */
  rootClassName?: string;

  onOpenChange?: (isOpen: boolean) => void;
  header?: {
    /**
     * x 버튼 클릭 이벤트
     */
    onCloseClick?: () => void;
    /**
     * x 버튼 노출 여부
     */
    isCloseButton?: boolean;
    hide?: boolean;
    title?: string;
  };

  footer?: React.ReactNode;
}

function Header(props: {
  closeButton: boolean;
  onClick: () => void | undefined;
  title: string;
}) {
  return (
    <div className="relative flex justify-center border-b line-01 p-2">
      <Text size={16} weight={"bold"}>
        {props.title}
      </Text>
      {props.closeButton ? (
        <X
          onClick={props.onClick}
          className="absolute right-4 cursor-pointer text-gray-05-icon-high"
        />
      ) : (
        ""
      )}
    </div>
  );
}

export function CalendarModule(props: Props) {
  const {
    dateValue,
    onChangeDate,
    rootClassName,
    header,
    footer,
    onOpenChange,
  } = props;
  const rootContainerRef = useRef<HTMLDivElement | null>(null);

  return (
    <div className={cn("rounded-xl bg-00", rootClassName)}>
      {!header?.hide && (
        <Header
          closeButton={header?.isCloseButton ?? false}
          onClick={() => header?.onCloseClick?.()}
          title={header?.title ?? "날짜 선택"}
        />
      )}

      <DayPicker
        mode={"single"}
        selected={dateValue}
        defaultMonth={dateValue}
        onSelect={(val) => {
          if (!val) return;
          onChangeDate(val);
        }}
        onDayKeyDown={(date, modifiers, e) => {
          if (e.key === "Enter" && rootContainerRef.current) {
            const focusedDay =
              rootContainerRef.current.getElementsByClassName(
                "rdp-focused",
              )[0]!;
            onChangeDate(
              new Date(focusedDay.getAttribute("data-day") as string),
            );

            onOpenChange?.(false);
          }
        }}
        components={{
          Root: (props) => {
            return (
              <div className={"rdp-root"} ref={rootContainerRef}>
                {props.children}
              </div>
            );
          },

          Nav: (props) => {
            const { months } = useNavigation();
            const { onNextClick, onPreviousClick } = props;

            return (
              <div className={"flex w-full items-center justify-between p-3"}>
                <button
                  onClick={(e) => {
                    onPreviousClick?.(e);
                  }}
                  aria-label={"prev-month"}
                  className="cursor-pointer rounded p-1 text-gray-05-icon-high [&_svg_path]:stroke-current"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="16"
                    viewBox="0 0 21 18"
                    fill="none"
                  >
                    <path
                      d="M19.4004 9L3.23173 9"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                    <path
                      d="M10.1107 1.80005C10.1107 1.80005 8.5439 4.56088 7.12575 5.97902C5.70761 7.39717 2.94678 8.96401 2.94678 8.96401C2.94678 8.96401 5.70761 10.5308 7.12575 11.949C8.5439 13.3671 10.1107 16.128 10.1107 16.128"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </button>
                <span className="text-03-high">{`${months[0]!.date.getMonth() + 1}월 ${months[0]!.date.getFullYear()}`}</span>
                <button
                  onClick={(e) => {
                    onNextClick?.(e);
                  }}
                  aria-label={"next-month"}
                  className="cursor-pointer rounded p-1 text-gray-05-icon-high [&_svg_path]:stroke-current"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="16"
                    viewBox="0 0 21 18"
                    fill="none"
                  >
                    <path
                      d="M1.59961 9H17.7683"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                    <path
                      d="M10.8893 1.80005C10.8893 1.80005 12.4561 4.56088 13.8742 5.97902C15.2924 7.39717 18.0532 8.96401 18.0532 8.96401C18.0532 8.96401 15.2924 10.5308 13.8742 11.949C12.4561 13.3671 10.8893 16.128 10.8893 16.128"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </button>
              </div>
            );
          },
          Months: ({ children }) => {
            return <div>{children}</div>;
          },
          Weekdays: (props) => {
            return (
              <thead className={props.className}>
                <tr>{props.children}</tr>
              </thead>
            );
          },
          Day: (props) => {
            const { day, modifiers, className, children } = props;

            return (
              <td className={cn("relative border", className)} {...props}>
                {children}
              </td>
            );
          },
          MonthCaption: (props) => {
            return <></>;
          },
        }}
        footer={footer}
      />
    </div>
  );
}
```

## Source File: modules/calendar/index.ts

```ts
export * from "./calendar-module";
```

## Source File: modules/date-picker/date-picker-module.tsx

```tsx
"use client";
import * as React from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@workspace/ui/components/popover";
import { CalendarModule } from "@workspace/ui/modules";
import { cn } from "@workspace/ui/utils";
import { useRef } from "react";

const CalendarIcon: React.FC = () => (
  <svg
    width="15"
    height="15"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="size-4 text-gray-05-icon-high [&_path]:stroke-current [&_rect]:stroke-current"
  >
    <rect
      x="3"
      y="4.99976"
      width="18"
      height="16"
      rx="1"
      stroke="currentColor"
      strokeWidth="2"
    />
    <path
      d="M8 3L8 7"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <path
      d="M7 12H17"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <path
      d="M16 3L16 7"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

const DateDisplay: React.FC<{ date: string }> = ({ date }) => (
  <time
    dateTime={date}
    className="text-14 cursor-pointer gap-1 px-4 py-3 leading-6 tracking-normal text-02-row"
  >
    {date}
  </time>
);

const _divider: React.FC<{ orientation: "horizontal" | "vertical" }> = ({
  orientation,
}) => {
  if (orientation === "horizontal") {
    return <div className="h-[3px] w-3 line-01" role="separator" />;
  }
  return <div className="h-6 w-0.5 line-01" role="separator" />;
};

interface Props {
  open: boolean;
  onChangeOpen: (open: boolean) => void;
  onChangeDate: (date: Date) => void;
  date: Date | null;
  placeholder?: string;
  size?: "sm" | "md";
  dateFormat?: "iso" | "slash";
  label?: string;
  onClearClick?: () => void;
}

const LOCALE_DATE_TYPE = "en-CA";

function formatDate(date: Date, fmt: "iso" | "slash"): string {
  const iso = date.toLocaleDateString(LOCALE_DATE_TYPE);
  return fmt === "slash" ? iso.replaceAll("-", "/") : iso;
}

const DatePickerModule = (props: Props) => {
  const {
    open,
    onChangeOpen,
    date,
    onChangeDate,
    placeholder,
    size = "md",
    dateFormat = "iso",
    label,
  } = props;

  const refButton = useRef<HTMLButtonElement | null>(null);
  const calendarDate = date ?? new Date();
  const isSm = size === "sm";
  const display = date ? formatDate(date, dateFormat) : (placeholder ?? "");

  const trigger = (
    <Popover open={open} onOpenChange={onChangeOpen}>
      <PopoverTrigger asChild>
        <div
          className={cn(
            "box-border flex items-center bg-00",
            isSm
              ? "line-01 h-[40px] rounded-[10px] border"
              : "h-[40px] rounded-xl border-2 line-02",
          )}
        >
          <div
            className={cn(
              "flex flex-1 items-center",
              isSm ? "px-[12px]" : "justify-center px-0 py-4",
            )}
          >
            <button
              ref={refButton}
              type="button"
              className={isSm ? "w-full text-left" : undefined}
            >
              {isSm ? (
                <span
                  className={cn(
                    "text-[14px] leading-[1.48] tracking-[0px]",
                    date ? "text-03-high" : "text-02-row",
                  )}
                >
                  {display}
                </span>
              ) : (
                <DateDisplay date={display} />
              )}
            </button>
          </div>
          <div
            className={cn(
              "flex items-center",
              isSm ? "gap-[8px] pr-[10px]" : "gap-2 py-4 pr-4 pl-2",
            )}
          >
            {isSm ? (
              <span className="line-01 h-[20px] w-[1px]" aria-hidden />
            ) : (
              <_divider orientation="vertical" />
            )}
            <CalendarIcon />
          </div>
        </div>
      </PopoverTrigger>
      <PopoverContent
        onCloseAutoFocus={() => {
          refButton.current?.focus();
        }}
        align={"start"}
        className={"shadow-black-04 w-fit border-none bg-00"}
      >
        <CalendarModule
          header={{ hide: true }}
          dateValue={calendarDate}
          onChangeDate={(val) => {
            onChangeDate(val);
          }}
        />
      </PopoverContent>
    </Popover>
  );

  if (!label) return trigger;

  return (
    <div
      className={cn(
        "flex flex-col gap-[2px]",
        isSm ? "w-[152px]" : "w-[200px]",
      )}
    >
      <span className="text-02-row pl-[8px] text-[13px] leading-[1.36] font-medium tracking-[-0.5px]">
        {label}
      </span>
      {trigger}
    </div>
  );
};

export { DatePickerModule };
```

## Source File: modules/date-picker/index.ts

```ts
export * from "./date-picker-module";
```

## Source File: modules/dnd/dnd-boundary.tsx

```tsx
"use client";

import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragStartEvent,
} from "@dnd-kit/core";
import { useId, useState } from "react";

export type DndTypeGuard<TData> = (value: unknown) => value is TData;

export interface DndBoundaryProps<TSource, TTarget> {
  children: React.ReactNode;
  isSourceData: DndTypeGuard<TSource>;
  isTargetData: DndTypeGuard<TTarget>;
  onDrop: (params: { source: TSource; target: TTarget }) => void;
  renderOverlay?: (params: { source: TSource }) => React.ReactNode;
  activationDistance?: number;
}

export function DndBoundary<TSource, TTarget>({
  children,
  isSourceData,
  isTargetData,
  onDrop,
  renderOverlay,
  activationDistance = 8,
}: DndBoundaryProps<TSource, TTarget>) {
  const dndId = useId();
  const [activeSource, setActiveSource] = useState<TSource | null>(null);
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: activationDistance,
      },
    }),
  );

  const handleDragStart = (event: DragStartEvent) => {
    const source = event.active.data.current;

    setActiveSource(isSourceData(source) ? source : null);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const source = event.active.data.current;
    const target = event.over?.data.current;

    setActiveSource(null);

    if (!isSourceData(source) || !isTargetData(target)) {
      return;
    }

    onDrop({ source, target });
  };

  return (
    <DndContext
      id={dndId}
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragCancel={() => setActiveSource(null)}
    >
      {children}
      {renderOverlay ? (
        <DragOverlay>
          {activeSource ? renderOverlay({ source: activeSource }) : null}
        </DragOverlay>
      ) : null}
    </DndContext>
  );
}
```

## Source File: modules/dnd/index.ts

```ts
export { DndBoundary } from "./dnd-boundary";
export type { DndBoundaryProps, DndTypeGuard } from "./dnd-boundary";
export type { DragSourceFactory, DropTargetFactory } from "./types";
```

## Source File: modules/dnd/types.ts

```ts
export interface DragSourceFactory<TContext, TSource> {
  getDragSource: (context: TContext) => TSource | null;
}

export interface DropTargetFactory<TContext, TTarget> {
  getDropTarget: (context: TContext) => TTarget | null;
}
```

## Source File: modules/index.ts

```ts
// Modules
export * from "./calendar";
export * from "./date-picker";
export * from "./dnd";
export * from "./input-number";
export * from "./modal";
export * from "./modal/modal-module";
export * from "./pagination";
export * from "./search-input";
```

## Source File: modules/input-number/index.ts

```ts
export * from "./input-number-module";
```

## Source File: modules/input-number/input-number-module.tsx

```tsx
"use client";
import { cn } from "@workspace/ui/utils";
import * as React from "react";
import { NumericFormat, NumericFormatProps } from "react-number-format";

interface Props extends NumericFormatProps {
  align?: "left" | "right";
  inputSize?: "default" | "compact";
  state?: "default" | "error" | "success";
}

const InputNumber = React.forwardRef<HTMLInputElement, Props>(
  (
    {
      className,
      defaultValue = "",
      align = "right",
      inputSize = "default",
      state = "default",
      ...props
    },
    ref: React.ForwardedRef<HTMLInputElement>,
  ) => {
    const isCompact = inputSize === "compact";

    return (
      <div className="relative w-fit">
        <NumericFormat
          className={cn(
            "flex items-center rounded-lg border-2 line-01 bg-00",
            "hover:rounded-lg hover:border-2 hover:line-02 hover:bg-03",
            "focus:rounded-lg focus:border-2 focus:line-03 focus:bg-00 focus:outline-none",
            "disabled:cursor-not-allowed disabled:bg-01 disabled:text-02-row",
            isCompact ? "h-[40px] w-[200px] p-2" : "h-[56px] w-[200px] p-3",
            align === "right" ? "text-right" : "text-left",
            state === "error" &&
              "border-state-error hover:border-state-error focus:border-state-error",
            state === "success" &&
              "border-state-success hover:border-state-success focus:border-state-success",
            className,
          )}
          getInputRef={ref}
          {...props}
        />
      </div>
    );
  },
);

export { InputNumber };
```

## Source File: modules/modal/default-modal.tsx

```tsx
"use client";
import { AlertDialog } from "@workspace/ui/components";
import * as React from "react";

import { cn } from "@workspace/ui/utils";

interface Props {
  isOpen: boolean;
  onOpenChange?: (isOpen: boolean) => void;

  title?: string;
  className?: string;
  description?: string | React.ReactNode;
  footer?: React.ReactNode;
}

function DefaultModal(props: Props) {
  const { isOpen, onOpenChange, title, footer, description, className } = props;

  return (
    <>
      <AlertDialog open={isOpen} onOpenChange={onOpenChange}>
        <AlertDialog.Content className={cn("px-[48px] w-[600px]", className)}>
          <AlertDialog.Header>
            <AlertDialog.Title>{title}</AlertDialog.Title>

            <AlertDialog.Description
              className={"flex items-center justify-center font-semibold"}
              asChild={!(typeof description === "string")}
            >
              {description}
            </AlertDialog.Description>
          </AlertDialog.Header>
          <AlertDialog.Footer className={"h-[48px]"}>
            {footer}
          </AlertDialog.Footer>
        </AlertDialog.Content>
      </AlertDialog>
    </>
  );
}

export { DefaultModal };
```

## Source File: modules/modal/img-alert-question.tsx

```tsx
"use client";
import * as React from "react";

interface Props {}

function ImgAlertQuestion(props: Props) {
  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="109"
        height="109"
        viewBox="0 0 109 109"
        fill="none"
      >
        <ellipse cx="54.5" cy="54.5" rx="50" ry="50.463" fill="#9FB8F8" />
        <path
          d="M57.0593 53.5839C53.2038 56.2192 50.7425 58.8544 50.0242 65.7234C49.7786 68.0714 51.7294 69.9999 54.0902 69.9999C56.4191 69.9999 58.2093 68.0981 58.7196 65.8257C59.4658 62.5025 61.2248 60.4456 64.3121 58.3886C69.0264 55.2656 72 51.0214 72 44.5351C72 35.0058 65.2549 28.9999 55.4637 28.9999C47.9289 28.9999 41.5323 32.9418 39.5954 40.6325C38.9692 43.119 41.1066 45.2558 43.6708 45.2558C46.1264 45.2558 47.9711 43.1931 49.1355 41.0311C50.4791 38.5365 52.9009 37.3281 55.3912 37.3281C59.3802 37.3281 62.4989 40.2109 62.4989 44.6953C62.4989 48.6992 60.178 51.4218 57.0593 53.5839Z"
          fill="#201D30"
        />
        <path
          d="M45.7568 97.4746C73.371 97.4746 95.7568 74.8816 95.7568 47.0117C95.7568 33.6705 90.6271 21.5385 82.2499 12.5152C95.6659 21.5652 104.501 36.9912 104.501 54.4999C104.501 82.3699 82.1151 104.963 54.5009 104.963C40.1054 104.963 27.1308 98.823 18.0078 88.9964C25.9471 94.352 35.4906 97.4746 45.7568 97.4746Z"
          fill="#628CF5"
        />
        <path
          d="M36.9538 101.768C26.2485 92.5131 19.4648 78.7702 19.4648 63.4281C19.4648 35.5582 41.8506 12.9652 69.4648 12.9652C75.6389 12.9652 81.5515 14.0946 87.0111 16.1598C78.2695 8.60225 66.913 4.03705 54.5 4.03705C26.8858 4.03705 4.5 26.6301 4.5 54.5C4.5 76.1387 17.9947 94.5964 36.9538 101.768Z"
          fill="white"
        />
        <path
          d="M54.5 5.11224C81.5112 5.11224 103.425 27.2144 103.425 54.4999C103.425 81.7855 81.5112 103.888 54.5 103.888C27.4888 103.888 5.5752 81.7855 5.5752 54.4999C5.57523 27.2144 27.4888 5.11224 54.5 5.11224Z"
          stroke="#201D30"
          strokeWidth="2.15"
        />
        <circle
          cx="55"
          cy="82"
          r="3.91485"
          fill="#201D30"
          stroke="#201D30"
          strokeWidth="2.17029"
        />
      </svg>
    </>
  );
}

export default ImgAlertQuestion;
```

## Source File: modules/modal/index.ts

```ts
export * from "./modal-module";
export * from "./state-modal";
```

## Source File: modules/modal/modal-module.tsx

```tsx
"use client";
import { AlertDialog } from "@workspace/ui/components";
import { cn } from "@workspace/ui/utils";
import * as React from "react";

interface Props {
  isOpen: boolean;
  onOpenChange?: (isOpen: boolean) => void;
  modalTitle?: string | React.ReactNode;
  modalDescription?: string | React.ReactNode;
  modalFooter?: React.ReactNode;
  contentClassName?: string;
}

function ModalModule(props: Props) {
  const {
    isOpen,
    onOpenChange,
    modalTitle,
    modalDescription,
    modalFooter,
    contentClassName,
  } = props;

  return (
    <AlertDialog open={isOpen} onOpenChange={onOpenChange}>
      <AlertDialog.Content className={cn("max-w-lg", contentClassName)}>
        <AlertDialog.Header>
          <AlertDialog.Title asChild={typeof modalTitle !== "string"}>
            {modalTitle}
          </AlertDialog.Title>
          <AlertDialog.Description
            asChild={typeof modalDescription !== "string"}
          >
            {modalDescription}
          </AlertDialog.Description>
        </AlertDialog.Header>
        <AlertDialog.Footer>{modalFooter}</AlertDialog.Footer>
      </AlertDialog.Content>
    </AlertDialog>
  );
}

export { ModalModule };
```

## Source File: modules/modal/state-modal.tsx

```tsx
"use client";
import { AlertDialog } from "@workspace/ui/components";
import json_alert_activate from "@workspace/ui/public/lottie/json_alert_activate.json";
import json_alert_deactivate from "@workspace/ui/public/lottie/json_alert_deactivate.json";
import json_alert_error from "@workspace/ui/public/lottie/json_alert_error.json";
import json_alert_information from "@workspace/ui/public/lottie/json_alert_information.json";
import json_alert_success from "@workspace/ui/public/lottie/json_alert_success.json";
import json_alert_warning from "@workspace/ui/public/lottie/json_alert_warning.json";
import * as React from "react";

import ImgAlertQuestion from "@workspace/ui/modules/modal/img-alert-question";
import { cn } from "@workspace/ui/utils";
import { lazy } from "react";

const Lottie = lazy(() => import("lottie-react"));

interface Props {
  isOpen: boolean;
  onOpenChange?: (isOpen: boolean) => void;
  type:
    | "warning"
    | "error"
    | "info"
    | "success"
    | "question"
    | "activate"
    | "deactivate";
  className?: string;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  footer?: React.ReactNode;
}

interface ActionsProps {
  cancelText?: string;
  confirmText: string;
  onCancel?: () => void;
  onConfirm: () => void | Promise<void>;
  confirmVariant?: "primary" | "destructive";
}

const typeAnimation = {
  warning: json_alert_warning,
  info: json_alert_information,
  error: json_alert_error,
  success: json_alert_success,
  activate: json_alert_activate,
  deactivate: json_alert_deactivate,
  question: <ImgAlertQuestion />,
};

const FIGMA_SHADOW =
  "shadow-[0_2px_2px_rgba(15,15,15,0.01),0_3px_5px_rgba(15,15,15,0.01),0_7px_10px_rgba(15,15,15,0.02),0_24px_32px_rgba(15,15,15,0.03)]";

const ACTION_TEXT_BASE =
  "mt-0 cursor-pointer bg-transparent py-[12px] pl-[16px] pr-[10px] text-[20px] font-bold leading-[1.36] tracking-[-1px] shadow-none outline-none hover:bg-transparent";

function StateModalBase(props: Props) {
  const { isOpen, type, onOpenChange, footer, title, description, className } =
    props;
  const hasTitle = title !== undefined && title !== null && title !== "";

  return (
    <AlertDialog open={isOpen} onOpenChange={onOpenChange}>
      <AlertDialog.Content
        className={cn(
          "bg-00 line-01 max-w-[560px] rounded-[20px] px-[48px] pt-[56px] pb-[36px]",
          FIGMA_SHADOW,
          className,
        )}
      >
        <AlertDialog.Header className="gap-[6px] space-y-0 text-center sm:text-center">
          {hasTitle ? (
            <AlertDialog.Title
              asChild={typeof title !== "string"}
              className="text-03-high text-center text-[24px] leading-[1.4] font-semibold tracking-[-1.3px]"
            >
              {title}
            </AlertDialog.Title>
          ) : (
            <AlertDialog.Title />
          )}
          <div className={"flex w-full justify-center"}>
            {type === "question" ? (
              <div id={"icon"} className={"absolute top-[-20%]"}>
                {typeAnimation[type]}
              </div>
            ) : (
              <div id={"icon"} className={"absolute top-[-35%]"}>
                <Lottie animationData={typeAnimation[type]} loop={false} />
              </div>
            )}
          </div>
          <AlertDialog.Description
            className={cn(
              hasTitle
                ? "text-02-row text-center text-[20px] leading-[1.36] font-medium tracking-[-1px]"
                : "flex h-[172px] items-center justify-center font-semibold",
            )}
            asChild={!(typeof description === "string")}
          >
            {description}
          </AlertDialog.Description>
        </AlertDialog.Header>
        {footer !== undefined && (
          <AlertDialog.Footer className={cn(hasTitle ? "" : "h-[48px]")}>
            {footer}
          </AlertDialog.Footer>
        )}
      </AlertDialog.Content>
    </AlertDialog>
  );
}

function Actions(props: ActionsProps) {
  const {
    cancelText,
    confirmText,
    onCancel,
    onConfirm,
    confirmVariant = "primary",
  } = props;
  const confirmColor =
    confirmVariant === "destructive" ? "text-error" : "text-04-brand";

  return (
    <div className="flex w-full items-center justify-end gap-[12px]">
      {cancelText ? (
        <>
          <AlertDialog.Cancel
            onClick={onCancel}
            className={cn(ACTION_TEXT_BASE, "text-03-high")}
          >
            {cancelText}
          </AlertDialog.Cancel>
          <div className="line-01 h-[16px] w-[2px]" aria-hidden />
        </>
      ) : null}
      <AlertDialog.Action
        onClick={onConfirm}
        className={cn(ACTION_TEXT_BASE, confirmColor)}
      >
        {confirmText}
      </AlertDialog.Action>
    </div>
  );
}

const StateModal = Object.assign(StateModalBase, { Actions });

export { StateModal };
```

## Source File: modules/pagination/index.ts

```ts
export * from "./pagination-module";
```

## Source File: modules/pagination/pagination-module.tsx

```tsx
"use client";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@workspace/ui/components/pagination";
import { cn } from "@workspace/ui/utils";

interface Props {
  onChangePage: (page: number) => void;
  curPage: number;

  appearCount?: number; // 화면에 보일 페이지 번호 개수
  totalPages: number;
  labels?: {
    prevPage?: string;
    nextPage?: string;
    page?: (n: number) => string;
  };
}

export function PaginationModule(props: Props) {
  const { appearCount = 3, curPage, onChangePage, totalPages, labels } = props;
  const pageLabel = labels?.page ?? ((n: number) => `페이지 ${n}`);

  // 총 페이지 수가 0인 경우 렌더링하지 않음
  if (totalPages === 0) return null;

  const onClickPagination = (page: number) => {
    if (page < 1 || page > totalPages) return;
    onChangePage(page);
  };

  // 현재 페이지와 totalPages, 화면에 보여줄 appearCount를 기반으로 시작페이지와 끝페이지를 계산하는 헬퍼 함수
  const getPageRange = (
    curPage: number,
    totalPages: number,
    appearCount: number,
  ) => {
    if (totalPages <= appearCount) {
      return { startPage: 1, endPage: totalPages };
    }
    const half = Math.floor(appearCount / 2);
    let startPage = curPage - half;
    let endPage = curPage + half;

    // appearCount가 짝수일 경우 시작 페이지를 살짝 오른쪽으로 조정
    if (appearCount % 2 === 0) {
      startPage = curPage - half + 1;
    }

    if (startPage < 1) {
      startPage = 1;
      endPage = appearCount;
    } else if (endPage > totalPages) {
      endPage = totalPages;
      startPage = totalPages - appearCount + 1;
    }
    return { startPage, endPage };
  };

  const { startPage, endPage } = getPageRange(curPage, totalPages, appearCount);

  return (
    <Pagination>
      <PaginationContent className="select-none">
        {/* 이전 버튼: 첫 페이지에서는 클릭 불가능 (비활성화 스타일 적용) */}
        <PaginationItem>
          <PaginationPrevious
            className={cn(
              "cursor-pointer",
              curPage === 1 && "cursor-not-allowed opacity-50",
            )}
            onClick={() => curPage > 1 && onClickPagination(curPage - 1)}
            aria-label={labels?.prevPage ?? "이전 페이지"}
          />
        </PaginationItem>

        {/* 좌측 페이지 표시: 첫 페이지가 현재 페이지 범위 시작보다 앞에 있으면 표시 */}
        {startPage > 1 && (
          <>
            <PaginationItem>
              <a
                className="cursor-pointer"
                onClick={() => onClickPagination(1)}
                aria-label={pageLabel(1)}
              >
                1
              </a>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          </>
        )}

        {/* 계산된 페이지 번호 목록 렌더링 */}
        {Array.from({ length: endPage - startPage + 1 }, (_, i) => {
          const page = startPage + i;
          return (
            <PaginationItem
              className="flex h-[36px] w-[36px] items-center justify-center"
              key={page}
            >
              <a
                className={cn(
                  "flex h-full w-full cursor-pointer items-center justify-center",
                  curPage === page && "rounded-frame-10 border line-03 bg-03",
                )}
                onClick={() => onClickPagination(page)}
                aria-label={pageLabel(page)}
                aria-current={curPage === page ? "page" : undefined}
              >
                {page}
              </a>
            </PaginationItem>
          );
        })}

        {/* 우측 페이지 표시: 마지막 페이지가 현재 페이지 범위 끝보다 뒤에 있으면 표시 */}
        {endPage < totalPages && (
          <>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <a
                className="cursor-pointer"
                onClick={() => onClickPagination(totalPages)}
                aria-label={pageLabel(totalPages)}
              >
                {totalPages}
              </a>
            </PaginationItem>
          </>
        )}

        {/* 다음 버튼: 마지막 페이지에서는 클릭 불가능 (비활성화 스타일 적용) */}
        <PaginationItem>
          <PaginationNext
            className={cn(
              "cursor-pointer",
              curPage === totalPages && "cursor-not-allowed opacity-50",
            )}
            onClick={() =>
              curPage < totalPages && onClickPagination(curPage + 1)
            }
            aria-label={labels?.nextPage ?? "다음 페이지"}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
```

## Source File: modules/search-input/index.ts

```ts
export * from "./search-input-module";
```

## Source File: modules/search-input/search-input-module.tsx

```tsx
"use client";
import { cn } from "@workspace/ui/utils";
import React, { useEffect, useState } from "react";

interface SearchInputProps {
  value?: string;
  className?: string;
  onSearchChange?: (query: string) => void;
  placeholder?: string;
  ref?: React.Ref<HTMLInputElement>;
  onInputFocus?: () => void;
  onInputBlur?: () => void;
}

const SearchInputModule = (props: SearchInputProps) => {
  const {
    className,
    value,
    onSearchChange,
    placeholder = "검색어를 입력해주세요",
    ref,
    onInputFocus,
    onInputBlur,
  } = props;

  const [searchValue, setSearchValue] = useState(value ?? "");

  useEffect(() => {
    setSearchValue(value ?? "");
  }, [value]);

  return (
    <div
      className={cn(
        "line-01 flex h-[48px] w-[358px] items-center rounded-xl border bg-00",
        className,
      )}
    >
      <input
        ref={ref}
        type="text"
        placeholder={placeholder}
        className="font-pretendard flex-[1_0_0] gap-2 rounded-xl bg-transparent pr-0 pl-4 text-[14px] text-03-high placeholder:text-02-row tracking-tight focus:border-transparent focus:outline-none"
        aria-label="Search input"
        value={searchValue}
        onChange={(e) => {
          setSearchValue(e.target.value);
          onSearchChange?.(e.target.value);
        }}
        onFocusCapture={() => onInputFocus?.()} // ← input focus 시
        onBlur={() => onInputBlur?.()} // ← input blur 시
      />
      <button
        type="button"
        className="flex items-center justify-center gap-2 rounded-none pr-4 pl-2"
        aria-label="Search"
      >
        <span className="h-6 w-0.5 line-01" aria-hidden="true" />
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="h-[24px] w-[24px] shrink-0 text-gray-05-icon-high"
        >
          <circle
            cx="10.5"
            cy="10.5"
            r="7.5"
            stroke="currentColor"
            strokeWidth="2"
          />
          <path
            d="M16 16L21 21"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </button>
    </div>
  );
};

export { SearchInputModule };
```

## Source File: modules/table/column-meta.ts

```ts
import "@tanstack/react-table";
import { RowData } from "@tanstack/react-table";

declare module "@tanstack/react-table" {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface ColumnMeta<TData extends RowData, TValue> {
    sticky?: "left";
    headerText?: string;
    align?: "left" | "center";
    variant?: "select";
    sortable?: boolean;
  }
}
```

## Source File: modules/table/components/cells/checkbox-component.tsx

```tsx
import { cn } from "@workspace/ui/utils";

interface Props {
  checked: boolean;
  onCheckedChange: (val: boolean) => void;
}

function CheckIcon() {
  return (
    <svg
      width="10"
      height="8"
      viewBox="0 0 10 8"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1 3.69L3.5 6L8.5 1"
        stroke="currentColor"
        strokeWidth="1.667"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function CheckboxComponent({ checked, onCheckedChange }: Props) {
  return (
    <div className="flex w-full items-center justify-center">
      <button
        type="button"
        role="checkbox"
        aria-checked={checked}
        onClick={() => onCheckedChange(!checked)}
        className={cn(
          "flex h-5 w-5 shrink-0 cursor-pointer items-center justify-center rounded-[6px]",
          checked
            ? "border-primary-01 bg-03 primary-01 border-2 shadow-[0px_3px_8px_0px_rgba(98,140,245,0.13)]"
            : "line-04-dark border-2 bg-00 text-03-high",
        )}
      >
        {checked && <CheckIcon />}
      </button>
    </div>
  );
}
```

## Source File: modules/table/components/cells/columns/account-state.tsx

```tsx
import { ColumnDef } from "@tanstack/react-table";
import { Text } from "@workspace/ui/components";
import HeaderCell from "../header-cell";
import { TableCellWrapper } from "../table-cell-wrapper";

interface Options {
  size?: number;
}

interface Params<TData> {
  key: keyof TData;
  headerText: string;
  options?: Options;
}

export type AccountStateCellFn<TData> = (
  params: Params<TData>,
) => ColumnDef<TData>;

//장치 상태
export const createAccountStateCellFn = <TData,>(
  t: any,
): AccountStateCellFn<TData> => {
  return ({ key, headerText, options }) => ({
    accessorKey: key,
    meta: { headerText },
    header: () => <HeaderCell text={headerText} />,
    cell: (info) => (
      <TableCellWrapper width={info.column.getSize()}>
        {info.getValue() === "ACTIVE" && (
          <Text className={"text-success"}>
            {t("account.list.table.states.active")}
          </Text>
        )}
        {info.getValue() === "LOCKED" && (
          <div className={"flex"}>
            <span className={"custom-underline"}>
              {t("account.list.table.states.lock")}
            </span>
            {/* lock: Material Symbols Outlined "lock" (https://fonts.google.com/icons) */}
          </div>
        )}
        {info.getValue() === "DEACTIVE" && (
          <Text className={"text-error"}>
            {t("account.list.table.states.inactive")}
          </Text>
        )}
      </TableCellWrapper>
    ),
    size: 100,
    ...options,
  });
};
```

## Source File: modules/table/components/cells/columns/column.tsx

```tsx
"use client";
import { ColumnDef, DeepKeys } from "@tanstack/react-table";
import _ from "lodash";
import React from "react";
import HeaderCell from "../header-cell";
import { TableCellWrapper } from "../table-cell-wrapper";

interface Params<K> {
  id?: string;
  key: K;
  headerText: string;
  options?: {
    size?: number;
    sticky?: "left";
    sortable?: boolean;
  };
}

export type ColumnFn<TData> = <K extends string = DeepKeys<TData> & string>(
  params: Params<K>,
) => ColumnDef<TData>;

export const createColumnFn = <TData,>(): ColumnFn<TData> => {
  return ({ key, headerText, options, id }) => {
    const { sticky, sortable, ...restOptions } = options ?? {};
    return {
      id: id ?? String(key),
      accessorFn: (row) => _.get(row, key),
      meta: { sticky, headerText, sortable },
      header: () => <HeaderCell text={headerText} />,
      cell: (info) => (
        <TableCellWrapper width={info.column.getSize()} sticky={sticky}>
          {info.getValue() as React.ReactNode}
        </TableCellWrapper>
      ),
      ...restOptions,
    };
  };
};
```

## Source File: modules/table/components/cells/columns/country.tsx

```tsx
import { ColumnDef, DeepKeys } from "@tanstack/react-table";
import _ from "lodash";
import { COUNTRY_CODE_MAP, COUNTRY_NAME_MAP } from "../../../constants";
import HeaderCell from "../header-cell";
import { TableCellWrapper } from "../table-cell-wrapper";
import { ColumnOptions } from "../type";

interface Params<TData> {
  id?: string;
  key: DeepKeys<TData>;

  headerText: string;
  options?: ColumnOptions;
}

export type CountryColumnFn<TData> = (
  params: Params<TData>,
) => ColumnDef<TData>;

export const createCountryColumnFn = <TData,>(): CountryColumnFn<TData> => {
  return ({ id, key, headerText, options }) => ({
    id: id ?? String(key),
    accessorFn: (row) => _.get(row, key),
    meta: { headerText },
    header: () => <HeaderCell text={headerText} />,
    cell: (info) => {
      const value = info.getValue() as keyof typeof COUNTRY_NAME_MAP;
      return (
        <TableCellWrapper width={info.column.getSize()}>
          {COUNTRY_NAME_MAP[value]}
        </TableCellWrapper>
      );
    },
    size: 80,
    ...options,
  });
};
```

## Source File: modules/table/components/cells/columns/custom.tsx

```tsx
import { ColumnDef, DeepKeys } from "@tanstack/react-table";
import _ from "lodash";
import { ReactNode } from "react";
import HeaderCell from "../header-cell";
import { TableCellWrapper } from "../table-cell-wrapper";

interface Params<TData, K> {
  id?: string;
  key: K;
  headerText: string;
  renderCell: (data: TData) => ReactNode;
  options?: {
    size?: number;
    sticky?: "left";
    sortable?: boolean;
  };
}

export type CustomFn<TData> = <K extends string = DeepKeys<TData> & string>(
  params: Params<TData, K>,
) => ColumnDef<TData>;

export const createCustomFn = <TData,>(): CustomFn<TData> => {
  return ({ headerText, renderCell, key, options, id }) => {
    const { sticky, sortable, ...restOptions } = options ?? {};
    return {
      id: id ?? String(key),
      accessorFn: (row) => _.get(row, key),
      meta: { sticky, headerText, sortable },
      header: () => <HeaderCell text={headerText} />,
      cell: (info) => (
        <TableCellWrapper width={info.column.getSize()} sticky={sticky}>
          {renderCell(info.row.original)}
        </TableCellWrapper>
      ),
      ...restOptions,
    };
  };
};
```

## Source File: modules/table/components/cells/columns/download.tsx

```tsx
import { ColumnDef } from "@tanstack/react-table";

import { DownloadIcon } from "lucide-react";
import HeaderCell from "../header-cell";
import { TableCellWrapper } from "../table-cell-wrapper";

interface Params<TData, K> {
  key: K;
  clickCallback: (data: TData) => void;
  headerText: string;
  options?: {
    size?: number;
    sticky?: "left";
  };
}

export type DownloadCellFn<TData> = <K extends string = keyof TData & string>(
  params: Params<TData, K>,
) => ColumnDef<TData>;

export const createDownloadCellFn = <TData,>(): DownloadCellFn<TData> => {
  return ({ clickCallback, headerText, key, options }) => {
    const { sticky, ...restOptions } = options ?? {};
    return {
      id: "download",
      accessorKey: key,
      meta: { sticky, headerText },
      header: () => (
        <HeaderCell className={"flex justify-center"} text={headerText} />
      ),
      cell: (info) => (
        <TableCellWrapper
          width={info.column.getSize()}
          className="border-l line-00"
          sticky={sticky}
        >
          <span
            className={"flex justify-center"}
            onClick={() => clickCallback(info.row.original)}
          >
            <DownloadIcon className={"text-03-high"} />
          </span>
        </TableCellWrapper>
      ),
      size: 120,
      ...restOptions,
    };
  };
};
```

## Source File: modules/table/components/cells/columns/dragable-column.tsx

```tsx
"use client";
import { useDraggable } from "@dnd-kit/core";
import { ColumnDef, DeepKeys, Table } from "@tanstack/react-table";
import { cn } from "@workspace/ui/utils";
import _ from "lodash";
import { ReactNode } from "react";
import type { TableDndProps } from "../../../types";
import HeaderCell from "../header-cell";
import { TableCellWrapper } from "../table-cell-wrapper";

interface Params<K> {
  id?: string;
  key: K;
  headerText: string;
  options?: {
    size?: number;
  };
}

export type DragableColumnFn<TData> = <
  K extends string = DeepKeys<TData> & string,
>(
  params: Params<K>,
) => ColumnDef<TData>;

// 드래그 가능한 셀 컴포넌트
function DragableCell<TData, TSource>({
  row,
  table,
  value,
  getDragSource,
}: {
  row: TData;
  table: Table<TData>;
  value: ReactNode;
  getDragSource?: TableDndProps<TData, TSource>["getDragSource"];
}) {
  const rowId =
    (row as { id?: string | number }).id?.toString() || JSON.stringify(row);
  const selectedRows = table
    .getSelectedRowModel()
    .rows.map((selectedRow) => selectedRow.original);
  const isCurrentRowSelected = table
    .getSelectedRowModel()
    .rows.some((selectedRow) => selectedRow.original === row);
  const rowsToDrag =
    isCurrentRowSelected && selectedRows.length > 0 ? selectedRows : [row];
  const dragSource = getDragSource?.({
    row,
    selectedRows: rowsToDrag,
  });

  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: rowId,
      data: dragSource ?? undefined,
      disabled: !dragSource,
    });

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={cn(
        "flex cursor-move touch-none items-center gap-2 select-none",
      )}
    >
      {/* 드래그 핸들 아이콘 */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="h-4 w-4 shrink-0 text-gray-03-icon-row"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
        />
      </svg>
      <span className={cn(isDragging && "opacity-50")}>{value}</span>
    </div>
  );
}

export const createDragableColumnFn = <TData, TSource = never>(
  dnd?: TableDndProps<TData, TSource>,
): DragableColumnFn<TData> => {
  return ({ key, headerText, options, id }) => ({
    id: id ?? String(key),
    accessorFn: (row) => _.get(row, key),
    meta: { headerText },
    header: () => <HeaderCell text={headerText} />,
    cell: (info) => (
      <TableCellWrapper width={info.column.getSize()}>
        <DragableCell
          row={info.row.original}
          table={info.table}
          value={info.getValue() as ReactNode}
          getDragSource={dnd?.getDragSource}
        />
      </TableCellWrapper>
    ),
    ...options,
  });
};
```

## Source File: modules/table/components/cells/columns/index.ts

```ts
export {
  createAccountStateCellFn,
  type AccountStateCellFn,
} from "./account-state";
export { createColumnFn, type ColumnFn } from "./column";
export { createCountryColumnFn, type CountryColumnFn } from "./country";
export { createCustomFn, type CustomFn } from "./custom";
export { createDownloadCellFn, type DownloadCellFn } from "./download";
export {
  createDragableColumnFn,
  type DragableColumnFn,
} from "./dragable-column";
export { createLinkCellFn, type LinkCellFn } from "./link";
export { createSelectFn, type SelectFn } from "./select";
export { createStateCellFn, type StateCellFn } from "./state";
```

## Source File: modules/table/components/cells/columns/link.tsx

```tsx
import { ColumnDef, DeepKeys } from "@tanstack/react-table";
import _ from "lodash";
import { ReactNode } from "react";
import HeaderCell from "../header-cell";
import { TableCellWrapper } from "../table-cell-wrapper";

interface Options {
  size?: number;
  sticky?: "left";
}

interface Params<TData> {
  id?: string;
  key: DeepKeys<TData>;
  headerText: string;
  onClick?: (data: TData) => void;
  options?: Options;
}

export type LinkCellFn<TData> = (params: Params<TData>) => ColumnDef<TData>;

export const createLinkCellFn = <TData,>(): LinkCellFn<TData> => {
  return ({ key, headerText, onClick, options, id }) => {
    const { sticky, ...restOptions } = options ?? {};
    return {
      id: id ?? String(key),
      accessorFn: (row) => _.get(row, key),
      meta: { sticky, headerText },
      header: () => <HeaderCell text={headerText} />,
      cell: (info) => (
        <TableCellWrapper width={info.column.getSize()} sticky={sticky}>
          {info.getValue() === null ? (
            "-"
          ) : (
            <span
              className={"primary-underline"}
              onClick={() => onClick?.(info.row.original)}
            >
              {info.getValue() as ReactNode}
            </span>
          )}
        </TableCellWrapper>
      ),
      size: 150,
      ...restOptions,
    };
  };
};
```

## Source File: modules/table/components/cells/columns/select.tsx

```tsx
"use client";
import { useDraggable } from "@dnd-kit/core";
import { ColumnDef, Table } from "@tanstack/react-table";
import { cn } from "@workspace/ui/utils";
import type { TableDndProps } from "../../../types";
import CheckboxComponent from "../checkbox-component";
import { TableCell } from "../table";
import { TableCellWrapper } from "../table-cell-wrapper";

interface Params {
  id: string;
  options?: Options;
}

interface Options {
  size?: number;
  sticky?: "left";
  dragHandle?: boolean;
  /** @deprecated Use dragHandle instead. */
  isDraggable?: boolean;
}

// 드래그 가능한 셀 컴포넌트 (TableCell 포함)
function DraggableSelectCell<TData, TSource>({
  row,
  table,
  columnWidth,
  getDragSource,
  sticky,
}: {
  row: {
    original: TData;
    getIsSelected: () => boolean;
    toggleSelected: (val: boolean) => void;
  };
  table: Table<TData>;
  columnWidth: number;
  getDragSource: NonNullable<TableDndProps<TData, TSource>["getDragSource"]>;
  sticky?: "left";
}) {
  const rowId =
    (row.original as { id?: string | number }).id?.toString() ||
    JSON.stringify(row.original);

  // 선택된 모든 row 가져오기
  const selectedRows = table.getSelectedRowModel().rows.map((r) => r.original);
  const isCurrentRowSelected = row.getIsSelected();

  // 현재 row가 선택되어 있으면 선택된 모든 row를, 아니면 현재 row만 드래그
  const rowsToDrag =
    isCurrentRowSelected && selectedRows.length > 0
      ? selectedRows
      : [row.original];
  const dragSource = getDragSource({
    row: row.original,
    selectedRows: rowsToDrag,
  });

  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: rowId,
      data: dragSource ?? undefined,
      disabled: !dragSource,
    });

  const dragStyle = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  return (
    <TableCell
      className={cn(
        "h-[58px] cursor-move border-r border-r-line-01 px-0 py-[22px] text-[13px] leading-[1.36] font-normal tracking-[-0.5px] text-03-high",
        sticky === "left" &&
          "sticky left-0 z-[1] bg-00 group-data-[state=selected]/row:bg-05-des",
      )}
      style={{
        width: columnWidth,
        maxWidth: 500,
        wordBreak: "break-all",
      }}
    >
      <div
        ref={setNodeRef}
        className="relative flex h-full w-full touch-none items-center justify-center select-none"
        style={{
          ...dragStyle,
          opacity: isDragging ? 0.5 : 1,
        }}
        {...attributes}
        {...listeners}
      >
        <CheckboxComponent
          checked={row.getIsSelected()}
          onCheckedChange={(val) => row.toggleSelected(val)}
        />
      </div>
    </TableCell>
  );
}

export type SelectFn<TData> = (params: Params) => ColumnDef<TData>;

export const createSelectFn = <TData, TSource = never>(
  dnd?: TableDndProps<TData, TSource>,
): SelectFn<TData> => {
  return ({ id, options }) => {
    const { sticky, dragHandle, isDraggable, ...restOptions } = options ?? {};
    const shouldUseDragHandle =
      Boolean(dragHandle ?? isDraggable) && !!dnd?.getDragSource;

    return {
      id,
      meta: { sticky, align: "center", variant: "select" },
      header: ({ table }) => (
        <CheckboxComponent
          checked={table.getIsAllRowsSelected()}
          onCheckedChange={(val) => table.toggleAllRowsSelected(val)}
        />
      ),
      cell: ({ row, table, column }) =>
        shouldUseDragHandle && dnd?.getDragSource ? (
          <DraggableSelectCell
            row={row}
            table={table}
            columnWidth={column.getSize()}
            getDragSource={dnd.getDragSource}
            sticky={sticky}
          />
        ) : (
          <TableCellWrapper
            width={column.getSize()}
            sticky={sticky}
            align="center"
            variant="select"
          >
            <div className="flex items-center justify-center">
              <CheckboxComponent
                checked={row.getIsSelected()}
                onCheckedChange={(val) => row.toggleSelected(val)}
              />
            </div>
          </TableCellWrapper>
        ),
      size: shouldUseDragHandle ? 60 : 40,
      ...restOptions,
    };
  };
};
```

## Source File: modules/table/components/cells/columns/state.tsx

```tsx
import { ColumnDef } from "@tanstack/react-table";
import { Text } from "@workspace/ui/components";
import HeaderCell from "../header-cell";
import { TableCellWrapper } from "../table-cell-wrapper";

interface Options {
  size?: number;
}

interface Params<TData> {
  key: keyof TData;
  headerText: string;
  options?: Options;
}

export type StateCellFn<TData> = (params: Params<TData>) => ColumnDef<TData>;

//장치 상태
export const createStateCellFn = <TData,>(): StateCellFn<TData> => {
  return ({ key, headerText, options }) => ({
    accessorKey: key,
    meta: { headerText },
    header: () => <HeaderCell text={headerText} />,
    cell: (info) => (
      <TableCellWrapper width={info.column.getSize()}>
        {info.getValue() === "active" && (
          <Text className={"text-success"}>Active</Text>
        )}
        {info.getValue() === "expired" && (
          <Text className={"text-error"}>Expired</Text>
        )}
      </TableCellWrapper>
    ),
    size: 100,
    ...options,
  });
};
```

## Source File: modules/table/components/cells/date-cell.tsx

```tsx
"use client";
import { cn } from "@workspace/ui/utils";
import { isExpirationStatus } from "../../utils";

interface Props {
  dateString: string;
}

/**
 * table에서 날짜를 나타내는 컴포넌트. 유효기간이 만료 직전이면 빨간색으료 표시됨.
 * @param props
 * @constructor
 */
function DateCell(props: Props) {
  const { dateString } = props;
  return (
    <span className={cn(isExpirationStatus(dateString) && "text-error")}>
      {new Date(dateString).toLocaleDateString("en-CA")}
    </span>
  );
}

export default DateCell;
```

## Source File: modules/table/components/cells/date-expire.tsx

```tsx
import { ColumnDef, DeepKeys } from "@tanstack/react-table";
import _ from "lodash";
import DateCell from "./date-cell";
import HeaderCell from "./header-cell";
import { TableCellWrapper } from "./table-cell-wrapper";

interface Params<TData, K> {
  id?: string;
  key: K;
  headerText: string;
  options?: {
    size?: number;
  };
}

export type DateExpireFn<TData> = <K extends string = DeepKeys<TData> & string>(
  params: Params<TData, K>,
) => ColumnDef<TData>;

export const createDateExpireFn = <TData,>(): DateExpireFn<TData> => {
  return ({ id, headerText, key, options }) => ({
    id: id ?? String(key),
    accessorFn: (row) => _.get(row, key),
    meta: { headerText },
    header: () => <HeaderCell text={headerText} />,
    cell: (info) => (
      <TableCellWrapper width={info.column.getSize()}>
        <DateCell dateString={info.getValue() as string} />
      </TableCellWrapper>
    ),
    ...options,
  });
};
```

## Source File: modules/table/components/cells/header-cell.tsx

```tsx
"use client";

import { cn } from "@workspace/ui/utils";

interface Props {
  text: string;
  className?: string;
  isSorting?: boolean;
}

function HeaderCell(props: Props) {
  const { text, className = "", isSorting = true } = props;
  return (
    <div className={cn("flex items-center", className)}>
      <span>{text}</span>
      {/* {isSorting && (
        <span className={"mb-[1px]"}>
          <SortingIcon width={"24"} height={"24"} />
        </span>
      )} */}
    </div>
  );
}

export default HeaderCell;
```

## Source File: modules/table/components/cells/index.ts

```ts
import Pagination from "./pagination/pagination";
import TablePaginationWrapper from "./pagination/table-pagination-wrapper";
import { Table } from "./table";
import TableBodyRenderer from "./table-body-renderer";
import TableHeaderRenderer from "./table-header-renderer";

export * from "./columns";
export { createDateExpireFn, type DateExpireFn } from "./date-expire";
export {
  Pagination,
  Table,
  TableBodyRenderer,
  TableHeaderRenderer,
  TablePaginationWrapper,
};
```

## Source File: modules/table/components/cells/page-count-select.tsx

```tsx
"use client";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@workspace/ui/components/select";

interface Props {
  perPageCount: number;
  onChangePageCount: (page: number) => void;
}

function PageCountSelect(props: Props) {
  const { perPageCount, onChangePageCount } = props;

  return (
    <Select
      value={String(perPageCount)}
      onValueChange={(v) => {
        onChangePageCount(Number(v));
      }}
    >
      <SelectTrigger className="w-[100px] line-01">
        <SelectValue className={""} />
      </SelectTrigger>
      <SelectContent className={"line-01 bg-00"}>
        <SelectGroup>
          <SelectItem value="50">50</SelectItem>
          <SelectItem value="30">30</SelectItem>
          <SelectItem value="20">20</SelectItem>
          <SelectItem value="10">10</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

export default PageCountSelect;
```

## Source File: modules/table/components/cells/pagination/pagination.tsx

```tsx
"use client";

import { Text } from "@workspace/ui/components";
import { PaginationModule } from "@workspace/ui/modules";
import { PageSummary } from "../../../types";
import PageCountSelect from "../page-count-select";

interface PageListCountSelectProps {
  onChangePerPageCount: (count: number) => void;
  perPageCount: number;
}
const PageListCountSelect = (props: PageListCountSelectProps) => {
  const { onChangePerPageCount, perPageCount } = props;
  return (
    <div className="absolute flex items-center gap-[8px]">
      <Text size={16} className={"text-02-row"}>
        {"1페이지당"}
      </Text>
      <PageCountSelect
        perPageCount={perPageCount}
        onChangePageCount={onChangePerPageCount}
      />
    </div>
  );
};

interface Props {
  page?: PageSummary;
  onChangePage: (page: number) => void;
  onChangePerPageCount: (count: number) => void;
}

function Pagination(props: Props) {
  if (!props.page) return null;

  const { onChangePerPageCount, onChangePage } = props;
  const {
    pageNumber,
    totalPages,
    totalElements,
    numberOfElements,
    pageSize,
    last,
  } = props.page;
  return (
    <>
      <PageListCountSelect
        perPageCount={pageSize}
        onChangePerPageCount={onChangePerPageCount}
      />
      {/* pageNumber는 0-indexed(서버 응답), PaginationModule은 1-indexed 기대 → +1 보정 */}
      <PaginationModule
        curPage={pageNumber + 1}
        totalPages={totalPages}
        onChangePage={onChangePage}
      />
    </>
  );
}

export default Pagination;
```

## Source File: modules/table/components/cells/pagination/table-pagination-wrapper.tsx

```tsx
import { useMemo, useRef } from "react";
import { PageSummary } from "../../../types";
import Pagination from "./pagination";

interface Props {
  pageSummary?: PageSummary;
  onQueryChange: (params: { page: number; size: number }) => void;
}

const TablePaginationWrapper = ({ pageSummary, onQueryChange }: Props) => {
  const pageRef = useRef<number>(0);
  const sizeRef = useRef<number>(20);

  const handlePageChange = (page: number) => {
    pageRef.current = page - 1;
    onQueryChange({
      page: pageRef.current,
      size: sizeRef.current,
    });
  };

  const handlePerPageCountChange = (count: number) => {
    sizeRef.current = count;
    onQueryChange({
      page: pageRef.current,
      size: sizeRef.current,
    });
  };

  const PaginationModule = useMemo(() => {
    return (
      <Pagination
        page={pageSummary}
        onChangePage={handlePageChange}
        onChangePerPageCount={handlePerPageCountChange}
      />
    );
  }, [pageSummary]);

  return PaginationModule;
};

export default TablePaginationWrapper;
```

## Source File: modules/table/components/cells/table-body-renderer.tsx

```tsx
import { flexRender, Row } from "@tanstack/react-table";
import React, { ReactElement } from "react";
import { TableBody, TableCell, TableRow } from "./table";

interface Props<TData> {
  rows: Row<TData>[];
  firstPinnedRow?: () => ReactElement;
  /** "No results." 빈 행이 차지할 컬럼 수. 미지정 시 1 (구버전 호환). */
  colSpan?: number;
}

const TableBodyRenderer = <TData,>({
  rows,
  firstPinnedRow,
  colSpan = 1,
}: Props<TData>) => {
  return (
    <TableBody>
      {firstPinnedRow?.()}
      {rows.length ? (
        rows.map((row) => (
          <TableRow
            key={row.id}
            className="group/row"
            data-state={row.getIsSelected() ? "selected" : undefined}
          >
            {row.getVisibleCells().map((cell) => {
              return (
                <React.Fragment key={cell.id}>
                  {
                    flexRender(
                      cell.column.columnDef.cell,
                      cell.getContext(),
                    ) as React.ReactNode
                  }
                </React.Fragment>
              );
            })}
          </TableRow>
        ))
      ) : (
        <TableRow>
          <TableCell colSpan={colSpan} className="h-24 text-center">
            No results.
          </TableCell>
        </TableRow>
      )}
    </TableBody>
  );
};

export default TableBodyRenderer;
```

## Source File: modules/table/components/cells/table-cell-wrapper.tsx

````tsx
"use client";

import { cn } from "@workspace/ui/utils";
import { ReactNode } from "react";
import { TableCell } from "./table";

interface TableCellWrapperProps {
  /** 셀 너비 */
  width?: number;
  /** 셀 내용 */
  children: ReactNode;
  /** 추가 className */
  className?: string;
  /** 추가 style */
  style?: React.CSSProperties;
  /** sticky 컬럼 여부 */
  sticky?: "left";
  /** 셀 정렬 */
  align?: "left" | "center";
  /** 셀 변형 */
  variant?: "select";
}

/**
 * 테이블 셀의 공통 스타일과 구조를 제공하는 래퍼 컴포넌트
 *
 * @important 모든 컬럼의 `cell` 함수는 반드시 `TableCell` 또는 `TableCellWrapper`를 반환해야 합니다.
 * `table-body-renderer`가 `TableCell`을 감싸지 않으므로, 각 컬럼이 직접 `TableCell` 구조를 제공해야 합니다.
 *
 * @example
 * ```tsx
 * cell: (info) => (
 *   <TableCellWrapper width={info.column.getSize()}>
 *     {info.getValue()}
 *   </TableCellWrapper>
 * )
 * ```
 *
 * 특수 케이스(예: 드래그 가능한 셀)는 직접 `TableCell`을 사용할 수 있습니다.
 */
export function TableCellWrapper({
  width,
  children,
  className,
  style,
  sticky,
  align,
  variant,
}: TableCellWrapperProps) {
  const shouldCenter =
    align === "center" ||
    (align === undefined && width !== undefined && width <= 60);

  return (
    <TableCell
      className={cn(
        "h-[58px] border-r border-r-line-01 px-[16px] py-[19px] text-[13px] leading-[1.36] font-normal tracking-[-0.5px] text-03-high",
        variant === "select" && "px-0",
        sticky === "left" &&
          "sticky left-0 z-[1] bg-00 group-data-[state=selected]/row:bg-05-des",
        className,
      )}
      style={{
        width,
        minWidth: width,
        maxWidth: 500,
        wordBreak: "break-all",
        ...style,
      }}
    >
      <div
        className={cn(
          shouldCenter
            ? "flex h-full items-center justify-center text-center"
            : "line-clamp-1 text-ellipsis",
        )}
      >
        {children}
      </div>
    </TableCell>
  );
}
````

## Source File: modules/table/components/cells/table-header-renderer.tsx

```tsx
import { flexRender, HeaderGroup } from "@tanstack/react-table";
import { cn } from "@workspace/ui/utils";
import { TableHead, TableHeader, TableRow } from "./table";

interface Props<TData> {
  headerGroups: HeaderGroup<TData>[];
  sortState: "ASC" | "DESC" | null;
  sortTarget: string | null;
  onHeaderClick: (headerId: string) => void;
}

function SortIcon({
  state,
}: {
  state: "active-asc" | "active-desc" | "inactive";
}) {
  const isActive = state !== "inactive";
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 6.875 4.79167"
      fill="none"
      className={cn(
        "shrink-0 text-01 transition-transform",
        isActive && "primary-01",
        state === "active-asc" && "rotate-180",
      )}
      aria-hidden
    >
      <path
        d="M0.3125 0.3125H6.5625M0.3125 2.39583H4.47917M0.3125 4.47917H1.97917"
        stroke="currentColor"
        strokeWidth="0.625"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const TableHeaderRenderer = <TData,>({
  headerGroups,
  sortState,
  sortTarget,
  onHeaderClick,
}: Props<TData>) => {
  return (
    <TableHeader>
      {headerGroups &&
        headerGroups.map((headerGroup) => (
          <TableRow key={headerGroup.id}>
            {headerGroup.headers.map((header) => {
              const columnMeta = header.column.columnDef.meta;
              const sortable = columnMeta?.sortable === true;
              const active = sortable && sortTarget === header.id;
              const iconState: "active-asc" | "active-desc" | "inactive" =
                active && sortState === "ASC"
                  ? "active-asc"
                  : active && sortState === "DESC"
                    ? "active-desc"
                    : "inactive";
              return (
                <TableHead
                  onClick={
                    sortable
                      ? () => {
                          onHeaderClick(header.id);
                        }
                      : undefined
                  }
                  key={header.id}
                  className={cn(
                    "relative h-[52px] border-r border-r-line-01 bg-01 px-[16px] py-[14px] text-[14px] leading-[1.4] font-normal tracking-[-0.5px] whitespace-nowrap text-02-row",
                    sortable && "cursor-pointer",
                    (columnMeta?.align === "center" ||
                      (columnMeta?.align === undefined &&
                        header.getSize() <= 60)) &&
                      "text-center [&>div]:justify-center",
                    columnMeta?.variant === "select" && "px-0",
                    columnMeta?.sticky === "left" && "sticky left-0 z-[2]",
                  )}
                  style={{
                    width: header.getSize(),
                    minWidth: header.getSize(),
                  }}
                >
                  <div className="flex items-center gap-[6px]">
                    {header.isPlaceholder
                      ? null
                      : (flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        ) as React.ReactNode)}
                    {sortable && <SortIcon state={iconState} />}
                  </div>
                  {header.column.getCanResize() && (
                    <div
                      onMouseDown={header.getResizeHandler()}
                      onTouchStart={header.getResizeHandler()}
                      className="hover:line-01 data-[resizing=true]:line-03 absolute top-0 right-0 h-full w-[5px] cursor-col-resize touch-none opacity-0 select-none hover:opacity-100 data-[resizing=true]:opacity-100"
                      data-resizing={
                        header.column.getIsResizing() ? true : undefined
                      }
                    />
                  )}
                </TableHead>
              );
            })}
          </TableRow>
        ))}
    </TableHeader>
  );
};

export default TableHeaderRenderer;
```

## Source File: modules/table/components/cells/table.tsx

```tsx
import * as React from "react";

import { cn } from "@workspace/ui/utils";

const Table = React.forwardRef<
  HTMLTableElement,
  React.HTMLAttributes<HTMLTableElement>
>(({ className, ...props }, ref) => (
  <div className="line-01 relative max-w-full rounded-[12px] border">
    <table
      ref={ref}
      className={cn(
        "w-full caption-bottom border-separate border-spacing-0 text-sm",
        className,
      )}
      {...props}
    />
  </div>
));
Table.displayName = "Table";

const TableHeader = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <thead ref={ref} className={cn(className)} {...props} />
));
TableHeader.displayName = "TableHeader";

const TableBody = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tbody ref={ref} className={cn(className)} {...props} />
));
TableBody.displayName = "TableBody";

const TableFooter = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tfoot
    ref={ref}
    className={cn(
      "border-t line-01 bg-01 font-medium [&>tr]:last:border-b-0",
      className,
    )}
    {...props}
  />
));
TableFooter.displayName = "TableFooter";

const TableRow = React.forwardRef<
  HTMLTableRowElement,
  React.HTMLAttributes<HTMLTableRowElement>
>(({ className, ...props }, ref) => (
  <tr
    ref={ref}
    className={cn(
      "hover:bg-01 transition-colors data-[state=selected]:bg-05-des",
      className,
    )}
    {...props}
  />
));
TableRow.displayName = "TableRow";

const TableHead = React.forwardRef<
  HTMLTableCellElement,
  React.ThHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <th
    ref={ref}
    className={cn(
      "h-10 px-2 text-left align-middle text-[13px] font-medium text-02-row",
      className,
    )}
    {...props}
  />
));
TableHead.displayName = "TableHead";

const TableCell = React.forwardRef<
  HTMLTableCellElement,
  React.TdHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <td
    ref={ref}
    className={cn("border-b line-00 p-2 align-middle", className)}
    {...props}
  />
));
TableCell.displayName = "TableCell";

const TableCaption = React.forwardRef<
  HTMLTableCaptionElement,
  React.HTMLAttributes<HTMLTableCaptionElement>
>(({ className, ...props }, ref) => (
  <caption
    ref={ref}
    className={cn("mt-4 text-sm text-02-row", className)}
    {...props}
  />
));
TableCaption.displayName = "TableCaption";

export {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
};
```

## Source File: modules/table/components/cells/type.ts

```ts
export interface ColumnOptions {
  size?: number;
}
```

## Source File: modules/table/components/compound/body.tsx

```tsx
"use client";

import { useContext, useMemo, type Context } from "react";
import { cn } from "@workspace/ui/utils";

import { Table, TableBodyRenderer, TableHeaderRenderer } from "../cells";
import { useHorizontalScrollHint } from "../../hooks/use-horizontal-scroll-hint";
import type { TableBodyProps, TableModuleContextValue } from "../../types";

export function createTableBody<TData, TSource = unknown>(
  ModuleContext: Context<TableModuleContextValue<TData, TSource> | null>,
) {
  return function TableBody(props: TableBodyProps) {
    const { horizontalScrollHint, firstPinnedRow } = props;
    const ctx = useContext(ModuleContext);
    if (!ctx) {
      throw new Error(
        "<TableModule.Body> must be rendered inside <TableModule>.",
      );
    }

    const { table, sortState, sortTarget, onHeaderSortClick } = ctx;
    const columns = table.getAllLeafColumns();

    // table ref is stable; ctx.data is the real dependency that triggers re-render
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const rows = useMemo(() => table.getRowModel().rows, [table, ctx.data]);

    const headerGroups = useMemo(() => {
      if (columns.length === 0) return [];
      return table.getHeaderGroups();
    }, [columns, table]);

    const { scrollRef, hiddenHeaderTexts, hintPos } = useHorizontalScrollHint({
      enabled: horizontalScrollHint,
      headerGroups,
    });

    return (
      <div className="relative w-full">
        <div ref={scrollRef} className={cn("overflow-x-auto")}>
          <div className="min-w-max">
            <Table>
              <TableHeaderRenderer
                headerGroups={headerGroups}
                sortState={sortState}
                sortTarget={sortTarget}
                onHeaderClick={onHeaderSortClick}
              />
              <TableBodyRenderer
                rows={rows}
                firstPinnedRow={firstPinnedRow}
                colSpan={columns.length}
              />
            </Table>
          </div>
        </div>

        {horizontalScrollHint && hiddenHeaderTexts.length > 0 && hintPos && (
          <div
            className="pointer-events-none absolute z-[3] flex items-center gap-[3px]"
            style={{ top: hintPos.top, left: hintPos.left }}
          >
            <svg
              width="5"
              height="8"
              viewBox="0 0 5 8"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="shrink-0 text-02-row"
            >
              <path d="M5 0L0 4L5 8V0Z" fill="currentColor" />
            </svg>
            <span className="text-02-row text-[14px] leading-[1.4] tracking-[-0.5px]">
              {hiddenHeaderTexts.join(", ")} 항목 있음
            </span>
          </div>
        )}
      </div>
    );
  };
}
```

## Source File: modules/table/components/compound/filter-search.tsx

```tsx
"use client";

import { useContext, useEffect, useMemo, useState, type Context } from "react";
import _ from "lodash";
import SearchFilterInput from "../../search/search-filter";
import type {
  TableFilterSearchProps,
  TableModuleContextValue,
} from "../../types";

export function createTableFilterSearch<TData, TSource = unknown>(
  ModuleContext: Context<TableModuleContextValue<TData, TSource> | null>,
) {
  return function TableFilterSearch({
    filters,
    placeholder = "검색",
    defaultValue,
  }: TableFilterSearchProps) {
    const ctx = useContext(ModuleContext);
    if (!ctx) {
      throw new Error(
        "<TableModule.FilterSearch> must be rendered inside <TableModule>.",
      );
    }

    const [selectedField, setSelectedField] = useState(
      defaultValue ?? filters[0]?.value ?? "",
    );
    const [searchValue, setSearchValue] = useState("");

    const debouncedUpdate = useMemo(
      () =>
        _.debounce((field: string, v: string) => {
          ctx.updateFilters(v ? [{ field, value: v }] : []);
        }, 300),
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [ctx.updateFilters],
    );

    useEffect(() => () => debouncedUpdate.cancel(), [debouncedUpdate]);

    return (
      <div data-toolbar-trailing>
        <SearchFilterInput
          options={filters}
          selectedValue={selectedField}
          onSelectChange={(v) => {
            debouncedUpdate.cancel();
            setSelectedField(v);
            setSearchValue("");
            ctx.updateFilters([]);
          }}
          searchValue={searchValue}
          onSearchChange={(v, _type) => {
            // eslint-disable-line @typescript-eslint/no-unused-vars
            setSearchValue(v);
            debouncedUpdate(selectedField, v);
          }}
          searchPlaceholder={placeholder}
          searchResult={[]}
          onSelectResultItem={() => {}}
        />
      </div>
    );
  };
}
```

## Source File: modules/table/components/compound/pagination.tsx

```tsx
"use client";

import { useContext, type Context } from "react";
import { TablePaginationWrapper } from "../cells";
import type { TableModuleContextValue } from "../../types";

export function createTablePagination<TData, TSource = unknown>(
  ModuleContext: Context<TableModuleContextValue<TData, TSource> | null>,
) {
  return function TablePagination() {
    const ctx = useContext(ModuleContext);
    if (!ctx) {
      throw new Error(
        "<TableModule.Pagination> must be rendered inside <TableModule>.",
      );
    }

    const handlePaginationChange = ({
      page,
      size,
    }: {
      page: number;
      size: number;
    }) => ctx.updatePagination(page, size);

    return (
      <div className="relative mt-[10px] flex min-h-[40px] items-center">
        <TablePaginationWrapper
          pageSummary={ctx.data?.pageSummary}
          onQueryChange={handlePaginationChange}
        />
      </div>
    );
  };
}
```

## Source File: modules/table/components/compound/search.tsx

```tsx
"use client";

import { useContext, useEffect, useMemo, useState, type Context } from "react";
import _ from "lodash";
import SearchInput from "../../search/search-input";
import type { TableModuleContextValue, TableSearchProps } from "../../types";

export function createTableSearch<TData, TSource = unknown>(
  ModuleContext: Context<TableModuleContextValue<TData, TSource> | null>,
) {
  return function TableSearch({
    placeholder = "검색",
    field,
  }: TableSearchProps) {
    const ctx = useContext(ModuleContext);
    if (!ctx) {
      throw new Error(
        "<TableModule.Search> must be rendered inside <TableModule>.",
      );
    }

    const [value, setValue] = useState("");

    const { updateFilters } = ctx;

    const debouncedUpdate = useMemo(
      () =>
        _.debounce((v: string) => {
          updateFilters(v ? [{ field: field ?? "", value: v }] : []);
        }, 300),
      [updateFilters, field],
    );

    useEffect(() => () => debouncedUpdate.cancel(), [debouncedUpdate]);

    return (
      <div data-toolbar-trailing>
        <SearchInput
          value={value}
          onSearchChange={(v) => {
            setValue(v);
            debouncedUpdate(v);
          }}
          placeholder={placeholder}
          isVisibleResult={false}
          searchResult={[]}
          onSelectResultItem={() => {}}
        />
      </div>
    );
  };
}
```

## Source File: modules/table/components/compound/toolbar.tsx

```tsx
"use client";

import type { TableToolbarProps } from "../../types";

/**
 * Table 상단 툴바 컨테이너.
 * 자식에 `data-toolbar-trailing` 속성이 있으면 CSS로 우측 정렬됨.
 */
export function TableToolbar({ children }: TableToolbarProps) {
  return (
    <header className="mb-[20px] flex w-full items-center [&>[data-toolbar-trailing]]:ml-auto">
      {children}
    </header>
  );
}
```

## Source File: modules/table/constants/country.ts

```ts
export const COUNTRY_CODE_MAP = {
  "CC-COUNTRY-012": "CAN",
  "CC-COUNTRY-003": "CHN",
  "CC-COUNTRY-010": "GBR",
  "CC-COUNTRY-011": "HUN",
  "CC-COUNTRY-009": "IDN",
  "CC-COUNTRY-004": "IND",
  "CC-COUNTRY-005": "JPN",
  "CC-COUNTRY-002": "KOR",
  "CC-COUNTRY-006": "OMN",
  "CC-COUNTRY-007": "SGP",
  "CC-COUNTRY-008": "TWN",
  "CC-COUNTRY-001": "USA",
} as const;

export const COUNTRY_NAME_MAP = {
  "CC-COUNTRY-012": "Canada",
  "CC-COUNTRY-003": "China",
  "CC-COUNTRY-010": "United Kingdom",
  "CC-COUNTRY-011": "Hungary",
  "CC-COUNTRY-009": "Indonesia",
  "CC-COUNTRY-004": "India",
  "CC-COUNTRY-005": "Japan",
  "CC-COUNTRY-002": "Korea",
  "CC-COUNTRY-006": "Oman",
  "CC-COUNTRY-007": "Singapore",
  "CC-COUNTRY-008": "Taiwan",
  "CC-COUNTRY-001": "United States",
};

export const COUNTRY_LIST = Object.entries(COUNTRY_CODE_MAP).map(([key]) => {
  return {
    label: COUNTRY_NAME_MAP[key as keyof typeof COUNTRY_NAME_MAP],
    value: key,
  };
});
```

## Source File: modules/table/constants/index.ts

```ts
import { COUNTRY_CODE_MAP, COUNTRY_NAME_MAP } from "./country";

export { COUNTRY_CODE_MAP, COUNTRY_NAME_MAP };
```

## Source File: modules/table/create-table-module.tsx

```tsx
"use client";

import { createTableBody } from "./components/compound/body";
import { createTableFilterSearch } from "./components/compound/filter-search";
import { createTablePagination } from "./components/compound/pagination";
import { createTableSearch } from "./components/compound/search";
import { TableToolbar } from "./components/compound/toolbar";
import { createUseTableModule } from "./hooks/use-table-module";
import { createTableContexts } from "./module/create-contexts";
import { createTableData } from "./module/table-data";
import { createTableModuleRoot } from "./module/table-module";
import { createTableQuery } from "./module/table-query";
import type { CreateTableModuleResult } from "./types";

/**
 * TData를 고정한 Table 컴포넌트 세트를 생성한다.
 * 한 파일에서 여러 Table을 쓰려면 Factory를 타입별로 별도 호출.
 *
 * @example
 * const { TableModule, TableQuery, useTableModule } = createTableModule<User>();
 */
export function createTableModule<
  TData,
  TSource = unknown,
>(): CreateTableModuleResult<TData, TSource> {
  const { SourceContext, ModuleContext } = createTableContexts<
    TData,
    TSource
  >();

  const TableQuery = createTableQuery<TData>(SourceContext);
  const TableData = createTableData<TData>(SourceContext);
  const TableModuleRoot = createTableModuleRoot<TData, TSource>(
    SourceContext,
    ModuleContext,
  );
  const Body = createTableBody<TData, TSource>(ModuleContext);
  const Pagination = createTablePagination<TData, TSource>(ModuleContext);
  const Search = createTableSearch<TData, TSource>(ModuleContext);
  const FilterSearch = createTableFilterSearch<TData, TSource>(ModuleContext);
  const useTableModule = createUseTableModule<TData, TSource>(ModuleContext);

  const TableModule = Object.assign(TableModuleRoot, {
    Toolbar: TableToolbar,
    Search,
    FilterSearch,
    Body,
    Pagination,
  });

  return {
    TableQuery,
    TableData,
    TableModule,
    useTableModule,
  } as CreateTableModuleResult<TData, TSource>;
}
```

## Source File: modules/table/hooks/index.ts

```ts
export { default as useColumnSort } from "./use-column-sort";
export { default as useQueryString } from "./use-query-string";
export { useTableQuery } from "./use-table-query";
export { useTableData } from "./use-table-data";
```

## Source File: modules/table/hooks/use-column-sort.tsx

```tsx
"use client";

import { useMemo, useState } from "react";

interface Props {}

interface SortQueryParams {
  sortField?: string;
  sortDirection?: string;
}

function useColumnSort(props: Props) {
  const [sortState, setSortState] = useState<[string, "DESC" | "ASC"] | null>();

  const onHeaderSortClick = (headerId: string) => {
    if (sortState && sortState[0] === headerId) {
      if (sortState[1] === "DESC") {
        setSortState([headerId, "ASC"]);
        return;
      }

      if (sortState[1] === "ASC") {
        setSortState([headerId, "DESC"]);
        return;
      }
    }
    setSortState([headerId, "DESC"]);
  };

  const sortQueryParams = useMemo((): SortQueryParams => {
    if (!sortState) return {};
    return {
      sortField: sortState[0],
      sortDirection: sortState[1],
    };
  }, [sortState]);

  return {
    onHeaderSortClick,
    sortTarget: sortState ? sortState[0] : null,
    sortState: sortState ? sortState[1] : null,
    sortQueryParams,
  };
}

export default useColumnSort;
```

## Source File: modules/table/hooks/use-horizontal-scroll-hint.ts

```ts
"use client";

import type { HeaderGroup } from "@tanstack/react-table";
import { useEffect, useRef, useState } from "react";
import { computeHiddenHeaders } from "../utils/compute-hidden-headers";

interface UseHorizontalScrollHintParams {
  enabled?: boolean;
  headerGroups: HeaderGroup<any>[];
}

interface UseHorizontalScrollHintReturn {
  scrollRef: React.RefObject<HTMLDivElement | null>;
  hiddenHeaderTexts: string[];
  hintPos: { top: number; left: number } | null;
}

/**
 * 가로 스크롤 시 sticky 컬럼 옆에 힌트를 표시하기 위한 훅.
 *
 * - enabled=false이면 no-op
 * - scrollRef가 연결된 요소의 scroll/resize 이벤트를 관찰하여
 *   숨겨진 컬럼의 headerText와 힌트 위치를 상태로 노출
 * - 측정은 computeHiddenHeaders 순수 함수에 위임
 */
export function useHorizontalScrollHint(
  params: UseHorizontalScrollHintParams,
): UseHorizontalScrollHintReturn {
  const { enabled, headerGroups } = params;
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [hiddenHeaderTexts, setHiddenHeaderTexts] = useState<string[]>([]);
  const [hintPos, setHintPos] = useState<{ top: number; left: number } | null>(
    null,
  );

  // headerGroups 최신 참조를 effect 재실행 없이 읽기 위한 ref
  const headerGroupsRef = useRef(headerGroups);
  useEffect(() => {
    headerGroupsRef.current = headerGroups;
  }, [headerGroups]);

  useEffect(() => {
    if (!enabled) return;
    const scrollEl = scrollRef.current;
    if (!scrollEl) return;

    const recompute = () => {
      const headers = headerGroupsRef.current[0]?.headers ?? [];
      const { hidden, pos } = computeHiddenHeaders(scrollEl, headers);
      setHiddenHeaderTexts(hidden);
      setHintPos(pos);
    };

    recompute();
    scrollEl.addEventListener("scroll", recompute);
    const resizeObserver = new ResizeObserver(recompute);
    resizeObserver.observe(scrollEl);

    return () => {
      scrollEl.removeEventListener("scroll", recompute);
      resizeObserver.disconnect();
    };
  }, [enabled]);

  return { scrollRef, hiddenHeaderTexts, hintPos };
}
```

## Source File: modules/table/hooks/use-query-string.ts

```ts
"use client";
import { useCallback, useMemo, useState } from "react";
import { QueryParams } from "../types";

interface Props {}

const getInitSet = () => {
  const initSet = new Set<string>();

  return initSet;
};

function useQueryString(props: Props) {
  const [_queryStringMap, _setQueryStringMap] =
    useState<Set<string>>(getInitSet());

  const resetQueryString = useCallback(() => {
    _setQueryStringMap(getInitSet());
  }, []);

  const setQueryString = useCallback((key: string, value: string) => {
    _setQueryStringMap((prev) => {
      const newSet = new Set(prev);

      for (const entry of newSet) {
        if (entry.startsWith(`${key}=`)) {
          newSet.delete(entry);
        }
      }

      // 새 값을 인코딩해서 추가
      newSet.add(`${key}=${encodeURIComponent(value)}`);

      return newSet;
    });
  }, []);

  const queryString = useMemo(() => {
    return Array.from(_queryStringMap).join("&");
  }, [_queryStringMap]);

  // queryString을 객체로 변환
  const queryParams = useMemo(() => {
    const params: QueryParams = {};
    _queryStringMap.forEach((entry) => {
      const [key, value] = entry.split("=");
      if (key && value) {
        params[key] = decodeURIComponent(value);
      }
    });
    return params;
  }, [_queryStringMap]);

  return { queryString, queryParams, setQueryString, resetQueryString };
}

export default useQueryString;
```

## Source File: modules/table/hooks/use-row-selection-sync.ts

```ts
"use client";

import type { Dispatch, SetStateAction } from "react";
import { useEffect } from "react";
import type { Row, RowModel, Table } from "@tanstack/react-table";
import type { TableResponse } from "../types";
import { filterStaleSelection } from "../utils/filter-stale-selection";

interface UseRowSelectionSyncParams<TData> {
  data: TableResponse<TData> | null | undefined;
  table: Table<TData>;
  rowSelection: Record<string, boolean>;
  setRowSelection: Dispatch<SetStateAction<Record<string, boolean>>>;
  getRowId?: (row: TData, index: number, parent?: Row<TData>) => string;
  onChangeSelectedRow?: (rowModel: RowModel<TData>) => void;
}

/**
 * rowSelection 상태를 data 변경·외부 콜백과 동기화합니다.
 * 상태 자체는 TableModule 본체가 소유하며, 이 훅은 effect만 담당합니다.
 *
 * - data 변경 시: 현재 data에 없는 stale id를 rowSelection에서 제거
 * - rowSelection 변경 시: onChangeSelectedRow 콜백으로 상위에 통지
 */
export function useRowSelectionSync<TData>(
  params: UseRowSelectionSyncParams<TData>,
): void {
  const {
    data,
    table,
    rowSelection,
    setRowSelection,
    getRowId,
    onChangeSelectedRow,
  } = params;

  // stale id 정리
  useEffect(() => {
    if (!data?.content) return;
    setRowSelection((prev) => filterStaleSelection(prev, data, getRowId));
  }, [data, getRowId, setRowSelection]);

  // 외부 콜백 통지
  useEffect(() => {
    onChangeSelectedRow?.(table.getSelectedRowModel());
  }, [onChangeSelectedRow, table, rowSelection]);
}
```

## Source File: modules/table/hooks/use-sort-query-bridge.ts

```ts
"use client";

import { useEffect } from "react";
import useColumnSort from "./use-column-sort";
import type { TableQueryParams } from "../types";

interface UseSortQueryBridgeParams {
  updateSort: (sort: TableQueryParams["sort"]) => void;
}

interface UseSortQueryBridgeReturn {
  onHeaderSortClick: (headerId: string) => void;
  sortState: "ASC" | "DESC" | null;
  sortTarget: string | null;
}

/**
 * useColumnSort의 상태 변화를 useTableQuery의 sort 파라미터로 전파합니다.
 * UI에서 필요한 핸들러와 표시 상태만 반환합니다.
 */
export function useSortQueryBridge(
  params: UseSortQueryBridgeParams,
): UseSortQueryBridgeReturn {
  const { updateSort } = params;
  const { onHeaderSortClick, sortState, sortTarget, sortQueryParams } =
    useColumnSort({});

  useEffect(() => {
    if (sortQueryParams.sortField && sortQueryParams.sortDirection) {
      updateSort({
        field: sortQueryParams.sortField,
        direction: sortQueryParams.sortDirection.toLowerCase() as
          | "asc"
          | "desc",
      });
    } else {
      updateSort(null);
    }
  }, [sortQueryParams, updateSort]);

  return { onHeaderSortClick, sortState, sortTarget };
}
```

## Source File: modules/table/hooks/use-table-data.ts

```ts
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import type { QueryKey } from "@tanstack/react-query";
import { ResResponse, TableQueryParams, TableResponse } from "../types";

const defaultAdapter = <TData>(
  response: ResResponse<TData[]>,
): TableResponse<TData> => ({
  content: response.data.content,
  pageSummary: response.data.pageSummary,
});

interface UseTableDataParams<TData, TRawResponse> {
  /** params 받아 원본 응답을 반환. */
  queryFn: (params: TableQueryParams) => Promise<TRawResponse>;
  /** 현재 파라미터. react-query key 및 queryFn 인자로 사용. */
  queryParams: TableQueryParams;
  /** 외부 캐시 키(외부 필터 등). */
  queryKey: QueryKey;
  responseAdapter?: (response: TRawResponse) => TableResponse<TData>;
}

interface UseTableDataReturn<TData, TRawResponse> {
  data: TableResponse<TData> | null;
  rawData: TRawResponse | undefined;
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
}

export const useTableData = <TData, TRawResponse = ResResponse<TData[]>>({
  queryFn,
  queryParams,
  queryKey,
  responseAdapter,
}: UseTableDataParams<TData, TRawResponse>): UseTableDataReturn<
  TData,
  TRawResponse
> => {
  const _queryKey = useMemo<QueryKey>(
    () => [...queryKey, queryParams],
    [queryKey, queryParams],
  );

  const {
    data: rawData,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: _queryKey,
    queryFn: () => queryFn(queryParams),
    placeholderData: keepPreviousData,
    enabled: !!queryFn,
  });

  const data = useMemo(() => {
    if (!rawData) return null;
    if (responseAdapter) return responseAdapter(rawData);
    return defaultAdapter(rawData as unknown as ResResponse<TData[]>);
  }, [rawData, responseAdapter]);

  return { data, rawData, isLoading, isError, error };
};
```

## Source File: modules/table/hooks/use-table-module.ts

```ts
import { useContext, type Context } from "react";
import type { TableModuleContextValue } from "../types";

/**
 * Factory가 생성한 ModuleContext에서 값을 읽는 훅 팩토리.
 * 반환된 훅은 `<TableModule>` 내부에서만 호출해야 한다.
 */
export function createUseTableModule<TData, TSource = unknown>(
  ModuleContext: Context<TableModuleContextValue<TData, TSource> | null>,
) {
  return function useTableModule(): TableModuleContextValue<TData, TSource> {
    const ctx = useContext(ModuleContext);
    if (!ctx) {
      throw new Error(
        "useTableModule must be used inside <TableModule>. " +
          "Wrap your tree with <TableQuery> or <TableData> and render <TableModule> inside.",
      );
    }
    return ctx;
  };
}
```

## Source File: modules/table/hooks/use-table-query.ts

```ts
"use client";

import { useCallback, useState } from "react";
import { TableQueryParams } from "../types";

interface UseTableQueryReturn {
  queryParams: TableQueryParams;
  updatePagination: (page: number, pageSize: number) => void;
  updateFilters: (filters: TableQueryParams["filters"]) => void;
  updateSort: (sort: TableQueryParams["sort"]) => void;
  resetQuery: () => void;
}

export function useTableQuery(
  initialParams?: Partial<TableQueryParams>,
): UseTableQueryReturn {
  const [queryParams, setQueryParams] = useState<TableQueryParams>(() => ({
    page: 0,
    pageSize: 20,
    ...initialParams,
  }));

  const updatePagination = useCallback((page: number, pageSize: number) => {
    setQueryParams((prev) => ({ ...prev, page, pageSize }));
  }, []);

  const updateFilters = useCallback((filters: TableQueryParams["filters"]) => {
    setQueryParams((prev) => ({
      ...prev,
      filters: filters && filters.length > 0 ? filters : undefined,
    }));
  }, []);

  const updateSort = useCallback((sort: TableQueryParams["sort"]) => {
    setQueryParams((prev) => ({ ...prev, sort }));
  }, []);

  const resetQuery = useCallback(() => {
    setQueryParams({ page: 0, pageSize: 20 });
  }, []);

  return {
    queryParams,
    updatePagination,
    updateFilters,
    updateSort,
    resetQuery,
  };
}
```

## Source File: modules/table/hooks/use-table-search-handler.ts

```ts
"use client";

import { useQueryClient } from "@tanstack/react-query";
import _ from "lodash";
import { useCallback } from "react";
import type { TableQueryParams } from "../types";

interface UseTableSearchHandlerParams<TRawResponse> {
  isUsingQueryFn: boolean;
  queryFn?: (queryString: string) => Promise<TRawResponse>;
  queryKey?: string;
  updateFilters: (filters: TableQueryParams["filters"]) => void;
  onSearchFilterChange?: (value: string, filterField?: string) => void;
}

type SearchHandler = (params: { value: string; filterField?: string }) => void;

// 모듈 스코프 debounce — 기존 동작과 동일 (design Risk 1에서 유지 결정)
const debounce = _.debounce((callback: () => void) => callback(), 300);

/**
 * 검색 필터 변경 핸들러를 반환합니다.
 * - queryFn 모드: updateFilters + queryClient.invalidateQueries 호출
 * - data 모드: onSearchFilterChange 콜백 호출
 *
 * 300ms debounce는 모듈 스코프로 공유됩니다 (기존 동작 유지).
 */
export function useTableSearchHandler<TRawResponse>(
  params: UseTableSearchHandlerParams<TRawResponse>,
): SearchHandler {
  const {
    isUsingQueryFn,
    queryFn,
    queryKey,
    updateFilters,
    onSearchFilterChange,
  } = params;
  const queryClient = useQueryClient();

  return useCallback(
    ({ value, filterField }: { value: string; filterField?: string }) => {
      debounce(() => {
        if (isUsingQueryFn) {
          if (filterField && value) {
            updateFilters([{ field: filterField, value }]);
          } else {
            updateFilters(undefined);
          }
          if (queryKey) {
            queryClient.invalidateQueries({ queryKey: [queryKey] });
          } else if (queryFn) {
            queryClient.invalidateQueries({
              queryKey: [queryFn.name ?? "table-data"],
            });
          }
        } else {
          onSearchFilterChange?.(value, filterField);
        }
      });
    },
    [
      isUsingQueryFn,
      queryFn,
      queryKey,
      updateFilters,
      onSearchFilterChange,
      queryClient,
    ],
  );
}
```

## Source File: modules/table/index.ts

```ts
/**
 * # Table Module
 *
 * 단일 공개 엔트리. 외부 소비자는 이 파일에서만 import 한다.
 *
 * ## 데이터 공급자 두 가지
 *
 * ### TableData — 부모가 직접 fetch
 * 외부 필터(드로워/상단 패널 등)와 테이블 상태가 엮일 때. 부모가 `useQuery`로
 * 데이터를 가져오고, 테이블은 받은 data/pageSummary만 표시.
 *
 *     const UserTable = createTableModule<User>();
 *
 *     function UserListPage() {
 *       const [page, setPage] = useState(0);
 *       const { data } = useQuery(usersListOptions({ page, filters }));
 *
 *       return (
 *         <UserTable.TableData
 *           data={{ content: data?.rows ?? [], pageSummary: data?.pageSummary }}
 *           onQueryChange={(p) => {
 *             if (typeof p.page === "number") setPage(p.page);
 *           }}
 *         >
 *           <UserTable.TableModule renderColumns={...}>
 *             <UserTable.TableModule.Body />
 *             <UserTable.TableModule.Pagination />
 *           </UserTable.TableModule>
 *         </UserTable.TableData>
 *       );
 *     }
 *
 * ### TableQuery — 테이블이 내부에서 fetch
 * 외부 상태 엮임이 없고 단독 테이블로 충분할 때. `queryFn(queryString)`만 주면
 * 내부 useQuery + 페이지·필터·정렬 상태 관리까지 자동.
 *
 *     <UserTable.TableQuery
 *       queryKey="users"
 *       queryFn={(q) => api.get(`/users?${q}`)}
 *       responseAdapter={(res) => ({ content: res.items, pageSummary: res.page })}
 *       initQueryParams={{ page: 0, pageSize: 20 }}
 *     >
 *       <UserTable.TableModule renderColumns={...}>
 *         <UserTable.TableModule.Body />
 *         <UserTable.TableModule.Pagination />
 *       </UserTable.TableModule>
 *     </UserTable.TableQuery>
 *
 * ## 선택 기준
 *
 * | 상황 | 선택 |
 * |---|---|
 * | 외부 필터/드로워와 엮임 | `TableData` |
 * | 페이지 리셋을 부모가 제어 | `TableData` |
 * | 단독 테이블, filter/sort가 `TableModule.Search/Filter`만 | `TableQuery` |
 *
 * ## 현재 한계
 *
 * - 외부 필터 변경 시 내부 페이지 자동 리셋 API 없음. `TableData`에서는
 *   부모가 `onQueryChange`와 별개로 자체 page state를 관리해야 함.
 */

import "./column-meta";

export { createTableModule } from "./create-table-module";

export type {
  CreateTableModuleResult,
  NextRenderColumns,
  PageSummary,
  ResResponse,
  TableBodyProps,
  TableQueryProps,
  TableDataProps,
  TableDndProps,
  TableDragSourceContext,
  TableFilterSearchProps,
  TableModuleContextValue,
  TableModuleProps,
  TablePaginationProps,
  TableQueryParams,
  TableResponse,
  TableSearchProps,
  TableSourceContextValue,
  TableToolbarProps,
} from "./types";

// 앱에서 직접 import 필요했던 내부 컴포넌트 — public re-export
export { default as CheckboxComponent } from "./components/cells/checkbox-component";
```

## Source File: modules/table/module/create-contexts.tsx

```tsx
import { createContext } from "react";
import type {
  TableModuleContextValue,
  TableSourceContextValue,
} from "../types";

/**
 * Factory에서 사용할 Context 쌍 생성 함수.
 * createTableModule<T>() 호출마다 새 Context 인스턴스를 만들어
 * 한 페이지에서 TData가 다른 여러 Table이 공존 가능하게 한다.
 */
export function createTableContexts<TData, TSource = unknown>() {
  const SourceContext = createContext<TableSourceContextValue<TData> | null>(
    null,
  );
  const ModuleContext = createContext<TableModuleContextValue<
    TData,
    TSource
  > | null>(null);

  SourceContext.displayName = "TableSourceContext";
  ModuleContext.displayName = "TableModuleContext";

  return { SourceContext, ModuleContext };
}
```

## Source File: modules/table/module/table-data.tsx

```tsx
"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type Context,
} from "react";
import type {
  TableDataProps,
  TableQueryParams,
  TableSourceContextValue,
} from "../types";

export function createTableData<TData>(
  SourceContext: Context<TableSourceContextValue<TData> | null>,
) {
  return function TableData(props: TableDataProps<TData>) {
    const {
      data,
      page: pageProp,
      pageSize: pageSizeProp,
      onPageChange,
      onPageSizeChange,
      onQueryChange,
      initQueryParams,
      children,
    } = props;

    const [internalParams, setInternalParams] = useState<TableQueryParams>(
      () => ({
        page: 0,
        pageSize: 20,
        filters: [],
        sort: null,
        ...(initQueryParams ?? {}),
      }),
    );

    // Controlled props가 있으면 그 값을 우선 노출, 없으면 내부 state.
    const queryParams: TableQueryParams = useMemo(
      () => ({
        ...internalParams,
        ...(pageProp !== undefined ? { page: pageProp } : null),
        ...(pageSizeProp !== undefined ? { pageSize: pageSizeProp } : null),
      }),
      [internalParams, pageProp, pageSizeProp],
    );

    const onQueryChangeRef = useRef(onQueryChange);
    const onPageChangeRef = useRef(onPageChange);
    const onPageSizeChangeRef = useRef(onPageSizeChange);
    useEffect(() => {
      onQueryChangeRef.current = onQueryChange;
      onPageChangeRef.current = onPageChange;
      onPageSizeChangeRef.current = onPageSizeChange;
    });

    const isPageControlled = pageProp !== undefined;
    const isPageSizeControlled = pageSizeProp !== undefined;

    const updateAndNotify = useCallback(
      (updater: (prev: TableQueryParams) => TableQueryParams) => {
        setInternalParams((prev) => {
          const next = updater(prev);
          onQueryChangeRef.current?.(next);
          return next;
        });
      },
      [],
    );

    const updatePagination = useCallback(
      (nextPage: number, nextPageSize: number) => {
        if (isPageControlled) onPageChangeRef.current?.(nextPage);
        if (isPageSizeControlled) onPageSizeChangeRef.current?.(nextPageSize);
        updateAndNotify((prev) => ({
          ...prev,
          page: nextPage,
          pageSize: nextPageSize,
        }));
      },
      [isPageControlled, isPageSizeControlled, updateAndNotify],
    );

    const updateFilters = useCallback(
      (filters: TableQueryParams["filters"]) =>
        updateAndNotify((prev) => ({
          ...prev,
          page: 0,
          filters: filters && filters.length > 0 ? filters : undefined,
        })),
      [updateAndNotify],
    );
    const updateSort = useCallback(
      (sort: TableQueryParams["sort"]) =>
        updateAndNotify((prev) => {
          if (prev.sort === sort) return prev;
          return { ...prev, sort };
        }),
      [updateAndNotify],
    );

    const value = useMemo<TableSourceContextValue<TData>>(
      () => ({
        data,
        isLoading: false,
        queryParams,
        updatePagination,
        updateFilters,
        updateSort,
        isUsingQueryFn: false,
      }),
      [data, queryParams, updatePagination, updateFilters, updateSort],
    );

    return (
      <SourceContext.Provider value={value}>{children}</SourceContext.Provider>
    );
  };
}
```

## Source File: modules/table/module/table-module.tsx

```tsx
"use client";

import { useContext, useMemo, useState, type Context } from "react";
import { getCoreRowModel, useReactTable } from "@tanstack/react-table";

import {
  createAccountStateCellFn,
  createColumnFn,
  createCountryColumnFn,
  createCustomFn,
  createDateExpireFn,
  createDownloadCellFn,
  createDragableColumnFn,
  createLinkCellFn,
  createSelectFn,
  createStateCellFn,
} from "../components/cells";
import { useRowSelectionSync } from "../hooks/use-row-selection-sync";
import { useSortQueryBridge } from "../hooks/use-sort-query-bridge";
import type {
  NextRenderColumns,
  TableModuleContextValue,
  TableModuleProps,
  TableSourceContextValue,
} from "../types";

export function createTableModuleRoot<TData, TSource = unknown>(
  SourceContext: Context<TableSourceContextValue<TData> | null>,
  ModuleContext: Context<TableModuleContextValue<TData, TSource> | null>,
) {
  return function TableModuleRoot(props: TableModuleProps<TData, TSource>) {
    const { renderColumns, getRowId, onChangeSelectedRow, dnd, t, children } =
      props;

    const source = useContext(SourceContext);
    if (!source) {
      throw new Error(
        "<TableModule> must be rendered inside <TableQuery> or <TableData>.",
      );
    }

    const columns = useMemo(() => {
      const translate = t ?? ((key: string) => key);
      const builder: NextRenderColumns<TData> = {
        Column: createColumnFn<TData>(),
        Select: createSelectFn<TData, TSource>(dnd),
        Download: createDownloadCellFn<TData>(),
        Link: createLinkCellFn<TData>(),
        Custom: createCustomFn<TData>(),
        State: createStateCellFn<TData>(),
        AccountState: createAccountStateCellFn<TData>(translate),
        Country: createCountryColumnFn<TData>(),
        DateExpire: createDateExpireFn<TData>(),
        DragableColumn: createDragableColumnFn<TData, TSource>(dnd),
      };
      return renderColumns(builder);
    }, [dnd, renderColumns, t]);

    const [rowSelection, setRowSelection] = useState<Record<string, boolean>>(
      {},
    );

    const table = useReactTable<TData>({
      data: source.data?.content ?? [],
      columns,
      getCoreRowModel: getCoreRowModel(),
      getRowId,
      state: { rowSelection },
      onRowSelectionChange: setRowSelection,
      defaultColumn: { size: 200, minSize: 50, maxSize: 500 },
      columnResizeMode: "onChange",
      enableColumnResizing: true,
      autoResetPageIndex: false,
    });

    useRowSelectionSync<TData>({
      data: source.data,
      table,
      rowSelection,
      setRowSelection,
      getRowId,
      onChangeSelectedRow,
    });

    const { sortState, sortTarget, onHeaderSortClick } = useSortQueryBridge({
      updateSort: source.updateSort,
    });

    const selectedRows = useMemo(
      () => table.getSelectedRowModel().rows.map((r) => r.original),
      // rowSelection is the actual dependency that changes when selection changes
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [table, rowSelection],
    );

    const value = useMemo<TableModuleContextValue<TData, TSource>>(
      () => ({
        ...source,
        table,
        selectedRows,
        sortState,
        sortTarget,
        onHeaderSortClick,
        dnd,
      }),
      [
        source,
        table,
        selectedRows,
        sortState,
        sortTarget,
        onHeaderSortClick,
        dnd,
      ],
    );

    return (
      <ModuleContext.Provider value={value}>{children}</ModuleContext.Provider>
    );
  };
}
```

## Source File: modules/table/module/table-query.tsx

```tsx
"use client";

import { useEffect, useMemo, useRef, type Context } from "react";
import { useTableData } from "../hooks/use-table-data";
import { useTableQuery } from "../hooks/use-table-query";
import type {
  ResResponse,
  TableQueryProps,
  TableSourceContextValue,
} from "../types";

export function createTableQuery<TData>(
  SourceContext: Context<TableSourceContextValue<TData> | null>,
) {
  return function TableQuery<TRawResponse = ResResponse<TData[]>>(
    props: TableQueryProps<TData, TRawResponse>,
  ) {
    const { queryFn, queryKey, responseAdapter, initQueryParams, children } =
      props;

    const initialParams = useMemo(
      () => initQueryParams ?? {},
      [initQueryParams],
    );
    const { queryParams, updatePagination, updateFilters, updateSort } =
      useTableQuery(initialParams);

    // queryKey 변경 감지(배열 안정 비교용 해시) → page 자동 리셋. 첫 마운트 무시.
    const serializedKey = useMemo(() => JSON.stringify(queryKey), [queryKey]);
    const isFirstRender = useRef(true);
    useEffect(() => {
      if (isFirstRender.current) {
        isFirstRender.current = false;
        return;
      }
      updatePagination(0, queryParams.pageSize ?? 20);
      // pageSize는 deps 제외 — 리셋은 queryKey 변경에만 반응.
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [serializedKey]);

    const { data, isLoading } = useTableData<TData, TRawResponse>({
      queryFn,
      queryParams,
      queryKey,
      responseAdapter,
    });

    const value = useMemo<TableSourceContextValue<TData>>(
      () => ({
        data,
        isLoading,
        queryParams,
        updatePagination,
        updateFilters,
        updateSort,
        isUsingQueryFn: true,
      }),
      [
        data,
        isLoading,
        queryParams,
        updatePagination,
        updateFilters,
        updateSort,
      ],
    );

    return (
      <SourceContext.Provider value={value}>{children}</SourceContext.Provider>
    );
  };
}
```

## Source File: modules/table/search/filter-search.tsx

```tsx
"use client";
import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@workspace/ui/components/select";

export interface FilterOption {
  value: string;
  label: string;
}

export interface SearchFilterInputProps {
  options: FilterOption[];
  selectedValue: string;
  onSelectChange: (value: string) => void;
  selectPlaceholder?: string;
  children?: React.ReactNode;
}

function FilterSearch(props: SearchFilterInputProps) {
  const {
    options,
    selectedValue,
    onSelectChange,
    selectPlaceholder = "선택",
    children,
  } = props;

  return (
    <div className="flex items-center">
      <div className={"w-[234px]"}>
        <Select value={selectedValue} onValueChange={onSelectChange}>
          <SelectTrigger className="h-[48px] line-01 py-[14px]">
            <SelectValue
              className="py-[14px]"
              placeholder={selectPlaceholder}
            />
          </SelectTrigger>
          <SelectContent className="line-01 bg-00" data-testid="FILTER_CONTENT">
            <SelectGroup className="bg-00">
              {options.map((opt) => (
                <SelectItem
                  key={opt.value}
                  className="cursor-pointer"
                  value={opt.value}
                >
                  {opt.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div>{children}</div>
    </div>
  );
}

export default FilterSearch;
```

## Source File: modules/table/search/index.ts

```ts
export { type SearchFilterProps } from "./search";
export { default as SearchFilterInput } from "./search-filter";
export { default as TableSearchFilterWrapper } from "./table-search-filter-wrapper";
```

## Source File: modules/table/search/search-filter.tsx

```tsx
"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@workspace/ui/components/select";
import { useEffect, useState } from "react";
import SearchInput from "./search-input";
import { SearchResultType } from "./search-result";

export interface FilterOption<T = string> {
  value: T;
  label: string;
  selectOptions?: {
    label: string;
    value: string;
  }[];
}

export interface SearchFilterInputProps {
  options: FilterOption[];
  selectedValue: string;
  onSelectChange: (value: string) => void;
  searchResult: SearchResultType[];
  onSelectResultItem: (item: SearchResultType) => void;
  selectPlaceholder?: string;
  searchValue?: string;
  onSearchChange?: (value: string, type: "LIKE" | "EQUAL") => void;
  searchPlaceholder?: string;
}

function SearchFilterInput(props: SearchFilterInputProps) {
  const {
    options,
    selectedValue,
    onSelectChange,
    selectPlaceholder = "선택",
    searchPlaceholder = "검색",
    searchValue,
    onSearchChange,
    searchResult,
    onSelectResultItem,
  } = props;

  const [selectiveOption, setSelectiveOption] = useState("");

  useEffect(() => {
    setSelectiveOption("");
  }, [selectedValue]);

  return (
    <div className="flex items-center gap-4">
      <div className={"w-[234px]"}>
        <Select value={selectedValue} onValueChange={onSelectChange}>
          <SelectTrigger className="line-01 h-[48px] py-[14px]">
            <SelectValue
              className="py-[14px]"
              placeholder={selectPlaceholder}
            />
          </SelectTrigger>
          <SelectContent className="line-01 bg-00" data-testid="FILTER_CONTENT">
            <SelectGroup className="bg-00">
              {options.map((opt) => (
                <SelectItem
                  key={opt.value}
                  className="cursor-pointer"
                  value={opt.value}
                >
                  {opt.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div>
        <>
          {options.find((opt) => opt.value === selectedValue)?.selectOptions ? (
            <Select
              value={selectiveOption}
              onValueChange={(data) => {
                setSelectiveOption(data);
                onSearchChange?.(data, "EQUAL");
              }}
            >
              <SelectTrigger className="line-01 h-[48px] py-[14px]">
                <SelectValue placeholder={selectPlaceholder} />
              </SelectTrigger>
              <SelectContent className="line-01 bg-00">
                {options
                  .find((opt) => opt.value === selectedValue)
                  ?.selectOptions?.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
          ) : (
            <SearchInput
              isVisibleResult={false}
              value={searchValue || ""}
              onSearchChange={(value) => onSearchChange?.(value, "LIKE")}
              placeholder={searchPlaceholder}
              searchResult={searchResult}
              onSelectResultItem={onSelectResultItem}
            />
          )}
        </>
      </div>
    </div>
  );
}

export default SearchFilterInput;
```

## Source File: modules/table/search/search-input.tsx

```tsx
"use client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@workspace/ui/components/popover";
import { SearchInputModule } from "@workspace/ui/modules";
import { Ref, useState } from "react";
import SearchResult, { SearchResultType } from "./search-result";

interface Props {
  value: string;
  onSearchChange: (value: string) => void;
  isVisibleResult?: boolean;
  searchResult?: SearchResultType[];
  onSelectResultItem?: (item: SearchResultType) => void;
  placeholder?: string;
  ref?: Ref<HTMLInputElement>;
}

function SearchInput(props: Props) {
  const {
    value,
    onSearchChange,
    placeholder,
    searchResult,
    onSelectResultItem,
    ref,
    isVisibleResult = true,
  } = props;
  const [popoverOpen, setPopoverOpen] = useState(false);

  const onSearchValueChange = (value: string) => {
    // setPopoverOpen(false);
    onSearchChange(value);
  };

  return (
    <>
      <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
        <PopoverTrigger asChild={true}>
          <SearchInputModule
            ref={ref}
            className="rounded-[10px] border-0 bg-01"
            value={value}
            onSearchChange={onSearchValueChange}
            placeholder={placeholder}
            onInputFocus={() => {
              setPopoverOpen(true);
            }}
            onInputBlur={() => {
              setPopoverOpen(false);
            }}
          />
        </PopoverTrigger>
        <PopoverContent
          align={"start"}
          className={"mt-[10px] w-[300px] border-none bg-00"}
          onOpenAutoFocus={(event) => {
            event.preventDefault();
          }}
        >
          {isVisibleResult && (
            <SearchResult
              searchResult={searchResult ? searchResult : []}
              onSelectItem={(value) => {
                onSelectResultItem?.(value);
                onSearchChange(value.label);
                setPopoverOpen(false);
              }}
            />
          )}
        </PopoverContent>
      </Popover>
    </>
  );
}

export default SearchInput;
```

## Source File: modules/table/search/search-result.tsx

```tsx
"use client";

export type SearchResultType = { id: string; label: string; value: string };

interface Props {
  onSelectItem: (value: SearchResultType) => void;
  searchResult: SearchResultType[];
}

function SearchResult(props: Props) {
  const { onSelectItem, searchResult } = props;

  return (
    <>
      <div
        className={
          "flex w-full flex-col gap-[8px] rounded-[12px] border line-01 bg-gray-00 px-[2px] py-[20px] max-h-[300px] overflow-y-scroll"
        }
      >
        {/*없으면 null*/}
        {!!searchResult.length &&
          searchResult.map((item) => (
            <span
              className={"cursor-pointer px-[20px] py-[12px] hover:bg-03"}
              key={item.value}
              onClick={() => onSelectItem(item)}
            >
              {item.label}
            </span>
          ))}

        {!searchResult.length && (
          <span className={"px-[20px]"}>NO RESULTS</span>
        )}
      </div>
    </>
  );
}

export default SearchResult;
```

## Source File: modules/table/search/search.tsx

```tsx
"use client";

import { FilterOption } from "./search-filter";
import { ReactNode } from "react";

export type SearchFilterProps =
  | {
      /** 검색 타입: "single" (단일 검색) 또는 "filter" (필터 선택 + 검색) */
      type?: "single" | "filter";
      /** 단일 검색용: 검색할 필드명 (type이 "single"일 때 필수) */
      filterField?: string;
      /** 검색 입력란 placeholder */
      placeholder?: string;
      /** 필터 검색용: 필터 옵션 목록 (type이 "filter"일 때 필수) */
      selectItems?: FilterOption[];
      /** 필터 검색용: 기본 선택값 (type이 "filter"일 때 사용) */
      defaultValue?: FilterOption[][number]["value"];
      /** 커스텀 검색 컴포넌트 렌더링 함수 */
      render?: (onChange: (value: string, field?: string) => void) => ReactNode;
    }
  | {
      /** 하위 호환성: 기존 형태 (selectItems, defaultValue만 제공) */
      type?: never;
      selectItems: FilterOption[];
      defaultValue: FilterOption[][number]["value"];
      filterField?: never;
      placeholder?: never;
      render?: never;
    };
```

## Source File: modules/table/search/table-search-filter-wrapper.tsx

```tsx
import { useState } from "react";
import { SearchFilterProps } from "./search";
import SearchFilterInput from "./search-filter";
import SearchInput from "./search-input";

interface Props {
  searchFilter: SearchFilterProps;
  onSearchValueChange: (params: {
    value: string;
    filterField?: string;
  }) => void;
}

const TableSearchFilterWrapper = ({
  searchFilter,
  onSearchValueChange,
}: Props) => {
  // 모든 Hook을 최상위에서 호출 (Hook 규칙 준수)
  const selectItems =
    "selectItems" in searchFilter ? searchFilter.selectItems : [];
  const defaultValue =
    "defaultValue" in searchFilter ? searchFilter.defaultValue : undefined;
  const filterField =
    "filterField" in searchFilter ? searchFilter.filterField : undefined;

  // 단일 검색용 state
  const [singleSearchValue, setSingleSearchValue] = useState("");
  // 필터 검색용 state
  const [searchSelectValue, setSearchSelectValue] = useState(defaultValue);
  const [filterSearchValue, setFilterSearchValue] = useState("");

  // 커스텀 렌더링이 있으면 우선 사용
  if ("render" in searchFilter && searchFilter.render) {
    return (
      <>
        {searchFilter.render((value, field) => {
          onSearchValueChange({
            value,
            filterField: field,
          });
        })}
      </>
    );
  }

  // 단일 검색 (type이 "single"이거나 filterField만 제공된 경우)
  const isSingleSearch =
    searchFilter.type === "single" ||
    (filterField && !searchFilter.selectItems);

  if (isSingleSearch) {
    const handleSearchChange = (value: string) => {
      setSingleSearchValue(value);
      onSearchValueChange({
        value,
        filterField: filterField,
      });
    };

    return (
      <SearchInput
        value={singleSearchValue}
        onSearchChange={handleSearchChange}
        placeholder={searchFilter.placeholder || "검색"}
        isVisibleResult={false}
        searchResult={[]}
        onSelectResultItem={() => {
          // TODO: 검색 결과 선택 시 처리 로직
        }}
      />
    );
  }

  // 필터 검색 (기존 형태 또는 type이 "filter")
  const handleSearchChange = (value: string) => {
    setFilterSearchValue(value);
    onSearchValueChange({
      value,
      filterField: searchSelectValue,
    });
  };

  const handleSelectChange = (data: string) => {
    setFilterSearchValue("");
    setSearchSelectValue(data);
    onSearchValueChange({ value: "", filterField: data });
  };

  return (
    <SearchFilterInput
      onSearchChange={handleSearchChange}
      options={selectItems ?? []}
      selectedValue={searchSelectValue ?? ""}
      onSelectChange={handleSelectChange}
      searchResult={[]}
      onSelectResultItem={() => {
        // TODO: 검색 결과 선택 시 처리 로직
      }}
      searchValue={filterSearchValue}
      searchPlaceholder={searchFilter.placeholder}
    />
  );
};

export default TableSearchFilterWrapper;
```

## Source File: modules/table/types.ts

```ts
import type { ComponentType, ReactElement, ReactNode } from "react";
import type { ColumnDef, Row, RowModel, Table } from "@tanstack/react-table";
import type { QueryKey } from "@tanstack/react-query";

import type { DragSourceFactory } from "../dnd/types";
import type {
  AccountStateCellFn,
  ColumnFn,
  CountryColumnFn,
  CustomFn,
  DateExpireFn,
  DownloadCellFn,
  DragableColumnFn,
  LinkCellFn,
  SelectFn,
  StateCellFn,
} from "./components/cells";
import type { FilterOption } from "./search/search-filter";

export interface PageSummary {
  first: boolean;
  last: boolean;
  numberOfElements: number;
  pageNumber: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
}

/**
 * @deprecated Use TableQueryParams instead. This interface is for backward compatibility with existing API functions.
 */
export interface QueryParams {
  page?: string;
  size?: string;
  filterField?: string;
  filterValue?: string;
  filterType?: string;
  sortField?: string;
  sortDirection?: string;
  [key: string]: string | undefined;
}

/**
 * 범용 테이블 쿼리 파라미터 (백엔드 API 독립적)
 */
export interface TableQueryParams {
  /** 페이지 번호 (0-based) */
  page?: number;
  /** 페이지 크기 */
  pageSize?: number;
  /** 검색/필터 조건 (다중 필터 지원) */
  filters?: Array<{
    field: string;
    value: string;
  }>;
  /** 정렬 조건 */
  sort?: {
    field: string;
    direction: "asc" | "desc";
  } | null;
}

export interface TableResponse<TData> {
  content: TData[];
  pageSummary?: PageSummary;
}

export interface TableDragSourceContext<TData> {
  row: TData;
  selectedRows: TData[];
}

export type TableDndProps<TData, TSource> = DragSourceFactory<
  TableDragSourceContext<TData>,
  TSource
>;

export type ResResponse<T = object> = {
  error?: any;
  success: boolean;
  message: string | null;

  data: T extends any[]
    ? {
        content: T;
        page?: {
          first: boolean;
          offset: number;
          page: number;
          pageNumber: number;
          size: number;
          startNumber: number;
          unpaged: boolean;
          valid: boolean;
        };
        pageSummary?: PageSummary;
        totalPages?: number;
      }
    : T;
  timestamp: string;
};

/** 신규 API용 column helper 번들 (기존 RenderColumns와 분리 — DownLoad → Download 리네이밍) */
export interface NextRenderColumns<TData> {
  Column: ColumnFn<TData>;
  Select: SelectFn<TData>;
  Download: DownloadCellFn<TData>;
  Link: LinkCellFn<TData>;
  Custom: CustomFn<TData>;
  State: StateCellFn<TData>;
  AccountState: AccountStateCellFn<TData>;
  Country: CountryColumnFn<TData>;
  DateExpire: DateExpireFn<TData>;
  DragableColumn: DragableColumnFn<TData>;
}

/** 데이터 계층 Context value — <TableQuery> / <TableData>가 제공 */
export interface TableSourceContextValue<TData> {
  data: TableResponse<TData> | null | undefined;
  isLoading: boolean;
  queryParams: TableQueryParams;
  updatePagination: (page: number, size: number) => void;
  updateFilters: (filters: TableQueryParams["filters"]) => void;
  updateSort: (sort: TableQueryParams["sort"]) => void;
  isUsingQueryFn: boolean;
}

/** UI 계층 Context value — <TableModule>이 제공, useTableModule()로 접근 */
export interface TableModuleContextValue<
  TData,
  TSource = unknown,
> extends TableSourceContextValue<TData> {
  table: Table<TData>;
  selectedRows: TData[];
  sortState: "ASC" | "DESC" | null;
  sortTarget: string | null;
  onHeaderSortClick: (field: string) => void;
  dnd?: TableDndProps<TData, TSource>;
}

/** <TableQuery> props */
export interface TableQueryProps<TData, TRawResponse = ResResponse<TData[]>> {
  /** react-query 표준 QueryKey (readonly unknown[]). prefix 매칭 invalidation 가능. */
  queryKey: QueryKey;
  /** 내부 queryParams(page/pageSize/filters/sort)를 객체 그대로 받아 백엔드 호출. */
  queryFn: (params: TableQueryParams) => Promise<TRawResponse>;
  responseAdapter?: (response: TRawResponse) => TableResponse<TData>;
  initQueryParams?: Partial<TableQueryParams>;
  children: ReactNode;
}

/** <TableData> props */
export interface TableDataProps<TData> {
  data: TableResponse<TData>;
  /**
   * Controlled mode: 부모가 페이지 번호를 소유.
   * 미지정 시 uncontrolled (내부 state로 관리, 기존 동작 유지).
   */
  page?: number;
  /**
   * Controlled mode: 부모가 페이지 크기를 소유.
   * 미지정 시 uncontrolled.
   */
  pageSize?: number;
  /** Controlled mode 콜백: 사용자가 페이지를 변경했을 때 호출. */
  onPageChange?: (page: number) => void;
  /** Controlled mode 콜백: 사용자가 페이지 크기를 변경했을 때 호출. */
  onPageSizeChange?: (pageSize: number) => void;
  onQueryChange?: (params: TableQueryParams) => void;
  initQueryParams?: Partial<TableQueryParams>;
  children: ReactNode;
}

/** <TableModule> props */
export interface TableModuleProps<TData, TSource = unknown> {
  renderColumns: (params: NextRenderColumns<TData>) => ColumnDef<TData>[];
  getRowId?: (row: TData, index: number, parent?: Row<TData>) => string;
  onChangeSelectedRow?: (rowModel: RowModel<TData>) => void;
  dnd?: TableDndProps<TData, TSource>;
  /** 번역 함수. AccountState column 등 i18n이 필요한 helper가 사용. 미지정 시 identity fallback. */
  t?: (key: string) => string;
  children?: ReactNode;
}

/** <TableModule.Toolbar> props */
export interface TableToolbarProps {
  children?: ReactNode;
}

/** <TableModule.Search> props */
export interface TableSearchProps {
  placeholder?: string;
  field?: string;
}

/** <TableModule.FilterSearch> props */
export interface TableFilterSearchProps {
  filters: FilterOption[];
  placeholder?: string;
  defaultValue?: string;
}

/** <TableModule.Body> props */
export interface TableBodyProps {
  horizontalScrollHint?: boolean;
  firstPinnedRow?: () => ReactElement;
}

/** <TableModule.Pagination> props */
export interface TablePaginationProps {}

/** Factory 반환 타입 */
export interface CreateTableModuleResult<TData, TSource = unknown> {
  /**
   * 서버 fetch 모드. `TRawResponse`를 호출 시점에 명시하면 `responseAdapter` 타입이
   * 그대로 추론된다. 생략 시 `ResResponse<TData[]>`로 기본 처리.
   */
  TableQuery: <TRawResponse = ResResponse<TData[]>>(
    props: TableQueryProps<TData, TRawResponse>,
  ) => ReactElement | null;
  TableData: ComponentType<TableDataProps<TData>>;
  TableModule: ComponentType<TableModuleProps<TData, TSource>> & {
    Toolbar: ComponentType<TableToolbarProps>;
    Search: ComponentType<TableSearchProps>;
    FilterSearch: ComponentType<TableFilterSearchProps>;
    Body: ComponentType<TableBodyProps>;
    Pagination: ComponentType<TablePaginationProps>;
  };
  useTableModule: () => TableModuleContextValue<TData, TSource>;
}
```

## Source File: modules/table/utils.ts

```ts
/**
 * 주어진 날짜 문자열이 이미 지났거나, 현재로부터 expireMonth 개월 이내에 만료되는지 확인합니다.
 * @param dateString - ISO 8601 형식의 날짜 문자열(ex. '2025-08-01')
 * @param expireMonth - 만료를 확인할 개월 수(기본값: 3)
 * @returns 이미 만료되었거나(expired) 곧 만료될(within expireMonth months) 경우 true, 그 외는 false
 */
export function isExpirationStatus(
  dateString: string,
  expireMonth = 3,
): boolean {
  if (!dateString) return false;

  const targetDate = new Date(dateString);
  if (isNaN(targetDate.getTime())) {
    // 잘못된 날짜 문자열을 전달했을 때 false를 반환하거나, 에러를 던지도록 선택할 수 있습니다.
    return false;
  }

  const now = new Date();
  // 목표 날짜가 과거라면 이미 만료된 상태
  if (targetDate < now) {
    return true;
  }

  // 만료 기준일 = 현재 + expireMonth 개월
  const expireThreshold = new Date(now);
  expireThreshold.setMonth(expireThreshold.getMonth() + expireMonth);

  // 목표 날짜가 만료 기준일 이전이면 곧 만료될 상태
  return targetDate <= expireThreshold;
}

export type MissingPath = string;

export interface CheckMissingOptions {
  /** Treat numeric 0 as missing */
  treatZeroAsMissing?: boolean;
  /** Treat boolean false as missing */
  treatFalseAsMissing?: boolean;
}

export function checkMissingFields(
  value: unknown,
  options: CheckMissingOptions = {},
) {
  const missing: MissingPath[] = [];
  const { treatZeroAsMissing = false, treatFalseAsMissing = false } = options;

  const isMissing = (v: unknown): boolean => {
    if (v === "" || v === null || v === undefined) return true;
    if (treatZeroAsMissing && v === 0) return true;
    if (treatFalseAsMissing && v === false) return true;
    return false;
  };

  const walk = (node: unknown, parts: string[]) => {
    if (Array.isArray(node)) {
      node.forEach((item, idx) => walk(item, [...parts, `[${idx}]`]));
    } else if (node !== null && typeof node === "object") {
      Object.entries(node as Record<string, unknown>).forEach(([k, v]) => {
        const nextParts = [...parts, k];
        if (isMissing(v)) {
          // turn ["arr", "[0]", "key"] ⇒ "arr[0].key"
          const path = nextParts.join(".").replace(/\.\[/g, "[");
          missing.push(path);
        } else {
          walk(v, nextParts);
        }
      });
    }
  };

  walk(value, []);
  return { missingPaths: missing, hasMissing: missing.length > 0 } as const;
}

export const parseFileData = async (acceptedFiles: File[]) => {
  return await new Promise<any>((resolve, reject) => {
    if (!acceptedFiles[0]) return;
    const fileName = acceptedFiles[0].name;
    const fileSize = acceptedFiles[0].size;

    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result as string;
      const base64 = dataUrl.split(",")[1];

      if (!base64) {
        throw "file error";
      }

      resolve({ fileName, fileData: base64, fileSize });
    };

    reader.readAsDataURL(acceptedFiles[0]);
  });
};

/**
 * 쉼표가 포함된 숫자 문자열을 number 타입으로 변환합니다.
 * @param s - 변환할 문자열 (예: "1,234.56")
 * @throws 문자열이 유효한 숫자가 아니면 Error 발생
 */
export function parseNumberWithCommas(s: string): number {
  const sanitized = s.replace(/,/g, "");
  const result = Number(sanitized);
  if (isNaN(result)) {
    throw new Error(`Invalid number: "${s}"`);
  }
  return result;
}

/**
 * 두 개의 문자열 날짜 A, B를 받아서
 * B가 A 이후인지(true/false) 반환하는 함수
 *
 * @param dateA 기준이 되는 날짜 문자열 (예: "2025-06-02" 또는 "2025-06-02T15:30:00")
 * @param dateB 비교 대상 날짜 문자열
 * @returns B가 A 이후면 true, 그렇지 않으면 false
 * @throws 날짜 형식이 올바르지 않으면 Error를 던집니다.
 */
export function isOnOrAfterDate(dateA: string, dateB: string): boolean {
  const parsedA = new Date(dateA);
  const parsedB = new Date(dateB);

  // Date 파싱 결과가 유효한지 확인
  if (isNaN(parsedA.getTime()) || isNaN(parsedB.getTime())) {
    throw new Error("유효하지 않은 날짜 형식입니다.");
  }

  return parsedB.getTime() > parsedA.getTime();
}

export function parseDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("en-CA");
}
```

## Source File: modules/table/utils/compute-hidden-headers.ts

```ts
import type { Header } from "@tanstack/react-table";

interface ComputeHiddenHeadersResult {
  hidden: string[];
  pos: { top: number; left: number } | null;
}

/**
 * 가로 스크롤 컨테이너와 헤더 배열을 받아 "화면 밖으로 밀려난" 컬럼의
 * headerText 목록과 힌트 표시 위치를 계산합니다.
 *
 * sticky=left 컬럼은 항상 보이는 것으로 간주하여 제외합니다.
 * headerText가 없는 컬럼도 제외합니다.
 *
 * @returns hidden 텍스트 배열과 section 기준 absolute 위치. th가 없으면 pos=null.
 */
export function computeHiddenHeaders(
  scrollEl: HTMLDivElement,
  headers: Header<any, unknown>[],
): ComputeHiddenHeadersResult {
  const ths = scrollEl.querySelectorAll<HTMLElement>("th");
  if (ths.length === 0) {
    return { hidden: [], pos: null };
  }

  const stickyColWidth = ths[0]?.offsetWidth ?? 0;
  const scrollLeft = scrollEl.scrollLeft;
  const visibleEdge = scrollLeft + stickyColWidth;

  const indicatorHeight = 20;
  const pos = {
    top: scrollEl.offsetTop - indicatorHeight - 2,
    left: scrollEl.offsetLeft + stickyColWidth + 6,
  };

  const hidden: string[] = [];
  for (let i = 0; i < ths.length; i++) {
    const th = ths[i];
    const header = headers[i];
    if (!th || !header) continue;
    if (header.column.columnDef.meta?.sticky === "left") continue;
    const right = th.offsetLeft + th.offsetWidth;
    if (right > visibleEdge) continue;
    const text = header.column.columnDef.meta?.headerText;
    if (!text) continue;
    hidden.push(text);
  }

  return { hidden, pos };
}
```

## Source File: modules/table/utils/filter-stale-selection.ts

```ts
import type { Row } from "@tanstack/react-table";
import type { TableResponse } from "../types";

type GetRowIdFn<TData> = (
  row: TData,
  index: number,
  parent?: Row<TData>,
) => string;

/**
 * 이전 rowSelection 객체에서 현재 data에 존재하지 않는 id를 제거합니다.
 * 변경이 없으면 입력 참조를 그대로 반환하여 불필요한 리렌더를 방지합니다.
 *
 * @param prev 이전 rowSelection (id → boolean 맵)
 * @param data 현재 테이블 데이터
 * @param getRowId 행 id 추출 함수 (없으면 인덱스를 id로 사용)
 * @returns 정리된 rowSelection. 변경 없으면 prev 동일 참조.
 */
export function filterStaleSelection<TData>(
  prev: Record<string, boolean>,
  data: TableResponse<TData> | null | undefined,
  getRowId?: GetRowIdFn<TData>,
): Record<string, boolean> {
  if (!data?.content) return prev;
  const currentIds = new Set(
    data.content.map((row, i) => (getRowId ? getRowId(row, i) : String(i))),
  );

  let changed = false;
  const next: Record<string, boolean> = {};
  for (const id in prev) {
    if (currentIds.has(id)) {
      next[id] = prev[id]!;
    } else {
      changed = true;
    }
  }
  return changed ? next : prev;
}
```

---

## 13. v1.4 Addendum — 신규 컴포넌트 원문 (42)

> Claude Design 프로젝트(UROCK Design System_v1.4)에서 이식된 42개 신규 컴포넌트의 전체 소스. §5 표는 이 목록을 반영해 갱신됨. 정렬: 파일명 알파벳순.

## Source File: components/avatar.tsx

```tsx
import { cn } from "@workspace/ui/utils";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

const avatarVariants = cva(
  "relative box-border inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full border-2 line-02 bg-03 font-semibold text-04-brand tracking-[-0.5px]",
  {
    variants: {
      size: {
        XL: "h-[56px] w-[56px] text-[20px]",
        L: "h-[40px] w-[40px] text-[16px]",
        M: "h-[32px] w-[32px] text-[13px]",
        S: "h-[24px] w-[24px] text-[10px]",
      },
    },
    defaultVariants: {
      size: "M",
    },
  },
);

const STATUS_SIZES = {
  XL: "h-[14px] w-[14px]",
  L: "h-[12px] w-[12px]",
  M: "h-[10px] w-[10px]",
  S: "h-[8px] w-[8px]",
} as const;

const STATUS_COLORS = {
  online: "state-success",
  busy: "state-error",
  away: "state-warning",
  offline: "bg-gray-02",
} as const;

function initials(name?: string) {
  if (!name) return "?";
  const parts = name.trim().split(/\s+/);
  return parts.length >= 2
    ? (parts[0]![0]! + parts[parts.length - 1]![0]!).toUpperCase()
    : name.slice(0, 2).toUpperCase();
}

export interface AvatarProps
  extends
    React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof avatarVariants> {
  /** Image URL — falls back to initials if absent */
  src?: string;
  /** Full name used for initials + tooltip */
  name?: string;
  /** Online presence indicator */
  status?: "online" | "offline" | "busy" | "away";
}

const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  ({ className, src, name, size, status, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(avatarVariants({ size }), className)}
        title={name}
        {...props}
      >
        {src ? (
          <img
            src={src}
            alt={name || "Avatar"}
            className="h-full w-full rounded-full object-cover"
          />
        ) : (
          <span>{initials(name)}</span>
        )}
        {status && (
          <span
            className={cn(
              "absolute right-0 bottom-0 box-border rounded-full border-2 bg-00",
              STATUS_SIZES[size ?? "M"],
              STATUS_COLORS[status],
            )}
          />
        )}
      </div>
    );
  },
);
Avatar.displayName = "Avatar";

export { Avatar, avatarVariants };
```

## Source File: components/badge.tsx

```tsx
import { cn } from "@workspace/ui/utils";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

const badgeVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-full font-medium tracking-[-0.3px]",
  {
    variants: {
      color: {
        gray: "soft-gray-pale text-03-high",
        navy: "primary-02 text-00",
        blue: "soft-blue text-04-brand",
        red: "soft-red text-error",
        success: "soft-green text-success",
        warning: "soft-yellow text-warning",
        purple: "soft-purple text-07-tertiary",
        primary: "primary-01 text-00",
      },
      size: {
        S: "h-[20px] px-[8px] text-[11px]",
        L: "h-[26px] px-[12px] text-[13px]",
      },
    },
    defaultVariants: {
      color: "gray",
      size: "S",
    },
  },
);

export interface BadgeProps
  extends
    React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, color, size, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(badgeVariants({ color, size }), className)}
        {...props}
      />
    );
  },
);
Badge.displayName = "Badge";

export { Badge, badgeVariants };
```

## Source File: components/banner.tsx

```tsx
"use client";

import { cn } from "@workspace/ui/utils";
import { AlertTriangle, CheckCircle2, Info, X, XCircle } from "lucide-react";
import * as React from "react";

const BANNER_STYLES = {
  info: {
    wrap: "bg-03 border-line-03",
    title: "text-04-brand",
    icon: "text-04-brand",
  },
  success: {
    wrap: "bg-success border-state-success",
    title: "text-success",
    icon: "text-success",
  },
  warning: {
    wrap: "soft-yellow border-state-warning",
    title: "text-warning",
    icon: "text-warning",
  },
  error: {
    wrap: "bg-error border-state-error",
    title: "text-error",
    icon: "text-error",
  },
} as const;

const BANNER_ICONS = {
  info: Info,
  success: CheckCircle2,
  warning: AlertTriangle,
  error: XCircle,
} as const;

export interface BannerProps extends React.HTMLAttributes<HTMLDivElement> {
  type?: "info" | "success" | "warning" | "error";
  title?: React.ReactNode;
  description?: React.ReactNode;
  /** Show dismiss button */
  dismissible?: boolean;
  onDismiss?: () => void;
}

const Banner = React.forwardRef<HTMLDivElement, BannerProps>(
  (
    {
      type = "info",
      title,
      description,
      dismissible = false,
      onDismiss,
      className,
      ...props
    },
    ref,
  ) => {
    const [visible, setVisible] = React.useState(true);
    if (!visible) return null;

    const styles = BANNER_STYLES[type];
    const Icon = BANNER_ICONS[type];

    return (
      <div
        ref={ref}
        role="alert"
        className={cn(
          "box-border flex items-start gap-[12px] rounded-[10px] border p-[14px_16px]",
          styles.wrap,
          className,
        )}
        {...props}
      >
        <Icon
          className={cn("mt-[1px] h-[18px] w-[18px] shrink-0", styles.icon)}
        />
        <div className="min-w-0 flex-1">
          {title && (
            <p
              className={cn(
                "m-0 mb-[2px] text-[14px] font-semibold tracking-[-0.3px]",
                styles.title,
              )}
            >
              {title}
            </p>
          )}
          {description && (
            <p className="m-0 text-[13px] leading-[1.5] tracking-[-0.2px] text-03-high opacity-80">
              {description}
            </p>
          )}
        </div>
        {dismissible && (
          <button
            type="button"
            aria-label="Dismiss"
            onClick={() => {
              setVisible(false);
              onDismiss?.();
            }}
            className="shrink-0 border-none bg-none p-0 leading-none text-current opacity-50 transition-opacity duration-100 hover:opacity-100"
          >
            <X className="h-[14px] w-[14px]" />
          </button>
        )}
      </div>
    );
  },
);
Banner.displayName = "Banner";

export { Banner };
```

## Source File: components/card-case-analysis.tsx

```tsx
import * as React from "react";

import { Card, type CardProps } from "./card";

export interface CardCaseAnalysisProps extends Omit<
  CardProps,
  "title" | "subtitle" | "headerAction"
> {
  caseId?: string;
  analyst?: string;
  status?: React.ReactNode;
  findings?: React.ReactNode;
}

const CardCaseAnalysis = React.forwardRef<
  HTMLDivElement,
  CardCaseAnalysisProps
>(({ caseId, analyst, status, findings, ...props }, ref) => {
  return (
    <Card
      ref={ref}
      title={caseId || "Case Analysis"}
      subtitle={analyst}
      headerAction={
        status && (
          <span className="text-[11px] font-semibold text-success">
            {status}
          </span>
        )
      }
      {...props}
    >
      {findings && (
        <p className="text-[13px] leading-[1.5] text-02-row">{findings}</p>
      )}
    </Card>
  );
});
CardCaseAnalysis.displayName = "CardCaseAnalysis";

export { CardCaseAnalysis };
```

## Source File: components/card-case-profile.tsx

```tsx
import { cn } from "@workspace/ui/utils";
import * as React from "react";

import { Card, type CardProps } from "./card";

export interface CardCaseProfileProps extends Omit<
  CardProps,
  "title" | "subtitle"
> {
  caseId?: string;
  type?: string;
  assignee?: string;
  priority?: string;
}

const CardCaseProfile = React.forwardRef<HTMLDivElement, CardCaseProfileProps>(
  ({ caseId, type, assignee, priority, ...props }, ref) => {
    return (
      <Card
        ref={ref}
        title={caseId || "Case Profile"}
        subtitle={type}
        {...props}
      >
        <div className="text-[13px] text-02-row">
          {assignee && <span>Assigned: {assignee}</span>}
          {priority && (
            <span
              className={cn(
                "ml-[12px] font-semibold",
                priority === "High" ? "text-error" : "text-03-high",
              )}
            >
              Priority: {priority}
            </span>
          )}
        </div>
      </Card>
    );
  },
);
CardCaseProfile.displayName = "CardCaseProfile";

export { CardCaseProfile };
```

## Source File: components/card-evidence.tsx

```tsx
import * as React from "react";

import { Card, type CardProps } from "./card";

export interface CardEvidenceProps extends Omit<CardProps, "title"> {
  title?: string;
  fileCount?: number;
  size?: string;
  hash?: string;
}

const CardEvidence = React.forwardRef<HTMLDivElement, CardEvidenceProps>(
  ({ title, fileCount, size, hash, ...props }, ref) => {
    return (
      <Card ref={ref} title={title || "Evidence"} {...props}>
        <div className="text-[12px] text-02-row">
          {fileCount != null && <div>{fileCount} files</div>}
          {size && <div>Size: {size}</div>}
          {hash && (
            <div className="mt-[4px] font-spoqa text-[11px]">{hash}</div>
          )}
        </div>
      </Card>
    );
  },
);
CardEvidence.displayName = "CardEvidence";

export { CardEvidence };
```

## Source File: components/card-media.tsx

```tsx
import * as React from "react";

import { Card, type CardProps } from "./card";

export interface CardMediaProps extends Omit<CardProps, "title" | "subtitle"> {
  title?: string;
  mediaType?: string;
  duration?: string;
  thumbnail?: string;
}

const CardMedia = React.forwardRef<HTMLDivElement, CardMediaProps>(
  ({ title, mediaType, duration, thumbnail, ...props }, ref) => {
    return (
      <Card ref={ref} title={title || "Media"} subtitle={mediaType} {...props}>
        {thumbnail ? (
          <img
            src={thumbnail}
            alt={title}
            className="h-[120px] w-full rounded-[6px] object-cover"
          />
        ) : (
          <div className="flex h-[80px] w-full items-center justify-center rounded-[6px] bg-01 text-[11px] text-02-row">
            {mediaType || "Media"}
          </div>
        )}
        {duration && (
          <div className="mt-[6px] text-[11px] text-02-row">{duration}</div>
        )}
      </Card>
    );
  },
);
CardMedia.displayName = "CardMedia";

export { CardMedia };
```

## Source File: components/card.tsx

```tsx
import { cn } from "@workspace/ui/utils";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

const cardVariants = cva("box-border overflow-hidden border bg-00 line-01", {
  variants: {
    radius: {
      sm: "rounded-[8px]",
      md: "rounded-[12px]",
      lg: "rounded-[16px]",
      xl: "rounded-[20px]",
    },
    shadow: {
      none: "",
      sm: "shadow-black-02",
      md: "shadow-black-03",
      lg: "shadow-black-04",
      blue: "shadow-blue-02",
    },
    clickable: {
      true: "cursor-pointer transition-shadow duration-150 hover:shadow-black-03 active:scale-[0.99]",
      false: "",
    },
  },
  defaultVariants: {
    radius: "md",
    shadow: "sm",
    clickable: false,
  },
});

export interface CardProps
  extends
    React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {
  /** Card header title */
  title?: React.ReactNode;
  /** Card header subtitle */
  subtitle?: React.ReactNode;
  /** Slot for action element in header (button, icon, etc.) */
  headerAction?: React.ReactNode;
  /** Footer content */
  footer?: React.ReactNode;
  /** Override body padding */
  padding?: string | number;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  (
    {
      className,
      radius,
      shadow,
      title,
      subtitle,
      headerAction,
      footer,
      padding,
      onClick,
      children,
      ...props
    },
    ref,
  ) => {
    const hasHeader = title || subtitle || headerAction;

    return (
      <div
        ref={ref}
        className={cn(
          cardVariants({ radius, shadow, clickable: !!onClick }),
          className,
        )}
        onClick={onClick}
        {...props}
      >
        {hasHeader && (
          <div className="flex items-start justify-between gap-[12px] px-[20px] pt-[16px]">
            <div>
              {title && (
                <div className="m-0 text-[15px] font-semibold tracking-[-0.5px] text-03-high">
                  {title}
                </div>
              )}
              {subtitle && (
                <div className="mt-[3px] text-[12px] tracking-[-0.2px] text-02-row">
                  {subtitle}
                </div>
              )}
            </div>
            {headerAction}
          </div>
        )}
        <div
          style={padding !== undefined ? { padding } : undefined}
          className={padding === undefined ? "px-[20px] py-[16px]" : undefined}
        >
          {children}
        </div>
        {footer && (
          <div className="flex items-center justify-end gap-[8px] border-t bg-01 line-00 px-[20px] py-[12px]">
            {footer}
          </div>
        )}
      </div>
    );
  },
);
Card.displayName = "Card";

export { Card, cardVariants };
```

## Source File: components/case-progress-list.tsx

```tsx
import { cn } from "@workspace/ui/utils";
import * as React from "react";

export interface CaseProgressItem {
  label: React.ReactNode;
  time?: React.ReactNode;
  done?: boolean;
}

export interface CaseProgressListProps extends React.HTMLAttributes<HTMLDivElement> {
  items: CaseProgressItem[];
}

const CaseProgressList = React.forwardRef<
  HTMLDivElement,
  CaseProgressListProps
>(({ items, className, ...props }, ref) => {
  return (
    <div ref={ref} className={className} {...props}>
      {items.map((item, i) => (
        <div
          key={i}
          className="flex items-start gap-[10px] border-b py-[8px] line-00"
        >
          <div
            className={cn(
              "mt-[6px] h-[6px] w-[6px] shrink-0 rounded-full",
              item.done ? "state-success" : "bg-gray-02",
            )}
          />
          <div className="flex-1">
            <div className="text-[13px] font-medium text-03-high">
              {item.label}
            </div>
            {item.time && (
              <div className="mt-[2px] text-[11px] text-02-row">
                {item.time}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
});
CaseProgressList.displayName = "CaseProgressList";

export { CaseProgressList };
```

## Source File: components/chip.tsx

```tsx
import { cn } from "@workspace/ui/utils";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

const chipVariants = cva(
  "inline-flex items-center gap-[5px] whitespace-nowrap rounded-full border-[1.5px] border-transparent font-medium tracking-[-0.3px] transition-colors duration-100",
  {
    variants: {
      color: {
        gray: "soft-gray-pale text-03-high",
        blue: "soft-blue text-04-brand",
        red: "soft-red text-error",
        green: "soft-green text-success",
        yellow: "soft-yellow text-warning",
        purple: "soft-purple text-07-tertiary",
        navy: "primary-02 text-00",
        outlined: "bg-transparent line-01 text-03-high",
      },
      size: {
        M: "h-[28px] px-[10px] text-[13px]",
        S: "h-[22px] px-[8px] text-[11px]",
      },
      active: {
        true: "",
        false: "",
      },
      disabled: {
        true: "pointer-events-none cursor-not-allowed opacity-40",
        false: "",
      },
      clickable: {
        true: "cursor-pointer hover:brightness-95",
        false: "cursor-default",
      },
    },
    compoundVariants: [
      {
        color: "gray",
        active: true,
        className: "border-primary-01 text-04-brand",
      },
      {
        color: "outlined",
        active: true,
        className: "border-primary-01 bg-03 text-04-brand",
      },
    ],
    defaultVariants: {
      color: "gray",
      size: "M",
      active: false,
      disabled: false,
      clickable: false,
    },
  },
);

export interface ChipProps
  extends
    Omit<React.HTMLAttributes<HTMLSpanElement>, "color">,
    VariantProps<typeof chipVariants> {
  /** Show close × button */
  removable?: boolean;
  /** Called when close button is clicked */
  onRemove?: () => void;
}

const Chip = React.forwardRef<HTMLSpanElement, ChipProps>(
  (
    {
      className,
      color,
      size,
      active,
      disabled,
      removable = false,
      onRemove,
      onClick,
      children,
      ...props
    },
    ref,
  ) => {
    return (
      <span
        ref={ref}
        className={cn(
          chipVariants({
            color,
            size,
            active,
            disabled: !!disabled,
            clickable: !!onClick,
          }),
          className,
        )}
        onClick={disabled ? undefined : onClick}
        {...props}
      >
        {children}
        {removable && (
          <button
            type="button"
            aria-label="Remove"
            onClick={(e) => {
              e.stopPropagation();
              if (!disabled) onRemove?.();
            }}
            className="flex h-[14px] w-[14px] items-center justify-center rounded-full border-none bg-none p-0 text-current opacity-60 transition-opacity duration-100 hover:opacity-100"
          >
            <svg
              width="10"
              height="10"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={3}
              strokeLinecap="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        )}
      </span>
    );
  },
);
Chip.displayName = "Chip";

export { Chip, chipVariants };
```

## Source File: components/context-menu.tsx

```tsx
"use client";

import { cn } from "@workspace/ui/utils";
import * as React from "react";

export interface ContextMenuItem {
  type?: "item" | "separator";
  label?: string;
  onClick?: () => void;
  icon?: React.ReactNode;
  shortcut?: string;
  disabled?: boolean;
  danger?: boolean;
}

export interface ContextMenuProps {
  /** The element that opens the menu on click */
  trigger: React.ReactNode;
  items: ContextMenuItem[];
  /** Panel alignment relative to trigger */
  align?: "left" | "right";
  style?: React.CSSProperties;
  className?: string;
}

const ContextMenu = React.forwardRef<HTMLDivElement, ContextMenuProps>(
  ({ trigger, items, align = "left", style, className }, forwardedRef) => {
    const containerRef = React.useRef<HTMLDivElement>(null);
    React.useImperativeHandle(
      forwardedRef,
      () => containerRef.current as HTMLDivElement,
    );
    const [open, setOpen] = React.useState(false);

    React.useEffect(() => {
      const handler = (e: MouseEvent) => {
        if (
          containerRef.current &&
          !containerRef.current.contains(e.target as Node)
        )
          setOpen(false);
      };
      document.addEventListener("mousedown", handler);
      return () => document.removeEventListener("mousedown", handler);
    }, []);

    return (
      <div
        ref={containerRef}
        className={cn("relative inline-block", className)}
        style={style}
      >
        <div onClick={() => setOpen((v) => !v)}>{trigger}</div>
        {open && (
          <div
            data-state={open ? "open" : "closed"}
            className={cn(
              "absolute top-[calc(100%+4px)] z-[300] min-w-[180px] rounded-[10px] border bg-00 line-01 px-[4px] py-[6px] shadow-black-04",
              "data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95",
              align === "right"
                ? "right-0 origin-top-right"
                : "left-0 origin-top-left",
            )}
          >
            {items.map((item, i) =>
              item.type === "separator" ? (
                <div key={i} className="mx-[8px] my-[4px] h-px line-00" />
              ) : (
                <button
                  key={i}
                  type="button"
                  disabled={item.disabled}
                  onClick={() => {
                    if (item.disabled) return;
                    setOpen(false);
                    item.onClick?.();
                  }}
                  className={cn(
                    "flex w-full items-center gap-[8px] rounded-[7px] px-[12px] py-[8px] text-left text-[13px] font-medium tracking-[-0.3px] text-03-high transition-colors duration-100 hover:bg-03",
                    "disabled:cursor-not-allowed disabled:opacity-40",
                    item.danger && "text-error hover:soft-red-light",
                  )}
                >
                  {item.icon && (
                    <span className="flex w-[16px] shrink-0">{item.icon}</span>
                  )}
                  <span className="flex-1">{item.label}</span>
                  {item.shortcut && (
                    <span className="ml-auto text-[11px] text-02-row">
                      {item.shortcut}
                    </span>
                  )}
                </button>
              ),
            )}
          </div>
        )}
      </div>
    );
  },
);
ContextMenu.displayName = "ContextMenu";

export { ContextMenu };
```

## Source File: components/device-frame.tsx

```tsx
import { cn } from "@workspace/ui/utils";
import * as React from "react";

export interface DeviceFrameProps extends React.HTMLAttributes<HTMLDivElement> {
  width?: number;
}

const DeviceFrame = React.forwardRef<HTMLDivElement, DeviceFrameProps>(
  ({ width = 320, style, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "overflow-hidden rounded-[40px] border-[6px] border-gray-06 bg-black shadow-black-08",
          className,
        )}
        style={{ width, ...style }}
        {...props}
      />
    );
  },
);
DeviceFrame.displayName = "DeviceFrame";

export { DeviceFrame };
```

## Source File: components/download-button.tsx

```tsx
"use client";

import { cn } from "@workspace/ui/utils";
import { Download } from "lucide-react";
import * as React from "react";

export interface DownloadButtonProps extends Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  "onClick"
> {
  onClick?: () => void | Promise<void>;
}

const DownloadButton = React.forwardRef<HTMLButtonElement, DownloadButtonProps>(
  (
    { children = "Download", onClick, disabled = false, className, ...props },
    ref,
  ) => {
    const [loading, setLoading] = React.useState(false);

    const handleClick = async () => {
      if (loading || disabled) return;
      setLoading(true);
      try {
        await onClick?.();
      } finally {
        setLoading(false);
      }
    };

    return (
      <button
        ref={ref}
        type="button"
        onClick={handleClick}
        disabled={disabled || loading}
        className={cn(
          "inline-flex items-center gap-[7px] rounded-[8px] border-[1.5px] bg-00 px-[14px] py-[6px] text-[13px] font-medium tracking-[-0.3px] text-03-high line-01 transition-colors duration-150",
          "enabled:hover:bg-03 enabled:hover:line-03 enabled:hover:text-04-brand",
          "disabled:cursor-not-allowed disabled:opacity-40",
          className,
        )}
        {...props}
      >
        <Download
          className={cn("h-[14px] w-[14px]", loading && "animate-spin")}
        />
        {children}
      </button>
    );
  },
);
DownloadButton.displayName = "DownloadButton";

export { DownloadButton };
```

## Source File: components/fab.tsx

```tsx
import { cn } from "@workspace/ui/utils";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

const fabVariants = cva(
  "inline-flex shrink-0 items-center justify-center rounded-full font-medium transition-all duration-150 disabled:cursor-not-allowed disabled:border-transparent disabled:bg-02 disabled:text-01 disabled:shadow-none",
  {
    variants: {
      size: {
        L: "h-[56px] w-[56px] text-[24px]",
        M: "h-[44px] w-[44px] text-[20px]",
        S: "h-[36px] w-[36px] text-[16px]",
      },
      color: {
        primary:
          "primary-01 text-00 shadow-blue-04 enabled:hover:bg-secondary-01 enabled:hover:shadow-blue-05 enabled:active:bg-blue-09 enabled:active:scale-95",
        secondary:
          "border-2 bg-00 line-03 text-04-brand shadow-blue-03 enabled:hover:bg-03 enabled:active:bg-04 enabled:active:scale-95",
      },
    },
    defaultVariants: {
      size: "M",
      color: "primary",
    },
  },
);

export interface FabProps
  extends
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof fabVariants> {}

const Fab = React.forwardRef<HTMLButtonElement, FabProps>(
  ({ className, size, color, ...props }, ref) => {
    return (
      <button
        ref={ref}
        type="button"
        className={cn(fabVariants({ size, color }), className)}
        {...props}
      />
    );
  },
);
Fab.displayName = "Fab";

export { Fab, fabVariants };
```

## Source File: components/frame.tsx

```tsx
import * as React from "react";

const RADIUS_MAP = {
  sm: "var(--border-radius-frame-8, 8px)",
  md: "var(--border-radius-frame-12, 12px)",
  lg: "var(--border-radius-frame-16, 16px)",
  xl: "var(--border-radius-frame-20, 20px)",
  full: "999px",
} as const;

export interface FrameProps extends React.HTMLAttributes<HTMLDivElement> {
  padding?: string | number;
  radius?: "sm" | "md" | "lg" | "xl" | "full" | (string & {});
  background?: string;
  border?: string;
}

const Frame = React.forwardRef<HTMLDivElement, FrameProps>(
  (
    {
      padding = "16px",
      radius = "md",
      background,
      border,
      style,
      className,
      ...props
    },
    ref,
  ) => {
    return (
      <div
        ref={ref}
        className={className}
        style={{
          padding,
          borderRadius: RADIUS_MAP[radius as keyof typeof RADIUS_MAP] ?? radius,
          background: background ?? "transparent",
          border: border ?? "none",
          boxSizing: "border-box",
          ...style,
        }}
        {...props}
      />
    );
  },
);
Frame.displayName = "Frame";

export { Frame };
```

## Source File: components/icon-button.tsx

```tsx
import { cn } from "@workspace/ui/utils";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

const iconButtonVariants = cva(
  "inline-flex shrink-0 items-center justify-center rounded-full border-none bg-transparent text-gray-03-icon-row transition-colors duration-150 disabled:cursor-not-allowed disabled:opacity-40",
  {
    variants: {
      size: {
        L: "h-[36px] w-[36px]",
        M: "h-[30px] w-[30px]",
        S: "h-[24px] w-[24px]",
      },
      color: {
        default: "enabled:hover:bg-01 enabled:hover:text-03-high",
        primary: "enabled:hover:bg-03 enabled:hover:text-primary-01",
      },
    },
    defaultVariants: {
      size: "M",
      color: "default",
    },
  },
);

export interface IconButtonProps
  extends
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof iconButtonVariants> {}

const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ className, size, color, ...props }, ref) => {
    return (
      <button
        ref={ref}
        type="button"
        className={cn(iconButtonVariants({ size, color }), className)}
        {...props}
      />
    );
  },
);
IconButton.displayName = "IconButton";

export { IconButton, iconButtonVariants };
```

## Source File: components/icons.tsx

```tsx
import * as React from "react";

export interface IconProps extends React.SVGAttributes<SVGSVGElement> {
  size?: number;
  color?: string;
}

/** UROCK IconDevice — computer/device icon. */
const IconDevice = React.forwardRef<SVGSVGElement, IconProps>(
  ({ size = 16, color, style, ...props }, ref) => (
    <svg
      ref={ref}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color ?? "currentColor"}
      strokeWidth={2}
      strokeLinecap="round"
      style={{ display: "inline-block", flexShrink: 0, ...style }}
      {...props}
    >
      <rect x="2" y="3" width="20" height="14" rx="2" />
      <line x1="8" y1="21" x2="16" y2="21" />
      <line x1="12" y1="17" x2="12" y2="21" />
    </svg>
  ),
);
IconDevice.displayName = "IconDevice";

/** UROCK IconMapping — map/location pin icon. */
const IconMapping = React.forwardRef<SVGSVGElement, IconProps>(
  ({ size = 16, color, style, ...props }, ref) => (
    <svg
      ref={ref}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color ?? "currentColor"}
      strokeWidth={2}
      strokeLinecap="round"
      style={{ display: "inline-block", flexShrink: 0, ...style }}
      {...props}
    >
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  ),
);
IconMapping.displayName = "IconMapping";

/** UROCK IconSorting — sort arrows icon. */
const IconSorting = React.forwardRef<SVGSVGElement, IconProps>(
  ({ size = 16, color, style, ...props }, ref) => (
    <svg
      ref={ref}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color ?? "currentColor"}
      strokeWidth={2}
      strokeLinecap="round"
      style={{ display: "inline-block", flexShrink: 0, ...style }}
      {...props}
    >
      <path d="M11 5H4" />
      <path d="M7 9H4" />
      <path d="M3 13h4" />
      <path d="M17 5v14" />
      <path d="M21 9l-4-4-4 4" />
      <path d="M21 15l-4 4-4-4" />
    </svg>
  ),
);
IconSorting.displayName = "IconSorting";

/** UROCK IconWastebasket — delete/trash icon. */
const IconWastebasket = React.forwardRef<SVGSVGElement, IconProps>(
  ({ size = 16, color, style, ...props }, ref) => (
    <svg
      ref={ref}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color ?? "currentColor"}
      strokeWidth={2}
      strokeLinecap="round"
      style={{ display: "inline-block", flexShrink: 0, ...style }}
      {...props}
    >
      <polyline points="3 6 5 6 21 6" />
      <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
      <path d="M10 11v6" />
      <path d="M14 11v6" />
      <path d="M9 6V4h6v2" />
    </svg>
  ),
);
IconWastebasket.displayName = "IconWastebasket";

/** UROCK IconBackup — cloud backup/upload icon. */
const IconBackup = React.forwardRef<SVGSVGElement, IconProps>(
  ({ size = 16, color, style, ...props }, ref) => (
    <svg
      ref={ref}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color ?? "currentColor"}
      strokeWidth={2}
      strokeLinecap="round"
      style={{ display: "inline-block", flexShrink: 0, ...style }}
      {...props}
    >
      <polyline points="16 16 12 12 8 16" />
      <line x1="12" y1="12" x2="12" y2="21" />
      <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3" />
    </svg>
  ),
);
IconBackup.displayName = "IconBackup";

/** UROCK IconLoadingMotion — animated loading spinner icon. */
const IconLoadingMotion = React.forwardRef<SVGSVGElement, IconProps>(
  ({ size = 16, color, style, className, ...props }, ref) => (
    <svg
      ref={ref}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color ?? "rgb(var(--color-primary-01))"}
      strokeWidth={2.5}
      strokeLinecap="round"
      className={className ? `${className} animate-spin` : "animate-spin"}
      style={{ display: "inline-block", flexShrink: 0, ...style }}
      {...props}
    >
      <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
    </svg>
  ),
);
IconLoadingMotion.displayName = "IconLoadingMotion";

export {
  IconDevice,
  IconMapping,
  IconSorting,
  IconWastebasket,
  IconBackup,
  IconLoadingMotion,
};
```

## Source File: components/img-modal.tsx

```tsx
import { cn } from "@workspace/ui/utils";
import * as React from "react";

export interface ImgModalProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  open: boolean;
  onClose?: () => void;
}

const ImgModal = React.forwardRef<HTMLImageElement, ImgModalProps>(
  ({ src, alt, open, onClose, className, style, ...props }, ref) => {
    if (!open) return null;

    return (
      <div
        onClick={onClose}
        className="fixed inset-0 z-[600] flex items-center justify-center bg-black/85 p-[24px]"
      >
        <img
          ref={ref}
          src={src}
          alt={alt || ""}
          onClick={(e) => e.stopPropagation()}
          className={cn(
            "max-h-[85vh] max-w-[90vw] rounded-[12px] object-contain",
            className,
          )}
          style={style}
          {...props}
        />
      </div>
    );
  },
);
ImgModal.displayName = "ImgModal";

export { ImgModal };
```

## Source File: components/language-selector.tsx

```tsx
"use client";

import { cn } from "@workspace/ui/utils";
import * as React from "react";

export interface LanguageOption {
  label: string;
  value: string;
}

const DEFAULT_OPTIONS: LanguageOption[] = [
  { label: "한국어", value: "ko" },
  { label: "English", value: "en" },
];

export interface LanguageSelectorProps extends Omit<
  React.HTMLAttributes<HTMLDivElement>,
  "onChange"
> {
  options?: LanguageOption[];
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
}

const LanguageSelector = React.forwardRef<
  HTMLDivElement,
  LanguageSelectorProps
>(
  (
    {
      options = DEFAULT_OPTIONS,
      value,
      defaultValue = "ko",
      onChange,
      className,
      ...props
    },
    ref,
  ) => {
    const controlled = value !== undefined;
    const [internal, setInternal] = React.useState(defaultValue);
    const active = controlled ? value : internal;

    return (
      <div
        ref={ref}
        className={cn(
          "inline-flex items-center gap-[2px] rounded-[8px] border bg-01 line-01 p-[3px]",
          className,
        )}
        {...props}
      >
        {options.map((opt) => {
          const isActive = active === opt.value;
          return (
            <button
              key={opt.value}
              type="button"
              onClick={() => {
                if (!controlled) setInternal(opt.value);
                onChange?.(opt.value);
              }}
              className={cn(
                "rounded-[6px] px-[10px] py-[4px] text-[12px] font-normal text-02-row transition-colors duration-100",
                isActive && "bg-00 font-semibold text-03-high shadow-black-01",
              )}
            >
              {opt.label}
            </button>
          );
        })}
      </div>
    );
  },
);
LanguageSelector.displayName = "LanguageSelector";

export { LanguageSelector };
```

## Source File: components/list.tsx

```tsx
import { cn } from "@workspace/ui/utils";
import * as React from "react";

export interface ListItemData {
  id?: string;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  lead?: React.ReactNode;
  trail?: React.ReactNode;
}

export interface ListProps extends Omit<
  React.HTMLAttributes<HTMLDivElement>,
  "onSelect"
> {
  items: ListItemData[];
  activeId?: string;
  onSelect?: (item: ListItemData) => void;
}

const List = React.forwardRef<HTMLDivElement, ListProps>(
  ({ items, activeId, onSelect, className, ...props }, ref) => {
    return (
      <div ref={ref} className={cn("flex flex-col", className)} {...props}>
        {items.map((item, i) => (
          <div
            key={item.id ?? i}
            onClick={() => onSelect?.(item)}
            className={cn(
              "flex items-center gap-[10px] border-b px-[14px] py-[10px] line-00 last:border-none",
              onSelect &&
                "cursor-pointer transition-colors duration-100 hover:bg-03",
              activeId === item.id && "bg-04",
            )}
          >
            {item.lead && (
              <div className="flex shrink-0 items-center">{item.lead}</div>
            )}
            <div className="min-w-0 flex-1">
              <div className="truncate text-[13px] font-medium tracking-[-0.3px] text-03-high">
                {item.title}
              </div>
              {item.subtitle && (
                <div className="mt-[1px] text-[11px] text-02-row">
                  {item.subtitle}
                </div>
              )}
            </div>
            {item.trail && <div className="shrink-0">{item.trail}</div>}
          </div>
        ))}
      </div>
    );
  },
);
List.displayName = "List";

export { List };
```

## Source File: components/main-list-chat-file.tsx

```tsx
import { cn } from "@workspace/ui/utils";
import * as React from "react";

export interface MainListChatFileProps extends Omit<
  React.HTMLAttributes<HTMLDivElement>,
  "onClick"
> {
  filename: React.ReactNode;
  filesize?: React.ReactNode;
  fileType?: React.ReactNode;
  onDownload?: () => void;
}

const MainListChatFile = React.forwardRef<
  HTMLDivElement,
  MainListChatFileProps
>(({ filename, filesize, fileType, onDownload, className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      onClick={onDownload}
      className={cn(
        "flex items-center gap-[10px] rounded-[10px] border bg-01 px-[14px] py-[10px] line-01",
        onDownload && "cursor-pointer",
        className,
      )}
      {...props}
    >
      <div className="flex h-[36px] w-[36px] shrink-0 items-center justify-center rounded-[8px] bg-04 text-[11px] font-bold text-04-brand">
        {fileType || "FILE"}
      </div>
      <div className="min-w-0 flex-1">
        <div className="truncate text-[13px] font-medium text-03-high">
          {filename}
        </div>
        {filesize && (
          <div className="mt-[2px] text-[11px] text-02-row">{filesize}</div>
        )}
      </div>
    </div>
  );
});
MainListChatFile.displayName = "MainListChatFile";

export { MainListChatFile };
```

## Source File: components/main-list-chat-talk.tsx

```tsx
import { cn } from "@workspace/ui/utils";
import * as React from "react";

export interface MainListChatTalkProps extends React.HTMLAttributes<HTMLDivElement> {
  sender?: React.ReactNode;
  message: React.ReactNode;
  time?: React.ReactNode;
  isSelf?: boolean;
}

const MainListChatTalk = React.forwardRef<
  HTMLDivElement,
  MainListChatTalkProps
>(({ sender, message, time, isSelf, className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "flex flex-col gap-[3px] py-[4px]",
        isSelf ? "items-end" : "items-start",
        className,
      )}
      {...props}
    >
      {!isSelf && sender && (
        <div className="pl-[10px] text-[11px] font-semibold text-02-row">
          {sender}
        </div>
      )}
      <div
        className={cn("flex items-end gap-[6px]", isSelf && "flex-row-reverse")}
      >
        <div
          className={cn(
            "max-w-[320px] px-[12px] py-[8px] text-[13px] leading-[1.5] tracking-[-0.2px]",
            isSelf
              ? "rounded-tl-[12px] rounded-tr-[12px] rounded-bl-[12px] rounded-br-[4px] primary-01 text-00"
              : "rounded-tl-[12px] rounded-tr-[12px] rounded-br-[12px] rounded-bl-[4px] bg-01 text-03-high",
          )}
        >
          {message}
        </div>
        {time && <div className="shrink-0 text-[10px] text-02-row">{time}</div>}
      </div>
    </div>
  );
});
MainListChatTalk.displayName = "MainListChatTalk";

export { MainListChatTalk };
```

## Source File: components/main-list-filter.tsx

```tsx
import { cn } from "@workspace/ui/utils";
import * as React from "react";

export interface MainListFilterProps extends React.HTMLAttributes<HTMLDivElement> {
  label: React.ReactNode;
  count?: number;
  active?: boolean;
}

const MainListFilter = React.forwardRef<HTMLDivElement, MainListFilterProps>(
  ({ label, count, active, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex cursor-pointer items-center gap-[8px] rounded-[8px] px-[14px] py-[7px]",
          active && "bg-04",
          className,
        )}
        {...props}
      >
        <div
          className={cn(
            "flex-1 text-[13px]",
            active ? "font-semibold text-04-brand" : "font-medium text-03-high",
          )}
        >
          {label}
        </div>
        {count != null && (
          <div className="min-w-[20px] rounded-[10px] bg-02 px-[6px] py-[1px] text-center text-[11px] text-02-row">
            {count}
          </div>
        )}
      </div>
    );
  },
);
MainListFilter.displayName = "MainListFilter";

export { MainListFilter };
```

## Source File: components/media-control.tsx

```tsx
"use client";

import { cn } from "@workspace/ui/utils";
import { Pause, Play } from "lucide-react";
import * as React from "react";

export interface MediaControlProps extends Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  "onToggle"
> {
  playing?: boolean;
  onToggle?: (playing: boolean) => void;
  size?: number;
}

const MediaControl = React.forwardRef<HTMLButtonElement, MediaControlProps>(
  (
    { playing = false, onToggle, size = 36, style, className, ...props },
    ref,
  ) => {
    const [internal, setInternal] = React.useState(playing);
    const active = onToggle ? playing : internal;

    const toggle = () => {
      if (onToggle) onToggle(!active);
      else setInternal((v) => !v);
    };

    return (
      <button
        ref={ref}
        type="button"
        onClick={toggle}
        className={cn(
          "inline-flex shrink-0 items-center justify-center rounded-full border-none primary-01 text-00 shadow-blue-03 transition-colors duration-150",
          className,
        )}
        style={{ width: size, height: size, ...style }}
        {...props}
      >
        {active ? (
          <Pause
            style={{ width: size * 0.4, height: size * 0.4 }}
            fill="currentColor"
          />
        ) : (
          <Play
            style={{ width: size * 0.4, height: size * 0.4 }}
            fill="currentColor"
          />
        )}
      </button>
    );
  },
);
MediaControl.displayName = "MediaControl";

export { MediaControl };
```

## Source File: components/modal-deduplication-m.tsx

```tsx
import { cn } from "@workspace/ui/utils";
import * as React from "react";

export interface ModalDeduplicationMProps extends React.HTMLAttributes<HTMLDivElement> {
  open: boolean;
  onClose?: () => void;
  onConfirm?: () => void;
  duplicateCount?: number;
}

const ModalDeduplicationM = React.forwardRef<
  HTMLDivElement,
  ModalDeduplicationMProps
>(
  (
    { open, onClose, onConfirm, duplicateCount = 0, className, ...props },
    ref,
  ) => {
    if (!open) return null;

    return (
      <div
        onClick={onClose}
        className="fixed inset-0 z-[500] flex items-center justify-center bg-black/70"
      >
        <div
          ref={ref}
          onClick={(e) => e.stopPropagation()}
          className={cn(
            "w-[380px] rounded-[16px] bg-00 p-[24px] shadow-black-05",
            className,
          )}
          {...props}
        >
          <h3 className="m-0 mb-[8px] text-[16px] font-semibold tracking-[-0.5px] text-03-high">
            Remove Duplicates
          </h3>
          <p className="m-0 mb-[20px] text-[13px] leading-[1.6] text-02-row">
            {duplicateCount} duplicate items found. Remove them to free storage.
          </p>
          <div className="flex justify-end gap-[8px]">
            <button
              type="button"
              onClick={onClose}
              className="rounded-[8px] border-none bg-none px-[14px] py-[6px] text-[13px] font-medium text-04-brand"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={onConfirm}
              className="rounded-[8px] border-none primary-01 px-[16px] py-[6px] text-[13px] font-medium text-00"
            >
              Remove
            </button>
          </div>
        </div>
      </div>
    );
  },
);
ModalDeduplicationM.displayName = "ModalDeduplicationM";

export { ModalDeduplicationM };
```

## Source File: components/nav-bar.tsx

```tsx
import { cn } from "@workspace/ui/utils";
import * as React from "react";

export interface NavBarItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
}

export interface NavBarProps extends Omit<
  React.HTMLAttributes<HTMLElement>,
  "onSelect"
> {
  logo?: React.ReactNode;
  items?: NavBarItem[];
  activeId?: string;
  onSelect?: (item: NavBarItem) => void;
  /** Right-side action slot (buttons, avatar, icons) */
  actions?: React.ReactNode;
}

const NavBar = React.forwardRef<HTMLElement, NavBarProps>(
  (
    { logo, items = [], activeId, onSelect, actions, className, ...props },
    ref,
  ) => {
    return (
      <header
        ref={ref}
        className={cn(
          "box-border flex h-[56px] w-full items-center border-b bg-00 line-01 px-[20px]",
          className,
        )}
        {...props}
      >
        {logo && (
          <>
            <div className="flex shrink-0 items-center gap-[10px]">{logo}</div>
            {items.length > 0 && (
              <div className="mx-[16px] h-[20px] w-px shrink-0 line-01" />
            )}
          </>
        )}
        {items.length > 0 && (
          <nav className="flex flex-1 items-center gap-[2px]">
            {items.map((item) => {
              const isActive = activeId === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => onSelect?.(item)}
                  className={cn(
                    "inline-flex items-center gap-[6px] rounded-[8px] px-[12px] py-[6px] text-[13px] font-medium tracking-[-0.3px] whitespace-nowrap text-02-row transition-colors duration-100",
                    isActive
                      ? "font-semibold text-04-brand"
                      : "hover:bg-01 hover:text-03-high",
                  )}
                >
                  {item.icon && (
                    <span className="flex w-[14px]">{item.icon}</span>
                  )}
                  {item.label}
                </button>
              );
            })}
          </nav>
        )}
        {actions && (
          <div className="ml-auto flex shrink-0 items-center gap-[6px]">
            {actions}
          </div>
        )}
      </header>
    );
  },
);
NavBar.displayName = "NavBar";

export { NavBar };
```

## Source File: components/radio.tsx

```tsx
"use client";

import { cn } from "@workspace/ui/utils";
import * as React from "react";

export interface RadioOption {
  label?: string;
  value: string;
  disabled?: boolean;
}

export interface RadioProps extends Omit<
  React.HTMLAttributes<HTMLDivElement>,
  "onChange"
> {
  options: RadioOption[];
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  /** Disable all options */
  disabled?: boolean;
  /** Layout direction of radio items */
  direction?: "column" | "row";
}

const Radio = React.forwardRef<HTMLDivElement, RadioProps>(
  (
    {
      options,
      value,
      defaultValue,
      onChange,
      disabled = false,
      direction = "column",
      className,
      ...props
    },
    ref,
  ) => {
    const controlled = value !== undefined;
    const [internal, setInternal] = React.useState<string | undefined>(
      defaultValue,
    );
    const selected = controlled ? value : internal;

    const select = (v: string, optionDisabled?: boolean) => {
      if (disabled || optionDisabled) return;
      if (!controlled) setInternal(v);
      onChange?.(v);
    };

    return (
      <div
        ref={ref}
        role="radiogroup"
        className={cn(
          "flex flex-col gap-[10px]",
          direction === "row" && "flex-row gap-[16px]",
          className,
        )}
        {...props}
      >
        {options.map((opt) => {
          const isChecked = selected === opt.value;
          const isDisabled = disabled || opt.disabled;
          return (
            <div
              key={opt.value}
              role="radio"
              aria-checked={isChecked}
              aria-disabled={isDisabled}
              tabIndex={isDisabled ? -1 : 0}
              onClick={() => select(opt.value, opt.disabled)}
              onKeyDown={(e) => {
                if (e.key === " " || e.key === "Enter")
                  select(opt.value, opt.disabled);
              }}
              className={cn(
                "inline-flex cursor-pointer items-center gap-[8px] select-none",
                isDisabled && "cursor-not-allowed opacity-50",
              )}
            >
              <span
                className={cn(
                  "relative flex h-[24px] w-[24px] shrink-0 items-center justify-center rounded-full border-2 bg-00 transition-shadow duration-150",
                  isChecked
                    ? "border-primary-01 bg-03 shadow-blue-03"
                    : "line-01",
                  !isDisabled && !isChecked && "hover:line-03",
                )}
              >
                {isChecked && (
                  <span className="h-[10px] w-[10px] rounded-full primary-01" />
                )}
              </span>
              {opt.label && (
                <span className="text-[14px] text-03-high tracking-[-0.3px]">
                  {opt.label}
                </span>
              )}
            </div>
          );
        })}
      </div>
    );
  },
);
Radio.displayName = "Radio";

export { Radio };
```

## Source File: components/scroll-area.tsx

```tsx
import { cn } from "@workspace/ui/utils";
import * as React from "react";

export interface ScrollAreaProps extends React.HTMLAttributes<HTMLDivElement> {}

const ScrollArea = React.forwardRef<HTMLDivElement, ScrollAreaProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "overflow-auto [scrollbar-color:rgba(0,0,0,0.15)_transparent] [scrollbar-width:thin]",
          "[&::-webkit-scrollbar]:h-[6px] [&::-webkit-scrollbar]:w-[6px]",
          "[&::-webkit-scrollbar-track]:bg-transparent",
          "[&::-webkit-scrollbar-thumb]:rounded-[3px] [&::-webkit-scrollbar-thumb]:bg-black/15 hover:[&::-webkit-scrollbar-thumb]:bg-black/25",
          className,
        )}
        {...props}
      />
    );
  },
);
ScrollArea.displayName = "ScrollArea";

export { ScrollArea };
```

## Source File: components/search-dropdown.tsx

```tsx
"use client";

import { cn } from "@workspace/ui/utils";
import { Search } from "lucide-react";
import * as React from "react";

export interface SearchDropdownOption {
  label: string;
  value: string;
}

export interface SearchDropdownProps extends Omit<
  React.HTMLAttributes<HTMLDivElement>,
  "onChange"
> {
  options: SearchDropdownOption[];
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  emptyText?: string;
}

const SearchDropdown = React.forwardRef<HTMLDivElement, SearchDropdownProps>(
  (
    {
      options,
      value,
      defaultValue,
      onChange,
      placeholder = "검색어를 입력해주세요",
      emptyText = "No results",
      className,
      ...props
    },
    forwardedRef,
  ) => {
    const containerRef = React.useRef<HTMLDivElement>(null);
    React.useImperativeHandle(
      forwardedRef,
      () => containerRef.current as HTMLDivElement,
    );

    const controlled = value !== undefined;
    const [query, setQuery] = React.useState(
      () => options.find((o) => o.value === defaultValue)?.label ?? "",
    );
    const [open, setOpen] = React.useState(false);
    const [internalSelected, setInternalSelected] = React.useState<
      string | undefined
    >(defaultValue);
    const selected = controlled ? value : internalSelected;

    React.useEffect(() => {
      const handler = (e: MouseEvent) => {
        if (
          containerRef.current &&
          !containerRef.current.contains(e.target as Node)
        )
          setOpen(false);
      };
      document.addEventListener("mousedown", handler);
      return () => document.removeEventListener("mousedown", handler);
    }, []);

    const filtered = options.filter((o) =>
      o.label.toLowerCase().includes(query.toLowerCase()),
    );

    const select = (opt: SearchDropdownOption) => {
      if (!controlled) setInternalSelected(opt.value);
      setQuery(opt.label);
      setOpen(false);
      onChange?.(opt.value);
    };

    return (
      <div ref={containerRef} className={cn("relative", className)} {...props}>
        <div className="flex h-[40px] items-center gap-[8px] rounded-[10px] border bg-00 line-01 px-[14px] transition-colors duration-150 focus-within:line-03 focus-within:shadow-blue-03">
          <Search className="h-[15px] w-[15px] shrink-0 text-gray-03-icon-row" />
          <input
            className="min-w-0 flex-1 border-none bg-transparent text-[14px] text-03-high tracking-[-0.3px] outline-none placeholder:text-01"
            placeholder={placeholder}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setOpen(true);
            }}
            onFocus={() => setOpen(true)}
          />
        </div>
        {open && (
          <div className="absolute top-[calc(100%+4px)] right-0 left-0 z-[250] max-h-[260px] overflow-y-auto rounded-[10px] border bg-00 line-01 px-[4px] py-[6px] shadow-black-04">
            {filtered.length === 0 ? (
              <div className="px-[14px] py-[16px] text-center text-[13px] text-02-row">
                {emptyText}
              </div>
            ) : (
              filtered.map((opt) => (
                <div
                  key={opt.value}
                  onClick={() => select(opt)}
                  className={cn(
                    "cursor-pointer rounded-[7px] px-[14px] py-[8px] text-[13px] font-medium tracking-[-0.3px] text-03-high transition-colors duration-100 hover:bg-03",
                    selected === opt.value && "bg-03 text-04-brand",
                  )}
                >
                  {opt.label}
                </div>
              ))
            )}
          </div>
        )}
      </div>
    );
  },
);
SearchDropdown.displayName = "SearchDropdown";

export { SearchDropdown };
```

## Source File: components/segmented-control.tsx

```tsx
"use client";

import { cn } from "@workspace/ui/utils";
import * as React from "react";

export interface SegmentedControlOption {
  label: React.ReactNode;
  value: string;
  disabled?: boolean;
  icon?: React.ReactNode;
}

export interface SegmentedControlProps extends Omit<
  React.HTMLAttributes<HTMLDivElement>,
  "onChange"
> {
  options: SegmentedControlOption[];
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  size?: "M" | "S";
}

const SegmentedControl = React.forwardRef<
  HTMLDivElement,
  SegmentedControlProps
>(
  (
    { options, value, defaultValue, onChange, size = "M", className, ...props },
    ref,
  ) => {
    const controlled = value !== undefined;
    const [internal, setInternal] = React.useState(
      defaultValue ?? options[0]?.value,
    );
    const active = controlled ? value : internal;

    const select = (v: string, disabled?: boolean) => {
      if (disabled) return;
      if (!controlled) setInternal(v);
      onChange?.(v);
    };

    return (
      <div
        ref={ref}
        role="group"
        className={cn(
          "inline-flex items-center gap-[2px] rounded-[10px] border bg-01 line-01 p-[3px]",
          className,
        )}
        {...props}
      >
        {options.map((opt) => {
          const isActive = active === opt.value;
          return (
            <button
              key={opt.value}
              type="button"
              disabled={opt.disabled}
              onClick={() => select(opt.value, opt.disabled)}
              className={cn(
                "inline-flex items-center justify-center gap-[5px] rounded-[8px] px-[12px] font-medium tracking-[-0.3px] whitespace-nowrap text-02-row transition-colors duration-150",
                size === "M" ? "h-[32px] text-[14px]" : "h-[26px] text-[12px]",
                isActive
                  ? "bg-00 text-03-high shadow-black-02"
                  : "hover:bg-black/[0.04] hover:text-03-high",
                opt.disabled && "cursor-not-allowed opacity-40",
              )}
            >
              {opt.icon}
              {opt.label}
            </button>
          );
        })}
      </div>
    );
  },
);
SegmentedControl.displayName = "SegmentedControl";

export { SegmentedControl };
```

## Source File: components/side-list-case.tsx

```tsx
import { cn } from "@workspace/ui/utils";
import * as React from "react";

const STATUS_COLOR = {
  Active: "state-success",
  Critical: "state-error",
  Pending: "state-warning",
  Closed: "bg-gray-02",
} as const;

export interface SideListCaseProps extends React.HTMLAttributes<HTMLDivElement> {
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  status?: keyof typeof STATUS_COLOR;
  active?: boolean;
}

const SideListCase = React.forwardRef<HTMLDivElement, SideListCaseProps>(
  ({ title, subtitle, status, active, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex cursor-pointer items-center gap-[8px] rounded-[8px] px-[12px] py-[8px]",
          active && "bg-04",
          className,
        )}
        {...props}
      >
        {status && (
          <div
            className={cn(
              "h-[6px] w-[6px] shrink-0 rounded-full",
              STATUS_COLOR[status],
            )}
          />
        )}
        <div className="min-w-0 flex-1">
          <div
            className={cn(
              "truncate text-[12px]",
              active
                ? "font-semibold text-04-brand"
                : "font-medium text-03-high",
            )}
          >
            {title}
          </div>
          {subtitle && (
            <div className="mt-[1px] text-[11px] text-02-row">{subtitle}</div>
          )}
        </div>
      </div>
    );
  },
);
SideListCase.displayName = "SideListCase";

export { SideListCase };
```

## Source File: components/side-list-chat.tsx

```tsx
import { cn } from "@workspace/ui/utils";
import * as React from "react";

export interface SideListChatProps extends React.HTMLAttributes<HTMLDivElement> {
  title: React.ReactNode;
  preview?: React.ReactNode;
  time?: React.ReactNode;
  unread?: boolean;
  active?: boolean;
}

const SideListChat = React.forwardRef<HTMLDivElement, SideListChatProps>(
  ({ title, preview, time, unread, active, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex cursor-pointer items-start gap-[8px] rounded-[8px] px-[12px] py-[8px]",
          active && "bg-04",
          className,
        )}
        {...props}
      >
        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-[8px]">
            <span
              className={cn(
                "flex-1 overflow-hidden text-ellipsis whitespace-nowrap text-[13px] text-03-high",
                unread ? "font-semibold" : "font-medium",
              )}
            >
              {title}
            </span>
            {time && (
              <span className="shrink-0 text-[10px] text-02-row">{time}</span>
            )}
          </div>
          {preview && (
            <div className="mt-[2px] overflow-hidden text-ellipsis whitespace-nowrap text-[11px] text-02-row">
              {preview}
            </div>
          )}
        </div>
        {unread && (
          <div className="mt-[5px] h-[6px] w-[6px] shrink-0 rounded-full primary-01" />
        )}
      </div>
    );
  },
);
SideListChat.displayName = "SideListChat";

export { SideListChat };
```

## Source File: components/side-list-speaker.tsx

```tsx
import { cn } from "@workspace/ui/utils";
import * as React from "react";

const STATUS_COLOR = {
  online: "state-success",
  offline: "bg-gray-02",
  busy: "state-error",
} as const;

export interface SideListSpeakerProps extends React.HTMLAttributes<HTMLDivElement> {
  name?: string;
  role?: React.ReactNode;
  status?: keyof typeof STATUS_COLOR;
  active?: boolean;
}

function initials(name?: string) {
  return (name || "?")
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

const SideListSpeaker = React.forwardRef<HTMLDivElement, SideListSpeakerProps>(
  ({ name, role, status, active, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex cursor-pointer items-center gap-[8px] rounded-[8px] px-[12px] py-[7px]",
          active && "bg-04",
          className,
        )}
        {...props}
      >
        <div className="relative shrink-0">
          <div className="flex h-[28px] w-[28px] items-center justify-center rounded-full bg-03 text-[11px] font-semibold text-04-brand">
            {initials(name)}
          </div>
          {status && (
            <div
              className={cn(
                "absolute right-0 bottom-0 h-[7px] w-[7px] rounded-full border-[1.5px] border-00",
                STATUS_COLOR[status],
              )}
            />
          )}
        </div>
        <div className="min-w-0 flex-1">
          <div className="text-[12px] font-medium text-03-high">{name}</div>
          {role && (
            <div className="mt-[1px] text-[10px] text-02-row">{role}</div>
          )}
        </div>
      </div>
    );
  },
);
SideListSpeaker.displayName = "SideListSpeaker";

export { SideListSpeaker };
```

## Source File: components/side-nav.tsx

```tsx
import { cn } from "@workspace/ui/utils";
import * as React from "react";

export interface SideNavItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  badge?: React.ReactNode;
}

export interface SideNavSection {
  label?: string;
  items: SideNavItem[];
}

export interface SideNavProps extends Omit<
  React.HTMLAttributes<HTMLElement>,
  "onSelect"
> {
  logo?: React.ReactNode;
  sections: SideNavSection[];
  activeId?: string;
  onSelect?: (item: SideNavItem) => void;
  footer?: React.ReactNode;
  width?: number;
}

const SideNav = React.forwardRef<HTMLElement, SideNavProps>(
  (
    {
      logo,
      sections,
      activeId,
      onSelect,
      footer,
      width = 220,
      style,
      className,
      ...props
    },
    ref,
  ) => {
    return (
      <nav
        ref={ref}
        style={{ width, ...style }}
        className={cn(
          "box-border flex flex-col overflow-hidden border-r bg-00 line-01",
          className,
        )}
        {...props}
      >
        {logo && (
          <div className="flex items-center justify-between px-[16px] pt-[16px] pb-[8px]">
            <div className="flex items-center gap-[8px]">{logo}</div>
          </div>
        )}
        {sections.map((section, si) => (
          <div key={si} className="mb-[4px]">
            {section.label && (
              <div className="px-[20px] pt-[6px] pb-[4px] text-[10px] font-semibold tracking-[0.6px] text-02-row uppercase">
                {section.label}
              </div>
            )}
            {section.items.map((item) => {
              const isActive = activeId === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => onSelect?.(item)}
                  className={cn(
                    "mx-[8px] my-[1px] flex w-[calc(100%-16px)] items-center gap-[10px] rounded-[8px] px-[16px] py-[8px] text-left text-[13px] font-medium tracking-[-0.3px] text-02-row transition-colors duration-100",
                    isActive
                      ? "bg-04 font-semibold text-04-brand"
                      : "hover:bg-01 hover:text-03-high",
                  )}
                >
                  {item.icon && (
                    <span className="flex h-[16px] w-[16px] shrink-0 items-center justify-center">
                      {item.icon}
                    </span>
                  )}
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className="ml-auto shrink-0">{item.badge}</span>
                  )}
                </button>
              );
            })}
          </div>
        ))}
        {footer && (
          <div className="mt-auto border-t px-[8px] py-[12px] line-00">
            {footer}
          </div>
        )}
      </nav>
    );
  },
);
SideNav.displayName = "SideNav";

export { SideNav };
```

## Source File: components/status-dot.tsx

```tsx
import { cn } from "@workspace/ui/utils";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

const dotVariants = cva(
  "inline-block shrink-0 rounded-full transition-colors duration-200",
  {
    variants: {
      status: {
        success: "state-success",
        error: "state-error",
        warning: "state-warning",
        primary: "primary-01",
        gray: "bg-gray-02",
      },
      size: {
        S: "h-[6px] w-[6px]",
        M: "h-[8px] w-[8px]",
        L: "h-[10px] w-[10px]",
      },
    },
    defaultVariants: {
      status: "gray",
      size: "M",
    },
  },
);

export interface StatusDotProps
  extends
    React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof dotVariants> {
  /** Optional inline label */
  label?: string;
}

const StatusDot = React.forwardRef<HTMLSpanElement, StatusDotProps>(
  ({ className, status, size, label, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn("inline-flex items-center gap-[6px]", className)}
        {...props}
      >
        <span className={dotVariants({ status, size })} />
        {label && (
          <span className="text-[13px] font-normal tracking-[-0.3px] text-03-high">
            {label}
          </span>
        )}
      </span>
    );
  },
);
StatusDot.displayName = "StatusDot";

export { StatusDot, dotVariants };
```

## Source File: components/stepper.tsx

```tsx
import { cn } from "@workspace/ui/utils";
import { Check } from "lucide-react";
import * as React from "react";

export interface StepperStep {
  label?: React.ReactNode;
  description?: React.ReactNode;
}

export interface StepperProps extends React.HTMLAttributes<HTMLDivElement> {
  steps: StepperStep[];
  /** Index of the current active step (0-based) */
  currentStep?: number;
  direction?: "horizontal" | "vertical";
}

const Stepper = React.forwardRef<HTMLDivElement, StepperProps>(
  (
    { steps, currentStep = 0, direction = "horizontal", className, ...props },
    ref,
  ) => {
    const isH = direction === "horizontal";

    return (
      <div
        ref={ref}
        className={cn(
          "flex items-start",
          isH ? "flex-row items-center" : "flex-col",
          className,
        )}
        {...props}
      >
        {steps.map((step, i) => {
          const done = i < currentStep;
          const active = i === currentStep;
          return (
            <React.Fragment key={i}>
              <div
                className={cn(
                  "relative flex flex-col items-center",
                  isH && "flex-row items-start",
                )}
              >
                <div
                  className={cn(
                    "z-[1] flex h-[28px] w-[28px] shrink-0 items-center justify-center rounded-full border-2 text-[12px] font-semibold transition-colors duration-200",
                    done
                      ? "border-state-success bg-success text-success"
                      : active
                        ? "border-primary-01 primary-01 text-00 shadow-blue-03"
                        : "bg-00 line-01 text-02-row",
                  )}
                >
                  {done ? (
                    <Check className="h-[12px] w-[12px]" strokeWidth={3.5} />
                  ) : (
                    i + 1
                  )}
                </div>
                <div
                  className={cn(
                    "flex flex-col gap-[1px]",
                    isH
                      ? "ml-[10px] pt-[4px]"
                      : "mt-[4px] items-center text-center",
                  )}
                >
                  {step.label && (
                    <span
                      className={cn(
                        "text-[12px] font-semibold tracking-[-0.2px] text-03-high",
                        done && "text-success",
                        active && "text-04-brand",
                      )}
                    >
                      {step.label}
                    </span>
                  )}
                  {step.description && (
                    <span className="text-[11px] text-02-row">
                      {step.description}
                    </span>
                  )}
                </div>
              </div>
              {i < steps.length - 1 && (
                <div
                  className={cn(
                    "transition-colors duration-200",
                    done ? "state-success" : "line-01",
                    isH
                      ? "mt-[13px] mx-[6px] h-[2px] min-w-[20px] flex-1"
                      : "my-[4px] ml-[13px] min-h-[20px] w-[2px]",
                  )}
                />
              )}
            </React.Fragment>
          );
        })}
      </div>
    );
  },
);
Stepper.displayName = "Stepper";

export { Stepper };
```

## Source File: components/symbol.tsx

```tsx
import * as React from "react";

export interface SymbolProps extends React.HTMLAttributes<HTMLSpanElement> {
  size?: number;
  color?: string;
}

const Symbol = React.forwardRef<HTMLSpanElement, SymbolProps>(
  ({ size = 20, color, style, className, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={className}
        style={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          width: size,
          height: size,
          color: color ?? "currentColor",
          flexShrink: 0,
          ...style,
        }}
        {...props}
      />
    );
  },
);
Symbol.displayName = "Symbol";

export { Symbol };
```

## Source File: components/table.tsx

```tsx
import { cn } from "@workspace/ui/utils";
import { ArrowDown, ArrowUp, ArrowUpDown } from "lucide-react";
import * as React from "react";

export interface TableColumn<T = Record<string, unknown>> {
  key: string;
  label: React.ReactNode;
  sortable?: boolean;
  width?: string | number;
  align?: "left" | "center" | "right";
  render?: (value: unknown, row: T) => React.ReactNode;
}

export interface TableProps<
  T extends Record<string, unknown> = Record<string, unknown>,
> extends Omit<React.HTMLAttributes<HTMLDivElement>, "onSelect"> {
  columns: TableColumn<T>[];
  data: T[];
  striped?: boolean;
  selectedRows?: (string | number)[];
  onRowClick?: (row: T) => void;
  onSort?: (key: string) => void;
  sortKey?: string;
  sortDir?: "asc" | "desc";
  emptyText?: string;
}

function SortIcon({ dir }: { dir?: "asc" | "desc" | null }) {
  if (dir === "asc") return <ArrowUp className="h-[12px] w-[12px]" />;
  if (dir === "desc") return <ArrowDown className="h-[12px] w-[12px]" />;
  return <ArrowUpDown className="h-[12px] w-[12px]" />;
}

const Table = React.forwardRef<HTMLDivElement, TableProps>(
  (
    {
      columns,
      data,
      striped = false,
      selectedRows = [],
      onRowClick,
      onSort,
      sortKey,
      sortDir,
      emptyText = "No data",
      className,
      ...props
    },
    ref,
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          "w-full overflow-x-auto rounded-[10px] border line-01",
          className,
        )}
        {...props}
      >
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-01">
              {columns.map((col) => (
                <th
                  key={col.key}
                  style={{ width: col.width, textAlign: col.align ?? "left" }}
                  onClick={col.sortable ? () => onSort?.(col.key) : undefined}
                  className={cn(
                    "border-b px-[16px] py-[10px] text-[12px] font-semibold tracking-[-0.2px] whitespace-nowrap text-02-row select-none line-01",
                    col.sortable && "cursor-pointer hover:text-03-high",
                  )}
                >
                  <span className="inline-flex items-center gap-[5px]">
                    {col.label}
                    {col.sortable && (
                      <SortIcon dir={sortKey === col.key ? sortDir : null} />
                    )}
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-[16px] py-[40px] text-center text-[13px] text-02-row"
                >
                  {emptyText}
                </td>
              </tr>
            ) : (
              data.map((row, ri) => {
                const rowId = (row.id as string | number | undefined) ?? ri;
                const selected = selectedRows.includes(rowId);
                return (
                  <tr
                    key={rowId}
                    onClick={onRowClick ? () => onRowClick(row) : undefined}
                    className={cn(
                      "border-b transition-colors duration-100 line-00 last:border-none hover:bg-03",
                      striped && ri % 2 === 1 && "bg-01",
                      selected && "bg-04",
                      onRowClick && "cursor-pointer",
                    )}
                  >
                    {columns.map((col) => (
                      <td
                        key={col.key}
                        style={{ textAlign: col.align ?? "left" }}
                        className="px-[16px] py-[12px] align-middle text-[13px] tracking-[-0.2px] text-03-high"
                      >
                        {col.render
                          ? col.render(row[col.key], row)
                          : (row[col.key] as React.ReactNode)}
                      </td>
                    ))}
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    );
  },
);
Table.displayName = "Table";

export { Table };
```

## Source File: components/terms.tsx

```tsx
import { cn } from "@workspace/ui/utils";
import * as React from "react";

export interface TermsProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: React.ReactNode;
  maxHeight?: number;
}

const Terms = React.forwardRef<HTMLDivElement, TermsProps>(
  ({ title, maxHeight = 200, className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("rounded-[10px] border line-01", className)}
        {...props}
      >
        {title && (
          <div className="border-b px-[16px] pt-[12px] pb-[8px] text-[13px] font-semibold text-03-high line-00">
            {title}
          </div>
        )}
        <div
          className="overflow-y-auto px-[16px] py-[12px] text-[12px] leading-[1.7] text-02-row"
          style={{ maxHeight }}
        >
          {children}
        </div>
      </div>
    );
  },
);
Terms.displayName = "Terms";

export { Terms };
```

## Source File: components/tit-group.tsx

```tsx
import { cn } from "@workspace/ui/utils";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

const titGroupVariants = cva("flex flex-col items-start", {
  variants: {
    align: {
      left: "items-start text-left",
      center: "items-center text-center",
    },
  },
  defaultVariants: {
    align: "left",
  },
});

const TITLE_SIZES = {
  L: "text-[28px] tracking-[-1.3px]",
  S: "text-[20px] tracking-[-1px]",
  XS: "text-[16px] tracking-[-0.5px]",
} as const;

const SUBTITLE_SIZES = {
  L: "mt-[2px] text-[16px]",
  S: "mt-[2px] text-[14px]",
  XS: "mt-[1px] text-[13px]",
} as const;

export interface TitGroupProps
  extends
    Omit<React.HTMLAttributes<HTMLDivElement>, "title">,
    VariantProps<typeof titGroupVariants> {
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  /** Visual size — L (28px), S (20px), XS (16px) */
  size?: "L" | "S" | "XS";
}

const TitGroup = React.forwardRef<HTMLDivElement, TitGroupProps>(
  ({ title, subtitle, size = "L", align, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(titGroupVariants({ align }), className)}
        {...props}
      >
        {title && (
          <div
            className={cn(
              "font-semibold text-03-high leading-[1.2]",
              TITLE_SIZES[size],
            )}
          >
            {title}
          </div>
        )}
        {subtitle && (
          <div
            className={cn(
              "font-medium text-03-high leading-[1.48] opacity-75",
              SUBTITLE_SIZES[size],
            )}
          >
            {subtitle}
          </div>
        )}
      </div>
    );
  },
);
TitGroup.displayName = "TitGroup";

export { TitGroup, titGroupVariants };
```

## Source File: components/tree-view.tsx

```tsx
"use client";

import { cn } from "@workspace/ui/utils";
import { ChevronRight } from "lucide-react";
import * as React from "react";

export interface TreeNode {
  id: string;
  label: string;
  icon?: React.ReactNode;
  badge?: React.ReactNode;
  defaultOpen?: boolean;
  children?: TreeNode[];
}

export interface TreeViewProps {
  items: TreeNode[];
  /** Currently selected node ID */
  activeId?: string;
  onSelect?: (node: TreeNode) => void;
  style?: React.CSSProperties;
  className?: string;
}

function TreeItemNode({
  item,
  level = 0,
  activeId,
  onSelect,
}: {
  item: TreeNode;
  level?: number;
  activeId?: string;
  onSelect?: (node: TreeNode) => void;
}) {
  const hasChildren = !!item.children?.length;
  const [open, setOpen] = React.useState(
    item.defaultOpen ?? (level === 0 && hasChildren),
  );
  const isActive = activeId === item.id;

  return (
    <div className="flex flex-col">
      <div
        onClick={() => {
          if (hasChildren) setOpen((v) => !v);
          onSelect?.(item);
        }}
        style={{ paddingLeft: 8 + level * 4 }}
        className={cn(
          "flex min-h-[32px] cursor-pointer items-center gap-[6px] rounded-[7px] py-[6px] pr-[8px] transition-colors duration-100 select-none hover:bg-03",
          isActive && "bg-04",
        )}
      >
        <span
          className={cn(
            "flex h-[16px] w-[16px] shrink-0 items-center justify-center text-gray-03-icon-row transition-transform duration-150",
            hasChildren ? (open ? "rotate-90" : "") : "invisible",
          )}
        >
          {hasChildren && (
            <ChevronRight className="h-[12px] w-[12px]" strokeWidth={2.5} />
          )}
        </span>
        {item.icon && (
          <span className="flex shrink-0 items-center text-gray-03-icon-row">
            {item.icon}
          </span>
        )}
        <span
          className={cn(
            "min-w-0 flex-1 truncate text-[13px] font-medium tracking-[-0.3px] text-03-high",
            isActive && "font-semibold text-04-brand",
          )}
        >
          {item.label}
        </span>
        {item.badge && <span className="shrink-0">{item.badge}</span>}
      </div>
      {hasChildren && open && (
        <div className="flex flex-col gap-[1px] pl-[20px]">
          {item.children!.map((child) => (
            <TreeItemNode
              key={child.id}
              item={child}
              level={level + 1}
              activeId={activeId}
              onSelect={onSelect}
            />
          ))}
        </div>
      )}
    </div>
  );
}

const TreeView = React.forwardRef<HTMLDivElement, TreeViewProps>(
  ({ items, activeId, onSelect, style, className }, ref) => {
    return (
      <div
        ref={ref}
        style={style}
        className={cn("flex flex-col gap-[1px]", className)}
      >
        {items.map((item) => (
          <TreeItemNode
            key={item.id}
            item={item}
            activeId={activeId}
            onSelect={onSelect}
          />
        ))}
      </div>
    );
  },
);
TreeView.displayName = "TreeView";

export { TreeView };
```

## Source File: components/view-toggle.tsx

```tsx
"use client";

import { cn } from "@workspace/ui/utils";
import { LayoutGrid, List, Table as TableIcon } from "lucide-react";
import * as React from "react";

const VIEW_ICONS = {
  list: List,
  grid: LayoutGrid,
  table: TableIcon,
} as const;

export type ViewToggleOption = keyof typeof VIEW_ICONS;

export interface ViewToggleProps extends Omit<
  React.HTMLAttributes<HTMLDivElement>,
  "onChange"
> {
  options?: ViewToggleOption[];
  value?: ViewToggleOption;
  defaultValue?: ViewToggleOption;
  onChange?: (view: ViewToggleOption) => void;
}

const ViewToggle = React.forwardRef<HTMLDivElement, ViewToggleProps>(
  (
    {
      options = ["list", "grid"],
      value,
      defaultValue,
      onChange,
      className,
      ...props
    },
    ref,
  ) => {
    const controlled = value !== undefined;
    const [internal, setInternal] = React.useState<ViewToggleOption>(
      defaultValue ?? options[0]!,
    );
    const active = controlled ? value : internal;

    return (
      <div
        ref={ref}
        className={cn(
          "inline-flex items-center overflow-hidden rounded-[8px] border bg-01 line-01",
          className,
        )}
        {...props}
      >
        {options.map((opt) => {
          const Icon = VIEW_ICONS[opt];
          const isActive = active === opt;
          return (
            <button
              key={opt}
              type="button"
              aria-label={opt}
              onClick={() => {
                if (!controlled) setInternal(opt);
                onChange?.(opt);
              }}
              className={cn(
                "flex h-[32px] w-[32px] items-center justify-center border-none bg-transparent text-gray-03-icon-row transition-colors duration-100 hover:text-03-high",
                isActive && "bg-00 text-04-brand shadow-black-01",
              )}
            >
              <Icon className="h-[14px] w-[14px]" strokeWidth={2.5} />
            </button>
          );
        })}
      </div>
    );
  },
);
ViewToggle.displayName = "ViewToggle";

export { ViewToggle };
```
