import { Request, Response } from "express"
import { ProfesseurService } from "../service/ProfesseurService"
import { ProfesseurRepository } from "../repository/ProfesseurRepository" // AJOUTÉ
import { UserRepository } from "../repository/UserRepository"             // AJOUTÉ
import { createProfesseurSchema } from "../dto/professeur.dto"
import { successResponse, errorResponse } from "../utils/response"

// 1. On instancie les repositories (Implémentations concrètes)
const profRepo = new ProfesseurRepository()
const userRepo = new UserRepository()

// 2. On les injecte dans le service (Règle l'erreur des 2 arguments)
const service = new ProfesseurService(profRepo, userRepo)

export class ProfesseurController {

   async create(req: Request, res: Response) {
    try {
      const data = createProfesseurSchema.parse(req.body)
      const result = await service.create(data)
      return successResponse(res, result, "Professeur created", 201)
    } catch (error: any) {
      return errorResponse(res, error.message)
    }
  }

  // N'oublie pas d'ajouter le findAll si tu l'as dans ton service
  static async findAll(req: Request, res: Response) {
    try {
      const result = await service.findAll()
      return successResponse(res, result)
    } catch (error: any) {
      return errorResponse(res, error.message)
    }
  }
}
