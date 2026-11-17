import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { ImageReveal, Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { Parallax } from "@/components/motion/Parallax";
import { CtaBand } from "@/components/sections/CtaBand";
import { HomeHero } from "@/components/sections/HomeHero";
import { Brand, LogoMarquee } from "@/components/sections/LogoMarquee";
import { SectorTile } from "@/components/sections/SectorTile";
import { WorldMap } from "@/components/sections/WorldMap";
import { ButtonLink } from "@/components/ui/Button";
import { Photo } from "@/components/ui/Photo";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { clients, networkCountries, partners } from "@/content/network";
import { sectors } from "@/content/sectors";
import { services } from "@/content/services";
import { offices, site } from "@/content/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "ETC SAT MAROC — Sourcing & approvisionnement de pièces de rechange industrielles",
  description:
    "ETC SAT MAROC accompagne les industriels dans l'identification, l'approvisionnement et la gestion de leurs pièces de rechange, toutes marques confondues. Sourcing, centralisation des achats, réparation.",
  path: "/",
});

export default function HomePage() {
  const featured = sectors.map((s, i) => ({ sector: s, index: i })).filter(({ sector }) => sector.featured);

  return (
    <>
      <HomeHero />

      {/* 02 — Industrial expertise */}
      <section className="section">
        <div className="container-site grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-8">
          <div className="relative lg:col-span-6">
            <ImageReveal>
              <Parallax className="relative aspect-[4/3] bg-mist lg:aspect-[5/6]">
                <div className="relative h-full w-full">
                  <Photo name="expertise" sizes="(min-width: 1024px) 46vw, 94vw" />
                </div>
              </Parallax>
            </ImageReveal>
            <Reveal delay={0.4} className="absolute -bottom-6 left-0 border-l-2 border-red bg-white py-4 pr-7 pl-5 shadow-xl shadow-navy/10 sm:left-8">
              <p className="text-xs font-medium tracking-[0.14em] text-mute uppercase">Entreprise marocaine</p>
              <p className="mt-1 font-display text-lg font-bold text-navy">Fondée en {site.founded}</p>
            </Reveal>
          </div>
          <div className="pt-6 lg:col-span-5 lg:col-start-8 lg:pt-0">
            <SectionHeading eyebrow="Notre métier" title="Le sourcing industriel, pensé pour vos besoins.">
              <p>{site.description[0]}</p>
            </SectionHeading>
            <Reveal delay={0.1}>
              <p className="mt-5 text-base leading-relaxed text-mute">{site.description[1]}</p>
            </Reveal>
            <RevealGroup as="ul" className="mt-10 grid grid-cols-2 border-t border-line">
              {site.componentFamilies.map((family, i) => (
                <RevealItem as="li" key={family} className={`flex items-baseline gap-3 border-b border-line py-4 ${i % 2 === 1 ? "pl-5" : "pr-5"}`}>
                  <span className="text-xs font-medium text-red tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                  <span className="font-display font-bold text-navy">{family}</span>
                </RevealItem>
              ))}
            </RevealGroup>
            <Reveal delay={0.15} className="mt-10">
              <ButtonLink href="/qui-sommes-nous" variant="outline">
                Qui sommes-nous
              </ButtonLink>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 03 — International presence */}
      <section className="section bg-mist">
        <div className="container-site grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-10">
          <div className="lg:col-span-4">
            <SectionHeading eyebrow="Présence" title="Nous sommes présents à l'international.">
              <p>
                Depuis Tanger Med, nous nous appuyons sur un réseau international de fabricants et de distributeurs pour
                identifier et acheminer vos pièces de rechange.
              </p>
            </SectionHeading>
            <RevealGroup as="dl" className="mt-10 border-t border-navy/15">
              {offices.map((o) => (
                <RevealItem key={o.id} className="flex items-baseline justify-between gap-6 border-b border-navy/15 py-4">
                  <dt className="font-display font-bold text-navy">{o.name}</dt>
                  <dd className="text-right text-sm text-mute">{o.scope}</dd>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
          <Reveal delay={0.1} className="lg:col-span-8">
            <WorldMap />
            <div className="mt-8 flex flex-col gap-3 border-t border-navy/15 pt-5 sm:flex-row sm:items-baseline sm:gap-8">
              <p className="flex shrink-0 items-center gap-2.5 text-xs font-medium tracking-[0.14em] text-mute uppercase">
                <span aria-hidden className="size-2 shrink-0 rounded-full bg-navy ring-4 ring-navy/10" />
                Pays d&apos;origine de nos partenaires et références de sourcing
              </p>
              <ul className="flex flex-wrap gap-x-5 gap-y-1 text-sm font-semibold text-navy">
                {networkCountries.map((c) => (
                  <li key={c}>{c}</li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 04 — Key capabilities */}
      <section className="section">
        <div className="container-site">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeading eyebrow="Compétences" title="Trois compétences, un seul interlocuteur." />
            <Reveal delay={0.1}>
              <Link href="/competences" className="link-arrow">
                Toutes nos compétences <ArrowRight aria-hidden className="size-4" />
              </Link>
            </Reveal>
          </div>
          <RevealGroup className="mt-14 grid gap-x-8 gap-y-14 md:grid-cols-3 lg:mt-20 lg:gap-x-10">
            {services.map((s) => (
              <RevealItem as="article" key={s.id}>
                <Link href={s.href} className="group block">
                  <div className="relative aspect-[4/3] overflow-hidden bg-mist md:aspect-[4/5]">
                    <Photo
                      name={s.image}
                      sizes="(min-width: 768px) 31vw, 94vw"
                      className="transition-transform duration-[1.4s] ease-out-expo group-hover:scale-[1.06]"
                    />
                    <span className="absolute top-0 left-0 bg-white px-4 py-3 font-display text-sm font-bold text-navy tabular-nums">
                      {s.number}
                    </span>
                    <div aria-hidden className="absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 bg-red transition-transform duration-700 ease-out-expo group-hover:scale-x-100" />
                  </div>
                  <h3 className="text-h3 mt-7">{s.name}</h3>
                  <p className="mt-3 text-[0.9375rem] leading-relaxed text-mute">{s.summary}</p>
                  <span className="link-arrow mt-6">
                    Découvrir <ArrowRight aria-hidden className="size-4" />
                  </span>
                </Link>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* 05 — Sectors preview */}
      <section className="section bg-mist">
        <div className="container-site">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeading eyebrow="Secteurs" title="Au service de l'ensemble de l'industrie.">
              <p>De l&apos;automobile à l&apos;agroalimentaire, nous intervenons dans {sectors.length} domaines d&apos;activité.</p>
            </SectionHeading>
            <Reveal delay={0.1}>
              <Link href="/secteurs" className="link-arrow">
                Voir les {sectors.length} secteurs <ArrowRight aria-hidden className="size-4" />
              </Link>
            </Reveal>
          </div>
          <RevealGroup className="mt-14 grid grid-cols-2 gap-x-5 gap-y-10 lg:mt-20 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-14">
            {featured.map(({ sector, index }) => (
              <RevealItem key={sector.id}>
                <SectorTile
                  sector={sector}
                  index={index}
                  href={`/secteurs#${sector.id}`}
                  sizes="(min-width: 1024px) 30vw, 46vw"
                  showDescription={false}
                />
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* 06 — Trust */}
      <section className="section pb-0">
        <div className="container-site flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading eyebrow="Références" title="Ils nous font confiance." />
          <Reveal delay={0.1}>
            <Link href="/ils-nous-font-confiance" className="link-arrow">
              Toutes nos références <ArrowRight aria-hidden className="size-4" />
            </Link>
          </Reveal>
        </div>
        <Reveal className="mt-12 border-y border-line lg:mt-16">
          <LogoMarquee items={clients} label="Entreprises qui nous font confiance" />
        </Reveal>
      </section>

      {/* 07 — Partners preview */}
      <section className="section">
        <div className="container-site">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeading eyebrow="Partenaires" title="Nos partenaires.">
              <p>Nos représentations de nos partenaires au Maroc.</p>
            </SectionHeading>
            <Reveal delay={0.1}>
              <Link href="/partenaires" className="link-arrow">
                Tous nos partenaires <ArrowRight aria-hidden className="size-4" />
              </Link>
            </Reveal>
          </div>
          <RevealGroup as="ul" className="mt-14 grid border-t border-navy sm:grid-cols-2 lg:mt-20 lg:grid-cols-4">
            {partners.map((p) => (
              <RevealItem as="li" key={p.id} className="border-b border-line sm:odd:border-r lg:border-r lg:last:border-r-0">
                <Link href={`/partenaires#${p.id}`} className="group flex h-full flex-col p-6 transition-colors duration-500 hover:bg-mist lg:p-8">
                  <span className="flex h-16 items-center">
                    <Brand item={p} className={p.logo ? "h-14" : "!text-navy"} />
                  </span>
                  <span className="mt-6 text-xs font-medium tracking-[0.14em] text-red uppercase">{p.country}</span>
                  <span className="mt-2 flex-1 text-sm leading-relaxed text-mute">{p.activity}</span>
                  <ArrowUpRight aria-hidden className="mt-6 size-4 text-steel transition-all duration-500 ease-out-expo group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-red" />
                </Link>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
