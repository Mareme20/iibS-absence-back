import { ICoursRepository } from "../repository/interfaces/ICoursRepository";
import { IProfesseurRepository } from "../repository/interfaces/IProfesseurRepository"; // CHANGE ICI
import { IClasseRepository } from "../repository/interfaces/IClasseRepository";
import { CreateCoursDto } from "../dto/cours.dto";

export class CoursService {
  constructor(
    private coursRepository: ICoursRepository,
    private professeurRepository: IProfesseurRepository, // UTILISE LE REPO PROFESSEUR
    private classeRepository: IClasseRepository
  ) {}

  async create(data: CreateCoursDto) {
    // On cherche dans la table Professeur (qui contient l'id, la spécialité ET le user lié)
    const professeur = await this.professeurRepository.findById(data.professeurId);

    if (!professeur) {
      throw new Error("Professeur not found");
    }

    // Récupération des classes
    const classes = await Promise.all(
      data.classeIds.map(id => this.classeRepository.findById(id))
    );

    const validClasses = classes.filter(c => c !== null);
    if (validClasses.length !== data.classeIds.length) {
      throw new Error("One or more classes not found");
    }

    return await this.coursRepository.create({
      date: new Date(data.date),
      heureDebut: data.heureDebut,
      heureFin: data.heureFin,
      semestre: data.semestre,
      module: data.module,
      professeur: professeur, // C'est maintenant un type 'Professeur', TS est content
      classes: validClasses as any
    });
  }
  // Dans src/service/CoursService.ts
async findAll() {
  return await this.coursRepository.findAll();
}

}
