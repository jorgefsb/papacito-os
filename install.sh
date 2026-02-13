#!/bin/bash

# 🦖 Papacito OS - One-Line Installer
# Installs everything: Node, whisper.cpp, Tesseract, and the app

set -e

echo "╔══════════════════════════════════════════════════════════════╗"
echo "║                                                              ║"
echo "║     🦖 PAPACITO OS - INSTALLER v4.0                          ║"
echo "║                                                              ║"
echo "╚══════════════════════════════════════════════════════════════╝"
echo ""

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

# Check macOS
if [[ "$OSTYPE" != "darwin"* ]]; then
    echo -e "${RED}❌ This installer is for macOS only${NC}"
    echo "For Linux/Windows, please follow the manual installation guide."
    exit 1
fi

echo -e "${BLUE}📋 Installation Plan:${NC}"
echo "   1. Check/install Homebrew"
echo "   2. Install Node.js, ffmpeg, Tesseract"
echo "   3. Compile whisper.cpp (takes 2-3 minutes)"
echo "   4. Download voice model (~74MB)"
echo "   5. Install npm dependencies"
echo "   6. Build the application"
echo ""
read -p "Continue? (y/n) " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "Installation cancelled."
    exit 0
fi

echo ""
echo -e "${BLUE}🔍 Step 1/6: Checking Homebrew...${NC}"

if ! command -v brew &> /dev/null; then
    echo -e "${YELLOW}⚠️  Homebrew not found. Installing...${NC}"
    /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
else
    echo -e "${GREEN}✅ Homebrew found${NC}"
fi

echo ""
echo -e "${BLUE}📦 Step 2/6: Installing dependencies...${NC}"
brew install node ffmpeg tesseract tesseract-lang 2>/dev/null || true
echo -e "${GREEN}✅ Dependencies installed${NC}"

echo ""
echo -e "${BLUE}🎙️  Step 3/6: Compiling whisper.cpp...${NC}"
echo -e "${YELLOW}⏳ This takes 2-3 minutes...${NC}"

cd "$(dirname "$0")/my-app"

if [ ! -f "whisper-cpp" ]; then
    cd /tmp
    rm -rf whisper.cpp
    git clone --depth 1 https://github.com/ggerganov/whisper.cpp.git 2>/dev/null
    cd whisper.cpp
    
    cmake -B build 2>/dev/null
    cmake --build build --config Release -j4 2>/dev/null
    
    cp build/bin/whisper-cli "$(dirname "$0")/my-app/whisper-cpp"
    chmod +x "$(dirname "$0")/my-app/whisper-cpp"
    
    echo -e "${GREEN}✅ whisper.cpp compiled${NC}"
else
    echo -e "${GREEN}✅ whisper.cpp already exists${NC}"
fi

cd "$(dirname "$0")/my-app"

echo ""
echo -e "${BLUE}📥 Step 4/6: Downloading voice model...${NC}"

mkdir -p ../models

if [ ! -f "../models/ggml-base.bin" ]; then
    echo "Downloading model (~74MB)..."
    curl -L "https://huggingface.co/ggerganov/whisper.cpp/resolve/main/ggml-base.bin" -o "../models/ggml-base.bin" --progress-bar
    echo -e "${GREEN}✅ Model downloaded${NC}"
else
    echo -e "${GREEN}✅ Model already exists${NC}"
fi

echo ""
echo -e "${BLUE}📦 Step 5/6: Installing npm dependencies...${NC}"

npm install 2>/dev/null
echo -e "${GREEN}✅ npm dependencies installed${NC}"

echo ""
echo -e "${BLUE}🔨 Step 6/6: Building application...${NC}"

npm run build 2>/dev/null
echo -e "${GREEN}✅ Application built${NC}"

echo ""
echo "╔══════════════════════════════════════════════════════════════╗"
echo "║                                                              ║"
echo "║     🎉 INSTALLATION COMPLETE!                                ║"
echo "║                                                              ║"
echo "╚══════════════════════════════════════════════════════════════╝"
echo ""
echo -e "${GREEN}✅ Papacito OS is ready to use!${NC}"
echo ""
echo "To start:"
echo "   ./start.sh"
echo ""
echo "Or:"
echo "   npm start"
echo ""
echo "Then open: http://localhost:3000"
echo ""
echo "═══════════════════════════════════════════════════════════════"
echo ""
echo "📝 Quick Start:"
echo "   1. Run: ./start.sh"
echo "   2. Open browser: http://localhost:3000"
echo "   3. Create your first note!"
echo ""
echo "📖 Documentation: README.md"
echo "🐛 Issues: https://github.com/jorgefsb/papacito-os/issues"
echo ""
echo "═══════════════════════════════════════════════════════════════"