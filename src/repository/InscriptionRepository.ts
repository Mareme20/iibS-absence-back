import { Repository } from "typeorm"
import { AppDataSource } from "../config/data-source"
import { Inscription } from "../entity/Inscription"
import { IInscriptionRepository } from "./interfaces/IInscriptionRepository"

export class InscriptionRepository implements IInscriptionRepository {

  private repo: Repository<Inscription>

  constructor() {
    this.repo = AppDataSource.getRepository(Inscription)
  }

  async create(data: Partial<Inscription>): Promise<Inscription> {
    const inscription = this.repo.create(data)
    return await this.repo.save(inscription)
  }

  async findAll(): Promise<Inscription[]> {
    return await this.repo.find({
      relations: ["etudiant", "etudiant.user", "classe"]
    })
  }

  async findById(id: number): Promise<Inscription | null> {
    return await this.repo.findOne({
      where: { id },
      relations: ["etudiant", "etudiant.user", "classe"]
    })
  }

  async delete(id: number): Promise<void> {
    await this.repo.delete(id);
  }
}
