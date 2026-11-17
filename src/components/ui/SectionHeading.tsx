import type { ReactNode } from "react";
import { Reveal } from "@/components/motion/Reveal";
import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  children,
  className,
  align = "left",
  as = "h2",
  light = false,
}: {
  eyebrow?: string;
  title: string;
  children?: ReactNode;
  className?: string;
  align?: "left" | "center";
  as?: "h2" | "h3";
  light?: boolean;
}) {
  const Tag = as;
  return (
    <Reveal className={cn("max-w-3xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow && <p className={cn("eyebrow mb-5", light && "text-white/70")}>{eyebrow}</p>}
      <Tag className={cn("text-h2", light && "text-white")}>{title}</Tag>
      {children && (
        <div className={cn("text-lead mt-6", light ? "text-white/80" : "text-mute")}>{children}</div>
      )}
    </Reveal>
  );
}
