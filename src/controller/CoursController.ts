import { Request, Response } from "express"
import { CoursRepository } from "../repository/CoursRepository"
import { ProfesseurRepository } from "../repository/ProfesseurRepository"
import { ClasseRepository } from "../repository/ClasseRepository"
import { CoursService } from "../service/CoursService"
import { createCoursSchema } from "../dto/cours.dto"
import { successResponse, errorResponse } from "../utils/response"

// Initialisation des dépendances
const coursRepo = new CoursRepository()
const profRepo = new ProfesseurRepository()
const classeRepo = new ClasseRepository()
const service = new CoursService(coursRepo, profRepo, classeRepo)

export class CoursController {
  // Suppression de 'static' pour que les méthodes appartiennent à l'instance
  async create(req: Request, res: Response) {
    try {
      const data = createCoursSchema.parse(req.body)
      const result = await service.create(data)
      return successResponse(res, result, "Cours created", 201)
    } catch (error: any) {
      return errorResponse(res, error.message)
    }
  }

  async findAll(req: Request, res: Response) {
    try {
      const result = await service.findAll()
      return successResponse(res, result)
    } catch (error: any) {
      return errorResponse(res, error.message)
    }
  }
}
