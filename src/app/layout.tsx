import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Providers } from "@/components/providers/Providers";

export const metadata: Metadata = {
  title: "Space Burial — Send Your Legacy to the Stars",
  description:
    "The ultimate memorial tribute. Send ashes into space with Space Burial. Rocket Memorial and Immortal Memorial packages starting at $3,800.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="min-h-screen flex flex-col">
        <Providers>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
