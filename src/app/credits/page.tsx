import { PageHero } from "@/components/ui/PageHero";
import { images, type SiteImage } from "@/content/images";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Crédits photographiques",
  description: "Sources et licences des photographies utilisées sur le site d'ETC SAT MAROC.",
  path: "/credits",
});

export default function CreditsPage() {
  const list: SiteImage[] = Object.values(images);
  return (
    <>
      <PageHero
        eyebrow="Mentions"
        title="Crédits photographiques."
        intro="Les photographies d'illustration proviennent de banques d'images libres ou ont été fournies par ETC SAT MAROC. Elles ont été recadrées et redimensionnées."
        path="/credits"
        breadcrumb="Crédits"
      />
      <section className="pb-24 lg:pb-32">
        <div className="container-site">
          <ul className="border-t border-navy">
            {list.map((img) => (
              <li key={img.src} className="grid gap-1 border-b border-line py-4 text-sm sm:grid-cols-12 sm:gap-6">
                <span className="text-ink sm:col-span-6">{img.alt}</span>
                <span className="text-mute sm:col-span-3">
                  {img.credit.author} — {img.credit.source}
                </span>
                <span className="sm:col-span-3 sm:text-right">
                  {img.credit.url ? (
                    <a href={img.credit.url} target="_blank" rel="noopener noreferrer" className="font-medium text-navy underline underline-offset-4 hover:text-red">
                      {img.credit.license}
                      <span className="sr-only"> (source, nouvel onglet)</span>
                    </a>
                  ) : (
                    <span className="font-medium text-navy">{img.credit.license}</span>
                  )}
                </span>
              </li>
            ))}
          </ul>
          <p className="mt-8 max-w-2xl text-sm text-mute">
            Les noms et logos des entreprises citées sur ce site sont la propriété de leurs détenteurs respectifs.
          </p>
        </div>
      </section>
    </>
  );
}
