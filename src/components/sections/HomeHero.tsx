"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { useEffect, useRef } from "react";
import { FadeUp, SplitHeading } from "@/components/motion/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { Photo } from "@/components/ui/Photo";
import { services } from "@/content/services";
import { site } from "@/content/site";
import { gsap, MOTION_OK } from "@/lib/gsap";

export function HomeHero() {
  const section = useRef<HTMLElement>(null);
  const media = useRef<HTMLDivElement>(null);
  const content = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add(MOTION_OK, () => {
      // Cinematic settle of the photograph, then scroll-linked drift
      gsap.fromTo(media.current, { scale: 1.16 }, { scale: 1, duration: 2.6, ease: "power3.out" });
      gsap.to(media.current, {
        yPercent: 12,
        ease: "none",
        scrollTrigger: { trigger: section.current, start: "top top", end: "bottom top", scrub: true },
      });
      gsap.to(content.current, {
        yPercent: -8,
        opacity: 0.2,
        ease: "none",
        scrollTrigger: { trigger: section.current, start: "45% top", end: "bottom top", scrub: true },
      });
    });
    return () => mm.revert();
  }, []);

  return (
    <section ref={section} className="relative flex h-svh max-h-[62rem] min-h-[40rem] flex-col overflow-hidden bg-navy">
      <div ref={media} className="absolute inset-0 will-change-transform">
        <Photo name="hero" sizes="100vw" priority />
      </div>
      {/* Legibility veils: left-weighted so the machinery stays visible on the right */}
      <div aria-hidden className="absolute inset-0 bg-gradient-to-r from-navy/90 via-navy/55 to-navy/10" />
      <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-navy/80 via-transparent to-navy/35" />
      {/* Opening curtain */}
      <motion.div
        aria-hidden
        className="absolute inset-0 origin-top bg-navy"
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0 }}
        transition={{ duration: 1.3, ease: [0.76, 0, 0.24, 1] }}
      />

      <div ref={content} className="container-site relative flex flex-1 flex-col justify-end pt-[calc(var(--header-h)+2rem)] pb-10 sm:pb-14">
        <FadeUp delay={0.5} y={10}>
          <p className="eyebrow mb-6 text-white/80">{site.positioningEn}</p>
        </FadeUp>
        <SplitHeading
          text={site.tagline}
          delay={0.55}
          className="text-display max-w-[17ch] !text-white"
        />
        <FadeUp delay={1.15} className="mt-7 max-w-xl">
          <p className="text-lead text-white/85">
            ETC SAT MAROC accompagne les industriels dans l&apos;identification, l&apos;approvisionnement et la gestion de
            leurs pièces de rechange, toutes marques confondues.
          </p>
        </FadeUp>
        <FadeUp delay={1.3} className="mt-9 flex flex-col gap-3 xs:flex-row xs:flex-wrap">
          <ButtonLink href="/competences">Découvrir nos compétences</ButtonLink>
          <ButtonLink href="/contact" variant="outline-light" arrow={false}>
            Contactez-nous
          </ButtonLink>
        </FadeUp>
      </div>

      {/* Capability index */}
      <FadeUp delay={1.5} y={12} className="relative hidden border-t border-white/20 md:block">
        <ul className="container-site grid grid-cols-3">
          {services.map((s, i) => (
            <li key={s.id} className={i > 0 ? "border-l border-white/20" : undefined}>
              <Link
                href={s.href}
                className={`group flex items-center justify-between gap-4 py-5 text-white/85 transition-colors hover:text-white ${i > 0 ? "pl-6 lg:pl-8" : ""} ${i < 2 ? "pr-6 lg:pr-8" : ""}`}
              >
                <span className="flex items-baseline gap-4">
                  <span className="text-xs font-medium text-red tabular-nums">{s.number}</span>
                  <span className="font-display text-[0.9375rem] font-semibold lg:text-base">{s.name}</span>
                </span>
                <ArrowUpRight aria-hidden className="size-4 shrink-0 opacity-60 transition-all duration-500 ease-out-expo group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100" />
              </Link>
            </li>
          ))}
        </ul>
      </FadeUp>
    </section>
  );
}
