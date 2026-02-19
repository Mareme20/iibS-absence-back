import { IJustificationRepository } from "../repository/interfaces/IJustificationRepository";
import { IAbsenceRepository } from "../repository/interfaces/IAbsenceRepository";
import { IEtudiantRepository } from "../repository/interfaces/IEtudiantRepository"; // Ajouté
import { StatutJustification } from "../entity/Justification";

export class JustificationService {
  constructor(
    private justificationRepo: IJustificationRepository,
    private absenceRepo: IAbsenceRepository,
    private etudiantRepo: IEtudiantRepository // Injecté ici
  ) {}

  async create(data: any) {
    const absence = await this.absenceRepo.findById(data.absenceId);

    if (!absence) {
      throw new Error("Absence not found");
    }

    return await this.justificationRepo.create({
      date: new Date(data.date),
      motif: data.motif,
      absence
    });
  }

  async traiter(justificationId: number, statut: StatutJustification) {
    const justification = await this.justificationRepo.findById(justificationId);

    if (!justification) {
      throw new Error("Justification not found");
    }

    justification.statut = statut;

    if (statut === StatutJustification.ACCEPTEE && justification.absence) {
      justification.absence.estJustifiee = true;
      await this.absenceRepo.save(justification.absence);
    }

    return await this.justificationRepo.save(justification);
  }
  

  async getMesJustifications(userId: number) {
    // On cherche l'étudiant qui possède cet ID utilisateur (issu du JWT)
    const etudiant = await this.etudiantRepo.findByUserId(userId);
    
    if (!etudiant) {
      throw new Error("Profil étudiant non trouvé");
    }

    // On récupère les justifications liées à l'ID technique de l'étudiant
    return await this.justificationRepo.findByEtudiant(etudiant.id);
  }

}
