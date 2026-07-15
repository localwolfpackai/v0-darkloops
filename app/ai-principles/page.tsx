"use client"

import Link from "next/link"
import { ArrowLeft, BrainCircuit, Code2, Eye } from "lucide-react"
import { LupoCard } from "@/components/lupo-card"
import { LupoButton } from "@/components/lupo-button"
import { LogoMark } from "@/components/logo"

export default function AIPrinciplesPage() {
  return (
    <div className="min-h-screen bg-background-dark py-12 px-4 sm:px-6 lg:px-8 flex flex-col items-center">
      <div className="max-w-[800px] w-full">
        <div className="mb-8 flex items-center justify-between">
          <Link href="/">
            <LupoButton variant="secondary" size="sm">
              <ArrowLeft className="w-4 h-4" />
              Back to System
            </LupoButton>
          </Link>
          <LogoMark className="w-8 h-8" />
        </div>

        <div className="space-y-12">
          <header className="space-y-4">
            <h1 className="font-display text-4xl font-semibold text-white tracking-tight">
              AI Design Principles
            </h1>
            <p className="text-white/60 text-lg max-w-2xl leading-relaxed">
              DarkLup isn't just about how things look—it's about how things are structured. Discover the core principles that make this design system easily digestible for AI agents.
            </p>
          </header>

          <section aria-labelledby="principle-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-electric-primary/10 rounded-lg">
                <Code2 className="w-6 h-6 text-electric-primary" />
              </div>
              <h2 id="principle-1" className="font-display text-2xl font-medium text-white">
                1. Semantic predictability
              </h2>
            </div>
            <LupoCard variant="base">
              <p className="text-white/70 leading-relaxed mb-4">
                AI agents rely on predictable patterns to generate accurate markup. DarkLup enforces strict, semantic class names and predictable component APIs. Every component accepts a constrained set of props, preventing AI hallucination of invalid states.
              </p>
              <div className="bg-black/50 p-4 rounded-lg border border-white/5 font-mono text-sm text-white/50">
                <span className="text-electric-primary">{"// Bad for AI: Hallucinated props"}</span><br/>
                {"<Button color=\"purple\" glow={true} size=\"huge\">Click</Button>"}<br/><br/>
                <span className="text-electric-primary">{"// Good for AI: Constrained primitives"}</span><br/>
                {"<LupoButton variant=\"primary\" size=\"lg\">Click</LupoButton>"}
              </div>
            </LupoCard>
          </section>

          <section aria-labelledby="principle-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-electric-secondary/10 rounded-lg">
                <Eye className="w-6 h-6 text-electric-secondary" />
              </div>
              <h2 id="principle-2" className="font-display text-2xl font-medium text-white">
                2. Explicit visibility and labeling
              </h2>
            </div>
            <LupoCard variant="base">
              <p className="text-white/70 leading-relaxed mb-4">
                What a human sees visually, an agent must see structurally. We heavily utilize <code>aria-label</code>, <code>aria-hidden</code>, and <code>sr-only</code> classes to provide parallel context. Decorative elements are hidden from agents, while crucial interactive context is explicitly labeled.
              </p>
            </LupoCard>
          </section>

          <section aria-labelledby="principle-3">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-success/10 rounded-lg">
                <BrainCircuit className="w-6 h-6 text-success" />
              </div>
              <h2 id="principle-3" className="font-display text-2xl font-medium text-white">
                3. Machine-readable exports
              </h2>
            </div>
            <LupoCard variant="base">
              <p className="text-white/70 leading-relaxed mb-4">
                Complex visual states, like the Creative Canvas, aren't just DOM nodes. They are backed by canonical JSON structures. AI agents are instructed to interact with these raw data structures (like the canvas JSON export) rather than attempting to parse absolute-positioned DOM elements.
              </p>
            </LupoCard>
          </section>

          <div className="pt-8 border-t border-white/10 flex justify-center">
            <Link href="/getting-started">
              <LupoButton variant="primary" size="lg">
                View Agent Directives
              </LupoButton>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
