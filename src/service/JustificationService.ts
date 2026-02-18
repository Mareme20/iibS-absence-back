import { IJustificationRepository } from "../repository/interfaces/IJustificationRepository";
import { IAbsenceRepository } from "../repository/interfaces/IAbsenceRepository";
import { StatutJustification } from "../entity/Justification";

export class JustificationService {
  constructor(
    private justificationRepo: IJustificationRepository,
    private absenceRepo: IAbsenceRepository
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

    // Logique métier : Si acceptée, on met à jour l'absence liée
    if (statut === StatutJustification.ACCEPTEE && justification.absence) {
      justification.absence.estJustifiee = true;
      await this.absenceRepo.save(justification.absence);
    }

    return await this.justificationRepo.save(justification);
  }
}
