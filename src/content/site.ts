/**
 * Central company information — single source of truth for the whole website.
 * Every value below comes from the client brief / client documents.
 * `null` means "not yet supplied / not verified": the UI hides the element.
 */

export const site = {
  name: "ETC SAT MAROC",
  legalNameAlt: "ETC-SAT Maroc",
  /** Placeholder production URL (derived from the e-mail domain). Override with NEXT_PUBLIC_SITE_URL. */
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.etc-sat-maroc.com").replace(/\/$/, ""),
  locale: "fr_MA",
  activity:
    "Sourcing multimarque & approvisionnement de pièces de rechange pour la maintenance industrielle",
  positioningEn: "Industrial Supply & Spare Parts Sourcing",
  tagline: "Votre partenaire en sourcing de pièces de rechange industrielles.",
  subtitle: "Société de sourcing spécialisée dans les pièces de rechange pour l'industrie.",
  description: [
    "ETC-SAT Maroc est une entreprise marocaine spécialisée dans le sourcing, l'approvisionnement et la distribution de pièces de rechange industrielles.",
    "Elle accompagne les acteurs de l'industrie dans l'identification, la sélection et la fourniture de composants mécaniques, électriques, électroniques et automatisés, toutes marques confondues.",
  ],
  shortDescription:
    "Entreprise marocaine spécialisée dans le sourcing, l'approvisionnement et la distribution de pièces de rechange industrielles, toutes marques confondues.",
  founded: 2021,
  companySize: "2–10 collaborateurs",
  sector: "Commerce et développement international",
  componentFamilies: ["Mécaniques", "Électriques", "Électroniques", "Automatisés"],
  email: "contact@etc-sat-maroc.com",
  phone: { display: "+212 539 948 266", href: "tel:+212539948266" },
  social: {
    /** Official LinkedIn URL not verified yet — the icon is rendered only when this is set. */
    linkedin: null as string | null,
  },
} as const;

export type Office = {
  id: string;
  name: string;
  /** Scope of each entity, as stated by the client (corrections n°1 and reference image "zones franches / territoire assujetti"). */
  scope: string;
  scopeDetail: string;
  addressLines: string[];
  locality: string;
  country: string;
  /** Text query used for the "open in Google Maps" link. No coordinates are stored until verified. */
  mapsQuery: string;
  /** Verified Google Maps embed URL — null until the client confirms the exact pin. */
  mapsEmbedUrl: string | null;
};

export const offices: Office[] = [
  {
    id: "etc-sat-maroc",
    name: "ETC SAT MAROC",
    scope: "Zones franches",
    scopeDetail: "Sourcing pour les entreprises implantées en zone franche.",
    addressLines: [
      "Plate-forme Tanger Med Hub",
      "N°01 Lot 130 – Zone Franche Logistique",
      "Tanger Med Port – Maroc",
    ],
    locality: "Tanger Med",
    country: "MA",
    mapsQuery: "Tanger Med Hub, Zone Franche Logistique, Tanger Med Port, Maroc",
    mapsEmbedUrl: null,
  },
  {
    id: "esmt-tanger",
    name: "ESMT TANGER",
    scope: "Territoire assujetti",
    scopeDetail: "Sourcing pour les entreprises du territoire marocain assujetti.",
    addressLines: ["3ème étage N°8 N12", "Khalid Ibn El Oualid", "Tanger – Maroc"],
    locality: "Tanger",
    country: "MA",
    mapsQuery: "Khalid Ibn El Oualid, Tanger, Maroc",
    mapsEmbedUrl: null,
  },
];

export const navigation = [
  { label: "Accueil", href: "/" },
  { label: "Qui sommes-nous", href: "/qui-sommes-nous" },
  { label: "Compétences", href: "/competences" },
  { label: "Secteurs", href: "/secteurs" },
  { label: "Ils nous font confiance", href: "/ils-nous-font-confiance" },
  { label: "Partenaires", href: "/partenaires" },
  { label: "Contact", href: "/contact" },
] as const;

export const mapsLink = (query: string) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
