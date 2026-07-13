"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "@/i18n/navigation";
import { useDebouncedValue } from "@/shared/lib/hooks/useDebouncedValue";

const SEARCH_PATH = "/search";
const DEBOUNCE_MS = 400;

export function useSearchNavigation() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [value, setValue] = useState(() => (pathname === SEARCH_PATH ? (searchParams.get("q") ?? "") : ""));
  const debouncedValue = useDebouncedValue(value, DEBOUNCE_MS);

  useEffect(() => {
    const query = debouncedValue.trim();
    const onSearchPage = pathname === SEARCH_PATH;

    if (!query) {
      if (onSearchPage) router.replace(SEARCH_PATH);
      return;
    }

    const target = `${SEARCH_PATH}?q=${encodeURIComponent(query)}`;
    if (onSearchPage) {
      router.replace(target);
    } else {
      router.push(target);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedValue]);

  function navigateNow() {
    const query = value.trim();
    if (!query) return;
    router.push(`${SEARCH_PATH}?q=${encodeURIComponent(query)}`);
  }

  return { value, setValue, navigateNow };
}
