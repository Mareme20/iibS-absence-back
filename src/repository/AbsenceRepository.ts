import { Repository } from "typeorm";
import { AppDataSource } from "../config/data-source";
import { Absence } from "../entity/Absence";
import { IAbsenceRepository } from "./interfaces/IAbsenceRepository";

export class AbsenceRepository implements IAbsenceRepository {
  private get repo(): Repository<Absence> {
    return AppDataSource.getRepository(Absence);
  }

  async create(data: Partial<Absence>): Promise<Absence> {
    const absence = this.repo.create(data);
    return await this.repo.save(absence);
  }

  async findAll(): Promise<Absence[]> {
    return await this.repo.find({ 
      relations: ["etudiant", "cours", "justification"] 
    });
  }

  async findById(id: number): Promise<Absence | null> {
    return await this.repo.findOne({ 
      where: { id }, 
      relations: ["etudiant", "cours", "justification"] 
    });
  }

  async save(absence: Absence): Promise<Absence> {
    return await this.repo.save(absence);
  }

  async update(id: number, data: Partial<Absence>): Promise<Absence> {
    await this.repo.update(id, data);
    return await this.findById(id) as Absence;
  }

  async delete(id: number): Promise<void> {
    await this.repo.delete(id);
  }

  async findByEtudiant(etudiantId: number, date?: string): Promise<Absence[]> {
    const query = this.repo.createQueryBuilder("absence")
      .leftJoinAndSelect("absence.cours", "cours")
      .where("absence.etudiantId = :etudiantId", { etudiantId });

    if (date) {
      query.andWhere("absence.date = :date", { date });
    }

    return await query.getMany();
  }
}
