import type { Metadata } from "next";
import "./globals.css";
import { Geist } from "next/font/google";
import localFont from "next/font/local";
import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";
import { Toaster } from "sonner";

import { auth } from "@/auth";
import ThemeProvider from "@/context/Theme";
import { cn } from "@/lib/utils";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

const inter = localFont({
  src: "./fonts/InterVF.ttf",
  variable: "--font-inter",
  weight: "100 200 300 400 500 600 700 800 900",
});

const spaceGrotesk = localFont({
  src: "./fonts/SpaceGroteskVF.ttf",
  variable: "--font-space-grotesk",
  weight: "100 200 300 400 500 600 700 800 900",
});

export const metadata: Metadata = {
  title: "devflow",
  description: "A better version of stackoverflow for developers",
  icons: {
    icon: "/images/site-logo.svg",
  },
};

const RootLayout = async ({ children }: { children: ReactNode }) => {
  const session = await auth();

  return (
    <html
      lang="en"
      className={cn(
        "h-full",
        "antialiased",
        inter.className,
        spaceGrotesk.variable,
        "font-sans",
        geist.variable
      )}
      suppressHydrationWarning
    >
      <SessionProvider session={session}>
        <body className="flex min-h-full flex-col">
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
            scriptProps={{ type: "application/json" }}
          >
            {children}
          </ThemeProvider>
          <Toaster />
        </body>
      </SessionProvider>
    </html>
  );
};

export default RootLayout;
