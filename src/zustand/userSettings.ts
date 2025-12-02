import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useUserSettings = create(
  persist(
    (set) => ({
      isAcceptingMessages: false,

      toggleAccepting: () =>
        set((state: { isAcceptingMessages: boolean }) => ({
          isAcceptingMessages: !state.isAcceptingMessages,
        })),
    }),
    {
      name: "user-settings",
    }
  )
);
