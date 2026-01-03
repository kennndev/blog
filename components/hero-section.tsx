"use client"

import { ChevronDown, Activity, Shield, TrendingUp, Zap } from "lucide-react"
import { motion } from "framer-motion"

const liveIndicators = [
  { label: "Network Activity", status: "active", color: "bg-green-500", icon: Activity },
  { label: "High-Risk Narrative", status: "detected", color: "bg-red-500", icon: Shield },
  { label: "Market Volatility", status: "monitoring", color: "bg-yellow-500", icon: TrendingUp },
]

export default function HeroSection({ onShowFeed }: { onShowFeed: () => void }) {
  const scrollToTimeline = () => {
    const timelineElement = document.querySelector("[data-timeline]")
    timelineElement?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <div className="relative min-h-screen lg:h-screen flex flex-col items-center justify-center border-b border-border overflow-hidden pt-20 lg:pt-0 grid-bg">
      {/* Animated Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Multiple Gradient Orbs */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-20 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[120px]"
        ></motion.div>
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute bottom-20 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-[120px]"
        ></motion.div>
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.15, 0.3, 0.15],
          }}
          transition={{ duration: 12, repeat: Infinity }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[150px]"
        ></motion.div>

        {/* Scanline Effect */}
        <div className="absolute inset-0 scanline opacity-30"></div>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 lg:px-6 text-center space-y-8 lg:space-y-12 flex-1 flex flex-col justify-center">
        {/* Main Headlines */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-4 lg:space-y-6"
        >
          {/* Overline */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-primary/30"
          >
            <Zap className="w-4 h-4 text-primary" />
            <span className="data-text text-xs text-primary font-bold">CRYPTO INTELLIGENCE PLATFORM</span>
          </motion.div>

          <h1 className="text-4xl sm:text-5xl lg:text-7xl xl:text-8xl font-bold text-balance leading-tight">
            <span className="text-foreground">Crypto History.</span>
            <br />
            <span className="gradient-text">Live Intelligence.</span>
          </h1>

          <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Track the past. Monitor the present. <span className="text-primary font-semibold">Anticipate the next move.</span>
          </p>
        </motion.div>

        {/* Live Indicators Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="flex flex-col sm:flex-row gap-3 lg:gap-4 justify-center items-center flex-wrap max-w-3xl mx-auto"
        >
          {liveIndicators.map((indicator, index) => {
            const Icon = indicator.icon
            const bgClass = indicator.color === 'bg-green-500' ? 'bg-green-500/10' :
              indicator.color === 'bg-red-500' ? 'bg-red-500/10' : 'bg-yellow-500/10'
            const borderClass = indicator.color === 'bg-green-500' ? 'border-green-500/30' :
              indicator.color === 'bg-red-500' ? 'border-red-500/30' : 'border-yellow-500/30'
            const textClass = indicator.color === 'bg-green-500' ? 'text-green-500' :
              indicator.color === 'bg-red-500' ? 'text-red-500' : 'text-yellow-500'

            return (
              <motion.div
                key={indicator.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                whileHover={{ scale: 1.05, y: -2 }}
                className="flex items-center gap-3 px-4 py-3 rounded-xl glass border border-border/50 hover:border-primary/50 transition-all group min-w-[200px]"
              >
                <div className={`w-10 h-10 rounded-lg ${bgClass} border ${borderClass} flex items-center justify-center`}>
                  <Icon className={`w-5 h-5 ${textClass}`} />
                </div>
                <div className="flex-1 text-left">
                  <p className="data-text text-xs text-muted-foreground uppercase">Status</p>
                  <p className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                    {indicator.label}
                  </p>
                </div>
                <motion.div
                  animate={{ scale: [1, 1.2, 1], opacity: [1, 0.5, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className={`w-2 h-2 rounded-full ${indicator.color}`}
                ></motion.div>
              </motion.div>
            )
          })}
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="flex flex-col gap-4 w-full sm:flex-row sm:gap-4 justify-center pt-4 lg:pt-6"
        >
          <motion.button
            onClick={scrollToTimeline}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group relative px-8 lg:px-10 py-4 bg-primary text-primary-foreground rounded-xl font-bold hover:shadow-2xl glow-cyan-strong transition-all duration-300 data-text uppercase tracking-wider text-sm lg:text-base overflow-hidden"
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              <Zap className="w-5 h-5" />
              Enter Timeline
            </span>
            {/* Shimmer effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
              animate={{ x: ['-100%', '100%'] }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            ></motion.div>
          </motion.button>

          <motion.button
            onClick={onShowFeed}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 lg:px-10 py-4 glass border border-border hover:border-primary text-foreground rounded-xl font-bold transition-all duration-300 data-text uppercase tracking-wider text-sm lg:text-base magnetic"
          >
            <span className="flex items-center justify-center gap-2">
              <Activity className="w-5 h-5" />
              View Live Feed
            </span>
          </motion.button>
        </motion.div>

        {/* Stats Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="flex flex-wrap gap-6 justify-center items-center pt-4 text-sm"
        >
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-primary pulse-glow"></div>
            <span className="data-text text-xs text-muted-foreground">
              <span className="text-primary font-bold">7</span> Historic Events
            </span>
          </div>
          <div className="w-px h-4 bg-border"></div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-accent pulse-glow"></div>
            <span className="data-text text-xs text-muted-foreground">
              <span className="text-accent font-bold">Real-time</span> Updates
            </span>
          </div>
          <div className="w-px h-4 bg-border"></div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500 pulse-glow"></div>
            <span className="data-text text-xs text-muted-foreground">
              <span className="text-green-500 font-bold">Live</span> Intelligence
            </span>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
{ /*     <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden lg:flex flex-col items-center gap-2"
      >
        <span className="data-text text-xs text-muted-foreground">Scroll to explore</span>
        <div className="w-6 h-10 rounded-full border-2 border-primary/50 flex items-start justify-center p-2">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1.5 h-1.5 rounded-full bg-primary"
          ></motion.div>
        </div>
      </motion.div> */}
    </div>
  )
}
