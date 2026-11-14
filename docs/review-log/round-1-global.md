# Round 1 · 외국계 리크루터 · 해외 네트워킹 (recruiter-global)

2026-11-14

- 관점: 글로벌 테크 기업 서울/싱가포르 오피스 테크 리크루터 (APAC PM · 서비스 기획 · AI 프로덕트 인턴 1차 스크리닝). 한국어는 일부만 읽음 → **영어 화면만** 평가. LinkedIn 에서 처음 보는 해외 실무자 관점도 함께 봄.
- 입력: `review/round1` 의 `main_en_desk_work1–3.png` · `main_en_mob_work1–4.png` · `main_en.txt`, 대표 활동 6개(`line4` `goormthon` `realthon` `gdsc` `ktng-overseas` `edutech-expo`)의 `*_en_desk_1/2.png` · `*_en_mob_1.png` · `*_en.txt`. 비교용으로 `review/round0` 의 같은 파일과 `heights.txt`, 이전 종합본 [round-0-synthesis.md](round-0-synthesis.md), 내 이전 보고 [round-0-global.md](round-0-global.md).
- 한계: 메인 첫 화면(hero)은 캡처에 없음(hero 문구는 `content/en.js` 의 `page.hero` 를 읽어 확인만 함). "Show" 로 접힌 구역은 캡처 텍스트에 요약 한 줄만 있어, 접힌 안쪽 내용은 round 0 텍스트로 확인함.
- 제외: 영어 문장 안의 " - "(공백-하이픈-공백) 대시는 저장소 규칙이므로 다시 지적하지 않음. 종합본 4장(작성자 확인 목록)에 있는 항목도 발견 사항으로 다시 올리지 않음.
- 표기: 영어 원문은 "따옴표", 제안 문안은 `코드`. 사이트에 없는 사실이 필요하면 `작성자 확인 필요`.

---

## 2.1 10초 요약

> **"코드는 쓰지 않는 PM 으로 해커톤 서비스 2건을 기획했고, 대학 연합 AI 해커톤 · 해외 연사 섭외 · 해외 교육봉사에서 '막힌 경로를 다른 경로로 바꾸는' 판단을 반복해 온, 영어가 확실한(IELTS 8.0) 성균관대 컴퓨터교육과 학부생(2024 입학)이다."**

round 0 과 달리 이 문장을 **캡처만 보고 10초 안에** 쓸 수 있습니다. 세 가지가 달라졌습니다.

1. "Class of 2024" 가 "Entered 2024" 로 바뀌어 졸업생으로 읽히지 않습니다.
2. 카드와 상세의 숫자가 같아졌습니다(300명 · "led classes for 34" 가 사라짐). 상세로 들어가도 숫자가 작아지지 않습니다.
3. 데스크톱 상세 첫 화면마다 PROBLEM/GOAL → KEY DECISION → OUTCOME 세 칸이 보여, "무엇을 판단했나" 를 스크롤 없이 찾을 수 있습니다.

남은 빈칸은 두 가지입니다. 둘 다 종합본 4장(작성자 확인)에 있어 발견 사항으로 다시 올리지 않습니다.
- **AI 프로덕트 판단**: 지원 방향이 AI 프로덕트라면, AI 가 무엇을 정하고 무엇은 규칙이 정하는지(R0-17)가 아직 페이지에 없습니다. 그나마 있던 AI 구성 설명(gpt-4o-mini, JSON 출력)도 이번에 접혔습니다(R1-G-02).
- **졸업 예정 · 인턴 가능 시기**: "Entered 2024" 와 About 의 2025–2026 군 복무를 보면 리크루터는 바로 "언제부터 일할 수 있나" 를 묻습니다(4장 6번).

---

## 2.2 스코어카드 (영어 · 데스크톱 첫 화면 `*_en_desk_1.png` 만)

○ 바로 보임 · △ 찾으면 보이거나 모호함 · ✕ 첫 화면에 없음 · — 해당 없음. 괄호 안은 round 0 내 판정.

| 활동 | 문제·목적 | 내 역할 | 핵심 판단 | 결과(종류가 맞게) | 팀/개인 구분 | 숫자 맥락(분모·범위) |
| --- | --- | --- | --- | --- | --- | --- |
| line4 (2GATHER) | ○ (△) | ○ (○) | ○ (✕) | ○ (△) | ○ (○) | ○ (△) |
| goormthon (ESC: ESCape SKKU) | ○ (△) | ○ (○) | △ (✕) | ○ (△) | ○ (△) | △ (✕) |
| realthon (RE:ALThon) | ○ (○) | ○ (○) | ○ (○) | △ (△) | ○ (△) | △ (△) |
| gdsc (GDG on Campus : SKKU) | ○ (○) | ○ (○) | ○ (△) | ○ (△) | ○ (○) | △ (△) |
| ktng-overseas (KT&G 해외봉사) | ○ (△) | ○ (○) | ○ (✕) | ○ (△) | ○ (△) | ○ (✕) |
| edutech-expo | ○ (○) | ○ (○) | ○ (△) · 관찰 | △ (△) | ○ (○) | — (—) |

**판정 근거 (한 줄씩)**

- **line4**: PROBLEM 칸에 분모가 있는 문제("aimed for 30 members and got 9"), KEY DECISION 에 대안과 선택("Instead of asking users to pick channels … rank only the promotion formats"), TEAM OUTPUT 에 결과의 종류와 한계("There is no usage data … so none is claimed")가 한 화면에 다 있습니다. 6개 중 가장 좋아졌습니다. 다만 "shipped" 라는 동사(R1-G-06)와, 판단의 주어가 본문과 다른 점(R1-G-07)은 첫 통화에서 질문을 받습니다.
- **goormthon**: GOAL · OUTCOME 이 생겼고, 판단 칸을 "WHAT I PLANNED" 로 정직하게 붙인 것은 좋습니다. 그래서 '핵심 판단'은 △ 입니다(판단이 아니라 기획 범위). 숫자 맥락은 규모 숫자가 없지만 "없다"고 밝혔으므로 ✕ → △. 오른쪽 위 패널 칸 하나가 비어 있습니다(R1-G-09).
- **realthon**: 판단은 원래 좋았고 이제 KEY DECISION 칸에 따로 섰습니다. 결과 칸의 큰 글씨 "35 / 37" 은 단위가 없어 첫눈에 점수인지 비율인지 모르고, 설명 문장이 첫 화면 아래에서 잘립니다(R1-G-04). 그래서 결과 · 숫자 맥락은 △ 유지. 본인 몫(SKKU 예산이 약 2배로 늘어난 일)은 접힌 04절로 들어가 첫 화면에서 사라졌습니다(R1-G-02).
- **gdsc**: KEY DECISION("cold emails, experts I had met in class and program referrals at the same time … WhatsApp")이 구체적이고, OUTCOME · ARTIFACT 가 본인 결과(섭외 · 템플릿)로 바뀌었습니다. "most second-half speakers" 의 분모(몇 명 중 몇 명)는 4장 1번이라 △ 로만 둡니다.
- **ktng-overseas**: 가장 크게 좋아졌습니다. TEAM "40 volunteers (4 teams of 10)", BUDGET "Team 1 class supplies · about KRW 2.2M", 177시간의 구성(58.5 + 115 + 3.5)과 1365 설명이 첫 화면에 있습니다. 하루 18시간으로 읽히던 문제가 사라졌습니다.
- **edutech-expo**: ACTIVITY · KEY OBSERVATION 라벨이 정직하고, 관찰 문장(출판사 부스가 사라진 원인이 AIDT 정책 변화)이 첫 화면에 있습니다. KEY INSIGHTS 칸은 여전히 명사 나열("people who connect classrooms and companies, and the convergence of technologies")이라 △(R0-14 판정 참고).

**5점 척도** (괄호 안은 round 0)

| 항목 | 점수 | 이유 |
| --- | --- | --- |
| 훑어보기 쉬움 | 4 / 5 (3) | 데스크톱 상세는 세 칸만 읽으면 됨. KT&G 영어 페이지 11,429px → 7,865px. 감점은 메인 Projects 카드의 휴대폰 화면(R1-G-01). |
| 기획 역량의 증거 | 4 / 5 (3) | 6개 중 4개가 첫 화면에 '대안 → 선택'을 보여 줌(2GATHER 형식 순위, RE:ALThon 국내 전환, GDG 다중 경로, KT&G 대체 구매). AI 관련 판단(R0-17)이 없어 5점은 아님. |
| 신뢰성(과장 없음) | 4 / 5 (3) | 카드 = 상세, "none is claimed" 같은 한계 표시, 설문 분모(37 of 50), 시간 구성. 감점: ESC 의 "enthusiastic response" 가 바로 위 한계 표시와 부딪힘(R1-G-03), "shipped"(R1-G-06). |
| 일관성 | 4 / 5 (2) | 직함 "people lead", 자격증 영문명, 날짜(Apr 2026), 소제목 형식("01 · Situation" + 문장형 제목), 마지막 "Looking back" 이 모두 맞춰짐. 남은 것: 2GATHER 설명이 다섯 가지, 행사명 EduTech/EdTech(R1-G-08 · R1-G-11). |
| 모바일 가독성 | 3 / 5 (3) | 상세 첫 화면 요약문에 결과 한 구절이 들어갔고 Highlights 카드 라벨도 보임(개선). 그러나 Projects 카드의 값 칸이 좁아져 결과가 한 줄 2–3단어로 6줄이 됨(R1-G-01, 악화). 둘이 상쇄. |

**종료 조건 관점**: 내 판정 기준으로 첫 화면 식별은 모두 ○ 또는 △(사유 있음)이고, 이번 라운드의 새 P0 는 없습니다.

---

## 2.5 이전 지적 판정 (R0-01 … R0-21)

| 이전 ID | 판정 | 근거 |
| --- | --- | --- |
| R0-01 | **해결** | hero 소개문은 "how service planning and field execution make it useful"(구현 주장 없음), Projects 부제 "Services I planned and led as PM, built with developer and designer teammates", 카드 · 상세 모두 "TEAM STACK · built by teammates". 본문 "I did not write any of the code." 유지. 단, 이 긴 라벨이 휴대폰 카드 레이아웃을 망가뜨림 → R1-G-01. |
| R0-02 | **해결** | GDG 카드 "Booked most second-half seminar speakers · about 20–30 attendees per session · bilingual outreach templates" = 상세 OUTCOME · ARTIFACT · SCALE 과 같은 사실, 같은 동사(Booked). 300명 표현 사라짐. '대부분'의 분모는 4장 1번. |
| R0-03 | **해결** | 큰 숫자 "6 weeks" 제거, 라벨 "TEAM OUTPUT", 결과 범위와 한계("no usage data … so none is claimed") 명시. 영어 동사 선택은 R1-G-06 으로 따로. |
| R0-04 | **해결** | 카드 "my team's class of 34 third-graders"(라벨도 RESULT → SCOPE), 상세 OUTCOME "my team taught one third-grade class (34 students)". 주어가 일치함. |
| R0-05 | **해결** | 요약 "As PM, planned …", 역할 칩 "PM · Problem definition · PRD · User flow · wireframes". "UX/UI lead" 사라짐. |
| R0-06 | **해결** | hero 와 Credentials 모두 "Computer Education, Sungkyunkwan University · Entered 2024". 졸업 예정 연도는 4장 6번. |
| R0-07 | **해결** | 요약에서 "environmental-improvement" 삭제, OUTCOME 아래 "58.5 h of pre-departure prep + 115 h in Indonesia + 3.5 h closing ceremony", 1365 를 "Korea's national volunteer portal" 로 풀어 씀(Credentials 도 같음). 문장 모양은 R1-G-04. |
| R0-08 | **해결** | 6개 상세 모두 glance 세 칸이 기본 노출. line4 영상 · 발표자료가 본문 뒤로 가고 패널의 "Promo video" · "Slides" 버튼은 유지. |
| R0-09 | **해결** | 결과 칸이 6개 모두 셋째 칸 · 같은 강조색. 라벨이 종류별(TEAM OUTPUT / OUTCOME / EVENT OUTCOME · PARTICIPANT FEEDBACK / OUTCOME · ARTIFACT / KEY INSIGHTS), 예산은 BUDGET 칸으로 분리(RE:ALThon · KT&G). 남은 것: RE:ALThon 큰 글씨 "35 / 37" 의 단위 → R1-G-04. |
| R0-10 | **해결** | RE:ALThon MY ROLE "proposed the collaboration to Korean universities · co-planned with three schools · managed the SKKU program's budget", 카드 "Proposed the joint event · co-planned it · managed SKKU's budget". "overall planning" 사라짐. 부작용: 본인 몫(SKKU 지원 약 2배)이 접힘 → R1-G-02. |
| R0-11 | **일부** | 풀어 쓴 것: "Yuljeon (natural sciences)", 1365, "(formerly GDSC Sungkyunkwan University)", ESC 원제 병기, "co-hosted by three universities". 아직 설명 없음: "Goormthon Univ", "LIKELION", "Everytime / CampusPick / Yozm / Linkareer"(line4 본문), "KT&G", "FreeMed", "SKKU's software program", "Haebeop Reading & Essay", 아카이브의 "CHED". 그리고 메인 KT&G 카드에서 round 0 에 있던 "Korean traditional game" 설명이 **빠짐** → R1-G-10. (4호선톤 성격 · 직함 공식 영문명은 4장 7번) |
| R0-12 | **해결** | 휴대폰 Highlights 카드에 "MY ROLE · EVENT OUTCOME · OUTCOME · ARTIFACT" 라벨이 보임(`main_en_mob_work4`). 상세 요약문에 결과 한 구절("A team of six shipped it in six weeks", "(50 participants, 9 teams)", "booked most second-half speakers", "ran it at an on-campus booth"). 단, 같은 화면의 Projects 카드는 새로 나빠짐 → R1-G-01. |
| R0-13 | **해당없음** | 한국어 화면 전용 오독('1조 원'). 영어는 "Team 1" 이고, KT&G TEAM 칸 "40 volunteers (4 teams of 10)" 이 맥락을 주므로 문제 없음. |
| R0-14 | **일부** | 라벨 "ACTIVITY" · "KEY OBSERVATION" · "KEY INSIGHTS", 관찰 문장이 첫 화면에, 업체 수치에 "according to the exhibitor", Adobe 문장에 "Adobe said" — 반영됨. 남은 것: KEY INSIGHTS 가 여전히 다섯 항목 나열이고 그중 둘은 인사이트가 아님("people who connect classrooms and companies", "the convergence of technologies"). 메인 카드 "five insights noted" 는 빈 말. 제안: 상세 KEY INSIGHTS `Similar AI everywhere, so data and teacher-facing UX set vendors apart - and policy can erase a market in two years.`, 메인 카드 `Saw a policy change empty the publishers' booths within two years; data and classroom UX, not the AI model, set vendors apart`(모두 본문 01 · 03 · 04 근거). |
| R0-15 | **해결** | 카드 · 요약 · 문제 칸 모두 "students and early-stage founders"(수요), 본문 제목 "… with early-career creators"(공급). 섞임 없음. |
| R0-16 | **일부** | 계획대로 GOAL · 내 역할 · OUTCOME 이 glance 로, "designer" 표기는 "developer teammates (one also handled design)" 로 정리. 판단 · 플레이 인원은 4장 3번. 다만 새 한계 표시와 본문의 "enthusiastic response" 가 부딪힘 → R1-G-03. |
| R0-17 | **해당없음(보류)** | 사실이 필요해 보류된 항목(4장 2번). 오히려 유일한 AI 구성 설명(08 Build)이 접혀 첫 노출이 줄었음 → R1-G-02 에서 접힌 요약 문구만 제안. |
| R0-18 | **해결** | "HR lead / Core / HR lead / head of people" → 전부 "people lead". 자격증 "Computer Specialist in Spreadsheet & Database, Level 2" 로 통일. 소제목 "01 · Situation" + 문장형 제목, 마지막 "Looking back" 6개 모두 확인. 대소문자("People lead" / "people lead")와 행사명은 R1-G-08 · R1-G-11. |
| R0-19 | **해결** | KT&G EN 11,429px → 7,865px. 05 · 06 · 07 · 09 절이 접힘(삭제 아님), 03 대체 구매 판단이 glance 로 올라옴. 08 · 10 절의 한 줄씩 끊는 회고는 남았지만 판단을 가리지 않음. |
| R0-20 | **일부** | 해결: "Apr 2026" 등 날짜, "SKKU's College of Computing and Informatics night", "mock data", "Pitch deck (slides in Korean)", "3–4" · "20–30". 남은 것: ① edutech 01 "2025-2028"(범위는 en dash `2025–2028`), ② goormthon 본문 "on October 31" ↔ 패널 "31 Oct 2024"(미국식 · 영국식 혼용 → `on 31 October`), ③ edutech 요약 둘째 문장만 주어 있음("I saw that …" → `Comparing the two expos, concluded that data, user experience and policy shape edtech.`), ④ ESC 원제가 한글뿐("지금 우리 율전은") → 로마자 · 뜻 병기 `"Jigeum Uri Yuljeon-eun" ("Yuljeon Right Now")`(번역 뉘앙스 작성자 확인 필요). |
| R0-21 | **해당없음(보류)** | 4장 9번. About 03 "three certifications and two English test scores" 는 그대로이고 Credentials 의 자격증 5개와 여전히 다르게 보임(판정만 기록). |

**집계**: 해결 14 · 일부 4 (R0-11 · 14 · 16 · 20) · 미해결 0 · 악화 0 · 해당없음(보류) 3 (R0-13 · 17 · 21). 단, R0-01 · R0-12 의 수정이 새 문제(R1-G-01)를, R0-10 · R0-19 계열의 '접기'가 새 문제(R1-G-02)를 만들었습니다.

---

## 2.3 발견 사항 (새로운 것만)

| ID | 심각도 | 위치 (파일명 · 화면 구역) | 관찰한 것 | 채용 담당자에게 왜 문제인가 | 제안 | 유형 |
| --- | --- | --- | --- | --- | --- | --- |
| R1-G-01 | **P1** (악화) | `main_en_mob_work2–4.png` · Projects 카드(2GATHER · ESC) | 라벨 "TEAM STACK · built by teammates" 가 길어 휴대폰에서 라벨 열이 카드 폭의 절반 이상을 차지함. 값 칸이 약 95px 로 좁아져 "Shipped by a team of six in about 6 weeks and demoed at the final" 이 6줄, "Ran it in person at a campus booth (31 Oct 2024)" 가 5줄로 꺾이고, 칩 "Problem definition" · "Spring Boot" · "Tailwind CSS" · "Stage & puzzle design" 이 두 줄로 깨짐. round 0 (`round0/main_en_mob_work2.png`)에서는 값 칸이 115px 부근에서 시작해 한 줄로 읽혔음. | 해외 실무자는 LinkedIn 링크를 휴대폰으로 엽니다. 메인에서 처음 보는 두 카드가 '깨진 레이아웃'처럼 보이고, 가장 중요한 결과 문장이 단어 2–3개씩 끊겨 읽히지 않습니다. | 내용만으로: 라벨을 짧게 `BUILT BY TEAM`(뜻은 그대로, 본문 "I did not write any of the code." 는 유지). 화면 규칙으로: 좁은 화면에서 라벨을 값 위에 쌓는 방식은 **CSS 변경이라 적용 전에 개선안으로 먼저 보고**(CLAUDE.md 10). 한국어 라벨 길이도 같은 문제를 만드는지 함께 확인 필요. | 시각 |
| R1-G-02 | **P1** | `realthon_en.txt` 04 · `line4_en.txt` 04 · 08 (모두 "Show" 로 접힘) | ① RE:ALThon 의 유일한 **개인 성과** "SKKU first promised about KRW 2 million; after seeing me drive the collaboration with Japan, the program nearly doubled its support." 가 접힌 04절 안에만 있음. 첫 화면 BUDGET 칸은 세 학교 합계("About KRW 7M in sponsorship from four university programs")뿐. ② line4 의 유일한 **AI 구성 설명**("OpenAI API · gpt-4o-mini · Generates the promotion timeline and budget results as JSON …")이 접힌 08절 안. ③ "Researched six promotion channels and turned them into service rules" 의 근거(CampusPick 48시간 승인 등)가 접힌 04절 안이고, 접힌 요약은 "Examples: posting rules … turned into scheduling rules" 로 추상적. | 접기 자체는 좋습니다(R0-19). 그러나 이 세 줄은 '팀 합계'가 아닌 **본인 몫**과 **AI 직무 관련성**을 보여 주는 문장이라, 접히면 첫 화면에는 팀 단위 숫자만 남습니다. 리크루터는 "Show" 를 거의 누르지 않습니다. | 접힌 구역은 그대로 두고 **접힌 요약 한 줄**(항상 보이는 곳)만 고침. 모두 사이트에 이미 있는 사실. ① `Where the ~KRW 7M came from (SKKU's share, which I managed, nearly doubled from an initial ~KRW 2M), how the ~KRW 7.5M was spent, Korea University's free rooms and next year's cost split` ② `Built by the developer teammates: React front end, Spring Boot back end, and gpt-4o-mini returning the timeline and budget as JSON, with GitHub links` ③ `Channel posting rules turned into scheduling rules - e.g. the timeline allows for CampusPick's approval period of up to 48 hours` | 구조 |
| R1-G-03 | **P1** | `goormthon_en_desk_1.png` OUTCOME 메모 ↔ `goormthon_en_desk_2.png` 첫 문단 · 05절 | 첫 화면: "There is no player count or feedback data on hand, so none is claimed." 바로 아래 첫 문단: "We secured a campus booth and ran the game in person, drawing an enthusiastic response from students." 05절: "The game drew students in, and I found it rewarding to watch them enjoy it." | 같은 화면 높이 안에서 '반응 자료 없음'과 '열광적인 반응'이 함께 나옵니다. 리크루터는 둘 중 하나를 의심하게 되고, 다른 페이지의 정직한 한계 표시까지 '형식적인 문구'로 보입니다. | 첫 문단: `We secured a campus booth and ran the game in person on the night.` 05절: `Watching students play it at the booth was the most rewarding part for me.`(감상으로 한정). 관찰한 장면(줄을 섰는지, 랭킹 등록이 있었는지)이 있으면 그것을 씀 · 작성자 확인 필요. | 내용 · 사실확인 |
| R1-G-04 | P2 | 4개 상세 · glance 결과 칸의 작은 회색 글, RE:ALThon 큰 글씨 | 새로 들어간 한계 표시가 한국어 직역투: ① line4 "This is a shipping and demo result. There is no usage data (users, promotion impact) on hand, so none is claimed." ② goormthon "There is no player count or feedback data on hand, so none is claimed." ③ realthon "Satisfaction is based on the 37 of 50 participants who answered the survey (out of 100)." ④ ktng "177 volunteer hours on certificates from 1365, Korea's national volunteer portal = 58.5 h of pre-departure prep + …" (문장 안의 "="). ⑤ realthon 큰 글씨 "35 / 37" 은 단위가 없음. | 한계를 밝히는 습관은 큰 강점인데, 문장이 어색하면 '번역기 문구'로 읽혀 효과가 줄어듭니다. "on hand"는 '자료가 어딘가에 있다'는 뉘앙스도 줍니다. "35 / 37" 은 점수(35점 만점에 37?)로 오독될 수 있습니다. | ① `Covers the build and demo only; no verified usage data (users, promotion impact), so none is reported.` ② `No verified player count or feedback data, so none is reported.` ③ `Survey: 37 of 50 participants responded; satisfaction scored out of 100.` ④ `177 certified volunteer hours (1365, Korea's national volunteer portal): 58.5 h pre-departure prep + 115 h in Indonesia + 3.5 h closing ceremony.` ⑤ 큰 글씨 `35 of 37`. ("91/100" 기준 자체는 4장 5번) | 번역 |
| R1-G-05 | P2 | `realthon_en_desk_1.png` KEY DECISION · 02절 제목 · `line4_en_desk_1.png` · `ktng-overseas_en_desk_1.png` KEY DECISION · `goormthon_en_desk_1.png` WHAT I PLANNED · `gdsc_en.txt` 05절 | 새 판단 칸 문장에 비문 · 직역: "I chose holding the event this year over keeping the "global" label.", "I put Japan off to a later edition", 제목 "I chose running the event over keeping the label.", "Budgets under KRW 100,000 get unit prices to decide with, not a fixed split.", "swapped it with the lesson owner's OK. Lessons ran as make-and-try, not explanation alone.", "…ranking, handed to the developers as a storyline and PRD."(주어 없는 분사), 목차 "Running and settling", 제목 "I handled fee paperwork and even gift shipping." | KEY DECISION 은 이제 페이지에서 가장 먼저 읽히는 문장입니다. "chose + -ing", "put Japan off"(일본을 미뤘다 = 사람을 미룬 것처럼 읽힘)는 원어민에게 바로 걸립니다. | `I chose to hold the event this year rather than keep the "global" label: I postponed the Japan partnership to a later edition and pitched Korean universities directly in the GDG on Campus leads' Slack. Korea University and Sogang signed on.` / 제목 `I chose to run the event rather than keep the label.` / `For budgets under KRW 100,000, it shows unit prices and lets users decide instead of imposing a fixed split.` / `…and swapped it in once the class lead agreed. Lessons were hands-on (make it, then play), not lecture-only.` (본문 용어 "class leads" 와 맞춤) / `…designed the play flow (character select → five quiz stages → final game → ranking), then handed it to the developers as a storyline and PRD.` / 목차 `Running talks and paying speakers`, 제목 `I also handled fee paperwork and shipped thank-you gifts.` | 번역 |
| R1-G-06 | P2 | `main_en_desk_work1.png` TEAM OUTPUT · `line4_en_desk_1.png` 요약 · 결과 칸 · 본문 첫 문단 | "Shipped by a team of six in about 6 weeks and demoed at the final", "A team of six shipped it in six weeks.", "A team of six shipped the service …", 본문 "planned, built and deployed". 바로 아래 메모는 사용 자료가 없다고 함. | 미국계 테크 회사에서 "shipped" 는 **실사용자에게 출시했다**는 뜻으로 읽힙니다. 사용 자료가 없다는 메모와 붙으면 "Shipped to whom?" 이 첫 질문이 됩니다. 해커톤 결과에는 '작동하는 데모'가 정확하고 충분히 강한 표현입니다. | 카드 `Built into a working service by a team of six in about six weeks and demoed at the hackathon final` / 요약 `A team of six built a working, demoable version in six weeks.` / 결과 칸 `A team of six built the service in about six weeks, with a demoable flow from sign-in to …`. 실제로 공개 배포되어 누구나 접속할 수 있었다면 `deployed` 를 써도 됨(접속 가능 여부는 4장 2번). | 내용 · 번역 |
| R1-G-07 | P2 | `line4_en_desk_1.png` KEY DECISION ↔ `line4_en.txt` 03 · 05절 | 첫 화면: "Instead of asking users to pick channels they don't know, **I** had them rank only the promotion formats they want". 본문 03: "At first, **we** planned for users to pick the platforms themselves … So instead of choosing platforms, users only rank the formats". 05: "So **we** split budgets into tiers … **we** decided". MY CONTRIBUTION 에는 "Planned the core features and user flow", "Designed the budget split and operating rules". | 첫 화면의 가장 강한 판단이 본문에서는 팀의 판단으로 나옵니다. PM 면접관이 가장 먼저 확인하는 것이 "그 아이디어는 본인 것인가, 팀 것인가" 이고, 둘이 다르면 과장으로 읽힐 수 있습니다. | 두 곳의 주어를 맞춤. 본인 제안이었다면 본문 03 `I proposed that users rank only the formats they want, and the team adopted it.` / 팀 논의였다면 첫 화면 `We switched from channel picking to ranking formats; I turned that into the input flow and channel rules.` 어느 쪽인지는 작성자 확인 필요. | 내용 · 사실확인 |
| R1-G-08 | P2 | `main_en.txt` · `line4_en.txt` · `gdsc_en.txt` · `realthon_en.txt` | ① 2GATHER 를 다섯 가지로 부름: "An AI promotion-planning service"(카드), "an AI service"(요약), "An AI promotion-strategy platform connecting …"(본문 제목), "An AI-powered marketing solution"(본문), "promotion-strategy platform … AI-powered, timeline-based marketing solution"(발표 자료 설명). ② 같은 첫 화면에 "six weeks" · "about 6 weeks" · "6 weeks". ③ 메인 제목 "Projects and Key activities"(대소문자 섞임). ④ 직함 "People lead"(RE:ALThon) / "people lead"(나머지). ⑤ GDG MY ROLE "Joined the Administration team → Core team people lead (member recruiting · speaker outreach) the next semester · most second-half speaker outreach …" 에서 "the next semester" 위치가 어색함. | "platform" · "solution" 은 마케팅 문구처럼 들리고, 이름이 바뀔 때마다 다른 제품처럼 보입니다. 직함은 영어에서 대문자로 쓰는 것이 자연스럽습니다. | ① 모두 `AI promotion-planning service` 로. ② 문장 안은 `about six weeks`, PERIOD 칸만 숫자. ③ `Projects and Key Activities`. ④ `People Lead`(공식 영문 직함 여부는 4장 7번). ⑤ `Administration team → Core team People Lead the following semester (member recruiting · speaker outreach) · handled most second-half speaker outreach for the monthly global IT seminar` | 번역 |
| R1-G-09 | P2 (악화) | `goormthon_en_desk_1.png` 패널 첫 줄 · `gdsc_en_desk_1.png` 패널 둘째 줄 | ESC 패널 첫 줄이 MY ROLE · TEAM · PERIOD 다음 넷째 칸이 비어 있음. round 0 에서는 그 자리에 RESULT 가 있었음(결과가 glance 로 옮겨 가며 빈칸이 생김). GDG 둘째 줄도 PERIOD · WHERE 다음 오른쪽 칸이 빔. | 데스크톱 첫 화면 한가운데의 빈 상자는 '덜 만든 페이지' 인상을 줍니다. | 빈칸이 생기면 마지막 칸이 줄을 채우게 하는 것은 **CSS 변경이므로 개선안으로 먼저 보고**. 내용으로 메울 수 있다면 ESC 에 WHERE `Goormthon Univ · booth on SKKU's Yuljeon campus` (부스가 율전 캠퍼스였는지 작성자 확인 필요). | 시각 |
| R1-G-10 | P2 (악화) | `main_en.txt` · KT&G 카드 MY ROLE · `ktng-overseas_en_desk_1.png` 요약 · MY ROLE · OUTCOME | ① round 0 카드의 "led Korean traditional game, ddakji and tooth-brushing lessons" 에서 설명("Korean traditional game")이 빠지고 "led the ddakji and tooth-brushing lessons" 만 남음. 상세 첫 화면에도 ddakji 설명 없음. ② 같은 첫 화면에 "planned and led the ddakji (class) and tooth-brushing lesson(s)" 이 요약 · MY ROLE · OUTCOME 세 번 반복. OUTCOME 이 역할을 되풀이함. | 해외 독자는 ddakji 가 무엇인지 모릅니다. 세 번 반복되면 결과 칸이 결과가 아니라 역할 복사로 보입니다. | ① 첫 등장(카드 · 상세 요약)에 `ddakji (a Korean paper-tile flipping game)`. ② OUTCOME 을 결과로: `My team taught one third-grade class (34 students); I led two of its lessons. Purchases went to KT&G as a ready-to-buy Excel list with links.` (본문 04 "the education plan lists me as lead facilitator for both" 근거) | 번역 · 내용 |
| R1-G-11 | P2 | `edutech-expo_en_desk_1.png` 제목 · 사진 · WHERE, 메인 카드 제목 | 제목은 "2024/2026 EduTech Expo", 그런데 같은 첫 화면의 명찰 사진에 "EdTech Korea Fair 2026", 둘째 화면 세미나 화면에 "edtech KOREA FAIR". WHERE 칸에 장소가 아닌 "Adobe session (2026)" 이 들어가 ACTIVITY 칸과 겹침. (round 0 내 G-08 ③ 이 종합에서 빠졌음) | 리크루터가 행사를 검색하면 "EduTech Expo" 로는 찾을 수 없습니다. 첫 화면 사진과 제목이 다르면 같은 행사인지 의심합니다. | 제목 · 본문 · 메인 카드를 명찰의 이름으로: `EdTech Korea Fair (2024 · 2026)` — 공식 영문 표기는 작성자 확인 필요. WHERE 는 `COEX, Seoul` 만. | 번역 · 사실확인 |
| R1-G-12 | P2 | `realthon_en.txt` 01 · `edutech-expo_en.txt` 01 · 원화 금액 전반 | round 0 내 보고에 있었으나 종합에서 빠진 것(4장에도 없음): ① "the distance between Tokyo and Osaka was a burden" — 언급된 세 대학(Tokyo Metropolitan · Tokyo City · Waseda)은 모두 도쿄. ② "On 18 Nov 2025 the Ministry of Education passed an amendment to the Regulations on Textbooks" — 부처는 규정을 'pass' 하지 않음, 날짜 단정. ③ 원화에 달러 환산이 하나도 없음("KRW 100,000", "KRW 2.2M", "KRW 7M", "KRW 6.6 trillion"). | ①②는 사실관계 질문으로 바로 이어지고, 틀리면 페이지 전체 신뢰를 깎습니다. ③ 해외 독자는 금액 크기를 가늠하지 못해 예산 관리 경험의 무게를 판단할 수 없습니다. | ① 오사카가 무엇을 가리키는지 작성자 확인 필요(관련 지부가 오사카에 있었다면 그 이름을 씀, 아니면 문구 삭제). ② `According to Edumorning, an amended Regulations on Textbooks, approved on [date], removed AIDT from the scope of textbooks.` 날짜 · 동사는 출처와 대조 · 작성자 확인 필요. ③ 각 페이지 첫 등장에만 `KRW 7M (≈ US$5K)` 식 병기 — 환율 기준 작성자 확인 필요. | 사실확인 · 번역 |

---

## 2.4 유지할 것

1. **상세 첫 화면의 세 칸(PROBLEM/GOAL → KEY DECISION/KEY OBSERVATION/WHAT I PLANNED → OUTCOME)과 정직한 라벨.** 판단이 없는 활동에 판단 라벨을 억지로 붙이지 않은 것(ESC "WHAT I PLANNED", EduTech "ACTIVITY" · "KEY OBSERVATION")이 오히려 신뢰를 줍니다. 문장만 다듬고 틀은 그대로 두세요.
2. **한계 표시 메모.** "no usage data … none is claimed", 설문 응답 37 of 50, 177시간의 구성. 영어만 고치고(R1-G-04) 지우지 마세요. 해외 리크루터에게 가장 드문 신호입니다.
3. **카드 = 상세 원칙.** GDG · KT&G · RE:ALThon 의 카드 숫자가 상세와 정확히 같아졌습니다. 앞으로 숫자를 더할 때도 상세에 근거가 먼저 있어야 합니다.
4. **본인 기여의 경계 표시.** "TEAM STACK · built by teammates"(라벨 길이만 R1-G-01), "I did not write any of the code.", "my team taught one third-grade class", "managed SKKU's budget".
5. **국제 신호.** "Entered 2024", IELTS 8.0 (L 9.0), Dulwich College Suzhou, 도쿄 대학들과 영어로 LinkedIn · Discord 협의, WhatsApp 으로 채널을 바꾼 일, 1365 풀이, RE:ALThon "the event ran again the next year"(일회성이 아니라는 결과 신호).

---

## 부록 · 포워딩 판단

**지금 hiring manager 에게 포워딩하겠는가: 예.** round 0 의 조건(졸업생으로 읽힘, 카드와 상세의 숫자 불일치)이 모두 풀렸습니다. APAC PM · 서비스 기획 인턴 풀에는 그대로 넘기겠습니다. 첫 화면마다 '대안 → 선택 → 결과'가 보이고, 과장 대신 한계를 먼저 밝히는 습관이 분명합니다.

다만 **AI 프로덕트 PM** 포지션으로 넘길 때는 메모를 붙이겠습니다: "AI 부분에서 본인이 정한 것은 첫 통화에서 확인 필요". 넘기기 전에 고치면 좋은 것은 R1-G-01(휴대폰 Projects 카드), R1-G-03(ESC 문장 충돌), R1-G-02(접힌 요약 한 줄)입니다.

**첫 통화에서 물어볼 것** (발견 사항이 아니라 질문. 대부분 4장 항목)
1. 인턴십은 언제부터 가능하고, 졸업 예정은 언제인가요? (4장 6번)
2. 2GATHER 에서 '채널 대신 형식 순위' 는 본인 제안이었나요, 팀 논의였나요? (R1-G-07)
3. 2GATHER 의 AI(gpt-4o-mini)가 정하는 것과 규칙이 정하는 것은 어떻게 나눴고, 출력이 맞는지는 어떻게 확인했나요? mock data 를 만들 때 무엇을 기준으로 했나요? (4장 2번)
4. GDG 하반기에 직접 섭외한 연사는 몇 명 중 몇 명인가요? (4장 1번)
