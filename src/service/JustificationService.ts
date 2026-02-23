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
    if (!data?.absenceId || !data?.date || !data?.motif) {
      throw new Error("Les champs absenceId, date et motif sont requis");
    }

    const absence = await this.absenceRepo.findById(data.absenceId);

    if (!absence) {
      throw new Error("Absence not found");
    }

    // Vérifie que l'absence appartient bien à l'étudiant connecté
    if (data.etudiantId) {
      const etudiant = await this.etudiantRepo.findByUserId(data.etudiantId);
      if (!etudiant || absence.etudiant?.id !== etudiant.id) {
        throw new Error("Cette absence ne vous appartient pas");
      }
    }

    // Une absence ne peut avoir qu'une seule justification (OneToOne)
    const existing = await this.justificationRepo.findByAbsenceId(data.absenceId);
    if (existing) {
      throw new Error("Une justification existe déjà pour cette absence");
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
  

  async getMesJustifications(userId: number, statut?: string) {
    // On cherche l'étudiant qui possède cet ID utilisateur (issu du JWT)
    const etudiant = await this.etudiantRepo.findByUserId(userId);
    
    if (!etudiant) {
      throw new Error("Profil étudiant non trouvé");
    }

    // Si un statut est fourni, utiliser la méthode filtrée
    if (statut) {
      return await this.justificationRepo.findByEtudiantAndFilters(
        etudiant.id,
        undefined,
        undefined,
        statut
      );
    }

    // Sinon, retourner toutes les justifications
    return await this.justificationRepo.findByEtudiant(etudiant.id);
  }

  async findAll() {
    return await this.justificationRepo.findAll();
  }

  async findById(id: number) {
    return await this.justificationRepo.findById(id);
  }

  async update(id: number, data: any) {
    const justification = await this.justificationRepo.findById(id);
    if (!justification) {
      throw new Error("Justification non trouvée");
    }
    return await this.justificationRepo.update(id, data);
  }

  async delete(id: number) {
    const justification = await this.justificationRepo.findById(id);
    if (!justification) {
      throw new Error("Justification non trouvée");
    }
    return await this.justificationRepo.delete(id);
  }

}
