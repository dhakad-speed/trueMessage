"use client";
import { createContext, useContext } from "react";

export type ContextTypes = {
  setNotify?: React.Dispatch<React.SetStateAction<boolean>>;
  setInvisible?: React.Dispatch<React.SetStateAction<boolean>>;
  isNotify?: boolean;
  isInvisible?: boolean;
};

const context = createContext<ContextTypes | null>(null);

export const useContextValues = () => {
  const ctx = useContext(context);
  if (!ctx) throw new Error("useLayoutUi must be used inside LayoutUiProvider");
  return ctx;
};

export const ContextProvider = ({
  value,
  children,
}: {
  value: ContextTypes | null;
  children: React.ReactNode;
}) => <context.Provider value={value}>{children}</context.Provider>;
