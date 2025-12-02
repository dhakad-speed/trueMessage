import React from "react";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { Inter_Tight, Poppins } from "next/font/google";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import Provider from "@/src/components/layout/sessionPage/Provider";
interface AuthLayoutProps {
  children: React.ReactNode;
}
const interTight = Inter_Tight({
  variable: "--font-inter-sans",
  subsets: ["latin"],
});

const poppins = Poppins({
  variable: "--font-popins",
  weight: "400",
});

function RootLayout({ children }: AuthLayoutProps) {
  return (
    <html lang="en">
      <body className={`${interTight.variable} ${poppins.variable} `}>
        <AppRouterCacheProvider>
          <Provider>
            {children}
            <Toaster
              position="top-center"
              toastOptions={{
                success: {
                  iconTheme: {
                    primary: "#000",
                    secondary: "#ffffff",
                  },
                },
                error: {
                  iconTheme: {
                    primary: "#000",
                    secondary: "#ffffff",
                  },
                },
              }}
            />
          </Provider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}

export default RootLayout;
