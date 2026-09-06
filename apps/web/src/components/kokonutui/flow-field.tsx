"use client";

/**
 * @name: FlowField
 * @description: Canvas particle flow field — organic noise-driven dust motes of glowing light.
 * @version: 2.0.0 (portfolio edition — "dust" theme samples actual design tokens)
 * @author: @dorian_baffier (original), extended for Samritha portfolio
 * @license: MIT
 */

import type { ReactNode } from "react";
import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

// ─── Types ────────────────────────────────────────────────────────────────────

type ColorTheme = "aurora" | "ember" | "ocean" | "mystic" | "dust";
type ParticleDensity = "whisper" | "sparse" | "medium" | "dense";

interface Particle {
  x: number;
  y: number;
  speed: number;
  // Instead of a single hue, we pick from a small palette of RGBA strings
  colorIdx: number;
  life: number;
  maxLife: number;
}

interface ThemeConfig {
  /** CSS rgb(...) string for canvas background — no alpha */
  bg: string;
  /** How quickly the trail fades each frame — lower = longer, ghostlier trails */
  trailAlpha: number;
  /** HSLA color stops to sample from (palette-sourced) */
  colors: string[];
  /** Pixel radius of each dust mote */
  radius: number;
  /** Base speed multiplier */
  baseSpeed: number;
}

export interface FlowFieldProps {
  className?: string;
  children?: ReactNode;
  theme?: ColorTheme;
  density?: ParticleDensity;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const PARTICLE_COUNTS: Record<ParticleDensity, number> = {
  whisper: 160,
  sparse: 500,
  medium: 1100,
  dense: 2000,
} as const;

const THEMES: Record<ColorTheme, ThemeConfig> = {
  aurora: {
    bg: "5, 5, 8",
    trailAlpha: 0.06,
    colors: [
      "hsla(160, 80%, 62%, {a})",
      "hsla(200, 75%, 60%, {a})",
      "hsla(270, 70%, 68%, {a})",
    ],
    radius: 1.3,
    baseSpeed: 1.0,
  },
  ember: {
    bg: "8, 4, 2",
    trailAlpha: 0.07,
    colors: [
      "hsla(10, 95%, 58%, {a})",
      "hsla(30, 90%, 55%, {a})",
      "hsla(50, 85%, 60%, {a})",
    ],
    radius: 1.3,
    baseSpeed: 1.0,
  },
  ocean: {
    bg: "2, 6, 10",
    trailAlpha: 0.06,
    colors: [
      "hsla(190, 80%, 58%, {a})",
      "hsla(210, 75%, 60%, {a})",
      "hsla(230, 70%, 65%, {a})",
    ],
    radius: 1.3,
    baseSpeed: 1.0,
  },
  mystic: {
    bg: "44, 52, 54",
    trailAlpha: 0.08,
    colors: [
      "hsla(42, 55%, 52%, {a})",
      "hsla(48, 50%, 48%, {a})",
      "hsla(38, 45%, 50%, {a})",
    ],
    radius: 1.3,
    baseSpeed: 1.0,
  },
  // ── "dust" ────────────────────────────────────────────────────────────────
  // Palette-accurate soft motes: antique gold, sage, dusk blue.
  // Deliberately thinned down: half speed, smaller radius, long ghostly trails,
  // very low peak alpha — reads as candlelight dust, not a generative demo.
  dust: {
    bg: "44, 52, 54",          // Weathered Pewter #2C3436
    trailAlpha: 0.045,          // slower fade → longer, hazier trails
    colors: [
      // Antique gold — #C9A96E  ~  hsl(38 53% 61%) — weighted 50 %
      "hsla(38,  48%, 58%, {a})",
      "hsla(42,  44%, 55%, {a})",
      // Sage drift — #91967A  ~  hsl(70 12% 52%) — weighted 30 %
      "hsla(72,  14%, 50%, {a})",
      "hsla(68,  11%, 48%, {a})",
      // Dusk blue  — #607785  ~  hsl(205 16% 45%) — weighted 20 %
      "hsla(205, 18%, 44%, {a})",
    ],
    radius: 1.1,
    baseSpeed: 0.48,            // noticeably slower than stock mystic
  },
} as const;

// ─── Noise / vector-field ─────────────────────────────────────────────────────

/**
 * Multi-octave trigonometric noise — returns an angle (radians) for position + time.
 * The `dust` theme passes a slower time increment so the field evolves lazily.
 */
function fieldAngle(x: number, y: number, t: number): number {
  const s = 0.0025;
  return (
    Math.sin(x * s + t * 0.0007) * Math.PI +
    Math.cos(y * s + t * 0.0005) * Math.PI +
    Math.sin((x + y) * s * 0.6 + t * 0.0009) * Math.PI * 0.6 +
    Math.cos((x - y) * s * 0.4 + t * 0.0006) * Math.PI * 0.4
  );
}

/** Resolve a color template, substituting `{a}` with the actual alpha value. */
function resolveColor(template: string, alpha: number): string {
  return template.replace("{a}", alpha.toFixed(3));
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function FlowField({
  className,
  children,
  theme = "aurora",
  density = "medium",
}: FlowFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const cfg = THEMES[theme];
    const count = PARTICLE_COUNTS[density];
    const dpr = window.devicePixelRatio ?? 1;

    // Dust theme ticks time at a fraction of normal speed → lazier field drift
    const timeScale = theme === "dust" ? 0.45 : 1.0;

    let width = 0;
    let height = 0;
    let animId = 0;
    let time = 0;
    let particles: Particle[] = [];

    const spawnParticle = (): Particle => {
      const maxLife = 280 + Math.floor(Math.random() * 420);
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        speed: cfg.baseSpeed * (0.7 + Math.random() * 0.9),
        colorIdx: Math.floor(Math.random() * cfg.colors.length),
        life: Math.floor(Math.random() * maxLife),
        maxLife,
      };
    };

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);

      ctx.fillStyle = `rgb(${cfg.bg})`;
      ctx.fillRect(0, 0, width, height);

      particles = Array.from({ length: count }, spawnParticle);
    };

    const render = () => {
      time += timeScale;

      // Fade trail — lower alpha = longer, more ethereal persistence
      ctx.fillStyle = `rgba(${cfg.bg}, ${cfg.trailAlpha})`;
      ctx.fillRect(0, 0, width, height);

      for (const p of particles) {
        const angle = fieldAngle(p.x, p.y, time);

        p.x += Math.cos(angle) * p.speed;
        p.y += Math.sin(angle) * p.speed;
        p.life++;

        if (p.life > p.maxLife) {
          p.x = Math.random() * width;
          p.y = Math.random() * height;
          p.life = 0;
          p.colorIdx = Math.floor(Math.random() * cfg.colors.length);
          continue;
        }

        // Wrap edges
        if (p.x < 0) p.x += width;
        else if (p.x > width) p.x -= width;
        if (p.y < 0) p.y += height;
        else if (p.y > height) p.y -= height;

        // Fade in / out over lifetime — dust theme caps peak alpha much lower
        const progress = p.life / p.maxLife;
        const fadeIn  = Math.min(progress * 6, 1);
        const fadeOut = Math.min((1 - progress) * 5, 1);
        const peakAlpha = theme === "dust" ? 0.32 : 0.88;
        const alpha = fadeIn * fadeOut * peakAlpha;

        ctx.beginPath();
        ctx.arc(p.x, p.y, cfg.radius, 0, Math.PI * 2);
        ctx.fillStyle = resolveColor(cfg.colors[p.colorIdx], alpha);
        ctx.fill();
      }

      animId = requestAnimationFrame(render);
    };

    resize();
    window.addEventListener("resize", resize);
    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, [theme, density]);

  const bgColor = THEMES[theme].bg;

  return (
    <div
      className={cn(
        "relative flex w-full items-center justify-center overflow-hidden",
        className
      )}
      style={{ background: `rgb(${bgColor})` }}
    >
      <canvas
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        ref={canvasRef}
      />

      {/* Radial vignette — keeps the centre legible */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background: `radial-gradient(ellipse 70% 60% at 50% 50%, transparent 25%, rgba(${bgColor}, 0.88) 100%)`,
        }}
      />

      {/* Top / bottom fade into section colour */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-32"
        style={{ background: `linear-gradient(to bottom, rgb(${bgColor}), transparent)` }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-32"
        style={{ background: `linear-gradient(to top, rgb(${bgColor}), transparent)` }}
      />

      {children}
    </div>
  );
}
