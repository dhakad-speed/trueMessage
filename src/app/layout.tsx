import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Inter_Tight, Poppins } from "next/font/google";
import "./globals.css";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";

const interTight = Inter_Tight({
  variable: "--font-inter-sans",
  subsets: ["latin"],
});

const poppins = Poppins({
  variable: "--font-popins",
  weight: "400",
});

export const metadata: Metadata = {
  title: "Next Blog",
  description: "a blog app",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <AppRouterCacheProvider>
        <body className={`${interTight.variable} ${poppins.variable}`}>
          <>{children}</>
        </body>
      </AppRouterCacheProvider>
    </html>
  );
}
