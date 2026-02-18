import { Request, Response } from "express"
import { EtudiantService } from "../service/EtudiantService"
import { createEtudiantSchema, inscriptionSchema } from "../dto/etudiant.dto"
import { successResponse, errorResponse } from "../utils/response"

const service = new EtudiantService()

export class EtudiantController {

  static async create(req: Request, res: Response) {
    try {
      const data = createEtudiantSchema.parse(req.body)
      const result = await service.create(data)
      return successResponse(res, result, "Etudiant created", 201)
    } catch (error: any) {
      return errorResponse(res, error.message)
    }
  }

  static async inscrire(req: Request, res: Response) {
    try {
      const data = inscriptionSchema.parse(req.body)
      const result = await service.inscrire(
        data.etudiantId,
        data.classeId,
        data.annee
      )
      return successResponse(res, result, "Inscription created", 201)
    } catch (error: any) {
      return errorResponse(res, error.message)
    }
  }
}
