"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { Plus, Edit, Trash2, Search, ArrowLeft } from "lucide-react"
import { getAllBlogPosts, deleteBlogPost, BlogPost } from "@/lib/mock-data"

export default function AdminPage() {
  const [articles, setArticles] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [filterFeatured, setFilterFeatured] = useState<boolean | null>(null)

  useEffect(() => {
    loadArticles()
  }, [])

  const loadArticles = async () => {
    setLoading(true)
    const posts = await getAllBlogPosts()
    setArticles(posts)
    setLoading(false)
  }

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this article?")) {
      const success = await deleteBlogPost(id)
      if (success) {
        loadArticles()
      } else {
        alert("Failed to delete article")
      }
    }
  }

  const filteredArticles = articles.filter((article) => {
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesFilter = filterFeatured === null || article.featured === filterFeatured
    return matchesSearch && matchesFilter
  })

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border glass-strong sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/" className="p-2 hover:bg-secondary rounded-lg transition-colors">
                <ArrowLeft className="w-5 h-5 text-muted-foreground" />
              </Link>
              <div>
                <h1 className="text-2xl font-bold gradient-text">Admin Dashboard</h1>
                <p className="text-sm text-muted-foreground mt-1">Manage your crypto intelligence articles</p>
              </div>
            </div>
            <Link
              href="/admin/create"
              className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:opacity-90 transition-all data-text uppercase tracking-wider text-sm magnetic glow-cyan"
            >
              <Plus className="w-5 h-5" />
              Create Article
            </Link>
          </div>

          {/* Search and Filter */}
          <div className="flex gap-4 mt-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 glass border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:border-primary outline-none transition-colors"
              />
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setFilterFeatured(null)}
                className={`px-4 py-3 rounded-lg border transition-all data-text text-xs font-semibold ${filterFeatured === null
                    ? "bg-primary border-primary text-primary-foreground"
                    : "glass border-border text-foreground hover:border-primary"
                  }`}
              >
                All
              </button>
              <button
                onClick={() => setFilterFeatured(true)}
                className={`px-4 py-3 rounded-lg border transition-all data-text text-xs font-semibold ${filterFeatured === true
                    ? "bg-primary border-primary text-primary-foreground"
                    : "glass border-border text-foreground hover:border-primary"
                  }`}
              >
                Featured
              </button>
              <button
                onClick={() => setFilterFeatured(false)}
                className={`px-4 py-3 rounded-lg border transition-all data-text text-xs font-semibold ${filterFeatured === false
                    ? "bg-primary border-primary text-primary-foreground"
                    : "glass border-border text-foreground hover:border-primary"
                  }`}
              >
                Regular
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Articles List */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="shimmer w-32 h-8 rounded"></div>
          </div>
        ) : filteredArticles.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 glass rounded-xl border border-border/50">
            <p className="text-muted-foreground text-sm">No articles found</p>
            <Link
              href="/admin/create"
              className="mt-4 px-6 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-semibold hover:opacity-90 transition-all"
            >
              Create Your First Article
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredArticles.map((article, index) => (
              <motion.div
                key={article.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="glass rounded-xl border border-border/50 overflow-hidden hover:border-primary/50 transition-all floating-shadow"
              >
                {/* Article Card */}
                <div className="p-6">
                  {/* Featured Badge */}
                  {article.featured && (
                    <span className="inline-block px-2 py-1 rounded-md bg-primary/10 border border-primary/30 text-primary text-xs font-bold data-text mb-3">
                      FEATURED
                    </span>
                  )}

                  {/* Title */}
                  <h3 className="text-lg font-semibold text-foreground mb-2 line-clamp-2">
                    {article.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                    {article.excerpt}
                  </p>

                  {/* Meta */}
                  <div className="flex items-center gap-2 text-xs text-muted-foreground mb-4">
                    <span className="data-text">{article.category}</span>
                    <span>•</span>
                    <span className="data-text">{article.readTime}</span>
                    <span>•</span>
                    <span className="data-text">{new Date(article.created_at).toLocaleDateString()}</span>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {article.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 rounded-md glass border border-border/50 text-xs data-text text-muted-foreground"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 pt-4 border-t border-border/30">
                    <Link
                      href={`/admin/edit/${article.id}`}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-primary/10 border border-primary/30 text-primary rounded-lg text-sm font-semibold hover:bg-primary/20 transition-all"
                    >
                      <Edit className="w-4 h-4" />
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(article.id)}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2 glass border border-red-500/30 text-red-500 rounded-lg text-sm font-semibold hover:bg-red-500/10 transition-all"
                    >
                      <Trash2 className="w-4 h-4" />
                      Delete
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
