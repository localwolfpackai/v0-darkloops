import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { notFoundContent } from "@/lib/content"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background-dark flex items-center justify-center px-4">
      <div className="text-center max-w-md w-full">
        {/* Code */}
        <div
          className="font-display font-semibold text-electric-primary/80 mb-4 tabular-nums"
          style={{ fontSize: "clamp(4rem, 18vw, 7rem)", lineHeight: 1 }}
          aria-label={`Error ${notFoundContent.code}`}
        >
          {notFoundContent.code}
        </div>

        <h1 className="font-display text-2xl text-white mb-3">{notFoundContent.title}</h1>
        <p className="text-white/50 text-base leading-relaxed mb-8 max-w-xs mx-auto">
          {notFoundContent.description}
        </p>

        <Link
          href="/"
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-electric-primary/15 border border-electric-primary/25 text-electric-primary font-medium text-sm transition-all duration-200 hover:bg-electric-primary/20 hover:border-electric-primary/35 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-electric-primary"
        >
          <ArrowLeft className="w-4 h-4" aria-hidden="true" />
          {notFoundContent.cta}
        </Link>
      </div>
    </div>
  )
}
