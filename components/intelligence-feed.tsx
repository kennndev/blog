"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Masonry from "react-masonry-css"
import FeedItem from "./feed-item"
import Link from "next/link"
import { getAllBlogPosts } from "@/lib/mock-data"
import { TrendingUp, Zap } from "lucide-react"

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

export default function IntelligenceFeed() {
  const [signals, setSignals] = useState<FeedSignal[]>([])
  const [expandedId, setExpandedId] = useState<string | null>(null)

  useEffect(() => {
    const loadBlogSignals = async () => {
      const posts = await getAllBlogPosts()
      const blogSignals: FeedSignal[] = posts.map((post) => ({
        id: `blog-${post.id}`,
        timestamp: post.created_at,
        tag: "ARTICLE",
        message: post.title,
        severity: post.featured ? "high" : ("medium" as const),
        icon: "lightning" as const,
        related: post.tags,
        postId: post.id,
      }))
      setSignals(blogSignals)
    }

    loadBlogSignals()
  }, [])

  const breakpointColumns = {
    default: 3,
    1536: 3,
    1280: 2,
    768: 1,
  }

  return (
    <div data-feed className="flex flex-col pb-8">
      {/* Feed Header with Gradient Border */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="border-b border-border glass-strong px-6 py-6 sticky top-0 z-30 gradient-border"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/30 flex items-center justify-center">
              <Zap className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="text-lg font-bold gradient-text data-text">INTELLIGENCE STREAM</h3>
              <p className="text-xs text-muted-foreground mt-0.5">Real-time crypto insights & analysis</p>
            </div>
          </div>

          {/* Live Indicator */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full glass border border-primary/30">
            <motion.div
              animate={{ scale: [1, 1.2, 1], opacity: [1, 0.5, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-2 h-2 rounded-full bg-primary"
            ></motion.div>
            <span className="text-xs data-text text-primary font-bold">LIVE</span>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="flex gap-4 mt-4">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg glass border border-border/50">
            <TrendingUp className="w-4 h-4 text-accent" />
            <span className="text-xs data-text text-muted-foreground">
              <span className="text-accent font-bold">{signals.length}</span> Articles
            </span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg glass border border-border/50">
            <div className="w-2 h-2 rounded-full bg-green-500"></div>
            <span className="text-xs data-text text-muted-foreground">
              <span className="text-green-500 font-bold">{signals.filter(s => s.severity === "high").length}</span> Featured
            </span>
          </div>
        </div>
      </motion.div>

      {/* Feed Items - Masonry Grid */}
      <div className="flex-1 px-6 py-8 custom-scrollbar overflow-y-auto">
        {signals.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center h-64 glass rounded-xl border border-border/50"
          >
            <div className="w-16 h-16 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center mb-4">
              <Zap className="w-8 h-8 text-primary/50" />
            </div>
            <p className="text-muted-foreground text-sm">No signals yet</p>
            <p className="text-muted-foreground text-xs mt-1">Create your first blog post in the admin panel</p>
          </motion.div>
        ) : (
          <Masonry
            breakpointCols={breakpointColumns}
            className="flex -ml-6 w-auto"
            columnClassName="pl-6 bg-clip-padding"
          >
            {signals.map((signal, index) => (
              <motion.div
                key={signal.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="mb-6"
              >
                <FeedItem
                  signal={signal}
                  isExpanded={expandedId === signal.id}
                  onToggle={() => setExpandedId(expandedId === signal.id ? null : signal.id)}
                />
              </motion.div>
            ))}
          </Masonry>
        )}
      </div>

      {/* Feed Footer */}
{/*      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="border-t border-border glass px-6 py-4 flex gap-3"
      >
        <Link
          href="/admin"
          className="flex-1 px-4 py-3 bg-primary border border-primary text-primary-foreground rounded-lg data-text text-xs font-semibold hover:opacity-90 transition-all text-center magnetic glow-cyan"
        >
          + Create Article
        </Link>
        <Link
          href="/admin"
          className="flex-1 px-4 py-3 glass border border-border text-foreground rounded-lg data-text text-xs font-semibold hover:border-primary transition-all text-center magnetic"
        >
          Manage Content
        </Link>
      </motion.div> */}


    </div>
  )
}
