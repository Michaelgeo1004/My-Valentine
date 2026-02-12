import type { Metadata } from "next";
import { Inter, Noto_Sans_Tamil } from "next/font/google";
import "./globals.css";
import { AppContextProvider } from "@/context/AppContext";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const tamil = Noto_Sans_Tamil({
  subsets: ["tamil"],
  variable: "--font-tamil",
});

export const metadata: Metadata = {
  title: "My Everything | Geo & Ancy",
  description: "A 5-year journey of love from Dubai to Tirunelveli.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${tamil.variable}`}>
      <body className="antialiased overflow-x-hidden selection:bg-romantic-red/30">
        <AppContextProvider>
          <div className="mesh-gradient fixed inset-0 -z-20" />
          <main className="relative z-10 min-h-[100dvh]">
            {children}
          </main>
        </AppContextProvider>
      </body>
    </html>
  );
}
