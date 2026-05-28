import { cn } from "@/lib/utils"

interface LogoMarkProps {
  className?: string
  title?: string
}

/**
 * DarkLup logo mark — a crescent set in a rounded tile.
 * Uses `currentColor` so it inherits a high-contrast tone on any background
 * and stays legible down to ~16px. Decorative by default (aria-hidden);
 * pass a `title` to expose an accessible name when used standalone.
 */
export function LogoMark({ className, title }: LogoMarkProps) {
  return (
    <svg
      viewBox="0 0 32 32"
      className={cn("h-7 w-7", className)}
      fill="none"
      role={title ? "img" : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
    >
      <rect
        x="1"
        y="1"
        width="30"
        height="30"
        rx="8"
        className="fill-electric-primary/15 stroke-electric-primary/30"
        strokeWidth="1.5"
      />
      {/* Crescent: a full disc with an offset disc subtracted */}
      <path
        d="M21.5 16a7.5 7.5 0 1 1-7.5-7.5 6 6 0 1 0 0 15 7.47 7.47 0 0 0 7.5-7.5Z"
        className="fill-electric-primary"
      />
    </svg>
  )
}

interface LogoProps {
  className?: string
  showWordmark?: boolean
  wordmark?: string
  markClassName?: string
}

/**
 * Full DarkLup logo: mark plus optional wordmark.
 * The wordmark is hidden from assistive tech when the mark already carries
 * the accessible name in its parent control.
 */
export function Logo({ className, showWordmark = true, wordmark = "DarkLup", markClassName }: LogoProps) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <LogoMark className={markClassName} />
      {showWordmark && (
        <span className="font-display font-semibold text-white tracking-tight">{wordmark}</span>
      )}
    </span>
  )
}
