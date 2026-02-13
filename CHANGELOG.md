# Changelog

All notable changes to Papacito OS will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

## [4.0.0] - 2025-02-13

### Added
- 🎙️ **Voice to Text**: Local transcription using whisper.cpp
- 📸 **Image to Text**: OCR using Tesseract
- 📝 **Text Notes**: Classic note-taking with auto-tagging
- 🏷️ **Auto-Tagging**: Keywords-based automatic tagging
- 🔍 **Search**: Cross-modal search (text, audio, images)
- 🔗 **Auto-Connections**: Related notes linked automatically
- 💬 **Telegram Integration**: Send notes from phone
- 🎨 **Dark Mode**: Premium dark UI
- 📊 **Dashboard**: Stats and recent notes
- 🔒 **100% Local**: No cloud, no APIs, no subscriptions

### Technical
- Next.js 14 with App Router
- TypeScript with strict types
- Tailwind CSS + shadcn/ui
- SQLite database (better-sqlite3)
- whisper.cpp for audio transcription
- Tesseract OCR for image text extraction
- Framer Motion for animations

## [3.0.0] - 2025-02-12

### Added
- Basic note CRUD
- Keyword-based search
- Simple auto-tagging
- SQLite database
- Dark mode UI

## [2.0.0] - 2025-02-11

### Added
- Project structure
- Next.js setup
- Tailwind configuration

## [1.0.0] - 2025-02-10

### Added
- Initial concept
- Architecture design
- Local-first approach defined

---

## Roadmap

### [5.0.0] - Planned
- [ ] Visual graph of note connections
- [ ] Export to Markdown/PDF
- [ ] Mobile app (React Native)
- [ ] Plugin system
- [ ] More themes

### [6.0.0] - Future
- [ ] Collaborative features
- [ ] Cloud sync (optional)
- [ ] AI-powered insights (local)
- [ ] API for integrations
- [ ] Desktop app (Electron/Tauri)