import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// TypeScript types for database
export interface Database {
    public: {
        Tables: {
            articles: {
                Row: {
                    id: string
                    title: string
                    content: string
                    excerpt: string
                    author: string
                    created_at: string
                    updated_at: string
                    tags: string[]
                    featured: boolean
                    category: string
                    read_time: string
                    sections: Section[]
                    chart_data: ChartData[]
                    signals: Signal[]
                }
                Insert: Omit<Database['public']['Tables']['articles']['Row'], 'id' | 'created_at' | 'updated_at'>
                Update: Partial<Database['public']['Tables']['articles']['Insert']>
            }
        }
    }
}

export interface Section {
    id: number
    heading: string
    content: string
}

export interface ChartData {
    label: string
    value: number
    date: string
}

export interface Signal {
    event: string
    date: string
    impact: 'Low' | 'Medium' | 'High'
}

export type Article = Database['public']['Tables']['articles']['Row']
