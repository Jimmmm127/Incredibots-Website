"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { OUTREACH, STATS } from "./data";
import { Reveal } from "./primitives";

const ease = [0.16, 1, 0.3, 1] as const;

// Inline SVG icons keyed by the icon field in data.ts
const ICONS: Record<string, React.ReactNode> = {
  tree: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M12 22v-7"/><path d="M9 11l3-7 3 7H9z"/><path d="M7 16l5-4 5 4H7z"/>
    </svg>
  ),
  users: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
    </svg>
  ),
  graduation: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/>
    </svg>
  ),
  trophy: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2z"/>
    </svg>
  ),
  cpu: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><path d="M15 2v2M9 2v2M15 20v2M9 20v2M2 15h2M2 9h2M20 15h2M20 9h2"/>
    </svg>
  ),
  code: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
    </svg>
  ),
};

export default function Outreach() {
  const [open, setOpen] = useState<number>(-1);

  return (
    <section id="outreach" className="sec sec-outreach snap">
      <div className="sec-num" aria-hidden>04 · Outreach</div>
      <div className="sec-inner">
        <div className="out-head">
          <div>
            <Reveal><span className="cap"><em>Outreach</em> &mdash; beyond competition</span></Reveal>
            <Reveal delay={0.05} clip>
              <h2 className="h-section">Every point<br />plants a tree.</h2>
            </Reveal>
          </div>
          <Reveal delay={0.15}>
            <p className="body">
              For every 100 points a team scores in its best match, we plant a tree. We&rsquo;ve planted over 3,000 so far, from British Columbia to Kenya. This year we also ran 21 outreach events that reached more than 3,500 people.
            </p>
          </Reveal>
        </div>

        <div className="out-cards">
          {OUTREACH.map((o, i) => {
            const isOpen = open === i;
            const accent = o.accent ?? "#e63946";
            return (
              <Reveal key={o.h} delay={i * 0.08}>
                <motion.div
                  layout
                  className={"oc " + (isOpen ? "is-open" : "")}
                  style={{ "--oc-accent": accent } as React.CSSProperties}
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  transition={{ layout: { duration: 0.5, ease } }}
                  role="button"
                  tabIndex={0}
                  aria-expanded={open === i}
                  aria-controls={`oc-list-${i}`}
                  onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setOpen(isOpen ? -1 : i); } }}
                >
                  <motion.div layout="position" className="oc-header">
                    <div className="oc-icon-wrap" aria-hidden>
                      {ICONS[o.icon] ?? ICONS.cpu}
                    </div>
                    <span className="oc-num">{o.n}</span>
                  </motion.div>
                  <motion.h3 layout="position" className="oc-h">{o.h}</motion.h3>
                  <motion.p layout="position" className="oc-d">{o.d}</motion.p>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.ul
                        id={`oc-list-${i}`}
                        className="oc-list"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.42, ease }}
                      >
                        {o.items.map((it, ii) => (
                          <motion.li key={ii}
                            initial={{ opacity: 0, x: -6 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.06 + ii * 0.04, duration: 0.32 }}
                          >
                            <span>&rarr;</span>{it}
                          </motion.li>
                        ))}
                      </motion.ul>
                    )}
                  </AnimatePresence>
                  <motion.div layout="position" className="oc-bar" aria-hidden>
                    <motion.div className="oc-bar-fill"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: isOpen ? 1 : 0.18 }}
                      transition={{ duration: 0.6, delay: isOpen ? 0.15 : 0, ease }}
                    />
                  </motion.div>
                  <motion.div layout="position" className="oc-foot">
                    <span>{isOpen ? "Show less" : "Learn more"}</span>
                    <motion.span className="oc-plus" animate={{ rotate: isOpen ? 45 : 0 }} transition={{ duration: 0.25, ease }}>+</motion.span>
                  </motion.div>
                </motion.div>
              </Reveal>
            );
          })}
        </div>

        {/* Impact stats */}
        <Reveal delay={0.25}>
          <div className="out-stats">
            {STATS.map((s) => (
              <div key={s.l} className="os-item">
                <span className="os-n">{s.n}</span>
                <span className="os-l">{s.l}</span>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
