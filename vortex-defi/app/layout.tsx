import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { MobileNav } from "@/components/layout/MobileNav";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Vortex DeFi — Intelligent Yield & Liquidity on Solana",
  description:
    "Next-generation DeFi protocol featuring smart yield routing, dynamic AMM, and protocol-owned liquidity on Solana. Swap, provide liquidity, stake, and earn optimized yields.",
  keywords: ["DeFi", "Solana", "Yield", "AMM", "Liquidity", "Staking", "Vortex"],
  openGraph: {
    title: "Vortex DeFi",
    description: "Intelligent Yield & Liquidity Protocol on Solana",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#0f0f23",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} font-sans antialiased`}>
        <Providers>
          <div className="relative min-h-screen flex flex-col">
            {/* Background effects */}
            <div className="fixed inset-0 -z-10">
              <div className="absolute inset-0 bg-hero-gradient" />
              <div className="absolute top-0 left-1/4 w-96 h-96 bg-vortex-600/10 rounded-full blur-[128px]" />
              <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-neon-blue/5 rounded-full blur-[128px]" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-vortex-900/20 rounded-full blur-[200px]" />
            </div>
            <Navbar />
            <main className="flex-1 pb-20 md:pb-0">{children}</main>
            <Footer />
            <MobileNav />
          </div>
        </Providers>
      </body>
    </html>
  );
}
