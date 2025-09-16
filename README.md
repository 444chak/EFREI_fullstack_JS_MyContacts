# MyContacts 📱

[![React](https://img.shields.io/badge/React-19.1.1-blue.svg)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-20.x-green.svg)](https://nodejs.org/)
[![MUI](https://img.shields.io/badge/MUI-7.3.2-blue.svg)](https://mui.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-8.11.0-green.svg)](https://www.mongodb.com/)
[![Docker](https://img.shields.io/badge/Docker-Compose-blue.svg)](https://docs.docker.com/compose/)

## Table des matières / Table of Contents

- [Introduction](#introduction)
- [Technologies utilisées / Technologies Used](#technologies-utilisées--technologies-used)
- [Architecture](#architecture)
- [Installation et Configuration / Installation and Setup](#installation-et-configuration--installation-and-setup)
  - [Méthode 1 : Développement séparé / Method 1: Separate Development](#méthode-1--développement-séparé--method-1-separate-development)
  - [Méthode 2 : Docker Compose / Method 2: Docker Compose](#méthode-2--docker-compose--method-2-docker-compose)
- [URLs de Production / Production URLs](#urls-de-production--production-urls)
- [API Documentation](#api-documentation)
- [Bruno - Client API / Bruno - API Client](#bruno---client-api--bruno---api-client)
- [Structure du Projet / Project Structure](#structure-du-projet--project-structure)
- [Contribution / Contributing](#contribution--contributing)

---

## Introduction

**MyContacts** est une application web moderne de gestion de contacts personnels développée avec React et Node.js. L'application permet aux utilisateurs de créer, lire, modifier et supprimer leurs contacts de manière sécurisée avec un système d'authentification JWT.

**MyContacts** is a modern web application for personal contact management developed with React and Node.js. The application allows users to create, read, update, and delete their contacts securely with JWT authentication.

### Fonctionnalités principales / Key Features

- 🔐 **Authentification sécurisée** / **Secure Authentication** (JWT)
- 📝 **Gestion complète des contacts** / **Complete Contact Management** (CRUD)
- 🎨 **Interface utilisateur moderne** / **Modern UI** (Material-UI)
- 📱 **Design responsive** / **Responsive Design**
- 🐳 **Déploiement Docker** / **Docker Deployment**
- 📚 **Documentation API complète** / **Complete API Documentation**

---

## Technologies utilisées / Technologies Used

### Frontend

- **React 19.1.1** - Bibliothèque JavaScript pour l'interface utilisateur
- **Material-UI (MUI) 7.3.2** - Composants UI modernes et personnalisables
- **React Router DOM 7.8.2** - Routage côté client
- **Axios 1.11.0** - Client HTTP pour les appels API
- **Emotion** - CSS-in-JS pour le styling

### Backend

- **Node.js 20.x** - Runtime JavaScript
- **Express 5.1.0** - Framework web minimaliste
- **MongoDB 8.11.0** - Base de données NoSQL
- **Mongoose 8.11.0** - ODM pour MongoDB
- **JWT (jsonwebtoken)** - Authentification par tokens
- **bcrypt** - Hachage des mots de passe
- **CORS** - Gestion des requêtes cross-origin

### Outils de développement / Development Tools

- **Docker & Docker Compose** - Containerisation
- **Swagger/OpenAPI** - Documentation API
- **Bruno** - Client API (alternative à Postman)
- **ESLint** - Linting du code
- **Nodemon** - Redémarrage automatique du serveur

---

## Architecture

L'application suit le pattern **MVC (Modèle-Vue-Contrôleur)** :

### Modèle (Model)

- **User Model** : Gestion des utilisateurs et authentification
- **Contact Model** : Gestion des données de contacts
- **MongoDB** : Stockage des données

### Vue (View)

- **React Components** : Interface utilisateur interactive
- **Material-UI** : Composants de design system
- **Pages** : Login, Register, Contacts, Create Contact

### Contrôleur (Controller)

- **Auth Controller** : Gestion de l'authentification
- **Contact Controller** : Logique métier des contacts
- **Middleware** : Validation, authentification, gestion d'erreurs

---

## Installation et Configuration / Installation and Setup

### Prérequis / Prerequisites

- **Node.js** 20.x ou supérieur
- **npm** ou **yarn**
- **MongoDB** (local ou cloud)
- **Docker** (optionnel, pour la méthode 2)

### Méthode 1 : Développement séparé / Method 1: Separate Development

#### 1. Configuration des variables d'environnement / Environment Variables Setup

Créez les fichiers `.env` dans les dossiers `client/` et `server/` :

**Server/.env :**

```env
API_PORT=5555
DB_USER=your_mongodb_username
DB_PASSWORD=your_mongodb_password
DB_NAME=mycontacts
JWT_SECRET_KEY=your_super_secret_jwt_key_here
```

**Client/.env :**

```env
REACT_APP_API_BASE_URL=http://localhost:5555
```

#### 2. Installation des dépendances / Dependencies Installation

```bash
# Installation du serveur / Server installation
cd server
npm install

# Installation du client / Client installation
cd ../client
npm install
```

#### 3. Démarrage des applications / Applications Startup

```bash
# Terminal 1 - Serveur / Terminal 1 - Server
cd server
npm start

# Terminal 2 - Client / Terminal 2 - Client
cd client
npm start
```

L'application sera accessible sur :

- **Client** : <http://localhost:3000>
- **Serveur** : <http://localhost:5555>
- **API Documentation** : <http://localhost:5555/api-docs>

### Méthode 2 : Docker Compose / Method 2: Docker Compose

#### 1. Configuration Docker / Docker Configuration

Créez un fichier `.env` à la racine du projet :

```env
# Server Configuration
API_PORT=5555
DB_USER=your_mongodb_username
DB_PASSWORD=your_mongodb_password
DB_NAME=mycontacts
JWT_SECRET_KEY=your_super_secret_jwt_key_here

# Client Configuration
CLIENT_PORT=3000
REACT_APP_API_BASE_URL=http://localhost:5555
```

#### 2. Démarrage avec Docker Compose / Startup with Docker Compose

```bash
# Démarrer les services / Start services
docker-compose -f docker-compose.dev.yml up -d

# Vérifier les logs / Check logs
docker-compose -f docker-compose.dev.yml logs -f

# Arrêter les services / Stop services
docker-compose -f docker-compose.dev.yml down
```

---

## URLs de Production / Production URLs

### Démo en ligne / Live Demo

- **Client (Frontend)** : [https://efrei-mycontacts-chak.vercel.app/](https://efrei-mycontacts-chak.vercel.app/)
- **Serveur (Backend)** : [https://mycontacts-chak-prod.up.railway.app/](https://mycontacts-chak-prod.up.railway.app/)

### Documentation API / API Documentation

- **Swagger UI** : [https://mycontacts-chak-prod.up.railway.app/api-docs](https://mycontacts-chak-prod.up.railway.app/api-docs)

---

## API Documentation

### Endpoints disponibles / Available Endpoints

#### Authentification / Authentication

- `POST /auth/register` - Inscription d'un nouvel utilisateur
- `POST /auth/login` - Connexion utilisateur

#### Gestion des contacts / Contact Management

- `GET /contacts` - Récupérer tous les contacts
- `POST /contacts` - Créer un nouveau contact
- `PATCH /contacts/:id` - Modifier un contact
- `DELETE /contacts/:id` - Supprimer un contact

### Authentification requise / Required Authentication

Tous les endpoints de contacts nécessitent un token JWT dans l'en-tête Authorization :

```http
Authorization: Bearer <your-jwt-token>
```

### Exemples de requêtes / Request Examples

#### Inscription / Registration

```http
POST /auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

#### Connexion / Login

```http
POST /auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

#### Créer un contact / Create Contact

```http
POST /contacts
Authorization: Bearer <your-jwt-token>
Content-Type: application/json

{
  "firstName": "John",
  "lastName": "Doe",
  "phone": "+1234567890"
}
```

---

## Bruno - Client API / Bruno - API Client

### Qu'est-ce que Bruno ? / What is Bruno?

**Bruno** est un client API open-source, rapide et compatible avec Git, conçu comme une alternative moderne à Postman et Insomnia. Bruno stocke vos collections directement dans un dossier sur votre système de fichiers, utilisant un langage de balisage en texte brut appelé **Bru** pour enregistrer les informations sur les requêtes API.

**Bruno** is an open-source, fast, and Git-compatible API client designed as a modern alternative to Postman and Insomnia. Bruno stores your collections directly in a folder on your filesystem, using a plain text markup language called **Bru** to record API request information.

### Avantages de Bruno / Bruno Advantages

- 🚀 **Rapide et léger** / **Fast and lightweight**
- 🔒 **Fonctionne hors ligne** / **Works offline**
- 📁 **Collections versionnées avec Git** / **Git-versioned collections**
- 🎨 **Interface moderne** / **Modern interface**
- 🔧 **Extensible** / **Extensible**

### Installation de Bruno / Bruno Installation

#### Windows

```bash
# Via Chocolatey
choco install bruno

# Via Scoop
scoop install bruno
```

#### macOS

```bash
# Via Homebrew
brew install bruno

# Via MacPorts
sudo port install bruno
```

#### Linux

```bash
# Via Snap
sudo snap install bruno

# Via Flatpak
flatpak install flathub com.usebruno.app

# Via Apt (Ubuntu/Debian)
sudo apt install bruno
```

### Utilisation avec MyContacts / Using with MyContacts

1. **Ouvrir Bruno** / **Open Bruno**
2. **Créer une nouvelle collection** / **Create new collection**
3. **Importer le dossier BRUNO_Collection** / **Import BRUNO_Collection folder**
4. **Configurer les variables** / **Configure variables** :
   - `baseUrl` : `http://localhost:5555` (dev) ou `https://mycontacts-chak-prod.up.railway.app/` (prod)
   - `token` : Votre JWT token après connexion

### Collections disponibles / Available Collections

Le projet inclut des collections Bruno prêtes à l'emploi dans le dossier `BRUNO_Collection/` :

- **Authentication** : Tests d'inscription et de connexion
- **Contacts CRUD** : Tests complets de gestion des contacts
- **Environment Variables** : Configuration des environnements

---

## Structure du Projet / Project Structure

```text
MyContacts/
├── client/                     # Frontend React
│   ├── public/                # Fichiers publics
│   ├── src/
│   │   ├── components/        # Composants React
│   │   ├── hooks/            # Hooks personnalisés
│   │   ├── pages/            # Pages de l'application
│   │   ├── services/         # Services API
│   │   └── utils/            # Utilitaires
│   ├── package.json
│   └── README.md
├── server/                    # Backend Node.js
│   ├── config/               # Configuration
│   ├── controllers/          # Contrôleurs
│   ├── docs/                 # Documentation API
│   ├── middlewares/          # Middlewares
│   ├── models/               # Modèles de données
│   ├── routes/               # Routes API
│   ├── package.json
│   └── index.js
├── BRUNO_Collection/         # Collections Bruno
├── docker-compose.dev.yml    # Configuration Docker
└── README.md
```

---

## Contribution / Contributing

### Comment contribuer / How to Contribute

1. **Fork le projet** / **Fork the project**
2. **Créer une branche feature** / **Create a feature branch** (`git checkout -b feature/AmazingFeature`)
3. **Commit vos changements** / **Commit your changes** (`git commit -m 'Add some AmazingFeature'`)
4. **Push vers la branche** / **Push to the branch** (`git push origin feature/AmazingFeature`)
5. **Ouvrir une Pull Request** / **Open a Pull Request**

### Standards de code / Code Standards

- Utiliser ESLint pour le linting
- Suivre les conventions de nommage React/Node.js
- Documenter les nouvelles fonctionnalités
- Tester les modifications avant de soumettre

---

## Licence / License

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

This project is licensed under the MIT License. See the `LICENSE` file for more details.

---

## Support / Support

Pour toute question ou problème, n'hésitez pas à ouvrir une issue sur GitHub.

For any questions or issues, please feel free to open an issue on GitHub.

---

**Développé avec ❤️ par [444chak](https://github.com/444chak/)**

**Developed with ❤️ by [444chak](https://github.com/444chak/)**
