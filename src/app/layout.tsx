import type { Metadata } from "next";
import { Inter, Roboto_Mono } from "next/font/google"; // Removed Link, Image
import "@/styles/globals.css";
import { CTAManagerProvider } from "@/components/CTAManager";
import ApiDebugger from "@/components/ApiDebugger";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const robotoMono = Roboto_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-roboto-mono",
});

export const metadata: Metadata = {
  title: "VICTO AI - AI Security Solutions",
  description: "Comprehensive security solutions for AI/LLM applications, protecting enterprises from emerging threats and vulnerabilities.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <html lang="en" className={`${inter.variable} ${robotoMono.variable}`}>
      <body className="min-h-screen bg-background text-foreground antialiased overflow-x-hidden selection:bg-primary/30 selection:text-primary-foreground">
        <CTAManagerProvider>
          <Navbar />
          <main className="pt-20 min-h-screen relative z-10">
            {children}
          </main>
          {process.env.NODE_ENV === 'development' && <ApiDebugger />}
          <Footer />
        </CTAManagerProvider>
      </body>
    </html>
  );
}