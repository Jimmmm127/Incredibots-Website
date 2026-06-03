"use client";

import { NAV_ITEMS } from "./data";
import { smoothScrollTo } from "./primitives";

const SOCIAL = [
  { label: "Email",     href: "mailto:incredibotsftc@gmail.com", external: false },
  { label: "Instagram", href: "https://www.instagram.com/ftc26336", external: true },
  { label: "Facebook",  href: "https://www.facebook.com/people/Incredibots/61556642572543", external: true },
  { label: "YouTube",   href: "https://www.youtube.com/@IncredibotSquad", external: true },
];

const PROGRAMS = ["Sea Forest", "FLL Mentorship", "Arduino Education", "TeamForge", "Sonic Dunk!", "Community Events"];

export default function Footer() {
  const click = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    smoothScrollTo(id);
  };

  return (
    <footer className="main-footer snap" id="footer">
      <div className="mf-accent-line" aria-hidden />
      <div className="mf-inner">

        {/* Brand + mission */}
        <div className="mf-top">
          <div className="mf-brand">
            <span className="mf-mark" aria-hidden />
            <div className="mf-brand-text">
              <span className="mf-name">Incredibots</span>
              <span className="mf-id">FTC #26336 · Sammamish, WA</span>
            </div>
          </div>
          <p className="mf-mission">
            &ldquo;Promote a better and greener planet,<br />teach others about robotics, and have fun while doing it.&rdquo;
          </p>
        </div>

        <div className="mf-rule" aria-hidden />

        {/* Link columns */}
        <div className="mf-grid">
          <div className="mf-col">
            <span className="mf-col-label">Navigate</span>
            {NAV_ITEMS.map((n) => (
              <a key={n.id} href={`#${n.id}`} onClick={click(n.id)} className="mf-link">
                {n.label}
              </a>
            ))}
          </div>
          <div className="mf-col">
            <span className="mf-col-label">Connect</span>
            {SOCIAL.map((s) => (
              <a
                key={s.label}
                href={s.href}
                className="mf-link"
                {...(s.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              >
                {s.label}
              </a>
            ))}
          </div>
          <div className="mf-col">
            <span className="mf-col-label">Programs</span>
            {PROGRAMS.map((p) => (
              <a key={p} href="#outreach" onClick={click("outreach")} className="mf-link">
                {p}
              </a>
            ))}
          </div>
          <div className="mf-col mf-col-cta">
            <span className="mf-col-label">Sponsor us</span>
            <p className="mf-cta-body">
              Your brand on our robot, in our notebook, and in front of the FIRST community. Every sponsor helps us plant more trees and reach more students.
            </p>
            <a href="#contact" onClick={click("contact")} className="mf-cta-btn">
              Become a partner →
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mf-bottom">
          <span className="mf-copy">© {new Date().getFullYear()} Incredibots · All rights reserved</span>
          <span className="mf-sep" aria-hidden />
          <span className="mf-ftc">FIRST Tech Challenge · Non-profit outreach team</span>
          <span className="mf-sep" aria-hidden />
          <a href="mailto:incredibotsftc@gmail.com" className="mf-bottom-link">incredibotsftc@gmail.com</a>
        </div>

      </div>
    </footer>
  );
}
