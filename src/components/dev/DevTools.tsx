import { paletteOrder } from "@/config/design-tokens";

/**
 * Development-only tooling: the floating palette switcher and the inline
 * script that applies `?palette=` before first paint so screenshots never
 * flash the default scheme.
 *
 * In production builds `process.env.NODE_ENV` is inlined as "production", so
 * this returns null before the switcher is ever imported: no client
 * reference is created and nothing of it reaches the production bundle.
 * (A static import would still emit the client chunk even if never rendered.)
 * Verified by grepping the build output for the switcher's label.
 */
export async function DevTools() {
  if (process.env.NODE_ENV !== "development") return null;

  const { PaletteSwitcher } = await import("@/components/dev/PaletteSwitcher");

  const ids = paletteOrder.join("");
  const init = `(function(){try{var p=new URLSearchParams(location.search).get("palette");if(p&&/^[${ids}]$/.test(p)){document.documentElement.setAttribute("data-palette",p)}}catch(e){}})();`;

  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: init }} />
      <PaletteSwitcher />
    </>
  );
}
