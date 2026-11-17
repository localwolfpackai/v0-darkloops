import type { CSSProperties } from "react"
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

const DOT_COLUMNS = 16
const DOT_ROWS = 8

/** Dots fade from 0.6 at the center to 0.15 at the edges, with pulse delays staggered by distance. */
const matrixDots = Array.from({ length: DOT_COLUMNS * DOT_ROWS }, (_, index) => {
  const col = index % DOT_COLUMNS
  const row = Math.floor(index / DOT_COLUMNS)
  const dx = (col - (DOT_COLUMNS - 1) / 2) / ((DOT_COLUMNS - 1) / 2)
  const dy = (row - (DOT_ROWS - 1) / 2) / ((DOT_ROWS - 1) / 2)
  const distance = Math.min(1, Math.hypot(dx, dy) / Math.SQRT2)
  return {
    opacity: Number((0.6 - 0.45 * distance).toFixed(2)),
    delay: `${(distance * 1.2).toFixed(2)}s`,
  }
})

const circuitMask: CSSProperties = {
  maskImage:
    "radial-gradient(circle at center, transparent 28px, black 32px), linear-gradient(to right, transparent, black 14%, black 86%, transparent)",
  WebkitMaskImage:
    "radial-gradient(circle at center, transparent 28px, black 32px), linear-gradient(to right, transparent, black 14%, black 86%, transparent)",
  maskComposite: "intersect",
  WebkitMaskComposite: "source-in",
}

const CIRCUIT_PATH = "M0,70 L40,70 L55,45 L95,45 L110,70 L150,70 L165,30 L200,30"

/** Renders the effect-specific visual that fills the preview stage. */
function EffectStage({ effectType, Icon }: { effectType: EffectType; Icon: LucideIcon }) {
  return (
    <div
      aria-hidden="true"
      className="effect-stage relative h-[110px] w-full overflow-hidden rounded-lg border border-white/[0.06] bg-black/40"
    >
      {effectType === "glow" && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="absolute h-24 w-24 rounded-full bg-electric-primary/30 blur-2xl animate-glow-breathe" />
          <div className="absolute h-20 w-20 animate-glow-orbit">
            <span className="absolute left-1/2 top-0 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-electric-primary shadow-[0_0_8px_2px_rgba(69,163,255,0.7)]" />
          </div>
        </div>
      )}

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
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "linear-gradient(115deg, transparent 30%, rgba(56, 189, 248, 0.14) 50%, transparent 70%)",
            }}
          />
          <div
            className="absolute inset-0 animate-shimmer"
            style={{
              backgroundImage:
                "linear-gradient(115deg, transparent 35%, rgba(56, 189, 248, 0.22) 50%, transparent 65%)",
            }}
          />
        </div>
      )}

      {effectType === "circuit" && (
        <svg
          className="absolute inset-0 h-full w-full"
          viewBox="0 0 200 100"
          preserveAspectRatio="none"
          style={circuitMask}
        >
          <path d={CIRCUIT_PATH} stroke="currentColor" strokeWidth="1" fill="none" className="text-electric-primary/30" />
          <path
            d={CIRCUIT_PATH}
            stroke="currentColor"
            strokeWidth="1.5"
            fill="none"
            className="text-electric-primary animate-circuit-flow"
          />
          <circle cx="55" cy="45" r="2.5" className="fill-electric-primary animate-circuit-pulse" />
          <circle cx="150" cy="70" r="2.5" className="fill-electric-secondary animate-circuit-pulse" />
          <circle cx="165" cy="30" r="2.5" className="fill-electric-primary animate-circuit-pulse" />
        </svg>
      )}

      {effectType === "matrix" && (
        <div className="absolute inset-0">
          <div
            className="absolute inset-2 grid place-items-center"
            style={{
              gridTemplateColumns: `repeat(${DOT_COLUMNS}, minmax(0, 1fr))`,
              gridTemplateRows: `repeat(${DOT_ROWS}, minmax(0, 1fr))`,
            }}
          >
            {matrixDots.map((dot, index) => (
              <span
                key={index}
                className="h-[2.5px] w-[2.5px] rounded-full bg-electric-primary animate-dot-pulse"
                style={{ opacity: dot.opacity, animationDelay: dot.delay }}
              />
            ))}
          </div>
          <div
            className="absolute inset-0 animate-matrix-rain"
            style={{
              backgroundImage:
                "linear-gradient(to bottom, transparent 0%, rgba(69,163,255,0.09) 45%, transparent 55%)",
              backgroundSize: "100% 28px",
            }}
          />
        </div>
      )}

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
    <article
      tabIndex={0}
      aria-label={`${title} effect preview`}
      className="effect-card group relative flex flex-col gap-4 rounded-xl border border-white/[0.06] bg-white/[0.02] p-5 backdrop-blur-sm transition-all duration-300 ease-out hover:-translate-y-1 hover:border-electric-primary/30 hover:bg-white/[0.04] hover:shadow-[0_12px_40px_-16px_rgba(69,163,255,0.45)] focus-visible:border-electric-primary/30"
    >
      <EffectStage effectType={effectType} Icon={Icon} />

      <div className="relative z-10 flex flex-col gap-1.5">
        <div className="flex items-center justify-between gap-2">
          <h3 className="text-base font-medium leading-6 text-white">{title}</h3>
          <span className="inline-flex h-5 items-center rounded-full border border-electric-primary/20 bg-electric-primary/10 px-2 font-mono text-[10px] uppercase leading-none tracking-wide text-electric-primary">
            {effectType}
          </span>
        </div>
        <p className="text-sm leading-relaxed text-white/50 text-pretty">{description}</p>
      </div>
    </article>
  )
}

export function EffectShowcase() {
  return (
    <div className="space-y-8">
      <SectionHeader {...sectionHeaders.effects} />

      <AgentNote section="effects" />

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
