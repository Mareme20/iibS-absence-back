import { Request, Response } from "express"
import { CoursRepository } from "../repository/CoursRepository"
import { CoursService } from "../service/CoursService"
import { createCoursSchema } from "../dto/cours.dto"
import { successResponse, errorResponse } from "../utils/response"

const repository = new CoursRepository()
const service = new CoursService(repository)

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
      const result = await service.findAll()
      return successResponse(res, result)
    } catch (error: any) {
      return errorResponse(res, error.message)
    }
  }
}
