import { LupoCard } from "./lupo-card"
import { SectionHeader } from "./section-header"
import { AgentNote } from "./agent-note"
import {
  bodyTextSamples,
  fontFamilies,
  headingScale,
  sampleLabels,
  sectionHeaders,
} from "@/lib/content"
import { cn } from "@/lib/utils"

export function TypographyShowcase() {
  return (
    <div className="space-y-8">
      <SectionHeader {...sectionHeaders.typography} />

      <AgentNote section="typography" />

      {/* Font Families */}
      <LupoCard variant="base" hover={false}>
        <h2 className="font-display text-lg text-white mb-5">Font Families</h2>
        <div className="space-y-4">
          {fontFamilies.map((font) => (
            <div key={font.sample} className="p-4 rounded-lg bg-white/[0.02] border border-white/[0.06]">
              <p className={cn("text-white text-lg", font.className)}>{font.sample}</p>
              <p className="text-white/55 text-sm mt-1">{font.description}</p>
            </div>
          ))}
        </div>
      </LupoCard>

      {/* Headings */}
      <LupoCard variant="base" hover={false}>
        <h2 className="font-display text-lg text-white mb-5">Headings</h2>
        <div className="space-y-4">
          {headingScale.map((heading, index) => (
            <div
              key={heading.sample}
              className={index < headingScale.length - 1 ? "pb-4 border-b border-white/[0.06]" : ""}
            >
              <p className={cn("text-white", heading.className)}>{heading.sample}</p>
              <p className="text-white/55 text-xs mt-2 font-mono">{heading.spec}</p>
            </div>
          ))}
        </div>
      </LupoCard>

      {/* Body Text */}
      <LupoCard variant="base" hover={false}>
        <h2 className="font-display text-lg text-white mb-5">Body Text</h2>
        <div className="space-y-4">
          {bodyTextSamples.map((sample) => (
            <p key={sample.text} className={cn("leading-relaxed", sample.className)}>
              {sample.text}
            </p>
          ))}
        </div>
      </LupoCard>

      {/* Labels */}
      <LupoCard variant="base" hover={false}>
        <h2 className="font-display text-lg text-white mb-5">Labels</h2>
        <div className="flex flex-wrap gap-2">
          {sampleLabels.map((label) => (
            <span
              key={label}
              className="font-mono text-xs bg-white/[0.03] px-2.5 py-1 rounded-lg border border-white/[0.06] text-white/50"
            >
              {label}
            </span>
          ))}
        </div>
      </LupoCard>
    </div>
  )
}
