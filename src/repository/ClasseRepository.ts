import { Repository } from "typeorm"
import { AppDataSource } from "../config/data-source"
import { Classe } from "../entity/Classe"
import { IClasseRepository } from "./interfaces/IClasseRepository"

export class ClasseRepository implements IClasseRepository {

  private repo: Repository<Classe>

  constructor() {
    this.repo = AppDataSource.getRepository(Classe)
  }

  async create(data: Partial<Classe>): Promise<Classe> {
    const classe = this.repo.create(data)
    return await this.repo.save(classe)
  }

  async findAll(): Promise<Classe[]> {
    return await this.repo.find()
  }
}
