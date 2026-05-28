import type React from "react"
import { cn } from "@/lib/utils"

interface LupoCardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "base" | "electric" | "circuit" | "holographic" | "data" | "status"
  status?: "success" | "warning" | "error" | "active"
  hover?: boolean
}

export function LupoCard({ variant = "base", status, hover = true, className, children, ...props }: LupoCardProps) {
  const baseClasses =
    "rounded-xl p-6 transition-all duration-200 ease-in-out relative overflow-hidden"

  const hoverClasses = hover
    ? "hover:scale-[1.02] hover:shadow-hover cursor-pointer"
    : ""

  const variantClasses = {
    base: "bg-black/40 backdrop-blur-sm border border-white/10 card-shadow",
    electric: "bg-electric-primary/10 backdrop-blur-sm border-l-4 border-l-electric-primary border border-electric-primary/20 electric-glow",
    circuit: "bg-black/40 backdrop-blur-sm border border-white/10 card-shadow",
    holographic: "bg-black/30 backdrop-blur-sm border border-white/10 card-shadow",
    data: "bg-black/40 backdrop-blur-sm border border-dashed border-white/20 card-shadow",
    status: `bg-black/40 backdrop-blur-sm card-shadow ${
      status === "success"
        ? "border-l-4 border-l-success border border-success/20"
        : status === "warning"
          ? "border-l-4 border-l-warning border border-warning/20"
          : status === "error"
            ? "border-l-4 border-l-error border border-error/20"
            : status === "active"
              ? "border-l-4 border-l-electric-primary border border-electric-primary/20 electric-glow"
              : "border border-white/10"
    }`,
  }

  return (
    <div className={cn(baseClasses, hoverClasses, variantClasses[variant], className)} {...props}>
      {/* Grid pattern for circuit variant */}
      {variant === "circuit" && (
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage: `
              linear-gradient(90deg, rgba(255,255,255,0.2) 1px, transparent 1px),
              linear-gradient(rgba(255,255,255,0.2) 1px, transparent 1px)
            `,
            backgroundSize: "20px 20px",
          }}
        />
      )}

      {/* Holographic shimmer effect */}
      {variant === "holographic" && (
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12 animate-shimmer pointer-events-none"
        />
      )}

      {/* Data grid overlay */}
      {variant === "data" && (
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.4) 1px, transparent 1px)",
            backgroundSize: "8px 8px",
          }}
        />
      )}

      {children}
    </div>
  )
}
