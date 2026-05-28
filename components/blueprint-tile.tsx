import type React from "react"
import { cn } from "@/lib/utils"

interface BlueprintTileProps extends React.HTMLAttributes<HTMLDivElement> {
  icon?: React.ReactNode
  title: string
  description: string
  label?: string
}

export function BlueprintTile({ icon, title, description, label, className, ...props }: BlueprintTileProps) {
  return (
    <div
      className={cn(
        "relative p-6 rounded-xl bg-black/40 backdrop-blur-sm border border-white/10 card-shadow hover:scale-[1.02] hover:border-white/20 hover:shadow-hover transition-all duration-200 ease-in-out cursor-pointer group",
        className,
      )}
      {...props}
    >
      {/* Subtle dot-grid texture */}
      <div
        aria-hidden="true"
        className="absolute inset-0 rounded-xl opacity-[0.04] group-hover:opacity-[0.07] transition-opacity duration-200 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.4) 1px, transparent 1px)",
          backgroundSize: "16px 16px",
        }}
      />

      {/* Icon */}
      {icon && (
        <div
          aria-hidden="true"
          className="w-12 h-12 rounded-xl bg-accent-blue/10 border border-accent-blue/25 flex items-center justify-center mb-4 text-accent-blue group-hover:bg-accent-blue/20 group-hover:border-accent-blue/40 transition-all duration-200"
        >
          {icon}
        </div>
      )}

      {/* Content */}
      <div className="relative z-10">
        <h3 className="font-display text-base font-semibold text-white mb-2 leading-snug">{title}</h3>
        <p className="text-white/60 text-sm mb-4 leading-relaxed">{description}</p>

        {/* Technical label */}
        {label && (
          <div className="font-mono text-xs text-white/50 bg-black/30 px-2 py-1 rounded-lg border border-white/10 inline-block tracking-wide">
            {label}
          </div>
        )}
      </div>
    </div>
  )
}
