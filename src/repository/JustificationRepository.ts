import { Repository } from "typeorm";
import { AppDataSource } from "../config/data-source";
import { Justification } from "../entity/Justification";
import { IJustificationRepository } from "./interfaces/IJustificationRepository";

export class JustificationRepository implements IJustificationRepository {
  private get repo(): Repository<Justification> {
    return AppDataSource.getRepository(Justification);
  }

  async create(data: Partial<Justification>): Promise<Justification> {
    const justification = this.repo.create(data);
    return await this.repo.save(justification);
  }

  async save(justification: Justification): Promise<Justification> {
    return await this.repo.save(justification);
  }

  async findAll(): Promise<Justification[]> {
    return await this.repo.find({ relations: ["absence", "absence.etudiant", "absence.cours"] });
  }

  async findById(id: number): Promise<Justification | null> {
    return await this.repo.findOne({ 
      where: { id }, 
      relations: ["absence", "absence.etudiant", "absence.cours"] 
    });
  }

  async update(id: number, data: Partial<Justification>): Promise<Justification> {
    await this.repo.update(id, data);
    return await this.findById(id) as Justification;
  }

  async delete(id: number): Promise<void> {
    await this.repo.delete(id);
  }

  async findByEtudiant(etudiantId: number): Promise<Justification[]> {
    return await this.repo.find({
      where: { absence: { etudiant: { id: etudiantId } } },
      relations: ["absence", "absence.cours"]
    });
  }

  async findByEtudiantAndFilters(
    etudiantId: number, 
    dateDebut?: Date, 
    dateFin?: Date, 
    statut?: string
  ): Promise<Justification[]> {
    const queryBuilder = this.repo
      .createQueryBuilder("justification")
      .innerJoin("justification.absence", "absence")
      .innerJoin("absence.etudiant", "etudiant")
      .leftJoinAndSelect("justification.absence.cours", "cours")
      .where("etudiant.id = :etudiantId", { etudiantId });

    if (dateDebut) {
      queryBuilder.andWhere("justification.date >= :dateDebut", { dateDebut });
    }

    if (dateFin) {
      queryBuilder.andWhere("justification.date <= :dateFin", { dateFin });
    }

    if (statut) {
      queryBuilder.andWhere("justification.statut = :statut", { statut });
    }

    return await queryBuilder.orderBy("justification.date", "DESC").getMany();
  }
}
