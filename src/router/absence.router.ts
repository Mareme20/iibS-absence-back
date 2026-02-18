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

export default router
