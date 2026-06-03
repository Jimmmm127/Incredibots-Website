export const NAV_ITEMS = [
  { id: "about", label: "About" },
  { id: "legacy", label: "Legacy" },
  { id: "journey", label: "Journey" },
  { id: "outreach", label: "Outreach" },
  { id: "sponsors", label: "Sponsors" },
  { id: "contact", label: "Contact" },
];

export const METRICS = [
  { n: "500+", l: "Community members reached",  grad: false, num: 500, prefix: "", suffix: "+" },
  { n: "3×",   l: "FLL World Championships",    grad: true,  num: 3,   prefix: "", suffix: "×" },
  { n: "20+",  l: "Major awards won",            grad: false, num: 20,  prefix: "", suffix: "+" },
  { n: "4",    l: "Teams mentored",              grad: true,  num: 4,   prefix: "", suffix: ""  },
];

export type TickerItem = [string, string, boolean?];

export const TICKER: TickerItem[] = [
  ["WPI International", "Champions Award"],
  ["Boeing", "Aerospace Partner ✦", true],
  ["T-Mobile", "Technology Partner ✦", true],
  ["Microsoft", "Technology Partner ✦", true],
  ["WA State Finals", "Innovation Award"],
  ["Gene Haas Foundation", "STEM Education ✦", true],
  ["CDW", "Technology Solutions ✦", true],
  ["Polymaker", "Materials Partner ✦", true],
  ["Maxwell · Meet 1", "First Place"],
  ["KidsFill", "Community Partner ✦", true],
  ["See's Candies", "Community Partner ✦", true],
  ["Online Medals", "Awards Partner ✦", true],
  ["Maxwell · Meet 2", "Back-to-Back"],
  ["Hawking Interleague", "Alliance Captain"],
  ["Capek Semifinal", "Think Award · 2nd"],
  ["WPI International", "Engineering Excellence"],
  ["WA Semifinals", "Champions Award"],
  ["Marine Machines", "WPI 2025 · Worcester, MA"],
];

export type SponsorTier = "presenting" | "gold" | "community";
export interface Sponsor { name: string; tier: SponsorTier; category: string; color: string; logo: string | null; }

export const SPONSORS: Sponsor[] = [
  { name: "Boeing",             tier: "presenting", category: "Aerospace Partner",    color: "#1a6eb5", logo: "/sponsors/boeing.svg"    },
  { name: "T-Mobile",           tier: "presenting", category: "Technology Partner",   color: "#e20074", logo: "/sponsors/tmobile.svg"   },
  { name: "Microsoft",          tier: "presenting", category: "Technology Partner",   color: "#00a4ef", logo: "/sponsors/microsoft.svg" },
  { name: "Gene Haas Foundation", tier: "gold",     category: "STEM Education",       color: "#f57c00", logo: null },
  { name: "CDW",                tier: "gold",       category: "Technology Solutions", color: "#c8102e", logo: null },
  { name: "Polymaker",          tier: "gold",       category: "Materials Partner",    color: "#2ecc71", logo: null },
  { name: "KidsFill",           tier: "community",  category: "Community Partner",    color: "#ff6b35", logo: null },
  { name: "See's Candies",      tier: "community",  category: "Community Partner",    color: "#c9a020", logo: null },
  { name: "Online Medals",      tier: "community",  category: "Awards Partner",       color: "#c9a84c", logo: null },
];

export type AwardResult = "winner" | "finalist" | "2nd" | "qualifier";
export interface AwardItem { text: string; result?: AwardResult; }
export interface LegacyRow  { season: string; items: AwardItem[]; }
export interface LegacyTeam { n: string; name: string; era: string; pill: string; rows: LegacyRow[]; }

export const LEGACY: LegacyTeam[] = [
  {
    n: "01", name: "Incredibots", era: "Masterpiece · 2023–24", pill: "FLL · 1 Season",
    rows: [{ season: "", items: [
      { text: "WA Qualifiers — Champions Award",          result: "winner"    },
      { text: "WA Qualifiers — Robot Performance Award",  result: "winner"    },
      { text: "WA Semifinals — Champions Award",          result: "winner"    },
      { text: "WA Semifinals — Robot Performance Award",  result: "finalist"  },
      { text: "WA State Finals — Innovation Award",       result: "winner"    },
      { text: "WPI International — Champions Award",      result: "winner"    },
    ]}],
  },
  {
    n: "02", name: "Jarvis Coders", era: "2022 — 2025", pill: "FLL · 3 Seasons",
    rows: [
      { season: "Superpowered '22–23", items: [
        { text: "Robot Design Award",         result: "winner"    },
        { text: "Robot Performance Award",    result: "finalist"  },
        { text: "WPI World Championship",     result: "qualifier" },
      ]},
      { season: "Masterpiece '23–24", items: [
        { text: "Breakthrough Award",         result: "winner"    },
        { text: "Robot Performance Award",    result: "winner"    },
        { text: "Coach/Mentor Award",         result: "winner"    },
        { text: "Championship Award",         result: "finalist"  },
        { text: "Rising All-Star Award",      result: "winner"    },
        { text: "WPI World Championship",     result: "qualifier" },
      ]},
      { season: "Submerged '24–25", items: [
        { text: "Coach/Mentor Award",              result: "winner"    },
        { text: "Robot Performance Award (×2)",    result: "winner"    },
        { text: "WPI World Championship",          result: "qualifier" },
      ]},
    ],
  },
  {
    n: "03", name: "Marine Machines", era: "Submerged · 2024–25", pill: "FLL · 1 Season",
    rows: [{ season: "", items: [
      { text: "FLL Qualifier — Robot Performance Award",    result: "winner"    },
      { text: "FLL Qualifier — Robot Design Award",         result: "finalist"  },
      { text: "FLL Semifinal — Champions Award",            result: "winner"    },
      { text: "FLL Semifinal — Robot Performance Award",    result: "finalist"  },
      { text: "WA State Championship — Engineering Excellence Award", result: "winner" },
      { text: "WPI International — Engineering Excellence Award",     result: "winner" },
    ]}],
  },
];

export const JOURNEY = [
  { n: "01", phase: "Meet 1", title: "Maxwell League · Meet 1", badge: "First Place",
    desc: "Our first FTC tournament. We competed against teams with multiple seasons of experience and finished in first place." },
  { n: "02", phase: "Meet 2", title: "Maxwell League · Meet 2", badge: "Back-to-Back",
    desc: "We returned to the Maxwell League for our second meet and took first place again, going back-to-back in our rookie year." },
  { n: "03", phase: "Interleague", title: "Hawking Interleague", badge: "Alliance Captain",
    desc: "Top-seeded teams choose their playoff partners. We were selected to captain an alliance and led match strategy through the interleague tournament." },
  { n: "04", phase: "Playoff", title: "Capek Semifinal", badge: "Think Award · 2nd",
    desc: "The Think Award recognizes a team's engineering documentation and design process. Our engineering notebook placed 2nd in the region." },
];

export const OUTREACH = [
  { n: "01", h: "Sea Forest",
    d: "For every 100 points a team scores in its highest-scoring alliance match, we plant one tree. Trees have gone to British Columbia, tied to our Washington State and European Premier events, and this year to Kenya. We have planted roughly 3,000 to 4,000 trees across two continents.",
    items: [
      "1 tree per 100 points in a team's highest-scoring match",
      "Previous seasons: British Columbia — WA State + European Premier",
      "Current season: Kenya — wherever we qualify and compete",
      "~3,000–4,000 trees planted across two continents so far",
    ]},
  { n: "02", h: "Community Events",
    d: "We ran 21 outreach events and 21 mentor sessions this season, reaching an estimated 3,500 to 4,000 people through school visits, STEM fairs, and live robot demonstrations. We also donated full robotics kits to Seattle Children's Hospital.",
    items: [
      "21 outreach events — schools, libraries, STEM fairs, community demos",
      "21 mentor sessions with FLL teams this season",
      "3,500–4,000 people impacted this year alone",
      "Donated full robotics kits to Seattle Children's Hospital",
    ]},
  { n: "03", h: "FLL Mentorship",
    d: "We mentor four active FLL teams, providing coaching, strategy sessions, and engineering notebook guidance. Our members competed in FLL for five seasons before moving to FTC — we pass that experience directly to the next generation.",
    items: [
      "4 active FLL teams currently mentored",
      "Weekly strategy and engineering notebook sessions",
      "5 combined seasons of FLL competition experience shared",
      "3 mentored teams have qualified for the World Championship",
    ]},
  { n: "04", h: "Sonic Dunk!",
    d: "Our 2023–24 FLL Innovation Project. We designed a sonar-based audio guidance system to make basketball accessible to visually impaired athletes — giving players real-time audio cues for aim and shot placement without any visual reference.",
    items: [
      "FLL Innovation Project 2023–24 season",
      "Sonar-based audio cues for aim and shot guidance",
      "Designed for athletes with visual impairments",
      "Prototyped and presented at regional and state competitions",
    ]},
  { n: "05", h: "Arduino Education",
    d: "We run workshops teaching younger students the basics of Arduino hardware and embedded programming. Students build their first circuits, write their first code, and learn how sensors, motors, and logic work — the same foundation our robot runs on.",
    items: [
      "Arduino and embedded hardware workshops for middle schoolers",
      "Students build circuits and write code from scratch",
      "Video series available for remote and self-paced learning",
      "Covers sensors, motors, logic, and basic robotics concepts",
    ]},
  { n: "06", h: "TeamForge",
    d: "TeamForge is a free team-management platform we built for FTC and FLL teams. It brings scheduling, task tracking, notebook tools, and season planning into one place. We built it because we needed it, and we make it free for every team that does.",
    items: [
      "Free team-management platform for FTC and FLL",
      "Scheduling, task tracking, engineering notebook tools",
      "Open-source robot code and engineering notebooks",
      "Built by our team — available to every team, always free",
    ]},
];

// Outreach stats bar
export const STATS = [
  { n: "3.5K+", l: "People impacted this year" },
  { n: "3–4K",  l: "Trees planted worldwide"   },
  { n: "21",    l: "Outreach events"            },
  { n: "4",     l: "Teams mentored"             },
];

// Journey sidebar (animated count)
export const JOURNEY_STATS = [
  { n: "3.5K+", l: "People impacted this year", num: 3500, suffix: "+" },
  { n: "3K+",   l: "Trees planted",             num: 3000, suffix: "+" },
  { n: "21",    l: "Outreach events",            num: 21,   suffix: ""  },
  { n: "4",     l: "Teams mentored",             num: 4,    suffix: ""  },
];
