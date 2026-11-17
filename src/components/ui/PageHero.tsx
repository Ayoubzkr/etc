import Link from "next/link";
import { ChevronRight } from "lucide-react";
import type { ImageKey } from "@/content/images";
import { FadeUp, ImageReveal, SplitHeading } from "@/components/motion/Reveal";
import { Parallax } from "@/components/motion/Parallax";
import { JsonLd } from "./JsonLd";
import { Photo } from "./Photo";
import { breadcrumbJsonLd } from "@/lib/seo";

/** Header block of every inner page: breadcrumb, title, intro and an optional wide photograph. */
export function PageHero({
  eyebrow,
  title,
  intro,
  image,
  path,
  breadcrumb,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
  image?: ImageKey;
  path: string;
  breadcrumb: string;
}) {
  return (
    <section className="pt-[var(--header-h)]">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Accueil", path: "/" },
          { name: breadcrumb, path },
        ])}
      />
      <div className="container-site pt-10 pb-12 sm:pt-14 lg:pt-20 lg:pb-16">
        <FadeUp y={8}>
          <nav aria-label="Fil d'Ariane" className="mb-8 lg:mb-12">
            <ol className="flex items-center gap-2 text-[0.8125rem] text-mute">
              <li>
                <Link href="/" className="transition-colors hover:text-red">
                  Accueil
                </Link>
              </li>
              <li aria-hidden>
                <ChevronRight className="size-3.5" />
              </li>
              <li aria-current="page" className="font-medium text-navy">
                {breadcrumb}
              </li>
            </ol>
          </nav>
        </FadeUp>
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-12">
          <div className="lg:col-span-7">
            <FadeUp y={8}>
              <p className="eyebrow mb-6">{eyebrow}</p>
            </FadeUp>
            <SplitHeading text={title} className="text-h1" delay={0.1} />
          </div>
          {intro && (
            <FadeUp delay={0.35} className="lg:col-span-5 lg:pb-2">
              <p className="text-lead text-mute">{intro}</p>
            </FadeUp>
          )}
        </div>
      </div>
      {image && (
        <div className="container-site">
          <ImageReveal delay={0.25}>
            <Parallax className="relative aspect-[4/3] w-full bg-mist sm:aspect-[16/8] lg:aspect-[21/8]">
              <div className="relative h-full w-full">
                <Photo name={image} sizes="(min-width: 1320px) 1224px, 94vw" priority />
              </div>
            </Parallax>
          </ImageReveal>
        </div>
      )}
    </section>
  );
}
