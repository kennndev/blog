"use client"

import { useSearchParams } from "next/navigation"
import { ArrowLeft, Download } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"
import { getBlogPostById } from "@/lib/mock-data"
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"

interface BlogPost {
  id: string
  title: string
  chartData?: Array<{
    label: string
    value: number
    date: string
  }>
}

const COLORS = ["#00d9ff", "#fbbf24", "#ef4444", "#10b981", "#8b5cf6"]

export default function ChartContent() {
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
        <div className="text-muted-foreground">Loading chart...</div>
      </div>
    )
  }

  if (!article || !article.chartData) {
    return (
      <div className="min-h-screen bg-background">
        <div className="border-b border-border bg-secondary/30 backdrop-blur-sm sticky top-0 z-40">
          <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 text-primary hover:text-foreground transition-colors">
              <ArrowLeft className="w-5 h-5" />
              <span className="data-text text-sm font-semibold">Back</span>
            </Link>
          </div>
        </div>
        <div className="max-w-6xl mx-auto px-6 py-12 text-center">
          <p className="text-muted-foreground">Chart data not found</p>
        </div>
      </div>
    )
  }

  const barChartData = article.chartData
  const pieChartData = article.chartData
  const lineChartData = article.chartData.map((item, idx) => ({
    ...item,
    index: idx,
  }))

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b border-border bg-secondary/30 backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <Link
              href="/"
              className="flex items-center gap-2 text-primary hover:text-foreground transition-colors mb-2"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="data-text text-sm font-semibold">Back</span>
            </Link>
            <h1 className="text-2xl font-bold text-foreground">{article.title} - Chart Analysis</h1>
          </div>
          <button className="p-2 hover:bg-secondary rounded-lg transition-colors">
            <Download className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Bar Chart */}
          <div className="border border-border bg-secondary/30 rounded-lg p-8">
            <h2 className="text-lg font-bold mb-6 text-foreground">Distribution by Category</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={barChartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="label" stroke="rgba(255,255,255,0.5)" />
                <YAxis stroke="rgba(255,255,255,0.5)" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "rgba(10, 14, 39, 0.9)",
                    border: "1px solid rgba(0, 217, 255, 0.3)",
                  }}
                />
                <Bar dataKey="value" fill="#00d9ff" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Pie Chart */}
          <div className="border border-border bg-secondary/30 rounded-lg p-8">
            <h2 className="text-lg font-bold mb-6 text-foreground">Market Share Breakdown</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieChartData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={(entry) => entry.label}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {pieChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "rgba(10, 14, 39, 0.9)",
                    border: "1px solid rgba(0, 217, 255, 0.3)",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Line Chart - Full Width */}
          <div className="border border-border bg-secondary/30 rounded-lg p-8 lg:col-span-2">
            <h2 className="text-lg font-bold mb-6 text-foreground">Trend Analysis</h2>
            <ResponsiveContainer width="100%" height={350}>
              <LineChart data={lineChartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="label" stroke="rgba(255,255,255,0.5)" />
                <YAxis stroke="rgba(255,255,255,0.5)" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "rgba(10, 14, 39, 0.9)",
                    border: "1px solid rgba(0, 217, 255, 0.3)",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#00d9ff"
                  strokeWidth={2}
                  dot={{ fill: "#fbbf24", r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Data Summary */}
          <div className="border border-border bg-secondary/30 rounded-lg p-8 lg:col-span-2">
            <h2 className="text-lg font-bold mb-6 text-foreground">Data Summary</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {(() => {
                const values = article.chartData.map((d) => d.value)
                const total = values.reduce((a, b) => a + b, 0)
                const avg = Math.round(total / values.length)
                const max = Math.max(...values)
                const min = Math.min(...values)

                return (
                  <>
                    <div className="p-4 bg-background border border-border rounded-lg">
                      <p className="data-text text-xs text-primary uppercase mb-2">Total Value</p>
                      <p className="text-2xl font-bold text-foreground">${total.toLocaleString()}</p>
                    </div>
                    <div className="p-4 bg-background border border-border rounded-lg">
                      <p className="data-text text-xs text-primary uppercase mb-2">Average</p>
                      <p className="text-2xl font-bold text-foreground">${avg.toLocaleString()}</p>
                    </div>
                    <div className="p-4 bg-background border border-border rounded-lg">
                      <p className="data-text text-xs text-primary uppercase mb-2">Maximum</p>
                      <p className="text-2xl font-bold text-foreground">${max.toLocaleString()}</p>
                    </div>
                    <div className="p-4 bg-background border border-border rounded-lg">
                      <p className="data-text text-xs text-primary uppercase mb-2">Minimum</p>
                      <p className="text-2xl font-bold text-foreground">${min.toLocaleString()}</p>
                    </div>
                  </>
                )
              })()}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-12 flex flex-col md:flex-row gap-4">
          <Link
            href={`/article?id=${id}`}
            className="flex-1 px-6 py-3 bg-secondary border border-border text-foreground rounded-lg font-semibold hover:border-primary transition-all data-text uppercase tracking-wider text-sm text-center"
          >
            Back to Article
          </Link>
          <button className="flex-1 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:opacity-90 transition-all data-text uppercase tracking-wider text-sm">
            Export Data
          </button>
          <button className="flex-1 px-6 py-3 bg-secondary border border-border text-foreground rounded-lg font-semibold hover:border-primary transition-all data-text uppercase tracking-wider text-sm">
            Share Analysis
          </button>
        </div>
      </div>
    </div>
  )
}
