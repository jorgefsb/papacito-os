/**
 * 🔍 API de Búsqueda Semántica
 * Busca notas por significado, no solo por palabras clave
 */

import { NextRequest, NextResponse } from 'next/server';
import { searchSimilar } from '@/lib/ai/embeddings';
import { getNotesWithEmbeddings, searchNotes } from '@/lib/db';

export async function POST(req: NextRequest) {
  try {
    const { query, type = 'semantic', limit = 10 } = await req.json();
    
    if (!query || query.trim().length === 0) {
      return NextResponse.json(
        { error: 'Query is required' },
        { status: 400 }
      );
    }
    
    // Búsqueda semántica (por significado)
    if (type === 'semantic') {
      const notes = getNotesWithEmbeddings();
      
      if (notes.length === 0) {
        return NextResponse.json({
          results: [],
          message: 'No hay notas con embeddings. Sube algunas notas primero.',
          type: 'semantic'
        });
      }
      
      const results = await searchSimilar(
        query,
        notes.map(n => ({ id: n.id, content: n.content, embedding: n.embedding })),
        limit
      );
      
      return NextResponse.json({
        results,
        type: 'semantic',
        total: results.length,
        query
      });
    }
    
    // Búsqueda tradicional (por texto)
    const results = searchNotes(query).slice(0, limit).map(note => ({
      id: note.id,
      content: note.content,
      similarity: 1.0 // Full match for text search
    }));
    
    return NextResponse.json({
      results,
      type: 'text',
      total: results.length,
      query
    });
    
  } catch (error) {
    console.error('Search error:', error);
    return NextResponse.json(
      { error: 'Search failed', details: String(error) },
      { status: 500 }
    );
  }
}
