-- 🧠 Papacito OS - Second Brain Database Schema

-- Notas principales (braindumps)
CREATE TABLE IF NOT EXISTS notes (
    id TEXT PRIMARY KEY,
    content TEXT NOT NULL,
    content_type TEXT DEFAULT 'text', -- text, audio, image, video
    source TEXT DEFAULT 'web', -- web, telegram, api
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    embedding BLOB, -- Vector embedding para búsqueda semántica
    metadata TEXT -- JSON: {telegram_message_id, file_path, etc.}
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

-- Tabla para tracking de sincronización (fase 2)
CREATE TABLE IF NOT EXISTS sync_queue (
    id TEXT PRIMARY KEY,
    note_id TEXT REFERENCES notes(id),
    action TEXT, -- create, update, delete
    status TEXT DEFAULT 'pending', -- pending, synced, error
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
