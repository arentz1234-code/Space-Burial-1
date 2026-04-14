import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Space Burial Investor Portal | Private Placement",
  description: "SEC-compliant investor portal for Space Burial private placement offering. Accredited investors only.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        {/* SEC Compliance Banner */}
        <div className="sec-banner">
          PRIVATE PLACEMENT - ACCREDITED INVESTORS ONLY - NOT AN OFFER TO SELL SECURITIES
        </div>

        <Navbar />

        <main className="flex-1">
          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
}
