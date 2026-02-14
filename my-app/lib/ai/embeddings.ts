/**
 * 🧠 Embeddings Module - Search Semántico
 * Usa Xenova Transformers para embeddings locales (sin API externa)
 */

import { pipeline, FeatureExtractionPipeline } from '@xenova/transformers';

let embedder: FeatureExtractionPipeline | null = null;

/**
 * Inicializa el modelo de embeddings
 * Usa 'Xenova/all-MiniLM-L6-v2' - rápido y bueno para búsqueda semántica
 */
export async function initEmbeddings(): Promise<FeatureExtractionPipeline> {
  if (embedder) return embedder;
  
  console.log('🧠 Cargando modelo de embeddings...');
  embedder = await pipeline(
    'feature-extraction',
    'Xenova/all-MiniLM-L6-v2',
    { quantized: true } // Más rápido, menos memoria
  );
  console.log('✅ Modelo de embeddings listo');
  return embedder;
}

/**
 * Genera embedding para un texto
 */
export async function generateEmbedding(text: string): Promise<number[]> {
  const model = await initEmbeddings();
  
  // Truncar texto largo (modelo tiene límite de tokens)
  const truncated = text.slice(0, 1000);
  
  const output = await model(truncated, {
    pooling: 'mean',
    normalize: true,
  });
  
  return Array.from(output.data);
}

/**
 * Calcula similitud coseno entre dos vectores
 */
export function cosineSimilarity(a: number[], b: number[]): number {
  let dotProduct = 0;
  let normA = 0;
  let normB = 0;
  
  for (let i = 0; i < a.length; i++) {
    dotProduct += a[i] * b[i];
    normA += a[i] * a[i];
    normB += b[i] * b[i];
  }
  
  return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
}

/**
 * Busca notas similares a un query
 */
export async function searchSimilar(
  query: string,
  notes: Array<{ id: string; content: string; embedding?: number[] }>,
  topK: number = 5
): Promise<Array<{ id: string; content: string; similarity: number }>> {
  const queryEmbedding = await generateEmbedding(query);
  
  const scored = notes
    .filter(note => note.embedding)
    .map(note => ({
      id: note.id,
      content: note.content,
      similarity: cosineSimilarity(queryEmbedding, note.embedding!)
    }))
    .sort((a, b) => b.similarity - a.similarity)
    .slice(0, topK);
  
  return scored;
}

/**
 * Encuentra conexiones entre notas (para "Conexiones Sorpresa")
 */
export async function findConnections(
  notes: Array<{ id: string; content: string; embedding?: number[] }>,
  threshold: number = 0.7
): Promise<Array<{ noteA: string; noteB: string; similarity: number }>> {
  const connections: Array<{ noteA: string; noteB: string; similarity: number }> = [];
  
  for (let i = 0; i < notes.length; i++) {
    for (let j = i + 1; j < notes.length; j++) {
      const noteA = notes[i];
      const noteB = notes[j];
      
      if (!noteA.embedding || !noteB.embedding) continue;
      
      const similarity = cosineSimilarity(noteA.embedding, noteB.embedding);
      
      if (similarity >= threshold) {
        connections.push({
          noteA: noteA.id,
          noteB: noteB.id,
          similarity
        });
      }
    }
  }
  
  return connections.sort((a, b) => b.similarity - a.similarity);
}

/**
 * Sugerencias de "Conexiones Sorpresa" (HOOKED - Variable Reward)
 */
export async function getSurpriseConnections(
  notes: Array<{ id: string; content: string; embedding?: number[] }>,
  count: number = 3
): Promise<Array<{ noteA: string; noteB: string; reason: string }>> {
  const connections = await findConnections(notes, 0.65);
  
  // Seleccionar aleatoriamente para "sorpresa" (variable reward)
  const shuffled = connections.sort(() => Math.random() - 0.5);
  
  return shuffled.slice(0, count).map(conn => ({
    noteA: conn.noteA,
    noteB: conn.noteB,
    reason: generateConnectionReason(conn.similarity)
  }));
}

function generateConnectionReason(similarity: number): string {
  if (similarity > 0.85) return '🧠 Conexión fuerte detectada';
  if (similarity > 0.75) return '💡 Ideas relacionadas';
  return '🔗 Patrón interesante';
}
