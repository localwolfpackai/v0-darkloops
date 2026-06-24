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

/** Renders the effect-specific animated visual that fills the preview stage. */
function EffectStage({ effectType, Icon }: { effectType: EffectType; Icon: LucideIcon }) {
  return (
    <div
      aria-hidden="true"
      className="relative h-28 w-full overflow-hidden rounded-lg border border-white/[0.06] bg-black/40"
    >
      {/* Soft Glow — breathing radial pulse with an orbiting accent ring */}
      {effectType === "glow" && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="absolute h-24 w-24 rounded-full bg-electric-primary/30 blur-2xl animate-glow-breathe" />
          <div className="absolute h-20 w-20 animate-glow-orbit">
            <span className="absolute left-1/2 top-0 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-electric-primary shadow-[0_0_8px_2px_rgba(69,163,255,0.7)]" />
          </div>
        </div>
      )}

      {/* Light Sweep — repeating diagonal shimmer over a faint grid */}
      {effectType === "shimmer" && (
        <div className="absolute inset-0">
          <div
            className="absolute inset-0 opacity-[0.06]"
            style={{
              backgroundImage:
                "linear-gradient(to right, rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.4) 1px, transparent 1px)",
              backgroundSize: "20px 20px",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-electric-primary/25 to-transparent animate-shimmer" />
        </div>
      )}

      {/* Line Drawing — flowing circuit traces with pulsing nodes */}
      {effectType === "circuit" && (
        <svg className="absolute inset-0 h-full w-full" viewBox="0 0 200 100" preserveAspectRatio="none">
          <path
            d="M0,70 L40,70 L55,45 L95,45 L110,70 L150,70 L165,30 L200,30"
            stroke="currentColor"
            strokeWidth="1"
            fill="none"
            className="text-electric-primary/30"
          />
          <path
            d="M0,70 L40,70 L55,45 L95,45 L110,70 L150,70 L165,30 L200,30"
            stroke="currentColor"
            strokeWidth="1.5"
            fill="none"
            className="text-electric-primary animate-circuit-flow"
          />
          <circle cx="55" cy="45" r="2.5" className="fill-electric-primary animate-circuit-pulse" />
          <circle cx="110" cy="70" r="2.5" className="fill-electric-secondary animate-circuit-pulse" />
          <circle cx="165" cy="30" r="2.5" className="fill-electric-primary animate-circuit-pulse" />
        </svg>
      )}

      {/* Dot Grid — pulsing dot texture with a falling rain shimmer */}
      {effectType === "matrix" && (
        <div className="absolute inset-0">
          <div
            className="absolute inset-0 animate-matrix-pulse text-electric-primary"
            style={{
              backgroundImage: "radial-gradient(circle, currentColor 1.2px, transparent 1.2px)",
              backgroundSize: "14px 14px",
              opacity: 0.18,
            }}
          />
          <div
            className="absolute inset-0 animate-matrix-rain"
            style={{
              backgroundImage:
                "linear-gradient(to bottom, transparent 0%, rgba(69,163,255,0.18) 45%, transparent 55%)",
              backgroundSize: "100% 28px",
            }}
          />
        </div>
      )}

      {/* Centered icon badge floating above the effect */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-electric-primary/30 bg-background-dark/70 text-electric-primary backdrop-blur-sm">
          <Icon className="h-5 w-5" />
        </div>
      </div>
    </div>
  )
}

function EffectCard({ title, description, effectType, icon: Icon }: EffectCardProps) {
  return (
    <div className="group relative flex flex-col gap-4 rounded-xl border border-white/[0.06] bg-white/[0.02] p-5 backdrop-blur-sm transition-all duration-300 ease-out hover:-translate-y-1 hover:border-electric-primary/30 hover:bg-white/[0.04] hover:shadow-[0_12px_40px_-16px_rgba(69,163,255,0.45)]">
      <EffectStage effectType={effectType} Icon={Icon} />

      <div className="relative z-10 space-y-1.5">
        <div className="flex items-center justify-between gap-2">
          <h3 className="font-medium text-white">{title}</h3>
          <span className="rounded-full border border-electric-primary/20 bg-electric-primary/10 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wide text-electric-primary">
            {effectType}
          </span>
        </div>
        <p className="text-sm leading-relaxed text-white/50">{description}</p>
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
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
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
