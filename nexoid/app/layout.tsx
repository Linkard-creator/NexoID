import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { FloatingBuyButton } from "@/components/FloatingBuyButton";
import { Providers } from "@/components/Providers";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

function ThemeScript() {
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `
          (() => {
            try {
              const saved = localStorage.getItem('nexoid-theme');
              const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
              const theme = saved === 'light' || saved === 'dark' ? saved : (systemDark ? 'dark' : 'light');
              document.documentElement.setAttribute('data-theme', theme);
              document.documentElement.style.colorScheme = theme;
            } catch (e) {}
          })();
        `,
      }}
    />
  );
}

export const metadata: Metadata = {
  title: "NexoID — Sua Identidade Digital Consistente",
  description:
    "Crie sua identidade digital única. Networking inteligente com cartões NFC NexoID. Links, QR Code e presença profissional em um só lugar.",
  keywords: [
    "NexoID",
    "Linktree",
    "identidade digital",
    "NFC",
    "networking",
    "cartão de visita digital",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <ThemeScript />
      </head>
      <body className={`${inter.variable} font-sans`}>
        <Providers>
          {children}
          <FloatingBuyButton />
        </Providers>
      </body>
    </html>
  );
}
