"use client";

import { ArrowUp } from "lucide-react";

export function BackToTop() {
  return (
    <button
      type="button"
      onClick={() => {
        const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
        document.getElementById("contenu")?.focus({ preventScroll: true });
      }}
      className="group inline-flex items-center gap-3 text-sm font-semibold text-navy transition-colors hover:text-red"
    >
      Haut de page
      <span className="flex size-11 items-center justify-center border border-navy/20 transition-colors duration-300 group-hover:border-red group-hover:bg-red group-hover:text-white">
        <ArrowUp aria-hidden className="size-4 transition-transform duration-500 ease-out-expo group-hover:-translate-y-0.5" />
      </span>
    </button>
  );
}
