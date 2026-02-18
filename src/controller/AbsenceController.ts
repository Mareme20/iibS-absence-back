import { Request, Response } from "express"
import { AbsenceService } from "../service/AbsenceService"
import { createAbsenceSchema } from "../dto/absence.dto"
import { successResponse, errorResponse } from "../utils/response"

const service = new AbsenceService()

export class AbsenceController {

  static async create(req: Request, res: Response) {
    try {
      const data = createAbsenceSchema.parse(req.body)
      const result = await service.create(data)
      return successResponse(res, result, "Absence created", 201)
    } catch (error: any) {
      return errorResponse(res, error.message)
    }
  }
}
