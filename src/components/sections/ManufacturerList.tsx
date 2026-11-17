"use client";

import { Search, X } from "lucide-react";
import { useId, useMemo, useState } from "react";

const normalize = (s: string) =>
  s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();

/** Alphabetical, filterable list of brand names (plain type — no logos are reproduced). */
export function ManufacturerList({ items, note }: { items: string[]; note: string }) {
  const inputId = useId();
  const [query, setQuery] = useState("");
  const sorted = useMemo(() => [...items].sort((a, b) => a.localeCompare(b, "fr", { sensitivity: "base" })), [items]);
  const q = normalize(query.trim());
  const visible = q ? sorted.filter((m) => normalize(m).includes(q)) : sorted;

  return (
    <div>
      <div className="flex flex-col gap-4 border-b border-navy pb-5 sm:flex-row sm:items-end sm:justify-between">
        <div className="relative w-full sm:max-w-sm">
          <label htmlFor={inputId} className="mb-2 block text-xs font-medium tracking-[0.14em] text-mute uppercase">
            Rechercher une marque
          </label>
          <Search aria-hidden className="pointer-events-none absolute bottom-3 left-0 size-4 text-mute" />
          <input
            id={inputId}
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ex. Endress+Hauser, KSB, Rotork…"
            autoComplete="off"
            className="w-full border-b border-line bg-transparent py-2.5 pr-8 pl-7 text-base text-navy placeholder:text-mute/70 focus:border-red focus:outline-none [&::-webkit-search-cancel-button]:hidden"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              className="absolute right-0 bottom-2.5 p-0.5 text-mute hover:text-red"
              aria-label="Effacer la recherche"
            >
              <X aria-hidden className="size-4" />
            </button>
          )}
        </div>
        <p className="text-sm text-mute tabular-nums" aria-live="polite">
          {visible.length} {visible.length > 1 ? "marques" : "marque"}
          {q ? ` sur ${items.length}` : ""}
        </p>
      </div>

      {visible.length > 0 ? (
        <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
          {visible.map((m) => (
            <li key={m} className="border-b border-navy/10 py-3.5 pr-3 text-[0.9375rem] font-semibold text-navy sm:py-4">
              {m}
            </li>
          ))}
        </ul>
      ) : (
        <p className="border-b border-navy/10 py-8 text-base text-ink/85">
          Aucune marque ne correspond à « {query.trim()} ». Nous trouvons aussi des pièces d&apos;autres fabricants : contactez-nous.
        </p>
      )}

      <p className="mt-8 font-display text-lg font-bold text-navy">{note}</p>
    </div>
  );
}
