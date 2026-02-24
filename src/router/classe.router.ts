import { Router } from "express"
import { authMiddleware } from "../middleware/auth.middleware"
import { authorizeRoles } from "../middleware/role.middleware"
import { UserRole } from "../entity/User"
import { container } from "../bootstrap/container"

const router = Router()
const { classeController } = container

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

/**
 * @swagger
 * /api/classes/{id}:
 *   put:
 *     summary: Mettre à jour une classe
 *     tags: [Classes]
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
 *               libelle: { type: string }
 *               filiere: { type: string }
 *               niveau: { type: string }
 *     responses:
 *       200:
 *         description: Classe mise à jour
 */
router.put(
  "/:id",
  authMiddleware,
  authorizeRoles(UserRole.RP),
  (req, res) => classeController.update(req, res)
)

router.get(
  "/:id/etudiants",
  authMiddleware,
  authorizeRoles(UserRole.RP, UserRole.ATTACHE, UserRole.PROF),
  (req, res) => classeController.findEtudiantsByClasse(req, res)
)

/**
 * @swagger
 * /api/classes/{id}:
 *   delete:
 *     summary: Supprimer une classe
 *     tags: [Classes]
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
 *         description: Classe supprimée
 */
router.delete(
  "/:id",
  authMiddleware,
  authorizeRoles(UserRole.RP),
  (req, res) => classeController.delete(req, res)
)

export default router
