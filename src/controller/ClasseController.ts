import { Request, Response } from "express"
import { ClasseRepository } from "../repository/ClasseRepository"
import { ClasseService } from "../service/ClasseService"
import { createClasseSchema } from "../dto/classe.dto"
import { successResponse, errorResponse } from "../utils/response"

const repository = new ClasseRepository()
const service = new ClasseService(repository)

export class ClasseController {

  // RETIRER 'static' ICI
  async create(req: Request, res: Response) {
    try {
      const data = createClasseSchema.parse(req.body)
      const result = await service.create(data)
      return successResponse(res, result, "Classe created", 201)
    } catch (error: any) {
      return errorResponse(res, error.message)
    }
  }

  // RETIRER 'static' ICI
  async findAll(req: Request, res: Response) {
    try {
      const result = await service.findAll()
      return successResponse(res, result)
    } catch (error: any) {
      return errorResponse(res, error.message)
    }
  }

  async update(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id as string)
      const data = req.body
      const result = await service.update(id, data)
      return successResponse(res, result, "Classe mise à jour", 200)
    } catch (error: any) {
      return errorResponse(res, error.message)
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id as string)
      await service.delete(id)
      return successResponse(res, null, "Classe supprimée", 200)
    } catch (error: any) {
      return errorResponse(res, error.message)
    }
  }
}
