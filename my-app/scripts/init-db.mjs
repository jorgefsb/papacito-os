import { neon } from '@neondatabase/serverless';

const DATABASE_URL = 'postgresql://neondb_owner:npg_CU3jrqws7bOD@ep-late-grass-air7fbpj-pooler.c-4.us-east-1.aws.neon.tech/neondb?sslmode=require';
const sql = neon(DATABASE_URL);

async function init() {
  console.log('🧠 Inicializando Papacito OS...\n');
  
  try {
    // Crear tabla notes
    await sql`
      CREATE TABLE IF NOT EXISTS notes (
        id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
        content TEXT NOT NULL,
        content_type TEXT DEFAULT 'text',
        source TEXT DEFAULT 'web',
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        tags TEXT[] DEFAULT '{}',
        metadata JSONB DEFAULT '{}',
        is_archived BOOLEAN DEFAULT FALSE,
        is_favorite BOOLEAN DEFAULT FALSE
      )
    `;
    console.log('✅ Tabla notes creada');
    
    // Crear tabla projects
    await sql`
      CREATE TABLE IF NOT EXISTS projects (
        id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
        name TEXT NOT NULL,
        description TEXT,
        status TEXT DEFAULT 'active',
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        color TEXT DEFAULT '#3b82f6',
        icon TEXT DEFAULT '📁'
      )
    `;
    console.log('✅ Tabla projects creada');
    
    // Crear tabla areas
    await sql`
      CREATE TABLE IF NOT EXISTS areas (
        id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
        name TEXT NOT NULL,
        description TEXT,
        status TEXT DEFAULT 'active',
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        color TEXT DEFAULT '#10b981',
        icon TEXT DEFAULT '🎯'
      )
    `;
    console.log('✅ Tabla areas creada');
    
    // Insertar datos de ejemplo
    await sql`
      INSERT INTO projects (name, description, color, icon)
      VALUES ('Papacito OS', 'Sistema operativo personal', '#8b5cf6', '🧠')
      ON CONFLICT DO NOTHING
    `;
    
    await sql`
      INSERT INTO areas (name, description, color, icon) VALUES
      ('Sparkplug Tech', 'Empresa de servicios creativos', '#f59e0b', '💥'),
      ('Amber Studio', 'Trabajo como GM México', '#3b82f6', '🎮'),
      ('Familia', 'Vida personal y familia', '#ec4899', '❤️'),
      ('Desarrollo Personal', 'Crecimiento y aprendizaje', '#10b981', '🌱')
      ON CONFLICT DO NOTHING
    `;
    console.log('✅ Datos de ejemplo insertados');
    
    // Verificar
    const notes = await sql`SELECT COUNT(*) FROM notes`;
    const projects = await sql`SELECT COUNT(*) FROM projects`;
    const areas = await sql`SELECT COUNT(*) FROM areas`;
    
    console.log('\n📊 Estado de la base de datos:');
    console.log(`  Notas: ${notes[0].count}`);
    console.log(`  Proyectos: ${projects[0].count}`);
    console.log(`  Áreas: ${areas[0].count}`);
    
    console.log('\n🚀 ¡Base de datos lista!');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

init();
