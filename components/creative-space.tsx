"use client"

import type React from "react"
import { useState, useRef, useCallback, useEffect } from "react"
import { MousePointerClick } from "lucide-react"
import html2canvas from "html2canvas"
import { saveAs } from "file-saver"
import { LupoCard } from "./lupo-card"
import { LupoButton } from "./lupo-button"
import { LupoChip } from "./lupo-chip"
import { SectionHeader } from "./section-header"
import { AgentNote } from "./agent-note"
import { canvasContent, sectionHeaders } from "@/lib/content"

interface Element {
  id: string
  type: "shape" | "text" | "glyph"
  x: number
  y: number
  content: string
  color: string
  size: number
}

const COLORS = canvasContent.palette
const SHAPES = canvasContent.shapes
const GLYPHS = canvasContent.glyphs
const TEXTS = canvasContent.texts

type Tool = "shape" | "text" | "glyph"

const TOOLS = canvasContent.tools as { id: Tool; label: string }[]

export function CreativeSpace() {
  const [elements, setElements] = useState<Element[]>([])
  const [selectedTool, setSelectedTool] = useState<Tool>("shape")
  const canvasRef = useRef<HTMLDivElement>(null)

  const createElement = useCallback(
    (x: number, y: number, type: Tool): Element => ({
      id: `${Date.now()}-${Math.random()}`,
      type,
      x,
      y,
      content:
        type === "shape"
          ? SHAPES[Math.floor(Math.random() * SHAPES.length)]
          : type === "glyph"
            ? GLYPHS[Math.floor(Math.random() * GLYPHS.length)]
            : TEXTS[Math.floor(Math.random() * TEXTS.length)],
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      size: Math.random() * 12 + 16,
    }),
    [],
  )

  const handleCanvasClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!canvasRef.current) return
      const rect = canvasRef.current.getBoundingClientRect()
      setElements((prev) => [
        ...prev,
        createElement(e.clientX - rect.left, e.clientY - rect.top, selectedTool),
      ])
    },
    [createElement, selectedTool],
  )

  const handleCanvasKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (e.key === "Enter" || e.key === " ") {
        if (!canvasRef.current) return
        const rect = canvasRef.current.getBoundingClientRect()
        setElements((prev) => [
          ...prev,
          createElement(
            rect.width / 2 + (Math.random() - 0.5) * 180,
            rect.height / 2 + (Math.random() - 0.5) * 80,
            selectedTool,
          ),
        ])
      }
    },
    [createElement, selectedTool],
  )

  const clearCanvas = useCallback(() => setElements([]), [])

  const exportCanvas = useCallback(() => {
    const data = JSON.stringify(elements, null, 2)
    const blob = new Blob([data], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "canvas-export.json"
    a.click()
    URL.revokeObjectURL(url)
  }, [elements])

  const exportToPNG = useCallback(async () => {
    if (!canvasRef.current) return
    try {
      const canvas = await html2canvas(canvasRef.current, {
        backgroundColor: '#0b0b0b',
      })
      canvas.toBlob((blob) => {
        if (blob) {
          saveAs(blob, 'canvas-export.png')
        }
      })
    } catch (error) {
      console.error('Failed to export canvas to PNG', error)
    }
  }, [])

  // Auto-generate ambient elements
  useEffect(() => {
    if (elements.length >= 30) return
    const timeout = setTimeout(() => {
      const type = (["shape", "glyph"] as Tool[])[Math.floor(Math.random() * 2)]
      setElements((prev) => {
        if (prev.length >= 30) return prev
        return [
          ...prev,
          createElement(Math.random() * 700 + 40, Math.random() * 280 + 30, type),
        ]
      })
    }, 3500)
    return () => clearTimeout(timeout)
  }, [elements.length, createElement])

  const shapesCount = elements.filter((e) => e.type === "shape").length
  const glyphsCount = elements.filter((e) => e.type === "glyph").length
  const textsCount = elements.filter((e) => e.type === "text").length

  return (
    <div className="space-y-8">
      <SectionHeader {...sectionHeaders.creative} />

      <AgentNote section="creative" />

      {/* Toolbar */}
      <div className="flex flex-wrap justify-between items-center gap-4">
        <div className="flex gap-2" role="group" aria-label="Select element type">
          {TOOLS.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => setSelectedTool(id)}
              aria-pressed={selectedTool === id}
              className={
                selectedTool === id
                  ? "px-4 py-2 rounded-xl text-sm font-medium border transition-all duration-200 bg-electric-primary/15 text-electric-primary border-electric-primary/30"
                  : "px-4 py-2 rounded-xl text-sm font-medium border transition-all duration-200 bg-white/[0.03] text-white/50 border-white/10 hover:text-white hover:border-white/20 hover:bg-white/[0.05]"
              }
            >
              {label}
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          <LupoButton
            variant="secondary"
            size="sm"
            onClick={clearCanvas}
            aria-label="Clear canvas"
            disabled={elements.length === 0}
          >
            Clear
          </LupoButton>
          <LupoButton
            variant="primary"
            size="sm"
            onClick={exportCanvas}
            aria-label="Export as JSON"
            disabled={elements.length === 0}
          >
            Export JSON
          </LupoButton>
          <LupoButton
            variant="primary"
            size="sm"
            onClick={exportToPNG}
            aria-label="Export as PNG"
            disabled={elements.length === 0}
          >
            Export PNG
          </LupoButton>
        </div>
      </div>

      {/* Canvas */}
      <LupoCard variant="base" hover={false}>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-medium text-white/70">Canvas</h2>
          <LupoChip variant="technical" size="sm">{elements.length} elements</LupoChip>
        </div>

        <div
          ref={canvasRef}
          onClick={handleCanvasClick}
          onKeyDown={handleCanvasKeyDown}
          tabIndex={0}
          role="application"
          aria-label={`Canvas with ${elements.length} elements. Click or press Enter to add a ${selectedTool}.`}
          className="relative w-full h-72 sm:h-80 bg-white/[0.01] border border-white/[0.06] rounded-xl cursor-crosshair overflow-hidden focus-visible:outline-2 focus-visible:outline-electric-primary"
        >
          {elements.map((el) => (
            <div
              key={el.id}
              aria-hidden="true"
              className="absolute pointer-events-none select-none transition-opacity duration-300"
              style={{
                left: el.x,
                top: el.y,
                color: el.color,
                fontSize: el.size,
                transform: "translate(-50%, -50%)",
                fontFamily: el.type === "text" ? "var(--font-sans)" : undefined,
                fontWeight: el.type === "text" ? 600 : undefined,
                opacity: 0.9,
              }}
            >
              {el.content}
            </div>
          ))}

          {/* Subtle grid */}
          <div aria-hidden="true" className="absolute inset-0 opacity-[0.03] pointer-events-none">
            <svg width="100%" height="100%">
              <defs>
                <pattern id="canvas-grid" width="32" height="32" patternUnits="userSpaceOnUse">
                  <path d="M 32 0 L 0 0 0 32" fill="none" stroke="currentColor" strokeWidth="0.5" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#canvas-grid)" />
            </svg>
          </div>

          {/* Empty state */}
          {elements.length === 0 && (
            <div
              aria-hidden="true"
              className="absolute inset-0 flex flex-col items-center justify-center gap-2 pointer-events-none"
            >
              <MousePointerClick className="w-8 h-8 text-white/40" />
              <p className="text-white/55 text-sm">{canvasContent.emptyState}</p>
            </div>
          )}
        </div>
      </LupoCard>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <LupoCard variant="base" hover={false} className="p-4">
          <div className="text-center">
            <div className="text-2xl font-medium text-electric-primary tabular-nums">{shapesCount}</div>
            <div className="text-xs text-white/55 mt-1">Shapes</div>
          </div>
        </LupoCard>
        <LupoCard variant="base" hover={false} className="p-4">
          <div className="text-center">
            <div className="text-2xl font-medium text-electric-secondary tabular-nums">{glyphsCount}</div>
            <div className="text-xs text-white/55 mt-1">Symbols</div>
          </div>
        </LupoCard>
        <LupoCard variant="base" hover={false} className="p-4">
          <div className="text-center">
            <div className="text-2xl font-medium text-white tabular-nums">{textsCount}</div>
            <div className="text-xs text-white/55 mt-1">Text</div>
          </div>
        </LupoCard>
      </div>
    </div>
  )
}
