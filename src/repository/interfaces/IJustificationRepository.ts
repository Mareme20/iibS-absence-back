import { Justification, StatutJustification } from "../../entity/Justification";

export interface IJustificationRepository {
  create(data: Partial<Justification>): Promise<Justification>;
  save(justification: Justification): Promise<Justification>;
  findById(id: number): Promise<Justification | null>;
}
