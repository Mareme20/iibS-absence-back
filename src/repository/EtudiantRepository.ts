import { Repository } from "typeorm"
import { AppDataSource } from "../config/data-source"
import { Etudiant } from "../entity/Etudiant"
import { IEtudiantRepository } from "./interfaces/IEtudiantRepository"

export class EtudiantRepository implements IEtudiantRepository {

  private repo: Repository<Etudiant>

  constructor() {
    this.repo = AppDataSource.getRepository(Etudiant)
  }

  async create(data: Partial<Etudiant>): Promise<Etudiant> {
    const etudiant = this.repo.create(data)
    return await this.repo.save(etudiant)
  }

  async findAll(): Promise<Etudiant[]> {
    return await this.repo.find({ relations: ["user"] })
  }

  async findById(id: number): Promise<Etudiant | null> {
    return await this.repo.findOne({ where: { id }, relations: ["user"] })
  }
}
