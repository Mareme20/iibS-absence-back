import { Router } from "express"
import { AbsenceController } from "../controller/AbsenceController"
import { authMiddleware } from "../middleware/auth.middleware"
import { authorizeRoles } from "../middleware/role.middleware"
import { UserRole } from "../entity/User"

const router = Router()
const absenceController = new AbsenceController()

/**
 * @swagger
 * tags:
 *   name: Absences
 *   description: Gestion des absences des étudiants
 */

/**
 * @swagger
 * /api/absences:
 *   post:
 *     summary: Enregistrer une nouvelle absence
 *     tags: [Absences]
 *     security:
 *       - bearerAuth: []
 *     description: Seuls les utilisateurs avec le rôle PROF peuvent enregistrer une absence.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - etudiantId
 *               - coursId
 *               - date
 *               - nombreHeures
 *             properties:
 *               etudiantId:
 *                 type: number
 *                 example: 1
 *               coursId:
 *                 type: number
 *                 example: 5
 *               date:
 *                 type: string
 *                 format: date
 *                 example: "2024-02-18"
 *               nombreHeures:
 *                 type: number
 *                 example: 2
 *     responses:
 *       201:
 *         description: Absence créée avec succès
 *       401:
 *         description: Non authentifié (Token manquant ou invalide)
 *       403:
 *         description: Accès refusé (Rôle insuffisant)
 *       404:
 *         description: Étudiant ou Cours non trouvé
 */
router.post(
  "/",
  authMiddleware,
  authorizeRoles(UserRole.PROF),
  (req, res) => absenceController.create(req, res)
)

/**
 * @swagger
 * /api/absences:
 *   get:
 *     summary: Liste de toutes les absences
 *     tags: [Absences]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Liste des absences récupérée
 */
router.get(
  "/",
  authMiddleware,
  (req, res) => absenceController.findAll(req, res)
)

/**
 * @swagger
 * /api/absences/{id}:
 *   get:
 *     summary: Récupérer une absence par ID
 *     tags: [Absences]
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
 *         description: Absence récupérée
 */
router.get(
  "/:id",
  authMiddleware,
  (req, res) => absenceController.findById(req, res)
)

/**
 * @swagger
 * /api/absences/{id}:
 *   put:
 *     summary: Mettre à jour une absence
 *     tags: [Absences]
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
 *               date: { type: string, format: date }
 *               nombreHeures: { type: number }
 *               justifiee: { type: boolean }
 *     responses:
 *       200:
 *         description: Absence mise à jour
 */
router.put(
  "/:id",
  authMiddleware,
  authorizeRoles(UserRole.PROF),
  (req, res) => absenceController.update(req, res)
)

/**
 * @swagger
 * /api/absences/{id}:
 *   delete:
 *     summary: Supprimer une absence
 *     tags: [Absences]
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
 *         description: Absence supprimée
 */
router.delete(
  "/:id",
  authMiddleware,
  authorizeRoles(UserRole.PROF),
  (req, res) => absenceController.delete(req, res)
)

export default router
