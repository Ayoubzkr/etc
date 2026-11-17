import type { ImageKey } from "./images";

/** The three competencies — wording taken from the client brief and correction documents. */

export type ServiceSummary = {
  id: string;
  number: string;
  name: string;
  summary: string;
  image: ImageKey;
  href: string;
};

export const services: ServiceSummary[] = [
  {
    id: "approvisionnement-sourcing",
    number: "01",
    name: "Approvisionnement & Sourcing",
    summary:
      "Identification, achat et livraison de vos pièces et équipements techniques, en s'appuyant sur un réseau international de fabricants et distributeurs fiables.",
    image: "sourcing",
    href: "/competences#approvisionnement-sourcing",
  },
  {
    id: "centralisation-des-achats",
    number: "02",
    name: "Centralisation des achats",
    summary:
      "Un seul interlocuteur pour vos achats de pièces de rechange et de composants techniques, toutes marques, tous secteurs.",
    image: "centralisation",
    href: "/competences#centralisation-des-achats",
  },
  {
    id: "depannage-reparation",
    number: "03",
    name: "Dépannage & Réparation",
    summary:
      "Analyse de vos équipements défectueux et gestion de leur réparation auprès des fabricants d'origine ou de centres spécialisés, quelle que soit la marque.",
    image: "repair",
    href: "/competences#depannage-reparation",
  },
];

export const sourcing = {
  title: "Approvisionnement & Sourcing",
  description:
    "ETC SAT MAROC vous accompagne dans l'identification, l'achat et la livraison de vos pièces et équipements techniques, en s'appuyant sur un réseau international de fabricants et distributeurs fiables.",
  listTitle: "Produits et services",
  items: [
    "Fourniture de pièces d'origine (OEM) et équivalentes certifiées.",
    "Recherche et sélection de distributeurs à l'échelle mondiale.",
    "Optimisation des délais de livraison et des coûts d'acquisition.",
    "Support technique et documentation fournie.",
    "Gestion de livraison en Zone Franche ou sur le territoire marocain assujetti.",
  ],
  incoterms: [
    { code: "DAP", label: "Delivered at Place" },
    { code: "DDP", label: "Delivered Duty Paid" },
  ],
  incotermsNote:
    "Ces services sont proposés pour vous offrir une expérience logistique simplifiée.",
};

export const centralisation = {
  title: "Centralisation des achats industriels : gagnez en efficacité avec ETC SAT Maroc.",
  intro:
    "Dans un contexte industriel de plus en plus exigeant, où la réactivité, la maîtrise des coûts et la fiabilité de l'approvisionnement sont des enjeux majeurs, ETC-SAT Maroc propose une solution stratégique de centralisation des achats de pièces de rechange et de composants techniques.",
  benefitsTitle: "Pourquoi centraliser vos achats avec ETC-SAT Maroc ?",
  benefits: [
    {
      title: "Un seul interlocuteur pour des milliers de références",
      text: "Nous centralisons pour vous la recherche, la sélection et la commande de vos pièces de rechange – toutes marques, tous secteurs – en nous appuyant sur un réseau international de fabricants et de distributeurs qualifiés.",
    },
    {
      title: "Réduction des coûts cachés",
      text: "Fini les dépenses dispersées, les frais logistiques multipliés ou les retards causés par la gestion de plusieurs fournisseurs. Nous vous aidons à réduire votre coût total d'acquisition (TCO).",
    },
    {
      title: "Gain de temps et de productivité",
      text: "Vos équipes maintenance, achats ou exploitation peuvent se concentrer sur leur cœur de métier pendant que nous gérons pour vous l'ensemble du processus d'approvisionnement.",
    },
    {
      title: "Traçabilité, qualité et transparence",
      text: "Chaque demande est traitée avec rigueur. Nous assurons le suivi complet de vos commandes, de la demande initiale à la livraison, avec reporting, documentation technique et conformité garantie.",
    },
  ],
  visionTitle: "Une vision partenariale",
  closing:
    "Plus qu'un fournisseur, ETC-SAT Maroc agit comme votre partenaire stratégique en achats techniques.",
  closingDetail:
    "Notre approche vise à structurer, rationaliser et fiabiliser vos flux d'approvisionnement, pour que vous puissiez affronter vos défis industriels avec sérénité.",
  motto: ["Un seul canal.", "Une seule solution.", "Une performance optimisée."],
};

export const repair = {
  title: "Gestion de vos réparations.",
  intro:
    "Nous prenons en charge l'analyse de vos équipements défectueux afin d'évaluer leur réparabilité et qui seront ensuite transmis aux fabricants d'origine ou à des centres de réparation spécialisés.",
  offerIntro: "Après diagnostic, nous vous soumettons une offre détaillée comprenant :",
  offer: [
    "Le coût estimé de la réparation.",
    "Le prix actuel du matériel neuf ou équivalent.",
    "L'obligation du retour du matériel réparé ou non à votre société suivant les conditions et procédures de la douane.",
  ],
  network: [
    "Grâce à notre réseau international, ETC SAT MAROC gère la réparation de tout type de pièce de rechange, quelle que soit la marque.",
    "Nous collaborons avec des fournisseurs spécialisés dans la remise en état de composants, y compris les pièces obsolètes.",
  ],
  closing:
    "Notre priorité : vous proposer la solution la plus avantageuse et adaptée à vos besoins.",
};
