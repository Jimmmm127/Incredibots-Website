"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Footer() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const rc = document.getElementById("root-content");
    if (!rc) return;

    const onScroll = () => {
      const distFromBottom = rc.scrollHeight - rc.scrollTop - rc.clientHeight;
      setVisible(distFromBottom < 60);
    };

    rc.addEventListener("scroll", onScroll, { passive: true });
    return () => rc.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.footer
          className="site-footer"
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="sf-inner">
            <span className="sf-brand">Incredibots · FTC #26336</span>
            <span className="sf-copy">&copy; {new Date().getFullYear()} · Sammamish, WA · All rights reserved</span>
            <div className="sf-links">
              <a href="mailto:incredibots26336@gmail.com">Email</a>
              <a href="https://www.instagram.com/ftc26336" target="_blank" rel="noopener noreferrer">Instagram</a>
            </div>
          </div>
        </motion.footer>
      )}
    </AnimatePresence>
  );
}
