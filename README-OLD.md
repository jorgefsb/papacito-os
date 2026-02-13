# 🧠 Papacito OS - Second Brain

**El segundo cerebro de Jorge Suárez**  
*Powered by Spark Crew 🦖*

---

## ✨ ¿Qué es?

Un sistema de conocimiento personal **100% LOCAL** y **MULTIMODAL**:

### 📝 **TEXTO** (El clásico)
Escribes directo, rápido, simple. El abuelito que nunca falla.

### 🎙️ **AUDIO** (Brain dump hablando)
Grabas voz → whisper.cpp transcribe → Nota con texto + tags automáticos.

### 📸 **IMÁGENES** (Fotos a texto)
Subes foto → Tesseract OCR extrae texto → Nota buscable + tags.

### ⚡ **EXTRAS**
- 🔍 **Búsqueda básica**: Por palabras clave
- 🏷️ **Tags automáticos**: Por keywords (sparkplug, amber, family...)
- 🔗 **Conexiones simples**: Notas relacionadas automáticamente
- 💬 **Telegram**: Manda audio/foto/texto desde el cel
- 🔒 **100% privado**: Todo en tu Mac Mini
- 💰 **$0 costos**: Sin APIs, sin suscripciones

---

## 🏗️ Arquitectura 100% LOCAL

```
┌─────────────────────────────────────────┐
│           Next.js 14 (Frontend)         │
│     React + Tailwind + Framer Motion    │
└─────────────────────────────────────────┘
                    │
┌─────────────────────────────────────────┐
│         API Routes (Next.js)            │
│      /api/notes (CRUD + Multimedia)     │
└─────────────────────────────────────────┘
                    │
┌─────────────────────────────────────────┐
│         MULTIMEDIA LOCAL                │
│  ┌─────────────┐ ┌─────────────┐       │
│  │whisper.cpp  │ │  Tesseract  │       │
│  │(audio→text) │ │  (OCR)      │       │
│  └─────────────┘ └─────────────┘       │
└─────────────────────────────────────────┘
                    │
┌─────────────────────────────────────────┐
│     Clasificación (Keywords)            │
│   sparkplug, amber, family, urgent...   │
└─────────────────────────────────────────┘
                    │
┌─────────────────────────────────────────┐
│       SQLite (better-sqlite3)           │
│   Local file: ./data/brain.db           │
└─────────────────────────────────────────┘
```

**NO hay:**
- ❌ OpenAI API ($$)
- ❌ Ollama (pesado)
- ❌ Embeddings semánticos
- ❌ Nada en la nube

**SÍ hay:**
- ✅ whisper.cpp local (audio → texto)
- ✅ Tesseract local (imagen → texto)
- ✅ Búsqueda por palabras
- ✅ Tags por keywords
- ✅ Conexiones simples
- ✅ 100% funcional
- ✅ Ultra rápido
- ✅ Cero dependencias externas

---

## 🚀 Instalación (Mac Mini)

### 1. Requisitos
- macOS (Intel o Apple Silicon)
- ~100MB espacio libre (para modelo de voz)

### 2. Setup (5 minutos)
```bash
cd ~/papacito-second-brain/my-app
./setup-local.sh  # Instala todo: Node, whisper.cpp, Tesseract
```

### 3. Iniciar
```bash
./start.sh
```

Abrir: http://localhost:3000

Abrir: http://localhost:3000

---

## 📦 Stack 100% Local

| Capa | Tecnología | ¿Por qué? |
|------|-----------|-----------|
| **Frontend** | Next.js 14 | Framework moderno, rápido |
| **Styling** | Tailwind + shadcn | Bonito sin esfuerzo |
| **Audio → Texto** | whisper.cpp | OpenAI quality, local, gratis |
| **Imagen → Texto** | Tesseract | OCR local, rápido |
| **Database** | SQLite | Simple, local, portable |
| **Búsqueda** | Keywords | Funciona, no necesita IA |
| **Tags** | Regex simple | Rápido, no necesita LLM |

---

## 🎯 Features

### ✅ Funcional Hoy:
- [x] Dark mode premium
- [x] Crear/editar/borrar notas
- [x] **Audio → Texto** (whisper.cpp local)
- [x] **Imagen → Texto** (Tesseract OCR)
- [x] Búsqueda por palabras
- [x] Tags automáticos (keywords)
- [x] Conexiones entre notas
- [x] Stats dashboard
- [x] Telegram bot (básico)

### 🔄 Después (si se necesita):
- [ ] Grafo visual
- [ ] Exportar a Markdown
- [ ] Integración Bitrix24

---

## 💰 Costos Mensuales

| Concepto | Costo |
|----------|-------|
| OpenAI API | **$0** (no usamos) |
| Servidor | **$0** (Mac Mini local) |
| Database | **$0** (SQLite) |
| Hosting | **$0** (local) |
| **TOTAL** | **$0** |

---

## 🔧 Estructura

```
papacito-second-brain/
├── my-app/
│   ├── app/
│   │   ├── api/notes/       # API REST
│   │   ├── page.tsx         # Dashboard
│   │   └── layout.tsx       # Root layout
│   ├── components/ui/       # shadcn
│   ├── lib/
│   │   ├── db/              # SQLite
│   │   ├── ai/index.ts      # Keywords simple
│   │   └── telegram/        # Bot
│   └── data/                # Database
```

---

## 🦖 Filosofía

> **"Dejar de pagar software, usar los nuestros a la medida"**

- No pagar por APIs que no necesitamos
- No instalar software pesado que no usamos
- No complicar lo que puede ser simple
- Funcionar > Perfecto

---

## 🌙 Roadmap

### Fase 1 (Ahora): HIPER NECESARIO ✅
- Notas + búsqueda + tags simples
- Telegram bot básico
- 100% local, $0 costos

### Fase 2 (Si se necesita):
- Grafo visual de conexiones
- Exportar/importar
- Sync con Bitrix24

### Fase 3 (Si se necesita):
- whisper.cpp para audio
- Ollama para embeddings
- Pero solo si VALE LA PENA

---

## 🦖 Creado por

**YOSHI** - CTO Suplente de Sparkplug  
Para **Jorge Suárez** - CEO Sparkplug Tech

*"Nunca paramos de buscar valor"* 🥋💥

---

## 📜 License

Private - Sparkplug Tech

