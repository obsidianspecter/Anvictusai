// app/layout.tsx (Server layout)

import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

import "./globals.css"

// This file is a Server Component: no "use client" here
const inter = Inter({ subsets: ["latin"] })

// Next.js server-side metadata
export const metadata: Metadata = {
  title: "Anvictus AI Platform",
  description: "Open-source LLM for everyday use",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className="bg-white dark:bg-gray-900">
      <body className={`${inter.className} text-black dark:text-white`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {/* 
            Navbar & Footer remain on the server layout. 
            We'll wrap children with the client layout in each page (or a nested layout).
          */}
          <div className="flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
