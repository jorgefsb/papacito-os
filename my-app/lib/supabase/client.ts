import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Tipos para TypeScript
export type Note = {
  id: string
  content: string
  content_type: 'text' | 'voice' | 'image' | 'link'
  source: string
  source_url?: string
  created_at: string
  updated_at: string
  user_id: string
  tags: string[]
  metadata: Record<string, any>
  embedding?: number[]
  para_category?: 'projects' | 'areas' | 'resources' | 'archives'
  para_id?: string
  is_archived: boolean
  is_favorite: boolean
  view_count: number
}

export type Project = {
  id: string
  name: string
  description?: string
  status: 'active' | 'paused' | 'completed' | 'archived'
  goal_date?: string
  created_at: string
  updated_at: string
  user_id: string
  color: string
  icon: string
  metadata: Record<string, any>
}

export type Area = {
  id: string
  name: string
  description?: string
  status: 'active' | 'maintenance' | 'archived'
  created_at: string
  updated_at: string
  user_id: string
  color: string
  icon: string
  metadata: Record<string, any>
}

export type Resource = {
  id: string
  name: string
  description?: string
  resource_type: 'link' | 'book' | 'article' | 'video' | 'tool' | 'contact'
  url?: string
  created_at: string
  updated_at: string
  user_id: string
  tags: string[]
  metadata: Record<string, any>
}
