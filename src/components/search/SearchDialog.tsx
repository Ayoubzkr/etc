"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, CornerDownLeft, Search, X } from "lucide-react";
import { useEffect, useId, useMemo, useRef, useState } from "react";
import { search, type SearchEntry } from "@/content/search-index";
import { useFocusTrap } from "@/lib/use-focus-trap";
import { cn } from "@/lib/utils";

const suggestions: { label: string; href: string }[] = [
  { label: "Approvisionnement & Sourcing", href: "/competences#approvisionnement-sourcing" },
  { label: "Centralisation des achats", href: "/competences#centralisation-des-achats" },
  { label: "Réparation", href: "/competences#depannage-reparation" },
  { label: "Marques & fabricants", href: "/partenaires#marques-fabricants" },
  { label: "Secteurs d'activité", href: "/secteurs" },
  { label: "Nos partenaires", href: "/partenaires" },
  { label: "Nous contacter", href: "/contact" },
];

export function SearchDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  return <AnimatePresence>{open && <SearchPanel onClose={onClose} />}</AnimatePresence>;
}

function SearchPanel({ onClose }: { onClose: () => void }) {
  const router = useRouter();
  const panel = useRef<HTMLDivElement>(null);
  const input = useRef<HTMLInputElement>(null);
  const listId = useId();
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const results = useMemo(() => search(query), [query]);
  const hasQuery = query.trim().length > 0;

  useFocusTrap(panel, true, onClose);

  useEffect(() => {
    input.current?.focus();
  }, []);

  const go = (entry: SearchEntry) => {
    onClose();
    router.push(entry.href);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (results.length === 0) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((i) => (i + 1) % results.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((i) => (i - 1 + results.length) % results.length);
    } else if (e.key === "Enter") {
      e.preventDefault();
      go(results[Math.min(active, results.length - 1)]);
    }
  };

  useEffect(() => {
    document.getElementById(`${listId}-${active}`)?.scrollIntoView({ block: "nearest" });
  }, [active, listId]);

  return (
    <motion.div
      className="fixed inset-0 z-[70] flex items-start justify-center bg-navy/55 backdrop-blur-sm sm:px-6 sm:pt-[12vh]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
    >
      <motion.div
        ref={panel}
        role="dialog"
        aria-modal="true"
        aria-label="Recherche sur le site"
        className="flex h-full w-full flex-col bg-white shadow-2xl shadow-navy/20 sm:h-auto sm:max-h-[72vh] sm:max-w-2xl"
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="flex items-center gap-3 border-b border-line px-5 sm:px-6">
          <Search aria-hidden className="size-5 shrink-0 text-red" />
          <input
            ref={input}
            type="search"
            role="combobox"
            aria-expanded={results.length > 0}
            aria-controls={listId}
            aria-activedescendant={results.length > 0 ? `${listId}-${active}` : undefined}
            aria-autocomplete="list"
            aria-label="Rechercher"
            placeholder="Rechercher un service, un secteur, un partenaire…"
            autoComplete="off"
            spellCheck={false}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setActive(0);
            }}
            onKeyDown={onKeyDown}
            className="h-16 w-full min-w-0 bg-transparent text-base text-navy outline-none placeholder:text-steel [&::-webkit-search-cancel-button]:hidden"
          />
          <button
            type="button"
            onClick={onClose}
            aria-label="Fermer la recherche"
            className="flex size-10 shrink-0 items-center justify-center text-mute transition-colors hover:text-red"
          >
            <X aria-hidden className="size-5" />
          </button>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain" aria-live="polite">
          {!hasQuery && (
            <div className="px-5 py-6 sm:px-6">
              <p className="mb-3 text-xs font-medium tracking-[0.14em] text-mute uppercase">Accès rapide</p>
              <ul id={listId} className="grid gap-1 sm:grid-cols-2">
                {suggestions.map((s) => (
                  <li key={s.href}>
                    <Link
                      href={s.href}
                      onClick={onClose}
                      className="group flex items-center justify-between gap-3 px-3 py-3 text-sm font-medium text-navy transition-colors hover:bg-mist"
                    >
                      {s.label}
                      <ArrowRight aria-hidden className="size-4 text-steel transition-all group-hover:translate-x-0.5 group-hover:text-red" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {hasQuery && results.length > 0 && (
            <ul id={listId} role="listbox" aria-label="Résultats" className="py-2">
              {results.map((r, i) => (
                <li key={r.id} id={`${listId}-${i}`} role="option" aria-selected={i === active}>
                  <Link
                    href={r.href}
                    tabIndex={-1}
                    onClick={onClose}
                    onMouseEnter={() => setActive(i)}
                    className={cn(
                      "flex items-center gap-4 border-l-2 px-5 py-3.5 sm:px-6",
                      i === active ? "border-red bg-mist" : "border-transparent",
                    )}
                  >
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-[0.9375rem] font-semibold text-navy">{r.title}</span>
                      <span className="mt-0.5 block truncate text-sm text-mute">{r.excerpt}</span>
                    </span>
                    <span className="hidden shrink-0 text-[0.6875rem] font-medium tracking-[0.12em] text-mute uppercase xs:block">
                      {r.category}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )}

          {hasQuery && results.length === 0 && (
            <div className="px-5 py-12 text-center sm:px-6">
              <p className="font-display text-lg font-bold text-navy">Aucun résultat pour « {query.trim()} »</p>
              <p className="mx-auto mt-2 max-w-sm text-sm text-mute">
                Essayez un autre terme, ou décrivez-nous directement la pièce ou le service recherché.
              </p>
              <Link
                href="/contact"
                onClick={onClose}
                className="link-arrow mt-6"
              >
                Contactez-nous <ArrowRight aria-hidden className="size-4" />
              </Link>
            </div>
          )}
        </div>

        <div className="hidden items-center gap-5 border-t border-line px-6 py-3 text-xs text-mute sm:flex">
          <span className="flex items-center gap-1.5">
            <kbd className="border border-line px-1.5 py-0.5 font-sans">↑</kbd>
            <kbd className="border border-line px-1.5 py-0.5 font-sans">↓</kbd> naviguer
          </span>
          <span className="flex items-center gap-1.5">
            <kbd className="border border-line px-1.5 py-0.5 font-sans">
              <CornerDownLeft aria-hidden className="size-3" />
            </kbd>{" "}
            ouvrir
          </span>
          <span className="flex items-center gap-1.5">
            <kbd className="border border-line px-1.5 py-0.5 font-sans">Échap</kbd> fermer
          </span>
        </div>
      </motion.div>
    </motion.div>
  );
}
