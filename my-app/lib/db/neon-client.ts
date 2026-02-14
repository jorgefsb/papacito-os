import { neon } from '@neondatabase/serverless'

const DATABASE_URL = process.env.DATABASE_URL

if (!DATABASE_URL) {
  throw new Error('DATABASE_URL no está configurada')
}

export const sql = neon(DATABASE_URL)

// Tipos
export interface Note {
  id: string
  content: string
  content_type: 'text' | 'voice' | 'image' | 'link'
  source: string
  source_url?: string
  created_at: string
  updated_at: string
  tags: string[]
  metadata: Record<string, any>
  is_archived: boolean
  is_favorite: boolean
  view_count: number
}

export interface Project {
  id: string
  name: string
  description: string | null
  status: 'active' | 'paused' | 'completed' | 'archived'
  created_at: string
  color: string
  icon: string
}

export interface Area {
  id: string
  name: string
  description: string | null
  status: 'active' | 'maintenance' | 'archived'
  created_at: string
  color: string
  icon: string
}

// Operaciones CRUD
export async function createNote(content: string, tags: string[] = []): Promise<Note> {
  const result = await sql`
    INSERT INTO notes (content, tags)
    VALUES (${content}, ${tags})
    RETURNING *
  `
  return result[0] as Note
}

export async function getAllNotes(limit = 100): Promise<Note[]> {
  return await sql`
    SELECT * FROM notes 
    WHERE is_archived = false
    ORDER BY created_at DESC 
    LIMIT ${limit}
  ` as Note[]
}

export async function getNoteById(id: string): Promise<Note | null> {
  const result = await sql`SELECT * FROM notes WHERE id = ${id}`
  return result[0] as Note || null
}

export async function searchNotes(query: string): Promise<Note[]> {
  return await sql`
    SELECT * FROM notes 
    WHERE content ILIKE ${`%${query}%`}
    AND is_archived = false
    ORDER BY created_at DESC
  ` as Note[]
}

export async function getAllProjects(): Promise<Project[]> {
  return await sql`SELECT * FROM projects ORDER BY name` as Project[]
}

export async function getAllAreas(): Promise<Area[]> {
  return await sql`SELECT * FROM areas ORDER BY name` as Area[]
}

export async function getStats() {
  const notes = await sql`SELECT COUNT(*) as count FROM notes WHERE is_archived = false`
  const projects = await sql`SELECT COUNT(*) as count FROM projects`
  const areas = await sql`SELECT COUNT(*) as count FROM areas`
  
  return {
    notes: Number(notes[0].count),
    projects: Number(projects[0].count),
    areas: Number(areas[0].count)
  }
}
