import { Request, Response } from "express"
import { StatsService } from "../service/StatsService"
import { successResponse, errorResponse } from "../utils/response"

const service = new StatsService()

export class StatsController {

  static async coursParProfesseur(req: Request, res: Response) {
    try {
      const result = await service.coursParProfesseur()
      return successResponse(res, result)
    } catch (error: any) {
      return errorResponse(res, error.message)
    }
  }

  static async coursParClasse(req: Request, res: Response) {
    try {
      const result = await service.coursParClasse()
      return successResponse(res, result)
    } catch (error: any) {
      return errorResponse(res, error.message)
    }
  }

  static async top5Absents(req: Request, res: Response) {
    try {
      const result = await service.top5Absents()
      return successResponse(res, result)
    } catch (error: any) {
      return errorResponse(res, error.message)
    }
  }

  static async etudiantsPlus25Heures(req: Request, res: Response) {
    try {
      const result = await service.etudiantsPlus25Heures()
      return successResponse(res, result)
    } catch (error: any) {
      return errorResponse(res, error.message)
    }
  }
}
