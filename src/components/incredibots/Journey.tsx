"use client";

import { motion } from "framer-motion";
import { JOURNEY, JOURNEY_STATS } from "./data";
import { Reveal, Count } from "./primitives";

export default function Journey() {
  return (
    <section id="journey" className="sec sec-journey snap">
      <div className="sec-num" aria-hidden>03 · Journey</div>
      <div className="sec-inner journey-grid">
        <div className="jr-l">
          <Reveal><span className="cap"><em>Journey</em> &mdash; FTC rookie · 2024–25</span></Reveal>
          <Reveal delay={0.05} clip>
            <h2 className="h-section">Meet 1.<br />First place.</h2>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="body">
              Meet 2. First place again. Then Alliance Captain. Then a top engineering award. Built on five seasons of FLL — this is what year one looks like when you already know how to win.
            </p>
          </Reveal>
          <Reveal delay={0.25}>
            <div className="jr-stats">
              {JOURNEY_STATS.map((s) => (
                <div className="jrs" key={s.l}>
                  <span className="jrs-n">
                    <Count to={s.num} suffix={s.suffix} />
                  </span>
                  <span className="jrs-l">{s.l}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        <div className="jr-tl-wrap">
          <motion.div
            className="jr-connector"
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, margin: "-15%" }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            aria-hidden
          />
          <ol className="jr-tl">
            {JOURNEY.map((j, i) => (
              <motion.li
                key={j.title}
                className="jrt"
                initial={{ opacity: 0, y: 36, scale: 0.98 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.9, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ x: 6, scale: 1.01, transition: { duration: 0.25 } }}
              >
                <div className="jrt-node"><span className="jrt-dot" /></div>
                <div className="jrt-body">
                  <div className="jrt-row">
                    <span className="jrt-n">{j.n} · {j.phase}</span>
                    <span className="jrt-badge">{j.badge}</span>
                  </div>
                  <h4 className="jrt-title">{j.title}</h4>
                  <p className="jrt-desc">{j.desc}</p>
                </div>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
