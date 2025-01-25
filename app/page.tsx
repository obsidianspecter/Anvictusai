"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowUpRight, MessageSquare, Brain, Zap } from "lucide-react"

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
}

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center scanlines">
      <motion.section
        className="container flex flex-col items-center justify-center gap-6 py-24 text-center"
        initial="initial"
        animate="animate"
        variants={stagger}
      >
        <motion.h1 className="retro-text text-5xl font-bold tracking-tight sm:text-6xl md:text-7xl" variants={fadeIn}>
          <span className="text-primary">Anvictus</span> AI <span className="text-primary">Assistant</span>
        </motion.h1>
        <motion.p className="max-w-[42rem] text-lg text-muted-foreground sm:text-xl" variants={fadeIn}>
          Experience cutting-edge language AI technology with a retro twist
        </motion.p>
        <motion.div variants={fadeIn}>
          <Button asChild className="retro-button pixel-corners">
            <Link href="/chat">
              Chat with Anvictus AI <ArrowUpRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </motion.div>
      </motion.section>

      <motion.section
        className="container py-24"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        variants={stagger}
      >
        <motion.h2 className="mb-12 text-center retro-text text-3xl" variants={fadeIn}>
          Core Features
        </motion.h2>
        <motion.div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3" variants={stagger}>
          {[
            {
              icon: MessageSquare,
              title: "Natural Conversations",
              description: "Engage in human-like dialogues on various topics",
            },
            {
              icon: Brain,
              title: "Advanced Language Model",
              description: "Powered by state-of-the-art open-source LLMs",
            },
            {
              icon: Zap,
              title: "Real-time Responses",
              description: "Get instant, context-aware replies",
            },
          ].map((feature, index) => (
            <motion.div key={index} variants={fadeIn}>
              <Card className="retro-card pixel-corners frosted-glass transition-colors hover:border-primary h-full">
                <CardHeader>
                  <feature.icon className="h-10 w-10 text-primary" />
                  <CardTitle className="retro-text text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">{feature.description}</CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      <motion.section
        className="container py-24"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        variants={stagger}
      >
        <motion.h2 className="mb-12 text-center retro-text text-3xl" variants={fadeIn}>
          Applications
        </motion.h2>
        <motion.div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3" variants={stagger}>
          {[
            {
              title: "Personal Assistant",
              description: "Manage tasks, schedules, and reminders",
            },
            {
              title: "Content Creation",
              description: "Generate ideas and assist in writing",
            },
            {
              title: "Code Generation",
              description: "Help with programming tasks and debugging",
            },
          ].map((app, index) => (
            <motion.div key={index} variants={fadeIn}>
              <Card className="retro-card pixel-corners frosted-glass transition-colors hover:border-primary h-full">
                <CardHeader>
                  <CardTitle className="retro-text text-lg">{app.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">{app.description}</CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>
    </div>
  )
}

