import { Check } from "lucide-react";
import { ImageReveal, Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { Parallax } from "@/components/motion/Parallax";
import { CtaBand } from "@/components/sections/CtaBand";
import { OfficeBlocks } from "@/components/sections/OfficeBlocks";
import { PageHero } from "@/components/ui/PageHero";
import { Photo } from "@/components/ui/Photo";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { history, mission, vision } from "@/content/about";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Qui sommes-nous — Société de sourcing de pièces de rechange industrielles",
  description:
    "ETC-SAT Maroc, entreprise marocaine fondée en 2021, spécialisée dans le sourcing, l'approvisionnement et la distribution de pièces de rechange industrielles, toutes marques confondues.",
  path: "/qui-sommes-nous",
});

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="L'entreprise"
        title="Qui sommes-nous ?"
        intro={site.subtitle}
        image="port"
        path="/qui-sommes-nous"
        breadcrumb="Qui sommes-nous"
      />

      {/* Introduction */}
      <section className="section">
        <div className="container-site grid gap-10 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <p className="eyebrow">Présentation</p>
          </Reveal>
          <div className="lg:col-span-8">
            <Reveal>
              <p className="font-display text-[clamp(1.375rem,1.1rem+1.3vw,2.125rem)] leading-[1.3] font-semibold tracking-tight text-navy">
                {site.description[0]}
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="text-lead mt-8 max-w-2xl text-mute">{site.description[1]}</p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* History */}
      <section id="histoire" className="section bg-mist">
        <div className="container-site grid gap-12 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-6">
            <Reveal>
              <p className="eyebrow mb-6">Histoire</p>
              <p aria-hidden className="font-display text-[clamp(6rem,3rem+16vw,15rem)] leading-[0.8] font-extrabold tracking-[-0.05em] text-navy">
                20<span className="text-red">21</span>
              </p>
            </Reveal>
          </div>
          <div className="lg:col-span-5 lg:col-start-8">
            <Reveal>
              <h2 className="text-h2">{history.title}</h2>
              <p className="text-lead mt-6 text-mute">{history.text}</p>
            </Reveal>
            <RevealGroup as="dl" className="mt-10 border-t border-navy/15">
              {history.facts.map((f) => (
                <RevealItem key={f.label} className="flex items-baseline justify-between gap-6 border-b border-navy/15 py-4">
                  <dt className="text-xs font-medium tracking-[0.14em] text-mute uppercase">{f.label}</dt>
                  <dd className="text-right font-display font-bold text-navy">{f.value}</dd>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section id="mission" className="section">
        <div className="container-site grid gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5">
            <ImageReveal>
              <Parallax className="relative aspect-[4/3] bg-mist lg:aspect-[4/5]">
                <div className="relative h-full w-full">
                  <Photo name="warehouseRacking" sizes="(min-width: 1024px) 38vw, 94vw" />
                </div>
              </Parallax>
            </ImageReveal>
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <SectionHeading eyebrow="Mission" title={mission.title}>
              <p>{mission.text}</p>
            </SectionHeading>
            <RevealGroup as="ul" className="mt-12 grid border-t border-line sm:grid-cols-2">
              {mission.pillars.map((p, i) => (
                <RevealItem as="li" key={p.title} className={`border-b border-line py-6 ${i % 2 === 0 ? "sm:pr-8" : "sm:border-l sm:pl-8"}`}>
                  <h3 className="font-display text-lg font-bold text-navy">{p.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-mute">{p.text}</p>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </div>
      </section>

      {/* Vision */}
      <section id="vision" className="section bg-mist">
        <div className="container-site">
          <SectionHeading eyebrow="Vision" title="Fiabilité, innovation, engagement." />
          <RevealGroup className="mt-14 border-t border-navy lg:mt-20">
            {vision.map((v) => (
              <RevealItem as="article" key={v.title} className="grid gap-4 border-b border-navy/15 py-10 lg:grid-cols-12 lg:gap-8 lg:py-14">
                <p className="font-display text-sm font-bold text-red tabular-nums lg:col-span-1 lg:pt-3">{v.number}</p>
                <h3 className="text-h1 lg:col-span-5">{v.title}</h3>
                <div className="lg:col-span-6 lg:pt-3">
                  <p className="text-lead text-ink/85">{v.text}</p>
                  {v.list.length > 0 && (
                    <ul className="mt-6 space-y-3">
                      {v.list.map((item) => (
                        <li key={item} className="flex items-start gap-3 text-base text-ink/85">
                          <Check aria-hidden className="mt-1 size-4 shrink-0 text-red" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* Two entities */}
      <section className="section">
        <div className="container-site">
          <SectionHeading eyebrow="Implantations" title="Deux entités, deux périmètres." className="mb-14">
            <p>Une organisation pensée pour servir les entreprises en zone franche comme sur le territoire assujetti.</p>
          </SectionHeading>
          <OfficeBlocks />
        </div>
      </section>

      <CtaBand />
    </>
  );
}
