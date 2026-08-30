import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  variant?: "default" | "strong" | "subtle";
  hover?: boolean;
}

export function GlassCard({
  children,
  className,
  variant = "default",
  hover = true,
}: GlassCardProps) {
  const variants = {
    default: "glass",
    strong: "glass-strong",
    subtle: "glass-subtle",
  };

  return (
    <div
      className={cn(
        variants[variant],
        "rounded-2xl p-6 text-slate-100",
        hover && "transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_32px_rgba(168,85,247,0.28)]",
        className
      )}
    >
      {children}
    </div>
  );
}
