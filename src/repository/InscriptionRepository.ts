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

  async findByEtudiant(etudiantId: number): Promise<Inscription[]> {
    return await this.repo.find({
      where: { etudiant: { id: etudiantId } },
      relations: ["etudiant", "classe"]
    })
  }

  async findByClasse(classeId: number, annee?: string): Promise<Inscription[]> {
    const where = annee
      ? { classe: { id: classeId }, annee }
      : { classe: { id: classeId } };

    return await this.repo.find({
      where,
      relations: ["etudiant", "etudiant.user", "classe"]
    })
  }

  async findByEtudiantAndAnnee(etudiantId: number, annee: string): Promise<Inscription | null> {
    return await this.repo.findOne({
      where: {
        etudiant: { id: etudiantId },
        annee
      },
      relations: ["etudiant", "classe"]
    });
  }

  async delete(id: number): Promise<void> {
    await this.repo.delete(id);
  }
}
