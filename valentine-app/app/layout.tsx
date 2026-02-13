import type { Metadata } from "next";
import { Inter, Noto_Sans_Tamil, Great_Vibes, Cinzel } from "next/font/google";
import "./globals.css";
import ClientLayout from "./ClientLayout";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const tamil = Noto_Sans_Tamil({
  subsets: ["tamil"],
  variable: "--font-tamil",
});

const greatVibes = Great_Vibes({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-great-vibes",
});

const cinzel = Cinzel({
  subsets: ["latin"],
  variable: "--font-cinzel",
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
    <html lang="en">
      <body className={`antialiased overflow-x-hidden selection:bg-romantic-red/30 ${greatVibes.variable} ${cinzel.variable}`}>
        <ClientLayout interClass={inter.variable} tamilClass={tamil.variable}>
          {children}
        </ClientLayout>
      </body>
    </html>
  );
}
