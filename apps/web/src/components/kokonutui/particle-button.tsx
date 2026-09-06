"use client";

import React, { useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";

interface ParticleButtonProps
  extends React.ComponentPropsWithoutRef<typeof motion.button> {
  children: React.ReactNode;
  onSuccess?: () => void;
  successDuration?: number;
  className?: string;
  variant?: "gold" | "primary";
}

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
}

export function ParticleButton({
  children,
  onClick,
  onSuccess,
  successDuration = 800,
  className,
  variant = "gold",
  ...props
}: ParticleButtonProps) {
  const [particles, setParticles] = useState<Particle[]>([]);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const triggerParticles = () => {
    const newParticles: Particle[] = Array.from({ length: 12 }).map((_, i) => ({
      id: Date.now() + i,
      x: (Math.random() - 0.5) * 120,
      y: (Math.random() - 0.8) * 90,
      size: Math.random() * 4 + 2,
    }));
    setParticles(newParticles);

    setTimeout(() => {
      setParticles([]);
    }, successDuration);
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    triggerParticles();
    if (onClick) onClick(e);
    if (onSuccess) onSuccess();
  };

  return (
    <div className="relative inline-block">
      <motion.button
        ref={buttonRef}
        suppressHydrationWarning
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.96 }}
        onClick={handleClick}
        className={cn(
          "relative z-10 px-6 py-2.5 rounded-full font-medium text-sm transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-sm",
          variant === "gold"
            ? "border border-[var(--accent-gold)] text-[var(--accent-gold)] hover:bg-[var(--accent-gold)]/10 hover:shadow-[0_0_20px_var(--gold-glow)]"
            : "bg-[var(--accent-primary)] text-white border border-[var(--accent-gold)]/30 hover:brightness-110",
          className
        )}
        {...props}
      >
        {children}
      </motion.button>

      {/* Particle Explosions */}
      <AnimatePresence>
        {particles.map((p) => (
          <motion.span
            key={p.id}
            initial={{ opacity: 1, scale: 0, x: 0, y: 0 }}
            animate={{
              opacity: [1, 0.8, 0],
              scale: [0, 1.2, 0.4],
              x: p.x,
              y: p.y,
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            style={{ width: p.size, height: p.size }}
            className="absolute top-1/2 left-1/2 rounded-full pointer-events-none bg-[var(--accent-gold)] shadow-[0_0_6px_var(--accent-gold)] z-20"
          />
        ))}
      </AnimatePresence>
    </div>
  );
}
