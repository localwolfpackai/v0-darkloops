import { LupoCard } from "./lupo-card"
import { SectionHeader } from "./section-header"
import { AgentNote } from "./agent-note"
import { colorTokens, gradientTokens, sectionHeaders, type ColorToken } from "@/lib/content"

function Swatch({ color, name, value, description }: ColorToken) {
  return (
    <div className="flex items-center gap-4 p-3 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:bg-white/[0.04] hover:border-white/[0.1] transition-all duration-200">
      <div
        className="w-10 h-10 rounded-lg border border-white/10 shrink-0"
        style={{ backgroundColor: color }}
        role="img"
        aria-label={`${name}: ${value}`}
      />
      <div className="flex-1 min-w-0">
        <div className="font-medium text-white text-sm">{name}</div>
        <div className="font-mono text-xs text-white/55 truncate">{value}</div>
        {description && <div className="text-xs text-white/55 mt-0.5">{description}</div>}
      </div>
    </div>
  )
}

export function ColorPalette() {
  return (
    <div className="space-y-8">
      <SectionHeader {...sectionHeaders.colors} />

      <AgentNote section="colors" />

      {/* Swatches */}
      <LupoCard variant="base" hover={false}>
        <h2 className="font-display text-lg text-white mb-5">Core Palette</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {colorTokens.map((c) => (
            <Swatch key={c.name} {...c} />
          ))}
        </div>
      </LupoCard>

      {/* Gradients */}
      <LupoCard variant="base" hover={false}>
        <h2 className="font-display text-lg text-white mb-5">Gradients</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {gradientTokens.map((g) => (
            <div key={g.name} className="flex items-center gap-4 p-3 rounded-xl bg-white/[0.02] border border-white/[0.06]">
              <div
                className={`w-10 h-10 rounded-lg border border-white/15 shrink-0 ${g.className}`}
                role="img"
                aria-label={g.name}
              />
              <div>
                <div className="font-medium text-white text-sm">{g.name}</div>
                <div className="text-xs text-white/55">{g.description}</div>
              </div>
            </div>
          ))}
        </div>
      </LupoCard>
    </div>
  )
}
