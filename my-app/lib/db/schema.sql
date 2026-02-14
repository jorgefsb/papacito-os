-- 🧠 Papacito OS - Second Brain Database Schema

-- Notas principales (braindumps)
CREATE TABLE IF NOT EXISTS notes (
    id TEXT PRIMARY KEY,
    content TEXT NOT NULL,
    content_type TEXT DEFAULT 'text', -- text, audio, image, video
    source TEXT DEFAULT 'web', -- web, telegram, api
    
    -- 🏷️ PARA Classification (Tiago Forte method)
    para_category TEXT DEFAULT 'resources', -- projects, areas, resources, archives
    project_id TEXT, -- FK to projects (for 'projects' category)
    area_id TEXT, -- FK to areas (for 'areas' category)
    
    -- 🤖 Auto-extracted metadata
    title TEXT, -- Auto-generated title
    summary TEXT, -- Auto-generated summary
    key_insights TEXT, -- JSON array of extracted insights
    
    -- 🎬 Media handling
    media_url TEXT, -- For audio/image/video files
    media_transcript TEXT, -- Transcription for audio/video
    media_ocr TEXT, -- OCR text for images
    
    -- 🔍 Embeddings for semantic search
    embedding BLOB, -- Vector embedding para búsqueda semántica
    
    -- 📊 Metadata
    metadata TEXT, -- JSON: {telegram_message_id, file_path, etc.}
    is_archived BOOLEAN DEFAULT 0,
    
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Tags auto-generados por IA
CREATE TABLE IF NOT EXISTS tags (
    id TEXT PRIMARY KEY,
    name TEXT UNIQUE NOT NULL,
    color TEXT DEFAULT '#6366F1',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Relación notas-tags (muchos a muchos)
CREATE TABLE IF NOT EXISTS note_tags (
    note_id TEXT REFERENCES notes(id) ON DELETE CASCADE,
    tag_id TEXT REFERENCES tags(id) ON DELETE CASCADE,
    confidence REAL DEFAULT 1.0, -- Qué tan seguro está IA del tag
    PRIMARY KEY (note_id, tag_id)
);

-- Conexiones entre notas (grafo de conocimiento)
CREATE TABLE IF NOT EXISTS connections (
    id TEXT PRIMARY KEY,
    source_note_id TEXT REFERENCES notes(id) ON DELETE CASCADE,
    target_note_id TEXT REFERENCES notes(id) ON DELETE CASCADE,
    relationship_type TEXT DEFAULT 'related', -- related, similar, parent, child
    strength REAL DEFAULT 0.5, -- 0-1 qué tan fuerte es la conexión
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(source_note_id, target_note_id)
);

-- Índices para búsqueda rápida
CREATE INDEX IF NOT EXISTS idx_notes_created ON notes(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_notes_type ON notes(content_type);
CREATE INDEX IF NOT EXISTS idx_note_tags_note ON note_tags(note_id);
CREATE INDEX IF NOT EXISTS idx_note_tags_tag ON note_tags(tag_id);
CREATE INDEX IF NOT EXISTS idx_connections_source ON connections(source_note_id);
CREATE INDEX IF NOT EXISTS idx_connections_target ON connections(target_note_id);

-- 📁 PARA Method: Projects (con fecha de entrega)
CREATE TABLE IF NOT EXISTS projects (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    deadline DATE, -- Fecha objetivo
    status TEXT DEFAULT 'active', -- active, completed, paused
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 📂 PARA Method: Areas (responsabilidades continuas)
CREATE TABLE IF NOT EXISTS areas (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    status TEXT DEFAULT 'active',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 👥 Workspaces (para compartir con equipos)
CREATE TABLE IF NOT EXISTS workspaces (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL, -- "Personal", "Sparkplug", "Amber"
    description TEXT,
    is_personal BOOLEAN DEFAULT 1,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 🔗 Notas en workspaces
CREATE TABLE IF NOT EXISTS note_workspaces (
    note_id TEXT REFERENCES notes(id) ON DELETE CASCADE,
    workspace_id TEXT REFERENCES workspaces(id) ON DELETE CASCADE,
    shared_by TEXT, -- Quién compartió
    shared_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (note_id, workspace_id)
);

-- 📤 Tabla para tracking de sincronización
CREATE TABLE IF NOT EXISTS sync_queue (
    id TEXT PRIMARY KEY,
    note_id TEXT REFERENCES notes(id),
    action TEXT, -- create, update, delete
    status TEXT DEFAULT 'pending', -- pending, synced, error
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 📊 Índices adicionales para PARA
CREATE INDEX IF NOT EXISTS idx_notes_para ON notes(para_category);
CREATE INDEX IF NOT EXISTS idx_notes_project ON notes(project_id);
CREATE INDEX IF NOT EXISTS idx_notes_archived ON notes(is_archived);
