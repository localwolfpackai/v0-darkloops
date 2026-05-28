"use client"

import { useCallback, useState } from "react"
import { Terminal, Copy, Check } from "lucide-react"
import { agentNotes } from "@/lib/content"
import { cn } from "@/lib/utils"

interface AgentNoteProps {
  /** Section id used to look up the matching note in `agentNotes`. */
  section: keyof typeof agentNotes
  className?: string
}

/**
 * A calm, annotated callout that lets the design system speak directly to an
 * AI agent. It renders three things:
 *  1. A plain-language directive (what DarkLup "says" to the agent).
 *  2. Machine-readable usage facts in monospace (stable keys/values).
 *  3. An optional copy-ready prompt phrased for an agent.
 *
 * It also embeds a hidden JSON block so an agent parsing the DOM has a
 * structured, unambiguous contract — not just prose.
 */
export function AgentNote({ section, className }: AgentNoteProps) {
  const note = agentNotes[section]
  const [copied, setCopied] = useState(false)

  const copyPrompt = useCallback(async () => {
    if (!note?.prompt) return
    try {
      await navigator.clipboard.writeText(note.prompt)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Clipboard unavailable
    }
  }, [note])

  if (!note) return null

  return (
    <aside
      aria-label="Note for AI agents"
      data-agent-note={section}
      className={cn(
        "relative overflow-hidden rounded-xl border border-electric-primary/20 bg-electric-primary/[0.04] p-5",
        className,
      )}
    >
      {/* Header */}
      <div className="flex items-center gap-2.5">
        <span
          aria-hidden="true"
          className="flex h-7 w-7 items-center justify-center rounded-lg border border-electric-primary/25 bg-electric-primary/10 text-electric-primary"
        >
          <Terminal className="h-3.5 w-3.5" />
        </span>
        <h3 className="font-mono text-xs uppercase tracking-wider text-electric-primary">
          For the agent
        </h3>
      </div>

      {/* Directive */}
      <p className="mt-3 text-sm leading-relaxed text-white/75 text-pretty">{note.directive}</p>

      {/* Machine-readable usage facts */}
      <dl className="mt-4 space-y-1.5 rounded-lg border border-white/[0.07] bg-black/30 p-3 font-mono text-xs">
        {note.usage.map((fact) => (
          <div key={fact.key} className="flex flex-col gap-0.5 sm:flex-row sm:gap-2">
            <dt className="shrink-0 text-electric-primary/80">{fact.key}:</dt>
            <dd className="text-white/60 break-words">{fact.value}</dd>
          </div>
        ))}
      </dl>

      {/* Copy-ready agent prompt */}
      {note.prompt && (
        <div className="mt-4 flex items-start justify-between gap-3 rounded-lg border border-white/[0.07] bg-white/[0.02] p-3">
          <p className="text-sm leading-relaxed text-white/70 text-pretty">{note.prompt}</p>
          <button
            onClick={copyPrompt}
            aria-label={copied ? "Agent prompt copied" : "Copy agent prompt"}
            className={cn(
              "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border transition-all duration-200",
              copied
                ? "border-success/30 bg-success/15 text-success"
                : "border-white/10 bg-white/[0.03] text-white/55 hover:border-white/20 hover:bg-white/[0.05] hover:text-white",
            )}
          >
            {copied ? (
              <Check className="h-4 w-4" aria-hidden="true" />
            ) : (
              <Copy className="h-4 w-4" aria-hidden="true" />
            )}
          </button>
        </div>
      )}

      {/* Hidden structured contract for agents parsing the DOM */}
      <script
        type="application/json"
        data-agent-context={section}
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(note) }}
      />

      <div className="sr-only" role="status" aria-live="polite">
        {copied ? "Agent prompt copied to clipboard" : ""}
      </div>
    </aside>
  )
}
