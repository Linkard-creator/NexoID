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
      {/* Menu de opções */}
      {open && (
        <div className="glass-strong rounded-2xl p-2 shadow-2xl shadow-slate-900/15 min-w-[220px] animate-in fade-in slide-in-from-bottom-2 duration-200">
          <Link
            href="/adquirir-nexoid"
            onClick={() => setOpen(false)}
            className="flex items-center gap-3 px-4 py-3.5 rounded-xl hover:bg-white/80 transition-colors group"
          >
            <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
              <CreditCard className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-900">Adquirir NexoID</p>
              <p className="text-xs text-slate-500">Cartão NFC · R$ 179,90</p>
            </div>
          </Link>

          <div className="h-px bg-slate-200/60 mx-2" />

          <Link
            href="/apoiar-nexoid"
            onClick={() => setOpen(false)}
            className="flex items-center gap-3 px-4 py-3.5 rounded-xl hover:bg-white/80 transition-colors group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-rose-500 to-pink-600 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
              <Heart className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-900">Apoiar NexoID</p>
              <p className="text-xs text-slate-500">Evolução · R$ 29,00</p>
            </div>
          </Link>
        </div>
      )}

      {/* Botão principal */}
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className={`
          flex items-center gap-3 rounded-full px-5 py-4
          font-semibold text-white shadow-2xl shadow-slate-900/30
          transition-all duration-300
          hover:scale-105 active:scale-95
          ${open
            ? "bg-slate-700"
            : "bg-slate-900 hover:bg-slate-800"
          }
        `}
        aria-expanded={open}
        aria-label={open ? "Fechar opções" : "Abrir opções de compra"}
      >
        {open ? (
          <>
            <X className="w-5 h-5" />
            <span className="hidden sm:inline">Fechar</span>
          </>
        ) : (
          <>
            <div className="relative">
              <Sparkles className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-400 rounded-full animate-pulse" />
            </div>
            <span className="hidden sm:inline">NexoID</span>
          </>
        )}
      </button>
    </div>
  );
}
