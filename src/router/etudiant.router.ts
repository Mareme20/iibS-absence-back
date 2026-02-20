import { Router } from "express"
import { EtudiantController } from "../controller/EtudiantController"
import { authMiddleware } from "../middleware/auth.middleware"
import { authorizeRoles } from "../middleware/role.middleware"
import { UserRole } from "../entity/User"

const router = Router()
// On instancie le contrôleur pour supporter l'injection de dépendances
const etudiantController = new EtudiantController()

/**
 * @swagger
 * tags:
 *   name: Étudiants
 *   description: Gestion des comptes étudiants et des inscriptions
 */

/**
 * @swagger
 * /api/etudiants:
 *   post:
 *     summary: Créer un compte Étudiant (Réservé Attaché)
 *     tags: [Étudiants]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [nom, prenom, email, password, matricule, adresse]
 *             properties:
 *               nom: { type: string, example: "Sarr" }
 *               prenom: { type: string, example: "Awa" }
 *               email: { type: string, example: "awa.sarr@iibs.sn" }
 *               password: { type: string, example: "Etudiant123" }
 *               matricule: { type: string, example: "ETU2024001" }
 *               adresse: { type: string, example: "Dakar Plateau" }
 *     responses:
 *       201:
 *         description: Étudiant créé avec succès
 *       403:
 *         description: Accès refusé - Rôle ATTACHE requis
 */
router.post(
  "/",
  authMiddleware,
  authorizeRoles(UserRole.ATTACHE),
  (req, res) => etudiantController.create(req, res)
)

/**
 * @swagger
 * /api/etudiants/inscription:
 *   post:
 *     summary: Inscrire un étudiant dans une classe (Réservé Attaché)
 *     tags: [Étudiants]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [etudiantId, classeId, annee]
 *             properties:
 *               etudiantId: { type: number, example: 1 }
 *               classeId: { type: number, example: 2 }
 *               annee: { type: string, example: "2023-2024" }
 *     responses:
 *       201:
 *         description: Inscription réussie
 */
router.post(
  "/inscription",
  authMiddleware,
  authorizeRoles(UserRole.ATTACHE),
  (req, res) => etudiantController.inscrire(req, res)
)
/**
 * @swagger
 * /api/etudiants/mes-absences:
 *   get:
 *     summary: Liste des absences de l'étudiant connecté
 *     tags: [Étudiants]
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: query
 *         name: date
 *         schema: { type: string, format: date }
 *         description: Filtrer par date (optionnel)
 */
router.get("/mes-absences", authMiddleware, (req, res) => etudiantController.getMesAbsences(req, res));

/**
 * @swagger
 * /api/etudiants/mes-justifications:
 *   get:
 *     summary: Liste des justifications de l'étudiant connecté
 *     tags: [Étudiants]
 *     security: [{ bearerAuth: [] }]
 */
router.get("/mes-justifications", authMiddleware, (req, res) => etudiantController.getMesJustifications(req, res));

/**
 * @swagger
 * /api/etudiants/justifier:
 *   post:
 *     summary: Soumettre une justification d'absence
 *     tags: [Étudiants]
 *     security: [{ bearerAuth: [] }]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [absenceId, date, motif]
 *             properties:
 *               absenceId: { type: number, example: 1 }
 *               date: { type: string, format: date, example: "2024-02-20" }
 *               motif: { type: string, example: "Maladie" }
 *     responses:
 *       201:
 *         description: Justification soumise avec succès
 */
router.post("/justifier", authMiddleware, (req, res) => etudiantController.justifier(req, res));

/**
 * @swagger
 * /api/etudiants:
 *   get:
 *     summary: Liste de tous les étudiants
 *     tags: [Étudiants]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Liste des étudiants
 */
router.get(
  "/",
  authMiddleware,
  (req, res) => etudiantController.findAll(req, res)
);

/**
 * @swagger
 * /api/etudiants/{id}:
 *   put:
 *     summary: Mettre à jour un étudiant
 *     tags: [Étudiants]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               matricule: { type: string }
 *               adresse: { type: string }
 *     responses:
 *       200:
 *         description: Étudiant mis à jour
 */
router.put(
  "/:id",
  authMiddleware,
  authorizeRoles(UserRole.ATTACHE),
  (req, res) => etudiantController.update(req, res)
);

/**
 * @swagger
 * /api/etudiants/{id}:
 *   delete:
 *     summary: Supprimer un étudiant
 *     tags: [Étudiants]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Étudiant supprimé
 */
router.delete(
  "/:id",
  authMiddleware,
  authorizeRoles(UserRole.ATTACHE),
  (req, res) => etudiantController.delete(req, res)
);

export default router
