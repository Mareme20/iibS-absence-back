import { Router } from "express"
import { StatsController } from "../controller/StatsController"
import { authMiddleware } from "../middleware/auth.middleware"
import { authorizeRoles } from "../middleware/role.middleware"
import { UserRole } from "../entity/User"

const router = Router()
// Instance du contrôleur pour éviter l'erreur membre statique
const statsController = new StatsController()

/**
 * @swagger
 * tags:
 *   name: Stats
 *   description: API de statistiques réservée à l'administration
 */

/**
 * @swagger
 * /api/stats/cours-par-professeur:
 *   get:
 *     summary: Nombre de cours par professeur
 *     tags: [Stats]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Statistiques récupérées
 */
router.get(
  "/cours-par-professeur",
  authMiddleware,
  authorizeRoles(UserRole.RP, UserRole.ATTACHE),
  (req, res) => statsController.coursParProfesseur(req, res)
)

/**
 * @swagger
 * /api/stats/cours-par-classe:
 *   get:
 *     summary: Nombre de cours par classe
 *     tags: [Stats]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Statistiques récupérées
 */
router.get(
  "/cours-par-classe",
  authMiddleware,
  authorizeRoles(UserRole.RP, UserRole.ATTACHE),
  (req, res) => statsController.coursParClasse(req, res)
)

/**
 * @swagger
 * /api/stats/top5-absents:
 *   get:
 *     summary: Liste des 5 étudiants les plus absents
 *     tags: [Stats]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Statistiques récupérées
 */
router.get(
  "/top5-absents",
  authMiddleware,
  authorizeRoles(UserRole.RP, UserRole.ATTACHE),
  (req, res) => statsController.top5Absents(req, res)
)

/**
 * @swagger
 * /api/stats/plus25-heures:
 *   get:
 *     summary: Étudiants ayant cumulé plus de 25 heures d'absence
 *     tags: [Stats]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Statistiques récupérées
 */
router.get(
  "/plus25-heures",
  authMiddleware,
  authorizeRoles(UserRole.RP, UserRole.ATTACHE),
  (req, res) => statsController.etudiantsPlus25Heures(req, res)
)

export default router
