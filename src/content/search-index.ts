import { history, mission, vision } from "./about";
import { clients, partners, sourcingReferences } from "./network";
import { sectors } from "./sectors";
import { centralisation, repair, services, sourcing } from "./services";
import { offices, site } from "./site";

export type SearchCategory = "Entreprise" | "Compétences" | "Secteurs" | "Clients" | "Partenaires" | "Contact";

export type SearchEntry = {
  id: string;
  title: string;
  /** One-line excerpt shown in the results. */
  excerpt: string;
  /** Extra text that is searched but not displayed. */
  keywords: string;
  href: string;
  category: SearchCategory;
};

/** Search index built from the same content files as the pages — always in sync. */
export const searchIndex: SearchEntry[] = [
  {
    id: "company",
    title: "Qui sommes-nous",
    excerpt: site.subtitle,
    keywords: [...site.description, site.activity, site.positioningEn, "entreprise société présentation"].join(" "),
    href: "/qui-sommes-nous",
    category: "Entreprise",
  },
  {
    id: "history",
    title: "Notre histoire",
    excerpt: history.title,
    keywords: `${history.text} fondation création 2021 histoire`,
    href: "/qui-sommes-nous#histoire",
    category: "Entreprise",
  },
  {
    id: "mission",
    title: "Notre mission",
    excerpt: mission.title,
    keywords: [mission.text, ...mission.pillars.map((p) => `${p.title} ${p.text}`)].join(" "),
    href: "/qui-sommes-nous#mission",
    category: "Entreprise",
  },
  ...vision.map((v) => ({
    id: `vision-${v.number}`,
    title: `Vision — ${v.title}`,
    excerpt: v.text,
    keywords: `${v.list.join(" ")} vision valeurs`,
    href: "/qui-sommes-nous#vision",
    category: "Entreprise" as const,
  })),
  ...services.map((s) => ({
    id: s.id,
    title: s.name,
    excerpt: s.summary,
    keywords:
      s.id === "approvisionnement-sourcing"
        ? [sourcing.description, ...sourcing.items, "incoterms DAP DDP OEM livraison douane"].join(" ")
        : s.id === "centralisation-des-achats"
          ? [centralisation.intro, ...centralisation.benefits.map((b) => `${b.title} ${b.text}`), "TCO fournisseur unique"].join(" ")
          : [repair.intro, ...repair.offer, ...repair.network, "réparation dépannage obsolète diagnostic"].join(" "),
    href: s.href,
    category: "Compétences" as const,
  })),
  ...sectors.map((s) => ({
    id: s.id,
    title: s.name,
    excerpt: s.description,
    keywords: "secteur industrie domaine d'intervention",
    href: `/secteurs#${s.id}`,
    category: "Secteurs" as const,
  })),
  ...clients.map((c) => ({
    id: `client-${c.name}`,
    title: c.name,
    excerpt: "Ils nous font confiance",
    keywords: "client référence confiance",
    href: "/ils-nous-font-confiance",
    category: "Clients" as const,
  })),
  ...partners.map((p) => ({
    id: p.id,
    title: p.name,
    excerpt: p.activity,
    keywords: `${p.country} partenaire représentation ${p.websiteLabel}`,
    href: `/partenaires#${p.id}`,
    category: "Partenaires" as const,
  })),
  ...sourcingReferences.map((r) => ({
    id: `ref-${r.name}`,
    title: r.name,
    excerpt: `Référence de notre réseau de sourcing — ${r.location}`,
    keywords: "sourcing réseau fournisseur",
    href: "/partenaires#reseau-sourcing",
    category: "Partenaires" as const,
  })),
  ...offices.map((o) => ({
    id: o.id,
    title: `${o.name} — ${o.scope}`,
    excerpt: o.addressLines.join(", "),
    keywords: `adresse bureau ${o.scopeDetail} ${o.locality}`,
    href: `/contact#${o.id}`,
    category: "Contact" as const,
  })),
  {
    id: "contact",
    title: "Nous contacter",
    excerpt: `${site.email} · ${site.phone.display}`,
    keywords: "contact email e-mail téléphone formulaire devis demande message",
    href: "/contact",
    category: "Contact",
  },
];

const normalise = (s: string) =>
  s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();

const prepared = searchIndex.map((entry) => ({
  entry,
  title: normalise(entry.title),
  body: normalise(`${entry.excerpt} ${entry.keywords} ${entry.category}`),
}));

/** Accent-insensitive, multi-term search. Every term must match; title matches rank first. */
export function search(query: string, limit = 8): SearchEntry[] {
  const terms = normalise(query).split(" ").filter(Boolean);
  if (terms.length === 0) return [];
  return prepared
    .map((p) => {
      let score = 0;
      for (const term of terms) {
        if (p.title.startsWith(term)) score += 12;
        else if (p.title.split(" ").some((w) => w.startsWith(term))) score += 8;
        else if (p.title.includes(term)) score += 5;
        else if (p.body.split(" ").some((w) => w.startsWith(term))) score += 2;
        else if (term.length > 2 && p.body.includes(term)) score += 1;
        else return { entry: p.entry, score: 0 };
      }
      return { entry: p.entry, score };
    })
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((r) => r.entry);
}
