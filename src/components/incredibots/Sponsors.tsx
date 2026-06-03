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

const EASE = [0.16, 1, 0.3, 1] as const;

/* A single partner cell. Monochrome at rest; the partner's brand color
   blooms on hover (glow + hairline) — the "trusted-by" wall pattern. */
function PartnerCell({ s, i, featured }: { s: Sponsor; i: number; featured?: boolean }) {
  const idx = String(i + 1).padStart(2, "0");
  return (
    <motion.div
      className={"sp-cell" + (featured ? " sp-cell-lg" : "")}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.62, delay: i * 0.05, ease: EASE }}
      style={{ "--sp": s.color } as React.CSSProperties}
    >
      <span className="sp-cell-bloom" aria-hidden />
      <div className="sp-cell-top">
        <span className="sp-cell-idx">{idx}</span>
        <span className="sp-cell-cat">{s.category}</span>
      </div>
      <div className="sp-cell-mark">
        {s.logo ? (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img src={s.logo} alt={`${s.name} logo`} className="sp-cell-logo" loading="lazy" decoding="async" />
        ) : (
          <span className="sp-cell-word">{s.name}</span>
        )}
      </div>
      <span className="sp-cell-rule" aria-hidden />
      {featured && <span className="sp-cell-name">{s.name}</span>}
    </motion.div>
  );
}

function TierHead({ label, count }: { label: string; count: number }) {
  return (
    <Reveal>
      <div className="sp-tier-head">
        <span className="sp-tier-label">{label}</span>
        <span className="sp-tier-rule" aria-hidden />
        <span className="sp-tier-count">{String(count).padStart(2, "0")}</span>
      </div>
    </Reveal>
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
            <Reveal><span className="cap"><em>Sponsors</em> &mdash; the partner registry</span></Reveal>
            <Reveal delay={0.05} clip>
              <h2 className="h-section">The names<br />on our robot.</h2>
            </Reveal>
          </div>
          <Reveal delay={0.15}>
            <p className="body">
              Boeing. T-Mobile. Microsoft. Their support funds our builds, our travel, and our outreach. Every sponsor&rsquo;s name rides with us on the robot and appears in the engineering notebook we submit at each event.
            </p>
          </Reveal>
        </div>

        <div className="sp-body">
          {/* Presenting — featured logo wall */}
          <div className="sp-tier">
            <TierHead label="Presenting Partners" count={presenting.length} />
            <div className="sp-wall sp-wall-lg">
              {presenting.map((s, i) => <PartnerCell key={s.name} s={s} i={i} featured />)}
            </div>
          </div>

          {/* Gold — supporting */}
          <div className="sp-tier">
            <TierHead label="Gold Sponsors" count={gold.length} />
            <div className="sp-wall">
              {gold.map((s, i) => <PartnerCell key={s.name} s={s} i={i} />)}
            </div>
          </div>

          {/* Community */}
          <div className="sp-tier">
            <TierHead label="Community Partners" count={community.length} />
            <div className="sp-wall">
              {community.map((s, i) => <PartnerCell key={s.name} s={s} i={i} />)}
            </div>
          </div>

          {/* CTA */}
          <Reveal delay={0.1}>
            <div className="sp-cta">
              <div className="sp-cta-copy">
                <span className="sp-cta-eyebrow">Open partnership</span>
                <h3>Put your name on the robot.</h3>
                <p>Your logo travels with us to every competition, in front of the judges, engineers, and students we meet, and appears in the engineering notebook we submit at each event.</p>
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
