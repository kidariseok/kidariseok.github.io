# SHOWREEL 2026

15초 쇼릴 · 1920×1080 · 60fps · 사운드 포함 → **[showreel.mp4](showreel.mp4)**

이력서나 메일에는 `https://kidariseok.github.io/showreel/showreel.mp4` 를 바로 링크하면 됩니다.
`https://kidariseok.github.io/showreel/` 을 열면 같은 영상이 브라우저에서 실시간으로 재생됩니다 (클릭 또는 스페이스로 재생, ← → 로 한 박자씩 이동).

## 구성

브랜드 문장 **"Connector — 사람, 기술, 아이디어를 잇는다"** 를 그대로 화면 장치로 옮겼습니다.
파란 점 하나가 선이 되고, 그 선이 활동들을 이어 가다가, 마지막에 다시 점으로 돌아와 이름을 띄웁니다.

음악은 128 BPM이고, 32박이 정확히 15초입니다. 모든 컷과 등장은 박자 위에 놓여 있습니다.

| 박자 | 시간 | 장면 | 내용 |
| --- | --- | --- | --- |
| 0–8 | 0.0–3.8s | 01 CONNECTING | 점 → 선 → *Connecting* · TECHNOLOGY / IDEAS / INDUSTRY / PEOPLE (글자 안에 활동 사진) → **P의 세로획 속으로 들어가** 다음 장면의 사진이 됨 |
| 8–16 | 3.8–7.5s | 02 WORK | 카메라가 빠지며 사진이 카드가 되고, 파란 실이 KT&G 해외봉사 → RE:ALThon → 2GATHER → 지금 우리 율전은을 차례로 잇다가 전체 네트워크를 보여 줌 |
| 16–20 | 7.5–9.4s | 03 RECORD | 파란 화면, 8분음표마다 숫자가 굴러 들어옴: 활동 20 · 봉사 212h · GPA 4.33 · IELTS 8.0 → 셔터처럼 갈라지며 퇴장 |
| 20–24 | 9.4–11.3s | 04 ARCHIVE | 활동 사진 40장 모자이크, 실이 지나간 칸만 색이 살아남 · **PLAN. BUILD. CONNECT.** → 모든 칸이 마지막 마침표로 빨려 들어감 |
| 24–28 | 11.3–13.1s | 05 VISION | 마침표가 세 꼭짓점(기술 · 사람 · 산업)으로 갈라짐 · *Connecting* technology, people, and industry. / 기술과 사람, 산업을 연결합니다. |
| 28–32 | 13.1–15.0s | 06 CONTACT | JINSEOK OH (글자 폭이 좁았다가 넓어지며 올라옴) · Connector · kidariseok.github.io |

쓰인 숫자와 문장은 모두 사이트의 `content/` 에 있는 내용 그대로입니다.

## 파일

| 파일 | 내용 |
| --- | --- |
| `showreel.mp4` | 완성 영상 (H.264 + AAC) |
| `poster.jpg` | 마지막 장면 썸네일 |
| `index.html` | 영상 자체. 모든 장면이 `renderFrame(t)` 하나로 그려져서, 같은 시간에는 항상 같은 그림이 나옵니다 |
| `make_audio.py` | 사운드트랙을 numpy로 직접 합성 (킥 · 베이스 · 패드 · 효과음, Am → C) |
| `render.mjs` | Chromium으로 프레임을 한 장씩 캡처 |
| `build.sh` | 위 셋을 이어서 `showreel.mp4` 를 다시 만듦 |
| `fonts/` | Archivo(가변 폭) · Playfair Display Italic · JetBrains Mono · Noto Sans KR — 사이트와 같은 계열, 오프라인 렌더용 |

## 다시 만들기

```bash
./showreel/build.sh        # node + playwright, python3 + numpy, ffmpeg 필요 (약 10–15분)
```

문구를 바꾸려면 `index.html` 의 `WORDS`, `CARDS`, `STATS`, `BIG` 배열을, 박자를 바꾸려면 각 항목의 `at`(박자 번호)을 고치면 됩니다.
소리 쪽 타이밍은 `make_audio.py` 에 같은 박자 번호로 적혀 있습니다.
