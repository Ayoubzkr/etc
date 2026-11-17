import Image from "next/image";
import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { logos } from "@/content/images";
import { services } from "@/content/services";
import { navigation, offices, site } from "@/content/site";
import { BackToTop } from "./BackToTop";

const linkClass =
  "text-[0.9375rem] text-ink/80 transition-colors hover:text-red";
const headingClass = "mb-6 font-sans text-xs font-medium tracking-[0.16em] text-mute uppercase";

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className="size-4 fill-current">
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45z" />
    </svg>
  );
}

export function Footer() {
  return (
    <footer className="border-t-2 border-red bg-mist">
      <div className="container-site pt-16 pb-10 lg:pt-24">
        <div className="grid gap-x-10 gap-y-14 sm:grid-cols-2 lg:grid-cols-12">
          {/* 01 — Company */}
          <div className="sm:col-span-2 lg:col-span-4 lg:pr-10">
            <Link href="/" aria-label="ETC SAT MAROC — accueil" className="inline-block">
              <Image src={logos.stacked} alt="ETC SAT MAROC" width={240} height={90} unoptimized className="h-[5.5rem] w-auto" />
            </Link>
            <p className="mt-7 max-w-sm text-[0.9375rem] leading-relaxed text-ink/80">{site.shortDescription}</p>
            <p className="mt-5 text-xs font-medium tracking-[0.14em] text-navy uppercase">{site.positioningEn}</p>
            {site.social.linkedin && (
              <a
                href={site.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="ETC SAT MAROC sur LinkedIn (nouvel onglet)"
                className="mt-7 inline-flex size-11 items-center justify-center border border-navy/20 text-navy transition-colors hover:border-red hover:bg-red hover:text-white"
              >
                <LinkedInIcon />
              </a>
            )}
          </div>

          {/* 02 — Quick links */}
          <nav aria-label="Liens rapides" className="lg:col-span-2">
            <h2 className={headingClass}>Liens rapides</h2>
            <ul className="space-y-3">
              {navigation.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className={linkClass}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* 03 — Services */}
          <nav aria-label="Nos compétences" className="lg:col-span-2">
            <h2 className={headingClass}>Nos compétences</h2>
            <ul className="space-y-3">
              {services.map((s) => (
                <li key={s.id}>
                  <Link href={s.href} className={linkClass}>
                    {s.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* 04 — Contact */}
          <div className="sm:col-span-2 lg:col-span-4">
            <h2 className={headingClass}>Contact</h2>
            <ul className="space-y-3">
              <li>
                <a href={`mailto:${site.email}`} className="group inline-flex items-center gap-3 font-display text-lg font-bold text-navy transition-colors hover:text-red">
                  <Mail aria-hidden className="size-4 shrink-0 text-red" />
                  <span className="break-all">{site.email}</span>
                </a>
              </li>
              <li>
                <a href={site.phone.href} className="inline-flex items-center gap-3 font-display text-lg font-bold text-navy transition-colors hover:text-red">
                  <Phone aria-hidden className="size-4 shrink-0 text-red" />
                  {site.phone.display}
                </a>
              </li>
            </ul>
            <div className="mt-8 grid gap-8 xs:grid-cols-2">
              {offices.map((office) => (
                <address key={office.id} className="text-sm leading-relaxed text-ink/80 not-italic">
                  <span className="mb-1 flex items-center gap-2 font-display text-[0.9375rem] font-bold text-navy">
                    <MapPin aria-hidden className="size-3.5 shrink-0 text-red" />
                    {office.name}
                  </span>
                  <span className="mb-2 block text-xs font-medium tracking-[0.08em] text-mute uppercase">{office.scope}</span>
                  {office.addressLines.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </address>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-6 border-t border-navy/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[0.8125rem] text-mute">
            © {new Date().getFullYear()} {site.name}. Tous droits réservés.
            <span aria-hidden className="mx-2">·</span>
            <Link href="/credits" className="underline-offset-4 hover:text-red hover:underline">
              Crédits photographiques
            </Link>
          </p>
          <BackToTop />
        </div>
      </div>
    </footer>
  );
}
