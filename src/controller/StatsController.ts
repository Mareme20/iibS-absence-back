import { Request, Response } from "express"
import { StatsService } from "../service/StatsService"
import { successResponse, errorResponse } from "../utils/response"

export class StatsController {
  constructor(private readonly service: StatsService) {}

    async coursParProfesseur(req: Request, res: Response) {
    try {
      const result = await this.service.coursParProfesseur()
      return successResponse(res, result)
    } catch (error: any) {
      return errorResponse(res, error.message)
    }
  }

  async coursParClasse(req: Request, res: Response) {
    try {
      const result = await this.service.coursParClasse()
      return successResponse(res, result)
    } catch (error: any) {
      return errorResponse(res, error.message)
    }
  }

  async top5Absents(req: Request, res: Response) {
    try {
      const result = await this.service.top5Absents()
      return successResponse(res, result)
    } catch (error: any) {
      return errorResponse(res, error.message)
    }
  }

  async etudiantsPlus25Heures(req: Request, res: Response) {
    try {
      const result = await this.service.etudiantsPlus25Heures()
      return successResponse(res, result)
    } catch (error: any) {
      return errorResponse(res, error.message)
    }
  }
}
