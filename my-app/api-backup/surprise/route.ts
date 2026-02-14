/**
 * 🪝 API de "Conexiones Sorpresa" - HOOKED Variable Reward
 * Encuentra conexiones inesperadas entre notas para dopamina del usuario
 */

import { NextRequest, NextResponse } from 'next/server';
import { getSurpriseConnections } from '@/lib/ai/embeddings';
import { getNotesWithEmbeddings, getNoteById } from '@/lib/db';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const count = parseInt(searchParams.get('count') || '3', 10);
    
    const notes = getNotesWithEmbeddings();
    
    if (notes.length < 2) {
      return NextResponse.json({
        connections: [],
        message: 'Necesitas al menos 2 notas para encontrar conexiones',
        totalNotes: notes.length
      });
    }
    
    // 🪝 Variable Reward: Conexiones aleatorias pero relevantes
    const connections = await getSurpriseConnections(
      notes.map(n => ({ id: n.id, content: n.content, embedding: n.embedding })),
      count
    );
    
    // Enriquecer con contenido de notas
    const enrichedConnections = await Promise.all(
      connections.map(async (conn) => {
        const noteA = await getNoteById(conn.noteA);
        const noteB = await getNoteById(conn.noteB);
        
        return {
          ...conn,
          noteAContent: noteA?.content.slice(0, 100) + '...' || 'Nota no encontrada',
          noteBContent: noteB?.content.slice(0, 100) + '...' || 'Nota no encontrada',
          noteAType: noteA?.content_type,
          noteBType: noteB?.content_type
        };
      })
    );
    
    return NextResponse.json({
      connections: enrichedConnections,
      totalNotes: notes.length,
      // 🪝 Trigger para volver: "Descubre más conexiones"
      hasMore: notes.length > 5
    });
    
  } catch (error) {
    console.error('Surprise connections error:', error);
    return NextResponse.json(
      { error: 'Failed to find connections', details: String(error) },
      { status: 500 }
    );
  }
}
