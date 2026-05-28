import type React from "react"
import { cn } from "@/lib/utils"

interface LupoButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "electric" | "neon" | "blueprint" | "holographic" | "power"
  size?: "sm" | "md" | "lg"
  isActive?: boolean
  isLoading?: boolean
}

function Spinner({ className }: { className?: string }) {
  return (
    <svg
      className={cn("animate-spin-slow", className)}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
      />
    </svg>
  )
}

export function LupoButton({
  variant = "primary",
  size = "md",
  isActive = false,
  isLoading = false,
  className,
  children,
  disabled,
  ...props
}: LupoButtonProps) {
  const baseClasses =
    "inline-flex items-center justify-center gap-2 font-medium transition-all duration-200 ease-in-out focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-electric-primary disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none relative overflow-hidden select-none"

  const sizeClasses = {
    sm: "px-3 py-1.5 text-sm rounded-lg",
    md: "px-5 py-2.5 text-base rounded-xl",
    lg: "px-8 py-3.5 text-lg rounded-xl",
  }

  const spinnerSizeClasses = {
    sm: "w-3 h-3",
    md: "w-4 h-4",
    lg: "w-5 h-5",
  }

  const variantClasses = {
    primary:
      "electric-blue-gradient border border-white/20 text-background-dark hover:shadow-lg hover:scale-[1.02] blue-glow",
    secondary:
      "bg-black/40 border border-white/20 text-white hover:border-white/40 hover:bg-black/60 hover:scale-[1.02]",
    electric:
      "bg-electric-primary text-white blue-glow hover:scale-[1.02] hover:brightness-110",
    neon:
      "electric-gradient neon-glow border border-white/30 text-background-dark hover:scale-[1.02]",
    blueprint:
      "bg-transparent border border-dashed border-white/25 text-white/80 hover:border-white/60 hover:text-white hover:scale-[1.02] relative",
    holographic:
      "bg-black/30 border border-white/20 text-white hover:bg-black/50 hover:scale-[1.02] relative overflow-hidden",
    power: isActive
      ? "bg-electric-primary text-white blue-glow hover:scale-[1.02]"
      : "bg-transparent border border-white/20 text-white/60 hover:border-white/40 hover:text-white/80 hover:scale-[1.02]",
  }

  return (
    <button
      className={cn(baseClasses, sizeClasses[size], variantClasses[variant], className)}
      disabled={disabled || isLoading}
      aria-busy={isLoading}
      {...props}
    >
      {/* Shimmer effect */}
      {variant === "holographic" && (
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer pointer-events-none" aria-hidden="true" />
      )}

      {/* Loading spinner */}
      {isLoading && <Spinner className={spinnerSizeClasses[size]} />}

      <span className={cn(isLoading && "opacity-70")}>{children}</span>
    </button>
  )
}
