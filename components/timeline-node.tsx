"use client"

import { motion } from "framer-motion"

interface TimelineEvent {
  id: string
  date: string
  title: string
  category: string
  chains: string[]
  impact: number
  color: string
}

interface TimelineNodeProps {
  event: TimelineEvent
  isSelected: boolean
  onSelect: () => void
}

export default function TimelineNode({ event, isSelected, onSelect }: TimelineNodeProps) {
  const year = new Date(event.date).getFullYear()
  const monthDay = new Date(event.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })

  return (
    <motion.button
      onClick={onSelect}
      whileHover={{ scale: 1.1, y: -5 }}
      whileTap={{ scale: 0.95 }}
      className={`timeline-node flex flex-col items-center gap-4 group transition-all duration-300 transform-3d ${isSelected ? "scale-125 z-10" : ""
        }`}
    >
      {/* Connection Point */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 w-[2px] h-8 bg-gradient-to-b from-primary to-transparent opacity-50"></div>

      {/* Node Circle with Holographic Effect */}
      <div className="relative">
        {/* Outer Glow Ring */}
        <motion.div
          animate={isSelected ? { scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] } : {}}
          transition={{ duration: 2, repeat: Infinity }}
          className={`absolute inset-0 rounded-full ${event.color} opacity-30 blur-xl`}
        ></motion.div>

        {/* Main Node */}
        <div
          className={`relative w-20 h-20 rounded-full flex items-center justify-center transition-all duration-300 ${event.color} ${isSelected ? "glow-cyan-strong ring-4 ring-primary/50" : "opacity-80 group-hover:opacity-100 glow-cyan"
            }`}
        >
          {/* Inner Circle */}
          <div className="absolute inset-2 bg-background rounded-full flex items-center justify-center">
            <div className={`w-10 h-10 rounded-full ${event.color} flex items-center justify-center relative overflow-hidden`}>
              {/* Pulsing Core */}
              <motion.div
                animate={{ scale: [1, 1.5, 1], opacity: [1, 0, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-5 h-5 bg-primary rounded-full"
              ></motion.div>

              {/* Shimmer Effect */}
              <div className="absolute inset-0 shimmer opacity-50"></div>
            </div>
          </div>

          {/* Category Badge */}
          <div className="absolute -top-2 -right-2 px-2 py-1 rounded-full glass text-[10px] font-bold data-text text-primary border border-primary/30">
            {event.category.toUpperCase()}
          </div>
        </div>
      </div>

      {/* Node Label */}
      <div className="text-center whitespace-nowrap transition-all duration-300 space-y-2">
        <div className="space-y-1">
          <p className="data-text text-sm text-primary font-bold tracking-wider">{year}</p>
          <p className="text-xs text-muted-foreground">{monthDay}</p>
        </div>

        <p className="text-sm font-semibold text-foreground mt-2 max-w-xs leading-tight group-hover:text-primary transition-colors px-2">
          {event.title}
        </p>

        {/* Chain Badges */}
        <div className="flex gap-1 mt-2 justify-center flex-wrap">
          {event.chains.slice(0, 2).map((chain) => (
            <span
              key={chain}
              className="data-text text-[10px] glass px-2 py-1 rounded border border-border group-hover:border-primary transition-colors"
            >
              {chain}
            </span>
          ))}
        </div>
      </div>

      {/* Impact Visualization */}
      <div className="w-16 space-y-1">
        <div className="flex justify-between items-center">
          <span className="text-[10px] text-muted-foreground data-text">IMPACT</span>
          <span className="text-[10px] text-primary font-bold data-text">{event.impact}%</span>
        </div>
        <div className="w-full h-2 bg-secondary/50 rounded-full overflow-hidden border border-border/50">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${event.impact}%` }}
            transition={{ duration: 1, delay: 0.3 }}
            className={`h-full transition-all duration-300 ${event.color} relative overflow-hidden`}
          >
            {/* Animated Gradient Overlay */}
            <div className="absolute inset-0 shimmer opacity-60"></div>
          </motion.div>
        </div>
      </div>

      {/* Ripple Effect on Select */}
      {isSelected && (
        <motion.div
          initial={{ scale: 0, opacity: 1 }}
          animate={{ scale: 3, opacity: 0 }}
          transition={{ duration: 1, repeat: Infinity }}
          className="absolute inset-0 rounded-full border-2 border-primary pointer-events-none"
        ></motion.div>
      )}
    </motion.button>
  )
}
