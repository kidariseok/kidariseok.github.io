/* ══════════════════════════════════════════════════════════════
   공통 데이터 파일  ◀ 언어와 상관없는 값 (날짜 · 사진 · 금액 · 숫자 · 노션 주소)
   ──────────────────────────────────────────────────────────────
   글자(제목·설명)는 ko.js / en.js 에 있습니다. 여기서는 'id' 로 서로 연결됩니다.
   예) 활동을 하나 추가하려면
       1) 아래 activities 에 {id:"새주소", start:"2026-10-01", category:"project", notion:""} 추가
          (end 는 끝나는 날짜. 하루짜리면 빼세요.
           category 는 project / community / edu / learn 중 하나 (아래 categories 참고)
           video 에 유튜브 주소를 넣으면 상세 페이지 제목 아래 '활동 영상' 버튼이 생김)
       2) ko.js 와 en.js 의 activities 에 같은 id 로 title · summary · body 추가
       3) 사진이 있으면 img/ 에 넣고 아래 photos 에 id 로 등록
   · activities 는 날짜가 늦은 것부터 위에서 아래로 적습니다.
   · tiles 는 숫자 모음입니다. '이력' 섹션(학점 · 국제학교 · 봉사)이 여기 값을 씁니다. "auto" 는 자동 계산(봉사시간).
     첫 화면에는 숫자 상자를 두지 않고, 숫자는 맥락이 있는 곳에서 보여 줍니다 (후원 금액 → RE:ALThon 카드, 나머지 → 이력).
   · featured 는 'SELECTED WORK'의 '대표 활동' 검은 카드로 보여 줄 activities 의 id 4개입니다 (사진이 있으면 카드 오른쪽에 나옴).
   · 상세 페이지 맨 위 요약 패널의 글자는 ko.js / en.js 활동의 panel (프로젝트는 proj) 에 있습니다.
   ══════════════════════════════════════════════════════════════ */
window.SITE = window.SITE || {};
SITE.common = {
  notion: "https://app.notion.com/p/",
  featured: ["realthon", "gdsc", "ktng-overseas", "edutech-expo"],
  // 'SELECTED WORK'의 '프로젝트' 카드로 보여 줄 개발 프로젝트의 activities id (순서대로). 카드 · 상세 요약 패널의 글자는 ko/en.js 의 activities[id].proj
  projects: ["line4", "goormthon"],
  // '활동 기록(ACTIVITY ARCHIVE)'에서 구분마다 처음 한 장씩 보여 줄 대표 활동 (구분당 하나, 위 projects · featured 와 겹치지 않게).
  // '전체 활동 20개 보기'를 누르면 각 구분 칸 아래로 나머지가 펼쳐집니다
  archiveReps: ["trade-ai", "ched", "speech-mentors", "future-tech"],
  // 활동 구분 4가지. 기준은 한 가지: '그 활동에서 내가 주로 한 일'.
  // '활동 기록'의 칸이 이 순서대로 나옵니다 (projects · featured 에 든 활동은 칸 맨 아래에 이름만).
  // 이름은 ko.js / en.js 의 categories, 색은 index.html 의 .ax-이름
  categories: {
    project: {icon:"ic-code"},     // 프로젝트 · 해커톤: 무언가를 기획하거나 만든 활동
    community: {icon:"ic-users"},  // 커뮤니티 · 운영: 동아리 · 행사를 운영하거나 학교를 대표한 활동
    edu: {icon:"ic-heart"},        // 교육 · 봉사: 가르치거나 돕는 활동
    learn: {icon:"ic-book"}        // 학습 · 탐색: 듣고 보고 배운 활동
  },
  photos: {
    "intl-publication": {cover:"intl_publication_cover"},
    realthon: {cover:"realthon_cover"},
    line4: {
      cover: "line4_cover",
      video: {src:"video/2gather-promo.mp4", poster:"line4_video_poster"}
    },
    "ktng-overseas": {cover:"ktng_cover", shots:["ktng_01", "ktng_02", "ktng_03", "ktng_04"]},
    "edutech-expo": {cover:"edutech_02", shots:["edutech_01", "edutech_02", "edutech_03", "edutech_04", "edutech_05"]},
    creverse: {cover:"creverse_cover", shots:["creverse_01", "creverse_02", "creverse_03"]},
    "speech-mentors": {
      cover: "speech_cover",
      shots: ["speech_02", "speech_05", "speech_06", "speech_07", "speech_08"],
      video: {src:"video/speech-sketch.mp4", poster:"speech_video_poster"}
    },
    audivice: {cover:"audivice_cover"},
    icists: {cover:"icists_cover", shots:["icists_01", "icists_02"]},
    goormthon: {
      cover: "goorm_cover",
      video: {src:"video/esc-yuljeon.mp4", poster:"goorm_video_poster"}
    },
    ched: {cover:"ched_cover", shots:["ched_article_zoom", "ched_article"]},   // 교내 기사 캡처: 이름 부분 확대본 + 전체 화면 (형광펜 표시)
    gdsc: {cover:"gdsc_cover"},
    "trade-ai": {cover:"trade_cover"},
    "ba-dive": {cover:"ba_dive_cover"}
  },
  // 발표자료 슬라이드: img/ 안의 파일 이름 앞부분(file) + 01, 02 ... 번호 · count 는 전체 장 수
  // 장(챕터) 이름과 설명은 ko.js / en.js 의 해당 활동 deck 에 있습니다.
  decks: {
    line4: {file:"line4_slide_", count:15},
    "trade-ai": {file:"trade_slide_", count:19},
    "ba-dive": {file:"ba_dive_slide_", count:20}
  },
  activities: [
    {
      id: "intl-publication",
      start: "2026-09-03",
      category: "learn",
      notion: "3d0dd7c9423e80cea77dcb29b860b857"
    },
    {
      id: "realthon",
      start: "2024-12-06",
      end: "2024-12-07",
      category: "community",
      notion: "3bbdd7c9423e80ee8b8ef666a7e571d2"
    },
    {
      id: "ktng-overseas",
      start: "2024-10-29",
      end: "2025-02-28",
      category: "edu",
      notion: "3bbdd7c9423e800188c5c527021715d2",
      video: "https://www.youtube.com/watch?v=_4omkqwhhkQ&t=45s"
    },
    {
      id: "line4",
      start: "2024-10-06",
      end: "2024-11-16",
      category: "project",
      notion: "3bbdd7c9423e80a2a597da537213f270"
    },
    {
      id: "creverse",
      start: "2024-09-26",
      end: "2024-12-28",
      category: "community",
      notion: "3bbdd7c9423e8077b654e011ee7a5081"
    },
    {
      id: "edutech-expo",
      start: "2024-09-24",
      dates: ["2024-09-24", "2026-09-17"],   // 상단 날짜에 두 방문일을 모두 표시
      category: "learn",
      notion: "3bbdd7c9423e802ebfe9ebd64f5b9d8d"
    },
    {
      id: "speech-mentors",
      start: "2024-09-06",
      end: "2024-11-09",
      category: "edu",
      notion: "3bbdd7c9423e80c8813cf352ed856ed9"
    },
    {
      id: "audivice",
      start: "2024-09-01",
      end: "2025-02-28",
      category: "edu",
      notion: "3bbdd7c9423e8066ac60f53bfed2bc5f"
    },
    {
      id: "icists",
      start: "2024-08-07",
      end: "2024-08-11",
      category: "project",
      notion: "3bbdd7c9423e8030b293ee9bb512796d"
    },
    {
      id: "goormthon",
      start: "2024-07-22",
      end: "2025-02-28",
      category: "project",
      notion: "3bbdd7c9423e808e910cca08abc718b6"
    },
    {id:"ched", start:"2024-07-17", category:"community", notion:"3bbdd7c9423e8016946ecaf4511b8813"},
    {
      id: "dreamon",
      start: "2024-05-21",
      category: "edu",
      notion: "3bbdd7c9423e80e4b8d3e65e4c295448"
    },
    {
      id: "ba-dive",
      start: "2024-05-13",
      noDate: true,   // 지원 날짜는 중요하지 않아 화면에 날짜를 표시하지 않음 (정렬에만 사용)
      category: "project",
      notion: "3bbdd7c9423e800c847cc4c7f34c4046"
    },
    {
      id: "s-global",
      start: "2024-04-18",
      noDate: true,   // 지원 날짜는 중요하지 않아 화면에 날짜를 표시하지 않음 (정렬에만 사용)
      category: "project",
      notion: "3bbdd7c9423e8018bc23dc8f365b965e"
    },
    {
      id: "freemed",
      start: "2024-03-19",
      end: "2025-03-31",
      category: "edu",
      notion: "3bbdd7c9423e8053a7f4d551c51ad66e"
    },
    {
      id: "likelion12",
      start: "2024-03-02",
      end: "2025-02-28",
      category: "community",
      notion: "3bbdd7c9423e803693f8ef83c8e04db6"
    },
    {
      id: "gdsc",
      start: "2024-03-02",
      end: "2025-02-28",
      category: "community",
      notion: "3bbdd7c9423e8045ac49d6324b76536e"
    },
    {
      id: "trade-ai",
      start: "2024-02-20",
      end: "2024-02-22",
      category: "project",
      notion: "3bbdd7c9423e80af818dfc2265242c89"
    },
    {
      id: "future-tech",
      start: "2024-02-13",
      end: "2024-02-14",
      category: "learn",
      notion: "3bbdd7c9423e80b690b0d90c1eef856f"
    },
    {
      id: "worldvision",
      start: "2024-02-09",
      end: "2024-07-16",
      category: "edu",
      notion: "3bbdd7c9423e80939f16f631e7660eca"
    }
  ],
  // '이력'의 LANGUAGE · CERTIFICATION 줄. 적힌 순서대로 나옵니다 (이름 · 결과 · 발급처는 ko.js / en.js 의 certs)
  certGroups: [
    {
      id: "language",
      items: [
        {id:"ielts", date:"2026-04-21", valid:"ok"},
        // prev: 같은 시험의 이전 성적 (지금은 화면에 쓰지 않음, 글자는 ko.js / en.js 의 certs.toeic.prev)
        {id:"toeic", date:"2026-09-20", valid:"ok", prev:{date:"2024-02-04", valid:"exp"}}
      ]
    },
    {
      id: "cert",
      items: [
        {id:"adsp", date:"2026-08-08", valid:"ok"},
        {id:"sqld", date:"2025-04-04", valid:"ok"},
        {id:"trade-english-1", date:"2026-06-01", valid:"ok"},
        {id:"korean-history-1", date:"2026-08-21", valid:"ok"},
        {id:"computer-proficiency-2", date:"2024-10-11", valid:"ok"}
      ]
    }
  ],
  // 장학 금액: 화면에는 표시하지 않고 기록으로만 둡니다
  awards: [
    {id:"academic-excellence", amount:2824500},
    {id:"student-success", amount:2500000},
    {id:"co-curricular", amount:500000}
  ],
  // 숫자 모음: '이력' 섹션이 여기 값을 씁니다. 글자(이름 · 단위 · 설명)는 ko.js / en.js 의 tiles
  // value 가 "auto" 이면 사이트가 직접 계산합니다 (봉사시간 = volunteerLog 합계)
  // gpa 는 첫 화면 학교 줄 배지(ko.js 의 hero.gpa)와 '이력' EDUCATION 줄에 나오고, funding 은 RE:ALThon 카드 글자에만 나옵니다 (기록용으로 남겨 둠)
  tiles: [
    {id:"gpa", icon:"ic-cap", value:"4.33"},
    {id:"volunteer", icon:"ic-heart", value:"auto"},
    {id:"ielts", icon:"ic-lang", value:"8.0"},
    {id:"dulwich", icon:"ic-globe", value:"5", logo:"dulwich_crest.png"},
    {id:"funding", icon:"ic-chart", value:"700", link:"realthon"}
  ],

  /* 봉사활동 전체 내역 ('이력'의 봉사 칸에서 '전체 내역 보기'를 누르면 뜨는 창)
     출처: 1365 자원봉사포털 '자원봉사활동 확인서' (2026-09-23 발급)
     한 줄이 활동 1건입니다. minutes 는 분 단위 (1시간 53분 = 113).
     org · title · field 의 이름은 ko.js / en.js 의 volunteerLog 에 있습니다.
     새 확인서를 받으면 records 를 바꾸고 issued 날짜를 고치세요. */
  volunteerLog: {
    issued: "2026-09-23",
    records: [
      {date:"2025-03-22", minutes:113, org:"freemed", title:"homeVisit", field:"health"},
      {date:"2025-02-28", minutes:210, org:"ktng", title:"closing", field:"other"},
      {date:"2025-02-22", minutes:120, org:"freemed", title:"homeVisit", field:"health"},
      {date:"2025-02-08", minutes:98, org:"freemed", title:"homeVisit", field:"health"},
      {date:"2025-01-25", minutes:120, org:"freemed", title:"homeVisit", field:"health"},
      {date:"2025-01-16", minutes:780, org:"ktng", title:"deployment", field:"other"},
      {date:"2025-01-15", minutes:780, org:"ktng", title:"deployment", field:"other"},
      {date:"2025-01-14", minutes:780, org:"ktng", title:"deployment", field:"other"},
      {date:"2025-01-13", minutes:780, org:"ktng", title:"deployment", field:"other"},
      {date:"2025-01-12", minutes:780, org:"ktng", title:"deployment", field:"other"},
      {date:"2025-01-11", minutes:780, org:"ktng", title:"deployment", field:"other"},
      {date:"2025-01-10", minutes:780, org:"ktng", title:"deployment", field:"other"},
      {date:"2025-01-09", minutes:780, org:"ktng", title:"deployment", field:"other"},
      {date:"2025-01-08", minutes:120, org:"ktng", title:"accounting", field:"other"},
      {date:"2025-01-08", minutes:540, org:"ktng", title:"deployment", field:"other"},
      {date:"2025-01-04", minutes:180, org:"ktng", title:"performance", field:"other"},
      {date:"2025-01-04", minutes:180, org:"ktng", title:"performance", field:"other"},
      {date:"2025-01-03", minutes:300, org:"ktng", title:"performance", field:"other"},
      {date:"2025-01-03", minutes:120, org:"ktng", title:"launch", field:"other"},
      {date:"2024-12-30", minutes:360, org:"ktng", title:"supplies", field:"other"},
      {date:"2024-12-28", minutes:65, org:"freemed", title:"homeVisit", field:"health"},
      {date:"2024-12-27", minutes:150, org:"ktng", title:"performance", field:"other"},
      {date:"2024-12-27", minutes:450, org:"ktng", title:"teachingRehearsal", field:"other"},
      {date:"2024-12-21", minutes:510, org:"ktng", title:"prepMeeting", field:"other"},
      {date:"2024-12-15", minutes:270, org:"ktng", title:"supplies", field:"other"},
      {date:"2024-12-07", minutes:66, org:"freemed", title:"homeVisit", field:"health"},
      {date:"2024-11-17", minutes:66, org:"freemed", title:"homeVisit", field:"health"},
      {date:"2024-11-09", minutes:510, org:"ktng", title:"camp", field:"other"},
      {date:"2024-11-08", minutes:480, org:"ktng", title:"camp", field:"other"},
      {date:"2024-10-26", minutes:62, org:"freemed", title:"homeVisit", field:"health"},
      {date:"2024-10-25", minutes:240, org:"redcross", title:"bloodDonation", field:"health"},
      {date:"2024-09-21", minutes:70, org:"freemed", title:"homeVisit", field:"health"},
      {date:"2024-09-07", minutes:60, org:"freemed", title:"homeVisit", field:"health"},
      {date:"2024-08-17", minutes:60, org:"freemed", title:"homeVisit", field:"health"},
      {date:"2024-08-03", minutes:60, org:"freemed", title:"homeVisit", field:"health"},
      {date:"2024-07-20", minutes:100, org:"freemed", title:"homeVisit", field:"health"},
      {date:"2024-07-06", minutes:60, org:"freemed", title:"homeVisit", field:"health"},
      {date:"2024-06-22", minutes:120, org:"freemed", title:"homeVisit", field:"health"},
      {date:"2024-06-08", minutes:90, org:"freemed", title:"homeVisit", field:"health"},
      {date:"2024-05-21", minutes:420, org:"dreamon", title:"classAssist", field:"education"},
      {date:"2024-05-18", minutes:120, org:"freemed", title:"homeVisit", field:"health"}
    ]
  }
};
