import { Request, Response } from "express"
import { EtudiantService } from "../service/EtudiantService"
import { EtudiantRepository } from "../repository/EtudiantRepository"      // AJOUTÉ
import { UserRepository } from "../repository/UserRepository"              // AJOUTÉ
import { ClasseRepository } from "../repository/ClasseRepository"          // AJOUTÉ
import { InscriptionRepository } from "../repository/InscriptionRepository" // AJOUTÉ
import { createEtudiantSchema, inscriptionSchema } from "../dto/etudiant.dto"
import { successResponse, errorResponse } from "../utils/response"

// 1. On instancie les 4 repositories nécessaires
const etudiantRepo = new EtudiantRepository()
const userRepo = new UserRepository()
const classeRepo = new ClasseRepository()
const inscriptionRepo = new InscriptionRepository()

// 2. On les injecte dans le service (Règle l'erreur des 4 arguments)
const service = new EtudiantService(
  etudiantRepo, 
  userRepo, 
  classeRepo, 
  inscriptionRepo
)

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
