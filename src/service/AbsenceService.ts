import { IAbsenceRepository } from "../repository/interfaces/IAbsenceRepository";
import { IEtudiantRepository } from "../repository/interfaces/IEtudiantRepository";
import { ICoursRepository } from "../repository/interfaces/ICoursRepository";
import { Absence } from "../entity/Absence";

export class AbsenceService {
  constructor(
    private absenceRepo: IAbsenceRepository,
    private etudiantRepo: IEtudiantRepository,
    private coursRepo: ICoursRepository
  ) {}

  async create(data: any): Promise<Absence> {
    // 1. Recherche des entités via les repositories
    const etudiant = await this.etudiantRepo.findById(data.etudiantId);
    const cours = await this.coursRepo.findById(data.coursId);

    // 2. Logique métier : Validation
    if (!etudiant || !cours) {
      throw new Error("Etudiant or Cours not found");
    }

    // 3. Création de l'absence
    return await this.absenceRepo.create({
      date: new Date(data.date),
      nombreHeures: data.nombreHeures,
      etudiant,
      cours
    });
  }
}
