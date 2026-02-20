# IIBS Absence Backend

API REST pour la gestion des absences étudiantes à l'IIBS.

## 🏗️ Architecture du Projet

```
iibS-absence-back/
├── src/
│   ├── config/          # Configuration (DataSource, Swagger)
│   ├── controller/       # Contrôleurs (logique de présentation)
│   ├── dto/             # Data Transfer Objects (validation)
│   ├── entity/          # Entités TypeORM (modèles de données)
│   ├── middleware/      # Middlewares (auth, rôles)
│   ├── repository/      # Accès aux données (DAO)
│   ├── router/          # Définition des routes API
│   ├── service/         # Logique métier
│   ├── utils/           # Utilitaires
│   ├── app.ts          # Configuration Express principale
│   └── server.ts       # Point d'entrée
├── docker-compose.yml   # Conteneurisation
├── Dockerfile          # Image Docker
├── package.json        # Dépendances
└── tsconfig.json       # Configuration TypeScript
```

## 🛠️ Technologies

- **Runtime**: Node.js avec TypeScript
- **Framework**: Express.js 5.x
- **ORM**: TypeORM 0.3.x
- **Base de données**: PostgreSQL 15
- **Authentification**: JWT (jsonwebtoken)
- **Validation**: Zod
- **Documentation API**: Swagger (OpenAPI 3)
- **Conteneurisation**: Docker & Docker Compose

## 📋 Entités du Domaine

### User (Utilisateur)
| Champ | Type | Description |
|-------|------|-------------|
| id | number | Identifiant unique |
| nom | string | Nom de l'utilisateur |
| prenom | string | Prénom de l'utilisateur |
| email | string | Email unique |
| password | string | Mot de passe hashé |
| role | enum | RP, PROF, ATTACHE, ETUDIANT |

### Classe
| Champ | Type | Description |
|-------|------|-------------|
| id | number | Identifiant unique |
| nom | string | Nom de la classe |
| niveau | string | Niveau (L1, L2, M1, etc.) |

### Cours
| Champ | Type | Description |
|-------|------|-------------|
| id | number | Identifiant unique |
| date | date | Date du cours |
| heureDebut | string | Heure de début |
| heureFin | string | Heure de fin |
| semestre | string | Semestre (S1, S2) |
| module | string | Nom du module |
| professeur | relations |Professeur teaches |
| classes | relations | Classes attending |

### Etudiant
| Champ | Type | Description |
|-------|------|-------------|
| id | number | Identifiant unique |
| nom | string | Nom de l'étudiant |
| prenom | string | Prénom de l'étudiant |
| email | string | Email unique |
| matricule | string | Numéro matricule |

### Absence
| Champ | Type | Description |
|-------|------|-------------|
| id | number | Identifiant unique |
| date | date | Date de l'absence |
| nombreHeures | number | Nombre d'heures |
| estJustifiee | boolean | Statut de justification |
| etudiant | relation | Étudiant absent |
| cours | relation | Cours manqué |
| justification | relation | Justification associée |

### Justification
| Champ | Type | Description |
|-------|------|-------------|
| id | number | Identifiant unique |
| date | date | Date de la justification |
| motif | string | Motif de l'absence |
| statut | enum | EN_ATTENTE, ACCEPTEE, REFUSEE |
| absence | relation | Absence justifiée |

### Inscription
| Champ | Type | Description |
|-------|------|-------------|
| id | number | Identifiant unique |
| etudiant | relation | Étudiant inscrit |
| classe | relation | Classe |

### Professeur
| Champ | Type | Description |
|-------|------|-------------|
| id | number | Identifiant unique |
| nom | string | Nom du professeur |
| prenom | string | Prénom du professeur |
| specialite | string | Spécialité |

## 🔐 Rôles Utilisateurs

| Rôle | Code | Permissions |
|------|------|-------------|
| Responsable Pédagogique | RP | Gestion complète, statistiques |
| Professeur | PROF | Enregistrer absences, gérer cours |
| Attaché de Direction | ATTACHE | Gestion étudiants, statistiques |
| Étudiant | ETUDIANT | Voir ses absences, justifier |

## 📡 Points de terminaison API

### Authentification
| Méthode | Route | Description | Rôle requis |
|---------|-------|-------------|-------------|
| POST | `/api/auth/register` | Inscription utilisateur | Public |
| POST | `/api/auth/login` | Connexion | Public |

### Classes
| Méthode | Route | Description | Rôle requis |
|---------|-------|-------------|-------------|
| GET | `/api/classes` | Liste des classes | AUTH |
| GET | `/api/classes/:id` | Détails classe | AUTH |
| POST | `/api/classes` | Créer classe | RP, ATTACHE |
| PUT | `/api/classes/:id` | Modifier classe | RP, ATTACHE |
| DELETE | `/api/classes/:id` | Supprimer classe | RP |

### Cours
| Méthode | Route | Description | Rôle requis |
|---------|-------|-------------|-------------|
| GET | `/api/cours` | Liste des cours | AUTH |
| GET | `/api/cours/:id` | Détails cours | AUTH |
| POST | `/api/cours` | Planifier cours | PROF |
| PUT | `/api/cours/:id` | Modifier cours | PROF |
| DELETE | `/api/cours/:id` | Supprimer cours | PROF |

### Étudiants
| Méthode | Route | Description | Rôle requis |
|---------|-------|-------------|-------------|
| GET | `/api/etudiants` | Liste étudiants | AUTH |
| GET | `/api/etudiants/:id` | Détails étudiant | AUTH |
| POST | `/api/etudiants` | Créer étudiant | RP, ATTACHE |
| PUT | `/api/etudiants/:id` | Modifier étudiant | RP, ATTACHE |
| DELETE | `/api/etudiants/:id` | Supprimer étudiant | RP |

### Absences
| Méthode | Route | Description | Rôle requis |
|---------|-------|-------------|-------------|
| GET | `/api/absences` | Liste absences | AUTH |
| GET | `/api/absences/:id` | Détails absence | AUTH |
| POST | `/api/absences` | Enregistrer absence | PROF |
| PUT | `/api/absences/:id` | Modifier absence | PROF |
| DELETE | `/api/absences/:id` | Supprimer absence | PROF |

### Justifications
| Méthode | Route | Description | Rôle requis |
|---------|-------|-------------|-------------|
| GET | `/api/justifications` | Liste justifications | AUTH |
| GET | `/api/justifications/:id` | Détails justification | AUTH |
| POST | `/api/justifications` | Soumettre justification | ETUDIANT |
| PUT | `/api/justifications/:id` | Statuer justification | RP, ATTACHE |

### Professeurs
| Méthode | Route | Description | Rôle requis |
|---------|-------|-------------|-------------|
| GET | `/api/professeurs` | Liste professeurs | AUTH |
| GET | `/api/professeurs/:id` | Détails professeur | AUTH |
| POST | `/api/professeurs` | Créer professeur | RP |
| PUT | `/api/professeurs/:id` | Modifier professeur | RP |
| DELETE | `/api/professeurs/:id` | Supprimer professeur | RP |

### Statistiques
| Méthode | Route | Description | Rôle requis |
|---------|-------|-------------|-------------|
| GET | `/api/stats/cours-par-professeur` | Cours par prof | RP, ATTACHE |
| GET | `/api/stats/cours-par-classe` | Cours par classe | RP, ATTACHE |
| GET | `/api/stats/top5-absents` | Top 5 absents | RP, ATTACHE |
| GET | `/api/stats/plus25-heures` | +25h d'absence | RP, ATTACHE |

## 🚀 Installation et Lancement

### Prérequis
- Node.js 18+
- Docker et Docker Compose

### Mode Développement (Local)

```bash
# Installer les dépendances
cd iibS-absence-back
npm install

# Variables d'environnement
cp .env.example .env
# Editer le fichier .env avec vos configurations

# Lancer le serveur de développement
npm run dev
```

### Avec Docker

```bash
# Lancer l'ensemble des services
docker-compose up --build

# Ou en arrière-plan
docker-compose up -d
```

## 📦 Configuration des Variables d'Environnement

| Variable | Défaut | Description |
|----------|--------|-------------|
| PORT | 3000 | Port du serveur |
| DB_HOST | localhost | Hôte PostgreSQL |
| DB_PORT | 5432 | Port PostgreSQL |
| DB_USER | postgres | Utilisateur |
| DB_PASSWORD | postgres | Mot de passe |
| DB_NAME | iibs_absence | Nom de la base |
| JWT_SECRET | secretkey | Clé secrète JWT |

## 📖 Documentation Swagger

La documentation interactive de l'API est disponible à l'adresse :

```
http://localhost:3000/api-docs
```

## 🐳 Architecture Docker

```
┌─────────────────────────────────────────────┐
│              Docker Network                  │
│              iibs_network                    │
│  ┌──────────────┐   ┌──────────────────┐   │
│  │   Backend    │   │    PostgreSQL     │   │
│  │  (Node.js)   │◄─►│   (Port 5432)     │   │
│  │ Port 3000    │   │  iibs_postgres    │   │
│  └──────────────┘   └──────────────────┘   │
└─────────────────────────────────────────────┘
```

## 🔒 Authentification

L'API utilise l'authentification par token JWT.

### Format du Token
```
Authorization: Bearer <token_jwt>
```

### Exemple de requête authentifiée
```bash
curl -X GET http://localhost:3000/api/absences \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

## 📁 Structure des Réponses

### Succès
```json
{
  "success": true,
  "data": { ... }
}
```

### Erreur
```json
{
  "success": false,
  "message": "Description de l'erreur"
}
```

## 🧪 Commandes Utiles

```bash
# Développement avec hot-reload
npm run dev

# Build TypeScript
npm run build

# Lancer en production
npm start

# Linter
npm run lint
```

## 📄 License

ISC

