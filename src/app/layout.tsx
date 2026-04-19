import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { Navigation } from "@/components/navigation";
import { TooltipProvider } from "@/components/ui/tooltip";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TheHunter: CoTW バックパックシミュレーター",
  description: "The Hunter: Call of the Wild の装備重量シミュレーター",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className={`${geist.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-stone-950 text-stone-100">
        <TooltipProvider>
          <Navigation />
          <main className="flex-1">{children}</main>
        </TooltipProvider>
      </body>
    </html>
  );
}
