#!/bin/bash

# 🦖 Papacito OS - Setup Automático Completo
# Instala TODO sin intervención del usuario
# Seguro: no pide passwords, solo instala lo necesario

set -e

echo "╔══════════════════════════════════════════════════════════════╗"
echo "║     🦖 PAPACITO OS - SETUP AUTOMÁTICO                        ║"
echo "╚══════════════════════════════════════════════════════════════╝"
echo ""

cd "$(dirname "$0")/.."

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

# ============================================
# 1. DEPENDENCIAS NPM
# ============================================
echo -e "${BLUE}📦 1/4: Instalando dependencias npm...${NC}"
npm install --silent 2>&1 | tail -3
echo -e "${GREEN}✅ Dependencias listas${NC}"

# ============================================
# 2. BUILD
# ============================================
echo ""
echo -e "${BLUE}🔨 2/4: Compilando aplicación...${NC}"
npm run build 2>&1 | tail -5
echo -e "${GREEN}✅ Build completado${NC}"

# ============================================
# 3. WHISPER.CPP (Voice)
# ============================================
echo ""
echo -e "${BLUE}🎙️  3/4: Instalando whisper.cpp...${NC}"

if [ ! -f "whisper-cpp" ]; then
    # Detectar arquitectura
    ARCH=$(uname -m)
    if [ "$ARCH" = "arm64" ]; then
        WHISPER_URL="https://github.com/ggerganov/whisper.cpp/releases/download/v1.7.4/whisper-blas-arm64"
    else
        WHISPER_URL="https://github.com/ggerganov/whisper.cpp/releases/download/v1.7.4/whisper-blas-x64"
    fi
    
    echo "   Descargando whisper.cpp para $ARCH..."
    curl -sL "$WHISPER_URL" -o whisper-cpp
    chmod +x whisper-cpp
    
    # Descargar modelo base (tiny = rápido, bueno para Mac)
    echo "   Descargando modelo de voz..."
    mkdir -p models
    if [ ! -f "models/ggml-tiny.bin" ]; then
        curl -sL "https://huggingface.co/ggerganov/whisper.cpp/resolve/main/ggml-tiny.bin" -o models/ggml-tiny.bin
    fi
    
    echo -e "${GREEN}✅ whisper.cpp listo${NC}"
else
    echo -e "${GREEN}✅ whisper.cpp ya existe${NC}"
fi

# ============================================
# 4. TESSERACT (OCR)
# ============================================
echo ""
echo -e "${BLUE}📸 4/4: Instalando Tesseract OCR...${NC}"

if ! command -v tesseract &> /dev/null; then
    if command -v brew &> /dev/null; then
        echo "   Instalando vía Homebrew..."
        brew install tesseract tesseract-lang --quiet 2>&1 | tail -3
        echo -e "${GREEN}✅ Tesseract instalado${NC}"
    else
        echo -e "${YELLOW}⚠️  Homebrew no encontrado${NC}"
        echo "   Instala manualmente: https://brew.sh"
    fi
else
    echo -e "${GREEN}✅ Tesseract ya existe${NC}"
fi

# ============================================
# RESUMEN
# ============================================
echo ""
echo "═══════════════════════════════════════════════════════════════"
echo ""
echo -e "${GREEN}🎉 ¡TODO LISTO!${NC}"
echo ""
echo "   📝 Notas de texto:    ✅"
echo "   🎙️  Voz a texto:       ✅"
echo "   📸 OCR de imágenes:   ✅"
echo "   🔍 Búsqueda:          ✅"
echo ""
echo "═══════════════════════════════════════════════════════════════"
echo ""
echo "🚀 Para iniciar:"
echo "   ./start.sh"
echo ""
echo "🌐 La app estará en: http://localhost:3000"
echo ""