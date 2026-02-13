import { NextRequest, NextResponse } from 'next/server';
import { createNote, getAllNotes, searchNotes, getStats } from '@/lib/db';
import { processNote } from '@/lib/ai';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q');
    const limit = parseInt(searchParams.get('limit') || '100');
    const offset = parseInt(searchParams.get('offset') || '0');
    
    if (query) {
      const notes = searchNotes(query);
      return NextResponse.json({ notes });
    }
    
    const notes = getAllNotes(limit, offset);
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
    
    // Create note
    const note = createNote({
      id: noteId,
      content,
      content_type,
      source,
      metadata: JSON.stringify({ created_via: 'api' }),
    });
    
    // Process with AI (async, don't wait)
    processNote(noteId, content).catch(console.error);
    
    return NextResponse.json({ 
      note,
      message: 'Note created and processing...'
    }, { status: 201 });
    
  } catch (error) {
    console.error('Error creating note:', error);
    return NextResponse.json(
      { error: 'Failed to create note' },
      { status: 500 }
    );
  }
}
