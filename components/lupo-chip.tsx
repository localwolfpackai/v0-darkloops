import type React from "react"
import { cn } from "@/lib/utils"

interface LupoChipProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "active" | "electric" | "technical" | "success" | "warning"
  size?: "sm" | "md"
  /** Optional leading icon. Pass a lucide icon sized to match (e.g. w-3 h-3). */
  icon?: React.ReactNode
}

export function LupoChip({
  variant = "default",
  size = "md",
  icon,
  className,
  children,
  ...props
}: LupoChipProps) {
  const baseClasses =
    "inline-flex items-center gap-1.5 rounded-lg font-medium transition-all duration-200 ease-in-out"

  const sizeClasses = {
    sm: "px-2 py-0.5 text-xs",
    md: "px-3 py-1 text-sm",
  }

  const variantClasses = {
    default: "bg-black/40 border border-white/15 text-white/90",
    active: "bg-accent-blue/15 border border-accent-blue/60 text-accent-blue",
    electric: "bg-electric-primary/15 border border-electric-primary/60 text-electric-primary",
    technical: "bg-black/30 border border-dashed border-white/25 text-white/75 font-mono",
    success: "bg-success/15 border border-success/60 text-success",
    warning: "bg-warning/15 border border-warning/60 text-warning",
  }

  return (
    <span className={cn(baseClasses, sizeClasses[size], variantClasses[variant], className)} {...props}>
      {icon && (
        <span className="inline-flex shrink-0" aria-hidden="true">
          {icon}
        </span>
      )}
      {children}
    </span>
  )
}
