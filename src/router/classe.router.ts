import { Router } from "express"
import { ClasseController } from "../controller/ClasseController"
import { authMiddleware } from "../middleware/auth.middleware"
import { authorizeRoles } from "../middleware/role.middleware"
import { UserRole } from "../entity/User"

const router = Router()
// On instancie le contrôleur pour accéder aux méthodes non-statiques
const classeController = new ClasseController()

/**
 * @swagger
 * tags:
 *   name: Classes
 *   description: Gestion des classes et des filières
 */

/**
 * @swagger
 * /api/classes:
 *   post:
 *     summary: Créer une nouvelle classe (Réservé au RP)
 *     tags: [Classes]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [libelle, filiere, niveau]
 *             properties:
 *               libelle: { type: string, example: "L3 Génie Logiciel" }
 *               filiere: { type: string, example: "Informatique" }
 *               niveau: { type: string, example: "L3" }
 *     responses:
 *       201:
 *         description: Classe créée avec succès
 *       403:
 *         description: Accès refusé - Rôle RP requis
 */
router.post(
  "/",
  authMiddleware,
  authorizeRoles(UserRole.RP),
  (req, res) => classeController.create(req, res)
)

/**
 * @swagger
 * /api/classes:
 *   get:
 *     summary: Liste de toutes les classes
 *     tags: [Classes]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Liste des classes récupérée
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id: { type: number }
 *                   libelle: { type: string }
 *                   filiere: { type: string }
 *                   niveau: { type: string }
 */
router.get(
  "/",
  authMiddleware,
  (req, res) => classeController.findAll(req, res)
)

export default router
