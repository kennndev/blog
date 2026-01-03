import { supabase, Article } from './supabase'

// Legacy interface for compatibility
export interface BlogPost {
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
  chartData?: Array<{
    label: string
    value: number
    date: string
  }>
  signals: Array<{
    event: string
    date: string
    impact: "Low" | "Medium" | "High"
  }>
}

// Convert database article to BlogPost format
function articleToBlogPost(article: Article): BlogPost {
  return {
    id: article.id,
    title: article.title,
    content: article.content,
    excerpt: article.excerpt,
    author: article.author,
    created_at: article.created_at,
    tags: article.tags,
    featured: article.featured,
    category: article.category,
    readTime: article.read_time,
    sections: article.sections,
    chartData: article.chart_data,
    signals: article.signals,
  }
}

// Get all blog posts
export async function getAllBlogPosts(): Promise<BlogPost[]> {
  const { data, error } = await supabase
    .from('articles')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching articles:', error)
    return []
  }

  return data.map(articleToBlogPost)
}

// Get blog post by ID
export async function getBlogPostById(id: string): Promise<BlogPost | null> {
  const { data, error } = await supabase
    .from('articles')
    .select('*')
    .eq('id', id)
    .single()

  if (error) {
    console.error('Error fetching article:', error)
    return null
  }

  return data ? articleToBlogPost(data) : null
}

// Create new blog post
export async function createBlogPost(
  post: Omit<BlogPost, 'id' | 'created_at'>
): Promise<BlogPost | null> {
  const { data, error } = await supabase
    .from('articles')
    .insert([
      {
        title: post.title,
        content: post.content,
        excerpt: post.excerpt,
        author: post.author,
        tags: post.tags,
        featured: post.featured,
        category: post.category,
        read_time: post.readTime,
        sections: post.sections,
        chart_data: post.chartData || [],
        signals: post.signals,
      },
    ])
    .select()
    .single()

  if (error) {
    console.error('Error creating article:', error)
    return null
  }

  return data ? articleToBlogPost(data) : null
}

// Update blog post
export async function updateBlogPost(
  id: string,
  updates: Partial<Omit<BlogPost, 'id' | 'created_at'>>
): Promise<BlogPost | null> {
  const updateData: any = {}

  if (updates.title !== undefined) updateData.title = updates.title
  if (updates.content !== undefined) updateData.content = updates.content
  if (updates.excerpt !== undefined) updateData.excerpt = updates.excerpt
  if (updates.author !== undefined) updateData.author = updates.author
  if (updates.tags !== undefined) updateData.tags = updates.tags
  if (updates.featured !== undefined) updateData.featured = updates.featured
  if (updates.category !== undefined) updateData.category = updates.category
  if (updates.readTime !== undefined) updateData.read_time = updates.readTime
  if (updates.sections !== undefined) updateData.sections = updates.sections
  if (updates.chartData !== undefined) updateData.chart_data = updates.chartData
  if (updates.signals !== undefined) updateData.signals = updates.signals

  const { data, error } = await supabase
    .from('articles')
    .update(updateData)
    .eq('id', id)
    .select()
    .single()

  if (error) {
    console.error('Error updating article:', error)
    return null
  }

  return data ? articleToBlogPost(data) : null
}

// Delete blog post
export async function deleteBlogPost(id: string): Promise<boolean> {
  const { error } = await supabase
    .from('articles')
    .delete()
    .eq('id', id)

  if (error) {
    console.error('Error deleting article:', error)
    return false
  }

  return true
}
