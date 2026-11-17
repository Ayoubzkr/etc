import world from "@/content/world-map.json";

type Side = "top" | "right" | "bottom" | "left";

/** Where each country label sits relative to its marker, so the European labels don't collide. */
const labelSide: Record<string, Side> = {
  Allemagne: "top",
  France: "left",
  Italie: "bottom",
  Espagne: "left",
  Roumanie: "right",
  "États-Unis": "left",
};

const sideClass: Record<Side, string> = {
  top: "-translate-x-1/2 -translate-y-full -mt-1.5",
  right: "-translate-y-1/2 ml-2",
  bottom: "-translate-x-1/2 mt-1.5",
  left: "-translate-x-full -translate-y-1/2 -ml-2",
};

/**
 * Dotted world map. The red marker is the company's own base (Tanger Med); the navy markers are
 * the countries of origin of the partners and sourcing references (country level, not offices).
 */
export function WorldMap() {
  const { width, height, hub, origins } = world;
  const dots = (world.points as number[][]).map(([x, y]) => `M${x} ${y}h0`).join("");
  const pct = (x: number, y: number) => ({ left: `${(x / width) * 100}%`, top: `${(y / height) * 100}%` });
  const arc = (x: number, y: number) => {
    const mx = (x + hub.x) / 2;
    const my = (y + hub.y) / 2 - Math.max(2, Math.abs(x - hub.x) * 0.22);
    return `M${x} ${y}Q${mx} ${my} ${hub.x} ${hub.y}`;
  };
  return (
    <figure className="relative">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="block h-auto w-full"
        role="img"
        aria-label="Carte du monde : base d'ETC SAT MAROC à Tanger Med (Maroc) et pays d'origine de nos partenaires — Allemagne, France, Italie, Espagne, Roumanie, États-Unis"
      >
        <path d={dots} fill="none" stroke="#a9b4bc" strokeWidth={0.5} strokeLinecap="round" />
        <g fill="none" stroke="#e5252a" strokeWidth={0.22} strokeDasharray="0.8 0.7" strokeLinecap="round" opacity={0.55}>
          {origins.map((o) => (
            <path key={o.country} d={arc(o.x, o.y)} />
          ))}
        </g>
        {origins.map((o) => (
          <g key={o.country}>
            <title>{o.country}</title>
            <circle cx={o.x} cy={o.y} r={1.25} fill="#172b3a" fillOpacity={0.12} />
            <circle cx={o.x} cy={o.y} r={0.72} fill="#172b3a" stroke="#fff" strokeWidth={0.28} />
          </g>
        ))}
        <g>
          <circle cx={hub.x} cy={hub.y} r={1.7} fill="#e5252a" className="animate-pulse-ring [transform-box:fill-box] [transform-origin:center]" />
          <circle cx={hub.x} cy={hub.y} r={1.7} fill="#e5252a" className="animate-pulse-ring [animation-delay:1.4s] [transform-box:fill-box] [transform-origin:center]" />
          <circle cx={hub.x} cy={hub.y} r={1.1} fill="#e5252a" stroke="#fff" strokeWidth={0.35} />
        </g>
      </svg>

      {/* Country labels — hidden on small screens where they would overlap; the list under the map names them. */}
      {origins.map((o) => (
        <span
          key={o.country}
          aria-hidden
          className={`pointer-events-none absolute hidden text-[0.6875rem] leading-none font-semibold whitespace-nowrap text-navy md:block ${sideClass[labelSide[o.country] ?? "right"]}`}
          style={pct(o.x, o.y)}
        >
          {o.country}
        </span>
      ))}

      {/* Callout sits below-left of the hub, over the Atlantic, clear of the European markers. */}
      <figcaption className="absolute -translate-x-full pt-3 pr-1 sm:pt-5" style={pct(hub.x, hub.y)}>
        <span className="block border-r-2 border-red bg-white px-2.5 py-1.5 text-right shadow-lg shadow-navy/10 sm:px-3.5 sm:py-2">
          <span className="block font-display text-[0.6875rem] leading-tight font-bold text-navy sm:text-sm">Tanger Med</span>
          <span className="block text-[0.625rem] text-mute sm:text-xs">Maroc · Notre base</span>
        </span>
      </figcaption>
    </figure>
  );
}
