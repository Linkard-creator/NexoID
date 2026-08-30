"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { CreditCard, Heart, X, Sparkles } from "lucide-react";

export function FloatingBuyButton() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  return (
    <div ref={menuRef} className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {open && (
        <div className="glass-strong min-w-[220px] rounded-2xl p-2 shadow-[0_0_28px_rgba(168,85,247,0.3)] animate-in fade-in slide-in-from-bottom-2 duration-200">
          <Link href="/adquirir-nexoid" onClick={() => setOpen(false)} className="group flex items-center gap-3 rounded-xl px-4 py-3.5 transition-colors hover:bg-violet-500/10">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 shadow-[0_0_18px_rgba(168,85,247,0.4)] transition-transform group-hover:scale-105">
              <CreditCard className="h-5 w-5 text-white" />
            </div>
            <div>
              <p className="text-sm font-semibold text-white">Adquirir NexoID</p>
              <p className="text-xs text-violet-100/60">Cartão NFC · R$ 179,90</p>
            </div>
          </Link>

          <div className="mx-2 my-1 h-px bg-violet-300/15" />

          <Link href="/apoiar-nexoid" onClick={() => setOpen(false)} className="group flex items-center gap-3 rounded-xl px-4 py-3.5 transition-colors hover:bg-red-500/10">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-red-500 to-pink-600 shadow-[0_0_18px_rgba(239,68,68,0.35)] transition-transform group-hover:scale-105">
              <Heart className="h-5 w-5 text-white" />
            </div>
            <div>
              <p className="text-sm font-semibold text-white">Apoiar NexoID</p>
              <p className="text-xs text-violet-100/60">Evolução · R$ 29,00</p>
            </div>
          </Link>
        </div>
      )}

      <button type="button" onClick={() => setOpen(!open)} className={`flex items-center gap-3 rounded-full px-5 py-4 font-semibold text-white shadow-[0_0_28px_rgba(168,85,247,0.35)] transition-all duration-300 hover:scale-105 active:scale-95 ${open ? "bg-violet-700/80" : "bg-gradient-to-r from-violet-500 to-fuchsia-600"}`} aria-expanded={open} aria-label={open ? "Fechar opções" : "Abrir opções de compra"}>
        {open ? (
          <>
            <X className="h-5 w-5" />
            <span className="hidden sm:inline">Fechar</span>
          </>
        ) : (
          <>
            <div className="relative">
              <Sparkles className="h-5 w-5" />
              <span className="absolute -right-1 -top-1 h-2.5 w-2.5 animate-pulse rounded-full bg-emerald-400" />
            </div>
            <span className="hidden sm:inline">NexoID</span>
          </>
        )}
      </button>
    </div>
  );
}
