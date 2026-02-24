import { Request, Response } from "express";
import { JustificationService } from "../service/JustificationService";
import { successResponse, errorResponse } from "../utils/response";
import { AuthRequest } from "../middleware/auth.middleware";
import {
  createJustificationSchema,
  mesJustificationsQuerySchema,
  traiterJustificationSchema,
  updateJustificationSchema
} from "../dto/justification.dto";

export class JustificationController {
  constructor(private readonly service: JustificationService) {}

  create = async (req: AuthRequest, res: Response) => {
    try {
      const userId = req.user?.id;
      if (!userId) {
        return errorResponse(res, "Utilisateur non authentifié", 401);
      }
      const { absenceId, date, motif } = createJustificationSchema.parse(req.body);

      const result = await this.service.create({
        absenceId,
        date,
        motif,
        etudiantId: userId
      });
      
      return successResponse(res, result, "Justification créée", 201);
    } catch (error: any) {
      return errorResponse(res, error.message);
    }
  }

  findAll = async (req: Request, res: Response) => {
    try {
      const result = await this.service.findAll();
      return successResponse(res, result);
    } catch (error: any) {
      return errorResponse(res, error.message);
    }
  }

  findById = async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id as string);
      const result = await this.service.findById(id);
      return successResponse(res, result);
    } catch (error: any) {
      return errorResponse(res, error.message);
    }
  }

  update = async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id as string);
      const data = updateJustificationSchema.parse(req.body);
      const result = await this.service.update(id, data);
      return successResponse(res, result, "Justification mise à jour", 200);
    } catch (error: any) {
      return errorResponse(res, error.message);
    }
  }

  delete = async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id as string);
      await this.service.delete(id);
      return successResponse(res, null, "Justification supprimée", 200);
    } catch (error: any) {
      return errorResponse(res, error.message);
    }
  }

  traiter = async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id as string);
      const { statut } = traiterJustificationSchema.parse(req.body);
      const result = await this.service.traiter(id, statut);
      return successResponse(res, result, "Justification traitée", 200);
    } catch (error: any) {
      return errorResponse(res, error.message);
    }
  }

  getMesJustifications = async (req: AuthRequest, res: Response) => {
    try {
      const userId = req.user?.id;
      if (!userId) {
        return errorResponse(res, "Utilisateur non authentifié", 401);
      }
      const { dateDebut, dateFin, statut } = mesJustificationsQuerySchema.parse(req.query);
      const result = await this.service.getMesJustifications(userId, dateDebut, dateFin, statut);
      return successResponse(res, result);
    } catch (error: any) {
      return errorResponse(res, error.message);
    }
  }
}
