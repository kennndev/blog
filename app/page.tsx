"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import HeroSection from "@/components/hero-section"
import TimelineComponent from "@/components/timeline-component"
import IntelligenceFeed from "@/components/intelligence-feed"
import MobileNav from "@/components/mobile-nav"

export default function HomePage() {
  const [selectedEvent, setSelectedEvent] = useState<string | null>(null)
  const [showFeedModal, setShowFeedModal] = useState(false)

  return (
    <div className="min-h-screen bg-background overflow-x-hidden pb-20 lg:pb-0">
      <HeroSection onShowFeed={() => setShowFeedModal(true)} />

      {/* Main Timeline Area */}
      <TimelineComponent onSelectEvent={setSelectedEvent} />

      {/* Section Divider */}
      { /*  <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="relative h-px bg-gradient-to-r from-transparent via-primary to-transparent"
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 px-6 py-2 glass-strong rounded-full border border-primary/30">
          <span className="data-text text-xs text-primary font-bold">INTELLIGENCE STREAM</span>
        </div>
      </motion.div> */}

      {/* Intelligence Feed Section */}
      <div className="border-t border-border/50 bg-gradient-to-b from-background to-secondary/20">
        <IntelligenceFeed />
      </div>

      {showFeedModal && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setShowFeedModal(false)}
          />
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{ type: "spring", damping: 25 }}
            className="absolute bottom-0 left-0 right-0 max-h-[85vh] bg-background border-t border-border rounded-t-2xl overflow-hidden"
          >
            <div className="sticky top-0 flex items-center justify-between px-4 py-4 border-b border-border glass z-10">
              <h3 className="text-sm font-bold gradient-text data-text uppercase">Live Signals</h3>
              <button
                onClick={() => setShowFeedModal(false)}
                className="text-muted-foreground hover:text-foreground transition-colors w-8 h-8 rounded-lg glass border border-border/50 flex items-center justify-center"
              >
                ✕
              </button>
            </div>
            <div className="overflow-y-auto max-h-[calc(85vh-60px)]">
              <IntelligenceFeed />
            </div>
          </motion.div>
        </div>
      )}

      {/* Mobile Navigation */}
      <MobileNav />
    </div>
  )
}
