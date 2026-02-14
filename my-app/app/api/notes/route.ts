import { NextRequest, NextResponse } from 'next/server'
import { neon } from '@neondatabase/serverless'

const DATABASE_URL = process.env.DATABASE_URL || 
  'postgresql://neondb_owner:npg_CU3jrqws7bOD@ep-late-grass-air7fbpj-pooler.c-4.us-east-1.aws.neon.tech/neondb?sslmode=require'

const sql = neon(DATABASE_URL)

// GET /api/notes - Obtener todas las notas
export async function GET() {
  try {
    const notes = await sql`
      SELECT * FROM notes 
      WHERE is_archived = false
      ORDER BY created_at DESC
    `
    
    const stats = await sql`
      SELECT 
        (SELECT COUNT(*) FROM notes WHERE is_archived = false) as notes,
        (SELECT COUNT(*) FROM projects) as projects,
        (SELECT COUNT(*) FROM areas) as areas
    `
    
    return NextResponse.json({
      notes,
      stats: {
        notes: Number(stats[0].notes),
        tags: 0, // TODO: Calcular tags únicos
        connections: 0, // TODO: Calcular conexiones
        byPara: {
          projects: 0,
          areas: 0,
          resources: 0,
          archives: 0
        }
      }
    })
  } catch (error) {
    console.error('Error fetching notes:', error)
    return NextResponse.json(
      { error: 'Error al obtener notas' },
      { status: 500 }
    )
  }
}

// POST /api/notes - Crear nueva nota
export async function POST(request: NextRequest) {
  try {
    const { content, tags = [] } = await request.json()
    
    if (!content?.trim()) {
      return NextResponse.json(
        { error: 'El contenido es requerido' },
        { status: 400 }
      )
    }
    
    const result = await sql`
      INSERT INTO notes (content, tags, source)
      VALUES (${content}, ${tags}, 'web')
      RETURNING *
    `
    
    return NextResponse.json(result[0])
  } catch (error) {
    console.error('Error creating note:', error)
    return NextResponse.json(
      { error: 'Error al crear nota' },
      { status: 500 }
    )
  }
}
