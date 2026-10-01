/*
 * ESC_ 지금 우리 율전은 — 게임 소개 영상의 장면·자막·타이밍을 한곳에서 관리합니다.
 *
 * 수정 방법
 *  - 장면 길이: start / end (초, 영상 전체 기준)
 *  - 자막: subs 의 at(장면 시작 기준 초) · text · style
 *      text 안에서 {g:초록 강조} {r:빨강 강조} {y:노랑 강조}, 줄바꿈은 \n (한 번에 최대 두 줄)
 *      style: wood(나무 팻말) · dark(회색 대화창) · red(경고) · green(초록 대화창)
 *      speaker 를 넣으면 대화창 위에 화자 이름이 붙고, type: true 면 한 글자씩 나타납니다
 *  - beats: 화면 속 동작 시점(장면 시작 기준 초). 렌더러와 효과음이 같은 값을 씁니다
 *  - sfx: 효과음. at 에 숫자(초) 또는 beats 이름을 적습니다
 *  - dissolveOut: 장면 끝에서 픽셀 디졸브 전환 / xfade: 이전 장면과 겹쳐 서서히 바뀌는 시간(초)
 *  - music: 배경음악 구간. from/to 에 숫자(초) 또는 "장면id"(시작) · "장면id.end" · "장면id.beat이름"
 *  - sample: 랭킹·인증서 화면에 보이는 플레이 기록(예시 데이터)
 *
 * 값을 바꾼 뒤에는 README.md 의 순서대로 다시 렌더링하면 됩니다.
 */
const VIDEO = {
  fps: 30,
  width: 1920,
  height: 1080,
  duration: 85.4,

  scenes: [
    // ── A. 스토리 (Landing 문구 그대로) ─────────────────────────────
    {
      id: "peace", part: "A 스토리", start: 0, end: 3.0,
      subs: [{ at: [0.35, 2.85], text: "여느 때와 같이 평화로운\n{g:율전} 캠퍼스에", style: "wood" }],
      sfx: [],
    },
    {
      id: "zombie", part: "A 스토리", start: 3.0, end: 5.2,
      beats: { hit: 0.2 },
      subs: [{ at: [0.2, 2.05], text: "{r:좀비떼}가 나타났다?!", style: "red", slam: true }],
      sfx: [{ at: "hit", name: "sting" }, { at: 0.25, name: "thud" }],
    },
    {
      id: "bugs", part: "A 스토리", start: 5.2, end: 8.2, xfade: 0.25,
      subs: [
        { at: [0.15, 0.95], text: "(사각사각..)", style: "dark" },
        { at: [1.05, 2.9], text: "갑작스럽게 나타난\n의문의 {r:벌레}들과", style: "wood" },
      ],
      sfx: [{ at: 0.05, name: "scratch", dur: 1.0 }],
    },
    {
      id: "help", part: "A 스토리", start: 8.2, end: 11.6, xfade: 0.2,
      beats: { slam1: 0.2, slam2: 0.55, slam3: 0.9 },
      subs: [
        { at: [0.25, 1.5], text: "???: 살려줘..", style: "dark" },
        { at: [1.6, 3.3], text: "여기 {r:원숭이}가 이상해..", style: "dark" },
      ],
      sfx: [
        { at: "slam1", name: "thud" }, { at: "slam2", name: "thud" }, { at: "slam3", name: "thud" },
        { at: 0.25, name: "dialog" }, { at: 1.6, name: "dialog" },
      ],
    },
    {
      id: "danger", part: "A 스토리", start: 11.6, end: 13.6, xfade: 0.15,
      subs: [{ at: [0.15, 1.9], text: "위험에 빠진 연구원들!!", style: "red", slam: true }],
      sfx: [{ at: 0.0, name: "siren", dur: 1.95 }],
    },
    {
      id: "hero_needed", part: "A 스토리", start: 13.6, end: 15.8, xfade: 0.25,
      subs: [{ at: [0.25, 2.1], text: "율전을 지켜낼\n{g:영웅}이 필요하다!!", style: "wood", slam: true }],
      sfx: [{ at: 0.2, name: "rise" }],
    },
    {
      id: "heroes", part: "A 스토리", start: 15.8, end: 19.0,
      beats: { jumpL: 0.1, jumpR: 0.3, landL: 0.55, landR: 0.75 },
      subs: [{ at: [0.65, 3.1], text: "율웅이와 명웅이는 과연\n{g:율전}을 구할 수 있을 것인가?!!", style: "wood" }],
      sfx: [{ at: "jumpL", name: "jump" }, { at: "jumpR", name: "jump" }, { at: "landL", name: "land" }, { at: "landR", name: "land" }],
    },
    {
      id: "professor", part: "A 스토리", start: 19.0, end: 23.0, xfade: 0.25,
      beats: { sword: 2.0 },
      subs: [
        { at: [0.25, 1.9], text: "이봐.. 자네.. '{g:에브리타임}' 좀 치는가.?", style: "wood", speaker: "???", type: true },
        { at: [2.0, 3.9], text: "그렇다면 내가 {g:비밀 무기}를 알려주지..", style: "wood", speaker: "???", type: true },
      ],
      sfx: [{ at: 0.0, name: "whoosh" }, { at: "sword", name: "sparkle" }],
    },
    {
      id: "need_you", part: "A 스토리", start: 23.0, end: 25.4, xfade: 0.25, dissolveOut: true,
      beats: { button: 0.35, press: 1.75 },
      subs: [{ at: [0.2, 1.75], text: "{g:당신의 도움}이 필요합니다.", style: "dark" }],
      sfx: [{ at: "press", name: "click" }],
    },

    // ── B. 타이틀 ────────────────────────────────────────────────
    {
      id: "title", part: "B 타이틀", start: 25.4, end: 29.0, dissolveOut: true,
      beats: { logo: 0.25, sub: 1.0, info: 1.5 },
      subs: [],
      sfx: [{ at: "logo", name: "glitch" }, { at: 0.35, name: "boom" }, { at: "sub", name: "blip" }],
    },

    // ── C. 세계관 ────────────────────────────────────────────────
    {
      id: "select_hero", part: "C 세계관", start: 29.0, end: 32.8,
      beats: { header: 0.1, cardL: 0.25, cardR: 0.4, pickL: 0.9, pickR: 2.2 },
      subs: [{ at: [0.5, 3.7], text: "명륜의 영웅 {g:명웅이}, 율전의 영웅 {g:율웅이}\n둘 중 한 명이 되어 율전을 구한다", style: "wood" }],
      sfx: [{ at: "pickL", name: "select" }, { at: "pickR", name: "select" }],
    },
    {
      id: "mission", part: "C 세계관", start: 32.8, end: 36.6, xfade: 0.25,
      beats: { swap: 1.9, glint: 2.2 },
      subs: [{ at: [0.3, 3.7], text: "파티장 곳곳의 QR을 찾아 퀴즈를 풀고\n전설의 검 '{g:정보처리기사}'를 얻어라", style: "wood" }],
      sfx: [{ at: "swap", name: "swipe" }, { at: "glint", name: "sparkle" }],
    },
    {
      id: "concept", part: "C 세계관", start: 36.6, end: 40.4, xfade: 0.25, dissolveOut: true,
      beats: { row1: 0.3, row2: 0.85, row3: 1.4 },
      subs: [{ at: [0.45, 3.6], text: "할로윈 파티장을 돌아다니며 푸는\n율전 캠퍼스 밈 방탈출", style: "wood" }],
      sfx: [{ at: "row1", name: "flip" }, { at: "row2", name: "flip" }, { at: "row3", name: "flip" }],
      rows: [
        { left: "좀비 바이러스", right: "N센터 실험 원숭이 감염", note: "의문의 벌레와 버그 원숭이", icon: "monkey_bug1" },
        { left: "Trick or Treat", right: "\"trIC ON treat\"", note: "성균융합원 학생회 ICON 말장난", icon: "professor" },
        { left: "방탈출 단서", right: "파티장 곳곳의 QR코드", note: "스캔하면 코인 획득", icon: "qr" },
      ],
    },

    // ── D. 플레이 (Figma 디자인 기반 재현) ─────────────────────────────
    {
      id: "step1", part: "D 플레이", start: 40.4, end: 44.0,
      label: { step: "STEP 1", title: "로그인 & 영웅 선택" },
      beats: { typeStart: 0.2, typeEnd: 0.65, tapNext: 0.9, toSelect: 1.05, tapHero: 1.65, toPicked: 1.75, tapDone: 2.55, toAfter: 2.7 },
      subs: [{ at: [0.2, 3.45], text: "닉네임으로 로그인하고\n함께할 영웅을 고른다", style: "wood" }],
      sfx: [{ at: "typeStart", name: "typing", dur: 0.45 }, { at: "tapNext", name: "tap" }, { at: "tapHero", name: "select" }, { at: "tapDone", name: "tap" }],
    },
    {
      id: "step2", part: "D 플레이", start: 44.0, end: 47.6, xfade: 0.15,
      label: { step: "STEP 2", title: "파티장에서 QR 찾기" },
      beats: { pins: 0.25, toScan: 1.35, lock: 1.95, scan: 2.2, toCoin: 2.35 },
      subs: [{ at: [0.2, 3.45], text: "할로윈 파티장 곳곳에 숨은\nQR코드를 찾아 스캔한다", style: "wood" }],
      sfx: [{ at: "pins", name: "blip" }, { at: "toScan", name: "swipe" }, { at: "scan", name: "scan" }, { at: "toCoin", name: "coin" }],
    },
    {
      id: "stage1", part: "D 플레이", start: 47.6, end: 54.6, xfade: 0.15,
      label: { step: "STEP 3", title: "STAGE 1 · 지관" },
      beats: { story2: 0.75, toQuiz: 1.45, zoomIn: 1.55, tapWrong: 2.45, toWrong: 2.6, back: 3.45, tapRight: 3.8, toRight: 3.95, toItem: 4.65, slot: 5.55, toEquip: 5.65, toProgress: 6.45 },
      subs: [
        { at: [0.2, 2.45], text: "연구생이 사는 기숙사는?", style: "wood" },
        { at: [2.55, 6.85], text: "틀리면 힌트, 맞히면\n'{g:완전한 방호복}' 획득!", style: "wood" },
      ],
      sfx: [
        { at: "story2", name: "dialog" }, { at: "toQuiz", name: "swipe" },
        { at: "tapWrong", name: "tap" }, { at: "toWrong", name: "wrong" },
        { at: "tapRight", name: "tap" }, { at: "toRight", name: "correct" },
        { at: "toItem", name: "itemget" }, { at: "slot", name: "slot" }, { at: "toEquip", name: "equip" }, { at: "toProgress", name: "blip" },
      ],
    },
    {
      id: "stage2", part: "D 플레이", start: 54.6, end: 58.4, xfade: 0.15,
      label: { step: "STEP 3", title: "STAGE 2 · 만화동아리" },
      beats: { toPhone: 0.5, msg1: 0.6, msg2: 0.8, msg3: 1.0, toInput: 1.3, typeStart: 1.4, typeEnd: 1.8, tapSubmit: 1.95, toFilled: 2.05, toItem: 2.3, slot: 3.25, toEquip: 3.35 },
      subs: [{ at: [0.2, 3.65], text: "만화동아리 오타쿠의 문자,\n빈칸을 채우면 '{g:방독면 마스크}'", style: "wood" }],
      sfx: [
        { at: "msg1", name: "message" }, { at: "msg2", name: "message" }, { at: "msg3", name: "message" },
        { at: "typeStart", name: "typing", dur: 0.4 }, { at: "tapSubmit", name: "tap" }, { at: "toFilled", name: "correct" },
        { at: "toItem", name: "itemget" }, { at: "slot", name: "slot" }, { at: "toEquip", name: "equip" },
      ],
    },
    {
      id: "stage3", part: "D 플레이", start: 58.4, end: 61.6, xfade: 0.15,
      label: { step: "STEP 3", title: "STAGE 3 · 출석 체크" },
      beats: { toInput: 0.7, tapSubmit: 1.4, toItem: 1.55, slot: 2.45 },
      subs: [{ at: [0.2, 3.05], text: "출석 체크를 마쳐야 대피하는 교수님,\n보상은 '{g:무적 단풍 방패}'", style: "wood" }],
      sfx: [{ at: 0.0, name: "dialog" }, { at: "toInput", name: "swipe" }, { at: "tapSubmit", name: "tap" }, { at: "toItem", name: "itemget" }, { at: "slot", name: "slot" }],
    },
    {
      id: "stage45", part: "D 플레이", start: 61.6, end: 65.4, xfade: 0.15,
      label: { step: "STEP 3", title: "STAGE 4 · 5" },
      beats: { slot4: 0.5, toInput: 0.85, typeStart: 0.95, typeEnd: 1.35, tapSubmit: 1.5, toCorrect: 1.6, toItem: 2.2, slot5: 3.1, toAll: 3.25 },
      subs: [{ at: [0.2, 3.65], text: "'{g:성하예프}' 빈칸까지 채우면\n다섯 가지 아이템 완성!", style: "wood" }],
      sfx: [
        { at: 0.05, name: "itemget" }, { at: "slot4", name: "slot" }, { at: "toInput", name: "swipe" },
        { at: "typeStart", name: "typing", dur: 0.4 }, { at: "tapSubmit", name: "tap" }, { at: "toCorrect", name: "correct" },
        { at: "toItem", name: "itemget" }, { at: "slot5", name: "slot" }, { at: "toAll", name: "fanfare_small" },
      ],
    },
    {
      id: "mainscreens", part: "D 플레이", start: 65.4, end: 68.4, xfade: 0.2,
      beats: { p1: 0.05, p2: 0.22, p3: 0.4 },
      subs: [{ at: [0.3, 2.85], text: "진행할수록 메인 화면도\n율전의 상황에 따라 바뀐다", style: "wood" }],
      sfx: [{ at: "p1", name: "whoosh" }, { at: "p2", name: "whoosh" }, { at: "p3", name: "whoosh" }],
      phones: [
        { screen: "main_light", label: "시작 전" },
        { screen: "main_dark", label: "진행 중" },
        { screen: "main_clear", label: "클리어" },
      ],
    },
    {
      id: "final", part: "D 플레이", start: 68.4, end: 74.0, xfade: 0.2, dissolveOut: true,
      label: { step: "STEP 4", title: "최종 미션" },
      beats: { toRule: 0.85, toPlay: 1.8, hit1: 2.3, hit2: 2.8, hit3: 3.3, clear: 3.8 },
      subs: [
        { at: [0.2, 1.75], text: "최종 미션: 버그 원숭이를 처치하라!", style: "red" },
        { at: [1.85, 3.75], text: "단, 귀여운 원숭이는\n공격하면 안 된다", style: "wood" },
      ],
      sfx: [
        { at: "toRule", name: "dialog" }, { at: "toPlay", name: "swipe" },
        { at: "hit1", name: "slash" }, { at: "hit2", name: "slash" }, { at: "hit3", name: "slash" },
        { at: "clear", name: "fanfare" },
      ],
    },

    // ── E. 엔딩 ──────────────────────────────────────────────────
    {
      id: "peace_again", part: "E 엔딩", start: 74.0, end: 77.6,
      beats: { bright0: 0.05, bright1: 1.1, m1: 0.75, m2: 0.9, m3: 1.05 },
      subs: [{ at: [0.5, 3.45], text: "율전은 '{g:미르미}' 덕분에\n다시 평화로워졌습니다", style: "green" }],
      sfx: [{ at: 0.1, name: "brighten" }],
    },
    {
      id: "certificate", part: "E 엔딩", start: 77.6, end: 81.4, xfade: 0.25,
      beats: { cert: 0.1, rank: 1.4 },
      subs: [{ at: [0.3, 3.65], text: "클리어하면 용사 인증서와\n실시간 랭킹에 이름이 남는다", style: "wood" }],
      sfx: [{ at: "cert", name: "whoosh" }, { at: 0.6, name: "firework" }, { at: "rank", name: "whoosh" }, { at: 2.0, name: "firework" }],
    },
    {
      id: "party", part: "E 엔딩", start: 81.4, end: 85.4, xfade: 0.25,
      beats: { sign: 0.1, logo: 1.6, fadeOut: 3.1 },
      subs: [],
      sfx: [{ at: 0.4, name: "firework" }, { at: 1.1, name: "firework" }, { at: "logo", name: "blip" }],
    },
  ],

  // 아이템 슬롯: 어느 장면의 어떤 beat 에 몇 번째 칸이 채워지는지
  items: [
    { key: "item_suit", scene: "stage1", beat: "slot" },
    { key: "item_mask", scene: "stage2", beat: "slot" },
    { key: "item_shield", scene: "stage3", beat: "slot" },
    { key: "item_flashlight", scene: "stage45", beat: "slot4" },
    { key: "item_radio", scene: "stage45", beat: "slot5" },
  ],

  // 랭킹·인증서·메인 클리어 화면에 보이는 플레이 기록 (예시 데이터, 실제 기록 아님)
  sample: {
    player: "미르미",
    clearTime: "31:20",
    rank: "101위",
    date: "2024.10.31",
    ranking: [
      { name: "율전다람쥐", stage: 7, time: "18:42" },
      { name: "학식헌터", stage: 7, time: "21:07" },
      { name: "디도지박령", stage: 7, time: "23:35" },
      { name: "자과캠냥이", stage: 7, time: "25:12" },
      { name: "솦밤러버", stage: 7, time: "26:58" },
      { name: "N센터숭이", stage: 7, time: "28:16" },
      { name: "킹고팬", stage: 7, time: "29:41" },
    ],
  },

  // 배경음악 구간. cue 이름은 tools/synth.py 의 테마 이름
  music: [
    { from: 0, to: "zombie.hit", cue: "peace" },
    { from: "zombie.hit", to: "help.end", cue: "creep" },
    { from: "danger", to: "danger.end", cue: "alarm" },
    { from: "hero_needed", to: "heroes.end", cue: "hero", split: "heroes" },
    { from: "professor", to: "professor.end", cue: "mystery" },
    { from: "need_you", to: "title.logo", cue: "drone" },
    { from: "title.logo", to: "concept.end", cue: "theme" },
    { from: "step1", to: "mainscreens.end", cue: "play" },
    { from: "final", to: "final.end", cue: "boss" },
    { from: "peace_again", to: "party.end", cue: "ending" },
  ],
};

if (typeof module !== "undefined") module.exports = VIDEO;
