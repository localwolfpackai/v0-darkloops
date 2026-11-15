import { cn } from "@/lib/utils"

/** Half-circle arcs of growing radius, alternating centers, form the spiral. */
export const SPIRAL_PATH = "M15 16a1.5 1.5 0 0 1 3 0a3 3 0 0 1-6 0a4.5 4.5 0 0 1 9 0a6 6 0 0 1-12 0a7.5 7.5 0 0 1 15 0"
export const SPIRAL_STROKE = 1.75

interface LogoMarkProps {
  className?: string
  /** Provide when the mark stands alone and needs an accessible name. */
  title?: string
}

export function LogoMark({ className, title }: LogoMarkProps) {
  return (
    <svg
      viewBox="0 0 32 32"
      className={cn("size-7", className)}
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
      <path
        d={SPIRAL_PATH}
        className="stroke-electric-primary"
        strokeWidth={SPIRAL_STROKE}
        strokeLinecap="round"
        strokeLinejoin="round"
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

export function Logo({ className, showWordmark = true, wordmark = "DarkLup", markClassName }: LogoProps) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <LogoMark className={markClassName} />
      {showWordmark && <span className="font-display font-semibold tracking-tight text-white">{wordmark}</span>}
    </span>
  )
}
