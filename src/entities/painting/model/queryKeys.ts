export const paintingQueryKeys = {
  all: ["artworks"] as const,
  search: (params: { q?: string; page?: number; limit?: number; artistId?: number }) =>
    [...paintingQueryKeys.all, "search", params] as const,
  detail: (id: number | string) => [...paintingQueryKeys.all, "detail", id] as const,
};
