"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { motion, HTMLMotionProps } from "motion/react";

export interface KokonutButtonProps extends HTMLMotionProps<"button"> {
  variant?: "primary" | "secondary" | "gold" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
}

export const KokonutButton = React.forwardRef<HTMLButtonElement, KokonutButtonProps>(
  ({ className, variant = "primary", size = "md", children, ...props }, ref) => {
    const sizeClasses = {
      sm: "px-3.5 py-1.5 text-xs font-medium rounded-full",
      md: "px-5 py-2.5 text-sm font-medium rounded-full",
      lg: "px-7 py-3 text-base font-semibold rounded-full",
    };

    const variantClasses = {
      primary:
        "bg-[var(--accent-primary)] text-white hover:brightness-110 shadow-md hover:shadow-lg border border-[var(--accent-gold)]/20",
      secondary:
        "bg-[var(--bg-elevated)] text-[var(--text-primary)] hover:border-[var(--accent-gold)]/60 border border-[var(--border-subtle)]",
      gold:
        "bg-transparent text-[var(--accent-gold)] border border-[var(--accent-gold)] hover:bg-[var(--accent-gold)]/10 hover:shadow-[0_0_15px_var(--gold-glow)]",
      outline:
        "bg-transparent text-[var(--text-primary)] border border-[var(--border-subtle)] hover:border-[var(--accent-gold)]/50 hover:bg-[var(--bg-elevated)]/40",
      ghost:
        "bg-transparent text-[var(--text-primary)] hover:bg-[var(--bg-elevated)]/30 hover:text-[var(--accent-gold)]",
    };

    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.97 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
        className={cn(
          "inline-flex items-center justify-center gap-2 cursor-pointer transition-all duration-200 select-none",
          sizeClasses[size],
          variantClasses[variant],
          className
        )}
        {...props}
      >
        {children}
      </motion.button>
    );
  }
);

KokonutButton.displayName = "KokonutButton";
