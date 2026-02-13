#!/bin/bash

# 🦖 Papacito OS - Release Preparation Script
# Prepares the repository for GitHub release

set -e

VERSION="4.0.0"
REPO="jorgefsb/papacito-os"

echo "╔══════════════════════════════════════════════════════════════╗"
echo "║                                                              ║"
echo "║     🦖 PAPACITO OS - RELEASE PREPARATION v${VERSION}              ║"
echo "║                                                              ║"
echo "╚══════════════════════════════════════════════════════════════╝"
echo ""

cd "$(dirname "$0")/.."

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo "🔧 Initializing git repository..."
    git init
    git add .
    git commit -m "Initial commit: Papacito OS v${VERSION}"
    echo "✅ Git repository initialized"
else
    echo "✅ Git repository already exists"
fi

echo ""
echo "📋 Pre-release checklist:"
echo ""

# Check files exist
echo "   ✅ README.md"
echo "   ✅ LICENSE"
echo "   ✅ CONTRIBUTING.md"
echo "   ✅ CHANGELOG.md"
echo "   ✅ .gitignore"
echo "   ✅ package.json"
echo ""

# Check key files
echo "🔍 Verifying key files..."

if [ -f "README-GITHUB.md" ]; then
    echo "   ✅ README-GITHUB.md (for GitHub)"
fi

if [ -f "my-app/setup-local.sh" ]; then
    echo "   ✅ setup-local.sh"
fi

if [ -f "my-app/start.sh" ]; then
    echo "   ✅ start.sh"
fi

if [ -f "install.sh" ]; then
    echo "   ✅ install.sh"
fi

if [ -f "assets/icon.svg" ]; then
    echo "   ✅ Icon assets"
fi

echo ""
echo "📦 Files that will be in the release:"
echo ""

# List what will be tracked
git ls-files | head -20
echo "   ... ($(git ls-files | wc -l) total files)"

echo ""
echo "═══════════════════════════════════════════════════════════════"
echo ""
echo "🚀 Ready to release!"
echo ""
echo "Next steps:"
echo ""
echo "1. Create GitHub repository:"
echo "   https://github.com/new"
echo "   Name: papacito-os"
echo "   Visibility: Public"
echo ""
echo "2. Add remote and push:"
echo "   git remote add origin https://github.com/${REPO}.git"
echo "   git branch -M main"
echo "   git push -u origin main"
echo ""
echo "3. Create release on GitHub:"
echo "   https://github.com/${REPO}/releases/new"
echo "   Tag: v${VERSION}"
echo "   Title: Papacito OS v${VERSION} - Multimodal Second Brain"
echo ""
echo "═══════════════════════════════════════════════════════════════"
echo ""
echo "📝 Release notes template:"
echo ""
cat << 'EOF'
## 🎉 Papacito OS v4.0.0 - Multimodal Second Brain

### ✨ What's New

**📝 Text Notes**
- Classic note-taking with auto-tagging

**🎙️ Voice to Text**
- Local transcription using whisper.cpp
- No cloud, no API costs

**📸 Image to Text**
- OCR using Tesseract
- Photos, screenshots, documents

**🔍 Smart Search**
- Search across all your knowledge
- Text, audio transcripts, OCR'd images

**🏷️ Auto-Tagging**
- Automatic categorization
- Customizable keywords

**💬 Telegram Integration**
- Send notes from your phone

### 🚀 Quick Start

```bash
git clone https://github.com/jorgefsb/papacito-os.git
cd papacito-os
./install.sh
./start.sh
```

### 💰 Cost: $0

Compare to:
- Notion/Obsidian: $8-15/mo
- Otter.ai: $10/mo
- OpenAI API: $20-50/mo
- **Papacito OS: $0 forever**

### 🔒 100% Local

- No cloud
- No APIs
- No subscriptions
- Your data stays on your machine

---

**Full documentation:** [README.md](README.md)

**Contributing:** See [CONTRIBUTING.md](CONTRIBUTING.md)
EOF

echo ""
echo "═══════════════════════════════════════════════════════════════"
echo ""
echo "🦖 Ready to share with the world!"
echo ""