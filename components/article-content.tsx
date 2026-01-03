"use client"

import { useSearchParams } from "next/navigation"
import { ArrowLeft, Share2, Bookmark } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"
import { getBlogPostById } from "@/lib/mock-data"

interface BlogPost {
  id: string
  title: string
  content: string
  excerpt: string
  author: string
  created_at: string
  tags: string[]
  featured: boolean
  category: string
  readTime: string
  sections: Array<{
    id: number
    heading: string
    content: string
  }>
  signals: Array<{
    event: string
    date: string
    impact: "Low" | "Medium" | "High"
  }>
}

export default function ArticleContent() {
  const searchParams = useSearchParams()
  const id = searchParams.get("id")
  const [article, setArticle] = useState<BlogPost | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadArticle = async () => {
      if (id) {
        const numericId = id.replace("blog-", "")
        const post = await getBlogPostById(numericId)
        setArticle(post)
      }
      setLoading(false)
    }

    loadArticle()
  }, [id])

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-muted-foreground">Loading article...</div>
      </div>
    )
  }

  if (!article) {
    return (
      <div className="min-h-screen bg-background">
        <div className="border-b border-border bg-secondary/30 backdrop-blur-sm sticky top-0 z-40">
          <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 text-primary hover:text-foreground transition-colors">
              <ArrowLeft className="w-5 h-5" />
              <span className="data-text text-sm font-semibold">Back to Timeline</span>
            </Link>
          </div>
        </div>
        <div className="max-w-4xl mx-auto px-6 py-12 text-center">
          <p className="text-muted-foreground">Article not found</p>
        </div>
      </div>
    )
  }

  const articleDate = new Date(article.created_at).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b border-border bg-secondary/30 backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-primary hover:text-foreground transition-colors">
            <ArrowLeft className="w-5 h-5" />
            <span className="data-text text-sm font-semibold">Back to Timeline</span>
          </Link>
          <div className="flex gap-2">
            <button className="p-2 hover:bg-secondary rounded-lg transition-colors">
              <Share2 className="w-5 h-5 text-muted-foreground" />
            </button>
            <button className="p-2 hover:bg-secondary rounded-lg transition-colors">
              <Bookmark className="w-5 h-5 text-muted-foreground" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Meta Information */}
        <div className="mb-12 space-y-4">
          <span className="data-text text-xs text-primary uppercase">{article.category}</span>
          <h1 className="text-4xl md:text-5xl font-bold text-balance leading-tight">{article.title}</h1>
          <div className="flex items-center gap-4 text-sm text-muted-foreground flex-wrap">
            <span>{articleDate}</span>
            <span>•</span>
            <span>{article.readTime}</span>
            <span>•</span>
            <span>by {article.author}</span>
          </div>
        </div>

        {/* Article Sections */}
        <div className="space-y-12 mb-16">
          {article.sections.map((section, index) => (
            <div key={section.id}>
              {index > 0 && <div className="mb-8 h-px bg-border"></div>}
              <h2 className="text-3xl font-bold mb-4">{section.heading}</h2>
              <p className="text-lg text-foreground leading-relaxed">{section.content}</p>
            </div>
          ))}
        </div>

        {/* Related Signals */}
        {article.signals && article.signals.length > 0 && (
          <div className="border border-border bg-secondary/30 rounded-lg p-8 mb-12">
            <h3 className="data-text text-sm font-bold text-primary uppercase mb-6">Related Timeline Signals</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {article.signals.map((signal) => (
                <div key={signal.event} className="p-4 bg-background border border-border rounded-lg">
                  <p className="data-text text-xs text-primary mb-1">{signal.date}</p>
                  <p className="font-semibold mb-2 text-balance">{signal.event}</p>
                  <span
                    className={`data-text text-xs px-2 py-1 rounded border ${
                      signal.impact === "High"
                        ? "bg-red-500/20 border-red-500/30 text-red-400"
                        : signal.impact === "Medium"
                          ? "bg-yellow-500/20 border-yellow-500/30 text-yellow-400"
                          : "bg-green-500/20 border-green-500/30 text-green-400"
                    }`}
                  >
                    {signal.impact} Impact
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Call to Action */}
        <div className="pt-12 border-t border-border space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <button className="flex-1 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:opacity-90 transition-all data-text uppercase tracking-wider text-sm">
              Add to Watchlist
            </button>
            <Link
              href={`/chart?id=${id}`}
              className="flex-1 px-6 py-3 bg-secondary border border-border text-foreground rounded-lg font-semibold hover:border-primary transition-all data-text uppercase tracking-wider text-sm text-center"
            >
              View Chart Analysis
            </Link>
            <button className="flex-1 px-6 py-3 bg-secondary border border-border text-foreground rounded-lg font-semibold hover:border-primary transition-all data-text uppercase tracking-wider text-sm">
              View Live Signals
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
