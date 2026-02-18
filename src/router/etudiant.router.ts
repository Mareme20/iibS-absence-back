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

export default router
