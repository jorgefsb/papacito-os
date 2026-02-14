-- 🧠 PAPACITO OS - NEON PostgreSQL Schema
-- Segundo Cerebro de Jorge Suárez

-- ============================================
-- EXTENSIONES
-- ============================================
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS pg_trgm;

-- ============================================
-- TABLAS PRINCIPALES
-- ============================================

-- 📝 Notas (el corazón del sistema)
CREATE TABLE IF NOT EXISTS notes (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    content TEXT NOT NULL,
    content_type TEXT DEFAULT 'text' CHECK (content_type IN ('text', 'voice', 'image', 'link')),
    source TEXT DEFAULT 'web',
    source_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    user_email TEXT,
    tags TEXT[] DEFAULT '{}',
    metadata JSONB DEFAULT '{}',
    para_category TEXT CHECK (para_category IN ('projects', 'areas', 'resources', 'archives')),
    para_id UUID,
    is_archived BOOLEAN DEFAULT FALSE,
    is_favorite BOOLEAN DEFAULT FALSE,
    view_count INTEGER DEFAULT 0
);

-- 📁 Proyectos (PARA - Projects)
CREATE TABLE IF NOT EXISTS projects (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    status TEXT DEFAULT 'active' CHECK (status IN ('active', 'paused', 'completed', 'archived')),
    goal_date DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    user_email TEXT,
    color TEXT DEFAULT '#3b82f6',
    icon TEXT DEFAULT '📁',
    metadata JSONB DEFAULT '{}'
);

-- 🎯 Áreas (PARA - Areas)
CREATE TABLE IF NOT EXISTS areas (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    status TEXT DEFAULT 'active' CHECK (status IN ('active', 'maintenance', 'archived')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    user_email TEXT,
    color TEXT DEFAULT '#10b981',
    icon TEXT DEFAULT '🎯',
    metadata JSONB DEFAULT '{}'
);

-- 📚 Recursos (PARA - Resources)
CREATE TABLE IF NOT EXISTS resources (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    resource_type TEXT DEFAULT 'link' CHECK (resource_type IN ('link', 'book', 'article', 'video', 'tool', 'contact')),
    url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    user_email TEXT,
    tags TEXT[] DEFAULT '{}',
    metadata JSONB DEFAULT '{}'
);

-- 🔗 Conexiones entre notas (grafos de conocimiento)
CREATE TABLE IF NOT EXISTS note_connections (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    source_note_id UUID REFERENCES notes(id) ON DELETE CASCADE,
    target_note_id UUID REFERENCES notes(id) ON DELETE CASCADE,
    connection_type TEXT DEFAULT 'related' CHECK (connection_type IN ('related', 'references', 'contradicts', 'supports', 'parent', 'child')),
    strength FLOAT DEFAULT 0.5 CHECK (strength >= 0 AND strength <= 1),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    user_email TEXT,
    UNIQUE(source_note_id, target_note_id)
);

-- 💬 Mensajes de Telegram (para sync)
CREATE TABLE IF NOT EXISTS telegram_messages (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    telegram_message_id BIGINT UNIQUE,
    chat_id BIGINT,
    content TEXT NOT NULL,
    message_type TEXT DEFAULT 'text' CHECK (message_type IN ('text', 'voice', 'photo', 'document')),
    processed BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    user_email TEXT,
    note_id UUID REFERENCES notes(id) ON DELETE SET NULL,
    metadata JSONB DEFAULT '{}'
);

-- ============================================
-- ÍNDICES PARA PERFORMANCE
-- ============================================
CREATE INDEX IF NOT EXISTS idx_notes_created_at ON notes(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_notes_tags ON notes USING GIN(tags);
CREATE INDEX IF NOT EXISTS idx_notes_para_category ON notes(para_category);
CREATE INDEX IF NOT EXISTS idx_notes_is_archived ON notes(is_archived) WHERE is_archived = FALSE;
CREATE INDEX IF NOT EXISTS idx_notes_content_search ON notes USING GIN(to_tsvector('spanish', content));
CREATE INDEX IF NOT EXISTS idx_connections_source ON note_connections(source_note_id);
CREATE INDEX IF NOT EXISTS idx_connections_target ON note_connections(target_note_id);
CREATE INDEX IF NOT EXISTS idx_telegram_processed ON telegram_messages(processed) WHERE processed = FALSE;

-- ============================================
-- FUNCIONES ÚTILES
-- ============================================

-- Actualizar updated_at automáticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Crear triggers solo si no existen
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_notes_updated_at') THEN
        CREATE TRIGGER update_notes_updated_at BEFORE UPDATE ON notes
            FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_projects_updated_at') THEN
        CREATE TRIGGER update_projects_updated_at BEFORE UPDATE ON projects
            FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_areas_updated_at') THEN
        CREATE TRIGGER update_areas_updated_at BEFORE UPDATE ON areas
            FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_resources_updated_at') THEN
        CREATE TRIGGER update_resources_updated_at BEFORE UPDATE ON resources
            FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
    END IF;
END $$;

-- Búsqueda por texto
CREATE OR REPLACE FUNCTION search_notes_by_text(
    search_query TEXT,
    match_count INT DEFAULT 10
)
RETURNS TABLE (
    id UUID,
    content TEXT,
    rank REAL
) AS $$
BEGIN
    RETURN QUERY
    SELECT
        notes.id,
        notes.content,
        ts_rank(to_tsvector('spanish', notes.content), plainto_tsquery('spanish', search_query)) AS rank
    FROM notes
    WHERE to_tsvector('spanish', notes.content) @@ plainto_tsquery('spanish', search_query)
    AND notes.is_archived = FALSE
    ORDER BY rank DESC
    LIMIT match_count;
END;
$$ LANGUAGE plpgsql;

-- ============================================
-- DATOS DE EJEMPLO
-- ============================================

-- Insertar proyecto de ejemplo (solo si no existe)
INSERT INTO projects (name, description, status, color, icon)
SELECT 
    'Papacito OS',
    'Sistema operativo personal de Jorge Suárez',
    'active',
    '#8b5cf6',
    '🧠'
WHERE NOT EXISTS (SELECT 1 FROM projects WHERE name = 'Papacito OS');

-- Insertar áreas de ejemplo (solo si no existen)
INSERT INTO areas (name, description, status, color, icon)
SELECT * FROM (VALUES
    ('Sparkplug Tech', 'Empresa de servicios creativos', 'active', '#f59e0b', '💥'),
    ('Amber Studio', 'Trabajo como GM México', 'active', '#3b82f6', '🎮'),
    ('Familia', 'Vida personal y familia', 'active', '#ec4899', '❤️'),
    ('Desarrollo Personal', 'Crecimiento y aprendizaje', 'active', '#10b981', '🌱')
) AS v(name, description, status, color, icon)
WHERE NOT EXISTS (SELECT 1 FROM areas WHERE name = v.name);
