"use client";

import Image from "next/image";
import { Pause, Play } from "lucide-react";
import { useState } from "react";
import type { LogoAsset } from "@/content/network";
import { cn } from "@/lib/utils";

type Item = { name: string; logo: LogoAsset | null };

/** A company: its original logo when supplied, otherwise its name set in plain type. */
export function Brand({ item, className }: { item: Item; className?: string }) {
  if (item.logo) {
    return (
      <Image
        src={item.logo.src}
        alt={item.name}
        width={item.logo.width}
        height={item.logo.height}
        sizes="200px"
        className={cn("h-12 w-auto max-w-[11rem] object-contain", className)}
      />
    );
  }
  return (
    <span className={cn("font-display text-lg font-extrabold tracking-[0.06em] whitespace-nowrap text-navy/70 uppercase sm:text-xl", className)}>
      {item.name}
    </span>
  );
}

/**
 * Continuous horizontal marquee. Pauses on hover / keyboard focus and with the toggle button.
 * The list is rendered twice (second copy hidden from assistive tech) for a seamless loop.
 */
export function LogoMarquee({ items, label, duration = 70 }: { items: Item[]; label: string; duration?: number }) {
  const [paused, setPaused] = useState(false);
  return (
    <div className="relative">
      <div
        className="group/marquee overflow-hidden [mask-image:linear-gradient(to_right,transparent,#000_8%,#000_92%,transparent)] motion-reduce:overflow-x-auto"
        tabIndex={0}
        role="group"
        aria-label={label}
      >
        <div
          className={cn(
            "flex w-max animate-marquee will-change-transform group-hover/marquee:[animation-play-state:paused] group-focus-visible/marquee:[animation-play-state:paused] motion-reduce:animate-none",
            paused && "[animation-play-state:paused]",
          )}
          style={{ "--marquee-duration": `${duration}s` } as React.CSSProperties}
        >
          {[0, 1].map((copy) => (
            <ul key={copy} aria-hidden={copy === 1} className={cn("flex shrink-0 items-center", copy === 1 && "motion-reduce:hidden")}>
              {items.map((item) => (
                <li key={item.name} className="flex items-center px-7 py-6 sm:px-10">
                  <Brand item={item} />
                  <span aria-hidden className="ml-14 size-1.5 rotate-45 bg-red/70 sm:ml-20" />
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
      <div className="container-site mt-4 flex justify-end motion-reduce:hidden">
        <button
          type="button"
          onClick={() => setPaused((p) => !p)}
          aria-pressed={paused}
          className="inline-flex min-h-11 items-center gap-2 text-xs font-medium tracking-[0.08em] text-mute uppercase transition-colors hover:text-red"
        >
          {paused ? <Play aria-hidden className="size-3.5" /> : <Pause aria-hidden className="size-3.5" />}
          {paused ? "Relancer le défilement" : "Mettre en pause"}
        </button>
      </div>
    </div>
  );
}
