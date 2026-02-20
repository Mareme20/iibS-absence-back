import { Request, Response } from "express";
import { JustificationService } from "../service/JustificationService";
import { JustificationRepository } from "../repository/JustificationRepository";
import { AbsenceRepository } from "../repository/AbsenceRepository";
import { EtudiantRepository } from "../repository/EtudiantRepository";
import { successResponse, errorResponse } from "../utils/response";

// Initialisation des repositories
const justificationRepo = new JustificationRepository();
const absenceRepo = new AbsenceRepository();
const etudiantRepo = new EtudiantRepository();

// Initialisation du service
const service = new JustificationService(justificationRepo, absenceRepo, etudiantRepo);

export class JustificationController {

  create = async (req: Request, res: Response) => {
    try {
      const userId = (req as any).user.id;
      const { absenceId, date, motif } = req.body;
      
      if (!absenceId || !date || !motif) {
        return errorResponse(res, "Les champs absenceId, date et motif sont requis");
      }

      const result = await service.create({
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
      const result = await service.findAll();
      return successResponse(res, result);
    } catch (error: any) {
      return errorResponse(res, error.message);
    }
  }

  findById = async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id as string);
      const result = await service.findById(id);
      return successResponse(res, result);
    } catch (error: any) {
      return errorResponse(res, error.message);
    }
  }

  update = async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id as string);
      const data = req.body;
      const result = await service.update(id, data);
      return successResponse(res, result, "Justification mise à jour", 200);
    } catch (error: any) {
      return errorResponse(res, error.message);
    }
  }

  delete = async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id as string);
      await service.delete(id);
      return successResponse(res, null, "Justification supprimée", 200);
    } catch (error: any) {
      return errorResponse(res, error.message);
    }
  }

  traiter = async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id as string);
      const { statut } = req.body;
      const result = await service.traiter(id, statut);
      return successResponse(res, result, "Justification traitée", 200);
    } catch (error: any) {
      return errorResponse(res, error.message);
    }
  }

  getMesJustifications = async (req: Request, res: Response) => {
    try {
      const userId = (req as any).user.id;
      const result = await service.getMesJustifications(userId);
      return successResponse(res, result);
    } catch (error: any) {
      return errorResponse(res, error.message);
    }
  }
}

