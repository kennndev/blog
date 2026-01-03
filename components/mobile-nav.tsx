"use client"

import { useState } from "react"
import { Menu, Grid, Activity, Search, Bookmark, X } from "lucide-react"
import Link from "next/link"

export default function MobileNav() {
  const [isOpen, setIsOpen] = useState(false)

  const navItems = [
    { icon: Grid, label: "Timeline", href: "#timeline" },
    { icon: Activity, label: "Feed", href: "#feed" },
    { icon: Search, label: "Search", href: "/search" },
    { icon: Bookmark, label: "Watchlist", href: "/watchlist" },
  ]

  return (
    <>
      {/* Mobile Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 border-t border-border bg-secondary/95 backdrop-blur-sm z-50 lg:hidden">
        <div className="flex items-center justify-around py-3">
          {navItems.map(({ icon: Icon, label, href }) => (
            <Link
              key={label}
              href={href}
              className="flex flex-col items-center gap-1 px-3 py-2 text-muted-foreground hover:text-primary transition-colors"
            >
              <Icon className="w-5 h-5" />
              <span className="text-xs data-text">{label}</span>
            </Link>
          ))}
        </div>
      </nav>

      {/* Mobile Header Menu */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 right-4 z-50 p-2 rounded-lg bg-secondary border border-border lg:hidden"
      >
        {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* Mobile Sidebar */}
      {isOpen && <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setIsOpen(false)} />}
      <div
        className={`fixed top-0 right-0 h-screen w-64 bg-secondary border-l border-border transform transition-transform z-40 lg:hidden ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-6 space-y-6 pt-16">
          <div>
            <h3 className="data-text text-xs text-primary font-bold mb-3">Navigation</h3>
            {navItems.map(({ icon: Icon, label, href }) => (
              <Link
                key={label}
                href={href}
                className="flex items-center gap-3 px-3 py-2 rounded-lg text-foreground hover:bg-background transition-colors"
                onClick={() => setIsOpen(false)}
              >
                <Icon className="w-5 h-5 text-primary" />
                <span>{label}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
