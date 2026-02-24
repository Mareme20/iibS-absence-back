import { IAbsenceRepository } from "../repository/interfaces/IAbsenceRepository";
import { IEtudiantRepository } from "../repository/interfaces/IEtudiantRepository";
import { ICoursRepository } from "../repository/interfaces/ICoursRepository";
import { IInscriptionRepository } from "../repository/interfaces/IInscriptionRepository";
import { Absence } from "../entity/Absence";

export class AbsenceService {
  constructor(
    private absenceRepo: IAbsenceRepository,
    private etudiantRepo: IEtudiantRepository,
    private coursRepo: ICoursRepository,
    private inscriptionRepo: IInscriptionRepository
  ) {}

  async create(data: any): Promise<Absence> {
    // 1. Recherche des entités via les repositories
    const etudiant = await this.etudiantRepo.findById(data.etudiantId);
    const cours = await this.coursRepo.findById(data.coursId);

    // 2. Logique métier : Validation
    if (!etudiant || !cours) {
      throw new Error("Etudiant or Cours not found");
    }

    const inscriptions = await this.inscriptionRepo.findByEtudiant(etudiant.id);
    const classeIdsDuCours = new Set((cours.classes || []).map((classe) => classe.id));
    const estInscritDansLeCours = inscriptions.some((inscription) =>
      classeIdsDuCours.has(inscription.classe.id)
    );

    if (!estInscritDansLeCours) {
      throw new Error("L'étudiant n'est pas inscrit dans une classe de ce cours");
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

  async findByCours(coursId: number, date?: string) {
    return await this.absenceRepo.findByCours(coursId, date);
  }

  async findByEtudiant(etudiantId: number, date?: string) {
    return await this.absenceRepo.findByEtudiant(etudiantId, date);
  }

  async update(id: number, data: any) {
    const absence = await this.absenceRepo.findById(id);
    if (!absence) {
      throw new Error("Absence non trouvée");
    }

    const payload = {
      ...data,
      date: data.date ? new Date(data.date) : undefined
    };

    return await this.absenceRepo.update(id, payload);
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
