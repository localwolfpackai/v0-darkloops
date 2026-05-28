"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import { Send } from "lucide-react"
import { LupoCard } from "./lupo-card"
import { LupoButton } from "./lupo-button"
import { SectionHeader } from "./section-header"
import { AgentNote } from "./agent-note"
import { assistantContent, sectionHeaders } from "@/lib/content"
import { cn } from "@/lib/utils"

interface Message {
  id: string
  type: "user" | "assistant"
  content: string
  timestamp: Date
}

const responses = assistantContent.responses

export function AIZone() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "assistant",
      content: assistantContent.greeting,
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [])

  useEffect(() => {
    scrollToBottom()
  }, [messages, scrollToBottom])

  const handleSend = useCallback(async () => {
    const trimmed = input.trim()
    if (!trimmed || isTyping) return

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: trimmed,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsTyping(true)

    setTimeout(() => {
      const reply: Message = {
        id: (Date.now() + 1).toString(),
        type: "assistant",
        content: responses[Math.floor(Math.random() * responses.length)],
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, reply])
      setIsTyping(false)
      setTimeout(() => inputRef.current?.focus(), 50)
    }, 1200 + Math.random() * 600)
  }, [input, isTyping])

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="space-y-8">
      <SectionHeader {...sectionHeaders.ai} />

      <AgentNote section="ai" className="max-w-2xl mx-auto" />

      {/* Chat Interface */}
      <div className="max-w-2xl mx-auto">
        <LupoCard variant="base" hover={false}>
          <div className="flex flex-col h-[420px]">
            {/* Messages */}
            <div
              className="flex-1 overflow-y-auto space-y-3 mb-4 pr-1"
              role="log"
              aria-live="polite"
              aria-label="Conversation"
            >
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={cn("flex", message.type === "user" ? "justify-end" : "justify-start")}
                >
                  <div
                    className={cn(
                      "max-w-xs sm:max-w-sm px-4 py-3 rounded-2xl text-sm leading-relaxed",
                      message.type === "user"
                        ? "bg-electric-primary/15 text-white border border-electric-primary/25 rounded-br-lg"
                        : "bg-white/[0.04] text-white/90 border border-white/10 rounded-bl-lg",
                    )}
                  >
                    <p>{message.content}</p>
                    <time
                      className="text-xs text-white/55 mt-2 block"
                      dateTime={message.timestamp.toISOString()}
                    >
                      {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </time>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex justify-start" aria-live="polite">
                  <div className="bg-white/[0.04] border border-white/10 px-4 py-3 rounded-2xl rounded-bl-lg">
                    <div className="flex items-center gap-1.5">
                      {[0, 1, 2].map((i) => (
                        <div
                          key={i}
                          className="w-1.5 h-1.5 bg-white/40 rounded-full animate-pulse"
                          style={{ animationDelay: `${i * 150}ms` }}
                          aria-hidden="true"
                        />
                      ))}
                      <span className="sr-only">Typing...</span>
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="flex gap-2 pt-3 border-t border-white/[0.07]">
              <label htmlFor="chat-input" className="sr-only">
                Type your message
              </label>
              <input
                id="chat-input"
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={assistantContent.placeholder}
                disabled={isTyping}
                autoComplete="off"
                className="flex-1 bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-white/50 focus:outline-none focus:border-electric-primary/50 focus:bg-white/[0.05] transition-all duration-200 disabled:opacity-50"
              />
              <LupoButton
                variant="primary"
                size="md"
                onClick={handleSend}
                isLoading={isTyping}
                disabled={isTyping || !input.trim()}
                aria-label="Send message"
              >
                {!isTyping && <Send className="w-4 h-4" aria-hidden="true" />}
                <span className="hidden sm:inline">Send</span>
              </LupoButton>
            </div>
          </div>
        </LupoCard>
      </div>

      {/* Helper text */}
      <p className="text-center text-white/55 text-sm max-w-md mx-auto">
        {assistantContent.helperText}
      </p>
    </div>
  )
}
