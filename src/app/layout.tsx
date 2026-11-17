import type { Metadata, Viewport } from "next";
import { Inter, Manrope } from "next/font/google";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { MotionProvider } from "@/components/motion/MotionProvider";
import { JsonLd } from "@/components/ui/JsonLd";
import { site } from "@/content/site";
import { organizationJsonLd } from "@/lib/seo";
import "./globals.css";

const manrope = Manrope({ variable: "--font-manrope", subsets: ["latin"], display: "swap", weight: ["500", "600", "700", "800"] });
const inter = Inter({ variable: "--font-inter", subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name} — Sourcing & pièces de rechange industrielles`, template: `%s | ${site.name}` },
  description: site.shortDescription,
  applicationName: site.name,
  keywords: [
    "sourcing industriel",
    "pièces de rechange industrielles",
    "approvisionnement industriel",
    "maintenance industrielle",
    "centralisation des achats",
    "réparation pièces industrielles",
    "Tanger Med",
    "Maroc",
  ],
  formatDetection: { telephone: false },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = { themeColor: "#ffffff", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${manrope.variable} ${inter.variable} antialiased`}>
      <body className="flex min-h-dvh flex-col [--header-h:4.5rem] 2xl:[--header-h:5rem]">
        <JsonLd data={organizationJsonLd()} />
        <MotionProvider>
          <Header />
          <main id="contenu" tabIndex={-1} className="flex-1 outline-none">
            {children}
          </main>
          <Footer />
        </MotionProvider>
      </body>
    </html>
  );
}
