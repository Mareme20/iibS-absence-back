import { Classe } from "../../entity/Classe"

export interface IClasseRepository {
  create(data: Partial<Classe>): Promise<Classe>
  findAll(): Promise<Classe[]>
  findById(id: number): Promise<Classe | null>;
  update(id: number, data: Partial<Classe>): Promise<Classe>;
  delete(id: number): Promise<void>;
}
