"use client"

import { X } from "lucide-react"

interface TimelineEvent {
  id: string
  date: string
  title: string
  category: string
  chains: string[]
  impact: number
  color: string
  description: string
  consequences: string
}

interface EventDetailsProps {
  event: TimelineEvent
  onClose: () => void
}

export default function EventDetails({ event, onClose }: EventDetailsProps) {
  const date = new Date(event.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  return (
    <div className="max-w-4xl mx-auto px-6 py-8">
      <div className="flex items-start justify-between gap-6">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-4">
            <div className={`w-4 h-4 rounded-full ${event.color}`}></div>
            <span className="data-text text-xs text-primary uppercase">{event.category}</span>
            <span className="data-text text-xs text-muted-foreground">Impact: {event.impact}%</span>
          </div>

          <h3 className="text-3xl font-bold mb-2 text-balance">{event.title}</h3>
          <p className="data-text text-sm text-muted-foreground mb-6">{date}</p>

          <div className="space-y-6">
            <div>
              <h4 className="data-text text-xs text-primary uppercase mb-2">Event Summary</h4>
              <p className="text-foreground leading-relaxed">{event.description}</p>
            </div>

            <div>
              <h4 className="data-text text-xs text-primary uppercase mb-2">Consequences</h4>
              <p className="text-foreground leading-relaxed">{event.consequences}</p>
            </div>

            <div className="flex flex-wrap gap-2">
              {event.chains.map((chain) => (
                <span key={chain} className="data-text text-xs bg-secondary px-3 py-2 rounded border border-border">
                  {chain}
                </span>
              ))}
            </div>
          </div>

          <div className="flex gap-3 mt-8">
            <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg data-text text-sm font-semibold hover:glow-cyan transition-all">
              Add to Watchlist
            </button>
            <button className="px-4 py-2 bg-secondary border border-border text-foreground rounded-lg data-text text-sm font-semibold hover:border-primary transition-all">
              View Related Signals
            </button>
          </div>
        </div>

        <button onClick={onClose} className="p-2 hover:bg-secondary rounded-lg transition-colors flex-shrink-0">
          <X className="w-5 h-5 text-muted-foreground" />
        </button>
      </div>
    </div>
  )
}
