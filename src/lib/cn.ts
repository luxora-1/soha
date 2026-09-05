/**
 * Minimal className joiner. Filters out falsy values so conditional classes
 * can be written inline without pulling in a dependency.
 */
export function cn(
  ...classes: Array<string | false | null | undefined | 0>
): string {
  return classes.filter(Boolean).join(" ");
}
