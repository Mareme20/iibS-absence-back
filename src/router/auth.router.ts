import { Router } from "express";
import { authMiddleware, AuthRequest } from "../middleware/auth.middleware";
import { UserRole } from "../entity/User";
import { NextFunction, Response } from "express";
import { container } from "../bootstrap/container";

const router = Router();

const { authController, userRepository } = container;

const secureRegisterMiddleware = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const existingRp = await userRepository.findByRole(UserRole.RP);

    if (!existingRp) {
      if (req.body?.role !== UserRole.RP) {
        return res.status(403).json({
          success: false,
          message: "Premier compte obligatoire: rôle RP"
        });
      }
      return next();
    }

    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized"
      });
    }

    authMiddleware(req, res, () => {
      if (req.user?.role !== UserRole.RP) {
        return res.status(403).json({
          success: false,
          message: "Accès refusé - rôle RP requis"
        });
      }
      return next();
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Erreur de sécurité lors de l'inscription"
    });
  }
};

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: API d'authentification
 */
/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Inscrire un utilisateur
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email: { type: string }
 *               password: { type: string }
 *               nom: { type: string }
 *               prenom: { type: string }
 *               role: { type: string, enum: [RP, PROF, ATTACHE, ETUDIANT] }
 
 *     responses:
 *       201:
 *         description: Utilisateur créé
 */
router.post("/register", secureRegisterMiddleware, authController.register);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Se connecter
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email: { type: string }
 *               password: { type: string }
 *     responses:
 *       200:
 *         description: JWT Token retourné
 */
router.post("/login", authController.login);

export default router;
