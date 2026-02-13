#!/bin/bash

# 🦖 Papacito OS - Second Brain Startup Script
# Production-ready startup

set -e  # Exit on error

echo "╔══════════════════════════════════════════════════════════════╗"
echo "║                                                              ║"
echo "║     🦖 PAPACITO OS - SECOND BRAIN                            ║"
echo "║                                                              ║"
echo "╚══════════════════════════════════════════════════════════════╝"
echo ""

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

cd "$(dirname "$0")"

# Step 1: Check Node.js
echo -e "${BLUE}🔍 Step 1/5: Checking Node.js...${NC}"
if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ Node.js not found${NC}"
    echo "   Install from: https://nodejs.org/"
    exit 1
fi
NODE_VERSION=$(node --version | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo -e "${RED}❌ Node.js 18+ required (found $(node --version))${NC}"
    exit 1
fi
echo -e "${GREEN}✅ Node.js $(node --version)${NC}"

# Step 2: Create directories
echo -e "${BLUE}📁 Step 2/5: Creating directories...${NC}"
mkdir -p data uploads models
echo -e "${GREEN}✅ Directories ready${NC}"

# Step 3: Install dependencies
echo -e "${BLUE}📦 Step 3/5: Checking dependencies...${NC}"
if [ ! -d "node_modules" ] || [ ! -f "node_modules/.package-lock.json" ]; then
    echo "   Installing dependencies (this may take a minute)..."
    npm install 2>> /tmp/papacito-install.log || {
        echo -e "${RED}❌ npm install failed${NC}"
        echo "   Check: /tmp/papacito-install.log"
        exit 1
    }
fi
echo -e "${GREEN}✅ Dependencies ready${NC}"

# Step 4: Build if needed
echo -e "${BLUE}🔨 Step 4/5: Checking build...${NC}"
if [ ! -d ".next" ] || [ ".next" -ot "package.json" ]; then
    echo "   Building application..."
    npm run build 2>> /tmp/papacito-build.log || {
        echo -e "${RED}❌ Build failed${NC}"
        echo "   Check: /tmp/papacito-build.log"
        exit 1
    }
    echo -e "${GREEN}✅ Build complete${NC}"
else
    echo -e "${GREEN}✅ Build up to date${NC}"
fi

# Step 5: Check external tools
echo -e "${BLUE}🔧 Step 5/5: Checking tools...${NC}"

# Check whisper.cpp
if [ ! -f "whisper-cpp" ]; then
    echo -e "${YELLOW}⚠️  whisper-cpp not found${NC}"
    echo "   Voice transcription will not work"
    echo "   Run: ./setup-local.sh"
else
    echo -e "${GREEN}✅ whisper.cpp ready${NC}"
fi

# Check tesseract
if ! command -v tesseract &> /dev/null; then
    echo -e "${YELLOW}⚠️  Tesseract not found${NC}"
    echo "   Image OCR will not work"
    echo "   Install: brew install tesseract tesseract-lang"
else
    echo -e "${GREEN}✅ Tesseract ready${NC}"
fi

echo ""
echo "═══════════════════════════════════════════════════════════════"
echo ""
echo -e "${GREEN}🚀 Starting Papacito OS...${NC}"
echo ""
echo "   🌐 Open: http://localhost:3000"
echo "   🛑 Stop: Press Ctrl+C"
echo ""
echo "═══════════════════════════════════════════════════════════════"
echo ""

# Start production server
exec npm start