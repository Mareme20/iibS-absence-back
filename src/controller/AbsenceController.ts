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
}
