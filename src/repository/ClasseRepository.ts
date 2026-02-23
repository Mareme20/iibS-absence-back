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
    return await this.repo.find({ relations: ["cours"] })
  }

  async findById(id: number): Promise<Classe | null> {
    return await this.repo.findOne({ 
      where: { id },
      relations: ["cours"] 
    });
  }

  async update(id: number, data: Partial<Classe>): Promise<Classe> {
    await this.repo.update(id, data);
    return await this.findById(id) as Classe;
  }

  async delete(id: number): Promise<void> {
    await this.repo.delete(id);
  }
}
