import type { Metadata } from "next";
import { offices, site } from "@/content/site";

type PageSeo = { title: string; description: string; path: string };

/** Per-page metadata: unique title/description, canonical, Open Graph and Twitter cards. */
export function pageMetadata({ title, description, path }: PageSeo): Metadata {
  const fullTitle = path === "/" ? title : `${title} | ${site.name}`;
  return {
    title: { absolute: fullTitle },
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      locale: site.locale,
      siteName: site.name,
      url: path,
      title: fullTitle,
      description,
    },
    twitter: { card: "summary_large_image", title: fullTitle, description },
  };
}

const postalAddress = (o: (typeof offices)[number]) => ({
  "@type": "PostalAddress",
  streetAddress: o.addressLines.slice(0, -1).join(", "),
  addressLocality: o.locality,
  addressCountry: o.country,
});

/** Organization + LocalBusiness structured data. No geo-coordinates: not verified yet. */
export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${site.url}/#organization`,
        name: site.name,
        alternateName: site.legalNameAlt,
        url: site.url,
        logo: `${site.url}/logos/etc-sat-maroc.png`,
        description: site.description.join(" "),
        foundingDate: String(site.founded),
        email: site.email,
        telephone: site.phone.display,
        address: postalAddress(offices[0]),
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "customer service",
          email: site.email,
          telephone: site.phone.display,
          availableLanguage: ["fr"],
        },
        ...(site.social.linkedin ? { sameAs: [site.social.linkedin] } : {}),
      },
      ...offices.map((o) => ({
        "@type": "LocalBusiness",
        "@id": `${site.url}/contact#${o.id}`,
        name: o.name,
        description: o.scopeDetail,
        url: `${site.url}/contact`,
        image: `${site.url}/logos/etc-sat-maroc.png`,
        email: site.email,
        telephone: site.phone.display,
        address: postalAddress(o),
        parentOrganization: { "@id": `${site.url}/#organization` },
      })),
    ],
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${site.url}${item.path}`,
    })),
  };
}
