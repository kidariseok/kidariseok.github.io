# Masaryk University 교환학생 선정 후기 — 모션그래픽 영상 제작 파일

최종 영상: [`../video/masaryk-exchange-2027.mp4`](../video/masaryk-exchange-2027.mp4) · 1920×1080 · 30fps · **9:27**

음성은 Gemini 3.8 Flash TTS로 만들었고, 모션그래픽은 이 폴더의 HTML/SVG 코드를 프레임 단위로 렌더링했습니다.

> 다음 영상을 만들기 전에 [`PLAYBOOK.md`](PLAYBOOK.md)를 먼저 읽어 주세요. 이번 작업에서 어려웠던 점, 대본에 없는 소리 처리 규칙, API 비용을 줄이는 방법을 정리했습니다.
작업 순서는 지침의 STEP 1–10을 그대로 따랐습니다. **음성을 먼저 만들고 실제 길이를 잰 다음, 그 길이에 맞춰 타임라인과 모션을 배치했습니다.**

---

## 영상 길이: 목표 5:40 → 실제 9:27

대본 내레이션은 약 3,500음절입니다. 5:40에 맞추려면 초당 10음절 이상으로 읽어야 하는데,
이는 차분한 한국어 내레이션 속도(초당 6–7음절)보다 훨씬 빠릅니다.
지침의 우선순위(배속 금지, 실제 TTS 길이를 기준으로 타임라인 구성, 음성의 자연스러움 우선)에 따라
**대본은 자르지 않았고 음성 속도도 바꾸지 않았습니다.** 그래서 영상 길이는 실제 음성에 맞춰 9:27이 되었습니다.

5:40 버전이 필요하면 대본을 약 40% 줄여야 합니다(Scene 04·05·10이 가장 깁니다).
`script/segments.py`에서 해당 문장만 고친 뒤 그 장면만 다시 생성하면 됩니다(아래 "다시 만들기" 참고).

---

## 1. 대본 분석과 의미 단위 분리 (STEP 1–3)

`script/segments.py`가 기준 파일입니다. 11개 장면, 171개의 호흡 단위로 나눴고, 단위마다 아래 세 가지를 따로 관리합니다.

| 항목 | 내용 |
|---|---|
| **Narration** (`tts`) | 실제로 읽는 문장. 숫자와 고유명사는 TTS용으로만 한글 표기 |
| **Pause** (`pause`) | 문장 **뒤** 휴지. `C` 쉼표 · `S` 0.15–0.34s · `M` 0.42–0.70s · `L` 0.85–1.20s · `X` ~1.25s(결과 발표) · `P` 정보 구간의 문단 전환(~0.75s) · `Q` 긴 휴지지만 TTS에는 medium 태그만 전달 |
| **Motion cue** (`cues`) | `{큐 이름: (발화 단어, 화면 이벤트)}`. 해당 단어가 **실제로 발화되는 순간**에 이벤트가 시작됨 |

### 발음 유도 (TTS 입력에만 적용, 화면에는 원래 표기 사용)

| 화면 표기 | TTS 입력 |
|---|---|
| Masaryk University | 마사릭 유니버시티 (영상 전체에서 동일) |
| IELTS 8.0 / 4.33 | 아이엘츠 팔 점 영 / 사 점 삼삼 |
| 218개 / 24학번 / 1지망 | 이백십팔 개 / 이사 학번 / 일 지망 |
| 10명 → 1명 / 2명 / 6명 | 열 명 → 한 명 / 두 명 / 여섯 명 |
| 2027년 1학기 / 2026년 10월 | 이천이십칠 년 일 학기 / 이천이십육 년 시월 |
| Vrije Universiteit Amsterdam | 브레이어 유니버시테이트 암스테르담 |
| IE University / LMU / QS Ranking | 아이이 유니버시티 / 엘엠유 / 큐에스 랭킹 |
| Frankfurt University of Applied Sciences | 프랑크푸르트 유니버시티 오브 어플라이드 사이언스 |
| Academic Calendar / Sheffield / Brno | 아카데믹 캘린더 / 셰필드 / 브르노 |

## 2. 음성 생성 (STEP 4)

- **모든 장면에 같은 설정**을 썼습니다: `gemini-3.8-flash-tts`, 보이스 **Iapetus**, `languageCode: ko-KR`, temperature 1.0, 같은 스타일 지시문(`speechMetadata.style`).
- 보이스 선정: 남성 보이스 16개로 같은 문단을 생성하고 Gemini 청취 평가를 세 번 거쳤습니다. 감정 장면과 정보가 많은 장면에서 모두 1위를 한 Iapetus를 골랐습니다.
- 장면은 **장면마다 TTS 요청 한 번**(장면 안의 모든 문장을 한 번에 생성)으로 만들었습니다. 그래서 장면 안에서는 문장 사이 목소리가 끊기지 않습니다. 파일은 장면별로 11개입니다.
- 장면마다 테이크를 3–5개(seed 변경) 생성했습니다. 그다음 영상 전체 기준값(음높이 123 Hz, 조음 속도 초당 6.48음절)에 가장 가깝고, 핵심 문장(탈락 / 그리고 결국 / 합격 …)이 빨라지지 않은 테이크를 골랐습니다. 선택 기준은 `tools/select_takes.py`에 있습니다.

## 3. 측정 → 휴지 보정 → 타임라인 (STEP 5–6)

`tools/process_audio.py`
1. Gemini Transcribe의 단어 단위 타임스탬프로 대본 글자와 음성 시간을 맞췄습니다(정렬률 0.96–1.00).
2. TTS가 스스로 넣은 군더더기 발화('음')와 **휴지 태그를 소리 내어 읽은 부분**('미디엄 포즈' 등)은 음소거했습니다. 태그 발화는 두 경로로 찾습니다. 전사에 태그 단어가 잡힌 경우가 하나, 전사에는 없지만 문장과 문장 사이에 따로 떨어진 유성음 덩어리가 있는 경우가 다른 하나입니다. 숨소리(무성음)는 남겼습니다. **찾은 소리는 사용자가 승인한 것(`audio/cuts_approved.json`)만 지웁니다.** 승인되지 않은 것은 `ASK USER`로 출력하고 음성에 그대로 둡니다.
3. 문장 사이 무음만 길이를 조정해 S/M/L 범위에 맞췄습니다. **말소리 자체는 늘이거나 줄이지 않았습니다(배속 0%).**
4. 장면별 음량을 −18 LUFS로 맞췄습니다.

`tools/build_timeline.py`: 장면 길이 = 앞 여백(lead) + 실제 음성 길이 + 뒤 여백(tail). 결과는 `script/sync_sheet.md`에 정리했습니다.

## 4. 모션그래픽 (STEP 7)

- `motion/index.html` + `lib.js`(시간 함수 기반 애니메이션) + `components.js`(지도·학사일정·카드·체크리스트·게이지) + `scenes_a/b/c.js`
- 모든 화면 상태는 시간 `t`만으로 결정됩니다. 그래서 `seek(t)`로 어느 프레임이든 정확히 렌더링할 수 있습니다(`render/render.mjs`).
- 전환은 4가지만 반복해서 썼습니다: **지도 카메라 이동**, **카드 슬라이드(push)**, **MUNI 블루 와이프**(장면 테마가 바뀔 때), **디졸브**(감정 장면). Scene 05→06은 끊김 없이 이어집니다.
- 디자인: Modern / Editorial. 종이색(#F3F0E9)과 잉크색(#0A0C11) 바탕에 Masaryk 공식 블루(#0000DC)를 포인트로 썼습니다. 서체는 Pretendard, Instrument Serif, JetBrains Mono입니다.

## 5. 검수 결과 (STEP 8–10)

### 음성 연속성 (선택된 테이크)

| Scene | Take | 길이 | F0 중앙값 | 음높이 차 | 조음 속도 | 속도 차 | 청취 검수 (원어민/자연스러움/속도) |
|---|---|---|---|---|---|---|---|
| S01 OPENING | t11 | 34.9s | 125 Hz | +0.26 st | 6.49 | +0.2% | 10 / 10 / 10 |
| S02 MY SITUATION | t23 | 39.9s | 136 Hz | +1.65 st | 6.32 | −2.5% | 10 / 10 / 10 |
| S03 WHAT DO I WANT? | t47 | 30.7s | 134 Hz | +1.44 st | 6.26 | −3.4% | 10 / 10 / 10 |
| S04 MY 6 CRITERIA | t31 | 112.9s | 122 Hz | −0.13 st | 6.59 | +1.7% | 10 / 8 / 8 ※ |
| S05 THE SCHOOL HUNT | t7 | 85.1s | 130 Hz | +0.94 st | 6.32 | −2.5% | 10 / 9 / 10 |
| S06 BACK TO MASARYK | t47 | 35.9s | 120 Hz | −0.44 st | 6.54 | +0.9% | 10 / 9 / 9 ※ |
| S07 DEEP DIVE | t7 | 30.1s | 116 Hz | −1.09 st | 6.34 | −2.2% | 10 / 10 / 10 |
| S08 APPLICATION | q11 | 34.9s | 122 Hz | −0.17 st | 6.33 | −2.3% | 10 / 10 / 10 |
| S09 THE RESULT | t23 | 24.2s | 123 Hz | ±0.00 st | 6.46 | −0.3% | 10 / 10 / 10 |
| S10 TWO TIPS | t7 | 73.2s | 126 Hz | +0.31 st | 6.77 | +4.5% | 10 / 10 / 10 |
| S11 CLOSING | t7 | 34.6s | 124 Hz | +0.10 st | 6.07 | −6.3% | 10 / 10 / 10 |

- 청취 검수에는 `tools/audio_review.py`(Gemini 3.1 Pro 오디오 평가)를 썼습니다.
  - S05에서 지적된 'Universiteit' 발음은 네덜란드어 원음([-teit])에 가까워서 그대로 두었습니다.
  - ※ S04·S06 점수는 아래 태그 발화를 지우기 전 음성 기준입니다.
- 수정한 문제
  - **휴지 태그 발화 6곳 제거(재생성 없음).** TTS가 `[medium pause]`, `[long pause]` 태그를 소리 내어 읽은 곳이 6군데 있었습니다. 모두 앞뒤 문장과 0.8초 이상 떨어진 0.5–0.7초짜리 발화라, 그 소리만 지우고 쉼 길이를 다시 맞췄습니다(완성 영상 기준 시각은 수정 전 영상 기준).
    - S04(전사에 안 잡힘, 웅얼거리는 유성음): 2:30.0 "비교했습니다." 뒤, 2:44.2 "선호했습니다." 뒤, 3:18.6 "찾았습니다." 뒤. 1차 검수에서 "부자연스러운 긴 휴지"로 지적된 바로 그 지점들입니다. 그때는 휴지 길이 문제로 잘못 판단했습니다.
    - S06(전사에 "미디엄 포즈"로 잡힘): 5:36.6 "무엇보다" 뒤, 5:43.3 "합격 가능성까지" 뒤, 5:52.5 "깨달았습니다." 뒤
  - S08: `[long pause]` 태그 위치마다 TTS가 연기한 한숨이 들어갔습니다. 태그를 medium으로 바꿔 다시 생성하고 휴지 길이는 후처리로 맞췄습니다.
  - S01·S04·S06: 대본에 없는 '음' 소리를 자동으로 제거했습니다.

### 화면–음성 싱크

`tools/sync_check.py`는 핵심 큐 21개(218, 4.33, 8.0, 10→1, 탈락, 2명/6명, 그리고…, 합격, 2027-1, Let's go …)를 검사합니다. 큐 시점부터 1.1초를 잘라 전사했을 때 해당 키워드로 시작하는지 확인하고, 결과는 **21/21 일치**입니다.

### 오디오 믹스

`tools/mix.py`의 구성은 아래와 같습니다.
- 내레이션 + Lyria 3.5로 만든 음악 큐 5개(같은 악기, D장조, 84 BPM)
- 말할 때는 음악을 −6 dB로 낮추는 덕킹
- 최종 −16 LUFS, 피크 −1.4 dBFS
- 음악은 Scene 09의 "그리고…" 직전에 빠지고, "합격." 직후에 따뜻한 큐로 다시 들어옵니다. 마지막 화음은 "LET'S GO MASARYK!" 아래에서 울립니다.

## 다시 만들기

```bash
export GEMINI_API_KEY=...               # 키는 저장소에 넣지 않습니다
python script/segments.py               # 대본 수정 후
python tools/tts_generate.py s05 --seed 7 --tag t7       # 장면 하나만 다시 생성
python tools/process_audio.py s05:t7                    # 측정·정렬·휴지 보정
python tools/select_takes.py && python tools/build_timeline.py && python tools/mix.py
npm install && node tools/build_map.mjs
node render/preview.mjs /tmp/prev s05@seats1+0.5        # 특정 큐 시점 미리보기
node render/render.mjs /tmp/out --workers 4             # 전체 프레임 렌더
bash tools/finalize.sh /tmp/out/video.mp4               # 오디오 합성·최종 인코딩
```

Python 패키지: `numpy scipy soundfile requests praat-parselmouth pyloudnorm`

## 자료 출처

- 지도: Natural Earth (world-atlas, public domain)
- Masaryk University 로고: 공식 논문 템플릿 [fithesis](https://github.com/witiko/fithesis)의 EPS를 SVG로 변환. 상표권은 Masaryk University에 있습니다.
- SKKU 로고: 이 저장소의 `img/skku.png`
- 서체: Pretendard, Instrument Serif, JetBrains Mono (모두 SIL OFL)
- 음악: Lyria 3.5 (Gemini API)로 생성
- 영상 속 브라우저와 휴대폰 화면, 비용 비교 막대는 설명을 위한 일러스트입니다. 실제 화면 캡처나 실측 데이터가 아닙니다.
- 지도에 표시한 거리(km)는 브르노에서의 직선거리를 계산한 값입니다.
