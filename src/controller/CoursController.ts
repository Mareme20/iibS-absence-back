import { Request, Response } from "express"
import { CoursService } from "../service/CoursService"
import { createCoursSchema } from "../dto/cours.dto"
import { successResponse, errorResponse } from "../utils/response"
import { AuthRequest } from "../middleware/auth.middleware"

export class CoursController {
  constructor(private readonly service: CoursService) {}

  // Suppression de 'static' pour que les méthodes appartiennent à l'instance
  async create(req: Request, res: Response) {
    try {
      const data = createCoursSchema.parse(req.body)
      const result = await this.service.create(data)
      return successResponse(res, result, "Cours created", 201)
    } catch (error: any) {
      return errorResponse(res, error.message)
    }
  }

  getMesCours = async (req: AuthRequest, res: Response) => {
    try {
      const userId = req.user?.id;
      if (!userId) {
        return errorResponse(res, "Utilisateur non authentifié", 401);
      }
      const { dateDebut, dateFin } = req.query;
      
      const result = await this.service.getMesCours(userId, dateDebut as string, dateFin as string);
      return successResponse(res, result);
    } catch (error: any) {
      return errorResponse(res, error.message);
    }
  }

  async findAll(req: Request, res: Response) {
    try {
      const heureDebut = req.query.heureDebut as string | undefined;
      const heureFin = req.query.heureFin as string | undefined;
      const result = await this.service.findAll(heureDebut, heureFin)
      return successResponse(res, result)
    } catch (error: any) {
      return errorResponse(res, error.message)
    }
  }

  async update(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id as string)
      const data = req.body
      const result = await this.service.update(id, data)
      return successResponse(res, result, "Cours mis à jour", 200)
    } catch (error: any) {
      return errorResponse(res, error.message)
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id as string)
      await this.service.delete(id)
      return successResponse(res, null, "Cours supprimé", 200)
    } catch (error: any) {
      return errorResponse(res, error.message)
    }
  }
}
