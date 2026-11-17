import Image from "next/image";
import { logos } from "@/content/images";
import { cn } from "@/lib/utils";

/**
 * Horizontal lockup of the official logo. Two variants are cross-faded so the wordmark stays
 * legible on light and dark backgrounds (the emblem itself is never altered).
 */
export function Logo({ onDark = false, className }: { onDark?: boolean; className?: string }) {
  return (
    <span className={cn("relative block aspect-[650/100]", className)}>
      <Image
        src={logos.horizontal}
        alt="ETC SAT MAROC"
        fill
        unoptimized
        priority
        className={cn("transition-opacity duration-500", onDark && "opacity-0")}
      />
      <Image
        src={logos.horizontalOnDark}
        alt=""
        aria-hidden
        fill
        unoptimized
        priority
        className={cn("transition-opacity duration-500", !onDark && "opacity-0")}
      />
    </span>
  );
}
