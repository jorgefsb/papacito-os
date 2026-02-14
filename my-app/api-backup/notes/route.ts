import { NextRequest, NextResponse } from 'next/server';
import { createNote, getAllNotes, searchNotes, getStats } from '@/lib/db';
import { processNote, generateEmbedding } from '@/lib/ai';
import { processNote as processPARA } from '@/lib/para';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q');
    const para = searchParams.get('para'); // Filter by PARA category
    const limit = parseInt(searchParams.get('limit') || '100');
    const offset = parseInt(searchParams.get('offset') || '0');
    
    if (query) {
      const notes = searchNotes(query);
      return NextResponse.json({ notes });
    }
    
    const notes = getAllNotes(limit, offset, para as any);
    const stats = getStats();
    
    return NextResponse.json({ notes, stats });
  } catch (error) {
    console.error('Error fetching notes:', error);
    return NextResponse.json(
      { error: 'Failed to fetch notes' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { content, content_type = 'text', source = 'web' } = body;
    
    if (!content) {
      return NextResponse.json(
        { error: 'Content is required' },
        { status: 400 }
      );
    }
    
    const noteId = crypto.randomUUID();
    
    // 🏷️ Auto-classify with PARA
    const paraData = processPARA(content);
    
    // 🔍 Generate embedding
    const embedding = await generateEmbedding(content);
    
    // Create note with PARA metadata
    const note = createNote({
      id: noteId,
      content,
      content_type,
      source,
      embedding: Buffer.from(new Float32Array(embedding).buffer),
      metadata: JSON.stringify({ 
        created_via: 'api',
        para_confidence: paraData.paraClassification.confidence,
        insights: paraData.insights
      }),
      para_category: paraData.paraClassification.category,
      title: paraData.title,
      summary: paraData.summary,
      key_insights: JSON.stringify(paraData.insights),
    });
    
    return NextResponse.json({ 
      note: {
        ...note,
        para_classification: paraData.paraClassification,
        insights: paraData.insights
      },
      message: 'Note created with PARA classification'
    }, { status: 201 });
    
  } catch (error) {
    console.error('Error creating note:', error);
    return NextResponse.json(
      { error: 'Failed to create note' },
      { status: 500 }
    );
  }
}
