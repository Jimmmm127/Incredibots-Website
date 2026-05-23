"use client";

import Image from "next/image";
import { Reveal, TiltCard } from "./primitives";

const ABOUT_STATS = [
  { n: "1st", l: "FTC Meet Win" },
  { n: "5", l: "Years Competing" },
  { n: "3×", l: "FLL Worlds" },
];

export default function About() {
  return (
    <section id="about" className="sec sec-about snap">
      <div className="sec-num" aria-hidden>01 · About</div>
      <div className="sec-inner about-grid">
        <Reveal>
          <TiltCard className="about-photo" max={4}>
            <div style={{ position: "relative", overflow: "hidden", borderRadius: "inherit", width: "100%", aspectRatio: "5 / 4" }}>
              <Image
                src="https://www.theincredibots.com/Incredibots_Team_Photo.png"
                alt="Incredibots team photo"
                fill
                sizes="(max-width: 980px) 100vw, 50vw"
                style={{ objectFit: "cover", objectPosition: "center 25%", filter: "saturate(0.9) contrast(1.05)" }}
                priority
              />
              <div className="ap-glow" />
            </div>
          </TiltCard>
        </Reveal>

        <div className="about-r">
          <Reveal><span className="cap"><em>About</em> the team</span></Reveal>
          <Reveal delay={0.05} clip>
            <h2 className="h-section">The underdogs<br />with receipts.</h2>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="lead">
              Most first-year FTC teams spend Meet 1 learning how to drive. We spent it accepting the first-place trophy — then came back and did it again at Meet 2. The Incredibots are middle and high schoolers from Sammamish, but &ldquo;rookie&rdquo; never fit.
            </p>
          </Reveal>
          <Reveal delay={0.25}>
            <p className="body">
              Five FLL seasons. Three World Championship trips. 20+ major awards. When we stepped into FTC we didn&rsquo;t start over — we leveled up. We also built TeamForge, run Sea Forest (3,000+ trees planted), and put on 21 outreach events that reached 3,500+ people this year.
            </p>
          </Reveal>
          <div className="about-stats">
            {ABOUT_STATS.map((s, i) => (
              <Reveal key={s.l} delay={0.3 + i * 0.08}>
                <div className="as-item">
                  <span className="as-n">{s.n}</span>
                  <span className="as-l">{s.l}</span>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.55}>
            <div className="tag-row">
              <span className="tag"><span className="tag-dot" />Boeing · T-Mobile · Microsoft</span>
              <span className="tag"><span className="tag-dot" />State qualifier</span>
              <span className="tag"><span className="tag-dot" />Sammamish, WA</span>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
