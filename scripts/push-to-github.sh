#!/bin/bash

# 🦖 Papacito OS - Push to GitHub (Seguro)
# NO pide credenciales - usa GitHub CLI o SSH keys

set -e

echo "╔══════════════════════════════════════════════════════════════╗"
echo "║     🦖 PUSH TO GITHUB                                        ║"
echo "╚══════════════════════════════════════════════════════════════╝"
echo ""

cd "$(dirname "$0")/.."

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m'

REPO_NAME="papacito-os"
GITHUB_USER="jorgefsb"

# ============================================
# VERIFICAR GITHUB CLI
# ============================================
echo -e "${BLUE}🔍 Verificando GitHub CLI...${NC}"

if ! command -v gh &> /dev/null; then
    echo -e "${YELLOW}⚠️  GitHub CLI no instalado${NC}"
    echo ""
    echo "Instalando automáticamente..."
    
    if command -v brew &> /dev/null; then
        brew install gh --quiet
        echo -e "${GREEN}✅ GitHub CLI instalado${NC}"
    else
        echo -e "${RED}❌ No se puede instalar automáticamente${NC}"
        echo "   Instala manualmente: https://cli.github.com"
        exit 1
    fi
else
    echo -e "${GREEN}✅ GitHub CLI listo${NC}"
fi

# ============================================
# VERIFICAR LOGIN
# ============================================
echo ""
echo -e "${BLUE}🔐 Verificando autenticación...${NC}"

if ! gh auth status &> /dev/null; then
    echo -e "${YELLOW}⚠️  No estás logueado en GitHub${NC}"
    echo ""
    echo "Ejecutando login (se abrirá navegador)..."
    gh auth login --web
fi

echo -e "${GREEN}✅ Autenticado como:$(gh api user -q .login)${NC}"

# ============================================
# CREAR REPO SI NO EXISTE
# ============================================
echo ""
echo -e "${BLUE}📁 Verificando repositorio...${NC}"

if ! gh repo view "$GITHUB_USER/$REPO_NAME" &> /dev/null; then
    echo "   Creando repositorio $REPO_NAME..."
    gh repo create "$REPO_NAME" --public --description "Papacito OS - Your Personal Knowledge System" --source=. --remote=origin --push
    echo -e "${GREEN}✅ Repositorio creado y código subido${NC}"
else
    echo -e "${GREEN}✅ Repositorio ya existe${NC}"
    
    # Configurar remote si no existe
    if ! git remote get-url origin &> /dev/null; then
        git remote add origin "https://github.com/$GITHUB_USER/$REPO_NAME.git"
    fi
    
    # Push
    echo "   Subiendo código..."
    git push -u origin main || git push -u origin master
    echo -e "${GREEN}✅ Código actualizado${NC}"
fi

# ============================================
# CREAR RELEASE
# ============================================
echo ""
echo -e "${BLUE}🏷️  Creando release...${NC}"

VERSION="v4.0.0"

if ! gh release view "$VERSION" &> /dev/null; then
    gh release create "$VERSION" \
        --title "Papacito OS 4.0" \
        --notes "🦖 Initial release of Papacito OS - Your Personal Knowledge System

## Features
- 📝 Text notes with auto-tagging
- 🎙️ Voice to text (local)
- 📸 Image OCR (local)
- 🔍 Semantic search
- 🔗 Auto-connections
- 💬 Telegram integration
- 🔒 100% local & private

## Installation
\`\`\`bash
curl -sSL https://raw.githubusercontent.com/$GITHUB_USER/$REPO_NAME/main/install.sh | bash
\`\`\`" \
        --latest
    
    echo -e "${GREEN}✅ Release $VERSION creado${NC}"
else
    echo -e "${GREEN}✅ Release $VERSION ya existe${NC}"
fi

# ============================================
# RESUMEN
# ============================================
echo ""
echo "═══════════════════════════════════════════════════════════════"
echo ""
echo -e "${GREEN}🎉 ¡TODO LISTO EN GITHUB!${NC}"
echo ""
echo "   📁 Repositorio: https://github.com/$GITHUB_USER/$REPO_NAME"
echo "   🏷️  Release:     https://github.com/$GITHUB_USER/$REPO_NAME/releases/tag/$VERSION"
echo "   🌐 Web:         https://$GITHUB_USER.github.io/$REPO_NAME"
echo ""
echo "═══════════════════════════════════════════════════════════════"
echo ""
echo "💡 Comandos útiles:"
echo "   gh repo view $REPO_NAME --web    # Ver en navegador"
echo "   gh release view $VERSION --web   # Ver release"
echo ""
echo "🦖 ¡LISTO PARA CONQUISTAR EL MUNDO!"
echo ""