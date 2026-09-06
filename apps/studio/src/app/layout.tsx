import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Samritha S — Content Studio",
  description: "Private administration and content management studio for Samritha S portfolio.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[#0c1117] text-[#e6edf3] antialiased">
        {children}
      </body>
    </html>
  );
}
