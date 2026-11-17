"use client"

import { useCallback, useState } from "react"
import { Terminal, Copy, Check } from "lucide-react"
import { agentNotes } from "@/lib/content"
import { cn } from "@/lib/utils"

type CopyTarget = "spec" | "prompt"

/**
 * Agent-directed callout. Width is owned here (not by callers) so every
 * instance renders identically across sections.
 */
export function AgentNote({ section }: { section: keyof typeof agentNotes }) {
  const note = agentNotes[section]
  const [copied, setCopied] = useState<CopyTarget | null>(null)

  const copy = useCallback(async (target: CopyTarget, text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(target)
      setTimeout(() => setCopied((current) => (current === target ? null : current)), 2000)
    } catch {
      // Clipboard unavailable
    }
  }, [])

  if (!note) return null

  const specText = note.usage.map((fact) => `${fact.key}: ${fact.value}`).join("\n")

  return (
    <aside
      aria-label="Agent context"
      data-agent-note={section}
      className="agent-context-card mx-auto flex w-full max-w-3xl flex-col gap-5 p-5 sm:p-6"
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <span
            aria-hidden="true"
            className="flex size-7 shrink-0 items-center justify-center rounded-lg border border-electric-primary/25 bg-electric-primary/10 text-electric-primary"
          >
            <Terminal className="size-3.5" />
          </span>
          <h3 className="font-mono text-xs uppercase tracking-wider text-electric-primary">For the agent</h3>
        </div>
        {note.prompt && (
          <CopyButton
            label="Copy prompt"
            copied={copied === "prompt"}
            onClick={() => copy("prompt", note.prompt as string)}
          />
        )}
      </div>

      <p className="text-sm leading-relaxed text-white/75 text-pretty">{note.directive}</p>

      <div className="flex flex-col gap-3 rounded-lg border border-white/[0.07] bg-black/30 p-4">
        <div className="flex items-center justify-between gap-3">
          <span className="font-mono text-[10px] uppercase tracking-wider text-white/40">Spec</span>
          <CopyButton label="Copy spec" copied={copied === "spec"} onClick={() => copy("spec", specText)} />
        </div>
        <dl className="flex flex-col gap-1.5 font-mono text-xs leading-relaxed">
          {note.usage.map((fact) => (
            <div key={fact.key} className="flex flex-col sm:flex-row sm:gap-2">
              <dt className="shrink-0 text-electric-primary/80">{fact.key}:</dt>
              <dd className="break-words text-white/60">{fact.value}</dd>
            </div>
          ))}
        </dl>
      </div>

      <script
        type="application/json"
        data-agent-context={section}
        dangerouslySetInnerHTML={{ __html: JSON.stringify(note) }}
      />

      <p className="sr-only" role="status" aria-live="polite">
        {copied === "spec" ? "Spec copied to clipboard" : copied === "prompt" ? "Prompt copied to clipboard" : ""}
      </p>
    </aside>
  )
}

function CopyButton({ label, copied, onClick }: { label: string; copied: boolean; onClick: () => void }) {
  const Icon = copied ? Check : Copy
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "inline-flex h-7 shrink-0 items-center gap-1.5 rounded-lg border px-2.5 font-mono text-xs transition-colors",
        copied
          ? "border-success/40 bg-success/15 text-success"
          : "border-electric-primary/20 bg-electric-primary/[0.06] text-electric-primary/80 hover:border-electric-primary/40 hover:bg-electric-primary/10 hover:text-electric-primary",
      )}
    >
      <Icon className="size-3.5" aria-hidden="true" />
      {copied ? "Copied" : label}
    </button>
  )
}
