"use client";

import React from "react";
import { motion, HTMLMotionProps } from "motion/react";
import { cn } from "@/lib/utils";

export interface KokonutCardProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  glow?: boolean;
}

export function KokonutCard({
  children,
  className,
  glow = false,
  ...props
}: KokonutCardProps) {
  return (
    <motion.div
      whileHover={{ y: -3 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className={cn(
        "relative rounded-2xl p-6 bg-[var(--card-surface)] backdrop-blur-md border border-[var(--border-subtle)] transition-all duration-300",
        glow && "hover:border-[var(--accent-gold)]/60 hover:shadow-[0_4px_30px_var(--gold-glow)]",
        className
      )}
      {...props}
    >
      {/* Subtle gold hairline corner highlight */}
      <div className="absolute top-0 right-0 w-16 h-[1px] bg-gradient-to-l from-[var(--accent-gold)]/40 to-transparent pointer-events-none" />
      <div className="absolute top-0 right-0 w-[1px] h-16 bg-gradient-to-b from-[var(--accent-gold)]/40 to-transparent pointer-events-none" />
      {children}
    </motion.div>
  );
}
