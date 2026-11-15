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

type CopyTarget = "spec" | "prompt"

/**
 * A calm, annotated callout that lets the design system speak directly to an
 * AI agent. It renders three things:
 *  1. A plain-language directive (what DarkLup "says" to the agent).
 *  2. Machine-readable usage facts in monospace, with a "Copy spec" action.
 *  3. An optional copy-ready prompt with its own "Copy prompt" action.
 *
 * The card is visually distinguished by the `.agent-context-card` CSS class,
 * which adds a diagonal hatching texture and an "AGENT CONTEXT" tab.
 *
 * A hidden JSON block gives agents a structured, unambiguous contract.
 */
export function AgentNote({ section, className }: AgentNoteProps) {
  const note = agentNotes[section]
  const [copiedTarget, setCopiedTarget] = useState<CopyTarget | null>(null)

  const copy = useCallback(async (target: CopyTarget, text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedTarget(target)
      setTimeout(() => setCopiedTarget((current) => (current === target ? null : current)), 2000)
    } catch {
      // Clipboard unavailable — fail silently
    }
  }, [])

  if (!note) return null

  const specText = note.usage.map((fact) => `${fact.key}: ${fact.value}`).join("\n")
  const specCopied = copiedTarget === "spec"
  const promptCopied = copiedTarget === "prompt"

  return (
    <aside
      aria-label="Agent context block"
      data-agent-note={section}
      className={cn("agent-context-card p-5", className)}
    >
      <div className="mb-3 flex items-center gap-2.5">
        <span
          aria-hidden="true"
          className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-electric-primary/25 bg-electric-primary/10 text-electric-primary"
        >
          <Terminal className="h-3.5 w-3.5" />
        </span>
        <h3 className="font-mono text-xs uppercase tracking-wider text-electric-primary">For the agent</h3>
      </div>

      <p className="text-sm leading-relaxed text-white/75 text-pretty">{note.directive}</p>

      <div className="mt-4 rounded-lg border border-white/[0.07] bg-black/30 p-3">
        <div className="mb-2 flex items-center justify-between gap-2">
          <span className="font-mono text-[10px] uppercase tracking-wider text-white/40">Spec</span>
          <CopyButton
            label="Copy spec"
            copied={specCopied}
            onClick={() => copy("spec", specText)}
            ariaLabel={specCopied ? "Spec copied" : "Copy usage spec"}
          />
        </div>
        <dl className="flex flex-col gap-1.5 font-mono text-xs">
          {note.usage.map((fact) => (
            <div key={fact.key} className="flex flex-col gap-0.5 sm:flex-row sm:gap-2">
              <dt className="shrink-0 text-electric-primary/80">{fact.key}:</dt>
              <dd className="break-words text-white/60">{fact.value}</dd>
            </div>
          ))}
        </dl>
      </div>

      {note.prompt && (
        <div className="mt-4 flex flex-col gap-3 rounded-lg border border-white/[0.07] bg-white/[0.02] p-3 sm:flex-row sm:items-start sm:justify-between">
          <p className="text-sm leading-relaxed text-white/70 text-pretty">{note.prompt}</p>
          <CopyButton
            label="Copy prompt"
            copied={promptCopied}
            onClick={() => copy("prompt", note.prompt as string)}
            ariaLabel={promptCopied ? "Agent prompt copied" : "Copy agent prompt"}
          />
        </div>
      )}

      <script
        type="application/json"
        data-agent-context={section}
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(note) }}
      />

      <div className="sr-only" role="status" aria-live="polite">
        {specCopied ? "Spec copied to clipboard" : promptCopied ? "Agent prompt copied to clipboard" : ""}
      </div>
    </aside>
  )
}

function CopyButton({
  label,
  copied,
  onClick,
  ariaLabel,
}: {
  label: string
  copied: boolean
  onClick: () => void
  ariaLabel: string
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={ariaLabel}
      title={copied ? "Copied!" : label}
      className={cn(
        "inline-flex h-7 shrink-0 items-center gap-1.5 self-start rounded-lg border px-2.5 font-mono text-xs transition-all duration-200",
        copied
          ? "border-success/40 bg-success/15 text-success"
          : "border-electric-primary/20 bg-electric-primary/[0.06] text-electric-primary/80 hover:border-electric-primary/40 hover:bg-electric-primary/10 hover:text-electric-primary",
      )}
    >
      {copied ? <Check className="h-3.5 w-3.5" aria-hidden="true" /> : <Copy className="h-3.5 w-3.5" aria-hidden="true" />}
      <span>{copied ? "Copied!" : label}</span>
    </button>
  )
}
