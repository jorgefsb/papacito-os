import { neon } from '@neondatabase/serverless'

const sql = neon(process.env.DATABASE_URL!)

export { sql }

// Tipos para TypeScript
export type Note = {
  id: string
  content: string
  content_type: 'text' | 'voice' | 'image' | 'link'
  source: string
  source_url?: string
  created_at: string
  updated_at: string
  user_id?: string
  tags: string[]
  metadata: Record<string, any>
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
  color: string
  icon: string
}

export type Area = {
  id: string
  name: string
  description?: string
  status: 'active' | 'maintenance' | 'archived'
  created_at: string
  updated_at: string
  color: string
  icon: string
}
