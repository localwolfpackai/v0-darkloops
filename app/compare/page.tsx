"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, ArrowUpRight, Check, Copy, Code2, Eye, Layers3, Scale, ShieldCheck } from "lucide-react"

const comparison = [
  { feature: "Designed for", values: ["People and coding agents", "Developers building accessible primitives", "Developers assembling app UI", "Product teams and enterprises"] },
  { feature: "Documentation", values: ["Visual guidance plus explicit agent context", "APIs, examples, accessibility guidance", "Registries, examples and source code", "Extensive APIs, patterns and design guidance"] },
  { feature: "Scope", values: ["15+ curated components · 8 variants", "Broad foundation of unstyled primitives", "Flexible, extensible component collections", "Large, feature-rich ecosystems"] },
  { feature: "Styling model", values: ["Opinionated dark, calm, accessible defaults", "Unstyled; bring your own design system", "Source-owned styling and configurable tokens", "Comprehensive themes and token systems"] },
  { feature: "Main advantage", values: ["Clear guardrails for consistent agent output", "Accessibility and behavior with styling freedom", "Ownership and rapid composition", "Breadth, integrations and mature tooling"] },
  { feature: "Main tradeoff", values: ["Smaller scope and less visual flexibility", "Requires substantial styling work", "Ongoing ownership and maintenance", "Greater conceptual and API surface"] },
]
const libraries = [
  { name: "DarkLup", subtitle: "Agent-aware system" },
  { name: "Radix / Base UI", subtitle: "Headless primitives" },
  { name: "shadcn / daisyUI", subtitle: "Composable UI kits" },
  { name: "MUI / Ant Design", subtitle: "Full ecosystems" },
]
const agentText = `AGENT CONTEXT — DARKLUP
audience: humans + AI coding agents
theme: dark, calm, accessible
components: use documented primitives
variants: use named variants only
tokens: use published color, type and spacing tokens
layout: prefer clear hierarchy and restrained composition
accessibility: preserve semantics and keyboard behavior
when-uncertain: inspect the component documentation first`

export default function ComparePage() {
  const [active, setActive] = useState(0)
  const [copied, setCopied] = useState(false)
  async function copyContext() {
    try {
      await navigator.clipboard.writeText(agentText)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1800)
    } catch { setCopied(false) }
  }
  return (
    <div className="min-h-screen bg-background-dark text-white selection:bg-electric-primary/30">
      <a href="#comparison-main" className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:bg-white focus:text-black focus:p-3">Skip to content</a>
      <header className="border-b border-white/10">
        <div className="mx-auto max-w-[1120px] px-5 sm:px-8 h-[72px] flex items-center justify-between gap-4">
          <Link href="/" className="font-semibold text-[17px] tracking-[-.04em] hover:text-electric-primary transition-colors">DarkLup<span className="text-electric-primary">.</span></Link>
          <div className="flex items-center gap-5">
            <span className="hidden sm:inline text-xs text-white/35">Built for humans. Readable by agents.</span>
            <Link href="/" className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-white transition-colors"><ArrowLeft className="size-4" /> Explore system</Link>
          </div>
        </div>
      </header>

      <main id="comparison-main" className="mx-auto max-w-[1120px] px-5 sm:px-8">
        <section className="pt-20 pb-16 sm:pt-28 sm:pb-24">
          <p className="text-[13px] text-electric-primary tracking-wide mb-7">The difference</p>
          <h1 className="max-w-[890px] text-[clamp(3.3rem,8vw,7rem)] font-semibold leading-[.99] tracking-[-.075em]">One system.<br /><span className="text-white/40">Two readers.</span></h1>
          <p className="mt-8 max-w-[640px] text-lg sm:text-xl leading-relaxed text-white/55">Most UI libraries help people build interfaces. DarkLup is designed to communicate the same rules to people and AI coding agents — without making either guess.</p>
          <div className="mt-10 flex flex-wrap items-center gap-6 text-sm">
            <a href="#how-it-works" className="inline-flex items-center gap-2 bg-electric-primary text-[#07111c] font-semibold px-5 py-3 rounded-md hover:brightness-110 transition">See how it works <ArrowUpRight className="size-4" /></a>
            <a href="#compare" className="text-white/65 hover:text-white underline underline-offset-8 decoration-white/25">Compare libraries</a>
          </div>
        </section>

        <section id="how-it-works" className="border-t border-white/10 pt-9 pb-24">
          <div className="flex items-start justify-between gap-4 mb-8"><h2 className="text-2xl sm:text-3xl font-semibold tracking-[-.045em]">The dual interface</h2><span className="text-sm text-white/35">01 / 03</span></div>
          <div className="grid md:grid-cols-2 gap-3">
            <article className="rounded-xl border border-white/10 bg-white/[.025] p-6 sm:p-9 min-h-[345px] flex flex-col">
              <Eye className="size-6 text-white/60 mb-8" strokeWidth={1.5} />
              <p className="text-xs text-white/40 mb-3">For people</p>
              <h3 className="text-3xl font-semibold tracking-tight mb-4">A coherent interface.</h3>
              <p className="text-white/50 leading-relaxed max-w-sm">Clear hierarchy, considered contrast, purposeful variants and accessible behaviors. The design feels consistent without requiring endless decisions.</p>
              <div className="mt-auto pt-9 flex items-center gap-3"><div className="h-10 w-10 rounded-lg bg-electric-primary" /><div className="h-10 w-24 rounded-lg bg-white/10 border border-white/10" /><div className="h-10 w-16 rounded-lg border border-white/20" /></div>
            </article>
            <article className="rounded-xl border border-electric-primary/25 bg-electric-primary/[.04] p-6 sm:p-9 min-h-[345px] flex flex-col">
              <Code2 className="size-6 text-electric-primary mb-8" strokeWidth={1.5} />
              <p className="text-xs text-electric-primary/80 mb-3">For agents</p>
              <h3 className="text-3xl font-semibold tracking-tight mb-4">A readable contract.</h3>
              <p className="text-white/50 leading-relaxed max-w-sm">Explicit context gives coding agents named tokens, component boundaries and composition rules they can follow and verify.</p>
              <div className="mt-auto pt-8 font-mono text-[12px] leading-6 text-electric-primary/80"><span className="text-white/30">system / </span>DarkLup<br/><span className="text-white/30">audience / </span>humans + agents<br/><span className="text-white/30">theme / </span>dark · calm · accessible</div>
            </article>
          </div>
        </section>

        <section id="compare" className="border-t border-white/10 pt-9 pb-24">
          <div className="flex items-start justify-between gap-4 mb-4"><h2 className="text-2xl sm:text-3xl font-semibold tracking-[-.045em]">Different tools, different priorities.</h2><span className="text-sm text-white/35">02 / 03</span></div>
          <p className="text-white/50 max-w-2xl leading-relaxed mb-9">DarkLup is not a replacement for every component library. Its differentiator is the explicit agent-facing layer and deliberately constrained visual language.</p>
          <div className="md:hidden mb-5">
            <label htmlFor="library-select" className="block text-xs text-white/45 mb-2">Compare DarkLup with</label>
            <select id="library-select" className="w-full bg-[#171717] border border-white/20 rounded-lg px-4 py-3 text-white" value={active} onChange={e => setActive(Number(e.target.value))}>
              {libraries.slice(1).map((item,i) => <option value={i+1} key={item.name}>{item.name}</option>)}
            </select>
            <div className="mt-4 space-y-3">{comparison.map(row => <div key={row.feature} className="border-b border-white/10 pb-4"><h3 className="text-xs text-white/45 mb-3">{row.feature}</h3><div className="grid grid-cols-2 gap-4"><p className="text-sm text-electric-primary leading-relaxed">{row.values[0]}</p><p className="text-sm text-white/75 leading-relaxed">{row.values[active || 1]}</p></div></div>)}</div>
          </div>
          <div className="hidden md:block overflow-x-auto rounded-xl border border-white/10">
            <table className="w-full table-fixed text-left">
              <thead><tr className="border-b border-white/10"><th className="w-[17%] p-5 text-xs font-normal text-white/35">Dimension</th>{libraries.map((lib,i) => <th key={lib.name} className={`w-[20.75%] p-5 align-top ${i===0?"bg-electric-primary/[.08]":""}`}><span className={`block text-[15px] font-semibold ${i===0?"text-electric-primary":"text-white"}`}>{lib.name}</span><span className="block text-xs text-white/35 font-normal mt-1">{lib.subtitle}</span></th>)}</tr></thead>
              <tbody>{comparison.map(row => <tr key={row.feature} className="border-b border-white/[.07] last:border-0"><th className="p-5 align-top text-[13px] font-medium text-white/55">{row.feature}</th>{row.values.map((value,i)=><td key={i} className={`p-5 align-top text-[13px] leading-6 ${i===0?"bg-electric-primary/[.05] text-white":"text-white/60"}`}>{value}</td>)}</tr>)}</tbody>
            </table>
          </div>
          <p className="mt-4 text-xs text-white/35 leading-relaxed">A paradigm-level comparison, not a benchmark. Radix, Base UI, shadcn and others can also be used effectively with AI agents. shadcn and daisyUI have distinct ownership and styling models, grouped here for a high-level comparison.</p>
        </section>

        <section className="border-t border-white/10 pt-9 pb-24">
          <div className="flex items-start justify-between gap-4 mb-8"><h2 className="text-2xl sm:text-3xl font-semibold tracking-[-.045em]">The tradeoffs</h2><span className="text-sm text-white/35">03 / 03</span></div>
          <div className="grid sm:grid-cols-2 gap-10 sm:gap-16">
            <div><Layers3 className="size-6 text-electric-primary mb-6" strokeWidth={1.5}/><h3 className="text-xl font-semibold mb-3">Clarity over breadth</h3><p className="text-white/50 leading-7">A smaller, documented set of primitives reduces the space an agent has to interpret. The cost: fewer ready-made patterns for complex applications.</p></div>
            <div><Scale className="size-6 text-electric-primary mb-6" strokeWidth={1.5}/><h3 className="text-xl font-semibold mb-3">Consistency over infinite control</h3><p className="text-white/50 leading-7">A defined dark theme, tokens and variants make output more predictable. Teams seeking unrestricted visual systems may prefer headless primitives.</p></div>
            <div><ShieldCheck className="size-6 text-electric-primary mb-6" strokeWidth={1.5}/><h3 className="text-xl font-semibold mb-3">Instructions, not guarantees</h3><p className="text-white/50 leading-7">Agent context can improve adherence to a system, but it does not automatically prove accessibility, correctness or generation accuracy. Those still require testing.</p></div>
            <div><Code2 className="size-6 text-electric-primary mb-6" strokeWidth={1.5}/><h3 className="text-xl font-semibold mb-3">Composability over completeness</h3><p className="text-white/50 leading-7">DarkLup is best viewed as a focused design language. For sophisticated data grids, advanced widgets and platform integrations, mature ecosystems remain valuable.</p></div>
          </div>
        </section>

        <section className="border-t border-white/10 pt-9 pb-28">
          <div className="grid lg:grid-cols-[1fr_1.1fr] gap-8 lg:gap-16 items-start">
            <div><p className="text-xs text-electric-primary mb-4">Take it to your agent</p><h2 className="text-3xl sm:text-4xl font-semibold tracking-[-.055em] mb-5">Show the rules.<br/>Not just the pixels.</h2><p className="text-white/50 leading-7">A compact example of the kind of structured context an agent can consume. Use the actual component docs as the source of truth when building.</p><Link href="/#ai" className="inline-flex items-center gap-2 mt-7 text-sm text-electric-primary hover:text-white transition-colors">Explore agent documentation <ArrowUpRight className="size-4" /></Link></div>
            <div className="rounded-xl border border-electric-primary/25 overflow-hidden bg-[#101820]"><div className="px-5 py-4 flex justify-between items-center border-b border-white/10"><span className="font-mono text-xs text-electric-primary">AGENT CONTEXT</span><button onClick={copyContext} className="inline-flex items-center gap-2 text-xs text-white/60 hover:text-white" aria-label="Copy agent context">{copied?<Check className="size-4"/>:<Copy className="size-4"/>}{copied?"Copied":"Copy"}</button></div><pre className="p-5 sm:p-7 overflow-x-auto text-[12px] leading-7 text-white/70 font-mono whitespace-pre-wrap">{agentText}</pre></div>
          </div>
        </section>
      </main>
      <footer className="border-t border-white/10"><div className="mx-auto max-w-[1120px] px-5 sm:px-8 py-8 flex flex-wrap justify-between gap-4 text-xs text-white/40"><span>DarkLup — built for humans, readable by agents.</span><a className="hover:text-white" href="https://github.com/localwolfpackai/v0-darkloops" target="_blank" rel="noopener noreferrer">Source on GitHub ↗</a></div></footer>
    </div>
  )
}
