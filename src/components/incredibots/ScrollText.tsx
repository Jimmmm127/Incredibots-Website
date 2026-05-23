"use client";

import { TICKER } from "./data";
import { VelocityMarquee } from "./primitives";

export default function ScrollText() {
  return <VelocityMarquee items={TICKER} baseVelocity={-3} />;
}
