"use client";

import {
  motion, useMotionValue, useSpring, useScroll, useVelocity,
  useTransform, useAnimationFrame, useInView, animate,
  type MotionProps,
} from "framer-motion";
import { useEffect, useRef, useState, createContext, useContext, type ReactNode } from "react";
import type { RefObject } from "react";

/* ── smooth scroll ── */
export function smoothScrollTo(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: "smooth", block: "start" });
}

/* ── Scroll container context ──
   The page scrolls inside #root-content (not the window), so every
   scroll-linked animation needs that element as its container. We share a
   single ref through context instead of reaching for getElementById in an
   effect — that avoids set-state-in-effect and gives framer-motion a stable
   RefObject from the first render. */
const ScrollContainerContext = createContext<RefObject<HTMLDivElement | null> | null>(null);

export function ScrollProvider({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  return (
    <ScrollContainerContext.Provider value={ref}>
      {children}
    </ScrollContainerContext.Provider>
  );
}

export function useScrollContainer() {
  return useContext(ScrollContainerContext);
}

export function RootContent({ children }: { children: ReactNode }) {
  const ref = useScrollContainer();
  return <main id="root-content" ref={ref} tabIndex={-1}>{children}</main>;
}

/* ── wrap utility (mirrors framer-motion's wrap) ── */
function wrap(min: number, max: number, v: number) {
  const r = max - min;
  return ((((v - min) % r) + r) % r) + min;
}

/* ── Reveal ── */
interface RevealProps {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  /** clip = true → clip-path line wipe (great for headings) */
  clip?: boolean;
}
export function Reveal({ children, delay = 0, y = 30, className = "", clip = false }: RevealProps) {
  // For clip mode, watch the wrapper (not the translated child) so IntersectionObserver fires correctly.
  const wrapRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(wrapRef as RefObject<Element>, { once: true, margin: "-60px" });

  if (clip) {
    return (
      <div ref={wrapRef} className={"line-wrap " + className}>
        <motion.div
          className="line-inner"
          animate={{ y: isInView ? "0%" : "105%" }}
          initial={{ y: "105%" }}
          transition={{ duration: 0.88, ease: [0.16, 1, 0.3, 1], delay }}
        >
          {children}
        </motion.div>
      </div>
    );
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay }}
    >
      {children}
    </motion.div>
  );
}

/* ── MagneticLink ── */
interface MagneticLinkProps extends MotionProps {
  href?: string;
  className?: string;
  children: ReactNode;
  strength?: number;
  target?: string;
  rel?: string;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
}
export function MagneticLink({ children, className = "", strength = 18, ...rest }: MagneticLinkProps) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 14 });
  const sy = useSpring(y, { stiffness: 200, damping: 14 });
  const onMove = (e: React.PointerEvent) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    x.set(((e.clientX - r.left) / r.width - 0.5) * strength);
    y.set(((e.clientY - r.top) / r.height - 0.5) * strength);
  };
  const reset = () => { x.set(0); y.set(0); };
  return (
    <motion.a ref={ref} onPointerMove={onMove} onPointerLeave={reset}
      style={{ x: sx, y: sy }} className={className} {...rest}>
      {children}
    </motion.a>
  );
}

/* ── MagneticButton ── */
interface MagneticButtonProps {
  className?: string;
  children: ReactNode;
  strength?: number;
  type?: "button" | "submit" | "reset";
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
}
export function MagneticButton({ children, className = "", strength = 14, type = "button", onClick, disabled }: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 14 });
  const sy = useSpring(y, { stiffness: 200, damping: 14 });
  const onMove = (e: React.PointerEvent) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    x.set(((e.clientX - r.left) / r.width - 0.5) * strength);
    y.set(((e.clientY - r.top) / r.height - 0.5) * strength);
  };
  const reset = () => { x.set(0); y.set(0); };
  return (
    <motion.button
      ref={ref}
      type={type}
      onClick={onClick}
      disabled={disabled}
      onPointerMove={onMove}
      onPointerLeave={reset}
      style={{ x: sx, y: sy }}
      className={className}
    >
      {children}
    </motion.button>
  );
}

/* ── TiltCard ── */
interface TiltCardProps { children: ReactNode; className?: string; max?: number; }
export function TiltCard({ children, className = "", max = 8 }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 150, damping: 14 });
  const sry = useSpring(ry, { stiffness: 150, damping: 14 });
  const onMove = (e: React.PointerEvent) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    ry.set(((e.clientX - r.left) / r.width - 0.5) * max * 2);
    rx.set(-((e.clientY - r.top) / r.height - 0.5) * max * 2);
  };
  const reset = () => { rx.set(0); ry.set(0); };
  return (
    <motion.div ref={ref} onPointerMove={onMove} onPointerLeave={reset}
      style={{ rotateX: srx, rotateY: sry, transformPerspective: 1200, transformStyle: "preserve-3d" }}
      className={className}>
      {children}
    </motion.div>
  );
}

/* ── WordsUp ── */
interface WordsUpProps { text: string; className?: string; delay?: number; }
export function WordsUp({ text, className = "", delay = 0 }: WordsUpProps) {
  const words = text.split(" ");
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setShown(true), Math.max(0, delay * 1000));
    return () => clearTimeout(t);
  }, [delay]);
  return (
    <span className={className}>
      {words.map((w, i) => (
        <span key={i} className="wordmask">
          <span className={"wordinner " + (shown ? "is-in" : "")} style={{ transitionDelay: `${i * 0.08}s` }}>
            {w}
          </span>{" "}
        </span>
      ))}
    </span>
  );
}

/* ── Count ── */
interface CountProps { to: number; suffix?: string; prefix?: string; duration?: number; }
export function Count({ to, suffix = "", prefix = "", duration = 1.6 }: CountProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const c = animate(0, to, { duration, ease: [0.16, 1, 0.3, 1], onUpdate: (v) => setVal(Math.round(v)) });
    return () => c.stop();
  }, [inView, to, duration]);
  return <span ref={ref}>{prefix}{val}{suffix}</span>;
}

/* ── VelocityMarquee ── */
export type MarqueeItem = [string, string, boolean?];
interface VelocityMarqueeProps { items: MarqueeItem[]; baseVelocity?: number; }
export function VelocityMarquee({ items, baseVelocity = -3 }: VelocityMarqueeProps) {
  const container = useScrollContainer();
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll(container ? { container } : undefined);
  const velocity = useVelocity(scrollY);
  const smoothV = useSpring(velocity, { damping: 50, stiffness: 400 });
  const factor = useTransform(smoothV, [0, 1000], [0, 5], { clamp: false });
  const x = useTransform(baseX, (v) => `${wrap(-25, -75, v)}%`);
  const dir = useRef(1);
  useAnimationFrame((_, delta) => {
    let move = (dir.current * baseVelocity * (delta ?? 16)) / 1000;
    if (factor.get() < 0) dir.current = -1; else dir.current = 1;
    move += dir.current * move * factor.get();
    baseX.set(baseX.get() + move);
  });
  const loop = [...items, ...items, ...items, ...items];
  return (
    <div className="vm-wrap">
      <motion.div className="vm-track" style={{ x }}>
        {loop.map((it, i) => {
          const isSponsor = it.length > 2 && it[2] === true;
          return (
            <span key={i} className={"vm-item" + (isSponsor ? " vm-item-sponsor" : "")}>
              <span className={"vm-n" + (isSponsor ? " vm-n-sponsor" : "")}>{it[0]}</span>
              <span className="vm-dot">●</span>
              <span className="vm-l">{it[1]}</span>
            </span>
          );
        })}
      </motion.div>
    </div>
  );
}

/* ── Spotlight ── */
export function Spotlight() {
  const x = useMotionValue(-500);
  const y = useMotionValue(-500);
  const sx = useSpring(x, { stiffness: 80, damping: 22, mass: 0.5 });
  const sy = useSpring(y, { stiffness: 80, damping: 22, mass: 0.5 });
  useEffect(() => {
    const m = (e: MouseEvent) => { x.set(e.clientX); y.set(e.clientY); };
    window.addEventListener("pointermove", m);
    return () => window.removeEventListener("pointermove", m);
  }, [x, y]);
  return (
    <motion.div
      className="spotlight"
      style={{
        background: `radial-gradient(420px circle at ${sx}px ${sy}px, rgba(255,255,255,0.035), transparent 72%)`,
      }}
    />
  );
}

/* ── ProgressBar ── */
export function ProgressBar() {
  const container = useScrollContainer();
  const { scrollYProgress } = useScroll(container ? { container } : undefined);
  const sx = useSpring(scrollYProgress, { stiffness: 110, damping: 30 });
  return <motion.div className="progress" style={{ scaleX: sx }} />;
}
