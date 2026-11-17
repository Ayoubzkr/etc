"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/** Motion is only enabled when the visitor has not asked for reduced motion. */
export const MOTION_OK = "(prefers-reduced-motion: no-preference)";
export const MOTION_OK_DESKTOP = "(prefers-reduced-motion: no-preference) and (min-width: 768px)";

export { gsap, ScrollTrigger };
