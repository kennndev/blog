"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowLeft, Plus, Trash2 } from "lucide-react"
import { createBlogPost } from "@/lib/mock-data"

export default function CreateArticlePage() {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
        title: "",
        excerpt: "",
        content: "",
        author: "Crypto Intelligence",
        category: "Market Analysis",
        readTime: "5 min read",
        tags: "",
        featured: false,
    })

    const [sections, setSections] = useState([
        { id: 1, heading: "", content: "" },
    ])

    const [chartData, setChartData] = useState([
        { label: "", value: 0, date: "" },
    ])

    const [signals, setSignals] = useState([
        { event: "", date: "", impact: "Medium" as const },
    ])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        const article = await createBlogPost({
            title: formData.title,
            excerpt: formData.excerpt,
            content: formData.content,
            author: formData.author,
            tags: formData.tags.split(",").map((t) => t.trim()).filter(Boolean),
            featured: formData.featured,
            category: formData.category,
            readTime: formData.readTime,
            sections: sections.filter((s) => s.heading && s.content),
            chartData: chartData.filter((c) => c.label && c.value),
            signals: signals.filter((s) => s.event && s.date),
        })

        setLoading(false)

        if (article) {
            router.push("/admin")
        } else {
            alert("Failed to create article")
        }
    }

    const addSection = () => {
        setSections([...sections, { id: sections.length + 1, heading: "", content: "" }])
    }

    const removeSection = (index: number) => {
        setSections(sections.filter((_, i) => i !== index))
    }

    const addChartData = () => {
        setChartData([...chartData, { label: "", value: 0, date: "" }])
    }

    const removeChartData = (index: number) => {
        setChartData(chartData.filter((_, i) => i !== index))
    }

    const addSignal = () => {
        setSignals([...signals, { event: "", date: "", impact: "Medium" }])
    }

    const removeSignal = (index: number) => {
        setSignals(signals.filter((_, i) => i !== index))
    }

    return (
        <div className="min-h-screen bg-background pb-12">
            {/* Header */}
            <div className="border-b border-border glass-strong sticky top-0 z-40">
                <div className="max-w-4xl mx-auto px-6 py-6">
                    <div className="flex items-center gap-4">
                        <Link href="/admin" className="p-2 hover:bg-secondary rounded-lg transition-colors">
                            <ArrowLeft className="w-5 h-5 text-muted-foreground" />
                        </Link>
                        <div>
                            <h1 className="text-2xl font-bold gradient-text">Create New Article</h1>
                            <p className="text-sm text-muted-foreground mt-1">Add a new crypto intelligence article</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Form */}
            <div className="max-w-4xl mx-auto px-6 py-8">
                <form onSubmit={handleSubmit} className="space-y-8">
                    {/* Basic Info */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="glass rounded-xl border border-border/50 p-6 space-y-4"
                    >
                        <h2 className="text-lg font-bold text-foreground">Basic Information</h2>

                        <div>
                            <label className="block text-sm font-semibold mb-2 data-text">Title *</label>
                            <input
                                type="text"
                                required
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                className="w-full px-4 py-3 glass border border-border rounded-lg text-foreground focus:border-primary outline-none transition-colors"
                                placeholder="Enter article title"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold mb-2 data-text">Excerpt *</label>
                            <input
                                type="text"
                                required
                                value={formData.excerpt}
                                onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                                className="w-full px-4 py-3 glass border border-border rounded-lg text-foreground focus:border-primary outline-none transition-colors"
                                placeholder="Brief summary for the feed card"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold mb-2 data-text">Content *</label>
                            <textarea
                                required
                                value={formData.content}
                                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                                className="w-full px-4 py-3 glass border border-border rounded-lg text-foreground focus:border-primary outline-none transition-colors h-32 resize-none"
                                placeholder="Main content preview"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-semibold mb-2 data-text">Author</label>
                                <input
                                    type="text"
                                    value={formData.author}
                                    onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                                    className="w-full px-4 py-3 glass border border-border rounded-lg text-foreground focus:border-primary outline-none transition-colors"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold mb-2 data-text">Category</label>
                                <select
                                    value={formData.category}
                                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                    className="w-full px-4 py-3 glass border border-border rounded-lg text-foreground focus:border-primary outline-none transition-colors"
                                >
                                    <option>Market Analysis</option>
                                    <option>Technology Deep Dive</option>
                                    <option>Security Analysis</option>
                                    <option>Regulation</option>
                                </select>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-semibold mb-2 data-text">Reading Time</label>
                                <input
                                    type="text"
                                    value={formData.readTime}
                                    onChange={(e) => setFormData({ ...formData, readTime: e.target.value })}
                                    className="w-full px-4 py-3 glass border border-border rounded-lg text-foreground focus:border-primary outline-none transition-colors"
                                    placeholder="e.g. 5 min read"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold mb-2 data-text">Tags (comma-separated)</label>
                                <input
                                    type="text"
                                    value={formData.tags}
                                    onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                                    className="w-full px-4 py-3 glass border border-border rounded-lg text-foreground focus:border-primary outline-none transition-colors"
                                    placeholder="bitcoin, ethereum, defi"
                                />
                            </div>
                        </div>

                        <div className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                id="featured"
                                checked={formData.featured}
                                onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                                className="w-4 h-4"
                            />
                            <label htmlFor="featured" className="text-sm font-semibold">Featured Article</label>
                        </div>
                    </motion.div>

                    {/* Sections */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="glass rounded-xl border border-border/50 p-6 space-y-4"
                    >
                        <div className="flex items-center justify-between">
                            <h2 className="text-lg font-bold text-foreground">Article Sections</h2>
                            <button
                                type="button"
                                onClick={addSection}
                                className="flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/30 text-primary rounded-lg text-sm font-semibold hover:bg-primary/20 transition-all"
                            >
                                <Plus className="w-4 h-4" />
                                Add Section
                            </button>
                        </div>

                        {sections.map((section, index) => (
                            <div key={index} className="p-4 glass border border-border/30 rounded-lg space-y-3">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm font-semibold data-text">Section {index + 1}</span>
                                    {sections.length > 1 && (
                                        <button
                                            type="button"
                                            onClick={() => removeSection(index)}
                                            className="p-1 hover:bg-red-500/10 rounded text-red-500 transition-colors"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    )}
                                </div>
                                <input
                                    type="text"
                                    value={section.heading}
                                    onChange={(e) => {
                                        const newSections = [...sections]
                                        newSections[index].heading = e.target.value
                                        setSections(newSections)
                                    }}
                                    className="w-full px-4 py-2 glass border border-border rounded-lg text-foreground focus:border-primary outline-none transition-colors"
                                    placeholder="Section heading"
                                />
                                <textarea
                                    value={section.content}
                                    onChange={(e) => {
                                        const newSections = [...sections]
                                        newSections[index].content = e.target.value
                                        setSections(newSections)
                                    }}
                                    className="w-full px-4 py-2 glass border border-border rounded-lg text-foreground focus:border-primary outline-none transition-colors h-24 resize-none"
                                    placeholder="Section content"
                                />
                            </div>
                        ))}
                    </motion.div>

                    {/* Chart Data */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="glass rounded-xl border border-border/50 p-6 space-y-4"
                    >
                        <div className="flex items-center justify-between">
                            <h2 className="text-lg font-bold text-foreground">Chart Data (Optional)</h2>
                            <button
                                type="button"
                                onClick={addChartData}
                                className="flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/30 text-primary rounded-lg text-sm font-semibold hover:bg-primary/20 transition-all"
                            >
                                <Plus className="w-4 h-4" />
                                Add Data Point
                            </button>
                        </div>

                        {chartData.map((data, index) => (
                            <div key={index} className="p-4 glass border border-border/30 rounded-lg">
                                <div className="flex items-center justify-between mb-3">
                                    <span className="text-sm font-semibold data-text">Data Point {index + 1}</span>
                                    {chartData.length > 1 && (
                                        <button
                                            type="button"
                                            onClick={() => removeChartData(index)}
                                            className="p-1 hover:bg-red-500/10 rounded text-red-500 transition-colors"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    )}
                                </div>
                                <div className="grid grid-cols-3 gap-3">
                                    <input
                                        type="text"
                                        value={data.label}
                                        onChange={(e) => {
                                            const newData = [...chartData]
                                            newData[index].label = e.target.value
                                            setChartData(newData)
                                        }}
                                        className="px-4 py-2 glass border border-border rounded-lg text-foreground focus:border-primary outline-none transition-colors"
                                        placeholder="Label"
                                    />
                                    <input
                                        type="number"
                                        value={data.value || ""}
                                        onChange={(e) => {
                                            const newData = [...chartData]
                                            newData[index].value = parseFloat(e.target.value) || 0
                                            setChartData(newData)
                                        }}
                                        className="px-4 py-2 glass border border-border rounded-lg text-foreground focus:border-primary outline-none transition-colors"
                                        placeholder="Value"
                                    />
                                    <input
                                        type="text"
                                        value={data.date}
                                        onChange={(e) => {
                                            const newData = [...chartData]
                                            newData[index].date = e.target.value
                                            setChartData(newData)
                                        }}
                                        className="px-4 py-2 glass border border-border rounded-lg text-foreground focus:border-primary outline-none transition-colors"
                                        placeholder="Date"
                                    />
                                </div>
                            </div>
                        ))}
                    </motion.div>

                    {/* Timeline Signals */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="glass rounded-xl border border-border/50 p-6 space-y-4"
                    >
                        <div className="flex items-center justify-between">
                            <h2 className="text-lg font-bold text-foreground">Timeline Signals (Optional)</h2>
                            <button
                                type="button"
                                onClick={addSignal}
                                className="flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/30 text-primary rounded-lg text-sm font-semibold hover:bg-primary/20 transition-all"
                            >
                                <Plus className="w-4 h-4" />
                                Add Signal
                            </button>
                        </div>

                        {signals.map((signal, index) => (
                            <div key={index} className="p-4 glass border border-border/30 rounded-lg">
                                <div className="flex items-center justify-between mb-3">
                                    <span className="text-sm font-semibold data-text">Signal {index + 1}</span>
                                    {signals.length > 1 && (
                                        <button
                                            type="button"
                                            onClick={() => removeSignal(index)}
                                            className="p-1 hover:bg-red-500/10 rounded text-red-500 transition-colors"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    )}
                                </div>
                                <div className="grid grid-cols-3 gap-3">
                                    <input
                                        type="text"
                                        value={signal.event}
                                        onChange={(e) => {
                                            const newSignals = [...signals]
                                            newSignals[index].event = e.target.value
                                            setSignals(newSignals)
                                        }}
                                        className="px-4 py-2 glass border border-border rounded-lg text-foreground focus:border-primary outline-none transition-colors"
                                        placeholder="Event name"
                                    />
                                    <input
                                        type="text"
                                        value={signal.date}
                                        onChange={(e) => {
                                            const newSignals = [...signals]
                                            newSignals[index].date = e.target.value
                                            setSignals(newSignals)
                                        }}
                                        className="px-4 py-2 glass border border-border rounded-lg text-foreground focus:border-primary outline-none transition-colors"
                                        placeholder="Date"
                                    />
                                    <select
                                        value={signal.impact}
                                        onChange={(e) => {
                                            const newSignals = [...signals]
                                            newSignals[index].impact = e.target.value as "Low" | "Medium" | "High"
                                            setSignals(newSignals)
                                        }}
                                        className="px-4 py-2 glass border border-border rounded-lg text-foreground focus:border-primary outline-none transition-colors"
                                    >
                                        <option>Low</option>
                                        <option>Medium</option>
                                        <option>High</option>
                                    </select>
                                </div>
                            </div>
                        ))}
                    </motion.div>

                    {/* Submit */}
                    <div className="flex gap-4">
                        <button
                            type="submit"
                            disabled={loading}
                            className="flex-1 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:opacity-90 transition-all data-text uppercase tracking-wider text-sm glow-cyan disabled:opacity-50"
                        >
                            {loading ? "Creating..." : "Create Article"}
                        </button>
                        <Link
                            href="/admin"
                            className="flex-1 px-6 py-3 glass border border-border text-foreground rounded-lg font-semibold hover:border-primary transition-all data-text uppercase tracking-wider text-sm text-center"
                        >
                            Cancel
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    )
}
