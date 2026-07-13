export type PageItem = number | "gap";

export function getPageNumbers(current: number, total: number, siblingCount: number): PageItem[] {
  const pages = new Set<number>([1, total, current]);
  for (let i = 1; i <= siblingCount; i++) {
    if (current - i >= 1) pages.add(current - i);
    if (current + i <= total) pages.add(current + i);
  }

  const sorted = Array.from(pages).sort((a, b) => a - b);
  const result: PageItem[] = [];
  for (let i = 0; i < sorted.length; i++) {
    if (i > 0 && sorted[i] - sorted[i - 1] > 1) {
      result.push("gap");
    }
    result.push(sorted[i]);
  }
  return result;
}
