"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Newsletter = {
  active: boolean;
  id: string;
  title: string;
  date: string;
  preview: string;
  body: string;
  cta?: { label: string; href: string };
};

const ease = [0.16, 1, 0.3, 1] as const;

const X_ICON = (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden>
    <path d="M18 6L6 18M6 6l12 12" />
  </svg>
);

const ARROW = (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

function scrollTo(href: string) {
  if (!href.startsWith("#")) return;
  const id = href.slice(1);
  const el = document.getElementById(id);
  const root = document.getElementById("root-content");
  if (el && root) {
    const top = el.getBoundingClientRect().top - root.getBoundingClientRect().top + root.scrollTop;
    root.scrollTo({ top, behavior: "smooth" });
  } else {
    window.location.href = href;
  }
}

export default function NewsletterPopup() {
  const [newsletter, setNewsletter] = useState<Newsletter | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/newsletter");
        if (!res.ok) return;
        const data: Newsletter = await res.json();
        if (!data.active) return;
        // Only show once per newsletter version (keyed by id)
        const dismissed = localStorage.getItem(`nl-dismissed-${data.id}`);
        if (dismissed) return;
        setNewsletter(data);
        // Small delay so the page loads first
        setTimeout(() => setOpen(true), 1400);
      } catch { /* silently skip */ }
    }
    load();
  }, []);

  const dismiss = () => {
    setOpen(false);
    if (newsletter) localStorage.setItem(`nl-dismissed-${newsletter.id}`, "1");
  };

  const handleCta = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    dismiss();
    setTimeout(() => scrollTo(href), 300);
  };

  if (!newsletter) return null;

  const paragraphs = newsletter.body.split(/\n{2,}/).filter(Boolean);

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            className="nl-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            onClick={dismiss}
            aria-hidden
          />

          {/* Panel */}
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={newsletter.title}
            className="nl-panel"
            initial={{ opacity: 0, y: 32, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.97 }}
            transition={{ duration: 0.55, ease }}
          >
            {/* Top decoration line */}
            <div className="nl-top-line" aria-hidden />

            {/* Close */}
            <button className="nl-close" onClick={dismiss} aria-label="Dismiss newsletter">
              {X_ICON}
            </button>

            {/* Header */}
            <div className="nl-head">
              <span className="nl-eyebrow">{newsletter.date} · FTC Team #26336</span>
              <h2 className="nl-title">{newsletter.title}</h2>
              <p className="nl-preview">{newsletter.preview}</p>
            </div>

            {/* Rule */}
            <div className="nl-rule" aria-hidden />

            {/* Body */}
            <div className="nl-body">
              {paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>

            {/* CTA row */}
            {newsletter.cta?.label && (
              <div className="nl-cta">
                <a
                  href={newsletter.cta.href}
                  className="nl-btn"
                  onClick={(e) => handleCta(e, newsletter.cta!.href)}
                >
                  {newsletter.cta.label} {ARROW}
                </a>
                <button className="nl-dismiss" onClick={dismiss}>
                  Not now
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
