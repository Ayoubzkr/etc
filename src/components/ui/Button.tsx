import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "navy" | "outline" | "outline-light";

const variants: Record<Variant, string> = {
  primary: "bg-red text-white hover:bg-red-dark",
  navy: "bg-navy text-white hover:bg-navy-soft",
  outline: "border border-navy/25 text-navy hover:border-navy hover:bg-navy hover:text-white",
  "outline-light": "border border-white/45 text-white hover:bg-white hover:text-navy hover:border-white",
};

export const buttonClass = (variant: Variant = "primary", className?: string) =>
  cn(
    "group/btn inline-flex min-h-12 items-center justify-center gap-3 px-6 py-3 text-sm font-semibold tracking-[0.01em]",
    "transition-colors duration-300",
    variants[variant],
    className,
  );

export function ButtonLink({
  href,
  children,
  variant = "primary",
  className,
  arrow = true,
}: {
  href: string;
  children: ReactNode;
  variant?: Variant;
  className?: string;
  arrow?: boolean;
}) {
  return (
    <Link href={href} className={buttonClass(variant, className)}>
      {children}
      {arrow && (
        <ArrowRight
          aria-hidden
          className="size-4 transition-transform duration-500 ease-out-expo group-hover/btn:translate-x-1"
        />
      )}
    </Link>
  );
}
