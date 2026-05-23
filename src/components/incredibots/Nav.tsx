"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import { NAV_ITEMS } from "./data";
import { MagneticLink, smoothScrollTo } from "./primitives";

const ARROW = (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden>
    <path d="M7 17L17 7M17 7H8M17 7v9" />
  </svg>
);

export default function Nav() {
  const [active, setActive] = useState("hero");
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navUlRef = useRef<HTMLUListElement>(null);
  const linkRefs = useRef<Record<string, HTMLAnchorElement | null>>({});
  const initialized = useRef(false);

  const pillX = useMotionValue(0);
  const pillW = useMotionValue(0);
  const pillOpacity = useMotionValue(0);
  const springX = useSpring(pillX, { stiffness: 900, damping: 58, mass: 0.25 });
  const springW = useSpring(pillW, { stiffness: 900, damping: 58, mass: 0.25 });

  function positionPill(id: string, instant = false) {
    const el = linkRefs.current[id];
    const ul = navUlRef.current;
    if (!el || !ul) return;
    const ulRect = ul.getBoundingClientRect();
    const elRect = el.getBoundingClientRect();
    const x = elRect.left - ulRect.left;
    const w = elRect.width;
    pillX.set(x); pillW.set(w);
    if (instant) { springX.set(x); springW.set(w); }
  }

  useLayoutEffect(() => {
    positionPill(active, true);
    pillOpacity.set(1);
    initialized.current = true;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (initialized.current) positionPill(active);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);

  useEffect(() => {
    const onResize = () => positionPill(active, true);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);

  useEffect(() => {
    const root = document.getElementById("root-content");
    const target: HTMLElement | Window = root ?? window;
    const onScroll = () => {
      const y = root ? root.scrollTop : window.scrollY;
      setScrolled(y > 24);
    };
    onScroll();
    target.addEventListener("scroll", onScroll, { passive: true } as AddEventListenerOptions);
    return () => target.removeEventListener("scroll", onScroll as EventListener);
  }, []);

  useEffect(() => {
    const root = document.getElementById("root-content");
    const ids = ["hero", ...NAV_ITEMS.map((n) => n.id)];
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id); }),
      { root: root ?? null, rootMargin: "-45% 0px -45% 0px", threshold: 0 },
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const click = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    setMobileOpen(false);
    smoothScrollTo(id);
  };

  const clickSponsor = (e: React.MouseEvent) => {
    e.preventDefault();
    setMobileOpen(false);
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("sponsor-reveal"));
    } else {
      smoothScrollTo("contact");
    }
  };

  return (
    <motion.nav
      className={"nav" + (scrolled ? " nav-on" : "")}
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
    >
      <a href="#hero" className="brand" onClick={click("hero")}>
        <span className="brand-mark" aria-hidden />
        <span className="brand-text">Incredibots</span>
        <span className="brand-id">FTC #26336</span>
      </a>

      <ul className="nav-ul" ref={navUlRef}>
        <motion.span
          aria-hidden
          className="nav-pill"
          style={{ x: springX, width: springW, opacity: pillOpacity }}
        />
        {NAV_ITEMS.map((n, i) => (
          <motion.li
            key={n.id}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + i * 0.06, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <a
              ref={(el) => { linkRefs.current[n.id] = el; }}
              href={"#" + n.id}
              className={active === n.id ? "is-active" : ""}
              onClick={click(n.id)}
            >
              {n.label}
            </a>
          </motion.li>
        ))}
      </ul>

      <button
        className={"nav-burger" + (mobileOpen ? " is-open" : "")}
        aria-expanded={mobileOpen}
        aria-controls="nav-mobile"
        aria-label={mobileOpen ? "Close navigation" : "Open navigation"}
        onClick={() => setMobileOpen((o) => !o)}
      >
        <span className="nav-burger-bar nav-burger-bar-1" aria-hidden />
        <span className="nav-burger-bar nav-burger-bar-2" aria-hidden />
      </button>

      <MagneticLink href="#contact" className="nav-cta nav-cta-desktop" onClick={clickSponsor}>
        <span>Sponsor</span>
        {ARROW}
      </MagneticLink>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="nav-drawer"
            id="nav-mobile"
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          >
            {NAV_ITEMS.map((n) => (
              <a
                key={n.id}
                href={"#" + n.id}
                className={active === n.id ? "is-active" : ""}
                onClick={click(n.id)}
              >
                {n.label}
              </a>
            ))}
            <a href="#contact" className="nav-cta" onClick={clickSponsor}>
              <span>Sponsor</span>
              {ARROW}
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
