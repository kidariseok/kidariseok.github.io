# JINSEOK OH · Portfolio

> **Connector** — Connecting people, technology, and ideas

성균관대학교 컴퓨터교육과 오진석의 활동 포트폴리오입니다.

대학교에 다니며 참여했던 대외활동, 프로젝트, 봉사, 교내활동과 자격증 등을 한곳에 정리했습니다.
단순히 활동 목록을 나열하기보다는, **무엇을 했고 어떤 역할을 맡았는지**를 기록해 두는 것을 목표로 만들었습니다.

**Portfolio:** https://jinseok-portfolio.vercel.app

---

## About

저는 기술을 사람과 아이디어에 연결하는 일을 좋아합니다.

컴퓨터교육을 전공하면서 기술을 공부하는 동시에, 다양한 사람들과 프로젝트를 기획하고 직접 실행해 보는 경험을 쌓아왔습니다.

해커톤을 기획하고 운영하기도 했고, 해외봉사와 영어 관련 활동에도 참여했습니다.
관심 있는 분야가 생기면 직접 경험해 보고, 그 과정에서 배운 것을 다음 활동에 다시 적용하고자 합니다.

이 사이트는 그런 경험들을 한 번에 볼 수 있도록 정리한 기록입니다.

---

## What's inside

현재 사이트에는 다음과 같은 활동들이 정리되어 있습니다.

* 대외활동 20건
* 자격증 7개
* 교내 장학 3건
* 봉사활동 212시간+
* 해커톤 및 프로젝트 기획·운영 경험
* 해외봉사 및 글로벌 활동

대표적인 활동으로는 다음과 같은 경험이 있습니다.

* **RE:ALThon** — 대학생 연합 해커톤 총괄
* **Google Developer Group on Campus : SKKU** — 기획 및 운영
* **4호선톤** — 실제 데이터를 활용한 서비스 기획·개발
* **KT&G SangSang WithUS** — 인도네시아 해외봉사
* **FreeMed** — 방문건강관리 봉사
* 그 외 다양한 교내외 활동 및 프로젝트

각 활동은 사진과 함께 당시 맡았던 역할, 진행한 일, 느낀 점 등을 확인할 수 있도록 구성했습니다.

---

## How to explore

메인 화면은 네 부분으로 되어 있습니다.

`SELECTED WORK · ABOUT · ACTIVITY ARCHIVE · RECORDS`

대표 프로젝트와 활동을 먼저 보여 주고, 전체 활동은 '활동 기록'에서 **그 활동에서 제가 주로 한 일**을 기준으로 네 가지로 나누어 볼 수 있습니다.

`프로젝트 · 해커톤` · `커뮤니티 · 운영` · `교육 · 봉사` · `학습 · 탐색`

각 활동에는 별도의 상세 페이지가 있고,
`#a/활동이름` 형태의 주소를 사용하기 때문에 특정 활동을 바로 공유할 수도 있습니다.

한국어와 영어를 모두 지원하며, PC와 모바일에서도 볼 수 있도록 만들었습니다.

---

## Design

전체적으로 **흰색과 검정색을 기본으로 하고 파란색 `#1c6fe0`을 포인트로 사용했습니다.**

평소 좋아하는 깔끔한 디자인을 바탕으로, 메뉴나 숫자 카드처럼 화면 위에 떠 있는 요소에는 유리 효과를 넣었습니다.

폰트는

* **Archivo** — 영문 제목과 숫자
* **Noto Sans KR** — 본문

를 사용했습니다.

다크 모드와 모바일 화면도 함께 고려했고, 키보드만으로도 사이트를 사용할 수 있도록 접근성도 신경 썼습니다.

---

## Tech

별도의 프레임워크나 빌드 과정 없이 **HTML, CSS, JavaScript**로 만들었습니다.

```text
index.html
content/
  ko.js
  en.js
  common.js
cv/
  Jinseok_Oh_CV_KO.pdf
  Jinseok_Oh_CV_EN.pdf
img/
video/
docs/                   디자인 · 콘텐츠 규정
tools/
  check-content.mjs     콘텐츠 검증 스크립트
```

사이트의 구조와 기능은 `index.html`에,
한국어와 영어 문장은 `content/` 안의 파일에 나누어 두었습니다.

그래서 새로운 활동을 추가하거나 기존 내용을 수정할 때 코드를 많이 건드리지 않아도 되도록 구성했습니다.

Vercel로 배포하고 있습니다.

---

## Updating the content

내용을 수정할 때는 대부분 `content/` 안의 파일만 수정하면 됩니다.

| 수정할 내용        | 파일                                |
| ------------- | --------------------------------- |
| 한국어 문장        | `content/ko.js`                   |
| 영어 문장         | `content/en.js`                   |
| 활동 추가 및 기본 정보 | `content/common.js`               |
| 대표 프로젝트       | `content/common.js` → `projects`  |
| 대표 활동         | `content/common.js` → `featured`  |
| 활동 구분         | `content/common.js` → `categories` (활동마다 `category`) |
| 이력의 숫자        | `content/common.js` → `tiles` · `certGroups` · `volunteerLog` |
| CV PDF        | `cv/` 폴더의 파일을 같은 이름으로 덮어쓰기 (주소는 `content/common.js` → `cv`) |

활동 하나를 추가할 때는 `common.js`에 기본 정보를 넣고,
`ko.js`와 `en.js`에 각각 한국어와 영어 내용을 추가하는 방식입니다.
자세한 순서는 아래 문서에 정리해 두었습니다.

---

## Documentation

새 활동을 추가해도 기존 페이지와 같은 모양 · 같은 구성이 나오도록, 디자인과 콘텐츠의 기준을 문서로 정리했습니다.

| 문서 | 내용 |
| --- | --- |
| [docs/NEW_ACTIVITY_CHECKLIST.md](docs/NEW_ACTIVITY_CHECKLIST.md) | **새 활동을 추가하는 순서.** 필요한 정보 · 사진 규격 · 복사해 쓰는 템플릿 · 배포 전 확인 목록 |
| [docs/CONTENT_GUIDELINES.md](docs/CONTENT_GUIDELINES.md) | 무엇을 어떤 순서 · 말투로 쓰는지. 활동 구분 기준, 항목 형식, 본문 블록, 한 · 영 규칙, 개인정보 보호 |
| [docs/DESIGN_SYSTEM.md](docs/DESIGN_SYSTEM.md) | 색 · 글자 · 간격 값과 컴포넌트별 규칙, 반응형 · 어두운 화면 · 모션 · 접근성 |
| [docs/PORTFOLIO_AUDIT.md](docs/PORTFOLIO_AUDIT.md) | 현재 상태 점검 결과와 우선순위별 개선안 |

내용을 고친 뒤에는 아래 명령으로 빠진 항목이나 형식 오류가 없는지 확인합니다.

```bash
node tools/check-content.mjs
```

Claude Code 같은 코딩 에이전트에게 작업을 맡길 때는 [CLAUDE.md](CLAUDE.md)가 위 문서들로 안내합니다.

---

## Making this

디자인과 구현 과정에서는 **Claude Code**를 활용했습니다.
특히 페이지를 직접 확인하면서 수정할 부분을 찾아 전달하고, 다시 결과를 확인하는 방식으로 여러 번 다듬었습니다.

결과적으로 단순한 이력서 페이지보다는,
**지금까지 제가 무엇을 해왔는지 한눈에 볼 수 있는 개인 기록 공간**에 가깝게 만들었습니다.

---

## Contact

* Email: [kidariseok@gmail.com](mailto:kidariseok@gmail.com)
* Blog: https://blog.naver.com/kidariseok
