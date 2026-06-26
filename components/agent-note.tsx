"use client"

import { useCallback, useRef, useState } from "react"
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
 * The card is visually distinguished by the `.agent-context-card` CSS class,
 * which adds a diagonal hatching texture and an "AGENT CONTEXT" badge.
 * A "Copy" button in the header copies the full card text to the clipboard.
 *
 * A hidden JSON block gives agents a structured, unambiguous contract.
 */
export function AgentNote({ section, className }: AgentNoteProps) {
  const note = agentNotes[section]
  const cardRef = useRef<HTMLElement>(null)

  // Tracks which copy action last fired: "card" | "prompt" | null
  const [copiedTarget, setCopiedTarget] = useState<"card" | "prompt" | null>(null)

  /** Copies the full readable text of the card to the clipboard. */
  const copyCard = useCallback(async () => {
    if (!cardRef.current) return
    try {
      // Walk all visible text nodes inside the card, skipping the hidden JSON script
      const walker = document.createTreeWalker(
        cardRef.current,
        NodeFilter.SHOW_TEXT,
        {
          acceptNode(node) {
            const parent = node.parentElement
            if (!parent) return NodeFilter.FILTER_REJECT
            if (parent.tagName === "SCRIPT") return NodeFilter.FILTER_REJECT
            if (parent.classList.contains("sr-only")) return NodeFilter.FILTER_REJECT
            return NodeFilter.FILTER_ACCEPT
          },
        },
      )
      const parts: string[] = []
      let n: Node | null
      while ((n = walker.nextNode())) {
        const text = n.textContent?.trim()
        if (text) parts.push(text)
      }
      await navigator.clipboard.writeText(parts.join("\n"))
      setCopiedTarget("card")
      setTimeout(() => setCopiedTarget(null), 2000)
    } catch {
      // Clipboard unavailable — fail silently
    }
  }, [])

  /** Copies only the copy-ready agent prompt to the clipboard. */
  const copyPrompt = useCallback(async () => {
    if (!note?.prompt) return
    try {
      await navigator.clipboard.writeText(note.prompt)
      setCopiedTarget("prompt")
      setTimeout(() => setCopiedTarget(null), 2000)
    } catch {
      // Clipboard unavailable
    }
  }, [note])

  if (!note) return null

  const cardCopied = copiedTarget === "card"
  const promptCopied = copiedTarget === "prompt"

  return (
    <aside
      ref={cardRef}
      aria-label="Agent context block"
      data-agent-note={section}
      className={cn("agent-context-card p-5", className)}
    >
      {/* Header row: icon + label + card-level copy button */}
      <div className="flex items-center justify-between gap-2.5 mb-3">
        <div className="flex items-center gap-2.5">
          <span
            aria-hidden="true"
            className="flex h-7 w-7 items-center justify-center rounded-lg border border-electric-primary/25 bg-electric-primary/10 text-electric-primary shrink-0"
          >
            <Terminal className="h-3.5 w-3.5" />
          </span>
          <h3 className="font-mono text-xs uppercase tracking-wider text-electric-primary">
            For the agent
          </h3>
        </div>

        {/* Copy full card button */}
        <button
          onClick={copyCard}
          aria-label={cardCopied ? "Card content copied" : "Copy this agent context block"}
          title={cardCopied ? "Copied!" : "Copy card"}
          className={cn(
            "inline-flex items-center gap-1.5 rounded-lg border px-2.5 h-7 text-xs font-mono transition-all duration-200 shrink-0",
            cardCopied
              ? "border-success/40 bg-success/15 text-success"
              : "border-electric-primary/20 bg-electric-primary/[0.06] text-electric-primary/70 hover:border-electric-primary/40 hover:bg-electric-primary/10 hover:text-electric-primary",
          )}
        >
          {cardCopied ? (
            <Check className="h-3.5 w-3.5" aria-hidden="true" />
          ) : (
            <Copy className="h-3.5 w-3.5" aria-hidden="true" />
          )}
          <span>{cardCopied ? "Copied" : "Copy"}</span>
        </button>
      </div>

      {/* Directive */}
      <p className="text-sm leading-relaxed text-white/75 text-pretty">{note.directive}</p>

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
            aria-label={promptCopied ? "Agent prompt copied" : "Copy agent prompt"}
            title={promptCopied ? "Copied!" : "Copy prompt"}
            className={cn(
              "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border transition-all duration-200",
              promptCopied
                ? "border-success/30 bg-success/15 text-success"
                : "border-white/10 bg-white/[0.03] text-white/55 hover:border-white/20 hover:bg-white/[0.05] hover:text-white",
            )}
          >
            {promptCopied ? (
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
        {cardCopied
          ? "Agent context block copied to clipboard"
          : promptCopied
            ? "Agent prompt copied to clipboard"
            : ""}
      </div>
    </aside>
  )
}
