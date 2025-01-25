"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Send } from "lucide-react"

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
  const [messages, setMessages] = useState<{ role: "user" | "assistant"; content: string }[]>([])
  const [input, setInput] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    const userMessage = { role: "user" as const, content: input }
    setMessages((prev) => [...prev, userMessage])
    setInput("")

    // TODO: Implement actual API call to Anvictus AI
    // For now, we'll just simulate a response
    setTimeout(() => {
      const assistantMessage = {
        role: "assistant" as const,
        content: "This is a simulated response from Anvictus AI. Actual implementation pending.",
      }
      setMessages((prev) => [...prev, assistantMessage])
    }, 1000)
  }

  return (
    <motion.div className="container py-24" initial="initial" animate="animate" exit="exit" variants={stagger}>
      <motion.h1 className="retro-text text-4xl text-center mb-12" variants={fadeIn}>
        Chat with Anvictus AI
      </motion.h1>
      <Card className="max-w-2xl mx-auto retro-card pixel-corners frosted-glass">
        <CardHeader>
          <CardTitle className="retro-text text-2xl">Conversation</CardTitle>
        </CardHeader>
        <CardContent className="h-[400px] overflow-y-auto space-y-4">
          {messages.map((message, index) => (
            <div key={index} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-[70%] p-3 rounded-lg ${
                  message.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
                }`}
              >
                <p className="retro-text text-sm">{message.content}</p>
              </div>
            </div>
          ))}
        </CardContent>
        <CardFooter>
          <form onSubmit={handleSubmit} className="flex w-full space-x-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              className="flex-grow retro-input text-sm"
            />
            <Button type="submit" className="retro-button pixel-corners">
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </CardFooter>
      </Card>
    </motion.div>
  )
}

