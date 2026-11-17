/**
 * Centralised image configuration.
 * To replace a photograph: drop the new file in /public/images/... and update `src`, `alt`
 * and `credit` here — every page reads from this file.
 */

export type SiteImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
  /** CSS object-position, to keep the subject in frame when cropped. */
  position?: string;
  credit: {
    author: string;
    source: "Unsplash" | "Wikimedia Commons" | "Pexels" | "Client";
    license: string;
    /** Absent for photographs supplied by the client. */
    url?: string;
  };
};

const unsplash = (id: string, author = "Photographe Unsplash") => ({
  author,
  source: "Unsplash" as const,
  license: "Licence Unsplash",
  url: `https://images.unsplash.com/photo-${id}`,
});

const pexels = (id: string, author: string) => ({
  author,
  source: "Pexels" as const,
  license: "Licence Pexels",
  url: `https://www.pexels.com/photo/${id}/`,
});

const client = () => ({
  author: "ETC SAT MAROC",
  source: "Client" as const,
  license: "Fourni par le client",
});

const commons = (author: string, license: string, file: string) => ({
  author,
  source: "Wikimedia Commons" as const,
  license,
  url: `https://commons.wikimedia.org/wiki/File:${file}`,
});

export const images = {
  hero: {
    src: "/images/hero/automotive-robotic-line.jpg",
    alt: "Robots industriels assemblant une caisse automobile sur une ligne de production",
    width: 2400,
    height: 1600,
    position: "60% 50%",
    credit: unsplash("1567789884554-0b844b597180"),
  },
  expertise: {
    src: "/images/company/engineer-test-bench.jpg",
    alt: "Ingénieure travaillant sur un banc d'essai entouré de composants industriels",
    width: 2400,
    height: 1601,
    credit: unsplash("1581091226825-a6a2a5aee158"),
  },
  port: {
    src: "/images/company/container-terminal.jpg",
    alt: "Porte-conteneurs à quai sous des portiques de manutention",
    width: 2400,
    height: 1600,
    credit: unsplash("1578575437130-527eed3abbec"),
  },
  warehouseRacking: {
    src: "/images/logistics/warehouse-racking.jpg",
    alt: "Rayonnages d'un entrepôt logistique chargés de palettes",
    width: 2400,
    height: 1597,
    credit: unsplash("1587293852726-70cdb56c2866"),
  },
  sourcing: {
    src: "/images/sourcing/multi-screen-specialist.webp",
    alt: "Spécialiste assis face à plusieurs écrans d'analyse de données",
    width: 2400,
    height: 1355,
    position: "58% 50%",
    credit: client(),
  },
  centralisation: {
    src: "/images/logistics/warehouse-aisle.jpg",
    alt: "Allée d'un entrepôt de stockage de pièces et de colis",
    width: 2400,
    height: 3200,
    credit: unsplash("1553413077-190dd305871c"),
  },
  repair: {
    src: "/images/repair/electronics-technician-pcb.webp",
    alt: "Technicien en électronique réparant une carte électronique au fer à souder dans un atelier",
    width: 2400,
    height: 1600,
    position: "48% 55%",
    credit: pexels("technician-soldering-circuit-board-in-lab-37426135", "Maikol Herrera"),
  },
  manufacturing: {
    src: "/images/manufacturing/robotic-cell.jpg",
    alt: "Bras robotisés manipulant des pièces dans une cellule de production",
    width: 2400,
    height: 1837,
    credit: unsplash("1563968743333-044cef800494"),
  },
  energy: {
    src: "/images/energy/power-lines.jpg",
    alt: "Lignes électriques à haute tension au coucher du soleil",
    width: 2400,
    height: 1600,
    credit: unsplash("1473341304170-971dccb5ac1e"),
  },
  food: {
    src: "/images/food-industry/process-piping.jpg",
    alt: "Tuyauteries et pompe en acier inoxydable d'une installation de process",
    width: 2400,
    height: 1600,
    credit: unsplash("1513828583688-c52646db42da"),
  },
  chemical: {
    src: "/images/chemical-industry/refinery.jpg",
    alt: "Unités et colonnes d'un site pétrochimique",
    width: 2400,
    height: 1600,
    credit: unsplash("1516937941344-00b4e0337589"),
  },
  pharmaceutical: {
    src: "/images/pharmaceutical/laboratory.jpg",
    alt: "Équipe en blouse blanche travaillant dans un laboratoire",
    width: 2400,
    height: 1601,
    credit: unsplash("1581093450021-4a7360e9a6b5"),
  },
  water: {
    src: "/images/water-treatment/clarifier.jpg",
    alt: "Bassin de décantation circulaire d'une station de traitement des eaux",
    width: 2400,
    height: 1296,
    credit: commons("Czeva", "CC BY-SA 4.0", "ČBu,_wastewater_treatment_plant_05.jpg"),
  },
  maintenance: {
    src: "/images/industrial-maintenance/mechanic-wrench.jpg",
    alt: "Mains d'un technicien serrant un organe mécanique avec une clé",
    width: 2400,
    height: 1800,
    credit: unsplash("1619642751034-765dfdf7c58e"),
  },
  metallurgy: {
    src: "/images/metallurgy/hot-rolling.jpg",
    alt: "Acier incandescent sur une ligne de laminage à chaud",
    width: 2400,
    height: 1599,
    credit: commons("Adrian Tync", "CC BY-SA 4.0", "Huta_Pokój_walcownia_2019_(2).jpg"),
  },
  logistics: {
    src: "/images/logistics/container-port-aerial.jpg",
    alt: "Vue aérienne d'un terminal à conteneurs",
    width: 2400,
    height: 1600,
    credit: unsplash("1494412574643-ff11b0a5c1c3"),
  },
  plastics: {
    src: "/images/plastics/injection-moulding-hall.jpg",
    alt: "Atelier équipé de presses à injecter",
    width: 2400,
    height: 1600,
    credit: commons("Orionpenindia", "CC BY-SA 4.0", "Inside_the_factory.jpg"),
  },
  cement: {
    src: "/images/cement/cement-plant.jpg",
    alt: "Tour de préchauffage et installations d'une cimenterie",
    width: 2400,
    height: 1350,
    credit: commons(
      "CEphoto, Uwe Aranas",
      "CC BY-SA 3.0",
      "Hoping_Taiwan-Cement-Corporation-Hoping-Plant-02.jpg",
    ),
  },
  automotive: {
    src: "/images/automotive/assembly-line.jpg",
    alt: "Véhicules en cours de montage sur une ligne d'assemblage automobile",
    width: 2400,
    height: 1600,
    credit: commons(
      "Marek Ślusarczyk (Tupungato)",
      "CC BY 3.0",
      "002_Production_line_-_car_assembly_line_in_General_Motors_Manufacturing_Poland_-_Gliwice,_Poland.jpg",
    ),
  },
} satisfies Record<string, SiteImage>;

export type ImageKey = keyof typeof images;

export const logos = {
  horizontal: "/logos/company/etc-sat-maroc-horizontal.svg",
  horizontalOnDark: "/logos/company/etc-sat-maroc-horizontal-on-dark.svg",
  stacked: "/logos/company/etc-sat-maroc-stacked.svg",
  stackedOnDark: "/logos/company/etc-sat-maroc-stacked-on-dark.svg",
  emblem: "/logos/company/etc-sat-maroc-emblem.svg",
  originalPng: "/logos/etc-sat-maroc.png",
  originalSvg: "/logos/etc-sat-maroc.svg",
} as const;
