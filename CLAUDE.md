# Claude 작업 지침 — kidariseok.github.io

사이트 구조와 내용 수정 방법은 `README.md`를 따른다(글자는 `content/`, 화면은 `index.html`).

## 사이드 프로젝트 (보관 중, 아직 main 미반영)

- 사용자가 "사이드 프로젝트 넣자"고 하면 브랜치 `claude/dreamy-wozniak-nhh584`의 작업을 main에 반영한다. 사용자가 고른 **시안 A(한 줄 배너)** 로 이미 구현돼 있다.
- 들어 있는 것: 메인 '프로젝트' 아래 한 줄 배너 → 목록 `#side` → 상세 `#b/아이디`, 게임 2개(신병 디펜스 · Live A Life)의 한국어 · 영어 소개와 본문, 게임 화면 `img/sd_*.webp` · `img/lal_*.webp`.
- 반영 전에 확인할 것: `content/common.js` → `builds`의 숫자(커밋 · PR · 테스트, 2026-10-30 기준)를 각 레포 main에서 다시 센다. 배포 주소(newbie-defense.vercel.app, live-a-life-web.vercel.app)가 열리는지 확인한다. Live A Life는 비공개 레포라 GitHub 링크를 넣지 않는다.

## 시안은 늘 아티팩트로

- 사용자가 "시안", "목업", "디자인 안", "몇 가지 버전" 등 **눈으로 비교해 고를 결과물**을 달라고 하면, 따로 말하지 않아도 **Artifact(claude.ai 아티팩트 페이지)로 만들어 링크를 준다.**
- 시안이 여러 개면 한 아티팩트 안에서 **시안 전환 버튼**으로 바로 바꿔 볼 수 있게 하고, 각 시안에 짧은 이름과 한 줄 설명을 붙인다.
- 시안은 **실제 사이트를 바꾸지 않고** 복사본(index.html · content/ · img/)으로 만든다. 사용자가 고른 안만 실제 코드에 옮긴다.
- 아티팩트에서는 외부 스크립트(Google Analytics), 다운로드(CV 버튼), 큰 영상(`video/`)이 동작하지 않는다. 복사본에서 빼고, 뺀 것을 답변에 한 줄로 적는다.
