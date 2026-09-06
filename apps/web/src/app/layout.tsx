import type { Metadata } from "next";
import { Cormorant_Garamond, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { ViewProvider } from "@/context/view-context";

const serifFont = Cormorant_Garamond({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const sansFont = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Samritha S — Interactive Personal Archive & Portfolio",
  description: "A dual-persona interactive space: unfiltered personal stories and filtered engineering portfolio.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${serifFont.variable} ${sansFont.variable} font-sans antialiased`}
        suppressHydrationWarning
      >
        <ViewProvider>{children}</ViewProvider>
      </body>
    </html>
  );
}
