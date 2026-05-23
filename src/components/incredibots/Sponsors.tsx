"use client";

import { motion } from "framer-motion";
import { Reveal, MagneticLink } from "./primitives";
import { SPONSORS } from "./data";
import type { Sponsor } from "./data";

const ARROW = (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

function PresentingCard({ s, i }: { s: Sponsor; i: number }) {
  return (
    <motion.div
      className="sp-pres-card"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -4, scale: 1.015 }}
      style={{ "--sp-color": s.color } as React.CSSProperties}
    >
      <div className="sp-pres-glow" aria-hidden />
      <span className="sp-pres-tier">Presenting Partner</span>
      <div className="sp-pres-logo">
        {s.logo ? (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img src={s.logo} alt={s.name} className="sp-logo-img" />
        ) : (
          <span className="sp-pres-name">{s.name}</span>
        )}
      </div>
      <span className="sp-pres-cat">{s.category}</span>
    </motion.div>
  );
}

function SmallCard({ s, i }: { s: Sponsor; i: number }) {
  return (
    <motion.div
      className="sp-sm-card"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -3, scale: 1.02 }}
      style={{ "--sp-color": s.color } as React.CSSProperties}
    >
      <span className="sp-sm-name">{s.name}</span>
      <span className="sp-sm-cat">{s.category}</span>
      <div className="sp-sm-bar" aria-hidden />
    </motion.div>
  );
}

export default function Sponsors() {
  const clickSponsor = (e: React.MouseEvent) => {
    e.preventDefault();
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("sponsor-reveal"));
    }
  };

  const presenting = SPONSORS.filter((s) => s.tier === "presenting");
  const gold = SPONSORS.filter((s) => s.tier === "gold");
  const community = SPONSORS.filter((s) => s.tier === "community");

  return (
    <section id="sponsors" className="sec sec-sponsors snap">
      <div className="sec-num" aria-hidden>05 · Sponsors</div>
      <div className="sec-inner">
        <div className="sp-head">
          <div>
            <Reveal><span className="cap"><em>Sponsors</em> &mdash; partners</span></Reveal>
            <Reveal delay={0.05}>
              <h2 className="h-section">The names<br />on our robot.</h2>
            </Reveal>
          </div>
          <Reveal delay={0.15}>
            <p className="body">
              Boeing. T-Mobile. Microsoft. These aren&rsquo;t just logos — they&rsquo;re organizations that bet on us before we proved anything. Their belief funds our builds, their names ride with us every match.
            </p>
          </Reveal>
        </div>

        <div className="sp-body">
          {/* Presenting — large feature row */}
          <div className="sp-presenting-row">
            {presenting.map((s, i) => <PresentingCard key={s.name} s={s} i={i} />)}
          </div>

          {/* Gold + Community */}
          <div className="sp-lower">
            <div className="sp-lower-col">
              <Reveal><div className="sp-tier-label">Gold Sponsors</div></Reveal>
              <div className="sp-sm-grid">
                {gold.map((s, i) => <SmallCard key={s.name} s={s} i={i} />)}
              </div>
            </div>
            <div className="sp-lower-col">
              <Reveal><div className="sp-tier-label">Community Partners</div></Reveal>
              <div className="sp-sm-grid">
                {community.map((s, i) => <SmallCard key={s.name} s={s} i={i} />)}
              </div>
            </div>
          </div>

          {/* CTA */}
          <Reveal delay={0.2}>
            <div className="sp-cta">
              <div>
                <h3>Put your name on the robot.</h3>
                <p>Your logo reaches every judge, engineer, and student we meet. Our engineering notebook goes to every judge at every event.</p>
              </div>
              <MagneticLink href="#contact" className="btn btn-grad btn-lg" onClick={clickSponsor}>
                Become a sponsor {ARROW}
              </MagneticLink>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
