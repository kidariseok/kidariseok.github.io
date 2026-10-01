# ESC_ 지금 우리 율전은 — 게임 소개 영상

`final.mp4` · 1920×1080 · 30fps · 2분 · H.264 + AAC

| 파일 | 내용 |
|---|---|
| `final.mp4` | 완성본 |
| `storyboard.md` | 장면별 시간 · 화면 · 자막 · 소리 · 전환 (승인본 v3) |
| `sources.md` | 사용한 에셋 · 폰트 · BGM 출처와 라이선스 |
| `research.md` | Figma 조사 정리 |
| **`scenes.js`** | **장면 텍스트와 타이밍을 관리하는 단 하나의 파일** |
| `renderer.js`, `index.html` | 장면을 그리는 HTML 렌더러 |
| `tools/` | 에셋 전처리, 효과음 표 생성, 칩튠 합성, 프레임 렌더링 |
| `assets/` | Figma에서 받은 레이어·화면(1x)과 전처리 결과(`gen/`) |

## 자막·타이밍 고치기

`scenes.js`만 고치면 됩니다.

- 자막 문구: 각 장면의 `subs[].text` (`{g:초록}` `{r:빨강}` 강조, `\n` 줄바꿈, 한 번에 두 줄 이하)
- 자막 표시 시간: `subs[].at` = [시작, 끝] (장면 시작 기준 초)
- 장면 길이: `start`, `end` (영상 전체 기준 초). 길이를 바꾸면 뒤 장면의 `start`/`end`도 같이 옮겨 주세요
- 화면 속 동작과 효과음 시점: `beats` (효과음 `sfx`가 같은 이름을 참조하므로 함께 움직입니다)
- 배경음악 구간: `music`

## 다시 렌더링하기

```bash
cd video/esc-yuljeon
npm install                      # playwright-core, galmuri (처음 한 번)
pip install pillow numpy         # 처음 한 번
python3 tools/prep_assets.py     # assets/gen 재생성 (레이어를 바꿨을 때만)

npm run audio                    # scenes.js → build/timeline.json → build/audio.wav
npm run frames                   # 3,600프레임 렌더링 → build/video.mp4 (4코어 기준 약 10분)
npm run mux                      # 영상 + 소리 → final.mp4
```

- 크로미움 경로가 다르면 `CHROME=/path/to/chrome npm run frames`
- 특정 시각만 확인: `node tools/render.mjs --stills 12,40.5` → `build/stills/`
- 브라우저 미리보기: `python3 -m http.server` 실행 후 `http://localhost:8000/index.html?play` (실시간, 소리 없음) 또는 `?t=40.5` (그 시각 정지)
