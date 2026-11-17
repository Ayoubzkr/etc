import type { ImageKey } from "./images";

export type Sector = {
  id: string;
  name: string;
  /** Short, deliberately neutral description (no claims about specific projects or customers). */
  description: string;
  image: ImageKey;
  /** Shown in the homepage preview. */
  featured?: boolean;
};

/** The 12 sectors listed by the client (correction n°2 + brief). */
export const sectors: Sector[] = [
  {
    id: "industrie-manufacturiere",
    name: "Industrie manufacturière",
    description: "Composants et pièces de rechange pour lignes et équipements de production.",
    image: "manufacturing",
  },
  {
    id: "energie",
    name: "Énergie et production électrique",
    description: "Pièces techniques pour les installations de production et de distribution d'énergie.",
    image: "energy",
    featured: true,
  },
  {
    id: "agroalimentaire",
    name: "Agroalimentaire",
    description: "Approvisionnement en composants pour les équipements de process et de conditionnement.",
    image: "food",
    featured: true,
  },
  {
    id: "chimie-petrochimie",
    name: "Chimie et pétrochimie",
    description: "Pièces de rechange pour unités de process et équipements associés.",
    image: "chemical",
  },
  {
    id: "pharmaceutique",
    name: "Pharmaceutique",
    description: "Composants pour les équipements de production et de laboratoire.",
    image: "pharmaceutical",
    featured: true,
  },
  {
    id: "eau-environnement",
    name: "Traitement de l'eau et environnement",
    description: "Pièces pour stations de traitement, pompage et installations environnementales.",
    image: "water",
  },
  {
    id: "maintenance-industrielle",
    name: "Maintenance industrielle (MRO)",
    description: "Fourniture multimarque pour les équipes de maintenance, de réparation et d'exploitation.",
    image: "maintenance",
  },
  {
    id: "metallurgie-siderurgie",
    name: "Métallurgie et sidérurgie",
    description: "Composants pour équipements de transformation et de formage des métaux.",
    image: "metallurgy",
    featured: true,
  },
  {
    id: "transport-logistique",
    name: "Transport et logistique",
    description: "Pièces de rechange pour équipements de manutention et plateformes logistiques.",
    image: "logistics",
  },
  {
    id: "injection-plastique",
    name: "Industrie injection plastique",
    description: "Pièces et outillage pour presses à injecter et périphériques.",
    image: "plastics",
  },
  {
    id: "btp-cimenteries",
    name: "BTP, cimenteries et matériaux de construction",
    description: "Composants pour installations de cimenterie et équipements de chantier.",
    image: "cement",
    featured: true,
  },
  {
    id: "automobile-aeronautique",
    name: "Automobile et aéronautique",
    description: "Production et maintenance : pièces pour lignes d'assemblage et moyens industriels.",
    image: "automotive",
    featured: true,
  },
];
