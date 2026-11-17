/**
 * Clients, partners and sourcing references — names supplied by the client.
 *
 * LOGOS: only original files supplied by the client are used. When `logo` is null the
 * company name is typeset as plain text (never a recreated / fake logo).
 * To add a logo: drop the official file in /public/logos/clients or /public/logos/partners
 * and fill `logo: { src, width, height }` (intrinsic pixel size, proportions are preserved).
 */

export type LogoAsset = { src: string; width: number; height: number };

export type Client = { name: string; logo: LogoAsset | null };

export const clients: Client[] = [
  "COFICAB",
  "NEXTEER",
  "STELLANTIS",
  "SNOP",
  "BAMESSA",
  "VALEO",
  "KOSTAL",
  "MAGHREB STEEL",
  "UNIVERS ACIER",
  "SOTHEMA",
  "CASA TRAM",
  "CIMENT DE L'ATLAS",
  "CIMENT DE L'AFRIQUE",
  "LAFARGE MAROC",
  "SMMRGV",
  "SARA TECHNOLOGIE",
  "AGC GLASS",
  "EUROHINCA",
  "SONASID",
  "SMTG GLOBALE",
  "DFI MAROC",
  "BENTELER AUTOMOTIVE",
  "PROMA",
  "PLASTIC & PLATING MAROCCO",
  "LEONARDO 3D METROLOGY",
  "JAUBERT",
  "GESTAMP",
  "TE CONNECTIVITY",
  "EMIRATES",
  "PROCESS INSTRUMENT SUD",
].map((name) => ({ name, logo: null }));

export type Partner = {
  id: string;
  name: string;
  country: string;
  activity: string;
  website: string;
  websiteLabel: string;
  logo: LogoAsset | null;
};

/** Official representations in Morocco. */
export const partners: Partner[] = [
  {
    id: "blickle",
    name: "BLICKLE",
    country: "Allemagne",
    activity: "Leader allemand dans la fabrication de roulettes industrielles.",
    website: "https://www.blickle.fr",
    websiteLabel: "blickle.fr",
    logo: null,
  },
  {
    id: "freudenberg",
    name: "FREUDENBERG",
    country: "Allemagne",
    activity: "Leader allemand dans la fabrication de solutions de filtration industrielle.",
    website: "https://www.freudenberg.com",
    websiteLabel: "freudenberg.com",
    logo: null,
  },
  {
    id: "project-international",
    name: "PROJECT INTERNATIONAL",
    country: "Italie",
    activity:
      "Spécialiste de l'outillage de moules pour l'industrie injection plastique et emboutissage.",
    website: "https://www.projectinternational.it",
    websiteLabel: "projectinternational.it",
    logo: { src: "/logos/partners/project-international-trimmed.png", width: 1383, height: 864 },
  },
  {
    id: "azolgas",
    name: "AZOLGAS",
    country: "Espagne",
    activity:
      "Leader espagnol dans la conception et fabrication de ressorts à gaz azote pour le formage des métaux.",
    website: "https://www.azolgas.com/fr",
    websiteLabel: "azolgas.com",
    logo: null,
  },
];

export type SourcingReference = {
  name: string;
  location: string;
  logo: LogoAsset | null;
};

/**
 * Sourcing network references ("Nos sourcing" in the client document).
 * Presented separately from official representations until the client confirms
 * the exact nature of each relationship.
 */
export const sourcingReferences: SourcingReference[] = [
  { name: "ETC SILLY", location: "France", logo: null },
  { name: "SATHERM", location: "Allemagne", logo: null },
  {
    name: "COPEX",
    location: "Floride, États-Unis",
    logo: { src: "/logos/partners/copex-trimmed.png", width: 570, height: 182 },
  },
  { name: "BROP", location: "Roumanie", logo: null },
];

/**
 * Brands & manufacturers whose parts we source ("Marques & fabricants" in the client document).
 * Names only — this is a sourcing capability list, not a claim of official distribution.
 */
export const manufacturers: string[] = [
  "ABB",
  "Ariel",
  "Baker Hughes",
  "Bently Nevada",
  "Bettis",
  "Bray",
  "Brodie International",
  "Burckhardt Compression",
  "Cameron",
  "CIRCOR",
  "Clark-Reliance",
  "Consolidated",
  "Continental",
  "Crosby",
  "Daniel",
  "Det-Tronics",
  "Dräger",
  "Dresser",
  "EagleBurgmann",
  "Emerson",
  "Endress+Hauser",
  "ENVEA",
  "Fike",
  "Fisher",
  "Flowserve",
  "FMC Technologies",
  "Foxboro",
  "Gardner Denver",
  "Halliburton",
  "Haskel",
  "HIMA",
  "Honeywell",
  "Howden",
  "Huber Kältemaschinenbau",
  "Hy-Lok",
  "IMI Critical Engineering",
  "Ingersoll Rand",
  "ITT Goulds Pumps",
  "John Crane",
  "KROHNE",
  "KSB",
  "LESER",
  "Masoneilan",
  "MSA Safety",
  "Milton Roy",
  "MOGAS",
  "MSA General Monitors",
  "Neles",
  "NETZSCH",
  "NOV",
  "Oliver Valves",
  "Parker Hannifin",
  "Pentair",
  "Peroni Pompe",
  "Pepperl+Fuchs",
  "Pietro Fiorentini",
  "ProMinent",
  "PROTEGO",
  "R. STAHL",
  "Red Valve",
  "Richter Chemie-Technik",
  "Rosemount",
  "Rotork",
  "Ruhrpumpen",
  "SAMSON",
  "Schneider Electric",
  "Servomex",
  "Siemens Energy",
  "SOR Controls Group",
  "SPIR STAR",
  "Spirax Sarco",
  "Sulzer",
  "Sundyne",
  "Swagelok",
  "TechnipFMC",
  "Thermo Scientific",
  "Total Safety",
  "Triconex",
  "Valmet",
  "VEGA",
  "Velan",
  "Victaulic",
  "Waukesha",
  "Weir",
  "WIKA",
  "Woodward",
  "Yokogawa",
  "Zwick Armaturen",
];

export const manufacturersNote = "Et autres fabricants sur demande.";

/** Countries of origin of the partners and sourcing references listed above. */
export const networkCountries = [
  "Allemagne",
  "France",
  "Italie",
  "Espagne",
  "Roumanie",
  "États-Unis",
];
