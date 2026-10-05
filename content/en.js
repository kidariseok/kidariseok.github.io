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
     page        메뉴 · 첫 화면 · SELECTED WORK · 소개 · 활동 기록 · 이력 · 연락처 · 푸터
     ui          버튼과 작은 라벨 글자
     categories  활동 구분 이름 4가지
     keywords    첫 화면 이름 뒤 키워드 띠 (장식)
     tiles       숫자 모음의 글자 (숫자 자체는 common.js)
     certHead / certGroups / certs   자격증
     awards      장학 · 수상 (금액은 common.js)
     activities  활동 제목 · 요약 · 상세 본문
                 card: 메인 '대표 활동' 카드의 두 줄 {role, result}
                 panel: 상세 페이지 맨 위 요약 패널 {role, team, scale, period, where, result, links} (프로젝트는 proj)
                 본문 블록: {h:"소제목"} {p:"문단"} {ul:["항목", ...]}
                            {note:"회색 참고 상자"} {files:["파일이름"]}
                            {link:"링크 글자", href:"https://..."}
                 <b>굵게</b> 를 p · ul 안에서 쓸 수 있습니다.
   ══════════════════════════════════════════════════════════════ */
window.SITE = window.SITE || {};
SITE.en = {
  name: "JINSEOK OH",
  page: {
    // 상단 메뉴 5개 (휴대폰에서는 상단 바 아래에 가로 한 줄로 나옵니다)
    nav: {work:"Work", about:"About", activities:"Activities", credentials:"Credentials", contact:"Contact"},
    hero: {
      school: "Computer Education, Sungkyunkwan University · Class of 2024",
      // 학교 줄 끝 배지. 학점은 여기와 '이력' EDUCATION 줄, 두 곳에만 나옵니다
      gpa: "GPA 4.33",
      gpaMax: "/ 4.5",
      headline: "Connecting technology, people, and industry.",
      intro: "I have explored technology, education, planning, and global experiences through diverse activities. I understand technology, but I do not stop at technology itself. I care about how it can create value for people, organizations, and industries.",
      buttonWork: "See selected work",
      buttonContact: "Contact"
    },
    work: {
      kicker: "SELECTED WORK",
      title: "Projects I built and key activities",
      desc: "Each card starts with what it was and what I was responsible for. Open any card for the full record.",
      projects: "Projects",
      projectsSub: "Services I planned and built",
      featured: "Highlights",
      featuredSub: "Event organizing · Community · Overseas volunteering · Field exploration"
    },
    projects: {
      labels: {what:"WHAT", role:"MY ROLE", tools:"MY TOOLS", stackTeam:"STACK · built by team", team:"TEAM", scale:"SCALE", period:"PERIOD", where:"WHERE", result:"RESULT", stack:"STACK", links:"MORE"},
      jumpVideo: "Promo video", jumpDeck: "Slides",
      open: "View project", play: "Hover to play", tbd: "To confirm"
    },
    about: {
      kicker: "ABOUT",
      title: "Through diverse experiences, I found my own direction.",
      steps: [
        {label:"EXPLORE", period:"2024", text:"After entering Computer Education at Sungkyunkwan University, I tried the areas that drew me: AI and data, service planning, education, and global activities."},
        {label:"DISCOVER", period:"2024 – 2025", text:"Along the way, I found that my interest lies less in technology itself than in where it meets people and industry."},
        {label:"ADAPT", period:"2025 – 2026", text:"While serving in the Republic of Korea Army as a network management soldier and squad leader, I earned four certifications and two English test scores to prepare for what comes next.", more:"See certifications", em:true},
        {label:"NEXT", period:"Next", text:"I want to connect technology with real-world needs, bridging people, ideas, and industry to create meaningful value."}
      ]
    },
    activities: {kicker:"ACTIVITY ARCHIVE", title:"Activity archive", count:"{n}", description:"One representative activity per area comes first. Use the button below to see the rest, grouped by area, and open any item for the full record."},
    credentials: {
      kicker: "RECORDS",
      title: "Credentials",
      description: "",
      education: "EDUCATION",
      school: "Computer Education, Sungkyunkwan University · Class of 2024",
      lang: "LANGUAGE",
      cert: "CERTIFICATION",
      awards: "SCHOLARSHIP",
      vol: "VOLUNTEER",
      volTotal: "1365 Volunteer Portal certificate · issued {issued}",
      volOpen: "Full record",
      volCount: "{n} sessions",
      volCountOne: "{n} session"
    },
    contact: {
      title: "Not stopping at experience, but building what comes next.",
      description: "",
      blog: "Naver Blog: Jinseok's Record",
      blogShort: "Blog",
      instagram: "Instagram",
      photos: "Photo account"
    },
    footer: {name:"Jinseok Oh · Portfolio", updated:""}
  },
  ui: {
    back: "Back to activity log",
    backWork: "Back to selected work",
    workRef: "Featured above",
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
    showAll: "Show all {n} activities",
    showLess: "Show less",
    year: "{y}",
    groupCount: "{n} items",
    groupCountOne: "{n} item",
    won: " KRW",
    awardTerm: "2024 Fall term · On campus"
  },
  // 활동 구분 이름 (common.js 의 categories 와 같은 id)
  categories: {project:"Projects & Hackathons", community:"Community & Organizing", edu:"Teaching & Service", learn:"Learning & Exploring"},
  keywords: ["AI", "Data", "Software", "Computer Education", "Education", "Mentoring", "Volunteering", "Student programs", "Service planning", "Projects", "Hackathons", "International school", "English", "Global speakers", "Overseas volunteering", "Exchange student", "GDG on Campus : SKKU", "Hackathon lead", "PM"],
  interests: ["AI · Data", "PM", "Service planning", "Developer", "Global"],
  // 숫자 모음의 글자 (숫자 자체는 common.js 의 tiles)
  tiles: {
    gpa: {label:"GPA", unit:" / 4.5", note:"Sungkyunkwan University · Computer Education"},
    volunteer: {label:"Volunteer hours", unit:"h+", note:"1365 certificate · {n} sessions"},
    ielts: {label:"IELTS Overall", unit:"", note:"Listening 9.0 · Reading 8.5"},
    // more 는 지금 화면에 쓰지 않음 (예전 기록 요약 카드의 펼침 설명)
    dulwich: {label:"Dulwich College Suzhou", unit:" yrs", note:"International school in Suzhou, China", more:"Five years of learning alongside classmates from many cultural backgrounds taught me to adapt quickly to new environments and built my global perspective."},
    funding: {label:"Hackathon funding raised", value:"$5K+", unit:"", note:"From programs at <b>3</b> universities · total budget ~$5.5K"}
  },
  certHead: ["Credential", "Result", "Detail", "Issuer", "Obtained", "Status"],
  certGroups: {language:"Language", cert:"Certification"},
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
      title: "AI in Second-Language Education and International Publication",
      summary: "Attended both parts of a Department of English lecture on the same day, and wrote up how AI is used across the four language skills, the theories and research methods that explain why it works, and the path a paper takes to an international journal.",
      short: "Dept. of English lecture, parts 1 and 2: AI x L2 education research and a roadmap to international publication.",
      panel: {
        role: "Attended parts 1 and 2 on the same day and wrote up the content",
        where: "Dept. of English, Sungkyunkwan University · lecture materials by Ali Derakhshan"
      },
      body: [
        {lead:"We were told to move past “does AI work?” and ask “how, for whom, and under what conditions?”"},
        {p:"I attended both parts of this lecture, hosted by the Department of English at Sungkyunkwan University, on the same day. Professor Ali Derakhshan of Golestan University had been invited, but flights could not operate because of the war in Iran, so he was unable to travel to Korea. Professor Park Yujeong and Professor Shawn D. Normandin gave both sessions in his place, working from his lecture materials."},
        {cmp:[
          {n:"Part 1", t:"Artificial Intelligence in Second and Foreign Language (L2) Education", d:"Skills, then theory, then research directions: “what should we study?”"},
          {n:"Part 2", t:"The Art and Science of International Publication", d:"Research development, manuscript, submission, review, impact: “how do we turn it into a paper?”"}
        ]},

        {k:"Part 1 · 01", toc:"Part 1 Skills", h:"What AI does across the four language skills"},
        {p:"Reading, writing, speaking and listening were all walked through in the same frame: the difficulties learners face, how AI helps before, during and after an activity, and where it falls short."},
        {cards:[
          {n:"READING", t:"Support before, during, after", d:"Activating background knowledge, explaining vocabulary and grammar, generating quizzes. Limit: leaning on explanations can weaken deep reading and inference."},
          {n:"WRITING", t:"From ideas to reflection", d:"Brainstorming, outlining, revising, feedback. Limits: loss of authorial voice, bias, hallucination, academic integrity."},
          {n:"SPEAKING", t:"A partner that never tires", d:"Role-play, debate, presentation practice, pronunciation feedback. Limits: less human interaction, accent bias."},
          {n:"LISTENING", t:"Speed, captions, replays", d:"Adjustable speed, captions, comprehension questions, accent comparison. Limits: caption dependence, unnatural synthetic speech."}
        ]},
        {p:"The strengths were shared across all four skills: personalisation, immediate feedback, unlimited practice and learner autonomy. So were the limits: <b>overreliance, hallucination and bias</b>. The prescription was the same too: use AI as a <b>scaffold</b>, not an answer machine. For writing, the gains were larger when AI was built into the whole process, from planning to revision and reflection, than when it was used only for proofreading or text generation."},
        {note:"<b>Remarks from the lecture</b><br>· For writing, hallucinated references were cited as a major limitation.<br>· A tendency to rely too heavily on summarisation led to a cautious view of its educational suitability.<br>· Reduced Foreign Language Anxiety has been reported, but it was noted that whether less anxiety is always a positive outcome calls for examination.<br>· For speaking, its use in pronunciation practice was described as especially high."},

        {k:"Part 1 · 02", toc:"Part 1 Theory", h:"Why it works: six theories"},
        {p:"One question came at the end of the skills section: if AI helps with every skill, what explains the benefit? The answer was not the technology itself, but the way AI lines up with the learning principles of existing second language acquisition (SLA) theories."},
        {cards:[
          {n:"INPUT · KRASHEN", t:"i + 1", d:"Input that is understandable but slightly beyond the learner drives acquisition. AI simplifies texts to level and adds explanations to produce it."},
          {n:"OUTPUT · SWAIN", t:"Produce to learn", d:"Understanding is not enough; learners must speak and write. Tasks should have them draft first, then use AI."},
          {n:"NOTICING · SCHMIDT", t:"Attention becomes awareness", d:"Exposure alone does not produce learning. Ask AI to explain an error rather than fix it, so the learner notices."}
        ]},
        {cards:[
          {n:"SOCIOCULTURAL · VYGOTSKY", t:"A digital MKO", d:"With help from a More Knowledgeable Other such as a teacher or peer, learners do what they cannot yet do alone. AI gives hints and gradually withdraws."},
          {n:"SELF-REGULATED · ZIMMERMAN", t:"Plan, perform, reflect", d:"Learners know themselves best, so they should be proactive agents. AI is a temporary coach, not a permanent manager."},
          {n:"SELF-DETERMINATION · DECI & RYAN", t:"Autonomy, competence, relatedness", d:"Intrinsic motivation grows when these three needs are met. AI can offer choice and immediate feedback, but teacher and peer relationships must be kept."}
        ]},
        {q:"Aim for the learner's output rather than AI's, for noticing rather than error removal, and for gradual independence rather than dependence. All six theories pointed the same way."},

        {k:"Part 1 · 03", toc:"Part 1 Directions", h:"What to study next, and how"},
        {p:"Research so far has mostly compared AI-assisted teaching with traditional teaching, and that good results appear is already established. What stuck with me is that analysing the <b>process</b> behind those results is becoming the material for papers. Six research directions were proposed."},
        {ul:[
          "<b>Learning mechanisms</b>: how does AI help learning?",
          "<b>Teacher-AI collaboration</b>: how should teachers and AI work together?",
          "<b>Learner variability</b>: for whom does it work best?",
          "<b>Context</b>: under what conditions is it most effective?",
          "<b>Longitudinal development</b>: how does it change over time?",
          "<b>Ethics</b>: how can it be used responsibly?"
        ]},
        {h3:"Ten research methods"},
        {p:"It was easiest to group the methods by what they try to see."},
        {cards:[
          {n:"PROCESS", t:"Follow the process", d:"<strong>PTA</strong>: reconstruct the learning path from prompts and revisions.<br><strong>Idiodynamic</strong>: rate confidence and anxiety second by second while watching a recording."},
          {n:"TIME", t:"Follow time", d:"<strong>LGCM</strong>: estimate each learner's starting point and growth rate.<br><strong>TSA</strong>: analyse trends and swings in a long run of observations.<br><strong>EMA/ESM</strong>: record motivation and emotion in real time with short repeated surveys."},
          {n:"CONTEXT", t:"Explain paths and context", d:"<strong>RM</strong>: work backwards from outcomes to reconstruct different paths.<br><strong>ABM</strong>: simulate behavioural rules.<br><strong>NEM</strong>: look at individual, classroom, institution and society together."},
          {n:"PERSPECTIVE", t:"Cluster viewpoints", d:"<strong>Q Methodology</strong>: have people rank statements to find distinct types of viewpoint on AI."}
        ]},
        {p:"What they share is a wish to see what pre/post averages cannot: <b>process, individual differences and time</b>. A mean of 82 against 74 hides that some learners improved a lot while others declined."},

        {k:"Part 2 · 01", toc:"Part 2 Roadmap", h:"A paper is a cycle, not a single act of writing"},
        {p:"Part 2 described international publication as four stages and what comes after. The stages do not only run in order: a weak research question cannot be rescued by good writing, and reviewer comments can send you back to an earlier stage."},
        {flow:["Research development", "Manuscript", "Journal and submission", "Peer review", "Scholarly impact"]},
        {ul:[
          "<b>Research development (the most important)</b>: publishable research is novel, significant and relevant. Gaps come in five types: theoretical, methodological, contextual, population and temporal. Find them in recent reviews, limitations sections, contradictory findings, scholarly debates and bibliometric tools such as VOSviewer. A good question is clear, focused, original and researchable.",
          "<b>Manuscript</b>: titles, abstracts and keywords, the IMRaD structure, and Swales' CARS model (establish a territory, establish a niche, occupy the niche). Keep interpretation out of the results, and report unexpected findings too.",
          "<b>Journal and submission</b>: SSCI, AHCI, SCIE and ESCI; Impact Factor, CiteScore, SJR and SNIP; what Q1 to Q4 mean. Metrics inform judgement, they do not replace it. Promises of acceptance within days, excessive solicitation emails and fake metrics are warning signs of predatory journals. Check the journal's AI-use disclosure policy before submitting.",
          "<b>Peer review</b>: administrative screening, the editor's desk review (scope, novelty, significance, method, writing), reviewer selection, review, decision. Answer every reviewer comment, and say in the response letter what you changed, why, and where.",
          "<b>Scholarly impact</b>: publication is a beginning, not an end. Good titles and keywords, steady publishing and international collaboration make a paper more likely to be read and cited."
        ]},
        {note:"<b>Remarks from the lecture</b><br>· It was stressed that a study should fill a gap left by prior research rather than repeat what has already been said.<br>· Patience is essential, and working on several papers at once was advised.<br>· Rebutting existing research was described as a comparatively accessible way to choose a topic, compared with proposing a new solution."},

                {k:"Looking back", toc:"Looking back", h:"My first look at how a paper gets written"},
        {p:"It was a lecture for the Department of English, so I worried I would take away little. I looked it up and signed up on my own, and I was the only undergraduate there."},
        {p:"It was the first lecture on academic papers I had attended. Hearing how a topic is chosen, a manuscript written, a journal picked and a review gone through, I got at least a rough idea of how a good paper comes together."},
        {p:"If I ever read or write papers, I think what I learned about paper writing will be a useful starting point."}
      ]
    },
    realthon: {
      title: "RE:ALThon",
      org: "GDG on Campus : SKKU",
      summary: "When a planned collaboration with Japanese universities fell through, changed course and organised a joint AI hackathon across SKKU, Korea University and Sogang (50 participants, 9 teams).",
      short: "Pivoted from a failed global plan to a 3-university hackathon for 50.",
      card: {role:"HR lead · event planning · budget management", result:"3 universities · 50 people · 9 teams · roughly KRW 7 million raised"},
      panel: {
        role: "HR lead of GDG on Campus : SKKU · overall planning and budget management",
        scale: "50 participants · 9 teams",
        period: "6–7 Dec 2024 · overnight",
        where: "Korea University, Woojung Hall of Informatics · co-hosted by GDG on Campus at SKKU, Korea University and Sogang University",
        result: "Roughly KRW 7 million from four programs at three universities · total budget around KRW 7.5 million",
        key: "≈ KRW 7M"
      },
      body: [
        {h:"01. Situation: the global plan wobbles"},
        {
          p: "A global hackathon was the thing I most wanted to do when I joined GDG on Campus : SKKU. Once SKKU's software program committed a budget, I reached out to GDG on Campus chapters in time zones close to Korea - Singapore, Manila, Sydney and Japan. From early September I was discussing the format in English, over LinkedIn and Discord, with Tokyo Metropolitan University, Tokyo City University and Waseda University."
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
            "Contacted Yonsei, Korea University and Sogang directly through the GDG on Campus leads' Slack, and confirmed an offline event with Korea University and Sogang.",
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
      title: "2GATHER",
      org: "LIKELION Line-4 Hackathon",
      summary: "As PM, planned 2GATHER - an AI-powered marketing solution that helps students and early-stage founders plan promotion and connect with the right people on a small budget and a limited network.",
      short: "PM · UX/UI for 2GATHER, an AI promotion-strategy platform shipped in 6 weeks",
      proj: {
        name: "2GATHER",
        type: "AI · Web service",
        what: "An AI promotion-strategy platform that helps students and early founders plan promotion and reach the right people on a small budget and a limited network",
        role: ["PM", "UX/UI planning", "PRD writing", "Service structure design"],
        tools: ["Figma"],
        team: "Team of 6 (planning/PM 1 · UI design 1 · FE/BE 4)",
        period: "6 Oct – 16 Nov 2024 · about 6 weeks (final 16 Nov)",
        date: "Final 16 Nov 2024",
        result: "Service deployed in about 6 weeks",
        key: "6 weeks",
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

        {k:"01 · Problem", h:"A good idea is not enough if you can't get the word out."},
        {p:"As head of people at GDG on Campus : SKKU, I set a goal of <b>30 new members - but only 9 joined</b>."},
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
            pm: "I defined the problem from recruiting for GDG on Campus : SKKU and pitched the project.",
            slides: [
              {k:"GOAL / REALITY", t:"Aimed for 30, recruited 9", d:"Recruiting for GDG on Campus : SKKU as head of people, the goal was 30 new members - only 9 joined. The project started from that gap."},
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
      card: {role:"Accounting & supplies · led ddakji and tooth-brushing lessons", result:"177 volunteer hours · one third-grade class (34 students)"},
      panel: {
        role: "Accounting & supplies team (Team 1 class supplies · budget of roughly ₩2.2 million per team) · planned and led the ddakji class and tooth-brushing lesson",
        team: "40 volunteers (4 teams of 10)",
        period: "Oct 2024 – Feb 2025 · deployed 8–17 Jan 2025",
        where: "Babakan Madang Elementary School, Bogor, Indonesia",
        result: "177 volunteer hours (1365 certificate) · my team taught one third-grade class (34 students)",
        key: "177 hrs"
      },
      body: [
        {lead:"Ten days with children in Indonesia"},
        {p:"A volunteering trip spent teaching, running around and laughing with the children of <b>Babakan Madang Elementary School</b> in Bogor, Indonesia."},
        {p:"I had once prepared an Indonesia volunteering trip myself with FreeMed, only for it to fall through. Before enlisting, I wanted one last chance to actually go - so I applied."},
        {p:"I didn't just volunteer on site. <b>I went through the whole process: designing and preparing classes, managing the supplies they needed, and working with the students in the classroom.</b>"},

        {k:"01 · Why Indonesia", h:"I wanted to finish a plan that had once fallen through."},
        {p:"I had been interested in overseas volunteering for a long time."},
        {p:"With FreeMed I prepared a deployment to Indonesia myself - running an Indonesian-language study group and planning programs tailored to the local context - but the project was cancelled when the sponsor pulled out."},
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
      summary: "Looked at an education service from the user's point of view, compared the market and competitors, and proposed marketing ideas.",
      short: "Compared competitors through market research and proposed marketing ideas.",
      panel: {
        role: "Mostly chose market research among the monthly missions (video · informational content · market research) · investigated the education market and competitors",
        result: "Proposed ideas to improve Creverse's services and content based on the research"
      },
      body: [
        {
          p: "As a member of the first Creverse Campus Crew cohort, I chose one of three monthly missions (video production, informational content, or market research) and produced a deliverable. I mostly chose market research: I investigated cases from the education market and competitors myself, and proposed ideas to improve Creverse's services and content."
        },
        {h:"01. Finding answers in competitors"},
        {
          p: "I compared competing language academies' admissions strategies, curricula, and the way their websites convey information. Rather than just listing competitors' strengths, I looked at how intuitively the values Creverse emphasizes actually reach real users."
        },
        {
          p: "I noticed that although Creverse has strengths such as integrated thinking, skill assessment, and systematic management, the way they are shown can feel abstract. I proposed conveying the education process more clearly with quantitative information and visual content."
        },
        {h:"02. Turning unseen strengths into content"},
        {
          p: "Looking through Creverse's content, I noticed there was relatively little that showed the expertise and teaching methods of native-speaker teachers."
        },
        {
          p: "Rather than a plain promotional video, I wanted content that helps users understand real classes and teachers, so I proposed interview content introducing teaching philosophy and methods, and VLOG content showing actual classes, preparation, and daily life."
        },
        {
          p: "The proposal focused less on creating new strengths than on how to show the strengths already there."
        },
        {h:"03. Connecting THE OPEN to the learning experience"},
        {
          p: "In December, I studied THE OPEN program, the topic set by the staff, and proposed merchandise ideas for students in grades 6 to 8 and their parents."
        },
        {
          p: "Noticing the services and culture around recording and managing study time, I came up with the idea of linking a visual timer, which shows the passing of time intuitively, to the learning process of THE OPEN."
        },
        {
          p: "Instead of merchandise with just a logo, I approached it by connecting the product's user experience with the brand, so that the program's character comes through naturally as learners actually use it."
        },
        {h:"What I learned"},
        {
          p: "Through three proposals, I learned that marketing is not only about creating new messages, but about discovering the strengths an existing service already has and connecting them in a form users can understand."
        },
        {
          p: "In particular, by directly comparing competitors and content, I built a habit of thinking through observation → comparison → problem definition → proposal, instead of staying with vague impressions."
        },
        {
          note: "All deliverables were submitted for Creverse's internal review, and I was not informed whether any were adopted or applied afterward. So this record focuses not on execution results but on the process of finding problems myself and developing them into concrete proposals."
        }
      ]
    },
    "edutech-expo": {
      title: "2024/2026 EduTech Expo",
      summary: "Went beyond looking at the technology to observe which education problems it solves. Comparing two expos two years apart, I saw that data, user experience and policy shape edtech.",
      short: "Observed which education problems tech solves, and compared two expos two years apart.",
      card: {role:"Visited twice, comparing 2024 and 2026", result:"Five insights on the education problems behind the tech"},
      panel: {
        role: "Visited twice and compared 2024 with 2026",
        where: "COEX · Adobe session",
        result: "Five insights (problem · data · experience · connection · convergence)"
      },
      body: [
        {lead:"I went to look at technology, and ended up looking at the education problems it meets."},
        {p:"I attended the EduTech Expo twice, in 2024 and 2026. I started out looking at what technology was on show, but came to look at <b>which education problem each piece of technology is trying to solve</b>."},
        {p:"I could also compare how the market changed over those two years."},

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
      vid: {
        k: "SKETCH VIDEO",
        t: "On-site sketch video",
        d: "A sketch video from the 2024 KT&G Sangsang Global Speech event, showing the speeches that mentors and foreign residents in Korea prepared together."
      },
      panel: {
        role: "Team lead · speech mentoring for a Pakistani resident of Korea",
        team: "Mentor–mentee teams",
        period: "6 Sep – 9 Nov 2024 · event day 9 Nov",
        where: "KT&G Sangsang Univ · 2024 KT&G Sangsang Global Speech"
      },
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
    audivice: {
      title: "Audivice Undergraduate Mentor",
      summary: "Mentored middle and high school students on study methods, mental wellbeing and more.",
      short: "Mentored secondary students on study habits and wellbeing.",
      panel: {
        role: "Advising middle and high school students on study methods and managing their state of mind",
        scale: "5 one-on-one audio sessions · 5 hours"
      },
      body: [
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
      title: "All of Us Are Yuljeon Now",
      org: "Goormthon Univ 3rd cohort: campus organiser",
      summary: "As part of a software development club, built programs around the club's mission and ran weekly study sessions and lectures.",
      short: "Campus organiser; built club programs and ran weekly study sessions.",
      proj: {
        name: "All of Us Are Yuljeon Now",
        type: "Game · Escape room",
        what: "A web escape-room game set on the Yuljeon campus, built with the Goormthon Univ cohort for Halloween and our college night. It has five quiz stages, a final game and a ranking, and we ran it in person at a booth.",
        role: ["Planning · PM", "Storyline", "PRD", "Stage & puzzle design"],
        team: "Team of 6 (planning 1 · front-end 3 · back-end 2)",
        period: "Jul – Oct 2024 · run on 31 Oct 2024",
        date: "Run on 31 Oct 2024",
        result: "Ran it in person at a booth",
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
      photosTitle: "Campus news screenshot",
      summary: "Introduced CHED officials to the interdisciplinary work of SKKU's College of Computing and Informatics, drawing strong interest.",
      short: "Presented SKKU computing's interdisciplinary work to CHED officials.",
      panel: {
        role: "GDG on Campus : SKKU speaker representing the university's software program · English talk with live Q&A",
        where: "Sungkyunkwan University · for the Philippine CHED delegation",
        result: "Covered by the campus paper S-PRESS"
      },
      body: [
        {h:"Representing the school in front of an international delegation"},
        {
          p: "When the Philippine Commission on Higher Education (CHED) visited campus, I was chosen as the GDG on Campus : SKKU speaker representing the university's software program, and presented our work to the delegation. I wore the yusaengbok - the scholar's robe that stands for the school's identity - and went in carrying the school and the club on my shoulders."
        },
        {
          p: "Rather than leaning on a memorised script, I read the room and ran a flexible English talk built around live questions and answers. That let me convey the IT work and interdisciplinary results GDG on Campus : SKKU had been driving with some energy, and the delegation responded warmly."
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
      panel: {
        role: "Assisting classes for adolescents with developmental disabilities",
        scale: "7 volunteer hours (1365 certificate)"
      },
      body: [
        {k:"01 · My role", h:"I supported the classes from the side."},
        {
          ul: [
            "I assisted across the whole class day. The centre split the day into three periods - art therapy, Korean traditional music, and vocal musical - each with its own instructor.",
            "My role was to step in firmly when a student was about to act out, saying \"No - please calm down.\" The resident assistant teachers showed me how.",
            "When we walked to an outside janggu studio for the traditional-music class, one of us went ahead and one behind, keeping the group on route.",
            "In the vocal musical class I ran the computer at the front, putting the lyrics up for the students - which let me watch the students and the teaching method closely.",
            "During breaks I talked with the students. The centre asked us not to initiate, so I didn't - but when a student started a conversation we'd trade ordinary things: where we lived, what we liked doing."
          ]
        },
        {k:"02 · One person at a time", h:"I felt first-hand that every person is singular."},
        {
          p: "Being close to it, I read up on borderline personality disorder, schizophrenia and the autism spectrum. There is no shortage of material organising traits by diagnosis - but I could not find a classification that matched the students I actually met. People are singular, and spending time with these students made that far more concrete to me."
        },
        {k:"03 · Education and technology", toc:"03 Education & tech", h:"What matters most is teaching to each student's traits."},
        {
          p: "A teacher meeting a student with a disability will reach first for the per-diagnosis teaching guide. That matters - but what matters more is looking at the student with real attention and teaching to their individual traits. As information technology brings individualised education closer, I expect an integrated classroom to become possible before long."
        },
        {k:"04 · The bus ride home", h:"People I thought of as distant were right here."},
        {
          p: "The centre was about an hour from home, and on the bus back I ended up riding with the students from that day's class. It landed differently than anything else had: people I had thought of as distant were in fact right here. If we want an integrated society, integrated classrooms have to come first."
        }
      ]
    },
    "ba-dive": {
      title: "SKKU-BA-DIVE application",
      summary: "Submitted a China e-commerce field-trip plan as a five-person GDG on Campus : SKKU team, passed the document round and presented, but was not selected in the end.",
      short: "A five-person GDG on Campus : SKKU team's China e-commerce plan: passed round one and presented, not selected.",
      panel: {
        role: "Team introduction · pre-trip planning (Chinese, visa, flights) · conference part",
        team: "GDG on Campus : SKKU · 5-person team",
        where: "SKKU-BA-DIVE Summer 2024 · 8-day plan for Shenzhen and Shanghai, China",
        result: "Passed documents → presented · not selected"
      },
      body: [
        {lead:"As a team, we planned an overseas trip to learn about Chinese e-commerce on site and explore how Korean platforms can survive."},
        {p:"We applied to Sungkyunkwan University's <b>SKKU-BA-DIVE 2024 Summer</b> global experience program as a five-person GDG on Campus : SKKU team. Our topic was <b>“Analyzing the rapid growth of Chinese e-commerce platforms and exploring survival strategies for Korean platforms in the global e-commerce market.”</b>"},
        {p:"We passed the first-round document review and gave a five-minute presentation on June 4, but we were not selected in the end. This page records how we built the plan and presentation, and which parts I took on."},

        {k:"01 · Why China", h:"We wanted to see for ourselves what Temu and AliExpress are changing in the Korean market."},
        {p:"Our presentation began with the fast growth of <b>Chinese platforms (Temu, SHEIN, AliExpress)</b> in the global e-commerce market."},
        {p:"We cited figures showing that Korean overseas direct-purchase users <b>roughly doubled in five years, from 13.78 million in 2019 to 25.44 million</b>, and used the rise in domestic app users to show how quickly Chinese platforms were gaining a presence in Korea."},
        {p:"So we framed our question as <b>“How did Chinese platforms grow, and what should Korean platforms learn?”</b>"},

        {k:"02 · The Plan", h:"From Shenzhen to Shanghai, we designed exchanges, conferences and company visits as one flow."},
        {flow:["GDG exchange", "E-commerce conferences", "Company visits", "Shopping search app", "Paper · E-commerce Fair"]},
        {h3:"GDG exchange · Sharing technology and know-how"},
        {p:"We planned to meet GDG Shenzhen and GDG Shanghai, learn tools used locally such as <b>Google Analytics, TensorFlow, and Android and Kotlin</b>, and share GDG on Campus : SKKU's Google Workspace and SEO know-how along with Sungkyunkwan culture."},
        {h3:"Conferences · Plan A and Plan B"},
        {p:"We shortlisted the <b>China (Shenzhen) International E-Commerce Industry Expo</b> and the <b>13th China Digital Marketing and Ecommerce Innovation Summit</b> in Shanghai, checked deadlines and eligibility, and lined up a substitute conference (Plan B) for each."},
        {h3:"Company visits · Tencent and Pinduoduo"},
        {p:"For <b>Tencent</b>, we focused on the WeChat ecosystem and its logistics service; for <b>Pinduoduo</b>, on its ultra-low-price pricing method and improvements to the mobile shopping experience. We prepared questions for each company in advance."},
        {h3:"After the trip · Plans that lead to outputs"},
        {ul:[
          "<b>Shopping search app</b> - define requirements from local market research and build an app that compares prices across platforms",
          "<b>Paper on the Korean e-commerce market</b> - analyze it from technical, business and international angles, publish it on the GDG on Campus : SKKU blog and others, and aim for an academic submission",
          "<b>Korea E-Commerce Fair</b> - pitch the app we built to test its feasibility and business potential"
        ]},

        {k:"03 · My Role", h:"I took on the team introduction, pre-trip planning and the conference part, tying my time in China to the plan."},
        {p:"Each teammate owned different slides. Drawing on the five years I lived in China and my Computer Education background, I focused on making concrete <b>what to prepare before going</b> and <b>what we could learn at each conference</b>."},
        {roles:{tl:"TEAM", ml:"MY CONTRIBUTION", team:["Choosing the topic and writing the application", "Project introduction and motivation", "GDG exchange, company visits, search app and paper plans", "Korea E-Commerce Fair and expected effects"], mine:["Wrote the team and member introduction slides", "Pre-plan: Chinese study, visa and flights", "Checked conference deadlines and eligibility, and researched backup conferences", "Outlined how to contact companies (drawing on GDG on Campus : SKKU's experience inviting video-lecture speakers)", "Prepared for and took part in the June 4 presentation"]}},
        {h3:"Pre-plan · So we would not get stuck on site"},
        {ul:[
          "<b>Chinese and the local environment</b> - listed social media that cannot be used in China and cultural differences, including signing up for a paid VPN in advance.",
          "<b>Visa</b> - compared how to apply (in person at a visa application centre), the required documents, and the processing time and fee for regular, express and rush service.",
          "<b>Flights</b> - fitted the route from Incheon to Shenzhen, Shenzhen to Shanghai, and the return flight into the schedule."
        ]},
        {h3:"Conferences · Check feasibility first"},
        {p:"While choosing conferences, I checked application periods, eligibility and costs. Because it was hard to confirm the participating companies and programme of the Shenzhen conference, I <b>also looked for substitute conferences</b> and summarized what we could learn at each event to make the plan more concrete."},

        {k:"04 · How We Built It", h:"From choosing a topic to presenting, we refined the plan as a team over about six weeks."},
        {ul:[
          "<b>April 18</b> - Each member proposed a preferred country and topic, and we compared them: online platform development (US East Coast), mobility and daily-life support for vulnerable groups (Japan), e-commerce (China), and an AR virtual fitting system (Silicon Valley), which I proposed. We discussed them against the selection criteria (relevance to the programme's purpose, concreteness of the plan, novelty of the topic), and the team settled on China e-commerce.",
          "<b>April 28</b> - We submitted the final application.",
          "<b>May 21 and 26</b> - We set the presentation outline and divided up the slides.",
          "<b>May 28</b> - We reviewed the presentation together in person.",
          "<b>June 4</b> - After passing the document round, we gave the five-minute presentation."
        ]},

        {k:"05 · Team Presentation", h:"A 20-slide presentation covering everything from the problem to the expected effects."},
        {p:"We structured it as <b>team → motivation → pre-plan → itinerary → next steps → expected effects</b>."},
        {cards:[
          {n:"01", t:"Team", d:"A five-person GDG on Campus : SKKU team from different majors and years"},
          {n:"02", t:"Motivation", d:"The growth of Chinese e-commerce platforms and changes in the Korean market"},
          {n:"03", t:"Pre-plan", d:"Contact points, and Chinese, visa and flight preparation"},
          {n:"04", t:"Itinerary", d:"GDG exchange, conferences, and Tencent and Pinduoduo visits"},
          {n:"05", t:"Next Steps", d:"Shopping search app, paper, Korea E-Commerce Fair"},
          {n:"06", t:"Effects", d:"Academic and international expected effects"}
        ]},
        {note:"For publication, I removed student ID numbers and company contact details from the slides, and blurred every face except mine."},

        {k:"06 · Result", h:"We passed the document round and presented, but were not selected in the end."},
        {p:"The result was disappointing, but what remains is the process of working out in detail what we wanted to do in Shenzhen and Shanghai, down to schedule, cost and application requirements."},

        {k:"07 · What I Learned", h:"I found that I am someone who is drawn to how technology is applied in different environments."},
        {p:"Working with my teammates and extending our plan overseas made me curious about <b>how the same technology is applied in a different environment</b>."},
        {p:"This attempt showed me that I am someone who finds that kind of question interesting."}
      ],
      // Presentation: all 20 slides (student IDs and contact details removed, faces other than mine blurred)
      deck: {
        title: "Presentation",
        chapters: [
          {name: "Intro", pm: "I wrote the team and member introduction slides.", slides: [
            {k:"COVER", t:"Deep Dive into E-Commerce: Explore Like a Billionaire", d:"The cover of our SKKU-BA-DIVE 2024 Summer application presentation, from the GDG on Campus : SKKU team. Student IDs have been removed."},
            {k:"CONTENTS", t:"Contents", d:"Six parts: team, motivation, pre-plan, itinerary, next steps and expected effects."},
            {k:"TEAM 01", t:"GDG on Campus : SKKU", d:"A university-based community for students interested in Google technologies. We introduced our activities, from Google tech study workshops, the EAP national policy training, the GDG on Campus Korea joint hackathon and the Google Solution Challenge to the global IT video lectures, under the keywords “convergence” and “global.”"},
            {k:"TEAM 02", t:"Diversity of majors and years", d:"Introduces the five-person team from different majors and years. For myself, I included that I was a first-year Computer Education student who lived in China for five years. Photos of the other members are blurred."}
          ]},
          {name: "Motivation", slides: [
            {k:"MOTIVATION 01", t:"Rapid growth of global e-commerce", d:"App ranking data shows Chinese platforms such as Temu, SHEIN and AliExpress posting high growth in the global e-commerce market."},
            {k:"MOTIVATION 02", t:"A growing presence in Korea too", d:"Presents the rise in app users of Chinese platforms in the Korean e-commerce market."},
            {k:"MOTIVATION 03", t:"Why understanding the winning strategy matters", d:"From the question “Why are AliExpress and Temu investing so much in Korea?”, we framed the topic as exploring survival strategies for Korean platforms by analyzing the rapid growth of Chinese e-commerce platforms. People on screen are blurred."}
          ]},
          {name: "Pre-plan", pm: "I took the Chinese, visa and flight part and organized the preparation items using my experience of living in China.", slides: [
            {k:"PRE-PLAN 01", t:"Contact points and booking information", d:"Organized contact points in three groups: GDGs in China, e-commerce companies, and conferences. With the GDGs we would use a dedicated Slack channel; for companies and conferences we checked official channels and how to apply. Company contact details are removed."},
            {k:"PRE-PLAN 02", t:"Chinese study, visa and flights", d:"The Chinese study covered social media that cannot be used in China, cultural differences, and signing up for a paid VPN in advance. For the visa, how to apply in person and the time and fee for regular, express and rush service; for flights, the route from Incheon to Shenzhen, Shenzhen to Shanghai, and back home."}
          ]},
          {name: "Itinerary", pm: "I took the conference part: I checked deadlines and eligibility for candidate conferences and summarized what we could learn at each, plus backup options.", slides: [
            {k:"PLAN 01", t:"Overall schedule", d:"A calendar that places the GDG exchanges, conferences and company visits in a trip starting in Shenzhen and moving to Shanghai."},
            {k:"PLAN 02", t:"GDG Shenzhen exchange", d:"A technology and culture exchange: GDG Shenzhen shares Google Analytics and TensorFlow, while GDG on Campus : SKKU shares Google Workspace and SEO know-how and Sungkyunkwan culture. Event photos are blurred."},
            {k:"PLAN 03", t:"GDG Shanghai exchange", d:"GDG Shanghai shares Google Analytics and Android and Kotlin, and GDG on Campus : SKKU shares its know-how in the same way. Event photos are blurred."},
            {k:"PLAN 04", t:"Conferences", d:"The Shenzhen Expo and the Shanghai Summit as Plan A, with academic and technology conferences held around the same time as Plan B, and their application deadlines."},
            {k:"PLAN 05", t:"Company visits: Tencent and Pinduoduo", d:"We prepared questions for each company: for Tencent, the WeChat ecosystem and its logistics service; for Pinduoduo, the pricing method behind its ultra-low-price strategy and improvements to the mobile shopping experience."}
          ]},
          {name: "Next steps", slides: [
            {k:"FUTURE 01", t:"Building a shopping search app", d:"Define the features and user requirements for search through local market research, then build a price-comparison and search app using server-side crawling."},
            {k:"FUTURE 02", t:"Paper on the Korean e-commerce market", d:"Based on the Shanghai and Shenzhen trip, analyze the direction of Korean e-commerce from international, technical and business angles, publish it as a report and aim for an academic submission."},
            {k:"FUTURE 03", t:"Attending the Korea E-Commerce Fair", d:"At the fair from Oct 31 to Nov 2, 2024, visit companies from China's Yiwu Market Group and Korea's specialist e-commerce pavilion, and pitch the app we built to strengthen its business case."}
          ]},
          {name: "Expected effects", slides: [
            {k:"EFFECT 01", t:"Academic side", d:"Collaborate through role division, study the potential of the Chinese e-commerce market through the Tencent and Pinduoduo visits and conferences, and share the results through videos and blog content we produce ourselves."},
            {k:"EFFECT 02", t:"International side", d:"Understand the local business environment and build a global network through GDG exchanges, which could lead to later activities such as video lectures."},
            {k:"THANK YOU", t:"Thank you", d:"We close the presentation hoping GDG on Campus : SKKU can contribute to global e-commerce."}
          ]}
        ]
      }
    },
    "s-global": {
      title: "S-Global Challenger application",
      summary: "Entered the university's overseas-dispatch competition together with fellow GDG on Campus : SKKU members.",
      short: "Entered SKKU's overseas-dispatch competition with GDG on Campus : SKKU peers.",
      panel: {
        role: "AI/TensorFlow team member · defined the research topic · designed the time-series modelling · planned overseas collaboration · led the proposal writing",
        team: "GDG on Campus : SKKU · team of 4",
        where: "2024 S-Global Challenger (SKKU overseas-dispatch competition) · overseas R&D visit and research proposal"
      },
      body: [
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
            "Planned development-exchange workshops with the University of Toronto and TMU GDG on Campus chapters, plus technical interviews and lab visits at the Vector Institute, BlueDot and Google Canada's AI Research Lab.",
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
          p: "With the GDG on Campus : SKKU team I found the topic - AI analysis and forecasting of business markets using Google Trends data - and led the writing of the proposal. Rather than stopping at the idea, I analysed whether an LSTM forecasting model combining the Google Trends API with economic indicators was technically feasible."
        },
        {
          p: "Pulling a large body of technical documentation and overseas research into one coherent proposal was where I grew most. As a computer-education major I learned to connect complex AI work to business problems, and - by taking on something well above my level - built the habit of structuring an idea until it holds together."
        }
      ]
    },
    freemed: {
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
      summary: "Practised React and REST API communication in a fortnightly campus study group, and planned 2GATHER at the LIKELION Line-4 Hackathon.",
      short: "React and REST API practice in a campus study group; planned 2GATHER at the Line-4 Hackathon.",
      panel: {
        role: "Fortnightly campus study group (React · REST API practice) · planned 2GATHER at the LIKELION Line-4 Hackathon",
        links: [{t:"See the 2GATHER project", href:"#a/line4"}]
      },
      body: [
        {h:"Campus study group - front-end foundations and how API communication works"},
        {
          p: "We ran a fortnightly study group covering React state management and the core front-end concepts. Rather than stopping at theory, we used Postman to make requests against Hugging Face's GPT-2 model API and handle the JSON responses. That made the client-server exchange concrete, and taught me CRUD over HTTP methods and standard REST design from a practical angle."
        }
      ]
    },
    gdsc: {
      title: "GDG on Campus : SKKU",
      summary: "When GDSC's reorganisation into GDG on Campus cut off the Google network we used to rely on, I booked speakers for the monthly global IT seminar through several routes - cold emails, people I had met in class, and referrals from the university program - and documented the whole outreach process in Korean and English.",
      short: "Booked monthly IT seminar speakers without an existing network; documented the process.",
      card: {role:"Core / HR lead · monthly IT seminar speaker outreach", result:"About 20–30 attendees per seminar · outreach process documented"},
      panel: {
        role: "Joined the Administration team → Core / HR lead the next semester · most speaker outreach for the monthly global IT seminar",
        team: "Administration team of 4",
        where: "Google Developer Group on Campus : SKKU (formerly GDSC Sungkyunkwan University)",
        result: "About 20–30 attendees per seminar (online and offline) · outreach process documented",
        key: "20–30 / session"
      },
      body: [
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
            "<b>Adapting the channel</b> - with an India-born expert based in the US, messages on Google Chat were slow to be read. I asked which channel suited them, heard WhatsApp, confirmed the switch with our GDG on Campus : SKKU lead, and scheduling and preparation sped up.",
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
          p: "Reaching out to people I don't know now feels natural. Contacting Japanese universities directly and proposing collaboration to other GDG on Campus leads while preparing RE:ALThon came from the confidence I built here. I also got into the habit of looking first at the other person's platform and situation - <b>connecting in the way that is easiest for them to answer, not the way that is easiest for me</b>."
        }
      ]
    },
    "trade-ai": {
      title: "2024 Undergraduate Trade & AI Camp",
      summary: "Planned a company-matching service that responds to supply-chain instability by combining trade and AI.",
      short: "Planned CSBBMS, a company-matching service for supply-chain instability, in a 5-person team.",
      panel: {
        role: "Shaped the service from a software and data perspective · discussed the matching flow · turned ideas into the presentation",
        team: "Team 11 · 5 members",
        where: "Industry-Academic Cooperation Foundation × KITA Trade Academy",
        result: "Completed · planned CSBBMS, a company-matching service"
      },
      body: [
        {lead:"Planned a company-matching service that responds to supply-chain instability by combining trade and AI."},
        {p:"I took part in the <b>Undergraduate Trade & AI Camp</b>, jointly run by the Industry-Academic Cooperation Foundation and the Korea International Trade Association (KITA) Trade Academy. In a team of five, I planned <b>CSBBMS</b>, a company-matching service for supply-chain instability, and developed it into a presentation."},
        {p:"Together with teammates who majored in trade, we looked at problems that arise in real trade environments and designed a service for finding and comparing trading partners that fit a company's requirements. Drawing on my interest in software and data from studying Computer Education, I took part in <b>turning a trade problem into a technology-based service</b>."},

        {k:"01 · Problem", h:"Companies needed a way to find new trading partners instead of relying on a single source."},
        {p:"Based on a KITA survey, our presentation focused on the finding that <b>85.5% of exporters had experienced supply-chain problems</b>."},
        {p:"It also presented <b>33.5%</b> as the share of companies that said they were sufficiently prepared to respond to a crisis."},
        {p:"From this, the team concluded that as supply-chain instability continues, companies need <b>a way to search for and compare new partners that fit their own conditions</b> rather than depending only on existing ones."},

        {k:"02 · CSBBMS", h:"Enter a company's conditions, and the service lets you search for companies to trade with."},
        {p:"<b>CSBBMS</b> is a service concept that searches for trading candidates based on a company's requirements and trade-related information, and lets users narrow the range on a map and compare."},
        {flow:["Enter company info", "Set requirements", "Find similar companies", "Compare on the map", "Quote · contract"]},
        {h3:"INPUT · The company's requirements"},
        {p:"We designed it so that a company looking for a partner enters 10 conditions, including <b>preferred region, purchase quantity, preferred unit price, company track record, number of contracts, company size, preference for safety or low price, contract period, consultation method, and preferred language</b>."},
        {p:"Rather than finding companies by a single condition, it narrows down <b>partners that fit your situation</b> by weighing several conditions together."},
        {h3:"TRUST · Information that supports trading decisions"},
        {p:"Beyond finding companies that match the conditions, we conceived the service to <b>provide contract-related information and transaction history</b> so users can compare and judge a potential counterparty."},
        {p:"In particular, we discussed using the number and size of contracts, contract cancellation status, and the anonymous transaction history of similarly sized companies as elements that show trust information."},
        {h3:"FILTER · Automatically excluding risky companies"},
        {p:"Companies unsuitable for trading are automatically excluded according to internal criteria, and we conceived <b>a structure in which a misclassified company can file an objection with supporting documents</b>."},
        {h3:"MAP · Map-based search"},
        {p:"Matching companies are shown on a map, and the screen lets users narrow the region and range step by step while searching for partners."},
        {note:"The screens in the presentation are mockups to show the form of the service; the company names and figures on them are examples."},

        {k:"03 · My Role", h:"I helped shape the service by connecting perspectives from different majors."},
        {p:"Many of my teammates majored in trade. During the project I learned their <b>knowledge of the trade field and their view of the industry</b>, while, as a Computer Education major, I took part in turning it into a service from a software and data perspective."},
        {p:"In particular, I did not stop at the level of <b>“it would be good to use AI”</b>,"},
        {p:"<b>I worked out what information to take in → by what criteria to compare companies → and how users would check the results</b>"},
        {p:"and developed it into a single service flow."},
        {roles:{tl:"TEAM", ml:"MY CONTRIBUTION", team:["Research on supply-chain problems and the trade environment", "Service idea and feature design", "Discussion of how to match companies", "Producing the presentation"], mine:["Developing the service idea from a software and data perspective", "Discussing the matching flow using company information and requirements", "Reviewing service features and the user flow", "Turning the team's ideas into the presentation"]}},

        {k:"04 · Team Presentation", h:"We developed the project from problem to service in a 17-slide presentation."},
        {p:"We laid out the team's result in the presentation as a flow of <b>problem definition → service design → expected effects</b>."},
        {p:"Starting from the problem of supply-chain instability, we expressed the process of taking in a company's requirements and searching for and comparing matching partners as <b>mockups that let you imagine the actual service screens</b>."},
        {h3:"Key points covered in the presentation"},
        {cards:[
          {n:"01", t:"Problem", d:"Exporters' supply-chain problems and how prepared they are for a crisis"},
          {n:"02", t:"Service", d:"Entering company information and setting requirements"},
          {n:"03", t:"Matching", d:"A list of matching companies and trust information for trading"},
          {n:"04", t:"Filtering", d:"Automatic exclusion of blacklisted companies, and objections"},
          {n:"05", t:"Map", d:"Map-based partner search and narrowing the range"},
          {n:"06", t:"Expected Value", d:"A stable trade supply network and more diversified partners"}
        ]},

        {k:"05 · What I Learned", h:"I learned that AI projects require understanding the problem and the data before the technology."},
        {p:"In the lectures held alongside the project, I learned how AI technology is applied in real industries, focusing on <b>data literacy, digital transformation (DX) in industry, and XAI and AI safety</b>."},
        {h3:"DATA LITERACY"},
        {p:"I learned the concepts of <b>Big Data and Thick Data</b> and went step by step through how data is collected, interpreted, and used."},
        {p:"In particular, I learned that what matters more than the amount of data is <b>what question you bring to the data and how you select the information needed to solve the problem</b>."},
        {p:"This view connected with the process of deciding which company information to use, and how to link it to the user's requirements, in the company-matching service."},
        {h3:"INDUSTRY DX"},
        {p:"I looked at DX cases from various industries, including manufacturing, logistics, finance, and platforms."},
        {ul:[
          "<b>Manufacturing</b> — LS Group's smart factory: AI-based process prediction and energy and cost optimization",
          "<b>Logistics</b> — robot automation and smart logistics processes across loading, storage, picking, packing, and delivery",
          "<b>Finance and platforms</b> — blockchain-based letter of credit (L/C) procedures and KITA's AI semantic search service"
        ]},
        {p:"From these I saw that AI is not used as a standalone technology, but <b>can create new value when combined with how each industry works</b>."},
        {h3:"XAI & AI SAFETY"},
        {p:"I studied how <b>LRP (Layer-wise Relevance Propagation)</b> visualizes the basis of an AI's decisions, and <b>a research case on modifying neurons in a GAN generative model</b>."},
        {p:"I also looked at AI safety principles such as <b>fairness, transparency, and reliability</b>, which are needed to apply AI in real industries."},
        {p:"I came to see that beyond the accuracy of results, we must also consider <b>whether we can explain why a result came out as it did and use it in a trustworthy way</b>."},

        {k:"06 · Reflection", h:"Connecting knowledge from different fields was what made the use of the technology concrete."},
        {p:"What struck me most at this camp was that <b>learning a technology and understanding the problem it is applied to are not separate things</b>."},
        {p:"I learned perspectives on the industry and its problems from my teammates who majored in trade, and from my background in software and data I looked at those problems in the form of a service."},
        {p:"Through this I experienced that solving a problem takes <b>connecting domain knowledge with a technical perspective, and making concrete what information real users need</b>."},
        {p:"This experience led me to think, afterwards too, about <b>the connections between technology, industry, and people</b> rather than technology alone."},

        {k:"07 · After the Camp", h:"I kept up my interest in where trade and technology meet."},
        {p:"Seeing problems in the trade industry through AI and data at the camp led me to keep studying the field afterwards."},
        {p:"Continuing my studies in trade, I earned the <b>Trade English Level 1</b> certificate, and I keep expanding my interest in how technology can solve the problems of a specific industry."},
        {facts:["Trade English Level 1 · Korea Chamber of Commerce and Industry · Jun 2026"]}
      ],
      // Team presentation: all 19 slides of the reworked deck (UI shows the improved mockups; company names and figures on screen are examples)
      deck: {
        title: "Team presentation",
        chapters: [
          {name: "Intro", slides: [
            {k:"COVER", t:"A customized, situation-based company-matching service", d:"Customized Situation-Based Business Matching Service. The presentation of Team 11, 2024 Undergraduate Trade & AI Camp. The service screens that follow are improved UI mockups."},
            {k:"CONTENTS", t:"Contents", d:"Four parts: the problem, the solution, expected effects, and a wrap-up."}
          ]},
          {name: "Problem", slides: [
            {k:"PROBLEM 01", t:"85.5% of exporters had supply-chain problems", d:"Cites a KITA survey of 1,094 companies (reported by Newsis, May 2022). As the trade environment shifts from globalization to regionalization, Korean firms were not coping, so supply chains needed diversifying."},
            {k:"PROBLEM 02", t:"A sudden shift in the trade structure", d:"Geopolitical risk (friend-shoring, the US-China trade war) and environmental regulation (CBAM, ETS, the IRA, etc.) are reshaping trade. Only 33.5% of companies said they were somewhat prepared for a supply-chain crisis."},
            {k:"EVIDENCE 01", t:"War damage to domestic R&D companies", d:"In a survey of 333 companies by KOITA (Mar 2022), raw-material prices and supply issues (27.2%) and trade restrictions and production disruption (26.0%) were the leading damage types."},
            {k:"EVIDENCE 02", t:"Export impact of a carbon border tax", d:"A Bank of Korea estimate puts exports down 0.5% if the EU imposed the tax and 0.6% if the US did, about -1.1% in total goods annually."}
          ]},
          {name: "Service design", slides: [
            {k:"SOLUTION", t:"From sign-up to consultation in one flow", d:"Section divider for the solution."},
            {k:"FLOW", t:"Service flow", d:"Six steps: company registration, conditions, recommended companies, map search, company detail, and transaction references. Blacklisted companies are excluded automatically at every step."},
            {k:"STEP 01", t:"Company registration", d:"Enter basic info, size, and transaction details section by section. The old screen of blank fields became sections, chips, and a progress bar."},
            {k:"STEP 02", t:"Matching conditions", d:"Enter item, region, unit price, and contract period, and the result updates right away. Reworked with chips, a range slider, and selection controls."},
            {k:"STEP 03", t:"Recommended companies", d:"Shows fit score together with the reasons. The old list with explanatory text became a view built around fit and evidence checks."},
            {k:"STEP 04", t:"Map search", d:"Picking a company in the list opens it on the map, and picking a pin opens its card in the list: a two-way link."},
            {k:"STEP 05", t:"Company detail", d:"Check contract and trust indicators and request a quote right away, using indicator cards and a request panel."},
            {k:"TRUST", t:"Blacklist", d:"Companies are excluded automatically under internal rules, with the criteria and objection procedure made public. A misclassified company can object with supporting documents."},
            {k:"STEP 06", t:"Transaction references", d:"See anonymous transactions of similarly sized companies, built around indicators, trends, and anonymous cases."}
          ]},
          {name: "Expected effects", slides: [
            {k:"EFFECT 01", t:"A stable trade supply network", d:"Customization to a company's requirements (industry, value, size, etc.) plus AI processing that derives stable values from similar companies' precedents is expected to counter supply-chain crises."},
            {k:"EFFECT 02", t:"Keeping a competitive edge, cutting costs", d:"A stable supply chain helps secure market competitiveness and reduces the risk of inefficient production stoppages, avoiding unnecessary costs."},
            {k:"EFFECT 03", t:"Helping companies set trade strategy", d:"Saves time and cost while giving insight to understand situations that were hard to grasp before and to choose the best option."},
            {k:"THANK YOU", t:"Thank you", d:"The end of Team 11's presentation at the 2024 Undergraduate Trade & AI Camp."}
          ]}
        ]
      }
    },
    "future-tech": {
      title: "Future Technologies of the Fourth Industrial Revolution",
      summary: "Before starting university, completed 14 online courses over two days, 14 hours in total.",
      panel: {
        role: "Found it on the university website before enrolling and signed up on my own",
        scale: "14 lectures · 14 hours (2 full days, 10:00–18:00)",
        period: "13–14 Feb 2024 · online",
        where: "SKKU AI Institute lecture series",
        result: "Completion certificate issued (23 Feb 2024)",
        key: "14 hrs"
      },
      body: [
        {lead:"Looking past what technology can do, at how it connects to reality"},
        {p:"Through talks by experts from Microsoft, AWS, Google and NVIDIA, I looked at fast-moving technologies - generative AI, cloud, image-generation models, digital twins and the metaverse - and at how they are used in real industry."},
        {h3:"Certificate"},
        {cert:{img:"future_tech_cert", alt:"Completion certificate, Future Technologies of the Fourth Industrial Revolution", cap:"Run jointly by the Meta-Consortium A·I·B under the Ministry of Education's convergence-university program · issued 23 Feb 2024 (tap to enlarge)"}},

        {k:"01 · Finding Future Tech on my own", h:"Meeting my field before I even started university"},
        {p:"Just before entering university, I wanted a first look at the computing and AI fields I was about to study."},
        {p:"While browsing the university website myself, I found a lecture series hosted by the AI Institute. I was curious what I would be learning, so I signed up on my own."},
        {p:"Over two days and 14 hours I heard experts from Microsoft, AWS, Google and NVIDIA, and got a broad look at what was moving fast at the time: generative AI, cloud, Azure AI Studio, image-generation models and digital twins."},
        {p:"Rather than going deep on any one technology, I listened with a question: <b>\u201cHow far will technology go, and what role could I play in it?\u201d</b>"},

        {k:"02 · Technology doesn't grow alone", toc:"02 Technology doesn't grow alone", h:"Technology needs an ecosystem."},
        {p:"The first thing that struck me was the story of the <b>driver's licence</b>."},
        {p:"A car alone does not create a car society. Alongside the technology to build cars you need roads and traffic infrastructure, licensing rules and laws, and a society ready to accept it all."},
        {p:"Generative AI and the metaverse were the same."},
        {p:"A new model or platform appearing is not enough to change an industry. Real change needs people to use it, services built on it, infrastructure to handle the data, and a new culture around it."},
        {p:"This widened how I look at technology, from"},
        {q:"\u201cHow good is this technology?\u201d<br>to \u201cWhat does it have to connect to before it creates real value?\u201d"},

        {k:"03 · Building AI, using AI", toc:"03 Building vs. using AI", h:"What kind of role will I play in the AI era?"},
        {p:"The question that stayed with me longest was a simple one."},
        {q:"Between building AI and using AI, which kind of person will I become?"},
        {p:"The lectures covered how AI models are made, along with the path of using them:"},
        {flow:["Train", "Fine-tune", "Prompt Engineering", "Add your data"]},
        {p:"I also saw many examples of AI assisting existing work through Microsoft Copilot: summarising documents, organising PDFs and analysing data."},
        {p:"It made me think the key skill in the AI era may not be building models alone, but being able to"},
        {flow:["Define the problem", "Choose the right technology", "Describe the result precisely", "Judge and improve it"]},
        {p:"As AI advances, people's role does not disappear. <b>The role of the person who defines what to solve and uses AI well may become even more important.</b>"},

        {k:"04 · What generative AI changed was how we ‘generate’", toc:"04 Generative AI", h:"From generating content to understanding intention"},
        {p:"We traced generative AI from GANs through Diffusion Models, Transformers and CLIP, and looked at image-generation services such as DALL\u00b7E, Midjourney and Stable Diffusion."},
        {p:"Early generative models focused on producing natural-looking images. Later ones moved toward <b>linking the meaning of text and images and reflecting the user's intent more precisely</b>."},
        {p:"Watching the speakers use DALL\u00b7E and Midjourney, I noticed the same thing."},
        {p:"Simply giving AI a command was not enough. You had to define the result you wanted, express it in a form the AI could understand, then judge and revise what came back."},
        {p:"Watching generative AI develop, I came to think:"},
        {q:"What matters is less what AI can make<br>than what people ask AI to make."},
        {p:"It sparked an interest in <b>using technology for a purpose and judging its results</b>, rather than simply consuming it."},

        {k:"05 · Experimenting with reality in a virtual world", toc:"05 Reality, virtually", h:"Digital Twin & Synthetic Data"},
        {p:"What stood out most among the talks was NVIDIA's <b>digital twins and Omniverse</b>."},
        {p:"The idea is to rebuild a factory or a city in virtual space and run experiments that are hard to repeat in reality."},
        {p:"When developing a self-driving system, for example, instead of exposing it to every situation on real roads, you can create varied weather and road conditions in a virtual environment and train it there."},
        {p:"A factory's production can likewise be simulated under many conditions first, and the most efficient approach then applied in reality."},
        {p:"I also found it interesting that <b>synthetic data</b> is used to train AI."},
        {p:"I used to think of AI mainly as technology that learns from data and produces results. This lecture gave me a wider view: AI as <b>technology that recreates reality in virtual space, generates new data there, and helps real-world decisions in return</b>."},

        {k:"06 · A different way of seeing technology", toc:"06 A different view", h:"What remained with me"},
        {p:"At the time, it was exciting just to see new technologies like DALL\u00b7E, Copilot, Midjourney and Omniverse appear."},
        {p:"Looking back with some distance, what stayed with me was not the name of any one technology."},
        {p:"What mattered more was a new interest in <b>the connections: between technologies, between technology and people, between technology and industry</b>."},
        {p:"When I meet a new technology, I no longer stop at <b>\u201cWhat can it do?\u201d</b> I also ask:"},
        {checks:["\u201cWhat problem could this be connected to?\u201d", "\u201cWhat role should people play in this?\u201d"]},

        {k:"07 · From Future Tech to My Direction", toc:"07 My direction", h:"Someone who understands technology and connects people with problems"},
        {p:"The fast-changing technology ecosystem felt daunting at times. New models kept appearing, and I wondered whether anyone could keep up with that pace."},
        {p:"At the same time, seeing new technology put to real use, I found <b>the appeal and the joy of growth in exploring change itself</b>."},
        {p:"Above all, this was an experience from before university: finding a field I was curious about on my own, and meeting the technology and perspectives of working professionals first-hand."},
        {p:"It also gave me confidence that choosing computer education as my major fits my interests."},
        {p:"Back then, simply watching AI advance was exciting. Now I am one step further, interested in <b>which real problems of people and industry the technology can solve</b>."},
        {p:"For me, this lecture series was more than learning new technology. It was"},
        {q:"the start of thinking about a role that goes beyond following technology's progress:<br>connecting technology with people, and ideas with problems."},
        {facts:["Technology", "People", "Ideas"]},
        {p:"<b>I am growing into someone who understands technology and connects it where it is needed.</b>"}
      ]
    },
    worldvision: {
      title: "World Vision",
      summary: "Translated World Vision sponsor letters into English: 120 letters, 40 hours in total.",
      short: "Translated 120 World Vision letters into English (40 hours).",
      panel: {
        role: "Translating letters between sponsored children overseas and sponsors in Korea, both directions",
        result: "120 letters · 40 hours (10 letters a week)",
        key: "120 letters"
      },
      body: [
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
      freemed: "FreeMed",
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
