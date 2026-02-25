# IIBS Absence Backend

API REST Node.js/TypeScript pour la gestion des cours, absences et justifications.

## Stack
- Express 5
- TypeORM 0.3 + PostgreSQL
- Zod (validation DTO)
- JWT (auth)
- Swagger (`/api-docs`)

## Architecture
```text
src/
├── bootstrap/container.ts   # composition root (DI)
├── router/                  # routes + middlewares
├── controller/              # orchestration HTTP
├── service/                 # logique métier
├── repository/              # accès DB
├── dto/                     # validation des entrées
├── entity/                  # modèles TypeORM
├── middleware/              # auth / rôles
└── utils/
```

## Scripts
```bash
npm run dev
npm run build
npm start
npm run test:e2e:critical
```

## Variables d'environnement
Exemple minimal:
```env
PORT=3000
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=postgres
DB_NAME=iibs_absence
JWT_SECRET=change_me
```

### Période d'inscription (optionnel)
Si définie, l'inscription étudiant est autorisée uniquement dans la fenêtre:
```env
INSCRIPTION_START_DATE=2026-09-01
INSCRIPTION_END_DATE=2026-11-30
```

## Authentification / sécurité
- Token JWT obligatoire sur routes protégées.
- `POST /api/auth/register`:
  - sans token: autorisé uniquement pour créer le **premier compte RP**,
  - après existence d'un RP: création réservée à un **RP connecté**.

## Routes principales (résumé)

### Auth
- `POST /api/auth/login`
- `POST /api/auth/register`

### Classes
- `GET /api/classes` (auth)
- `POST /api/classes` (RP)
- `PUT /api/classes/:id` (RP)
- `DELETE /api/classes/:id` (RP)
- `GET /api/classes/:id/etudiants?annee=YYYY-YYYY` (RP, ATTACHE, PROF)

### Cours
- `GET /api/cours?heureDebut=HH:mm&heureFin=HH:mm` (auth)
- `GET /api/cours/mes-cours` (PROF)
- `POST /api/cours` (RP)
- `PUT /api/cours/:id` (RP)
- `DELETE /api/cours/:id` (RP)

### Étudiants
- `GET /api/etudiants` (auth)
- `POST /api/etudiants` (ATTACHE)
- `PUT /api/etudiants/:id` (ATTACHE)
- `DELETE /api/etudiants/:id` (ATTACHE)
- `POST /api/etudiants/inscription` (ATTACHE)
- `GET /api/etudiants/mes-absences` (ETUDIANT)
- `GET /api/etudiants/mes-cours` (ETUDIANT)
- `GET /api/etudiants/mes-justifications` (ETUDIANT)
- `POST /api/etudiants/justifier` (ETUDIANT)

### Absences
- `POST /api/absences` (PROF)
- `GET /api/absences` (auth)
- `GET /api/absences/cours/:coursId` (ATTACHE, RP)
- `GET /api/absences/etudiant/:etudiantId` (ATTACHE, RP)
- `PUT /api/absences/:id` (PROF)
- `DELETE /api/absences/:id` (PROF)

### Justifications
- `GET /api/justifications` (ATTACHE)
- `GET /api/justifications/:id` (ATTACHE)
- `PUT /api/justifications/:id` (ATTACHE)
- `DELETE /api/justifications/:id` (ATTACHE)
- `PUT /api/justifications/:id/traiter` (ATTACHE)
- `GET /api/justifications/mes-justifications` (ETUDIANT)

### Professeurs
- `GET /api/professeurs` (auth)
- `POST /api/professeurs` (RP)

### Stats
- `GET /api/stats/cours-par-professeur` (RP, ATTACHE)
- `GET /api/stats/cours-par-classe` (RP, ATTACHE)
- `GET /api/stats/top5-absents` (RP, ATTACHE)
- `GET /api/stats/plus25-heures` (RP, ATTACHE)

## Tests e2e critiques
Le script vérifie un flux API minimal.

```bash
# sans credentials: smoke test login invalide
npm run test:e2e:critical

# avec credentials: login + endpoint protégé
BASE_URL=http://localhost:3000/api \
E2E_EMAIL=rp@local.test \
E2E_PASSWORD=Admin123! \
npm run test:e2e:critical
```

## Documentation API
- Swagger: `http://localhost:3000/api-docs`
