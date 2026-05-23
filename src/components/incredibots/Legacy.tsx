"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { LEGACY } from "./data";
import { Reveal } from "./primitives";

const ease = [0.16, 1, 0.3, 1] as const;

export default function Legacy() {
  const [active, setActive] = useState(0);
  const current = LEGACY[active];
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const handleTabKey = (e: React.KeyboardEvent, i: number) => {
    if (e.key === "ArrowDown" || e.key === "ArrowRight") {
      e.preventDefault();
      const next = (i + 1) % LEGACY.length;
      setActive(next);
      tabRefs.current[next]?.focus();
    }
    if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
      e.preventDefault();
      const prev = (i - 1 + LEGACY.length) % LEGACY.length;
      setActive(prev);
      tabRefs.current[prev]?.focus();
    }
  };

  return (
    <section id="legacy" className="sec sec-legacy snap">
      <div className="sec-num" aria-hidden>02 · Legacy</div>
      <div className="sec-inner">
        <div className="leg-head">
          <div>
            <Reveal><span className="cap"><em>Legacy</em> &mdash; championship pedigree</span></Reveal>
            <Reveal delay={0.05} clip>
              <h2 className="h-section">This isn&rsquo;t where<br />we started.</h2>
            </Reveal>
          </div>
          <Reveal delay={0.15}>
            <p className="body">
              Before forming our FTC team, our members competed under three FLL banners &mdash; earning state championships and international titles across five seasons. We&rsquo;ve beaten teams from 30+ countries.
            </p>
          </Reveal>
        </div>

        <Reveal>
          <div className="leg-award-count">
            <span className="leg-award-dot" />
            3 teams &middot; 5 seasons &middot; 20+ major awards
          </div>
        </Reveal>

        <div className="leg-grid">
          <div className="leg-tabs" role="tablist" aria-label="Team legacy" aria-orientation="vertical">
            {LEGACY.map((t, i) => (
              <button
                key={t.name}
                ref={(el) => { tabRefs.current[i] = el; }}
                role="tab"
                aria-selected={i === active}
                aria-controls={`leg-panel-${i}`}
                tabIndex={i === active ? 0 : -1}
                className={"leg-tab " + (i === active ? "is-active" : "")}
                onClick={() => setActive(i)}
                onKeyDown={(e) => handleTabKey(e, i)}
              >
                <span className="lt-n">{t.n}</span>
                <span className="lt-name">{t.name}</span>
                <span className="lt-era">{t.era}</span>
              </button>
            ))}
          </div>

          <div className="leg-detail" id={`leg-panel-${active}`} role="tabpanel">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.42, ease }}
              >
                <div className="lg-pill">{current.pill}</div>
                <h3 className="lg-name">{current.name}</h3>
                <div className="lg-era">{current.era}</div>
                <div className="lg-rule" />
                {current.rows.map((row, ri) => (
                  <div key={ri} className="lg-row">
                    {row.season && <span className="lg-season">{row.season}</span>}
                    <ul className="lg-ul">
                      {row.items.map((it, ii) => (
                        <motion.li key={ii}
                          initial={{ opacity: 0, x: -8 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.08 + ii * 0.05, duration: 0.42, ease }}
                        >
                          <span className="lg-bullet">&rarr;</span>
                          <span>{it}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
