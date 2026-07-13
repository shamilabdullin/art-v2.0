export function formatArtistYears(
  birthDate: number | null,
  deathDate: number | null,
  presentLabel: string,
): string | null {
  if (!birthDate && !deathDate) return null;
  return `${birthDate ?? "?"}–${deathDate ?? presentLabel}`;
}
