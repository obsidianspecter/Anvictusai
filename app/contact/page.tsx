"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
}

export default function ContactPage() {
  return (
    <motion.div
      className="container py-24"
      initial="initial"
      animate="animate"
      variants={fadeIn}
    >
      <Card className="mx-auto max-w-md retro-card pixel-corners frosted-glass">
        <CardHeader>
          <CardTitle className="retro-text text-2xl">Contact Us</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="name" className="retro-text text-sm">
              Name
            </Label>
            <Input id="name" placeholder="Your name" className="retro-input text-sm" />
          </div>
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="email" className="retro-text text-sm">
              Email
            </Label>
            <Input id="email" type="email" placeholder="Your email" className="retro-input text-sm" />
          </div>
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="message" className="retro-text text-sm">
              Message
            </Label>
            <Textarea id="message" placeholder="Your message" className="retro-input text-sm" />
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full retro-button pixel-corners">
            Send Message
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  )
}
