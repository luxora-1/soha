/**
 * Decides what <Unverified> does in the current build.
 *
 *  - development ......................... highlight (yellow)
 *  - production build, Vercel Preview .... highlight, so previews can be shared
 *  - production build, ALLOW_UNVERIFIED=1  highlight (local check of the build)
 *  - any other production build .......... throw → `next build` fails
 *
 * The page is statically prerendered, so a throw during `next build` is a
 * build error: nothing with a placeholder figure can reach production.
 */
export type UnverifiedMode = "highlight" | "throw";

export function unverifiedMode(): UnverifiedMode {
  if (process.env.NODE_ENV !== "production") return "highlight";
  if (process.env.ALLOW_UNVERIFIED === "1") return "highlight";
  if (process.env.VERCEL_ENV === "preview") return "highlight";
  return "throw";
}
