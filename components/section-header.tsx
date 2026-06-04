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
    <div className={cn("text-center", className)}>
      <h1 className="font-display text-4xl md:text-5xl text-white text-balance mb-4">{title}</h1>
      <p className="text-white/60 text-base md:text-lg max-w-[38rem] mx-auto leading-relaxed text-pretty">{description}</p>
    </div>
  )
}
