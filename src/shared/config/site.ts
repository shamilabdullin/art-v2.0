export const SITE_NAME = "Art";

export type NavLabelKey = "home" | "paintings" | "artists" | "about";

export interface NavItem {
  href: string;
  labelKey: NavLabelKey;
}

export const NAV_ITEMS: NavItem[] = [
  { href: "/", labelKey: "home" },
  { href: "/paintings", labelKey: "paintings" },
  { href: "/artists", labelKey: "artists" },
  { href: "/about", labelKey: "about" },
];

export const MATURE_SECTION_HREF = "/mature";

export const PAGE_SIZE = {
  home: 12,
  paintingsList: 24,
  searchResults: 24,
  artistArtworks: 12,
  artistsList: 24,
  matureList: 24,
} as const;
