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

  async findById(id: number): Promise<Justification | null> {
    return await this.repo.findOne({ 
      where: { id }, 
      relations: ["absence"] 
    });
  }
}
