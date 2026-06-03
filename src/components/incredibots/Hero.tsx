"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { METRICS } from "./data";
import { MagneticLink, smoothScrollTo, Count, useScrollContainer } from "./primitives";

const ARROW = (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

// Circumferences: r=232 → 1458, r=186 → 1168
const HeroHUD = () => (
  <svg className="hero-hud" viewBox="0 0 500 500" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
    {/* Rotating ring group */}
    <g className="hud-rings">
      {/* Structure rings */}
      <circle cx="250" cy="250" r="232" stroke="rgba(255,255,255,0.04)" strokeWidth="1"/>
      <circle cx="250" cy="250" r="186" stroke="rgba(255,255,255,0.06)" strokeWidth="1"/>
      <circle cx="250" cy="250" r="140" stroke="rgba(255,255,255,0.085)" strokeWidth="1"/>

      {/* Red arc — 120° from 12 o'clock clockwise (top through 4 o'clock) */}
      <circle cx="250" cy="250" r="232"
        stroke="rgba(230,57,70,0.55)" strokeWidth="1.5"
        strokeDasharray="486 972"
        transform="rotate(-90 250 250)"
      />
      {/* Blue arc — 90° starting at ~5 o'clock position */}
      <circle cx="250" cy="250" r="186"
        stroke="rgba(74,163,232,0.42)" strokeWidth="1.5"
        strokeDasharray="292 876"
        strokeDashoffset="-487"
        transform="rotate(-90 250 250)"
      />

      {/* Compass ticks — N and E are brand-coloured and longer */}
      <line x1="250" y1="8"   x2="250" y2="30"  stroke="rgba(230,57,70,0.9)"   strokeWidth="2"/>
      <line x1="414" y1="86"  x2="405" y2="95"  stroke="rgba(255,255,255,0.18)" strokeWidth="1"/>
      <line x1="470" y1="250" x2="492" y2="250" stroke="rgba(74,163,232,0.9)"   strokeWidth="2"/>
      <line x1="414" y1="414" x2="405" y2="405" stroke="rgba(255,255,255,0.18)" strokeWidth="1"/>
      <line x1="250" y1="470" x2="250" y2="492" stroke="rgba(255,255,255,0.13)" strokeWidth="1"/>
      <line x1="86"  y1="414" x2="95"  y2="405" stroke="rgba(255,255,255,0.18)" strokeWidth="1"/>
      <line x1="8"   y1="250" x2="30"  y2="250" stroke="rgba(255,255,255,0.13)" strokeWidth="1"/>
      <line x1="86"  y1="86"  x2="95"  y2="95"  stroke="rgba(255,255,255,0.18)" strokeWidth="1"/>

      {/* Corner brackets */}
      <path d="M368 24 L470 24 L470 130"  stroke="rgba(255,255,255,0.09)" strokeWidth="1"/>
      <path d="M132 476 L30 476 L30 370"  stroke="rgba(255,255,255,0.09)" strokeWidth="1"/>

      {/* Circuit node — top-right */}
      <circle cx="390" cy="108" r="4"   fill="rgba(230,57,70,0.75)"/>
      <line x1="390" y1="108" x2="430" y2="108" stroke="rgba(230,57,70,0.3)" strokeWidth="1"/>
      <line x1="430" y1="108" x2="430" y2="70"  stroke="rgba(230,57,70,0.3)" strokeWidth="1"/>
      <circle cx="430" cy="70"  r="2.5" fill="rgba(230,57,70,0.4)"/>

      {/* Circuit node — bottom-left */}
      <circle cx="110" cy="392" r="4"   fill="rgba(74,163,232,0.75)"/>
      <line x1="110" y1="392" x2="70"  y2="392" stroke="rgba(74,163,232,0.3)" strokeWidth="1"/>
      <line x1="70"  y1="392" x2="70"  y2="430" stroke="rgba(74,163,232,0.3)" strokeWidth="1"/>
      <circle cx="70"  cy="430" r="2.5" fill="rgba(74,163,232,0.4)"/>

      {/* Indicator dots on N and E of outer ring */}
      <circle cx="250" cy="18"  r="3" fill="rgba(230,57,70,0.7)"/>
      <circle cx="482" cy="250" r="3" fill="rgba(74,163,232,0.7)"/>
    </g>

    {/* Counter-rotating centre — stays upright while rings spin */}
    <g className="hud-center">
      <circle cx="250" cy="250" r="52" stroke="rgba(255,255,255,0.06)" strokeWidth="1"/>
      {/* Crosshair */}
      <line x1="232" y1="250" x2="244" y2="250" stroke="rgba(255,255,255,0.22)" strokeWidth="1"/>
      <line x1="256" y1="250" x2="268" y2="250" stroke="rgba(255,255,255,0.22)" strokeWidth="1"/>
      <line x1="250" y1="232" x2="250" y2="244" stroke="rgba(255,255,255,0.22)" strokeWidth="1"/>
      <line x1="250" y1="256" x2="250" y2="268" stroke="rgba(255,255,255,0.22)" strokeWidth="1"/>
      {/* Centre dot */}
      <circle cx="250" cy="250" r="3.5" fill="rgba(230,57,70,0.9)"/>
      {/* Team ID */}
      <text x="250" y="237" textAnchor="middle" fontFamily="monospace" fontSize="11" fill="rgba(255,255,255,0.28)" letterSpacing="2.5">#26336</text>
      <text x="250" y="267" textAnchor="middle" fontFamily="monospace" fontSize="8"  fill="rgba(230,57,70,0.5)"   letterSpacing="3">INCREDIBOTS</text>
    </g>
  </svg>
);

const ease = [0.16, 1, 0.3, 1] as const;
const rise = (i: number) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { delay: 0.32 + i * 0.12, duration: 0.9, ease },
});

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const container = useScrollContainer();
  const { scrollYProgress } = useScroll({
    container: container ?? undefined,
    target: ref,
    offset: ["start start", "end start"],
  });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0.15]);
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const glowY = useTransform(scrollYProgress, [0, 1], [0, 160]);
  const click = (id: string) => (e: React.MouseEvent) => { e.preventDefault(); smoothScrollTo(id); };

  return (
    <section id="hero" className="hero snap" ref={ref}>
      <div className="sec-num" aria-hidden>00 · Origin</div>

      {/* Animated dot grid */}
      <div className="hero-dots" aria-hidden />

      {/* Radial spotlight behind content — parallaxes on scroll */}
      <motion.div className="hero-glow" aria-hidden style={{ y: glowY }} />

      <motion.div className="hero-inner" style={{ opacity: heroOpacity, y: heroY }}>
        {/* Operational status bar */}
        <motion.div className="hero-status" {...rise(0)}>
          <span className="hero-status-l">
            <span className="eyebrow-dot" />
            FTC Team #26336 · Sammamish, WA
          </span>
          <span className="hero-status-r">2025–26 Season · FIRST Tech Challenge</span>
        </motion.div>

        {/* Headline — per-line clip reveal, left-aligned */}
        <h1 className="h-display hero-h">
          <span className="line-wrap">
            <motion.span
              className="line-inner line-white"
              initial={{ y: "112%" }}
              animate={{ y: "0%" }}
              transition={{ delay: 0.42, duration: 0.95, ease }}
            >
              Five seasons.
            </motion.span>
          </span>
          <span className="line-wrap">
            <motion.span
              className="line-inner grad"
              initial={{ y: "112%" }}
              animate={{ y: "0%" }}
              transition={{ delay: 0.62, duration: 0.95, ease }}
            >
              Two-time champions.
            </motion.span>
          </span>
        </h1>

        {/* Lead + CTAs */}
        <div className="hero-lead">
          <motion.p className="hero-sub" {...rise(2)}>
            FTC Team #26336 from Sammamish, Washington. Five seasons in FIRST,
            three trips to the World Championship, and a mission to promote a better
            planet through robotics. We compete, we mentor, and we build tools
            that every team can use for free.
          </motion.p>
          <motion.div className="hero-ctas" {...rise(3)}>
            <MagneticLink href="#about" className="btn btn-grad btn-hero" onClick={click("about")}>
              About the team {ARROW}
            </MagneticLink>
            <MagneticLink href="#legacy" className="btn btn-ghost btn-hero" onClick={click("legacy")}>
              Our results
            </MagneticLink>
          </motion.div>
        </div>

        {/* Metrics — hairline-ruled data strip */}
        <motion.div className="hero-metrics" {...rise(4)}>
          {METRICS.map((m, i) => (
            <div key={m.l} className="hmx">
              <span className="hmx-bloom" aria-hidden />
              <span className="hmx-idx">{String(i + 1).padStart(2, "0")}</span>
              <span className={"hmx-n" + (m.grad ? " grad" : "")}>
                <Count to={m.num} prefix={m.prefix} suffix={m.suffix} />
              </span>
              <span className="hmx-l">{m.l}</span>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* HUD graphic — right-side visual anchor */}
      <motion.div
        className="hero-hud-wrap"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9, duration: 2.2 }}
        aria-hidden
      >
        <HeroHUD />
      </motion.div>

      {/* Scroll cue */}
      <motion.div className="hero-scroll" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2, duration: 0.8 }}>
        <span>Scroll</span>
        <span className="hsx-line" />
      </motion.div>
    </section>
  );
}
