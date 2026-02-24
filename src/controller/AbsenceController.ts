import { Request, Response } from "express";
import { AbsenceService } from "../service/AbsenceService";
import { createAbsenceSchema, updateAbsenceSchema } from "../dto/absence.dto";
import { successResponse, errorResponse } from "../utils/response";

export class AbsenceController {
  constructor(private readonly service: AbsenceService) {}

 create = async (req: Request, res: Response) => {
    try {
      // Validation Zod
      const data = createAbsenceSchema.parse(req.body);
      
      // Appel au service
      const result = await this.service.create(data);
      
      return successResponse(res, result, "Absence created", 201);
    } catch (error: any) {
      // Gestion des erreurs (Zod ou métier)
      const message = error.errors ? error.errors[0].message : error.message;
      return errorResponse(res, message);
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

  findByCours = async (req: Request, res: Response) => {
    try {
      const coursId = parseInt(req.params.coursId as string);
      const date = req.query.date as string | undefined;
      const result = await this.service.findByCours(coursId, date);
      return successResponse(res, result);
    } catch (error: any) {
      return errorResponse(res, error.message);
    }
  }

  findByEtudiant = async (req: Request, res: Response) => {
    try {
      const etudiantId = parseInt(req.params.etudiantId as string);
      const date = req.query.date as string | undefined;
      const result = await this.service.findByEtudiant(etudiantId, date);
      return successResponse(res, result);
    } catch (error: any) {
      return errorResponse(res, error.message);
    }
  }

  update = async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id as string);
      const data = updateAbsenceSchema.parse(req.body);
      const result = await this.service.update(id, data);
      return successResponse(res, result, "Absence mise à jour", 200);
    } catch (error: any) {
      return errorResponse(res, error.message);
    }
  }

  delete = async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id as string);
      await this.service.delete(id);
      return successResponse(res, null, "Absence supprimée", 200);
    } catch (error: any) {
      return errorResponse(res, error.message);
    }
  }

  markAsJustified = async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id as string);
      const result = await this.service.markAsJustified(id);
      return successResponse(res, result, "Absence marquée comme justifiée", 200);
    } catch (error: any) {
      return errorResponse(res, error.message);
    }
  }
}
