import { Router } from "express";
import { AuthController } from "../controller/AuthController";
import { AuthService } from "../service/AuthService";
import { UserRepository } from "../repository/UserRepository";

const router = Router();

// On crée les instances (Injection de dépendances)
const userRepository = new UserRepository();
const authService = new AuthService(userRepository);
const authController = new AuthController(authService);

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
 *     responses:
 *       201:
 *         description: Utilisateur créé
 */
router.post("/register", authController.register);

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
