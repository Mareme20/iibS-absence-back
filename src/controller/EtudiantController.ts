import { Request, Response } from "express"
import { EtudiantService } from "../service/EtudiantService"
import { JustificationService } from "../service/JustificationService"
import { createEtudiantSchema, inscriptionSchema, updateEtudiantSchema } from "../dto/etudiant.dto"
import { successResponse, errorResponse } from "../utils/response"
import { AuthRequest } from "../middleware/auth.middleware"
import { createJustificationSchema, mesJustificationsQuerySchema } from "../dto/justification.dto"

export class EtudiantController {
  constructor(
    private readonly service: EtudiantService,
    private readonly justificationService: JustificationService
  ) {}

  async create(req: Request, res: Response) {
    try {
      const data = createEtudiantSchema.parse(req.body)
      const result = await this.service.create(data)
      return successResponse(res, result, "Etudiant created", 201)
    } catch (error: any) {
      return errorResponse(res, error.message)
    }
  }

  async findAll(req: Request, res: Response) {
    try {
      const result = await this.service.findAll();
      return successResponse(res, result);
    } catch (error: any) {
      return errorResponse(res, error.message);
    }
  }

  async inscrire(req: Request, res: Response) {
    try {
      const data = inscriptionSchema.parse(req.body)
      const result = await this.service.inscrire(
        data.etudiantId,
        data.classeId,
        data.annee
      )
      return successResponse(res, result, "Inscription created", 201)
    } catch (error: any) {
      return errorResponse(res, error.message)
    }
  }

  async getMesAbsences(req: AuthRequest, res: Response) {
    try {
      const userId = req.user?.id;
      if (!userId) {
        return errorResponse(res, "Utilisateur non authentifié", 401);
      }
      const date = req.query.date as string;
      const result = await this.service.getMesAbsences(userId, date);
      return successResponse(res, result);
    } catch (error: any) {
      return errorResponse(res, error.message);
    }
  }

  async getMesCours(req: AuthRequest, res: Response) {
    try {
      const userId = req.user?.id;
      if (!userId) {
        return errorResponse(res, "Utilisateur non authentifié", 401);
      }
      const dateDebut = req.query.dateDebut as string | undefined;
      const dateFin = req.query.dateFin as string | undefined;
      const result = await this.service.getMesCours(userId, dateDebut, dateFin);
      return successResponse(res, result);
    } catch (error: any) {
      return errorResponse(res, error.message);
    }
  }

  async getMesJustifications(req: AuthRequest, res: Response) {
    try {
      const userId = req.user?.id;
      if (!userId) {
        return errorResponse(res, "Utilisateur non authentifié", 401);
      }
      const { dateDebut, dateFin, statut } = mesJustificationsQuerySchema.parse(req.query);
      const result = await this.justificationService.getMesJustifications(userId, dateDebut, dateFin, statut);
      return successResponse(res, result);
    } catch (error: any) {
      return errorResponse(res, error.message);
    }
  }

  async update(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id as string);
      const data = updateEtudiantSchema.parse(req.body);
      const result = await this.service.update(id, data);
      return successResponse(res, result, "Étudiant mis à jour", 200);
    } catch (error: any) {
      return errorResponse(res, error.message);
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id as string);
      await this.service.delete(id);
      return successResponse(res, null, "Étudiant supprimé", 200);
    } catch (error: any) {
      return errorResponse(res, error.message);
    }
  }

  async justifier(req: AuthRequest, res: Response) {
    try {
      const userId = req.user?.id;
      if (!userId) {
        return errorResponse(res, "Utilisateur non authentifié", 401);
      }
      const { absenceId, date, motif } = createJustificationSchema.parse(req.body);

      const result = await this.justificationService.create({
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
