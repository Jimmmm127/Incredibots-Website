"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { METRICS } from "./data";
import { MagneticLink, smoothScrollTo, Count } from "./primitives";

const ARROW = (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

const ease = [0.16, 1, 0.3, 1] as const;
const stagger = (i: number) => ({
  initial: { opacity: 0, y: 32 + i * 4 },
  animate: { opacity: 1, y: 0 },
  transition: { delay: 0.3 + i * 0.18, duration: 1.0, ease },
});

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0.15]);
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const click = (id: string) => (e: React.MouseEvent) => { e.preventDefault(); smoothScrollTo(id); };

  return (
    <section id="hero" className="hero snap" ref={ref}>
      <div className="sec-num" aria-hidden>00 · Origin</div>

      {/* Animated dot grid */}
      <div className="hero-dots" aria-hidden />

      {/* Radial spotlight behind content */}
      <div className="hero-glow" aria-hidden />

      <motion.div className="hero-inner" style={{ opacity: heroOpacity, y: heroY }}>
        {/* Eyebrow */}
        <motion.div {...stagger(0)}>
          <span className="eyebrow">
            <span className="eyebrow-dot" />
            FTC Team #26336 · Sammamish, WA · 2024–25 Rookie Season
          </span>
        </motion.div>

        {/* Headline — per-line clip reveal */}
        <h1 className="h-display">
          <span className="line-wrap">
            <motion.span
              className="line-inner line-white"
              initial={{ y: "112%" }}
              animate={{ y: "0%" }}
              transition={{ delay: 0.45, duration: 0.95, ease }}
            >
              Not your average
            </motion.span>
          </span>
          <span className="line-wrap">
            <motion.span
              className="line-inner grad"
              initial={{ y: "112%" }}
              animate={{ y: "0%" }}
              transition={{ delay: 0.66, duration: 0.95, ease }}
            >
              rookie team.
            </motion.span>
          </span>
        </h1>

        {/* Sub */}
        <motion.p className="hero-sub" {...stagger(2)}>
          First tournament. First place. Second tournament. First place again.
          Alliance Captain. State Championship bid. One rookie season, built on
          five FLL championship years nobody could take away from us.
        </motion.p>

        {/* CTAs */}
        <motion.div className="hero-ctas" {...stagger(3)}>
          <MagneticLink href="#about" className="btn btn-grad btn-hero" onClick={click("about")}>
            Read the story {ARROW}
          </MagneticLink>
          <MagneticLink href="#legacy" className="btn btn-ghost btn-hero" onClick={click("legacy")}>
            See the wins
          </MagneticLink>
        </motion.div>

        {/* Metrics */}
        <motion.div className="hero-metrics" {...stagger(4)}>
          {METRICS.map((m) => (
            <div key={m.l} className="hmx">
              <span className={"hmx-n" + (m.grad ? " grad" : "")}>
                <Count to={m.num} prefix={m.prefix} suffix={m.suffix} />
              </span>
              <span className="hmx-l">{m.l}</span>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll cue */}
      <motion.div className="hero-scroll" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.2, duration: 0.8 }}>
        <span>Scroll</span>
        <span className="hsx-line" />
      </motion.div>
    </section>
  );
}
