"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { smoothScrollTo } from "./primitives";

export default function SponsorFlash() {
  const [active, setActive] = useState(false);

  useEffect(() => {
    const onReveal = () => {
      setActive(true);
      window.setTimeout(() => {
        smoothScrollTo("contact");
        window.setTimeout(() => setActive(false), 650);
      }, 380);
    };
    window.addEventListener("sponsor-reveal", onReveal);
    return () => window.removeEventListener("sponsor-reveal", onReveal);
  }, []);

  return (
    <AnimatePresence>
      {active && (
        <motion.div
          key="sponsor-flash"
          className="sponsor-flash"
          aria-hidden
          initial={{ clipPath: "circle(0% at 95% 2%)" }}
          animate={{ clipPath: "circle(150% at 95% 2%)" }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1] }}
        >
          <span className="sponsor-flash-text">Partner with Incredibots</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
