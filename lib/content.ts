import {
  Component,
  Palette,
  Sparkles,
  Users,
  Sun,
  Waves,
  Grid3x3,
  type LucideIcon,
} from "lucide-react"

/**
 * Centralized content for the DarkLup Design System docs.
 *
 * All user-facing copy lives here so the documentation can be reused
 * as a template: update text in one place, no component edits required.
 */

export const siteConfig = {
  name: "DarkLup",
  fullName: "DarkLup Design System",
  tagline: "Made by Lupo",
  githubUrl: "https://github.com/localwolfpackai/v0-darkloops",
  devToolsNote:
    "While working with DevTools to test, the DevTools AI noted that this system\u2019s strength lies in its \u201cStructural Dichotomy\u201d\u2014the clear separation between human-readable design and agent-native context.",
} as const

/** Sections that appear in the navigation and drive routing. */
export const navSections = [
  { id: "overview", label: "Overview", shortLabel: "Home" },
  { id: "components", label: "Components", shortLabel: "Components" },
  { id: "colors", label: "Colors", shortLabel: "Colors" },
  { id: "typography", label: "Typography", shortLabel: "Type" },
  { id: "effects", label: "Effects", shortLabel: "Effects" },
  { id: "prompts", label: "Prompts", shortLabel: "Prompts" },
  { id: "ai", label: "Assistant", shortLabel: "Chat" },
  { id: "creative", label: "Canvas", shortLabel: "Canvas" },
] as const

export type SectionId = (typeof navSections)[number]["id"]

/** Reusable section header copy, keyed by section id. */
export const sectionHeaders: Record<string, { title: string; description: string }> = {
  components: {
    title: "Components",
    description: "A collection of flexible UI elements designed to work together seamlessly.",
  },
  colors: {
    title: "Colors",
    description: "A focused palette built for clarity and accessibility.",
  },
  typography: {
    title: "Typography",
    description: "A clear type system with balanced weights and comfortable reading sizes.",
  },
  effects: {
    title: "Effects",
    description: "Subtle animations and visual touches that add polish without distraction.",
  },
  prompts: {
    title: "Prompts",
    description: "Copy-ready prompts for building with DarkLup. Use them as starting points and adapt the details to your project.",
  },
  ai: {
    title: "Assistant",
    description: "A simple chat interface for exploring ideas and getting help. Type a message to get started.",
  },
  creative: {
    title: "Canvas",
    description: "A simple playground for placing shapes and symbols. Click anywhere to add elements.",
  },
}

/* ---------------------------------- Hero ---------------------------------- */

export interface HeroFeature {
  icon: LucideIcon
  title: string
  description: string
  label: string
  section: SectionId
}

export const heroContent = {
  badge: "Design System",
  eyebrow: "Built for humans. Readable by agents.",
  wordmark: "DarkLup",
  title: "A design system your AI agent can actually read",
  description:
    "A calm, structured interface for people — and a clear surface an AI agent can read the moment it launches.",
  audienceForHumans: "For humans",
  audienceForAgents: "For AI agents",
  primaryCta: { label: "Browse Components", section: "components" as SectionId },
  secondaryCta: { label: "View Foundations", section: "colors" as SectionId },
}

export const heroFeatures: HeroFeature[] = [
  {
    icon: Component,
    title: "Thoughtful Components",
    description: "Carefully crafted UI building blocks that feel natural and work beautifully together.",
    label: "Components",
    section: "components",
  },
  {
    icon: Palette,
    title: "Color and Type",
    description: "A cohesive palette and typography system designed for clarity and visual harmony.",
    label: "Foundations",
    section: "colors",
  },
  {
    icon: Sparkles,
    title: "Subtle Motion",
    description: "Gentle animations and transitions that guide without overwhelming.",
    label: "Effects",
    section: "effects",
  },
  {
    icon: Users,
    title: "Made for Everyone",
    description: "Accessible by default, responsive across all screens, and easy to customize.",
    label: "Inclusive",
    section: "components",
  },
]

export const heroStats = [
  { value: "15+", label: "Components" },
  { value: "8", label: "Variants" },
  { value: "4", label: "Effects" },
  { value: "100%", label: "Accessible" },
]

/* ------------------------------- Agent Notes ------------------------------ */

/**
 * Agent-directed annotations. Every section carries one so the design system
 * literally speaks to an AI agent: a plain-language directive, machine-readable
 * usage facts, and an optional copy-ready instruction the agent can reuse.
 */
export interface AgentNote {
  /** What DarkLup "says" directly to the agent reading this page. */
  directive: string
  /** Machine-readable facts: stable keys an agent can rely on. */
  usage: { key: string; value: string }[]
  /** Optional copy-ready instruction phrased for an agent. */
  prompt?: string
}

export const agentNotes: Record<string, AgentNote> = {
  overview: {
    directive:
      "Agent: you are looking at DarkLup. Treat this page as the canonical source of truth for tokens, components, and copy. Read it top to bottom — every section is self-describing and labeled for you.",
    usage: [
      { key: "system", value: "DarkLup Design System" },
      { key: "audience", value: "humans + AI agents" },
      { key: "theme", value: "dark, calm, accessible" },
      { key: "entry-point", value: "Overview → Components → Foundations" },
    ],
    prompt:
      "Read the DarkLup design system end to end. Summarize its tokens, component variants, and tone, then build using only the documented primitives.",
  },
  components: {
    directive:
      "Agent: import these primitives directly — do not reinvent them. Each accepts a `variant` and `size` prop. The enumerated values below are the only supported ones.",
    usage: [
      { key: "LupoButton.variant", value: "primary | secondary | electric | holographic | neon | power" },
      { key: "LupoCard.variant", value: "base | electric | circuit | holographic | data | status" },
      { key: "LupoChip.variant", value: "default | active | electric | technical | success | warning" },
      { key: "size", value: "sm | md | lg" },
    ],
    prompt:
      "Build the UI using DarkLup's LupoButton, LupoCard, and LupoChip. Only use the documented variant and size values — never hardcode bespoke styles.",
  },
  colors: {
    directive:
      "Agent: reference tokens by name, never paste raw hex into components. The surface is near-black and the single accent is electric blue; keep contrast at WCAG AA or better.",
    usage: [
      { key: "background", value: "#0B0B0B → bg-background-dark" },
      { key: "text", value: "#FFFFFF → text-white" },
      { key: "accent", value: "#45A3FF → text-electric-primary" },
      { key: "secondary", value: "#6B7FFF → text-electric-secondary" },
      { key: "contrast-target", value: "WCAG AA" },
    ],
    prompt:
      "Apply DarkLup colors through the named tokens (bg-background-dark, text-electric-primary). Verify every text pairing meets WCAG AA on the dark surface.",
  },
  typography: {
    directive:
      "Agent: map roles to classes. Headings use the display family, body uses the default sans, and code/labels use mono. Keep body line-height relaxed for readability.",
    usage: [
      { key: "display", value: "font-display (headings, titles)" },
      { key: "body", value: "default sans (paragraphs, UI)" },
      { key: "mono", value: "font-mono (code, labels)" },
      { key: "body-leading", value: "leading-relaxed" },
    ],
    prompt:
      "Type-set content with DarkLup roles: font-display for headings, default sans for body, font-mono for labels, and leading-relaxed for paragraphs.",
  },
  effects: {
    directive:
      "Agent: effects are purely decorative and are marked aria-hidden. Apply them sparingly and never gate content, meaning, or interaction behind an effect.",
    usage: [
      { key: "effect-types", value: "glow | shimmer | circuit | matrix" },
      { key: "role", value: "decorative only" },
      { key: "accessibility", value: "aria-hidden, non-blocking" },
    ],
    prompt:
      "Add DarkLup effects (glow, shimmer, circuit, matrix) as subtle decoration only. Keep them aria-hidden and ensure content remains fully usable without them.",
  },
  prompts: {
    directive:
      "Agent: these prompts are pre-aligned to DarkLup conventions. Copy one verbatim as a starting instruction, then adapt the specifics — they already encode the system's tone and spacing rules.",
    usage: [
      { key: "categories", value: "Layouts | Components | Content | Refinement" },
      { key: "format", value: "copy-ready, single instruction" },
      { key: "usage", value: "seed your build, then adapt details" },
    ],
    prompt:
      "Pick the closest DarkLup prompt, copy it verbatim as your starting instruction, then adjust only the project-specific details.",
  },
  ai: {
    directive:
      "Agent: this is a demo chat shell with canned responses — not a live model. Wire it to a real provider before relying on any output, and keep the aria-live log intact.",
    usage: [
      { key: "state", value: "demo / mock responses" },
      { key: "live-region", value: "role=log, aria-live=polite" },
      { key: "before-use", value: "connect a real AI provider" },
    ],
    prompt:
      "Treat the DarkLup assistant as a UI shell only. Connect it to a real AI provider before depending on responses, preserving the accessible live-region markup.",
  },
  creative: {
    directive:
      "Agent: the canvas stores every element as structured JSON. Use Export to retrieve a serializable snapshot — that JSON is the machine-readable contract for this view.",
    usage: [
      { key: "tools", value: "shape | glyph | text" },
      { key: "export", value: "JSON array of {id,type,x,y,content,color,size}" },
      { key: "input", value: "click or Enter/Space to place" },
    ],
    prompt:
      "Interact with the DarkLup canvas, then use Export to capture the elements as JSON. Parse that JSON snapshot rather than reading the rendered DOM.",
  },
}

/* --------------------------------- Colors --------------------------------- */

export interface ColorToken {
  color: string
  name: string
  value: string
  description?: string
}

export const colorTokens: ColorToken[] = [
  { color: "#0B0B0B", name: "Background", value: "#0B0B0B", description: "Page background" },
  { color: "#FFFFFF", name: "Text", value: "#FFFFFF", description: "Primary text" },
  { color: "rgba(255,255,255,0.6)", name: "Text Secondary", value: "rgba(255,255,255,0.6)" },
  { color: "rgba(255,255,255,0.55)", name: "Text Muted", value: "rgba(255,255,255,0.55)" },
  { color: "#45A3FF", name: "Primary", value: "#45A3FF", description: "Main accent" },
  { color: "#6B7FFF", name: "Secondary", value: "#6B7FFF", description: "Supporting accent" },
  { color: "#10B981", name: "Success", value: "#10B981" },
  { color: "#F59E0B", name: "Warning", value: "#F59E0B" },
  { color: "#EF4444", name: "Error", value: "#EF4444" },
]

export const gradientTokens = [
  { className: "metallic-gradient", name: "Metallic", description: "Button highlights" },
  { className: "electric-gradient", name: "Accent", description: "Feature elements" },
  { className: "electric-blue-gradient", name: "Primary", description: "Call to action" },
]

/* -------------------------------- Effects --------------------------------- */

export type EffectType = "glow" | "shimmer" | "circuit" | "matrix"

export interface EffectItem {
  title: string
  description: string
  effectType: EffectType
  icon: LucideIcon
}

export const effects: EffectItem[] = [
  {
    title: "Soft Glow",
    description: "A gentle highlight for active states and important elements.",
    effectType: "glow",
    icon: Sun,
  },
  {
    title: "Light Sweep",
    description: "Subtle diagonal shimmer for premium or featured content.",
    effectType: "shimmer",
    icon: Sparkles,
  },
  {
    title: "Line Drawing",
    description: "Animated paths that suggest connection and flow.",
    effectType: "circuit",
    icon: Waves,
  },
  {
    title: "Dot Grid",
    description: "A quiet pulsing texture for technical backgrounds.",
    effectType: "matrix",
    icon: Grid3x3,
  },
]

/* ------------------------------- Typography ------------------------------- */

export const fontFamilies = [
  { className: "font-display", sample: "Display", description: "Geist or Inter. Used for headings and titles." },
  { className: "", sample: "Body", description: "Inter Tight. Used for paragraphs and UI text." },
  { className: "font-mono", sample: "Monospace", description: "DM Mono. Used for code and technical labels." },
]

export const headingScale = [
  { className: "font-display text-4xl", sample: "Heading 1", spec: "text-4xl / 36px" },
  { className: "font-display text-2xl", sample: "Heading 2", spec: "text-2xl / 24px" },
  { className: "font-display text-xl", sample: "Heading 3", spec: "text-xl / 20px" },
  { className: "font-medium text-lg", sample: "Heading 4", spec: "text-lg / 18px" },
]

export const bodyTextSamples = [
  { className: "text-white", text: "Primary text is white with comfortable line-height for easy reading." },
  { className: "text-white/60", text: "Secondary text uses reduced opacity for supporting information." },
  { className: "text-white/35", text: "Muted text is for hints, captions, and less important details." },
]

export const sampleLabels = ["Active", "v2.0", "1920×1080", "8pt grid"]

/* --------------------------------- Prompts -------------------------------- */

export interface PromptItem {
  id: string
  category: string
  title: string
  prompt: string
}

export const promptCategories = ["Layouts", "Components", "Content", "Refinement"] as const

export type PromptCategory = (typeof promptCategories)[number]

export const prompts: PromptItem[] = [
  {
    id: "hero",
    category: "Layouts",
    title: "Landing hero",
    prompt:
      "Create a landing hero using the DarkLup overview pattern: a short eyebrow label, a balanced headline, one supporting paragraph, and two buttons (primary and secondary). Keep the tone calm and confident.",
  },
  {
    id: "feature-grid",
    category: "Layouts",
    title: "Feature grid",
    prompt:
      "Build a responsive feature grid with four base cards. Each card has a single Lucide icon, a concise title, and a one-line description. Use the 8pt spacing scale and consistent border radii.",
  },
  {
    id: "dashboard",
    category: "Layouts",
    title: "Dashboard shell",
    prompt:
      "Lay out a dashboard shell with a sticky top navigation, a left column of summary stat cards, and a main content area. Keep everything on the dark background with subtle borders.",
  },
  {
    id: "pricing",
    category: "Components",
    title: "Pricing tiers",
    prompt:
      "Design a three-tier pricing section using DarkLup cards. Use the electric variant to highlight the recommended plan, and keep the feature lists short and scannable.",
  },
  {
    id: "form",
    category: "Components",
    title: "Contact form",
    prompt:
      "Assemble a contact form from the input and button components with accessible labels, helpful placeholders, and inline validation states for success and error.",
  },
  {
    id: "chips",
    category: "Components",
    title: "Status chips",
    prompt:
      "Show a set of status chips (default, active, success, warning) with matching icons, and explain when to use each variant.",
  },
  {
    id: "empty-state",
    category: "Content",
    title: "Empty state copy",
    prompt:
      "Write calm, encouraging microcopy for an empty state that invites the user to add their first item, with a short heading and one supporting sentence.",
  },
  {
    id: "onboarding",
    category: "Content",
    title: "Onboarding steps",
    prompt:
      "Generate three onboarding steps as numbered cards with short, friendly descriptions that guide a new user without overwhelming them.",
  },
  {
    id: "contrast",
    category: "Refinement",
    title: "Contrast audit",
    prompt:
      "Review this layout for WCAG AA contrast and suggest token adjustments that keep the calm, dark aesthetic while improving readability of muted text.",
  },
  {
    id: "spacing",
    category: "Refinement",
    title: "Spacing pass",
    prompt:
      "Tighten spacing across this page using a consistent 8pt scale, align all border radii to the system, and ensure every interactive element has a 200ms hover transition.",
  },
]

/* -------------------------------- Assistant ------------------------------- */

export const assistantContent = {
  greeting: "Hello! I'm here to help. What would you like to explore?",
  placeholder: "Type a message…",
  helperText: "This is a demo interface. In a real application, this would connect to an AI service.",
  responses: [
    "That's an interesting question. Let me think through the best approach for you.",
    "I can help with that. Here's what I'd suggest based on what you've shared.",
    "Good thinking. There are a few ways to approach this, depending on your priorities.",
    "I see what you're going for. Let me offer some ideas that might work well.",
    "Thanks for the context. Here's a straightforward way to move forward.",
    "That makes sense. I'd recommend starting with the simplest solution first.",
    "Understood. Here's how I'd break this down into manageable steps.",
    "Great question. The key considerations here are clarity and consistency.",
  ],
}

/* --------------------------------- Canvas --------------------------------- */

export const canvasContent = {
  palette: ["#45a3ff", "#6b7fff", "#10b981", "#f59e0b", "#a78bfa", "#f472b6"],
  shapes: ["◉", "◆", "▲", "●", "■", "⬢"],
  glyphs: ["✦", "◈", "⟨", "┌", "▶", "○"],
  texts: ["Hi", "Yes", "Go", "New", "OK", "Fun"],
  tools: [
    { id: "shape", label: "Shapes" },
    { id: "glyph", label: "Symbols" },
    { id: "text", label: "Text" },
  ],
  emptyState: "Click to add elements",
}

/* --------------------------------- Footer --------------------------------- */

export const notFoundContent = {
  code: "404",
  title: "Page not found",
  description: "The page you're looking for doesn't exist or may have moved.",
  cta: "Return home",
}
