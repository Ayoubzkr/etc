import { Reveal } from "@/components/motion/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { site } from "@/content/site";

export function CtaBand() {
  return (
    <section className="relative overflow-hidden bg-navy">
      <div aria-hidden className="absolute inset-y-0 left-0 w-1.5 bg-red" />
      <div className="container-site section grid gap-10 lg:grid-cols-12 lg:items-end">
        <Reveal className="lg:col-span-8">
          <p className="eyebrow mb-6 text-white/70">Contact</p>
          <h2 className="text-h1 max-w-[22ch] text-white">
            Vous recherchez une solution fiable pour vos approvisionnements industriels ?
          </h2>
        </Reveal>
        <Reveal delay={0.15} className="lg:col-span-4 lg:justify-self-end">
          <ButtonLink href="/contact" className="w-full sm:w-auto">
            Parlons de votre besoin
          </ButtonLink>
          <p className="mt-6 text-sm text-white/75">
            <a href={site.phone.href} className="font-semibold text-white underline-offset-4 hover:underline">
              {site.phone.display}
            </a>
            <span aria-hidden className="mx-2">·</span>
            <a href={`mailto:${site.email}`} className="font-semibold text-white underline-offset-4 hover:underline">
              {site.email}
            </a>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
