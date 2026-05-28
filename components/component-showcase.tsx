"use client"

import { useState } from "react"
import { Check, TriangleAlert } from "lucide-react"
import { LupoButton } from "./lupo-button"
import { LupoCard } from "./lupo-card"
import { LupoChip } from "./lupo-chip"
import { SectionHeader } from "./section-header"
import { AgentNote } from "./agent-note"
import { sectionHeaders } from "@/lib/content"

export function ComponentShowcase() {
  const [activeToggle, setActiveToggle] = useState(false)
  const [loadingStates, setLoadingStates] = useState<Record<string, boolean>>({})

  const simulateLoad = (key: string, ms = 1500) => {
    setLoadingStates((prev) => ({ ...prev, [key]: true }))
    setTimeout(() => setLoadingStates((prev) => ({ ...prev, [key]: false })), ms)
  }

  return (
    <div className="space-y-8">
      <SectionHeader {...sectionHeaders.components} />

      <AgentNote section="components" />

      {/* Buttons */}
      <LupoCard variant="base" hover={false}>
        <h2 className="font-display text-lg text-white mb-5">Buttons</h2>

        <div className="space-y-6">
          <section>
            <h3 className="text-sm text-white/50 mb-3">Standard</h3>
            <div className="flex flex-wrap gap-3">
              <LupoButton variant="primary">Primary</LupoButton>
              <LupoButton variant="secondary">Secondary</LupoButton>
              <LupoButton variant="electric">Accent</LupoButton>
            </div>
          </section>

          <section>
            <h3 className="text-sm text-white/50 mb-3">With Loading States</h3>
            <div className="flex flex-wrap gap-3">
              <LupoButton
                variant="primary"
                isLoading={loadingStates.save}
                onClick={() => simulateLoad("save")}
              >
                Save
              </LupoButton>
              <LupoButton
                variant="electric"
                isLoading={loadingStates.submit}
                onClick={() => simulateLoad("submit")}
              >
                Submit
              </LupoButton>
              <LupoButton
                variant="secondary"
                isLoading={loadingStates.sync}
                onClick={() => simulateLoad("sync")}
              >
                Sync
              </LupoButton>
            </div>
            <p className="text-white/55 text-xs mt-2">Click to preview loading state</p>
          </section>

          <section>
            <h3 className="text-sm text-white/50 mb-3">Specialty</h3>
            <div className="flex flex-wrap gap-3">
              <LupoButton variant="holographic">Shimmer</LupoButton>
              <LupoButton variant="neon">Gradient</LupoButton>
              <LupoButton
                variant="power"
                isActive={activeToggle}
                onClick={() => setActiveToggle(!activeToggle)}
                aria-pressed={activeToggle}
              >
                {activeToggle ? "On" : "Off"}
              </LupoButton>
            </div>
          </section>

          <section>
            <h3 className="text-sm text-white/50 mb-3">Sizes</h3>
            <div className="flex flex-wrap items-center gap-3">
              <LupoButton variant="primary" size="sm">Small</LupoButton>
              <LupoButton variant="primary" size="md">Medium</LupoButton>
              <LupoButton variant="primary" size="lg">Large</LupoButton>
            </div>
          </section>
        </div>
      </LupoCard>

      {/* Cards */}
      <LupoCard variant="base" hover={false}>
        <h2 className="font-display text-lg text-white mb-5">Cards</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <LupoCard variant="base" className="p-4">
            <h3 className="text-sm font-medium text-white mb-1">Default</h3>
            <p className="text-white/50 text-sm">Simple container with subtle styling.</p>
          </LupoCard>

          <LupoCard variant="electric" className="p-4">
            <h3 className="text-sm font-medium text-white mb-1">Highlighted</h3>
            <p className="text-white/50 text-sm">Draws attention to featured content.</p>
          </LupoCard>

          <LupoCard variant="circuit" className="p-4">
            <h3 className="text-sm font-medium text-white mb-1">Technical</h3>
            <p className="text-white/50 text-sm">Grid pattern for data or code.</p>
          </LupoCard>

          <LupoCard variant="holographic" className="p-4">
            <h3 className="text-sm font-medium text-white mb-1">Premium</h3>
            <p className="text-white/50 text-sm">Shimmer effect for special items.</p>
          </LupoCard>

          <LupoCard variant="data" className="p-4">
            <h3 className="text-sm font-medium text-white mb-1">Data</h3>
            <p className="text-white/50 text-sm">Dot matrix for metrics display.</p>
          </LupoCard>

          <LupoCard variant="status" status="active" className="p-4">
            <h3 className="text-sm font-medium text-white mb-1">Status</h3>
            <p className="text-white/50 text-sm">Left border indicates state.</p>
          </LupoCard>
        </div>
      </LupoCard>

      {/* Chips */}
      <LupoCard variant="base" hover={false}>
        <h2 className="font-display text-lg text-white mb-5">Chips</h2>

        <div className="space-y-4">
          <section>
            <h3 className="text-sm text-white/50 mb-3">Variants</h3>
            <div className="flex flex-wrap gap-2">
              <LupoChip>Default</LupoChip>
              <LupoChip variant="active">Active</LupoChip>
              <LupoChip variant="electric">Accent</LupoChip>
              <LupoChip variant="technical">Technical</LupoChip>
              <LupoChip variant="success" icon={<Check className="w-3 h-3" />}>Success</LupoChip>
              <LupoChip variant="warning" icon={<TriangleAlert className="w-3 h-3" />}>Warning</LupoChip>
            </div>
          </section>

          <section>
            <h3 className="text-sm text-white/50 mb-3">Sizes</h3>
            <div className="flex flex-wrap items-center gap-2">
              <LupoChip size="sm">Small</LupoChip>
              <LupoChip size="md">Medium</LupoChip>
            </div>
          </section>
        </div>
      </LupoCard>
    </div>
  )
}
