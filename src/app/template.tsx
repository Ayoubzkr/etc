/** Re-mounted on every navigation: replays the page entrance (fade + subtle rise, CSS only). */
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="animate-page-in">{children}</div>;
}
