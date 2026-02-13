// 🧠 AI Layer - HIPER NECESARIO
// Sin APIs externas, todo local o simple

import { readFileSync, existsSync } from 'fs';

// Interfaces
export interface Tag {
  name: string;
  confidence: number;
}

// ==================== KEYWORDS SIMPLE (Sin IA) ====================

const KEYWORD_MAP: Record<string, string[]> = {
  'sparkplug': ['sparkplug', 'creative', 'subscription', 'cliente', 'marketing', 'getsparkplug'],
  'amber': ['amber', 'studio', 'game', 'juego', 'vr', 'unity', 'tudor'],
  'strategy': ['strategy', 'estrategia', 'plan', 'objetivo', 'meta', '2025', '2026'],
  'finance': ['finance', 'finanzas', 'money', 'dinero', 'mercury', 'ingresos', 'gastos'],
  'family': ['family', 'familia', 'elena', 'hija', 'casa', 'dragón', 'meme', 'ana'],
  'ai': ['ai', 'ia', 'inteligencia artificial', 'gpt', 'modelo', 'embedding', 'yoshi', 'luna'],
  'urgent': ['urgent', 'urgente', 'ahora', 'inmediato', 'hoy', 'asap'],
  'meeting': ['meeting', 'reunión', 'llamada', 'zoom', 'teams', 'sync'],
  'idea': ['idea', 'idea', 'concepto', 'brainstorm', 'creativo'],
  'learning': ['learning', 'aprendiendo', 'curso', 'libro', 'leer', 'estudiar'],
};

/**
 * Clasificación simple por keywords - Sin IA, sin APIs
 */
export async function classify(content: string): Promise<Tag[]> {
  const contentLower = content.toLowerCase();
  const found: Tag[] = [];

  for (const [tag, keywords] of Object.entries(KEYWORD_MAP)) {
    let matches = 0;
    for (const keyword of keywords) {
      if (contentLower.includes(keyword.toLowerCase())) {
        matches++;
      }
    }
    
    if (matches > 0) {
      found.push({ 
        name: tag, 
        confidence: Math.min(matches * 0.3 + 0.4, 0.95) 
      });
    }
  }

  // Si no encontró nada, tag genérico
  if (found.length === 0) {
    found.push({ name: 'misc', confidence: 0.5 });
  }

  return found.slice(0, 5);
}

// ==================== EMBEDDINGS FAKE (Para búsqueda simple) ====================

/**
 * "Embedding" simple basado en frecuencia de palabras
 * No es semántico pero funciona para búsqueda básica
 */
export async function generateEmbedding(text: string): Promise<number[]> {
  // Crear un vector simple basado en hash de palabras
  const words = text.toLowerCase().split(/\s+/);
  const vector = new Array(128).fill(0);
  
  for (const word of words) {
    // Hash simple
    let hash = 0;
    for (let i = 0; i < word.length; i++) {
      hash = ((hash << 5) - hash) + word.charCodeAt(i);
      hash = hash & hash;
    }
    
    const index = Math.abs(hash) % 128;
    vector[index] += 1;
  }
  
  // Normalizar
  const magnitude = Math.sqrt(vector.reduce((sum, val) => sum + val * val, 0));
  if (magnitude > 0) {
    return vector.map(v => v / magnitude);
  }
  
  return vector;
}

export function embeddingToBuffer(embedding: number[]): Buffer {
  const floatArray = new Float32Array(embedding);
  return Buffer.from(floatArray.buffer);
}

// ==================== PROCESAMIENTO DE NOTAS ====================

export async function processNote(noteId: string, content: string): Promise<void> {
  const { getDb, createTag, addTagToNote, createConnection } = await import('../db');
  
  // 1. Generar "embedding" simple
  const embedding = await generateEmbedding(content);
  const embeddingBuffer = embeddingToBuffer(embedding);
  
  // Update note
  const db = getDb();
  db.prepare('UPDATE notes SET embedding = ? WHERE id = ?').run(embeddingBuffer, noteId);
  
  // 2. Clasificar por keywords
  const tags = await classify(content);
  
  for (const tagData of tags) {
    const existingTag = db.prepare('SELECT id FROM tags WHERE name = ?').get(tagData.name) as { id: string } | undefined;
    
    let tagId: string;
    if (existingTag) {
      tagId = existingTag.id;
    } else {
      const newTag = createTag({
        id: crypto.randomUUID(),
        name: tagData.name,
        color: generateTagColor(tagData.name),
      });
      tagId = newTag.id;
    }
    
    addTagToNote(noteId, tagId, tagData.confidence);
  }
  
  // 3. Conectar a notas similares (búsqueda por palabras compartidas)
  await autoConnectNote(noteId, content);
}

// ==================== CONEXIONES ====================

async function autoConnectNote(noteId: string, content: string): Promise<void> {
  const { getDb, createConnection } = await import('../db');
  const db = getDb();
  
  const words = content.toLowerCase().split(/\s+/).filter(w => w.length > 3);
  const wordSet = new Set(words);
  
  // Buscar notas con palabras en común
  const allNotes = db.prepare('SELECT id, content FROM notes WHERE id != ?').all(noteId) as Array<{ id: string; content: string }>;
  
  const similarities = allNotes.map(note => {
    const noteWords = note.content.toLowerCase().split(/\s+/).filter(w => w.length > 3);
    const commonWords = noteWords.filter(w => wordSet.has(w));
    const similarity = commonWords.length / Math.max(words.length, noteWords.length);
    return { id: note.id, similarity };
  });
  
  // Crear conexiones para matches fuertes
  const topMatches = similarities
    .sort((a, b) => b.similarity - a.similarity)
    .slice(0, 3)
    .filter(match => match.similarity > 0.3);
  
  for (const match of topMatches) {
    createConnection({
      id: crypto.randomUUID(),
      source_note_id: noteId,
      target_note_id: match.id,
      relationship_type: match.similarity > 0.6 ? 'similar' : 'related',
      strength: match.similarity,
    });
  }
}

// ==================== MULTIMEDIA (whisper.cpp + Tesseract) ====================

import { transcribeAudio, extractTextFromImage, processMedia, checkMultimediaStatus } from '../multimedia';

export { transcribeAudio, extractTextFromImage, processMedia };

// Backwards compatibility
export async function transcribe(audioPath: string): Promise<{ text: string }> {
  const result = await transcribeAudio(audioPath);
  return { text: result.text };
}

export async function ocr(imagePath: string): Promise<string> {
  const result = await extractTextFromImage(imagePath);
  return result.text;
}

// ==================== UTILIDADES ====================

function generateTagColor(name: string): string {
  const colors = [
    '#6366F1', '#8B5CF6', '#EC4899', '#F43F5E', 
    '#10B981', '#3B82F6', '#F59E0B', '#14B8A6',
  ];
  
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  
  return colors[Math.abs(hash) % colors.length];
}

/**
 * Búsqueda simple por contenido (no semántica pero funciona)
 */
export function searchNotes(query: string, notes: Array<{ id: string; content: string }>): Array<{ id: string; score: number }> {
  const queryWords = query.toLowerCase().split(/\s+/).filter(w => w.length > 2);
  
  return notes.map(note => {
    const noteLower = note.content.toLowerCase();
    let matches = 0;
    
    for (const word of queryWords) {
      if (noteLower.includes(word)) {
        matches++;
      }
    }
    
    const score = matches / queryWords.length;
    return { id: note.id, score };
  }).filter(r => r.score > 0).sort((a, b) => b.score - a.score);
}

// ==================== HEALTH CHECK ====================

export async function checkAIStatus() {
  const multimedia = await checkMultimediaStatus();
  return {
    ...multimedia,
    keywords: true,
  };
}
