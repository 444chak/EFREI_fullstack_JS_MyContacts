# Script d'installation des dépendances de test pour MyContacts Backend
# Test dependencies installation script for MyContacts Backend

Write-Host "🔧 Installation des dépendances de test..." -ForegroundColor Cyan
Write-Host "🔧 Installing test dependencies..." -ForegroundColor Cyan

# Vérifier si Node.js est installé
try {
    $nodeVersion = node -v
    Write-Host "✅ Node.js détecté: $nodeVersion" -ForegroundColor Green
    Write-Host "✅ Node.js detected: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Node.js n'est pas installé. Veuillez installer Node.js 20.x+" -ForegroundColor Red
    Write-Host "❌ Node.js is not installed. Please install Node.js 20.x+" -ForegroundColor Red
    exit 1
}

# Vérifier si Docker est installé (optionnel mais recommandé)
try {
    $dockerVersion = docker --version
    Write-Host "✅ Docker détecté: $dockerVersion" -ForegroundColor Green
    Write-Host "✅ Docker detected: $dockerVersion" -ForegroundColor Green
    
    # Vérifier si Docker est en cours d'exécution
    try {
        docker ps | Out-Null
        Write-Host "✅ Docker est en cours d'exécution" -ForegroundColor Green
        Write-Host "✅ Docker is running" -ForegroundColor Green
    } catch {
        Write-Host "⚠️  Docker est installé mais pas démarré" -ForegroundColor Yellow
        Write-Host "⚠️  Docker is installed but not running" -ForegroundColor Yellow
        Write-Host "💡 Pour lancer MongoDB avec Docker:" -ForegroundColor Cyan
        Write-Host "💡 To start MongoDB with Docker:" -ForegroundColor Cyan
        Write-Host "   docker run -d --name mongodb-test -p 27017:27017 mongo:latest" -ForegroundColor White
    }
} catch {
    Write-Host "⚠️  Docker n'est pas installé (optionnel mais recommandé)" -ForegroundColor Yellow
    Write-Host "⚠️  Docker is not installed (optional but recommended)" -ForegroundColor Yellow
    Write-Host "💡 Pour installer Docker: https://www.docker.com/products/docker-desktop/" -ForegroundColor Cyan
    Write-Host "💡 To install Docker: https://www.docker.com/products/docker-desktop/" -ForegroundColor Cyan
}

# Vérifier la version de Node.js
$versionNumber = [int]($nodeVersion -replace 'v(\d+)\..*', '$1')
if ($versionNumber -lt 20) {
    Write-Host "⚠️  Version de Node.js détectée: $nodeVersion" -ForegroundColor Yellow
    Write-Host "⚠️  Node.js version detected: $nodeVersion" -ForegroundColor Yellow
    Write-Host "⚠️  Version recommandée: 20.x+" -ForegroundColor Yellow
    Write-Host "⚠️  Recommended version: 20.x+" -ForegroundColor Yellow
}

# Installer les dépendances
Write-Host "📦 Installation des dépendances..." -ForegroundColor Cyan
Write-Host "📦 Installing dependencies..." -ForegroundColor Cyan

npm install

# Vérifier l'installation
if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Dépendances installées avec succès!" -ForegroundColor Green
    Write-Host "✅ Dependencies installed successfully!" -ForegroundColor Green
    Write-Host ""
    Write-Host "🧪 Pour exécuter les tests:" -ForegroundColor Cyan
    Write-Host "🧪 To run tests:" -ForegroundColor Cyan
    Write-Host "   npm test" -ForegroundColor White
    Write-Host ""
    Write-Host "📊 Pour exécuter les tests avec couverture:" -ForegroundColor Cyan
    Write-Host "📊 To run tests with coverage:" -ForegroundColor Cyan
    Write-Host "   npm run test:coverage" -ForegroundColor White
    Write-Host ""
    Write-Host "👀 Pour exécuter les tests en mode watch:" -ForegroundColor Cyan
    Write-Host "👀 To run tests in watch mode:" -ForegroundColor Cyan
    Write-Host "   npm run test:watch" -ForegroundColor White
    Write-Host ""
    Write-Host "🐳 Pour lancer MongoDB avec Docker:" -ForegroundColor Cyan
    Write-Host "🐳 To start MongoDB with Docker:" -ForegroundColor Cyan
    Write-Host "   docker run -d --name mongodb-test -p 27017:27017 mongo:latest" -ForegroundColor White
    Write-Host ""
    Write-Host "📚 Guide complet: server/tests/QUICKSTART-DOCKER.md" -ForegroundColor Cyan
    Write-Host "📚 Complete guide: server/tests/QUICKSTART-DOCKER.md" -ForegroundColor Cyan
} else {
    Write-Host "❌ Erreur lors de l'installation des dépendances" -ForegroundColor Red
    Write-Host "❌ Error installing dependencies" -ForegroundColor Red
    exit 1
}
