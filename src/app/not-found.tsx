import type { Metadata } from "next";
import { ButtonLink } from "@/components/ui/Button";

export const metadata: Metadata = { title: "Page introuvable", robots: { index: false, follow: true } };

export default function NotFound() {
  return (
    <section className="container-site flex min-h-[80svh] flex-col justify-center pt-[calc(var(--header-h)+3rem)] pb-24">
      <p aria-hidden className="font-display text-[clamp(7rem,4rem+18vw,16rem)] leading-[0.8] font-extrabold tracking-[-0.05em] text-navy">
        4<span className="text-red">0</span>4
      </p>
      <h1 className="text-h2 mt-10">Cette page est introuvable.</h1>
      <p className="text-lead mt-4 max-w-xl text-mute">
        La référence demandée n&apos;existe pas ou a été déplacée. Reprenez votre navigation depuis l&apos;accueil ou
        contactez-nous directement.
      </p>
      <div className="mt-10 flex flex-col gap-3 xs:flex-row">
        <ButtonLink href="/">Retour à l&apos;accueil</ButtonLink>
        <ButtonLink href="/contact" variant="outline" arrow={false}>
          Contactez-nous
        </ButtonLink>
      </div>
    </section>
  );
}
