import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"

// Import icons from Lucide React
import { Github, Linkedin, Instagram } from "lucide-react"

export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <span className="retro-text text-2xl font-bold">Anvictus AI</span>
        </Link>

        <div className="flex items-center space-x-6">
          {/* Main Nav Links */}
          <nav className="flex items-center space-x-6">
            {["Home", "Chat", "About", "Contact"].map((item) => (
              <Link
                key={item}
                href={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                className="retro-text text-sm transition-colors hover:text-primary"
              >
                {item}
              </Link>
            ))}
          </nav>

          {/* Theme Toggle */}
          <ThemeToggle />

          {/* GitHub icon */}
          <Link
            href="https://github.com/obsidianspecter"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="text-sm transition-colors hover:text-primary"
          >
            <Github className="h-5 w-5" />
          </Link>

          {/* LinkedIn icon */}
          <Link
            href="https://www.linkedin.com/in/anvin141/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="text-sm transition-colors hover:text-primary"
          >
            <Linkedin className="h-5 w-5" />
          </Link>

          {/* Instagram icon */}
          <Link
            href="https://www.instagram.com/_a.nvi.n_/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="text-sm transition-colors hover:text-primary"
          >
            <Instagram className="h-5 w-5" />
          </Link>

          {/* “Try Anvictus AI” -> /chat */}
          <Button
            asChild
            variant="default"
            size="sm"
            className="retro-button pixel-corners"
          >
            <Link href="/chat">Try Anvictus AI</Link>
          </Button>
        </div>
      </div>
    </nav>
  )
}
