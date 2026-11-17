"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { gsap, MOTION_OK_DESKTOP } from "@/lib/gsap";
import { cn } from "@/lib/utils";

/**
 * Scroll-scrubbed parallax (GSAP ScrollTrigger). The child is over-scaled slightly so the
 * frame never shows empty edges. Disabled on mobile and for reduced-motion users.
 */
export function Parallax({
  children,
  className,
  amount = 7,
}: {
  children: ReactNode;
  className?: string;
  /** Travel in % of the element height, each way. */
  amount?: number;
}) {
  const frame = useRef<HTMLDivElement>(null);
  const inner = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add(MOTION_OK_DESKTOP, () => {
      gsap.fromTo(
        inner.current,
        { yPercent: -amount },
        {
          yPercent: amount,
          ease: "none",
          scrollTrigger: { trigger: frame.current, start: "top bottom", end: "bottom top", scrub: true },
        },
      );
    });
    return () => mm.revert();
  }, [amount]);

  return (
    <div ref={frame} className={cn("overflow-hidden", className)}>
      <div ref={inner} className="h-full w-full will-change-transform" style={{ scale: 1 + (amount * 2) / 100 + 0.02 }}>
        {children}
      </div>
    </div>
  );
}
