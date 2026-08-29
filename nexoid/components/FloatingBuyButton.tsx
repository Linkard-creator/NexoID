"use client";

import Link from "next/link";
import { CreditCard } from "lucide-react";

export function FloatingBuyButton() {
  return (
    <Link href="/adquirir-nexoid" className="floating-buy-btn group">
      <div className="relative">
        <CreditCard className="w-5 h-5" />
        <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-400 rounded-full animate-pulse" />
      </div>
      <span className="hidden sm:inline">Adquirir NexoID</span>
      <span className="sm:hidden">Cartão</span>
    </Link>
  );
}
