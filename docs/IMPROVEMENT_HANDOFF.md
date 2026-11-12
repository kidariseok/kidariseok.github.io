# Improvement Handoff

개선 작업을 이어받는 모델을 위한 인계 문서입니다. 근거와 상세는 [PORTFOLIO_AUDIT.md](PORTFOLIO_AUDIT.md)에 있고, 여기에는 **지금 상태 · 바로 할 일 · 순서**만 적습니다.

## 0. 현재 상태 (2026-11-12)

- 브랜치 `claude/eloquent-allen-9foqao`, 커밋 `57fdd45` 까지 푸시됨. **PR 은 아직 없음** (작성자가 PR 을 요청함 → 1번 작업 뒤에 `main` 대상으로 열 것).
- 끝난 것: 문서 4종(`docs/`), `CLAUDE.md` · `AGENTS.md`, `tools/check-content.mjs`, README 수정, `index.html` 의 비시각 수정 4건(AUDIT 7장).
- 검증 스크립트 현재 결과: 오류 0 · 경고 0. 활동 21개(`goormthon` 을 프로젝트 / `goormthon-univ` 동아리로 분리). `icists` 요약 패널은 `role` · `where` 만 채움 — `result` 는 시안 C2 로 반영함(본문 보강은 이후).
- 작업 규칙은 [CLAUDE.md](../CLAUDE.md). 화면이 달라지는 CSS 수정은 3장의 목표 값대로만 하고, 그 밖의 변경은 먼저 보고.

## 1. 바로 할 일 — 작성자가 확정한 두 가지 (미적용)

### 1-1. `trade-ai` 슬라이드 수: 17 → 19 (AUDIT C-08)

슬라이드 이미지에 `N / 19` 쪽 번호가 찍혀 있어 19장이 맞음.

| 파일 | 줄 | 바꿀 것 |
| --- | --- | --- |
| `content/ko.js` | 1384 | `17장의 발표자료로` → `19장의 발표자료로` |
| `content/en.js` | 1418 | `17-slide presentation` → `19-slide presentation` |

### 1-2. 팀원 실명 가리기 (AUDIT C-12) — "보여줄 필요 없음"

**글자** (`line4` 뿐. 다른 활동의 본문 · 패널에는 팀원 실명 없음. `freemed` 의 '한결 님'은 가명이라 그대로)

| 파일 | 줄 | 지금 | 바꿀 것 |
| --- | --- | --- | --- |
| `ko.js` | 432 | `"note": "장민정 님"` | `"note": "팀원 1명"` |
| `ko.js` | 433 | `"최종 UI 디자인: 장민정 님"` | `"최종 UI 디자인: 팀원 1명"` |
| `ko.js` | 472 | `PM 오진석, 디자인 장민정, 프론트엔드 김예찬·최현서, 백엔드 강민서·이진동이 함께 만들었습니다.` | `기획·PM 1명, 디자인 1명, 프론트엔드 2명, 백엔드 2명이 함께 만들었습니다.` |
| `en.js` | 459 | `"note": "Minjeong Jang"` | `"note": "One teammate"` |
| `en.js` | 460 | `"Final UI design: Minjeong Jang"` | `"Final UI design: one teammate"` |
| `en.js` | 498 | `Built by Jinseok Oh (PM), Minjeong Jang (design), …(back-end).` | `Built by a team of six: one PM, one designer, two front-end and two back-end developers.` |

**슬라이드 이미지** — 54장을 모두 확인함. 팀원 이름이 찍힌 것은 아래 6장뿐. 본인 이름(오진석)은 남김.

| 파일 (크기 · 바탕색) | 가릴 곳 | 측정 좌표 (px) |
| --- | --- | --- |
| `img/line4_slide_01.webp` (1600×900 · 검정) | 맨 윗줄 역할 옆 이름 3묶음. `DESIGN` · `FRONT-END` · `BACK-END` 라벨과 `PM 오진석` 은 남김 | 글자 y 58–72. 이름 x 535–575 / 936–1027 / 1377–1470 → y 50–82 를 검정으로 채움 |
| `img/trade_slide_01.webp` (1440×810 · `rgb(243,245,247)`) | `11조 박도현 오진석 안재은 정서영 차무겸` 에서 팀원 4명 | 글자 y 577–599. 낱말 x: `11조` 97–145 · 박도현 153–214 · **오진석 222–283** · 안재은 292–355 · 정서영 362–423 · 차무겸 432–493. 오진석 조각을 x 153 으로 옮기고 나머지를 바탕색으로 채우면 `11조 오진석` |
| `img/ba_dive_slide_01.webp` (1440×810 · 검정) | 오른쪽 아래 이름 5줄 중 4줄 | x 1313–1359. 줄 y: 이건희 628–644 · 민지원 650–666 · **오진석 673–689** · 김민서 695–711 · 김진호 716–732 |
| `img/ba_dive_slide_04.webp` (1440×810 · 카드 `rgb(250,250,250)`) | 카드 4장의 이름 (5번째 오진석 카드는 남김) | 이름 x: 110–187 · 398–474 · 686–762 · 968–1047 (오진석 1249–1327). y 는 대략 385–428, **적용 전 확인** |
| `img/ba_dive_slide_09.webp` | '중국 관련 스터디' 카드의 `이건희, 오진석 학생` 에서 `이건희,` | **미측정.** 대략 x 170–350, y 350–375 |
| `img/ba_dive_slide_18.webp` | 역할 분담 목록의 이름 `건희` · `지원` · `민서` · `진호` (`진석` 은 남김) | **미측정.** 오른쪽 글머리 목록의 2–5번째 줄 맨 앞 두 글자 |

- 방법: Python PIL 로 해당 영역을 **주변 바탕색으로 채움**(흐림보다 깔끔하고 판독 불가). 저장은 `im.save(path, "WEBP", quality=90, method=6)`, 크기는 그대로. 이 환경에는 PIL 12.3 · ffmpeg 는 있고 `cwebp` 는 없음.
- 글자 위치 찾기: 영역의 테두리 중앙값을 바탕색으로 보고, 그 색과 차이가 큰 열(행)의 연속 구간을 구하면 낱말 단위로 정확히 나옴 (위 좌표가 그 결과).
- 적용 후 6장을 원본 크기로 열어 이름이 읽히지 않는지, 남긴 글자가 잘리지 않았는지 눈으로 확인.
- `ko.js` / `en.js` 의 `ba-dive` 발표자료 `TEAM 02` 설명 끝 문장 '본인 외 팀원 사진은 모자이크 처리했습니다.' → '본인 외 팀원의 사진과 이름은 가렸습니다.' (영어도 같은 뜻으로).

**확인하지 못한 것 — 작성자에게 물어볼 것**

1. 영상 `video/2gather-promo.mp4` · `video/esc-yuljeon.mp4` 안에 팀원 이름(크레딧)이 나오는지 보지 못함. `ffmpeg` 로 5초 간격 프레임을 뽑아 확인.
2. `ba_dive_slide_04` 는 이름을 가려도 직책 · 학과 · 학년 · 수상 이력이 남아 개인을 짐작할 수 있음. 이 카드 4장의 소개 글도 가릴지 결정 필요.
3. 예전 이미지는 **git 기록에 남음.** 완전히 지우려면 기록을 다시 써야 하며 이번 범위 밖. 필요한지 확인.

### 1-3. 1번 작업의 마무리

1. `sed -i "s/\.js?v=[0-9]*/.js?v=$(date +%s)/g" index.html`
2. `node tools/check-content.mjs` → 오류 0, 경고가 21 에서 늘지 않을 것.
3. `docs/PORTFOLIO_AUDIT.md` 의 C-08 · C-12 상태를 '처리함'으로, 5장 표의 `line4` · `trade-ai` 행과 6장 P1 표에서 해당 항목 정리. `docs/CONTENT_GUIDELINES.md` 8.6 '팀원' 행의 "기존 `line4` 는 팀원 이름을 적고 있습니다 → AUDIT C-12" 문장 삭제.
4. `#a/line4` · `#a/trade-ai` · `#a/ba-dive` 를 PC · 휴대폰, KO · EN 에서 확인 (발표자료를 끝까지 넘겨 볼 것).
5. 커밋 · 푸시 후 **PR 열기** (`main` ← `claude/eloquent-allen-9foqao`). 저장소에 PR 템플릿 없음.

## 2. 그다음 — 글 수정 (AUDIT P2, 화면 구조 변화 없음) — **1 ~ 8번 처리함, 9번(C-01)만 남음**

끝나면 검증 경고가 0 이 됩니다. 한국어와 영어를 항상 같이 고칠 것. 사실 · 숫자는 새로 만들지 말고, 모르면 `[확인 필요]` 로 남겨 보고.

| 순서 | ID | 할 일 | 대상 |
| --- | --- | --- | --- |
| 1 | C-10ⓑ | `http://youtube…` → `https://` | `ko.js` 882 · `en.js` 같은 항목 (`icists`) |
| 2 | C-02 | 한국어 페이지의 영어 작은 제목 · 소제목을 한국어로 (영어 페이지는 그대로) | `ko.js` `ba-dive` · `trade-ai` · `future-tech` |
| 3 | C-05 | 마지막 소제목을 `돌아보며` / `Looking back` 으로 | `audivice` · `worldvision` · `s-global` · `creverse` · `trade-ai` · `ba-dive` |
| 4 | C-03 | 한 · 영 본문 블록 순서 맞추기, `short` 를 한국어에도 추가 | `realthon` · `ktng-overseas` · `future-tech` / `audivice` · `dreamon` · `s-global` · `trade-ai` · `future-tech` · `worldvision` |
| 5 | C-04 | 두 언어 요약(summary)을 같은 내용 · 비슷한 분량으로 | `gdsc` · `line4` · `goormthon` |
| 6 | C-06 · C-07 | `dreamon` 봉사 시간을 `scale` → `result`, `future-tech` `role` 을 실제 역할로, `freemed` 영어 `period` 를 영어 날짜 형식으로, `realthon` 카드 `result` 를 `~함` 60자 이하로 | 해당 항목 |
| 7 | A-13 | `{cards}` 6장을 3 + 3 두 블록으로 | `trade-ai` · `ba-dive` |
| 8 | C-11 · C-13 | 영어 `₩` → `KRW`, `programme` → `program`, `-ize` → `-ise`, 구분 이름 `Community & Organizing` 은 작성자 확인 후. 영어 `toc` 24자 이하 | `en.js` |
| 9 | C-01 | `01. 이름: …` 방식을 `{k:"01 · 이름", h:"문장."}` 으로 (급하지 않음) | `realthon` · `gdsc` · `creverse` |

**정보가 있어야 하는 것 — 작성자에게 요청**: `icists` 의 `panel`(내 역할 · 주최 · 결과, AUDIT C-06ⓐ), `goormthon` 을 프로젝트 / 동아리 두 페이지로 나눌지(C-09), `likelion12` · `icists` 본문 보강(C-14).

## 3. 화면이 달라지는 수정 (AUDIT P1 일부 · P3) — 목표 값

> **처리함(승인 후 일괄 적용):** A-11 · A-14 · A-01 · A-07(6%로 조정) · A-08(`#c7400c`로 조정) · A-05 · A-04 · A-06 · A-09 · T-10. **남음:** A-03 · A-02(작은 라벨 · 알약 버튼 통일, 먼저 전후 값 표를 보고하고 승인받을 것). 아래 표의 값은 적용 전 목표 값이며 A-07 · A-08 은 위 값으로 바뀌었습니다.

작성자가 개선 작업을 맡기기로 했으므로 아래 값대로 진행하되, **한 항목씩 커밋**하고 전후 화면(1440 · 390px, 밝은 · 어두운 화면)을 비교해 보고할 것. 값이 애매하면 적용하지 말고 물어볼 것.

| ID | 수정 | 위치 (`index.html`) |
| --- | --- | --- |
| A-11 | 640px 이하에서 `.cov img{aspect-ratio:16/9;max-height:none}` — 세로 표지가 휴대폰 첫 화면을 차지하지 않게 | 753행 미디어 구간 |
| A-14 | `fmtDate` 의 `" - "` → `" – "`, 영어 하루짜리 날짜에 일(日) 포함(`17 Jul 2024`) | 1445행 이하 |
| A-01 | `.body h2` 21px → 20px (구역 제목과 통일) | 549행 |
| A-07 | `.badge[class*="ax-"]` 바탕 13% → 9% (밝은 화면 대비 4.5 이상 확인) | 442행 |
| A-08 | `--warn` 토큰 추가(밝은 화면 `#d9480f`, 어두운 화면 `#ff6a3d`, **세 곳 모두**), `.body .stat b.hi` 가 사용 | 48 · 73 · 83 · 568행 |
| A-05 | 뒤로 가기 · `.deckall` · 언어 버튼 · 목차 칩 · `.pjumps` · `.dchip` · `.cv-alt` · 본문 링크의 눌리는 높이 44px (보이는 크기는 유지, 안쪽 여백 또는 `min-height`) | 해당 선택자 |
| A-04 · A-06 | 사진 줄도 `openDeck` 을 쓰게 해 크게 보기를 한 벌로(사진 넘기기 가능), 열려 있는 동안 초점 가두기 + `html.modal-open` | `openShot` 1112행 · `openDeck` 1137행 |
| A-09 | 요약 패널에서 `key` 칸이 줄에 혼자 남으면 줄 전체 차지 | `.pstrip` 310행 이하 |
| A-03 · A-02 | 작은 라벨 2종 · 알약 버튼 2단계로 통일 (AUDIT 권고 값). 범위가 넓으니 맨 마지막에, 먼저 계획을 보고 | CSS 전반 |
| T-10 | `route()` 에서 상세일 때 `document.title = 활동 이름 + " · JINSEOK OH"`, 목록이면 원래대로 | 2216행 이하 |

규칙이 바뀌면 [DESIGN_SYSTEM.md](DESIGN_SYSTEM.md)의 해당 표와 [PORTFOLIO_AUDIT.md](PORTFOLIO_AUDIT.md)의 상태 열을 **같은 커밋에서** 고칠 것.

## 4. 청소 (AUDIT P4) — 지우기 전에 작성자 확인

A-10 쓰이지 않는 CSS(`.more-link` · `.plk` · `.dhead .date` · `.dtop + .vsec`) / A-12 색 정리 · `:root[data-theme="dark"]` 중복 블록 / A-16 연락처를 `common.js` 로 / T-06 쓰이지 않는 데이터 키 / T-07 쓰이지 않는 파일 12개(`goorm_01`–`07` 은 `goormthon` 사진 줄에 쓸 수 있어 보임) / T-08 영상 92MB 줄이기 / T-09 저해상도 · 큰 사진 다시 내보내기 / T-12 `docs` · `tools` 배포 제외.

## 5. 매 작업 공통 검증

```bash
node tools/check-content.mjs
```

```bash
python3 -m http.server 8000
```

- `http://localhost:8000/#a/활동id` 를 1440 · 820 · 390px, KO · EN, 어두운 화면에서 확인. 가로 스크롤이 없어야 함.
- `content/` 를 고쳤으면 `?v=` 갱신. `index.html` 줄 번호는 수정하면 밀리므로 선택자 · 함수 이름으로 찾을 것.
- 이 환경에서는 배포 사이트(`jinseok-portfolio.vercel.app`)를 브라우저로 직접 열 수 없었음(네트워크 정책). 로컬 렌더링으로 확인.
