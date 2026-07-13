"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

interface MatureGateState {
  isConfirmed: boolean;
  confirm: () => void;
}

export const useMatureGateStore = create<MatureGateState>()(
  persist(
    (set) => ({
      isConfirmed: false,
      confirm: () => set({ isConfirmed: true }),
    }),
    { name: "mature-gate" },
  ),
);
