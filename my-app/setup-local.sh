#!/bin/bash

# 🧠 Papacito OS - Setup con whisper.cpp + Tesseract
# 100% local, 100% privado

set -e

echo "🦖 Configurando Papacito OS - MULTIMEDIA EDITION"
echo "================================================="

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

# Check macOS
if [[ "$OSTYPE" != "darwin"* ]]; then
    echo -e "${RED}❌ Este script es para macOS${NC}"
    exit 1
fi

# Check Homebrew
if ! command -v brew &> /dev/null; then
    echo -e "${YELLOW}⚠️  Instalando Homebrew...${NC}"
    /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
fi

echo ""
echo "📦 1/4 Instalando dependencias base..."
brew install node ffmpeg tesseract tesseract-lang

echo ""
echo "🎙️ 2/4 Instalando whisper.cpp..."

WHISPER_DIR="$(dirname "$0")"
cd "$WHISPER_DIR"

if [ ! -f "whisper-cpp" ]; then
    echo "📥 Descargando whisper.cpp..."
    cd /tmp
    rm -rf whisper.cpp
    git clone --depth 1 https://github.com/ggerganov/whisper.cpp.git
    cd whisper.cpp
    
    echo "🔨 Compilando (toma 2-3 minutos)..."
    cmake -B build
    cmake --build build --config Release -j4
    
    # Copiar al proyecto
    cp build/bin/whisper-cli "$WHISPER_DIR/whisper-cpp"
    chmod +x "$WHISPER_DIR/whisper-cpp"
    
    echo -e "${GREEN}✅ whisper.cpp instalado${NC}"
else
    echo -e "${GREEN}✅ whisper.cpp ya existe${NC}"
fi

echo ""
echo "📥 3/4 Descargando modelo de voz..."

MODEL_DIR="$(dirname "$0")/../models"
mkdir -p "$MODEL_DIR"

if [ ! -f "$MODEL_DIR/ggml-base.bin" ]; then
    echo "Descargando modelo base (~74MB)..."
    curl -L "https://huggingface.co/ggerganov/whisper.cpp/resolve/main/ggml-base.bin" -o "$MODEL_DIR/ggml-base.bin"
    echo -e "${GREEN}✅ Modelo descargado${NC}"
else
    echo -e "${GREEN}✅ Modelo ya existe${NC}"
fi

echo ""
echo "🔍 4/4 Verificando instalación..."

cd "$WHISPER_DIR"

echo ""
echo "Node: $(node --version)"
echo "npm: $(npm --version)"
echo "ffmpeg: $(which ffmpeg)"
echo "tesseract: $(which tesseract)"

if [ -f "whisper-cpp" ]; then
    echo -e "${GREEN}✅ whisper-cpp: $(./whisper-cpp --version 2>&1 | head -1)${NC}"
else
    echo -e "${RED}❌ whisper-cpp no encontrado${NC}"
fi

if [ -f "$MODEL_DIR/ggml-base.bin" ]; then
    echo -e "${GREEN}✅ Modelo whisper: $MODEL_DIR/ggml-base.bin${NC}"
else
    echo -e "${RED}❌ Modelo no encontrado${NC}"
fi

echo ""
echo "================================================="
echo -e "${GREEN}🎉 Setup completo!${NC}"
echo ""
echo "Para iniciar:"
echo "  ./start.sh"
echo ""
echo "📝 Capacidades:"
echo "   ✅ Notas de texto"
echo "   ✅ Audio → Texto (whisper.cpp)"
echo "   ✅ Imágenes → Texto (Tesseract OCR)"
echo "   ✅ Tags automáticos"
echo "   ✅ 100% local, 100% privado"
echo ""