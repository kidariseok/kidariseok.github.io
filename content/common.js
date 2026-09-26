/* ══════════════════════════════════════════════════════════════
   공통 데이터 파일  ◀ 언어와 상관없는 값 (날짜 · 사진 · 금액 · 숫자 · 노션 주소)
   ──────────────────────────────────────────────────────────────
   글자(제목·설명)는 ko.js / en.js 에 있습니다. 여기서는 'id' 로 서로 연결됩니다.
   예) 활동을 하나 추가하려면
       1) 아래 activities 에 {id:"새주소", start:"2026-10-01", category:"external", notion:""} 추가
          (end 는 끝나는 날짜. 하루짜리면 빼세요.
           category 는 competition / external / volunteer / club / campus / course 중 하나)
       2) ko.js 와 en.js 의 activities 에 같은 id 로 title · summary · body 추가
       3) 사진이 있으면 img/ 에 넣고 아래 photos 에 id 로 등록
   · activities 는 날짜가 늦은 것부터 위에서 아래로 적습니다.
   · tiles 의 value 는 기록 요약 카드의 큰 숫자입니다. "auto" 는 자동 계산(대외활동 수 · 봉사시간).
     link 에 활동 id 를 적으면 카드를 눌렀을 때 그 활동의 상세 기록으로 이동합니다.
   · heroStats 는 첫 화면 아래 숫자 상자에 넣을 tiles 의 id 4개입니다.
   · featured 는 '대표 활동' 검은 카드로 보여 줄 activities 의 id 4개입니다 (사진이 있으면 카드 오른쪽에 나옴).
   ══════════════════════════════════════════════════════════════ */
window.SITE = window.SITE || {};
SITE.common = {
  notion: "https://app.notion.com/p/",
  heroStats: ["hackathon", "ielts", "volunteer", "activities"],
  featured: ["realthon", "gdsc", "line4", "ktng-overseas"],
  // 대외활동 '분야별' 보기 (기본 보기). 각 활동의 axis 가 이 id 중 하나입니다. name 은 한·영 공통 영어, sub 는 ko / en
  axes: [
    {id:"technology", name:"Technology", sub:{ko:"AI · 데이터 · 소프트웨어", en:"AI · Data · Software"}},
    {id:"people", name:"People", sub:{ko:"교육 · 멘토링 · 봉사", en:"Education · Mentoring · Volunteering"}},
    {id:"leadership", name:"Leadership", sub:{ko:"PM · 해커톤 · 커뮤니티", en:"PM · Hackathon · Community"}},
    {id:"global", name:"Global", sub:{ko:"국제 · 영어 · 교류", en:"International · English · Exchange"}},
    {id:"explore", name:"Explore", sub:{ko:"강의 · 박람회", en:"Lectures · Expos"}}
  ],
  categories: {
    competition: {color:"b1", icon:"ic-trophy"},
    external: {color:"b2", icon:"ic-globe"},
    volunteer: {color:"b3", icon:"ic-heart"},
    club: {color:"b4", icon:"ic-code"},
    campus: {color:"b5", icon:"ic-flag"},
    course: {color:"b6", icon:"ic-cap"}
  },
  photos: {
    realthon: {cover:"realthon_cover"},
    line4: {cover:"line4_cover", shots:["line4_01", "line4_02", "line4_03"]},
    "ktng-overseas": {cover:"ktng_cover", shots:["ktng_01", "ktng_02", "ktng_03", "ktng_04"]},
    creverse: {cover:"creverse_cover", shots:["creverse_01", "creverse_02", "creverse_03"]},
    "speech-mentors": {cover:"speech_cover", shots:["speech_01", "speech_02", "speech_03", "speech_04", "speech_05"]},
    odyvice: {cover:"odyvice_cover"},
    icists: {cover:"icists_cover", shots:["icists_01", "icists_02"]},
    goormthon: {
      cover: "goorm_cover",
      shots: ["goorm_01", "goorm_02", "goorm_03", "goorm_04", "goorm_05", "goorm_06", "goorm_07"]
    },
    ched: {cover:"ched_cover", shots:["ched_01"]},
    gdsc: {cover:"gdsc_cover"}
  },
  activities: [
    {
      id: "intl-publication",
      start: "2026-09-03",
      category: "course", axis:"explore",
      notion: "3d0dd7c9423e80cea77dcb29b860b857"
    },
    {
      id: "realthon",
      start: "2024-12-06",
      end: "2024-12-07",
      category: "competition", axis:"leadership",
      notion: "3bbdd7c9423e80ee8b8ef666a7e571d2"
    },
    {
      id: "line4",
      start: "2024-11-16",
      category: "competition", axis:"leadership",
      notion: "3bbdd7c9423e80a2a597da537213f270"
    },
    {
      id: "ktng-overseas",
      start: "2024-10-29",
      end: "2025-01-17",
      category: "volunteer", axis:"global",
      notion: "3bbdd7c9423e800188c5c527021715d2"
    },
    {
      id: "creverse",
      start: "2024-09-26",
      end: "2024-12-28",
      category: "external", axis:"people",
      notion: "3bbdd7c9423e8077b654e011ee7a5081"
    },
    {
      id: "edutech-expo",
      start: "2024-09-23",
      category: "external", axis:"explore",
      notion: "3bbdd7c9423e802ebfe9ebd64f5b9d8d"
    },
    {
      id: "speech-mentors",
      start: "2024-09-06",
      end: "2024-11-09",
      category: "external", axis:"global",
      notion: "3bbdd7c9423e80c8813cf352ed856ed9"
    },
    {
      id: "odyvice",
      start: "2024-09-01",
      end: "2025-02-28",
      category: "external", axis:"people",
      notion: "3bbdd7c9423e8066ac60f53bfed2bc5f"
    },
    {
      id: "icists",
      start: "2024-08-07",
      end: "2024-08-11",
      category: "external", axis:"technology",
      notion: "3bbdd7c9423e8030b293ee9bb512796d"
    },
    {
      id: "goormthon",
      start: "2024-07-22",
      end: "2025-02-28",
      category: "club", axis:"leadership",
      notion: "3bbdd7c9423e808e910cca08abc718b6"
    },
    {id:"ched", start:"2024-07-17", category:"campus", axis:"global", notion:"3bbdd7c9423e8016946ecaf4511b8813"},
    {
      id: "dreamon",
      start: "2024-05-21",
      category: "volunteer", axis:"people",
      notion: "3bbdd7c9423e80e4b8d3e65e4c295448"
    },
    {
      id: "ba-dive",
      start: "2024-05-13",
      category: "competition", axis:"technology",
      notion: "3bbdd7c9423e800c847cc4c7f34c4046"
    },
    {
      id: "s-global",
      start: "2024-04-18",
      category: "competition", axis:"explore",
      notion: "3bbdd7c9423e8018bc23dc8f365b965e"
    },
    {
      id: "premed",
      start: "2024-03-19",
      end: "2025-03-31",
      category: "external", axis:"people",
      notion: "3bbdd7c9423e8053a7f4d551c51ad66e"
    },
    {
      id: "likelion12",
      start: "2024-03-02",
      end: "2025-02-28",
      category: "club", axis:"leadership",
      notion: "3bbdd7c9423e803693f8ef83c8e04db6"
    },
    {
      id: "gdsc",
      start: "2024-03-02",
      end: "2025-02-28",
      category: "external", axis:"leadership",
      notion: "3bbdd7c9423e8045ac49d6324b76536e"
    },
    {
      id: "trade-ai",
      start: "2024-02-20",
      end: "2024-02-22",
      category: "external", axis:"technology",
      notion: "3bbdd7c9423e80af818dfc2265242c89"
    },
    {
      id: "future-tech",
      start: "2024-02-13",
      end: "2024-02-14",
      category: "course", axis:"explore",
      notion: "3bbdd7c9423e80b690b0d90c1eef856f"
    },
    {
      id: "worldvision",
      start: "2024-02-09",
      end: "2024-07-16",
      category: "volunteer", axis:"global",
      notion: "3bbdd7c9423e80939f16f631e7660eca"
    }
  ],
  certGroups: [
    {
      id: "computing",
      items: [
        {id:"adsp", date:"2026-08-08", valid:"ok"},
        {id:"sqld", date:"2025-04-04", valid:"ok"},
        {id:"computer-proficiency-2", date:"2024-10-11", valid:"ok"}
      ]
    },
    {
      id: "english",
      items: [
        {id:"trade-english-1", date:"2026-06-01", valid:"ok"},
        {id:"ielts", date:"2026-04-21", valid:"ok"},
        {id:"toeic", date:"2024-02-04", valid:"exp"}
      ]
    },
    {id:"other", items:[{id:"korean-history-1", date:"2026-08-21", valid:"ok"}]}
  ],
  // 장학 금액: 화면에는 표시하지 않고 기록으로만 둡니다
  awards: [
    {id:"academic-excellence", amount:2824500},
    {id:"student-success", amount:2500000},
    {id:"co-curricular", amount:500000}
  ],
  tiles: [
    // value 가 "auto" 이면 사이트가 직접 계산합니다 (대외활동 수 = activities 개수, 봉사시간 = volunteerLog 합계)
    {id:"activities", icon:"ic-globe", value:"auto"},
    {id:"certs", icon:"ic-medal", value:"7"},
    {id:"scholarships", icon:"ic-star", value:"3"},
    {id:"volunteer", icon:"ic-heart", value:"auto"},
    {id:"ielts", icon:"ic-lang", value:"8.0"},
    // TOEIC 카드를 되돌리려면 아래 줄을 {id:"toeic", icon:"ic-book", value:"975"}, 로 바꾸세요
    {id:"dulwich", icon:"ic-globe", value:"5", logo:"dulwich_crest.png"},
    {id:"hackathon", icon:"ic-users", value:"50"},
    {id:"funding", icon:"ic-chart", value:"700"}
  ],
  // 같은 활동의 기록 요약 카드 묶음: 마우스를 올리면 카드들이 하나로 이어지고(검은 한 덩어리),
  // 위에 공통 제목, 아래에 상세 기록 링크가 생깁니다. tiles 에서 서로 붙어 있는 두 카드여야 합니다.
  // link 는 누르면 갈 활동 id. 글자(제목 · 설명)는 ko.js / en.js 의 tileGroups
  tileGroups: [
    {id:"realthon", tiles:["hackathon", "funding"], link:"realthon"}
  ],

  /* 봉사활동 전체 내역 (기록 요약의 '기록된 봉사시간' 카드를 누르면 뜨는 창)
     출처: 1365 자원봉사포털 '자원봉사활동 확인서' (2026-09-23 발급)
     한 줄이 활동 1건입니다. minutes 는 분 단위 (1시간 53분 = 113).
     org · title · field 의 이름은 ko.js / en.js 의 volunteerLog 에 있습니다.
     새 확인서를 받으면 records 를 바꾸고 issued 날짜를 고치세요. */
  volunteerLog: {
    issued: "2026-09-23",
    records: [
      {date:"2025-03-22", minutes:113, org:"premed", title:"homeVisit", field:"health"},
      {date:"2025-02-28", minutes:210, org:"ktng", title:"closing", field:"other"},
      {date:"2025-02-22", minutes:120, org:"premed", title:"homeVisit", field:"health"},
      {date:"2025-02-08", minutes:98, org:"premed", title:"homeVisit", field:"health"},
      {date:"2025-01-25", minutes:120, org:"premed", title:"homeVisit", field:"health"},
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
      {date:"2024-12-28", minutes:65, org:"premed", title:"homeVisit", field:"health"},
      {date:"2024-12-27", minutes:150, org:"ktng", title:"performance", field:"other"},
      {date:"2024-12-27", minutes:450, org:"ktng", title:"teachingRehearsal", field:"other"},
      {date:"2024-12-21", minutes:510, org:"ktng", title:"prepMeeting", field:"other"},
      {date:"2024-12-15", minutes:270, org:"ktng", title:"supplies", field:"other"},
      {date:"2024-12-07", minutes:66, org:"premed", title:"homeVisit", field:"health"},
      {date:"2024-11-17", minutes:66, org:"premed", title:"homeVisit", field:"health"},
      {date:"2024-11-09", minutes:510, org:"ktng", title:"camp", field:"other"},
      {date:"2024-11-08", minutes:480, org:"ktng", title:"camp", field:"other"},
      {date:"2024-10-26", minutes:62, org:"premed", title:"homeVisit", field:"health"},
      {date:"2024-10-25", minutes:240, org:"redcross", title:"bloodDonation", field:"health"},
      {date:"2024-09-21", minutes:70, org:"premed", title:"homeVisit", field:"health"},
      {date:"2024-09-07", minutes:60, org:"premed", title:"homeVisit", field:"health"},
      {date:"2024-08-17", minutes:60, org:"premed", title:"homeVisit", field:"health"},
      {date:"2024-08-03", minutes:60, org:"premed", title:"homeVisit", field:"health"},
      {date:"2024-07-20", minutes:100, org:"premed", title:"homeVisit", field:"health"},
      {date:"2024-07-06", minutes:60, org:"premed", title:"homeVisit", field:"health"},
      {date:"2024-06-22", minutes:120, org:"premed", title:"homeVisit", field:"health"},
      {date:"2024-06-08", minutes:90, org:"premed", title:"homeVisit", field:"health"},
      {date:"2024-05-21", minutes:420, org:"dreamon", title:"classAssist", field:"education"},
      {date:"2024-05-18", minutes:120, org:"premed", title:"homeVisit", field:"health"}
    ]
  }
};
