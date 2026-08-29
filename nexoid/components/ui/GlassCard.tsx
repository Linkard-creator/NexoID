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
        "rounded-2xl p-6",
        hover && "transition-all duration-300 hover:shadow-xl hover:bg-white/80",
        className
      )}
    >
      {children}
    </div>
  );
}
