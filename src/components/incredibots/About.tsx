"use client";

import Image from "next/image";
import { Reveal, TiltCard } from "./primitives";

const ABOUT_STATS = [
  { n: "1st", l: "First FTC meet" },
  { n: "5", l: "Seasons in FIRST" },
  { n: "3×", l: "FLL World trips" },
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
            <h2 className="h-section">Built on five<br />years of FIRST.</h2>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="lead">
              Most first-year FTC teams spend their first tournament learning to drive. We won ours, then won the next one too. The Incredibots are middle and high school students from Sammamish, Washington, with five seasons of FIRST competition behind us.
            </p>
          </Reveal>
          <Reveal delay={0.25}>
            <p className="body">
              Before FTC, our members competed for five seasons in FIRST LEGO League, earning three trips to the World Championship and more than 20 awards. Off the field, we built TeamForge, run our Sea Forest tree-planting program, and held 21 outreach events reaching over 3,500 people this year.
            </p>
          </Reveal>
          <Reveal delay={0.32}>
            <blockquote className="about-mission">
              &ldquo;Promote a better and greener planet, teach others about robotics, and have fun while doing it.&rdquo;
            </blockquote>
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
