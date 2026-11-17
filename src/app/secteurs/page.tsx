import { RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { CtaBand } from "@/components/sections/CtaBand";
import { SectorTile } from "@/components/sections/SectorTile";
import { PageHero } from "@/components/ui/PageHero";
import { sectors } from "@/content/sectors";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Secteurs — Les industries que nous accompagnons",
  description:
    "Industrie manufacturière, énergie, agroalimentaire, chimie, pharmaceutique, métallurgie, automobile, aéronautique, cimenteries… ETC SAT MAROC fournit les pièces de rechange de 12 secteurs industriels.",
  path: "/secteurs",
});

export default function SectorsPage() {
  return (
    <>
      <PageHero
        eyebrow="Domaines d'intervention"
        title="Secteurs."
        intro="Nous approvisionnons en pièces de rechange et composants techniques les acteurs de douze secteurs industriels."
        path="/secteurs"
        breadcrumb="Secteurs"
      />
      <section className="pb-24 lg:pb-36">
        <div className="container-site border-t border-navy pt-12 lg:pt-16">
          <RevealGroup as="ul" className="grid gap-x-5 gap-y-12 xs:grid-cols-2 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-16">
            {sectors.map((sector, i) => (
              <RevealItem as="li" key={sector.id} id={sector.id}>
                <SectorTile sector={sector} index={i} sizes="(min-width: 1024px) 30vw, (min-width: 416px) 46vw, 94vw" />
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
