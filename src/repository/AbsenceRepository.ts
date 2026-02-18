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
  async findById(id: number): Promise<Absence | null> {
    return await this.repo.findOne({ where: { id } });
  }

  // Implémentation du save pour la mise à jour
  async save(absence: Absence): Promise<Absence> {
    return await this.repo.save(absence);
  }
}
