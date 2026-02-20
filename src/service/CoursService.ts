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

async findById(id: number) {
  return await this.coursRepository.findById(id);
}

async update(id: number, data: any) {
  const cours = await this.coursRepository.findById(id);
  if (!cours) throw new Error("Cours non trouvé");

  if (data.professeurId) {
    const professeur = await this.professeurRepository.findById(data.professeurId);
    if (!professeur) throw new Error("Professeur non trouvé");
    cours.professeur = professeur;
  }

  if (data.classeIds && Array.isArray(data.classeIds)) {
    const classes = await Promise.all(
      data.classeIds.map((id: number) => this.classeRepository.findById(id))
    );
    const validClasses = classes.filter(c => c !== null);
    if (validClasses.length !== data.classeIds.length) {
      throw new Error("Une ou plusieurs classes non trouvées");
    }
    cours.classes = validClasses as any;
  }

  cours.date = data.date ?? cours.date;
  cours.heureDebut = data.heureDebut ?? cours.heureDebut;
  cours.heureFin = data.heureFin ?? cours.heureFin;
  cours.semestre = data.semestre ?? cours.semestre;
  cours.module = data.module ?? cours.module;

   return await this.coursRepository.save(cours);
}

async delete(id: number) {
  const cours = await this.coursRepository.findById(id);
  if (!cours) {
    throw new Error("Cours non trouvé");
  }
  return await this.coursRepository.delete(id);
}

}
