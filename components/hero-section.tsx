import { LupoCard } from "./lupo-card"
import { LupoButton } from "./lupo-button"
import { LupoChip } from "./lupo-chip"
import { BlueprintTile } from "./blueprint-tile"
import { LogoMark } from "./logo"
import { AgentNote } from "./agent-note"
import { heroContent, heroFeatures, heroStats } from "@/lib/content"

interface HeroSectionProps {
  onSectionChange?: (section: string) => void
}

export function HeroSection({ onSectionChange }: HeroSectionProps) {
  return (
    <div className="space-y-10">
      {/* Cinematic Hero Header */}
      <section
        aria-labelledby="hero-heading"
        className="relative isolate overflow-hidden rounded-2xl border border-white/10 bg-[#070707] px-6 py-16 sm:py-20 text-center"
      >
        {/* Layered cinematic lighting — decorative */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
          {/* Top spotlight */}
          <div className="absolute left-1/2 top-[-30%] h-[70%] w-[120%] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(69,163,255,0.22),transparent_70%)] blur-2xl" />
          {/* Lower secondary glow */}
          <div className="absolute left-[15%] bottom-[-25%] h-[55%] w-[55%] rounded-full bg-[radial-gradient(circle,rgba(107,127,255,0.16),transparent_70%)] blur-3xl" />
          {/* Fine grid for depth */}
          <div
            className="absolute inset-0 opacity-[0.05]"
            style={{
              backgroundImage: `
                linear-gradient(90deg, rgba(255,255,255,0.25) 1px, transparent 1px),
                linear-gradient(rgba(255,255,255,0.25) 1px, transparent 1px)
              `,
              backgroundSize: "44px 44px",
              maskImage: "radial-gradient(ellipse at center, black 35%, transparent 80%)",
              WebkitMaskImage: "radial-gradient(ellipse at center, black 35%, transparent 80%)",
            }}
          />
          {/* Vignette to deepen the edges */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_45%,rgba(0,0,0,0.7)_100%)]" />
        </div>

        <div className="mx-auto max-w-3xl">
          {/* Brand mark + eyebrow */}
          <div className="mb-7 flex flex-col items-center gap-4">
            <LogoMark className="h-12 w-12 drop-shadow-[0_0_24px_rgba(69,163,255,0.45)]" />
            <p className="text-sm font-medium tracking-wide text-electric-primary/90">
              {heroContent.eyebrow}
            </p>
          </div>

          {/* Bold DarkLup wordmark */}
          <p className="mb-4 font-display text-2xl font-semibold tracking-tight text-white/90">
            {heroContent.wordmark}
          </p>

          <h1
            id="hero-heading"
            className="mb-5 text-balance font-display text-4xl leading-tight text-white sm:text-5xl lg:text-6xl"
          >
            {heroContent.title}
          </h1>

          <p className="mx-auto mb-8 max-w-2xl text-balance text-lg leading-relaxed text-white/70 sm:text-xl">
            {heroContent.description}
          </p>

          {/* Dual-audience line: humans + AI agents */}
          <div className="mb-10 flex flex-wrap items-center justify-center gap-2.5">
            <LupoChip variant="electric" size="sm">{heroContent.audienceForHumans}</LupoChip>
            <span aria-hidden="true" className="text-white/30">/</span>
            <LupoChip variant="active" size="sm">{heroContent.audienceForAgents}</LupoChip>
          </div>

          <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
            <LupoButton
              variant="primary"
              size="lg"
              onClick={() => onSectionChange?.(heroContent.primaryCta.section)}
              aria-label="Browse the component library"
            >
              {heroContent.primaryCta.label}
            </LupoButton>
            <LupoButton
              variant="secondary"
              size="lg"
              onClick={() => onSectionChange?.(heroContent.secondaryCta.section)}
              aria-label="See the color and typography foundations"
            >
              {heroContent.secondaryCta.label}
            </LupoButton>
          </div>
        </div>
      </section>

      {/* Agent-directed context */}
      <AgentNote section="overview" className="mx-auto max-w-3xl" />

      {/* Feature Grid */}
      <section aria-labelledby="features-heading">
        <h2 id="features-heading" className="sr-only">Key features</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {heroFeatures.map((feature) => {
            const Icon = feature.icon
            return (
              <BlueprintTile
                key={feature.title}
                icon={<Icon className="w-5 h-5" aria-hidden="true" />}
                title={feature.title}
                description={feature.description}
                label={feature.label}
                onClick={() => onSectionChange?.(feature.section)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault()
                    onSectionChange?.(feature.section)
                  }
                }}
                aria-label={`${feature.title} — go to ${feature.section}`}
              />
            )
          })}
        </div>
      </section>

      {/* Stats Section */}
      <LupoCard variant="data" hover={false}>
        <dl className="grid grid-cols-2 sm:grid-cols-4 gap-8 text-center">
          {heroStats.map(({ value, label }) => (
            <div key={label}>
              <dd className="font-display text-3xl sm:text-4xl text-electric-primary tabular-nums">{value}</dd>
              <dt className="text-sm text-white/50 mt-1">{label}</dt>
            </div>
          ))}
        </dl>
      </LupoCard>
    </div>
  )
}
