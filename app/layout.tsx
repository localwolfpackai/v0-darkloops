import type React from "react"
import type { Metadata, Viewport } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Suspense } from "react"
import "./globals.css"

export const metadata: Metadata = {
  title: "DarkLup Design System — Calm, Accessible UI Components",
  description:
    "A comprehensive design system featuring electric components, holographic effects, and technical aesthetics for next-generation web applications.",
  keywords: ["design system", "UI components", "React", "TypeScript", "Tailwind CSS", "futuristic UI"],
  authors: [{ name: "DarkLup AI Studios" }],
  generator: "v0.app",
  icons: {
    icon: { url: "/icon.svg", type: "image/svg+xml" },
    apple: "/apple-icon.png",
  },
  openGraph: {
    title: "DarkLup Design System",
    description: "A design system your AI agent can actually read.",
    type: "website",
    images: [{ url: "/og-image.png", width: 1024, height: 1024, alt: "DarkLup — a design system your AI agent can actually read" }],
  },
  twitter: {
    card: "summary",
    title: "DarkLup Design System",
    description: "A design system your AI agent can actually read.",
    images: ["/og-image.png"],
  },
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0b0b0b",
  userScalable: true,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body className="font-sans antialiased">
        <Suspense fallback={null}>{children}</Suspense>
      </body>
    </html>
  )
}
