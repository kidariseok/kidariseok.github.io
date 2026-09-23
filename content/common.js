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
   · tiles 의 value 는 기록 요약 카드의 큰 숫자입니다(손으로 적는 값).
   · heroStats 는 첫 화면 그림 위에 띄울 tiles 의 id 3개입니다.
   ══════════════════════════════════════════════════════════════ */
window.SITE = window.SITE || {};
SITE.common = {
  notion: "https://app.notion.com/p/",
  heroStats: ["hackathon", "ielts", "volunteer"],
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
    "ktng-overseas": {cover:"ktng_cover", shots:["ktng_01"]},
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
      category: "course",
      notion: "3d0dd7c9423e80cea77dcb29b860b857"
    },
    {
      id: "realthon",
      start: "2024-12-06",
      end: "2024-12-07",
      category: "competition",
      notion: "3bbdd7c9423e80ee8b8ef666a7e571d2"
    },
    {
      id: "line4",
      start: "2024-11-16",
      category: "competition",
      notion: "3bbdd7c9423e80a2a597da537213f270"
    },
    {
      id: "ktng-overseas",
      start: "2024-10-29",
      end: "2025-01-17",
      category: "volunteer",
      notion: "3bbdd7c9423e800188c5c527021715d2"
    },
    {
      id: "creverse",
      start: "2024-09-26",
      end: "2024-12-28",
      category: "external",
      notion: "3bbdd7c9423e8077b654e011ee7a5081"
    },
    {
      id: "edutech-expo",
      start: "2024-09-23",
      category: "external",
      notion: "3bbdd7c9423e802ebfe9ebd64f5b9d8d"
    },
    {
      id: "speech-mentors",
      start: "2024-09-06",
      end: "2024-11-09",
      category: "external",
      notion: "3bbdd7c9423e80c8813cf352ed856ed9"
    },
    {
      id: "odyvice",
      start: "2024-09-01",
      end: "2025-02-28",
      category: "external",
      notion: "3bbdd7c9423e8066ac60f53bfed2bc5f"
    },
    {
      id: "icists",
      start: "2024-08-07",
      end: "2024-08-11",
      category: "external",
      notion: "3bbdd7c9423e8030b293ee9bb512796d"
    },
    {
      id: "goormthon",
      start: "2024-07-22",
      end: "2025-02-28",
      category: "club",
      notion: "3bbdd7c9423e808e910cca08abc718b6"
    },
    {id:"ched", start:"2024-07-17", category:"campus", notion:"3bbdd7c9423e8016946ecaf4511b8813"},
    {
      id: "dreamon",
      start: "2024-05-21",
      category: "volunteer",
      notion: "3bbdd7c9423e80e4b8d3e65e4c295448"
    },
    {
      id: "ba-dive",
      start: "2024-05-13",
      category: "competition",
      notion: "3bbdd7c9423e800c847cc4c7f34c4046"
    },
    {
      id: "s-global",
      start: "2024-04-18",
      category: "competition",
      notion: "3bbdd7c9423e8018bc23dc8f365b965e"
    },
    {
      id: "premed",
      start: "2024-03-19",
      end: "2025-03-31",
      category: "external",
      notion: "3bbdd7c9423e8053a7f4d551c51ad66e"
    },
    {
      id: "likelion12",
      start: "2024-03-02",
      end: "2025-02-28",
      category: "club",
      notion: "3bbdd7c9423e803693f8ef83c8e04db6"
    },
    {
      id: "gdsc",
      start: "2024-03-02",
      end: "2025-02-28",
      category: "external",
      notion: "3bbdd7c9423e8045ac49d6324b76536e"
    },
    {
      id: "trade-ai",
      start: "2024-02-20",
      end: "2024-02-22",
      category: "external",
      notion: "3bbdd7c9423e80af818dfc2265242c89"
    },
    {
      id: "future-tech",
      start: "2024-02-13",
      end: "2024-02-14",
      category: "course",
      notion: "3bbdd7c9423e80b690b0d90c1eef856f"
    },
    {
      id: "worldvision",
      start: "2024-02-09",
      end: "2024-07-16",
      category: "volunteer",
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
  awards: [
    {id:"academic-excellence", amount:2824500},
    {id:"student-success", amount:2500000},
    {id:"co-curricular", amount:500000}
  ],
  tiles: [
    {id:"activities", icon:"ic-globe", value:"20"},
    {id:"certs", icon:"ic-medal", value:"7"},
    {id:"scholarships", icon:"ic-star", value:"3"},
    {id:"volunteer", icon:"ic-heart", value:"217"},
    {id:"ielts", icon:"ic-lang", value:"8.0"},
    {id:"toeic", icon:"ic-book", value:"975"},
    {id:"hackathon", icon:"ic-users", value:"90"},
    {id:"funding", icon:"ic-chart", value:"800"}
  ]
};
