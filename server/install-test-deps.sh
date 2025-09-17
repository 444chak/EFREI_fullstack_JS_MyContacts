#!/bin/bash

# Script d'installation des dépendances de test pour MyContacts Backend
# Test dependencies installation script for MyContacts Backend

echo "🔧 Installation des dépendances de test..."
echo "🔧 Installing test dependencies..."

# Vérifier si Node.js est installé
if ! command -v node &> /dev/null; then
    echo "❌ Node.js n'est pas installé. Veuillez installer Node.js 20.x+"
    echo "❌ Node.js is not installed. Please install Node.js 20.x+"
    exit 1
fi

# Vérifier la version de Node.js
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 20 ]; then
    echo "⚠️  Version de Node.js détectée: $(node -v)"
    echo "⚠️  Node.js version detected: $(node -v)"
    echo "⚠️  Version recommandée: 20.x+"
    echo "⚠️  Recommended version: 20.x+"
fi

# Installer les dépendances
echo "📦 Installation des dépendances..."
echo "📦 Installing dependencies..."
npm install

# Vérifier l'installation
if [ $? -eq 0 ]; then
    echo "✅ Dépendances installées avec succès!"
    echo "✅ Dependencies installed successfully!"
    echo ""
    echo "🧪 Pour exécuter les tests:"
    echo "🧪 To run tests:"
    echo "   npm test"
    echo ""
    echo "📊 Pour exécuter les tests avec couverture:"
    echo "📊 To run tests with coverage:"
    echo "   npm run test:coverage"
    echo ""
    echo "👀 Pour exécuter les tests en mode watch:"
    echo "👀 To run tests in watch mode:"
    echo "   npm run test:watch"
else
    echo "❌ Erreur lors de l'installation des dépendances"
    echo "❌ Error installing dependencies"
    exit 1
fi
