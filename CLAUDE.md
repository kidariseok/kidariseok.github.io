# 작업 안내 (코딩 에이전트용)

오진석의 포트폴리오 사이트입니다. 빌드 없는 정적 사이트이고, **활동을 추가하는 일은 데이터를 더하는 일**입니다.
이 파일은 요약입니다. **활동 추가는 `/add-activity` 스킬로** 합니다(스크립트가 규칙을 적용하므로 content/ · docs/ 를 읽지 않습니다). 문서는 아래 경우에만 읽으세요.

| 하려는 일 | 먼저 읽을 문서 |
| --- | --- |
| 새 활동 · 프로젝트 **추가** | `/add-activity` (`.claude/skills/add-activity/SKILL.md`). 스크립트가 실패하거나 규정이 궁금할 때만 [docs/NEW_ACTIVITY_CHECKLIST.md](docs/NEW_ACTIVITY_CHECKLIST.md) → [docs/CONTENT_GUIDELINES.md](docs/CONTENT_GUIDELINES.md) |
| 기존 활동 수정 · 삭제 | 먼저 `grep` 으로 해당 id 의 줄만 찾고, 필요하면 위 두 문서 |
| 화면 모양 · CSS · 컴포넌트 | [docs/DESIGN_SYSTEM.md](docs/DESIGN_SYSTEM.md) |
| 알려진 문제와 승인 대기 중인 개선안 | [docs/PORTFOLIO_AUDIT.md](docs/PORTFOLIO_AUDIT.md) |
| 채용 담당자 관점으로 점검 · 개선 (페르소나 서브에이전트 반복 점검) | [docs/RECRUITER_REVIEW.md](docs/RECRUITER_REVIEW.md) · 기록은 [docs/review-log/](docs/review-log/) |

## 구조

```
index.html          화면 구조 · 스타일 · 동작 전부. 상세 페이지는 renderDetail() 하나가 그림
content/common.js   언어와 무관한 값 (활동 id · 날짜 · 구분, 사진, 발표자료, 메인 노출)
content/ko.js       한국어 글자        content/en.js   영어 글자 (ko.js 와 같은 모양)
img/ (.webp만)  video/ (.mp4)  cv/ (.pdf)
docs/               규정 문서          tools/check-content.mjs   콘텐츠 검증
```

활동 하나 = 세 content 파일에 **같은 id** 로 나뉜 항목 + `img/` 의 파일. 주소는 `#a/id`.

## 꼭 지킬 것

1. **새 활동을 추가할 때 `index.html` 의 CSS · HTML · JavaScript 를 고치지 않습니다.** 고치는 것은 맨 아래 `?v=숫자` 세 곳뿐입니다.
2. 본문은 정해진 블록 19종으로만 씁니다 (`h` `h3` `lead` `p` `q` `note` `ul` `checks` `facts` `flow` `boxes` `stat` `cards` `cmp` `people` `roles` `cert` `files` `link`). 새 블록 · 새 색 · 새 글자 크기 · 새 구분을 만들지 않습니다. 필요하면 만들지 말고 제안합니다.
3. **한국어와 영어를 같은 커밋에서 같은 구조로** 씁니다. 영어 `summary` · `body` 가 없으면 영어 화면이 빕니다.
4. 유형(A 프로젝트 / B 기록 / C 간단 기록)을 먼저 정하고, 소제목은 유형 A · B 는 `{k:"01 · 이름", h:"문장형 제목."}`, 유형 C 는 번호 없이 1–2개. 마지막 소제목은 `돌아보며` / `Looking back`.
5. 요약 패널(`panel` 또는 `proj`)에는 `role` 을 반드시 쓰고 칸이 3개 이상 나오게 합니다. 날짜는 요약 패널 `PERIOD` 한 곳에만 나옵니다. 대표 활동(`projects` · `featured`)에는 핵심 요약 `glance`(문제 · 핵심 판단 · 결과)를 씁니다. 결과는 종류를 라벨로 밝히고(`resultLabel`), 기간 · 투입 시간 · 후원금을 결과 숫자(`key`)로 쓰지 않습니다.
6. `summary` 는 한국어 `~함.` / 영어 주어 없는 과거형, 본문은 `~습니다` 체. 팀의 일과 내 일을 구분해 씁니다.
7. **받지 않은 사실 · 숫자 · 사진을 만들어 넣지 않습니다.** 확인 안 된 값은 빼거나 `[확인 필요] …` 로 적고 보고합니다.
8. 사진은 `.webp`(긴 변 1400px · 250KB 이하), 이름은 `접두어_cover` / `접두어_01` / `접두어_slide_01` / `접두어_video_poster`. 다른 사람의 얼굴 · 주소 · 문서 번호가 보이면 올리지 않고 먼저 알립니다.
9. 요청이 없으면 메인 화면 노출(`common.js` 의 `projects` · `featured` · `archiveReps`)과 메인 문구를 바꾸지 않습니다. 새 활동은 활동 기록 목록과 개수에 자동으로 들어갑니다.
10. 색은 `var(--토큰)` 만, 화면이 달라지는 CSS 수정은 적용 전에 개선안으로 먼저 보고합니다.

## 명령

```bash
node tools/add-activity.mjs spec.json [--dry-run]   # 새 활동을 content/ 세 파일에 규칙대로 넣고 ?v= 갱신 · 검증 (실패 시 되돌림)
python3 tools/prep-photo.py --prefix 접두어 --cover a.jpg --shots b.jpg   # 사진 → img/ 규격 변환
node tools/check-content.mjs --id 활동id   # 그 활동의 결과만 (다른 활동의 알려진 경고 72건 가림). ERROR 0, WARN 0 이어야 함
node tools/check-content.mjs          # 전체 검증
python3 -m http.server 8000           # http://localhost:8000/#a/활동id 로 확인 (1440 · 820 · 390px, KO · EN, 어두운 화면)
sed -i "s/\.js?v=[0-9]*/.js?v=$(date +%s)/g" index.html   # content/ 를 고쳤으면 캐시 버전 올리기
```

## 마치고 보고할 것

추가 · 수정한 활동의 id · 구분 · 유형(정한 이유) / 고친 파일과 새 사진 목록 / `[확인 필요]` 로 남긴 값 / 메인 노출을 바꿨는지 / 검증 결과와 확인한 화면.
