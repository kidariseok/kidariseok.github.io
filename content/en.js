/* ══════════════════════════════════════════════════════════════
   영어(English) 문구 파일  ◀ EN 버튼을 눌렀을 때 보이는 글자는 전부 여기에 있습니다
   ──────────────────────────────────────────────────────────────
   · 따옴표(" ") 안의 글자만 고치세요. 바깥의 { } [ ] , : 는 그대로 둡니다.
   · 글 안에 큰따옴표를 쓰려면 \" 로 쓰거나 “ ” 를 쓰세요.
   · 항목 사이에는 쉼표(,). 마지막 항목 뒤에는 쉼표를 붙이지 않습니다.
   · 반대 언어 파일(ko.js)은 이 파일과 모양이 같습니다.
     활동·자격증을 새로 넣을 때는 common.js 에도 한 줄 넣어야 합니다.
   · {n}, {y} 는 숫자가 자동으로 들어가는 자리이니 지우지 마세요.

   목차
     name        첫 화면의 큰 이름
     page        메뉴 · 첫 화면 · 각 섹션 제목과 설명 · 연락처 · 푸터
     ui          버튼과 작은 라벨 글자
     categories  활동 구분 이름 (공모전 등)
     interests   이름 아래 관심사 태그
     profile     소개 옆 기본 정보 표 ([항목, 값] 한 쌍이 한 줄)
     tiles       기록 요약 숫자 카드의 글자 (숫자 자체는 common.js)
     certHead / certGroups / certs   자격증
     awards      장학 · 수상 (금액은 common.js)
     activities  대외활동 제목 · 요약 · 상세 본문
                 본문 블록: {h:"소제목"} {p:"문단"} {ul:["항목", ...]}
                            {note:"회색 참고 상자"} {files:["파일이름"]}
                            {link:"링크 글자", href:"https://..."}
                 <b>굵게</b> 를 p · ul 안에서 쓸 수 있습니다.
   ══════════════════════════════════════════════════════════════ */
window.SITE = window.SITE || {};
SITE.en = {
  name: "JINSEOK OH",
  // 첫 화면 이름 밑 기울임체 영어 한 줄 (Playfair Display). ":" 가 있으면 그 앞은 파란 굵은 글씨
  tagline: "Connecting what matters through technology.",
  page: {
    nav: {
      story: "Direction",
      projects: "Projects",
      about: "About",
      records: "Records",
      activities: "Activities",
      certs: "Certifications",
      awards: "Awards",
      contact: "Contact"
    },
    hero: {
      school: "Computer Education, Sungkyunkwan University · Class of 2024",
      gpa: "GPA 4.33",
      gpaMax: "/ 4.5",
      headline: "Connecting technology, people, and industry.",
      intro: "I have explored technology, education, planning, and global experiences through diverse activities. I understand technology, but I do not stop at technology itself. I care about how it can create value for people, organizations, and industries.",
      buttonProjects: "See projects",
      buttonContact: "Contact"
    },
    // 프로젝트 · 대표 활동 다음의 '방향' 섹션. period 는 오른쪽 작은 기간 글씨, adapt.since 이후에 딴 자격증이 ADAPT 카드 오른쪽에 자동으로 나옵니다
    story: {
      kicker: "WHAT AM I BECOMING?",
      title: "Through diverse experiences, I found my own direction.",
      explore: {label:"EXPLORE", period:"2024", text:"Since entering university, I have explored AI and data, service planning, education, and global activities through hands-on experiences. These experiences helped me discover what I care about and how I want to contribute."},
      discover: {label:"DISCOVER", period:"2024 - 2025", text:"Through these experiences, I discovered that my interest lies not only in technology itself, but in where technology meets people and industry. I found greater meaning in understanding technology and connecting it to real-world problems."},
      adapt: {
        label: "ADAPT & GROW",
        period: "2025 - 2026",
        title: "A period of growth, even in a different environment.",
        text: "From 2025 to 2026, I served in the Republic of Korea Army as a network management soldier and squad leader. While adapting to a completely different environment, I continued learning and preparing for what comes next, earning certifications including SQLD, IELTS 8.0, Trade English Level 1, Korean History Level 1, ADsP, and TOEIC 975.",
        role: "",
        since: "2025-01-01"
      },
      connect: {label:"CONNECT", period:"Next", text:"I want to connect technology with real-world needs, bridging people, ideas, and industry to create meaningful value."}
    },
    featured: {title:"Highlights", more:"All activities"},
    projects: {
      kicker: "PROJECTS",
      title: "From a real problem to something people can actually use.",
      desc: "Projects I planned and built. Each one starts with what it is and what I was responsible for.",
      labels: {what:"WHAT", role:"MY ROLE", tools:"MY TOOLS", stackTeam:"STACK · built by team", team:"TEAM", period:"PERIOD", stack:"STACK", links:"MORE"},
      jumpVideo: "Promo video", jumpDeck: "Slides",
      open: "View project", play: "Hover to play", tbd: "To confirm"
    },
    about: {
      title: "About",
      paragraph1: "My interests lie at the intersection of technology, people, and ideas.",
      paragraph2: "I study Computer Education at Sungkyunkwan University, with a focus on AI, data, and software. Alongside my academic studies, I have pursued diverse experiences across technology projects, service planning, hackathons, education, and mentoring.",
      paragraph3: "Through these experiences, I have developed a strong interest in how technology can be understood, communicated, and applied to real-world people, organizations, and problems.",
      paragraph4: "Going forward, I aim to become a professional who combines a solid understanding of technology with the ability to collaborate across disciplines, connect diverse perspectives, and turn ideas into meaningful outcomes.",
      profileTitle: "Profile"
    },
    records: {
      title: "Records",
      description: ""
    },
    activities: {
      title: "Activities",
      count: "{n}",
      description: "Filter by category, and open any card for the full record of that activity."
    },
    certs: {
      title: "Certifications",
      count: "{n}",
      description: "Grouped by field; most recent first within each group."
    },
    awards: {
      title: "Scholarships",
      count: "{n} awards",
      description: "",
      totalLabel: "Total",
      totalUnit: "KRW"
    },
    contact: {
      title: "Not stopping at experience, but building what comes next.",
      description: "",
      blog: "Naver Blog: Jinseok's Record"
    },
    footer: {name:"Jinseok Oh · Portfolio", updated:""}
  },
  ui: {
    back: "All activities",
    prev: "Previous",
    next: "Next",
    files: "Attachments",
    detail: "Read the full record",
    notFound: "That activity could not be found.",
    photos: "Photos",
    swipe: "Scroll sideways",
    video: "Activity video",
    deckAll: "All {n} slides",
    deckPrev: "Prev",
    deckNext: "Next",
    vidFull: "Fullscreen",
    vidPlay: "Play",
    deckPm: "My part",
    toc: "Contents",
    close: "Close",
    all: "All",
    showAll: "Show all {n}",
    viewAxes: "By field",
    viewTypes: "By activity",
    axisHint: "Pick a field to see what it covers.",
    showLess: "Show less",
    year: "{y}",
    groupCount: "{n} items",
    groupCountOne: "{n} item",
    won: " KRW",
    awardTerm: "2024 Fall term · On campus"
  },
  categories: {
    competition: "Competition",
    external: "External",
    volunteer: "Volunteer",
    campus: "Campus",
    course: "Course"
  },
  keywords: ["AI", "Data", "Software", "Computer Education", "Education", "Mentoring", "Volunteering", "Student programs", "Service planning", "Projects", "Hackathons", "International school", "English", "Global speakers", "Overseas volunteering", "Exchange student", "GDGoC", "Hackathon lead", "PM"],
  interests: ["AI · Data", "PM", "Service planning", "Developer", "Global"],
  profile: [
    ["Name", "Jinseok Oh"],
    ["Major", "Computer Education, SKKU"],
    ["Class", "Class of 2024"],
    ["Interests", "Connecting technology, people & industry"],
    ["Currently", "Serving in the Republic of Korea Army as a Network Manager / Squad Leader"],
    ["Writing", "blog.naver.com/kidariseok"]
  ],
  tiles: {
    gpa: {label:"GPA", unit:" / 4.5", note:"Sungkyunkwan University · Computer Education"},
    activities: {label:"Recorded activities", unit:"", note:"{from} - {to}"},
    certs: {label:"Certifications", unit:"", note:"3 computing · 3 English · 1 other"},
    scholarships: {label:"Campus scholarships", unit:"", note:"Over $3,500"},
    volunteer: {label:"Volunteer hours", unit:"h+", note:"1365 certificate · {n} sessions"},
    ielts: {label:"IELTS Overall", unit:"", note:"Listening 9.0 · Reading 8.5"},
    toeic: {label:"TOEIC", unit:"", note:"LC 495 · RC 480"},
    dulwich: {label:"Dulwich College Suzhou", unit:" yrs", note:"International school in Suzhou, China", more:"Five years of learning alongside classmates from many cultural backgrounds taught me to adapt quickly to new environments and built my global perspective."},
    funding: {label:"Hackathon funding raised", value:"$5K+", unit:"", note:"From programs at <b>3</b> universities · total budget ~$5.5K"}
  },
  // 기록 요약 카드 묶음(common.js 의 tileGroups)에 마우스를 올렸을 때 나오는 글자
  tileGroups: {
    realthon: {title:"RE:ALThon", sub:"Dec 2024 · co-hosted by 3 universities", note:"Overnight · 9 teams"}
  },
  certHead: ["Credential", "Result", "Detail", "Issuer", "Obtained", "Status"],
  certGroups: {computing:"Computing & Data", english:"English", other:"Other"},
  certs: {
    adsp: {
      name: "ADsP (Advanced Data Semi-Professional)",
      result: "Pass",
      detail: ".",
      issuer: "Korea Data Agency",
      status: "Permanent"
    },
    sqld: {
      name: "SQLD (SQL Developer)",
      result: "Pass",
      detail: ".",
      issuer: "Korea Data Agency",
      status: "Permanent"
    },
    "computer-proficiency-2": {
      name: "Computer Proficiency, Level 2",
      result: "Pass",
      detail: "-",
      issuer: "Korea Chamber of Commerce & Industry",
      status: "Permanent"
    },
    "trade-english-1": {
      name: "Trade English, Level 1",
      result: "Pass",
      detail: "-",
      issuer: "Korea Chamber of Commerce & Industry",
      status: "Permanent"
    },
    ielts: {
      name: "IELTS",
      result: "8.0",
      detail: "L 9.0 · R 8.5 · W 6.5 · S 7.5",
      issuer: "IDP Education",
      status: "2 years"
    },
    toeic: {
      name: "TOEIC",
      result: "975",
      detail: "LC 495 · RC 480",
      issuer: "YBM / TOEIC Committee Korea",
      status: "2 years",
      prev: {detail:"LC 485 · RC 490", status:"Expired"}
    },
    "korean-history-1": {
      name: "Korean History Proficiency, Level 1",
      result: "Pass",
      detail: "-",
      issuer: "National Institute of Korean History",
      status: "Permanent"
    }
  },
  awards: {
    "academic-excellence": {
      name: "Academic Excellence Scholarship (Highest)",
      description: "Top 3% of students; 4 selected within the department"
    },
    "student-success": {
      name: "Student Success Creativity Scholarship",
      description: "4 selected across the College of Education"
    },
    "co-curricular": {
      name: "Co-curricular Challenge Scholarship",
      description: "Awarded for outstanding participation in co-curricular programs"
    }
  },
  activities: {
    "intl-publication": {
      title: "The Art and Science of International Publication: A Practical Roadmap from Research Development to Scholarly Impact",
      summary: "Attended a Department of English lecture on the process of international scholarly publication.",
      short: "Attended an English dept. lecture on international scholarly publishing.",
      body: [
        {h:"AI in L2 education: where the research is going"},
        {
          p: "The lecture started from the observation that AI research splits along the four language skills - reading, listening, writing and speaking - and that expectations and limits differ sharply for each."
        },
        {
          ul: [
            "<b>Writing</b> - strong at brainstorming and at improving clarity, grammar, punctuation and style.",
            "But loss of authorial voice, bias, overreliance and hallucinated references remain clear limits.",
            "A tendency to lean too heavily on summarisation leaves its educational fit open to question.",
            "Reduced foreign-language anxiety is reported - though whether less anxiety is always a good thing is itself worth asking.",
            "<b>Speaking</b> - heavily used for pronunciation practice."
          ]
        },
        {h:"Theoretical grounding"},
        {
          p: "The lecture laid out the theoretical frames that carry weight when writing in the humanities."
        },
        {
          ul: [
            "<b>Input Hypothesis</b> - i + 1; the classic frame, with plenty of literature behind it.",
            "<b>Output Hypothesis</b> - give learners the chance to actually produce what they have taken in.",
            "<b>Noticing Hypothesis</b> - exposure alone does not produce learning; attention must be drawn, then developed into awareness.",
            "<b>Sociocultural Theory</b> - weight on teachers and peers; the More Knowledgeable Other (MKO).",
            "<b>Self-Regulated Theory</b> - individualised learning; learners know themselves best, so give intrinsic motivation and let them become proactive agents."
          ]
        },
        {h:"Research methods"},
        {
          p: "What stuck with me: that AI produces good outcomes is already established - what makes a paper now is analysing the <b>process</b> behind them."
        },
        {
          ul: [
            "Process tracing approach",
            "Retrodictive modeling",
            "Latent Growth Curve Modeling (LGCM)"
          ]
        },
        {h:"Advice on writing papers"},
        {
          ul: [
            "Fill the gap - not something that has been said before.",
            "Patience is the key; work on multiple papers at once.",
            "Rebutting existing research is often an easier way into a topic than proposing a brand-new solution."
          ]
        }
      ]
    },
    realthon: {
      title: "RE:ALThon (host)",
      summary: "When a planned collaboration with Japanese universities fell through, changed course and organised a joint AI hackathon across SKKU, Korea University and Sogang (50 participants, 9 teams).",
      short: "Pivoted from a failed global plan to a 3-university hackathon for 50.",
      body: [
        {
          ul: [
            "<b>Dates</b>: 6-7 Dec 2024 (overnight)",
            "<b>Venue</b>: Korea University, Woojung Hall of Informatics",
            "<b>Co-hosts</b>: GDSC at SKKU, Korea University and Sogang University",
            "<b>Scale</b>: 50 participants, 9 teams",
            "<b>My role</b>: HR lead of SKKU GDSC; overall planning and budget management"
          ]
        },
        {h:"01. Situation: the global plan wobbles"},
        {
          p: "A global hackathon was the thing I most wanted to do when I joined GDSC. Once SKKU's software program committed a budget, I reached out to GDSC chapters in time zones close to Korea - Singapore, Manila, Sydney and Japan. From early September I was discussing the format in English, over LinkedIn and Discord, with Tokyo Metropolitan University, Tokyo City University and Waseda University."
        },
        {
          p: "Just as the line-up was about to be confirmed, the Japanese side said they could not take part: many members were not comfortable in English, the distance between Tokyo and Osaka was a burden, and realistically only 3-4 people per school would attend. Holding on to the original plan risked the event not happening at all."
        },
        {h:"02. Decision: running the event over keeping the label"},
        {
          ul: [
            "<b>A. Keep working with Japan</b>: this would preserve the global angle, but mixing one Japanese participant into mostly Korean teams would tilt communication and put them at a disadvantage.",
            "<b>B. Postpone the joint event with Japan and run a strong domestic hackathon first</b>: less distinctive, but an overnight event needs smooth communication, and Google-specific strengths such as the Gemini API could still set it apart."
          ]
        },
        {
          p: "I chose B, mainly because of the budget: there was no guarantee this year's funding would carry over if we postponed. Delivering a real event with the time and resources we had mattered more than keeping the original shape of the plan."
        },
        {h:"03. Action: re-plan and reconnect"},
        {
          ul: [
            "Contacted Yonsei, Korea University and Sogang directly through the GDSC leads' Slack, and confirmed an offline event with Korea University and Sogang.",
            "Named the event: RE:ALThon stands for 'REply via AI machine Learning'.",
            "Shaped the concept and operations with the other schools' leads, and gave input on promotion and recruitment to the design task force.",
            "Managed SKKU's share of the budget and submitted receipts to the program office.",
            "On the day, briefed participants through Notion and explained the rules for using the Gemini API."
          ]
        },
        {p:"Korea University arranged the venue and the faculty judges; each school took on its own part."},
        {h:"04. Budget and resources"},
        {
          ul: [
            "<b>Sponsorship</b>: roughly KRW 7 million from four programs at three universities, with SKKU covering more than half.",
            "<b>Total budget</b>: around KRW 7.5 million including entry fees, spent on prizes, meals and snacks, promotion, AI API costs and operations.",
            "<b>In-kind support</b>: Korea University's College of Informatics provided four lecture rooms (about 300 seats) free of charge - worth about KRW 6 million in rental fees.",
            "SKKU first promised about KRW 2 million; after seeing me drive the collaboration with Japan, the program nearly doubled its support.",
            "SKKU carried the larger share this time, and we agreed that Korea University would carry more the following year."
          ]
        },
        {h:"05. Results"},
        {
          ul: [
            "<b>Three universities</b>: 50 students from SKKU, Korea University and Sogang competed in 9 teams.",
            "<b>AI services</b>: teams built services on marine conservation, job and legal support for migrant workers, pronunciation practice for people with hearing loss, personal safety and sustainable healthcare. AquaLens, for example, used the user's location and a photo of a fish to tell whether fishing is allowed there and whether the species may be caught, with image recognition via the Gemini API.",
            "<b>Satisfaction</b>: 35 of the 37 survey respondents rated the event 91/100 or higher; operations and venue averaged 4.68/5, and willingness to recommend or return 4.62/5.",
            "<b>Continued</b>: thanks to the cost-sharing agreement, RE:ALThon ran again in 2025."
          ]
        },
        {h:"06. What I would change"},
        {
          p: "It fell just before exams, which made recruiting hard. We wanted a year-end date, but the program budget had to be spent by early December. The survey echoed this ('too close to exams', 'not enough dev time'). Next time I would start from the budget deadline and plan backwards around the exam calendar."
        },
        {h:"07. What I learned"},
        {
          p: "I used to think the quality of the event depended on keeping its global shape. But with several organisations involved, many variables were outside my control. What mattered was rebuilding the options from the resources and constraints we actually had, and connecting directly with the people who could help. I also felt how delaying one key decision pushes back sponsorship, venue, promotion and recruitment all at once."
        },
        {h:"08. What changed afterwards"},
        {
          p: "When something gets stuck, I now look for alternative people, channels and methods first, rather than holding on to a blocked route. I used this experience as my example of decisiveness when applying to the KT&G overseas volunteer corps. Using Slack, LinkedIn, Discord, Notion, Figma and Google Forms/Sheets intensively also made working with outside organisations feel natural."
        },
        {h:"Looking back"},
        {
          p: "I poured a huge amount of my own time into this, from the summer break into the semester. The exams hit me too - the morning after the overnight event, I sat a university online exam on the Korea University campus. Had I known how much work it would be, I might have hesitated; not knowing let me throw myself into it. What stays with me most is planning with senior leads from other schools until 4 a.m. and building one event together."
        }
      ]
    },
    line4: {
      title: "LIKELION Line-4 Hackathon",
      summary: "As PM, planned 2GATHER - an AI-powered marketing solution that helps students and early-stage founders plan promotion and connect with the right people on a small budget and a limited network.",
      short: "PM · UX/UI for 2GATHER, an AI promotion-strategy platform shipped in 6 weeks",
      proj: {
        name: "2GATHER",
        type: "AI · Web service",
        what: "An AI promotion-strategy platform that helps students and early founders plan promotion and reach the right people on a small budget and a limited network",
        role: ["PM", "UX/UI planning", "PRD writing", "Service structure design"],
        tools: ["Figma"],
        team: "Team of 6 (planning/PM 1 · UI design 1 · FE/BE 4)",
        period: "Sep – Oct 2024 · about 6 weeks",
        stack: ["React", "Spring Boot", "OpenAI API", "MySQL"],
        links: [{t:"GitHub · Front-end", href:"https://github.com/Line4thon-Gather/gather_Front_End"}, {t:"GitHub · Back-end", href:"https://github.com/Line4thon-Gather/gather_back_end"}]
      },
      vid: {
        k: "PROMO VIDEO",
        t: "2GATHER official promo video",
        d: "A 75-second video that tells the service as a single line: scattered ideas and people gather, connect, act, and loop back. It walks through the real Figma screens, from entering a promotion brief to the channel timeline, the budget, and matching with creators."
      },
      body: [
        {lead:"2GATHER · An AI promotion-strategy platform for people starting out"},
        {p:"An AI-powered marketing solution built so that students and early-stage founders can <b>plan their promotion and connect with the people they need - even with a small budget and a limited network</b>."},
        {p:"At the LIKELION Line-4 Hackathon, a team of six planned, built and deployed the service in about six weeks."},
        {facts:["Sep – Oct 2024", "PM / UX·UI", "Team of 6"]},

        {k:"01 · Problem", h:"A good idea is not enough if you can't get the word out."},
        {p:"As head of people at GDSC, I set a goal of <b>30 new members - but only 9 joined</b>."},
        {stat:[{k:"Goal", v:"30"}, {k:"Recruited", v:"9", hi:true}]},
        {p:"The only channels we could use were Everytime and department group chats, and we had neither the budget nor the network to reach further."},
        {p:"That experience surfaced these problems:"},
        {boxes:[
          "It's hard to know which channel to promote on.",
          "Every channel has different posting rules and timing.",
          "A small budget can't pay for professional promotion.",
          "It's hard even to find someone who can make the materials."
        ]},
        {q:"What if people starting out, with little money, could build a promotion strategy on their own?"},

        {k:"02 · 2GATHER", h:"Plan the promotion, connect the people."},
        {p:"2GATHER is a service that <b>builds a promotion strategy from just a few inputs</b>, so users don't have to study marketing first."},
        {p:"Users enter <b>the recruiting period · target headcount · budget · preferred channels in order</b>. From that, 2GATHER returns three things."},
        {cards:[
          {n:"01", t:"Promotion timeline", d:"Considering each channel - Instagram, Everytime, CampusPick, Yozm, TikTok, YouTube - it shows <b>what to prepare and post, and when</b>, as a schedule."},
          {n:"02", t:"Budget plan", d:"Based on the available budget, it splits costs across materials and channels and suggests <b>how to spend a limited budget</b>."},
          {n:"03", t:"Creator matching", d:"Users can find <b>early-career creators who can make designs, videos and more</b>, matched to their budget and the materials they need."}
        ]},

        {k:"03 · How it works", h:"We cut down what the user has to decide."},
        {p:"At first, we planned for users to pick the platforms themselves."},
        {p:"But the problem 2GATHER set out to solve was exactly that people <b>“don't know where to promote.”</b>"},
        {p:"So instead of choosing platforms, users only rank the formats they want - <b>print · video · social</b>."},
        {p:"The system then maps suitable channels based on the material type and recruiting period."},
        {flow:["Input", "AI Analysis", "Marketing Timeline"]},
        {p:"This simple flow reduces the choices users have to think about."},

        {k:"04 · Core design", h:"We turned each channel's quirks into rules."},
        {p:"I researched how each platform handles promotion and turned it into rules that could shape a real schedule. For example:"},
        {cards:[
          {t:"CampusPick", d:"Allow for an approval period of up to 48 hours"},
          {t:"Everytime", d:"Adjust the schedule to posting and recruiting periods"},
          {t:"Yozm", d:"Account for poster/thumbnail specs and production time"},
          {t:"Linkareer", d:"Limit to startups where business verification is required"}
        ]},
        {p:"The aim was not to stop at “AI recommends a promotion plan,” but to <b>build real platform constraints into the service logic</b>."},

        {k:"05 · A different take on budget", toc:"05 Budget", h:"Not everyone gets the same ratio."},
        {p:"At first we planned to apply a <b>70/20/10 budget split</b> to every user."},
        {p:"But for very small budgets, like ₩10,000–20,000, applying the ratio as-is was unrealistic. So we split budgets into tiers."},
        {cmp:[
          {t:"Under ₩100,000", d:"Show recommended costs and creator rates, and let the user decide"},
          {t:"₩100,000 and up", d:"Suggest 70/20/10 as the default, and let the user adjust"}
        ]},
        {p:"For small budgets, we decided it was better to <b>offer choices than to force an answer</b>."},

        {k:"06 · Connecting people and opportunities", toc:"06 Connection", h:"2GATHER doesn't stop at promotion."},
        {p:"2GATHER connects people who need promotion with people who can make the materials."},
        {p:"Users are separated through student email verification and business verification, and can find creators by field - design, video and more - and by budget."},
        {p:"To keep users and creators - mostly students and early-stage founders - rotating, we set <b>an active period of 3 years after graduation and 5 years after founding</b>."},
        {q:"For one person it's the chance to start promoting; for another, the first job that shows what they can do."},

        {k:"07 · My part", h:"I turned the idea into the structure of a service."},
        {p:"As PM, I led the planning process <b>from pitching the idea through planning, wireframes, working with developers and presenting</b>."},
        {people:[{"role": "Planning · PM", "n": 1, "me": true, "note": "Me"}, {"role": "UI design", "n": 1, "note": "Minjeong Jang"}, {"role": "Front-end · Back-end", "n": 4, "note": "Four teammates"}]},
        {roles:{tl:"TEAM", ml:"MY CONTRIBUTION", team:["Final UI design: Minjeong Jang", "Front-end and back-end: four teammates"], mine:[
          "Defined the problem from a real recruiting experience and pitched the project",
          "Planned the core features and user flow",
          "Researched six promotion channels and turned them into service rules",
          "Designed the budget split and operating rules",
          "Built low-fi wireframes in Figma",
          "Worked through detailed logic and requirements with FE and BE",
          "Prepared and delivered the first pitch and the final presentation",
          "Wrote the PRD and detailed planning documents",
          "Built the overall storyline for the presentation and service explanation",
          "Put together the Mock Data handed to the developers"
        ]}},
        {p:"I did not write any of the code. Instead I focused on preparing the <b>PRD, detailed planning documents, wireframes and Mock Data</b> the developers needed, and on working through the logic with them."},

        {k:"08 · Build", h:"The structure the team built is open in the repositories."},
        {p:"Front-end and back-end teammates did the development. Below is what the public repositories show. I did not write code; I worked out the logic and requirements for this service and aligned them with the developers."},
        {cards:[{"n": "BACK-END", "t": "Java 21 · Spring Boot 3.3", "d": "JPA · MySQL, Spring Security · OAuth2 · JWT, springdoc (Swagger) API docs"}, {"n": "AI", "t": "OpenAI API · gpt-4o-mini", "d": "Generates the promotion timeline and budget results as JSON from a system prompt and example exchanges"}, {"n": "FRONT-END", "t": "React 18 · Vite", "d": "styled-components, TanStack Query, Zustand, visx for charts"}, {"n": "ETC", "t": "University verification · file storage", "d": "UnivCert-based university email verification, Oracle Cloud Object Storage SDK"}]},
        {link:"GitHub · Front-end", href:"https://github.com/Line4thon-Gather/gather_Front_End"},
        {link:"GitHub · Back-end", href:"https://github.com/Line4thon-Gather/gather_back_end"},

        {k:"09 · Result", h:"From imagination to a real service"},
        {p:"After about six weeks of planning and development, we built <b>a service you can actually log in to and demo</b>."},
        {p:"From Google login and user verification to generating a strategy, checking the timeline and browsing creators, the core user flow of 2GATHER came together as one service."},
        {q:"2GATHER - turning the ideas you only imagined into reality."},

        {k:"10 · Looking back", h:"I had to check whether the idea had solid ground to stand on."},
        {p:"I had to put together the <b>Mock Data</b> for the developers myself. I could not fill it with arbitrary values, so I looked further into the theory behind the idea."},
        {p:"Along the way I found less theory and reliable data to support the idea than I had expected."},
        {p:"I learned that what matters is not only whether a service idea is appealing, but whether the theory and data to support development and data use actually exist."},
        {q:"In later projects I plan to check from the idea stage whether usable theory and reliable data are available."}
      ],
      deck: {
        title: "Pitch deck",
        chapters: [
          {
            name: "Intro",
            pm: "As PM, I led the planning process from pitching the idea through wireframes, working with developers and presenting.",
            slides: [
              {k:"INTRO", t:"2GATHER, a promotion-strategy platform", d:"An AI-powered, timeline-based marketing solution. Built by Jinseok Oh (PM), Minjeong Jang (design), Yechan Kim and Hyeonseo Choi (front-end), and Minseo Kang and Jindong Lee (back-end)."}
            ]
          },
          {
            name: "Problem",
            pm: "I defined the problem from recruiting for GDSC and pitched the project.",
            slides: [
              {k:"GOAL / REALITY", t:"Aimed for 30, recruited 9", d:"Recruiting for GDSC as head of people, the goal was 30 new members - only 9 joined. The project started from that gap."},
              {k:"QUESTION", t:"Where can ₩10,000 buy promotion?", d:"We asked whether a small budget could get a message onto a platform everyone already knows."},
              {k:"ANSWER", t:"In the end, only Instagram", d:"The only answer that came to mind was Instagram."},
              {k:"PAIN POINT", t:"Three limits", d:"With limited resources and networks, students and early-career people struggle to find teammates; existing channels like Everytime or department group chats reach only so far; and after graduation even those networks become hard to use."},
              {k:"OVERVIEW", t:"Why don't capable people connect?", d:"Capable people hit a ceiling when looking for opportunities and growing their networks. From that, we planned 2GATHER - a space that turns ideas into reality."}
            ]
          },
          {
            name: "Features",
            pm: "I planned the core features and user flow, and built low-fi wireframes in Figma.",
            slides: [
              {k:"FUNCTION 01", t:"An effective promotion timeline", d:"An AI trained on the AIDA model proposes a timeline for planning, producing and posting on each channel, with a tip for every stage."},
              {k:"FUNCTION 02", t:"Maximum impact on a tight budget", d:"Following the 70/20/10 rule, it suggests how to split the budget across items like print and video and shows the total spend at a glance."},
              {k:"FUNCTION 03", t:"Creators that fit the budget", d:"Browse creators by category (video, print, social) and price range, and pick who to work with within your budget."}
            ]
          },
          {
            name: "Strengths",
            pm: "I researched six promotion channels, turned them into service rules, and designed the budget split and operating rules.",
            slides: [
              {k:"STEP 1", t:"Enter your conditions", d:"Just enter the campaign title, recruiting period, target headcount, budget, and your preferred channels in order."},
              {k:"STEP 2", t:"AI analysis", d:"The AI analyzes a promotion strategy based on those conditions."},
              {k:"STEP 3", t:"The optimal timeline", d:"The resulting timeline can be saved as an image, and channels with different promotion periods are managed on one screen."},
              {k:"STRENGTH", t:"A rotating structure that lowers the barrier", d:"Users join with student or business verification. Experts leave the platform 3 years after graduating or 5 years after founding, so new users and creators keep arriving and no one monopolizes it."}
            ]
          },
          {
            name: "Conclusion",
            pm: "I prepared and delivered the first pitch and the final presentation.",
            slides: [
              {k:"CONCLUSION", t:"A dependable ally", d:"The goal: practical help so ambitious students don't give up before they start, and backing for early-career people's projects and startups."},
              {k:"2GATHER", t:"Turning ideas into reality", d:"A space that turns the ideas you only imagined into reality - 2GATHER."}
            ]
          }
        ]
      }
    },
    "ktng-overseas": {
      title: "KT&G Sangsang Withus Overseas Volunteer Corps",
      summary: "Deployed to an elementary school in Bogor, Indonesia for 177 hours of education and environmental-improvement volunteering.",
      short: "177 hours of education and environmental volunteering at an elementary school in Bogor, Indonesia.",
      nums: [
        {v:"177", u:"hrs", t:"Total volunteering hours", d:"8 – 17 Jan 2025 · Bogor, Indonesia", hi:true},
        {v:"40", t:"Volunteers in the whole corps", d:"4 teams · 10 per team"},
        {v:"34", t:"Students my team taught", d:"One third-grade class"}
      ],
      numsLayout: "row",
      body: [
        {lead:"Ten days with children in Indonesia"},
        {p:"A volunteering trip spent teaching, running around and laughing with the children of <b>Babakan Madang Elementary School</b> in Bogor, Indonesia."},
        {p:"I had once prepared an Indonesia volunteering trip myself with FREEMED, only for it to fall through. Before enlisting, I wanted one last chance to actually go - so I applied."},
        {p:"I didn't just volunteer on site. <b>I went through the whole process: designing and preparing classes, managing the supplies they needed, and working with the students in the classroom.</b>"},
        {facts:["Oct 2024 – Jan 2025", "Bogor, Indonesia", "40 volunteers"]},

        {k:"01 · Why Indonesia", h:"I wanted to finish a plan that had once fallen through."},
        {p:"I had been interested in overseas volunteering for a long time."},
        {p:"With FREEMED I prepared a deployment to Indonesia myself - running an Indonesian-language study group and planning programs tailored to the local context - but the project was cancelled when the sponsor pulled out."},
        {p:"I regretted all the time I had put in."},
        {p:"So I saw this not as just another extracurricular, but as <b>a chance to finally experience the volunteering I couldn't finish back then</b>."},
        {p:"As a Computer Education major, I also wanted to find out first-hand what preparing and teaching real classes for children would mean to me."},

        {k:"02 · My role", h:"I prepared classes and was with the children on site."},
        {p:"Officially I was on the <b>accounting & supplies team</b>, managing class supplies for Team 1."},
        {p:"On site, though, I didn't stop at operational support - I also led classes and helped students directly."},
        {h3:"Before departure"},
        {ul:[
          "Listed every supply Team 1's classes needed",
          "Estimated the cost of each item",
          "Coordinated purchases to fit within the team budget",
          "Compiled class materials with purchase links",
          "Found alternatives for items that cost more than expected and agreed them with the class leads"
        ]},
        {h3:"In Indonesia"},
        {ul:[
          "<b>Planned and led the ddakji class and the tooth-brushing lesson</b>",
          "Took part in Korean culture, hygiene, art and cultural-exchange classes",
          "Helped students one-on-one when they struggled with an activity",
          "Served as an assistant facilitator, keeping students focused and safe",
          "Played the tree in a role-play and interacted with the students",
          "Joined shared programs such as music and culture activities and sports day"
        ]},
        {p:"Preparing to teach and what actually happens in a classroom turned out to be different things."},
        {p:"Rather than delivering the lesson exactly as planned, <b>watching the children's reactions and explaining or helping in the moment mattered far more.</b>"},

        {k:"03 · Accounting & supplies", h:"Good classes started with good preparation."},
        {p:"I handled Team 1's class supplies within a budget of roughly <b>₩2.2 million per team</b>."},
        {p:"The job was more than just buying things."},
        {p:"When class leads sent me what they needed, I organised the list, checked the estimated costs, and reviewed whether each purchase was feasible within the overall budget."},
        {p:"When an item turned out more expensive than expected, I didn't just buy it."},
        {p:"I looked for products that did the same job, compared prices, asked the lead whether a substitute would work, and revised the purchase plan."},
        {p:"If I could find something cheaper that didn't compromise the purpose of the class, I proposed it and switched once the lead agreed."},
        {p:"Through this I learned <b>how to find a workable path within a limited budget while keeping the educational goal intact</b>."},
        {p:"I organised every purchase in Excel, with links, so KT&G could buy the items directly - using the spreadsheet functions I had studied for my Computer Specialist in Spreadsheet & Database certificate."},

        {k:"04 · Teaching materials I made", toc:"04 Teaching materials", h:"Every class started with making the materials."},
        {p:"I brought the lesson-design experience from my Computer Education major into the field."},
        {p:"Of Team 1's programs, the ones I led were <b>ddakji and the tooth-brushing lesson</b> - the education plan lists me as lead facilitator for both."},
        {h3:"Ddakji"},
        {p:"Rather than just introducing a traditional Korean game, I designed the class so students folded their own ddakji and played against each other."},
        {p:"The materials walked through folding step by step, along with an introduction to hanji - traditional Korean paper - and its patterns."},
        {p:"After explaining what the cloud, flower and geometric patterns mean, students folded the paper themselves and played."},
        {flow:["Explain", "Make it", "Play together"]},
        {p:"Building the class around that flow, I felt that <b>culture comes across far more easily when people experience it than when it is only explained</b>."},
        {h3:"Tooth-brushing lesson"},
        {p:"For the hygiene lesson, I built materials to help students understand how to care for their teeth and actually do it in daily life."},
        {p:"I used everyday examples - cavities, gums, chocolate and milk - and prepared a worksheet so students could follow the brushing steps themselves."},
        {p:"The question I wrestled with most while making the materials was <b>\"How can I make the children understand this?\"</b>"},
        {p:"Writing lesson plans as a Computer Education student and teaching real students turned out to be different."},
        {p:"In the classroom there were many moments when a student's face and reactions mattered more than the materials I had prepared."},
        {p:"If a student didn't understand, I explained again; if they lost focus, I had to win their attention another way."},
        {p:"It left me thinking that <b>a good class doesn't end with polished materials - it keeps changing in response to the students</b>."},

        {k:"05 · I became a talking tree", toc:"05 The talking tree", h:"Teaching sometimes called for unexpected methods."},
        {p:"One of the programs I remember most was <b>Dream Fairy Tale</b>."},
        {p:"In a storytelling performance for the children, I played a tree."},
        {p:"Rather than simply playing the part in the script, I used my height to create a fun twist: <b>a \"talking tree\"</b> that spoke to the children."},
        {p:"It might have felt a bit silly at first, but seeing the children laugh and react when I appeared showed me the role could actually draw them naturally into the lesson."},
        {p:"The education plan itself framed it as a story with a giraffe, little giraffes and a tree - and I was the tree."},
        {p:"At first I thought I had just taken on a fun role."},
        {p:"But watching the children laugh, look up at me and follow the story changed my thinking a little."},
        {q:"In teaching, reaching students in a way that catches their interest mattered as much as explaining accurately."},
        {p:"I learned that the lesson design I studied in my major has to be applied far more flexibly in the field."},

        {k:"06 · Getting closer to the children", toc:"06 Getting closer", h:"Something connected before language did."},
        {p:"Language was clearly a limit when talking with local students."},
        {p:"At first I worried about what to do if they didn't understand my explanations or couldn't focus."},
        {p:"But with help from local university volunteers, and by simply engaging with the children, I gradually learned how."},
        {p:"Instead of explaining in complicated words, I showed them,<br>used expressions and gestures,<br>and started with actions they could copy."},
        {p:"Above all, <b>creating moments where we could laugh together</b> mattered."},
        {p:"Good English alone wasn't enough to teach well."},
        {p:"I had to keep watching what each student was looking at, what they found hard, and what made them laugh."},

        {k:"07 · The day I remember most", toc:"07 A day to remember", h:"The moment a window becomes a frame"},
        {p:"The sports day near the end of the trip is what I remember most."},
        {p:"At the rehearsal the day before, it rained and we had to move into the indoor gym."},
        {p:"The space was cramped and the sound echoed."},
        {p:"Running the program as planned looked impossible, so we stayed up late rethinking it as a team."},
        {p:"Repeating \"what do we do?\", we eventually prepared a way to run as much as we could indoors."},
        {p:"Then, the next morning,<br>the sky cleared as if nothing had happened."},
        {p:"We got to use the playground with the children after all."},
        {p:"It was hot.<br>The children were sweating, and so were we.<br>Yet somehow everyone looked happy."},
        {p:"During the games I sat down in the shade for a moment.<br>From there I could see the whole playground."},
        {p:"The children were running around."},
        {p:"The soap bubbles we had prepared floated by, sparkling in the sunlight, and the children chased after them."},
        {p:"The heat that had felt exhausting a moment ago didn't matter much then.<br>I just watched the scene."},
        {p:"After the sports day, the 40 volunteers performed the K-pop routine we had prepared back in Korea."},
        {p:"The children danced along at the front, laughing and cheering."},
        {p:"Watching them, my heart felt strangely full.<br>Perhaps because I knew I wanted to remember that moment for a long time."},
        {p:"As we wrapped up, the sports-day team lead said something."},
        {q:"\"The moment a window becomes a frame.\""},
        {p:"At first I took it as just a poetic phrase."},
        {p:"But thinking back to the moment I sat watching the playground, I understood exactly what it meant."},
        {p:"A window exists to look outside, but sometimes <b>the view beyond it feels like a work of art in itself.</b>"},
        {p:"That's what the playground was that day."},
        {p:"The children running around,<br>the bubbles drifting away,<br>my friends smiling in the heat,<br>the children cheering at the performance we had prepared all the way from Korea."},
        {p:"At the time it was just the day unfolding in front of me, but once it passed, it was time I could never return to in the same way."},
        {p:"So since that day, when a moment feels truly precious, <b>I try not to stop at just taking a photo.</b>"},
        {p:"What it smelled like,<br>what the weather was like,<br>how people's voices sounded,<br>how I felt - I try to remember all of it."},
        {p:"A photo can keep the scene,<br><b>but what I want to remember is the feeling and atmosphere I was part of.</b>"},
        {p:"The playground that day was that kind of moment for me."},
        {p:"<b>The moment a window becomes a frame.</b>"},

        {k:"08 · What ten days taught me", toc:"08 What I learned", h:"Even when things didn't go as planned, we solved them together."},
        {p:"While preparing, I worried whether the classes would go well."},
        {p:"What if the students didn't take part,<br>what if they didn't understand what I prepared,<br>what if we couldn't understand each other?"},
        {p:"But once I was there, I didn't have to solve every problem alone."},
        {p:"I had dependable teammates and local university students, and we filled in each other's gaps."},
        {p:"While I explained to the students, another teammate helped a student who was struggling, and the local students settled the room."},
        {p:"At first I was fixated on <b>\"I have to prepare well.\"</b>"},
        {p:"But by the end, I had come to think"},
        {q:"\"Together, we can solve far more than we expect.\""},

        {k:"09 · Coming home", h:"I finally met the children who had only existed in my imagination."},
        {p:"Before leaving, my expectations were high."},
        {p:"We had prepared classes, and we had prepared dances."},
        {p:"After so long spent preparing with the students in mind, the thought of meeting the children I had only imagined was thrilling."},
        {p:"When we arrived, the humid weather and moving as a group of 40 made everything hectic."},
        {p:"But once we reached our lodging and unpacked, it finally sank in."},
        {p:"<b>\"This is really starting.\"</b>"},
        {p:"Ten days later, flying back to Korea, I was thinking something completely different."},
        {p:"At first I thought a lot about what I could do for them;<br>by the end I thought more about <b>what I had experienced together with the children</b>."},
        {p:"When I started, I thought I was going there to give something."},
        {p:"Coming back, I felt I had received far more from the children."},

        {k:"10", toc:"10 What changed", h:"What changed afterwards"},
        {p:"Since then, when I teach or mentor, I no longer think only about delivering what I've prepared."},
        {p:"I watch how students react,<br>explain another way if they don't understand,<br>and look for new ways to win back their attention if they drift."},
        {p:"Above all, when preparing a lesson I now think about <b>not only \"what will I teach\" but also \"how will the student take it in.\"</b>"},
        {p:"In teamwork, too, I've come to accept more naturally that it's better to draw on what each person does best than to try to solve everything alone."},
        {p:"What I first learned from volunteering abroad was, surprisingly, nothing grand."},
        {q:"Preparing well and responding well are different skills."},
        {p:"And both are ultimately completed with other people."},

        {k:"11", toc:"11 The scene that stayed", h:"The scene that stayed with me longest"},
        {p:"Whenever I think of Indonesia, the sports day is still the first thing that comes to mind."},
        {p:"The hot playground.<br>Children running around.<br>Soap bubbles sparkling in the sunlight.<br>Forty volunteers dancing at the front.<br>And the children laughing as they watched."},
        {p:"I was simply happy then."},
        {p:"Which is why I was sad to see the moment pass."},
        {p:"<b>\"Will I still remember this scene later?\"</b>"},
        {p:"I think that's when it started -"},
        {p:"when I meet a special moment, trying to remember not just a photo but the air, the sounds and the feelings of it."},
        {p:"Even now, when I think back to that day, I remember sitting in the shade looking out over the playground."},
        {p:"And the words I heard then come back too."},
        {q:"\"The moment a window becomes a frame.\""},
        {p:"For me, those ten days in Indonesia were a time of discovering moments like that."},
        {p:"The first time I met the children,<br>the first class I led,<br>becoming a talking tree and making them laugh,<br>and watching the bubbles over the playground."},
        {p:"Back then they were just passing days,<br>but looking back, they are all scenes that will never come again."},
        {p:"So I don't want to remember this experience simply as <b>\"I went volunteering abroad.\"</b>"},
        {p:"I want to remember it as <b>ten days that taught me how to remember a once-in-a-lifetime moment</b>."}
      ]
    },
    creverse: {
      title: "Creverse Campus Crew, 1st cohort",
      summary: "Handled marketing work including Instagram promotional assets and research into the current education market.",
      short: "Made Instagram promo assets and researched the education market.",
      body: [
        {
          p: "As part of the first Creverse Campus Crew cohort I handled marketing: producing Instagram promotional assets and researching the state of the education market."
        }
      ]
    },
    "edutech-expo": {
      title: "2024/2026 EduTech Expo",
      summary: "Went beyond looking at the technology to observe which education problems it solves. Comparing two expos two years apart, I saw that data, user experience and policy shape edtech.",
      short: "Observed which education problems tech solves, and compared two expos two years apart.",
      nums: [
        {v:"2", t:"Expo visits", d:"24 Sep 2024 · 17 Sep 2026", hi:true},
        {v:"2", u:"yrs", t:"Period over which I compared the market", d:"2024 → 2026"},
        {v:"5", t:"Insights gained", d:"Problem · Data · Experience · Connection · Convergence"}
      ],
      numsLayout: "row",
      body: [
        {lead:"I went to look at technology, and ended up looking at the education problems it meets."},
        {p:"I attended the EduTech Expo twice, in 2024 and 2026. I started out looking at what technology was on show, but came to look at <b>which education problem each piece of technology is trying to solve</b>."},
        {p:"I could also compare how the market changed over those two years."},
        {facts:["24 Sep 2024", "17 Sep 2026", "COEX", "Adobe session"]},

        {k:"01 · Two years of change", h:"The biggest booths had changed hands."},
        {p:"In 2024, large textbook companies such as Chunjae Education and YBM held the big booths. In 2026, global company <b>Adobe</b> was the main sponsor, and the textbook giants were nowhere to be seen."},
        {p:"Adobe's participation read as a sign that the market is growing. I wondered why the textbook companies had disappeared, and found the cause: the <b>legal downgrade of AI Digital Textbooks (AIDT)</b>. (Source: <a href=\"https://edumorning.com/articles/1452\" target=\"_blank\" rel=\"noopener\">Edumorning article</a>)"},
        {cmp:[
          {n:"Before", t:"Textbook (must-have)", d:"Mandatory purchase with national funds · quality assured by review and approval · price controlled"},
          {n:"After", t:"Educational material (nice-to-have)", d:"Chosen at the principal's discretion · deprioritised when budgets are tight · excluded from textbook review"}
        ]},
        {p:"On 18 Nov 2025 the Ministry of Education passed an amendment to the Regulations on Textbooks that removed AIDT from the scope of textbooks. With a local education finance burden of up to KRW 6.6 trillion expected for 2025-2028, AIDT budgets that no longer carry legal force are likely to be the first cut. For companies, a stable barrier to entry and a guaranteed market vanished at the same time."},
        {q:"I realised that a field companies were investing in aggressively two years ago can turn on a single policy change."},

        {k:"02 · Problems before technology", h:"What matters is not the technology itself, but which problem it solves."},
        {p:"I saw AI tutors, in-house coding IDEs and digital textbooks, but the question that stayed with me was <b>\"which education problem does this technology solve?\"</b>"},
        {p:"The AIDT change looked like the same story: even with the technology, a market is hard to sustain unless the classroom needs it and policy backs it."},
        {p:"As a computer-education major who designs lessons, looking at technology as <b>\"what does it solve\" rather than \"what can it do\"</b> felt natural."},
        {p:"For example, Adobe wanted to cut the burden of filing a separate official request for every photo used in textbook writing, so it trained Firefly only on photos free of copyright disputes, making them free to use."},

        {k:"03 · Data-driven personalisation", h:"What separates personalised education is learning data."},
        {p:"Most companies used similar AI: <b>CAT</b>, which picks the next question by student level; <b>STT</b>, which turns speech into text; and <b>OCR</b>, which reads text from images. With similar technology, I thought the differentiator would be <b>the quantity and quality of data</b>."},
        {p:"A good example was the AI feedback at Haeppop Reading & Essay. It recognises even messy handwriting and analyses typos, structure and grammar, with over 10 million student records that keep improving its accuracy in real time. Seeing personalised learning built on each student's level and wrong-answer data, I felt that data is the core of personalising education."},

        {k:"04 · Experience over performance", h:"Even good technology doesn't last if teachers and students can't use it easily."},
        {p:"Even for the same coding IDE, the demos showed a clear difference. <b>Goorm IDE</b>, which Chunjae Education worked with, handled real-time teacher-student feedback more smoothly, while Alice School's in-house IDE felt limited in what it could do."},
        {p:"The Chunjae booth split the teacher and student screens to show how interaction happens in class. Showing <b>user experience inside a real lesson</b> rather than a feature list made it far easier to understand."},
        {p:"The 2026 Adobe session made the same point. Firefly's AI Assistant builds results from plain-language requests, so even people who find the tools hard can use it easily. It also automatically refuses inappropriate requests, so it was designed to suit classrooms."},
        {p:"Teacher workload, student accessibility and an intuitive UX seemed key to whether an edtech service lasts. So does parental acceptance. An Adobe representative told us that Korean parents are still quite resistant to AI in class. Since education involves social context that only people understand, I think <b>showing parents educational value and evidence they can accept</b> is part of the user experience too."},

        {k:"05 · The connector", h:"Between classrooms and tech companies, someone has to translate."},
        {p:"At the expo I saw groups of teachers saying, \"I'd love to see this technology at our school.\" Teachers know education problems best, and companies build the technology, but their languages and requirements differ."},
        {p:"In the AIDT case too, policy, companies and classrooms were moving by different standards."},
        {p:"That made me interested in <b>turning classroom problems into technical requirements, and bringing technology back into the classroom</b>."},

        {k:"06 · Converging technologies", h:"Edtech is where many technologies meet education."},
        {p:"At the 2026 Adobe session, I heard how generative AI is used to create content and apply it in education."},
        {ul:[
          "<b>Photoshop · Illustrator</b>: extend landscape photos to portrait, and convert 2D images to vector-based 3D naturally",
          "<b>Premiere Pro</b>: auto-captions in 30+ languages, and an object mask that tracks and masks moving objects",
          "<b>Firefly</b>: image, video and avatar generation with partner models such as GPT Image, Gemini and Veo; useful for visualising maths and academic concepts and making class-role icons",
          "<b>Copyright</b>: trained on stock images, so it is comparatively safe for educational and commercial use such as teaching materials"
        ]},
        {p:"AI, data, content creation and UX all gathered around one problem: education. I felt the importance of <b>convergent thinking</b> - applying technology from one field to another industry's problem."},

        {k:"07 · Looking back", h:"I learned to define the problem and connect the right technology."},
        {p:"At the EduTech Expo, I observed where technology meets real education problems rather than just learning about the technology."},
        {p:"I learned that learning data matters for personalising education, and that designing an experience teachers and students can really use matters as much as technical performance."},
        {q:"Between classroom problems and technology, a connection is needed."},
        {p:"I'll keep thinking about the role of a <b>Connector</b>: someone who understands classroom problems and connects data and other technology to them as solutions."}
      ]
    },
    "speech-mentors": {
      title: "KT&G Sangsang Univ Global Speech Mentors",
      summary: "Led a team delivering speech mentoring to foreign residents in Korea. Through conversations with a Pakistani resident, prepared a speech on recognising cultural difference and raising multicultural awareness.",
      short: "Team lead mentoring foreign residents in Korea on multicultural speeches.",
      body: [
        {
          p: "I led a team running speech mentoring for foreign residents in Korea. Listening to and talking with a Pakistani resident here, we prepared a speech together on recognising cultural difference and raising multicultural awareness."
        },
        {h:"Mentor programme schedule"},
        {
          ul: [
            "<b>Kick-off</b> - Fri 6 Sep, Sangsang Univ",
            "<b>Mentoring round 1</b> - 9-26 Sep",
            "<b>Mentor meeting 1</b> - Fri 27 Sep",
            "<b>Mentoring round 2</b> - 28 Sep - 10 Oct",
            "<b>Mentor meeting 2</b> - Fri 11 Oct",
            "<b>Mentoring round 3</b> - 11-31 Oct",
            "<b>Mentor meeting 3</b> - Fri 1 Nov",
            "<b>Event day</b> - Sat 9 Nov"
          ]
        },
        {note:"Mentor-mentee sessions ran team by team."}
      ]
    },
    odyvice: {
      title: "Odyvice Undergraduate Mentor",
      summary: "Mentored middle and high school students on study methods, mental wellbeing and more.",
      short: "Mentored secondary students on study habits and wellbeing.",
      body: [
        {
          ul: [
            "<b>Programme</b> - Odyvice undergraduate mentor corps",
            "<b>Span</b> - about five months; 5 hours, 5 sessions completed",
            "<b>Role</b> - advising middle and high school students on study method and managing their state of mind"
          ]
        },
        {h:"What it produced"},
        {
          ul: [
            "<b>One-to-one audio mentoring on paths and admissions</b> - live voice sessions with middle and high school students, coaching them on the comprehensive admissions track, school records, interview strategy and study worries, from the point of view of someone who had recently been through it.",
            "<b>Closing an information gap</b> - a low-cost, high-efficiency voice-based option for students outside the capital, or otherwise cut off from the expensive in-person admissions consulting market."
          ]
        },
        {h:"Reflection"},
        {
          p: "As a student in a college of education I am always studying pedagogy in the abstract, but chances to actually sit with students are rare. Empathising with what these students were worried about, and giving them advice, made me more invested in my own coursework. Finding somewhere to actually apply what I have learned, rather than stopping at the lecture, is one of my strengths."
        }
      ]
    },
    icists: {
      title: "KAIST ICISTS HACKAFAIR",
      summary: "Developed an idea over five days, built the materials in English and worked through mentoring sessions with overseas mentors in English.",
      short: "Developed an idea over five days, building the materials in English with overseas mentors.",
      body: [
        {
          p: "Over five days we developed an idea, built all the materials in English, and ran our mentoring sessions with overseas mentors in English."
        },
        {h:"Programme"},
        {
          ul: [
            "Keynote speech",
            "Culture night",
            "Discussion",
            "IDEAthon",
            "Talk concert",
            "Mentoring",
            "Actualizing",
            "Tech-Fair"
          ]
        },
        {link:"[HACKAFAIR 2024] Closing video", href:"http://youtube.com/watch?v=aaZnvdajMoU"}
      ]
    },
    goormthon: {
      title: "Goormthon Univ 3rd cohort: campus organiser",
      summary: "As part of a software development club, built programs around the club's mission and ran weekly study sessions and lectures.",
      short: "Campus organiser; built club programs and ran weekly study sessions.",
      proj: {
        name: "All of Us Are Yuljeon Now",
        type: "Game · Escape room",
        what: "A web escape-room game set on the Yuljeon campus, built with the Goormthon Univ cohort for Halloween and our college night. It has five quiz stages, a final game and a ranking, and we ran it in person at a booth.",
        role: ["Planning · PM", "Storyline", "PRD", "Stage & puzzle design"],
        team: "Team of 6 (planning 1 · front-end 3 · back-end 2)",
        period: "Jun – Oct 2024 · run on 31 Oct 2024",
        date: "Run on 31 Oct 2024",
        stack: ["React", "TypeScript", "Vite", "Tailwind CSS"],
        links: [{t:"GitHub · Front-end", href:"https://github.com/ESC-Organization/ESC-client"}]
      },
      vid: {
        k: "PROMO VIDEO",
        t: "Promo video for \"All of Us Are Yuljeon Now\"",
        d: "A video introducing the campus escape-room game we built with the Goormthon Univ cohort for Halloween and our college night.",
        pm: "As PM, I shaped the storyline and wrote the PRD."
      },
      body: [
        {h:"On campus"},
        {
          p: "Goorm is a Kakao subsidiary that runs coding bootcamps and builds IDEs. I got into Goormthon Univ representing SKKU, did the orientation at their Pangyo office, and met the rest of the SKKU cohort there for the first time."
        },
        {
          p: "Then, for Halloween and our college night on 31 October, we built a campus escape-room game called \"All of Us Are Yuljeon Now\". It was my first time as PM - writing the storyline and the PRD - and it turned out to be a genuinely fun game. Thanks to a very capable designer and developers it came out exactly as imagined; we were lucky enough to get a booth and run it in person, and the students loved it."
        },
        {k:"01 · Project", h:"An escape room about saving Yuljeon from bug monkeys"},
        {p:"For Halloween and our college night we built <b>a web escape-room game set on the Yuljeon campus</b> with the Goormthon Univ cohort. Players pick a character, go through five quiz stages and a final game, and check the result on a ranking."},
        {facts:["Planning Jun – Oct 2024", "Run on 31 Oct 2024", "Team of 6", "Planning · PM"]},

        {k:"02 · Team", h:"Planning 1 · Front-end 3 · Back-end 2"},
        {people:[{"role": "Planning · PM", "n": 1, "me": true, "note": "Me"}, {"role": "Front-end", "n": 3, "note": "One also did design", "dual": true}, {"role": "Back-end", "n": 2}], note:"The overall concept design was discussed by the whole team, and one teammate was solely in charge of character design."},

        {k:"03 · My part", h:"I planned everything from the idea to the structure of the game."},
        {p:"The whole team discussed the idea, but <b>the original idea was mine</b>. Once it was chosen, I led the storyline and took on the planning the game structure needed."},
        {flow:["Pitch the idea", "Build the storyline", "Write the PRD", "Design stages & puzzles", "Research game material", "Refine the plan during development"]},
        {roles:{tl:"TEAM", ml:"MY CONTRIBUTION", team:["Concept design: discussed by the team", "Character design: one teammate", "Development: 3 front-end (one also designed), 2 back-end"], mine:["Proposed the original game idea", "Led the storyline once the idea was chosen", "Wrote the PRD", "Designed the stages and puzzles", "Researched material for the game", "Over the summer break, refined the idea and basic design with the team before development", "Refined the plan during development"]}},
        {p:"I did not do any of the development. I focused on planning and on the content and structure of the game."},

        {k:"04 · Build", h:"What the repository shows"},
        {p:"Front-end and back-end teammates did the development. Below is what the public front-end repository shows."},
        {cards:[{"n": "FRONT-END", "t": "React 18 · TypeScript · Vite", "d": "Step-by-step screens with react-router: prologue, character select, quizzes 1–5, final game, ranking"}, {"n": "STATE · DATA", "t": "Zustand · TanStack Query", "d": "User state and server data, API calls with Axios"}, {"n": "UI", "t": "Tailwind CSS · Framer Motion", "d": "Styling and animation libraries"}]},
        {link:"GitHub · Front-end", href:"https://github.com/ESC-Organization/ESC-client"},

        {k:"05 · Looking back", h:"My first time as PM"},
        {p:"After proposing the first idea, I took on planning end to end: the storyline, the PRD, stage and puzzle design, and researching material. I did not develop, but we refined the idea and made the basic design together before development began, and I refined the plan as it went."},
        {p:"I learned how the front-end and back-end connect organically to become one game."},
        {p:"The game drew students in, and I found it rewarding to watch them enjoy it."},
        {q:"I came to realise that I enjoy building something with technology and watching the effect it has on people."},

        {h:"Inter-university work"},
        {
          p: "I ran a joint PM study group with people from Sejong and Soongsil. Over three months, meeting weekly, we worked through workflow methods, how development actually gets done, and how to use Figma. It is not an experience a first-year usually gets, so I went into it grateful - and everyone there was kind and sharp, which made it a good time."
        }
      ]
    },
    ched: {
      title: "Campus briefing for the Philippine CHED delegation",
      summary: "Introduced CHED officials to the interdisciplinary work of SKKU's College of Computing and Informatics, drawing strong interest.",
      short: "Presented SKKU computing's interdisciplinary work to CHED officials.",
      body: [
        {h:"Representing the school in front of an international delegation"},
        {
          p: "When the Philippine Commission on Higher Education (CHED) visited campus, I was chosen as the GDSC speaker representing the university's software program, and presented our work to the delegation. I wore the yusaengbok - the scholar's robe that stands for the school's identity - and went in carrying the school and the club on my shoulders."
        },
        {
          p: "Rather than leaning on a memorised script, I read the room and ran a flexible English talk built around live questions and answers. That let me convey the IT work and interdisciplinary results GDSC had been driving with some energy, and the delegation responded warmly."
        },
        {
          p: "The campus paper S-PRESS covered it, recording that - alongside students from software engineering and the Culture & Technology convergence major - I introduced the CHED officials to the college's interdisciplinary work, as a first-year in computer education."
        },
        {
          link: "Press coverage - S-PRESS",
          href: "https://www.spressnews.com/news/articleView.html?idxno=119305"
        }
      ]
    },
    dreamon: {
      title: "Dream On School",
      summary: "Assisted classes for adolescents with developmental disabilities, among other activities.",
      short: "Assisted classes for adolescents with developmental disabilities.",
      body: [
        {h:"What I did"},
        {
          ul: [
            "I assisted across the whole class day. The centre split the day into three periods - art therapy, Korean traditional music, and vocal musical - each with its own instructor.",
            "My role was to step in firmly when a student was about to act out, saying \"No - please calm down.\" The resident assistant teachers showed me how.",
            "When we walked to an outside janggu studio for the traditional-music class, one of us went ahead and one behind, keeping the group on route.",
            "In the vocal musical class I ran the computer at the front, putting the lyrics up for the students - which let me watch the students and the teaching method closely.",
            "During breaks I talked with the students. The centre asked us not to initiate, so I didn't - but when a student started a conversation we'd trade ordinary things: where we lived, what we liked doing."
          ]
        },
        {h:"What I took away"},
        {
          p: "Being close to it, I read up on borderline personality disorder, schizophrenia and the autism spectrum. There is no shortage of material organising traits by diagnosis - but I could not find a classification that matched the students I actually met. People are singular, and spending time with these students made that far more concrete to me."
        },
        {
          p: "A teacher meeting a student with a disability will reach first for the per-diagnosis teaching guide. That matters - but what matters more is looking at the student with real attention and teaching to their individual traits. As information technology brings individualised education closer, I expect an integrated classroom to become possible before long."
        },
        {
          p: "The centre was about an hour from home, and on the bus back I ended up riding with the students from that day's class. It landed differently than anything else had: people I had thought of as distant were in fact right here. If we want an integrated society, integrated classrooms have to come first."
        }
      ]
    },
    "ba-dive": {
      title: "SKKU-BA-DIVE application",
      summary: "Applied with fellow GDSC members, passed the first round and was not selected at the final interview.",
      short: "Applied with GDSC peers; passed round one, not selected at the final interview.",
      body: [
        {
          p: "I applied together with people from GDSC, passed the first round, and was not selected at the final interview."
        }
      ]
    },
    "s-global": {
      title: "S-Global Challenger application",
      summary: "Entered the university's overseas-dispatch competition together with fellow GDSC members.",
      short: "Entered SKKU's overseas-dispatch competition with GDSC peers.",
      body: [
        {
          ul: [
            "<b>What</b> - writing the 2024 S-Global Challenger proposal for SKKU GDSC",
            "<b>Span</b> - first half of 2024; a four-person team proposal for an overseas R&D visit and research project",
            "<b>Role</b> - on the GDSC AI/TensorFlow team: defining the research topic on AI-based market forecasting, designing the time-series modelling architecture, planning collaboration with overseas institutions, and leading the writing"
          ]
        },
        {h:"Framing the research question"},
        {
          ul: [
            "Designed an LSTM- and ARIMA-based time-series framework that links Google Trends search data with macroeconomic and demographic indicators to forecast future business demand.",
            "Read the overseas literature first to understand where time-series models break down, then worked out a TensorFlow-based hyperparameter optimisation plan."
          ]
        },
        {h:"Global R&D collaboration roadmap"},
        {
          ul: [
            "Planned development-exchange workshops with the University of Toronto and TMU GDSC, plus technical interviews and lab visits at the Vector Institute, BlueDot and Google Canada's AI Research Lab.",
            "Tied the plan to global business and data-science conferences (ICMABEBR, ICSDS) to give the industry-academia direction some structure."
          ]
        },
        {h:"Execution and dissemination"},
        {
          ul: [
            "Laid out a staged plan to turn the research model into an actual web/app product, plus a dissemination process - journal write-up, visualisation posters, technical explainer videos.",
            "Combined computer-education knowledge with the business and economics domain, turning an abstract concern into a complete, defensible research plan."
          ]
        },
        {h:"Reflection"},
        {
          p: "With the SKKU GDSC team I found the topic - AI analysis and forecasting of business markets using Google Trends data - and led the writing of the proposal. Rather than stopping at the idea, I analysed whether an LSTM forecasting model combining the Google Trends API with economic indicators was technically feasible."
        },
        {
          p: "Pulling a large body of technical documentation and overseas research into one coherent proposal was where I grew most. As a computer-education major I learned to connect complex AI work to business problems, and - by taking on something well above my level - built the habit of structuring an idea until it holds together."
        }
      ]
    },
    premed: {
      title: "FreeMed",
      summary: "Led the part of the team providing home health-care visits to elderly residents living alone in jjokbang districts.",
      short: "Led home health-care visits for elderly residents living alone · about a year, 17 visits.",
      body: [
        {
          p: "For about a year I led the home health-care visiting part of the team, working with elderly residents living alone in jjokbang districts."
        }
      ]
    },
    likelion12: {
      title: "LIKELION SKKU 12th",
      summary: "As PM, planned and shipped an advertising-agency platform with a team of five.",
      body: [
        {h:"1. Campus study group - front-end foundations and how API communication works"},
        {
          p: "We ran a fortnightly study group covering React state management and the core front-end concepts. Rather than stopping at theory, we used Postman to make requests against Hugging Face's GPT-2 model API and handle the JSON responses. That made the client-server exchange concrete, and taught me CRUD over HTTP methods and standard REST design from a practical angle."
        },
        {h:"2. Campus ideathon - Tomak(e)"},
        {
          ul: [
            "<b>Service</b> - Tomak(e)",
            "<b>Team</b> - Dopamine Addicts (2024 LIKELION campus ideathon)",
            "<b>Taglines</b> - \"From un-productive to BE-productive\" / \"Make a short moment of your time meaningful\""
          ]
        },
        {p:"<b>Background and problem</b>"},
        {
          ul: [
            "<b>Too busy to exercise</b> - modern schedules leave little room to set time aside for it",
            "<b>Digital overuse</b> - rising unconscious, unproductive phone time, short-form video above all",
            "<b>Time-efficiency as a trend</b> - consumption increasingly judged by return on time spent"
          ]
        },
        {
          p: "<b>Goal and audience</b> - use the offcuts of a day to manage physical and mental health together and lift overall wellness, aimed at students and office workers who care about their health despite busy schedules."
        },
        {p:"<b>Core features</b>"},
        {
          ul: [
            "<b>Home</b> - stats on the spare minutes used today, a personalised avatar, and the day's schedule",
            "<b>Context and availability</b> - enter where you are (train, office) and how many minutes you have",
            "<b>Recommendation engine</b> - exercise, stretching or meditation content matched to that place and duration",
            "<b>Run and time it</b> - guide videos with a live timer",
            "<b>Results and sharing</b> - see what you completed and share progress with friends"
          ]
        },
        {
          p: "<b>What set it apart</b> - physical exercise and mental recovery in one place, gamification through activity rewards and avatar customisation, and motivation through sharing with friends."
        },
        {
          p: "<b>Business model</b> - per-impression advertising, plus partnership fees from healthcare companies promoting products and services."
        },
        {
          p: "<b>Stack</b> - front end: Flutter, Next.js · back end: Spring · databases: MySQL, PostgreSQL · cloud: AWS, Firebase · version control: Git, GitHub."
        }
      ]
    },
    gdsc: {
      title: "Google Developer Student Clubs",
      summary: "When GDSC's reorganisation into GDG on Campus cut off the Google network we used to rely on, I booked speakers for the monthly global IT seminar through several routes - cold emails, people I had met in class, and referrals from the university program - and documented the whole outreach process in Korean and English.",
      short: "Booked monthly IT seminar speakers without an existing network; documented the process.",
      body: [
        {
          ul: [
            "<b>Dates</b> - Mar 2024 - Feb 2025",
            "<b>Chapter</b> - GDSC Sungkyunkwan University (now GDG on Campus)",
            "<b>Role</b> - joined the Administration team, then selected as Core / HR lead the next semester (Administration team of 4)",
            "<b>Owned</b> - most speaker outreach for the monthly global IT seminar",
            "<b>Scale</b> - about 20-30 attendees per session, online and offline"
          ]
        },
        {h:"01. Situation: no network to draw on"},
        {
          p: "When I joined the Administration team in March 2024, the first-half speakers were already booked. Once I was selected as HR lead and took over second-half outreach myself, I found that the internal Google network we used to rely on was no longer available. GDSC was <b>in the middle of becoming GDG on Campus</b>, and all my predecessor could hand over was the method: \"you'll have to book people by cold email.\""
        },
        {
          p: "The most urgent date was the October seminar, about six weeks away. A late booking would push back preparation and promotion too - and because the university program was paying speaker fees, I felt <b>responsible for turning that budget into real talks</b>."
        },
        {h:"02. Decision: don't depend on a single route"},
        {
          p: "I started by contacting overseas IT experts directly over LinkedIn and email. Not everyone responded the same way, and some declined once they saw the terms. So rather than narrowing the target, I switched to <b>working several different points of contact at once</b>."
        },
        {
          ul: [
            "<b>Overseas IT experts</b> → cold messages on LinkedIn and email",
            "<b>Experts I had met in class</b> → direct contact building on that earlier meeting",
            "<b>The university program's network</b> → bookings through referrals",
            "<b>Korean professionals working abroad</b> → chosen for experience Korean students could learn from"
          ]
        },
        {
          p: "I didn't lock the contact channel either. Rather than insisting on the Google organisation's official platform, I decided that <b>actually being able to talk with a speaker mattered more for getting the talk to happen</b>."
        },
        {h:"03. Action: turning outreach into a repeatable process"},
        {
          ul: [
            "<b>Cold emails</b> - separate Korean and English invitations for Korean and international speakers. Each one covered why I had chosen them (after checking their interests on LinkedIn), the topic, length, format, audience, fee, equipment and post-talk feedback, so they could decide without having to ask anything first.",
            "<b>Adapting the channel</b> - with an India-born expert based in the US, messages on Google Chat were slow to be read. I asked which channel suited them, heard WhatsApp, confirmed the switch with our GDSC lead, and scheduling and preparation sped up.",
            "<b>Using existing connections</b> - I wrote to a computer-vision and robotics expert whose guest lecture I had attended in an AI convergence class, saying the talk had stayed with me and I wanted other students to hear it. Through the program director's network I was also introduced to an NVIDIA expert and booked that talk.",
            "<b>Documenting the process</b> - so the next person wouldn't repeat the trial and error, I wrote up the flow of <b>first contact → details → contact channel</b>, with Korean and English message templates and a talk-information sheet that we reused for later bookings."
          ]
        },
        {h:"04. Speakers booked"},
        {
          ul: [
            "A computer-vision and robotics expert (met at a guest lecture in class)",
            "An NVIDIA expert (referred by the program director)",
            "A former teenage TED speaker who now advises Google",
            "Other IT professionals in Korea and abroad"
          ]
        },
        {
          p: "At the former TED speaker's seminar, what stood out was that the talk covered not only technology but the speaker's own path - careers and taking on challenges - for the students in the room. A Google Korea engineer who couldn't give a talk under company policy kept the conversation going with me and ended up offering a coffee chat."
        },
        {h:"05. Running the talks and settling payments"},
        {
          p: "Seminars ran online and offline with about 20-30 attendees each. The speaker fee was KRW 300,000 per talk, and I walked speakers through the paperwork the program required, collected it and passed it on. Some speakers said sharing knowledge was reason enough and declined the fee; for them I worked out with the program office to offer a school gift - a mascot plush or a book - and handled the follow-up and shipping details."
        },
        {h:"06. Results"},
        {
          ul: [
            "<b>Monthly IT seminar</b> - handled most second-half speaker outreach and supported a year of regular talks.",
            "<b>About 20-30 per session</b> - online and offline seminars for SKKU students.",
            "<b>A range of experts</b> - brought in speakers from computer vision and robotics, NVIDIA, Google and more.",
            "<b>A documented process</b> - Korean and English templates left in a form the next organiser can pick up."
          ]
        },
        {h:"07. What I learned"},
        {
          p: "When I sent my first cold email, I had no idea whether a stranger would ever write back. Once I actually reached out, far more people than I expected were keen to share their experience with students. It showed me how warm the developer community is, and that <b>you don't need to have everything in place before you can start</b>. If something is needed, you can look for it, reach out and build the way there."
        },
        {h:"08. What changed afterwards"},
        {
          p: "Reaching out to people I don't know now feels natural. Contacting Japanese universities directly and proposing collaboration to other GDSC leads while preparing RE:ALThon came from the confidence I built here. I also got into the habit of looking first at the other person's platform and situation - <b>connecting in the way that is easiest for them to answer, not the way that is easiest for me</b>."
        }
      ]
    },
    "trade-ai": {
      title: "2024 Undergraduate Trade & AI Camp",
      summary: "Took part in the trade-and-AI camp for undergraduates run by the Korea International Trade Association.",
      short: "Joined KITA's trade-and-AI camp for undergraduates.",
      body: [
        {
          ul: [
            "<b>What</b> - the Trade & AI camp for undergraduates run by the Korea International Trade Association (KITA)",
            "<b>Shape</b> - lecture track, an AI idea pitch competition, and a follow-on certification (Trade English Level 1)",
            "<b>Role</b> - studying DX cases across trade and industry plus data literacy; on the pitch team, selecting the data and setting the technical direction"
          ]
        },
        {h:"Data literacy"},
        {
          p: "I worked through the distinction between big data and thick data, and the five-stage process for collecting, interpreting and using data."
        },
        {h:"DX in practice across the trade industry"},
        {
          ul: [
            "<b>Manufacturing</b> - LS Group's smart factory: non-linear AI prediction models that account for causal relations between process variables, used to optimise energy and cost.",
            "<b>Logistics</b> - robotic automation across loading, storage, picking, packing and delivery.",
            "<b>Finance and platforms</b> - blockchain-based letter-of-credit issuance, and KITA's AI semantic search service."
          ]
        },
        {h:"XAI and AI safety"},
        {
          ul: [
            "Studied how Layer-wise Relevance Propagation and neuron-editing in GANs make a model's reasoning visible and correctable.",
            "Covered the AI safety principles - fairness, transparency, reliability - and the corporate standards for applying them on the ground."
          ]
        },
        {h:"Contribution to the team project"},
        {
          p: "Most of the team were trade majors. I leaned on their domain knowledge and contributed from the other side - the feel for software and data I had built up. Above all I set the analytical direction: which data to clean and use so the result would come out visible and unambiguous."
        },
        {h:"What followed"},
        {
          p: "The camp deepened my interest in the business ecosystem where trade and technology meet. I kept studying, and eventually took the <b>Trade English Level 1</b> certification to back it up."
        }
      ]
    },
    "future-tech": {
      title: "Future Technologies of the Fourth Industrial Revolution",
      summary: "Completed 14 online courses over two days, 14 hours in total.",
      body: [
        {
          ul: [
            "<b>Host</b> - the Ministry of Education's A.I.B convergence-university program / SKKU AI Institute",
            "<b>Dates</b> - 13-14 February 2024, 14 hours completed",
            "<b>Content</b> - lectures by experts from Microsoft, AWS, Google Cloud and NVIDIA"
          ]
        },
        {h:"What I took from it"},
        {
          ul: [
            "Technical grounding across generative AI (DALL-E 3, Copilot), Azure AI Studio, cloud and the metaverse.",
            "A clearer sense of how current IT trends connect back to a computer-education major."
          ]
        },
        {h:"Reflection"},
        {
          p: "I found the lecture series on the university site and signed up. It ran full-time across two days - 14 hours - with experts from Microsoft, AWS, Google and NVIDIA on generative AI, cloud and Azure AI Studio, straight from the front line of the work."
        },
        {
          p: "It gave me several angles on how fast AI is diversifying, and left me confident that my direction and aptitude line up with my major. The pace of the ecosystem can feel like a weight - but chasing and applying those changes is also where I found the pull, and the pleasure of getting better at something."
        }
      ]
    },
    worldvision: {
      title: "World Vision",
      summary: "Translated World Vision sponsor letters into English: 120 letters, 40 hours in total.",
      short: "Translated 120 World Vision letters into English (40 hours).",
      body: [
        {
          ul: [
            "<b>Programme</b> - World Vision child-letter translation corps",
            "<b>Span</b> - about six months; 40 hours, 120 letters completed",
            "<b>Role</b> - translating correspondence between sponsored children overseas and their sponsors in Korea, both directions"
          ]
        },
        {h:"What it produced"},
        {
          ul: [
            "Ten letters a week, accurate and on deadline, to 120 completed (paused during exam periods).",
            "Working to the given template and systematising my routine raised both speed and accuracy.",
            "Translating for the child's feeling and context, not just the words, so the exchange with the sponsor stayed genuine."
          ]
        },
        {h:"Reflection"},
        {
          p: "I started before university. I was looking for volunteering that used the English I was confident in, and this one ran online - which meant I could keep it up alongside my studies."
        },
        {
          p: "I carried it through into my first year - six months, 120 letters, 40 hours. Ten a week felt like a lot at first, but after a few months working to the template I got quicker and surer at it."
        },
        {
          p: "Most of all, these were letters children were writing to their sponsors. Reading their unguarded accounts of their lives made the work feel worth doing, and kept me coming back each week gladly."
        }
      ]
    }
  },

  /* Text for the full volunteer-record window */
  volunteerLog: {
    open: "See every entry",
    title: "Full volunteer record",
    summary: "{dur} in {n} sessions",
    period: "{from} - {to}",
    source: "From the official 1365 Volunteer Portal certificate (issued {issued})",
    more: "Show {n} more",
    less: "Show less",
    groupSummary: "{n} sessions · {dur}",
    duration: "{h}h {m}m",
    durationHours: "{h}h",
    columns: ["Date", "Activity", "Field", "Time"],
    close: "Close",
    orgs: {
      ktng: "KT&G Sangsang Withus Winter Overseas Volunteer Corps",
      premed: "FreeMed",
      redcross: "Korean Red Cross",
      dreamon: "Dream On School"
    },
    titles: {
      homeVisit: "Home health-care visit, jjokbang district",
      deployment: "Overseas deployment (Indonesia)",
      performance: "Group performance rehearsal",
      supplies: "Supplies preparation meeting",
      camp: "Preparation camp",
      closing: "Closing ceremony",
      accounting: "Accounting and supplies team",
      launch: "Launch ceremony",
      teachingRehearsal: "Teaching rehearsal",
      prepMeeting: "Preparation meeting",
      bloodDonation: "Blood donation",
      classAssist: "Class assistance, adolescents with developmental disabilities"
    },
    fields: {other: "Other", health: "Health", education: "Education"}
  }
};
