import { ArrowUpRight } from "lucide-react";
import { RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { mapsLink, offices } from "@/content/site";

/** The two entities, always shown as two distinct blocks (never merged). */
export function OfficeBlocks({ headingLevel = "h3" }: { headingLevel?: "h2" | "h3" }) {
  const Heading = headingLevel;
  return (
    <RevealGroup className="grid border-t border-navy md:grid-cols-2">
      {offices.map((office, i) => (
        <RevealItem
          key={office.id}
          id={office.id}
          as="article"
          className={`flex flex-col py-10 lg:py-14 ${i === 0 ? "border-b border-line md:border-r md:border-b-0 md:pr-10 lg:pr-16" : "md:pl-10 lg:pl-16"}`}
        >
          <p className="mb-6 flex items-center gap-4 text-xs font-medium tracking-[0.16em] text-mute uppercase">
            <span className="text-red tabular-nums">{String(i + 1).padStart(2, "0")}</span>
            {office.scope}
          </p>
          <Heading className="text-h2">{office.name}</Heading>
          <p className="mt-3 text-[0.9375rem] text-mute">{office.scopeDetail}</p>
          <address className="mt-8 text-lg leading-relaxed text-ink not-italic">
            {office.addressLines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </address>
          <div className="mt-8 flex-1 content-end">
            {office.mapsEmbedUrl ? (
              <iframe
                src={office.mapsEmbedUrl}
                title={`Carte — ${office.name}`}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="aspect-[16/10] w-full border-0 grayscale-[35%]"
              />
            ) : (
              <a href={mapsLink(office.mapsQuery)} target="_blank" rel="noopener noreferrer" className="link-arrow">
                Rechercher l&apos;adresse sur Google Maps
                <ArrowUpRight aria-hidden className="size-4" />
                <span className="sr-only">(nouvel onglet)</span>
              </a>
            )}
          </div>
        </RevealItem>
      ))}
    </RevealGroup>
  );
}
