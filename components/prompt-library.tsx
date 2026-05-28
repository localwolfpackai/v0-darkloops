"use client"

import { useState, useCallback } from "react"
import { Copy, Check } from "lucide-react"
import { LupoCard } from "./lupo-card"
import { LupoChip } from "./lupo-chip"
import { SectionHeader } from "./section-header"
import { AgentNote } from "./agent-note"
import { prompts, promptCategories, sectionHeaders } from "@/lib/content"
import { cn } from "@/lib/utils"

type Filter = "All" | (typeof promptCategories)[number]

export function PromptLibrary() {
  const [activeFilter, setActiveFilter] = useState<Filter>("All")
  const [copiedId, setCopiedId] = useState<string | null>(null)

  const copyPrompt = useCallback(async (id: string, text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedId(id)
      setTimeout(() => setCopiedId(null), 2000)
    } catch {
      // Clipboard not available
    }
  }, [])

  const filters: Filter[] = ["All", ...promptCategories]
  const visiblePrompts =
    activeFilter === "All" ? prompts : prompts.filter((p) => p.category === activeFilter)

  return (
    <div className="space-y-8">
      <SectionHeader {...sectionHeaders.prompts} />

      <AgentNote section="prompts" />

      {/* Category filter */}
      <div className="flex flex-wrap justify-center gap-2" role="group" aria-label="Filter prompts by category">
        {filters.map((filter) => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            aria-pressed={activeFilter === filter}
            className={cn(
              "px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 border",
              activeFilter === filter
                ? "bg-electric-primary/15 text-electric-primary border-electric-primary/30"
                : "bg-white/[0.03] text-white/55 border-white/10 hover:text-white hover:border-white/20 hover:bg-white/[0.05]",
            )}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Prompt grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {visiblePrompts.map((item) => {
          const isCopied = copiedId === item.id
          return (
            <LupoCard key={item.id} variant="base" hover={false} className="flex flex-col gap-4">
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-2 min-w-0">
                  <LupoChip variant="technical" size="sm">
                    {item.category}
                  </LupoChip>
                  <h3 className="font-display text-base text-white">{item.title}</h3>
                </div>
                <button
                  onClick={() => copyPrompt(item.id, item.prompt)}
                  aria-label={isCopied ? `${item.title} prompt copied` : `Copy ${item.title} prompt`}
                  className={cn(
                    "shrink-0 flex items-center justify-center w-9 h-9 rounded-lg border transition-all duration-200",
                    isCopied
                      ? "bg-success/15 border-success/30 text-success"
                      : "bg-white/[0.03] border-white/10 text-white/55 hover:text-white hover:border-white/20 hover:bg-white/[0.05]",
                  )}
                >
                  {isCopied ? (
                    <Check className="w-4 h-4" aria-hidden="true" />
                  ) : (
                    <Copy className="w-4 h-4" aria-hidden="true" />
                  )}
                </button>
              </div>
              <p className="text-white/70 text-sm leading-relaxed text-pretty">{item.prompt}</p>
            </LupoCard>
          )
        })}
      </div>

      {/* Live region for copy feedback */}
      <div className="sr-only" role="status" aria-live="polite">
        {copiedId ? "Prompt copied to clipboard" : ""}
      </div>
    </div>
  )
}
