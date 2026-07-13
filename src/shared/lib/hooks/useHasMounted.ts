"use client";

import { useSyncExternalStore } from "react";

const subscribe = () => () => {};

/** true только после гидратации на клиенте — безопасно для SSR без setState в эффекте. */
export function useHasMounted(): boolean {
  return useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
}
