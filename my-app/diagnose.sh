#!/bin/bash

# 🦖 Papacito OS - Diagnostic Tool
# Run this to find what's failing

echo "╔══════════════════════════════════════════════════════════════╗"
echo "║     🦖 PAPACITO OS - DIAGNÓSTICO                             ║"
echo "╚══════════════════════════════════════════════════════════════╝"
echo ""

cd "$(dirname "$0")"

# Check 1: Node.js
echo "1️⃣  Node.js:"
if command -v node &> /dev/null; then
    echo "    ✅ $(node --version)"
else
    echo "    ❌ No instalado"
fi

# Check 2: npm
echo ""
echo "2️⃣  npm:"
if command -v npm &> /dev/null; then
    echo "    ✅ $(npm --version)"
else
    echo "    ❌ No instalado"
fi

# Check 3: Dependencies
echo ""
echo "3️⃣  Dependencias:"
if [ -d "node_modules" ]; then
    COUNT=$(ls node_modules | wc -l)
    echo "    ✅ $COUNT paquetes instalados"
else
    echo "    ❌ No instaladas"
fi

# Check 4: Build
echo ""
echo "4️⃣  Build:"
if [ -d ".next" ]; then
    echo "    ✅ Existe (.next)"
    echo "    📅 Última modificación: $(stat -f "%Sm" -t "%Y-%m-%d %H:%M" .next 2>/dev/null || stat -c "%y" .next 2>/dev/null | cut -d' ' -f1,2 | cut -d'.' -f1)"
else
    echo "    ❌ No existe"
fi

# Check 5: Database
echo ""
echo "5️⃣  Base de datos:"
if [ -f "data/brain.db" ]; then
    SIZE=$(ls -lh data/brain.db | awk '{print $5}')
    echo "    ✅ brain.db ($SIZE)"
else
    echo "    ⚠️  No existe (se creará al iniciar)"
fi

# Check 6: whisper.cpp
echo ""
echo "6️⃣  whisper.cpp:"
if [ -f "whisper-cpp" ]; then
    echo "    ✅ Instalado"
else
    echo "    ⚠️  No instalado (voice no funcionará)"
fi

# Check 7: Tesseract
echo ""
echo "7️⃣  Tesseract OCR:"
if command -v tesseract &> /dev/null; then
    echo "    ✅ $(tesseract --version 2>&1 | head -1)"
else
    echo "    ⚠️  No instalado (OCR no funcionará)"
fi

# Check 8: Puerto 3000
echo ""
echo "8️⃣  Puerto 3000:"
if lsof -Pi :3000 -sTCP:LISTEN -t > /dev/null 2>&1; then
    PID=$(lsof -Pi :3000 -sTCP:LISTEN -t)
    echo "    ⚠️  Ocupado (PID: $PID)"
    echo "    💡 Mata el proceso: kill -9 $PID"
else
    echo "    ✅ Disponible"
fi

# Check 9: Test build
echo ""
echo "9️⃣  Test de build:"
if [ -f ".next/server/app/page.js" ]; then
    echo "    ✅ Página principal compilada"
else
    echo "    ❌ Página principal NO compilada"
fi

echo ""
echo "═══════════════════════════════════════════════════════════════"
echo ""

# Try to start and capture error
echo "🧪 Probando inicio (5 segundos)..."
timeout 5s npm start 2>&1 &
PID=$!
sleep 3

if kill -0 $PID 2>/dev/null; then
    echo "✅ Servidor inició correctamente"
    kill $PID 2>/dev/null
else
    echo "❌ Servidor falló al iniciar"
    echo ""
    echo "📋 Últimos errores:"
    cat /tmp/papacito-start.log 2>/dev/null | tail -20 || echo "   (no hay log)"
fi

echo ""
echo "═══════════════════════════════════════════════════════════════"
echo ""
echo "💡 Para arreglar problemas comunes:"
echo "   ./fix-common.sh"
echo ""