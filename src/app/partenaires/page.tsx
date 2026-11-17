import { ArrowUpRight } from "lucide-react";
import { RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { CtaBand } from "@/components/sections/CtaBand";
import { Brand } from "@/components/sections/LogoMarquee";
import { ManufacturerList } from "@/components/sections/ManufacturerList";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { manufacturers, manufacturersNote, partners, sourcingReferences } from "@/content/network";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Partenaires — Nos représentations au Maroc",
  description:
    "ETC SAT MAROC représente au Maroc BLICKLE, FREUDENBERG, PROJECT INTERNATIONAL et AZOLGAS, et s'appuie sur un réseau international de sourcing couvrant les grandes marques industrielles (Endress+Hauser, Emerson, KSB, Rotork, Siemens Energy…).",
  path: "/partenaires",
});

export default function PartnersPage() {
  return (
    <>
      <PageHero
        eyebrow="Partenaires"
        title="Nos partenaires."
        intro="Nos représentations de nos partenaires au Maroc."
        path="/partenaires"
        breadcrumb="Partenaires"
      />

      <section className="pb-24 lg:pb-32">
        <div className="container-site">
          <RevealGroup as="ul" className="border-t border-navy">
            {partners.map((p, i) => (
              <RevealItem as="li" key={p.id} id={p.id} className="border-b border-line">
                <a
                  href={p.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group grid items-center gap-x-8 gap-y-5 py-9 transition-colors duration-500 hover:bg-mist md:grid-cols-12 md:px-6 lg:py-12"
                >
                  <span className="hidden text-xs font-medium text-red tabular-nums md:col-span-1 md:block">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="flex h-20 items-center md:col-span-4">
                    <Brand item={p} className={p.logo ? "h-20 max-w-[13rem]" : "!text-2xl !text-navy lg:!text-[1.75rem]"} />
                  </span>
                  <span className="md:col-span-5">
                    <span className="block text-xs font-medium tracking-[0.14em] text-red uppercase">{p.country}</span>
                    <span className="mt-2 block text-base leading-relaxed text-ink/85 lg:text-lg">{p.activity}</span>
                  </span>
                  <span className="flex items-center gap-2 text-sm font-semibold text-navy transition-colors group-hover:text-red md:col-span-2 md:justify-end">
                    {p.websiteLabel}
                    <ArrowUpRight aria-hidden className="size-4 transition-transform duration-500 ease-out-expo group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    <span className="sr-only">(site de {p.name}, nouvel onglet)</span>
                  </span>
                </a>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <section id="reseau-sourcing" className="section bg-mist">
        <div className="container-site">
          <SectionHeading eyebrow="Réseau de sourcing" title="Nos références de sourcing à l'international.">
            <p>
              En complément de nos représentations, nous nous appuyons sur des références de sourcing en Europe et aux
              États-Unis.
            </p>
          </SectionHeading>
          <RevealGroup as="ul" className="mt-14 grid border-t border-navy sm:grid-cols-2 lg:grid-cols-4">
            {sourcingReferences.map((r) => (
              <RevealItem as="li" key={r.name} className="flex flex-col border-b border-navy/15 py-8 sm:px-6 sm:odd:border-r lg:border-r lg:first:pl-0 lg:last:border-r-0">
                <span className="flex h-14 items-center">
                  <Brand item={r} className={r.logo ? "h-11 mix-blend-multiply" : "!text-navy"} />
                </span>
                <span className="mt-5 text-xs font-medium tracking-[0.14em] text-mute uppercase">{r.location}</span>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <section id="marques-fabricants" className="section scroll-mt-24">
        <div className="container-site">
          <SectionHeading eyebrow="Marques & fabricants" title="Les marques que nous sourçons.">
            <p>
              Pièces de rechange et équipements d&apos;origine des principaux fabricants industriels&nbsp;: instrumentation,
              vannes, pompes, compresseurs, sécurité et automatismes.
            </p>
          </SectionHeading>
          <div className="mt-14">
            <ManufacturerList items={manufacturers} note={manufacturersNote} />
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
