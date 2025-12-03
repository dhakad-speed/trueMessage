import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Inter_Tight, Poppins } from "next/font/google";

import "./globals.css";
import LayoutPage from "../../components/layout/page/LayoutPage";

const interTight = Inter_Tight({
  variable: "--font-inter-sans",
  subsets: ["latin"],
});

const poppins = Poppins({
  variable: "--font-popins",
  weight: "400",
});

export const metadata: Metadata = {
  title: "Home | Next Blog",
  description: "a blog app",
};

interface RootLayoutprops {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutprops) {
  return <LayoutPage>{children}</LayoutPage>;
}
