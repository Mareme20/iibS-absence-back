import { Request, Response } from "express";
import { AuthService } from "../service/AuthService";
import { loginSchema, registerSchema } from "../dto/auth.dto";

export class AuthController {
  // On définit le constructeur pour accepter le service (Règle l'erreur 0 vs 1 argument)
  constructor(private authService: AuthService) {}

  // Utilisation de fonctions fléchées pour préserver le contexte 'this'
  register = async (req: Request, res: Response) => {
    try {
      const payload = registerSchema.parse(req.body);
      const user = await this.authService.register(payload);
      return res.status(201).json(user);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  };

  login = async (req: Request, res: Response) => {
    try {
      const payload = loginSchema.parse(req.body);
      const result = await this.authService.login(payload);
      return res.json(result);
    } catch (error: any) {
      return res.status(401).json({ message: error.message });
    }
  };
}
