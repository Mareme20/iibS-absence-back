import { Request, Response } from "express"
import { EtudiantService } from "../service/EtudiantService"
import { EtudiantRepository } from "../repository/EtudiantRepository"
import { UserRepository } from "../repository/UserRepository"
import { ClasseRepository } from "../repository/ClasseRepository"
import { InscriptionRepository } from "../repository/InscriptionRepository"
import { createEtudiantSchema, inscriptionSchema } from "../dto/etudiant.dto"
import { successResponse, errorResponse } from "../utils/response"

const etudiantRepo = new EtudiantRepository()
const userRepo = new UserRepository()
const classeRepo = new ClasseRepository()
const inscriptionRepo = new InscriptionRepository()

const service = new EtudiantService(
  etudiantRepo, 
  userRepo, 
  classeRepo, 
  inscriptionRepo
)

export class EtudiantController {

  // RETIRER 'static' ICI
  async create(req: Request, res: Response) {
    try {
      const data = createEtudiantSchema.parse(req.body)
      const result = await service.create(data)
      return successResponse(res, result, "Etudiant created", 201)
    } catch (error: any) {
      return errorResponse(res, error.message)
    }
  }

  // RETIRER 'static' ICI
  async inscrire(req: Request, res: Response) {
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
