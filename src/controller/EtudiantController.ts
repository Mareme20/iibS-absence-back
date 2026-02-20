import { Request, Response } from "express"
import { EtudiantService } from "../service/EtudiantService"
import { EtudiantRepository } from "../repository/EtudiantRepository"
import { UserRepository } from "../repository/UserRepository"
import { ClasseRepository } from "../repository/ClasseRepository"
import { InscriptionRepository } from "../repository/InscriptionRepository"
import { AbsenceRepository } from "../repository/AbsenceRepository" // Ajouté
import { JustificationRepository } from "../repository/JustificationRepository" // Ajouté
import { JustificationService } from "../service/JustificationService"
import { createEtudiantSchema, inscriptionSchema } from "../dto/etudiant.dto"
import { successResponse, errorResponse } from "../utils/response"

// 1. Initialisation des Repositories
const etudiantRepo = new EtudiantRepository()
const userRepo = new UserRepository()
const classeRepo = new ClasseRepository()
const inscriptionRepo = new InscriptionRepository()
const absenceRepo = new AbsenceRepository()
const justificationRepo = new JustificationRepository()

// 2. Initialisation des Services
// On ajoute absenceRepo à EtudiantService (il en a besoin pour getMesAbsences)
const service = new EtudiantService(
  etudiantRepo, 
  userRepo, 
  classeRepo, 
  inscriptionRepo,
  absenceRepo 
)

// Instance du service de justification
const justificationService = new JustificationService(
  justificationRepo, 
  absenceRepo, 
  etudiantRepo
)

export class EtudiantController {

  async create(req: Request, res: Response) {
    try {
      const data = createEtudiantSchema.parse(req.body)
      const result = await service.create(data)
      return successResponse(res, result, "Etudiant created", 201)
    } catch (error: any) {
      return errorResponse(res, error.message)
    }
  }

  async findAll(req: Request, res: Response) {
    try {
      const result = await service.findAll();
      return successResponse(res, result);
    } catch (error: any) {
      return errorResponse(res, error.message);
    }
  }

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

  async getMesAbsences(req: Request, res: Response) {
    try {
      const userId = (req as any).user.id;
      const date = req.query.date as string;
      const result = await service.getMesAbsences(userId, date);
      return successResponse(res, result);
    } catch (error: any) {
      return errorResponse(res, error.message);
    }
  }

  async getMesJustifications(req: Request, res: Response) {
    try {
      const userId = (req as any).user.id;
      const { statut } = req.query;
      const result = await justificationService.getMesJustifications(userId, statut as string);
      return successResponse(res, result);
    } catch (error: any) {
      return errorResponse(res, error.message);
    }
  }

  async update(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id as string);
      const data = req.body;
      const result = await service.update(id, data);
      return successResponse(res, result, "Étudiant mis à jour", 200);
    } catch (error: any) {
      return errorResponse(res, error.message);
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id as string);
      await service.delete(id);
      return successResponse(res, null, "Étudiant supprimé", 200);
    } catch (error: any) {
      return errorResponse(res, error.message);
    }
  }

  async justifier(req: Request, res: Response) {
    try {
      const userId = (req as any).user.id;
      const { absenceId, date, motif } = req.body;
      
      if (!absenceId || !date || !motif) {
        return errorResponse(res, "Les champs absenceId, date et motif sont requis");
      }

      const result = await justificationService.create({
        absenceId,
        date,
        motif,
        etudiantId: userId
      });
      
      return successResponse(res, result, "Justification soumise avec succès", 201);
    } catch (error: any) {
      return errorResponse(res, error.message);
    }
  }
}
