import { cn } from "@/lib/utils"

interface SectionHeaderProps {
  title: string
  description: string
  className?: string
}

/**
 * Consistent page header used across every docs section.
 * Keeps typography, spacing, and alignment uniform between pages.
 */
export function SectionHeader({ title, description, className }: SectionHeaderProps) {
  return (
    <div className={cn("text-center space-y-3", className)}>
      <h1 className="font-display text-4xl md:text-5xl text-white text-balance">{title}</h1>
      <p className="text-white/60 text-lg max-w-xl mx-auto leading-relaxed text-pretty">{description}</p>
    </div>
  )
}
