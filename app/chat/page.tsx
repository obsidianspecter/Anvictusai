"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Send, Trash2 } from "lucide-react"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"

interface Message {
  role: "user" | "assistant"
  content: string
}

const LOCAL_STORAGE_KEY = "anvictusChatHistory"

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.3 },
}
const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

export default function ChatPage() {
  const [hasMounted, setHasMounted] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setHasMounted(true)
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY)
    if (saved) {
      setMessages(JSON.parse(saved))
    }
  }, [])

  useEffect(() => {
    if (hasMounted) {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(messages))
    }
  }, [messages, hasMounted])

  const handleClearHistory = () => {
    setMessages([])
    localStorage.removeItem(LOCAL_STORAGE_KEY)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    const userMessage: Message = { role: "user", content: input }
    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setError(null)

    try {
      setIsLoading(true)
      const res = await fetch(`/api/visus?query=${encodeURIComponent(input)}`, {
        method: "GET",
      })
      const data = await res.json()
      if (!res.ok) {
        throw new Error(data.error || "Failed to get a response from server.")
      }

      // Append the assistant's response
      const assistantMessage: Message = { role: "assistant", content: data.response }
      setMessages((prev) => [...prev, assistantMessage])
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message)
      } else {
        setError("Unknown error occurred. Please try again.")
      }
    } finally {
      setIsLoading(false)
    }
  }

  if (!hasMounted) {
    // Avoid hydration mismatch
    return null
  }

  return (
    // Add a container with an animated background
    <div className="relative min-h-screen overflow-hidden retro-background-animation">
      {/* If you want a subtle overlay or scanlines effect, you can apply extra classes here */}
      
      <motion.div
        className="container py-24 relative z-10" // z-10 ensures the chat is above the bg
        initial="initial"
        animate="animate"
        exit="exit"
        variants={stagger}
      >
        <motion.h1 className="retro-text text-4xl text-center mb-12" variants={fadeIn}>
          Chat with Anvictus AI
        </motion.h1>

        {error && (
          <motion.div
            className="max-w-2xl mx-auto mb-4 text-red-600 text-sm"
            variants={fadeIn}
          >
            Error: {error}
          </motion.div>
        )}

        <motion.div className="max-w-2xl mx-auto" variants={fadeIn}>
          <Card className="retro-card pixel-corners frosted-glass">
            <CardHeader>
              <div className="flex items-center justify-between w-full">
                <CardTitle className="retro-text text-2xl">Conversation</CardTitle>
                {messages.length > 0 && (
                  <Button
                    variant="ghost"
                    onClick={handleClearHistory}
                    aria-label="Delete chat history"
                  >
                    <Trash2 className="h-4 w-4 mr-1" />
                    Clear
                  </Button>
                )}
              </div>
            </CardHeader>

            <CardContent className="h-[400px] overflow-y-auto space-y-4">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${
                    msg.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[70%] p-3 rounded-lg ${
                      msg.role === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted"
                    }`}
                  >
                    <ReactMarkdown
                      remarkPlugins={[remarkGfm]}
                      className="retro-text text-sm markdown-content"
                    >
                      {msg.content}
                    </ReactMarkdown>
                  </div>
                </div>
              ))}
              {/* A simple "typing" indicator for the assistant */}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="max-w-[70%] p-3 rounded-lg bg-muted">
                    <p className="retro-text text-sm animate-pulse">typing...</p>
                  </div>
                </div>
              )}
            </CardContent>

            <CardFooter>
              <form onSubmit={handleSubmit} className="flex w-full space-x-2">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-grow retro-input text-sm"
                />
                <Button
                  type="submit"
                  className="retro-button pixel-corners"
                  disabled={isLoading}
                >
                  {isLoading ? "Thinking..." : <Send className="h-4 w-4" />}
                </Button>
              </form>
            </CardFooter>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  )
}
