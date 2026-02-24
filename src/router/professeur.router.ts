import { Router } from "express"
import { authMiddleware } from "../middleware/auth.middleware"
import { authorizeRoles } from "../middleware/role.middleware"
import { UserRole } from "../entity/User"
import { container } from "../bootstrap/container"

const router = Router()
const { professeurController } = container

/**
 * @swagger
 * tags:
 *   name: Professeurs
 *   description: Gestion des comptes professeurs (Réservé au RP)
 */

/**
 * @swagger
 * /api/professeurs:
 *   post:
 *     summary: Créer un nouveau professeur
 *     tags: [Professeurs]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [nom, prenom, email, password, specialite, grade]
 *             properties:
 *               nom: { type: string, example: "Ndiaye" }
 *               prenom: { type: string, example: "Abdou" }
 *               email: { type: string, example: "abdou.ndiaye@iibs.sn" }
 *               password: { type: string, example: "Prof1234" }
 *               specialite: { type: string, example: "Java / Spring Boot" }
 *               grade: { type: string, example: "Docteur" }
 *     responses:
 *       201:
 *         description: Professeur créé avec succès
 *       403:
 *         description: Accès refusé - Rôle RP requis
 */
router.post(
  "/",
  authMiddleware,
  authorizeRoles(UserRole.RP),
  (req, res) => professeurController.create(req, res)
)

/**
 * @swagger
 * /api/professeurs:
 *   get:
 *     summary: Liste de tous les professeurs
 *     tags: [Professeurs]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Liste des professeurs
 */
router.get(
  "/",
  authMiddleware,
  (req, res) => professeurController.findAll(req, res)
)

export default router
