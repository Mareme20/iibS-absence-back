import { Repository } from "typeorm"
import { AppDataSource } from "../config/data-source"
import { Professeur } from "../entity/Professeur"
import { IProfesseurRepository } from "./interfaces/IProfesseurRepository"

export class ProfesseurRepository implements IProfesseurRepository {

  private repo: Repository<Professeur>

  constructor() {
    this.repo = AppDataSource.getRepository(Professeur)
  }

  async create(data: Partial<Professeur>): Promise<Professeur> {
    const professeur = this.repo.create(data)
    return await this.repo.save(professeur)
  }

  async findAll(): Promise<Professeur[]> {
    return await this.repo.find({
      relations: ["user"]
    })
  }

  async findById(id: number): Promise<Professeur | null> {
    return await this.repo.findOne({
      where: { id },
      relations: ["user"]
    })
  }
}
