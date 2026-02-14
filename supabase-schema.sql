-- 🧠 PAPACITO OS - SUPABASE SCHEMA
-- Segundo Cerebro de Jorge Suárez
-- Organización: Papacito OS (Pro Plan)

-- ============================================
-- EXTENSIONES
-- ============================================
extension vector;
extension pg_trgm;
extension pgcrypto;

-- ============================================
-- TABLAS PRINCIPALES
-- ============================================

-- 📝 Notas (el corazón del sistema)
create table notes (
    id uuid default gen_random_uuid() primary key,
    content text not null,
    content_type text default 'text' check (content_type in ('text', 'voice', 'image', 'link')),
    source text default 'web',
    source_url text,
    created_at timestamptz default now(),
    updated_at timestamptz default now(),
    user_id uuid references auth.users(id) on delete cascade,
    tags text[] default '{}',
    metadata jsonb default '{}',
    embedding vector(1536), -- Para búsqueda semántica
    para_category text check (para_category in ('projects', 'areas', 'resources', 'archives')),
    para_id uuid, -- Referencia al proyecto/área/recurso específico
    is_archived boolean default false,
    is_favorite boolean default false,
    view_count integer default 0
);

-- 📁 Proyectos (PARA - Projects)
create table projects (
    id uuid default gen_random_uuid() primary key,
    name text not null,
    description text,
    status text default 'active' check (status in ('active', 'paused', 'completed', 'archived')),
    goal_date date,
    created_at timestamptz default now(),
    updated_at timestamptz default now(),
    user_id uuid references auth.users(id) on delete cascade,
    color text default '#3b82f6',
    icon text default '📁',
    metadata jsonb default '{}'
);

-- 🎯 Áreas (PARA - Areas)
create table areas (
    id uuid default gen_random_uuid() primary key,
    name text not null,
    description text,
    status text default 'active' check (status in ('active', 'maintenance', 'archived')),
    created_at timestamptz default now(),
    updated_at timestamptz default now(),
    user_id uuid references auth.users(id) on delete cascade,
    color text default '#10b981',
    icon text default '🎯',
    metadata jsonb default '{}'
);

-- 📚 Recursos (PARA - Resources)
create table resources (
    id uuid default gen_random_uuid() primary key,
    name text not null,
    description text,
    resource_type text default 'link' check (resource_type in ('link', 'book', 'article', 'video', 'tool', 'contact')),
    url text,
    created_at timestamptz default now(),
    updated_at timestamptz default now(),
    user_id uuid references auth.users(id) on delete cascade,
    tags text[] default '{}',
    metadata jsonb default '{}'
);

-- 🔗 Conexiones entre notas (grafos de conocimiento)
create table note_connections (
    id uuid default gen_random_uuid() primary key,
    source_note_id uuid references notes(id) on delete cascade,
    target_note_id uuid references notes(id) on delete cascade,
    connection_type text default 'related' check (connection_type in ('related', 'references', 'contradicts', 'supports', 'parent', 'child')),
    strength float default 0.5 check (strength >= 0 and strength <= 1),
    created_at timestamptz default now(),
    user_id uuid references auth.users(id) on delete cascade,
    unique(source_note_id, target_note_id)
);

-- 🏷️ Tags globales
create table tags (
    id uuid default gen_random_uuid() primary key,
    name text not null unique,
    color text default '#6b7280',
    description text,
    usage_count integer default 0,
    created_at timestamptz default now(),
    user_id uuid references auth.users(id) on delete cascade
);

-- 💬 Mensajes de Telegram (para sync)
create table telegram_messages (
    id uuid default gen_random_uuid() primary key,
    telegram_message_id bigint unique,
    chat_id bigint,
    content text not null,
    message_type text default 'text' check (message_type in ('text', 'voice', 'photo', 'document')),
    processed boolean default false,
    created_at timestamptz default now(),
    user_id uuid references auth.users(id) on delete cascade,
    note_id uuid references notes(id) on delete set null,
    metadata jsonb default '{}'
);

-- 📊 Analytics y métricas
create table analytics (
    id uuid default gen_random_uuid() primary key,
    event_type text not null,
    event_data jsonb default '{}',
    created_at timestamptz default now(),
    user_id uuid references auth.users(id) on delete cascade
);

-- ============================================
-- ÍNDICES PARA PERFORMANCE
-- ============================================
create index idx_notes_user_id on notes(user_id);
create index idx_notes_created_at on notes(created_at desc);
create index idx_notes_tags on notes using gin(tags);
create index idx_notes_embedding on notes using ivfflat (embedding vector_cosine_ops);
create index idx_notes_para_category on notes(para_category);
create index idx_notes_is_archived on notes(is_archived) where is_archived = false;
create index idx_notes_content_search on notes using gin(to_tsvector('spanish', content));

create index idx_projects_user_id on projects(user_id);
create index idx_areas_user_id on areas(user_id);
create index idx_resources_user_id on resources(user_id);
create index idx_connections_source on note_connections(source_note_id);
create index idx_connections_target on note_connections(target_note_id);
create index idx_telegram_processed on telegram_messages(processed) where processed = false;

-- ============================================
-- FUNCIONES ÚTILES
-- ============================================

-- Actualizar updated_at automáticamente
create or replace function update_updated_at_column()
returns trigger as $$
begin
    new.updated_at = now();
    return new;
end;
$$ language plpgsql;

create trigger update_notes_updated_at before update on notes
    for each row execute function update_updated_at_column();
create trigger update_projects_updated_at before update on projects
    for each row execute function update_updated_at_column();
create trigger update_areas_updated_at before update on areas
    for each row execute function update_updated_at_column();
create trigger update_resources_updated_at before update on resources
    for each row execute function update_updated_at_column();

-- Búsqueda semántica
create or replace function search_similar_notes(
    query_embedding vector(1536),
    match_threshold float,
    match_count int
)
returns table (
    id uuid,
    content text,
    similarity float
) as $$
begin
    return query
    select
        notes.id,
        notes.content,
        1 - (notes.embedding <=> query_embedding) as similarity
    from notes
    where 1 - (notes.embedding <=> query_embedding) > match_threshold
    and notes.is_archived = false
    order by notes.embedding <=> query_embedding
    limit match_count;
end;
$$ language plpgsql;

-- Búsqueda por texto
create or replace function search_notes_by_text(
    search_query text,
    match_count int default 10
)
returns table (
    id uuid,
    content text,
    rank real
) as $$
begin
    return query
    select
        notes.id,
        notes.content,
        ts_rank(to_tsvector('spanish', notes.content), plainto_tsquery('spanish', search_query)) as rank
    from notes
    where to_tsvector('spanish', notes.content) @@ plainto_tsquery('spanish', search_query)
    and notes.is_archived = false
    order by rank desc
    limit match_count;
end;
$$ language plpgsql;

-- ============================================
-- POLÍTICAS DE SEGURIDAD (RLS)
-- ============================================

-- Habilitar RLS en todas las tablas
alter table notes enable row level security;
alter table projects enable row level security;
alter table areas enable row level security;
alter table resources enable row level security;
alter table note_connections enable row level security;
alter table tags enable row level security;
alter table telegram_messages enable row level security;
alter table analytics enable row level security;

-- Políticas para notes
create policy "Users can only access their own notes"
    on notes for all
    using (auth.uid() = user_id);

-- Políticas para projects
create policy "Users can only access their own projects"
    on projects for all
    using (auth.uid() = user_id);

-- Políticas para areas
create policy "Users can only access their own areas"
    on areas for all
    using (auth.uid() = user_id);

-- Políticas para resources
create policy "Users can only access their own resources"
    on resources for all
    using (auth.uid() = user_id);

-- Políticas para connections
create policy "Users can only access their own connections"
    on note_connections for all
    using (auth.uid() = user_id);

-- Políticas para telegram_messages
create policy "Users can only access their own telegram messages"
    on telegram_messages for all
    using (auth.uid() = user_id);

-- ============================================
-- DATOS DE EJEMPLO (opcional)
-- ============================================

-- Insertar proyecto de ejemplo
insert into projects (name, description, status, color, icon)
values (
    'Papacito OS',
    'Sistema operativo personal de Jorge Suárez',
    'active',
    '#8b5cf6',
    '🧠'
);

-- Insertar áreas de ejemplo
insert into areas (name, description, status, color, icon)
values 
    ('Sparkplug Tech', 'Empresa de servicios creativos', 'active', '#f59e0b', '💥'),
    ('Amber Studio', 'Trabajo como GM México', 'active', '#3b82f6', '🎮'),
    ('Familia', 'Vida personal y familia', 'active', '#ec4899', '❤️'),
    ('Desarrollo Personal', 'Crecimiento y aprendizaje', 'active', '#10b981', '🌱');
