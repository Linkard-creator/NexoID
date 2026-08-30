"use client";

import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("nexoid-theme");
    const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const current = stored === "light" || stored === "dark" ? stored : systemDark ? "dark" : "light";

    setTheme(current);
    document.documentElement.setAttribute("data-theme", current);
    document.documentElement.style.colorScheme = current;
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    document.documentElement.setAttribute("data-theme", nextTheme);
    document.documentElement.style.colorScheme = nextTheme;
    localStorage.setItem("nexoid-theme", nextTheme);
  };

  if (!mounted) return null;

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={theme === "dark" ? "Ativar tema claro" : "Ativar tema escuro"}
      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-violet-300/25 bg-white/70 text-violet-700 shadow-[0_0_20px_rgba(168,85,247,0.12)] transition-all hover:scale-[1.03] hover:bg-white dark:bg-slate-900/60 dark:text-violet-100"
    >
      {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </button>
  );
}
