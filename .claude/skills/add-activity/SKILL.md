---
name: add-activity
description: 포트폴리오에 새 활동 · 프로젝트를 추가한다. 사용자가 활동 정보(글 · 사진 · 영상 링크 · 소감)를 주거나 입력 양식의 JSON 을 붙여 넣으면 쓴다. content/ 파일이나 docs/ 를 읽지 않고 스크립트로 넣는다.
---

# /add-activity — 새 활동 추가

**읽지 말 것:** `content/ko.js` · `en.js`(수백 KB), `docs/`, `index.html`. 스크립트가 규칙을 적용한다. 스크립트가 알 수 없는 이유로 실패하거나 사용자가 규정을 물을 때만 `docs/NEW_ACTIVITY_CHECKLIST.md` 를 연다.

## 1. 입력 만들기
- 사용자가 양식 JSON(`spec`)을 붙였으면 그대로 쓴다 (입력 양식 아티팩트: https://claude.ai/artifact/5gasmP6SzDqJG5b7iNnFu5 · 원본 `tools/templates/activity-form.html`). `_photos_attached` 가 있으면 사진이 채팅에 첨부된 것이므로 2번을 한다.
- 글로 받았으면 `tools/templates/activity.spec.json` 을 **복사**해(저장소 밖 작업 폴더에) 채운다. 본문 블록 모양은 `tools/templates/BLOCKS.md` 한 장.
- **한국어와 영어를 같이 쓴다.** 영어가 없으면 한국어를 바탕으로 쓰되 고유 이름의 영문 표기를 모르면 `[확인 필요] …` 로 남긴다.
- 받지 않은 사실 · 숫자를 지어내지 않는다. 모르면 칸을 비우거나 `[확인 필요]` 로 적는다.
- 팀원 실명은 쓰지 않는다(역할 · 인원수만). 본문 `~습니다`, 한국어 summary `~함.`
- 구분(category) · 유형(A 프로젝트 / B 기록 / C 간단)을 말해 주지 않았으면 '내가 주로 한 일'로 정하고 보고에 이유를 적는다.
- 영상은 YouTube 주소만 `video` 에 넣는다.
- 메인 화면 노출(`featured` · `projects` · `archiveReps`)은 요청이 없으면 건드리지 않는다. 발표자료(`deck`)는 이 스크립트가 지원하지 않으므로 필요하면 사용자에게 알린다.

## 2. 사진 (있을 때만)
1. 첨부된 사진을 **직접 보고** 다른 사람의 얼굴 · 이름 · 주소 · 번호가 있는지 확인한다. 있으면 올리지 말고 먼저 알린다.
2. `python3 tools/prep-photo.py --prefix <영문_접두어> --cover 표지 --shots 사진1 사진2 …` (1400px · 250KB · webp · 이름 규칙 자동). 출력된 `photos` JSON 을 spec 에 붙이고 `"privacy_checked": true` 를 넣는다.

## 3. 넣기
```bash
node tools/add-activity.mjs <spec.json> --dry-run   # 계획만 확인
node tools/add-activity.mjs <spec.json>             # 넣고 검증. 새 오류나 경고가 있으면 자동으로 되돌림
```
출력의 메시지대로 spec 을 고쳐 다시 실행한다. (되돌려져도 2번의 사진은 `img/` 에 남는다. 사진을 다시 만들 때 "이미 있습니다" 가 나오면 `--force` 를 쓰거나 있는 파일 이름을 그대로 쓴다.) 성공하면 `?v=` 갱신과 `check-content --id` 검증이 이미 끝난 것이다.

## 4. 마치기
- 사진이 있거나 사용자가 요청하면 `python3 -m http.server 8000` 으로 `#a/<id>` 를 한국어 · 영어, 1440 · 390px 에서 본다(가로 스크롤 없음).
- 세션 브랜치에 커밋 · 푸시한다. 요청이 없으면 PR 은 열지 않는다.
- 보고: id · 구분 · 유형(정한 이유) / 고친 파일과 새 사진 / `[확인 필요]` 목록 / 메인 노출 변경 없음 / 검증 결과.
