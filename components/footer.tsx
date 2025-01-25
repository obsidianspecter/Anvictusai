import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
// NEW: Import icons from Lucide
import { Github, Linkedin, Instagram } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container py-10">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Left Column: Branding */}
          <div>
            <h3 className="mb-4 retro-text text-lg">Anvictus AI Platform</h3>
            <p className="text-xs text-muted-foreground">
              Retro-styled Language AI for the Modern Age
            </p>
          </div>

          {/* Right Column(s): Quick Links, Legal, Newsletter, Social */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4 lg:col-span-2">
            {/* Quick Links */}
            <div>
              <h4 className="mb-4 retro-text text-sm">Quick Links</h4>
              <ul className="space-y-2 text-xs">
                {["Home", "Chat", "About", "Contact"].map((item) => (
                  <li key={item}>
                    <Link
                      href={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                      className="transition-colors hover:text-primary"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h4 className="mb-4 retro-text text-sm">Legal</h4>
              <ul className="space-y-2 text-xs">
                <li>
                  <Link
                    href="/privacy"
                    className="transition-colors hover:text-primary"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href="/terms"
                    className="transition-colors hover:text-primary"
                  >
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>

            {/* Newsletter */}
            <div>
              <h4 className="mb-4 retro-text text-sm">Newsletter</h4>
              <form className="space-y-2">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="retro-input text-xs"
                />
                <Button
                  type="submit"
                  className="w-full retro-button pixel-corners text-xs"
                >
                  Subscribe
                </Button>
              </form>
            </div>

            {/* Follow Us - Social Icons */}
            <div>
              <h4 className="mb-4 retro-text text-sm">Follow Us</h4>
              <ul className="flex items-center space-x-4 text-xs">
                <li>
                  <Link
                    href="https://github.com/obsidianspecter"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub"
                    className="transition-colors hover:text-primary"
                  >
                    <Github className="h-4 w-4" />
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://www.linkedin.com/in/anvin141/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn"
                    className="transition-colors hover:text-primary"
                  >
                    <Linkedin className="h-4 w-4" />
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://www.instagram.com/_a.nvi.n_/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                    className="transition-colors hover:text-primary"
                  >
                    <Instagram className="h-4 w-4" />
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom row */}
        <div className="mt-8 border-t border-border pt-8 text-center">
          <p className="retro-text text-xs text-muted-foreground">
            © 2024 Anvictus AI Platform. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
