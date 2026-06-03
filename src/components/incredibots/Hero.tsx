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
          <span className="hero-status-r">2024–25 Season · FIRST Tech Challenge</span>
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
              First-year team.
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
            We are FTC Team #26336, a robotics team of middle and high school
            students from Sammamish, Washington. In our first FTC season we won
            both league meets and captained a playoff alliance, backed by five
            years of FIRST competition and three trips to the World Championship.
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

      {/* Scroll cue */}
      <motion.div className="hero-scroll" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2, duration: 0.8 }}>
        <span>Scroll</span>
        <span className="hsx-line" />
      </motion.div>
    </section>
  );
}
