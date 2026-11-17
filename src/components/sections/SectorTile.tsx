import Link from "next/link";
import { Photo } from "@/components/ui/Photo";
import type { Sector } from "@/content/sectors";

/** Photograph + caption. `href` turns the tile into a link (homepage preview). */
export function SectorTile({
  sector,
  index,
  href,
  sizes,
  showDescription = true,
}: {
  sector: Sector;
  index: number;
  href?: string;
  sizes: string;
  showDescription?: boolean;
}) {
  const body = (
    <>
      <div className="relative aspect-[4/3] overflow-hidden bg-mist">
        <Photo
          name={sector.image}
          sizes={sizes}
          className="transition-transform duration-[1.4s] ease-out-expo group-hover:scale-[1.06]"
        />
        <div aria-hidden className="absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 bg-red transition-transform duration-700 ease-out-expo group-hover:scale-x-100" />
      </div>
      <div className="flex gap-4 pt-5">
        <span className="pt-1 text-xs font-medium text-red tabular-nums">{String(index + 1).padStart(2, "0")}</span>
        <div>
          <h3 className="font-display text-[1.0625rem] leading-snug font-bold text-navy sm:text-lg">{sector.name}</h3>
          {showDescription && <p className="mt-2 text-sm leading-relaxed text-mute">{sector.description}</p>}
        </div>
      </div>
    </>
  );
  return href ? (
    <Link href={href} className="group block">
      {body}
    </Link>
  ) : (
    <div className="group">{body}</div>
  );
}
