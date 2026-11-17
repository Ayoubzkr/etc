"use client";

import { motion, type Variants } from "motion/react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

const EASE = [0.16, 1, 0.3, 1] as const;
const VIEWPORT = { once: true, margin: "0px 0px -12% 0px" } as const;

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  /** Vertical offset in px the element travels while fading in. */
  y?: number;
};

/** Fade + rise when the element enters the viewport (once). */
export function Reveal({ children, className, delay = 0, y = 28 }: RevealProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT}
      transition={{ duration: 0.9, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}

const groupVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: { duration: 0.85, ease: EASE } },
};

type GroupProps = { children: ReactNode; className?: string; as?: "div" | "ul" | "ol" | "dl" };

/** Staggers its <RevealItem> children. */
export function RevealGroup({ children, className, as = "div" }: GroupProps) {
  const Tag = motion[as];
  return (
    <Tag className={className} variants={groupVariants} initial="hidden" whileInView="show" viewport={VIEWPORT}>
      {children}
    </Tag>
  );
}

type ItemProps = { children: ReactNode; className?: string; as?: "div" | "li" | "article"; id?: string };

export function RevealItem({ children, className, as = "div", id }: ItemProps) {
  const Tag = motion[as];
  return (
    <Tag id={id} className={className} variants={itemVariants}>
      {children}
    </Tag>
  );
}

/** Masked image reveal: the frame un-clips from the bottom while the picture settles. */
export function ImageReveal({ children, className, delay = 0 }: RevealProps) {
  return (
    <motion.div
      className={cn("overflow-hidden", className)}
      initial={{ clipPath: "inset(100% 0% 0% 0%)" }}
      whileInView={{ clipPath: "inset(0% 0% 0% 0%)" }}
      viewport={VIEWPORT}
      transition={{ duration: 1.2, ease: EASE, delay }}
    >
      <motion.div
        className="h-full w-full"
        initial={{ scale: 1.18 }}
        whileInView={{ scale: 1 }}
        viewport={VIEWPORT}
        transition={{ duration: 1.6, ease: EASE, delay }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

/** Word-by-word masked heading reveal (used in heroes). Plays on mount. */
export function SplitHeading({
  text,
  className,
  as = "h1",
  delay = 0,
}: {
  text: string;
  className?: string;
  as?: "h1" | "h2";
  delay?: number;
}) {
  const Tag = motion[as];
  const words = text.split(" ");
  return (
    <Tag
      className={className}
      aria-label={text}
      initial="hidden"
      animate="show"
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.055, delayChildren: delay } } }}
    >
      {words.map((word, i) => (
        <span key={i} aria-hidden className="inline-block overflow-hidden pb-[0.12em] align-bottom">
          <motion.span
            className="inline-block"
            variants={{
              hidden: { y: "110%" },
              show: { y: "0%", transition: { duration: 1, ease: EASE } },
            }}
          >
            {word}
            {i < words.length - 1 ? " " : ""}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}

/** Simple mount animation for hero supporting content. */
export function FadeUp({ children, className, delay = 0, y = 20 }: RevealProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}
