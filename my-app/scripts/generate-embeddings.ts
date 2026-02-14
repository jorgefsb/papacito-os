/**
 * 🧠 Script para generar embeddings de notas existentes
 * Ejecutar: npx ts-node scripts/generate-embeddings.ts
 */

import { generateEmbedding } from '../lib/ai/embeddings';
import { getAllNotes, updateNoteEmbedding } from '../lib/db';

async function main() {
  console.log('🧠 Generando embeddings para notas existentes...\n');
  
  const notes = getAllNotes();
  console.log(`📊 Total de notas: ${notes.length}`);
  
  let processed = 0;
  let errors = 0;
  
  for (const note of notes) {
    try {
      // Skip si ya tiene embedding
      if (note.embedding) {
        console.log(`⏭️  Saltando nota ${note.id.slice(0, 8)}... (ya tiene embedding)`);
        continue;
      }
      
      console.log(`📝 Procesando nota ${note.id.slice(0, 8)}...`);
      
      const embedding = await generateEmbedding(note.content);
      updateNoteEmbedding(note.id, embedding);
      
      processed++;
      console.log(`✅ Embedding generado (${embedding.length} dimensiones)`);
      
      // Pequeña pausa para no saturar
      await new Promise(resolve => setTimeout(resolve, 100));
      
    } catch (error) {
      console.error(`❌ Error en nota ${note.id}:`, error);
      errors++;
    }
  }
  
  console.log('\n' + '='.repeat(50));
  console.log('📊 RESUMEN:');
  console.log(`   Procesadas: ${processed}`);
  console.log(`   Errores: ${errors}`);
  console.log(`   Saltadas (ya tenían): ${notes.length - processed - errors}`);
  console.log('='.repeat(50));
}

main().catch(console.error);
