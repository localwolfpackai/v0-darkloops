import type { LucideIcon } from "lucide-react"
import { SectionHeader } from "./section-header"
import { AgentNote } from "./agent-note"
import { effects, sectionHeaders, type EffectType } from "@/lib/content"

interface EffectCardProps {
  title: string
  description: string
  effectType: EffectType
  icon: LucideIcon
}

function EffectCard({ title, description, effectType, icon: Icon }: EffectCardProps) {
  return (
    <div className="relative p-6 rounded-xl bg-white/[0.02] backdrop-blur-sm border border-white/[0.06] hover:border-white/[0.12] hover:bg-white/[0.04] transition-all duration-200 ease-in-out cursor-default group">
      {/* Effects */}
      {effectType === "shimmer" && (
        <div aria-hidden="true" className="absolute inset-0 rounded-xl overflow-hidden pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.04] to-transparent animate-shimmer" />
        </div>
      )}

      {effectType === "circuit" && (
        <div aria-hidden="true" className="absolute inset-0 rounded-xl overflow-hidden pointer-events-none">
          <svg className="absolute inset-0 w-full h-full opacity-30" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path
              d="M0,50 L25,50 L30,45 L35,55 L40,45 L45,55 L50,50 L75,50 L80,25 L85,75 L90,25 L95,75 L100,50"
              stroke="currentColor"
              strokeWidth="0.5"
              fill="none"
              className="text-electric-primary animate-circuit-draw"
            />
          </svg>
        </div>
      )}

      {effectType === "matrix" && (
        <div
          aria-hidden="true"
          className="absolute inset-0 rounded-xl opacity-[0.05] animate-matrix-pulse pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(circle, currentColor 1px, transparent 1px)",
            backgroundSize: "14px 14px",
          }}
        />
      )}

      {effectType === "glow" && (
        <div aria-hidden="true" className="absolute inset-0 rounded-xl bg-electric-primary/[0.03] pointer-events-none" />
      )}

      {/* Icon */}
      <div
        aria-hidden="true"
        className="w-10 h-10 rounded-lg bg-electric-primary/10 border border-electric-primary/20 flex items-center justify-center mb-4 text-electric-primary group-hover:bg-electric-primary/15 transition-colors duration-200"
      >
        <Icon className="w-5 h-5" />
      </div>

      {/* Content */}
      <div className="relative z-10">
        <h3 className="font-medium text-white mb-1.5">{title}</h3>
        <p className="text-white/50 text-sm leading-relaxed">{description}</p>
      </div>
    </div>
  )
}

export function EffectShowcase() {
  return (
    <div className="space-y-8">
      <SectionHeader {...sectionHeaders.effects} />

      <AgentNote section="effects" />

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {effects.map((effect) => (
          <EffectCard
            key={effect.title}
            title={effect.title}
            description={effect.description}
            effectType={effect.effectType}
            icon={effect.icon}
          />
        ))}
      </div>
    </div>
  )
}
