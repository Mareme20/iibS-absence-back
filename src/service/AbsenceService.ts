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
  async getMesAbsences(userId: number, date?: string) {
  // On récupère d'abord l'ID de l'étudiant à partir du userId du token
  const etudiant = await this.etudiantRepo.findById(userId); 
  if (!etudiant) throw new Error("Profil étudiant non trouvé");

  return await this.absenceRepo.findByEtudiant(etudiant.id, date);
  }

  async findAll() {
    return await this.absenceRepo.findAll();
  }

  async findById(id: number) {
    return await this.absenceRepo.findById(id);
  }

  async update(id: number, data: any) {
    const absence = await this.absenceRepo.findById(id);
    if (!absence) {
      throw new Error("Absence non trouvée");
    }
    return await this.absenceRepo.update(id, data);
  }

  async delete(id: number) {
    const absence = await this.absenceRepo.findById(id);
    if (!absence) {
      throw new Error("Absence non trouvée");
    }
    return await this.absenceRepo.delete(id);
  }

  async markAsJustified(id: number): Promise<Absence> {
    const absence = await this.absenceRepo.findById(id);
    if (!absence) {
      throw new Error("Absence non trouvée");
    }
    absence.estJustifiee = true;
    return await this.absenceRepo.save(absence);
  }

}
