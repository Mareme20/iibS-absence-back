import { Request, Response } from "express"
import { ProfesseurService } from "../service/ProfesseurService"
import { createProfesseurSchema } from "../dto/professeur.dto"
import { successResponse, errorResponse } from "../utils/response"

export class ProfesseurController {
  constructor(private readonly service: ProfesseurService) {}

   async create(req: Request, res: Response) {
    try {
      const data = createProfesseurSchema.parse(req.body)
      const result = await this.service.create(data)
      return successResponse(res, result, "Professeur created", 201)
    } catch (error: any) {
      return errorResponse(res, error.message)
    }
  }

  // Méthode pour lister tous les professeurs
  async findAll(req: Request, res: Response) {
    try {
      const result = await this.service.findAll()
      return successResponse(res, result)
    } catch (error: any) {
      return errorResponse(res, error.message)
    }
  }
}
