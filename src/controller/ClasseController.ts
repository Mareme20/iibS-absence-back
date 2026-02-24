import { Request, Response } from "express"
import { ClasseService } from "../service/ClasseService"
import { createClasseSchema, updateClasseSchema } from "../dto/classe.dto"
import { successResponse, errorResponse } from "../utils/response"
import { AuthRequest } from "../middleware/auth.middleware"

export class ClasseController {
  constructor(private readonly service: ClasseService) {}

  async create(req: AuthRequest, res: Response) {
    try {
      const data = createClasseSchema.parse(req.body)
      const result = await this.service.create(data)
      return successResponse(res, result, "Classe créée avec succès", 201)
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Erreur lors de la création"
      return errorResponse(res, message)
    }
  }

  async findAll(req: AuthRequest, res: Response) {
    try {
      const result = await this.service.findAll()
      return successResponse(res, result)
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Erreur serveur"
      return errorResponse(res, message)
    }
  }

  async update(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id as string)
      const data = updateClasseSchema.parse(req.body)
      const result = await this.service.update(id, data)
      return successResponse(res, result, "Classe mise à jour", 200)
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Erreur serveur"
      return errorResponse(res, message)
    }
  }

  async findEtudiantsByClasse(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id as string)
      const annee = req.query.annee as string | undefined
      const result = await this.service.findEtudiantsByClasse(id, annee)
      return successResponse(res, result)
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Erreur serveur"
      return errorResponse(res, message)
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id as string)
      await this.service.delete(id)
      return successResponse(res, null, "Classe supprimée", 200)
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Erreur serveur"
      return errorResponse(res, message)
    }
  }
}
