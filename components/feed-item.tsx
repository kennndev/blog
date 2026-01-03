"use client"

import { AlertCircle, TrendingUp, Zap, Clock, Bookmark, Share2, ExternalLink } from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"
import { useState } from "react"

interface FeedSignal {
  id: string
  timestamp: string
  tag: string
  message: string
  severity: "low" | "medium" | "high"
  icon: "alert" | "trend" | "lightning"
  related: string[]
  postId?: string
}

interface FeedItemProps {
  signal: FeedSignal
  isExpanded: boolean
  onToggle: () => void
}

const severityConfig = {
  low: {
    color: "bg-green-500",
    glow: "shadow-[0_0_20px_rgba(34,197,94,0.3)]",
    border: "border-green-500/30",
    text: "text-green-400",
  },
  medium: {
    color: "bg-yellow-500",
    glow: "shadow-[0_0_20px_rgba(251,191,36,0.3)]",
    border: "border-yellow-500/30",
    text: "text-yellow-400",
  },
  high: {
    color: "bg-red-500",
    glow: "shadow-[0_0_20px_rgba(239,68,68,0.3)]",
    border: "border-red-500/30",
    text: "text-red-400",
  },
}

const iconMap = {
  alert: AlertCircle,
  trend: TrendingUp,
  lightning: Zap,
}

export default function FeedItem({ signal, isExpanded, onToggle }: FeedItemProps) {
  const [isHovered, setIsHovered] = useState(false)
  const Icon = iconMap[signal.icon]
  const config = severityConfig[signal.severity]

  const time = new Date(signal.timestamp).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  })

  const date = new Date(signal.timestamp).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  })

  return (
    <motion.div
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ y: -4 }}
      className="relative group"
    >
      {/* Severity Indicator Bar */}
      <div className={`absolute left-0 top-0 bottom-0 w-1 ${config.color} rounded-l-xl ${isHovered ? config.glow : ""}`}></div>

      {/* Main Card */}
      <div className={`glass rounded-xl border border-border/50 overflow-hidden transition-all duration-300 ${isHovered ? "border-primary/50 floating-shadow" : ""
        }`}>
        {/* Card Header */}
        <div className="p-4 space-y-3">
          {/* Top Meta Row */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {/* Icon Badge */}
              <div className={`w-8 h-8 rounded-lg ${config.color}/10 border ${config.border} flex items-center justify-center`}>
                <Icon className={`w-4 h-4 ${config.text}`} />
              </div>

              {/* Tag */}
              <span className={`data-text text-xs px-2 py-1 rounded-md glass border ${config.border} ${config.text} font-bold`}>
                {signal.tag}
              </span>

              {/* Featured Badge */}
              {signal.severity === "high" && (
                <motion.span
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="data-text text-xs px-2 py-1 rounded-md bg-primary/10 border border-primary/30 text-primary font-bold"
                >
                  FEATURED
                </motion.span>
              )}
            </div>

            {/* Time */}
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <Clock className="w-3 h-3" />
              <span className="data-text text-xs">{time}</span>
            </div>
          </div>

          {/* Title */}
          <h3 className="text-base font-semibold text-foreground leading-tight group-hover:text-primary transition-colors line-clamp-2">
            {signal.message}
          </h3>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5">
            {signal.related.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="data-text text-[10px] px-2 py-1 rounded-md glass border border-border/50 text-muted-foreground hover:border-primary/50 hover:text-primary transition-colors"
              >
                #{tag}
              </span>
            ))}
            {signal.related.length > 3 && (
              <span className="data-text text-[10px] px-2 py-1 text-muted-foreground">
                +{signal.related.length - 3} more
              </span>
            )}
          </div>

          {/* Stats Row */}
          <div className="flex items-center justify-between pt-2 border-t border-border/30">
            <div className="flex items-center gap-3 text-xs text-muted-foreground">
              <span className="data-text">{date}</span>
              <span className="data-text">•</span>
              <span className="data-text">5 min read</span>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="w-7 h-7 rounded-lg glass border border-border/50 flex items-center justify-center hover:border-primary/50 transition-colors"
              >
                <Bookmark className="w-3.5 h-3.5 text-muted-foreground hover:text-primary" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="w-7 h-7 rounded-lg glass border border-border/50 flex items-center justify-center hover:border-primary/50 transition-colors"
              >
                <Share2 className="w-3.5 h-3.5 text-muted-foreground hover:text-primary" />
              </motion.button>
            </div>
          </div>
        </div>

        {/* Card Footer - CTA */}
        <div className="border-t border-border/30 bg-secondary/30 p-3">
          <div className="flex gap-2">
            <Link
              href={`/article?id=${signal.postId || signal.id}`}
              className="flex-1 px-3 py-2 bg-primary/10 text-primary border border-primary/30 rounded-lg text-xs font-semibold hover:bg-primary/20 transition-all data-text text-center flex items-center justify-center gap-1.5 magnetic"
            >
              <ExternalLink className="w-3 h-3" />
              Read Article
            </Link>
            <Link
              href={`/chart?id=${signal.postId || signal.id}`}
              className="flex-1 px-3 py-2 glass border border-border/50 rounded-lg text-xs font-semibold hover:border-primary/50 transition-all data-text text-center flex items-center justify-center gap-1.5 magnetic"
            >
              <TrendingUp className="w-3 h-3" />
              View Chart
            </Link>
          </div>
        </div>

        {/* Shimmer Effect Overlay */}
        {isHovered && (
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: "100%" }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent pointer-events-none"
          ></motion.div>
        )}
      </div>
    </motion.div>
  )
}
