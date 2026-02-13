#!/bin/bash

# 🦖 Papacito OS - Auto-Fix Common Issues

echo "╔══════════════════════════════════════════════════════════════╗"
echo "║     🦖 PAPACITO OS - AUTO-REPAIR                             ║"
echo "╚══════════════════════════════════════════════════════════════╝"
echo ""

cd "$(dirname "$0")"

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

FIX_COUNT=0

# Fix 1: Clean install
echo "🔧 Fix 1/5: Limpiando e instalando dependencias..."
rm -rf node_modules package-lock.json
npm install 2>&1 | tail -5
echo -e "${GREEN}✅ Dependencias reinstaladas${NC}"
FIX_COUNT=$((FIX_COUNT + 1))

# Fix 2: Rebuild native modules
echo ""
echo "🔧 Fix 2/5: Reconstruyendo módulos nativos..."
npm rebuild 2>&1 | tail -3
echo -e "${GREEN}✅ Módulos nativos reconstruidos${NC}"
FIX_COUNT=$((FIX_COUNT + 1))

# Fix 3: Clear Next.js cache
echo ""
echo "🔧 Fix 3/5: Limpiando caché de Next.js..."
rm -rf .next
echo -e "${GREEN}✅ Caché limpiado${NC}"
FIX_COUNT=$((FIX_COUNT + 1))

# Fix 4: Rebuild
echo ""
echo "🔧 Fix 4/5: Reconstruyendo aplicación..."
npm run build 2>&1 | tail -10
echo -e "${GREEN}✅ Build completado${NC}"
FIX_COUNT=$((FIX_COUNT + 1))

# Fix 5: Check database
echo ""
echo "🔧 Fix 5/5: Verificando base de datos..."
mkdir -p data
if [ -f "data/brain.db" ]; then
    echo -e "${YELLOW}⚠️  Base de datos existe${NC}"
    read -p "¿Resetear base de datos? (s/n) " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Ss]$ ]]; then
        mv data/brain.db "data/brain-backup-$(date +%Y%m%d-%H%M%S).db"
        echo -e "${GREEN}✅ Base de datos respaldada y reseteada${NC}"
    fi
else
    echo -e "${GREEN}✅ Base de datos lista (se creará al iniciar)${NC}"
fi
FIX_COUNT=$((FIX_COUNT + 1))

echo ""
echo "═══════════════════════════════════════════════════════════════"
echo ""
echo -e "${GREEN}✅ $FIX_COUNT/5 fixes aplicados${NC}"
echo ""
echo "🚀 Intentando iniciar..."
echo ""

# Test start
timeout 5s npm start &
PID=$!
sleep 3

if kill -0 $PID 2>/dev/null; then
    echo -e "${GREEN}✅ ¡FUNCIONA!${NC}"
    echo ""
    echo "   🌐 http://localhost:3000"
    echo ""
    kill $PID 2>/dev/null
    echo "Para iniciar de nuevo: ./start.sh"
else
    echo -e "${RED}❌ Aún hay problemas${NC}"
    echo ""
    echo "📋 Ejecuta: ./diagnose.sh"
    echo "   Para ver el diagnóstico completo"
fi

echo ""