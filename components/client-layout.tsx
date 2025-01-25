"use client"

import { ReactNode, useEffect, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"

interface ClientLayoutProps {
  children: ReactNode
}

export default function ClientLayout({ children }: ClientLayoutProps) {
  // Track whether it's the very first render
  const [isInitialRender, setIsInitialRender] = useState(true)

  useEffect(() => {
    setIsInitialRender(false)
  }, [])

  return (
    // No "appear" prop here
    <AnimatePresence mode="wait">
      <motion.main
        key="main-content"
        // If it's the initial render, skip the animation by setting `initial` to `false`.
        initial={isInitialRender ? false : { opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
      >
        {children}
      </motion.main>
    </AnimatePresence>
  )
}
