#!/bin/bash

# 🦖 Papacito OS - Uninstaller

set -e

echo "╔══════════════════════════════════════════════════════════════╗"
echo "║                                                              ║"
echo "║     🦖 PAPACITO OS - UNINSTALLER                             ║"
echo "║                                                              ║"
echo "╚══════════════════════════════════════════════════════════════╝"
echo ""

echo "⚠️  This will remove:"
echo "   - Application files"
echo "   - Database (your notes)"
echo "   - Models"
echo ""
echo "Your data will be backed up to: ./backup/"
echo ""
read -p "Are you sure? (y/n) " -n 1 -r
echo

if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "Uninstall cancelled."
    exit 0
fi

# Backup data
echo ""
echo "📦 Creating backup..."
mkdir -p backup
if [ -f "my-app/data/brain.db" ]; then
    cp my-app/data/brain.db backup/brain-$(date +%Y%m%d-%H%M%S).db
    echo "✅ Database backed up"
fi

# Remove files
echo ""
echo "🗑️  Removing files..."
rm -rf my-app/node_modules
rm -rf my-app/.next
rm -rf my-app/data/*.db
rm -f my-app/whisper-cpp
rm -rf models/*.bin

echo ""
echo "✅ Uninstall complete"
echo ""
echo "Your data backup is in: ./backup/"
echo ""
echo "To completely remove everything, delete this folder:"
echo "   rm -rf $(pwd)"
echo ""