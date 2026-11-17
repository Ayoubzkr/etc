import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { CtaBand } from "@/components/sections/CtaBand";
import { Brand, LogoMarquee } from "@/components/sections/LogoMarquee";
import { PageHero } from "@/components/ui/PageHero";
import { clients } from "@/content/network";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Ils nous font confiance — Nos références clients",
  description:
    "Automobile, sidérurgie, cimenterie, pharmaceutique, verre : découvrez les entreprises industrielles qui font confiance à ETC SAT MAROC pour leurs pièces de rechange.",
  path: "/ils-nous-font-confiance",
});

export default function ClientsPage() {
  return (
    <>
      <PageHero
        eyebrow="Références"
        title="Ils nous font confiance."
        intro="Des industriels de premier plan s'appuient sur ETC SAT MAROC pour l'approvisionnement de leurs pièces de rechange."
        path="/ils-nous-font-confiance"
        breadcrumb="Ils nous font confiance"
      />

      <section className="pb-20 lg:pb-28">
        <div className="container-site">
          <RevealGroup as="ul" className="grid grid-cols-2 border-t border-l border-line md:grid-cols-3 lg:grid-cols-4">
            {clients.map((client) => (
              <RevealItem
                as="li"
                key={client.name}
                className="group relative flex aspect-[3/2] items-center justify-center border-r border-b border-line px-4 text-center transition-colors duration-500 hover:bg-mist sm:aspect-[16/9]"
              >
                <Brand
                  item={client}
                  className={client.logo ? "h-14 sm:h-16" : "!text-[0.8125rem] !whitespace-normal transition-colors duration-500 group-hover:!text-navy xs:!text-base lg:!text-lg"}
                />
                <span aria-hidden className="absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 bg-red transition-transform duration-700 ease-out-expo group-hover:scale-x-100" />
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <section aria-label="Défilement des références" className="pb-20 lg:pb-28">
        <Reveal className="border-y border-line">
          <LogoMarquee items={clients} label="Entreprises qui nous font confiance" />
        </Reveal>
      </section>

      <CtaBand />
    </>
  );
}
