import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"

export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <span className="retro-text text-2xl font-bold">Anvictus AI</span>
        </Link>
        <div className="flex items-center space-x-6">
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
          <ThemeToggle />
          <Button variant="default" size="sm" className="retro-button pixel-corners">
            Try Anvictus AI
          </Button>
        </div>
      </div>
    </nav>
  )
}

