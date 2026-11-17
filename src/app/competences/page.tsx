import Link from "next/link";
import { Check } from "lucide-react";
import type { ReactNode } from "react";
import { ImageReveal, Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { Parallax } from "@/components/motion/Parallax";
import { CtaBand } from "@/components/sections/CtaBand";
import { PageHero } from "@/components/ui/PageHero";
import { Photo } from "@/components/ui/Photo";
import type { ImageKey } from "@/content/images";
import { centralisation, repair, services, sourcing } from "@/content/services";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Compétences — Sourcing, centralisation des achats, réparation",
  description:
    "Approvisionnement & sourcing de pièces OEM et équivalentes, centralisation des achats industriels, dépannage et gestion des réparations toutes marques : les trois compétences d'ETC SAT MAROC.",
  path: "/competences",
});

function CheckList({ items }: { items: string[] }) {
  return (
    <RevealGroup as="ul" className="border-t border-line">
      {items.map((item) => (
        <RevealItem as="li" key={item} className="flex items-start gap-4 border-b border-line py-4 text-base text-ink/90">
          <Check aria-hidden className="mt-1 size-4 shrink-0 text-red" />
          {item}
        </RevealItem>
      ))}
    </RevealGroup>
  );
}

function ServiceSection({
  index,
  image,
  flip = false,
  tinted = false,
  title,
  children,
}: {
  index: number;
  image: ImageKey;
  flip?: boolean;
  tinted?: boolean;
  title: string;
  children: ReactNode;
}) {
  const s = services[index];
  return (
    <section id={s.id} className={`section ${tinted ? "bg-mist" : ""}`}>
      <div className="container-site">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          <div className={`lg:col-span-5 ${flip ? "lg:order-2 lg:col-start-8" : ""}`}>
            <div className="lg:sticky lg:top-28">
              <ImageReveal>
                <Parallax className="relative aspect-[4/3] bg-mist lg:aspect-[4/5]">
                  <div className="relative h-full w-full">
                    <Photo name={image} sizes="(min-width: 1024px) 38vw, 94vw" />
                  </div>
                </Parallax>
              </ImageReveal>
            </div>
          </div>
          <div className={`lg:col-span-6 ${flip ? "lg:order-1" : "lg:col-start-7"}`}>
            <Reveal>
              <p className="mb-6 flex items-center gap-4 text-xs font-medium tracking-[0.16em] text-mute uppercase">
                <span className="font-display text-sm font-bold text-red tabular-nums">{s.number}</span>
                <span aria-hidden className="h-px w-8 bg-navy/30" />
                {s.name}
              </p>
              <h2 className="text-h2">{title}</h2>
            </Reveal>
            {children}
          </div>
        </div>
      </div>
    </section>
  );
}

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Compétences"
        title="Nos compétences."
        intro="Du sourcing à la réparation, trois compétences complémentaires pour sécuriser l'approvisionnement de vos pièces de rechange."
        path="/competences"
        breadcrumb="Compétences"
      />

      {/* In-page index */}
      <nav aria-label="Sommaire des compétences" className="container-site">
        <ul className="grid border-t border-navy md:grid-cols-3">
          {services.map((s, i) => (
            <li key={s.id} className={`border-b border-line ${i > 0 ? "md:border-l" : ""}`}>
              <Link href={`#${s.id}`} className={`group flex items-baseline gap-4 py-5 transition-colors hover:text-red ${i > 0 ? "md:pl-8" : ""}`}>
                <span className="text-xs font-medium text-red tabular-nums">{s.number}</span>
                <span className="font-display font-bold text-navy transition-colors group-hover:text-red">{s.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* 01 — Sourcing */}
      <ServiceSection index={0} image="sourcing" title={`${sourcing.title}.`}>
        <Reveal delay={0.05}>
          <p className="text-lead mt-6 text-mute">{sourcing.description}</p>
          <h3 className="mt-12 mb-5 text-xs font-medium tracking-[0.16em] text-mute uppercase">{sourcing.listTitle}</h3>
        </Reveal>
        <CheckList items={sourcing.items} />
        <Reveal className="mt-12">
          <h3 className="mb-5 text-xs font-medium tracking-[0.16em] text-mute uppercase">Incoterms</h3>
          <dl className="grid gap-px bg-line sm:grid-cols-2">
            {sourcing.incoterms.map((t) => (
              <div key={t.code} className="bg-white py-2 sm:px-6 sm:first:pl-0">
                <dt className="font-display text-4xl font-extrabold tracking-tight text-navy">{t.code}</dt>
                <dd className="mt-1 text-sm text-mute">{t.label}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-6 border-l-2 border-red pl-5 text-base text-ink/85">{sourcing.incotermsNote}</p>
        </Reveal>
      </ServiceSection>

      {/* 02 — Centralisation */}
      <ServiceSection index={1} image="centralisation" flip tinted title={centralisation.title}>
        <Reveal delay={0.05}>
          <p className="text-lead mt-6 text-mute">{centralisation.intro}</p>
          <h3 className="mt-12 mb-2 font-display text-xl font-bold text-navy">{centralisation.benefitsTitle}</h3>
        </Reveal>
        <RevealGroup as="ol" className="mt-6 border-t border-navy/15">
          {centralisation.benefits.map((b, i) => (
            <RevealItem as="li" key={b.title} className="grid gap-x-6 gap-y-2 border-b border-navy/15 py-7 sm:grid-cols-[3rem_1fr]">
              <span className="font-display text-2xl font-extrabold text-red tabular-nums">{i + 1}</span>
              <div>
                <h4 className="font-display text-lg font-bold text-navy">{b.title}</h4>
                <p className="mt-2 text-[0.9375rem] leading-relaxed text-mute">{b.text}</p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
        <Reveal className="mt-12">
          <h3 className="mb-5 text-xs font-medium tracking-[0.16em] text-mute uppercase">{centralisation.visionTitle}</h3>
          <blockquote className="border-l-2 border-red pl-6">
            <p className="font-display text-[clamp(1.25rem,1.1rem+0.8vw,1.75rem)] leading-snug font-bold tracking-tight text-navy">
              {centralisation.closing}
            </p>
          </blockquote>
          <p className="mt-6 text-base leading-relaxed text-mute">{centralisation.closingDetail}</p>
          <p className="mt-8 flex flex-col gap-x-6 gap-y-1 font-display text-base font-bold text-navy sm:flex-row sm:flex-wrap">
            {centralisation.motto.map((m) => (
              <span key={m}>{m}</span>
            ))}
          </p>
        </Reveal>
      </ServiceSection>

      {/* 03 — Repair */}
      <ServiceSection index={2} image="repair" title={repair.title}>
        <Reveal delay={0.05}>
          <p className="text-lead mt-6 text-mute">{repair.intro}</p>
          <h3 className="mt-12 mb-5 font-display text-lg font-bold text-navy">{repair.offerIntro}</h3>
        </Reveal>
        <CheckList items={repair.offer} />
        <Reveal className="mt-10 space-y-5">
          {repair.network.map((p) => (
            <p key={p} className="text-base leading-relaxed text-mute">
              {p}
            </p>
          ))}
        </Reveal>
        <Reveal className="mt-10">
          <blockquote className="border-l-2 border-red pl-6">
            <p className="font-display text-[clamp(1.25rem,1.1rem+0.8vw,1.75rem)] leading-snug font-bold tracking-tight text-navy">
              {repair.closing}
            </p>
          </blockquote>
        </Reveal>
      </ServiceSection>

      <CtaBand />
    </>
  );
}
