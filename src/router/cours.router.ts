import { Router } from "express"
import { CoursController } from "../controller/CoursController"
import { authMiddleware } from "../middleware/auth.middleware"
import { authorizeRoles } from "../middleware/role.middleware"
import { UserRole } from "../entity/User"

const router = Router()
// 1. Création de l'instance pour accéder aux méthodes non-statiques
const coursController = new CoursController()

/**
 * @swagger
 * tags:
 *   name: Cours
 *   description: Gestion des modules et planification des cours
 */

/**
 * @swagger
 * /api/cours:
 *   post:
 *     summary: Créer un nouveau cours (Réservé au RP)
 *     tags: [Cours]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [module, date, heureDebut, heureFin, professeurId, classeIds]
 *             properties:
 *               module: { type: string, example: "Programmation Mobile" }
 *               date: { type: string, format: date, example: "2024-03-10" }
 *               heureDebut: { type: string, example: "08:00" }
 *               heureFin: { type: string, example: "12:00" }
 *               semestre: { type: string, example: "Semestre 2" }
 *               professeurId: { type: number, example: 1 }
 *               classeIds: { type: array, items: { type: number }, example: [1, 2] }
 *     responses:
 *       201:
 *         description: Cours créé avec succès
 *       403:
 *         description: Accès refusé - Rôle RP requis
 */
router.post(
  "/",
  authMiddleware,
  authorizeRoles(UserRole.RP),
  (req, res) => coursController.create(req, res)
)

/**
 * @swagger
 * /api/cours:
 *   get:
 *     summary: Liste de tous les cours
 *     tags: [Cours]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Liste des cours récupérée
 */
router.get(
  "/",
  authMiddleware,
  (req, res) => coursController.findAll(req, res)
)

export default router
