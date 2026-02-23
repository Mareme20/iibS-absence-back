import { Request, Response } from "express";
import { AbsenceService } from "../service/AbsenceService";
import { AbsenceRepository } from "../repository/AbsenceRepository";
import { EtudiantRepository } from "../repository/EtudiantRepository";
import { CoursRepository } from "../repository/CoursRepository";
import { createAbsenceSchema } from "../dto/absence.dto";
import { successResponse, errorResponse } from "../utils/response";

// On instancie les dépendances
const absenceRepo = new AbsenceRepository();
const etudiantRepo = new EtudiantRepository();
const coursRepo = new CoursRepository();

// On injecte les repos dans le service
const service = new AbsenceService(absenceRepo, etudiantRepo, coursRepo);

export class AbsenceController {

 create = async (req: Request, res: Response) => {
    try {
      // Validation Zod
      const data = createAbsenceSchema.parse(req.body);
      
      // Appel au service
      const result = await service.create(data);
      
      return successResponse(res, result, "Absence created", 201);
    } catch (error: any) {
      // Gestion des erreurs (Zod ou métier)
      const message = error.errors ? error.errors[0].message : error.message;
      return errorResponse(res, message);
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
      return successResponse(res, result, "Absence mise à jour", 200);
    } catch (error: any) {
      return errorResponse(res, error.message);
    }
  }

  delete = async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id as string);
      await service.delete(id);
      return successResponse(res, null, "Absence supprimée", 200);
    } catch (error: any) {
      return errorResponse(res, error.message);
    }
  }

  markAsJustified = async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id as string);
      const result = await service.markAsJustified(id);
      return successResponse(res, result, "Absence marquée comme justifiée", 200);
    } catch (error: any) {
      return errorResponse(res, error.message);
    }
  }
}
