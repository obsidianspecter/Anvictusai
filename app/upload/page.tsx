"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Upload, Send, Download, MessageSquare, ChevronRight } from "lucide-react"

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: { duration: 0.3 },
}

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null)
  const [message, setMessage] = useState("")
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisResult, setAnalysisResult] = useState<string | null>(null)
  const [showMore, setShowMore] = useState(false)
  const [chatQuery, setChatQuery] = useState("")
  const [chatResponse, setChatResponse] = useState<string | null>(null)
  const [chatError, setChatError] = useState<string | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0])
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!file) return

    setIsAnalyzing(true)
    const formData = new FormData()
    formData.append("image", file)
    formData.append("message", message)

    try {
      const response = await fetch("/api/visus", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        throw new Error("Failed to process image")
      }

      const data = await response.json()
      setAnalysisResult(data.result)
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error processing image:", error.message)
        setAnalysisResult("Error processing image. Please try again.")
      } else {
        console.error("Unknown error processing image:", error)
        setAnalysisResult("An unknown error occurred. Please try again.")
      }
    } finally {
      setIsAnalyzing(false)
    }
  }

  const handleChatSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!chatQuery) return

    setChatResponse(null)
    setChatError(null)

    try {
      const response = await fetch(`/api/visus?query=${encodeURIComponent(chatQuery)}`, {
        method: "GET",
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to process chat query")
      }

      setChatResponse(data.response)
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error processing chat query:", error.message)
        setChatError(error.message || "Error processing chat query. Please try again.")
      } else {
        console.error("Unknown error processing chat query:", error)
        setChatError("An unknown error occurred. Please try again.")
      }
    }
  }

  return (
    <motion.div className="container py-24" initial="initial" animate="animate" exit="exit" variants={stagger}>
      <motion.h1 className="retro-text text-4xl text-center mb-12" variants={fadeIn}>
        Upload and Analyze
      </motion.h1>
      <div className="grid gap-6 lg:grid-cols-2">
        <AnimatePresence>
          <motion.div variants={fadeIn} layout>
            <Card className="pixel-corners">
              <form onSubmit={handleSubmit}>
                <CardHeader>
                  <CardTitle className="retro-text text-2xl">Upload Image</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid w-full items-center gap-1.5">
                    <Label htmlFor="image" className="retro-text text-sm">
                      Image
                    </Label>
                    <Input
                      id="image"
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="retro-text text-xs"
                    />
                  </div>
                  <div className="grid w-full items-center gap-1.5">
                    <Label htmlFor="message" className="retro-text text-sm">
                      Message
                    </Label>
                    <Textarea
                      id="message"
                      placeholder="Ask Visus AI about the image..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="retro-text text-xs"
                    />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button
                    type="submit"
                    className="w-full retro-text text-sm pixel-border"
                    disabled={!file || isAnalyzing}
                  >
                    {isAnalyzing ? (
                      <>Analyzing...</>
                    ) : file ? (
                      <>
                        Analyze with Visus AI <Send className="ml-2 h-4 w-4" />
                      </>
                    ) : (
                      <>
                        Upload Image <Upload className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </motion.div>
          <motion.div variants={fadeIn} layout>
            <Card className="pixel-corners">
              <CardHeader>
                <CardTitle className="retro-text text-2xl">Analysis Results</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {analysisResult ? (
                  <>
                    <p className="retro-text text-lg">{analysisResult}</p>
                    {showMore && (
                      <div className="mt-4 space-y-2 text-sm text-muted-foreground">
                        <p>Additional insights:</p>
                        <ul className="space-y-2">
                          <li className="flex items-center">
                            <span className="mr-2 text-primary">→</span> Estimated time period: Modern (21st century)
                          </li>
                          <li className="flex items-center">
                            <span className="mr-2 text-primary">→</span> Dominant colors: Black, White
                          </li>
                          <li className="flex items-center">
                            <span className="mr-2 text-primary">→</span> Mood: Stark, Minimalistic
                          </li>
                        </ul>
                      </div>
                    )}
                  </>
                ) : (
                  <p className="retro-text text-lg">Upload an image to see analysis results here.</p>
                )}
              </CardContent>
              <CardFooter className="flex flex-col space-y-2">
                {analysisResult && (
                  <>
                    <Button className="w-full retro-text text-sm pixel-border" onClick={() => setShowMore(!showMore)}>
                      {showMore ? "Show Less" : "Show More"}{" "}
                      <ChevronRight className={`ml-2 h-4 w-4 transition-transform ${showMore ? "rotate-90" : ""}`} />
                    </Button>
                    <Button className="w-full retro-text text-sm pixel-border">
                      <Download className="mr-2 h-4 w-4" /> Download Analysis
                    </Button>
                  </>
                )}
              </CardFooter>
            </Card>
          </motion.div>
        </AnimatePresence>
      </div>
      <AnimatePresence>
        <motion.div variants={fadeIn} layout className="mt-6">
          <Card className="pixel-corners">
            <CardHeader>
              <CardTitle className="retro-text text-2xl">Chat with Visus AI</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <form onSubmit={handleChatSubmit}>
                <div className="grid w-full items-center gap-1.5">
                  <Label htmlFor="chatQuery" className="retro-text text-sm">
                    Ask a question
                  </Label>
                  <Textarea
                    id="chatQuery"
                    placeholder="Ask Visus AI a question..."
                    value={chatQuery}
                    onChange={(e) => setChatQuery(e.target.value)}
                    className="retro-text text-xs"
                  />
                </div>
                <Button type="submit" className="w-full mt-2 retro-text text-sm pixel-border">
                  Send Query <Send className="ml-2 h-4 w-4" />
                </Button>
              </form>
              {chatError && (
                <div className="mt-4">
                  <p className="text-sm text-red-500">{chatError}</p>
                </div>
              )}
              {chatResponse && (
                <div className="mt-4">
                  <h3 className="retro-text text-lg mb-2">Visus AI Response:</h3>
                  <p className="text-sm text-muted-foreground">{chatResponse}</p>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  )
}
