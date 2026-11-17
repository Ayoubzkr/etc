import world from "@/content/world-map.json";

/**
 * Neutral dotted world map. The only marker is the company's own base (Tangier region):
 * no supplier, branch or office location is implied anywhere else.
 */
export function WorldMap() {
  const { width, height, hub } = world;
  const dots = (world.points as number[][]).map(([x, y]) => `M${x} ${y}h0`).join("");
  return (
    <figure className="relative">
      <svg viewBox={`0 0 ${width} ${height}`} className="block h-auto w-full" role="img" aria-label="Carte du monde stylisée, avec un repère sur Tanger, au Maroc">
        <path d={dots} fill="none" stroke="#b4bec5" strokeWidth={0.44} strokeLinecap="round" />
        <g style={{ transformBox: "fill-box", transformOrigin: "center" }}>
          <circle cx={hub.x} cy={hub.y} r={1.5} fill="#e5252a" className="animate-pulse-ring [transform-box:fill-box] [transform-origin:center]" />
          <circle cx={hub.x} cy={hub.y} r={1.5} fill="#e5252a" className="animate-pulse-ring [animation-delay:1.4s] [transform-box:fill-box] [transform-origin:center]" />
          <circle cx={hub.x} cy={hub.y} r={0.95} fill="#e5252a" stroke="#fff" strokeWidth={0.3} />
        </g>
      </svg>
      <figcaption
        className="absolute -translate-y-1/2 pl-3 sm:pl-5"
        style={{ left: `${(hub.x / width) * 100}%`, top: `${(hub.y / height) * 100}%` }}
      >
        <span className="block border-l-2 border-red bg-white px-2.5 py-1.5 shadow-lg shadow-navy/10 sm:px-3.5 sm:py-2">
          <span className="block font-display text-[0.6875rem] leading-tight font-bold text-navy sm:text-sm">Tanger Med</span>
          <span className="block text-[0.625rem] text-mute sm:text-xs">Maroc</span>
        </span>
      </figcaption>
    </figure>
  );
}
