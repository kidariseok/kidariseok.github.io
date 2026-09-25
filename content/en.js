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
  page: {
    nav: {
      about: "About",
      records: "Records",
      activities: "Activities",
      certs: "Certifications",
      awards: "Awards",
      contact: "Contact"
    },
    hero: {
      school: "Computer Education, Sungkyunkwan University · Class of 2024",
      intro: "I enjoy connecting technology to people and ideas. Studying AI, data and software, I have built those connections hands-on through GDGoC, hackathons, service planning, teaching and mentoring.",
      buttonActivities: "See activities",
      buttonContact: "Contact"
    },
    featured: {title:"Highlights", more:"All activities"},
    about: {
      title: "About",
      paragraph1: "I don't stop at learning technology; what I enjoy is connecting it to people and ideas.",
      paragraph2: "Studying computer science and education in Computer Education at Sungkyunkwan University, I have focused on AI, data and software and taken part in a wide range of projects.",
      paragraph3: "Through GDGoC, hackathons, service planning, teaching and mentoring, I have built experience connecting technology to real people, organisations and problems.",
      paragraph4: "Going forward, I want to grow into someone who works with many different people and, grounded in a real understanding of technology, turns ideas into actual results.",
      profileTitle: "Profile"
    },
    records: {
      title: "Records",
      description: "Volunteer hours follow the official 1365 volunteer certificate."
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
    close: "Close",
    all: "All",
    showAll: "Show all {n}",
    viewAxes: "By field",
    viewTypes: "By activity",
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
    club: "Club",
    campus: "Campus",
    course: "Course"
  },
  keywords: ["AI", "Data", "Software", "Computer Education", "Education", "Mentoring", "Volunteering", "Student programs", "Service planning", "Projects", "Hackathons", "International school", "English", "Global speakers", "Overseas volunteering", "Exchange student", "GDGoC", "Hackathon lead", "PM"],
  interests: ["AI · Data", "PM", "Service planning", "Developer", "Global"],
  profile: [
    ["Name", "Jinseok Oh"],
    ["Major", "Computer Education, SKKU"],
    ["Class", "Class of 2024"],
    ["Interests", "EdTech"],
    ["Currently", "Serving in the Republic of Korea Army as a Network Manager / Squad Leader"],
    ["Writing", "blog.naver.com/kidariseok"]
  ],
  tiles: {
    activities: {label:"Recorded activities", unit:"", note:"{from} - {to}"},
    certs: {label:"Certifications", unit:"", note:"3 computing · 3 English · 1 other"},
    scholarships: {label:"Campus scholarships", unit:"", note:"Over $3,500"},
    volunteer: {label:"Volunteer hours", unit:"h+", note:"1365 certificate · {n} sessions"},
    ielts: {label:"IELTS Overall", unit:"", note:"Listening 9.0 · Reading 8.5"},
    toeic: {label:"TOEIC", unit:"", note:"LC 485 · RC 490"},
    dulwich: {label:"Dulwich College Suzhou", unit:" yrs", note:"International school in Suzhou, China", more:"Five years of learning alongside classmates from many cultural backgrounds taught me to adapt quickly to new environments and built my global perspective."},
    hackathon: {label:"Hackathon hosted", unit:" ppl", note:"RE:ALThon · HR lead"},
    funding: {label:"Funding secured", value:"$4K+", unit:"", note:"Funded by College of Computing and Informatics from <b>3</b> Universities."}
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
      detail: "Subject scores 76 / 72 / 64 (avg. 70.76)",
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
      detail: "LC 485 · RC 490",
      issuer: "YBM / TOEIC Committee Korea",
      status: "Expired"
    },
    "korean-history-1": {
      name: "Korean History Proficiency, Level 1",
      result: "Pass",
      detail: "87 / 100",
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
        },
        {files:["Artificial_Intelligence_in_Second_and_Foreign_Language_(L2)_Education.pdf"]}
      ]
    },
    realthon: {
      title: "RE:ALThon (host)",
      summary: "As SKKU GDSC's HR lead, hosted a 90-person hackathon and secured roughly $4,300 in funding from three universities' software programs.",
      short: "HR lead of SKKU GDSC; hosted a 90-person hackathon and raised ~$4,300.",
      body: [
        {h:"How it came together"},
        {p:"<b>1. Trying to run it online and offline at once</b>"},
        {
          p: "I reached out to Canada and Japan, whose time zones lined up reasonably well - connecting first on LinkedIn, then moving to Discord for real conversation. It fell through when participation on the Japanese side dropped off."
        },
        {p:"<b>2. Recruiting partner universities in Korea</b>"},
        {
          p: "There was a Slack channel where the GDSC leads gathered. From there I contacted Yonsei, Korea University and Sogang directly, and settled on running it offline together with Korea University and Sogang. Since all of us were clustered around Seoul, we planned the event in person as well as online."
        },
        {p:"<b>3. Venue support and sponsorship</b>"},
        {
          p: "I secured roughly $4,300 from the three universities' software programs, and the event ran at 90 participants."
        }
      ]
    },
    line4: {
      title: "LIKELION Line-4 Hackathon",
      summary: "Served as PM, owning planning and overall direction, and built low-fidelity wireframes in Figma to define screen structure and layout before handoff to designers.",
      short: "PM for planning and direction; built low-fi wireframes in Figma.",
      body: [
        {p:"At the Line-4 Hackathon I took the PM role for a team of five."},
        {
          p: "I owned the planning and the overall direction, and built the low-fidelity wireframes in Figma myself - defining screen structure and layout before anything went to the designers."
        }
      ]
    },
    "ktng-overseas": {
      title: "KT&G Sangsang Withus Overseas Volunteer Corps",
      summary: "Deployed to Bogor, Indonesia for 177 hours of education and environmental-improvement volunteering.",
      short: "177 hours of education and environmental volunteering in Bogor, Indonesia.",
      body: [
        {
          ul: [
            "<b>Role</b> - accounting and supplies team",
            "<b>Actual deployment</b> - 8-17 January 2025",
            "<b>Location</b> - Bogor, Indonesia",
            "<b>Hours</b> - 177 (education and environmental improvement)"
          ]
        },
        {
          p: "In the run-up to deployment I wrote the cultural-exchange and education-volunteering plans, and produced the materials for the on-site programs myself - Korean ddakji and fan-decorating among them."
        },
        {
          files: [
            "1조_문화교류_계획서_1130.docx",
            "3차_1조_교육봉사_계획서-1.docx",
            "상상위더스딱지치기_오진석.docx",
            "상상위더스부채꾸미기_오진석.docx"
          ]
        }
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
      title: "2024 EduTech Expo",
      summary: "Attended the expo to follow the latest edtech trends and took an Adobe masterclass, broadening my knowledge on my own initiative.",
      short: "Followed the latest edtech trends and took an Adobe masterclass.",
      body: [
        {
          p: "On 23 September I went to the EduTech Expo at COEX. I had already signed up on my own - and then my Educational Multimedia class set attending it as an assignment, which I found funny."
        },
        {
          p: "I had thought of edtech as a blue ocean. Walking the floor, it looked more like a market where a great many companies - Chunjae Education, Alice School and others - are already competing hard. Because a computer-education major should have an edge here, I found it all the more interesting, and lost track of time for four or five hours."
        }
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
        },
        {files:["오디바이스_수업_내역.png"]}
      ]
    },
    icists: {
      title: "KAIST ICISTS HACKAFAIR",
      summary: "Developed an idea over five days, built the materials in English and worked through mentoring sessions with overseas mentors in English.",
      short: "Developed an idea over five days with overseas mentors, in English.",
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
      body: [
        {h:"On campus"},
        {
          p: "Goorm is a Kakao subsidiary that runs coding bootcamps and builds IDEs. I got into Goormthon Univ representing SKKU, did the orientation at their Pangyo office, and met the rest of the SKKU cohort there for the first time."
        },
        {
          p: "Then, for Halloween and our college night on 31 October, we built a campus escape-room game called \"All of Us Are Yuljeon Now\". It was my first time as PM - writing the storyline and the PRD - and it turned out to be a genuinely fun game. Thanks to a very capable designer and developers it came out exactly as imagined; we were lucky enough to get a booth and run it in person, and the students loved it."
        },
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
        },
        {files:["장애학급_봉사활동_보고서.docx"]}
      ]
    },
    "ba-dive": {
      title: "SKKU-BA-DIVE application",
      summary: "Applied with fellow GDSC members, passed the first round and was not selected at the final interview.",
      short: "Applied with GDSC peers; passed round one, not selected at the final interview.",
      body: [
        {
          p: "I applied together with people from GDSC, passed the first round, and was not selected at the final interview."
        },
        {files:["Skku-ba-dive.pdf"]}
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
        },
        {files:["2024_S-Global_Challenger_프로그램_창조적_도전계획서.pdf"]}
      ]
    },
    premed: {
      title: "FreeMed",
      summary: "Led the part of the team providing home health-care visits to elderly residents living alone in jjokbang districts.",
      short: "Led home health-care visits for elderly residents living alone.",
      body: [
        {
          p: "For about a year I led the home health-care visiting part of the team, working with elderly residents living alone in jjokbang districts."
        },
        {files:["쪽방촌_봉사_내역.pdf"]}
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
        },
        {files:["멋쟁이사자처럼_세션_자료.pdf", "세션_발표자료_오진석.pdf", "멋쟁이사자처럼_교내_ideation.pdf"]}
      ]
    },
    gdsc: {
      title: "Google Developer Student Clubs",
      summary: "Within the university's software program, hosted monthly global IT video lectures and planned a global hackathon for the second half of the year. As a Core member, led the Administration team and handled most speaker outreach.",
      short: "Core member; led Administration and speaker outreach for global IT talks.",
      body: [
        {h:"Bringing global IT experts to campus"},
        {p:"<b>Networking built on foot: turning a limit into an opening</b>"},
        {
          p: "I joined the Administration Team to follow technology trends more broadly and give something back to the community, running the monthly technical seminar. In my first semester I focused on close follow-up with booked speakers and on running the events themselves; that work got me selected as a Core member the following semester."
        },
        {
          p: "Leading the talks as a Core member, I ran into the limits of booking. GDG was mid-reorganisation, so there was no usable Google network to draw on - I opened a path with cold emails across LinkedIn and email. I wrote respectfully to a computer-vision and robotics specialist I had met when they guest-lectured in a class, and landed them; I worked the university program director's network and brought in an NVIDIA expert. I went further and hosted a global expert who had given a TED talk as a teenager and now advises Google."
        },
        {
          p: "<b>Flexible global communication</b> - I didn't hold to LinkedIn for its own sake; where a speaker preferred WhatsApp, I met them there. With a Google Korea engineer who couldn't speak due to internal policy, I kept the conversation going politely and ended up invited for a coffee chat - a good look at how open the networking culture in tech can be."
        },
        {
          p: "<b>Seeing the administration through</b> - I didn't stop at planning. I coordinated closely with the university program staff on speaker fees and budget execution, and carried the paperwork to the end. Many speakers said sharing knowledge with students was reward enough, so I also handled getting school gifts to them. Owning a project from planning through to close-out is where I learned what responsibility for it actually means."
        },
        {
          p: "Finding a way through when I hit a wall, and holding communication and administration together across different stakeholders, is what I expect to carry into the projects that come next."
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
        },
        {files:["2024_대학생_무역_인공지능_캠프.pdf"]}
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
        },
        {files:["수료_증빙.png"]}
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
