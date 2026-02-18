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
    // TypeORM utilise findOneBy ou findOne avec un objet where
    return await this.repo.findOne({ where: { id } });
  }
}
