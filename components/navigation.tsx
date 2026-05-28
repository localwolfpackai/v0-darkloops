"use client"

import { useState, useEffect, useCallback } from "react"
import { Menu, X } from "lucide-react"
import { LupoButton } from "./lupo-button"
import { LogoMark } from "./logo"
import { navSections, siteConfig } from "@/lib/content"
import { cn } from "@/lib/utils"

interface NavigationProps {
  activeSection: string
  onSectionChange: (section: string) => void
}

const sections = navSections

export function Navigation({ activeSection, onSectionChange }: NavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setIsMenuOpen(false)
    }
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const handleSectionChange = useCallback(
    (id: string) => {
      onSectionChange(id)
      setIsMenuOpen(false)
      window.scrollTo({ top: 0, behavior: "smooth" })
    },
    [onSectionChange],
  )

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isMenuOpen) setIsMenuOpen(false)
    }
    document.addEventListener("keydown", handleKey)
    return () => document.removeEventListener("keydown", handleKey)
  }, [isMenuOpen])

  return (
    <nav
      className="sticky top-0 z-50 bg-background-dark/90 backdrop-blur-xl border-b border-white/[0.06]"
      aria-label="Main navigation"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 gap-4">
          {/* Logo */}
          <button
            onClick={() => handleSectionChange("overview")}
            className="flex items-center gap-2.5 shrink-0 hover:opacity-80 transition-opacity"
            aria-label={`${siteConfig.name} home`}
          >
            <LogoMark className="h-7 w-7" />
            <span className="hidden sm:block font-display font-semibold text-white text-sm tracking-tight">
              {siteConfig.name}
            </span>
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1" role="menubar" aria-label="Section links">
            {sections.map((section) => (
              <button
                key={section.id}
                role="menuitem"
                onClick={() => handleSectionChange(section.id)}
                aria-current={activeSection === section.id ? "page" : undefined}
                className={cn(
                  "px-3 py-1.5 rounded-lg text-sm transition-all duration-200 ease-in-out",
                  activeSection === section.id
                    ? "bg-electric-primary/15 text-electric-primary"
                    : "text-white/50 hover:text-white hover:bg-white/[0.04]",
                )}
              >
                {section.label}
              </button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <LupoButton
              variant="secondary"
              size="sm"
              onClick={() => setIsMenuOpen((o) => !o)}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-nav"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMenuOpen ? (
                <X className="w-4 h-4" aria-hidden="true" />
              ) : (
                <Menu className="w-4 h-4" aria-hidden="true" />
              )}
            </LupoButton>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div
            id="mobile-nav"
            className="md:hidden py-3 border-t border-white/[0.06]"
            role="menu"
          >
            <div className="grid grid-cols-2 gap-1.5">
              {sections.map((section) => (
                <button
                  key={section.id}
                  role="menuitem"
                  onClick={() => handleSectionChange(section.id)}
                  aria-current={activeSection === section.id ? "page" : undefined}
                  className={cn(
                    "px-4 py-2.5 rounded-lg text-sm text-left transition-all duration-200",
                    activeSection === section.id
                      ? "bg-electric-primary/15 text-electric-primary"
                      : "text-white/50 hover:text-white hover:bg-white/[0.04]",
                  )}
                >
                  {section.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
