"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { OUTREACH, STATS } from "./data";
import { Reveal } from "./primitives";

const ease = [0.16, 1, 0.3, 1] as const;

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
              For every 100 points scored in a team&rsquo;s best match, we plant one tree — Kenya this year, British Columbia last year. 3,000+ trees, 21 events, 3,500+ people. Outreach isn&rsquo;t a checkbox for us.
            </p>
          </Reveal>
        </div>

        <div className="out-cards">
          {OUTREACH.map((o, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={o.h} delay={i * 0.1}>
                <motion.div
                  layout
                  className={"oc " + (isOpen ? "is-open" : "")}
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  transition={{ layout: { duration: 0.5, ease } }}
                  role="button"
                  tabIndex={0}
                  aria-expanded={open === i}
                  aria-controls={`oc-list-${i}`}
                  onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setOpen(isOpen ? -1 : i); } }}
                >
                  <motion.div layout="position" className="oc-num">{o.n}</motion.div>
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
