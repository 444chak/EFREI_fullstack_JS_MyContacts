# Tests Unitaires - MyContacts Backend

## Installation des dépendances de test

Avant de pouvoir exécuter les tests, vous devez installer les dépendances de développement :

```bash
cd server
npm install
```

## Configuration

Les tests utilisent une base de données MongoDB de test séparée. Assurez-vous que MongoDB est en cours d'exécution sur votre machine.

### Installation de MongoDB pour les tests

#### Option 1 : Docker (Recommandée) 🐳

```bash
# Lancer MongoDB avec Docker
docker run -d --name mongodb-test -p 27017:27017 mongo:latest

# Vérifier que MongoDB fonctionne
docker ps

# Arrêter MongoDB quand vous avez fini
docker stop mongodb-test
```

#### Option 2 : Installation locale

**Windows :**

```powershell
# Via Chocolatey
choco install mongodb

# Via Scoop
scoop install mongodb
```

**Linux/macOS :**

```bash
# Via Homebrew (macOS)
brew install mongodb/brew/mongodb-community

# Via Apt (Ubuntu/Debian)
sudo apt install mongodb
```

#### Option 3 : MongoDB Atlas (Cloud) ☁️

1. Créez un compte sur [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Créez un cluster gratuit
3. Modifiez `setup.js` avec votre URI Atlas :

```javascript
// Remplacer cette ligne dans setup.js :
process.env.MONGODB_URI = 'mongodb://localhost:27017/mycontacts_test';

// Par votre URI Atlas :
process.env.MONGODB_URI = 'mongodb+srv://username:password@cluster.mongodb.net/mycontacts_test';
```

### Variables d'environnement

Les variables d'environnement de test sont configurées automatiquement dans `tests/setup.js` :

- `NODE_ENV=test`
- `JWT_SECRET_KEY=test-secret-key-for-testing-only`
- `MONGODB_URI=mongodb://localhost:27017/mycontacts_test`

## Exécution des tests

### Tous les tests

```bash
npm test
```

### Mode watch (redémarre automatiquement)

```bash
npm run test:watch
```

### Avec couverture de code

```bash
npm run test:coverage
```

### Tests spécifiques

```bash
# Tests d'authentification uniquement
npm test -- --testNamePattern="auth"

# Tests de contacts uniquement
npm test -- --testNamePattern="contacts"
```

## Structure des tests

- `setup.js` - Configuration globale des tests
- `auth.test.js` - Tests des endpoints d'authentification
- `contacts.test.js` - Tests des endpoints de gestion des contacts

## Couverture de code

Les tests couvrent :

- ✅ Tous les endpoints d'authentification (register, login)
- ✅ Tous les endpoints de contacts (CRUD)
- ✅ Validation des données d'entrée
- ✅ Gestion des erreurs
- ✅ Authentification JWT
- ✅ Autorisation des utilisateurs

## Prérequis

- Node.js 20.x+
- MongoDB en cours d'exécution
- Dépendances installées (`npm install`)
