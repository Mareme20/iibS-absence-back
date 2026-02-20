import { Router } from "express";
import { JustificationController } from "../controller/JustificationController";
import { authMiddleware } from "../middleware/auth.middleware";
import { authorizeRoles } from "../middleware/role.middleware";
import { UserRole } from "../entity/User";

const router = Router();
const justificationController = new JustificationController();

/**
 * @swagger
 * tags:
 *   name: Justifications
 *   description: Gestion des justifications d'absences
 */

/**
 * @swagger
 * /api/justifications:
 *   get:
 *     summary: Liste de toutes les justifications
 *     tags: [Justifications]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Liste des justifications récupérée
 */
router.get(
  "/",
  authMiddleware,
  (req, res) => justificationController.findAll(req, res)
);

/**
 * @swagger
 * /api/justifications/mes-justifications:
 *   get:
 *     summary: Liste des justifications de l'étudiant connecté
 *     tags: [Justifications]
 *     security: [{ bearerAuth: [] }]
 */
router.get(
  "/mes-justifications",
  authMiddleware,
  (req, res) => justificationController.getMesJustifications(req, res)
);

/**
 * @swagger
 * /api/justifications/{id}:
 *   get:
 *     summary: Récupérer une justification par ID
 *     tags: [Justifications]
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
 *         description: Justification récupérée
 */
router.get(
  "/:id",
  authMiddleware,
  (req, res) => justificationController.findById(req, res)
);

/**
 * @swagger
 * /api/justifications/{id}:
 *   put:
 *     summary: Mettre à jour une justification
 *     tags: [Justifications]
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
 *               motif: { type: string }
 *     responses:
 *       200:
 *         description: Justification mise à jour
 */
router.put(
  "/:id",
  authMiddleware,
  (req, res) => justificationController.update(req, res)
);

/**
 * @swagger
 * /api/justifications/{id}:
 *   delete:
 *     summary: Supprimer une justification
 *     tags: [Justifications]
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
 *         description: Justification supprimée
 */
router.delete(
  "/:id",
  authMiddleware,
  (req, res) => justificationController.delete(req, res)
);

/**
 * @swagger
 * /api/justifications/{id}/traiter:
 *   put:
 *     summary: Traiter une justification (accepter ou rejeter)
 *     tags: [Justifications]
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
 *             required: [statut]
 *             properties:
 *               statut:
 *                 type: string
                 enum: [ACCEPTEE, REFUSEE, EN_ATTENTE]
 *     responses:
 *       200:
 *         description: Justification traitée
 */
router.put(
  "/:id/traiter",
  authMiddleware,
  authorizeRoles(UserRole.PROF, UserRole.ATTACHE),
  (req, res) => justificationController.traiter(req, res)
);

export default router;

