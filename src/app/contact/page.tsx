import { Mail, Phone } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { ContactForm } from "@/components/contact/ContactForm";
import { OfficeBlocks } from "@/components/sections/OfficeBlocks";
import { PageHero } from "@/components/ui/PageHero";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Contact — Nous contacter",
  description:
    "Contactez ETC SAT MAROC : Tanger Med Hub (Zone Franche Logistique) et ESMT TANGER. Téléphone +212 539 948 266 — contact@etc-sat-maroc.com.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Nous contacter."
        intro="Une référence à trouver, un besoin d'approvisionnement, une réparation ? Décrivez-nous votre demande, notre équipe vous répond."
        path="/contact"
        breadcrumb="Contact"
      />

      <section className="pb-20 lg:pb-28">
        <div className="container-site">
          <h2 className="sr-only">Nos bureaux</h2>
          <OfficeBlocks />
        </div>
      </section>

      <section className="section bg-mist">
        <div className="container-site grid gap-14 lg:grid-cols-12 lg:gap-8">
          <Reveal className="lg:col-span-4">
            <p className="eyebrow mb-6">Écrivez-nous</p>
            <h2 className="text-h2">Parlons de votre besoin.</h2>
            <ul className="mt-10 border-t border-navy/15">
              <li className="border-b border-navy/15 py-5">
                <p className="text-xs font-medium tracking-[0.14em] text-mute uppercase">E-mail</p>
                <a href={`mailto:${site.email}`} className="mt-2 inline-flex items-center gap-3 font-display text-lg font-bold break-all text-navy transition-colors hover:text-red">
                  <Mail aria-hidden className="size-4 shrink-0 text-red" />
                  {site.email}
                </a>
              </li>
              <li className="border-b border-navy/15 py-5">
                <p className="text-xs font-medium tracking-[0.14em] text-mute uppercase">Téléphone</p>
                <a href={site.phone.href} className="mt-2 inline-flex items-center gap-3 font-display text-lg font-bold text-navy transition-colors hover:text-red">
                  <Phone aria-hidden className="size-4 shrink-0 text-red" />
                  {site.phone.display}
                </a>
              </li>
            </ul>
          </Reveal>
          <Reveal delay={0.1} className="relative bg-white p-6 shadow-[0_30px_80px_-40px_rgba(23,43,58,0.35)] sm:p-10 lg:col-span-7 lg:col-start-6 lg:p-12">
            <ContactForm />
          </Reveal>
        </div>
      </section>
    </>
  );
}
