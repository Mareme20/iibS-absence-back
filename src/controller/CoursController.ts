import { Request, Response } from "express"
import { CoursRepository } from "../repository/CoursRepository"
import { ProfesseurRepository } from "../repository/ProfesseurRepository" // Ajouté
import { ClasseRepository } from "../repository/ClasseRepository"     // Ajouté
import { CoursService } from "../service/CoursService"
import { createCoursSchema } from "../dto/cours.dto"
import { successResponse, errorResponse } from "../utils/response"

// 1. Instancier les 3 Repositories nécessaires
const coursRepo = new CoursRepository()
const profRepo = new ProfesseurRepository()
const classeRepo = new ClasseRepository()

// 2. Injecter les 3 arguments dans le service (Règle l'erreur "3 arguments attendus")
const service = new CoursService(coursRepo, profRepo, classeRepo)

export class CoursController {

  static async create(req: Request, res: Response) {
    try {
      const data = createCoursSchema.parse(req.body)
      const result = await service.create(data)
      return successResponse(res, result, "Cours created", 201)
    } catch (error: any) {
      return errorResponse(res, error.message)
    }
  }

  static async findAll(req: Request, res: Response) {
    try {
      // Cette ligne fonctionnera une fois le service mis à jour (voir étape 2)
      const result = await service.findAll()
      return successResponse(res, result)
    } catch (error: any) {
      return errorResponse(res, error.message)
    }
  }
}
