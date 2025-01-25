"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

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

export default function AboutPage() {
  return (
    <motion.div className="container py-24" initial="initial" animate="animate" variants={stagger}>
      <motion.h1 className="mb-12 text-center hacker-text text-3d text-4xl font-bold" variants={fadeIn}>
        About Anvictus AI
      </motion.h1>
      <motion.div className="grid gap-6 md:grid-cols-2" variants={stagger}>
        <motion.div variants={fadeIn}>
          <Card className="card-3d">
            <CardHeader>
              <CardTitle className="hacker-text">Our Technology</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                Anvictus AI leverages cutting-edge open-source language models to provide advanced natural language
                processing capabilities. Our platform combines state-of-the-art AI techniques with an intuitive user
                interface to make powerful language models accessible to everyone.
              </p>
            </CardContent>
          </Card>
        </motion.div>
        <motion.div variants={fadeIn}>
          <Card className="card-3d">
            <CardHeader>
              <CardTitle className="hacker-text">Open-Source Philosophy</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                We believe in the power of open-source software to drive innovation and collaboration. By making
                Anvictus AI open-source, we aim to:
              </p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>Encourage community contributions and improvements</li>
                <li>Ensure transparency and trust in AI systems</li>
                <li>Provide a platform for learning and experimentation</li>
                <li>Foster the development of ethical and responsible AI</li>
              </ul>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

