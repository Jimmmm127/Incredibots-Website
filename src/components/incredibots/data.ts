export const NAV_ITEMS = [
  { id: "about", label: "About" },
  { id: "legacy", label: "Legacy" },
  { id: "journey", label: "Journey" },
  { id: "outreach", label: "Outreach" },
  { id: "sponsors", label: "Sponsors" },
  { id: "contact", label: "Contact" },
];

export const METRICS = [
  { n: "3×", l: "FLL World Championships", grad: true, num: 3, prefix: "", suffix: "×" },
  { n: "20+", l: "Awards won", grad: false, num: 20, prefix: "", suffix: "+" },
  { n: "5", l: "Competition seasons", grad: false, num: 5, prefix: "", suffix: "" },
  { n: "2×", l: "League meet wins", grad: true, num: 2, prefix: "", suffix: "×" },
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
    d: "For every 100 points a team scores in its highest-scoring alliance match, we plant one tree. Last year's trees went to British Columbia, tied to our Washington State and European Premier events. This year they go to Kenya. We've planted roughly 3,000 to 4,000 trees so far, wherever we compete.",
    items: [
      "1 tree planted per 100 pts in a team's highest-scoring alliance match",
      "Last year: British Columbia — Washington State + European Premier",
      "This year: Kenya — tied to wherever we qualify and compete",
      "~3,000–4,000 trees planted across two continents so far",
    ]},
  { n: "02", h: "21 events. 21 sessions.",
    d: "We ran 21 outreach events and 21 mentor sessions this season, reaching an estimated 3,500 to 4,000 people through school visits, STEM fairs, and live robot demos. We also donated robotics kits to Seattle Children's Hospital.",
    items: [
      "21 outreach events — schools, libraries, STEM fairs, community demos",
      "21 mentor sessions with FLL teams this season",
      "3,500–4,000 people impacted this year alone",
      "Donated full robotics kits to Seattle Children's Hospital",
    ]},
  { n: "03", h: "TeamForge",
    d: "TeamForge is a free team-management platform we built for FTC and FLL teams. It brings scheduling, task tracking, notebook tools, and season planning into one place. We built it because we needed it, and we make it free for every team that does.",
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
