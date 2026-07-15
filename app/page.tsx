"use client"

import { useState, useEffect, useCallback } from "react"
import { Navigation } from "@/components/navigation"
import { HeroSection } from "@/components/hero-section"
import { ComponentShowcase } from "@/components/component-showcase"
import { ColorPalette } from "@/components/color-palette"
import { TypographyShowcase } from "@/components/typography-showcase"
import { EffectShowcase } from "@/components/effect-showcase"
import { PromptLibrary } from "@/components/prompt-library"
import { AIZone } from "@/components/ai-zone"
import { CreativeSpace } from "@/components/creative-space"
import { siteConfig } from "@/lib/content"
import Link from "next/link"

const VALID_SECTIONS = [
  "overview",
  "components",
  "colors",
  "typography",
  "effects",
  "prompts",
  "ai",
  "creative",
] as const

type Section = (typeof VALID_SECTIONS)[number]

function isValidSection(s: string): s is Section {
  return (VALID_SECTIONS as readonly string[]).includes(s)
}

function getSectionFromHash(): Section {
  if (typeof window === "undefined") return "overview"
  const hash = window.location.hash.replace("#", "")
  return isValidSection(hash) ? hash : "overview"
}

export default function HomePage() {
  const [activeSection, setActiveSection] = useState<Section>("overview")

  useEffect(() => {
    setActiveSection(getSectionFromHash())

    const handlePopState = () => setActiveSection(getSectionFromHash())
    window.addEventListener("popstate", handlePopState)
    return () => window.removeEventListener("popstate", handlePopState)
  }, [])

  const handleSectionChange = useCallback((section: string) => {
    if (!isValidSection(section)) return
    setActiveSection(section)
    const newHash = section === "overview" ? "" : `#${section}`
    window.history.pushState(null, "", newHash || window.location.pathname)
  }, [])

  return (
    <div className="min-h-screen bg-background-dark">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-electric-primary focus:text-background-dark focus:rounded-lg focus:font-medium focus:text-sm"
      >
        Skip to content
      </a>

      <Navigation activeSection={activeSection} onSectionChange={handleSectionChange} />

      <main
        id="main-content"
        className="max-w-[1008px] mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-12"
        tabIndex={-1}
      >
        {activeSection === "overview" && <HeroSection onSectionChange={handleSectionChange} />}
        {activeSection === "components" && <ComponentShowcase />}
        {activeSection === "colors" && <ColorPalette />}
        {activeSection === "typography" && <TypographyShowcase />}
        {activeSection === "effects" && <EffectShowcase />}
        {activeSection === "prompts" && <PromptLibrary />}
        {activeSection === "ai" && <AIZone />}
        {activeSection === "creative" && <CreativeSpace />}
      </main>

      <footer className="border-t border-white/[0.05] mt-16">
        <div className="max-w-[1008px] mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
          {/* DevTools AI project note */}
          <p className="text-xs text-white/35 font-mono leading-relaxed mb-6 max-w-2xl text-pretty border-l-2 border-electric-primary/30 pl-4">
            Project Note: {siteConfig.devToolsNote}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-white/40">
            <div className="flex items-center gap-4">
              <span>{siteConfig.fullName}</span>
              <Link href="/getting-started" className="hover:text-white transition-colors">
                Getting Started
              </Link>
              <Link href="/ai-principles" className="hover:text-white transition-colors">
                AI Principles
              </Link>
            </div>
            <span>{siteConfig.tagline}</span>
          </div>
        </div>
      </footer>
    </div>
  )
}
