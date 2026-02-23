import { Repository, In } from "typeorm"
import { AppDataSource } from "../config/data-source"
import { Cours } from "../entity/Cours"
import { Classe } from "../entity/Classe"
import { User } from "../entity/User"
import { ICoursRepository } from "./interfaces/ICoursRepository"

export class CoursRepository implements ICoursRepository {

  private repo: Repository<Cours>

  constructor() {
    this.repo = AppDataSource.getRepository(Cours)
  }
  async save(cours: Cours): Promise<Cours> {
  return await this.repo.save(cours);
}

  async create(data: Partial<Cours>): Promise<Cours> {
    const cours = this.repo.create(data)
    return await this.repo.save(cours)
  }

  async findAll(): Promise<Cours[]> {
    return await this.repo.find({
      relations: ["professeur", "classes"]
    })
  }

  async findById(id: number): Promise<Cours | null> {
    return await this.repo.findOne({ 
      where: { id },
      relations: ["professeur", "classes"]
    });
  }

  async findByProfesseur(professeurId: number): Promise<Cours[]> {
    return await this.repo.find({
      where: { professeur: { id: professeurId } },
      relations: ["professeur", "classes"]
    });
  }

  async findByProfesseurAndDateRange(professeurId: number, dateDebut: Date, dateFin: Date): Promise<Cours[]> {
    return await this.repo
      .createQueryBuilder("cours")
      .innerJoin("cours.professeur", "professeur")
      .leftJoinAndSelect("cours.classes", "classes")
      .where("professeur.id = :professeurId", { professeurId })
      .andWhere("cours.date >= :dateDebut", { dateDebut })
      .andWhere("cours.date <= :dateFin", { dateFin })
      .orderBy("cours.date", "ASC")
      .getMany();
  }

  async update(id: number, data: Partial<Cours>): Promise<Cours> {
    await this.repo.update(id, data);
    return await this.findById(id) as Cours;
  }

  async delete(id: number): Promise<void> {
    await this.repo.delete(id);
  }
}
