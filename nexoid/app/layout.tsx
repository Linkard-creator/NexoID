import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { FloatingBuyButton } from "@/components/FloatingBuyButton";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "NexoID — Sua Identidade Digital Consistente",
  description:
    "Crie sua identidade digital única. Networking inteligente com cartões NFC NexoID. Links, QR Code e presença profissional em um só lugar.",
  keywords: ["NexoID", "Linktree", "identidade digital", "NFC", "networking", "cartão de visita digital"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${inter.variable} font-sans`}>
        {children}
        <FloatingBuyButton />
      </body>
    </html>
  );
}
