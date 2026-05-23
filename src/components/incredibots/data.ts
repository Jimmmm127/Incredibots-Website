export const NAV_ITEMS = [
  { id: "about", label: "About" },
  { id: "legacy", label: "Legacy" },
  { id: "journey", label: "Journey" },
  { id: "outreach", label: "Outreach" },
  { id: "sponsors", label: "Sponsors" },
  { id: "contact", label: "Contact" },
];

export const METRICS = [
  { n: "3×", l: "FLL Worlds Trips", grad: true, num: 3, prefix: "", suffix: "×" },
  { n: "20+", l: "Trophies Won", grad: false, num: 20, prefix: "", suffix: "+" },
  { n: "5", l: "Seasons Competing", grad: false, num: 5, prefix: "", suffix: "" },
  { n: "#1", l: "Two Meets Running", grad: true, num: 1, prefix: "#", suffix: "" },
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
  ["Maxwell · Meet 1", "Winners"],
  ["KidsFill", "Community Partner ✦", true],
  ["See's Candies", "Community Partner ✦", true],
  ["Online Medals", "Awards Partner ✦", true],
  ["Maxwell · Meet 2", "Winners"],
  ["Hawking Interleague", "Alliance Captain"],
  ["Capek Semifinal", "Think Award · 2nd"],
  ["WPI International", "Engineering Excellence"],
  ["WA Semifinals", "Champions Award"],
];

export type SponsorTier = "presenting" | "gold" | "community";
export interface Sponsor { name: string; tier: SponsorTier; category: string; color: string; logo: string | null; }

export const SPONSORS: Sponsor[] = [
  { name: "Boeing", tier: "presenting", category: "Aerospace Partner", color: "#1a6eb5", logo: "/sponsors/boeing.svg" },
  { name: "T-Mobile", tier: "presenting", category: "Technology Partner", color: "#e20074", logo: "/sponsors/tmobile.svg" },
  { name: "Microsoft", tier: "presenting", category: "Technology Partner", color: "#00a4ef", logo: "/sponsors/microsoft.svg" },
  { name: "Gene Haas Foundation", tier: "gold", category: "STEM Education", color: "#f57c00", logo: null },
  { name: "CDW", tier: "gold", category: "Technology Solutions", color: "#c8102e", logo: null },
  { name: "Polymaker", tier: "gold", category: "Materials Partner", color: "#2ecc71", logo: null },
  { name: "KidsFill", tier: "community", category: "Community Partner", color: "#ff6b35", logo: null },
  { name: "See's Candies", tier: "community", category: "Community Partner", color: "#c9a020", logo: null },
  { name: "Online Medals", tier: "community", category: "Awards Partner", color: "#c9a84c", logo: null },
];

export const LEGACY = [
  {
    n: "01", name: "Incredibots", era: "Masterpiece · 2023–24", pill: "FLL · 1 Season",
    rows: [{ season: "", items: [
      "WA Qualifiers — Champions Award & Robot Performance",
      "WA Semifinals — Champions Award",
      "WA State Finals — Innovation Award",
      "WPI International — Champions Award · beat 30+ countries",
    ]}],
  },
  {
    n: "02", name: "Jarvis Coders", era: "2022 — 2025", pill: "FLL · 3 Seasons",
    rows: [
      { season: "Superpowered '22–23", items: ["Robot Design Award · Worlds-qualified"] },
      { season: "Masterpiece '23–24", items: ["Breakthrough + Robot Performance", "Rising All-Star · Worlds-qualified"] },
      { season: "Submerged '24–25", items: ["Coach/Mentor + Robot Performance (2×) · Worlds-qualified"] },
    ],
  },
  {
    n: "03", name: "Marine Machines", era: "Submerged · 2024–25", pill: "FLL · 1 Season",
    rows: [{ season: "", items: [
      "FLL Qualifier — Robot Performance",
      "FLL Semifinal — Champions Award",
      "WA State — Engineering Excellence",
      "WPI International — Engineering Excellence · Worcester, MA",
    ]}],
  },
];

export const JOURNEY = [
  { n: "01", phase: "Meet 1", title: "Maxwell League · Meet 1", badge: "First Place",
    desc: "Our first FTC tournament. Ever. We walked in with zero FTC experience and walked out with first place. The other teams had seasons on us. We had five years of FLL fire and a robot that worked." },
  { n: "02", phase: "Meet 2", title: "Maxwell League · Meet 2", badge: "Back-to-Back",
    desc: "Second tournament. Second win. Back-to-back first place as rookies. We stopped being a surprise and started being a target — and we liked it that way." },
  { n: "03", phase: "Interleague", title: "Hawking Interleague", badge: "Alliance Captain",
    desc: "Alliance Captains are chosen by the top teams — they don't volunteer. Other teams chose us to lead. We led the alliance, strategized on the fly, and proved first place wasn't a fluke." },
  { n: "04", phase: "Playoff", title: "Capek Semifinal", badge: "Think Award · 2nd",
    desc: "The Think Award judges engineering documentation and design innovation. We finished 2nd in the region against teams with multiple seasons of experience. Judges read notebooks, and ours stood up." },
];

export const OUTREACH = [
  { n: "01", h: "Sea Forest",
    d: "For every 100 points scored in a team's highest-scoring alliance match, we plant one tree. Last year the trees went to British Columbia — for Washington State and the European Premier. This year they go to Kenya. We're at about 3,000–4,000 trees and it goes wherever we compete.",
    items: [
      "1 tree planted per 100 pts in a team's highest-scoring alliance match",
      "Last year: British Columbia — Washington State + European Premier",
      "This year: Kenya — tied to wherever we qualify and compete",
      "~3,000–4,000 trees planted across two continents so far",
    ]},
  { n: "02", h: "21 events. 21 sessions.",
    d: "21 outreach events and 21 mentor sessions this year alone. We've impacted an estimated 3,500–4,000 people through school visits, STEM fairs, live robot demos, and donated robotics kits to Seattle Children's Hospital.",
    items: [
      "21 outreach events — schools, libraries, STEM fairs, community demos",
      "21 mentor sessions with FLL teams this season",
      "3,500–4,000 people impacted this year alone",
      "Donated full robotics kits to Seattle Children's Hospital",
    ]},
  { n: "03", h: "TeamForge",
    d: "We built TeamForge — a free team management platform for FTC and FLL teams. Scheduling, task tracking, notebook tools, and season planning all in one place. Built by a team that needed it, free for every team that does.",
    items: [
      "TeamForge: free team management platform for FTC and FLL",
      "Scheduling, task tracking, engineering notebook tools",
      "Open-source robot code and engineering notebooks",
      "Built by us — available to every team for free",
    ]},
];

// Used in the Outreach stats bar (displayed as text, not counted)
export const STATS = [
  { n: "3.5K+", l: "People impacted this year" },
  { n: "3–4K",  l: "Trees planted worldwide"   },
  { n: "21",    l: "Outreach events"            },
  { n: "21",    l: "Mentor sessions"            },
];

// Used in Journey sidebar (animated count)
export const JOURNEY_STATS = [
  { n: "3.5K+", l: "People impacted this year", num: 3500, suffix: "+" },
  { n: "3K+",   l: "Trees planted",             num: 3000, suffix: "+" },
  { n: "21",    l: "Outreach events",            num: 21,   suffix: "" },
  { n: "21",    l: "Mentor sessions",            num: 21,   suffix: "" },
];
