"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, Mail, Menu, Phone, Search, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { SearchDialog } from "@/components/search/SearchDialog";
import { navigation, site } from "@/content/site";
import { useFocusTrap } from "@/lib/use-focus-trap";
import { cn } from "@/lib/utils";
import { Logo } from "./Logo";

const EASE = [0.16, 1, 0.3, 1] as const;

const isActive = (pathname: string, href: string) =>
  href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // ⌘K / Ctrl+K opens the search from anywhere
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setMenuOpen(false);
        setSearchOpen(true);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Leave the mobile menu when the viewport becomes desktop-sized
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 80rem)");
    const onChange = () => mq.matches && setMenuOpen(false);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const closeMenu = useCallback(() => setMenuOpen(false), []);
  const closeSearch = useCallback(() => setSearchOpen(false), []);

  /** Transparent header only at the very top of the homepage, over the hero photograph. */
  const overHero = pathname === "/" && !scrolled && !menuOpen;
  const indicator = hovered ?? navigation.find((n) => isActive(pathname, n.href))?.href ?? null;

  return (
    <>
      <a
        href="#contenu"
        className="fixed top-3 left-3 z-[80] -translate-y-20 bg-navy px-4 py-3 text-sm font-semibold text-white transition-transform focus:translate-y-0"
      >
        Aller au contenu
      </a>

      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 h-[var(--header-h)] border-b transition-[background-color,border-color,box-shadow] duration-500",
          overHero
            ? "border-white/15 bg-transparent"
            : "border-line bg-white/95 shadow-[0_1px_24px_-12px_rgba(23,43,58,0.25)] backdrop-blur-md",
        )}
      >
        <div className="container-site flex h-full items-center justify-between gap-5">
          <Link href="/" aria-label="ETC SAT MAROC — retour à l'accueil" className="shrink-0" onClick={closeMenu}>
            <Logo onDark={overHero} className="h-[1.875rem] 2xl:h-9" />
          </Link>

          <nav aria-label="Navigation principale" className="hidden xl:block">
            <ul className="flex items-center gap-[1.125rem] 2xl:gap-7" onMouseLeave={() => setHovered(null)}>
              {navigation.map((item) => {
                const active = isActive(pathname, item.href);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      onMouseEnter={() => setHovered(item.href)}
                      onFocus={() => setHovered(item.href)}
                      onBlur={() => setHovered(null)}
                      className={cn(
                        "relative block py-2.5 text-[0.875rem] font-medium whitespace-nowrap transition-colors duration-300",
                        overHero
                          ? active ? "text-white" : "text-white/80 hover:text-white"
                          : active ? "text-navy" : "text-ink/75 hover:text-navy",
                      )}
                    >
                      {item.label}
                      {indicator === item.href && (
                        <motion.span
                          layoutId="nav-indicator"
                          className="absolute inset-x-0 -bottom-px h-0.5 bg-red"
                          transition={{ duration: 0.45, ease: EASE }}
                        />
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex shrink-0 items-center gap-1.5 sm:gap-3">
            <button
              type="button"
              onClick={() => {
                setMenuOpen(false);
                setSearchOpen(true);
              }}
              aria-label="Ouvrir la recherche"
              aria-keyshortcuts="Meta+K Control+K"
              className={cn(
                "flex size-11 items-center justify-center transition-colors duration-300",
                overHero ? "text-white hover:text-white/70" : "text-navy hover:text-red",
              )}
            >
              <Search aria-hidden className="size-5" />
            </button>
            <Link
              href="/contact"
              className={cn(
                "group hidden h-11 items-center gap-2.5 bg-red px-4 text-sm font-semibold text-white transition-colors duration-300 hover:bg-red-dark sm:inline-flex 2xl:px-5",
                menuOpen && "sm:hidden",
              )}
            >
              Contactez-nous
              <ArrowRight aria-hidden className="size-4 transition-transform duration-500 ease-out-expo group-hover:translate-x-1" />
            </Link>
            <button
              type="button"
              onClick={() => setMenuOpen((o) => !o)}
              aria-expanded={menuOpen}
              aria-controls="menu-mobile"
              aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"}
              className={cn(
                "flex size-11 items-center justify-center transition-colors duration-300 xl:hidden",
                overHero ? "text-white" : "text-navy",
              )}
            >
              {menuOpen ? <X aria-hidden className="size-6" /> : <Menu aria-hidden className="size-6" />}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>{menuOpen && <MobileMenu pathname={pathname} onClose={closeMenu} />}</AnimatePresence>
      <SearchDialog open={searchOpen} onClose={closeSearch} />
    </>
  );
}

function MobileMenu({ pathname, onClose }: { pathname: string; onClose: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  useFocusTrap(ref, true, onClose);

  return (
    <motion.div
      ref={ref}
      id="menu-mobile"
      role="dialog"
      aria-modal="true"
      aria-label="Menu"
      className="fixed inset-x-0 top-[var(--header-h)] bottom-0 z-40 overflow-y-auto overscroll-contain bg-white xl:hidden"
      initial={{ clipPath: "inset(0% 0% 100% 0%)" }}
      animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
      exit={{ clipPath: "inset(0% 0% 100% 0%)" }}
      transition={{ duration: 0.6, ease: EASE }}
    >
      <div className="container-site flex min-h-full flex-col pt-6 pb-8">
        <motion.ul
          className="flex-1"
          initial="hidden"
          animate="show"
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.045, delayChildren: 0.15 } } }}
        >
          {navigation.map((item, i) => {
            const active = isActive(pathname, item.href);
            return (
              <motion.li
                key={item.href}
                className="border-b border-line"
                variants={{
                  hidden: { opacity: 0, y: 18 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
                }}
              >
                <Link
                  href={item.href}
                  onClick={onClose}
                  aria-current={active ? "page" : undefined}
                  className="flex items-baseline gap-4 py-4"
                >
                  <span className={cn("w-6 text-xs font-medium tabular-nums", active ? "text-red" : "text-steel")}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className={cn("font-display text-[1.375rem] font-bold tracking-tight", active ? "text-red" : "text-navy")}>
                    {item.label}
                  </span>
                </Link>
              </motion.li>
            );
          })}
        </motion.ul>

        <motion.div
          className="mt-8 space-y-5"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE, delay: 0.5 }}
        >
          <Link
            href="/contact"
            onClick={onClose}
            className="flex h-14 items-center justify-center gap-3 bg-red text-base font-semibold text-white"
          >
            Contactez-nous <ArrowRight aria-hidden className="size-4" />
          </Link>
          <div className="flex flex-col gap-2 text-sm text-mute">
            <a href={site.phone.href} className="flex items-center gap-3 py-1">
              <Phone aria-hidden className="size-4 text-red" /> {site.phone.display}
            </a>
            <a href={`mailto:${site.email}`} className="flex items-center gap-3 py-1">
              <Mail aria-hidden className="size-4 text-red" /> {site.email}
            </a>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
