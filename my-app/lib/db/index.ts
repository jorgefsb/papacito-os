import Database from 'better-sqlite3';
import { join } from 'path';
import { readFileSync } from 'fs';

const DB_PATH = process.env.DB_PATH || join(process.cwd(), 'second-brain.db');

let db: Database.Database | null = null;

export function getDb(): Database.Database {
  if (!db) {
    db = new Database(DB_PATH);
    db.pragma('journal_mode = WAL');
    
    // Initialize schema
    const schema = readFileSync(join(process.cwd(), 'lib/db/schema.sql'), 'utf-8');
    db.exec(schema);
  }
  return db;
}

// Note operations
export interface Note {
  id: string;
  content: string;
  content_type: string;
  source: string;
  created_at: string;
  updated_at: string;
  embedding?: Buffer;
  metadata?: string;
  
  // PARA Classification
  para_category?: 'projects' | 'areas' | 'resources' | 'archives';
  project_id?: string;
  area_id?: string;
  
  // Auto-extracted metadata
  title?: string;
  summary?: string;
  key_insights?: string;
  
  // Media handling
  media_url?: string;
  media_transcript?: string;
  media_ocr?: string;
  
  // Status
  is_archived?: number;
}

export function createNote(note: Omit<Note, 'created_at' | 'updated_at'>): Note {
  const db = getDb();
  const stmt = db.prepare(`
    INSERT INTO notes (
      id, content, content_type, source, embedding, metadata,
      para_category, project_id, area_id, title, summary, key_insights,
      media_url, media_transcript, media_ocr, is_archived
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);
  
  stmt.run(
    note.id,
    note.content,
    note.content_type,
    note.source,
    note.embedding,
    note.metadata,
    note.para_category || 'resources',
    note.project_id || null,
    note.area_id || null,
    note.title || null,
    note.summary || null,
    note.key_insights || null,
    note.media_url || null,
    note.media_transcript || null,
    note.media_ocr || null,
    note.is_archived || 0
  );
  
  return getNoteById(note.id)!;
}

export function getNoteById(id: string): Note | undefined {
  const db = getDb();
  return db.prepare('SELECT * FROM notes WHERE id = ?').get(id) as Note | undefined;
}

export function getAllNotes(limit = 100, offset = 0, paraCategory?: string): Note[] {
  const db = getDb();
  
  if (paraCategory) {
    return db.prepare(`
      SELECT * FROM notes 
      WHERE para_category = ? AND is_archived = 0
      ORDER BY created_at DESC 
      LIMIT ? OFFSET ?
    `).all(paraCategory, limit, offset) as Note[];
  }
  
  return db.prepare(`
    SELECT * FROM notes 
    WHERE is_archived = 0
    ORDER BY created_at DESC 
    LIMIT ? OFFSET ?
  `).all(limit, offset) as Note[];
}

export function searchNotes(query: string): Note[] {
  const db = getDb();
  return db.prepare(`
    SELECT * FROM notes 
    WHERE content LIKE ? 
    ORDER BY created_at DESC
  `).all(`%${query}%`) as Note[];
}

// Tag operations
export interface Tag {
  id: string;
  name: string;
  color: string;
  created_at: string;
}

export function createTag(tag: Omit<Tag, 'created_at'>): Tag {
  const db = getDb();
  const stmt = db.prepare('INSERT INTO tags (id, name, color) VALUES (?, ?, ?)');
  stmt.run(tag.id, tag.name, tag.color);
  return getTagById(tag.id)!;
}

export function getTagById(id: string): Tag | undefined {
  const db = getDb();
  return db.prepare('SELECT * FROM tags WHERE id = ?').get(id) as Tag | undefined;
}

export function getAllTags(): Tag[] {
  const db = getDb();
  return db.prepare('SELECT * FROM tags ORDER BY name').all() as Tag[];
}

// Note-Tag operations
export function addTagToNote(noteId: string, tagId: string, confidence = 1.0): void {
  const db = getDb();
  const stmt = db.prepare('INSERT OR IGNORE INTO note_tags (note_id, tag_id, confidence) VALUES (?, ?, ?)');
  stmt.run(noteId, tagId, confidence);
}

export function getTagsForNote(noteId: string): Tag[] {
  const db = getDb();
  return db.prepare(`
    SELECT t.* FROM tags t
    JOIN note_tags nt ON t.id = nt.tag_id
    WHERE nt.note_id = ?
  `).all(noteId) as Tag[];
}

// Connection operations
export interface Connection {
  id: string;
  source_note_id: string;
  target_note_id: string;
  relationship_type: string;
  strength: number;
  created_at: string;
}

export function createConnection(conn: Omit<Connection, 'created_at'>): Connection {
  const db = getDb();
  const stmt = db.prepare(`
    INSERT INTO connections (id, source_note_id, target_note_id, relationship_type, strength)
    VALUES (?, ?, ?, ?, ?)
  `);
  stmt.run(conn.id, conn.source_note_id, conn.target_note_id, conn.relationship_type, conn.strength);
  return getConnectionById(conn.id)!;
}

export function getConnectionById(id: string): Connection | undefined {
  const db = getDb();
  return db.prepare('SELECT * FROM connections WHERE id = ?').get(id) as Connection | undefined;
}

export function getConnectionsForNote(noteId: string): Connection[] {
  const db = getDb();
  return db.prepare(`
    SELECT * FROM connections 
    WHERE source_note_id = ? OR target_note_id = ?
  `).all(noteId, noteId) as Connection[];
}

// Stats
export function getStats() {
  const db = getDb();
  const notes = db.prepare('SELECT COUNT(*) as count FROM notes').get() as { count: number };
  const tags = db.prepare('SELECT COUNT(*) as count FROM tags').get() as { count: number };
  const connections = db.prepare('SELECT COUNT(*) as count FROM connections').get() as { count: number };
  
  return {
    notes: notes.count,
    tags: tags.count,
    connections: connections.count
  };
}

// 🧠 Semantic Search Operations
export interface NoteWithEmbedding {
  id: string;
  content: string;
  content_type: string;
  source: string;
  created_at: string;
  updated_at: string;
  embedding: number[];
}

export function getNotesWithEmbeddings(): NoteWithEmbedding[] {
  const db = getDb();
  const notes = db.prepare('SELECT * FROM notes WHERE embedding IS NOT NULL').all() as Note[];
  
  return notes.map(note => ({
    id: note.id,
    content: note.content,
    content_type: note.content_type,
    source: note.source,
    created_at: note.created_at,
    updated_at: note.updated_at,
    embedding: bufferToFloatArray(note.embedding!)
  }));
}

export function updateNoteEmbedding(noteId: string, embedding: number[]): void {
  const db = getDb();
  const buffer = floatArrayToBuffer(embedding);
  db.prepare('UPDATE notes SET embedding = ? WHERE id = ?').run(buffer, noteId);
}

// 🪝 HOOKED: Surprise Connections
export function getRandomNote(): Note | undefined {
  const db = getDb();
  return db.prepare('SELECT * FROM notes ORDER BY RANDOM() LIMIT 1').get() as Note | undefined;
}

export function getNoteByIdWithEmbedding(id: string): NoteWithEmbedding | undefined {
  const db = getDb();
  const note = db.prepare('SELECT * FROM notes WHERE id = ? AND embedding IS NOT NULL').get(id) as Note | undefined;
  if (!note) return undefined;
  
  return {
    id: note.id,
    content: note.content,
    content_type: note.content_type,
    source: note.source,
    created_at: note.created_at,
    updated_at: note.updated_at,
    embedding: bufferToFloatArray(note.embedding!)
  };
}

// Helper functions
function floatArrayToBuffer(arr: number[]): Buffer {
  const floatArray = new Float32Array(arr);
  return Buffer.from(floatArray.buffer);
}

function bufferToFloatArray(buffer: Buffer): number[] {
  const floatArray = new Float32Array(buffer.buffer, buffer.byteOffset, buffer.byteLength / 4);
  return Array.from(floatArray);
}
