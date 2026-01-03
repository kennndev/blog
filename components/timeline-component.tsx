"use client"

import { useRef, useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { motion } from "framer-motion"
import TimelineNode from "./timeline-node"
import EventDetails from "./event-details"

const TIMELINE_EVENTS = [
  {
    id: "1",
    date: "2009-01-03",
    title: "Bitcoin Genesis Block",
    category: "Tech",
    chains: ["Bitcoin"],
    impact: 95,
    color: "bg-blue-600",
    description: "Satoshi Nakamoto mines the first Bitcoin block, launching the world's first decentralized currency.",
    consequences: "Established the foundation for all future cryptocurrencies and blockchain technology.",
  },
  {
    id: "2",
    date: "2017-08-01",
    title: "Bitcoin Cash Fork",
    category: "Tech",
    chains: ["Bitcoin", "Bitcoin Cash"],
    impact: 75,
    color: "bg-orange-600",
    description: "The Bitcoin blockchain splits into Bitcoin (BTC) and Bitcoin Cash (BCH) over scaling debates.",
    consequences: "Created significant market volatility and established precedent for chain forks.",
  },
  {
    id: "3",
    date: "2021-01-29",
    title: "GameStop Trading Halt",
    category: "Market",
    chains: ["Ethereum"],
    impact: 60,
    color: "bg-green-600",
    description: "Retail investors coordinate through crypto communities, highlighting retail power in markets.",
    consequences: "Sparked discussions about market manipulation and retail investor rights.",
  },
  {
    id: "4",
    date: "2021-06-15",
    title: "El Salvador Adopts Bitcoin",
    category: "Regulation",
    chains: ["Bitcoin"],
    impact: 80,
    color: "bg-purple-600",
    description: "El Salvador becomes the first country to adopt Bitcoin as legal tender.",
    consequences: "Opened discussion about crypto adoption by nation-states and monetary policy shifts.",
  },
  {
    id: "5",
    date: "2022-05-09",
    title: "Terra/Luna Collapse",
    category: "Exploit",
    chains: ["Terra", "Ethereum"],
    impact: 90,
    color: "bg-red-600",
    description: "Terra's algorithmic stablecoin UST depegs, causing the ecosystem to collapse and $40B in losses.",
    consequences: "Highlighted risks of undercollateralized stablecoins and algorithmic solutions.",
  },
  {
    id: "6",
    date: "2023-01-10",
    title: "Ethereum Shanghai Upgrade",
    category: "Tech",
    chains: ["Ethereum"],
    impact: 70,
    color: "bg-blue-600",
    description: "Ethereum enables staking withdrawals, completing the transition to Proof of Stake.",
    consequences: "Reduced ETH supply growth and improved network energy efficiency.",
  },
  {
    id: "7",
    date: "2024-01-10",
    title: "Bitcoin Spot ETF Approval",
    category: "Regulation",
    chains: ["Bitcoin"],
    impact: 85,
    color: "bg-yellow-600",
    description: "SEC approves Bitcoin spot ETFs, enabling institutional adoption through traditional markets.",
    consequences: "Massive influx of institutional capital and mainstream market integration.",
  },
]

interface TimelineComponentProps {
  onSelectEvent: (eventId: string | null) => void
}

export default function TimelineComponent({ onSelectEvent }: TimelineComponentProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(false)

  const checkScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current
      setCanScrollLeft(scrollLeft > 0)
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10)
    }
  }

  useEffect(() => {
    checkScroll()
    const container = scrollContainerRef.current
    container?.addEventListener("scroll", checkScroll)
    window.addEventListener("resize", checkScroll)
    return () => {
      container?.removeEventListener("scroll", checkScroll)
      window.removeEventListener("resize", checkScroll)
    }
  }, [])

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 400
      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      })
    }
  }

  const selectedEvent = TIMELINE_EVENTS.find((e) => e.id === selectedEventId)

  return (
    <div data-timeline className="relative flex flex-col pb-10">
      {/* Timeline Controls Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="border-b border-border glass-strong px-6 py-4 flex items-center justify-between sticky top-0 z-40"
      >
        <div>
          <h2 className="text-lg font-bold gradient-text data-text">THE CHRONICLE</h2>
          <p className="text-sm text-muted-foreground mt-1">Navigate through crypto's defining moments</p>
        </div>
        {(canScrollLeft || canScrollRight) && (
          <div className="hidden lg:flex gap-2">
            <button
              onClick={() => scroll("left")}
              disabled={!canScrollLeft}
              className="p-2 rounded-lg glass border border-border hover:border-primary disabled:opacity-50 transition-all magnetic"
            >
              <ChevronLeft className="w-5 h-5 text-primary" />
            </button>
            <button
              onClick={() => scroll("right")}
              disabled={!canScrollRight}
              className="p-2 rounded-lg glass border border-border hover:border-primary disabled:opacity-50 transition-all magnetic"
            >
              <ChevronRight className="w-5 h-5 text-primary" />
            </button>
          </div>
        )}
      </motion.div>

      {/* Timeline Container with Grid Background and Scanlines */}
      <div className="flex-1 overflow-hidden relative grid-bg scanline">
        {/* Ambient Glow Effect */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-primary/10 rounded-full blur-[120px] pointer-events-none"></div>

        {/* Timeline Line */}
        <div className="absolute top-1/2 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent opacity-50 pointer-events-none"></div>

        <div ref={scrollContainerRef} className="h-full overflow-x-auto overflow-y-hidden scroll-smooth custom-scrollbar">
          <div className="flex h-full items-center justify-center gap-8 px-6 py-12 w-full perspective-container">
            {TIMELINE_EVENTS.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
              >
                <TimelineNode
                  event={event}
                  isSelected={selectedEventId === event.id}
                  onSelect={() => {
                    setSelectedEventId(event.id)
                    onSelectEvent(event.id)
                  }}
                />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Fade Effects */}
        <div className="absolute top-0 left-0 h-full w-24 bg-gradient-to-r from-background to-transparent pointer-events-none"></div>
        <div className="absolute top-0 right-0 h-full w-24 bg-gradient-to-l from-background to-transparent pointer-events-none"></div>
      </div>

      {/* Event Details Panel */}
      {selectedEvent && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="border-t border-border glass"
        >
          <EventDetails event={selectedEvent} onClose={() => setSelectedEventId(null)} />
        </motion.div>
      )}
    </div>
  )
}
